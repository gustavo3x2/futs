import json
import re

file_path = "C:/Users/capexoto/.gemini/antigravity/brain/7cd404bb-d2da-4aff-b417-f322ea43ec3d/.system_generated/steps/18/output.txt"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

md_text = data.get("markdown", "")
lines = md_text.split('\n')

products = []
current_category = "Geral"
current_prod = {}

for idx, line in enumerate(lines):
    line = line.strip()
    if not line:
        continue
    
    # Category detection
    if line in ["Carnes Bovinas", "Kits", "Frango", "Suíno", "Peixe", "Linguiças e Espetinhos", "Bebidas", "Mercearia e Outros", "Produtos Especiais", "Carvão", "Churrasqueira", "Farinhas e Farofa", "Mandioca", "Enlatados", "Óleos", "Pão de Alho", "Torresmos", "Sal", "Queijos"]:
        current_category = line
        continue
        
    # Product name
    if line.startswith("### "):
        if current_prod:
            products.append(current_prod)
        current_prod = {
            "id": f"prod-{len(products)+1}",
            "name": line[4:].strip(),
            "category": current_category,
            "unit": "un",
            "price": 0.0,
            "imageUrl": ""
        }
        # Try to find description before price
        desc = []
        for j in range(idx+1, min(idx+5, len(lines))):
            nxt = lines[j].strip()
            if nxt.startswith("R$ "):
                break
            if nxt and not nxt.startswith("Adicionar") and not nxt.startswith("Disponível") and not nxt.startswith("Indisponível"):
                desc.append(nxt)
        if desc:
            current_prod["description"] = " ".join(desc)
        continue
        
    # Price
    if line.startswith("R$ "):
        price_str = line.split("R$ ")[1].split("/")[0]
        try:
            current_prod["price"] = float(price_str)
        except:
            pass
        if "/kg" in line:
            current_prod["unit"] = "kg"
        elif "/un" in line:
            current_prod["unit"] = "un"
            
    # Images are found above product names, but markdown format puts images separate.
    # We will just map the few images explicitly if they are Kits or Picanha
    if line.startswith("![Picanha]"):
        pass

if current_prod:
    products.append(current_prod)

# Output JSON
with open("d:/Antigravity/kit/src/data/products.json", "w", encoding="utf-8") as out:
    json.dump(products, out, ensure_ascii=False, indent=2)

print(f"Successfully parsed {len(products)} products and saved to src/data/products.json")
