import sys
import re
import random
import math

sys.stdout.reconfigure(encoding='utf-8')

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
        if i+1 < len(cities):
            m_end = re.search(rf"\b{next_city}\b\s*:\s*\{{", data[start_idx:])
            end_idx = start_idx + m_end.start() if m_end else len(data)
        else:
            m_end = re.search(rf"\b{next_city}\b", data[start_idx:])
            end_idx = start_idx + m_end.start() if m_end else len(data)
        
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

def is_night_only(item):
    name_ko = item.get('name_ko') or ''
    name_en = item.get('name_en') or ''
    desc_ko = item.get('desc_ko') or ''
    desc_en = item.get('desc_en') or ''
    
    name_ko_lower = name_ko.lower()
    name_en_lower = name_en.lower()
    desc_ko_lower = desc_ko.lower()
    desc_en_lower = desc_en.lower()

    # 1. Check NAME against all night keywords
    clean_name_en = name_en_lower.replace(',', ' ').replace('.', ' ').replace('&', ' ').replace('-', ' ').replace('/', ' ')
    words_name_en = clean_name_en.split()
    
    night_words_en = ['night', 'pub', 'pubs', 'beer', 'beers', 'club', 'clubs', 'bar', 'bars', 'dinner', 'dinners', 'rooftop', 'brewery', 'breweries', 'izakaya', 'diner', 'diners', 'sunset']
    has_night_en_name = any(w in night_words_en for w in words_name_en)
    
    night_keywords_ko = ['야시장', '야경', '야간', '펍', '맥주', '디너', '이자카야', '루프탑', '클럽', '저녁', '노을', '일몰', '석양', '선셋', '심야']
    has_night_ko_name = any(kw in name_ko_lower for kw in night_keywords_ko)
    
    has_bar_ko_name = False
    words_ko_name = name_ko_lower.split()
    if '바' in words_ko_name or any(w.startswith('바(') or w.endswith(')바') for w in words_ko_name):
        if not any(fp in name_ko_lower for fp in ['바다', '바닥', '바람', '바토무슈', '바이에른', '바티칸', '바르셀로나', '오다이바', '블타바', '파블로바', '바스타키아', '바하']):
            has_bar_ko_name = True
            
    # 2. Check DESCRIPTION ONLY against strict dinner/sunset/night-only keywords
    clean_desc_en = desc_en_lower.replace(',', ' ').replace('.', ' ').replace('&', ' ').replace('-', ' ').replace('/', ' ')
    words_desc_en = clean_desc_en.split()
    
    strict_desc_en = ['dinner', 'dinners', 'diner', 'diners', 'sunset', 'sunsets', 'nightlife', 'night-only', 'midnight']
    has_night_en_desc = any(w in strict_desc_en for w in words_desc_en)
    
    strict_desc_ko = ['저녁', '디너', '노을', '일몰', '석양', '선셋', '야경', '야간', '야시장', '심야']
    has_night_ko_desc = any(kw in desc_ko_lower for kw in strict_desc_ko)

    # Combine
    is_night = has_night_en_name or has_night_ko_name or has_bar_ko_name or has_night_en_desc or has_night_ko_desc

    # Exclusions (apply globally to keep them daytime unless they explicitly contain night/dinner/sunset)
    is_sports_club = any(sc in name_ko_lower for sc in ['카약 클럽', '요트 클럽', '보트 클럽', '서핑 클럽'])
    is_beer_cosmetics = '맥주 샴푸' in name_ko_lower or '맥주 화장품' in name_ko_lower
    is_daytime_coffee = any(c in name_ko_lower for c in ['에스프레소', '커피', '카페', '브런치'])

    if is_sports_club or is_beer_cosmetics or is_daytime_coffee:
        text_ko = (name_ko + ' ' + desc_ko).lower()
        if not any(kw in text_ko for kw in ['야간', '야경', '야시장', '저녁', '디너', '노을', '일몰', '석양', '선셋', '심야']):
            return False

    return is_night

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

