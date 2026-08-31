import urllib.request
import re

url = 'https://olympianhouseintl.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find JS file
js_files = re.findall(r'src="(/assets/index-[^"]+\.js)"', html)
if js_files:
    js_url = 'https://olympianhouseintl.com' + js_files[0]
    print('Found JS:', js_url)
    js_content = urllib.request.urlopen(urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
    
    match = re.search(r'CAPITAL-FLUENT.{0,200}', js_content, re.IGNORECASE)
    if match:
        print('Found text:', match.group(0))
