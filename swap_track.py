with open('src/pages/LandingPage/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

vp_start = content.find('<ValueProposition />')
vp_end = vp_start + len('<ValueProposition />')
vp = content[vp_start:vp_end].strip()

tr_start = content.find('<section id="track-record"')
tr_next = content.find('<section id="client-voices"', tr_start + 1)
if tr_next == -1:
    tr_next = content.find('<section', tr_start + 1)
tr_end = content.rfind('</section>', tr_start, tr_next) + 10
tr = content[tr_start:tr_end].strip()

# Now remove both from content
content = content[:vp_start] + content[vp_end:]

tr_start = content.find('<section id="track-record"')
tr_next = content.find('<section id="client-voices"', tr_start + 1)
if tr_next == -1:
    tr_next = content.find('<section', tr_start + 1)
tr_end = content.rfind('</section>', tr_start, tr_next) + 10
content = content[:tr_start] + content[tr_end:]

# Now insert tr then vp
# Where to insert? At the original vp position (or where ohi-difference ends)
insert_pos = content.find('</section>', content.find('<section id="ohi-difference"')) + 10

content = content[:insert_pos] + '\n\n      ' + tr + '\n\n      ' + vp + '\n\n' + content[insert_pos:]

with open('src/pages/LandingPage/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
