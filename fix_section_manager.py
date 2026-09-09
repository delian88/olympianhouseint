import codecs

with codecs.open("src/pages/Client-Dashboard/SectionOrderManager.jsx", "r", "utf-8") as f:
    content = f.read()

content = content.replace(
    "{ id: 'turn-programme-into-proof', label: 'Turn Programme into Proof' },",
    "{ id: 'final-cta', label: 'Final CTA / Turn Programme into Proof' },\n  { id: 'programmes', label: 'Programmes' },"
)

with codecs.open("src/pages/Client-Dashboard/SectionOrderManager.jsx", "w", "utf-8") as f:
    f.write(content)
print("Fixed SectionOrderManager.jsx")
