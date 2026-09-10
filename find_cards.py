import re
content = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read()
matches = re.findall(r"<SectionCard[^>]*id=`?\"?([^\"]+)`?\"?", content)
print(matches)
