import codecs

with codecs.open('src/pages/LandingPage/Home.jsx', 'r', 'utf-8') as f:
    content = f.read()

bad_str = "  'support-ohi': (\n    {homePage.supporters?.isEnabled !== false && (\n"
good_str = "  'support-ohi': (\n    <>\n    {homePage.supporters?.isEnabled !== false && (\n"

content = content.replace(bad_str, good_str)
content = content.replace("      )}\n  ),\n  'final-cta':", "      )}\n    </>\n  ),\n  'final-cta':")

with codecs.open('src/pages/LandingPage/Home.jsx', 'w', 'utf-8') as f:
    f.write(content)
print("Fixed support-ohi syntax")
