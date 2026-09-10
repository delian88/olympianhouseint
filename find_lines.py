lines = open(r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx", encoding="utf-8").read().splitlines()
print("updateTheme:", next((i for i, x in enumerate(lines) if "const updateTheme" in x), -1))
print("theme-settings:", next((i for i, x in enumerate(lines) if "id=\"theme-settings\"" in x), -1))
print("container end:", len(lines) - 1 - next((i for i, x in enumerate(reversed(lines)) if "</motion.div>" in x), -1))