def get_quadrant_with_most_items(pool):
    if not pool:
        return 1
    counts = {1: 0, 2: 0, 3: 0, 4: 0}
    for item in pool:
        q = get_quadrant(item)
        if q is not None:
            counts[q] += 1
    max_q = 1
    max_count = -1
    for q in range(1, 5):
        if counts[q] > max_count:
            max_count = counts[q]
            max_q = q
    return max_q

def get_distance(item1, item2):
    c1 = item1 if (item1 and 'x' in item1 and 'y' in item1) else get_attraction_coords(item1)
    c2 = item2 if (item2 and 'x' in item2 and 'y' in item2) else get_attraction_coords(item2)
    dx = c1['x'] - c2['x']
    dy = c1['y'] - c2['y']
    return math.sqrt(dx*dx + dy*dy)

def simulate_build_course_structure(db, city_id, days, preferences):
    city_pools = db[city_id]
    
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

    landmarks = []
    sightseeing_categories = ['healing', 'culture', 'activity', 'shopping']
    for cat in sightseeing_categories:
        for att in city_pools.get(cat, []):
            if att.get('isLandmark'):
                if not any(l['name_en'] == att['name_en'] for l in landmarks):
                    landmarks.append(att)

    preferred = []
    others = []
    for cat in sightseeing_categories:
        is_pref = cat in preferences
        for att in city_pools.get(cat, []):
            if att.get('isLandmark'):
                continue
            if is_pref:
                if not any(p['name_en'] == att['name_en'] for p in preferred):
                    preferred.append(att)
            else:
                if not any(o['name_en'] == att['name_en'] for o in others):
                    others.append(att)

    random.shuffle(preferred)
    random.shuffle(others)

    day_landmarks = [l for l in landmarks if not is_night_only(l)]
    night_landmarks = [l for l in landmarks if is_night_only(l)]

    day_landmarks_day1 = day_landmarks[:2]
    night_landmarks_day1 = night_landmarks[:1]

    unused_day_landmarks = day_landmarks[2:]
    unused_night_landmarks = night_landmarks[1:]

    day_preferred = [att for att in preferred if not is_night_only(att)]
    night_preferred = [att for att in preferred if is_night_only(att)]
    day_others = [att for att in others if not is_night_only(att)]
    night_others = [att for att in others if is_night_only(att)]

    day_sightseeing = unused_day_landmarks + day_preferred + day_others
    night_sightseeing = unused_night_landmarks + night_preferred + night_others

    gourmet_pool = city_pools.get('gourmet', [])
    cafes = [item for item in gourmet_pool if is_cafe_item(item)]
    diners = [item for item in gourmet_pool if not is_cafe_item(item)]

    random.shuffle(cafes)
    random.shuffle(diners)

    day_diners = [item for item in diners if not is_night_only(item)]
    night_diners = [item for item in diners if is_night_only(item)]

    day_cafes = [item for item in cafes if not is_night_only(item)]

    QUADRANT_PREFERENCES = {
        1: [1, 2, 3, 4],
        2: [2, 1, 4, 3],
        3: [3, 1, 4, 2],
        4: [4, 2, 3, 1]
    }

    def pull_closest_item(from_item, array, preferred_quadrant=None):
        if not array:
            return None
        min_idx = -1
        min_dist = float('inf')

        order = QUADRANT_PREFERENCES.get(preferred_quadrant, [1, 2, 3, 4]) if preferred_quadrant else [1, 2, 3, 4]

        # Try each quadrant in preference order
        for q in order:
            for i, item in enumerate(array):
                if get_quadrant(item) == q:
                    dist = get_distance(from_item, item) if from_item else 0
                    if dist < min_dist:
                        min_dist = dist
                        min_idx = i
            if min_idx != -1:
                break

        # Fallback: if no item is in any quadrant of the preference order, find closest overall
        if min_idx == -1:
            min_dist = float('inf')
            for i, item in enumerate(array):
                dist = get_distance(from_item, item) if from_item else 0
                if dist < min_dist:
                    min_dist = dist
                    min_idx = i

        item = array[min_idx]
        array.pop(min_idx)
        return item

    def get_sightseeing_spot(from_item, is_night_slot, preferred_quadrant):
        pool = night_sightseeing if is_night_slot else day_sightseeing
        if pool:
            return pull_closest_item(from_item, pool, preferred_quadrant)
        if is_night_slot and day_sightseeing:
            return pull_closest_item(from_item, day_sightseeing, preferred_quadrant)
        return {
            'name_ko': "시내 자유 관광",
            'name_en': "Downtown Free Sightseeing",
            'desc_ko': "도시의 숨은 매력을 발견하며 여유롭게 거리를 탐방하는 시간",
            'desc_en': "Explore the city's hidden streets and neighborhoods at your own leisure.",
            'isFallback': True
        }

    MEAL_FALLBACKS = {
        'ko': {
            'lunch': [
                { 'name': "현지 추천 숨은 맛집 점심 식사", 'desc': "현지 가이드가 추천하는 숨겨진 로컬 맛집에서 즐기는 든든한 점심 식사" },
                { 'name': "트렌디한 로컬 델리 점심 식사", 'desc': "현지 젊은이들에게 인기 있는 감각적인 인테리어의 식당에서 즐기는 가벼운 식사" },
                { 'name': "전통 로컬 음식점 점심 식사", 'desc': "이 지역 고유의 조리법과 전통 맛을 고수하는 유서 깊은 식당에서의 점심 식사" },
                { 'name': "시내 중심가 패밀리 레스토랑 점심 식사", 'desc': "쾌적하고 넓은 공간에서 다양한 로컬 메뉴를 한 번에 맛볼 수 있는 점심 식사" },
                { 'name': "정갈한 로컬 비스트로 점심 식사", 'desc': "신선한 현지 유기농 식재료를 사용한 정갈하고 건강한 맛의 점심 식사" }
            ],
            'coffee': [
                { 'name': "전망 좋은 카페 휴식 및 커피", 'desc': "시내 전망이나 아름다운 풍경을 조망하며 시원한 에스프레소 한 잔의 여유" },
                { 'name': "감성적인 골목길 디저트 카페 휴식", 'desc': "아기자기한 분위기의 골목길 숨겨진 카페에서 시그니처 커피와 디저트 향유" },
                { 'name': "유서 깊은 헤리티지 티룸 커피", 'desc': "앤티크한 소품들이 가득한 전통 찻집 또는 베이커리 카페에서 따뜻한 티타임" },
                { 'name': "모던한 로스터리 카페 휴식", 'desc': "직접 로스팅한 원두의 깊은 향을 만끽하며 여유롭게 즐기는 오후의 티타임" },
                { 'name': "로컬 에스프레소 바 스탠딩 커피", 'desc': "현지인들처럼 바에 서서 가볍게 에스프레소 한 잔을 마시며 리프레시" }
            ],
            'dinner': [
                { 'name': "로맨틱 오션뷰/시티뷰 저녁 식사", 'desc': "아름다운 도시의 야경이나 바다를 배경으로 즐기는 로맨틱하고 특별한 저녁 식사" },
                { 'name': "추천 파인다이닝 그릴 레스토랑 식사", 'desc': "엄선된 그릴 메뉴와 와인 한 잔을 곁들여 하루의 피로를 푸는 저녁 식사" },
                { 'name': "현지인 전용 숨겨진 로컬 펍 저녁 식사", 'desc': "왁자지껄하고 활기찬 분위기에서 로컬 맥주와 캐주얼한 안주를 함께 즐기는 저녁 식사" },
                { 'name': "이색적인 아시안/퓨전 비스트로 저녁 식사", 'desc': "현지 식재료와 글로벌 요리법이 조화를 이룬 독창적인 퓨전 저녁 만찬" },
                { 'name': "강변/야외 테라스 분위기 맛집 저녁 식사", 'desc': "시원한 바람을 맞으며 야외 테라스나 야외 정원에서 여유롭게 즐기는 저녁 코스 요리" }
            ]
        },
        'en': {
            'lunch': [
                { 'name': "Recommended Local Hidden Gem Lunch", 'desc': "Savor a hearty lunch at a hidden gem highly recommended by local guides." },
                { 'name': "Trendy Local Deli & Bistro Lunch", 'desc': "Enjoy a casual, delicious meal at a hip restaurant popular among local youths." },
                { 'name': "Traditional Heritage Restaurant Lunch", 'desc': "Taste authentic recipes passed down through generations in a historic diner." },
                { 'name': "Downtown Central Family Dining Lunch", 'desc': "Relax and sample diverse local dishes in a spacious, comfortable eatery." },
                { 'name': "Organic Local Bistro Lunch", 'desc': "Indulge in a healthy, neatly served lunch made from fresh, farm-to-table local ingredients." }
            ],
            'coffee': [
                { 'name': "Scenic View Cafe Break & Coffee", 'desc': "Unwind with a fresh espresso while enjoying sweeping cityscapes or scenic views." },
                { 'name': "Cozy Alleyway Dessert Cafe Rest", 'desc': "Sip specialty coffee and taste exquisite desserts in a charming, quiet alleyway cafe." },
                { 'name': "Historic Heritage Tea Room & Bakery", 'desc': "Enjoy warm tea and freshly baked goods in a classical, antique-styled salon." },
                { 'name': "Modern Roastery Cafe Coffee Time", 'desc': "Relax with a cup of freshly roasted coffee, taking in the rich aroma." },
                { 'name': "Local Espresso Bar Quick Refreshment", 'desc': "Stand at the bar for a quick espresso shot and sweet pastry like a true local." }
            ],
            'dinner': [
                { 'name': "Romantic City/Ocean View Dinner", 'desc': "Dine against the backdrop of beautiful city night lights or gentle ocean waves." },
                { 'name': "Recommended Fine Dining Grill Dinner", 'desc': "Enjoy premium grilled dishes paired with a fine glass of wine to wrap up your day." },
                { 'name': "Vibrant Local Pub & Tavern Dinner", 'desc': "Experience local nightlife with casual pub dishes and fresh draft beer." },
                { 'name': "Exotic Asian/Fusion Bistro Feast", 'desc': "Savor unique fusion dishes blending local ingredients with international culinary styles." },
                { 'name': "Riverside/Outdoor Terrace Dining", 'desc': "Enjoy a pleasant multi-course dinner on an open-air deck with cool breezes." }
            ]
        }
    }

    def get_diner_spot(day, meal_type, from_item, preferred_quadrant):
        if meal_type == 'lunch':
            if day_diners:
                return pull_closest_item(from_item, day_diners, preferred_quadrant)
            else:
                idx = (day - 1) % 5
                return {
                    'name_ko': MEAL_FALLBACKS['ko']['lunch'][idx]['name'],
                    'name_en': MEAL_FALLBACKS['en']['lunch'][idx]['name'],
                    'desc_ko': MEAL_FALLBACKS['ko']['lunch'][idx]['desc'],
                    'desc_en': MEAL_FALLBACKS['en']['lunch'][idx]['desc'],
                    'isFallback': True
                }
        else:
            pool = night_diners if night_diners else day_diners
            if pool:
                return pull_closest_item(from_item, pool, preferred_quadrant)
            else:
                idx = (day - 1) % 5
                return {
                    'name_ko': MEAL_FALLBACKS['ko']['dinner'][idx]['name'],
                    'name_en': MEAL_FALLBACKS['en']['dinner'][idx]['name'],
                    'desc_ko': MEAL_FALLBACKS['ko']['dinner'][idx]['desc'],
                    'desc_en': MEAL_FALLBACKS['en']['dinner'][idx]['desc'],
                    'isFallback': True
                }

    def get_cafe_spot(day, from_item, preferred_quadrant):
        if day_cafes:
            return pull_closest_item(from_item, day_cafes, preferred_quadrant)
        else:
            idx = (day - 1) % 5
            return {
                'name_ko': MEAL_FALLBACKS['ko']['coffee'][idx]['name'],
                'name_en': MEAL_FALLBACKS['en']['coffee'][idx]['name'],
                'desc_ko': MEAL_FALLBACKS['ko']['coffee'][idx]['desc'],
                'desc_en': MEAL_FALLBACKS['en']['coffee'][idx]['desc'],
                'isFallback': True
            }

    daily_sightseeing_counts = []
    if days == 1: daily_sightseeing_counts = [4]
    elif days == 2: daily_sightseeing_counts = [4, 4]
    elif days == 3: daily_sightseeing_counts = [4, 4, 4]
    elif days == 4: daily_sightseeing_counts = [4, 4, 4, 4]
    elif days == 5: daily_sightseeing_counts = [4, 4, 4, 4, 4]
    elif days == 6: daily_sightseeing_counts = [4, 4, 3, 3, 3, 3]
    elif days == 7: daily_sightseeing_counts = [3, 3, 3, 3, 3, 3, 3]

    day_plans = []
    for d in range(1, days + 1):
        count = daily_sightseeing_counts[d-1] if d-1 < len(daily_sightseeing_counts) else 3
        raw_activities = []
        preferred_quadrant = None
        if d > 1:
            preferred_quadrant = get_quadrant_with_most_items(day_sightseeing)
        
        if d == 1:
            s1 = day_landmarks_day1[0] if len(day_landmarks_day1) > 0 else get_sightseeing_spot(None, False, preferred_quadrant)
        else:
            s1 = get_sightseeing_spot(None, False, preferred_quadrant)
        q1 = get_quadrant(s1)
        if q1 is not None:
            preferred_quadrant = q1
        
        raw_activities.append(('s1', s1))

        lunch = get_diner_spot(d, 'lunch', s1, preferred_quadrant)
        qlunch = get_quadrant(lunch)
        if qlunch is not None:
            preferred_quadrant = qlunch
        raw_activities.append(('lunch', lunch))

        if d == 1:
            s2 = day_landmarks_day1[1] if len(day_landmarks_day1) > 1 else get_sightseeing_spot(lunch, False, preferred_quadrant)
        else:
            s2 = get_sightseeing_spot(lunch, False, preferred_quadrant)
        q2 = get_quadrant(s2)
        if q2 is not None:
            preferred_quadrant = q2
        raw_activities.append(('s2', s2))

        coffee = get_cafe_spot(d, s2, preferred_quadrant)
        qcoffee = get_quadrant(coffee)
        if qcoffee is not None:
            preferred_quadrant = qcoffee
        raw_activities.append(('coffee', coffee))

        if count >= 3:
            if d == 1 and count == 3:
                s3 = night_landmarks_day1[0] if len(night_landmarks_day1) > 0 else get_sightseeing_spot(coffee, True, preferred_quadrant)
            else:
                s3 = get_sightseeing_spot(coffee, count == 3, preferred_quadrant)
        else:
            s3 = {
                'name_ko': "호텔 휴식 및 자유 시간",
                'name_en': "Hotel Rest & Free Time",
                'desc_ko': "일정을 마친 후 호텔에서 잠시 휴식을 취하거나 주변을 자유롭게 둘러보는 개인 시간",
                'desc_en': "Return to the hotel for a brief rest or enjoy free time exploring the surrounding area.",
                'isFallback': True
            }
        q3 = get_quadrant(s3)
        if q3 is not None:
            preferred_quadrant = q3
        raw_activities.append(('s3', s3))

        dinner = get_diner_spot(d, 'dinner', s3, preferred_quadrant)
        qdinner = get_quadrant(dinner)
        if qdinner is not None:
            preferred_quadrant = qdinner
        raw_activities.append(('dinner', dinner))

        if count == 4:
            if d == 1:
                s4 = night_landmarks_day1[0] if len(night_landmarks_day1) > 0 else get_sightseeing_spot(dinner, True, preferred_quadrant)
            else:
                s4 = get_sightseeing_spot(dinner, True, preferred_quadrant)
            q4 = get_quadrant(s4)
            if q4 is not None:
                preferred_quadrant = q4
            raw_activities.append(('s4', s4))

        # Coordinate resolution and inheritance
        last_real_coords = None
        for name, item in raw_activities:
            if not item.get('isFallback'):
                last_real_coords = get_attraction_coords(item)
                break
        if not last_real_coords:
            last_real_coords = {'x': 5.0, 'y': 5.0}

        current_coords = last_real_coords.copy()
        for name, item in raw_activities:
            if item.get('isFallback'):
                item['x'] = current_coords['x']
                item['y'] = current_coords['y']
            else:
                coords = get_attraction_coords(item)
                item['x'] = coords['x']
                item['y'] = coords['y']
                current_coords = coords.copy()

        day_plans.append({
            'day': d,
            'slots': raw_activities
        })

    return {
        'city_id': city_id,
        'days': day_plans,
        'landmarks': landmarks
    }

