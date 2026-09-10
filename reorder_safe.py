import re

with open("src/pages/Client-Dashboard/LandingPageManager.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find all SectionCards
matches = list(re.finditer(r'(<SectionCard[\s\S]*?</SectionCard>)', content))

cards = {}
for m in matches:
    card_str = m.group(1)
    id_match = re.search(r'<SectionCard[^>]*id="([^"]+)"', card_str)
    if id_match:
        cards[id_match.group(1)] = card_str

print("Found IDs:")
for k in cards.keys():
    print(k)

