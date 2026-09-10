import re

file_path = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

bg_panel = \"\"\"
          {/* BACKGROUND PAGE */}
          <SectionCard id=\"background-page\" title=\"Background Page\">
            <div className=\"space-y-8\">
              {/* Hero */}
              <div className=\"space-y-4 rounded-2xl border border-border bg-muted/40 p-4\">
                <h3 className=\"text-lg font-bold text-foreground\">Hero block</h3>
                <Field label=\"Badge eyebrow\">
                  <TextInput value={draftConfig.backgroundPage?.hero?.badgeEyebrow || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"badgeEyebrow\", e.target.value)} />
                </Field>
                <Field label=\"Badge description\">
                  <TextArea rows={2} value={draftConfig.backgroundPage?.hero?.badgeDescription || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"badgeDescription\", e.target.value)} />
                </Field>
                <Field label=\"Title\">
                  <TextInput value={draftConfig.backgroundPage?.hero?.title || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"title\", e.target.value)} />
                </Field>
                <Field label=\"Description\">
                  <TextArea rows={3} value={draftConfig.backgroundPage?.hero?.description || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"description\", e.target.value)} />
                </Field>
                <div className=\"grid gap-3 sm:grid-cols-2\">
                  <Field label=\"Primary CTA label\">
                    <TextInput value={draftConfig.backgroundPage?.hero?.primaryCtaLabel || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"primaryCtaLabel\", e.target.value)} />
                  </Field>
                  <Field label=\"Primary CTA link\">
                    <TextInput value={draftConfig.backgroundPage?.hero?.primaryCtaHref || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"primaryCtaHref\", e.target.value)} />
                  </Field>
                  <Field label=\"Secondary CTA label\">
                    <TextInput value={draftConfig.backgroundPage?.hero?.secondaryCtaLabel || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"secondaryCtaLabel\", e.target.value)} />
                  </Field>
                  <Field label=\"Secondary CTA link\">
                    <TextInput value={draftConfig.backgroundPage?.hero?.secondaryCtaHref || \"\"} onChange={(e) => updateBackgroundPageSection(\"hero\", \"secondaryCtaHref\", e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* Founder */}
              <div className=\"space-y-4 rounded-2xl border border-border bg-muted/40 p-4\">
                <h3 className=\"text-lg font-bold text-foreground\">A Word from the Founder</h3>
                <Field label=\"Title\">
                  <TextInput value={draftConfig.backgroundPage?.founder?.title || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"title\", e.target.value)} />
                </Field>
                <Field label=\"Description (Name & Role)\">
                  <TextInput value={draftConfig.backgroundPage?.founder?.description || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"description\", e.target.value)} />
                </Field>
                <Field label=\"Paragraph 1\">
                  <TextArea rows={3} value={draftConfig.backgroundPage?.founder?.paragraph1 || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"paragraph1\", e.target.value)} />
                </Field>
                <Field label=\"Paragraph 2\">
                  <TextArea rows={4} value={draftConfig.backgroundPage?.founder?.paragraph2 || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"paragraph2\", e.target.value)} />
                </Field>
                <Field label=\"Paragraph 3\">
                  <TextArea rows={4} value={draftConfig.backgroundPage?.founder?.paragraph3 || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"paragraph3\", e.target.value)} />
                </Field>
                <Field label=\"Quote\">
                  <TextArea rows={2} value={draftConfig.backgroundPage?.founder?.quote || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"quote\", e.target.value)} />
                </Field>
                <Field label=\"Quote Author\">
                  <TextInput value={draftConfig.backgroundPage?.founder?.quoteAuthor || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"quoteAuthor\", e.target.value)} />
                </Field>
                <Field label=\"Quote Role\">
                  <TextInput value={draftConfig.backgroundPage?.founder?.quoteRole || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"quoteRole\", e.target.value)} />
                </Field>
                <div className=\"grid gap-3 sm:grid-cols-2\">
                  <Field label=\"CTA label\">
                    <TextInput value={draftConfig.backgroundPage?.founder?.ctaLabel || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"ctaLabel\", e.target.value)} />
                  </Field>
                  <Field label=\"CTA link\">
                    <TextInput value={draftConfig.backgroundPage?.founder?.ctaHref || \"\"} onChange={(e) => updateBackgroundPageSection(\"founder\", \"ctaHref\", e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* Foundation & Vision Grid */}
              <div className=\"grid gap-4 xl:grid-cols-2\">
                <div className=\"space-y-4 rounded-2xl border border-border bg-muted/40 p-4\">
                  <h3 className=\"text-lg font-bold text-foreground\">Our foundation</h3>
                  <Field label=\"Eyebrow\">
                    <TextInput value={draftConfig.backgroundPage?.foundation?.eyebrow || \"\"} onChange={(e) => updateBackgroundPageSection(\"foundation\", \"eyebrow\", e.target.value)} />
                  </Field>
                  <Field label=\"Title\">
                    <TextInput value={draftConfig.backgroundPage?.foundation?.title || \"\"} onChange={(e) => updateBackgroundPageSection(\"foundation\", \"title\", e.target.value)} />
                  </Field>
                  <Field label=\"Description\">
                    <TextArea rows={5} value={draftConfig.backgroundPage?.foundation?.description || \"\"} onChange={(e) => updateBackgroundPageSection(\"foundation\", \"description\", e.target.value)} />
                  </Field>
                </div>
                <div className=\"space-y-4 rounded-2xl border border-border bg-muted/40 p-4\">
                  <h3 className=\"text-lg font-bold text-foreground\">What drives us</h3>
                  <Field label=\"Eyebrow\">
                    <TextInput value={draftConfig.backgroundPage?.vision?.eyebrow || \"\"} onChange={(e) => updateBackgroundPageSection(\"vision\", \"eyebrow\", e.target.value)} />
                  </Field>
                  <Field label=\"Title\">
                    <TextInput value={draftConfig.backgroundPage?.vision?.title || \"\"} onChange={(e) => updateBackgroundPageSection(\"vision\", \"title\", e.target.value)} />
                  </Field>
                  <Field label=\"Description\">
                    <TextArea rows={5} value={draftConfig.backgroundPage?.vision?.description || \"\"} onChange={(e) => updateBackgroundPageSection(\"vision\", \"description\", e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>
          </SectionCard>\n\n"""

# Define the helper function for BackgroundPage
helper_function = \"\"\"
  const updateBackgroundPageSection = (section, field, value) => {
    setDraftConfig((prev) => ({
      ...prev,
      backgroundPage: {
        ...(prev.backgroundPage || {}),
        [section]: {
          ...(prev.backgroundPage?.[section] || {}),
          [field]: value,
        },
      },
    }));
  };
\"\"\"

if 'updateBackgroundPageSection' not in content:
    # insert helper function right after updateAboutPageSection
    target = 'const updateAboutPageSection'
    idx = content.find(target)
    if idx != -1:
        # find the end of this function (it ends with })
        # let's just insert it before updateTheme
        theme_idx = content.find('const updateTheme')
        if theme_idx != -1:
            content = content[:theme_idx] + helper_function + content[theme_idx:]

if 'id=\"background-page\"' not in content:
    # insert before theme-settings
    theme_settings_idx = content.find('<SectionCard id=\"theme-settings\"')
    if theme_settings_idx != -1:
        content = content[:theme_settings_idx] + bg_panel + content[theme_settings_idx:]
    else:
        # append before closing tag of container if theme-settings not found
        container_close_idx = content.rfind('</motion.div>')
        content = content[:container_close_idx] + bg_panel + content[container_close_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("LandingPageManager.jsx updated with Background Page editor.")
