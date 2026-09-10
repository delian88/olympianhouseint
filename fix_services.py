import re

file_path = "src/pages/LandingPage/CompanyProfile/ServicesPage.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace hardcoded serviceShowcase with the config one
# Remove local serviceShowcase and serviceFormats
content = re.sub(r'const serviceFormats = \[.*?\];', '', content, flags=re.DOTALL)
content = re.sub(r'const serviceShowcase = \[.*?\];', '', content, flags=re.DOTALL)

# Replace the usage of serviceShowcase
content = content.replace('{serviceShowcase.map((item, index) => (', '{(servicesPage.showcase || []).map((item, index) => (')

# Replace the SectionHeader hardcoded strings
content = content.replace('title="Formats in practice"', 'title={servicesPage.showcaseSection?.title ?? "Formats in practice"}')
content = content.replace('description="A closer look at how OHI adapts each format to the communication objective, audience, and sector."', 'description={servicesPage.showcaseSection?.description ?? "A closer look at how OHI adapts each format to the communication objective, audience, and sector."}')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated ServicesPage.jsx")
