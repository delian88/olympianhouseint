with open('src/pages/Client-Dashboard/LandingPageManager.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if line.startswith('  return ('):
        print(f"Line {i+1}: {line.strip()}")
