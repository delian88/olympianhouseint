import re

with open('src/pages/LandingPage/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the start of the return statement
return_start = content.find('return (\n    <div className="overflow-hidden')
if return_start == -1:
    print('Could not find return start')
    exit(1)

# We want to replace everything inside the main div with a sectionMap and map
# First, let's extract the sections.
# We will just write a script that does this if possible, but maybe doing it with a AST parser is better?
# actually, maybe I can just do it manually with multi_replace_file_content if I know the line numbers.
