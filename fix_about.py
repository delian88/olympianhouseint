import re

file_manager = r'c:\Users\PC\OHI-UPDATED\src\pages\Client-Dashboard\LandingPageManager.jsx'
with open(file_manager, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add eyebrow to home-about
home_about_insert = r"""
              <Field label="Eyebrow"><TextInput value={draftConfig.homePage?.about?.eyebrow || ""} onChange={(e) => updateHomePage("about", "eyebrow", e.target.value)} /></Field>"""

content = re.sub(
    r'(<SectionCard id="home-about"[^>]+>.*?<div className="space-y-4">)',
    r'\1' + home_about_insert,
    content,
    flags=re.DOTALL
)

# 2. Add missing fields to about-page hero
about_page_hero_insert = r"""
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
                />"""

# Let's insert after Hero title/description/eyebrow/badgeDescription
content = re.sub(
    r'(<Field label="Hero badge description">.*?</Field>\s*</div>)',
    r'\1' + '\n              <div className="grid gap-4 xl:grid-cols-2">' + about_page_hero_insert + '\n              </div>',
    content,
    flags=re.DOTALL
)

with open(file_manager, 'w', encoding='utf-8') as f:
    f.write(content)


file_about = r'c:\Users\PC\OHI-UPDATED\src\pages\LandingPage\CompanyProfile\AboutPage.jsx'
with open(file_about, 'r', encoding='utf-8') as f:
    content_about = f.read()

content_about = content_about.replace('heroImage={aboutHeroImage}', 'heroImage={hero.image ?? aboutHeroImage}')

with open(file_about, 'w', encoding='utf-8') as f:
    f.write(content_about)

print("Done patching about fields.")
