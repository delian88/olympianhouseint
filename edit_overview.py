import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\Overview.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

bg_item = """  {
    title: "Background",
    description: "Background page hero, founder story, and foundation.",
    icon: Layers3Icon,
    route: "/dashboard/landing-page#background-page",
  },
"""

if '"Background"' not in content:
    # insert before "Theme and footer"
    pattern = r'(\s*\{\s*title:\s*"Theme and footer",)'
    new_content = re.sub(pattern, '\n' + bg_item + r'\1', content, count=1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Overview updated.")
else:
    print("Overview already updated.")
