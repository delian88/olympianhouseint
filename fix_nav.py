import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the About Page button
about_nav_button = """              <Button asChild variant="outline" className="w-full rounded-full px-4 py-2.5 text-xs font-semibold sm:w-auto">
                <a href="#about-page">
                  About Page
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </Button>"""

# Find where to insert it. For example, before Services Page
services_button_pattern = r'(\s*<Button asChild variant="outline" className="w-full rounded-full px-4 py-2.5 text-xs font-semibold sm:w-auto">\s*<a href="#services-page">)'

if '#about-page' not in content[:content.find('Live preview')]:
    content = re.sub(services_button_pattern, '\n' + about_nav_button + r'\1', content, count=1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Nav updated.")
