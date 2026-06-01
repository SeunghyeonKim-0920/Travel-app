import re
import math

def parse_attractions():
    data = open('C:/Users/kseunghyeon/.gemini/antigravity/scratch/travel-app/mockData.js', encoding='utf-8').read()
    cities = ['seoul', 'jeju', 'tokyo', 'osaka', 'paris', 'london', 'newyork', 'barcelona', 'rome', 'bangkok', 'sydney', 'singapore', 'dubai', 'munich', 'prague', 'beijing', 'cairo', 'rio', 'vancouver']
    
    db = {}
    for i, city in enumerate(cities):
        start_pat = rf"{city}:\s*\{{"
        m_start = re.search(start_pat, data)
        if not m_start:
            continue
        start_idx = m_start.end()
        
        next_city = cities[i+1] if i+1 < len(cities) else "const MOCK_USER_PROFILES"
        if next_city == "const MOCK_USER_PROFILES":
            m_end = re.search(rf"{next_city}", data)
        else:
            m_end = re.search(rf"{next_city}:\s*\{{", data)
            
        end_idx = m_end.start() if m_end else len(data)
        
        city_block = data[start_idx:end_idx]
        
        db[city] = {}
        categories = ['healing', 'culture', 'activity', 'shopping', 'gourmet']
        for cat in categories:
            cat_start_pat = rf"{cat}:\s*\["
            m_cat_start = re.search(cat_start_pat, city_block)
            if not m_cat_start:
                db[city][cat] = []
                continue
            cat_start_idx = m_cat_start.end()
            cat_end_idx = city_block.find(']', cat_start_idx)
            if cat_end_idx == -1:
                cat_end_idx = len(city_block)
            cat_block = city_block[cat_start_idx:cat_end_idx]
            
            obj_pattern = re.compile(r'\{([^{}]+?)\}', re.DOTALL)
            items = []
            for obj_match in obj_pattern.finditer(cat_block):
                obj_str = obj_match.group(1)
                
                name_ko = re.search(r'name_ko:\s*"(.*?)"', obj_str)
                name_en = re.search(r'name_en:\s*"(.*?)"', obj_str)
                desc_ko = re.search(r'desc_ko:\s*"(.*?)"', obj_str)
                desc_en = re.search(r'desc_en:\s*"(.*?)"', obj_str)
                is_landmark = 'isLandmark: true' in obj_str
                
                if name_ko and name_en:
                    items.append({
                        'name_ko': name_ko.group(1),
                        'name_en': name_en.group(1),
                        'desc_ko': desc_ko.group(1) if desc_ko else '',
                        'desc_en': desc_en.group(1) if desc_en else '',
                        'isLandmark': is_landmark
                    })
            db[city][cat] = items
    return db

def get_attraction_coords(item):
    if not item:
        return {'x': 5.0, 'y': 5.0}
    name = item.get('name_en', '')
    hash1 = 0
    hash2 = 0
    for char in name:
        code = ord(char)
        hash1 = (hash1 * 31 + code) % 10007
        hash2 = (hash2 * 37 + code) % 10009
    x = (hash1 % 101) / 10.0
    y = (hash2 % 101) / 10.0
    return {'x': x, 'y': y}

def get_quadrant(item):
    if not item or item.get('isFallback'):
        return None
    coords = get_attraction_coords(item)
    if coords['x'] <= 5.0:
        return 1 if coords['y'] <= 5.0 else 3
    else:
        return 2 if coords['y'] <= 5.0 else 4

def is_cafe_item(item):
    name = ((item.get('name_ko') or '') + ' ' + (item.get('name_en') or '')).lower()
    cafe_keywords = [
        '카페', '디저트', '빙수', '찻집', '베이커리', '제과점', '커피', '라떼', '에스프레소', 
        '아이스크림', '젤라토', '젤라또', '초콜릿', '쿠키', '타르트', '와플', '케이크', '케잌', 
        '빵집', '밀크티', '티타임', '도넛', '마카롱', '크레페', '애프터눈 티', '애프터눈티', 
        '말차', '녹차', '홍차', '티하우스', '티 하우스', '티룸', '티 룸', '음료', '주스', '에이드',
        'cafe', 'dessert', 'bakery', 'coffee', 'espresso', 'gelato', 'ice cream', 
        'pastry', 'pastries', 'waffle', 'cake', 'donut', 'macaron', 'crepe', 'chocolate', 
        'cookie', 'sweet', 'afternoon tea', 'tea room', 'tea house', 'green tea', 
        'matcha', 'black tea', 'milk tea', 'herbal tea', 'juice', 'smoothie', 'beverage'
    ]
    return any(kw in name for kw in cafe_keywords)

db = parse_attractions()
for city in db:
    pools = db[city]
    counts = {
        1: {'s': 0, 'd': 0, 'c': 0},
        2: {'s': 0, 'd': 0, 'c': 0},
        3: {'s': 0, 'd': 0, 'c': 0},
        4: {'s': 0, 'd': 0, 'c': 0}
    }
    # Sightseeing
    for cat in ['healing', 'culture', 'activity', 'shopping']:
        for item in pools.get(cat, []):
            q = get_quadrant(item)
            if q:
                counts[q]['s'] += 1
    # Gourmet
    for item in pools.get('gourmet', []):
        q = get_quadrant(item)
        if q:
            if is_cafe_item(item):
                counts[q]['c'] += 1
            else:
                counts[q]['d'] += 1
    print(f"City: {city}")
    for q in sorted(counts.keys()):
        print(f"  Q{q}: Sightseeing={counts[q]['s']}, Diner={counts[q]['d']}, Cafe={counts[q]['c']}")
