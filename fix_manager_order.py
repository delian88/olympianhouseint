import re

with open("src/pages/Client-Dashboard/LandingPageManager.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Helper function to find a card's boundaries
def find_card(card_id):
    # Find start of card
    start_match = re.search(r'\s*<SectionCard[^>]*id="' + card_id + r'"', content)
    if not start_match:
        return None
    start_idx = start_match.start()
    
    # Find end of card by counting nested <SectionCard tags (if any) or just finding the first </SectionCard>
    # Actually, there are no nested SectionCards. So we can just find the first </SectionCard> after the start.
    end_idx = content.find("</SectionCard>", start_idx) + len("</SectionCard>")
    return start_idx, end_idx

val_bounds = find_card("value-proposition")
diff_bounds = find_card("home-difference")

if val_bounds and diff_bounds:
    val_str = content[val_bounds[0]:val_bounds[1]]
    
    # Remove value proposition from its old location
    new_content = content[:val_bounds[0]] + content[val_bounds[1]:]
    
    # Need to find the new boundary of home-difference because removing val_str might have shifted it
    # BUT wait, value-proposition is further down in the file! (at line 1883, while home-difference is at line 1171).
    # So removing value-proposition does NOT affect the indices of home-difference!
    
    # Insert it right after home-difference
    insert_pos = diff_bounds[1]
    
    final_content = new_content[:insert_pos] + "\n" + val_str + new_content[insert_pos:]
    
    with open("src/pages/Client-Dashboard/LandingPageManager.jsx", "w", encoding="utf-8") as f:
        f.write(final_content)
    print("Successfully moved value-proposition")
else:
    print("Could not find one of the cards")

