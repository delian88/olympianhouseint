import re
content = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read()

match = re.search(r'const updateWhoWeServePage =', content)
if match:
    start = match.start()
    print(content[start:start+500])
else:
    print("Not found")
