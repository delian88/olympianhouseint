import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\Overview.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The incorrect snippet
snippet = """  {
    name: "Our Clients",
    id: "our-clients-page",
    icon: LayoutTemplate,
    description: "Manage client logos, sectors, and client lists",
    path: "/dashboard/landing-page#our-clients-page"
  },"""

snippet2 = """
  {
    name: "Our Clients",
    id: "our-clients-page",
    icon: LayoutTemplate,
    description: "Manage client logos, sectors, and client lists",
    path: "/dashboard/landing-page#our-clients-page"
  },"""

# Remove all occurrences of the snippet
content = content.replace(snippet, "")
content = content.replace(snippet2, "")

# Now add it correctly once inside editableItems array
# let's look for "theme-settings" block inside editableItems and insert it before that.
target = """  {
    title: "Theme and footer",
    description: "Primary colors and footer text/contact details.",
    icon: BadgeCheckIcon,
    route: "/dashboard/landing-page#theme-settings",
  },"""

correct_snippet = """  {
    title: "Our Clients",
    description: "Manage client logos, sectors, and client lists",
    icon: LayoutTemplate,
    route: "/dashboard/landing-page#our-clients-page"
  },
"""

content = content.replace(target, correct_snippet + target)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Overview.jsx cleaned up.")
