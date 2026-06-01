import json
import os

log_path = r"C:\Users\kseunghyeon\.gemini\antigravity\brain\14b5ca64-a87c-4f06-a8a0-384dd37ba92d\.system_generated\logs\transcript.jsonl"
out_path = r"C:\Users\kseunghyeon\.gemini\antigravity\scratch\travel-app\user_request_extracted.txt"

with open(log_path, 'r', encoding='utf-8') as f:
    line = f.readline()
    data = json.loads(line)
    content = data.get("content", "")
    with open(out_path, 'w', encoding='utf-8') as out_f:
        out_f.write(content)

print("Extraction completed successfully!")
