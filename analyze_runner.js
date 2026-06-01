// WanderSync Mock Data & Translation Bundles (Global Scope for local browser support)

const TRANSLATIONS = {
  ko: {
    // Navigation
    nav_logo: "WanderSync",
    nav_dashboard: "홈",
    nav_planner: "AI 일정 생성",
    nav_companions: "동행 매칭",
    nav_profile: "내 프로필",

    // Dashboard
    dash_welcome: "어디로 떠나시나요?",
    dash_subtitle: "AI 맞춤 코스부터 실시간 실명 동행 매칭까지 한 번에",
    dash_start_planner: "AI 코스 짜러가기",
    dash_find_companion: "함께할 동행 찾기",
    dash_popular_dest: "인기 여행지",
    dash_ref_title: "검증된 여행 커뮤니티 연동",
    dash_ref_desc: "네이버 대표 여행 카페 '유랑' 및 주요 동행 서비스의 매칭 노하우를 결합하여 신뢰할 수 있는 매칭 시스템을 구축했습니다.",
    dash_stat_users: "누적 이용자 12.4만 명",
    dash_stat_matches: "매칭 성공률 94.2%",
    dash_stat_verified: "실명인증 비율 100%",

    // Profile Page
    profile_title: "프로필 설정",
    profile_info: "동행 매칭 시 상대방에게 공개되는 정보입니다. 실명 인증 시 신뢰도가 더 높아집니다.",
    profile_name: "이름/닉네임",
    profile_age: "나이대",
    profile_gender: "성별",
    profile_nationality: "국적",
    profile_mbti: "MBTI",
    profile_sns: "SNS 계정 연동 (실명제 인증)",
    profile_verified: "실명 인증 완료",
    profile_unverified: "실명 미인증",
    profile_verify_btn: "실명 인증하기 (카카오/네이버 연동)",
    profile_save: "프로필 저장하기",
    profile_saved_toast: "프로필이 성공적으로 저장되었습니다!",
    
    // AI Planner Page
    planner_title: "AI 여행 코스 플래너",
    planner_desc: "도시를 선택하고 여행 날짜와 선호하는 취향을 고르시면 AI가 정밀한 시간대별 일정을 추천해 드립니다.",
    planner_dest_label: "목적지 도시 선택",
    planner_dest_placeholder: "예: 서울, 제주, 도쿄, 파리, 부산...",
    planner_date_label: "여행 기간 (일수)",
    planner_pref_label: "나의 여행 취향 (다중 선택 가능)",
    planner_pref_healing: "🌿 힐링 & 휴식",
    planner_pref_gourmet: "🍕 식도락 & 까페",
    planner_pref_culture: "🏛️ 관광 & 역사/문화",
    planner_pref_activity: "🏃 액티비티 & 스포츠",
    planner_pref_shopping: "🛍️ 쇼핑 & 인생샷",
    planner_generate_btn: "AI 맞춤 코스 생성하기",
    planner_generating: "AI가 가장 최적의 루트를 생성하고 있습니다...",
    planner_result_title: "추천 여행 일정",
    planner_result_desc: "선택하신 취향에 최적화된 시간대별 동선입니다. (각 장소별 예상 소요 시간 포함)",
    planner_duration: "예상 소요시간",
    planner_day: "일차",

    // Companion Page
    comp_title: "실시간 동행 매칭",
    comp_desc: "카테고리를 선택하거나 특정 장소를 골라 동행 방을 만들어 함께 여행해 보세요.",
    comp_btn_create: "동행 방 만들기",
    comp_category_all: "전체",
    comp_category_country: "나라별",
    comp_category_city: "도시별",
    comp_category_place: "특정 장소",
    comp_category_restaurant: "식당",
    comp_category_taxi: "택시 쉐어",
    comp_category_rent: "렌트카 쉐어",
    comp_category_activity: "액티비티",
    
    // Companion Room Cards
    comp_room_recruiting: "모집중",
    comp_room_closed: "마감",
    comp_room_people: "인원",
    comp_room_joined: "참여함",
    comp_room_join_btn: "동행 참여 및 채팅방 들어가기",
    comp_room_verify_badge: "실명 인증 완료",
    comp_room_pref_match: "취향 일치도",
    comp_room_details: "동행 상세 정보",
    comp_room_filters: "상세 필터",
    comp_room_age_limit: "모집 연령",
    comp_room_gender_limit: "모집 성별",
    comp_room_nat_limit: "모집 국적",
    comp_room_time: "동행 일시",

    // Create Room Modal
    modal_title: "새 동행 모집 생성",
    modal_room_title: "모집 제목",
    modal_room_dest: "목적지 도시",
    modal_room_cat: "동행 카테고리",
    modal_room_place: "정확한 장소 (직접 입력 가능)",
    modal_room_date: "동행 날짜",
    modal_room_time: "동행 시작 시간",
    modal_room_max: "최대 모집 인원",
    modal_room_age: "희망 연령대",
    modal_room_gender: "희망 성별",
    modal_room_nationality: "희망 국적",
    modal_room_pref: "핵심 취향 코드",
    modal_room_desc: "상세 설명 및 안내 사항",
    modal_submit: "동행 방 생성하기",
    modal_cancel: "취소",
    modal_any: "무관 / 전체",

    // Chat Room Interface
    chat_title: "동행 소통방",
    chat_members: "참여자 목록",
    chat_placeholder: "메시지를 입력하세요... (코스 및 비용 등 자유로운 조율)",
    chat_send: "전송",
    chat_joined_notice: "님이 동행방에 참여했습니다.",
    chat_leave_btn: "동행 탈퇴하기",

    // Select options & MBTI
    gender_male: "남성",
    gender_female: "여성",
    gender_any: "성별 무관",
    nat_korean: "한국인",
    nat_foreign: "외국인",
    nat_any: "국적 무관",
    age_20s: "20대",
    age_30s: "30대",
    age_40s: "40대+",
    age_any: "연령 무관"
  },
  en: {
    // Navigation
    nav_logo: "WanderSync",
    nav_dashboard: "Home",
    nav_planner: "AI Course Planner",
    nav_companions: "Companions",
    nav_profile: "My Profile",

    // Dashboard
    dash_welcome: "Where are you going?",
    dash_subtitle: "From AI-personalized itineraries to verified real-name companion matching",
    dash_start_planner: "Plan AI Course",
    dash_find_companion: "Find Companions",
    dash_popular_dest: "Popular Destinations",
    dash_ref_title: "Verified Communities Integration",
    dash_ref_desc: "We built a trusted matching environment by blending the expertise of Naver's main travel community 'Urang' and premium companion services.",
    dash_stat_users: "124K+ Active Users",
    dash_stat_matches: "94.2% Match Success Rate",
    dash_stat_verified: "100% Real-Name Verified",

    // Profile Page
    profile_title: "Profile Settings",
    profile_info: "This information is shared with other travelers during companion matching. Verification increases credibility.",
    profile_name: "Name/Nickname",
    profile_age: "Age Range",
    profile_gender: "Gender",
    profile_nationality: "Nationality",
    profile_mbti: "MBTI",
    profile_sns: "SNS Integration (Real-name verification)",
    profile_verified: "Verified",
    profile_unverified: "Not Verified",
    profile_verify_btn: "Verify Identity (via Kakao/Naver)",
    profile_save: "Save Profile",
    profile_saved_toast: "Profile saved successfully!",

    // AI Planner Page
    planner_title: "AI Travel Itinerary Planner",
    planner_desc: "Select your destination, travel duration, and travel style. Our AI will curate an optimized hour-by-hour itinerary.",
    planner_dest_label: "Select Destination City",
    planner_dest_placeholder: "e.g. Seoul, Tokyo, Paris, Busan...",
    planner_date_label: "Travel Duration (Days)",
    planner_pref_label: "Travel Preferences (Select multiple)",
    planner_pref_healing: "🌿 Healing & Rest",
    planner_pref_gourmet: "🍕 Gourmet & Cafe",
    planner_pref_culture: "🏛️ Sightseeing & Culture/History",
    planner_pref_activity: "🏃 Activities & Sports",
    planner_pref_shopping: "🛍️ Shopping & Photography",
    planner_generate_btn: "Generate AI Itinerary",
    planner_generating: "AI is crafting your optimized route...",
    planner_result_title: "Recommended Itinerary",
    planner_result_desc: "Optimized route based on your preferences, including estimated duration for each place.",
    planner_duration: "Est. Duration",
    planner_day: "Day",

    // Companion Page
    comp_title: "Real-time Companionship",
    comp_desc: "Choose a category, or select a specific venue to host your own companion room.",
    comp_btn_create: "Create Companion Room",
    comp_category_all: "All",
    comp_category_country: "Country",
    comp_category_city: "City",
    comp_category_place: "Specific Venue",
    comp_category_restaurant: "Restaurant",
    comp_category_taxi: "Taxi Share",
    comp_category_rent: "Car Share",
    comp_category_activity: "Activity",

    // Companion Room Cards
    comp_room_recruiting: "Recruiting",
    comp_room_closed: "Closed",
    comp_room_people: "Pax",
    comp_room_joined: "Joined",
    comp_room_join_btn: "Join Room & Enter Chat",
    comp_room_verify_badge: "Real-name Verified",
    comp_room_pref_match: "Preference Match",
    comp_room_details: "Companion Details",
    comp_room_filters: "Advanced Filters",
    comp_room_age_limit: "Target Age",
    comp_room_gender_limit: "Target Gender",
    comp_room_nat_limit: "Target Nationality",
    comp_room_time: "Date & Time",

    // Create Room Modal
    modal_title: "Create Companion Room",
    modal_room_title: "Recruitment Title",
    modal_room_dest: "Destination City",
    modal_room_cat: "Companion Category",
    modal_room_place: "Specific Place (Custom entry allowed)",
    modal_room_date: "Date",
    modal_room_time: "Start Time",
    modal_room_max: "Max People",
    modal_room_age: "Target Age",
    modal_room_gender: "Target Gender",
    modal_room_nationality: "Target Nationality",
    modal_room_pref: "Key Preference Code",
    modal_room_desc: "Details & Guidelines",
    modal_submit: "Create Room",
    modal_cancel: "Cancel",
    modal_any: "Any / All",

    // Chat Room Interface
    chat_title: "Coordination Chat",
    chat_members: "Members",
    chat_placeholder: "Type a message... (discuss course, split bills, etc.)",
    chat_send: "Send",
    chat_joined_notice: "has joined the room.",
    chat_leave_btn: "Leave Room",

    // Select options & MBTI
    gender_male: "Male",
    gender_female: "Female",
    gender_any: "Any Gender",
    nat_korean: "Korean",
    nat_foreign: "Foreigner",
    nat_any: "Any Nationality",
    age_20s: "20s",
    age_30s: "30s",
    age_40s: "40s+",
    age_any: "Any Age"
  }
};

const CITIES = [
  { id: "seoul", name_ko: "서울", name_en: "Seoul", country_ko: "한국", country_en: "South Korea", desc_ko: "전통과 현대가 조화를 이루는 매력적인 메가시티", desc_en: "A mesmerizing megacity where ancient tradition meets high-tech modern life." },
  { id: "jeju", name_ko: "제주", name_en: "Jeju", country_ko: "한국", country_en: "South Korea", desc_ko: "에메랄드 바다와 아름다운 자연이 숨쉬는 치유의 섬", desc_en: "A healing island of volcanic landscapes and emerald oceans." },
  { id: "tokyo", name_ko: "도쿄", name_en: "Tokyo", country_ko: "일본", country_en: "Japan", desc_ko: "화려한 도심과 아기자기한 골목, 미식의 세계적 메카", desc_en: "Global capital of culinary excellence, bright lights, and cozy alleys." },
  { id: "osaka", name_ko: "오사카", name_en: "Osaka", country_ko: "일본", country_en: "Japan", desc_ko: "유쾌한 활력과 가성비 미식이 넘쳐나는 간사이의 중심", desc_en: "The heart of Kansai region, boiling with cheerful energy and street foods." },
  { id: "paris", name_ko: "파리", name_en: "Paris", country_ko: "프랑스", country_en: "France", desc_ko: "낭만과 예술, 에펠탑이 어우러진 낭만주의자들의 성지", desc_en: "Holy ground for lovers, artists, and romanticists from around the world." },
  { id: "london", name_ko: "런던", name_en: "London", country_ko: "영국", country_en: "United Kingdom", desc_ko: "역사 깊은 고전과 힙한 서브컬처가 공존하는 안개의 도시", desc_en: "The misty city blending centuries-old traditions with hip subcultures." },
  { id: "newyork", name_ko: "뉴욕", name_en: "New York", country_ko: "미국", country_en: "United States", desc_ko: "잠들지 않는 세계 문화·금융의 심장부 메트로폴리스", desc_en: "The global capital of culture, Broadway shows, and streets that never sleep." },
  { id: "barcelona", name_ko: "바르셀로나", name_en: "Barcelona", country_ko: "스페인", country_en: "Spain", desc_ko: "가우디의 숨결과 따스한 지중해 해변이 공존하는 예술 도시", desc_en: "Artistic city blending Antoni Gaudi masterpieces with warm Mediterranean beaches." },
  { id: "rome", name_ko: "로마", name_en: "Rome", country_ko: "이탈리아", country_en: "Italy", desc_ko: "도시 전체가 거대한 박물관인 고대 제국의 중심지", desc_en: "The heart of the ancient empire, where the entire city functions as an open museum." },
  { id: "bangkok", name_ko: "방콕", name_en: "Bangkok", country_ko: "태국", country_en: "Thailand", desc_ko: "화려한 사원과 역동적인 길거리 미식의 천국", desc_en: "A paradise of magnificent golden temples and dynamic street-food culture." },
  { id: "sydney", name_ko: "시드니", name_en: "Sydney", country_ko: "호주", country_en: "Australia", desc_ko: "오페라 하우스와 청정 대자연이 어우러진 남반구의 보석", desc_en: "Jewel of the Southern Hemisphere featuring Opera House and clean coastal beaches." },
  { id: "singapore", name_ko: "싱가포르", name_en: "Singapore", country_ko: "싱가포르", country_en: "Singapore", desc_ko: "초현대식 가든과 안전하고 쾌적한 미래형 정원 도시", desc_en: "A safe, pristine, futuristic garden city with ultra-modern architectural landmarks." },
  { id: "dubai", name_ko: "두바이", name_en: "Dubai", country_ko: "아랍에미리트", country_en: "UAE", desc_ko: "초현대적인 스카이라인과 사막이 공존하는 기적의 도시", desc_en: "A miracle city where ultra-modern skyline meets majestic desert landscapes." },
  { id: "munich", name_ko: "뮌헨", name_en: "Munich", country_ko: "독일", country_en: "Germany", desc_ko: "전통 맥주 축제와 유서 깊은 바이에른 문화의 심장부", desc_en: "Heart of Bavarian culture, historical architecture, and the legendary Oktoberfest." },
  { id: "prague", name_ko: "프라하", name_en: "Prague", country_ko: "체코", country_en: "Czechia", desc_ko: "붉은 지붕 and 고딕 양식 성곽이 낭만을 노래하는 백탑의 도시", desc_en: "City of a hundred spires, where red roofs and Gothic towers sing of romance." },
  { id: "beijing", name_ko: "베이징", name_en: "Beijing", country_ko: "중국", country_en: "China", desc_ko: "웅장한 만리장성과 황실 역사 유적이 가득한 대륙의 수도", desc_en: "The ancient capital hosting the majestic Great Wall and rich imperial history." },
  { id: "cairo", name_ko: "카이로", name_en: "Cairo", country_ko: "이집트", country_en: "Egypt", desc_ko: "인류 문명의 기원인 신비로운 피라미드와 나일강의 도시", desc_en: "City of the Nile, where ancient pyramids whisper the origin of human civilization." },
  { id: "rio", name_ko: "리오데자네이루", name_en: "Rio de Janeiro", country_ko: "브라질", country_en: "Brazil", desc_ko: "거대 예수상과 뜨거운 코파카바나 해변이 반겨주는 카니발의 도시", desc_en: "City of carnival, featuring the Christ the Redeemer statue and Copacabana beach." },
  { id: "vancouver", name_ko: "밴쿠버", name_en: "Vancouver", country_ko: "캐나다", country_en: "Canada", desc_ko: "웅장한 설산과 평화로운 태평양이 어우러진 살기 좋은 천혜의 도시", desc_en: "A beautiful coastal metropolis surrounded by snow-capped mountains and Pacific shores." },
  { id: "washington_dc", name_ko: "워싱턴 D.C.", name_en: "Washington D.C.", country_ko: "미국", country_en: "United States", desc_ko: "미국의 사법, 행정, 입법의 중심지이자 역사의 심장부", desc_en: "The political and historical capital of the United States." },
  { id: "ottawa", name_ko: "오타와", name_en: "Ottawa", country_ko: "캐나다", country_en: "Canada", desc_ko: "아름다운 리도 운하와 웅장한 의회 의사당이 반겨주는 수도", desc_en: "Canada's picturesque capital hosting the Rideau Canal and Parliament Hill." },
  { id: "canberra", name_ko: "캔버라", name_en: "Canberra", country_ko: "호주", country_en: "Australia", desc_ko: "계획적으로 정돈된 현대적이고 조화로운 호수의 도시", desc_en: "Australia's planned capital featuring pristine lakes and political architecture." },
  { id: "brasilia", name_ko: "브라질리아", name_en: "Brasilia", country_ko: "브라질", country_en: "Brazil", desc_ko: "비행기 모양의 미래 지향적 도시 계획과 건축의 미학", desc_en: "The futuristic airplane-shaped capital city of Brazil." },
  { id: "abu_dhabi", name_ko: "아부다비", name_en: "Abu Dhabi", country_ko: "아랍에미리트", country_en: "UAE", desc_ko: "화려한 그랜드 모스크와 현대 미술이 공존하는 풍요로운 수도", desc_en: "The wealthy capital of the UAE, blending majestic mosques with modern culture." },
  { id: "berlin", name_ko: "베를린", name_en: "Berlin", country_ko: "독일", country_en: "Germany", desc_ko: "베를린 장벽의 흔적과 역동적인 현대 미술이 공존하는 도시", desc_en: "Capital of Germany, rich in historic sites like Berlin Wall and modern art." },
  { id: "madrid", name_ko: "마드리드", name_en: "Madrid", country_ko: "스페인", country_en: "Spain", desc_ko: "정열의 도시이자 세계적인 프라도 미술관과 황실 역사의 수도", desc_en: "Spain's vibrant capital city hosting the Prado Museum and royal histories." },
  { id: "amsterdam", name_ko: "암스테르담", name_en: "Amsterdam", country_ko: "네덜란드", country_en: "Netherlands", desc_ko: "아름다운 운하와 튤립, 반 고흐의 예술이 흐르는 네덜란드 수도", desc_en: "The capital of canals, bicycles, Van Gogh art, and tulip flowers." },
  { id: "brussels", name_ko: "브뤼셀", name_en: "Brussels", country_ko: "벨기에", country_en: "Belgium", desc_ko: "유럽 연합의 중심지이자 고소한 와플과 초콜릿의 본고장", desc_en: "The political heart of EU and capital of waffles and premium chocolates." },
  { id: "vienna", name_ko: "빈", name_en: "Vienna", country_ko: "오스트리아", country_en: "Austria", desc_ko: "모차르트의 음악과 웅장한 쇤브룬 궁전이 노래하는 예술의 수도", desc_en: "Austria's musical capital hosting Schonbrunn Palace and classical opera." },
  { id: "bern", name_ko: "베른", name_en: "Bern", country_ko: "스위스", country_en: "Switzerland", desc_ko: "유네스코 세계유산으로 등재된 중세 분위기의 스위스 수도", desc_en: "The medieval heritage capital city of Switzerland." },
  { id: "dublin", name_ko: "더블린", name_en: "Dublin", country_ko: "아일랜드", country_en: "Ireland", desc_ko: "기네스 맥주의 고향이자 조이스와 예이츠의 문학 도시", desc_en: "Ireland's literary capital and the birthplace of Guinness beer." },
  { id: "lisbon", name_ko: "리스본", name_en: "Lisbon", country_ko: "포르투갈", country_en: "Portugal", desc_ko: "낭만적인 노란색 트램과 대항해 시대의 유적들이 빛나는 도시", desc_en: "Capital of yellow trams and historic Maritime discoveries." },
  { id: "new_delhi", name_ko: "뉴델리", name_en: "New Delhi", country_ko: "인도", country_en: "India", desc_ko: "다채로운 향신료와 유서 깊은 유적들이 가득한 인도의 심장", desc_en: "The capital of India, rich in spices and historical structures." },
  { id: "moscow", name_ko: "모스크바", name_en: "Moscow", country_ko: "러시아", country_en: "Russia", desc_ko: "붉은 광장과 테트리스 성으로 불리는 성 바실리 대성당의 도시", desc_en: "Capital of Russia, featuring Red Square and St. Basil's Cathedral." },
  { id: "mexico_city", name_ko: "멕시코시티", name_en: "Mexico City", country_ko: "멕시코", country_en: "Mexico", desc_ko: "아즈텍의 유적과 현대적 예술이 융합된 고산 도시", desc_en: "Mexico's ancient capital blending Aztec ruins with modern arts." },
  { id: "jakarta", name_ko: "자카르타", name_en: "Jakarta", country_ko: "인도네시아", country_en: "Indonesia", desc_ko: "동남아시아 최대의 메트로폴리스이자 역동적인 문화의 수도", desc_en: "The dynamic capital city of Indonesia." },
  { id: "riyadh", name_ko: "리야드", name_en: "Riyadh", country_ko: "사우디아라비아", country_en: "Saudi Arabia", desc_ko: "웅장한 마스막 요새와 미래형 킹덤 센터가 공존하는 오아시스", desc_en: "The capital of Saudi Arabia, blending fortresses with skyscrapers." },
  { id: "ankara", name_ko: "앙카라", name_en: "Ankara", country_ko: "튀르키예", country_en: "Turkey", desc_ko: "아나톨리아의 역사와 아타튀르크 기념관이 있는 행정의 중심", desc_en: "The historical administrative capital of Turkey." },
  { id: "warsaw", name_ko: "바르샤바", name_en: "Warsaw", country_ko: "폴란드", country_en: "Poland", desc_ko: "쇼팽의 선율과 전후 복원된 유네스코 구시가지가 빛나는 도시", desc_en: "Poland's capital, rebuilding history and celebrating Chopin." },
  { id: "stockholm", name_ko: "스톡홀름", name_en: "Stockholm", country_ko: "스웨덴", country_en: "Sweden", desc_ko: "바다 위에 지어진 친환경적이고 감각적인 북유럽 베네치아", desc_en: "Sweden's beautiful capital built across 14 islands." },
  { id: "buenos_aires", name_ko: "부엔오스아이레스", name_en: "Buenos Aires", country_ko: "아르헨티나", country_en: "Argentina", desc_ko: "정열적인 탱고와 남미의 파리로 불리는 낭만적인 도시", desc_en: "The tango-loving capital of Argentina." },
  { id: "oslo", name_ko: "오슬로", name_en: "Oslo", country_ko: "노르웨이", country_en: "Norway", desc_ko: "피오르와 뭉크의 절규, 바이킹의 기상이 살아있는 숲속의 도시", desc_en: "Oslo, surrounded by forests, fjords, and Munch masterpieces." },
  { id: "jerusalem", name_ko: "예루살렘", name_en: "Jerusalem", country_ko: "이스라엘", country_en: "Israel", desc_ko: "세 종교의 공동 성지이자 수천 년 역사가 압축된 성벽 도시", desc_en: "Ancient holy city of three major global religions." },
  { id: "copenhagen", name_ko: "코펜하겐", name_en: "Copenhagen", country_ko: "덴마크", country_en: "Denmark", desc_ko: "안데르센 동화 속 아기자기한 항구와 휘게 라이프의 중심지", desc_en: "Capital of Denmark, famous for its colorful Nyhavn harbor." },
  { id: "kuala_lumpur", name_ko: "쿠알라룸푸르", name_en: "Kuala Lumpur", country_ko: "말레이시아", country_en: "Malaysia", desc_ko: "웅장한 페트로나스 트윈 타워와 열대 자연이 어우러진 대도시", desc_en: "Capital of Malaysia featuring the Petronas Twin Towers." },
  { id: "pretoria", name_ko: "프레토리아", name_en: "Pretoria", country_ko: "남아프리카공화국", country_en: "South Africa", desc_ko: "보라색 자카란다 꽃이 흐드러지게 피는 남아공의 행정 수도", desc_en: "South Africa's administrative capital blooming with jacarandas." },
  { id: "manila", name_ko: "마닐라", name_en: "Manila", country_ko: "필리핀", country_en: "Philippines", desc_ko: "인트라무로스 성곽 요새와 리잘 공원이 반겨주는 항구 도시", desc_en: "The historical bay capital city of the Philippines." },
  { id: "hanoi", name_ko: "하노이", name_en: "Hanoi", country_ko: "베트남", country_en: "Vietnam", desc_ko: "호안끼엠 호수와 천년의 역사, 향긋한 쌀국수의 본고장", desc_en: "Vietnam's historic capital city filled with lakes and cafes." },
  { id: "tehran", name_ko: "테헤란", name_en: "Tehran", country_ko: "이란", country_en: "Iran", desc_ko: "밀라드 타워와 화려한 페르시아 왕실 보석들의 수도", desc_en: "The Persian capital city of Iran." },
  { id: "dhaka", name_ko: "다카", name_en: "Dhaka", country_ko: "방글라데시", country_en: "Bangladesh", desc_ko: "인력거 릭샤의 물결과 오래된 랄바그 요새의 역사 수도", desc_en: "The bustling, historic capital city of Bangladesh." },
  { id: "bogota", name_ko: "보고타", name_en: "Bogota", country_ko: "콜롬비아", country_en: "Colombia", desc_ko: "안데스 산맥 해발 2,600m에 위치한 황금 박물관의 도시", desc_en: "High-altitude capital of Colombia famous for Gold Museum." },
  { id: "bucharest", name_ko: "부쿠레슈티", name_en: "Bucharest", country_ko: "루마니아", country_en: "Romania", desc_ko: "거대한 인민 궁전과 동유럽의 소파리로 불리는 낭만 수도", desc_en: "Romania's capital hosting the massive Palace of Parliament." },
  { id: "santiago", name_ko: "산티아고", name_en: "Santiago", country_ko: "칠레", country_en: "Chile", desc_ko: "만년설이 덮인 안데스 산맥 아래 위치한 칠레의 심장", desc_en: "The capital of Chile, set against the Andes mountains." },
  { id: "helsinki", name_ko: "헬싱키", name_en: "Helsinki", country_ko: "핀란드", country_en: "Finland", desc_ko: "디자인의 거리와 아기자기한 북유럽 감성의 항구 도시", desc_en: "Finland's capital, renowned for design and seaside views." },
  { id: "baghdad", name_ko: "바그다드", name_en: "Baghdad", country_ko: "이라크", country_en: "Iraq", desc_ko: "천일야화의 배경이자 유서 깊은 메소포타미아 문명의 도시", desc_en: "The historic capital of Iraq on the Tigris River." },
  { id: "wellington", name_ko: "웰링턴", name_en: "Wellington", country_ko: "뉴질랜드", country_en: "New Zealand", desc_ko: "바람의 도시이자 감각적인 커피와 영화 산업의 중심지", desc_en: "The windy, creative capital city of New Zealand." },
  { id: "lima", name_ko: "리마", name_en: "Lima", country_ko: "페루", country_en: "Peru", desc_ko: "태평양 연안의 해안 절벽과 식민지 시대 유적의 도시", desc_en: "Peru's coastal capital city rich in colonial history." },
  { id: "athens", name_ko: "아테네", name_en: "Athens", country_ko: "그리스", country_en: "Greece", desc_ko: "서구 문명의 요람이자 파르테논 신전이 우뚝 솟은 신화의 수도", desc_en: "The historic capital of Greece, crowned by Parthenon." },
  { id: "doha", name_ko: "도하", name_en: "Doha", country_ko: "카타르", country_en: "Qatar", desc_ko: "미래형 스카이라인과 전통 수크 와키프 시장의 카타르 수도", desc_en: "Qatar's ultra-modern capital city by the Persian Gulf." },
  { id: "astana", name_ko: "아스타나", name_en: "Astana", country_ko: "카자흐스탄", country_en: "Kazakhstan", desc_ko: "중앙아시아 초원에 지어진 독창적인 디자인의 미래형 수도", desc_en: "The futuristic planned capital city of Kazakhstan." },
  { id: "algiers", name_ko: "알제", name_en: "Algiers", country_ko: "알제리", country_en: "Algeria", desc_ko: "지중해의 백색 도시로 불리는 역사적인 카스바 유적의 도시", desc_en: "The white-washed Mediterranean capital of Algeria." },
  { id: "budapest", name_ko: "부다페스트", name_en: "Budapest", country_ko: "헝가리", country_en: "Hungary", desc_ko: "도나우강의 진주이자 온천과 국회의사당 야경의 도시", desc_en: "Pearl of the Danube, famous for thermal baths and Parliament views." },
  { id: "kuwait_city", name_ko: "쿠웨이트시티", name_en: "Kuwait City", country_ko: "쿠웨이트", country_en: "Kuwait", desc_ko: "쿠웨이트 타워와 페르시아만의 은빛 물결이 흐르는 수도", desc_en: "Capital of Kuwait, featuring the famous Kuwait Towers." },
  { id: "rabat", name_ko: "라바트", name_en: "Rabat", country_ko: "모로코", country_en: "Morocco", desc_ko: "웅장한 하산 탑과 돌담 성곽이 반겨주는 대서양 연안 수도", desc_en: "Morocco's coastal capital city rich in Islamic heritage." },
  { id: "addis_ababa", name_ko: "아디스아바바", name_en: "Addis Ababa", country_ko: "에티오피아", country_en: "Ethiopia", desc_ko: "아프리카 연합의 본부가 있는 아프리카의 고원 수도", desc_en: "High-altitude capital of Ethiopia and political center of Africa." },
  { id: "kyiv", name_ko: "키이우", name_en: "Kyiv", country_ko: "우크라이나", country_en: "Ukraine", desc_ko: "황금빛 돔의 페체르스카 수도원과 유서 깊은 슬라브의 심장", desc_en: "Kyiv, featuring golden-domed historical cathedrals." },
  { id: "quito", name_ko: "키토", name_en: "Quito", country_ko: "에콰도르", country_en: "Ecuador", desc_ko: "적도 바로 밑 해발 2,850m에 위치한 중세풍의 안데스 도시", desc_en: "High-altitude historic capital of Ecuador near the Equator." },
  { id: "luxembourg_city", name_ko: "룩셈부르크", name_en: "Luxembourg", country_ko: "룩셈부르크", country_en: "Luxembourg", desc_ko: "요새화된 협곡 성곽과 현대식 EU 기구들이 조화를 이루는 도시", desc_en: "Fortified canyon capital city of Luxembourg." },
  { id: "monaco", name_ko: "모나코", name_en: "Monaco", country_ko: "모나코", country_en: "Monaco", desc_ko: "지중해 절벽 위에 펼쳐진 화려한 몬테카를로 카지노의 수도", desc_en: "Vibrant Mediterranean micro-state and harbor capital." },
  { id: "vaduz", name_ko: "파두츠", name_en: "Vaduz", country_ko: "리히텐슈타인", country_en: "Liechtenstein", desc_ko: "알프스 산맥 기슭에 우뚝 솟은 파두츠 성의 조용한 수도", desc_en: "Quiet Alpine capital city of Liechtenstein." },
  { id: "andorra_la_vella", name_ko: "안도라라베야", name_en: "Andorra la Vella", country_ko: "안도라", country_en: "Andorra", desc_ko: "피레네 산맥 협곡 사이에 위치한 스키와 면세 쇼핑의 수도", desc_en: "High-altitude capital city of Andorra in Pyrenees." },
  { id: "taipei", name_ko: "타이베이", name_en: "Taipei", country_ko: "대만", country_en: "Taiwan", desc_ko: "화려한 타이베이 101 빌딩과 야시장의 미식이 넘치는 분지 도시", desc_en: "Capital of Taiwan featuring Taipei 101 and street foods." }
];

