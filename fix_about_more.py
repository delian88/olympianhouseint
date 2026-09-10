import re

# 1. Update AboutPage.jsx
file_about = r'c:\Users\PC\OHI-UPDATED\src\pages\LandingPage\CompanyProfile\AboutPage.jsx'
with open(file_about, 'r', encoding='utf-8') as f:
    content_about = f.read()

# Replace hardcoded "What we do" box
content_about = content_about.replace(
    'What we do',
    '{intro.whatWeDoLabel ?? "What we do"}'
)
content_about = content_about.replace(
    'Clear communication, trusted delivery, and audience-ready outputs.',
    '{intro.whatWeDoText ?? "Clear communication, trusted delivery, and audience-ready outputs."}'
)

# Replace the first usage of close.title and close.description in intro
# Specifically:
# {close.title ?? "What OHI stands for"}
# {close.description ?? "OHI combines strategy, production, and editorial craft to help development work communicate with confidence across Africa."}
content_about = re.sub(
    r'\{close\.title \?\? "What OHI stands for"\}',
    r'{intro.closeTitle ?? "What OHI stands for"}',
    content_about,
    count=1
)

# For description, it's a bit tricky because the fallback text is identical in both places.
# Let's target the one inside the intro block.
intro_desc_pattern = r'(<div className="bg-\[#0a0c12\].*?)\{close\.description \?\? (.*?\})'
content_about = re.sub(
    intro_desc_pattern,
    r'\1{intro.closeDescription ?? \2',
    content_about,
    flags=re.DOTALL
)

# Map snapshot.missionItems
# Current:
#                 <div className="mt-5 space-y-4">
#                   <div className="bg-white/8 p-5">
#                     <h3 className="text-base font-semibold text-white">Field production</h3>
#                     ...
#                   </div>
#                 </div>

mission_items_code = r"""
                <div className="mt-5 space-y-4">
                  {(snapshot.missionItems ?? [
                    { title: "Field production", description: "Story capture in communities, project sites, and institutional spaces." },
                    { title: "Post-production", description: "Editing, motion, and finishing that keep the story clear and polished." }
                  ]).map((item, index) => (
                    <div key={index} className="bg-white/8 p-5">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>"""

content_about = re.sub(
    r'<div className="mt-5 space-y-4">.*?</div>\s*</Reveal>',
    mission_items_code + '\n              </Reveal>',
    content_about,
    flags=re.DOTALL
)

with open(file_about, 'w', encoding='utf-8') as f:
    f.write(content_about)


# 2. Update LandingPageManager.jsx
file_manager = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_manager, 'r', encoding='utf-8') as f:
    content_manager = f.read()

# Add whatWeDoLabel, whatWeDoText, closeTitle, closeDescription to intro block
intro_insert = r"""
                  <Field label="What We Do Label">
                    <TextInput value={draftConfig.aboutPage?.intro?.whatWeDoLabel || ""} onChange={(e) => updateAboutPageSection("intro", "whatWeDoLabel", e.target.value)} />
                  </Field>
                  <Field label="What We Do Text">
                    <TextArea rows={3} value={draftConfig.aboutPage?.intro?.whatWeDoText || ""} onChange={(e) => updateAboutPageSection("intro", "whatWeDoText", e.target.value)} />
                  </Field>
                  <Field label="Dark Box Title">
                    <TextInput value={draftConfig.aboutPage?.intro?.closeTitle || ""} onChange={(e) => updateAboutPageSection("intro", "closeTitle", e.target.value)} />
                  </Field>
                  <Field label="Dark Box Text">
                    <TextArea rows={3} value={draftConfig.aboutPage?.intro?.closeDescription || ""} onChange={(e) => updateAboutPageSection("intro", "closeDescription", e.target.value)} />
                  </Field>"""

content_manager = re.sub(
    r'(<Field label="Editorial label">.*?<TextArea[^>]+editorialText.*?</Field>)',
    r'\1' + intro_insert,
    content_manager,
    flags=re.DOTALL
)

# Add missionItems to snapshot block
snapshot_insert = r"""
                  <h3 className="text-lg font-bold text-foreground mt-8">Mission Items</h3>
                  {(draftConfig.aboutPage?.snapshot?.missionItems ?? []).map((item, index) => (
                    <div key={index} className="space-y-4 rounded-xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Item {index + 1}</h4>
                        <button
                          onClick={() => {
                            const next = [...(draftConfig.aboutPage?.snapshot?.missionItems ?? [])];
                            next.splice(index, 1);
                            updateAboutPageSection("snapshot", "missionItems", next);
                          }}
                          className="text-destructive text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <Field label="Title"><TextInput value={item.title || ""} onChange={(e) => {
                        const next = [...(draftConfig.aboutPage?.snapshot?.missionItems ?? [])];
                        next[index].title = e.target.value;
                        updateAboutPageSection("snapshot", "missionItems", next);
                      }} /></Field>
                      <Field label="Description"><TextArea rows={3} value={item.description || ""} onChange={(e) => {
                        const next = [...(draftConfig.aboutPage?.snapshot?.missionItems ?? [])];
                        next[index].description = e.target.value;
                        updateAboutPageSection("snapshot", "missionItems", next);
                      }} /></Field>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => {
                    const next = [...(draftConfig.aboutPage?.snapshot?.missionItems ?? []), { title: "", description: "" }];
                    updateAboutPageSection("snapshot", "missionItems", next);
                  }}>
                    Add Mission Item
                  </Button>"""

# Insert after snapshot stats
content_manager = re.sub(
    r'(<Button variant="outline" onClick=\{\(\) => \{\s*const next = \[\.\.\.\(draftConfig\.aboutPage\?\.snapshot\?\.stats \?\? \[\]\), \{ label: "", value: "" \}\];\s*updateAboutPageSection\("snapshot", "stats", next\);\s*\}\}>\s*Add Stat\s*</Button>\s*</div>)',
    r'\1\n                  <div className="space-y-4">' + snapshot_insert + '\n                  </div>',
    content_manager,
    flags=re.DOTALL
)

with open(file_manager, 'w', encoding='utf-8') as f:
    f.write(content_manager)

print("Done patching extra about fields.")
