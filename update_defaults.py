import re
import codecs

with codecs.open('src/data/landingPageDefaults.js', 'r', 'utf-8') as f:
    content = f.read()

pattern = re.compile(r"sectionOrder:\s*\[([^\]]+)\]")
def replace_order(match):
    return "sectionOrder: [\n        'hero',\n        'conviction-strip',\n        'about',\n        'ohi-difference',\n        'what-we-do',\n        'track-record',\n        'support-ohi',\n        'final-cta',\n        'leadership',\n        'programmes',\n        'africa-story-banner',\n        'story-banner',\n        'client-voices',\n        'news-blog',\n        'ohi-video'\n      ]"

new_content = pattern.sub(replace_order, content, count=1)

with codecs.open('src/data/landingPageDefaults.js', 'w', 'utf-8') as f:
    f.write(new_content)
print("Regex replace done")

