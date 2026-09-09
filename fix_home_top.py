import codecs

with codecs.open("original_home.jsx", "r", "utf-16") as f:
    orig = f.read()

s = orig.find("import React")
e = orig.find("return (\n    <div className=\"overflow-hidden")

top_block = orig[s:e]

with codecs.open("src/pages/LandingPage/Home.jsx", "r", "utf-8") as f:
    curr = f.read()

new_content = top_block + curr

with codecs.open("src/pages/LandingPage/Home.jsx", "w", "utf-8") as f:
    f.write(new_content)
print("Top block restored.")
