import re

# Update LandingPageManager.jsx
manager_path = r"c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx"
with open(manager_path, "r", encoding="utf-8") as f:
    content = f.read()

image_fields_hero = """
              <ImageField
                label="Hero Image"
                value={draftConfig.backgroundPage?.hero?.image || ""}
                onChange={(e) => requestImageUpload(e, (url) => updateBackgroundPageSection("hero", "image", url))}
              />
"""

image_fields_founder = """
              <ImageField
                label="Story Image 1"
                value={draftConfig.backgroundPage?.founder?.image1 || ""}
                onChange={(e) => requestImageUpload(e, (url) => updateBackgroundPageSection("founder", "image1", url))}
              />
              <ImageField
                label="Story Image 2"
                value={draftConfig.backgroundPage?.founder?.image2 || ""}
                onChange={(e) => requestImageUpload(e, (url) => updateBackgroundPageSection("founder", "image2", url))}
              />
              <ImageField
                label="Story Image 3"
                value={draftConfig.backgroundPage?.founder?.image3 || ""}
                onChange={(e) => requestImageUpload(e, (url) => updateBackgroundPageSection("founder", "image3", url))}
              />
"""

# Insert hero image field after Hero block title
hero_title_pattern = r'(<h3 className="text-lg font-bold text-foreground">Hero block</h3>)'
content = re.sub(hero_title_pattern, r'\1' + image_fields_hero, content)

# Insert founder image fields after A Word from the Founder title
founder_title_pattern = r'(<h3 className="text-lg font-bold text-foreground">A Word from the Founder</h3>)'
content = re.sub(founder_title_pattern, r'\1' + image_fields_founder, content)

with open(manager_path, "w", encoding="utf-8") as f:
    f.write(content)

# Update BackgroundPage.jsx
page_path = r"c:\Users\PC\OHI-UPDATED\src\pages\LandingPage\CompanyProfile\BackgroundPage.jsx"
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# Replace images
page_content = page_content.replace('src={ourStoryImage}', 'src={founder.image1 ?? ourStoryImage}')
page_content = page_content.replace('src={founderImage}', 'src={founder.image2 ?? founderImage}')
page_content = page_content.replace('src={founderImage2}', 'src={founder.image3 ?? founderImage2}')
page_content = page_content.replace('src={founderImage3}', 'src={founder.image4 ?? founderImage3}')
# Wait, actually:
# ourStoryImage -> founderImage1
# founderImage -> founderImage2
# founderImage2 -> founderImage3
# founderImage3 -> founderImage4

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Images added.")
