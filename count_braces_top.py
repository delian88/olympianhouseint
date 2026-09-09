import codecs

with codecs.open("original_home.jsx", "r", "utf-16") as f:
    orig = f.read()

s = orig.find("import React")
e = orig.find("return (\n    <div className=\"overflow-hidden")

top_block = orig[s:e]

depth = 0
for char in top_block:
    if char == "{": depth += 1
    elif char == "}": depth -= 1

print(f"Top block depth: {depth}")
