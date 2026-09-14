import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\Overview.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

our_clients_shortcut = """
  {
    name: "Our Clients",
    id: "our-clients-page",
    icon: LayoutTemplate,
    description: "Manage client logos, sectors, and client lists",
    path: "/dashboard/landing-page#our-clients-page"
  },"""

if '"our-clients-page"' not in content:
    content = content.replace(
        '  {',
        our_clients_shortcut + '\n  {'
    )
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Overview shortcut added.")
else:
    print("Shortcut already added.")