const ATTRACTIONS = {
  seoul: {
    healing: [
      { name_ko: "경복궁 & 향원정 산책", isLandmark: true, name_en: "Gyeongbokgung & Hyangwonjeong Stroll", duration: 120, desc_ko: "한적한 고궁 연못 정원 산책 및 역사 해설 청취", desc_en: "Walk through historic palace lotus gardens and listen to guide commentaries" },
      { name_ko: "북촌 한옥마을 전통 찻집", name_en: "Bukchon Hanok Village Tea House", duration: 90, desc_ko: "보존된 기와집 골목 구경 및 따뜻한 인삼차 시음", desc_en: "Explore preserved tile-roof alleys and taste traditional warm ginseng tea" },
      { name_ko: "서울숲 숲길 & 메타세쿼이아 길", name_en: "Seoul Forest Trails", duration: 120, desc_ko: "도심 속 우거진 숲길 자전거 하이킹 및 힐링 피크닉", desc_en: "Biking through rich forests in the heart of Seoul and enjoying a quiet picnic" },
      { name_ko: "남산 백범광장 은빛 성곽길", name_en: "Namsan Baekbeom Square Wall Path", duration: 90, desc_ko: "성벽 라이트업 조명을 따라 걷는 낭만적인 야경 산책", desc_en: "Romantic night walk along the illuminated stone fortress walls" },
      { name_ko: "뚝섬 한강공원 텐트 피크닉", name_en: "Ttukseom Hangang Park Tent Picnic", duration: 150, desc_ko: "한강변 잔디밭에 돗자리를 펴고 즐기는 도심 치크닉 체험", desc_en: "Spread a mat on the Hangang riverbank grass and enjoy local delivery chicken" }
    ],
    gourmet: [
      { name_ko: "광장시장 떡볶이 & 육회 투어", name_en: "Gwangjang Market Local Food Tour", duration: 100, desc_ko: "줄 서서 먹는 마약김밥, 빈대떡, 싱싱한 낙지탕탕이 체험", desc_en: "Tasting spicy rice cakes, mungbean pancakes, and fresh beef tartare" },
      { name_ko: "익선동 한옥마을 수플레 브런치", name_en: "Ikseon-dong Hanok Brunch Cafe", duration: 90, desc_ko: "개조된 고택에서 몽글몽글한 팬케이크와 스페셜티 커피", desc_en: "Fluffy pancakes and specialty coffee inside a renovated heritage house" },
      { name_ko: "성수동 트렌디 에스프레소 바", name_en: "Seongsu-dong Espresso Bar Hop", duration: 90, desc_ko: "성수 힙스터들의 성지, 감각적인 콘크리트 인테리어 맛집", desc_en: "Hot spots for Seongsu hipsters featuring unique concrete aesthetics" },
      { name_ko: "망원시장 닭강정 & 튀김 떡볶이", name_en: "Mangwon Market Crispy Chicken & Snacks", duration: 90, desc_ko: "가성비 넘치는 망원 시장 주전부리 및 망리단길 이자카야", desc_en: "Affordable street foods, fried chili peppers, and cozy 망리단길 pubs" },
      { name_ko: "신당동 즉석떡볶이 타운 맛집", name_en: "Sindang-dong Tteokbokki Town", duration: 80, desc_ko: "고추장과 춘장의 황금 비율, 추억의 즉석 떡볶이 흡입", desc_en: "Taste historic customized tableside hotpot rice cakes with ramen noodles" }
    ],
    culture: [
      { name_ko: "국립중앙박물관 반가사유상 사유의 방", name_en: "National Museum of Korea 'Room of Quiet Contemplation'", duration: 120, desc_ko: "신비롭고 정적인 공간에서 마주하는 백제의 미학", desc_en: "Facing ancient masterpieces in a quiet, dark gallery designed for contemplation" },
      { name_ko: "인사동 쌈지길 공예 공방", name_en: "Insadong Ssamzigil Craft Workshop", duration: 120, desc_ko: "전통 나전칠기 및 단청 키링 만들기 전통 공예 체험", desc_en: "DIY traditional mother-of-pearl crafts or colorful Dancheong keyrings" },
      { name_ko: "창덕궁 후원(비원) 투어", isLandmark: true, name_en: "Changdeokgung Palace Secret Garden", duration: 150, desc_ko: "조선 왕실 정원의 원형을 품은 유네스코 문화유산 특별 도슨트", desc_en: "A guided walk in the Royal Garden which preserves original Joseon landscapes" },
      { name_ko: "동대문디자인플라자(DDP) 디자인 전시", name_en: "DDP Modern Art & Architecture Tour", duration: 90, desc_ko: "자하 하디드의 알루미늄 판넬 외벽 관람 및 글로벌 현대미술전", desc_en: "Touring the futuristic fluid design by Zaha Hadid and active designer exhibits" },
      { name_ko: "국립한글박물관 훈민정음 전시", name_en: "National Hangeul Museum Tour", duration: 90, desc_ko: "한글 창제 원리와 유서 깊은 서체 고문서 정밀 관람", desc_en: "Understand the linguistic genius behind Hangeul and view ancient scrolls" }
    ],
    activity: [
      { name_ko: "뚝섬 한강 카약 & 패들보드", name_en: "Han River Windsurfing & Kayaking", duration: 150, desc_ko: "황홀한 붉은 저녁 노을을 배경으로 노 젓는 레포츠", desc_en: "Romantic paddleboarding against the fiery crimson sunset over the Han River" },
      { name_ko: "인왕산 성곽 릿지 야간 하이킹", name_en: "Inwangsan Mountain Ridge Night Climb", duration: 150, desc_ko: "서울 사대문 안 풍경이 한눈에 내려다보이는 등산 코스", desc_en: "Night trekking up to the peaks to view the entire metropolitan center in neon lights" },
      { name_ko: "홍대 가상현실 VR & 레이저택 테마파크", name_en: "Hongdae VR & Laser Tag Battle", duration: 120, desc_ko: "친구들과 실내에서 땀 흘리며 대결하는 액티브 배틀존", desc_en: "Action-packed laser battles and virtual reality arenas with global peers" },
      { name_ko: "잠실 카트 레이싱 체험", name_en: "Jamsil Go-Kart Racing", duration: 90, desc_ko: "속도감을 온몸으로 즐길 수 있는 짜릿한 서킷 질주", desc_en: "Thrilling high-speed turns at the open-air Jamsil Go-Kart track" },
      { name_ko: "롯데월드 어드벤처 & 자이로드롭", name_en: "Lotte World Adventure Theme Park", duration: 240, desc_ko: "실내 어트랙션 및 호수 위 매직아일랜드 아웃도어 스릴 체험", desc_en: "Indoor rollercoasters and outdoor drop towers overlooking Seokchon lake" }
    ],
    shopping: [
      { name_ko: "여의도 더현대 서울 실내 정원", name_en: "The Hyundai Seoul Flagship Mall", duration: 180, desc_ko: "인공 폭포와 천연 잔디가 깔린 거대 온실형 복합 쇼핑", desc_en: "Explore the futuristic glass dome with indoor waterfalls and boutique pop-ups" },
      { name_ko: "성수동 명품 팝업 및 디자이너 쇼룸", name_en: "Seongsu Designer Label Street", duration: 120, desc_ko: "주말마다 바뀌는 핫한 브랜드 팝업스토어 도장깨기", desc_en: "Scouting trendy local designer labels and weekly dynamic brand popups" },
      { name_ko: "명동 코스메틱 & 길거리 야시장", name_en: "Myeongdong Shopping & Night Market", duration: 120, desc_ko: "글로벌 뷰티 브랜드 메카와 랍스터구이 등 다채로운 야식 쇼핑", desc_en: "Global K-beauty flagship stores mixed with grilled cheese lobster snack carts" },
      { name_ko: "동대문 패션 타운 아울렛", name_en: "Dongdaemun Fashion Town Outlets", duration: 150, desc_ko: "의류 도매상가부터 트렌디한 편집숍 쇼핑 및 야식 빌리지", desc_en: "Vast clothing wholesale malls and retail outlets operating late into the night" },
      { name_ko: "신사 가로수길 로드숍 팝업", name_en: "Sinsa Garosu-gil Boutique Street", duration: 120, desc_ko: "가로수 가득한 감성 거리의 시그니처 프래 fragrances & 패션 편집숍 투어", desc_en: "Walk down ginkgo-tree lined avenues seeking designer perfume houses" }
    ]
  },
  jeju: {
    healing: [
      { name_ko: "사려니숲길 피톤치드 삼나무 숲", isLandmark: true, name_en: "Saryeoni Forest Path Cedar Stroll", duration: 120, desc_ko: "울창한 삼나무 아래 상쾌한 공기와 새소리 감상", desc_en: "Soak in phytoncide under towering cedar trees while listening to birds" },
      { name_ko: "평대리 리틀포레스트 감성 카페", name_en: "Pyeongdae-ri Beach Cozy Tea House", duration: 90, desc_ko: "바다가 보이는 야외 정원에서 마시는 제주 말차 라떼", desc_en: "Sip Jeju matcha latte at a garden café facing a quiet sandy beach" },
      { name_ko: "오설록 티뮤지엄 녹차밭", name_en: "O'sulloc Tea Museum Green Fields", duration: 90, desc_ko: "끝없이 펼쳐진 초록빛 녹차 이랑 속 산책과 기념 촬영", desc_en: "Stroll along endless green rows of tea plantations and try green tea ice cream" },
      { name_ko: "비자림 천년의 숲길 걷기", name_en: "Bijarim Nutmeg Forest Trails", duration: 100, desc_ko: "수령 500~800년 비자나무 가득한 화산송이 길 힐링 워킹", desc_en: "Healing path covered in red volcanic scoria under ancient nutmeg trees" },
      { name_ko: "월정리 해변 카페거리 해안 멍때리기", name_en: "Woljeongri Beach Windmill View", duration: 90, desc_ko: "에메랄드 바다와 풍력 발전기를 바라보는 카페 야외 테라스 힐링", desc_en: "Sit on cozy outdoor chairs observing turquoise tides and giant windmills" }
    ],
    gourmet: [
      { name_ko: "제주 동문시장 흑돼지 전복구이", name_en: "Jeju Dongmun Night Market Tour", duration: 100, desc_ko: "흑돼지 랍스터구이, 한라봉 주스 등 불쇼 가득 야시장", desc_en: "Black pork rolls, abalone gimbap, and tangerine juices with fire shows" },
      { name_ko: "함덕 해녀의 집 신선한 모둠회", name_en: "Hamdeok Haenyeo Fresh Seafood Feast", duration: 90, desc_ko: "바다 앞에서 맛보는 해녀가 직접 딴 뿔소라와 전복 물회", desc_en: "Freshly caught sea squirts, conch, and abalone noodles at the shore" },
      { name_ko: "제주도 보말칼국수 & 보말죽 아침 식사", name_en: "Local Sea Snail Noodles & Porridge", duration: 70, desc_ko: "제주 바다 향 가득한 녹진한 국물 맛집", desc_en: "Thick savory broth boiled with local brown sea snails and hand-cut wheat noodles" },
      { name_ko: "애월 고기국수 & 돔베고기 먹방", name_en: "Aewol Pork Noodle Soup", duration: 80, desc_ko: "장시간 고아낸 돼지 사골 국수와 편육 수육 맛보기", desc_en: "Hearty pork bone broth noodles topped with tender boiled pork slices on a board" },
      { name_ko: "우도 땅콩 아이스크림 & 한라봉 에이드", name_en: "Udo Island Peanut Ice Cream Treat", duration: 60, desc_ko: "고소한 우도 특산품 땅콩을 갈아 올린 소프트 아이스크림", desc_en: "Soft-serve vanilla ice cream covered in crushed local Udo roasted peanuts" }
    ],
    activity: [
      { name_ko: "쇠소깍 전통 테우 & 카약 타기", name_en: "Soesokkak Estuary Wooden Raft", duration: 100, desc_ko: "에메랄드빛 계곡물과 암벽 사이를 가르는 노 젓기", desc_en: "Rowing a kayak or wooden raft through deep volcanic river ravines" },
      { name_ko: "애월 한담해안산책로 투명 카약", name_en: "Aewol Coastal Transparent Kayaking", duration: 90, desc_ko: "물 밑이 훤히 비치는 투명 카약 위에서 노을 보기", desc_en: "Rowing on crystal-clear transparent boats with coral visible underneath" },
      { name_ko: "성산일출봉 일출 등반 하이킹", isLandmark: true, name_en: "Seongsan Ilchulbong Tuff Cone Hike", duration: 120, desc_ko: "유네스코 세계유산 분화구 정상에서 맞이하는 동해 첫 해돋이", desc_en: "Hiking up the volcanic tuff cone stairs to view an epic sunrise over the sea" },
      { name_ko: "서귀포 패러글라이딩 하늘 뷰 체험", name_en: "Seogwipo Paragliding Flight", duration: 120, desc_ko: "한라산과 서귀포 해변이 한눈에 보이는 짜릿한 하늘 비행", desc_en: "Tandem paragliding glide over green volcanic hills and southern oceans" },
      { name_ko: "중문 색달해변 초보 서핑 클래스", name_en: "Jungmun Saekdal Beach Surf School", duration: 150, desc_ko: "높은 파도가 일품인 중문 해안에서 보드 균형 잡기 원데이 레슨", desc_en: "Learn to catch rolling Pacific waves from professional local instructors" }
    ],
    culture: [
      { name_ko: "이중섭 미술관 & 산책로", name_en: "Lee Jung-seop Museum & Gallery Street", duration: 90, desc_ko: "한국 근현대 미술의 거장 이중섭의 삶과 은지화 전시", desc_en: "Exploring the life and paintings of legendary modern artist Lee Jung-seop" },
      { name_ko: "제주 현대미술관 & 저지예술인마을", name_en: "Jeju Museum of Contemporary Art", duration: 100, desc_ko: "숲속 야외 조각 전시와 현대 미술 특별 기획전 관람", desc_en: "Sculpture park walks and visual exhibitions in a quiet artist forest" },
      { name_ko: "제주 민속촌 전통 초가마을 체험", name_en: "Jeju Folk Village Historic Experience", duration: 120, desc_ko: "제주도 전통 돌담과 초가집, 돌하르방의 역사 관람", desc_en: "Stroll between ancient thatched-roof houses and learn old lifestyle histories" },
      { name_ko: "빛의 벙커 몰입형 미디어아트 전시", name_en: "Bunker de Lumières Immersive Art", duration: 90, desc_ko: "옛 군사용 벙커를 개조한 거대한 사운드와 화려한 빔프로젝트 미술전", desc_en: "Massive concrete bunker projecting Klimt masterpieces on walls" },
      { name_ko: "성읍민속마을 제주 방언 도슨트", name_en: "Seongeup Folk Village Guided Stroll", duration: 90, desc_ko: "백년 묵은 느티나무와 돌가마, 주민이 소개하는 똥돼지 역사", desc_en: "Hear funny tape dialects and view traditional black pig pens still preserved" }
    ],
    shopping: [
      { name_ko: "협재 소품숍 & 제주 굿즈 마켓", name_en: "Hyeopjae Souvenir & Craft Shop", duration: 90, desc_ko: "동백꽃, 돌하르방 모티브의 아기자기한 핸드메이드 소품 쇼핑", desc_en: "Shopping for hand-poured tangerine candles and cute stone-grandpa goods" },
      { name_ko: "서귀포 매일올레시장 로컬 마켓", name_en: "Seogwipo Maeil Olle Market Shopping", duration: 90, desc_ko: "감귤 초콜릿, 오메기떡, 돗도구리 목공예품 특산품 구매", desc_en: "Pick up local millet cakes, hallabong oranges, and cute wood carvings" },
      { name_ko: "제주공항 면세점 스페셜 쇼핑", name_en: "Jeju Airport Duty-Free Shop", duration: 80, desc_ko: "제주 전용 카카오 패키지 인형 및 프리미엄 향수 면세 쇼핑", desc_en: "Tax-free shopping for exclusive buy packages and perfumes before departure" },
      { name_ko: "이중섭거리 핸드메이드 아트 플리마켓", name_en: "Lee Jung-seop Street Handmade Market", duration: 90, desc_ko: "로컬 작가들이 출품한 은반지, 도자기 그릇, 조개껍데기 소품 구경", desc_en: "Scout cute handcrafted jewelry and shell wind-chimes sold under trees" },
      { name_ko: "성산 오션뷰 캔들 소품샵 쇼룸", name_en: "Seongsan Ocean View Candle Shop", duration: 60, desc_ko: "제주 바다를 유리잔에 담은 듯한 투명 젤 캔들 및 인테리어 무드등", desc_en: "Shop gel wax candles resembling blue oceans filled with natural shells" }
    ]
  },
  tokyo: {
    healing: [
      { name_ko: "신주쿠 교엔 정원 피크닉", name_en: "Shinjuku Gyoen National Garden", duration: 120, desc_ko: "전통 일식 정원과 넓은 잔디밭 위에서 말차 한 잔의 평화", desc_en: "Peaceful matcha tea inside traditional Japanese greenhouse gardens" },
      { name_ko: "오다이바 해변공원 레인보우 브릿지 뷰 힐링", name_en: "Odaiba Seaside Foot Walk", duration: 90, desc_ko: "시원한 바닷바람을 맞으며 레인보우 브릿지와 자유의 여신상 감상", desc_en: "Soothe your eyes with the Rainbow Bridge view and Tokyo's mini Liberty statue" },
      { name_ko: "메이지 신궁 삼나무 숲길 산책", name_en: "Meiji Jingu Shrine Cedar Trails", duration: 100, desc_ko: "하라주쿠 도심 바로 옆, 거대한 삼나무 숲길이 주는 피톤치드 힐링", desc_en: "Walk under giant torii gates into a preserved deep forest inside Tokyo" },
      { name_ko: "우에노 공원 시노바즈노이케 연못", name_en: "Ueno Park Shinobazu Pond Stroll", duration: 90, desc_ko: "거대한 연꽃잎 가득한 연못가 산책 및 오리배 탑승", desc_en: "Walk along lotus-covered lake borders and rent pedal swan boats" },
      { name_ko: "도쿄 타워 전망대 노을 감상", isLandmark: true, name_en: "Tokyo Tower Sunset View", duration: 90, desc_ko: "레트로한 오렌지빛 도쿄 타워 위에서 마주하는 아날로그 감성 노을", desc_en: "Observe city skylines turning orange from the historic Tokyo Tower deck" }
    ],
    gourmet: [
      { name_ko: "츠키지 장외시장 스시 투어", name_en: "Tsukiji Outer Market Sushi Hop", duration: 120, desc_ko: "갓 잡은 신선한 참치 덮밥과 달콤한 일본식 계란말이 꼬치", desc_en: "Ultra-fresh fatty tuna bowls and sweet grilled egg tamagoyaki sticks" },
      { name_ko: "신주쿠 오모이데 요코초 야키토리", name_en: "Omoide Yokocho Yakitori Alleys", duration: 90, desc_ko: "쇼와 시대 복고풍 골목길에서 생맥주와 숯불 꼬치구이", desc_en: "Charcoal chicken skewers and cold draft beers in a retro narrow alleyway" },
      { name_ko: "시부야 돈카츠 메이지정 미식 투어", name_en: "Shibuya Thick-Cut Tonkatsu Dining", duration: 80, desc_ko: "줄 서서 먹는 두툼한 흑돼지 카츠와 시원한 미소국", desc_en: "Crispy panko-fried pork loin cutlet dipped in sweet sesame sauce" },
      { name_ko: "긴자 라멘 골목 닭육수 라멘 맛집", name_en: "Ginza Chicken-Broth Ramen Dining", duration: 70, desc_ko: "깊고 깔끔한 맛을 자랑하는 미슐랭 닭백탕 라멘 맛보기", desc_en: "Taste rich clear chicken broth ramen topped with slow-cooked chicken breasts" },
      { name_ko: "아키하바라 메이드 카페 이색 경험", name_en: "Akihabara Maid Cafe Theme Experience", duration: 90, desc_ko: "모에모에뀽 주문을 외우며 오믈렛 위에 케첩 아트 받기", desc_en: "Quirky experience with pop maids decorating food with custom sauce drawings" }
    ],
    activity: [
      { name_ko: "아키하바라 고카트 도심 질주", name_en: "Akihabara Real-Life Street Go-Kart", duration: 120, desc_ko: "코스튬을 입고 동경 도심을 질주하는 액티브 어트랙션", desc_en: "Drive go-karts through central Tokyo streets wearing fun character costumes" },
      { name_ko: "도쿄 디즈니씨 해양 어드벤처", name_en: "Tokyo DisneySea Ocean Attractions", duration: 300, desc_ko: "스릴 넘치는 화산 대폭발 롤러코스터와 환상적인 워터쇼", desc_en: "Unique nautical-themed theme park rides and evening volcano shows" },
      { name_ko: "시부야 스카이 옥상 루프탑 전망 배틀", name_en: "Shibuya Sky Observation Deck", duration: 90, desc_ko: "유리창 밖 고공 에스컬레이터에서 찍는 스릴 만점 포토존", desc_en: "Step out onto the open-air glass edge 229 meters above Shibuya Crossing" },
      { name_ko: "오다이바 팀랩 플래닛 디지털 아트", name_en: "teamLab Planets Immersive Digital Art", duration: 120, desc_ko: "직접 물에 발을 담그고 걷는 몽환적인 가상 거울 꽃밭 어트랙션", desc_en: "Walk barefoot through glowing water chambers filled with digital koi fish" },
      { name_ko: "하네다 실내 스카이다이빙", name_en: "Haneda Wind Tunnel Indoor Skydiving", duration: 100, desc_ko: "거대한 윈드터널 내부에서 강한 바람을 맞으며 둥둥 뜨는 쾌감", desc_en: "Experience freefalling indoors under safe guidance of instructors" }
    ],
    culture: [
      { name_ko: "아사쿠사 센소지 사찰 도슨트", isLandmark: true, name_en: "Asakusa Senso-ji Temple Tour", duration: 90, desc_ko: "오래된 불교 사원에서 향 피우기 체험과 미쿠지 점괘 뽑기", desc_en: "Worship at Tokyo's oldest temple, burn incense, and draw Omikuji papers" },
      { name_ko: "에도 도쿄 박물관 역사 체험", name_en: "Edo-Tokyo Museum Historical Tour", duration: 120, desc_ko: "실물 크기로 재현된 니혼바시 다리를 걷고 에도 시대 서민 삶 체험", desc_en: "Walk on a replica wooden bridge and learn old Edo castle histories" },
      { name_ko: "롯폰기 모리 미술관 현대미술전", name_en: "Mori Art Museum Roppongi", duration: 90, desc_ko: "미술관 관람 후 롯폰기 힐즈 전망대에서 도쿄 야경 연계 감상", desc_en: "High-floor museum hosting conceptual contemporary arts and cityscape views" },
      { name_ko: "가부키자 전통 연극 하이라이트 관람", name_en: "Kabukiza Theatre Traditional Show", duration: 100, desc_ko: "독특한 화장과 목소리 톤의 일본 유네스코 무형유산 연극 체험", desc_en: "Observe stylized classical Japanese dances and heavy theatrical face paint" },
      { name_ko: "야네센 야카 소박한 로컬 골목 투어", name_en: "Yanesen Retro Town Guided Walk", duration: 120, desc_ko: "도쿄의 옛 정취가 가득한 전통 목조 주택과 아기자기한 사찰 구경", desc_en: "Tour the preserved retro residential neighborhoods with old wooden shops" }
    ],
    shopping: [
      { name_ko: "하라주쿠 다케시타 스트리트 힙 쇼핑", name_en: "Harajuku Takeshita Street Shopping", duration: 120, desc_ko: "일본 갸루, 고스룩 패션과 귀여운 동물 카페 투어", desc_en: "Trekking unique subculture clothing shops, vintage hubs, and crepes" },
      { name_ko: "긴자 럭셔리 쇼핑 & 도버 스트리트 마켓", name_en: "Ginza High-End Luxury Boulevard", duration: 150, desc_ko: "샤넬, 구찌 등 글로벌 브랜드 메카와 명품 플래그십 빌딩 투어", desc_en: "Stroll high-end tax-free department stores and avant-garde concept spaces" },
      { name_ko: "시부야 109 & 파르코 쇼핑몰 굿즈 샵", name_en: "Shibuya 109 & Parco Shopping Mall", duration: 120, desc_ko: "닌텐도 공식 굿즈샵, 포켓몬 센터, 젊은 트렌드 의류 메카 쇼핑", desc_en: "Shop official gaming merchandise, fashion icons, and anime collections" },
      { name_ko: "아키하바라 요도바시 카메라 전자랜드", name_en: "Akihabara Yodobashi Camera Electronics", duration: 120, desc_ko: "피규어 전시관, 카메라 부품, 9층 전체에 달하는 만물 가전 쇼핑", desc_en: "Gigantic multi-floor department store packed with tech goods and toys" },
      { name_ko: "시모키타자와 빈티지 스트리트 의류 쇼핑", name_en: "Shimokitazawa Vintage Clothing Tour", duration: 120, desc_ko: "유니크한 가죽 재킷, 레트로 칼라 아메카지 룩 의류 보물찾기", desc_en: "Browse hipster thrift shops and secondhand records in cozy pathways" }
    ]
  },
  osaka: {
    healing: [
      { name_ko: "나카노시마 공원 장미정원 산책", name_en: "Nakanoshima Park Rose Garden Walk", duration: 90, desc_ko: "강바람을 맞으며 백여종의 활짝 핀 장미꽃 사이를 한적하게 산책", desc_en: "Quiet stroll along the riverside gardens smelling hundreds of blooming roses" },
      { name_ko: "오사카성 공원 숲길 자전거 산책", name_en: "Osaka Castle Park Green Trail", duration: 100, desc_ko: "해자로 둘러싸인 천수각 성곽 돌담길을 따라 즐기는 푸른 나무그늘 산책", desc_en: "Biking or walking under rich tree canopies surrounded by giant stone moats" },
      { name_ko: "텐노지 케이타쿠엔 전통 정원", name_en: "Keitakuen Garden Traditional View", duration: 80, desc_ko: "일본 다이묘 스타일 정원의 연못과 징검다리, 목조 찻집 툇마루 휴식", desc_en: "Peaceful rest on wooden porches looking over clean ponds and stepping stones" },
      { name_ko: "스파월드 세계 대온천 사우나", name_en: "Spa World Global Onsen Spa", duration: 150, desc_ko: "로마식 온천, 아시아 테마 욕탕 등 피로를 말끔히 풀어주는 대형 스파", desc_en: "Relaxing in European or Asian themed indoor hot spring pools to heal muscles" },
      { name_ko: "미노오 국립공원 가을 단풍 폭포 산책", name_en: "Minoo Park Waterfall Trail Hike", duration: 180, desc_ko: "울창한 산림길을 따라 걸으며 미노오 폭포와 오사카 명물 단풍 튀김 맛보기", desc_en: "Trek up standard mountain valleys to view the epic waterfall and try maple leaf tempura" }
    ],
    gourmet: [
      { name_ko: "도톤보리 타코야키 & 쿠시카츠 맛집", name_en: "Dotonbori Takoyaki & Deep-fried Skewers", duration: 60, desc_ko: "줄 서서 먹는 문어 가득 타코야키와 시원한 맥주, 원조 꼬치 튀김", desc_en: "Tasting piping hot octopus balls and crispy golden skewers dipped in sauce" },
      { name_ko: "구로몬 시장 참치회 & 대게 구이 먹방", name_en: "Kuromon Market Seafood Feast", duration: 90, desc_ko: "오사카의 부엌, 신선한 성게알(우니) 숟가락 퍼먹기와 불타는 왕게 다리 구이", desc_en: "Scouting fatty bluefin tuna slices, scallops, and charcoal grilled crab legs" },
      { name_ko: "신세카이 원조 쿠시카츠 모듬 요리", name_en: "Shinsekai Kushikatsu Daruma Dinner", duration: 90, desc_ko: "독특한 소스 두 번 찍기 금지 규칙이 있는 클래식 소고기/새우 꼬치 튀김 맛보기", desc_en: "Savor deep fried pork, lotus root, and cheese skewers with local light draft beer" },
      { name_ko: "도톤보리 미즈노 오코노미야키", name_en: "Okonomiyaki Mizuno Dining", duration: 80, desc_ko: "참마를 가득 넣어 폭신폭신한 반죽에 삼겹살과 마요네즈 파 폭탄 데코 오코노미야키", desc_en: "Taste legendary thick pancakes grilled on iron plates topped with pork belly and sauces" },
      { name_ko: "우도 한신 백화점 지하 푸드홀 디저트", name_en: "Hanshin Department Store Sweet Food Hall", duration: 70, desc_ko: "바삭한 도지마롤 조각, 커스터드 푸딩 등 유명 오사카 디저트 테이크아웃", desc_en: "Explore the basement food court for famous sponge cream cakes and fruit tarts" }
    ],
    culture: [
      { name_ko: "오사카 천수각 요도강 역사 전시", isLandmark: true, name_en: "Osaka Castle Tower History Tour", duration: 100, desc_ko: "금빛 장식 외벽의 상징인 천수각 내부에 올라 전쟁 미니어처와 고지도 관람", desc_en: "Step onto the 8th-floor observation deck of the golden tower to view old city maps" },
      { name_ko: "시텐노지 고대 불교 사원 정밀 도슨트", name_en: "Shitennoji Ancient Temple Walk", duration: 90, desc_ko: "593년에 창건된 일본 최초 관사, 5층 목조탑과 붉은 기둥 툇마루 감상", desc_en: "Walk through Japan's oldest state temple and admire the historic five-story pagoda" },
      { name_ko: "스미요시 다이샤 신사 붉은 다리 관람", name_en: "Sumiyoshi Taisha Shrine Bridge Tour", duration: 90, desc_ko: "아치형으로 높게 솟은 전통 반원형 홍교 다리 위에서 찍는 힐링 기념샷", desc_en: "Cross the historic steep Sorihashi red wooden bridge over a lotus pond" },
      { name_ko: "가미가타 우키요에 박물관 판화 체험", name_en: "Kamigata Ukiyoe Museum Print Shop", duration: 80, desc_ko: "에비수바시 옆 작은 미술관에서 에도 시대 가부키 배우 목판화 역사 감상", desc_en: "View unique theatrical woodblock prints and try printing your own multi-color card" },
      { name_ko: "국립 분라쿠 극장 전통 인형극 맛보기", name_en: "National Bunraku Theatre Puppetry", duration: 120, desc_ko: "세 명의 인형사가 조종하는 섬세한 유네스코 세계무형유산 인형극 체험", desc_en: "Witness historic doll theatrical shows set to shamisen string music storytelling" }
    ],
    activity: [
      { name_ko: "유니버설 스튜디오 재팬 (USJ) 스릴 라이드", isLandmark: true, name_en: "Universal Studios Japan Adventure", duration: 300, desc_ko: "해리포터 포비든 저니 비행 시뮬레이터 및 닌텐도 마리오카트 어트랙션", desc_en: "Immersive theme park rides featuring Mario Kart racing and flying dragons" },
      { name_ko: "템포잔 초대형 대관람차 공중 뷰", name_en: "Tempozan Giant Ferris Wheel", duration: 60, desc_ko: "바닥이 투명한 크리스탈 캐빈을 타고 오사카항 서쪽 지평선 감상", desc_en: "Ride the transparent-floor glass cabin overlooking the Osaka bay area ports" },
      { name_ko: "쯔텐카쿠 타워 슬라이더 고속 활강", name_en: "Tsutenkaku Tower High-Speed Slider", duration: 80, desc_ko: "전망대 3층에서 지하 1층까지 나선형으로 미끄러져 내려가는 10초 스릴", desc_en: "Slide down a transparent tube wrapped around the historic tower frame" },
      { name_ko: "오사카 도심 스트릿 고카트 드라이빙", name_en: "Osaka Street Go-Kart Dotonbori Route", duration: 120, desc_ko: "캐릭터 코스튬을 착용하고 미도스지 대로와 도톤보리 다리 질주하기", desc_en: "Zip through downtown streets in a customized open-air mini cart with costume" },
      { name_ko: "산타마리아 범선 오사카항 유람", name_en: "Santa Maria Cruise Sailing", duration: 90, desc_ko: "콜럼버스의 신대륙 발견 돛배를 2배 크기로 재현한 크루즈 바닷바람 체험", desc_en: "Board the wooden replica tall ship sailing across the industrial harbor channels" }
    ],
    shopping: [
      { name_ko: "신사이바시스지 아케이드 스트릿 쇼핑", name_en: "Shinsaibashi-suji Shopping Street", duration: 120, desc_ko: "지붕 덮인 거대한 의류 쇼핑 천국, 드럭스토어 화장품 패키지 쇼핑", desc_en: "Browse late-night tax-free cosmetic shops and international fashion chains" },
      { name_ko: "오렌지 스트리트 편집숍 & 가구 쇼룸", name_en: "Orange Street Vintage Boutique", duration: 120, desc_ko: "미나미호리에 골목, 힙스터 감성의 아메카지 셔츠와 스트릿 패션 컬렉션", desc_en: "Stroll stylish pathways featuring local skater labels and wooden vintage furniture" },
      { name_ko: "우메다 헵파이브 & 한큐 패션 빌리지", name_en: "Umeda Hep Five Young & Classic Mall", duration: 150, desc_ko: "빨간 관람차가 솟아있는 영캐주얼 쇼핑몰과 고급 백화점 식기 쇼핑", desc_en: "Explore multi-level fashion towers filled with local designer labels" },
      { name_ko: "덴덴타운 피규어 & 애니메이션 쇼핑", name_en: "Den Den Town Anime & Figure Market", duration: 120, desc_ko: "오사카의 서브컬처 중심지, 희귀 중고 피규어와 비디오 게임 쇼룸 득템", desc_en: "Browse vintage plastic models, retro gaming consoles, and trading cards" },
      { name_ko: "린쿠 프리미엄 아울렛 야외 쇼핑", name_en: "Rinku Premium Outlets Seaside Shopping", duration: 240, desc_ko: "간사이 공항 직전, 야자수 우거진 하얀 리조트 분위기 아울렛 특가 쇼핑", desc_en: "Seaside outdoor malls offering discounted sports and luxury European brands" }
    ]
  },
  paris: {
    healing: [
      { name_ko: "센강 유람선 바토무슈 탑승", name_en: "Seine River Cruise Bateaux Parisiens", duration: 70, desc_ko: "잔잔한 클래식 음악을 들으며 선상에서 바라보는 노트르담 성당", desc_en: "Cruising down the Seine river looking at classic landmarks at sunset" },
      { name_ko: "튈르리 정원 초록 의자 힐링", name_en: "Tuileries Garden Green Chair Relaxation", duration: 90, desc_ko: "분수대 앞에 초록 의자를 놓고 조용히 에스프레소 마시기", desc_en: "Sit in a signature green metal chair near the fountain enjoying espresso" },
      { name_ko: "룩셈부르크 정원 피크닉", name_en: "Jardin du Luxembourg Picnic", duration: 90, desc_ko: "아름다운 메디치 분수 근처 화단에서 샌드위치를 먹으며 휴식", desc_en: "Relax near the Medici fountain with a fresh baguette sandwich in hand" },
      { name_ko: "생마르탱 운하 철교 걷기", name_en: "Canal Saint-Martin Promenade", duration: 100, desc_ko: "영화 '아멜리에'의 배경, 철교 위에서 조용히 운하 물결 감상", desc_en: "Walk along iron footbridges and watch boats pass through canal locks" },
      { name_ko: "뷔트 쇼몽 공원 숲길 하이킹", name_en: "Parc des Buttes-Chaumont Trail", duration: 120, desc_ko: "인공 절벽 위의 사원과 현수교를 따라 산책하는 비밀의 숲 코스", desc_en: "Hike steep winding grass paths to view the temple atop an island cliff" }
    ],
    gourmet: [
      { name_ko: "루 마레 지구 로컬 크레페 & 마카롱", name_en: "Le Marais Creperie & Macaron Shop", duration: 90, desc_ko: "유서 깊은 빵집에서 바삭한 크루아상และ 알록달록 마카롱 시식", desc_en: "Tasting crispy croissants, hot crepes, and colorful luxury macarons" },
      { name_ko: "안젤리나 티룸 핫초코 & 몽블랑 디저트", name_en: "Angelina Tea Room Mont Blanc Feast", duration: 90, desc_ko: "오드리 햅번이 즐겨 찾던 럭셔리 티룸에서 녹진한 쇼콜라 쇼 시음", desc_en: "Sip ultra-rich hot chocolate and famous chestnut cream pastries" },
      { name_ko: "마레지구 L'As du Fallafel 샌드위치", name_en: "L'As du Fallafel Middle-East Streetfood", duration: 60, desc_ko: "줄 서서 받아 먹는 바삭한 병아리콩 튀김 팔라펠 피타 브레드", desc_en: "Taste the legendary crunchy chickpea patties in warm pita with eggplant" },
      { name_ko: "Bouillon Chartier 전통 비스트로 저녁", name_en: "Bouillon Chartier French Diner", duration: 100, desc_ko: "1896년에 개업한 유서 깊은 식당에서 가성비 에스카르고와 에이프런 웨이터", desc_en: "Enjoy butter snails and duck confit inside an art deco historic dining room" },
      { name_ko: "생제르맹 카페 드 플로르 클래식 아침", name_en: "Café de Flore Historic Breakfast", duration: 90, desc_ko: "사르트르와 보부아르가 집필을 하던 야외 테라스석 커피와 오믈렛", desc_en: "Sit on legendary wicker chairs for espresso and soft buttery eggs" }
    ],
    culture: [
      { name_ko: "루브르 박물관 도슨트 명화 투어", name_en: "Louvre Museum Guided Art Tour", duration: 180, desc_ko: "모나리자, 비너스 상 등 교과서 속 걸작들을 전문가 해설과 관람", desc_en: "Viewing Mona Lisa and Winged Victory with a professional art curator" },
      { name_ko: "오르세 미술관 인상주의 투어", name_en: "Musée d'Orsay Impressionism Tour", duration: 150, desc_ko: "기차역을 개조한 미술관에서 모네, 고흐, 르누아르 명화 정밀 감상", desc_en: "Stunning art halls filled with Van Gogh's portraits and Monet's lilies" },
      { name_ko: "퐁피두 센터 현대미술 기획전", name_en: "Centre Pompidou Modern Art View", duration: 120, desc_ko: "파격적인 파이프 노출 건물 내부에서 감상하는 피카소와 칸딘스키", desc_en: "Vibrant pipe-clad structure hosting contemporary arts and panoramic views" },
      { name_ko: "생트샤펠 대성당 스테인드글라스 관람", name_en: "Sainte-Chapelle Stained Glass Wonder", duration: 90, desc_ko: "사방이 온통 거대한 유리 모자이크 보석 상자 같은 고딕 예배당 관람", desc_en: "Behold the towering 15-meter biblical windows illuminated by sunlight" },
      { name_ko: "베르사유 궁전 & 거울의 방 투어", name_en: "Palace of Versailles Grand Tour", duration: 240, desc_ko: "눈부신 프랑스 절대 왕정의 정수, 대정원 분수쇼와 거울의 방 도슨트", desc_en: "Explore the golden chambers of Louis XIV and massive royal garden canals" }
    ],
    activity: [
      { name_ko: "몽마르트르 언덕 자전거 하이킹", name_en: "Montmartre Hill Bike Hiking", duration: 120, desc_ko: "로맨틱한 골목길 오르막을 전기 자전거로 정복하기", desc_en: "Pedaling up winding cobblestone lanes on e-bikes to Sacre-Coeur" },
      { name_ko: "파리 지하 묘지 카타콤 모험", name_en: "Catacombs of Paris Underground Tour", duration: 90, desc_ko: "600만 기의 해골이 질서정연하게 쌓인 서늘한 지하 미로 트래킹", desc_en: "Walk through cold tunnels lined with centuries of skeletal remains" },
      { name_ko: "에펠탑 전망대 타워 클라이밍 하이킹", isLandmark: true, name_en: "Eiffel Tower Ascent Challenge", duration: 120, desc_ko: "걸어서 2층까지 계단으로 오른 뒤 도보로 도심 전망을 만끽하는 액티비티", desc_en: "Climb 674 metal steps up to the second floor platform for thrilling views" },
      { name_ko: "디즈니랜드 파리 올데이 어트랙션", name_en: "Disneyland Paris Adventure Pass", duration: 300, desc_ko: "동화 속 잠자는 숲속의 미녀 성과 썬더 마운틴 롤러코스터 탑승", desc_en: "Enjoy the fairy castle, Star Wars simulators, and daily evening parades" },
      { name_ko: "플라이뷰 파리 가상 패러글라이딩", name_en: "FlyView Paris VR Experience", duration: 60, desc_ko: "VR 시뮬레이터 장비를 탑승하고 파리 주요 유적 위를 나는 듯한 가상 비행", desc_en: "Tethered jetpack simulation swooping over the Notre-Dame and Arc de Triomphe" }
    ],
    shopping: [
      { name_ko: "개선문 & 샹젤리제 거리 산책", name_en: "Arc de Triomphe & Champs-Elysees Stroll", duration: 120, desc_ko: "웅장한 개선문을 관람하고 개선문에서 이어지는 세계적인 샹젤리제 패션 거리를 걷는 코스", desc_en: "Admire the majestic Arc de Triomphe and stroll down the world-famous Champs-Elysees boulevard.", isLandmark: true },
      { name_ko: "라파예트 백화점 돔 전망 및 쇼핑", name_en: "Galeries Lafayette Dome View", duration: 120, desc_ko: "화려한 비잔틴식 금빛 유리 돔 아래에서 벌어지는 화려한 쇼핑", desc_en: "Shop high-fashion labels under the historic stained-glass canopy" },
      { name_ko: "라발레 빌리지 명품 아울렛 쇼핑", name_en: "La Vallée Village Designer Outlet", duration: 240, desc_ko: "파리 근교 야외 쇼핑 빌리지에서 합리적인 프랑스 로컬 브랜드 사냥", desc_en: "Outdoor luxury shopping village with discounted major European labels" },
      { name_ko: "생투앙 빈티지 벼룩시장 골동품 쇼핑", name_en: "Saint-Ouen Flea Market Antiques", duration: 150, desc_ko: "유서 깊은 최대 규모 골동품 시장에서 고가구, 앤틱 주얼리 구경", desc_en: "Browse vintage leather trunks, copper utensils, and classic frames" },
      { name_ko: "셰익스피어 앤 컴퍼니 영문 서점 방문", name_en: "Shakespeare & Co Bookshop Tour", duration: 60, desc_ko: "헤밍웨이가 다녀간 따뜻한 인테리어의 센강변 책방에서 에코백 구매", desc_en: "Buy signature tote bags and stamped books in a cozy wood-beamed store" }
    ]
  },
  london: {
    healing: [
      { name_ko: "하이드 파크 서펜타인 호숫가 산책", name_en: "Hyde Park Serpentine Lake Walk", duration: 100, desc_ko: "런던 심장의 가장 큰 공원에서 야생 거위 소리를 들으며 평화로운 산책", desc_en: "Peaceful stroll watching wild geese by the lake in the heart of London" },
      { name_ko: "리젠츠 파크 퀸 메리 장미 정원 피크닉", name_en: "Regent's Park Queen Mary's Gardens", duration: 100, desc_ko: "수만 송이의 다양한 영국 장미 향에 휩싸여 잔디밭에 돗자리를 펴고 즐기는 휴식", desc_en: "Soak in perfume of thousands of blooming roses and relax on green lawns" },
      { name_ko: "그리니치 천문대 언덕 잔디밭 노을", name_en: "Greenwich Park Royal Observatory View", duration: 120, desc_ko: "본초자오선이 지나는 과학적 상징 언덕에서 감상하는 템즈강과 카나리워프 빌딩 노을", desc_en: "Look over the Thames river and Canary Wharf skyscrapers at sunset from the hill" },
      { name_ko: "리치먼드 파크 야생 사슴 관찰 산책", name_en: "Richmond Park Wild Deer Trail", duration: 150, desc_ko: "야생 사슴 수백 마리가 방목된 거대한 자연 들판 숲속을 걷는 로컬 힐링 루트", desc_en: "Walk between oak forests spotting free-roaming red deer herds" },
      { name_ko: "세인트 제임스 파크 펠리컨 힐링 산책", name_en: "St James's Park Pelican View", duration: 90, desc_ko: "버킹엄 궁전 옆 꽃길 연못을 거닐고 왕실에 기증된 거대 펠리컨 먹이주기 구경", desc_en: "Walk through flower borders and spot giant pelicans fed daily near the palace" }
    ],
    gourmet: [
      { name_ko: "버로우 마켓 피시앤칩스 & 치즈 토스트", name_en: "Borough Market Street Food", duration: 90, desc_ko: "천년 역사의 재래시장에서 갓 튀긴 대구 튀김과 줄 서서 먹는 치즈 샌드위치", desc_en: "Tasting piping hot cod fish fillets, fresh oysters, and molten cheese toast" },
      { name_ko: "리츠 호텔 클래식 애프터눈 티 체험", name_en: "The Ritz London Afternoon Tea", duration: 120, desc_ko: "드레스 코드가 있는 화려한 골드 룸에서 오리지널 스콘과 핑거 샌드위치, 티 시음", desc_en: "A historic experience of British high tea service with live piano background" },
      { name_ko: "코벤트가든 플랫아이언 가성비 스테이크", name_en: "Flat Iron Covent Garden Dinner", duration: 90, desc_ko: "도끼 모양 칼로 썰어먹는 저렴하고 부드러운 스테이크와 크림 스피니치 저녁 식사", desc_en: "Tender flat iron steak served with salted salad and delicious creamed spinach" },
      { name_ko: "디줌 코벤트가든 인도식 치킨 커리", name_en: "Dishoom Indian Bombay Cafe", duration: 100, desc_ko: "인도 뭄바이 감성의 식당에서 부드러운 갈릭 난과 블랙 달 커리, 치킨 타카 먹방", desc_en: "Taste rich black dal simmered for 24 hours and spicy tandoori chicken tikka" },
      { name_ko: "더 샤드 40층 덕앤와플 공중 조식", name_en: "Duck & Waffle 40th Floor Breakfast", duration: 90, desc_ko: "고속 엘리베이터를 타고 40층에 올라 런던 시내를 보며 바삭한 오리다리 와플 시식", desc_en: "Enjoy crispy duck confit, fried duck egg, and mustard maple syrup waffle at dawn" }
    ],
    culture: [
      { name_ko: "대영박물관 미라 & 로제타스톤 투어", isLandmark: true, name_en: "British Museum Guided Highlights", duration: 180, desc_ko: "인류 역사의 증거 로제타 스톤과 고대 이집트 미라관을 도슨트 해설과 정밀 관람", desc_en: "Tour the Rosetta Stone, Parthenon marbles, and Egyptian mummies with guides" },
      { name_ko: "내셔널 갤러리 미술 투어", name_en: "The National Gallery Highlights Tour", duration: 150, desc_ko: "트라팔가 광장 앞 미술관에서 레오나르도 다빈치, 반 고흐의 '해바라기' 명작 감상", desc_en: "Stand before Vincent van Gogh's Sunflowers and Monet's lily paintings" },
      { name_ko: "런던탑 중세 성곽 및 왕실 보물 관람", name_en: "Tower of London Crown Jewels", duration: 120, desc_ko: "천년 전 지어진 요새에서 영국 국왕들의 거대 다이아몬드 왕관과 근위병 구경", desc_en: "Explore the historic keep housing the royal collection of ceremonial regalia" },
      { name_ko: "셰익스피어 글로브 극장 야외 연극 체험", name_en: "Shakespeare's Globe Theatre Tour", duration: 100, desc_ko: "템즈강변에 재현된 원형 노천 목조 극장에서 당시 서민처럼 서서 연극 구경하기", desc_en: "Walk through the thatched roof open-air reconstruction of the 1599 theater" },
      { name_ko: "웨스트민스터 사원 역사 유물 도슨트", name_en: "Westminster Abbey Royalty Tour", duration: 120, desc_ko: "영국 국왕들의 대관식이 열리는 곳, 뉴턴, 다윈 등 위인들이 잠든 묘비실 관람", desc_en: "Tour the gothic coronation church where royal weddings and state burials happen" }
    ],
    activity: [
      { name_ko: "템즈강 런던아이 회전 관람차 탑승", isLandmark: true, name_en: "The London Eye Ride", duration: 80, desc_ko: "거대 유리 캡슐에 앉아 하늘에서 빅벤과 런던 시내 전경을 내려다보는 시간", desc_en: "Soar 135 meters above the Thames river looking over the Westminster Palace" },
      { name_ko: "템즈강 제트 스피드보트 어트랙션", name_en: "Thames Rockets Speedboat Adventure", duration: 90, desc_ko: "타워브릿지 아래를 강한 엔진 음악과 함께 질주하며 즐기는 스릴 만점 속도전", desc_en: "High-speed inflatable boat cruise blasting pop music past the Tower Bridge" },
      { name_ko: "워너브라더스 해리포터 스튜디오 투어", name_en: "Warner Bros. Studio Harry Potter Tour", duration: 240, desc_ko: "호그와트 대연회장, 다이애건 앨리 세트장을 걷고 오리지널 버터맥주 시음", desc_en: "Immersive look at filmmaking props, green-screen broom flying, and butterbeer" },
      { name_ko: "그리니치 O2 아레나 돔 지붕 등반 하이킹", name_en: "Up at The O2 Dome Roof Climb", duration: 120, desc_ko: "특수 하네스 안전장비를 착용하고 거대한 돔형 경기장 파란 천장 위를 걷는 고공 액티비티", desc_en: "Climb the suspended fabric walkway over the dome roof for 360-degree views" },
      { name_ko: "에미레이트 항공 케이블카 템즈강 횡단", name_en: "IFS Cloud Cable Car Flight", duration: 60, desc_ko: "그리니치 반도와 로열 독스를 잇는 공중 90미터 높이 케이블카에서 바라보는 전망", desc_en: "Glide over the river Thames in a cabin looking at the urban docklands skyline" }
    ],
    shopping: [
      { name_ko: "해로즈 백화점 이집트 룸 쇼핑", name_en: "Harrods Luxury Egyptian Room Shop", duration: 150, desc_ko: "왕실 납품 지정 럭셔리 백화점 내부 구경 및 유명 해로즈 시그니처 홍차 쇼핑", desc_en: "Explore the legendary Egyptian escalator halls and buy luxury tin tea cans" },
      { name_ko: "코벤트가든 피아자 플리마켓 수공예 숍", name_en: "Covent Garden Apple Market Craft Tour", duration: 120, desc_ko: "유리 아치형 천장 아래에서 열리는 플리마켓에서 수제 양초, 수공예 지갑 쇼핑", desc_en: "Browse artisan goods and watch street buskers perform opera in the central square" },
      { name_ko: "리전트 스트리트 & 햄리스 토이샵", name_en: "Regent Street & Hamleys Toy Shop", duration: 120, desc_ko: "곡선형 웅장한 아치 빌딩 아래 패션 매장 쇼핑 및 7층 규모의 영국 최대 장난감 가게 투어", desc_en: "Walk along majestic curves for global fashion and play in the giant toy store" },
      { name_ko: "노팅힐 포토벨로 로드 골동품 시장", name_en: "Portobello Road Market Antique Hunting", duration: 150, desc_ko: "영화 '노팅힐'의 파스텔톤 거리에서 앤틱 카메라, 은수저, 레트로 소품 사냥", desc_en: "Browse a mile of antique pocket watches, vintage coins, and colorful terraces" },
      { name_ko: "캠든 마켓 펑크록 빈티지 마켓 투어", name_en: "Camden Market Punk & Vintage Tour", duration: 150, desc_ko: "락 스피릿 가득한 해골 장식 건물 골목길에서 빈티지 부츠와 유니크 수공예품 쇼핑", desc_en: "Shop alternative leather fashion, custom boots, and try diverse canal food booths" }
    ]
  },
  newyork: {
    healing: [
      { name_ko: "센트럴 파크 쉽 미도우 피크닉", name_en: "Central Park Sheep Meadow Picnic", duration: 150, desc_ko: "고층 빌딩 숲으로 둘러싸인 거대 잔디 광장에 누워 느끼는 뉴요커들의 여유", desc_en: "Lay on the massive green lawn looking up at iconic Manhattan skyscrapers" },
      { name_ko: "하이라인 선형 공원 철길 산책", name_en: "The High Line Linear Walk", duration: 100, desc_ko: "폐철로를 도심 하늘정원으로 리폼한 꽃길을 걷고 허드슨강 전망 감상", desc_en: "Walk along elevated historic freight tracks blooming with wildflowers" },
      { name_ko: "브루클린 브릿지 도보 횡단 노을 관람", name_en: "Brooklyn Bridge Sunset Stroll", duration: 120, desc_ko: "고딕풍 석조 아치 아래 나무 데크 길을 걸으며 마주하는 맨해튼 스카이라인 저녁 노을", desc_en: "Cross the historic wooden pedestrian boardwalk overlooking Brooklyn Dumbo" },
      { name_ko: "브라이언트 파크 공공도서관 야외 휴식", name_en: "Bryant Park Green Lawn Coffee", duration: 90, desc_ko: "파란 하늘 아래 초록색 접이식 의자에 앉아 뉴욕 공공도서관 외벽을 보며 커피 힐링", desc_en: "Sit in a signature green bistro chair drinking blue bottle coffee near library gates" },
      { name_ko: "루즈벨트 아일랜드 트램웨이 공중 뷰", name_en: "Roosevelt Island Tramway Scenic Ride", duration: 60, desc_ko: "퀸즈보로 다리 옆을 평행하게 운행하는 빨간 케이블카에 타서 맨해튼 동서 조망", desc_en: "Ride the red aerial cable car for cheap public transit ticket fares over East River" }
    ],
    gourmet: [
      { name_ko: "첼시 마켓 랍스터 & 로컬 타코 시식", name_en: "Chelsea Market Lobster & Tacos", duration: 90, desc_ko: "옛 나비스코 공장을 리모델링한 실내 마켓에서 버터 랍스터와 멕시칸 타코 먹방", desc_en: "Taste fresh steamed red lobster tails and authentic spicy pork corn tacos" },
      { name_ko: "피터루거 브루클린 드라이에이징 스테이크", name_en: "Peter Luger Porterhouse Steak Lunch", duration: 120, desc_ko: "130년 역사의 브루클린 스테이크하우스에서 불판 위에 지글거리는 최고급 티본 스테이크", desc_en: "Savor premium butter-basted dry aged porterhouse steaks with signature sauce" },
      { name_ko: "조스 피자 타임스퀘어 뉴욕 슬라이스 피자", name_en: "Joe's Pizza Times Square Slice", duration: 45, desc_ko: "스파이더맨 피자, 얇고 짭조름한 치즈/페퍼로니 피자를 반으로 접어 길거리 시식", desc_en: "Try the thin crust piping hot tomato cheese slice loved by local NY hipsters" },
      { name_ko: "카츠 델리카테슨 훈제 양고기 샌드위치", name_en: "Katz's Delicatessen Pastrami Sandwich", duration: 80, desc_ko: "영화 '해리가 샐리를 만났을 때' 배경 식당, 고기를 산더미처럼 쌓은 수제 샌드위치", desc_en: "Feast on heavily spiced hot pastrami hand-sliced on rye with pickles" },
      { name_ko: "르뱅 베이커리 초콜릿 칩 쿠키 디저트", name_en: "Levain Bakery Giant Cookie Treat", duration: 60, desc_ko: "겉은 바삭하고 속은 초콜릿이 녹아 흐르는 묵직한 뚱뚱이 초코칩 쿠키 시식", desc_en: "Bite into the massive, warm, gooey dark chocolate chip walnut cookie" }
    ],
    culture: [
      { name_ko: "메트로폴리탄 미술관 덴두르 신전", name_en: "Metropolitan Museum Egyptian Gallery", duration: 180, desc_ko: "세계 최대 규모 미술관, 통유리 채광창 아래 위치한 이집트 실제 신전 유물 도슨트", desc_en: "View the Temple of Dendur relocated inside a massive glass wing and royal artifacts" },
      { name_ko: "모마(MoMA) 현대미술관 명화 관람", name_en: "Museum of Modern Art (MoMA) Tour", duration: 150, desc_ko: "빈센트 반 고흐의 '별이 빛나는 밤', 모네의 '수련', 피카소 아비뇽 처녀들 정밀 관람", desc_en: "Stand before the world's most famous paintings of the impressionist era" },
      { name_ko: "미국 자연사 박물관 티렉스 뼈 도슨트", name_en: "American Museum of Natural History", duration: 120, desc_ko: "영화 '박물관이 살아있다' 배경, 거대 공룡 뼈와 인류 진화 과정을 보는 전시", desc_en: "Tour iconic T-Rex skeletons and fossil exhibits inside a majestic science museum" },
      { name_ko: "브로드웨이 뮤지컬 극장 관람", name_en: "Broadway Musical Show", duration: 180, desc_ko: "타임스퀘어 브로드웨이 극장가에서 '라이온킹' 또는 '위키드' 뮤지컬의 감동", desc_en: "Experience spectacular live theatrical performances, singing, and stage designs" },
      { name_ko: "엠파이어 스테이트 빌딩 전망대 야경", isLandmark: true, name_en: "Empire State Building Observatory", duration: 90, desc_ko: "뉴욕의 고전적인 랜드마크 86층 전망대에서 내려다보는 맨해튼 고층 빌딩 야경", desc_en: "Visit the legendary Art Deco tower's open-air deck for breathtaking 360 views" }
    ],
    activity: [
      { name_ko: "써밋 원 밴더빌트 전망대 유리 바닥", name_en: "Summit One Vanderbilt Glass Floor", duration: 90, desc_ko: "거울과 유리로 둘러싸인 공중 공간에서 공중에 떠 있는 듯한 아찔한 사진 촬영", desc_en: "Walk through multi-sensory mirrored rooms and step onto glass sky boxes high above NY" },
      { name_ko: "자유의 여신상 크루즈 탑승 및 리버티 섬 방문", isLandmark: true, name_en: "Statue of Liberty Ferry", duration: 180, desc_ko: "페리를 타고 맨해튼 스카이라인을 조망하며 자유의 여신상이 있는 리버티 섬 투어", desc_en: "Board the ferry to Liberty Island and stand near the colossal copper monument" },
      { name_ko: "브루클린 덤보 붉은 벽돌 골목 사진 촬영", name_en: "Brooklyn Dumbo Photo Hop", duration: 90, desc_ko: "맨해튼 브릿지 철교 아치 사이로 엠파이어 스테이트 빌딩이 보이는 덤보 포토존 촬영", desc_en: "Snap the classic photo framed by historical red-brick warehouses and the bridge" },
      { name_ko: "코니 아일랜드 루나파크 놀이공원 롤러코스터", name_en: "Coney Island Rollercoaster", duration: 150, desc_ko: "해변가 놀이공원에서 1927년산 목조 롤러코스터 '사이클론' 타고 즐기는 클래식 스릴", desc_en: "Ride the vintage wooden roller coaster Cyclone and stroll the beach boardwalk" },
      { name_ko: "센트럴 파크 로컬 자전거 대여 및 하이킹", name_en: "Central Park Bike Rental", duration: 120, desc_ko: "자전거를 대여해 울창한 숲속 자전거 도로를 따라 베데스다 분수와 재클린 호수 완주", desc_en: "Rent a bike and pedal along scenic pathways past lakes, fountains, and woodlands" }
    ],
    shopping: [
      { name_ko: "5번가 명품 패션 플래그십 스토어 윈도우 쇼핑", name_en: "Fifth Avenue Walk", duration: 120, desc_ko: "티파니 본점, 사크스 피프스 에비뉴 등 뉴욕 최대 패션 거리 구경", desc_en: "Stroll along Manhattan's premier shopping boulevard packed with luxury designer brands" },
      { name_ko: "우드버리 커먼 아울렛 메가 세일 쇼핑", name_en: "Woodbury Common Outlets", duration: 240, desc_ko: "왕복 버스를 타고 뉴욕 외곽의 거대한 할인 매장 단지에서 프리미엄 브랜드 대규모 쇼핑", desc_en: "Spend a half day shopping at hundreds of high-end brands at discount outlet rates" },
      { name_ko: "소호 패션 골목 빈티지 편집샵 및 소품 득템", name_en: "Soho Boutiques", duration: 120, desc_ko: "주철 빌딩 아래 빈티지 리바이스 매장과 세련된 디자인 소품샵, 카페 투어", desc_en: "Shop for indie fashion labels and aesthetic books in Manhattan's coolest district" },
      { name_ko: "메이시스 헤럴드 스퀘어 세계 최대 백화점 투어", name_en: "Macy's Herald Square", duration: 120, desc_ko: "100년 넘은 목조 에스컬레이터가 작동하는 뉴욕의 유서 깊은 거대 백화점 득템 투어", desc_en: "Browse dynamic cosmetic counters and fashion floors in this historic retail landmark" },
      { name_ko: "오큘러스 지하철 역 구조물 콤플렉스 쇼핑", name_en: "Oculus Westfield Mall", duration: 90, desc_ko: "평화의 비둘기가 날개를 편 모양의 웅장한 백색 건물 내부 하이엔드 쇼핑몰 관람", desc_en: "Shop inside the stunning Santiago Calatrava-designed transit hub near WTC" }
    ]
  },
  barcelona: {
    healing: [
      { name_ko: "바르셀로네타 해변 모래사장 일광욕", name_en: "Barceloneta Beach Sunbathing", duration: 120, desc_ko: "지중해 파도 소리를 들으며 해변 칵테일바 '치링기토'에서 모히토 한 잔", desc_en: "Enjoy mojitos at a beach chiringuito bar to the sound of Mediterranean waves" },
      { name_ko: "시우타델랴 공원 호수 돛단배 힐링", name_en: "Ciutadella Park Row Boat", duration: 100, desc_ko: "화려한 인공 폭포 아래에서 오렌지 나무 향기를 맡으며 힐링 산책", desc_en: "Walk under the grand cascade waterfall and row a boat on the palm-lined lake" },
      { name_ko: "몬주익 선인장 정원 산책", name_en: "Montjuic Cactus Garden", duration: 90, desc_ko: "지중해와 항구가 내려다보이는 이국적인 선인장 야외 정원 힐링", desc_en: "Stroll between exotic cacti overlooking the harbor and Mediterranean" },
      { name_ko: "오르타 미로 공원 산책", name_en: "Laberint d'Horta Green Maze", duration: 90, desc_ko: "나무들로 이루어진 정교한 녹색 미로를 탐험하며 정원 산책", desc_en: "Navigate the beautiful neo-classical cypress maze and historic pavilions" },
      { name_ko: "콜세롤라 국립공원 숲길 트레킹", name_en: "Collserola Forest Trail", duration: 120, desc_ko: "바르셀로나 도심 뒤편, 우거진 소나무 숲길을 따라 걷는 힐링 산책", desc_en: "Hike along high paths offering panoramic views of the city below" }
    ],
    gourmet: [
      { name_ko: "보케리아 시장 하몬 & 생과일 투어", name_en: "La Boqueria Food Market", duration: 80, desc_ko: "갓 자른 하몬 멜론, 타파스 튀김, 달콤한 백망고 생과일주스 시식", desc_en: "Taste freshly sliced jamon serrano, fried seafood plates, and fruit juices" },
      { name_ko: "엘본 지구 타파스 바 펍 크롤링", name_en: "El Born Tapas Crawl Hop", duration: 120, desc_ko: "로컬 선술집들을 돌며 판콘토마테, 꿀대구 요리와 샹그리아 시음", desc_en: "Hop between historic taverns for garlic tomato bread, honey cod, and Sangria" },
      { name_ko: "세르베세리아 카탈라나 타파스", name_en: "Cerveceria Catalana Seafood Tapas", duration: 90, desc_ko: "꿀대구, 맛조개 구이, 푸아그라 스테이크 등 로컬 인기 타파스 미식", desc_en: "Taste legendary razor clams, honey cod, and beef tenderloin montaditos" },
      { name_ko: "츄레리아 갓 튀긴 Churros 디저트", name_en: "Xurreria Trevi Hot Churros", duration: 60, desc_ko: "고딕 지구 골목길에서 컵에 든 따끈한 설탕 츄러스를 초코 소스에 푹 찍먹", desc_en: "Dip crispy freshly-made hot churros into thick dark chocolate sauce" },
      { name_ko: "캔마요 해산물 빠에야 점심 식사", name_en: "Can Majo Beachside Paella Lunch", duration: 90, desc_ko: "바르셀로네타 해변가 야외 테이블에서 즐기는 전통 랍스터 먹물 빠에야", desc_en: "Savor premium saffron seafood rice cooked in a traditional flat black pan" }
    ],
    culture: [
      { name_ko: "사그라다 파밀리아 성당 내부 투어", isLandmark: true, name_en: "Sagrada Familia Basilica Tour", duration: 120, desc_ko: "가우디가 일생을 바친 숲속 나뭇가지 형상의 화려한 기둥과 스테인드글라스 관람", desc_en: "Behold the towering organic columns illuminated in warm red and blue sun rays" },
      { name_ko: "구엘 공원 가우디 모자이크 투어", isLandmark: true, name_en: "Park Guell Gaudi Mosaic Walk", duration: 100, desc_ko: "동화 속 과자의 집과 도마뱀 분수가 위치한 아름다운 경사 공원", desc_en: "Explore curved mosaic serpentine benches looking over the Barcelona skyline" },
      { name_ko: "카사바트요 지중해 물결 야간 관람", name_en: "Casa Batllo Immersive Blue Tour", duration: 90, desc_ko: "지중해 바다 내부를 걷는 듯한 곡선 천장과 기괴한 뼈대 외관 관람", desc_en: "Tour the marine-inspired architectural masterpiece designed by Antoni Gaudi" },
      { name_ko: "카사밀라 라 페드레라 석조 투어", name_en: "Casa Mila Pedrera Quarry Tour", duration: 90, desc_ko: "물결치는 석회암 외벽과 투구 쓴 전사 모양의 루프탑 굴뚝 감상", desc_en: "Walk through the wavy stone apartment building and climb the chimney roof" },
      { name_ko: "피카소 미술관 초기 회화 관람", name_en: "Picasso Museum Barcelona", duration: 100, desc_ko: "고딕 지구 중세 대저택 내부에 전시된 피카소의 청색 시대 초기 명화 감상", desc_en: "Observe early developmental sketch drawings and classic blue-period canvases" }
    ],
    activity: [
      { name_ko: "몬세라트 산악열차 등반 트레킹", name_en: "Montserrat Cogwheel Train Hike", duration: 240, desc_ko: "톱니모양 기암괴석 절벽 사이의 수도원에서 검은 성모상 관람", desc_en: "Ride the cogwheel train up serrated rock mountains and visit the monastery" },
      { name_ko: "캄프 누 FC 바르셀로나 경기장 투어", name_en: "Camp Nou Stadium Tour", duration: 120, desc_ko: "메시의 발자취가 깃든 유서 깊은 라커룸과 잔디 피치 진입 체험", desc_en: "Walk through players' tunnels and see the massive stadium trophies display" },
      { name_ko: "포르투아벤투라 테마파크 롤러코스터", name_en: "PortAventura Theme Park Ride", duration: 300, desc_ko: "유럽 최대 높이의 자이언트 롤러코스터 샴발라 탑승과 익스트림 스릴", desc_en: "Enjoy high-speed loops and drop coasters at Spain's premier amusement park" },
      { name_ko: "티비다보 놀이공원 관람차 탑승", name_en: "Tibidabo Amusement Park Ride", duration: 150, desc_ko: "바르셀로나에서 가장 높은 티비다보 산 정상에서 레트로 관람차 타고 시내 조망", desc_en: "Ride classic colorful planes and retro ferris wheels overlooking oceans" },
      { name_ko: "바르셀로나 항구 케이블카 탑승", name_en: "Barcelona Port Cable Car Ride", duration: 80, desc_ko: "몬주익 언덕과 바르셀로네타 항구 타워를 잇는 붉은 케이블카 공중 횡단", desc_en: "Gliding high above the harbor docks with amazing views of beaches" }
    ],
    shopping: [
      { name_ko: "그라시아 거리 스페인 로컬 브랜드 쇼핑", name_en: "Passeig de Gracia Fashion Hop", duration: 120, desc_ko: "자라 본점, 마시모두티, 캠퍼 등 스페인 대표 패션 브랜드 면세 사냥", desc_en: "Shop Spanish designer labels along the tree-lined luxury shopping boulevard" },
      { name_ko: "포르탈 델 앙헬 보행자 쇼핑 스트릿", name_en: "Portal de l'Angel Shopping Walk", duration: 90, desc_ko: "카탈루냐 광장 아래 보행자 전용 거리의 아기자기한 옷가게와 에스파듀 슈즈 쇼핑", desc_en: "Stroll lively pathways lined with local footwear shops and retail chains" },
      { name_ko: "엘코르테잉글레스 백화점 식료품 쇼핑", name_en: "El Corte Ingles Catalunya", duration: 100, desc_ko: "카탈루냐 광장 백화점 식품관에서 스페인 꿀 국화차와 트러플 오일 쇼핑", desc_en: "Browse olive oil selections and traditional sweet chamomile teas" },
      { name_ko: "라로카 빌리지 메가 아울렛 쇼핑", name_en: "La Roca Village Outlet Shopping", duration: 240, desc_ko: "셔틀 버스를 타고 이동하는 파스텔톤 야외 빌리지 쇼핑몰 특가 사냥", desc_en: "Explore discounted luxury European brands at an open-air village" },
      { name_ko: "아레나스 드 바르셀로나 투우장 몰", name_en: "Arenas de Barcelona Mall Tour", duration: 90, desc_ko: "옛 원형 투우장을 리모델링한 복합 쇼핑몰 구경 및 원형 옥상 조망", desc_en: "Shop international brands and walk on the circular panoramic roof deck" }
    ]
  },
  rome: {
    healing: [
      { name_ko: "빌라 보르게세 공원 오렌지 정원 산책", name_en: "Villa Borghese Gardens Walk", duration: 100, desc_ko: "도심 속 소나무 숲길 산책 및 테라스에서 로마 시내 감상", desc_en: "Stroll under iconic stone pines and view the city from the Pincio terrace" },
      { name_ko: "자니콜로 언덕 노을 오션뷰 전망", name_en: "Janiculum Hill Sunset View", duration: 90, desc_ko: "석양이 성 베드로 성당 돔을 붉게 적시는 파노라마 광경 힐링", desc_en: "Relax on stone walls watching the sunset dye Vatican domes in gold" },
      { name_ko: "아벤티노 언덕 열쇠구멍 정원 길", name_en: "Aventine Keyhole Garden Path", duration: 80, desc_ko: "비밀스러운 열쇠구멍 너머로 보이는 성 베드로 대성당 돔 감상", desc_en: "Peek through the famous brass keyhole to view the perfectly aligned Vatican dome" },
      { name_ko: "티베르 강변 느티나무 가로수 도보", name_en: "Tiber River Promenade Walking", duration: 90, desc_ko: "강바람을 쐬며 오랜 돌다리들을 구경하는 로컬 산책", desc_en: "Walk along the waterfront under shading sycamore trees at dusk" },
      { name_ko: "카라칼라 대욕장 유적 풀밭 산책", name_en: "Baths of Caracalla Ruins Stroll", duration: 100, desc_ko: "초원 위에 솟아오른 웅장한 붉은 벽돌 고대 욕장 유적 속 산책", desc_en: "Explore giant brick vaults and ancient mosaic floors in a quiet park" }
    ],
    gourmet: [
      { name_ko: "트레비 분수 근처 수제 젤라토 투어", name_en: "Trevi Fountain Gelato Crawl", duration: 60, desc_ko: "분수에 동전을 던진 후 100년 전통 젤라떼리아에서 리조(쌀) 맛 시식", desc_en: "Throw coins into the fountain and savor creamy rice-flavored gelato" },
      { name_ko: "트라스테베레 로컬 생파스타 저녁", name_en: "Trastevere Handcrafted Pasta Dinner", duration: 90, desc_ko: "덩굴 식물 덮인 골목 레스토랑에서 짭조름한 카르보나라와 피자", desc_en: "Enjoy authentic egg-yolk carbonara inside a cozy vine-covered alley pub" },
      { name_ko: "본치 피짜리움 사각 로마식 피자", name_en: "Bonci Pizzarium Roman Pizza Slice", duration: 60, desc_ko: "가위로 잘라 무게를 재는 뉴욕 스타일과 다른 도톰하고 다양한 토핑의 사각 피자", desc_en: "Taste legendary airy crust topped with potato, rosemary, or truffle cheese" },
      { name_ko: "안티코 카페 그레코 260년 전통 커피", name_en: "Antico Caffe Greco Espresso", duration: 60, desc_ko: "괴테와 리스트가 다녀간 로마에서 가장 오래된 카페에서 마시는 찐한 에스프레소", desc_en: "Sip espresso served by tuxedo-clad waiters inside a historic museum-like cafe" },
      { name_ko: "다 엔조 29 전통 Trattoria 요리", name_en: "Da Enzo al 29 Roman Trattoria", duration: 100, desc_ko: "오픈 전부터 줄 서는 대기 맛집에서 맛보는 양고기 갈비 구이와 크로스타타", desc_en: "Savor rich cacio e pepe and deep fried artichokes at a famous local spot" }
    ],
    culture: [
      { name_ko: "콜로세움 & 포로 로마노 내부 투어", isLandmark: true, name_en: "Colosseum & Roman Forum Guide", duration: 150, desc_ko: "검투사들이 땀 흘리던 거대 원형 경기장 바닥과 황제들의 폐허 유적 관람", desc_en: "Stand inside the Gladiator arena floor and tour the ancient palace ruins" },
      { name_ko: "바티칸 박물관 미켈란젤로 벽화 도슨트", isLandmark: true, name_en: "Vatican Museum & Sistine Chapel", duration: 180, desc_ko: "시스티나 성당의 천장화 '천지창조'와 라파엘로의 아테네 학당 정밀 감상", desc_en: "Observe Renaissance masterpieces and Michelangelo's Last Judgment" },
      { name_ko: "판테온 신전 천장 오쿨루스 관람", name_en: "Pantheon Dome Oculus Visit", duration: 90, desc_ko: "2천년 전 지어진 기적의 콘크리트 돔, 하늘을 향해 뚫린 천창 관람", desc_en: "Behold the perfectly preserved ancient concrete dome and its light shaft" },
      { name_ko: "성 베드로 대성당 쿠폴라 전망대 등반", name_en: "St. Peter's Basilica Dome Climb", duration: 120, desc_ko: "교황청의 본산 내부 관람 후 좁은 나선형 계단을 올라 광장 전망대 관람", desc_en: "Climb up the steep dome structure for the iconic keyhole square vista" },
      { name_ko: "천사의 성 산탄젤로 요새 관람", name_en: "Castel Sant'Angelo Angel Statue", duration: 100, desc_ko: "하드리아누스 황제의 무덤이자 중세 요새였던 성벽에서 템즈강 대교 전망", desc_en: "Explore the cylindrical fortress and view stunning bronze angel sculptures" }
    ],
    activity: [
      { name_ko: "로마 빈티지 베스파 오토바이 투어", name_en: "Rome Vintage Vespa Motorcycle Tour", duration: 120, desc_ko: "영화 '로마의 휴일' 처럼 전문 기사와 베스파를 타고 고대 골목 질주", desc_en: "Zip through ancient Roman ruins as a passenger on a classic scooter" },
      { name_ko: "티베르 강 카약 레이싱 체험", name_en: "Tiber River Kayaking Adventure", duration: 120, desc_ko: "로마 한가운데를 흐르는 역사적인 강줄기를 따라 노 젓는 레포츠", desc_en: "Paddle down the historic Tiber River passing under ancient brick bridges" },
      { name_ko: "로마 검투사 학교 일일 무술 강습", name_en: "Gladiator School Training", duration: 150, desc_ko: "고대 검투사 장비를 착용하고 나무 목검으로 격투 기술을 배우는 이색 스포츠", desc_en: "Wear tunics and practice ancient sword-fighting techniques with coaches" },
      { name_ko: "아피아 가도 역사유적 자전거 하이킹", name_en: "Appian Way Bike Historic Trail", duration: 180, desc_ko: "고대 로마인들이 깔아둔 커다란 돌바닥 도로를 따라 달리는 야외 레저", desc_en: "Pedal past catacombs and crumbling tomb monuments on e-bikes" },
      { name_ko: "로컬 키친 홈메이드 파스타 요리 교실", name_en: "Rome Pasta Making Class", duration: 120, desc_ko: "이탈리아 셰프와 함께 밀가루 반죽부터 생면을 뽑아 카르보나라 요리 체험", desc_en: "Learn to roll dough and make authentic sauces in a homey local kitchen" }
    ],
    shopping: [
      { name_ko: "코르소 거리 이탈리아 가죽 소품 쇼핑", name_en: "Via del Corso Leather Shopping", duration: 120, desc_ko: "장인이 직접 만든 부드러운 양가죽 자켓, 수제 지갑 매장 투어", desc_en: "Shop for bespoke Italian leather jackets and handcrafted shoes" },
      { name_ko: "스페인 광장 콘도티 명품 쇼핑", name_en: "Piazza di Spagna Condotti Brands", duration: 120, desc_ko: "스페인 계단 앞, 이탈리아 명품 브랜드 플래그십 숍 윈도우 쇼핑", desc_en: "Explore rows of luxury Italian designer showrooms on the historic street" },
      { name_ko: "캄포 데 피오리 과일 플리마켓", name_en: "Campo de' Fiori Morning Market", duration: 90, desc_ko: "광장에서 열리는 아침 노천 시장에서 트러플 소금, 파스타 면 쇼핑", desc_en: "Browse colorful stalls filled with olive oil, spices, and fresh fruits" },
      { name_ko: "프라티 지구 로컬 브랜드 로드숍", name_en: "Via Cola di Rienzo Local Shops", duration: 100, desc_ko: "바티칸 인근 현지인들이 자주 찾는 의류 편집샵과 수제 제과 쇼핑", desc_en: "Walk through high-quality shoe shops and local clothing boutiques" },
      { name_ko: "카스텔 로마노 아울렛 왕복 쇼핑", name_en: "Castel Romano Designer Outlet", duration: 240, desc_ko: "왕복 셔틀버스를 타고 이동하는 외곽 명품 쇼핑 아울렛 특가 사냥", desc_en: "Spend a half day browsing discounted premium designer goods" }
    ]
  },
  bangkok: {
    healing: [
      { name_ko: "짜오프라야 강 저녁 디너 크루즈", name_en: "Chao Phraya Princess Dinner Cruise", duration: 120, desc_ko: "라이브 재즈 음악을 들으며 선상 뷔페와 새벽 사원 라이트업 관람", desc_en: "Sail past illuminated Wat Arun temple enjoying a buffet and live sax" },
      { name_ko: "룸피니 공원 호숫가 거대 왕도마뱀 찾기", name_en: "Lumpini Park Monitor Lizard Walk", duration: 90, desc_ko: "야자수 우거진 도심 인공호수 길을 걷고 야외 운동하는 로컬 구경", desc_en: "Spot giant Monitor lizards swimming while strolling green paths" },
      { name_ko: "벤자키티 공원 숲길 스카이워크", name_en: "Benjakitti Park Forest Skywalk", duration: 90, desc_ko: "습지 위에 조성된 친환경 스카이워크 보행로를 따라 산책하며 정화", desc_en: "Walk on elevated eco-trails looking at wetlands and Bangkok highrises" },
      { name_ko: "헬스랜드 타이 전신 아로마 마사지", name_en: "Health Land Thai Massage Spa", duration: 120, desc_ko: "고급 스파 체인에서 쌓인 피로를 말끔히 풀어주는 태국 정통 전신 테라피", desc_en: "Relax inside private rooms with highly trained local masseurs" },
      { name_ko: "프라 수멘 요새 강가 잔디밭 노을", name_en: "Phra Sumen Fort Garden View", duration: 80, desc_ko: "강가 둔치에 솟아오른 하얀 요새 잔디밭에서 감상하는 석양과 바람", desc_en: "Sit on manicured lawns watching cargo boats float along the river" }
    ],
    gourmet: [
      { name_ko: "조드페어 야시장 랭쌥 & 팟타이", name_en: "Jodd Fairs Night Market Feast", duration: 100, desc_ko: "매콤새콤 고수 듬뿍 쌓인 산더미 돼지등뼈찜과 달콤한 로티 시식", desc_en: "Taste towering spicy pork rib soups and banana roti crepe snacks" },
      { name_ko: "제이파이 미슐랭 게살오믈렛 대기", name_en: "Jay Fai Michelin Crab Omelette", duration: 150, desc_ko: "스키 고글을 쓴 할머니 셰프가 숯불로 직접 튀긴 게살 가득 오믈렛", desc_en: "Watch the legendary chef cook thick fluffy crab rolls over charcoal fire" },
      { name_ko: "솜분 씨푸드 푸팟퐁커리 소스 게 요리", name_en: "Somboon Seafood Curry Crab", duration: 90, desc_ko: "부드러운 계란 소스와 튀긴 게살이 조화를 이루는 푸팟퐁커리 밥도둑", desc_en: "Savor the original fried crab meat sauteed in creamy yellow curry sauce" },
      { name_ko: "팁싸마이 얇은 지단 오리지널 팟타이", name_en: "Thipsamai Pad Thai Orange Juice", duration: 80, desc_ko: "얇은 계란 막으로 덮인 태국 대표 볶음 국수와 100% 한라봉 착즙 주스", desc_en: "Taste sweet noodle dishes and their legendary fresh orange juice bottles" },
      { name_ko: "시암스퀘어 망고탱고 디저트 & 찰밥", name_en: "Mango Tango Sweet Sticky Rice", duration: 60, desc_ko: "연유를 뿌린 달콤한 망고 찰밥과 시원한 망고 소프트아이스크림", desc_en: "Enjoy premium local mango slices paired with sweet coconut sticky rice" }
    ],
    culture: [
      { name_ko: "방콕 왕궁 & 에메랄드 사원 정밀 도슨트", isLandmark: true, name_en: "Grand Palace & Wat Phra Kaew", duration: 120, desc_ko: "눈부신 황금 탑과 화려한 유리 타일 사원, 국왕 의전실 역사 관람", desc_en: "Behold the golden chedis and the revered green jade Buddha chapel" },
      { name_ko: "새벽사원 왓 아룬 태국 전통의상 체험", isLandmark: true, name_en: "Wat Arun Traditional Dress Photo", duration: 90, desc_ko: "은빛 자개 도자기 벽을 배경으로 실크 '추따이' 의상을 입고 사진 촬영", desc_en: "Rent colorful Thai silk costumes and pose near the decorated towers" },
      { name_ko: "왓 포 거대 와불상 발바닥 조각 관람", name_en: "Wat Pho Reclining Buddha Statue", duration: 90, desc_ko: "46미터 길이의 거대한 황금 와불상과 자개로 장식된 발바닥 관람", desc_en: "Observe the massive gold-plated reclining Buddha and stupa complex" },
      { name_ko: "짐 톰슨 하우스 티크 원목 저택 가이드", name_en: "Jim Thompson House Silk Museum", duration: 90, desc_ko: "태국 실크의 대부 짐 톰슨이 수집한 아시아 골동품과 아름다운 안뜰", desc_en: "Tour the preserved traditional red teakwood homes and tropical gardens" },
      { name_ko: "에라완 사원 사면불 향 피우기", name_en: "Erawan Shrine Four-faced Brahma", duration: 60, desc_ko: "도심 한복판 소원 맛집 사원에서 올리는 향 공양과 전통 음악 공연", desc_en: "Observe locals offering garlands to the gold Brahma statue" }
    ],
    activity: [
      { name_ko: "방콕 무에타이 킥복싱 체험 강습", name_en: "Muay Thai Boxing Class Hop", duration: 90, desc_ko: "로컬 체육관에서 기본 니킥, 킥복싱 기술을 배우는 땀방울 클래스", desc_en: "Learn traditional combat strikes from professional Thai trainers" },
      { name_ko: "담넌사두억 수상시장 롱테일보트 투어", name_en: "Damnoen Saduak Floating Market", duration: 180, desc_ko: "물 위에 뜬 상점들 사이로 롱테일 보트를 타고 다니며 쌀국수 구매", desc_en: "Ride wooden boats through canal markets selling fresh mangoes and soups" },
      { name_ko: "매클롱 위험한 기찻길 시장 관람", name_en: "Maeklong Railway Market Ride", duration: 180, desc_ko: "기차가 선로를 지나갈 때 순식간에 노점 천막들을 접는 이색 풍경", desc_en: "Watch vendors instantly pack stalls as a train rolls through lanes" },
      { name_ko: "방콕 운하 골목길 자전거 가이드 투어", name_en: "Bangkok City Bicycle Alley Tour", duration: 150, desc_ko: "차량 진입이 불가한 미로 같은 골목길과 운하 다리를 건너는 가이드 하이킹", desc_en: "Explore quiet local wooden houses and narrow elevated concrete pathways" },
      { name_ko: "마하나콘 78층 루프탑 유리바닥 고공", name_en: "Mahanakhon SkyWalk Glass Floor", duration: 90, desc_ko: "방콕에서 가장 높은 빌딩 옥상의 아찔한 유리바닥 위에 누워 사진 촬영", desc_en: "Walk across the glass tray 314 meters high for a sky-high thrill" }
    ],
    shopping: [
      { name_ko: "아이콘시암 실내 야시장 쇼핑", name_en: "IconSiam Luxury Mall Shopping", duration: 120, desc_ko: "지하층 수크시암 실내 수상시장 재현 존에서 에어컨 바람 쐬며 소품 쇼핑", desc_en: "Enjoy luxury shopping alongside simulated indoor canal vendors" },
      { name_ko: "짜뚜짝 주말 시장 기념품 대량 쇼핑", name_en: "Chatuchak Weekend Market Shop", duration: 180, desc_ko: "수천 개 상점이 모인 야외 마켓에서 코끼리 바지, 아로마 비누 쇼핑", desc_en: "Browse dynamic alleyways for cheap vintage clothes and souvenirs" },
      { name_ko: "시암 파라곤 명품 및 고메마트 푸드", name_en: "Siam Paragon Shopping Hop", duration: 120, desc_ko: "태국 최대 쇼핑 콤플렉스에서 망고스틴, 건망고 기념품 쇼핑", desc_en: "Explore dynamic cosmetic counters and the massive basement food hall" },
      { name_ko: "플래티넘 패션 몰 가성비 의류 사냥", name_en: "Platinum Wholesale Fashion Mall", duration: 120, desc_ko: "시원한 실내 의류 도매 상가에서 여름 옷과 가성비 악세사리 쇼핑", desc_en: "Shop multi-level fashion malls offering cheap wholesale clothing rates" },
      { name_ko: "아시아티크 야외 선착장 마켓 & 관람차", name_en: "Asiatique Riverfront Night Market", duration: 120, desc_ko: "강가 야외 창고형 부티크 상점가 구경 및 야간 기념품 쇼핑", desc_en: "Stroll scenic boardwalk paths lined with neat handicraft boutiques" }
    ]
  },
  sydney: {
    healing: [
      { name_ko: "본다이 해안 산책로 파도 관람", name_en: "Bondi to Bronte Coastal Walk", duration: 120, desc_ko: "태평양의 거친 파도가 부서지는 오션 풀장을 내려다보며 산책", desc_en: "Walk along sandstone cliffs overlooking the famous Icebergs pool" },
      { name_ko: "왕립 보타닉 가든 하버 뷰 피크닉", name_en: "Royal Botanic Garden Walk", duration: 90, desc_ko: "오페라 하우스와 하버브릿지가 나란히 보이는 잔디밭 힐링", desc_en: "Relax on lush grass with panoramic views of the Sydney Opera House" },
      { name_ko: "하이드 파크 잔디밭 대성당 뷰 힐링", name_en: "Hyde Park Cathedral Stroll", duration: 80, desc_ko: "시드니 도심 속 분수광장과 성 마리아 성당을 보며 잔디밭 힐링", desc_en: "Sit near the Archibald Fountain looking at the gothic sandstone church" },
      { name_ko: "왓슨스 베이 갭블러프 해안 절벽 노을", name_en: "Watson's Bay Gap Bluff Lookout", duration: 100, desc_ko: "남태평양 절벽에 부서지는 파도와 깎아지른 절벽 뷰 노을 감상", desc_en: "Stand atop epic coastal cliffs watching the sunset paint the ocean" },
      { name_ko: "타롱가 동물원 페리 탑승 & 바람 쐬기", name_en: "Taronga Zoo Ferry Ocean View", duration: 80, desc_ko: "서큘러 키에서 페리를 타고 물보라를 보며 바라보는 시드니 전경", desc_en: "Ride the public ferry feeling the sea breeze with bridge views" }
    ],
    gourmet: [
      { name_ko: "시드니 피쉬마켓 신선한 랍스터 플래터", name_en: "Sydney Fish Market Oyster Lunch", duration: 90, desc_ko: "싱싱한 자연산 굴과 랍스터 버터구이를 사서 야외 데크에서 냠냠", desc_en: "Buy fresh Sydney rock oysters and grilled fish to eat by the harbor" },
      { name_ko: "더록스 역사 지구 카페 파블로바 시식", name_en: "The Rocks Cafe Pavlova Dessert", duration: 80, desc_ko: "사암 건물로 지어진 19세기 골목 카페에서 머랭 디저트와 롱블랙", desc_en: "Taste Australia's signature meringue dessert topped with fresh berries" },
      { name_ko: "달링하버 허리케인그릴 오리지널 폭립", name_en: "Hurricanes Grill Darling Harbour Ribs", duration: 90, desc_ko: "바다가 보이는 레스토랑에서 숯불 향 가득한 메가 폭립 스테이크 시식", desc_en: "Savor tender glazed pork ribs alongside crispy chips and salad" },
      { name_ko: "시티 타운홀 블랙스타 수박 딸기 케이크", name_en: "Black Star Pastry Strawberry Cake", duration: 60, desc_ko: "세계에서 가장 인스타그램에 많이 올라온 달콤한 수박 슬라이스 케이크", desc_en: "Try the iconic rose-scented cream cake layered with fresh watermelon slice" },
      { name_ko: "그라운드 오브 알렉산드리아 꽃 카페 런치", name_en: "Grounds of Alexandria Garden Lunch", duration: 100, desc_ko: "꽃 정원 테마 파크처럼 꾸며진 폐공장에서 마시는 수준 높은 플랫화이트", desc_en: "Dine inside a botanical greenhouse serving artisan local coffees" }
    ],
    culture: [
      { name_ko: "시드니 오페라 하우스 내부 정밀 도슨트", isLandmark: true, name_en: "Sydney Opera House Inside Tour", duration: 90, desc_ko: "조개껍데기 형상 세라믹 타일 설계 원리와 오케스트라 메인 홀 관람", desc_en: "Discover architectural secrets and step inside the grand concert halls" },
      { name_ko: "뉴사우스웨일스 미술관 관람", name_en: "Art Gallery of NSW Australian Art", duration: 100, desc_ko: "호주 원주민 아보리진 예술품과 아름다운 유럽 명화 무료 관람", desc_en: "Explore Indigenous collections and European classics inside classical halls" },
      { name_ko: "호주 박물관 캥거루 박제 & 인류학", name_en: "Australian Museum Highlights Tour", duration: 90, desc_ko: "호주 고유 생태계 동물 박제들과 마오리 부족의 공예품 유물 관람", desc_en: "View dinosaur fossil bones and learn indigenous natural history paths" },
      { name_ko: "시드니 현대미술관 MCA 기획전", name_en: "Museum of Contemporary Art MCA", duration: 80, desc_ko: "서큘러 키 물가에 위치한 아르데코 건물 내부 현대 개념 미술 감상", desc_en: "Browse cutting-edge local visual art and enjoy their rooftop cafe" },
      { name_ko: "하이드파크 배럭스 유네스코 죄수 유적", name_en: "Hyde Park Barracks UNESCO History", duration: 90, desc_ko: "초기 호주 개척시대 죄수들의 가혹했던 생활을 기록한 유물 역사관", desc_en: "Walk through convict hammock rooms and view colonial archaeological collections" }
    ],
    activity: [
      { name_ko: "시드니 하버브릿지 아치 브릿지클라임", isLandmark: true, name_en: "Sydney BridgeClimb Adventure", duration: 180, desc_ko: "지상 134미터 높이의 하버브릿지 쇠아치를 따라 오르는 익스트림 액티비티", desc_en: "Climb the iron arches of the bridge wearing a harness for epic views" },
      { name_ko: "맨리 비치 서핑 체험 클래스", name_en: "Manly Beach Beginner Surf Lesson", duration: 150, desc_ko: "페리를 타고 이동하여 고운 모래사장 위에서 서핑 자세 및 실전 강습", desc_en: "Catch ferry to Manly for a wetsuit lesson on paddling and standing" },
      { name_ko: "블루마운틴 레일웨이 급경사 열차 & 궤도", name_en: "Blue Mountains Scenic World", duration: 240, desc_ko: "세계에서 가장 가파른 52도 경사 산악 열차를 탑승하고 세자매봉 트레킹", desc_en: "Ride the glass-floored cableway and walk the boardwalk through rain forests" },
      { name_ko: "포트스테판 모래사막 샌드보딩 듄", name_en: "Port Stephens Sandboarding Dunes", duration: 300, desc_ko: "남태평양과 맞닿은 붉은 모래 사막 언덕에서 썰매 타고 급하강 스릴", desc_en: "Ride 4WD vehicles over high sand dunes and slide down at speed" },
      { name_ko: "달링하버 오즈젯보트 270도 스핀 레저", name_en: "Darling Harbour Jet Boat Spin", duration: 80, desc_ko: "시드니 항구 물살을 가르며 음악과 함께 급회전하는 파워 스피드 보트", desc_en: "Buckle up for a wet ride featuring 270-degree spins near the bridge" }
    ],
    shopping: [
      { name_ko: "QVB 퀸 빅토리아 빌딩 쇼핑", name_en: "Queen Victoria Building Shopping", duration: 100, desc_ko: "아름다운 비잔틴 돔과 역사적인 수동 엘리베이터가 있는 쇼핑몰", desc_en: "Shop inside a Romanesque Revival landmark featuring stained glass" },
      { name_ko: "패딩턴 마켓 디자이너 플리마켓 소품", name_en: "Paddington Market Local Crafts", duration: 120, desc_ko: "토요일마다 열리는 플리마켓에서 수제 에코백, 악세사리 쇼핑", desc_en: "Browse dynamic local fashion tags, arts, and unique hand soaps" },
      { name_ko: "웨스트필드 시디 백화점 쇼핑 & 굿즈", name_en: "Westfield Sydney City Mall", duration: 120, desc_ko: "시드니 중심가의 초대형 쇼핑 타워에서 유명 의류 브랜드 및 영양제 쇼핑", desc_en: "Shop international fast fashion and premium Australian health goods" },
      { name_ko: "버큰헤드 포인트 아울렛 항구 쇼핑", name_en: "Birkenhead Point Outlet Centre", duration: 180, desc_ko: "하버가 한눈에 내려다보이는 해안가 아울렛 매장에서 유명 스포츠 의류 세일 사냥", desc_en: "Browse discounted designer warehouses overlooking marina yachts" },
      { name_ko: "조지 스트리트 보행자길 로드숍 팝업", name_en: "George Street Apple Store Hop", duration: 90, desc_ko: "시드니의 중심가 보행자 전용도로를 따라 걷는 호주 기념품 상점 구경", desc_en: "Walk along city tram tracks shopping for local woolen ugh boots and creams" }
    ]
  },
  singapore: {
    healing: [
      { name_ko: "가든스바이더베이 플라워 돔 온실", isLandmark: true, name_en: "Gardens by the Bay Conservatories", duration: 120, desc_ko: "세계 최대 유리 온실과 안개 속 실내 인공 폭포 힐링 산책", desc_en: "Stroll between Mediterranean olive groves and the indoor Cloud Mountain waterfall" },
      { name_ko: "이스트코스트 해변 자전거 하이킹", name_en: "East Coast Park Seaside Cycling", duration: 120, desc_ko: "시원한 바닷바람을 맞으며 코코넛 나무 사이 자전거 전용로 주행", desc_en: "Rent a bike and pedal down seaside paths bordered by coconut groves" },
      { name_ko: "싱가포르 보타닉 가든 국립 오키드", name_en: "Singapore Botanic Gardens Orchid View", duration: 100, desc_ko: "싱가포르 최초 유네스코 유적 식물원에서 즐기는 희귀 난초 정원 산책", desc_en: "Admire thousands of colorful orchid species in manicured landscapes" },
      { name_ko: "헨더슨 웨이브 목조 파도 다리 트레킹", name_en: "Southern Ridges Henderson Waves", duration: 90, desc_ko: "구불구불한 물결 모양의 목조 공중 보행 대교에서 숲을 내려다보며 힐링", desc_en: "Walk along the highest pedestrian bridge in SG surrounded by canopy forest" },
      { name_ko: "포트캐닝 공원 원형 나무 터널 노을", name_en: "Fort Canning Park Tree Tunnel", duration: 80, desc_ko: "인스타그램 핫플레이스인 지하 원형 돌계단 위를 덮은 거대 나무 구경", desc_en: "Spot the ancient spiral staircase lined by massive overhanging roots" }
    ],
    gourmet: [
      { name_ko: "라우파삿 사테 거리 야외 맥주 파티", name_en: "Lau Pa Sat Satay Street Dinner", duration: 90, desc_ko: "빌딩숲 도로를 막고 여는 야외 마켓에서 숯불 사테 꼬치구이 시식", desc_en: "Feast on grilled chicken and beef skewers dipped in peanut gravy" },
      { name_ko: "맥스웰 푸드센터 로컬 치킨라이스", name_en: "Maxwell Food Centre Hainanese Chicken", duration: 70, desc_ko: "부드럽게 삶아낸 닭고기와 마늘기름 밥, 매콤한 칠리소스의 조화", desc_en: "Try the Michelin-plated Tian Tian chicken rice at a busy hawker stall" },
      { name_ko: "클락키 점보 씨푸드 칠리크랩 저녁", name_en: "Jumbo Seafood Chilli Crab Dinner", duration: 100, desc_ko: "싱가포르 최고의 명물 칠리크랩 소스에 갓 튀긴 꽃빵을 찍먹하는 야외 만찬", desc_en: "Savor mud crabs tossed in spicy-sweet tomato sauce beside the river" },
      { name_ko: "차이나타운 야쿤 카야버터 토스트 조식", name_en: "Ya Kun Kaya Toast Traditional Cafe", duration: 60, desc_ko: "숯불에 구워낸 바삭한 빵 사이에 카야 잼과 차가운 버터, 반숙란의 조화", desc_en: "Try authentic coffee breakfast served with soft-boiled eggs and dark soy" },
      { name_ko: "아틀라스 바 아트데코 칵테일 바 미식", name_en: "Atlas Bar Art Deco Cocktail", duration: 90, desc_ko: "웅장한 고딕식 빌딩 내부, 세계 최대 규모의 진 타워 앞에서 마시는 칵테일", desc_en: "Enjoy premium liquors inside a majestic gold gilded drinking salon" }
    ],
    culture: [
      { name_ko: "싱가포르 국립박물관 멀티미디어 투어", name_en: "National Museum of Singapore Tour", duration: 120, desc_ko: "싱가포르의 어촌 역사부터 현대 금융 허브까지 홀로그램 전시", desc_en: "Walk through interactive video dome galleries showing early Malay histories" },
      { name_ko: "차이나타운 불아사 용화원 관람", name_en: "Buddha Tooth Relic Temple Visit", duration: 90, desc_ko: "화려한 당나라 양식의 사찰 내부와 황금빛 불치 사리함 관람", desc_en: "Enter the grand Tang-style temple housing a sacred tooth relic" },
      { name_ko: "내셔널 갤러리 싱가포르 미술 관람", name_en: "National Gallery Singapore Art", duration: 120, desc_ko: "구 시청과 대법원 건물을 현대적으로 개조한 동남아 최대 미술관 투어", desc_en: "View imperial courtroom architecture and regional modern painting halls" },
      { name_ko: "페라나칸 박물관 중국-말레이 가옥", name_en: "Peranakan Museum Culture Houses", duration: 90, desc_ko: "동남아 로컬 해상 무역의 상징, 페라나칸 가구, 도자기, 자수 문화 관람", desc_en: "Explore the hybrid Chinese-Malay heritage objects and wedding dresses" },
      { name_ko: "아랍 스트리트 술탄 모스크 황금 돔", name_en: "Kampong Glam Malay Heritage Centre", duration: 80, desc_ko: "싱가포르에서 가장 크고 웅장한 이슬람 사원의 거대한 황금 돔 외관 관람", desc_en: "Walk past Middle-Eastern shops on Bussorah Street leading to the mosque" }
    ],
    activity: [
      { name_ko: "센토사 루지 & 케이블카 레이싱", isLandmark: true, name_en: "Sentosa Skyline Luge & Cable Car", duration: 120, desc_ko: "숲속 카트를 타고 경사로를 미끄러지듯 질주하는 아웃도어 스릴", desc_en: "Steer wheeled gravity carts down concrete tracks winding to the beach" },
      { name_ko: "나이트 사파리 야간 전동 트램 투어", name_en: "Night Safari Open Tram Experience", duration: 150, desc_ko: "울타리 없이 방사된 야행성 동물들을 전동 트램을 타고 관찰", desc_en: "Spot nocturnal lions, rhinos, and tapirs under moonlit simulated rays" },
      { name_ko: "센토사 유니버설 스튜디오 어트랙션", name_en: "Universal Studios Singapore Sci-Fi", duration: 240, desc_ko: "트랜스포머 3D 배틀 라이드 및 미이라의 복수 지하 롤러코스터 탑승", desc_en: "Enjoy cutting-edge movie-themed rollercoasters and dynamic show stages" },
      { name_ko: "싱가포르 플라이어 대형 관람차 야경", name_en: "Singapore Flyer Giant Wheel", duration: 90, desc_ko: "지상 165미터 높이 거대 캡슐 안에서 내려다보는 마리나 베이의 마천루 야경", desc_en: "Board the giant observation wheel looking over F1 race tracks and docks" },
      { name_ko: "센토사 어드벤처 코브 레인보우 리프 스노클링", name_en: "Adventure Cove Waterpark Snorkel", duration: 180, desc_ko: "수만 마리의 오색 열대어와 실제 산호초 사이를 유유히 헤엄치는 해양 수영", desc_en: "Snorkel in saltwater pools packed with school of friendly rays and fishes" }
    ],
    shopping: [
      { name_ko: "오차드 로드 메가 백화점 스트리트 쇼핑", name_en: "Orchard Road Shopping Spree", duration: 150, desc_ko: "아이온 오차드, 다카시마야 등 에어컨 빵빵한 연결식 몰 투어", desc_en: "Explore massive multi-level luxury shopping complexes along the avenue" },
      { name_ko: "주얼 창이 공항 레인보트 폭포 쇼룸", name_en: "Jewel Changi Airport Vortex Fall", duration: 100, desc_ko: "공항 내 위치한 세계 최고 높이의 실내 폭포 주변 쇼핑몰 구경", desc_en: "Shop lifestyle boutique brands surrounding the massive indoor waterfall" },
      { name_ko: "부기스 스트리트 1달러 기념품 마켓", name_en: "Bugis Street Souvenir Market", duration: 90, desc_ko: "가장 저렴하게 초콜릿, 호랑이 연고, 과일 음료 등을 쇼핑하는 로컬 마켓", desc_en: "Browse dynamic covered alleys offering cheap bags, watches, and local fruits" },
      { name_ko: "하지레인 무지개 골목 빈티지 숍", name_en: "Haji Lane Boutique Alleys Graffiti", duration: 90, desc_ko: "감각적인 그래피티 벽화 사이로 숨겨진 인디 패션 브랜드 팝업 쇼핑", desc_en: "Shop eccentric designer items and handmade jewelry in a narrow street" },
      { name_ko: "리틀 인디아 무스타파 24시간 쇼핑몰", name_en: "Mustafa Centre 24 Hours Mall", duration: 120, desc_ko: "인도의 대표 만물상 백화점에서 히말라야 립밤, 카야잼 대량 쇼핑", desc_en: "Shop everything from gold, cosmetics, electronics, to groceries late at night" }
    ]
  }
,
  dubai: {
    healing: [
      { name_ko: "팜 주메이라 모노레일 산책", name_en: "Palm Jumeirah Monorail Ride", duration: 90, desc_ko: "인공 섬 팜 주메이라 해안을 모노레일을 타고 가로지르며 오션뷰 감상", desc_en: "Ride the monorail across the palm-shaped island enjoying scenic Persian Gulf views", isLandmark: true },
      { name_ko: "주메이라 퍼블릭 비치 휴식", name_en: "Jumeirah Public Beach Relaxation", duration: 120, desc_ko: "7성급 호텔 버즈 알 아랍을 배경으로 에메랄드빛 바다에서 해수욕과 휴식", desc_en: "Sunbathe on pristine sands with the iconic sail-shaped Burj Al Arab in the background" },
      { name_ko: "두바이 마리나 워크 산책", name_en: "Dubai Marina Walk Stroll", duration: 100, desc_ko: "초고층 빌딩 숲과 호화 요트 선착장 데크를 따라 걷는 낭만적인 저녁 산책", desc_en: "Stroll along the canal lined with yachts and glittering futuristic skyscrapers" },
      { name_ko: "알 마르무움 오아시스 힐링", name_en: "Al Marmoom Desert Oasis", duration: 120, desc_ko: "인공 오아시스 호숫가를 거닐며 다양한 야생 조류와 가젤 관람", desc_en: "Walk around desert lakes spotting local wild birds and free-roaming gazelles" },
      { name_ko: "두바이 미라클 가든 꽃길", name_en: "Dubai Miracle Garden Floral Trails", duration: 120, desc_ko: "사막 한가운데 피어난 1억 5천만 송이 생화 터널과 거대 비행기 꽃 조형물 감상", desc_en: "Explore the world's largest natural flower garden featuring massive floral structures" }
    ],
    gourmet: [
      { name_ko: "알 파히디 아라비안 티 하우스", name_en: "Arabian Tea House Al Fahidi", duration: 90, desc_ko: "역사지구 전통 가옥 정원에서 즐기는 정통 아랍식 브런치와 레몬 민트 주스", desc_en: "Savor authentic Emirati breakfast platter and fresh mint lemonade in a courtyard" },
      { name_ko: "수크 알 바하르 오션뷰 파인다이닝", name_en: "Souk Al Bahar Fountain View Dining", duration: 100, desc_ko: "두바이 분수쇼를 가장 가까이서 감상할 수 있는 테라스 레스토랑의 그릴 요리", desc_en: "Enjoy grilled meats with front-row terrace views of the dancing Dubai Fountains" },
      { name_ko: "알 우스타드 스페셜 케밥 맛집", name_en: "Al Ustad Special Kabab Dinner", duration: 80, desc_ko: "40년 넘는 전통의 두바이 최고 가성비 이란식 요거트 마리네이드 케밥 전문점", desc_en: "Taste legendary Persian yoghurt-marinated melt-in-mouth chicken and mutton kababs" },
      { name_ko: "바스타키아 데이트 파이 & 낙타유 카페", name_en: "Bastakiya Camel Milk Cafe", duration: 60, desc_ko: "이색적인 낙타유 라떼와 달콤한 대추야자(데이츠) 시그니처 디저트 시식", desc_en: "Try camel milk espresso lattes paired with premium Arabic sweet dates cake" },
      { name_ko: "두바이 마리나 요트 클럽 이탈리안 디너", name_en: "Dubai Marina Yacht Club Italian Dinner", duration: 90, desc_ko: "선착장 조명을 바라보며 즐기는 로맨틱한 정통 파스타와 화이트 와인", desc_en: "Savor handmade pasta and seafood inside a stylish glass dining hall by the dock" }
    ],
    culture: [
      { name_ko: "알 파히디 역사지구 흙벽 골목", name_en: "Al Fahidi Historical Neighbourhood", duration: 100, desc_ko: "에어컨 없는 옛 사막 기후를 극복하기 위해 만든 윈드타워 흙벽돌 골목길 도슨트", desc_en: "Tour the preserved 19th-century wind-tower houses and gypsum plaster lanes" },
      { name_ko: "미래 박물관 투어", name_en: "Museum of the Future Tour", duration: 120, desc_ko: "아랍 서예가 새겨진 도넛 모양 초현대 미술관의 우주 및 바이오 미래 전시 관람", desc_en: "Explore groundbreaking space and ecology exhibits inside the calligraphy-carved ring" },
      { name_ko: "두바이 프레임 골드 타워 전망", name_en: "The Dubai Frame Gold Structure", duration: 90, desc_ko: "올드 두바이와 뉴 두바이를 양옆으로 한눈에 볼 수 있는 150m 높이 액자형 전망대", desc_en: "Stand on the glass bridge of the giant golden frame dividing old and new Dubai skyline" },
      { name_ko: "셰이크 모하메드 문화이해센터", name_en: "SMCCU Cultural Understanding", duration: 120, desc_ko: "에미라티 가이드와 함께 중동 전통 가옥에서 맛있는 전통식을 먹으며 질의응답 소통", desc_en: "Enjoy traditional Emirati cuisine while discussing Islamic culture and traditions" },
      { name_ko: "두바이 오페라 클래식 콘서트 관람", name_en: "Dubai Opera Classical Concert", duration: 150, desc_ko: "전통 목조선 다우(Dhow) 모양으로 설계된 롯폰기 스타일 복합 극장에서 펼쳐지는 무대", desc_en: "Watch high-class opera or symphony performances in a dhow-inspired architectural masterpiece" }
    ],
    activity: [
      { name_ko: "버즈 칼리파 전망대 고공 뷰", name_en: "Burj Khalifa At the Top Sky", duration: 120, desc_ko: "세계 최고층 빌딩 124층/148층 전망대에서 한눈에 내려다보는 사막과 빌딩 스카이라인", desc_en: "Ascend the world's tallest building for breathtaking views from the 124th floor deck", isLandmark: true },
      { name_ko: "사막 사파리 붉은 모래 듄배싱", name_en: "Desert Safari Red Dunes Bashing", duration: 240, desc_ko: "4륜구동 SUV로 붉은 사막 언덕을 질주하고 낙타 타기 및 전통 무용 캠프 체험", desc_en: "Ride 4WD vehicles over high desert dunes and enjoy traditional belly dance camps" },
      { name_ko: "아틀란티스 더 팜 아쿠아벤처 워터파크", name_en: "Aquaventure Waterpark", duration: 240, desc_ko: "상어가 수영하는 투명 터널 속을 고속으로 미끄러져 내려가는 세계적 스릴 슬라이드", desc_en: "Plunge down near-vertical slides through shark lagoons at the palm resort" },
      { name_ko: "스카이다이브 두바이 아치 팜 뷰", name_en: "Skydive Dubai Palm Dropzone", duration: 180, desc_ko: "지상 4,000m 고도에서 팜 주메이라 섬을 바라보며 시속 200km로 하강하는 최고의 짜릿함", desc_en: "Tandem skydive over the artificial Palm Jumeirah dropzone with expert pilots" },
      { name_ko: "딥 다이브 두바이 기네스 깊이 다이빙", name_en: "Deep Dive Dubai Underwater City", duration: 150, desc_ko: "세계에서 가장 깊은 60m 침몰 도시 테마 실내 수영장에서 체험 스쿠버 다이빙 스릴", desc_en: "Explore a sunken city street replica inside the world's deepest indoor dive pool" }
    ],
    shopping: [
      { name_ko: "두바이 몰 분수 쇼 & 수족관 관람", name_en: "The Dubai Mall & Aquarium", duration: 180, desc_ko: "축구장 200개 크기 세계 최대 몰 쇼핑 및 거대 아쿠아리움 터널 관람", desc_en: "Shop international luxury labels and watch the giant indoor aquarium window" },
      { name_ko: "금 시장 & 향신료 수크 투어", name_en: "Gold Souk & Spice Souk Walking", duration: 120, desc_ko: "전통 아브라 목조 배를 타고 건너가 반짝이는 금장신구 시장과 매콤한 향신료 골목 구경", desc_en: "Ride traditional abra boat to browse gold window displays and saffron bags" },
      { name_ko: "수크 마디나 주메이라 운하 시장", name_en: "Souk Madinat Jumeirah Shopping", duration: 120, desc_ko: "전통 아라비안 요새 분위기의 세련된 몰에서 향수, 공예품 쇼핑 및 하천 아브라 탑승", desc_en: "Explore a modern bazaar with traditional wind-tower design and canal boat rides" },
      { name_ko: "에미레이트 몰 스키 두바이 실내 스노우", name_en: "Mall of the Emirates Ski Dubai", duration: 150, desc_ko: "한여름 사막 도시 속 거대한 실내 스키장 펭귄 관람 및 스포츠 의류 쇼핑", desc_en: "Shop premium activewear and visit the massive indoor snow slopes with penguins" },
      { name_ko: "이븐 바투타 몰 탐험 및 부티크 쇼핑", name_en: "Ibn Battuta Mall World Courts", duration: 120, desc_ko: "안달루시아, 중국, 이집트 등 세계 여행가 이븐 바투타 경로 테마의 화려한 돔 천장 쇼핑", desc_en: "Explore six themed courts based on historic travels featuring beautiful mosaic domes" }
    ]
  },
  munich: {
    healing: [
      { name_ko: "님펜부르크 궁전 대정원 산책", name_en: "Nymphenburg Palace Grand Garden", duration: 120, desc_ko: "화려한 바이에른 왕가 여름 별장의 운하와 야생 거위들이 노니는 숲길 힐링 산책", desc_en: "Stroll along swan canals in the summer palace gardens of Bavarian kings", isLandmark: true },
      { name_ko: "영국 정원 산책", name_en: "English Garden Munich Walk", duration: 100, desc_ko: "도심 속 거대 공원의 숲길을 걷고 강변 잔디밭에서 한적한 피크닉", desc_en: "Walk trails in one of the world's largest urban parks with beer gardens" },
      { name_ko: "올림픽 공원 언덕 노을 감상", name_en: "Munich Olympic Park Hill Sunset", duration: 90, desc_ko: "텐트 모양 지붕의 경기장과 뮌헨 시내가 한눈에 보이고 알프스 산맥까지 조망하는 언덕", desc_en: "Climb the grassy hill for panoramic sunset views over the stadium roof canopy" },
      { name_ko: "슐라이스하임 궁전 운하 정원", name_en: "Schleissheim Palace Garden Stroll", duration: 120, desc_ko: "관광객이 적고 한적한 바로크 궁전 정원의 운하를 따라 걷는 힐링 산책", desc_en: "Walk along quiet baroque palace canals and manicured green boxwood hedges" },
      { name_ko: "이자르 강변 자갈밭 발 담그기", name_en: "Isar River Shore Relaxation", duration: 90, desc_ko: "로컬 시민들처럼 강가 자갈밭 그늘에 돗자리를 펴고 차가운 맥주 한 캔의 여유", desc_en: "Relax on pebble beaches by the rushing green Isar river enjoying local beer" }
    ],
    gourmet: [
      { name_ko: "호프브로이하우스 1리터 맥주 & 학센", name_en: "Hofbrauhaus Traditional Munich Hall", duration: 100, desc_ko: "바이에른 왕실 양조장에서 라이브 아코디언 연주를 들으며 즐기는 돼지 족발 학센과 맥주", desc_en: "Savor crispy pork knuckles and 1-liter Ma beer mugs inside the historic 1589 tavern" },
      { name_ko: "빅투알리엔 마켓 수제 소시지 & 치즈", name_en: "Viktualienmarkt Cheese & Sausage Lunch", duration: 90, desc_ko: "야외 맥주 정원에서 바이스부르스트 백소시지와 갓 구운 브레첼, 로컬 머스터드 시식", desc_en: "Taste boiled white sausages with sweet mustard and soft pretzels at the market" },
      { name_ko: "달마이어 델리카테슨 고급 디저트 카페", name_en: "Dallmayr Gourmet Cafe & Chocolates", duration: 80, desc_ko: "300년 역사의 독일 황실 납품 지정 식료품점에서 마시는 커피와 고급 수제 초콜릿", desc_en: "Taste delicate pastries and specialty coffee inside Europe's famous coffee house" },
      { name_ko: "아우구스티너 켈러 야외 비어가든", name_en: "Augustiner-Keller Beer Garden", duration: 100, desc_ko: "오래된 마로니에 나무 그늘 아래에서 시원한 오리지널 라거 맥주와 바이에른식 치킨 먹방", desc_en: "Dine under massive chestnut trees tasting fresh draft lagers and traditional obatzda cheese" },
      { name_ko: "카페 루이트폴트 클래식 아침", name_en: "Cafe Luitpold Historic Bakery", duration: 80, desc_ko: "우아한 살롱 분위기의 유서 깊은 카페에서 즐기는 갓 구운 크루아상과 진한 카푸치노", desc_en: "Savor gourmet apple strudels and fresh baked rolls at Munich's grand literary cafe" }
    ],
    culture: [
      { name_ko: "마리엔 광장 & 신시청사 글로켄슈필", name_en: "Marienplatz & New Town Hall Clock", duration: 90, desc_ko: "뮌헨의 심장 마리엔 광장에서 인형이 춤추는 신시청사 시계탑 공연 관람", desc_en: "Watch the copper figures dance on the historic Glockenspiel clock tower at Marienplatz", isLandmark: true },
      { name_ko: "뮌헨 레지덴츠 궁전 보물관 투어", name_en: "Munich Residenz Royal Palace", duration: 120, desc_ko: "화려한 르네상스식 안티콰리움 홀과 비텔스바흐 왕가의 왕관 보석 관람", desc_en: "Marvel at the golden Antiquarium vault and crowns inside the Bavarian Dukes' seat" },
      { name_ko: "알테 피나코테크 중세 명화 감상", name_en: "Alte Pinakothek Masterpieces Gallery", duration: 120, desc_ko: "뒤러, 루벤스, 렘브란트 등 중세 및 바로크 거장들의 회화를 조용하게 감상", desc_en: "Stand before masterworks by Albrecht Durer and Peter Paul Rubens in grand galleries" },
      { name_ko: "도이치 박물관 과학기술 도슨트", name_en: "Deutsches Museum Science Tour", duration: 150, desc_ko: "세계 최대 규모 과학 기술 박물관에서 복원 선박, 실제 항공기, 광산 유물 관람", desc_en: "Explore full-scale ships, historic planes, and underground coal mine replicas" },
      { name_ko: "프라우엔 교회 악마의 발자국 투어", name_en: "Frauenkirche Cathedral Devil's Footprint", duration: 80, desc_ko: "뮌헨의 상징적인 쌍둥이 양파 돔 성당 내부 역사와 바닥의 악마의 발자국 전설 확인", desc_en: "Discover the devil's footprint legend inside the iconic twin-tower cathedral" }
    ],
    activity: [
      { name_ko: "BMW 박물관 & BMW 벨트 투어", name_en: "BMW Museum & BMW Welt Tour", duration: 120, desc_ko: "역사적인 클래식 차량 전시와 최신 콘셉트카를 조작해보는 자동차 매니아들의 성지", desc_en: "Explore heritage racing cars and futuristic concept vehicles at BMW headquarters" },
      { name_ko: "아리안츠 아레나 FC 바이에른 경기장 투어", name_en: "Allianz Arena Stadium Tour", duration: 120, desc_ko: "빛나는 튜브 외관의 바이에른 뮌헨 홈구장 라커룸과 잔디 피치 진입 체험", desc_en: "Walk down the tunnel of FC Bayern Munich and explore the massive museum displays" },
      { name_ko: "영국 정원 아이스바흐 서핑 관람", name_en: "Eisbachwelle River Surfing Watch", duration: 60, desc_ko: "도시 하천의 거센 급류 파도 위에서 서퍼들이 묘기를 부리는 신기한 이색 광경 직관", desc_en: "Watch daredevil river surfers ride freezing standing waves in the city park" },
      { name_ko: "올림픽 타워 전망대 고공 산책", name_en: "Munich Olympic Tower Climb", duration: 90, desc_ko: "지상 290m 높이의 관람 덱에서 고속 엘리베이터를 타고 뮌헨 시내 전체 조망", desc_en: "Ride the high-speed lift to the 190m deck for alpine wind and city skylines" },
      { name_ko: "뮌헨 실내 카트 레이싱 아레나", name_en: "Munich Karting Arena Indoor", duration: 100, desc_ko: "최신식 전기 카트를 타고 전용 서킷에서 스릴 넘치는 속도 레이스 대결", desc_en: "Race high-torque electric go-karts around sharp curves at the indoor tracks" }
    ],
    shopping: [
      { name_ko: "카우핑거 거리 & 노이하우저 거리 쇼핑", name_en: "Kaufingerstrasse Pedestrian Shopping", duration: 120, desc_ko: "뮌헨 대표 보행자 전용 쇼핑 거리에서 독일 로컬 코스메틱과 패션 브랜드 쇼핑", desc_en: "Browse local German drugstores and fashion flagship stores along the boulevard" },
      { name_ko: "오버폴링거 백화점 럭셔리 쇼핑", name_en: "Oberpollinger Luxury Department Store", duration: 120, desc_ko: "유서 깊은 아치형 건물 내부 프리미엄 럭셔리 브랜드 메카 쇼핑 및 전망 테라스", desc_en: "Shop high-end global fashion designer labels inside the grand building" },
      { name_ko: "디자이너 아웃렛 잉골슈타트 빌리지", name_en: "Ingolstadt Village Designer Outlet", duration: 240, desc_ko: "셔틀버스를 타고 외곽 야외 쇼핑 빌리지로 이동하여 브랜드 특가 세일 사냥", desc_en: "Explore discounted German and European luxury labels at an open-air village" },
      { name_ko: "뮌헨 구제 빈티지 숍 투어", name_en: "Munich Vintage Shops Hop", duration: 90, desc_ko: "슈바빙 골목길에서 독일 빈티지 가죽 코트와 빈티지 필름 카메라 보물찾기", desc_en: "Hunt for classic leather jackets and analog cameras in Schwabing district" },
      { name_ko: "바이에른 전통 의상 숍", name_en: "Traditional Bavarian Costume Shop", duration: 90, desc_ko: "Oktoberfest 전통 가죽 바지 레더호젠과 여성용 드레스 디른들 구경 및 기념 컵 구매", desc_en: "Browse fine leather breeches and dirndl dresses worn during beer festivals" }
    ]
  },
  prague: {
    healing: [
      { name_ko: "카를교 노을 도보 산책", name_en: "Charles Bridge Sunset Walk", duration: 90, desc_ko: "블타바 강 위의 중세 석조 다리 위에서 성자 조각상들을 감상하며 걷는 노을 길", desc_en: "Walk across the medieval stone bridge looking at saints under a romantic sunset", isLandmark: true },
      { name_ko: "레트나 공원 블타바 강 전망대", name_en: "Letna Park Viewpoint Stroll", duration: 100, desc_ko: "프라하의 여러 다리가 겹쳐 보이는 언덕 위 메인 포토존에서 맥주 한 잔의 여유", desc_en: "Sit in a giant beer garden overlooking the iconic multiple bridges of Prague" },
      { name_ko: "스트라호프 수도원 정원 오솔길", name_en: "Strahov Monastic Garden Trails", duration: 90, desc_ko: "프라하 성 뒤편, 언덕 아래 붉은 지붕 시내 풍경을 바라보며 걷는 과수원 오솔길", desc_en: "Walk between green orchards offering peaceful red-roof views of the old town" },
      { name_ko: "페트린 언덕 숲길 케이블카", name_en: "Petrin Hill Funicular Trail", duration: 120, desc_ko: "아름다운 나무 숲길 하이킹 후 푸른 케이블카를 타고 프라하 에펠탑 전망대로 하강", desc_en: "Ride the forest funicular up the hill and stroll through rose gardens" },
      { name_ko: "캄파 섬 락앤릴 강변 산책", name_en: "Kampa Island Peaceful Park", duration: 90, desc_ko: "카를교 바로 아래 물레방아가 도는 한적한 수로 골목길 산책 및 현대 조각상 구경", desc_en: "Stroll along quiet water channels and see funny giant baby bronze sculptures" }
    ],
    gourmet: [
      { name_ko: "우 플레쿠 500년 전통 흑맥주 브루어리", name_en: "U Fleku Historic Brewery", duration: 90, desc_ko: "1499년부터 문을 연 유서 깊은 호프에서 바이에른식 굴라쉬 찌개와 수제 흑맥주 시식", desc_en: "Savor beef goulash and original dark lager in Prague's oldest brewery hall" },
      { name_ko: "뜨르델닉 길거리 디저트", name_en: "Trdelnik Chimney Cake Treat", duration: 45, desc_ko: "숯불에 회전하며 구운 시나몬 설탕 빵 사이에 커스터드 크림이나 아이스크림 듬뿍", desc_en: "Bite into hot sugar-cinnamon rolled dough cakes filled with vanilla ice cream" },
      { name_ko: "카페 루브르 아인슈타인 단골 브런치", name_en: "Cafe Louvre Historic Dining", duration: 90, desc_ko: "아인슈타인과 카프카가 자주 토론하던 핑크빛 우아한 인테리어 맛집에서 디저트와 식사", desc_en: "Try traditional beef sirloin with cream sauce inside a historic 1902 cafe salon" },
      { name_ko: "로컬 꼴레뇨 맥주 펍 맛집", name_en: "Local Koleno Pork Knuckle Dinner", duration: 100, desc_ko: "겉바속촉 훈제 돼지 무릎 꼴레뇨를 겨자 소스에 찍어 마시는 차가운 코젤 맥주", desc_en: "Savor roasted Czech pork knuckle and cold Pilsner Urquell draft beers" },
      { name_ko: "카페 임페리얼 모자이크 화려한 조식", name_en: "Cafe Imperial Art Nouveau Breakfast", duration: 90, desc_ko: "사방이 도자기 모자이크 벽화로 장식된 화려한 황실 스타일 카페의 팬케이크 조식", desc_en: "Enjoy premium butter waffles and coffee in a breathtaking art nouveau room" }
    ],
    culture: [
      { name_ko: "프라하 성 내부 정밀 도슨트", name_en: "Prague Castle Complex Tour", duration: 180, desc_ko: "웅장한 고딕식 성 비투스 대성당의 스테인드글라스와 황금가지 역사 거리 관람", desc_en: "Explore the massive castle courtyard and St. Vitus Cathedral's stained glass", isLandmark: true },
      { name_ko: "구시청사 천문시계탑 정밀 도슨트", name_en: "Astronomical Clock Tower View", duration: 90, desc_ko: "매시간 12사도가 움직이는 천문시계 쇼를 보고 타워 엘리베이터에 올라 구시가지 뷰 관람", desc_en: "Watch the clock apostles show and climb the gothic tower overlooking old square" },
      { name_ko: "스트라호프 수도원 고문헌 도서관", name_en: "Strahov Library Baroque Halls", duration: 90, desc_ko: "바로크 양식의 화려한 천장 벽화가 있는 철학의 방과 신학의 방 서적 관람", desc_en: "Marvel at stunning baroque frescoes inside the ancient monastic libraries" },
      { name_ko: "프라하 유대인 지구 역사 투어", name_en: "Jewish Quarter Josefov Tour", duration: 120, desc_ko: "카프카 생가, 고딕풍 시나고그, 비석들이 겹겹이 쌓인 유서 깊은 유대인 묘지 관람", desc_en: "Walk through Synagogues and the historic old cemetery telling tragic history paths" },
      { name_ko: "클레멘티눔 도서관 가이드 투어", name_en: "Klementinum Baroque Library", duration: 90, desc_ko: "화려한 바로크식 천문 타일과 옛 지구본 컬렉션이 가득한 숨겨진 고전 문화관", desc_en: "Explore the Jesuit college libraries and ascend the astronomical tower" }
    ],
    activity: [
      { name_ko: "블타바 강 보트 & 패들 대여", name_en: "Vltava River Paddle Boat", duration: 90, desc_ko: "카를교 주변 블타바 강물 위에서 페달 보트를 타고 떠다니며 다른 각도로 강 조망", desc_en: "Rent a swan paddle boat sailing near Charles Bridge with amazing castle views" },
      { name_ko: "프라하 역사 올드카 레토 도심 투어", name_en: "Prague Vintage Car City Tour", duration: 60, desc_ko: "오픈 탑 올드카를 탑승하고 프라하 좁은 골목길과 언덕을 돌며 느끼는 빈티지 바람", desc_en: "Ride an open-top vintage replica car passing through narrow medieval alleys" },
      { name_ko: "프라하 실내 테라피 맥주 스파", name_en: "Prague Original Beer Spa Bath", duration: 90, desc_ko: "참나무 욕조에 따뜻한 맥주 홉 원료 스파를 즐기며 필스너 생맥주를 무제한 시음", desc_en: "Soak in hot oak tubs filled with active beer yeast while drinking unlimited draft" },
      { name_ko: "프라하 탈출 방 챌린지", name_en: "Prague Escape Room Challenge", duration: 90, desc_ko: "중세 고문실이나 역사적 스파이 음모 테마의 고난도 다국적 탈출 게임 배틀", desc_en: "Test your wits solving medieval mysteries in high-tech immersive chambers" },
      { name_ko: "프라하 성곽 외벽 야간 하이킹", name_en: "Prague Castle Walls Night Hike", duration: 100, desc_ko: "조명이 켜진 고적 성곽 골목길을 따라 걷는 아늑하고 신비로운 프라하 밤 트레킹", desc_en: "Night walk along the illuminated ramparts overlooking quiet orange streets" }
    ],
    shopping: [
      { name_ko: "프라하 마뉴팩투라 맥주 샴푸 쇼핑", name_en: "Manufaktura Beer Cosmetics Shop", duration: 80, desc_ko: "체코 전통 홉 추출물로 만든 천연 맥주 샴푸, 사과 향 핸드크림 기념품 구매", desc_en: "Shop for famous organic beer cosmetics and local dead sea salt soaps" },
      { name_ko: "하벨 노천 시장 기념품 쇼핑", name_en: "Havel's Market Souvenir Shopping", duration: 90, desc_ko: "구시가지 골목길 아침 노천 시장에서 목조 마녀 인형, 체코 유리 공예품 구경", desc_en: "Browse dynamic wooden marionette stands and cheap local berry punnets" },
      { name_ko: "나 프리코페 패션 백화점 쇼핑", name_en: "Na Prikope Shopping Street", duration: 120, desc_ko: "프라하의 명동, 넓은 보행자 거리의 스포츠 의류 매장 및 마리오네트 쇼룸 쇼핑", desc_en: "Stroll the shopping avenue packed with high street brands and toy megastores" },
      { name_ko: "보헤미안 크리스탈 그라스 전문점", name_en: "Bohemian Crystal Glass Boutique", duration: 90, desc_ko: "세밀하게 컷팅되어 영롱하게 빛나는 고급 보헤미안 크리스탈 와인잔 쇼룸 관람", desc_en: "Shop exquisite hand-cut lead crystal decanters and colorful glass ornaments" },
      { name_ko: "프라하 가넷 주얼리 전문 숍", name_en: "Czech Garnet Jewelry Boutique", duration: 90, desc_ko: "체코의 특산 보석, 어두운 붉은 빛이 영롱한 보헤미안 가넷 귀걸이와 반지 쇼룸 쇼핑", desc_en: "Browse royal blood-red garnet gemstones and silver rings direct from mines" }
    ]
  },
  beijing: {
    healing: [
      { name_ko: "이화원 곤명호 호숫가 산책", name_en: "Summer Palace Kunming Lake Stroll", duration: 120, desc_ko: "서태후가 사랑했던 황실 정원의 거대 인공 호수 둑길과 장랑 회랑 산책", desc_en: "Stroll along the vast lake bank of the Imperial Summer Palace gardens" },
      { name_ko: "스차하이 호수 공원 노을", name_en: "Shichahai Lake Park Sunset Walk", duration: 90, desc_ko: "버드나무 늘어선 호수 산책로를 걸으며 옛 북경 골목의 한적함과 저녁 바람 느끼기", desc_en: "Walk willow-lined paths watching local rowboats set against a sunset skyline" },
      { name_ko: "자금성 뒤편 경산공원 전망", name_en: "Jingshan Park Panoramic View", duration: 90, desc_ko: "공원 정상 만춘정에 올라가 내려다보는 자금성의 웅장한 붉은 벽 황금 기와 뷰 힐링", desc_en: "Climb the central pavilion for a stunning view over the Forbidden City rooftops" },
      { name_ko: "지단 공원 숲속 타이치 산책", name_en: "Temple of Earth Ancient Forest", duration: 100, desc_ko: "오래된 은행나무 숲길 속에서 타이치(태극권)를 수련하는 북경 시민들 구경", desc_en: "Walk through green ginkgo trails observing locals practicing slow martial arts" },
      { name_ko: "베이하이 공원 백탑 호수 산책", name_en: "Beihai Park White Pagoda Walk", duration: 100, desc_ko: "티베트 양식의 하얀 사리탑을 바라보며 호숫가 백색 대리석 다리 힐링 도보", desc_en: "Cross stone bridges watching the towering Tibetan white stupa reflect in water" }
    ],
    gourmet: [
      { name_ko: "전취덕 북경오리 파인다이닝", name_en: "Quanjude Peking Duck Dinner", duration: 100, desc_ko: "150년 역사의 대가 식당에서 셰프가 눈앞에서 잘라주는 바삭하고 고소한 오리 껍질 쌈", desc_en: "Savor the crispy skin and tender meat of Peking roast duck wrapped in pancakes" },
      { name_ko: "왕푸징 꼬치 골목 & 로컬 먹거리", name_en: "Wangfujing Street Food Market", duration: 80, desc_ko: "밀전병 탕후루, 납작 만두, 이색적인 전갈 꼬치구이 등 호기심 가득 맛보기", desc_en: "Taste sweet candied hawthorn skewers and hot griddled pork buns in alleys" },
      { name_ko: "동래순 전통 놋그릇 양고기 샤브샤브", name_en: "Donglaishun Hotpot Mutton Dining", duration: 100, desc_ko: "가운데 숯불이 들어간 구리 솥에 얇게 썬 신선한 양고기와 즈마장 땅콩 소스의 매력", desc_en: "Dip paper-thin mutton slices into copper pots paired with creamy sesame dipping paste" },
      { name_ko: "난뤄구샹 망고 화오 디저트", name_en: "Nanluoguxiang Mango Ice Treats", duration: 60, desc_ko: "전통 후통(골목) 거리에서 즐기는 시원한 고양이 푸딩과 부드러운 망고 빙수", desc_en: "Sip floral teas and taste fresh sweet mango ice bowls in a traditional hutong cafe" },
      { name_ko: "고종 딤섬 전문점", name_en: "Guzhong Dim Sum Breakfast", duration: 80, desc_ko: "피가 얇고 육즙이 가득 찬 소룡포 만두와 볶음국수 아침 미식", desc_en: "Feast on steaming pork soup dumplings and fresh local pan-fried buns" }
    ],
    culture: [
      { name_ko: "자금성 황실 가이드 투어", name_en: "Forbidden City Imperial Tour", duration: 180, desc_ko: "9천여 칸의 방을 가진 세계 최대 황궁의 태화전 돌계단과 황실 보물 역사 관람", desc_en: "Marvel at the golden throne halls and imperial treasure collections", isLandmark: true },
      { name_ko: "천단 공원 기년전 도슨트", name_en: "Temple of Heaven Historic Tour", duration: 120, desc_ko: "명·청 황제들이 풍년을 빌던 독특한 삼중 원형 파란 기와 지붕 목조 사원 관람", desc_en: "Tour the circular blue-roofed hall built without nails for imperial prayers" },
      { name_ko: "옹화궁 라마교 사원 투어", name_en: "Yonghe Temple Tibetan Buddhism", duration: 100, desc_ko: "북경 최대 티베트 불교 사원, 통나무 한 개로 조각한 거대 미륵보살 입상 관람", desc_en: "Enter the grand Tibetan temple to marvel at the 18-meter sandalwood Buddha" },
      { name_ko: "명십삼릉 지하궁전 탐험", name_en: "Ming Tombs Underground Vault", duration: 150, desc_ko: "명나라 황제들의 거대 지하 무덤 궁전 신도를 걷고 돌방 내부 관람", desc_en: "Walk the path of stone guardians and descend into the stone tomb chambers" },
      { name_ko: "베이징 고대 관상대 천문 역사", name_en: "Beijing Ancient Observatory", duration: 90, desc_ko: "세계에서 가장 오래된 고대 구리 천문 관측 기구들을 조용하게 구경하는 문화 힐링", desc_en: "View majestic bronze astronomical globes constructed by Jesuit scholars" }
    ],
    activity: [
      { name_ko: "만리장성 팔달령 하이킹", name_en: "Great Wall of China Badaling Hike", duration: 240, desc_ko: "케이블카를 타고 가파른 산등성이를 따라 끝없이 이어진 세계 7대 불가사의 장성 하이킹", desc_en: "Climb the rugged stone watchtowers of Badaling for amazing mountain views", isLandmark: true },
      { name_ko: "798 예술구 현대미술 갤러리", name_en: "798 Art Zone Galleries Walk", duration: 150, desc_ko: "옛 소련 군수 공장을 개조하여 거대 조각품과 트렌디 갤러리가 모인 힙한 복합지구", desc_en: "Walk through decommissioned factories displaying avant-garde sculpture arrays" },
      { name_ko: "난뤄구샹 후통 인력거 골목 투어", name_en: "Hutong Rickshaw Alley Tour", duration: 90, desc_ko: "인력거에 탑승하고 사합원 전통 가옥이 보존된 옛 후통 골목길 정밀 하이킹", desc_en: "Ride a traditional rickshaw through historical courtyard home residential paths" },
      { name_ko: "베이징 올림픽 주경기장 뷰", name_en: "Beijing Olympic Stadium Bird's Nest", duration: 90, desc_ko: "새 둥지 형상의 철골 조형 건축을 배경으로 즐기는 저녁 레이저 쇼 감상", desc_en: "Trek the Olympic park viewing the colossal bird's nest architecture and lights" },
      { name_ko: "차오양 극장 전통 서커스 기예 관람", name_en: "Chaoyang Theatre Acrobatic Show", duration: 90, desc_ko: "오토바이 회전, 둥근 통 묘기 등 숨 막히게 화려한 대륙의 기예 서커스 묘기", desc_en: "Watch death-defying motorcycle cage rides and human pyramids performing" }
    ],
    shopping: [
      { name_ko: "왕푸징 거리 롯데백화점 쇼핑", name_en: "Wangfujing Shopping Boulevard", duration: 120, desc_ko: "북경 최대 보행자 쇼핑몰 거리에서 중국 로컬 차 브랜드와 서양 럭셔리 쇼핑", desc_en: "Shop international department stores and traditional tea shops along the avenue" },
      { name_ko: "홍차오 진주 마켓 기념품 쇼핑", name_en: "Hongqiao Pearl Market Bargaining", duration: 120, desc_ko: "진주 악세사리부터 비단 스카프, 가성비 샤오미 전자기기 대량 쇼핑과 흥정 체험", desc_en: "Negotiate silk scarves, freshwater pearl necklaces, and local electronics" },
      { name_ko: "솔라나 유럽풍 호수 쇼핑몰", name_en: "Solana European Lifestyle Mall", duration: 120, desc_ko: "파란 호수 공원 옆에 위치하여 밤이 되면 전등이 빛나는 로맨틱한 쇼핑 가든", desc_en: "Shop retail labels and dine at lakeside patios lit by millions of lights" },
      { name_ko: "팬자위안 골동품 플리마켓", name_en: "Panjiayuan Antique Flea Market", duration: 150, desc_ko: "서책 서예 붓, 오래된 도자기 그릇, 이색 수공예품이 가득한 거대 벼룩시장 보물찾기", desc_en: "Search for old calligraphy prints, bronze seals, and ceramic pots on rugs" },
      { name_ko: "첸먼 스트리트 전통 상점가 팝업", name_en: "Qianmen Traditional Street Walk", duration: 100, desc_ko: "청나라 시대 건물을 복원한 트램이 지나가는 거리의 유서 깊은 전통 차 시음 쇼핑", desc_en: "Ride retro streetcars and buy premium jasmine green tea leaves inside heritage shops" }
    ]
  },
  cairo: {
    healing: [
      { name_ko: "나일강 펠루카 전통 돛배 힐링", name_en: "Nile River Felucca Sunset Sailing", duration: 100, desc_ko: "엔진 없이 부드러운 바람으로 움직이는 하얀 돛배를 타고 즐기는 나일강 노을 힐링", desc_en: "Sail slowly down the historic Nile river on a traditional white-sailed wooden boat" },
      { name_ko: "알 아즈하르 공원 정원 피크닉", name_en: "Al-Azhar Park Panoramic View", duration: 120, desc_ko: "도심 속 푸른 정원 잔디밭에 앉아 시내와 카이로 성채 풍경을 조망하며 휴식", desc_en: "Relax on grassy hills surrounded by Islamic-style water fountains and palm trees" },
      { name_ko: "자말렉 아일랜드 강변 나무 산책", name_en: "Zamalek Island Waterfront Walk", duration: 90, desc_ko: "부유층 거주지의 고급 카페들과 그늘진 반얀트리 가로수 아래 조용한 강변 산책", desc_en: "Stroll under giant banyan trees along quiet river banks in a trendy district" },
      { name_ko: "나일강 리버프런트 카페 야간 힐링", name_en: "Nile Riverbank Cafe Relaxation", duration: 90, desc_ko: "강물에 반사된 카이로 타워 조명을 바라보며 야외 테라스에서 달콤한 홍차와 대화", desc_en: "Sit on cozy riverfront sofas sipping sweet mint tea with skyline views" },
      { name_ko: "카이로 시타델 정원 성벽 산책", name_en: "Cairo Citadel Fortress Ramparts", duration: 100, desc_ko: "고색창연한 십자군 대항 성벽을 따라 시원한 산바람을 맞으며 로마식 뷰 감상", desc_en: "Walk paths inside the high stone fortress with cool desert winds at sunset" }
    ],
    gourmet: [
      { name_ko: "아부 타렉 원조 코샤리 시식", name_en: "Abou Tarek Koshary Lunch", duration: 70, desc_ko: "이집트 국민식, 쌀과 마카로니, 렌틸콩 위에 새콤달콤 토마토 소스를 섞어 먹는 가성비 요리", desc_en: "Taste Egypt's national dish of rice, macaroni, lentils, and crispy fried onions" },
      { name_ko: "칸 엘 칼릴리 엘 피샤위 전통 카페", name_en: "El Fishawy Cafe Khan El Khalili", duration: 80, desc_ko: "240년 넘는 거울 가득 찬 유서 깊은 카페에서 마시는 아랍식 진한 민트 차와 대추야자", desc_en: "Sip spiced mint tea served on copper trays inside the legendary alleyway cafe" },
      { name_ko: "페사위 해산물 나일강 런치", name_en: "Felfela Egyptian Local Dining", duration: 90, desc_ko: "신선한 파바콩 전용 팔라펠인 '타메야' 튀김과 납작 브레드 '에이시', 크림 타히니 소스", desc_en: "Taste fresh broad-bean falafel, lamb skewers, and tahini dip in a historic eatery" },
      { name_ko: "소피텔 게지라 오션뷰 프렌치 디너", name_en: "Sofitel Gezirah Nile-Side Dining", duration: 100, desc_ko: "나일강물 바로 위에 떠 있는 듯한 야외 데크 레스토랑의 부드러운 양고기 바비큐", desc_en: "Savor premium mixed grills and cold mezze platter directly floating on the Nile" },
      { name_ko: "카이로 1902 역사 호텔 애프터눈 티", name_en: "Cairo Marriott Palace Tea", duration: 90, desc_ko: "옛 이집트 공주의 궁전을 복원한 호텔의 화려한 정원에서 마시는 시그니처 허브 티", desc_en: "Enjoy warm scones and hibiscus tea in a palace garden built for imperial guests" }
    ],
    culture: [
      { name_ko: "기자의 대피라미드 & 스핑크스 투어", name_en: "Giza Pyramids & Sphinx Tour", duration: 180, desc_ko: "세계 최대 규모 쿠푸왕 피라미드를 관람하고 스핑크스 발자취 역사 도슨트", desc_en: "Marvel at the monumental stone structures of Khufu and the colossal guardian Sphinx", isLandmark: true },
      { name_ko: "이집트 박물관 파라오 황금가면 투어", name_en: "Egyptian Museum Tutankhamun Gallery", duration: 150, desc_ko: "투탕카멘의 눈부신 황금 마스크와 수천 년 된 신비로운 실제 파라오 미라 관람", desc_en: "Stand before the gold treasures of King Tut and ancient stone statues in Tahir Square", isLandmark: true },
      { name_ko: "국립 문명 박물관 왕실 미라", name_en: "National Museum of Egyptian Civilization", duration: 120, desc_ko: "최신식 전시관, 지하 특수 공간에 전시된 고대 신왕국 람세스 2세 등 미라 관람", desc_en: "Tour the royal mummy gallery displaying actual Pharaohs in custom climate vaults" },
      { name_ko: "살라딘 시타델 & 무함마드 알리 모스크", name_en: "Saladin Citadel & Mosque of Muhammad Ali", duration: 120, desc_ko: "중세 십자군 전쟁 요새와 이스탄불식 거대 은빛 돔 모스크의 대리석 안뜰 관람", desc_en: "Explore the stone ramparts and the massive alabaster mosque overlooking the city" },
      { name_ko: "올드 카이로 콥트 기독교 성당 투어", name_en: "Coptic Cairo Historic Churches", duration: 120, desc_ko: "아기 예수가 피난했던 동굴 위에 지어진 공중 성당과 유서 깊은 유대교 회당 역사", desc_en: "Visit the Hanging Church constructed over Roman towers and ancient synagogues" }
    ],
    activity: [
      { name_ko: "기자 사막 낙타 & 승마 트레킹", name_en: "Giza Desert Camel Riding", duration: 120, desc_ko: "피라미드 9개가 일렬로 보이는 사막 언덕에서 낙타를 타고 달리는 이색 하이킹", desc_en: "Ride camels or Arabian horses on sand dunes with pyramid backdrop panoramas" },
      { name_ko: "나일강 카약 클럽 아침 다이빙", name_en: "Nile Kayaking Club Cairo", duration: 100, desc_ko: "나일강의 고요한 아침 수면 위에서 노를 저으며 즐기는 스릴 스포츠", desc_en: "Paddle down the historic Nile river under instruction of local kayaking guides" },
      { name_ko: "사카라 계단식 피라미드 모험", name_en: "Saqqara Step Pyramid Exploration", duration: 180, desc_ko: "가장 오래된 형태인 조세르 왕의 계단식 피라미드 내부 좁은 통로 기어 들어가기 스릴", desc_en: "Descend into the underground tomb shafts of the oldest stone pyramid" },
      { name_ko: "카이로 타워 옥상 회전 전망대 공중", name_en: "Cairo Tower Panoramic Deck", duration: 90, desc_ko: "연꽃 모양으로 설계된 187m 타워 옥상에서 360도로 카이로 시내와 사막 감상", desc_en: "Ascend the lattice tower for wind views of the Nile bridges and pyramids far away" },
      { name_ko: "사막 ATV 모토바이크 질주 챌린지", name_en: "Pyramids Desert Quad Biking", duration: 120, desc_ko: "모래 먼지를 날리며 피라미드 근처 사막 오프로드를 고속 주행하는 속도감", desc_en: "Ride heavy quad bikes across the desert sand tracks near Giza pyramids" }
    ],
    shopping: [
      { name_ko: "칸 엘 칼릴리 거대 벼룩시장 쇼핑", name_en: "Khan El Khalili Bazaar Shopping", duration: 150, desc_ko: "천년 역사의 미로 골목 시장에서 구리 조명, 양가죽 푸프, 기념품 쇼핑과 흥정", desc_en: "Negotiate for brass lamps, leather slippers, and glass perfume bottles in alleys" },
      { name_ko: "이집트 파피루스 예술 연구소 쇼룸", name_en: "Papyrus Paper Art Institute", duration: 90, desc_ko: "파피루스 풀로 종이를 만드는 과정을 보고 화려하게 채색된 파라오 그림 구매", desc_en: "Watch papyrus paper-making demonstration and buy hand-painted scrolls" },
      { name_ko: "카이로 페스티벌 시티 몰 현대 쇼핑", name_en: "Cairo Festival City Mall Shop", duration: 150, desc_ko: "에어컨 바람 쐬며 대형 몰에서 유명 글로벌 패션 브랜드와 까르푸 카이로 과일 쇼핑", desc_en: "Shop international labels and Egyptian cotton products in an air-conditioned mall" },
      { name_ko: "아라비안 에센스 향수병 전문 숍", name_en: "Egyptian Perfume Essence Boutique", duration: 90, desc_ko: "불로 가열하여 꼬아 만든 화려한 유리 에센셜 오일 향수병 도매 시장 쇼핑", desc_en: "Browse hand-blown glass perfume bottles and organic jasmine oil drops" },
      { name_ko: "이집트 코튼 시그니처 의류 매장", name_en: "Egyptian Cotton Apparel Shop", duration: 90, desc_ko: "세계 최고 품질을 자랑하는 순이집트 면으로 직조된 부드러운 수건, 티셔츠 쇼핑", desc_en: "Shop premium luxury Egyptian cotton bed sheets and soft organic towels" }
    ]
  },
  rio: {
    healing: [
      { name_ko: "코파카바나 해변 모래사장 일광욕", name_en: "Copacabana Beach Sunbathing", duration: 120, desc_ko: "부서지는 대서양 파도 소리를 들으며 해변 코코넛 주스를 마시는 리오인들의 여유", desc_en: "Sip fresh coconut water on the wavy mosaic boardwalk of Copacabana beach" },
      { name_ko: "리오데자네이루 식물원 야자수 길", name_en: "Jardim Botanico Royal Palms", duration: 120, desc_ko: "130그루가 넘는 거대한 왕야자수가 솟아오른 길을 걸으며 열대 새소리 힐링", desc_en: "Walk the path of towering century-old royal palms and visit orchid hot houses" },
      { name_ko: "라주 공원 저택 안뜰 호수 피크닉", name_en: "Parque Lage Mansion Courtyard", duration: 100, desc_ko: "거대 예수상이 올려다보이는 오래된 저택의 옥외 수영장 옆 잔디밭 카페 힐링", desc_en: "Sip local coffee near the pool inside a grand stone mansion at the foot of Christ" },
      { name_ko: "이파네마 해변 노을 관람 포토존", name_en: "Ipanema Beach Sunset Viewpoint", duration: 90, desc_ko: "돌 언덕인 아포아도르 바위 위에 걸터앉아 바다 밑으로 지는 황홀한 노을 감상", desc_en: "Join locals clapping for the sunset atop Arpoador rocks looking at the bay" },
      { name_ko: "플라멩구 공원 오션뷰 자전거 하이킹", name_en: "Aterro do Flamengo Bike Trail", duration: 100, desc_ko: "푸른 잔디밭과 태평양 만이 나란히 이어지는 조용한 해변 자전거 도로 힐링", desc_en: "Pedal along green ocean bays looking at sailboats and sugarloaf peaks" }
    ],
    gourmet: [
      { name_ko: "포고 드 샹 무제한 슈하스코 저녁", name_en: "Fogo de Chao Churrascaria Feast", duration: 120, desc_ko: "브라질 정통 바비큐, 소고기 부위별 꼬치를 웨이터가 테이블에서 계속 잘라주는 고기 만찬", desc_en: "Feast on unlimited premium skewered beef cuts sliced tableside by gaucho servers" },
      { name_ko: "카페 콜롬보 120년 전통 디저트", name_en: "Confeitaria Colombo Historic Treats", duration: 90, desc_ko: "거대 거울과 벨기에식 스테인드글라스 지붕 아래에서 클래식 브라질 파이와 탄산 커피 시식", desc_en: "Taste traditional brigadeiro sweets and cheese rolls inside a belle-epoque cafe" },
      { name_ko: "이파네마 아카라제 로컬 해산물 런치", name_en: "Ipanema Acaraje Local Snacks", duration: 70, desc_ko: "튀긴 껍질 콩 반죽 사이에 새우와 매운 야채 소스를 채운 바이아주 전통 간식 맛보기", desc_en: "Taste deep-fried bean patties filled with dried shrimp and spicy vatapa sauce" },
      { name_ko: "가라파 사탕수수 주스 & 빠스텔 튀김", name_en: "Garapa Cane Juice & Pastel snack", duration: 60, desc_ko: "길거리 노점에서 갓 짜낸 시원한 사탕수수 즙과 치즈, 다진 고기를 채운 빠스텔 만두", desc_en: "Try fresh squeezed sweet sugar cane juice paired with crispy fried pastries" },
      { name_ko: "레블론 해변 야외 바 카이피리냐 바", name_en: "Leblon Beachfront Caipirinha Bar", duration: 90, desc_ko: "라임과 사탕수수 증류주 카샤샤로 만든 브라질 대표 칵테일 카이피리냐와 치즈볼 저녁", desc_en: "Sip caipirinha cocktails on oceanfront patios feeling the sea breeze" }
    ],
    culture: [
      { name_ko: "코르코바두산 거대 예수상", name_en: "Christ the Redeemer Monument", duration: 120, desc_ko: "붉은 트램을 타고 올라가 마주하는 38m 높이 세계 7대 불가사의 예수상 역사 도슨트", desc_en: "Ride the cog train up Corcovado Mountain to stand near the colossal Christ statue", isLandmark: true },
      { name_ko: "셀라론 계단 모자이크 투어", name_en: "Escadaria Selaron Mosaic Walk", duration: 90, desc_ko: "칠레 예술가 셀라론이 전 세계 타일로 꾸민 화려한 215개 야외 계단 사진 촬영", desc_en: "Pose on the iconic outdoor stairs tiled in green, yellow, and red mosaic patterns" },
      { name_ko: "왕립 포르투갈 도서관 가이드 투어", name_en: "Royal Portuguese Reading Room", duration: 90, desc_ko: "해리포터 속 도서관 같은 웅장한 목조 책장과 스테인드글라스 고전 역사 도서관", desc_en: "Marvel at the stunning neo-gothic wooden bookshelves and gold chandeliers" },
      { name_ko: "리오 메트로폴리탄 피라미드 대성당", name_en: "Metropolitan Cathedral of Rio", duration: 80, desc_ko: "피라미드 형상 콘크리트 대성당, 내부 사방 천장을 메운 거대 스테인드글라스 관람", desc_en: "Explore the futuristic Mayan pyramid cathedral soaring 75 meters high" },
      { name_ko: "내일의 박물관", name_en: "Museum of Tomorrow Exhibition", duration: 120, desc_ko: "바다 위에 핀 꽃 모양 날개 달린 미래형 생태 환경 과학 미술관 관람", desc_en: "Tour futuristic design galleries projecting earth climate change simulations" }
    ],
    activity: [
      { name_ko: "빵드아수카르산 케이블카 탑승", name_en: "Sugarloaf Mountain Cable Car", duration: 100, desc_ko: "두 번의 케이블카를 타고 돌산 정상에 올라 감상하는 리오 만과 활주로 절경", desc_en: "Ride glass-walled cable cars to the peak of the granite peak overlooking bays", isLandmark: true },
      { name_ko: "리오 모험 행글라이딩 하늘 플라이", name_en: "Hang Gliding over Sao Conrado", duration: 180, desc_ko: "전문 파일럿과 등 뒤에서 비행하며 상공에서 숲과 리오 바다를 나는 고공 비행 스릴", desc_en: "Tandem glide from mountains landing directly on Pepino sandy beaches" },
      { name_ko: "티주카 국립공원 열대우림 하이킹", name_en: "Tijuca National Park Rainforest Hike", duration: 180, desc_ko: "세계 최대 도시 실내 열대우림 숲길을 따라 오솔길 폭포 투어 및 야생 원숭이 관찰", desc_en: "Hike through trails under jungle canopy spotting toucans and waterfalls" },
      { name_ko: "과나바라 만 보트 세일링 레저", name_en: "Guanabara Bay Sailing Cruise", duration: 120, desc_ko: "보트를 타고 파도를 타며 바다에서 바라보는 예수상과 리오 브릿지 장관 레포츠", desc_en: "Board a catamaran cruise taking in the skyline views of the granite peaks" },
      { name_ko: "코파카바나 해변 비치 발리볼 레슨", name_en: "Copacabana Beach Volleyball Class", duration: 90, desc_ko: "네트 위에서 서브와 패스를 배우며 땀을 흘리는 브라질식 모래 스포츠 강습", desc_en: "Learn sandy footvolley and ball spikes under professional beach coaches" }
    ],
    shopping: [
      { name_ko: "리오 바사 플리마켓 기념품 쇼핑", name_en: "Feira Hippie de Ipanema Market", duration: 120, desc_ko: "일요일마다 열리는 힙피 마켓에서 가죽 가방, 목공예품, 수제 악세사리 쇼핑", desc_en: "Browse dynamic street stalls for local leather footwear and stone crafts" },
      { name_ko: "아바야나스 쪼리 신발 샌들 쇼룸", name_en: "Havaianas Flagship Store", duration: 80, desc_ko: "브라질 대표 고무 쪼리 아바야나스 수백가지 다채로운 칼라 신발 특가 쇼핑", desc_en: "Buy cheap colorful signature flip-flops at their prime shopping store" },
      { name_ko: "바하 쇼핑몰 초대형 콤플렉스 쇼핑", name_en: "Barra Shopping Megamall", duration: 150, desc_ko: "리오 최대 백화점 단지에서 브라질 로컬 패션 편집숍 브랜드 및 보석 쇼핑", desc_en: "Shop international labels and high-end Brazilian gold emerald boutiques" },
      { name_ko: "리오 센트럴 노천 도매 시장", name_en: "Saara Local Market Bargaining", duration: 120, desc_ko: "현지인들이 많이 찾는 Saara 골목에서 카니발 소품 구경 및 흥정", desc_en: "Explore central crowded pathways with thousands of cheap dress shops" },
      { name_ko: "이파네마 주얼리 숍 아르 누보 쇼룸", name_en: "Ipanema Gemstone Gallery", duration: 90, desc_ko: "브라질 광산에서 채굴된 에메랄드, 토파즈 등 정교한 보석 가공 쇼룸 관람", desc_en: "Discover gemstone cut designs and purchase custom amethyst ring gifts" }
    ]
  },
  vancouver: {
    healing: [
      { name_ko: "카필라노 현수교 숲속 스릴 산책", name_en: "Capilano Suspension Bridge Park", duration: 120, desc_ko: "70m 높이의 거대한 협곡 사이 흔들다리를 건너고 피톤치드 가득 우림 숲길 걷기", desc_en: "Cross the suspension bridge high above Capilano river walking treetop pathways", isLandmark: true },
      { name_ko: "잉글리시 베이 해변 노을 감상", name_en: "English Bay Beach Sunset Stroll", duration: 90, desc_ko: "해안가 벤치에 앉아 이누크슈크 석상을 배경으로 즐기는 붉은 저녁 노을 힐링", desc_en: "Relax on dry logs watching the crimson sunset dye the Pacific horizon gold" },
      { name_ko: "반두센 보타닉 가든 녹색 미로", name_en: "VanDusen Botanical Garden Walk", duration: 100, desc_ko: "세계 각국 희귀 꽃과 잘 깎여진 녹색 잔디 미로 속에서 조용한 산책", desc_en: "Walk through Elizabethan hedge mazes and serene lily ponds inside gardens" },
      { name_ko: "키칠라노 해안 도로 피크닉", name_en: "Kitsilano Beach Log Relaxation", duration: 120, desc_ko: "통나무들이 놓인 모래사장에 비스듬히 누워 시원한 바닷바람과 햇살 힐링", desc_en: "Lay on giant beachfront logs watching sailboats glide past downtown sky" },
      { name_ko: "콜 해버 방파제 산책로", name_en: "Coal Harbour Seawall Promenade", duration: 90, desc_ko: "수상 비행기 이착륙을 보며 노스밴쿠버 설산 배경으로 조용히 걷는 산책로", desc_en: "Walk along paved seawall paths looking at floatplanes and snow-capped peaks" }
    ],
    gourmet: [
      { name_ko: "그랜빌 아일랜드 고메마켓 푸드 투어", name_en: "Granville Island Public Market Food", duration: 100, desc_ko: "로컬 시장에서 신선한 연어 사시미, 클램 차우더 스프, 갓 구운 메이플 시나몬 도넛 시식", desc_en: "Feast on smoked wild salmon, hot clam chowder, and freshly made sweet pastries" },
      { name_ko: "개스타운 로컬 수제 펍 에일 맥주", name_en: "Gastown Craft Brewery Hop", duration: 90, desc_ko: "붉은 벽돌 골목길 역사적 호프에서 부드러운 수제 생맥주 샘플러와 나초 감자튀김", desc_en: "Taste fresh local IPAs and hot crispy fries inside a retro industrial pub" },
      { name_ko: "리치먼드 야시장 아시안 만두 먹방", name_en: "Richmond Night Market Streetfood", duration: 120, desc_ko: "여름철 대규모 야시장에서 구운 오징어, 타코야키, 달콤한 버블티 시식", desc_en: "Feast on grilled seafood skewers, dumplings, and mango coconut drinks" },
      { name_ko: "카페 메디나 라벤더 라떼 & 와플 브런치", name_en: "Medina Cafe Lavender Latte & Waffles", duration: 80, desc_ko: "매일 긴 대기 줄을 자랑하는 유명 브런치 카페의 바삭한 벨기에식 미니 와플", desc_en: "Savor gourmet white-iron skillet eggs and their signature sweet lavender coffee" },
      { name_ko: "롭슨 스트리트 비스트로 연어 스테이크", name_en: "Robson Street Salmon Dining", duration: 90, desc_ko: "부드럽고 고소하게 구워낸 최고급 야생 연어 스테이크와 바삭한 알록달록 야채 구이 저녁", desc_en: "Savor grilled BC wild sockeye salmon served with butter rice and vegetables" }
    ],
    culture: [
      { name_ko: "개스타운 증기시계 역사 가이드", name_en: "Gastown Steam Clock Tour", duration: 80, desc_ko: "15분마다 증기와 기차 기적 소리를 내며 시간을 알리는 빈티지 증기 시계 역사 도슨트", desc_en: "Watch the whistle blow at the world's oldest steam-powered clock in Gastown" },
      { name_ko: "인류학 박물관 토템폴 도슨트", name_en: "Museum of Anthropology UBC Totem", duration: 120, desc_ko: "캐나다 원주민 퍼스트 네이션스 가문에서 수공예 조각한 거대 오리지널 목조 토템폴 관람", desc_en: "Marvel at the monumental cedar wood totem poles carvings inside MOA gallery" },
      { name_ko: "밴쿠버 아트 갤러리 회화 관람", name_en: "Vancouver Art Gallery Emily Carr Exhibition", duration: 100, desc_ko: "캐나다 숲을 신비롭게 묘사한 여류 화가 에밀리 카의 상설 미술 기획전 관람", desc_en: "Admire beautiful landscape paintings of Emily Carr and modern visual art" },
      { name_ko: "사이언스 월드 돔 실내 역사 과학", name_en: "Science World Dome Exhibit", duration: 120, desc_ko: "기하학 무늬 은빛 지붕 내부 인터랙티브 과학 전시", desc_en: "Explore high-tech sensory chambers and physical light puzzles under the dome" },
      { name_ko: "브리티시 컬럼비아 해양 유물 박물관", name_en: "Vancouver Maritime Museum Historical", duration: 90, desc_ko: "북극해를 최초 횡단한 거대 목조 탐사선 St. Roch 내부 조타실 역사 관람", desc_en: "Board the historic Arctic exploration schooner and view old brass sextants" }
    ],
    activity: [
      { name_ko: "스탠리 파크 자전거 해안 도로 하이킹", name_en: "Stanley Park Seawall Cycling", duration: 120, desc_ko: "울창한 원시림 나무 숲과 평화로운 태평양 해안 Seawall을 자전거로 완주하는 코스", desc_en: "Rent a bike and pedal the 9km seawall route around the massive forest park", isLandmark: true },
      { name_ko: "그라우스 마운틴 곤돌라 & 그리즐리 곰", name_en: "Grouse Mountain Peak Gondola", duration: 180, desc_ko: "곤돌라를 타고 정상에 올라 벌목공 쇼를 감상하고 서식 중인 아기 그리즐리 곰 관찰", desc_en: "Ride the skyride cable car up to the peak for panoramic views and bear sanctuary" },
      { name_ko: "스쿼미시 바다하늘 현수교 곤돌라", name_en: "Sea to Sky Gondola Squamish", duration: 240, desc_ko: "밴쿠버 외곽 하이웨이를 달려 피요르드 해안과 절벽 다리를 건너는 아웃도어 레포츠", desc_en: "Cross suspension bridges overlooking glacial fjords on the scenic route" },
      { name_ko: "밴쿠버 연안 고래 관찰 보트 크루즈", name_en: "Vancouver Whale Watching Tour", duration: 180, desc_ko: "고속 제트선에 탑승하여 거대한 범고래와 혹등고래 떼가 물뿜는 장관 관찰", desc_en: "Board a marine cruise searching for wild orcas and seals in the Georgia Strait" },
      { name_ko: "딥 코브 수면 카약 투어", name_en: "Deep Cove Kayak Rental", duration: 150, desc_ko: "노스밴쿠버 잔잔한 산중 만 수면 위에서 노를 저으며 신선한 하천 바람 체험", desc_en: "Paddle a kayak through peaceful fjord waters surrounded by green mountains" }
    ],
    shopping: [
      { name_ko: "롭슨 스트리트 패션 로드숍 쇼핑", name_en: "Robson Street Fashion Boutiques", duration: 120, desc_ko: "밴쿠버 중심 롭슨 거리의 다양한 캐나다 로컬 브랜드 및 기념품 가죽 숍 사냥", desc_en: "Shop trendy activewear labels like Lululemon and outdoor gear in downtown" },
      { name_ko: "맥아더글렌 디자이너 아울렛 쇼핑", name_en: "McArthurGlen Designer Outlet", duration: 150, desc_ko: "공항 옆 야외 쇼핑 빌리지 단지에서 브랜드 할인가 구매 및 스페셜 초콜릿 쇼핑", desc_en: "Explore discounted luxury apparel and sportswear close to YVR airport" },
      { name_ko: "퍼시픽 센터 지하 연결 쇼핑몰", name_en: "CF Pacific Centre Underground Mall", duration: 120, desc_ko: "중심가의 넓은 지하 통로로 연결된 종합 의류 브랜드 매장과 화장품 쇼룸 쇼핑", desc_en: "Browse major department store fashion counters and popular lifestyle shops" },
      { name_ko: "개스타운 가죽 & 인디 소품 숍", name_en: "Gastown Boutique Gift Shop", duration: 90, desc_ko: "증기시계 근처 골목길에서 원주민 그림 에코백, 메이플 시럽 선물 패키지 구매", desc_en: "Shop fine leather boots, indigenous art prints, and local honey jars" },
      { name_ko: "메트로폴리스 앳 메트로타운 메가몰", name_en: "Metropolis at Metrotown Shopping", duration: 180, desc_ko: "스카이트레인으로 연결된 450개 매장이 입점한 캐나다 서부 최고 규모 쇼핑 단지", desc_en: "Explore massive multi-floor retail corridors, electronics shops, and food courts" }
    ]
  }
};
const MOCK_USER_PROFILES = [
  { name: "김지민", age: "20대", gender: "여성", nationality: "한국인", mbti: "ENFP", verified: true, sns: "Instagram (@jimin_travel)" },
  { name: "Alex Miller", age: "30대", gender: "남성", nationality: "외국인", mbti: "INFJ", verified: true, sns: "Kakao (alex_m)" },
  { name: "이준우", age: "20대", gender: "남성", nationality: "한국인", mbti: "ESTP", verified: true, sns: "Instagram (@junwoo_lee)" },
  { name: "박소영", age: "30대", gender: "여성", nationality: "한국인", mbti: "ISFJ", verified: true, sns: "Kakao (sy_park)" },
  { name: "Emma Smith", age: "20대", gender: "여성", nationality: "외국인", mbti: "ENTP", verified: true, sns: "Instagram (@emma_around_the_world)" }
];

