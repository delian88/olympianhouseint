import re

manager_path = r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx"
with open(manager_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("requestImageUpload(", "handleImageUpload(")

with open(manager_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed handleImageUpload")
