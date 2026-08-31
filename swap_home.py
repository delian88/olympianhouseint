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

# Now swap them
# To do this safely, let's find their respective positions and replace them with markers
if cv_start < vp_start:
    content = content[:vp_start] + cv + content[vp_end:]
    content = content[:cv_start] + vp + content[cv_end:]
else:
    content = content[:cv_start] + vp + content[cv_end:]
    content = content[:vp_start] + cv + content[vp_end:]

with open('src/pages/LandingPage/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
