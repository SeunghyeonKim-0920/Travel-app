import urllib.request
import zipfile
import os

url = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip"
zip_path = "node.zip"
extract_path = "node_portable"

print("Downloading portable Node.js v20.11.1...")
try:
    urllib.request.urlretrieve(url, zip_path)
    print("Download complete. Extracting...")
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
        
    print("Extraction complete!")
    # Remove the zip file
    os.remove(zip_path)
except Exception as e:
    print("Error:", e)
