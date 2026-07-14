#!/usr/bin/env python3
"""Deploy travel-app to surge.sh via REST API"""
import os
import sys
import zipfile
import io
import urllib.request
import urllib.parse
import base64
import json
import mimetypes

DOMAIN = "wandersync-travel-1779355803.surge.sh"
TOKEN = "6a8bbf987174297a28e613df622429a1"
EMAIL = "wandersync-family-sharing@outlook.com"
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE_DIR = os.path.join(PROJECT_DIR, 'deploy_live')

# Files to deploy (exclude node_modules, .git, python scripts, etc.)
EXCLUDE_DIRS = {'node_modules', '.git', '__pycache__', '.surge', 'node_portable'}
EXCLUDE_EXTS = {'.py', '.pyc', '.log', '.md', '.json'}
EXCLUDE_FILES = {
    'deploy_surge.py', 'analyze_runner.js', 'verify_night_scheduling.py',
    'project.zip', 'mockData_backup.js', 'extracted_user_request.txt',
    'extracted_user_request_split.txt', 'subagent_step0_content.txt',
    'deploy_surge.js'
}

def collect_files():
    files = {}
    for root, dirs, filenames in os.walk(SOURCE_DIR):
        # Remove excluded dirs in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for filename in filenames:
            if filename in EXCLUDE_FILES:
                continue
            ext = os.path.splitext(filename)[1].lower()
            if ext in EXCLUDE_EXTS:
                continue
            filepath = os.path.join(root, filename)
            relpath = os.path.relpath(filepath, SOURCE_DIR).replace('\\', '/')
            files[relpath] = filepath
    return files

def create_zip(files):
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as zf:
        for relpath, filepath in files.items():
            zf.write(filepath, relpath)
    buf.seek(0)
    return buf.read()

def deploy(zip_data):
    url = f"https://surge.surge.sh/"
    auth = base64.b64encode(f"{EMAIL}:{TOKEN}".encode()).decode()
    
    headers = {
        'Authorization': f'Basic {auth}',
        'Content-Type': 'application/zip',
        'Domain': DOMAIN,
    }
    
    req = urllib.request.Request(url, data=zip_data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = resp.read().decode('utf-8', errors='replace')
            print(f"Status: {resp.status}")
            print(f"Response: {body[:500]}")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"HTTP Error {e.code}: {e.reason}")
        print(f"Response: {body[:500]}")
        return False
    except Exception as ex:
        try:
            print(f"Error: {ex}")
        except Exception:
            print(f"Error: {repr(ex)}")
        return False

if __name__ == '__main__':
    print(f"Collecting production files from: {SOURCE_DIR}")
    files = collect_files()
    print(f"Found {len(files)} files:")
    for f in sorted(files.keys()):
        print(f"  {f}")
    
    print(f"\nCreating zip...")
    zip_data = create_zip(files)
    print(f"Zip size: {len(zip_data):,} bytes")
    
    # Save zip to disk for JS or CLI deploy
    zip_path = os.path.join(PROJECT_DIR, 'project.zip')
    with open(zip_path, 'wb') as f:
        f.write(zip_data)
    print(f"Saved zip to: {zip_path}")
    
    print(f"\nDeploying to {DOMAIN}...")
    success = deploy(zip_data)
    if success:
        print(f"\n✅ Deployed! Visit: https://{DOMAIN}")
    else:
        print(f"\n❌ Deploy failed")
        sys.exit(1)
