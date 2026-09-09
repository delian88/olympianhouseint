import re

with open('original_home.jsx', 'r', encoding='utf-16') as f:
    content = f.read()

start = content.find('return (')
print("Found return at:", start)
end = content.find('export default Home;')
return_block = content[start:end]

with open('extracted_return.txt', 'w', encoding='utf-8') as f:
    f.write(return_block)
