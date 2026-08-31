with open('src/pages/LandingPage/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find client-voices
cv_start = content.find('<section id="client-voices"')
# Find the end of client-voices
cv_next = content.find('<section', cv_start + 1)
cv_end = content.rfind('</section>', cv_start, cv_next) + 10
cv = content[cv_start:cv_end].strip()

# Remove client-voices
content = content[:cv_start] + content[cv_end:]

# Find news-blog
nb_start = content.find('<section id="news-blog"')
if nb_start == -1:
    print('Error: news-blog not found')
    exit(1)

# Insert cv before nb
content = content[:nb_start] + cv + '\n\n      ' + content[nb_start:]

with open('src/pages/LandingPage/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
