import codecs
import re

with codecs.open("original_home.jsx", "r", "utf-16") as f:
    orig = f.read()

# Find the start of the return statement
m = re.search(r"return\s*\(\s*<div\s+className=\"overflow-hidden", orig)
if not m:
    print("Could not find original return block")
else:
    top_block = orig[:m.start()]
    
    # Now we need the SECTION_MAP
    # SECTION_MAP is in Home.jsx, but maybe it's better to extract it from the current Home.jsx
    with codecs.open("src/pages/LandingPage/Home.jsx", "r", "utf-8") as f:
        curr = f.read()
    
    m2 = re.search(r"(const SECTION_MAP = \{.*?\n  \),\n\};\n)", curr, re.DOTALL)
    if not m2:
        print("Could not find SECTION_MAP in current Home.jsx")
    else:
        section_map = m2.group(1)
        
        # Now the new return block
        m3 = re.search(r"(  const currentSectionOrder =.*?export default Home;)", curr, re.DOTALL)
        if not m3:
            print("Could not find new return block in current Home.jsx")
        else:
            new_return = m3.group(1)
            
            final_content = top_block + section_map + "\n" + new_return + "\n"
            
            with codecs.open("src/pages/LandingPage/Home.jsx", "w", "utf-8") as f:
                f.write(final_content)
            print("Reconstructed Home.jsx successfully!")
