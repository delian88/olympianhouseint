import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Hero Image
bad_hero = """<ImageField 
                    label="Hero Image"
                    value={draftConfig.approachPage?.hero?.image || ""} 
                    onChange={(url) => updateApproachPage("hero", "image", url)} 
                  />"""
good_hero = """<ImageField 
                    label="Hero Image"
                    value={draftConfig.approachPage?.hero?.image || ""} 
                    onChange={(e) => handleImageUpload(e, (value) => updateApproachPage("hero", "image", value))} 
                  />"""
content = content.replace(bad_hero, good_hero)

# Fix How We Work Image
bad_hww = """<ImageField 
                      label="Section Image"
                      value={draftConfig.approachPage?.howWeWork?.image || ""} 
                      onChange={(url) => updateApproachPage("howWeWork", "image", url)} 
                    />"""
good_hww = """<ImageField 
                      label="Section Image"
                      value={draftConfig.approachPage?.howWeWork?.image || ""} 
                      onChange={(e) => handleImageUpload(e, (value) => updateApproachPage("howWeWork", "image", value))} 
                    />"""
content = content.replace(bad_hww, good_hww)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed ImageField onChange handler.")
