import codecs

with codecs.open("original_home.jsx", "r", "utf-16") as f:
    orig = f.read()

s = orig.find("import React")
e = orig.find("return (\n    <div className=\"overflow-hidden")

top_block = orig[s:e]
lines = top_block.splitlines()

depth = 0
for i, line in enumerate(lines):
    for char in line:
        if char == "{": depth += 1
        elif char == "}": depth -= 1
        
        if depth == 0 and i > 28:
            print(f"Depth 0 at line {i+1}: {line}")
            break
