lines = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read().splitlines()
last_section = next((i for i, x in enumerate(reversed(lines)) if "</SectionCard>" in x), -1)
if last_section != -1:
    print("last SectionCard at line:", len(lines) - 1 - last_section)
    print("Line content:", lines[len(lines) - 1 - last_section])
