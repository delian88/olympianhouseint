import codecs

with codecs.open("src/pages/LandingPage/Home.jsx", "r", "utf-8") as f:
    content = f.read()

lines = content.splitlines()
depth = 0
for i, line in enumerate(lines):
    for char in line:
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and i < 1520:
                print(f"Function closed early at line {i+1}: {line}")
