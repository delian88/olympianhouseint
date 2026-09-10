import re
content = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read()

match = re.search(r'<SectionCard[^>]*id="who-we-serve-page"', content)
if match:
    start = match.start()
    end = content.find('</SectionCard>', start) + 14
    print(content[start:end])
else:
    print("Not found")