const MOCK_COMPANION_ROOMS = [
  {
    id: 1,
    title_ko: "경복궁 한복 대여하고 같이 인생샷 찍으실 분 구해요!",
    title_en: "Let's rent Hanbok and take beautiful photos at Gyeongbokgung!",
    cityId: "seoul",
    category: "activity",
    place_ko: "경복궁 흥례문 앞",
    place_en: "In front of Gyeongbokgung Heungnyemun",
    date: "2026-05-25",
    time: "10:00",
    maxPeople: 4,
    joinedCount: 2,
    joinedUsers: ["김지민", "Alex Miller"],
    targetAge: "20대",
    targetGender: "성별 무관",
    targetNationality: "국적 무관",
    preferenceCode: "shopping",
    creator: MOCK_USER_PROFILES[0],
    desc_ko: "한복 빌려서 2시간 동안 경복궁 한바퀴 돌면서 서로 예쁘게 사진 찍어줄 동행 구해요! 현재 저(여성, ENFP)랑 친구 한 명 있고, 성별 국적 상관 없이 친절하게 사진 찍어주실 분 환영해요! 끝나고 예쁜 한옥 카페 갈 예정입니다.",
    desc_en: "Let's rent Hanbok and take photos around Gyeongbokgung Palace for 2 hours! I (Female, ENFP) am traveling with one friend. Anyone who is friendly and willing to exchange photo-taking is welcome! We plan to visit a traditional café after.",
    status: "recruiting"
  },
  {
    id: 2,
    title_ko: "공항에서 홍대입구역까지 오프라인 택시 동행 구합니다 (비용 반반)",
    title_en: "Airport Taxi Share to Hongdae (split 50/50)",
    cityId: "seoul",
    category: "taxi",
    place_ko: "인천국제공항 T1 입국장",
    place_en: "Incheon Airport T1 Arrival Hall",
    date: "2026-05-22",
    time: "13:30",
    maxPeople: 3,
    joinedCount: 1,
    joinedUsers: ["Alex Miller"],
    targetAge: "연령 무관",
    targetGender: "성별 무관",
    targetNationality: "국적 무관",
    preferenceCode: "healing",
    creator: MOCK_USER_PROFILES[1],
    desc_ko: "짐이 너무 많아서 택시 타고 홍대로 넘어가려고 합니다. 일반 중형 택시 같이 타서 N분의 1 하실 분 편하게 문의주세요! 현재 저 혼자입니다. 정직하게 영수증 끊어서 공유해 드려요.",
    desc_en: "I have too much luggage, so I'm planning to take a taxi to Hongdae. Let's share a taxi and split the fare equally. I'm traveling alone. I will share the receipt honestly.",
    status: "recruiting"
  },
  {
    id: 3,
    title_ko: "아키하바라 고카트 의상 대여 동행 1명 충원합니다 (예약 완료)",
    title_en: "Akihabara Go-Kart Tour - Need 1 more person",
    cityId: "tokyo",
    category: "activity",
    place_ko: "아키하바라 고카트 샵 매장 앞",
    place_en: "In front of Akihabara Kart Shop",
    date: "2026-05-28",
    time: "15:00",
    maxPeople: 6,
    joinedCount: 5,
    joinedUsers: ["이준우", "김지민", "Alex Miller", "박소영", "Emma Smith"],
    targetAge: "20대",
    targetGender: "성별 무관",
    targetNationality: "한국인",
    preferenceCode: "activity",
    creator: MOCK_USER_PROFILES[2],
    desc_ko: "아키하바라 마리오 고카트 3시 타임 예약해 둔 상태입니다. 국제면허증 필수 지참하셔야 하고요, 현재 5명 확정이고 마지막 한 자리 20대 유쾌하신 분 구해요! 다들 텐션 높고 친화력 좋습니다.",
    desc_en: "We booked the Go-Kart tour for 3:00 PM. International driver's license is required. We are 5 people already, looking for one more friendly person in their 20s. We have great energy!",
    status: "recruiting"
  },
  {
    id: 4,
    title_ko: "미슐랭 가이드 맛집 츠키지 장외시장 스시 뿌실 분 구함",
    title_en: "Tsukiji Outer Market Sushi Tour - Foodies assemble",
    cityId: "tokyo",
    category: "restaurant",
    place_ko: "츠키지 시장 초입 홉 스테이션",
    place_en: "Tsukiji Station Exit 1",
    date: "2026-05-24",
    time: "09:00",
    maxPeople: 4,
    joinedCount: 3,
    joinedUsers: ["박소영", "김지민", "Alex Miller"],
    targetAge: "30대",
    targetGender: "성별 무관",
    targetNationality: "국적 무관",
    preferenceCode: "gourmet",
    creator: MOCK_USER_PROFILES[3],
    desc_ko: "츠키지 장외시장 아침부터 투어하면서 참치초밥, 계란꼬치, 가리비치즈구이 등 미식 먹방 찍으실 동행 구합니다. 소량으로 여러 메뉴 사서 같이 한 입씩 노나먹기 해요. 현재 남녀 섞여서 3명 있습니다.",
    desc_en: "We are visiting Tsukiji market early in the morning to try tuna sushi, egg skewers, and scallops. Let's buy and share different dishes. We currently have 3 people (mixed gender).",
    status: "recruiting"
  },
  {
    id: 5,
    title_ko: "프랑스 파리 루브르 박물관 도슨트 오전 투어 동승 렌트카 구함",
    title_en: "Louvre Museum Morning Tour Ride-share",
    cityId: "paris",
    category: "rent",
    place_ko: "피라미드 루브르 입구 광장",
    place_en: "Louvre Pyramid Courtyard",
    date: "2026-06-02",
    time: "09:00",
    maxPeople: 4,
    joinedCount: 2,
    joinedUsers: ["Emma Smith", "김지민"],
    targetAge: "연령 무관",
    targetGender: "성별 무관",
    targetNationality: "한국인",
    preferenceCode: "culture",
    creator: MOCK_USER_PROFILES[4],
    desc_ko: "한국어 지원 공식 박물관 도슨트 9시 입장 투어 티켓 끊었습니다. 렌트카 쉐어로 오거나 동선 겹쳐서 역에서 차로 이동하실 분 계시면 조인하고 싶어요! 비용은 물론 쉐어합니다.",
    desc_en: "I bought a ticket for the official Korean audio tour entering at 9 AM. Looking for someone with a rental car to share a ride, or we can coordinate. Will split parking/gas costs.",
    status: "recruiting"
  }
];

