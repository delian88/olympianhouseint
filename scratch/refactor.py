import sys

def process():
    with open('src/pages/LandingPage/Home.jsx', 'r', encoding='utf-8') as f:
        text = f.read()

    return_idx = text.find('  return (\n    <div className="overflow-hidden bg-[linear-gradient')
    if return_idx == -1:
        print("Could not find return statement")
        sys.exit(1)

    pre_return = text[:return_idx]
    post_return = text[return_idx:]
    
    end_idx = post_return.rfind('    </div>\n  );\n}')
    if end_idx == -1:
        end_idx = post_return.rfind('</div>\n  );\n}')
    if end_idx == -1:
        print("Could not find end statement")
        sys.exit(1)

    sections_content = post_return[post_return.find('>\n      <section'):end_idx]

    elements = []
    i = 0
    while i < len(sections_content):
        next_sec = sections_content.find('<section', i)
        next_vp = sections_content.find('<ValueProposition', i)
        
        if next_sec == -1 and next_vp == -1:
            break
            
        if next_vp != -1 and (next_sec == -1 or next_vp < next_sec):
            start = next_vp
            end = sections_content.find('/>', start) + 2
            elements.append(sections_content[start:end])
            i = end
        else:
            start = next_sec
            depth = 1
            j = start + 8
            while depth > 0 and j < len(sections_content):
                open_tag = sections_content.find('<section', j)
                close_tag = sections_content.find('</section>', j)
                
                if close_tag == -1:
                    print("Error missing close tag")
                    sys.exit(1)
                    
                if open_tag != -1 and open_tag < close_tag:
                    depth += 1
                    j = open_tag + 8
                else:
                    depth -= 1
                    j = close_tag + 10
            
            elements.append(sections_content[start:j])
            i = j

    section_keys = [
        'hero',
        'conviction-strip',
        'about',
        'what-we-do',
        'track-record',
        'support-ohi',
        'turn-programme-into-proof',
        'leadership',
        'brand-logos',
        'africa-story-banner',
        'story-banner',
        'client-voices',
        'news-blog',
        'ohi-video'
    ]

    if len(elements) != len(section_keys):
        print(f"Mismatch: found {len(elements)} elements, expected {len(section_keys)}")
        sys.exit(1)

    section_map_parts = []
    for idx, el in enumerate(elements):
        section_map_parts.append(f"    '{section_keys[idx]}': (\n      {el}\n    ),")
        
    new_return = "  const sectionMap = {\n" + "\n".join(section_map_parts) + "\n  };\n\n"
    new_return += "  const sectionOrder = homePage.sectionOrder || [\n"
    for k in section_keys:
        new_return += f"    '{k}',\n"
    new_return += "  ];\n\n"
    new_return += '  return (\n    <div className="overflow-hidden bg-[linear-gradient(180deg,#fffaf0_0%,#fcf6ea_28%,#f7f0e2_100%)] text-[#173145]">\n'
    new_return += "      {sectionOrder.map((sectionId, idx) => (\n"
    new_return += "        <React.Fragment key={`${sectionId}-${idx}`}>\n"
    new_return += "          {sectionMap[sectionId] || null}\n"
    new_return += "        </React.Fragment>\n"
    new_return += "      ))}\n"
    new_return += '    </div>\n  );\n}\n'
    
    with open('src/pages/LandingPage/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(pre_return + new_return)
        
    print("Successfully refactored Home.jsx")

if __name__ == '__main__':
    process()
