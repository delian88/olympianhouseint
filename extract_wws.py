import re
content = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read()

match = re.search(r'<SectionCard[^>]*id=\{?["'']who-we-serve-page["'']\}?', content)
if match:
    start = match.start()
    print(content[start:start+1000])
else:
    print("Not found")