const CHAT_SIMULATOR_RESPONSES = {
  1: [
    { delay: 1500, sender: "김지민", mbti: "ENFP", message_ko: "안녕하세요! 동행 신청해주셔서 감사합니다 😃 한복 대여점 예약은 하셨나요?", message_en: "Hello! Thanks for joining our room! 😃 Have you booked a Hanbok rental shop yet?" },
    { delay: 4500, sender: "박소영", mbti: "ISFJ", message_ko: "반가워요! 저도 같이 가게 된 박소영입니다. 경복궁 근처에 퓨전 한복 예쁜 샵 알아봐 둔 곳 있어요!", message_en: "Nice to meet you! I'm Soyoung, also joining this tour. I found a gorgeous fusion Hanbok rental shop near Gyeongbokgung!" }
  ],
  2: [
    { delay: 2000, sender: "Alex Miller", mbti: "INFJ", message_ko: "안녕하세요! 네, 공항 입국장 스타벅스 앞에서 1시 반에 모이면 될 것 같아요. 제 캐리어가 엄청 커서 중형 카카오벤을 부르려고 해요.", message_en: "Hi! Yes, let's meet at 1:30 PM in front of the Arrivals Starbuck. Since I have a huge luggage, I plan to hail a Kakao Vent (Van)." },
    { delay: 6000, sender: "Alex Miller", mbti: "INFJ", message_ko: "요금은 한 사람당 대략 2~3만원선 나올 거 같아요. 다같이 나누면 대중교통보다 훨씬 편하실 거예요!", message_en: "The fare should be around $20-$30 per person. Splitting it will make it way more comfortable than taking the subway!" }
  ],
  3: [
    { delay: 1800, sender: "이준우", mbti: "ESTP", message_ko: "오! 환영합니다! 면허증은 '국제운전면허증(영문)' 소지하셨나요? 일본 고카트 타려면 필수입니다!", message_en: "Oh! Welcome to our crew! Do you have a physical 'International Driving Permit'? It's strictly required to drive in Japan!" },
    { delay: 4000, sender: "Emma Smith", mbti: "ENTP", message_ko: "Yeah! And dress code is funny costumes. We have Mario, Peach, and Yoshi costumes ready. You can pick whatever you want!", message_en: "Yeah! And dress code is funny costumes. We have Mario, Peach, and Yoshi costumes ready. You can pick whatever you want!" }
  ],
  4: [
    { delay: 1500, sender: "박소영", mbti: "ISFJ", message_ko: "안녕하세요! 초밥 투어 오신 걸 환영해요! 아침 일찍 가야 대기시간이 적어서 9시 약속인데 괜찮으실까요?", message_en: "Hello! Welcome to the sushi foodies! We are meeting at 9 AM because queue lines get really long later. Is the time okay?" },
    { delay: 5000, sender: "이준우", mbti: "ESTP", message_ko: "여기 참치 우니동 진짜 기가 막히는 곳 있습니다. 제가 예전에 갔던 단골집 가시죠!", message_en: "I know an incredible restaurant serving tuna & sea urchin bowls. Let's go to my favorite local spot!" }
  ],
  5: [
    { delay: 2000, sender: "Emma Smith", mbti: "ENTP", message_ko: "Hello! Welcome. We can meet in front of the glass pyramid. Do you already have the Louvre museum admission ticket?", message_en: "Hello! Welcome. We can meet in front of the glass pyramid. Do you already have the Louvre museum admission ticket?" }
  ]
};


