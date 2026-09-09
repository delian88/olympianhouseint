import re
import codecs

with codecs.open('extracted_return.txt', 'r', 'utf-8') as f:
    content = f.read()

# Replace \r\n with \n
content = content.replace('\r\n', '\n')

def get_chunk(start_str, next_str=None):
    s = content.find(start_str)
    if s == -1: return ""
    if next_str:
        e = content.find(next_str, s)
        return content[s:e].strip()
    return content[s:].strip()

chunks = {}
chunks['hero'] = get_chunk('<section className="relative min-h-[65vh]', '<section\n        id="conviction-strip"')
chunks['conviction-strip'] = get_chunk('<section\n        id="conviction-strip"', '<section id="about"')
chunks['about'] = get_chunk('<section id="about"', '<section id="ohi-difference"')
chunks['ohi-difference'] = get_chunk('<section id="ohi-difference"', '<section id="track-record"')
chunks['track-record'] = get_chunk('<section id="track-record"', '<ValueProposition />')
chunks['what-we-do'] = '<ValueProposition />'
chunks['support-ohi'] = get_chunk('{homePage.supporters?.isEnabled !== false', '<section\n        id="turn-programme-into-proof"')
chunks['final-cta'] = get_chunk('<section\n        id="turn-programme-into-proof"', '<section id="leadership-storytellers"')
chunks['leadership'] = get_chunk('<section id="leadership-storytellers"', '<section className="py-10 sm:py-14 bg-white">')
chunks['programmes'] = get_chunk('<section className="py-10 sm:py-14 bg-white">', '<section id="africa-story-banner"')
chunks['africa-story-banner'] = get_chunk('<section id="africa-story-banner"', '<section className="py-12 sm:py-14" style={{ backgroundImage')
chunks['story-banner'] = get_chunk('<section className="py-12 sm:py-14" style={{ backgroundImage', '<section id="client-voices"')
chunks['client-voices'] = get_chunk('<section id="client-voices"', '<section id="news-blog"')
chunks['news-blog'] = get_chunk('<section id="news-blog"', '<section id="ohi-video"')
chunks['ohi-video'] = get_chunk('<section id="ohi-video"', '{isOhiVideoOpen && (')

map_str = "const SECTION_MAP = {\n"
for k,v in chunks.items():
    if v.startswith("{homePage.supporters"):
        map_str += f"  '{k}': (\n    {v}\n  ),\n"
    elif v:
        map_str += f"  '{k}': (\n    {v}\n  ),\n"
map_str += "};\n"

new_return = map_str + """
  const currentSectionOrder = homePage.sectionOrder || landingPageDefaults.homePage.sectionOrder;

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#fffaf0_0%,#fcf6ea_28%,#f7f0e2_100%)] text-[#173145]">
      {currentSectionOrder.map((sectionId) => {
        const templateId = sectionId.split(':')[0];
        const Component = SECTION_MAP[templateId];
        return Component ? <React.Fragment key={sectionId}>{Component}</React.Fragment> : null;
      })}

      {isOhiVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIsOhiVideoOpen(false)} className="absolute right-4 top-4 text-white hover:text-[#f59d21] z-50">
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl">
            <div className="relative pt-[56.25%]">
              <iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/n4P82s5fQ10?autoplay=1" title="OHI Showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
"""

# Now write this to original_home.jsx's text block inside Home.jsx
with codecs.open('src/pages/LandingPage/Home.jsx', 'r', 'utf-8') as f:
    home_content = f.read()

start_idx = home_content.find('const SECTION_MAP = {')
end_idx = home_content.find('export default Home;')
if start_idx != -1 and end_idx != -1:
    new_home = home_content[:start_idx] + new_return + "\n}\n\n" + home_content[end_idx:]
    with codecs.open('src/pages/LandingPage/Home.jsx', 'w', 'utf-8') as f:
        f.write(new_home)
    print("Successfully replaced Home.jsx")
else:
    print("Could not find replacement points")
