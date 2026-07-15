CREATE TABLE IF NOT EXISTS moderation_reports (
  id TEXT PRIMARY KEY,
  report_type TEXT NOT NULL CHECK (report_type IN ('room', 'member', 'message')),
  target_id TEXT NOT NULL,
  room_id TEXT,
  message_id TEXT,
  reported_client_id TEXT,
  reported_name TEXT,
  reporter_client_id TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('safety', 'harassment', 'spam', 'fraud', 'inappropriate', 'other')),
  details TEXT,
  evidence_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_moderation_reports_status_created
  ON moderation_reports (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_moderation_reports_target
  ON moderation_reports (report_type, target_id, created_at DESC);