const EXTRA_CITIES_META = {
  washington: {
    name_ko: "워싱턴 D.C.", name_en: "Washington D.C.", country_ko: "미국", country_en: "United States",
    desc_ko: "내셔널 몰과 박물관들이 늘어선 정치와 역사적 랜드마크의 심장부", desc_en: "The neoclassical capital of the US, home to the National Mall.",
    core: {
      healing: { name_ko: "내셔널 몰 리플렉팅 풀", name_en: "National Mall Reflecting Pool", open: 0, close: 1440, x: 4.5, y: 5.0 },
      gourmet: { name_ko: "올드 에빗 그릴", name_en: "Old Ebbitt Grill", open: 660, close: 1320, x: 4.9, y: 5.3 },
      culture: { name_ko: "미국 국회의사당", name_en: "US Capitol Building", open: 510, close: 1020, x: 6.5, y: 4.9, isLandmark: true },
      activity: { name_ko: "타이달 베이슨 보트선착장", name_en: "Tidal Basin Boathouse", open: 600, close: 1080, x: 4.8, y: 4.0 },
      shopping: { name_ko: "조지타운 엠 스트리트", name_en: "Georgetown M Street", open: 600, close: 1260, x: 3.2, y: 6.0 }
    }
  },
  berlin: {
    name_ko: "베를린", name_en: "Berlin", country_ko: "독일", country_en: "Germany",
    desc_ko: "장벽의 역사와 현대 힙스터 문화가 공존하는 독일의 수도", desc_en: "German capital blending wall history with techno and hipster vibes.",
    core: {
      healing: { name_ko: "티어가르텐 공원", name_en: "Tiergarten Park", open: 360, close: 1260, x: 4.0, y: 5.5 },
      gourmet: { name_ko: "커리 36 소시지 레스토랑", name_en: "Curry 36 Restaurant", open: 660, close: 1320, x: 3.8, y: 3.5 },
      culture: { name_ko: "브란덴부르크 문", name_en: "Brandenburg Gate", open: 0, close: 1440, x: 5.0, y: 5.5, isLandmark: true },
      activity: { name_ko: "슈프레강 카약 선착장", name_en: "Spree River Kayaking", open: 540, close: 1140, x: 6.2, y: 6.0 },
      shopping: { name_ko: "쿠르퓌르스텐담 대로", name_en: "Kurfurstendamm Boulevard", open: 600, close: 1200, x: 2.5, y: 4.5 }
    }
  },
  madrid: {
    name_ko: "마드리드", name_en: "Madrid", country_ko: "스페인", country_en: "Spain",
    desc_ko: "예술 미술관들과 활기찬 광장, 미식이 넘치는 스페인의 수도", desc_en: "Spanish capital hosting world-class museums, plazas, and culinary gems.",
    core: {
      healing: { name_ko: "레티로 공원 호숫가", name_en: "El Retiro Park Lake", open: 360, close: 1320, x: 6.5, y: 5.0 },
      gourmet: { name_ko: "산 미겔 전통시장", name_en: "Mercado de San Miguel", open: 600, close: 1440, x: 4.2, y: 4.9 },
      culture: { name_ko: "프라도 국립미술관", name_en: "Prado Museum", open: 600, close: 1200, x: 6.0, y: 4.8, isLandmark: true },
      activity: { name_ko: "카사 데 캄포 호수보트", name_en: "Casa de Campo Boating", open: 480, close: 1200, x: 2.0, y: 5.0 },
      shopping: { name_ko: "마드리드 그란 비아", name_en: "Gran Via Avenue", open: 600, close: 1320, x: 4.8, y: 5.4 }
    }
  },
  canberra: {
    name_ko: "캔버라", name_en: "Canberra", country_ko: "호주", country_en: "Australia",
    desc_ko: "자연림과 국립 공공 기관들이 어우러진 계획도시이자 호주의 수도", desc_en: "The planned capital of Australia, integrated with surrounding nature.",
    core: {
      healing: { name_ko: "벌리 그리핀 호수공원", name_en: "Lake Burley Griffin Park", open: 0, close: 1440, x: 5.0, y: 4.8 },
      gourmet: { name_ko: "브래든 론스데일 가 레스토랑", name_en: "Braddon Lonsdale Diner", open: 660, close: 1320, x: 5.2, y: 6.0 },
      culture: { name_ko: "호주 전쟁기념관", name_en: "Australian War Memorial", open: 600, close: 1020, x: 6.5, y: 6.5, isLandmark: true },
      activity: { name_ko: "블랙 마운틴 하이킹", name_en: "Black Mountain Summit Trail", open: 360, close: 1200, x: 3.0, y: 5.8 },
      shopping: { name_ko: "캔버라 센터 쇼핑몰", name_en: "Canberra Centre Mall", open: 540, close: 1140, x: 5.3, y: 5.5 }
    }
  },
  ottawa: {
    name_ko: "오타와", name_en: "Ottawa", country_ko: "캐나다", country_en: "Canada",
    desc_ko: "리도 운하의 아름다운 겨울 빙상길과 의사당이 솟아있는 캐나다의 수도", desc_en: "The bilingual capital of Canada, featuring the scenic Rideau Canal.",
    core: {
      healing: { name_ko: "메이저스 힐 공원", name_en: "Major's Hill Park", open: 0, close: 1440, x: 5.2, y: 5.5 },
      gourmet: { name_ko: "바이워드 로컬 마켓", name_en: "ByWard Market Stalls", open: 360, close: 1440, x: 5.5, y: 5.3 },
      culture: { name_ko: "파를라망 힐 의사당", name_en: "Parliament Hill Buildings", open: 540, close: 1080, x: 4.8, y: 5.6, isLandmark: true },
      activity: { name_ko: "리도 운하 보트투어/스케이트", name_en: "Rideau Canal Activity", open: 480, close: 1320, x: 5.0, y: 4.5 },
      shopping: { name_ko: "CF 리도 센터 갤러리", name_en: "CF Rideau Centre Mall", open: 600, close: 1260, x: 5.4, y: 5.0 }
    }
  },
  brasilia: {
    name_ko: "브라질리아", name_en: "Brasilia", country_ko: "브라질", country_en: "Brazil",
    desc_ko: "비행기 모양의 독특한 도시 계획과 오스카 니마이어 건축의 브라질 수도", desc_en: "The airplane-shaped modernist capital designed by Oscar Niemeyer.",
    core: {
      healing: { name_ko: "파라노아 호수공원", name_en: "Paranoa Lake Park", open: 360, close: 1320, x: 7.0, y: 4.8 },
      gourmet: { name_ko: "망구에이 정통 식당", name_en: "Mangai Restaurant", open: 660, close: 1320, x: 6.2, y: 4.5 },
      culture: { name_ko: "브라질리아 대성당", name_en: "Cathedral of Brasilia", open: 480, close: 1080, x: 5.5, y: 5.0, isLandmark: true },
      activity: { name_ko: "국립공원 광천 수영장", name_en: "Brasilia National Park Pool", open: 480, close: 1020, x: 3.5, y: 8.0 },
      shopping: { name_ko: "콘준토 나시오날 몰", name_en: "Conjunto Nacional Mall", open: 600, close: 1320, x: 5.0, y: 5.5 }
    }
  },
  moscow: {
    name_ko: "모스크바", name_en: "Moscow", country_ko: "러시아", country_en: "Russia",
    desc_ko: "크렘린 궁전과 붉은 광장이 역사를 노래하는 대도시이자 러시아의 수도", desc_en: "The historic capital of Russia, home to the colorful Saint Basil's Cathedral.",
    core: {
      healing: { name_ko: "고르키 문화공원", name_en: "Gorky Central Park", open: 0, close: 1440, x: 4.2, y: 3.8 },
      gourmet: { name_ko: "카페 푸시킨", name_en: "Cafe Pushkin Dining", open: 0, close: 1440, x: 4.8, y: 6.0 },
      culture: { name_ko: "모스크바 크렘린 & 붉은 광장", name_en: "Kremlin and Red Square", open: 540, close: 1080, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "루즈니키 스케이트 아레나", name_en: "Luzhniki Skating Arena", open: 600, close: 1320, x: 2.8, y: 2.5 },
      shopping: { name_ko: "굼 백화점 아케이드", name_en: "GUM Department Store", open: 600, close: 1320, x: 5.2, y: 5.1 }
    }
  },
  newdelhi: {
    name_ko: "뉴델리", name_en: "New Delhi", country_ko: "인도", country_en: "India",
    desc_ko: "고대 유적과 활기찬 현대 인도 문화가 함께 공존하는 수도", desc_en: "The chaotic yet beautiful capital of India, filled with historic structures.",
    core: {
      healing: { name_ko: "로디 가든 공원", name_en: "Lodi Gardens", open: 360, close: 1200, x: 4.5, y: 3.8 },
      gourmet: { name_ko: "카림스 올드델리 음식점", name_en: "Karim's Historic Curry", open: 660, close: 1380, x: 6.0, y: 7.0 },
      culture: { name_ko: "인디아 게이트 기념관", name_en: "India Gate Monument", open: 0, close: 1440, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "하우즈 카스 빌리지 워크", name_en: "Hauz Khas Village Walk", open: 600, close: 1140, x: 3.8, y: 2.5 },
      shopping: { name_ko: "코너트 플레이스 쇼핑 가", name_en: "Connaught Place Circle", open: 600, close: 1260, x: 5.0, y: 6.0 }
    }
  },
  riyadh: {
    name_ko: "리야드", name_en: "Riyadh", country_ko: "사우디아라비아", country_en: "Saudi Arabia",
    desc_ko: "사막 위의 마천루와 고대 왕국의 흔적이 가득한 사우디아라비아 수도", desc_en: "The financial capital of Saudi Arabia, blending desert forts with modern skyscrapers.",
    core: {
      healing: { name_ko: "살만 국왕 야외공원", name_en: "King Salman Park", open: 360, close: 1320, x: 5.0, y: 6.0 },
      gourmet: { name_ko: "알 나즈드 전통식당", name_en: "Najd Village Dining", open: 720, close: 1440, x: 4.2, y: 4.5 },
      culture: { name_ko: "알 마스막 랜드마크 요새", name_en: "Al Masmak Fortress", open: 540, close: 1260, x: 5.0, y: 4.0, isLandmark: true },
      activity: { name_ko: "에지 오브 더 월드 하이킹", name_en: "Edge of the World Hike", open: 360, close: 1080, x: 1.0, y: 8.0 },
      shopping: { name_ko: "킹덤 센터 몰 쇼핑", name_en: "Kingdom Centre Mall", open: 600, close: 1320, x: 4.8, y: 7.0 }
    }
  },
  ankara: {
    name_ko: "앙카라", name_en: "Ankara", country_ko: "튀르키예", country_en: "Turkey",
    desc_ko: "아타튀르크의 영묘가 솟아있는 터키 역사의 심장부이자 수도", desc_en: "The administrative capital of Turkey, hosting the grand mausoleum of Ataturk.",
    core: {
      healing: { name_ko: "겐클릭 호수공원", name_en: "Genclik Park Lake", open: 480, close: 1320, x: 4.8, y: 5.5 },
      gourmet: { name_ko: "케밥치 하치 아리프 베이", name_en: "Kebabci Haci Arif Bey", open: 660, close: 1320, x: 4.2, y: 4.2 },
      culture: { name_ko: "아타튀르크 아느트카비르 묘", name_en: "Anitkabir Mausoleum", open: 540, close: 1020, x: 4.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "앙카라 옛 성곽 등반", name_en: "Ankara Castle Climb", open: 480, close: 1200, x: 6.0, y: 5.8 },
      shopping: { name_ko: "아르마다 아울렛 몰", name_en: "Armada Shopping Mall", open: 600, close: 1320, x: 2.5, y: 4.5 }
    }
  },
  bern: {
    name_ko: "베른", name_en: "Bern", country_ko: "스위스", country_en: "Switzerland",
    desc_ko: "아레강이 굽이쳐 흐르는 유네스코 고성 거리와 곰 공원의 도시", desc_en: "Swiss capital built around a sharp loop of the Aare river, famous for bears.",
    core: {
      healing: { name_ko: "베른 장미정원 전망", name_en: "Bern Rose Garden View", open: 0, close: 1440, x: 6.5, y: 6.0 },
      gourmet: { name_ko: "알테스 트람디포 양조식당", name_en: "Altes Tramdepot Restaurant", open: 660, close: 1440, x: 6.2, y: 5.2 },
      culture: { name_ko: "베른 랜드마크 시계탑", name_en: "Zytglogge Clock Tower", open: 0, close: 1440, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "아레강 여름 수영/보팅", name_en: "Aare River Swim", open: 540, close: 1200, x: 4.8, y: 4.5 },
      shopping: { name_ko: "베른 아케이드 석조 쇼핑가", name_en: "Bern Lauben Arcades", open: 540, close: 1140, x: 4.5, y: 5.2 }
    }
  },
  warsaw: {
    name_ko: "바르샤바", name_en: "Warsaw", country_ko: "폴란드", country_en: "Poland",
    desc_ko: "쇼팽의 음악이 흐르는 공원들과 재건된 고딕식 왕궁이 있는 수도", desc_en: "Polish capital rebuilt after WWII, celebrating Frederic Chopin's life.",
    core: {
      healing: { name_ko: "와지엔키 왕립 삼림공원", name_en: "Lazienki Royal Park", open: 360, close: 1260, x: 5.5, y: 3.5 },
      gourmet: { name_ko: "자피에첵 전통 만두집", name_en: "Zapiecek Pierogi Diner", open: 660, close: 1320, x: 5.0, y: 5.8 },
      culture: { name_ko: "바르샤바 왕궁 미술관", name_en: "Royal Castle Museum", open: 600, close: 1080, x: 5.0, y: 6.0, isLandmark: true },
      activity: { name_ko: "비스툴라 강변 자전거 하이킹", name_en: "Vistula River Cycling", open: 360, close: 1320, x: 6.0, y: 4.8 },
      shopping: { name_ko: "즐로테 타라시 쇼핑몰", name_en: "Zlote Tarasy Mall", open: 540, close: 1320, x: 4.5, y: 4.8 }
    }
  },
  buenosaires: {
    name_ko: "부엔오스아이레스", name_en: "Buenos Aires", country_ko: "아르헨티나", country_en: "Argentina",
    desc_ko: "남미의 파리라 불리는 낭만적인 탱고와 스테이크의 발원지", desc_en: "The Paris of South America, home to passionate tango and prime steak.",
    core: {
      healing: { name_ko: "팔레르모 호수공원 삼림", name_en: "Tres de Febrero Park", open: 360, close: 1260, x: 3.5, y: 7.0 },
      gourmet: { name_ko: "돈 훌리오 아르헨티나 그릴", name_en: "Don Julio Parrilla Grill", open: 720, close: 1440, x: 4.0, y: 6.8 },
      culture: { name_ko: "카미니토 락 컬러 골목길", name_en: "Caminito Art Street", open: 600, close: 1080, x: 5.0, y: 3.0, isLandmark: true },
      activity: { name_ko: "콜론 극장 오페라 하우스 투어", name_en: "Teatro Colon Tour", open: 540, close: 1080, x: 4.8, y: 5.2 },
      shopping: { name_ko: "갈레리아스 파시피코 아케이드", name_en: "Galerias Pacifico Mall", open: 600, close: 1260, x: 5.2, y: 5.5 }
    }
  },
  stockholm: {
    name_ko: "스톡홀름", name_en: "Stockholm", country_ko: "스웨덴", country_en: "Sweden",
    desc_ko: "바다 위에 지어진 14개의 섬과 북유럽 빈티지 감성의 수도", desc_en: "Spreading across 14 islands, this capital balances historic palaces and designs.",
    core: {
      healing: { name_ko: "유르가르덴 운하길", name_en: "Djurgarden Canal Walk", open: 0, close: 1440, x: 6.8, y: 5.0 },
      gourmet: { name_ko: "펠리칸 스웨디시 미트볼", name_en: "Pelikan Restaurant", open: 720, close: 1380, x: 5.5, y: 3.2 },
      culture: { name_ko: "바사 왕실 전함 박물관", name_en: "Vasa Museum", open: 540, close: 1080, x: 6.2, y: 5.2, isLandmark: true },
      activity: { name_ko: "스톡홀름 요트 세일링", name_en: "Stockholm Sailing Adventure", open: 540, close: 1140, x: 8.0, y: 4.5 },
      shopping: { name_ko: "감라 스탄 중세 쇼핑 골목", name_en: "Gamla Stan Alleys", open: 600, close: 1200, x: 5.0, y: 4.5 }
    }
  },
  brussels: {
    name_ko: "브뤼셀", name_en: "Brussels", country_ko: "벨기에", country_en: "Belgium",
    desc_ko: "그랑플라스 광장의 황금빛 야경과 달콤한 초콜릿, 와플의 메카", desc_en: "The historic capital of Belgium, famous for chocolate, beer, and lace.",
    core: {
      healing: { name_ko: "브뤼셀 파크 공원", name_en: "Brussels Park Stroll", open: 360, close: 1320, x: 6.0, y: 4.8 },
      gourmet: { name_ko: "메종 당도아 벨기에 와플", name_en: "Maison Dandoy Sweet Shop", open: 600, close: 1140, x: 4.8, y: 5.0 },
      culture: { name_ko: "브뤼셀 그랑플라스 광장", name_en: "Grand Place Square", open: 0, close: 1440, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "아토미움 메탈 구 구조물 타워", name_en: "Atomium Tower Tour", open: 600, close: 1080, x: 2.5, y: 8.0 },
      shopping: { name_ko: "로열 생튀베르 쇼핑 갤러리", name_en: "Les Galeries Saint-Hubert", open: 540, close: 1200, x: 5.2, y: 5.2 }
    }
  },
  dublin: {
    name_ko: "더블린", name_en: "Dublin", country_ko: "아일랜드", country_en: "Ireland",
    desc_ko: "기네스 흑맥주의 고향이자 조이스와 예이츠의 문학이 깃든 수도", desc_en: "The friendly capital of Ireland, home to Trinity College and Guinness.",
    core: {
      healing: { name_ko: "피닉스 공원 사슴 숲길", name_en: "Phoenix Park Deer Trails", open: 0, close: 1440, x: 2.0, y: 6.0 },
      gourmet: { name_ko: "템플 바 아이리시 펍 저녁 식사", name_en: "The Temple Bar Irish Pub", open: 660, close: 1440, x: 5.0, y: 5.0 },
      culture: { name_ko: "트리니티 칼리지 켈스의 서", name_en: "Trinity College Long Room", open: 540, close: 1020, x: 5.6, y: 4.6, isLandmark: true },
      activity: { name_ko: "기네스 스토어하우스 시음", name_en: "Guinness Storehouse Experience", open: 570, close: 1140, x: 3.5, y: 4.8 },
      shopping: { name_ko: "그래프턴 패션 스트리트", name_en: "Grafton Street Shopping", open: 540, close: 1140, x: 5.5, y: 4.4 }
    }
  },
  oslo: {
    name_ko: "오슬로", name_en: "Oslo", country_ko: "노르웨이", country_en: "Norway",
    desc_ko: "피오르와 뭉크의 절규 미술전이 함께하는 자연 친화적 수도", desc_en: "Norway's coastal capital, famous for the Munch Museum and Viking history.",
    core: {
      healing: { name_ko: "비겔란 조각 야외 공원", name_en: "Vigeland Sculpture Park", open: 0, close: 1440, x: 3.0, y: 6.5 },
      gourmet: { name_ko: "피스케토렛 해산물 바치", name_en: "Fiskeriet Seafood Diner", open: 660, close: 1200, x: 5.2, y: 5.1 },
      culture: { name_ko: "오슬로 오페라 하우스 루프탑", name_en: "Oslo Opera House Roof Walk", open: 0, close: 1440, x: 6.0, y: 4.8, isLandmark: true },
      activity: { name_ko: "홀멘콜렌 스키 점프 전망대", name_en: "Holmenkollen Ski Jump", open: 600, close: 1020, x: 1.5, y: 8.5 },
      shopping: { name_ko: "아케르 브뤼게 항구 몰", name_en: "Aker Brygge Waterfront", open: 600, close: 1200, x: 4.8, y: 4.7 }
    }
  },
  vienna: {
    name_ko: "비엔나", name_en: "Vienna", country_ko: "오스트리아", country_en: "Austria",
    desc_ko: "모차르트 음악과 합스부르크 왕가의 웅장한 바로크식 궁전 도시", desc_en: "Austrian capital defined by imperial palaces and legacy of Mozart.",
    core: {
      healing: { name_ko: "쇤브룬 궁전 황실 대정원", name_en: "Schonbrunn Palace Gardens", open: 390, close: 1200, x: 2.5, y: 2.5 },
      gourmet: { name_ko: "카페 자허 초콜릿 토르테", name_en: "Cafe Sacher Dining", open: 480, close: 1440, x: 5.0, y: 4.8 },
      culture: { name_ko: "슈테판 고딕 성당 투어", name_en: "St. Stephen's Cathedral", open: 360, close: 1320, x: 5.1, y: 5.1, isLandmark: true },
      activity: { name_ko: "프라터 놀이공원 대관람차", name_en: "Prater Ferris Wheel", open: 600, close: 1320, x: 7.5, y: 6.5 },
      shopping: { name_ko: "빈 켄트너 패션 대로", name_en: "Kartner Strasse Boulevard", open: 540, close: 1200, x: 4.9, y: 4.9 }
    }
  },
  copenhagen: {
    name_ko: "코펜하겐", name_en: "Copenhagen", country_ko: "덴마크", country_en: "Denmark",
    desc_ko: "뉘하운 운하와 안데르센의 동화 감성, 디자인의 북유럽 수도", desc_en: "Danish capital known for Nyhavn harbor and Tivoli Gardens theme park.",
    core: {
      healing: { name_ko: "킹스 가든 공원", name_en: "The King's Garden", open: 360, close: 1260, x: 5.2, y: 6.0 },
      gourmet: { name_ko: "뉘하운 노천 해산물 식당", name_en: "Nyhavn Canal Restaurant", open: 660, close: 1320, x: 5.8, y: 5.3 },
      culture: { name_ko: "아말리엔보르 왕궁 정밀 투어", name_en: "Amalienborg Palace Tour", open: 600, close: 1020, x: 6.0, y: 5.6, isLandmark: true },
      activity: { name_ko: "티볼리 가든 전통 롤러코스터", name_en: "Tivoli Gardens Wooden Ride", open: 660, close: 1320, x: 4.5, y: 4.5 },
      shopping: { name_ko: "스트뢰에 패션 스트리트", name_en: "Stroget Shopping Street", open: 600, close: 1140, x: 4.8, y: 5.1 }
    }
  },
  helsinki: {
    name_ko: "헬싱키", name_en: "Helsinki", country_ko: "핀란드", country_en: "Finland",
    desc_ko: "친환경 사우나 문화와 백야의 바다가 어우러진 디자인의 수도", desc_en: "Finnish capital located on a peninsula, famous for saunas and rock churches.",
    core: {
      healing: { name_ko: "카이보푸이스트 오션뷰 공원", name_en: "Kaivopuisto Seaside Park", open: 0, close: 1440, x: 5.5, y: 2.5 },
      gourmet: { name_ko: "마켓 스퀘어 핀란드 연어 수프", name_en: "Market Square Salmon Soup", open: 390, close: 1080, x: 5.2, y: 4.8 },
      culture: { name_ko: "헬싱키 흰색 대성당", name_en: "Helsinki Cathedral", open: 540, close: 1080, x: 5.2, y: 5.2, isLandmark: true },
      activity: { name_ko: "수오멘린나 바다 요새 트레킹", name_en: "Suomenlinna Sea Fortress", open: 360, close: 1320, x: 6.8, y: 1.0 },
      shopping: { name_ko: "에스플러네이드 마리메꼬 쇼핑가", name_en: "Esplanade Design District", open: 600, close: 1200, x: 4.8, y: 4.7 }
    }
  },
  lisbon: {
    name_ko: "리스본", name_en: "Lisbon", country_ko: "포르투갈", country_en: "Portugal",
    desc_ko: "노란 빈티지 트램과 달콤한 에그타르트가 반겨주는 언덕의 도시", desc_en: "Hilly, coastal capital of Portugal, famous for pastel de nata and old trams.",
    core: {
      healing: { name_ko: "에두아르도 7세 공원", name_en: "Eduardo VII Park", open: 0, close: 1440, x: 3.5, y: 7.0 },
      gourmet: { name_ko: "파스테이스 드 벨렝 빵집", name_en: "Pasteis de Belem Bakery", open: 480, close: 1380, x: 1.0, y: 4.2 },
      culture: { name_ko: "제로니무스 수도원 투어", name_en: "Jeronimos Monastery Tour", open: 600, close: 1080, x: 1.2, y: 4.4, isLandmark: true },
      activity: { name_ko: "빈티지 트램 28호 탑승", name_en: "Tram 28 Scenic Route", open: 420, close: 1260, x: 4.8, y: 5.0 },
      shopping: { name_ko: "아우구스타 광장 쇼핑가", name_en: "Rua Augusta Shopping", open: 600, close: 1200, x: 5.0, y: 4.8 }
    }
  },
  athens: {
    name_ko: "아테네", name_en: "Athens", country_ko: "그리스", country_en: "Greece",
    desc_ko: "서구 문명의 기원이자 파르테논 대리석 신전이 솟아있는 도시", desc_en: "The ancient cradle of Western civilization, dominated by Parthenon ruins.",
    core: {
      healing: { name_ko: "국립 아테네 가든 공원", name_en: "National Gardens Athens", open: 360, close: 1200, x: 5.5, y: 4.2 },
      gourmet: { name_ko: "플라카 야외 기로스 타번", name_en: "Plaka Gyros Tavern", open: 660, close: 1440, x: 4.8, y: 4.5 },
      culture: { name_ko: "아크로폴리스 파르테논 신전", name_en: "Acropolis Parthenon Ruins", open: 480, close: 1200, x: 4.5, y: 4.8, isLandmark: true },
      activity: { name_ko: "리카베투스 대리석 언덕 등반", name_en: "Lycabettus Hill Sunrise Climb", open: 0, close: 1440, x: 6.2, y: 6.0 },
      shopping: { name_ko: "모나스티라키 주말 플리마켓", name_en: "Monastiraki Flea Market", open: 540, close: 1260, x: 4.6, y: 5.1 }
    }
  },
  jakarta: {
    name_ko: "자카르타", name_en: "Jakarta", country_ko: "인도네시아", country_en: "Indonesia",
    desc_ko: "독립 기념탑 모나스와 인도양 바다가 어우러진 인도네시아의 수도", desc_en: "The bustling capital of Indonesia, featuring TMII cultural parks.",
    core: {
      healing: { name_ko: "수로파티 바얀트리 그늘공원", name_en: "Suropati Park Green", open: 360, close: 1200, x: 5.5, y: 4.8 },
      gourmet: { name_ko: "사테 세나얀 식당 사테구이", name_en: "Sate Senayan Restaurant", open: 600, close: 1320, x: 5.2, y: 4.5 },
      culture: { name_ko: "모나스 독립기념탑 공원", name_en: "National Monument Monas", open: 480, close: 1080, x: 5.0, y: 6.0, isLandmark: true },
      activity: { name_ko: "TMII 민속 문화공원 케이블카", name_en: "Taman Mini Cable Car", open: 540, close: 1020, x: 8.0, y: 1.5 },
      shopping: { name_ko: "그랜드 인도네시아 메가 몰", name_en: "Grand Indonesia Mall", open: 600, close: 1320, x: 4.8, y: 5.2 }
    }
  },
  mexicocity: {
    name_ko: "멕시코시티", name_en: "Mexico City", country_ko: "멕시코", country_en: "Mexico",
    desc_ko: "아스테카 문명과 스페인 식민지 시대 예술이 공존하는 은화의 도시", desc_en: "High-altitude capital of Mexico, known for Frida Kahlo and Pyramids.",
    core: {
      healing: { name_ko: "차풀테펙 성림공원", name_en: "Chapultepec Forest Park", open: 360, close: 1080, x: 3.2, y: 4.8 },
      gourmet: { name_ko: "엘 카르디날 멕시코 식당", name_en: "El Cardenal Diner", open: 420, close: 1140, x: 5.1, y: 5.5 },
      culture: { name_ko: "소칼로 중앙광장 & 대성당", name_en: "Zocalo Plaza & Cathedral", open: 480, close: 1200, x: 5.2, y: 5.4, isLandmark: true },
      activity: { name_ko: "테오티우아칸 태양의 피라미드", name_en: "Teotihuacan Pyramids Climb", open: 540, close: 1020, x: 9.0, y: 9.0 },
      shopping: { name_ko: "라 시우다델라 수공예품 전통 마켓", name_en: "La Ciudadela Crafts Market", open: 600, close: 1140, x: 4.2, y: 5.3 }
    }
  },
  abudhabi: {
    name_ko: "아부다비", name_en: "Abu Dhabi", country_ko: "아랍에미리트", country_en: "UAE",
    desc_ko: "대리석 그랜드 모스크 사원과 페라리 테마 월드가 반기는 수도", desc_en: "Capital of the UAE, home to Sheikh Zayed Grand Mosque and Louvre Abu Dhabi.",
    core: {
      healing: { name_ko: "코니시 모래사장 해안가", name_en: "Corniche Beach Stroll", open: 360, close: 1440, x: 3.5, y: 6.0 },
      gourmet: { name_ko: "밀라스 퓨전 로컬 레스토랑", name_en: "Milas Arabic Restaurant", open: 660, close: 1380, x: 6.8, y: 4.5 },
      culture: { name_ko: "셰이크 자이드 그랜드 모스크", name_en: "Sheikh Zayed Grand Mosque", open: 540, close: 1320, x: 6.0, y: 3.0, isLandmark: true },
      activity: { name_ko: "페라리 월드 롤러코스터 라이드", name_en: "Ferrari World Rollercoaster", open: 660, close: 1200, x: 8.5, y: 6.5 },
      shopping: { name_ko: "야스 몰 쇼핑 갤러리아", name_en: "Yas Mall Shopping", open: 600, close: 1320, x: 8.4, y: 6.3 }
    }
  },
  pretoria: {
    name_ko: "프레토리아", name_en: "Pretoria", country_ko: "남아프리카 공화국", country_en: "South Africa",
    desc_ko: "자카란다 보랏빛 벚꽃길과 만델라 동상이 우뚝 서 있는 입법 수도", desc_en: "Administrative capital of South Africa, famous for purple jacaranda trees.",
    core: {
      healing: { name_ko: "프레토리아 국립 식물원", name_en: "Pretoria Botanical Gardens", open: 480, close: 1080, x: 6.5, y: 5.5 },
      gourmet: { name_ko: "블루 사프란 그릴 스테이크하우스", name_en: "Blue Saffron Grill", open: 660, close: 1320, x: 5.2, y: 4.8 },
      culture: { name_ko: "유니언 빌딩 만델라 동상 광장", name_en: "Union Buildings Memorial", open: 360, close: 1140, x: 5.0, y: 6.0, isLandmark: true },
      activity: { name_ko: "보르트레커 화강암 요새 산책", name_en: "Voortrekker Monument Trek", open: 480, close: 1020, x: 3.5, y: 3.0 },
      shopping: { name_ko: "브루클린 패션 아울렛 몰", name_en: "Brooklyn Mall Pretoria", open: 540, close: 1140, x: 5.1, y: 4.2 }
    }
  },
  manila: {
    name_ko: "마닐라", name_en: "Manila", country_ko: "필리핀", country_en: "Philippines",
    desc_ko: "성벽 도시 인트라무로스와 오션 베이 선셋이 아름다운 수도", desc_en: "The historic capital of Philippines, featuring Spanish colonial Intramuros.",
    core: {
      healing: { name_ko: "리잘 오션 해안 공원", name_en: "Rizal Park Seaside Walk", open: 300, close: 1320, x: 4.5, y: 4.5 },
      gourmet: { name_ko: "아리스토크랫 정통 바비큐", name_en: "The Aristocrat BBQ Diner", open: 0, close: 1440, x: 4.6, y: 3.8 },
      culture: { name_ko: "인트라무로스 산 아구스틴 성당", name_en: "San Agustin Church Tour", open: 480, close: 1080, x: 4.5, y: 5.5, isLandmark: true },
      activity: { name_ko: "산티아고 역사 요새 탐방", name_en: "Fort Santiago Historic Tour", open: 480, close: 1200, x: 4.4, y: 5.8 },
      shopping: { name_ko: "SM 몰 오브 아시아 메가 몰", name_en: "SM Mall of Asia Gallery", open: 600, close: 1320, x: 3.8, y: 2.0 }
    }
  },
  hanoi: {
    name_ko: "하노이", name_en: "Hanoi", country_ko: "베트남", country_en: "Vietnam",
    desc_ko: "호안끼엠 호수의 전설과 향긋한 쌀국수 냄새가 가득한 전통 수도", desc_en: "The ancient capital of Vietnam, famous for French quarters and lake bridges.",
    core: {
      healing: { name_ko: "호안끼엠 거북탑 호수공원", name_en: "Hoan Kiem Lake Stroll", open: 0, close: 1440, x: 5.0, y: 5.0 },
      gourmet: { name_ko: "분짜 흐엉리엔 오바마 분짜", name_en: "Bun Cha Huong Lien", open: 480, close: 1260, x: 5.2, y: 4.0 },
      culture: { name_ko: "하노이 호찌민 묘소 랜드마크", name_en: "Ho Chi Minh Mausoleum", open: 480, close: 660, x: 3.8, y: 5.5, isLandmark: true },
      activity: { name_ko: "하노이 구시가지 씨클로 투어", name_en: "Hanoi Old Quarter Cyclo Ride", open: 480, close: 1320, x: 5.1, y: 5.4 },
      shopping: { name_ko: "동쑤언 전통 야시장 의류 쇼핑", name_en: "Dong Xuan Market Shopping", open: 360, close: 1380, x: 5.1, y: 6.0 }
    }
  },
  kualalumpur: {
    name_ko: "쿠알라룸푸르", name_en: "Kuala Lumpur", country_ko: "말레이시아", country_en: "Malaysia",
    desc_ko: "페트로나스 두 개 타워와 바투 힌두 동굴 사원이 빛나는 연방 수도", desc_en: "Malaysian capital dominated by the high-tech Petronas Twin Towers.",
    core: {
      healing: { name_ko: "KLCC 레이크 심포니 공원", name_en: "KLCC Park Fountains", open: 360, close: 1320, x: 5.2, y: 5.2 },
      gourmet: { name_ko: "잘란 알로 야시장 사테 꼬치", name_en: "Jalan Alor Street Food", open: 960, close: 1440, x: 4.8, y: 4.8 },
      culture: { name_ko: "바투 동굴 무지개 계단 사원", name_en: "Batu Caves Rainbow Temple", open: 480, close: 1140, x: 5.0, y: 9.0, isLandmark: true },
      activity: { name_ko: "페트로나스 트윈 타워 하늘 브릿지", name_en: "Petronas Twin Towers Bridge", open: 540, close: 1080, x: 5.2, y: 5.3 },
      shopping: { name_ko: "파빌리온 부킷 빈탕 메가 쇼핑몰", name_en: "Pavilion Kuala Lumpur Mall", open: 600, close: 1320, x: 4.9, y: 4.7 }
    }
  },
  dhaka: {
    name_ko: "다카", name_en: "Dhaka", country_ko: "방글라데시", country_en: "Bangladesh",
    desc_ko: "무굴 제국의 붉은 요새 랄바그 포트와 생동감 넘치는 항구 도시", desc_en: "The historic capital of Bangladesh, known for Mughal palaces and ports.",
    core: {
      healing: { name_ko: "라마나 호수 숲공원", name_en: "Ramna Park Lake Walk", open: 360, close: 1140, x: 5.0, y: 5.0 },
      gourmet: { name_ko: "알 라작 인도 전통 카치 비리야니", name_en: "Al Razzak Biryani Restaurant", open: 360, close: 1440, x: 4.8, y: 4.0 },
      culture: { name_ko: "랄바그 무굴제국 붉은 요새", name_en: "Lalbagh Fort Museum", open: 540, close: 1080, x: 3.5, y: 3.5, isLandmark: true },
      activity: { name_ko: "사다르가트 항구 수동 나룻배", name_en: "Sadarghat Boat Rowing", open: 360, close: 1200, x: 5.2, y: 2.0 },
      shopping: { name_ko: "바스하라 시티 메가 몰 쇼핑", name_en: "Bashundhara City Mall", open: 600, close: 1200, x: 4.9, y: 6.2 }
    }
  },
  bogota: {
    name_ko: "보고타", name_en: "Bogota", country_ko: "콜롬비아", country_en: "Colombia",
    desc_ko: "황금 박물관과 케이블카 언덕 몬세라테가 낭만적인 고산 지대 수도", desc_en: "High-altitude capital of Colombia, famous for Monserrate and gold museums.",
    core: {
      healing: { name_ko: "시몬 볼리바르 대형 호수공원", name_en: "Simon Bolivar Metropolitan Park", open: 360, close: 1080, x: 3.0, y: 5.5 },
      gourmet: { name_ko: "안드레스 카르네 스테이크", name_en: "Andres Carne de Res Grill", open: 720, close: 1440, x: 5.0, y: 9.0 },
      culture: { name_ko: "몬세라테 성당 케이블카 언덕", name_en: "Monserrate Sanctuary Climb", open: 390, close: 1200, x: 7.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "황금 박물관 고대 공예 투어", name_en: "Museo del Oro Gold Exhibit", open: 540, close: 1140, x: 5.2, y: 4.8 },
      shopping: { name_ko: "안디노 쇼핑몰 에메랄드 상점", name_en: "Centro Andino Emerald Mall", open: 600, close: 1260, x: 4.8, y: 7.2 }
    }
  },
  santiago: {
    name_ko: "산티아고", name_en: "Santiago", country_ko: "칠레", country_en: "Chile",
    desc_ko: "안데스 산맥 만년설이 병풍처럼 둘러싸고 있는 칠레의 수도", desc_en: "Chilean capital surrounded by the high, snow-capped Andes mountains.",
    core: {
      healing: { name_ko: "산 크리스토발 언덕 공원", name_en: "San Cristobal Hill Park", open: 600, close: 1200, x: 6.0, y: 6.5 },
      gourmet: { name_ko: "갈린도 칠레 전통 가정식", name_en: "Galindo Traditional Diner", open: 660, close: 1440, x: 5.8, y: 6.0 },
      culture: { name_ko: "산티아고 메트로폴리탄 성당", name_en: "Santiago Metropolitan Cathedral", open: 540, close: 1200, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "산타 루시아 요새 언덕 등반", name_en: "Santa Lucia Hill Fort Climb", open: 540, close: 1140, x: 5.3, y: 5.1 },
      shopping: { name_ko: "코스타네라 센터 최고층 빌딩몰", name_en: "Costanera Center Mall", open: 600, close: 1320, x: 7.0, y: 5.8 }
    }
  },
  bucharest: {
    name_ko: "부쿠레슈티", name_en: "Bucharest", country_ko: "루마니아", country_en: "Romania",
    desc_ko: "세계 최대 크기의 의회 궁전과 파리의 개선문을 쏙 빼닮은 수도", desc_en: "Romanian capital featuring the gargantuan Palace of the Parliament.",
    core: {
      healing: { name_ko: "헤라스트라우 호수 보트 정원", name_en: "Herastrau Park Lake", open: 0, close: 1440, x: 5.0, y: 8.0 },
      gourmet: { name_ko: "카루 쿠 베레 역사 양조식당", name_en: "Caru' cu Bere Restaurant", open: 660, close: 1440, x: 5.0, y: 4.5 },
      culture: { name_ko: "루마니아 의회 궁전 석조건물", name_en: "Palace of the Parliament Tour", open: 540, close: 1020, x: 4.5, y: 4.0, isLandmark: true },
      activity: { name_ko: "아테네움 필하모닉 내부 투어", name_en: "Romanian Athenaeum Grand Hall", open: 600, close: 1080, x: 5.1, y: 5.0 },
      shopping: { name_ko: "오보르 야외 전통 치즈시장", name_en: "Obor Traditional Market", open: 420, close: 1140, x: 6.8, y: 6.0 }
    }
  },
  lima: {
    name_ko: "리마", name_en: "Lima", country_ko: "페루", country_en: "Peru",
    desc_ko: "태평양 절벽 위에 세워진 사랑의 공원과 해산물 세비체의 수도", desc_en: "Coastal capital of Peru, home to Larcomar shopping and fresh ceviche.",
    core: {
      healing: { name_ko: "사랑의 미라플로레스 해안공원", name_en: "Park of Love Miraflores", open: 0, close: 1440, x: 3.5, y: 3.5 },
      gourmet: { name_ko: "라 마르 신선한 세비체 요리", name_en: "La Mar Cevicheria Grill", open: 720, close: 1020, x: 3.0, y: 4.2 },
      culture: { name_ko: "리마 역사지구 마요르 대성당", name_en: "Cathedral of Lima Tour", open: 540, close: 1020, x: 5.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "우아카 푸클라나 진흙 피라미드", name_en: "Huaca Pucllana Adobe Pyramid", open: 540, close: 1020, x: 4.2, y: 4.0 },
      shopping: { name_ko: "라르코마르 해안 절벽 쇼핑몰", name_en: "Larcomar Cliffside Mall", open: 600, close: 1320, x: 3.4, y: 3.2 }
    }
  },
  astana: {
    name_ko: "아스타나", name_en: "Astana", country_ko: "카자흐스탄", country_en: "Kazakhstan",
    desc_ko: "이심 강변 보행 공원과 미래지향적 바이테렉 전망 황금알 타워", desc_en: "The futuristic capital of Kazakhstan, boasting the golden egg Bayterek tower.",
    core: {
      healing: { name_ko: "이심 강변 보행자 공원", name_en: "Ishim River Park", open: 0, close: 1440, x: 4.8, y: 5.0 },
      gourmet: { name_ko: "아르나우 카자흐스탄 식당", name_en: "Arnau Traditional Restaurant", open: 720, close: 1380, x: 5.5, y: 4.2 },
      culture: { name_ko: "바이테렉 황금알 전망 타워", name_en: "Bayterek Tower Monument", open: 600, close: 1260, x: 5.0, y: 4.8, isLandmark: true },
      activity: { name_ko: "칸 샤티르 거대 텐트 수영장", name_en: "Khan Shatyr Indoor Beach", open: 600, close: 1320, x: 3.5, y: 3.5 },
      shopping: { name_ko: "아부다비 플라자 쇼핑 갤러리", name_en: "Abu Dhabi Plaza Mall", open: 600, close: 1320, x: 5.8, y: 4.0 }
    }
  },
  wellington: {
    name_ko: "웰링턴", name_en: "Wellington", country_ko: "뉴질랜드", country_en: "New Zealand",
    desc_ko: "향긋한 플랫화이트 커피 문화와 반지의 제왕 제작 스튜디오 도시", desc_en: "New Zealand's windy harbor capital, famous for Te Papa museum.",
    core: {
      healing: { name_ko: "오리엔탈 베이 해안 모래사장", name_en: "Oriental Bay Beach Path", open: 0, close: 1440, x: 6.2, y: 4.8 },
      gourmet: { name_ko: "피델스 카페 플랫 화이트", name_en: "Fidel's Café Coffee", open: 420, close: 1320, x: 4.5, y: 4.5 },
      culture: { name_ko: "테 파파 국립 박물관 전시", name_en: "Te Papa National Museum", open: 600, close: 1080, x: 5.2, y: 4.9, isLandmark: true },
      activity: { name_ko: "빨간색 웰링턴 랜드마크 케이블카", name_en: "Wellington Cable Car Climb", open: 450, close: 1200, x: 4.0, y: 5.5 },
      shopping: { name_ko: "람튼 쿼이 브랜드 쇼핑가", name_en: "Lambton Quay Shopping Street", open: 540, close: 1080, x: 4.8, y: 5.3 }
    }
  },
  luxembourg: {
    name_ko: "룩셈부르크", name_en: "Luxembourg", country_ko: "룩셈부르크", country_en: "Luxembourg",
    desc_ko: "푸른 요새 계곡과 석조 Casemates 동굴이 요새처럼 서있는 곳", desc_en: "Historic fortress capital of Luxembourg, showcasing Bock Casemates.",
    core: {
      healing: { name_ko: "페트뤼스 녹음 가득한 계곡길", name_en: "Petrusse Valley Trails", open: 0, close: 1440, x: 4.5, y: 4.5 },
      gourmet: { name_ko: "파리 광장 노천 식당 카페", name_en: "Café de Paris Dining", open: 480, close: 1320, x: 5.0, y: 5.2 },
      culture: { name_ko: "복 포르테 카제마트 요새동굴", name_en: "Bock Casemates Cave Tour", open: 600, close: 1020, x: 5.8, y: 5.5, isLandmark: true },
      activity: { name_ko: "알제트 강변 자전거 루프", name_en: "Alzette River Bike Loop", open: 0, close: 1440, x: 5.5, y: 4.0 },
      shopping: { name_ko: "그랑 뤼 보행자 럭셔리 스트리트", name_en: "Grand Rue Shopping Street", open: 600, close: 1140, x: 4.8, y: 5.3 }
    }
  },
  reykjavik: {
    name_ko: "레이캬비크", name_en: "Reykjavik", country_ko: "아이슬란드", country_en: "Iceland",
    desc_ko: "천연 온천 블루라군과 북유럽 기하학 성당이 솟아있는 요새 도시", desc_en: "World's northernmost capital, gateway to Iceland's Blue Lagoon and glaciers.",
    core: {
      healing: { name_ko: "블루라군 유황 천연온천 힐링", name_en: "Blue Lagoon Thermal Spa", open: 480, close: 1320, x: 1.0, y: 1.0 },
      gourmet: { name_ko: "바야린스 베즈투 핫도그 스탠드", name_en: "Baejarins Beztu Pylsur", open: 600, close: 1440, x: 4.8, y: 5.0 },
      culture: { name_ko: "하들그림스키르야 주상절리 성당", name_en: "Hallgrimskirkja Church", open: 540, close: 1200, x: 5.5, y: 4.5, isLandmark: true },
      activity: { name_ko: "골든 서클 게이시르 간헐천 탐험", name_en: "Golden Circle Geysir Tour", open: 0, close: 1440, x: 8.5, y: 8.5 },
      shopping: { name_ko: "라우가베구르 감성 디자인 가", name_en: "Laugavegur Shopping Street", open: 600, close: 1140, x: 5.1, y: 4.9 }
    }
  },
  amsterdam: {
    name_ko: "암스테르담", name_en: "Amsterdam", country_ko: "네덜란드", country_en: "Netherlands",
    desc_ko: "아름다운 자전거 운하길과 빈센트 반 고흐 미술관의 예술 수도", desc_en: "Dutch capital known for its canals, historic gabled houses, and Van Gogh Museum.",
    core: {
      healing: { name_ko: "폰델 공원 자전거 잔디밭", name_en: "Vondelpark Bicycle Rest", open: 0, close: 1440, x: 3.5, y: 4.2 },
      gourmet: { name_ko: "블라우스 인도네시아 요리 식당", name_en: "Blauw Rijsttafel Restaurant", open: 720, close: 1320, x: 3.8, y: 3.8 },
      culture: { name_ko: "암스테르담 반 고흐 미술관", name_en: "Van Gogh Museum Tour", open: 540, close: 1080, x: 4.2, y: 4.0, isLandmark: true },
      activity: { name_ko: "레이크스뮤지엄 미술관 광장 스케이트", name_en: "Rijksmuseum Ice Rink Activity", open: 600, close: 1320, x: 4.5, y: 4.2 },
      shopping: { name_ko: "나인 스트리트 디자인 소품숍", name_en: "The Nine Streets Shoppes", open: 600, close: 1140, x: 4.8, y: 5.2 }
    }
  },
  hawaii: {
    name_ko: "하와이", name_en: "Hawaii", country_ko: "미국", country_en: "United States",
    desc_ko: "와이키키 해변과 환상적인 하이킹 코스가 있는 태평양의 지상낙원", desc_en: "The paradise of the Pacific, famous for Waikiki beach and hiking.",
    core: {
      healing: { name_ko: "와이키키 해변 산책로", name_en: "Waikiki Beach Boardwalk", open: 0, close: 1440, x: 5.0, y: 3.5 },
      gourmet: { name_ko: "듀크스 와이키키 뷰 그릴", name_en: "Duke's Waikiki Grill", open: 420, close: 1320, x: 5.2, y: 3.4 },
      culture: { name_ko: "이올라니 하와이 왕궁", name_en: "Iolani Palace Tour", open: 540, close: 1020, x: 4.5, y: 4.0, isLandmark: true },
      activity: { name_ko: "다이아몬드 헤드 하이킹 코스", name_en: "Diamond Head Summit Trail", open: 360, close: 1080, x: 6.0, y: 2.8 },
      shopping: { name_ko: "알라모아나 쇼핑 센터", name_en: "Ala Moana Center Mall", open: 600, close: 1260, x: 4.2, y: 4.5 }
    }
  },
  bali: {
    name_ko: "발리", name_en: "Bali", country_ko: "인도네시아", country_en: "Indonesia",
    desc_ko: "아름다운 사원과 계단식 논, 예술과 서핑이 숨쉬는 신들의 섬", desc_en: "The Island of the Gods, famous for historic temples and rice terraces.",
    core: {
      healing: { name_ko: "테갈랄랑 계단식 논 뷰", name_en: "Tegallalang Rice Terraces", open: 420, close: 1140, x: 5.0, y: 6.5 },
      gourmet: { name_ko: "너티 누리스 바비큐 립스", name_en: "Naughty Nuri's BBQ Ribs", open: 660, close: 1320, x: 4.8, y: 5.8 },
      culture: { name_ko: "울루와투 절벽 사원", name_en: "Uluwatu Temple Cliff", open: 540, close: 1140, x: 3.5, y: 2.0, isLandmark: true },
      activity: { name_ko: "우붓 정글 발리 스윙", name_en: "Ubud Jungle Bali Swing", open: 480, close: 1080, x: 5.2, y: 6.0 },
      shopping: { name_ko: "우붓 전통 예술 시장", name_en: "Ubud Traditional Art Market", open: 480, close: 1080, x: 5.0, y: 6.2 }
    }
  },
  cancun: {
    name_ko: "칸쿤", name_en: "Cancun", country_ko: "멕시코", country_en: "Mexico",
    desc_ko: "눈부신 에메랄드 카리브해와 거대한 마야 유적이 공존하는 휴양지", desc_en: "Mexico's Caribbean paradise, featuring pristine beaches and Mayan ruins.",
    core: {
      healing: { name_ko: "플라야 델피네스 카리브해", name_en: "Playa Delfines Beach", open: 0, close: 1440, x: 5.5, y: 3.0 },
      gourmet: { name_ko: "로렌질로스 해산물 바닷가", name_en: "Lorenzillo's Lobster House", open: 720, close: 1380, x: 5.2, y: 4.8 },
      culture: { name_ko: "치첸이차 세계 마야 유적", name_en: "Chichen Itza Mayan Ruins", open: 480, close: 1020, x: 1.0, y: 5.0, isLandmark: true },
      activity: { name_ko: "엑스카레트 친환경 테마파크", name_en: "Xcaret Eco-Archaeological Park", open: 510, close: 1320, x: 3.5, y: 1.5 },
      shopping: { name_ko: "라 이슬라 쇼핑 빌리지", name_en: "La Isla Shopping Village", open: 600, close: 1320, x: 5.2, y: 5.0 }
    }
  }
};


