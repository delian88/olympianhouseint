import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

who_we_serve_idx = content.find('<SectionCard id="who-we-serve-page"')

if who_we_serve_idx == -1:
    print("Could not find <SectionCard id=\"who-we-serve-page\"")
else:
    # Find the end of the <div className="space-y-4 border rounded-xl p-4"> inside that section
    # Let's search for `hero.badgeDescription` in this section.
    badge_idx = content.find('badgeDescription', who_we_serve_idx)
    if badge_idx == -1:
        print("Could not find badgeDescription inside who-we-serve-page section")
    else:
        # Find the closing </Field> after badgeDescription
        field_end = content.find('</Field>', badge_idx)
        # Find the closing </div> of the grid, and then the closing </div> of the space-y-4 block
        div1 = content.find('</div>', field_end)
        div2 = content.find('</div>', div1 + 6)
        
        insert_idx = div2 + 6
        
        # print some context around insertion to verify
        print("Context around insertion point:")
        print(content[insert_idx - 100: insert_idx + 100])
