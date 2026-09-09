import codecs

with codecs.open('src/pages/LandingPage/Home.jsx', 'r', 'utf-8') as f:
    content = f.read()

bad_str = "  'ohi-video': (\n    <section id=\"ohi-video\""
good_str = "  'ohi-video': (\n    <>\n    <section id=\"ohi-video\""

content = content.replace(bad_str, good_str)
content = content.replace("      {/* Video Modal Player for This is OHI */}\n  ),\n};", "      {/* Video Modal Player for This is OHI */}\n    </>\n  ),\n};")

with codecs.open('src/pages/LandingPage/Home.jsx', 'w', 'utf-8') as f:
    f.write(content)
print("Fixed ohi-video syntax")