const REAL_GOURMET_MAPPING = {
  washington: {
    c: [["베이크드 앤 와이어드 디저트 카페", "Baked & Wired Café", 480, 1200], ["컴파스 커피 에스프레소 바", "Compass Coffee Bar", 360, 1140], ["블루보틀 커피 로스터리", "Blue Bottle Coffee", 420, 1140], ["콜라다 숍 라틴 카페", "Colada Shop Cafe", 480, 1320]],
    r: [["벤스 칠리 보울 핫도그", "Ben's Chili Bowl", 660, 1380], ["르 디플로마트 프렌치 레스토랑", "Le Diplomate", 660, 1320], ["필로메나 이탈리안 레스토랑", "Filomena Ristorante", 660, 1320], ["더 댑니 그릴 파인다이닝", "The Dabney Grill", 1020, 1380], ["파운딩 파머스 로컬 레스토랑", "Founding Farmers", 480, 1320]]
  },
  berlin: {
    c: [["더 바른 커피 로스터스", "The Barn Coffee Roasters", 480, 1140], ["파이브 엘리펀트 카페", "Five Elephant Café", 540, 1140], ["보난자 커피 히어로즈", "Bonanza Coffee Heroes", 480, 1140], ["디스트릭트 브런치 카페", "Distrikt Coffee", 540, 1080]],
    r: [["Mustafas Gemuse Kebap", "Mustafas Gemuse Kebap", 600, 1440], ["호프브로이 뷔르츠하우스", "Hofbrau Wirtshaus Berlin", 660, 1380], ["Zur Letzten Instanz 역사식당", "Zur Letzten Instanz", 720, 1320], ["Monsieur Vuong 아시안 비스트로", "Monsieur Vuong", 720, 1320], ["Schnitzel House Berlin", "Schnitzel House Berlin", 660, 1320]]
  },
  madrid: {
    c: [["토마 에스프레소 카페", "Toma Cafe", 480, 1200], ["Chocolateria San Gines", "Chocolateria San Gines", 0, 1440], ["카페 데 오리엔테 테라스 카페", "Cafe de Oriente", 480, 1320], ["뿜뿜 브런치 카페", "Pum Pum Cafe", 540, 1140]],
    r: [["Sobrino de Botin 역사식당", "Sobrino de Botin", 720, 1440], ["라 바라카 파에야 전문점", "La Barraca", 720, 1320], ["Casa Lucio 스페인 타파스 식당", "Casa Lucio", 780, 1440], ["트리시클로 마드리드 레스토랑", "Triciclo", 780, 1380], ["산 마르틴 타파스 전문식당", "San Martin Tapas", 660, 1320]]
  },
  canberra: {
    c: [["더 커핑 룸 에스프레소 카페", "The Cupping Room", 450, 1020], ["오나 커피 하우스 카페", "Ona Coffee House", 420, 960], ["로컬 프레스 브런치 카페", "Local Press Cafe", 450, 1020], ["실키 오크 에스프레소 바", "Silky Oak Espresso Bar", 390, 1020]],
    r: [["아키바 아시안 퓨전 그릴", "Akiba Grill", 660, 1320], ["세이지 파인다이닝 레스토랑", "Sage Restaurant", 720, 1320], ["이탈리안 앤 선즈 레스토랑", "Italian and Sons", 720, 1320], ["쿠르제트 프렌치 식당", "Courgette Restaurant", 720, 1320], ["Charcoal Grill 스테이크 식당", "Charcoal Grill", 1080, 1380]]
  },
  ottawa: {
    c: [["브릿지헤드 로스터리 카페", "Bridgehead Roastery Cafe", 420, 1140], ["리틀 빅토리스 에스프레소 카페", "Little Victories Coffee", 450, 1080], ["적도 유기농 브런치 카페", "Equator Organic Cafe", 450, 1080], ["플래닛 로컬 커피 카페", "Planet Coffee", 480, 1080]],
    r: [["Fairouz 캐주얼 레스토랑", "Fairouz Cafe Dining", 660, 1320], ["더 웨일스본 해산물 레스토랑", "The Whalesbone", 660, 1320], ["플레이 푸드 앤 와인 레스토랑", "Play Food & Wine", 690, 1320], ["리비에라 오타와 이탈리안 식당", "Riviera Ottawa", 720, 1320], ["그랜드 피자 캐나다 식당", "Grand Pizzeria", 660, 1320]]
  },
  brasilia: {
    c: [["에르네스토 브런치 디저트 카페", "Ernesto Brunch Cafe", 480, 1320], ["벨리니 로스터리 커피 카페", "Belini Roastery Cafe", 480, 1200], ["카페 사바나 에스프레소 바", "Caffe Savana", 540, 1320], ["오비제토 브런치 카페", "Objeto Cafe", 540, 1200]],
    r: [["코코 밤부 라고 술 해산물 식당", "Coco Bambu Lago Sul", 690, 1380], ["Fogo de Chao 스테이크 식당", "Fogo de Chao", 720, 1380], ["망가이 폰타오 브라질 식당", "Mangai Pontao", 690, 1320], ["유니버설 다이닝 양식 레스토랑", "Universal Diner", 720, 1380], ["라 브라사 슈하스코 바비큐", "La Brasa Churrasco", 690, 1320]]
  },
  moscow: {
    c: [["Double B 에스프레소 카페", "Double B Cafe", 480, 1260], ["Coffeemania 디저트 카페", "Coffeemania Cafe", 420, 1380], ["아이러브케이크 디저트 카페", "I Love Cake", 480, 1320], ["컨버세이션스 디저트 카페", "Conversations Cafe", 480, 1320]],
    r: [["White Rabbit 루프탑 레스토랑", "White Rabbit", 720, 1440], ["Grand Cafe Dr. Zhivago", "Grand Cafe Dr. Zhivago", 0, 1440], ["Mari Vanna 러시아 레스토랑", "Mari Vanna", 720, 1320], ["Stolovaya No 57 가성비 식당", "Stolovaya No 57", 600, 1320], ["보르시 가든 러시아 식당", "Borsch Garden", 660, 1320]]
  },
  newdelhi: {
    c: [["Blue Tokai 에스프레소 카페", "Blue Tokai Cafe", 480, 1260], ["United Coffee House 역사 카페", "United Coffee House", 600, 1380], ["엘마스 베이커리 브런치 카페", "Elmas Bakery", 600, 1260], ["Cha Bar 홍차 티하우스 카페", "Cha Bar", 600, 1260]],
    r: [["Bukhara 탄두리 그릴 식당", "Bukhara Indian Grill", 720, 1440], ["Indian Accent 퓨전 레스토랑", "Indian Accent", 720, 1380], ["Karim's Old Delhi 카레식당", "Karim's Restaurant", 660, 1380], ["Moti Mahal 버터치킨 식당", "Moti Mahal", 660, 1380], ["안드라 바반 남인도 식당", "Andhra Bhavan", 480, 1320]]
  },
  riyadh: {
    c: [["Elixir Bunn 로스터리 카페", "Elixir Bunn Coffee", 420, 1320], ["Draft 감성 북 디저트 카페", "Draft Cafe", 480, 1320], ["Bateel 아라비아 디저트 카페", "Bateel Cafe", 480, 1320], ["어스 오가닉 디저트 카페", "Earth Organic Cafe", 480, 1320]],
    r: [["Najd Village 전통 아랍 식당", "Najd Village Restaurant", 720, 1440], ["The Globe 타워 전망대 식당", "The Globe", 780, 1440], ["LPM 프렌치 지중해 레스토랑", "LPM Restaurant", 750, 1410], ["사자 리야드 올데이 다이닝", "Shaza Riyadh Dining", 360, 1320], ["Shawarma House 바비큐 식당", "Shawarma House", 660, 1320]]
  },
  ankara: {
    c: [["Cafemiz 정원 브런치 카페", "Cafemiz", 540, 1320], ["Kakule Kahve 에스프레소 카페", "Kakule Kahve", 540, 1260], ["프로드 커피 에스프레소 바", "Prod Coffee", 480, 1320], ["Leman Kultur 터키 감성 카페", "Leman Kultur", 480, 1320]],
    r: [["Tarihi Merkez 터키 전통식당", "Tarihi Merkez", 660, 1320], ["Kebapci Emin Usta 숯불케밥", "Kebapci Emin Usta", 660, 1260], ["Trilye 지중해 해산물 식당", "Trilye Restaurant", 720, 1440], ["괵수 로칸타시 터키 뷔페", "Goksu Lokantasi", 600, 1320], ["피루제 메제 터키 가정식", "Firuze Meze", 660, 1320]]
  },
  bern: {
    c: [["Adrianos 에스프레소 바 카페", "Adrianos Cafe", 420, 1320], ["Einstein Cafe & Brunch Bar", "Einstein Cafe", 480, 1320], ["Kaffee Montag 베이커리 카페", "Kaffee Montag", 480, 1200], ["카페 페드 디저트 카페", "Café Fed", 480, 1200]],
    r: [["Kornhauskeller 베른 레스토랑", "Kornhauskeller", 690, 1440], ["Altes Tramdepot 수제맥주 식당", "Altes Tramdepot", 660, 1440], ["Restaurant Rosengarten 전망식당", "Restaurant Rosengarten", 540, 1440], ["Della Casa 치즈 퐁듀 식당", "Della Casa", 690, 1380], ["Baren Aare 스위스 소시지 식당", "Baren Aare", 660, 1320]]
  },
  warsaw: {
    c: [["Green Caffe Nero 로스터리 카페", "Green Caffe Nero", 420, 1320], ["Ministerstwo Kawy 에스프레소 카페", "Ministerstwo Kawy", 450, 1260], ["Kafka Book Cafe 디저트 카페", "Kafka Cafe", 540, 1320], ["Charlotte Bistro 브런치 카페", "Charlotte Bistro", 420, 1380]],
    r: [["U Kucharzy 폴란드 그릴 식당", "U Kucharzy", 720, 1440], ["Stary Dom 폴란드 전통식당", "Stary Dom", 720, 1440], ["Zapiecek Pierogarnia 만두식당", "Zapiecek Pierogarnia", 660, 1320], ["Butchery & Wine 스테이크 식당", "Butchery & Wine", 720, 1380], ["Piwna Kompania 학센 식당", "Piwna Kompania", 660, 1320]]
  },
  buenosaires: {
    c: [["Cafe Tortoni 역사 랜드마크 카페", "Cafe Tortoni", 480, 1380], ["El Gato Negro 허브 찻집 카페", "El Gato Negro", 540, 1320], ["Cafe Las Violetas 디저트 카페", "Cafe Las Violetas", 360, 1440], ["Lattente 로스터리 카페", "Lattente", 480, 1200]],
    r: [["La Cabrera 프리미엄 아사도 식당", "La Cabrera", 720, 1440], ["Don Julio 스테이크 레스토랑", "Don Julio", 720, 1440], ["Cabana Las Lilas 강변 갈비 식당", "Cabana Las Lilas", 720, 1440], ["Sarkis 아르메니아 꼬치 식당", "Sarkis", 720, 1440], ["La Brigada 아사도 그릴 식당", "La Brigada", 720, 1320]]
  },
  stockholm: {
    c: [["Cafe Pascal 피카 브런치 카페", "Cafe Pascal", 420, 1140], ["Drop Coffee 스페셜티 카페", "Drop Coffee", 480, 1080], ["Johan & Nystrom 에스프레소 카페", "Johan & Nystrom", 420, 1140], ["Vete-Katten 전통 디저트 카페", "Vete-Katten", 450, 1200]],
    r: [["Pelikan 스웨디시 전통 미트볼", "Pelikan", 720, 1380], ["Den Gyldene Freden 역사 식당", "Den Gyldene Freden", 1020, 1380], ["Tradition 로컬 스웨디시 식당", "Tradition", 1020, 1380], ["Smorgasbaren 해산물 뷔페 식당", "Smorgasbaren", 660, 1320], ["Bakfickan Stockholm 비스트로", "Bakfickan Stockholm", 660, 1320]]
  },
  brussels: {
    c: [["Maison Dandoy 수제 와플 카페", "Maison Dandoy", 570, 1140], ["Cafe Belga 호숫가 브런치 카페", "Cafe Belga", 480, 1440], ["Aksum Coffee House 에티오피아 카페", "Aksum Coffee House", 540, 1140], ["Mok Specialty 로스터리 카페", "Mok Specialty Coffee", 480, 1140]],
    r: [["Chez Leon 홍합요리 벨기에 식당", "Chez Leon", 690, 1380], ["Le Bistro de la Porte de Hal", "Le Bistro", 660, 1380], ["La Fin de Siecle 벨기에 레스토랑", "La Fin de Siecle", 720, 1440], ["Le Chalet de la Foret 파인다이닝", "Le Chalet de la Foret", 720, 1380], ["Pizzeria Roma 벨기에 피자 식당", "Pizzeria Roma", 660, 1320]]
  },
  dublin: {
    c: [["3fe 스페셜티 로스터리 카페", "3fe Coffee", 450, 1080], ["The Pepper Pot 브런치 카페", "The Pepper Pot", 540, 1080], ["Brother Hubbard 브런치 카페", "Brother Hubbard", 450, 1080], ["Bewley's Grafton Street 역사 카페", "Bewley's", 480, 1140]],
    r: [["The Winding Stair 아이리시 식당", "The Winding Stair", 720, 1380], ["Fade Street Social 그릴 식당", "Fade Street Social", 720, 1380], ["The Greenhouse 파인다이닝", "The Greenhouse", 720, 1380], ["Chapter One 미쉐린 레스토랑", "Chapter One", 720, 1380], ["Guinness Storehouse 버거 펍", "Guinness Storehouse Burger", 660, 1440]]
  },
  oslo: {
    c: [["Tim Wendelboe 스페셜티 카페", "Tim Wendelboe", 510, 1080], ["Fuglen Vintage 디자인 카페", "Fuglen", 480, 1320], ["Kaffebrenneriet 베이커리 카페", "Kaffebrenneriet", 420, 1080], ["Stockfleths 아침 샌드위치 카페", "Stockfleths", 420, 1080]],
    r: [["Lofoten Fiskerestaurant 해산물식당", "Lofoten Fiskerestaurant", 660, 1320], ["Den Glade Gris 족발 식당", "Den Glade Gris", 720, 1380], ["Hos Thea 지중해식 레스토랑", "Hos Thea", 1020, 1380], ["Bistro Richard 그릴 식당", "Bistro Richard", 720, 1320], ["Engebret Cafe 순록 요리 식당", "Engebret Cafe", 690, 1320]]
  },
  vienna: {
    c: [["Café Central 오스트리아 아치 카페", "Café Central", 450, 1320], ["Café Landtmann 디저트 카페", "Café Landtmann", 450, 1320], ["Café Sperl 클래식 찻집 카페", "Café Sperl", 420, 1320], ["Demel 황실 제과점 디저트 카페", "Demel", 540, 1140]],
    r: [["Figlmüller 슈니첼 레스토랑", "Figlmüller", 660, 1320], ["Plachutta Wollzeile 황제 갈비 식당", "Plachutta Wollzeile", 690, 1440], ["Steirereck 최고급 미식 레스토랑", "Steirereck", 720, 1380], ["Zum Schwarzen Kameel 정통 식당", "Zum Schwarzen Kameel", 480, 1440], ["Ribs of Vienna 립 전문 식당", "Ribs of Vienna", 690, 1320]]
  },
  copenhagen: {
    c: [["The Coffee Collective 로스터리 카페", "The Coffee Collective", 420, 1140], ["Democratic Coffee 시나몬롤 카페", "Democratic Coffee", 450, 1080], ["Atelier September 브런치 카페", "Atelier September", 450, 1020], ["Café Norden 브런치 카페", "Café Norden", 540, 1200]],
    r: [["Høst 북유럽 정원 레스토랑", "Høst", 1020, 1440], ["Schønnemann 오픈 샌드위치 식당", "Schønnemann", 690, 1020], ["Barr 해산물 비스트로 식당", "Barr Bistro", 720, 1320], ["Palægade 정통 고기그릴 식당", "Palægade", 690, 1320], ["Herman 코펜하겐 치즈 식당", "Herman Cheese Diner", 660, 1320]]
  },
  helsinki: {
    c: [["Café Regatta 해안가 통나무 카페", "Café Regatta", 540, 1260], ["Café Ekberg 핀란드 역사 카페", "Café Ekberg", 450, 1140], ["Good Life Coffee 브런치 카페", "Good Life Coffee", 480, 1020], ["Johan & Nyström 항구 카페", "Johan & Nyström", 480, 1140]],
    r: [["Savotta 핀란드 순록 요리 식당", "Savotta", 720, 1320], ["Ravintola Kuu 클래식 미트볼", "Ravintola Kuu", 1020, 1380], ["Olo 미쉐린 북유럽 레스토랑", "Olo Restaurant", 1080, 1440], ["Löyly 사우나 워터프론트 식당", "Löyly", 660, 1380], ["Kosmos 핀란드 가정식 식당", "Kosmos", 690, 1320]]
  },
  lisbon: {
    c: [["Café A Brasileira 역사 문학 카페", "Café A Brasileira", 480, 1320], ["Fábrica Coffee Roasters 에스프레소 카페", "Fábrica Coffee Roasters", 480, 1140], ["Copenhagen Coffee Lab 브런치 카페", "Copenhagen Coffee Lab", 450, 1140], ["Nicolau Lisboa 디저트 카페", "Nicolau Lisboa", 510, 1140]],
    r: [["Cervejaria Ramiro 해산물 식당", "Cervejaria Ramiro", 720, 1440], ["Belcanto 포르투갈 최고급 식당", "Belcanto", 750, 1380], ["Time Out Market 푸드홀 식당", "Time Out Market", 600, 1440], ["A Cevicheria 퓨전 해산물 식당", "A Cevicheria", 720, 1440], ["Casa de Fado 포르투갈 음악 식당", "Casa de Fado", 1140, 1440]]
  },
  athens: {
    c: [["Little Tree Books & Coffee 카페", "Little Tree Books & Coffee", 480, 1320], ["Mokka 터키식 에스프레소 카페", "Mokka Cafe", 420, 1140], ["Tailor Made 브런치 테라스 카페", "Tailor Made", 480, 1380], ["Taf Coffee 로스터리 카페", "Taf Coffee", 420, 1080]],
    r: [["Mani Mani 그리스 전통 수블라키", "Mani Mani", 720, 1380], ["Strofi Tavern 아크로폴리스 뷰 식당", "Strofi Tavern", 720, 1380], ["Varoulko Seaside 그리스 레스토랑", "Varoulko Seaside", 780, 1440], ["Spondi 미쉐린 파인다이닝 식당", "Spondi", 1140, 1440], ["Bairaktaris 올드타운 기로스 식당", "Bairaktaris", 600, 1440]]
  },
  jakarta: {
    c: [["Anomali Coffee 인도네시아 원두 카페", "Anomali Coffee", 420, 1320], ["Giyanti Coffee Roastery 카페", "Giyanti Coffee", 540, 1080], ["Djournal Coffee 디저트 카페", "Djournal Coffee", 600, 1320], ["Cafe Batavia 역사 광장 카페", "Cafe Batavia", 540, 1440]],
    r: [["Lara Djonggrang 인도네시아 궁중식당", "Lara Djonggrang", 660, 1440], ["Bunga Rampai 클래식 저택 식당", "Bunga Rampai", 660, 1320], ["Plataran Menteng 퓨전 식당", "Plataran Menteng", 660, 1320], ["Seribu Rasa 해산물 요리 식당", "Seribu Rasa", 660, 1320], ["Sate Senayan 숯불 꼬치구이 식당", "Sate Senayan", 600, 1320]]
  },
  mexicocity: {
    c: [["Café El Jarocho 에스프레소 카페", "Café El Jarocho", 360, 1380], ["Café de Tacuba 역사 제과점 카페", "Café de Tacuba", 480, 1320], ["Churreria El Moro 디저트 카페", "Churreria El Moro", 0, 1440], ["Café Avellaneda 브런치 로스터리 카페", "Café Avellaneda", 480, 1260]],
    r: [["Pujol 현대 멕시코 파인다이닝", "Pujol", 780, 1380], ["Contramar 멕시코 해산물 타코 식당", "Contramar", 720, 1200], ["Azul Historico 야외 정원 식당", "Azul Historico", 540, 1380], ["La Docena 바비큐 타코 식당", "La Docena", 720, 1380], ["Garibaldi 마리아치 광장 타코 식당", "Garibaldi Taco", 660, 1440]]
  },
  abudhabi: {
    c: [["The Coffee Club 야스 아일랜드 카페", "The Coffee Club", 480, 1320], ["Jones the Grocer 디저트 카페", "Jones the Grocer", 480, 1320], ["Rain Coffee 에스프레소 브런치 카페", "Rain Coffee", 420, 1320], ["Cafe 302 모던 로스터리 카페", "Cafe 302", 360, 1320]],
    r: [["LPM 아부다비 지중해 레스토랑", "LPM Abu Dhabi", 720, 1380], ["Villa Toscana 이탈리안 레스토랑", "Villa Toscana", 720, 1380], ["Meylas 아랍 전통 에미리트 식당", "Meylas", 540, 1320], ["Li Beirut 레바논 전통 그릴식당", "Li Beirut", 720, 1440], ["Al Maqam 사막 뷰 아랍 식당", "Al Maqam", 660, 1320]]
  },
  pretoria: {
    c: [["Tashas Brooklyn 브런치 카페", "Tashas Brooklyn", 480, 1260], ["Grounded at Echo 에스프레소 카페", "Grounded at Echo", 450, 1080], ["Bluestream 디저트 테라스 카페", "Bluestream", 480, 1140], ["The Java House 로컬 커피 카페", "The Java House", 420, 1140]],
    r: [["Kream Brooklyn 모던 스테이크하우스", "Kream Brooklyn", 690, 1380], ["Hillside Tavern 아프리카 갈비 식당", "Hillside Tavern", 690, 1320], ["Forti Grill 남아공 그릴 레스토랑", "Forti Grill", 720, 1380], ["Bel Carne 남아공 고기그릴 식당", "Bel Carne", 720, 1320], ["Geheven 남아공 빌리지 식당", "Geheven", 660, 1320]]
  },
  manila: {
    c: [["Wildflour Bakery 브런치 카페", "Wildflour Bakery", 420, 1320], ["Single Origin 브런치 카페", "Single Origin", 450, 1320], ["Habitual Espresso 스탠딩 카페", "Habitual Espresso", 480, 1140], ["Yardstick 로스터리 브런치 카페", "Yardstick", 480, 1200]],
    r: [["Antonio's 숲속 프렌치 레스토랑", "Antonio's", 690, 1320], ["Locavore 마닐라 현대 필리핀 식당", "Locavore", 660, 1380], ["Abe 전통 필리핀 가정식 식당", "Abe", 660, 1320], ["Barbara's 인트라무로스 스페인 식당", "Barbara's", 660, 1320], ["Iloilo 필리핀 해산물 식당", "Iloilo", 660, 1320]]
  },
  hanoi: {
    c: [["카페 지앙 에그 커피 원조 카페", "Giang Cafe", 420, 1320], ["Cong Caphe 코코넛 스무디 카페", "Cong Caphe", 420, 1380], ["Loading T 아침 디저트 카페", "Loading T", 480, 1260], ["Cafe Dinh 호안끼엠 에그 커피 카페", "Cafe Dinh", 420, 1320]],
    r: [["Cha Ca La Vong 가물치 튀김 식당", "Cha Ca La Vong", 660, 1320], ["Bun Cha Huong Lien 오바마 분짜 식당", "Bun Cha Huong Lien", 480, 1260], ["Quan An Ngon 로컬 분짜 식당", "Quan An Ngon", 420, 1320], ["Madame Hien 프랑스 저택 하노이 식당", "Madame Hien", 660, 1320], ["Bun Bo Nam Bo 비빔 쌀국수 식당", "Bun Bo Nam Bo", 480, 1320]]
  },
  kualalumpur: {
    c: [["VCR 스페셜티 브런치 카페", "VCR Cafe", 480, 1320], ["Merchant's Lane 디저트 카페", "Merchant's Lane", 540, 1200], ["Pulp 에스프레소 브런치 카페", "Pulp Coffee", 450, 1200], ["Feeka 브런치 코코넛 라떼 카페", "Feeka Coffee", 480, 1320]],
    r: [["Bijan 말레이시아 전통 레스토랑", "Bijan Cuisine", 720, 1380], ["Dining In The Dark 어둠 체험식당", "Dining In The Dark", 1080, 1380], ["Enak KL 전통 아시안 레스토랑", "Enak KL", 720, 1320], ["Dewakan 현대 파인다이닝 식당", "Dewakan", 1140, 1440], ["Madame Kwans 전통 말레이 식당", "Madame Kwans", 660, 1320]]
  },
  dhaka: {
    c: [["North End Coffee 로스터리 카페", "North End Coffee", 480, 1260], ["Tabaq 브런치 디저트 카페", "Tabaq Coffee", 540, 1200], ["Crimson Cup 에스프레소 카페", "Crimson Cup", 480, 1320], ["Gloria Jean's 브런치 카페", "Gloria Jean's", 420, 1320]],
    r: [["Kasturi 벵골 전통 식당", "Kasturi", 660, 1320], ["Star Kabab 다카 양꼬치 식당", "Star Kabab", 360, 1320], ["Saltz 피시앤칩스 해산물 식당", "Saltz", 720, 1320], ["The Atrium 퓨전 레스토랑", "The Atrium", 720, 1320], ["Dhaka Biryani 쌀 요리 식당", "Dhaka Biryani", 660, 1320]]
  },
  bogota: {
    c: [["Cafe San Alberto 에스프레소 카페", "Cafe San Alberto", 480, 1140], ["Catacion Publica 핸드드립 카페", "Catacion Publica", 540, 1140], ["Juan Valdez 로스터리 카페", "Juan Valdez", 420, 1260], ["Varietale 유기농 브런치 카페", "Varietale", 480, 1200]],
    r: [["Andres Carne de Res 테마 레스토랑", "Andres Carne de Res", 720, 1440], ["Leo 콜롬비아 파인다이닝 레스토랑", "Leo", 1140, 1440], ["Criterio 이탈리안 레스토랑", "Criterio", 720, 1380], ["Harry Sasson 콜롬비아 그릴식당", "Harry Sasson", 720, 1380], ["Bogota Beer Company 피자 식당", "Bogota Beer Company", 720, 1440]]
  },
  santiago: {
    c: [["Café Altura 에스프레소 카페", "Café Altura", 480, 1140], ["Café Bistro de la Barra 정원 카페", "Café Bistro", 540, 1140], ["Original Coffee Club 브런치 카페", "Original Coffee Club", 480, 1140], ["Cafe Wonderland 디저트 카페", "Cafe Wonderland", 540, 1140]],
    r: [["Boragó 안데스 야생 미식 식당", "Boragó", 1140, 1440], ["Liguria 라이브 타파스 식당", "Liguria", 660, 1440], ["Peumayen 안데스 원주민 식당", "Peumayen", 1140, 1440], ["Bocanáriz 칠레 와인 비스트로", "Bocanáriz", 720, 1440], ["Dona Tina 칠레 전통 고기스튜", "Dona Tina", 660, 1320]]
  },
  bucharest: {
    c: [["Origo 스페셜티 브런치 카페", "Origo", 420, 1440], ["Frudisiac 북유럽풍 브런치 카페", "Frudisiac", 480, 1140], ["Steam Coffee 에스프레소 바 카페", "Steam Coffee", 450, 1080], ["Camera din Fata 엔틱 디저트 카페", "Camera din Fata", 480, 1200]],
    r: [["Hanu' lui Manuc 요새 전통 식당", "Hanu' lui Manuc", 660, 1440], ["The Artist 분자 요리 레스토랑", "The Artist", 1080, 1380], ["Lacrimi si Sfinti 루마니아 식당", "Lacrimi si Sfinti", 720, 1440], ["Bucharest 개선문 소시지 그릴식당", "Bucharest Grill", 660, 1320], ["Mama Terra 루마니아 감자 식당", "Mama Terra", 660, 1320]]
  },
  lima: {
    c: [["Café Verde 유기농 에스프레소 카페", "Café Verde", 480, 1140], ["Puku Puku Café 안데스 원두 카페", "Puku Puku Café", 420, 1140], ["Neira Café Lab 로스터리 카페", "Neira Café Lab", 450, 1140], ["El Pan de la Chola 브런치 카페", "El Pan de la Chola", 480, 1200]],
    r: [["Central 아마존 허브 파인다이닝", "Central", 780, 1440], ["Maido 일식 퓨전 닛케이 레스토랑", "Maido", 750, 1380], ["Astrid y Gastón 페루 궁전 식당", "Astrid y Gastón", 750, 1380], ["Isolina Taberna Peruana 전통 식당", "Isolina Taberna", 720, 1320], ["Ceviche House 해산물 전문식당", "Ceviche House", 720, 1020]]
  },
  astana: {
    c: [["Ministry of Coffee 에스프레소 카페", "Ministry of Coffee", 480, 1320], ["Crepe Cafe 디저트 와플 카페", "Crepe Cafe", 480, 1320], ["Espresso Bar Astana 브런치 카페", "Espresso Bar Astana", 480, 1260], ["The Blend 에스프레소 카페", "The Blend", 480, 1260]],
    r: [["Epoch 구소련 테마 카자흐 식당", "Epoch Diner", 720, 1380], ["Qazaq Gourmet 말고기 레스토랑", "Qazaq Gourmet", 720, 1380], ["Line Brew 수제 바비큐 레스토랑", "Line Brew", 720, 1380], ["Portofino 이탈리아 레스토랑", "Portofino", 720, 1380], ["Shashlik House 카자흐 꼬치 식당", "Shashlik House", 660, 1320]]
  },
  wellington: {
    c: [["Flight Coffee Hangar 브런치 카페", "Flight Coffee Hangar", 450, 1020], ["Memphis Belle 에스프레소 카페", "Memphis Belle", 420, 1020], ["Customs by Supreme 브런치 카페", "Customs by Supreme", 450, 1020], ["Empire 로컬 디저트 브런치 카페", "Empire Cafe", 450, 1020]],
    r: [["Logan Brown 최고급 그릴 레스토랑", "Logan Brown", 720, 1380], ["Ortega Fish Shack 생선 식당", "Ortega Fish Shack", 720, 1380], ["Shed 5 항구 해산물 레스토랑", "Shed 5", 720, 1380], ["Boulcott Street Bistro 유럽 식당", "Boulcott Street Bistro", 720, 1320], ["Cuba Street 수제 버거 펍 식당", "Cuba Street Burger", 660, 1320]]
  },
  luxembourg: {
    c: [["Chocolate House Nathalie Bonn 디저트 카페", "Chocolate House Nathalie Bonn", 540, 1140], ["Knopes Coffee Roasters 카페", "Knopes Coffee Roasters", 480, 1080], ["Golden Bean 에스프레소 카페", "Golden Bean", 450, 1140], ["Kaale Kaffi 북 테마 디저트 카페", "Kaale Kaffi", 540, 1140]],
    r: [["Clairefontaine 프랑스 퓨전 식당", "Clairefontaine", 720, 1380], ["Ma Langue Sourit 최고급 식당", "Ma Langue Sourit", 720, 1380], ["Le Sud 개선문 뷰 레스토랑", "Le Sud", 720, 1380], ["Chiggeri 정통 유럽식 식당", "Chiggeri", 720, 1320], ["Casemates 룩셈부르크 학센 식당", "Casemates Haxen", 660, 1320]]
  },
  reykjavik: {
    c: [["Reykjavik Roasters 스페셜티 카페", "Reykjavik Roasters", 480, 1080], ["Cafe Babalu 알록달록 디저트 카페", "Cafe Babalu", 540, 1320], ["Kaffibrennslan 에스프레소 카페", "Kaffibrennslan", 480, 1320], ["Te & Kaffi 브런치 카페", "Te & Kaffi", 480, 1200]],
    r: [["Dill 북유럽 미식 레스토랑", "Dill", 1080, 1380], ["Grillmarkadurinn 고기 그릴 식당", "Grillmarkadurinn", 1020, 1380], ["Fiskfelagid 랍스터 식당", "Fiskfelagid", 720, 1380], ["Apotech Restaurant 유럽식 식당", "Apotech Restaurant", 690, 1380], ["Icelandic Street 랍스터 수프 식당", "Icelandic Street", 660, 1320]]
  },
  amsterdam: {
    c: [["Screaming Beans 에스프레소 카페", "Screaming Beans", 480, 1080], ["Lot Sixty One 브런치 카페", "Lot Sixty One", 450, 1080], ["Back to Black 브런치 카페", "Back to Black", 480, 1080], ["Bakers & Roasters 브런치 카페", "Bakers & Roasters", 510, 960]],
    r: [["Rijks 암스테르담 현대 유럽식식당", "Rijks", 690, 1380], ["Moeders 전통 미트볼 가정식당", "Moeders", 1020, 1380], ["De Kas 유기농 온실 레스토랑", "De Kas", 720, 1380], ["Blauw 인도네시아 꼬치구이 식당", "Blauw", 720, 1320], ["Haring Stand 청어 샌드위치 식당", "Haring Stand", 600, 1080]]
  },
  hawaii: {
    c: [["레오나즈 베이커리 도넛", "Leonard's Bakery Malasadas", 360, 1320], ["코나 커피 퍼베이어스", "Kona Coffee Purveyors", 360, 1200], ["아일랜드 빈티지 커피", "Island Vintage Coffee", 360, 1320], ["릴리하 베이커리 코코 퍼프", "Liliha Bakery", 360, 1320]],
    r: [["지오반니 새우 트럭", "Giovanni's Shrimp Truck", 630, 1110], ["마루가메 우돈 와이키키", "Marugame Udon Waikiki", 660, 1320], ["헬레나스 하와이안 푸드", "Helena's Hawaiian Food", 600, 960], ["아우트리거 훌라 그릴", "Hula Grill Waikiki", 420, 1320], ["하우스 위드아웃 어 키", "House Without A Key", 420, 1320]]
  },
  bali: {
    c: [["포테이토 헤드 비치 클럽", "Potato Head Beach Club", 600, 1440], ["리볼버 에스프레소 카페", "Revolver Espresso Seminyak", 420, 1380], ["세니만 커피 로스터스", "Seniman Coffee Ubud", 450, 1320], ["쿠데타 오션 테라스 카페", "Ku De Ta Beach Club", 480, 1440]],
    r: [["와룽 이부 오카 바비굴링", "Warung Ibu Oka Babi Guling", 660, 1080], ["베벡 벵길 더티덕 레스토랑", "Bebek Bengil Dirty Duck", 600, 1320], ["시스터필즈 브런치 레스토랑", "Sisterfields Cafe Seminyak", 420, 1260], ["로카보레 파인다이닝 우붓", "Locavore Restaurant", 720, 1320], ["메리스 타베르나 타파스", "Merah Putih Bali", 720, 1380]]
  },
  cancun: {
    c: [["아아 카카오 초콜릿 카페", "Ah Cacao Chocolate Cafe", 480, 1320], ["코코 밤부 칸쿤 비치 카페", "Coco Bongo Beach Bar", 600, 1440], ["카페 마데라 디저트 카페", "Cafe Madera Cancun", 480, 1260], ["프레도 젤라또 디저트 바", "Freddo Gelato Cancun", 600, 1320]],
    r: [["라 하비추엘라 전통 식당", "La Habichuela Downtown", 720, 1380], ["로사네그라 카리브 미식 식당", "RosaNegra Latin Dining", 720, 1440], ["엘 린콘 멕시칸 타코식당", "El Rincon de los Antojitos", 540, 1320], ["타코 앤 데킬라 타코 전문", "Tacos & Tequila Cancun", 660, 1320], ["포르피리오스 멕시칸 레스토랑", "Porfirio's Cancun", 720, 1380]]
  }
};


