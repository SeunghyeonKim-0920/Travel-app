$lines = Get-Content -Path 'C:\Users\kseunghyeon\.gemini\antigravity\brain\14b5ca64-a87c-4f06-a8a0-384dd37ba92d\.system_generated\logs\transcript.jsonl'
$firstLine = $lines[0] | ConvertFrom-Json
$content = $firstLine.content

$newLines = [System.Collections.Generic.List[string]]::new()
foreach ($line in $content -split "`r?`n") {
    $i = 0
    if ($line.Length -eq 0) {
        $newLines.Add("")
        continue
    }
    while ($i -lt $line.Length) {
        $len = [System.Math]::Min(80, $line.Length - $i)
        $newLines.Add($line.Substring($i, $len))
        $i += $len
    }
}
$newLines | Out-File -FilePath 'extracted_user_request_split.txt' -Encoding utf8
Write-Output "Extraction split completed!"
