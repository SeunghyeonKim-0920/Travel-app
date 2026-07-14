param(
  [string]$InputFile = 'transit_route_requests.json',
  [string]$OutputFile = 'transit_route_records.json',
  [int]$DelayMilliseconds = 100
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$inputPath = Join-Path $root $InputFile
$outputPath = Join-Path $root $OutputFile

function Haversine([double]$lon1, [double]$lat1, [double]$lon2, [double]$lat2) {
  $r = 6371.0
  $rad = [Math]::PI / 180
  $p1 = $lat1 * $rad; $p2 = $lat2 * $rad
  $dLat = ($lat2 - $lat1) * $rad; $dLon = ($lon2 - $lon1) * $rad
  $h = [Math]::Pow([Math]::Sin($dLat / 2), 2) + [Math]::Cos($p1) * [Math]::Cos($p2) * [Math]::Pow([Math]::Sin($dLon / 2), 2)
  return $r * 2 * [Math]::Atan2([Math]::Sqrt($h), [Math]::Sqrt(1 - $h))
}

function Get-Route([string]$base, $from, $to) {
  $url = "$base/$($from.x),$($from.y);$($to.x),$($to.y)?overview=false&steps=false"
  try {
    $payload = Invoke-RestMethod -Uri $url -TimeoutSec 25
    if ($payload.code -eq 'Ok' -and @($payload.routes).Count -gt 0) {
      $route = $payload.routes[0]
      if ([double]$route.distance -gt 0 -and [double]$route.duration -gt 0) {
        return [PSCustomObject]@{ distance = [double]$route.distance; duration = [double]$route.duration; url = $url }
      }
    }
  } catch {}
  return $null
}

$input = Get-Content -LiteralPath $inputPath -Raw -Encoding UTF8 | ConvertFrom-Json
$records = @{}
$failed = @()
if (Test-Path -LiteralPath $outputPath) {
  try {
    $existing = Get-Content -LiteralPath $outputPath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($property in $existing.records.PSObject.Properties) { $records[$property.Name] = $property.Value }
    $failed = @($existing.failed)
  } catch {}
}

$pending = @($input.routes)
$index = 0
foreach ($pair in $pending) {
  $index++
  if ($records.ContainsKey($pair.key)) { continue }
  $straight = Haversine $pair.fromCoord.x $pair.fromCoord.y $pair.toCoord.x $pair.toCoord.y
  $foot = $straight -le 1.5
  $base = if ($foot) { 'https://routing.openstreetmap.de/routed-foot/route/v1/driving' } else { 'https://router.project-osrm.org/route/v1/driving' }
  $route = Get-Route $base $pair.fromCoord $pair.toCoord
  if (-not $route -and $foot) {
    $base = 'https://router.project-osrm.org/route/v1/driving'
    $route = Get-Route $base $pair.fromCoord $pair.toCoord
  }
  if ($route) {
    $records[$pair.key] = [PSCustomObject]@{
      key = $pair.key
      cityId = $pair.cityId
      from = $pair.from
      to = $pair.to
      distanceKm = [Math]::Round(([double]$route.distance / 1000), 3)
      durationSeconds = [Math]::Round([double]$route.duration)
      mode = if ($base -like '*routed-foot*') { 'walking-route' } else { 'road-route' }
      provider = if ($base -like '*routed-foot*') { 'OpenStreetMap routed-foot' } else { 'OSRM public routing' }
      source = $route.url
      capturedAt = (Get-Date).ToUniversalTime().ToString('o')
    }
    $failed = @($failed | Where-Object { $_.key -ne $pair.key })
  } else {
    $failed = @($failed | Where-Object { $_.key -ne $pair.key })
    $failed += [PSCustomObject]@{ key = $pair.key; cityId = $pair.cityId; from = $pair.from; to = $pair.to; reason = 'route-api-no-result' }
  }
  if (($index % 25) -eq 0) {
    [PSCustomObject]@{ generatedAt = (Get-Date).ToUniversalTime().ToString('o'); records = $records; failed = $failed } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $outputPath -Encoding UTF8
    Write-Output "Fetched $index/$($pending.Count): $($records.Count) records, $($failed.Count) failed"
  }
  Start-Sleep -Milliseconds $DelayMilliseconds
}

[PSCustomObject]@{ generatedAt = (Get-Date).ToUniversalTime().ToString('o'); records = $records; failed = $failed } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $outputPath -Encoding UTF8
Write-Output "Finished: $($records.Count) records, $($failed.Count) failed"
