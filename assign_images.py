import json
import os
import shutil
import glob

# Source folder with AI generated images
src_folder = r"C:\Users\capexoto\.gemini\antigravity\brain\7cd404bb-d2da-4aff-b417-f322ea43ec3d"

# Destination folder for public images
dest_folder = r"d:\Antigravity\kit\public\images"
os.makedirs(dest_folder, exist_ok=True)

# Define mapping
mapping = {
    "cat_beef": ["Carnes Bovinas", "Produtos Especiais"],
    "cat_chicken": ["Frango"],
    "cat_pork": ["Suíno", "Torresmos"],
    "cat_fish": ["Peixe"],
    "cat_sausage": ["Linguiças e Espetinhos"],
    "cat_generic": [
        "Carvão", "Enlatados", "Óleos", "Kits", "Temperos", 
        "Salgadinho Pura Pururuca", "Bebidas", "Acompanhamentos Alimentos", 
        "Queijos", "Farinhas e Farofa"
    ]
}

# Copy files and map to categories
category_image_url = {}

for prefix, categories in mapping.items():
    # Find the file
    matches = glob.glob(os.path.join(src_folder, f"{prefix}_*.png"))
    if matches:
        new_filename = f"{prefix}.png"
        shutil.copy(matches[0], os.path.join(dest_folder, new_filename))
        url = f"/images/{new_filename}"
        for cat in categories:
            category_image_url[cat] = url

# Open products.json
products_file = r"d:\Antigravity\kit\src\data\products.json"
with open(products_file, 'r', encoding='utf-8') as f:
    products = json.load(f)

# Update products
for p in products:
    cat = p.get('category', '')
    p['imageUrl'] = category_image_url.get(cat, "/images/cat_generic.png")

# Save products.json
with open(products_file, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Imagens processadas e products.json atualizado com sucesso!")