def run_verification():
    db = parse_attractions()
    print(f"Parsed database containing {len(db)} cities.")
    
    cities = list(db.keys())
    # Test all cities, all durations (1..7), and multiple preference configurations
    pref_configs = [
        ['healing'],
        ['gourmet', 'culture'],
        ['healing', 'activity', 'shopping'],
        ['healing', 'gourmet', 'culture', 'activity', 'shopping']
    ]
    
    failures = 0
    total_tests = 0
    
    for city in cities:
        for days in range(1, 8):
            for prefs in pref_configs:
                total_tests += 1
                res = simulate_build_course_structure(db, city, days, prefs)
                
                # Check 1: Duplicate checks
                seen_names = set()
                dups = []
                for day_plan in res['days']:
                    for slot_name, item in day_plan['slots']:
                        if item.get('isFallback'):
                            continue
                        name = item.get('name_ko')
                        if name in seen_names:
                            dups.append(name)
                        seen_names.add(name)
                
                if dups:
                    print(f"FAIL: City {city}, {days} days, prefs {prefs} has duplicates: {dups}")
                    failures += 1
                    continue
                
                # Check 2: Night-only in day slots check
                day_slot_violations = []
                for day_plan in res['days']:
                    day = day_plan['day']
                    # count calculation for the day
                    if days == 1: daily_counts = [4]
                    elif days == 2: daily_counts = [4, 4]
                    elif days == 3: daily_counts = [4, 4, 4]
                    elif days == 4: daily_counts = [4, 4, 4, 4]
                    elif days == 5: daily_counts = [4, 4, 4, 4, 4]
                    elif days == 6: daily_counts = [4, 4, 3, 3, 3, 3]
                    elif days == 7: daily_counts = [3, 3, 3, 3, 3, 3, 3]
                    else: daily_counts = [4] * days
                    count = daily_counts[day-1] if day-1 < len(daily_counts) else 3
                    
                    for slot_name, item in day_plan['slots']:
                        if item.get('isFallback'):
                            continue
                        # Day slots: s1, s2, lunch, coffee, s3 (only if count is 4)
                        is_day_slot = slot_name in ['s1', 's2', 'lunch', 'coffee'] or (slot_name == 's3' and count == 4)
                        if is_day_slot and is_night_only(item):
                            day_slot_violations.append((day, slot_name, item['name_ko']))
                            
                if day_slot_violations:
                    print(f"FAIL: City {city}, {days} days, prefs {prefs} has night-only items in day slots:")
                    for d, slot, name in day_slot_violations:
                        print(f"  - Day {d}, {slot}: {name}")
                    failures += 1
                    continue
                
                # Check 3: Landmarks on Day 1
                landmarks = res['landmarks']
                day1_items = []
                for slot_name, item in res['days'][0]['slots']:
                    if not item.get('isFallback'):
                        day1_items.append(item['name_en'])
                
                missing_landmarks = []
                for landmark in landmarks[:2]: # First two landmarks must be on Day 1
                    if landmark['name_en'] not in day1_items:
                        missing_landmarks.append(landmark['name_ko'])
                
                if missing_landmarks:
                    print(f"FAIL: City {city}, {days} days, prefs {prefs} has missing landmarks on Day 1: {missing_landmarks}")
                    failures += 1
                    continue

    print(f"\nVerification completed. Total test combinations: {total_tests}. Failures: {failures}")
    if failures == 0:
        print("🎉 SUCCESS: All time-appropriateness, duplicate, and landmark constraints are fully met!")
        sys.exit(0)
    else:
        print("❌ FAILURE: Constraints were violated in some configurations.")
        sys.exit(1)

if __name__ == '__main__':
    run_verification()