// Expand these dynamic cities into CITIES and ATTRACTIONS arrays
for (const cid in EXTRA_CITIES_META) {
  const data = EXTRA_CITIES_META[cid];
  
  CITIES.push({
    id: cid,
    name_ko: data.name_ko,
    name_en: data.name_en,
    country_ko: data.country_ko,
    country_en: data.country_en,
    desc_ko: data.desc_ko,
    desc_en: data.desc_en
  });

  const core = data.core;
  ATTRACTIONS[cid] = {
    healing: [],
    gourmet: [],
    culture: [],
    activity: [],
    shopping: []
  };

  const categories = ['healing', 'gourmet', 'culture', 'activity', 'shopping'];
  categories.forEach(cat => {
    const coreItem = core[cat];
    ATTRACTIONS[cid][cat].push({
      name_ko: coreItem.name_ko,
      name_en: coreItem.name_en,
      desc_ko: `${coreItem.name_ko} 방문 및 투어`,
      desc_en: `Explore and visit the famous ${coreItem.name_en}.`,
      duration: coreItem.duration || 120,
      isLandmark: !!coreItem.isLandmark,
      x: coreItem.x,
      y: coreItem.y,
      open: coreItem.open,
      close: coreItem.close
    });
  });

  const healingTemplates = [
    { name_ko: "호숫가 산책길", name_en: "Scenic Lake Promenade", duration: 90, dx: 0.3, dy: -0.4, open: 360, close: 1260 },
    { name_ko: "근처 정원 찻집", name_en: "Cozy Garden Tea House", duration: 90, dx: -0.2, dy: 0.3, open: 600, close: 1140 },
    { name_ko: "시립 수목원 & 온실", name_en: "Municipal Botanical Conservatory", duration: 120, dx: -0.5, dy: 0.4, open: 540, close: 1080 },
    { name_ko: "광장 벤치 휴식", name_en: "Relaxation Plaza Benches", duration: 60, dx: 0.1, dy: -0.1, open: 0, close: 1440 }
  ];
  
  // Custom generation for gourmet category to use real restaurants and cafes
  const mapping = REAL_GOURMET_MAPPING[cid];
  if (mapping) {
    // Push cafes
    mapping.c.forEach((c, idx) => {
      let x = core.gourmet.x + (idx % 2 === 0 ? 0.2 : -0.2);
      let y = core.gourmet.y + (idx < 2 ? 0.2 : -0.2);
      x = Math.max(0, Math.min(10, x));
      y = Math.max(0, Math.min(10, y));

      ATTRACTIONS[cid].gourmet.push({
        name_ko: c[0],
        name_en: c[1],
        desc_ko: `${data.name_ko}의 유명 디저트 카페 ${c[0]}에서 보내는 여유로운 시간`,
        desc_en: `Spend a relaxing afternoon at ${c[1]}, a popular dessert cafe in ${data.name_en}.`,
        duration: 70,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        open: c[2],
        close: c[3]
      });
    });

    // Push restaurants
    mapping.r.forEach((r, idx) => {
      let x = core.gourmet.x + (idx % 2 === 0 ? 0.3 : -0.3);
      let y = core.gourmet.y + (idx < 3 ? -0.3 : 0.3);
      x = Math.max(0, Math.min(10, x));
      y = Math.max(0, Math.min(10, y));

      ATTRACTIONS[cid].gourmet.push({
        name_ko: r[0],
        name_en: r[1],
        desc_ko: `${data.name_ko}의 대표 인기 맛집 ${r[0]}에서 즐기는 맛있는 식사`,
        desc_en: `Enjoy a delicious meal at the highly recommended local restaurant ${r[1]} in ${data.name_en}.`,
        duration: 90,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        open: r[2],
        close: r[3]
      });
    });
  }

  const cultureTemplates = [
    { name_ko: "현대 국립 미술관", name_en: "Museum of Contemporary Art", duration: 120, dx: -0.3, dy: 0.3, open: 600, close: 1080 },
    { name_ko: "역사 박물관 도슨트 투어", name_en: "National History Museum Tour", duration: 120, dx: 0.2, dy: 0.1, open: 540, close: 1080 },
    { name_ko: "역사지구 랜드마크 성당", name_en: "Old Town Heritage Cathedral", duration: 90, dx: 0.4, dy: -0.2, open: 540, close: 1080 },
    { name_ko: "조각공원 야외 전시관", name_en: "Sculpture Park Open Exhibition", duration: 90, dx: -0.2, dy: -0.3, open: 480, close: 1080 }
  ];
  const activityTemplates = [
    { name_ko: "연안 요트 세일링", name_en: "Scenic Yacht Sailing Cruise", duration: 120, dx: 0.5, dy: 0.5, open: 540, close: 1200 },
    { name_ko: "자전거 하이킹", name_en: "Scenic Riverfront Bike Tour", duration: 120, dx: -0.4, dy: -0.4, open: 480, close: 1140 },
    { name_ko: "실내 VR 테마파크", name_en: "Virtual Reality Gaming Zone", duration: 100, dx: 0.1, dy: 0.2, open: 600, close: 1260 },
    { name_ko: "고카트 레이싱 체험", name_en: "Go-Kart Racing Adventure", duration: 90, dx: -0.2, dy: 0.1, open: 600, close: 1200 }
  ];
  const shoppingTemplates = [
    { name_ko: "디자이너 플래그십 숍", name_en: "Designer Brand Flagship Store", duration: 120, dx: -0.1, dy: -0.2, open: 600, close: 1260 },
    { name_ko: "벼룩시장 투어", name_en: "Old Town Flea & Crafts Market", duration: 90, dx: 0.3, dy: 0.2, open: 540, close: 1140 },
    { name_ko: "아케이드 거리 소품 쇼핑", name_en: "Historic Shopping Arcade Stroll", duration: 90, dx: -0.2, dy: 0.3, open: 600, close: 1200 },
    { name_ko: "화장품 및 길거리 간식 야시장", name_en: "Boutique Fashion & Snack Night Market", duration: 120, dx: 0.2, dy: -0.3, open: 1020, close: 1380 }
  ];

  const tmplMap = {
    healing: healingTemplates,
    culture: cultureTemplates,
    activity: activityTemplates,
    shopping: shoppingTemplates
  };

  const otherCategories = ['healing', 'culture', 'activity', 'shopping'];
  otherCategories.forEach(cat => {
    const list = tmplMap[cat];
    const coreItem = core[cat];
    list.forEach((t, index) => {
      let x = coreItem.x + t.dx;
      let y = coreItem.y + t.dy;
      x = Math.max(0, Math.min(10, x));
      y = Math.max(0, Math.min(10, y));

      ATTRACTIONS[cid][cat].push({
        name_ko: `${data.name_ko} ${t.name_ko}`,
        name_en: `${data.name_en} ${t.name_en}`,
        desc_ko: `${data.name_ko}에서 즐기는 ${t.name_ko} 체험 및 역사 관광 명소`,
        desc_en: `Experience ${t.name_en} and discover local heritage in ${data.name_en}.`,
        duration: t.duration,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        open: t.open,
        close: t.close
      });
    });
  });
}
\n
function getAttractionCoords(item) {
  if (!item) return { x: 5.0, y: 5.0 };
  const name = item.name_en || '';
  let hash1 = 0;
  let hash2 = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash1 = (hash1 * 31 + char) % 10007;
    hash2 = (hash2 * 37 + char) % 10009;
  }
  const x = (hash1 % 101) / 10.0;
  const y = (hash2 % 101) / 10.0;
  return { x, y };
}

