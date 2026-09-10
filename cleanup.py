import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The exact block to remove
block_to_remove = """              <div className="grid gap-4 xl:grid-cols-2">
                <Field label="Page eyebrow">
                  <TextInput
                    value={draftConfig.aboutPage?.hero?.eyebrow || ""}
                    onChange={(e) => updateAboutPageSection("hero", "eyebrow", e.target.value)}
                  />
                </Field>
                <Field label="Primary CTA Label">
                  <TextInput
                    value={draftConfig.aboutPage?.hero?.primaryCtaLabel || ""}
                    onChange={(e) => updateAboutPageSection("hero", "primaryCtaLabel", e.target.value)}
                  />
                </Field>
                <Field label="Primary CTA Link">
                  <TextInput
                    value={draftConfig.aboutPage?.hero?.primaryCtaHref || ""}
                    onChange={(e) => updateAboutPageSection("hero", "primaryCtaHref", e.target.value)}
                  />
                </Field>
                <Field label="Secondary CTA Label">
                  <TextInput
                    value={draftConfig.aboutPage?.hero?.secondaryCtaLabel || ""}
                    onChange={(e) => updateAboutPageSection("hero", "secondaryCtaLabel", e.target.value)}
                  />
                </Field>
                <Field label="Secondary CTA Link">
                  <TextInput
                    value={draftConfig.aboutPage?.hero?.secondaryCtaHref || ""}
                    onChange={(e) => updateAboutPageSection("hero", "secondaryCtaHref", e.target.value)}
                  />
                </Field>
                <ImageField
                  label="Hero Image"
                  value={draftConfig.aboutPage?.hero?.image || ""}
                  onChange={(e) => handleImageUpload(e, (value) => updateAboutPageSection("hero", "image", value))}
                />
              </div>"""

# Remove all occurrences
content = content.replace(block_to_remove + '\n', '')
content = content.replace(block_to_remove, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleanup complete.")
