import re

file_path = "src/pages/Client-Dashboard/LandingPageManager.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove Intro and Travel block sections from services-page editor
intro_start = content.find('<div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">\n                <h3 className="text-lg font-bold text-foreground">Intro</h3>')
if intro_start != -1:
    intro_end = content.find('</div>', intro_start) + 6
    travel_start = content.find('<div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">\n                <h3 className="text-lg font-bold text-foreground">Travel block</h3>', intro_end)
    if travel_start != -1:
        travel_end = content.find('</div>', travel_start) + 6
        
        # Replace the entire grid container containing intro and travel
        # Find the <div className="grid gap-4 xl:grid-cols-2"> that encloses them
        grid_start = content.rfind('<div className="grid gap-4 xl:grid-cols-2">', 0, intro_start)
        grid_end = content.find('</div>', travel_end) + 6
        
        # New Showcase Section header fields
        replacement = """<div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Formats in Practice Section</h3>
                <Field label="Section title">
                  <TextInput value={draftConfig.servicesPage?.showcaseSection?.title || ""} onChange={(e) => updateServicesPage("showcaseSection", "title", e.target.value)} />
                </Field>
                <Field label="Section description">
                  <TextArea rows={4} value={draftConfig.servicesPage?.showcaseSection?.description || ""} onChange={(e) => updateServicesPage("showcaseSection", "description", e.target.value)} />
                </Field>
              </div>"""
              
        content = content[:grid_start] + replacement + content[grid_end:]
        print("Replaced Intro and Travel with Showcase Section editor")

# Check if there is an Add Item button for showcase, if not add one and delete item functionality
showcase_grid_start = content.find('{(draftConfig.servicesPage?.showcase || []).map((item, index) => (')
if showcase_grid_start != -1:
    showcase_grid_end = content.find('</div>\n          </div>\n        </SectionCard>', showcase_grid_start)
    if content.find('Add Showcase Item', showcase_grid_start, showcase_grid_end) == -1:
        # Add button after the grid
        add_btn = """
            <div className="flex justify-end mt-4">
              <button className="h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" onClick={(e) => {
                e.preventDefault();
                const next = [...(draftConfig.servicesPage?.showcase || [])];
                next.push({ title: "", description: "", image: "" });
                setDraftConfig(current => ({ ...current, servicesPage: { ...current.servicesPage, showcase: next } }));
              }}>
                Add Format Item
              </button>
            </div>
            """
        # find the end of the showcase grid mapping div
        mapping_end = content.find('</div>\n            <div className="grid gap-4 xl:grid-cols-2">', showcase_grid_start)
        # Actually it's just inside a grid div
        # Let's just append the button after the </div> of the grid
        grid_closing_index = content.find('</div>', content.find('})', showcase_grid_start)) + 6
        content = content[:grid_closing_index] + add_btn + content[grid_closing_index:]
        print("Added Add Format Item button")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