function getQuadrant(item) {
  if (!item || item.isFallback) return null;
  const coords = getAttractionCoords(item);
  if (coords.x <= 5.0) {
    return coords.y <= 5.0 ? 1 : 3;
  } else {
    return coords.y <= 5.0 ? 2 : 4;
  }
}

const isCafeItem = (item) => {
  const name = ((item.name_ko || '') + ' ' + (item.name_en || '')).toLowerCase();
  const cafe_keywords = [
    '카페', '디저트', '빙수', '찻집', '베이커리', '제과점', '커피', '라떼', '에스프레소', 
    '아이스크림', '젤라토', '젤라또', '초콜릿', '쿠키', '타르트', '와플', '케이크', '케잌', 
    '빵집', '밀크티', '티타임', '도넛', '마카롱', '크레페', '애프터눈 티', '애프터눈티', 
    '말차', '녹차', '홍차', '티하우스', '티 하우스', '티룸', '티 룸', '음료', '주스', '에이드',
    'cafe', 'dessert', 'bakery', 'coffee', 'espresso', 'gelato', 'ice cream', 
    'pastry', 'pastries', 'waffle', 'cake', 'donut', 'macaron', 'crepe', 'chocolate', 
    'cookie', 'sweet', 'afternoon tea', 'tea room', 'tea house', 'green tea', 
    'matcha', 'black tea', 'milk tea', 'herbal tea', 'juice', 'smoothie', 'beverage'
  ];
  return cafe_keywords.some(kw => name.includes(kw));
};

for (const cityId in ATTRACTIONS) {
  const cityPools = ATTRACTIONS[cityId];
  console.log('City:', cityId);
  const counts = {
    1: { s: 0, d: 0, c: 0 },
    2: { s: 0, d: 0, c: 0 },
    3: { s: 0, d: 0, c: 0 },
    4: { s: 0, d: 0, c: 0 }
  };
  
  // Sightseeing
  ['healing', 'culture', 'activity', 'shopping'].forEach(cat => {
    (cityPools[cat] || []).forEach(item => {
      const q = getQuadrant(item);
      if (q) counts[q].s++;
    });
  });
  
  // Gourmet (Diners and Cafes)
  (cityPools.gourmet || []).forEach(item => {
    const q = getQuadrant(item);
    if (q) {
      if (isCafeItem(item)) {
        counts[q].c++;
      } else {
        counts[q].d++;
      }
    }
  });
  
  console.log(counts);
}
