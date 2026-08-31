import re

with open('original_home.jsx', 'r', encoding='utf-16') as f:
    orig = f.read()

start = orig.find('<section id="ohi-difference"')
next_section = orig.find('<section', start + 1)
if next_section == -1:
    next_section = len(orig)
end = orig.rfind('</section>', start, next_section) + 10
ohi_diff = orig[start:end].strip()

with open('src/pages/LandingPage/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

cv_start = content.find('<section id="client-voices"')
cv_next = content.find('<section', cv_start + 1)
if cv_next == -1:
    cv_next = content.find('{homePage.supporters?.isEnabled !== false', cv_start)
cv_end = content.rfind('</section>', cv_start, cv_next) + 10
cv = content[cv_start:cv_end].strip()

vp_start = content.find('<ValueProposition />')
vp_end = vp_start + len('<ValueProposition />')
vp = content[vp_start:vp_end].strip()

content = content[:vp_start] + content[vp_end:]
cv_start = content.find('<section id="client-voices"')
cv_next = content.find('<section', cv_start + 1)
if cv_next == -1:
    cv_next = content.find('{homePage.supporters?.isEnabled !== false', cv_start)
cv_end = content.rfind('</section>', cv_start, cv_next) + 10
content = content[:cv_start] + content[cv_end:]

about_end = content.find('</section>', content.find('<section id="about"')) + 10
content = content[:about_end] + '\n\n      ' + ohi_diff + '\n\n      ' + cv + '\n\n' + content[about_end:]

track_end = content.find('</section>', content.find('<section id="track-record"')) + 10
content = content[:track_end] + '\n\n      ' + vp + '\n\n' + content[track_end:]

with open('src/pages/LandingPage/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done!")
