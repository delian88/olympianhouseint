file_path = "src/pages/Client-Dashboard/LandingPageManager.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

bad_str = """                  />
                </div>
            <div className="flex justify-end mt-4">"""

good_str = """                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">"""

content = content.replace(bad_str, good_str)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Syntax fixed")
