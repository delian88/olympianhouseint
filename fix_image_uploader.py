import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Hero Image
bad_hero = """<Field label="Hero Image">
                  <ImageUploader 
                    value={draftConfig.approachPage?.hero?.image || ""} 
                    onChange={(url) => updateApproachPage("hero", "image", url)} 
                    label="Hero Image" 
                  />
                </Field>"""
good_hero = """<ImageField 
                  label="Hero Image"
                  value={draftConfig.approachPage?.hero?.image || ""} 
                  onChange={(url) => updateApproachPage("hero", "image", url)} 
                />"""
content = content.replace(bad_hero, good_hero)

# Fix How We Work Image
bad_hww = """<Field label="Section Image">
                    <ImageUploader 
                      value={draftConfig.approachPage?.howWeWork?.image || ""} 
                      onChange={(url) => updateApproachPage("howWeWork", "image", url)} 
                      label="Section Image" 
                    />
                  </Field>"""
good_hww = """<ImageField 
                    label="Section Image"
                    value={draftConfig.approachPage?.howWeWork?.image || ""} 
                    onChange={(url) => updateApproachPage("howWeWork", "image", url)} 
                  />"""
content = content.replace(bad_hww, good_hww)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed ImageUploader error.")
