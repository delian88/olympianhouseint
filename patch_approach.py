import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add hero.image
hero_title_pattern = r'(<Field label="Hero title">\s*<TextInput value=\{draftConfig\.approachPage\?\.hero\?\.title \|\| ""\} onChange=\{\(e\) =>\s*updateApproachPage\("hero", "title", e\.target\.value\)\} />\s*</Field>)'
hero_image_insertion = """<Field label="Hero Image">
                  <ImageUploader 
                    value={draftConfig.approachPage?.hero?.image || ""} 
                    onChange={(url) => updateApproachPage("hero", "image", url)} 
                    label="Hero Image" 
                  />
                </Field>
                """
content = re.sub(hero_title_pattern, hero_image_insertion + r'\1', content, count=1)

# 2. Add howWeWork.image
how_we_work_title_pattern = r'(<h3 className="text-lg font-bold text-foreground">How OHI works</h3>\s*<Field label="Section title">)'
how_we_work_image_insertion = """<h3 className="text-lg font-bold text-foreground">How OHI works</h3>
                  <Field label="Section Image">
                    <ImageUploader 
                      value={draftConfig.approachPage?.howWeWork?.image || ""} 
                      onChange={(url) => updateApproachPage("howWeWork", "image", url)} 
                      label="Section Image" 
                    />
                  </Field>
                  <Field label="Section title">"""
content = re.sub(how_we_work_title_pattern, how_we_work_image_insertion, content, count=1)

# 3. Add Unique Strengths before Deliverables
deliverables_title_pattern = r'(<div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">\s*<h3 className="text-lg font-bold text-foreground">Deliverables</h3>)'
unique_strengths_insertion = """<div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Unique Strengths</h3>
                <Field label="Title">
                  <TextInput value={draftConfig.approachPage?.uniqueStrengthsTitle || ""} onChange={(e) => 
                    setDraftConfig(current => ({ ...current, approachPage: { ...current.approachPage, uniqueStrengthsTitle: e.target.value } }))
                  } />
                </Field>
                <Field label="Body text">
                  <TextArea rows={4} value={draftConfig.approachPage?.uniqueStrengthsBody || ""} onChange={(e) => 
                    setDraftConfig(current => ({ ...current, approachPage: { ...current.approachPage, uniqueStrengthsBody: e.target.value } }))
                  } />
                </Field>
              </div>

              """
# We only want to replace the first occurrence in the approach page. Since Deliverables is generic, let's find the approach-page SectionCard first.
approach_page_start = content.find('id="approach-page"')
approach_page_end = content.find('id="footer-settings"')
if approach_page_start != -1 and approach_page_end != -1:
    approach_page_content = content[approach_page_start:approach_page_end]
    new_approach_page_content = re.sub(deliverables_title_pattern, unique_strengths_insertion + r'\1', approach_page_content, count=1)
    content = content[:approach_page_start] + new_approach_page_content + content[approach_page_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch applied.")
