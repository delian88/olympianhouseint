import codecs

with codecs.open("src/pages/LandingPage/Home.jsx", "r", "utf-8") as f:
    content = f.read()

lines = content.splitlines()

depth = 0
inside_home = False
for i, line in enumerate(lines):
    for char in line:
        if char == "{": depth += 1
        elif char == "}": depth -= 1
        
    if "function Home()" in line:
        inside_home = True
        
    if inside_home and depth == 0:
        print(f"Home closed at line {i+1}: {line}")
        # print the previous 10 lines
        for j in range(max(0, i-10), i+1):
            print(f"{j+1}: {lines[j]}")
        break
