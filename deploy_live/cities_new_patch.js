// ===== Cities New Patch =====
// 1. Remove specified cities from CITIES array
// 2. Add 20 new cities with full ATTRACTIONS data
// 3. Sort CITIES alphabetically (ko: 가나다, en: ABC)

var _CITIES_REMOVE_IDS = ['kyiv','vaduz','andorra_la_vella','kuwait_city','algiers','pretoria','dhaka','brasilia','baghdad','astana','rabat','newdelhi','doha','luxembourg','sandiego'];

(function () {
  if (typeof CITIES === 'undefined' || typeof ATTRACTIONS === 'undefined') return;

  // ---- 1. Remove cities ----
  var removeIds = _CITIES_REMOVE_IDS;
  for (var i = CITIES.length - 1; i >= 0; i--) {
    if (removeIds.indexOf(CITIES[i].id) !== -1) CITIES.splice(i, 1);
  }
  removeIds.forEach(function(id) { delete ATTRACTIONS[id]; });

  // ---- 2. Add new cities ----
  var newCities = [
    { id:'capetown',   name_ko:'케이프타운',    name_en:'Cape Town',       country_ko:'남아프리카',   country_en:'South Africa',  desc_ko:'테이블 마운틴과 아프리카 최남단의 절경',      desc_en:'Iconic Table Mountain and African coastline' },
    { id:'porto',      name_ko:'포르투',        name_en:'Porto',           country_ko:'포르투갈',    country_en:'Portugal',      desc_ko:'포트와인과 아줄레주 타일의 낭만 도시',       desc_en:'Port wine city with stunning azulejo tiles' },
    { id:'munich',     name_ko:'뮌헨',          name_en:'Munich',          country_ko:'독일',        country_en:'Germany',       desc_ko:'옥토버페스트와 왕궁의 바이에른 수도',        desc_en:'Bavarian capital of Oktoberfest and palaces' },
    { id:'prague',     name_ko:'프라하',        name_en:'Prague',          country_ko:'체코',        country_en:'Czech Republic',desc_ko:'중세 고딕 건축과 카를교의 황금 도시',        desc_en:'Golden city of medieval Gothic architecture' },
    { id:'queenstown', name_ko:'퀸스타운',      name_en:'Queenstown',      country_ko:'뉴질랜드',    country_en:'New Zealand',   desc_ko:'세계 어드벤처 수도, 번지점프 발상지',        desc_en:'Adventure capital with bungee jumping & fjords' },
    { id:'hongkong',   name_ko:'홍콩',          name_en:'Hong Kong',       country_ko:'홍콩',        country_en:'Hong Kong',     desc_ko:'빅토리아 피크와 야경이 빛나는 동방의 진주',  desc_en:'Pearl of the Orient with Victoria Peak views' },
    { id:'toronto',    name_ko:'토론토',        name_en:'Toronto',         country_ko:'캐나다',      country_en:'Canada',        desc_ko:'CN 타워와 나이아가라 폭포의 다문화 도시',   desc_en:'Multicultural city with CN Tower & Niagara Falls' },
    { id:'shanghai',   name_ko:'상하이',        name_en:'Shanghai',        country_ko:'중국',        country_en:'China',         desc_ko:'더 번드와 마천루가 어우러진 동방의 파리',   desc_en:'The Bund and skyscrapers of China\'s global city' },
    { id:'dubai',      name_ko:'두바이',        name_en:'Dubai',           country_ko:'아랍에미리트',country_en:'UAE',           desc_ko:'버즈 칼리파와 사막 사파리의 미래 도시',     desc_en:'Futuristic city with Burj Khalifa & desert safari' },
    { id:'cairo',      name_ko:'카이로',        name_en:'Cairo',           country_ko:'이집트',      country_en:'Egypt',         desc_ko:'피라미드와 스핑크스, 고대 문명의 심장부',   desc_en:'Pyramids, Sphinx, and heart of ancient civilization' },
    { id:'casablanca', name_ko:'카사블랑카',    name_en:'Casablanca',      country_ko:'모로코',      country_en:'Morocco',       desc_ko:'하산 2세 모스크와 대서양 해안의 항구 도시', desc_en:'Hassan II Mosque and Atlantic harbour city' },
    { id:'venice',     name_ko:'베니스',        name_en:'Venice',          country_ko:'이탈리아',    country_en:'Italy',         desc_ko:'수상 도시의 낭만, 운하와 곤돌라의 세계',    desc_en:'Romantic canal city of gondolas and bridges' },
    { id:'florence',   name_ko:'피렌체',        name_en:'Florence',        country_ko:'이탈리아',    country_en:'Italy',         desc_ko:'르네상스 예술의 수도, 두오모와 우피치',     desc_en:'Cradle of Renaissance art, Duomo and Uffizi' },
    { id:'sapporo',    name_ko:'삿포로',        name_en:'Sapporo',         country_ko:'일본',        country_en:'Japan',         desc_ko:'홋카이도의 설국, 눈 축제와 신선한 해산물',  desc_en:'Snow festival city with fresh seafood and powder skiing' },
    { id:'istanbul',   name_ko:'이스탄불',      name_en:'Istanbul',        country_ko:'터키',        country_en:'Turkey',        desc_ko:'아야소피아와 보스포루스, 두 대륙의 교차점', desc_en:'Hagia Sophia and Bosphorus where two continents meet' },
    { id:'milan',      name_ko:'밀라노',        name_en:'Milan',           country_ko:'이탈리아',    country_en:'Italy',         desc_ko:'두오모와 패션 위크의 세계 패션 수도',       desc_en:'Fashion capital with the Duomo and Fashion Week' },
    { id:'houston',    name_ko:'휴스턴',        name_en:'Houston',         country_ko:'미국',        country_en:'USA',           desc_ko:'우주센터와 에너지 도시 텍사스의 심장',      desc_en:'Space Center Houston and energy city of Texas' },
    { id:'rio',        name_ko:'리우데자네이루',name_en:'Rio de Janeiro',  country_ko:'브라질',      country_en:'Brazil',        desc_ko:'예수상과 코파카바나, 삼바와 카니발의 도시', desc_en:'Christ the Redeemer, Copacabana, and carnival city' },
    { id:'geneva',     name_ko:'제네바',        name_en:'Geneva',          country_ko:'스위스',      country_en:'Switzerland',   desc_ko:'레만 호수와 국제기구의 평화로운 외교 도시', desc_en:'Lake Geneva and international diplomacy city' },
    { id:'edinburgh',  name_ko:'에딘버러',      name_en:'Edinburgh',       country_ko:'영국',        country_en:'UK',            desc_ko:'에딘버러 성과 로열 마일의 스코틀랜드 수도',desc_en:'Edinburgh Castle and Royal Mile of Scottish capital' }
  ];

  // Add only if not already present
  newCities.forEach(function(c) {
    if (!CITIES.some(function(e){ return e.id === c.id; })) CITIES.push(c);
  });

  // ---- 3. ATTRACTIONS for new cities ----

  // CAPE TOWN
  ATTRACTIONS.capetown = {
    culture: [
      { name_ko:'테이블 마운틴 케이블카 전망',  name_en:'Table Mountain Cable Car & Summit',    duration:180, isLandmark:true,  x:18.4041, y:-33.9628, open:540,  close:1080, desc_ko:'케이프타운 상징 평정산 케이블카로 올라 시내와 대서양 파노라마 조망', desc_en:'Iconic flat-topped mountain with cable car and 360° views of Cape Town' },
      { name_ko:'로벤 섬 넬슨 만델라 역사 투어',name_en:'Robben Island Nelson Mandela Tour',   duration:180, isLandmark:true,  x:18.3676, y:-33.8038, open:540,  close:1080, desc_ko:'만델라가 27년 수감된 유네스코 세계유산 섬, 전 수감자 가이드 투어',  desc_en:'UNESCO island where Mandela was imprisoned 27 years, guided by ex-prisoners' },
      { name_ko:'보캅 말레이 역사 지구',         name_en:'Bo-Kaap Malay Quarter',               duration:90,  isLandmark:false, x:18.4148, y:-33.9258, open:540,  close:1080, desc_ko:'알록달록 파스텔 집들의 케이프 말레이 문화 지구, 인스타 명소',      desc_en:'Colourful pastel houses of Cape Malay cultural heritage quarter' },
      { name_ko:'컴퍼니스 가든',                 name_en:"Company's Garden",                    duration:60,  isLandmark:false, x:18.4186, y:-33.9295, open:540,  close:1080, desc_ko:'1652년 설립된 케이프타운 최고(最古) 공원, 의사당 인근 휴식 명소',   desc_en:'Oldest park in Cape Town established 1652, adjacent to Parliament' },
      { name_ko:'케이프 굿 호프 & 케이프포인트',name_en:'Cape of Good Hope & Cape Point',      duration:180, isLandmark:true,  x:18.4977, y:-34.3568, open:600,  close:1080, desc_ko:'아프리카 최남서단 절벽과 등대, 개코원숭이 서식지 국립공원',       desc_en:'Southwestern tip of Africa with lighthouse and baboon colony' }
    ],
    healing: [
      { name_ko:'볼더스 비치 펭귄 서식지',       name_en:"Boulders Beach Penguin Colony",       duration:120, x:18.4510, y:-34.1974, open:600,  close:1080, desc_ko:'아프리카 펭귄 수천 마리가 서식하는 세계적 희귀 해변',              desc_en:'Beach home to thousands of endangered African penguins' },
      { name_ko:'캠프스 베이 비치',               name_en:'Camps Bay Beach',                     duration:120, x:18.3762, y:-33.9495, open:540,  close:1200, desc_ko:'테이블 마운틴 아래 펼쳐진 백사장 해변, 석양이 아름다운 명소',    desc_en:'White sand beach below Table Mountain with stunning sunsets' },
      { name_ko:'커스텐보쉬 국립 식물원',        name_en:'Kirstenbosch National Botanical Garden',duration:120,x:18.4326, y:-33.9880, open:540,  close:1080, desc_ko:'테이블 마운틴 동쪽 사면의 거대 식물원, 핀보스 생태계 체험',      desc_en:'World-famous botanical garden on Table Mountain slopes' }
    ],
    shopping: [
      { name_ko:'V&A 워터프론트 쇼핑',           name_en:'V&A Waterfront Shopping & Harbour',   duration:120, x:18.4189, y:-33.9027, open:540,  close:1320, desc_ko:'빅토리아 앤 알프레드 항구의 쇼핑 복합단지, 케이프타운 최대 쇼핑 명소', desc_en:'Cape Town\'s premier shopping complex at the historic harbour' },
      { name_ko:'그린 포인트 마켓',               name_en:'Green Point Market',                  duration:90,  x:18.4069, y:-33.9057, open:600,  close:1080, desc_ko:'매주 일요일 열리는 공예품·음식 마켓',                               desc_en:'Sunday market for crafts, food, and African curios' }
    ],
    gourmet: [
      { name_ko:'워터프론트 해산물 디너',         name_en:'Waterfront Seafood Dinner',           duration:90,  x:18.4210, y:-33.9045, open:1080, close:1320, desc_ko:'갓 잡은 케이프 바닷가재와 고등어 등 신선한 해산물 레스토랑',     desc_en:'Fresh Cape crayfish and seafood at harbour restaurants' },
      { name_ko:'보캅 케이프 말레이 요리 체험',  name_en:'Bo-Kaap Cape Malay Cuisine',          duration:90,  x:18.4148, y:-33.9258, open:1080, close:1320, desc_ko:'케이프 말레이 커리와 보보티 등 독특한 남아공 퓨전 요리',        desc_en:'Unique Cape Malay curry and bobotie fusion cuisine' }
    ]
  };

  // PORTO
  ATTRACTIONS.porto = {
    culture: [
      { name_ko:'리베이라 역사 지구 산책',        name_en:'Ribeira Historic Waterfront District', duration:120, isLandmark:true,  x:-8.6140, y:41.1408, open:540,  close:1200, desc_ko:'유네스코 세계유산 리베이라 구시가지, 도루 강변 다채로운 건물군', desc_en:'UNESCO Ribeira waterfront with colourful historic buildings' },
      { name_ko:'돔 루이스 1세 철교 도보',        name_en:'Dom Luís I Bridge Walk',              duration:60,  isLandmark:true,  x:-8.6120, y:41.1400, open:540,  close:1200, desc_ko:'구스타프 에펠 제자가 설계한 2층 철교, 상하층 도보로 도루강 조망', desc_en:'Double-decker iron bridge by Eiffel\'s disciple with Douro River views' },
      { name_ko:'리브라리아 렐루 서점',           name_en:'Livraria Lello Historic Bookshop',    duration:60,  isLandmark:true,  x:-8.6147, y:41.1470, open:540,  close:1080, desc_ko:'해리포터의 영감이 된 1906년 네오고딕 세계 최고 서점',            desc_en:'1906 neo-Gothic bookshop said to inspire Harry Potter\'s Hogwarts library' },
      { name_ko:'볼사 궁전 & 아랍 홀',            name_en:'Palácio da Bolsa & Arab Room',        duration:90,  isLandmark:false, x:-8.6151, y:41.1409, open:540,  close:1080, desc_ko:'19세기 증권거래소, 황금 아라베스크 장식의 화려한 아랍 홀',     desc_en:'19th-century stock exchange with ornate gilded Arab Room' },
      { name_ko:'상 프란시스코 교회',             name_en:'Igreja de São Francisco',             duration:60,  isLandmark:false, x:-8.6155, y:41.1412, open:540,  close:1080, desc_ko:'포르투갈 최대 고딕 성당, 금박으로 뒤덮인 바로크 내부 장식',     desc_en:'Largest Gothic church in Porto with gold-covered Baroque interior' }
    ],
    healing: [
      { name_ko:'포즈 두 도루 해변',              name_en:'Foz do Douro Beach',                  duration:90,  x:-8.6681, y:41.1512, open:540,  close:1200, desc_ko:'도루 강과 대서양이 만나는 지점의 해변 산책로와 요새',            desc_en:'Beach and promenade where the Douro River meets the Atlantic' },
      { name_ko:'크리스탈 궁 정원',               name_en:'Crystal Palace Gardens',              duration:60,  x:-8.6297, y:41.1530, open:540,  close:1080, desc_ko:'공작과 조각들이 있는 19세기 낭만주의 공원, 강 조망',            desc_en:'Romantic 19th-century park with peacocks and river views' }
    ],
    shopping: [
      { name_ko:'볼랴웅 시장',                    name_en:'Mercado do Bolhão Market',            duration:90,  x:-8.6097, y:41.1475, open:540,  close:1080, desc_ko:'1914년 개장한 포르투 전통 시장, 해산물·치즈·꽃 노점',            desc_en:'Traditional market since 1914 with fresh seafood, cheese, and flowers' },
      { name_ko:'산타 카타리나 쇼핑 거리',        name_en:'Santa Catarina Shopping Street',      duration:90,  x:-8.6092, y:41.1491, open:540,  close:1200, desc_ko:'포르투 최대 보행자 쇼핑 거리, 마제스틱 카페 위치',              desc_en:'Porto\'s main pedestrian shopping street with Majestic Café' }
    ],
    gourmet: [
      { name_ko:'포르투 와인 셀러 투어',          name_en:'Porto Wine Cellar Tour & Tasting',    duration:120, x:-8.6106, y:41.1389, open:600,  close:1080, desc_ko:'빌라 노바 데 가이아의 유서 깊은 포트와인 와이너리 투어와 시음', desc_en:'Historic port wine lodges in Vila Nova de Gaia with guided tasting' },
      { name_ko:'프란세지냐 샌드위치 맛보기',    name_en:'Francesinha Sandwich Experience',     duration:60,  x:-8.6123, y:41.1472, open:1080, close:1320, desc_ko:'포르투 명물 치즈·햄·소시지 겹겹이 쌓인 진한 소스의 샌드위치',  desc_en:'Porto\'s iconic layered meat and cheese sandwich with spicy beer sauce' }
    ]
  };

  // MUNICH
  ATTRACTIONS.munich = {
    culture: [
      { name_ko:'마리엔 광장 & 신시청사 글로켄슈필', name_en:'Marienplatz & Neues Rathaus Glockenspiel', duration:90, isLandmark:true, x:11.5754, y:48.1374, open:540, close:1080, desc_ko:'뮌헨 심장부 광장, 정오 글로켄슈필 종탑 인형 공연 관람',       desc_en:'Munich\'s central square with famous Glockenspiel carillon tower' },
      { name_ko:'님펜부르크 궁전',                  name_en:'Nymphenburg Palace & Gardens',         duration:150, isLandmark:true, x:11.5033, y:48.1582, open:540, close:1080, desc_ko:'17세기 바이에른 왕가의 여름 궁전, 광대한 바로크 정원',           desc_en:'17th-century Bavarian royal summer palace with Baroque gardens' },
      { name_ko:'레지덴츠 뮌헨 왕궁 박물관',      name_en:'Munich Residenz Palace Museum',         duration:120, isLandmark:true, x:11.5794, y:48.1408, open:540, close:1080, desc_ko:'바이에른 왕가 거주 역대 최대 독일 궁전, 130개 방 전시',          desc_en:'Germany\'s largest city palace with 130 rooms of Wittelsbach treasures' },
      { name_ko:'BMW 박물관 & BMW 벨트',            name_en:'BMW Museum & BMW Welt',                duration:120, isLandmark:false, x:11.5579, y:48.1774, open:540, close:1080, desc_ko:'BMW 본사 옆 자동차·모터사이클 역사 박물관과 현대 전시관',       desc_en:'BMW\'s stunning museum and showroom next to their headquarters' },
      { name_ko:'도이체스 박물관',                  name_en:'Deutsches Museum',                     duration:180, isLandmark:false, x:11.5820, y:48.1299, open:540, close:1080, desc_ko:'세계 최대 과학기술 박물관, 이자르강 섬에 위치한 73개 분야',    desc_en:'World\'s largest science and technology museum on an island' }
    ],
    healing: [
      { name_ko:'잉글리쉬 가든 서핑 포인트',      name_en:'Englischer Garten & Eisbach Surfing',  duration:120, x:11.5857, y:48.1642, open:540, close:1200, desc_ko:'런던 하이드파크보다 큰 도심 공원, 아이스바흐 인공 파도 서핑', desc_en:'Larger than Hyde Park with famous Eisbach river surfing wave' },
      { name_ko:'올림픽 공원 타워',                name_en:'Olympic Park & Tower',                 duration:90,  x:11.5507, y:48.1733, open:540, close:1200, desc_ko:'1972년 올림픽 부지, 전망 타워와 호수 산책',                      desc_en:'1972 Olympic grounds with panoramic tower and lake walks' }
    ],
    shopping: [
      { name_ko:'빅투알리엔 시장',                  name_en:'Viktualienmarkt',                      duration:90, x:11.5764, y:48.1349, open:540, close:1080, desc_ko:'뮌헨 전통 야외 시장, 신선 식품·소시지·치즈·꽃 노점 100개+', desc_en:'Traditional open-air market with 100+ stalls of food, cheese, and flowers' },
      { name_ko:'마리엔 광장 인근 쇼핑',           name_en:'Kaufingerstrasse Shopping Street',     duration:90, x:11.5700, y:48.1373, open:540, close:1200, desc_ko:'뮌헨 최대 보행자 쇼핑 거리, 카우핑거·노이하우저 거리', desc_en:'Munich\'s main pedestrian shopping zone' }
    ],
    gourmet: [
      { name_ko:'호프브로이하우스 맥주홀',         name_en:'Hofbräuhaus Beer Hall',                duration:120, x:11.5797, y:48.1378, open:600, close:1380, desc_ko:'1589년 개장 세계 최유명 맥주홀, 1L 마스 맥주와 전통 바이에른 요리', desc_en:'World-famous beer hall since 1589 with 1L steins and Bavarian food' },
      { name_ko:'뮌헨 전통 흰 소시지 아침',       name_en:'Traditional Weisswurst Breakfast',     duration:60,  x:11.5760, y:48.1360, open:480, close:840, desc_ko:'바이에른 전통 흰색 소시지 바이스부르스트를 오전 중에만 먹는 풍습', desc_en:'Bavarian tradition of eating white veal sausage before noon' }
    ]
  };

  // PRAGUE
  ATTRACTIONS.prague = {
    culture: [
      { name_ko:'프라하 성 & 비투스 대성당',      name_en:'Prague Castle & St. Vitus Cathedral', duration:180, isLandmark:true, x:14.4013, y:50.0911, open:540, close:1080, desc_ko:'세계 최대 고성, 1000년 역사의 비투스 대성당과 황금 소로',     desc_en:'World\'s largest ancient castle complex with Gothic St. Vitus Cathedral' },
      { name_ko:'카를교 새벽 산책',               name_en:'Charles Bridge at Dawn',              duration:60,  isLandmark:true, x:14.4116, y:50.0865, open:300, close:1440, desc_ko:'30개 성인 석상이 늘어선 1402년 건립 고딕 돌다리, 새벽이 절경', desc_en:'1402 Gothic stone bridge with 30 saint statues, magical at dawn' },
      { name_ko:'구시가 광장 & 천문시계',         name_en:'Old Town Square & Astronomical Clock', duration:90, isLandmark:true, x:14.4208, y:50.0871, open:540, close:1380, desc_ko:'1410년 제작 천문시계 매 정시 인형 퍼레이드와 구시청사 전망', desc_en:'1410 Astronomical Clock with hourly figure parade and tower view' },
      { name_ko:'황금 소로 골목 탐방',            name_en:'Golden Lane (Zlatá ulička)',           duration:60,  isLandmark:false, x:14.4044, y:50.0910, open:540, close:1080, desc_ko:'프라하 성 내 16세기 연금술사·금세공인이 살던 미니어처 골목', desc_en:'Tiny lane of 16th-century alchemists\' and goldsmiths\' houses in the castle' },
      { name_ko:'요제포프 유대인 지구',           name_en:'Josefov Jewish Quarter',              duration:120, isLandmark:false, x:14.4177, y:50.0895, open:540, close:1080, desc_ko:'유럽 가장 잘 보존된 유대 지구, 6개 시나고그와 구묘지',        desc_en:'Best preserved Jewish quarter in Europe with 6 synagogues and Old Cemetery' }
    ],
    healing: [
      { name_ko:'비셰흐라드 언덕 요새',           name_en:'Vyšehrad Castle & Park',             duration:90, x:14.4183, y:50.0647, open:540, close:1200, desc_ko:'블타바 강 절벽 위 고성, 체코 성인들 묘지와 시내 파노라마', desc_en:'Cliff-top fortress with cemetery of Czech greats and river panorama' },
      { name_ko:'페트르진 전망대',                name_en:'Petřín Hill Lookout Tower',          duration:90, x:14.3953, y:50.0831, open:540, close:1320, desc_ko:'에펠탑 모양 축소 전망탑, 케이블카로 오르는 언덕 공원',     desc_en:'Miniature Eiffel Tower lookout on a hill accessible by funicular' }
    ],
    shopping: [
      { name_ko:'하벨스카 시장',                  name_en:'Havelska Market',                    duration:60, x:14.4180, y:50.0853, open:540, close:1080, desc_ko:'구시가 전통 야외 시장, 수공예품·기념품·신선 식품', desc_en:'Traditional outdoor market in Old Town with crafts and fresh food' },
      { name_ko:'팔라디움 쇼핑센터',              name_en:'Palladium Shopping Centre',          duration:90, x:14.4280, y:50.0880, open:540, close:1320, desc_ko:'공화국 광장 지하 로마 군단 유적 위에 세워진 대형 쇼핑몰', desc_en:'Large mall built over Roman legion ruins at Republic Square' }
    ],
    gourmet: [
      { name_ko:'체코 전통 돼지 무릎 요리',       name_en:'Svíčková & Svíčková na Smetaně',     duration:90, x:14.4210, y:50.0870, open:1080, close:1320, desc_ko:'체코 국민 요리 스비치코바, 크림소스 소고기와 크네들리키 만두', desc_en:'Czech national dish of beef sirloin in cream sauce with bread dumplings' },
      { name_ko:'구시가 트르들로 굴뚝빵',        name_en:'Old Town Trdelník Chimney Cake',      duration:30, x:14.4210, y:50.0870, open:540, close:1380, desc_ko:'달콤한 나선형 구이 굴뚝빵 트르들로, 구시가 노점 명물',     desc_en:'Sweet spiral-baked chimney cake trdelník from Old Town street stalls' }
    ]
  };

  // QUEENSTOWN
  ATTRACTIONS.queenstown = {
    culture: [
      { name_ko:'스카이라인 곤돌라 & 번지점프',  name_en:'Skyline Gondola & Ledge Bungy',       duration:180, isLandmark:true, x:168.6626, y:-45.0327, open:540, close:1200, desc_ko:'세계 어드벤처 수도 상징 스카이라인 곤돌라, 47m 레지 번지점프', desc_en:'Iconic gondola with 47m Ledge Bungy, emblem of adventure capital' },
      { name_ko:'AJ 해킷 카와라우 번지점프',     name_en:'AJ Hackett Kawarau Gorge Bungy',      duration:90,  isLandmark:true, x:168.8233, y:-44.9824, open:540, close:1080, desc_ko:'1988년 상업 번지점프 발상지, 43m 카와라우 협곡 다리 점프',   desc_en:'The world\'s first commercial bungy site, 43m over Kawarau Gorge since 1988' },
      { name_ko:'밀포드 사운드 당일 투어',       name_en:'Milford Sound Day Tour',              duration:480, isLandmark:true, x:167.9270, y:-44.6413, open:480,  close:1080, desc_ko:'세계 8대 경이 피오르드, 절벽과 폭포의 압도적 자연 절경',     desc_en:'World\'s 8th wonder fjord with sheer cliffs, waterfalls and seals' }
    ],
    healing: [
      { name_ko:'와카티푸 호수 유람선',           name_en:'Lake Wakatipu TSS Earnslaw Cruise',   duration:120, x:168.6626, y:-45.0312, open:540, close:1200, desc_ko:'1912년 증기선 언즐로호, 리마카블스 설산 배경 호수 유람',    desc_en:'1912 steamship cruise with views of the Remarkables snowfield' },
      { name_ko:'리마카블스 스키 & 스노우보드',  name_en:'The Remarkables Ski Area',            duration:360, x:168.7783, y:-45.0700, open:480,  close:1080, desc_ko:'퀸스타운 상징 설산 스키장, 겨울 시즌 스키·스노보드 성지', desc_en:'Iconic ski resort on the dramatic Remarkables mountain range' },
      { name_ko:'애로우타운 역사 마을',           name_en:'Arrowtown Historic Gold Rush Village', duration:120, x:168.8295, y:-44.9393, open:540, close:1080, desc_ko:'19세기 골드러시 중국인 광부 마을, 단풍나무 거리와 박물관',  desc_en:'19th-century gold rush town with autumn trees and gold panning' }
    ],
    shopping: [
      { name_ko:'퀸스타운 아케이드 기념품',      name_en:'Queenstown Central Shopping',         duration:90, x:168.6610, y:-45.0300, open:540, close:1200, desc_ko:'퀸스타운 시내 아웃도어·기념품·모험 장비 쇼핑 거리',        desc_en:'Central Queenstown outdoor gear, souvenirs, and adventure equipment' }
    ],
    gourmet: [
      { name_ko:'퍼그버거 세계적 명물 버거',     name_en:'Fergburger World-Famous Burgers',     duration:60, x:168.6618, y:-45.0303, open:600, close:300,  desc_ko:'24시간 운영 퀸스타운 전설적 명물, 수제 거대 버거 전 세계 팬',   desc_en:'Legendary 24-hour burger joint, a must-eat Queenstown institution' },
      { name_ko:'더 비어 하우스 와카티푸 뷰',   name_en:'Pub on Wharf Lake View Dining',       duration:90, x:168.6607, y:-45.0312, open:1080, close:1440, desc_ko:'와카티푸 호수 전망 부두 레스토랑, 선셋 디너',               desc_en:'Lakeside dining on Steamer Wharf with sunset views' }
    ]
  };

  // HONG KONG
  ATTRACTIONS.hongkong = {
    culture: [
      { name_ko:'빅토리아 피크 트램',             name_en:'Victoria Peak & Peak Tram',           duration:150, isLandmark:true, x:114.1493, y:22.2759, open:540, close:1380, desc_ko:'홍콩 최고봉 빅토리아 피크, 역사적 피크 트램으로 오르는 야경 명소', desc_en:'Hong Kong\'s iconic Peak Tram to Victoria Peak with stunning city views' },
      { name_ko:'웡타이신 사원',                  name_en:'Wong Tai Sin Temple',                 duration:90,  isLandmark:true, x:114.1934, y:22.3427, open:420,  close:1140, desc_ko:'1921년 건립 도교 사원, 점괘·기도 신자들로 북적이는 홍콩 3대 사원', desc_en:'1921 Taoist temple famous for fortune telling and colorful architecture' },
      { name_ko:'침사추이 스타의 거리',           name_en:'Tsim Sha Tsui Star Avenue',           duration:60,  isLandmark:false, x:114.1721, y:22.2940, open:540,  close:1440, desc_ko:'홍콩 영화 스타 핸드프린트와 빅토리아 하버 심포니 오브 라이츠 감상', desc_en:'Star footprints and Symphony of Lights show over Victoria Harbour' },
      { name_ko:'란타우 빅 부다 천단 대불',      name_en:'Lantau Big Buddha & Po Lin Monastery', duration:240, isLandmark:true, x:113.9050, y:22.2537, open:540,  close:1080, desc_ko:'홍콩 최대 관광 명소 34m 청동 부처상, 케이블카 360° 조망',        desc_en:'34m bronze Buddha, reached by Ngong Ping 360 cable car over mountains' }
    ],
    healing: [
      { name_ko:'드래곤스 백 하이킹',             name_en:"Dragon's Back Hike",                 duration:180, x:114.2340, y:22.2365, open:540, close:1080, desc_ko:'아시아 최고 도심 하이킹 트레일, 해안 절경과 포구 조망',  desc_en:'Asia\'s best urban hiking trail with coastal views and fishing villages' },
      { name_ko:'스탠리 마켓 해변',               name_en:'Stanley Market & Beach',              duration:120, x:114.2085, y:22.2195, open:540, close:1200, desc_ko:'홍콩섬 남쪽 해변 마을, 실크·기념품 마켓과 바닷가 식당', desc_en:'Beachside village on south Hong Kong Island with market and seafood' }
    ],
    shopping: [
      { name_ko:'몽콕 레이디스 & 골든 마켓',     name_en:'Mong Kok Ladies Market & Temple Street', duration:120, x:114.1697, y:22.3232, open:1080, close:1380, desc_ko:'레이디스 마켓·템플 스트리트 야시장, 홍콩 서민 문화의 심장', desc_en:'Mong Kok street markets: bargaining, street food, and night market buzz' },
      { name_ko:'침사추이 쇼핑 스트리트',         name_en:'Tsim Sha Tsui Nathan Road Shopping',   duration:120, x:114.1702, y:22.2983, open:540,  close:1380, desc_ko:'침사추이 명품·전자·기념품 쇼핑 거리 네이던 로드',          desc_en:'Nathan Road luxury, electronics, and souvenir shopping in TST' }
    ],
    gourmet: [
      { name_ko:'홍콩식 딤섬 조식',              name_en:'Hong Kong Traditional Dim Sum Breakfast', duration:90, x:114.1694, y:22.3193, open:420, close:840, desc_ko:'하 까오·샤오 마이 등 정통 딤섬 아침 얌차 문화 체험', desc_en:'Traditional yum cha breakfast dim sum experience in a classic teahouse' },
      { name_ko:'란콰이퐁 야식 & 나이트라이프', name_en:'Lan Kwai Fong Night Food & Nightlife', duration:120, x:114.1541, y:22.2812, open:1200, close:300, desc_ko:'홍콩 최대 바·레스토랑 밀집 지구, 국제적 야식과 나이트라이프', desc_en:'Hong Kong\'s top bar and dining hub for international night food' }
    ]
  };

  // TORONTO
  ATTRACTIONS.toronto = {
    culture: [
      { name_ko:'CN 타워 유리바닥 전망대',       name_en:'CN Tower Glass Floor & EdgeWalk',     duration:120, isLandmark:true, x:-79.3871, y:43.6426, open:540, close:1320, desc_ko:'553m 세계적 랜드마크, 유리 바닥 LookOut과 외벽 도보 엣지워크', desc_en:'553m iconic tower with glass floor LookOut and EdgeWalk on the exterior' },
      { name_ko:'나이아가라 폭포 당일 투어',     name_en:'Niagara Falls Day Tour',              duration:360, isLandmark:true, x:-79.0747, y:43.0896, open:540, close:1080, desc_ko:'캐나다 온타리오주 쪽 세계 3대 폭포, 안개 속 배 투어 머레이드 오브 더 미스트', desc_en:'World-famous waterfall with Maid of the Mist boat tour in the mist' },
      { name_ko:'로열 온타리오 박물관 (ROM)',    name_en:'Royal Ontario Museum (ROM)',          duration:180, isLandmark:false, x:-79.3947, y:43.6677, open:540, close:1080, desc_ko:'캐나다 최대 박물관, 공룡·이집트·중국 문화 등 600만 점 소장', desc_en:'Canada\'s largest museum with 6 million items including dinosaurs' },
      { name_ko:'카사 로마 고딕 성',              name_en:'Casa Loma Gothic Castle',             duration:120, isLandmark:false, x:-79.4094, y:43.6780, open:540, close:1080, desc_ko:'1914년 건립 토론토 유일 고딕 성, 정원과 지하 터널 탐험', desc_en:'1914 Gothic Revival castle with gardens and secret tunnels' }
    ],
    healing: [
      { name_ko:'토론토 섬 자전거 투어',         name_en:'Toronto Islands Bike Tour',           duration:180, x:-79.3750, y:43.6201, open:540, close:1200, desc_ko:'토론토 항구 맞은편 3개 섬, 자전거 대여·피크닉·수영',       desc_en:'Car-free island cluster with beaches, bike rentals, and city views' },
      { name_ko:'하이 파크 벚꽃 & 동물원',      name_en:'High Park Cherry Blossoms & Zoo',     duration:120, x:-79.4632, y:43.6465, open:540, close:1200, desc_ko:'토론토 최대 공원, 봄 벚꽃과 무료 동물원·놀이터',         desc_en:'Toronto\'s largest park with cherry blossoms and free zoo' }
    ],
    shopping: [
      { name_ko:'켄싱턴 마켓 힙스터 빌리지',   name_en:'Kensington Market',                   duration:90, x:-79.4002, y:43.6547, open:540, close:1200, desc_ko:'토론토 최고의 힙스터 오픈마켓, 빈티지·세계 음식·그래피티', desc_en:'Toronto\'s eclectic open market with vintage shops and world food' },
      { name_ko:'이턴 센터 쇼핑몰',              name_en:'Toronto Eaton Centre Mall',           duration:120, x:-79.3792, y:43.6543, open:540, close:1380, desc_ko:'토론토 최대 쇼핑몰, 260개 매장 유리 천장 아케이드',       desc_en:'Flagship downtown mall with 260 stores under a glass galleria ceiling' }
    ],
    gourmet: [
      { name_ko:'디스틸러리 지구 맛집 투어',    name_en:'Distillery District Food & Art Tour', duration:120, x:-79.3591, y:43.6503, open:540, close:1320, desc_ko:'빅토리아 시대 양조장 개조 레스토랑·갤러리·카페 복합단지', desc_en:'Victorian-era distillery converted to restaurants, galleries, and cafés' },
      { name_ko:'치나타운 딤섬 & 버블티',       name_en:'Chinatown Dim Sum & Bubble Tea',      duration:90, x:-79.3960, y:43.6523, open:600, close:1080, desc_ko:'토론토 차이나타운 정통 딤섬과 다양한 아시아 음식 거리',   desc_en:'Authentic dim sum and Asian street food in bustling Chinatown' }
    ]
  };

  // SHANGHAI
  ATTRACTIONS.shanghai = {
    culture: [
      { name_ko:'더 번드 야경 산책',              name_en:'The Bund Waterfront Promenade',        duration:120, isLandmark:true, x:121.4897, y:31.2382, open:540, close:1440, desc_ko:'황푸강 서안 외탄, 서양식 건물과 푸둥 마천루의 극적 대비 야경', desc_en:'Historic western-style waterfront with dramatic Pudong skyline views' },
      { name_ko:'예원 & 예원 상청 전통 정원',    name_en:'Yu Garden & Yuyuan Bazaar',            duration:150, isLandmark:true, x:121.4928, y:31.2270, open:540, close:1080, desc_ko:'1577년 명나라 개인정원, 용담·가산·정자의 중국 전통 원림', desc_en:'1577 Ming dynasty garden with dragon walls, pavilions and rockeries' },
      { name_ko:'동방명주 타워 전망',             name_en:'Oriental Pearl Tower',                 duration:120, isLandmark:true, x:121.4998, y:31.2399, open:540, close:1380, desc_ko:'468m 핑크 구체 구조물, 상하이 스카이라인 상징 전망대',      desc_en:'468m pink spheres tower, iconic Shanghai Pudong skyline landmark' },
      { name_ko:'상하이 박물관 청동기 컬렉션',   name_en:'Shanghai Museum',                      duration:120, isLandmark:false, x:121.4737, y:31.2304, open:540, close:1080, desc_ko:'인민광장 위치 세계 최고 중국 고대예술 컬렉션 120만 점',   desc_en:'World-class Chinese art collection of 1.2M pieces at People\'s Square' }
    ],
    healing: [
      { name_ko:'주자자오 수향 고진',             name_en:'Zhujiajiao Water Town',               duration:240, x:121.0609, y:31.1128, open:540, close:1080, desc_ko:'상하이 근교 700년 역사 수향 마을, 47개 돌다리와 운하 보트', desc_en:'700-year-old water town near Shanghai with stone bridges and canal boats' },
      { name_ko:'신천지 & 타이캉루 예술 골목',  name_en:'Xintiandi & Tianzifang Art Lane',      duration:120, x:121.4697, y:31.2191, open:540, close:1320, desc_ko:'석고문 주택 개조 트렌디 지구와 타이캉루 예술 골목',       desc_en:'Trendy Xintiandi shikumen and Tianzifang artist\'s alley' }
    ],
    shopping: [
      { name_ko:'난징루 보행자 쇼핑 거리',       name_en:'Nanjing Road Pedestrian Street',       duration:120, x:121.4766, y:31.2357, open:540, close:1440, desc_ko:'세계 최대 쇼핑 거리 중 하나, 상하이 대표 쇼핑 명소',      desc_en:'One of the world\'s busiest shopping streets, 5.5km long' },
      { name_ko:'상하이 글로벌 하버 쇼핑몰',     name_en:'Shanghai Global Harbor Mall',          duration:120, x:121.4050, y:31.2439, open:540, close:1320, desc_ko:'상하이 최대급 쇼핑몰 글로벌 하버에서 국제 브랜드와 실내 쇼핑 구역을 둘러보는 일정',    desc_en:'Shanghai Global Harbor Mall, one of the city\'s major indoor shopping complexes.' }
    ],
    gourmet: [
      { name_ko:'상하이 소룡포 딘타이펑',        name_en:'Xiaolongbao Soup Dumplings',           duration:90, x:121.4770, y:31.2357, open:540, close:1380, desc_ko:'상하이 명물 소룡포, 딘타이펑 외 로컬 맛집의 육즙 폭발 만두', desc_en:'Shanghai\'s famous soup dumplings (xiaolongbao) - local and Din Tai Fung' },
      { name_ko:'헝산루 야식 & 바 스트리트',    name_en:'Hengshan Road Night Food & Bars',      duration:120, x:121.4459, y:31.2073, open:1200, close:300, desc_ko:'상하이 외국인 밀집 지구 바·레스토랑 거리', desc_en:'Shanghai expat nightlife and dining hub on Hengshan Road' }
    ]
  };

  // DUBAI
  ATTRACTIONS.dubai = {
    culture: [
      { name_ko:'버즈 칼리파 124층 전망대',      name_en:'Burj Khalifa At the Top Observatory',  duration:120, isLandmark:true, x:55.2744, y:25.1972, open:540, close:1380, desc_ko:'세계 최고층 828m, 124·125층 At the Top 전망대, 야경 절경',  desc_en:'World\'s tallest tower 828m, At the Top observation deck with epic views' },
      { name_ko:'두바이 프레임',                  name_en:'Dubai Frame',                          duration:90,  isLandmark:true, x:55.2352, y:25.2342, open:540, close:1320, desc_ko:'150m 높이 거대 액자, 구두바이와 신두바이 동시 조망 랜드마크', desc_en:'150m giant picture frame showcasing old and new Dubai simultaneously' },
      { name_ko:'두바이 크릭 역사 지구 투어',    name_en:'Dubai Creek & Al Fahidi Historical District', duration:120, isLandmark:false, x:55.2965, y:25.2644, open:540, close:1200, desc_ko:'두바이 발상지 알파히디 역사 지구, 전통 목선 다우 크릭 투어', desc_en:'Dubai\'s oldest district with traditional creek abra boat and wind towers' },
      { name_ko:'팜 주메이라 모노레일 투어',     name_en:'Palm Jumeirah Monorail & Atlantis',    duration:180, isLandmark:true, x:55.1185, y:25.1124, open:540, close:1200, desc_ko:'야자수 형태 인공섬 팜 주메이라, 모노레일과 아틀란티스 워터파크', desc_en:'Man-made palm island monorail with Atlantis waterpark views' }
    ],
    healing: [
      { name_ko:'두바이 사막 사파리 일몰',       name_en:'Desert Safari Sunset & BBQ Dinner',    duration:360, x:55.4330, y:24.9390, open:900, close:1380, desc_ko:'두바이 근교 사막 사파리, 샌드보딩·낙타 탑승·바베큐 저녁', desc_en:'Desert dunes safari with sandboarding, camel riding, and BBQ dinner' },
      { name_ko:'주메이라 비치 일광욕',          name_en:'Jumeirah Beach & JBR Walk',            duration:120, x:55.1354, y:25.1392, open:540, close:1200, desc_ko:'두바이 대표 공공 해변 주메이라 비치, JBR 비치워크 쇼핑·식사', desc_en:'Dubai\'s public beach with the JBR Walk of restaurants and boutiques' }
    ],
    shopping: [
      { name_ko:'두바이 몰 & 두바이 분수쇼',    name_en:'Dubai Mall & Dubai Fountain Show',     duration:180, x:55.2796, y:25.1972, open:540, close:1440, desc_ko:'세계 최대 쇼핑몰, 실내 스케이트장·수족관·두바이 분수쇼', desc_en:'World\'s largest mall with ice rink, aquarium, and Dubai Fountain show' },
      { name_ko:'금 시장 & 향신료 시장',        name_en:'Gold Souk & Spice Souk',               duration:90, x:55.2993, y:25.2689, open:540, close:1200, desc_ko:'두바이 전통 금 시장과 향신료 수크, 중동 시장 쇼핑 체험',   desc_en:'Traditional gold and spice market in old Dubai for authentic souk shopping' }
    ],
    gourmet: [
      { name_ko:'두바이 인터내셔널 브런치',      name_en:'Dubai Friday Brunch Experience',        duration:120, x:55.2396, y:25.2086, open:720, close:1140, desc_ko:'두바이 금요일 5성급 호텔 무제한 브런치 문화 체험',        desc_en:'Dubai\'s unique all-inclusive Friday brunch culture at luxury hotels' },
      { name_ko:'알 망구 빌리지 로컬 쉐와르마', name_en:'Al Dhiyafah Road Local Shawarma',      duration:60, x:55.2560, y:25.2210, open:1080, close:300, desc_ko:'두바이 로컬 아랍 요리 식당 거리, 쉐와르마·후무스·팔라펠', desc_en:'Local Arabic street food - shawarma, hummus, falafel on Al Dhiyafah Road' }
    ]
  };

  // CAIRO
  ATTRACTIONS.cairo = {
    culture: [
      { name_ko:'기자 피라미드 & 대스핑크스',    name_en:'Giza Pyramids & Great Sphinx',         duration:240, isLandmark:true, x:31.1342, y:29.9792, open:480, close:1020, desc_ko:'세계 7대 불가사의 유일 현존, 쿠푸·카프레·멘카우레 피라미드와 대스핑크스', desc_en:'Only surviving wonder of the ancient world - Khufu, Khafre & Menkaure pyramids' },
      { name_ko:'이집트 박물관 투탕카멘 마스크',  name_en:'Egyptian Museum & Tutankhamun Mask',   duration:180, isLandmark:true, x:31.2335, y:30.0477, open:540, close:1080, desc_ko:'12만 점 파라오 유물, 투탕카멘 황금 마스크·미라 원형 전시', desc_en:'120,000 pharaonic artifacts including Tutankhamun\'s golden death mask' },
      { name_ko:'칸 엘칼릴리 시장 투어',         name_en:'Khan el-Khalili Bazaar',               duration:120, isLandmark:true, x:31.2627, y:30.0482, open:540, close:1320, desc_ko:'14세기 개장 카이로 최대 전통 시장, 향신료·금·기념품·카후와', desc_en:'14th-century bazaar with spices, gold jewelry, and traditional coffeehouses' },
      { name_ko:'살라딘 요새 & 무함마드 알리 모스크', name_en:'Saladin Citadel & Muhammad Ali Mosque', duration:150, isLandmark:false, x:31.2604, y:30.0288, open:480, close:1080, desc_ko:'12세기 십자군 대비 성채, 오스만 알바스터 모스크 조망',       desc_en:'12th-century hilltop citadel with stunning Ottoman alabaster mosque' }
    ],
    healing: [
      { name_ko:'나일강 크루즈 디너',             name_en:'Nile River Cruise Dinner',             duration:180, x:31.2231, y:30.0561, open:1080, close:1380, desc_ko:'카이로 도심 나일강 크루즈, 벨리댄스 공연과 이집트 요리 저녁', desc_en:'Nile dinner cruise with belly dancing and Egyptian dinner show' },
      { name_ko:'사카라 계단 피라미드 투어',      name_en:'Saqqara Step Pyramid of Djoser',        duration:180, x:31.2165, y:29.8713, open:480, close:1020, desc_ko:'BC 2650년 세계 최초 피라미드, 임호텝 신전과 마스타바 군락', desc_en:'World\'s first pyramid 2650BC, with Imhotep temple and mastaba tombs' }
    ],
    shopping: [
      { name_ko:'칸 엘칼릴리 수공예품 쇼핑',    name_en:'Khan el-Khalili Craft Shopping',        duration:90, x:31.2627, y:30.0482, open:540, close:1320, desc_ko:'파피루스·도자기·향신료·금 세공품 정통 이집트 기념품 쇼핑', desc_en:'Authentic Egyptian crafts, papyrus, pottery, and gold in the bazaar' }
    ],
    gourmet: [
      { name_ko:'카이로 전통 코샤리 & 팔라펠',  name_en:'Cairo Street Food: Koshari & Falafel', duration:60, x:31.2355, y:30.0444, open:540, close:1320, desc_ko:'이집트 국민 요리 코샤리(쌀·마카로니·렌즈콩)와 거리 팔라펠', desc_en:'Egyptian national dish koshari (rice, pasta, lentils) and street falafel' }
    ]
  };

  // CASABLANCA
  ATTRACTIONS.casablanca = {
    culture: [
      { name_ko:'하산 2세 모스크 투어',           name_en:'Hassan II Mosque Tour',                duration:120, isLandmark:true, x:-7.6325, y:33.6096, open:540, close:1080, desc_ko:'세계 5위 규모 모스크, 대서양 바다 위에 세워진 60m 투명 바닥 기도홀', desc_en:'World\'s 5th largest mosque built over the Atlantic with glass floor' },
      { name_ko:'리케 지구 & 무함마드 5세 광장',  name_en:'Rick\'s Café & Mohammed V Square',      duration:90,  isLandmark:true, x:-7.6209, y:33.5946, open:540, close:1200, desc_ko:'영화 카사블랑카 테마 릭스 카페와 아르데코 무함마드 5세 광장', desc_en:'Rick\'s Café of film fame and Art Deco Mohammed V Square' },
      { name_ko:'코른니쉬 해안 산책로',           name_en:'Corniche Ain Diab Promenade',          duration:90,  isLandmark:false, x:-7.6770, y:33.5924, open:540, close:1200, desc_ko:'대서양 해안 해수욕장·카페·레스토랑이 늘어선 해안 산책로',     desc_en:'Atlantic promenade with beaches, cafés, and seafood restaurants' }
    ],
    healing: [
      { name_ko:'아랍 가든 공원',                 name_en:'Arab League Park (Parc de la Ligue Arabe)', duration:60, x:-7.6306, y:33.5887, open:540, close:1200, desc_ko:'팜 트리와 분수의 카사블랑카 대표 도심 공원',                desc_en:'Central park with palm trees and fountains, Casablanca\'s urban green lung' }
    ],
    shopping: [
      { name_ko:'카르푸 아랍 마켓 쇼핑',          name_en:'Central Market (Marché Central)',       duration:90, x:-7.6167, y:33.5942, open:540, close:1200, desc_ko:'카사블랑카 전통 중앙 시장, 신선 해산물·향신료·과일 노점', desc_en:'Traditional central market with fresh seafood, spices, and fruit stalls' },
      { name_ko:'모로코 몰 & 안파 플레이스',      name_en:'Morocco Mall & Anfa Place',            duration:120, x:-7.7007, y:33.5718, open:540, close:1320, desc_ko:'아프리카 최대 쇼핑몰 모로코 몰, 아쿠아리움과 아이스링크 포함', desc_en:'Africa\'s largest mall with aquarium, ice rink, and 700+ stores' }
    ],
    gourmet: [
      { name_ko:'카사블랑카 해산물 신선 레스토랑', name_en:'Casablanca Fresh Seafood Restaurant',   duration:90, x:-7.6325, y:33.6096, open:1080, close:1320, desc_ko:'대서양 당일 어획 해산물 전문 레스토랑, 그릴 생선·새우·오징어', desc_en:'Fresh Atlantic seafood: grilled fish, shrimp, and squid by the ocean' }
    ]
  };

  // VENICE
  ATTRACTIONS.venice = {
    culture: [
      { name_ko:'산 마르코 광장 & 대성당',        name_en:'St. Mark\'s Square & Basilica',        duration:180, isLandmark:true, x:12.3387, y:45.4341, open:540, close:1080, desc_ko:'베니스 심장부, 나폴레옹이 유럽 최고 응접실이라 칭한 광장과 비잔틴 대성당', desc_en:'Heart of Venice; Napoleon\'s "finest drawing room" with Byzantine basilica' },
      { name_ko:'두칼레 궁전 & 탄식의 다리',      name_en:'Doge\'s Palace & Bridge of Sighs',     duration:120, isLandmark:true, x:12.3402, y:45.4337, open:540, close:1080, desc_ko:'베니스 공화국 1000년 권력의 총독 궁전, 죄수들이 탄식하며 건넌 다리', desc_en:'Doge\'s Palace of 1,000-year republic, with the famous Bridge of Sighs' },
      { name_ko:'리알토 다리 & 시장',             name_en:'Rialto Bridge & Market',               duration:90,  isLandmark:true, x:12.3358, y:45.4380, open:540, close:1200, desc_ko:'그란 카날레 가장 오래된 돌다리, 인근 어시장과 채소시장',      desc_en:'Oldest stone bridge over Grand Canal, with fish and vegetable markets' },
      { name_ko:'무라노 유리공예 섬 투어',        name_en:'Murano Island Glass-Blowing Tour',     duration:180, isLandmark:false, x:12.3549, y:45.4583, open:540, close:1080, desc_ko:'700년 베니스 유리공예 전통 섬, 유리 불기 장인 시연 관람',   desc_en:'Island of 700-year glass-blowing tradition with artisan demonstrations' }
    ],
    healing: [
      { name_ko:'부라노 섬 색색 주택 투어',       name_en:'Burano Island Coloured Houses',        duration:150, x:12.4159, y:45.4854, open:540, close:1200, desc_ko:'알록달록 어부 마을, 레이스 공예품과 베니스 최고 식사 명소', desc_en:'Colourful fishermen\'s village famous for lace-making and seafood' },
      { name_ko:'그란 카날레 수상버스',           name_en:'Grand Canal Vaporetto Water Bus',      duration:60,  x:12.3350, y:45.4370, open:540, close:1440, desc_ko:'베니스 대운하 수상버스 1번 노선, 궁전·다리 지나는 관광 방법', desc_en:'Grand Canal vaporetto Line 1, passing palaces and bridges' }
    ],
    shopping: [
      { name_ko:'무라노 유리 & 부라노 레이스 기념품', name_en:'Murano Glass & Venetian Mask Shopping', duration:90, x:12.3358, y:45.4380, open:540, close:1200, desc_ko:'베니스 마스크·유리공예·부라노 레이스 정통 기념품 쇼핑',  desc_en:'Authentic Venetian masks, Murano glass, and Burano lace souvenirs' }
    ],
    gourmet: [
      { name_ko:'베니스 바칼라 & 치케티 바 투어', name_en:'Venice Cicchetti Bar Crawl',           duration:120, x:12.3380, y:45.4375, open:1080, close:1320, desc_ko:'베니스식 타파스 치케티와 와인 한 잔 오스테리아 바 투어',   desc_en:'Venice-style tapas cicchetti and Ombra wine tour through bacari bars' },
      { name_ko:'곤돌라 로맨틱 투어',             name_en:'Gondola Romantic Canal Ride',          duration:45,  x:12.3380, y:45.4370, open:540, close:1320, desc_ko:'베니스 상징 곤돌라, 뒷골목 운하를 노래와 함께 흘러가는 체험', desc_en:'Iconic gondola ride through back canals with serenading gondolier' }
    ]
  };

  // FLORENCE
  ATTRACTIONS.florence = {
    culture: [
      { name_ko:'우피치 미술관 르네상스 걸작',    name_en:'Uffizi Gallery Renaissance Masterpieces', duration:180, isLandmark:true, x:11.2558, y:43.7678, open:540, close:1080, desc_ko:'보티첼리 봄·비너스의 탄생, 레오나르도·미켈란젤로 원화 소장 세계 최고 르네상스 미술관', desc_en:'World\'s finest Renaissance gallery with Botticelli, Leonardo, and Michelangelo' },
      { name_ko:'두오모 & 조토의 종탑 전망대',    name_en:'Florence Duomo & Giotto\'s Campanile',  duration:150, isLandmark:true, x:11.2558, y:43.7733, open:540, close:1080, desc_ko:'브루넬레스키 돔 467개 계단 등반, 피렌체 전경 360° 조망',      desc_en:'Brunelleschi\'s dome with 467-step climb for 360° views of Florence' },
      { name_ko:'아카데미아 미술관 다비드 원작', name_en:'Accademia Gallery & David Statue',      duration:120, isLandmark:true, x:11.2566, y:43.7771, open:540, close:1080, desc_ko:'미켈란젤로 5.17m 대리석 다비드 원작, 17피에타 등 소장',      desc_en:'Michelangelo\'s original 5.17m David marble statue and unfinished Prisoners' },
      { name_ko:'피티 궁전 & 보볼리 정원',        name_en:'Pitti Palace & Boboli Gardens',         duration:150, isLandmark:false, x:11.2496, y:43.7654, open:540, close:1080, desc_ko:'메디치가 궁전, 보볼리 이탈리아식 정원과 분수·동상·미로',     desc_en:'Medici Grand Ducal palace with Italian Renaissance Boboli Gardens' }
    ],
    healing: [
      { name_ko:'피에솔레 언덕 석양 전망',        name_en:'Fiesole Hill Sunset Panorama',         duration:120, x:11.2951, y:43.8044, open:540, close:1320, desc_ko:'피렌체 북쪽 에트루리아 고대 마을 언덕, 토스카나 계곡과 석양', desc_en:'Etruscan hilltop town above Florence with Tuscan valley sunsets' },
      { name_ko:'미켈란젤로 광장 석양 뷰',       name_en:'Piazzale Michelangelo Sunset View',    duration:90,  x:11.2655, y:43.7629, open:540, close:1440, desc_ko:'피렌체 최고 전망 광장, 두오모·폰테 베키오·도심 파노라마', desc_en:'Best panoramic viewpoint over Florence with dome and Ponte Vecchio' }
    ],
    shopping: [
      { name_ko:'산 로렌초 중앙 시장 가죽',      name_en:'San Lorenzo Market & Central Market',  duration:90, x:11.2537, y:43.7759, open:540, close:1080, desc_ko:'피렌체 전통 가죽·기념품 시장과 1874년 중앙 식품 시장', desc_en:'Florence\'s main leather market and 1874 central food market' },
      { name_ko:'폰테 베키오 금 세공',            name_en:'Ponte Vecchio Gold Jewellery',         duration:60, x:11.2531, y:43.7681, open:540, close:1200, desc_ko:'아르노강 위 중세 다리 위 금세공점, 유럽 유일 다리 위 상점 거리', desc_en:'Medieval bridge lined with goldsmiths, Europe\'s only bridge-top shops' }
    ],
    gourmet: [
      { name_ko:'피렌체 비스테카 알라 피오렌티나', name_en:'Florentine T-Bone Bistecca Dinner',   duration:90, x:11.2540, y:43.7700, open:1080, close:1320, desc_ko:'피렌체식 티본 스테이크 비스테카, 키안티 와인과 함께하는 토스카나 만찬', desc_en:'Florence\'s iconic T-bone bistecca alla Fiorentina with Chianti wine' },
      { name_ko:'젤라테리아 명물 젤라토',        name_en:'Gelateria Artigianale Artisan Gelato', duration:30, x:11.2555, y:43.7730, open:540, close:1320, desc_ko:'피렌체 전통 수제 젤라토, 수백 가지 맛의 아르티지아날레', desc_en:'Artisan gelato with hundreds of traditional Florentine flavours' }
    ]
  };

  // SAPPORO
  ATTRACTIONS.sapporo = {
    culture: [
      { name_ko:'오도리 공원 & TV 타워 전망',     name_en:'Odori Park & Sapporo TV Tower',        duration:90,  isLandmark:true, x:141.3517, y:43.0615, open:540, close:1380, desc_ko:'삿포로 중심 1.5km 공원, 147m TV 타워 전망대와 시계 전망', desc_en:'1.5km central park with 147m TV Tower overlooking Sapporo skyline' },
      { name_ko:'홋카이도 구청사 (붉은 벽돌)',    name_en:'Former Hokkaido Government Building',  duration:60,  isLandmark:true, x:141.3487, y:43.0636, open:540, close:1080, desc_ko:'1888년 미국 바로크 양식 붉은 벽돌 구청사, 홋카이도 역사 전시', desc_en:'1888 American Baroque brick building with Hokkaido history exhibits' },
      { name_ko:'삿포로 맥주 박물관',             name_en:'Sapporo Beer Museum & Factory',        duration:90,  isLandmark:false, x:141.3648, y:43.0749, open:540, close:1080, desc_ko:'1876년 일본 최초 맥주 공장, 삿포로 맥주 역사와 시음 투어', desc_en:'Japan\'s oldest brewery since 1876 with beer history and tasting tour' },
      { name_ko:'홋카이도 신궁 참배',             name_en:'Hokkaido Shrine (Hokkaido Jingu)',     duration:60,  isLandmark:false, x:141.3177, y:43.0573, open:360,  close:1080, desc_ko:'삿포로 최대 신사, 원시림 속 차분한 신토 신궁 참배',        desc_en:'Sapporo\'s largest Shinto shrine in primeval forest' }
    ],
    healing: [
      { name_ko:'모에레누마 공원 & 유리 피라미드', name_en:'Moerenuma Park & Glass Pyramid',      duration:150, x:141.4073, y:43.1043, open:540, close:1080, desc_ko:'조각가 이사무 노구치 설계 예술 공원, 유리 피라미드와 분수', desc_en:'Art park designed by sculptor Isamu Noguchi with glass pyramid' },
      { name_ko:'나카지마 공원 겨울 스케이트',    name_en:'Nakajima Park & Ice Skating',         duration:90,  x:141.3525, y:43.0497, open:540, close:1200, desc_ko:'삿포로 도심 공원, 겨울 아이스링크와 봄 꽃놀이 명소',       desc_en:'Central city park with winter ice skating and spring flower viewing' }
    ],
    shopping: [
      { name_ko:'다누키코지 쇼핑 아케이드',       name_en:'Tanukikoji Shopping Arcade',           duration:90, x:141.3518, y:43.0596, open:540, close:1320, desc_ko:'삿포로 최대 1km 지붕 덮인 쇼핑 아케이드, 170개 점포', desc_en:'1km covered shopping arcade with 170 stores in central Sapporo' },
      { name_ko:'스스키노 지하 쇼핑',             name_en:'Susukino Underground & Night District', duration:90, x:141.3539, y:43.0554, open:540, close:1440, desc_ko:'홋카이도 최대 환락가 스스키노, 라멘 골목과 밤문화', desc_en:'Hokkaido\'s largest nightlife district with ramen lane and entertainment' }
    ],
    gourmet: [
      { name_ko:'삿포로 미소 라멘 원조 거리',    name_en:'Sapporo Original Miso Ramen Street',  duration:90, x:141.3517, y:43.0615, open:1080, close:1320, desc_ko:'삿포로 발상지 미소 라멘, 1966년 개장 라멘 골목 원조 맛집', desc_en:'Birthplace of miso ramen, 1966-era Ramen Yokocho alley restaurants' },
      { name_ko:'홋카이도 카이센동 & 게 요리',   name_en:'Hokkaido Kaisen-don & Crab Cuisine',  duration:90, x:141.3595, y:43.0658, open:540, close:1320, desc_ko:'홋카이도 북해 신선 해산물 덮밥과 게 코스, 니조 시장', desc_en:'Hokkaido fresh seafood rice bowl and crab course at Nijo Market' }
    ]
  };

  // ISTANBUL
  ATTRACTIONS.istanbul = {
    culture: [
      { name_ko:'아야소피아 & 술탄아흐메트 광장', name_en:'Hagia Sophia & Sultan Ahmed Square',   duration:150, isLandmark:true, x:28.9802, y:41.0086, open:540, close:1080, desc_ko:'537년 건립 세계 최대 비잔틴 건축, 2020년 모스크 재전환 세계유산', desc_en:'537AD Byzantine masterpiece reconverted to mosque, UNESCO World Heritage' },
      { name_ko:'블루 모스크 & 6개 미나레트',    name_en:'Blue Mosque (Sultan Ahmed Camii)',     duration:90,  isLandmark:true, x:28.9762, y:41.0054, open:480,  close:1080, desc_ko:'17세기 오스만 제국 술탄 아흐메트 1세 모스크, 이즈니크 타일 2만장', desc_en:'17th-century Ottoman mosque with 20,000 Iznik tiles and 6 minarets' },
      { name_ko:'톱카프 궁전 & 할렘 투어',       name_en:'Topkapi Palace & Harem Tour',          duration:180, isLandmark:true, x:28.9831, y:41.0117, open:540, close:1080, desc_ko:'오스만 제국 400년 황실 거처, 할렘·보물관·예언자 유물',             desc_en:'400-year Ottoman imperial palace with Harem, treasury, and relics' },
      { name_ko:'갈라타 탑 & 갈라타 다리',       name_en:'Galata Tower & Galata Bridge',         duration:90,  isLandmark:false, x:28.9742, y:41.0256, open:540, close:1320, desc_ko:'1348년 제노바 탑 전망과 어부들이 낚시하는 보스포루스 다리', desc_en:'1348 Genoese tower with views and fishermen-lined Galata Bridge' }
    ],
    healing: [
      { name_ko:'보스포루스 해협 크루즈',         name_en:'Bosphorus Strait Cruise',             duration:180, x:29.0121, y:41.0379, open:540, close:1200, desc_ko:'유럽-아시아 두 대륙 사이 해협 크루즈, 돌마바흐체 궁전·요새 조망', desc_en:'Cruise between Europe and Asia with Dolmabahçe Palace and fortress views' },
      { name_ko:'프린스 섬 (뷰윅아다) 당일 투어', name_en:'Princes\' Islands Day Trip',         duration:300, x:29.1256, y:40.8763, open:540, close:1200, desc_ko:'자동차 없는 마르마라 해 섬, 마차와 자전거로 자연 탐방',       desc_en:'Car-free island in Marmara Sea with horse carriages and cycling' }
    ],
    shopping: [
      { name_ko:'그랜드 바자르 & 향신료 시장',   name_en:'Grand Bazaar & Spice Market',          duration:180, x:28.9682, y:41.0105, open:540, close:1080, desc_ko:'1455년 개장 세계 최오래 덮힌 시장, 4,400개 점포 카펫·금·향신료', desc_en:'World\'s oldest covered market since 1455 with 4,400 shops of carpets and gold' },
      { name_ko:'이스티클랄 거리 트램',           name_en:'Istiklal Avenue Nostalgic Tram',       duration:90, x:28.9784, y:41.0340, open:540, close:1440, desc_ko:'베욜루 지구 유럽식 대로, 향수 어린 빨간 트램과 쇼핑·카페', desc_en:'Beyoğlu\'s European-style boulevard with nostalgic red tram' }
    ],
    gourmet: [
      { name_ko:'이스탄불 케밥 & 메제 저녁',     name_en:'Istanbul Kebab & Meze Dinner',         duration:90, x:28.9784, y:41.0082, open:1080, close:1380, desc_ko:'터키 시쉬 케밥·아다나 케밥·돌마와 올리브 오일 요리 메제 풀코스', desc_en:'Turkish shish kebab, Adana kebab, dolma and olive oil meze full course' },
      { name_ko:'에미뇌뉴 발락 에크메크 고등어 샌드위치', name_en:'Eminönü Balık Ekmek Mackerel Sandwich', duration:30, x:28.9735, y:41.0172, open:540, close:1320, desc_ko:'금각만 보트 위에서 굽는 고등어 샌드위치 발락 에크메크, 이스탄불 길거리 명물', desc_en:'Mackerel sandwich from boats on the Golden Horn, Istanbul\'s street food icon' }
    ]
  };

  // MILAN
  ATTRACTIONS.milan = {
    culture: [
      { name_ko:'밀라노 두오모 & 테라스',         name_en:'Milan Duomo & Rooftop Terrace',        duration:120, isLandmark:true, x:9.1919, y:45.4641, open:540, close:1080, desc_ko:'135개 첨탑 고딕 대성당, 지붕 테라스에서 알프스 조망',         desc_en:'Gothic cathedral with 135 spires; rooftop terrace with Alpine views' },
      { name_ko:'최후의 만찬 (산타마리아 그라치에)', name_en:'The Last Supper at Santa Maria delle Grazie', duration:90, isLandmark:true, x:9.1703, y:45.4658, open:540, close:1020, desc_ko:'레오나르도 다 빈치 1498년 벽화 원작, 예약 필수 유네스코 유산', desc_en:'Leonardo da Vinci\'s 1498 mural, UNESCO heritage - advance booking essential' },
      { name_ko:'스포르체스코 성 & 예술 박물관',  name_en:'Castello Sforzesco & Michelangelo Pieta', duration:120, isLandmark:false, x:9.1794, y:45.4703, open:540, close:1080, desc_ko:'15세기 스포르차 공작 성, 미켈란젤로 마지막 피에타와 박물관', desc_en:'15th-century Sforza ducal castle with Michelangelo\'s last Pietà' },
      { name_ko:'갈레리아 비토리오 에마누엘레 2세', name_en:'Galleria Vittorio Emanuele II',        duration:60, isLandmark:true, x:9.1897, y:45.4659, open:540, close:1440, desc_ko:'1867년 개장 세계 최오래 쇼핑 아케이드, 유리 돔 아래 명품 매장', desc_en:'World\'s oldest shopping mall 1867 with glass dome and luxury boutiques' }
    ],
    healing: [
      { name_ko:'나빌리 운하 지구 산책',          name_en:'Navigli Canal District Evening Walk',  duration:120, x:9.1762, y:45.4490, open:540, close:1440, desc_ko:'밀라노 레오나르도 운하 지구, 아페리티보 시간 바·레스토랑 즐비', desc_en:'Leonardo\'s canal district lined with aperitivo bars and restaurants' }
    ],
    shopping: [
      { name_ko:'패션 쿼드 4대 명품 거리',        name_en:'Fashion Quadrilateral Via Montenapoleone', duration:120, x:9.1981, y:45.4686, open:540, close:1200, desc_ko:'몬테나폴레오네·스피가 거리 세계 최고급 패션 사각지대',          desc_en:'Via Montenapoleone and Via della Spiga - world\'s top luxury fashion zone' },
      { name_ko:'브레라 지구 아트 갤러리 & 부티크', name_en:'Brera Art & Boutique District',      duration:90, x:9.1875, y:45.4728, open:540, close:1200, desc_ko:'밀라노 예술인 지구, 고급 부티크·갤러리·카페 밀집',              desc_en:'Milan\'s artistic quarter with designer boutiques, galleries, and cafés' }
    ],
    gourmet: [
      { name_ko:'밀라노 리조또 알라 밀라네제',    name_en:'Risotto alla Milanese Signature Dish', duration:90, x:9.1860, y:45.4640, open:1080, close:1320, desc_ko:'사프란 황금색 쌀 요리 밀라노 리조또, 오소부코와 함께',          desc_en:'Saffron-gold risotto alla Milanese, best paired with ossobuco veal' },
      { name_ko:'나빌리 아페리티보 해피아워',     name_en:'Navigli Aperitivo Happy Hour',         duration:90, x:9.1762, y:45.4490, open:1080, close:1320, desc_ko:'밀라노 저녁 아페리티보 문화, 스프리츠와 뷔페 안주 즐기기',    desc_en:'Milanese aperitivo culture: Aperol Spritz with free buffet snacks at 6pm' }
    ]
  };

  // HOUSTON
  ATTRACTIONS.houston = {
    culture: [
      { name_ko:'스페이스 센터 휴스턴',           name_en:'Space Center Houston & NASA',          duration:420, isLandmark:true, x:-95.0977, y:29.5519, open:540, close:1080, desc_ko:'NASA 존슨 우주 센터 공식 방문자 센터, 아폴로·셔틀 실물 전시', desc_en:'NASA\'s official visitor center with Apollo and Space Shuttle artifacts' },
      { name_ko:'뮤지엄 디스트릭트 & 자연사 박물관', name_en:'Museum District & Natural Science Museum', duration:180, isLandmark:false, x:-95.3900, y:29.7188, open:540, close:1080, desc_ko:'19개 박물관 밀집 뮤지엄 디스트릭트, 자연사·미술·에너지 박물관', desc_en:'19 museums clustered together including Natural Science and Fine Arts museums' },
      { name_ko:'케마 보드워크',                  name_en:'Kemah Boardwalk',                      duration:180, isLandmark:false, x:-95.0192, y:29.5430, open:540, close:1320, desc_ko:'갤버스턴 만 해변 놀이공원·레스토랑·보트 복합 유흥 단지',    desc_en:'Gulf Coast amusement park, restaurants, and marina on Galveston Bay' }
    ],
    healing: [
      { name_ko:'버펄로 바이우 공원 카약',         name_en:'Buffalo Bayou Park & Kayaking',        duration:120, x:-95.3731, y:29.7604, open:540, close:1200, desc_ko:'휴스턴 도심 바이우 수변 공원, 카약·자전거·스카이라인 조망', desc_en:'Downtown bayou park with kayaking, cycling, and Houston skyline views' },
      { name_ko:'샘 휴스턴 국립 공원 하이킹',     name_en:'Sam Houston National Forest Hiking',   duration:240, x:-95.5660, y:30.4613, open:540, close:1080, desc_ko:'휴스턴 북쪽 텍사스 삼림 국립공원, 하이킹 트레일',           desc_en:'National forest north of Houston with hiking and nature trails' }
    ],
    shopping: [
      { name_ko:'갤러리아 휴스턴 쇼핑몰',        name_en:'Galleria Houston Shopping Mall',        duration:120, x:-95.4617, y:29.7397, open:540, close:1380, desc_ko:'텍사스 최대 쇼핑몰 갤러리아, 아이스링크와 400개 매장',      desc_en:'Texas\'s largest mall with ice skating rink and 400+ stores' }
    ],
    gourmet: [
      { name_ko:'텍사스 BBQ & 브리스켓',          name_en:'Texas BBQ & Brisket Experience',       duration:90, x:-95.3698, y:29.7604, open:1080, close:1320, desc_ko:'텍사스식 훈제 바비큐 브리스켓, 갈비와 소시지 플래터',      desc_en:'Texas-style smoked BBQ brisket, ribs, and sausage platter' },
      { name_ko:'테하스 텍스멕스 타코',           name_en:'Houston Tex-Mex Tacos & Fajitas',     duration:60, x:-95.3698, y:29.7604, open:540, close:1320, desc_ko:'멕시코-텍사스 퓨전 텍스멕스, 파히타·나초·타코 현지 식당',  desc_en:'Tex-Mex fusion fajitas, nachos, and tacos at local Houston restaurants' }
    ]
  };

  // RIO DE JANEIRO
  ATTRACTIONS.rio = {
    culture: [
      { name_ko:'예수 그리스도 상 (코르코바도)',  name_en:'Christ the Redeemer (Corcovado)',       duration:180, isLandmark:true, x:-43.2105, y:-22.9519, open:480,  close:1080, desc_ko:'세계 7대 불가사의 30m 예수 그리스도 상, 기차·미니버스로 오르는 710m 산', desc_en:'World\'s 7 Wonders - 30m statue atop 710m Corcovado by cog railway' },
      { name_ko:'슈가로프 산 케이블카',           name_en:'Sugarloaf Mountain Cable Car',         duration:150, isLandmark:true, x:-43.1577, y:-22.9489, open:540,  close:1320, desc_ko:'396m 팡지아수카르 화강암 봉우리, 두 단계 케이블카로 리우 만 전망', desc_en:'396m granite boulder with two-stage cable car and Rio bay panorama' },
      { name_ko:'라파 아치 & 산타 테레사 지구',  name_en:'Lapa Arches & Santa Teresa District',  duration:120, isLandmark:false, x:-43.1926, y:-22.9088, open:540, close:1440, desc_ko:'19세기 수도교 아치와 예술가 마을 산타 테레사 트램 투어',    desc_en:'19th-century aqueduct arches and bohemian Santa Teresa tram tour' }
    ],
    healing: [
      { name_ko:'코파카바나 & 이파네마 비치',    name_en:'Copacabana & Ipanema Beach',            duration:180, x:-43.1820, y:-22.9711, open:540, close:1320, desc_ko:'세계 최고 도심 해변 코파카바나 4km와 세련된 이파네마',    desc_en:'World-famous 4km Copacabana and chic Ipanema beach side by side' },
      { name_ko:'티주카 국립 공원 열대우림',      name_en:'Tijuca National Forest Trails',        duration:240, x:-43.2756, y:-22.9471, open:540, close:1080, desc_ko:'도심 속 세계 최대 도시 열대우림 국립공원, 폭포·원숭이', desc_en:'World\'s largest urban rainforest with waterfalls and monkeys' }
    ],
    shopping: [
      { name_ko:'이파네마 가르멘토 & 페이라 쇼핑', name_en:'Ipanema Fair & Hippie Market',       duration:90, x:-43.1977, y:-22.9836, open:540, close:1200, desc_ko:'이파네마 히피 마켓, 브라질 수공예·비키니·예술품 야외 장', desc_en:'Ipanema\'s General Osório Square hippy fair with crafts and swimwear' }
    ],
    gourmet: [
      { name_ko:'슈하스카리아 로디지오 바베큐',  name_en:'Churrascaria Rodízio Brazilian BBQ',  duration:120, x:-43.1729, y:-22.9068, open:1080, close:1320, desc_ko:'브라질 리우 전통 로디지오, 무한 리필 고기 꼬치 서비스', desc_en:'Brazilian rodízio: unlimited skewered meats brought tableside' },
      { name_ko:'카이피리냐 & 페이조아다 체험',  name_en:'Caipirinha & Feijoada Experience',    duration:90, x:-43.1820, y:-22.9711, open:1080, close:1320, desc_ko:'브라질 국민 칵테일 카이피리냐와 흑콩 스튜 페이조아다',  desc_en:'Brazil\'s national cocktail caipirinha and black bean feijoada stew' }
    ]
  };

  // GENEVA
  ATTRACTIONS.geneva = {
    culture: [
      { name_ko:'제네바 분수 제 도 (주네브)',     name_en:'Jet d\'Eau & Lake Geneva',             duration:90,  isLandmark:true, x:6.1553, y:46.2068, open:540, close:1320, desc_ko:'140m 높이 세계 최대 분수, 레만 호수와 알프스 배경 제네바 상징', desc_en:'140m water jet landmark on Lake Geneva with Alpine backdrop' },
      { name_ko:'팔레 데 나시옹 (UN 유럽 본부)', name_en:'Palais des Nations (UN European HQ)', duration:120, isLandmark:true, x:6.1427, y:46.2279, open:540, close:1080, desc_ko:'유엔 유럽 본부 공개 투어, 국제외교의 심장부 의회실 방문', desc_en:'UN European headquarters guided tour through Assembly Hall' },
      { name_ko:'구시가 & 생피에르 대성당',       name_en:'Old Town & St. Pierre Cathedral',      duration:120, isLandmark:false, x:6.1480, y:46.2012, open:540, close:1080, desc_ko:'12세기 로마네스크 대성당 탑 전망, 종교개혁의 발상지 제네바', desc_en:'12th-century Romanesque cathedral tower, birthplace of the Reformation' },
      { name_ko:'파텍 필립 박물관',               name_en:'Patek Philippe Museum',                duration:90,  isLandmark:false, x:6.1423, y:46.1979, open:540, close:1080, desc_ko:'세계 최고급 시계 브랜드 파텍 필립 시계 역사 박물관',       desc_en:'World\'s finest watchmaker\'s museum with historic timepieces' }
    ],
    healing: [
      { name_ko:'레만 호수 유람선 투어',          name_en:'Lake Geneva Boat Tour',               duration:180, x:6.1553, y:46.2068, open:540, close:1200, desc_ko:'레만 호수 유람선, 몽블랑·알프스·빈야드 절경',            desc_en:'Cruise on Europe\'s largest alpine lake with Mont Blanc views' },
      { name_ko:'CERN 입자 물리 연구소 투어',    name_en:'CERN Particle Physics Laboratory Tour', duration:180, x:6.0566, y:46.2341, open:540, close:1080, desc_ko:'힉스 입자 발견 세계 최대 입자 가속기 공개 관람 투어',     desc_en:'World\'s largest particle accelerator where the Higgs boson was discovered' }
    ],
    shopping: [
      { name_ko:'루 드 론 명품 시계 거리',        name_en:'Rue du Rhône Luxury Watch Street',     duration:90, x:6.1479, y:46.2025, open:540, close:1200, desc_ko:'롤렉스·파텍·오데마 피게 스위스 명품 시계 쇼핑의 메카',   desc_en:'Rolex, Patek Philippe, and Audemars Piguet - Swiss luxury watch mecca' }
    ],
    gourmet: [
      { name_ko:'퐁뒤 & 라클레트 스위스 치즈',  name_en:'Swiss Fondue & Raclette Dinner',       duration:90, x:6.1480, y:46.2012, open:1080, close:1320, desc_ko:'스위스 전통 치즈 퐁뒤와 라클레트, 화이트 와인 곁들임', desc_en:'Swiss cheese fondue and raclette melted over potatoes with white wine' }
    ]
  };

  // EDINBURGH
  ATTRACTIONS.edinburgh = {
    culture: [
      { name_ko:'에딘버러 성 & 스코틀랜드 왕관', name_en:'Edinburgh Castle & Scottish Crown Jewels', duration:180, isLandmark:true, x:-3.2001, y:55.9486, open:540, close:1080, desc_ko:'화산 바위 위 1100년 고성, 스코틀랜드 왕관·검·홀 전시',  desc_en:'Castle on a volcanic crag with Scottish Crown Jewels and Mons Meg cannon' },
      { name_ko:'로열 마일 & 홀리루드하우스 궁전', name_en:'Royal Mile & Palace of Holyroodhouse', duration:150, isLandmark:true, x:-3.1829, y:55.9521, open:540, close:1080, desc_ko:'에딘버러 심장 1마일 역사 거리와 현 영국 왕실 스코틀랜드 궁전', desc_en:'Historic Royal Mile from Castle to Queen\'s official Scottish residence' },
      { name_ko:'스코틀랜드 국립 박물관',         name_en:'National Museum of Scotland',          duration:150, isLandmark:false, x:-3.1904, y:55.9469, open:540, close:1080, desc_ko:'스코틀랜드 자연사·문화·공학·패션 무료 박물관',               desc_en:'Free museum covering Scotland\'s natural history, culture, and innovation' },
      { name_ko:'그레이프라이어스 커크야드',      name_en:'Greyfriars Kirkyard',                  duration:60,  isLandmark:false, x:-3.1907, y:55.9465, open:540, close:1320, desc_ko:'해리포터 이름 출처 묘지, 충견 보비 동상과 고딕 공포 투어', desc_en:'Churchyard inspiring Harry Potter names with Greyfriars Bobby statue' }
    ],
    healing: [
      { name_ko:'아서스 시트 사화산 하이킹',      name_en:"Arthur's Seat Extinct Volcano Hike",  duration:150, x:-3.1615, y:55.9442, open:540, close:1200, desc_ko:'에딘버러 도심 사화산 251m 정상, 360° 스코틀랜드 파노라마', desc_en:'Extinct 251m volcano in the city with 360° views of Edinburgh' },
      { name_ko:'홀리루드 공원 & 프린세스 가든',  name_en:'Holyrood Park & Princes Street Gardens', duration:90, x:-3.1780, y:55.9420, open:540, close:1440, desc_ko:'에딘버러 성 조망 프린세스 거리 정원, 플라워 클락 명물',   desc_en:'Princes Street Gardens with floral clock and castle views' }
    ],
    shopping: [
      { name_ko:'로열 마일 위스키 & 타탄 기념품', name_en:'Royal Mile Whisky & Tartan Souvenirs', duration:90, x:-3.1900, y:55.9500, open:540, close:1200, desc_ko:'스코틀랜드 위스키·킬트·타탄 체크 수공예품 로열 마일 쇼핑', desc_en:'Scotch whisky, kilts, tartan, and Scottish crafts along the Royal Mile' },
      { name_ko:'빅토리아 스트리트 컬러풀 샵',   name_en:'Victoria Street Colourful Shops',      duration:60, x:-3.1940, y:55.9471, open:540, close:1200, desc_ko:'해리포터 다이애건 앨리 모티프 18세기 곡선형 다채로운 쇼핑 거리', desc_en:'18th-century curved street of colourful shopfronts, Harry Potter\'s Diagon Alley' }
    ],
    gourmet: [
      { name_ko:'스코틀랜드 해기스 & 위스키 디너', name_en:'Scottish Haggis & Whisky Dinner',   duration:90, x:-3.1900, y:55.9500, open:1080, close:1320, desc_ko:'스코틀랜드 전통 양 내장 요리 해기스와 싱글 몰트 위스키 페어링', desc_en:'Traditional Scottish haggis with single malt whisky pairing dinner' },
      { name_ko:'에딘버러 피시 앤 칩스',         name_en:'Edinburgh Fish & Chips',              duration:45, x:-3.1900, y:55.9500, open:1080, close:1320, desc_ko:'스코틀랜드 전통 피시 앤 칩스, 소금·식초와 함께 신문지 포장', desc_en:'Classic Scottish fish and chips with salt, vinegar, and newspaper wrapping' }
    ]
  };

  // ---- 3b. Base cities that previously had city metadata but no vetted attraction pools ----
  ATTRACTIONS.doha = {
    culture: [
      { name_ko:'이슬람 예술 박물관', name_en:'Museum of Islamic Art Doha', duration:120, isLandmark:true, x:51.5392, y:25.2955, open:540, close:1080, desc_ko:'I. M. 페이가 설계한 도하 대표 박물관, 이슬람권 예술품 컬렉션', desc_en:'I. M. Pei-designed landmark museum with Islamic art collections' },
      { name_ko:'카타르 국립박물관', name_en:'National Museum of Qatar', duration:120, isLandmark:true, x:51.5493, y:25.2867, open:540, close:1080, desc_ko:'사막 장미 형상의 건축과 카타르 역사 전시', desc_en:'Desert-rose architecture and exhibits on Qatar history' },
      { name_ko:'수크 와키프 전통시장', name_en:'Souq Waqif Market', duration:120, isLandmark:true, x:51.5331, y:25.2868, open:540, close:1380, desc_ko:'향신료, 직물, 카타르 전통 상점이 모인 도하 대표 시장', desc_en:'Historic market for spices, textiles, and Qatari shops' },
      { name_ko:'카타라 문화마을', name_en:'Katara Cultural Village', duration:120, x:51.5233, y:25.3597, open:540, close:1320, desc_ko:'원형극장, 갤러리, 해변이 있는 문화 복합지구', desc_en:'Cultural district with amphitheatre, galleries, and beach' }
    ],
    healing: [
      { name_ko:'도하 코니쉬 산책', name_en:'Doha Corniche Walk', duration:90, isLandmark:true, x:51.5320, y:25.2920, open:360, close:1380, desc_ko:'도하만 스카이라인을 따라 걷는 해변 산책로', desc_en:'Waterfront promenade with Doha skyline views' },
      { name_ko:'더 펄 카타르 산책', name_en:'The Pearl-Qatar Waterfront', duration:90, x:51.5412, y:25.3696, open:540, close:1320, desc_ko:'마리나와 인공섬 산책, 카페 거리', desc_en:'Marina promenade and cafe streets on the artificial island' },
      { name_ko:'아스파이어 파크', name_en:'Aspire Park', duration:90, x:51.4412, y:25.2625, open:360, close:1320, desc_ko:'도하 최대 규모의 녹지 공원과 호수 산책', desc_en:'Large green park with lake walks' }
    ],
    shopping: [
      { name_ko:'비야지오 몰', name_en:'Villaggio Mall', duration:120, x:51.4436, y:25.2588, open:600, close:1320, desc_ko:'베네치아 운하 콘셉트의 실내 쇼핑몰', desc_en:'Indoor mall with a Venice canal theme' },
      { name_ko:'플레이스 방돔 카타르', name_en:'Place Vendome Qatar', duration:120, x:51.5019, y:25.4050, open:600, close:1320, desc_ko:'루사일의 대형 럭셔리 쇼핑몰', desc_en:'Large luxury mall in Lusail' }
    ],
    gourmet: [
      { name_ko:'수크 와키프 카타르 음식 거리', name_en:'Souq Waqif Qatari Dining', duration:90, x:51.5331, y:25.2868, open:660, close:1380, desc_ko:'전통 시장 주변에서 맛보는 카타르 요리', desc_en:'Qatari dining around the historic market' },
      { name_ko:'차파티 앤 카락 카타라', name_en:'Chapati & Karak Katara', duration:45, x:51.5248, y:25.3605, open:480, close:1380, desc_ko:'카타라의 카락 차와 차파티로 쉬어가기', desc_en:'Katara stop for karak tea and chapati' }
    ],
    activity: [
      { name_ko:'도하 도우 보트 크루즈', name_en:'Doha Dhow Boat Cruise', duration:90, x:51.5338, y:25.2926, open:900, close:1320, desc_ko:'도하만에서 즐기는 전통 도우 보트 야경 크루즈', desc_en:'Traditional dhow cruise on Doha Bay' },
      { name_ko:'카타르 사막 사파리와 인랜드 씨', name_en:'Qatar Desert Safari & Inland Sea', duration:480, isThemePark:true, x:51.2783, y:24.6345, open:480, close:1080, desc_ko:'사륜구동 듄배싱과 코르 알 아다이드 당일 사막 코스', desc_en:'Full-day dune bashing trip to Khor Al Adaid Inland Sea' }
    ]
  };

  ATTRACTIONS.monaco = {
    culture: [
      { name_ko:'모나코 대공궁', name_en:"Prince's Palace of Monaco", duration:90, isLandmark:true, x:7.4208, y:43.7313, open:540, close:1080, desc_ko:'모나코 구시가지 언덕의 왕궁과 근위병 교대식', desc_en:'Royal palace in Monaco-Ville with guard ceremony' },
      { name_ko:'몬테카를로 카지노', name_en:'Casino de Monte-Carlo', duration:90, isLandmark:true, x:7.4273, y:43.7394, open:600, close:1380, desc_ko:'벨 에포크 양식의 모나코 대표 카지노 건축', desc_en:'Belle Epoque casino and Monaco icon' },
      { name_ko:'해양박물관 모나코', name_en:'Oceanographic Museum of Monaco', duration:120, isLandmark:true, x:7.4254, y:43.7308, open:540, close:1080, desc_ko:'절벽 위 해양 생물 전시와 수족관', desc_en:'Cliffside marine museum and aquarium' },
      { name_ko:'모나코 대성당', name_en:'Monaco Cathedral', duration:60, x:7.4228, y:43.7306, open:540, close:1080, desc_ko:'그레이스 켈리와 모나코 왕가 묘역이 있는 성당', desc_en:'Cathedral with Monaco royal tombs' }
    ],
    healing: [
      { name_ko:'라르보토 해변', name_en:'Larvotto Beach', duration:120, x:7.4386, y:43.7471, open:420, close:1200, desc_ko:'모나코 대표 해변과 해안 산책', desc_en:'Main Monaco beach and seaside promenade' },
      { name_ko:'모나코 일본정원', name_en:'Japanese Garden Monaco', duration:60, x:7.4324, y:43.7433, open:540, close:1140, desc_ko:'몬테카를로 해변가의 작은 일본식 정원', desc_en:'Small Japanese garden near Monte Carlo waterfront' },
      { name_ko:'에르퀼 항구 산책', name_en:'Port Hercules Promenade', duration:60, x:7.4246, y:43.7347, open:360, close:1380, desc_ko:'요트가 늘어선 모나코 대표 항구 산책', desc_en:'Promenade around Monaco main yacht harbour' }
    ],
    shopping: [
      { name_ko:'메트로폴 쇼핑 몬테카를로', name_en:'Metropole Shopping Monte-Carlo', duration:90, x:7.4267, y:43.7400, open:600, close:1200, desc_ko:'몬테카를로 중심의 럭셔리 쇼핑 아케이드', desc_en:'Luxury shopping arcade in Monte Carlo' },
      { name_ko:'원 몬테카를로 부티크 거리', name_en:'One Monte-Carlo Boutiques', duration:90, x:7.4277, y:43.7403, open:600, close:1200, desc_ko:'카지노 광장 주변 명품 부티크 거리', desc_en:'Boutique district around Casino Square' }
    ],
    gourmet: [
      { name_ko:'카페 드 파리 몬테카를로', name_en:'Cafe de Paris Monte-Carlo', duration:60, x:7.4275, y:43.7397, open:480, close:1380, desc_ko:'카지노 광장 앞 클래식 카페에서 휴식', desc_en:'Classic cafe on Casino Square' },
      { name_ko:'콘다민 시장 음식 홀', name_en:'La Condamine Market Food Hall', duration:90, x:7.4195, y:43.7329, open:420, close:900, desc_ko:'현지 시장 푸드홀에서 바르바주앙과 간단 식사', desc_en:'Local market food hall for barbajuan and casual bites' }
    ],
    activity: [
      { name_ko:'모나코 그랑프리 코스 산책', name_en:'Monaco Grand Prix Circuit Walk', duration:90, x:7.4213, y:43.7347, open:360, close:1380, desc_ko:'F1 모나코 그랑프리 시가지 코스 주요 구간 걷기', desc_en:'Walk key sections of the Monaco F1 street circuit' }
    ]
  };

  ATTRACTIONS.budapest = {
    culture: [
      { name_ko:'헝가리 국회의사당', name_en:'Hungarian Parliament Building', duration:120, isLandmark:true, x:19.0456, y:47.5070, open:540, close:1080, desc_ko:'도나우강변의 네오고딕 국회의사당 투어와 야경 명소', desc_en:'Neo-Gothic parliament on the Danube and night-view landmark' },
      { name_ko:'부다 성 지구', name_en:'Buda Castle District', duration:150, isLandmark:true, x:19.0396, y:47.4962, open:540, close:1200, desc_ko:'왕궁, 어부의 요새, 마차시 성당이 모인 언덕 지구', desc_en:'Castle Hill district with royal palace, Fisherman Bastion, and Matthias Church' },
      { name_ko:'어부의 요새와 마차시 성당', name_en:'Fisherman Bastion & Matthias Church', duration:120, isLandmark:true, x:19.0348, y:47.5023, open:540, close:1080, desc_ko:'부다 언덕의 대표 전망대와 화려한 지붕의 성당', desc_en:'Iconic terrace and ornate church above the Danube' },
      { name_ko:'도하니 거리 시나고그', name_en:'Dohany Street Synagogue', duration:90, x:19.0606, y:47.4959, open:540, close:1080, desc_ko:'유럽 최대 규모의 유대교 회당과 기념 정원', desc_en:'Europe largest synagogue with memorial garden' }
    ],
    healing: [
      { name_ko:'세체니 온천', name_en:'Szechenyi Thermal Bath', duration:180, isLandmark:true, x:19.0825, y:47.5188, open:420, close:1320, desc_ko:'부다페스트 대표 야외 온천 목욕탕', desc_en:'Budapest landmark outdoor thermal bath' },
      { name_ko:'겔레르트 온천', name_en:'Gellert Thermal Bath', duration:150, x:19.0525, y:47.4836, open:420, close:1200, desc_ko:'아르누보 양식의 역사적인 온천', desc_en:'Historic Art Nouveau thermal bath' },
      { name_ko:'마르기트 섬 산책', name_en:'Margaret Island Walk', duration:90, x:19.0476, y:47.5286, open:360, close:1320, desc_ko:'도나우강 한가운데 공원 섬 산책', desc_en:'Green island park in the middle of the Danube' }
    ],
    shopping: [
      { name_ko:'중앙시장 홀', name_en:'Great Market Hall Budapest', duration:90, x:19.0585, y:47.4870, open:360, close:900, desc_ko:'파프리카와 기념품, 현지 음식이 모인 대형 시장', desc_en:'Large market hall for paprika, souvenirs, and local food' },
      { name_ko:'바치 거리 쇼핑', name_en:'Vaci Street Shopping', duration:90, x:19.0523, y:47.4937, open:540, close:1200, desc_ko:'페스트 중심 보행자 쇼핑 거리', desc_en:'Central Pest pedestrian shopping street' }
    ],
    gourmet: [
      { name_ko:'뉴욕 카페 부다페스트', name_en:'New York Cafe Budapest', duration:60, x:19.0706, y:47.4982, open:480, close:1380, desc_ko:'화려한 궁전풍 카페에서 디저트와 커피 휴식', desc_en:'Ornate historic cafe for coffee and dessert' },
      { name_ko:'겔라르트 언덕 근처 굴라시 식사', name_en:'Budapest Goulash Meal', duration:90, x:19.0520, y:47.4860, open:660, close:1320, desc_ko:'헝가리식 굴라시와 파프리카 요리 식사', desc_en:'Hungarian goulash and paprika dishes' }
    ],
    activity: [
      { name_ko:'도나우강 야경 크루즈', name_en:'Danube River Evening Cruise', duration:90, x:19.0477, y:47.4980, open:900, close:1320, desc_ko:'국회의사당과 부다 성 야경을 보는 도나우 크루즈', desc_en:'Evening Danube cruise past Parliament and Buda Castle' }
    ]
  };

  ATTRACTIONS.addis_ababa = {
    culture: [
      { name_ko:'에티오피아 국립박물관', name_en:'National Museum of Ethiopia', duration:120, isLandmark:true, x:38.7612, y:9.0389, open:540, close:1020, desc_ko:'루시 화석과 에티오피아 역사 유물을 볼 수 있는 대표 박물관', desc_en:'Museum known for Lucy fossil and Ethiopian history' },
      { name_ko:'홀리 트리니티 대성당', name_en:'Holy Trinity Cathedral Addis Ababa', duration:90, isLandmark:true, x:38.7663, y:9.0305, open:540, close:1080, desc_ko:'하일레 셀라시에 황제 묘역과 스테인드글라스가 있는 대성당', desc_en:'Cathedral with Haile Selassie tombs and stained glass' },
      { name_ko:'민속학 박물관', name_en:'Ethnological Museum Addis Ababa', duration:120, x:38.7610, y:9.0464, open:540, close:1020, desc_ko:'옛 황궁 건물의 에티오피아 문화 전시', desc_en:'Cultural museum in a former palace building' },
      { name_ko:'레드 테러 순교자 기념박물관', name_en:'Red Terror Martyrs Memorial Museum', duration:90, x:38.7639, y:9.0106, open:540, close:1020, desc_ko:'에티오피아 현대사의 비극을 기록한 기념관', desc_en:'Memorial museum documenting Ethiopia modern history' }
    ],
    healing: [
      { name_ko:'엔토토 공원', name_en:'Entoto Park', duration:150, isLandmark:true, x:38.7737, y:9.0888, open:480, close:1080, desc_ko:'아디스아바바 고지대 전망과 숲길 산책', desc_en:'Highland park with Addis Ababa views and forest trails' },
      { name_ko:'유니티 파크', name_en:'Unity Park Addis Ababa', duration:120, x:38.7581, y:9.0205, open:540, close:1080, desc_ko:'옛 궁전 부지에 조성된 정원과 전시 공간', desc_en:'Garden and exhibit complex in the former palace grounds' },
      { name_ko:'엔토토 산 전망', name_en:'Mount Entoto Viewpoint', duration:90, x:38.7641, y:9.0953, open:480, close:1080, desc_ko:'도시 전체를 내려다보는 고지대 전망 포인트', desc_en:'Mountain viewpoint over Addis Ababa' }
    ],
    shopping: [
      { name_ko:'메르카토 시장', name_en:'Addis Mercato Market', duration:120, isLandmark:true, x:38.7378, y:9.0334, open:480, close:1080, desc_ko:'아프리카 최대 규모로 꼽히는 전통 시장 지구', desc_en:'Huge traditional market district often cited as Africa largest open-air market' },
      { name_ko:'시로 메다 시장', name_en:'Shiromeda Market', duration:90, x:38.7807, y:9.0641, open:480, close:1080, desc_ko:'에티오피아 전통 의상과 직물을 사기 좋은 시장', desc_en:'Market for Ethiopian traditional clothing and textiles' }
    ],
    gourmet: [
      { name_ko:'토모카 커피', name_en:'Tomoca Coffee Addis Ababa', duration:45, x:38.7578, y:9.0105, open:480, close:1080, desc_ko:'1940년대부터 이어진 아디스아바바 대표 커피 하우스', desc_en:'Classic Addis Ababa coffee house founded in the 1940s' },
      { name_ko:'요드 아비시니아 문화식당', name_en:'Yod Abyssinia Cultural Restaurant', duration:90, x:38.7895, y:9.0202, open:660, close:1380, desc_ko:'인제라와 전통 공연을 함께 즐기는 문화식당', desc_en:'Cultural restaurant for injera and traditional performances' }
    ],
    activity: [
      { name_ko:'엔토토 숲 하이킹', name_en:'Entoto Forest Hike', duration:180, x:38.7737, y:9.0888, open:480, close:1080, desc_ko:'엔토토 고지대 숲길을 걷는 반나절 하이킹', desc_en:'Half-day walk through Entoto highland forest trails' }
    ]
  };

  ATTRACTIONS.quito = {
    culture: [
      { name_ko:'키토 역사 지구', name_en:'Quito Historic Center', duration:150, isLandmark:true, x:-78.5123, y:-0.2202, open:540, close:1200, desc_ko:'유네스코 세계유산 구시가지와 식민지 시대 광장', desc_en:'UNESCO-listed old town with colonial plazas' },
      { name_ko:'바실리카 델 보토 나시오날', name_en:'Basilica del Voto Nacional', duration:90, isLandmark:true, x:-78.5072, y:-0.2147, open:540, close:1080, desc_ko:'첨탑에 올라 구시가지를 볼 수 있는 네오고딕 성당', desc_en:'Neo-Gothic basilica with tower views over Quito' },
      { name_ko:'라 콤파니아 데 헤수스 성당', name_en:'La Compania de Jesus Church Quito', duration:60, isLandmark:true, x:-78.5130, y:-0.2206, open:540, close:1080, desc_ko:'금박 바로크 내부로 유명한 키토 대표 성당', desc_en:'Baroque church famous for gilded interior' },
      { name_ko:'미타드 델 문도 적도 기념비', name_en:'Mitad del Mundo Equator Monument', duration:150, isLandmark:true, x:-78.4558, y:-0.0022, open:540, close:1080, desc_ko:'적도선을 기념하는 키토 근교 대표 명소', desc_en:'Equator monument just north of Quito' }
    ],
    healing: [
      { name_ko:'텔레페리코 키토', name_en:'TeleferiQo Quito Cable Car', duration:180, isLandmark:true, x:-78.5190, y:-0.1901, open:540, close:1080, desc_ko:'피친차 화산 쪽 고지대로 올라가는 케이블카와 전망', desc_en:'Cable car toward Pichincha volcano with high-altitude views' },
      { name_ko:'엘 파네시요 전망대', name_en:'El Panecillo Viewpoint', duration:90, x:-78.5189, y:-0.2285, open:540, close:1080, desc_ko:'키토 구시가지와 남쪽 시내를 보는 언덕 전망대', desc_en:'Hilltop viewpoint over Old Quito' },
      { name_ko:'라 카롤리나 공원', name_en:'Parque La Carolina', duration:90, x:-78.4847, y:-0.1835, open:360, close:1200, desc_ko:'신시가지의 넓은 도시 공원 산책', desc_en:'Large urban park in Quito new town' }
    ],
    shopping: [
      { name_ko:'라 마리스칼 공예시장', name_en:'Mercado Artesanal La Mariscal', duration:90, x:-78.4928, y:-0.2015, open:540, close:1080, desc_ko:'안데스 직물과 기념품을 볼 수 있는 공예시장', desc_en:'Craft market for Andean textiles and souvenirs' },
      { name_ko:'퀴센트로 쇼핑몰', name_en:'Quicentro Shopping Quito', duration:90, x:-78.4794, y:-0.1764, open:600, close:1260, desc_ko:'키토 북부의 현대식 쇼핑몰', desc_en:'Modern shopping mall in north Quito' }
    ],
    gourmet: [
      { name_ko:'키토 초콜릿 시식 휴식', name_en:'Quito Chocolate Tasting Break', duration:60, x:-78.5120, y:-0.2200, open:540, close:1080, desc_ko:'에콰도르 카카오 초콜릿과 커피 휴식', desc_en:'Ecuadorian cacao chocolate and coffee break' },
      { name_ko:'라 론다 전통 디저트 거리', name_en:'La Ronda Traditional Dessert Street', duration:60, x:-78.5136, y:-0.2249, open:600, close:1320, desc_ko:'구시가지 골목에서 전통 간식과 카넬라소 맛보기', desc_en:'Old-town street for traditional sweets and canelazo' }
    ],
    activity: [
      { name_ko:'피친차 고지대 짧은 하이킹', name_en:'Pichincha High-Altitude Short Hike', duration:180, x:-78.5480, y:-0.1710, open:540, close:1020, desc_ko:'텔레페리코 상부에서 시작하는 고지대 전망 하이킹', desc_en:'High-altitude viewpoint hike from the upper cable car station' }
    ]
  };

  ATTRACTIONS.taipei = {
    culture: [
      { name_ko:'타이베이 101 전망대', name_en:'Taipei 101 Observatory', duration:120, isLandmark:true, x:121.5645, y:25.0339, open:600, close:1320, desc_ko:'타이베이 대표 초고층 빌딩 전망대', desc_en:'Landmark skyscraper observatory over Taipei' },
      { name_ko:'국립고궁박물원', name_en:'National Palace Museum Taipei', duration:180, isLandmark:true, x:121.5485, y:25.1024, open:540, close:1080, desc_ko:'중국 황실 유물 컬렉션으로 유명한 대형 박물관', desc_en:'Major museum with Chinese imperial collections' },
      { name_ko:'중정기념당', name_en:'Chiang Kai-shek Memorial Hall', duration:90, isLandmark:true, x:121.5219, y:25.0346, open:540, close:1080, desc_ko:'타이베이 대표 광장과 근위병 교대식 명소', desc_en:'Grand memorial square and guard ceremony site' },
      { name_ko:'룽산사', name_en:'Longshan Temple Taipei', duration:60, isLandmark:true, x:121.4999, y:25.0372, open:360, close:1320, desc_ko:'만화 지구의 오래된 사찰과 현지 신앙 문화', desc_en:'Historic temple in Wanhua district' }
    ],
    healing: [
      { name_ko:'샹산 전망 산책', name_en:'Elephant Mountain Taipei', duration:120, isLandmark:true, x:121.5713, y:25.0270, open:360, close:1320, desc_ko:'타이베이 101을 바라보는 대표 전망 하이킹', desc_en:'Short hike with classic Taipei 101 skyline views' },
      { name_ko:'베이터우 온천 지구', name_en:'Beitou Hot Spring District', duration:180, x:121.5089, y:25.1368, open:540, close:1200, desc_ko:'온천 박물관과 노천 온천이 있는 휴식 지구', desc_en:'Hot spring district with museum and baths' },
      { name_ko:'다안 삼림공원', name_en:'Daan Forest Park', duration:90, x:121.5354, y:25.0317, open:360, close:1200, desc_ko:'타이베이 도심의 넓은 녹지 공원', desc_en:'Large central Taipei park' }
    ],
    shopping: [
      { name_ko:'시먼딩 거리', name_en:'Ximending Shopping District', duration:120, x:121.5073, y:25.0421, open:540, close:1380, desc_ko:'젊은 층이 모이는 보행자 쇼핑 거리', desc_en:'Youth shopping and entertainment district' },
      { name_ko:'스린 야시장', name_en:'Shilin Night Market', duration:120, x:121.5246, y:25.0880, open:960, close:1440, desc_ko:'타이베이 대표 야시장과 길거리 음식', desc_en:'Classic Taipei night market and street food' },
      { name_ko:'라오허제 야시장', name_en:'Raohe Street Night Market', duration:90, x:121.5747, y:25.0508, open:960, close:1440, desc_ko:'후추빵과 야식으로 유명한 야시장', desc_en:'Night market known for pepper buns and street snacks' }
    ],
    gourmet: [
      { name_ko:'딘타이펑 타이베이 101', name_en:'Din Tai Fung Taipei 101', duration:90, x:121.5645, y:25.0339, open:660, close:1320, desc_ko:'샤오롱바오로 유명한 타이베이 101 지점', desc_en:'Taipei 101 branch famous for xiaolongbao' },
      { name_ko:'용캉 우육면 거리', name_en:'Yongkang Beef Noodles Area', duration:90, x:121.5294, y:25.0329, open:660, close:1320, desc_ko:'우육면과 망고빙수 카페가 모인 용캉제 주변', desc_en:'Yongkang Street area for beef noodles and mango shaved ice' },
      { name_ko:'춘수당 타이베이 버블티 휴식', name_en:'Chun Shui Tang Taipei Bubble Tea Break', duration:45, x:121.5650, y:25.0335, open:600, close:1320, desc_ko:'버블티와 디저트로 쉬어가기', desc_en:'Bubble tea and dessert break' }
    ],
    activity: [
      { name_ko:'지우펀 근교 당일 코스', name_en:'Jiufen Day Trip', duration:480, isThemePark:true, x:121.8430, y:25.1097, open:540, close:1200, desc_ko:'홍등 골목과 찻집이 있는 타이베이 근교 산마을 당일 여행', desc_en:'Full-day nearby mountain village trip with lantern alleys and tea houses' }
    ]
  };

  // ---- 4. Sort CITIES alphabetically ----
  // We attach a sort key to support both languages
  CITIES.sort(function(a, b) {
    // Default sort by Korean name (가나다 순)
    return a.name_ko.localeCompare(b.name_ko, 'ko');
  });
  // Store pre-sorted en version too
  window._CITIES_SORTED_EN = CITIES.slice().sort(function(a, b) {
    return a.name_en.localeCompare(b.name_en, 'en');
  });

})();

// ---- 5. Add CITY_CLUSTERS for new cities ----
window.addEventListener('DOMContentLoaded', function() {
  if (typeof CITY_CLUSTERS === 'undefined') return;

  CITY_CLUSTERS.capetown = [
    { name_ko: '테이블 마운틴/시내', name_en: 'Table Mountain/City Bowl', keywords: ['table mountain','테이블','waterfront','워터프론트','city bowl','robben','로벤','bo-kaap','보캅','company','garden'], x: 18.4139, y: -33.9249 },
    { name_ko: '씨포인트/캠프스 베이', name_en: 'Sea Point/Camps Bay', keywords: ['camps bay','캠프스','sea point','cliff','beach','해변'], x: 18.3762, y: -33.9495 },
    { name_ko: '남부 (굿호프/볼더스)', name_en: 'South (Good Hope/Boulders)', keywords: ['cape of good hope','good hope','케이프','boulder','penguin','penguin','펭귄','kirstenbosch','커스텐보쉬'], x: 18.4510, y: -34.1974 }
  ];

  CITY_CLUSTERS.porto = [
    { name_ko: '리베이라/구시가', name_en: 'Ribeira/Old Town', keywords: ['ribeira','리베이라','rialto','luis','lello','볼사','bolsa','francisco','ribeiro'], x: -8.6140, y: 41.1408 },
    { name_ko: '빌라 노바 데 가이아', name_en: 'Vila Nova de Gaia', keywords: ['gaia','가이아','port wine','포트와인','lodge','셀러'], x: -8.6106, y: 41.1389 },
    { name_ko: '포즈/마토시뇨스', name_en: 'Foz/Matosinhos', keywords: ['foz','bolhao','볼랴웅','santa catarina','카타리나'], x: -8.6681, y: 41.1512 }
  ];

  CITY_CLUSTERS.munich = [
    { name_ko: '마리엔 광장/구시가', name_en: 'Marienplatz/Old Town', keywords: ['marienplatz','마리엔','viktualien','빅투알리엔','hofbrauhaus','호프브로이','residenz','레지덴츠','kaufinger','hofbräuhaus'], x: 11.5754, y: 48.1374 },
    { name_ko: '님펜부르크/서부', name_en: 'Nymphenburg/West', keywords: ['nymphenburg','님펜부르크','bmw','olympic','올림픽'], x: 11.5033, y: 48.1582 },
    { name_ko: '잉글리쉬 가든/북부', name_en: 'Englischer Garten/North', keywords: ['englischer','english garden','잉글리쉬','eisbach','surfing','deutsches','도이체스'], x: 11.5857, y: 48.1642 }
  ];

  CITY_CLUSTERS.prague = [
    { name_ko: '프라하 성/서부', name_en: 'Prague Castle/West', keywords: ['prague castle','프라하 성','hradčany','charles bridge','카를교','mala strana','golden lane','황금 소로','vitus','비투스'], x: 14.4013, y: 50.0911 },
    { name_ko: '구시가/구시청사', name_en: 'Old Town/Astronomical Clock', keywords: ['old town','구시가','astronomical','천문시계','josefov','요제포프','synagogue','republic'], x: 14.4208, y: 50.0871 },
    { name_ko: '신시가/바츨라프 광장', name_en: 'New Town/Wenceslas Square', keywords: ['wenceslas','바츨라프','palladium','vyšehrad','비셰흐라드','petrin','페트르진'], x: 14.4280, y: 50.0750 }
  ];

  CITY_CLUSTERS.queenstown = [
    { name_ko: '퀸스타운 시내/와카티푸', name_en: 'Queenstown Town/Wakatipu', keywords: ['queenstown','wakatipu','와카티푸','skyline','스카이라인','gondola','fergburger','퍼그버거','steamer'], x: 168.6626, y: -45.0312 },
    { name_ko: '카와라우/애로우타운', name_en: 'Kawarau/Arrowtown', keywords: ['kawarau','카와라우','bungy','bungee','번지','arrowtown','애로우타운','remarkables','리마카블스'], x: 168.8233, y: -44.9824 },
    { name_ko: '밀포드 사운드', name_en: 'Milford Sound', keywords: ['milford','밀포드','fjord','피오르드'], x: 167.9270, y: -44.6413 }
  ];

  CITY_CLUSTERS.hongkong = [
    { name_ko: '센트럴/빅토리아 피크', name_en: 'Central/Victoria Peak', keywords: ['victoria peak','빅토리아 피크','peak tram','피크 트램','central','란콰이퐁','lan kwai'], x: 114.1549, y: 22.2759 },
    { name_ko: '침사추이/구룡', name_en: 'Tsim Sha Tsui/Kowloon', keywords: ['tsim sha tsui','침사추이','nathan','네이던','star avenue','wongtaisin','웡타이신'], x: 114.1721, y: 22.2940 },
    { name_ko: '몽콕/란타우', name_en: 'Mong Kok/Lantau', keywords: ['mong kok','몽콕','ladies market','레이디스','big buddha','대불','lantau','란타우','po lin'], x: 113.9050, y: 22.3232 }
  ];

  CITY_CLUSTERS.toronto = [
    { name_ko: 'CN 타워/다운타운', name_en: 'CN Tower/Downtown', keywords: ['cn tower','cn 타워','eaton','이턴','distillery','디스틸러리','rogers','ontario'], x: -79.3871, y: 43.6426 },
    { name_ko: '미드타운/요크빌', name_en: 'Midtown/Yorkville', keywords: ['rom','royal ontario','museum','casa loma','high park','kensington','켄싱턴'], x: -79.3947, y: 43.6677 },
    { name_ko: '나이아가라 (당일)', name_en: 'Niagara Falls (Day Trip)', keywords: ['niagara','나이아가라'], x: -79.0747, y: 43.0896 }
  ];

  CITY_CLUSTERS.shanghai = [
    { name_ko: '더 번드/와이탄', name_en: 'The Bund/Waitan', keywords: ['bund','번드','외탄','nanjing','난징','city god','people square','인민광장','shanghai museum'], x: 121.4897, y: 31.2382 },
    { name_ko: '푸둥/루자주이', name_en: 'Pudong/Lujiazui', keywords: ['pudong','푸둥','oriental pearl','동방명주','lujiazui','루자주이','financial'], x: 121.4998, y: 31.2399 },
    { name_ko: '신천지/예원', name_en: 'Xintiandi/Yu Garden', keywords: ['xintiandi','신천지','tianzifang','타이캉','yu garden','예원','zhujiajiao','주자자오'], x: 121.4697, y: 31.2270 }
  ];

  CITY_CLUSTERS.casablanca = [
    { name_ko: '하산 2세/구항구', name_en: 'Hassan II/Old Port', keywords: ['hassan','하산','mosque','모스크','medina','메디나','old medina','corniche','코른니쉬'], x: -7.6325, y: 33.6096 },
    { name_ko: '도심/무함마드 5세 광장', name_en: 'Downtown/Mohammed V Square', keywords: ["rick","릭스","mohammed","무함마드","casablanca","casablanca central","arab league","아랍"], x: -7.6209, y: 33.5946 }
  ];

  CITY_CLUSTERS.venice = [
    { name_ko: '산 마르코/리알토', name_en: "St. Mark's/Rialto", keywords: ['san marco','산 마르코','rialto','리알토',"doge's",'두칼레','basilica','campanile'], x: 12.3387, y: 45.4341 },
    { name_ko: '무라노/부라노', name_en: 'Murano/Burano Islands', keywords: ['murano','무라노','burano','부라노','glass','유리'], x: 12.3549, y: 45.4583 }
  ];

  CITY_CLUSTERS.florence = [
    { name_ko: '두오모/피렌체 시내', name_en: 'Duomo/Florence Center', keywords: ['uffizi','우피치','duomo','두오모','accademia','아카데미아','david','다비드','piazza','signoria','santa croce'], x: 11.2558, y: 43.7733 },
    { name_ko: '올트라르노/피티 궁전', name_en: "Oltrarno/Pitti Palace", keywords: ['ponte vecchio','폰테 베키오','pitti','피티','boboli','보볼리','piazzale michelangelo','미켈란젤로 광장','san miniato'], x: 11.2496, y: 43.7640 }
  ];

  CITY_CLUSTERS.sapporo = [
    { name_ko: '오도리/스스키노', name_en: 'Odori/Susukino', keywords: ['odori','오도리','tv tower','타워','susukino','스스키노','tanukikoji','다누키코지','clock tower','시계탑','former'], x: 141.3517, y: 43.0615 },
    { name_ko: '모에레누마/삿포로 교외', name_en: 'Moerenuma/Suburbs', keywords: ['moerenuma','모에레누마','maruyama','마루야마','beer museum','맥주 박물관','sapporo factory','hokkaido shrine','홋카이도 신궁'], x: 141.3648, y: 43.0749 }
  ];

  CITY_CLUSTERS.istanbul = [
    { name_ko: '술탄아흐메트/구시가', name_en: 'Sultanahmet/Old City', keywords: ['hagia sophia','아야소피아','blue mosque','블루 모스크','topkapi','톱카프','sultanahmet','grand bazaar','그랜드 바자르','cistern'], x: 28.9802, y: 41.0086 },
    { name_ko: '갈라타/베욜루', name_en: 'Galata/Beyoğlu', keywords: ['galata','갈라타','istiklal','이스티클랄','beyoglu','베욜루','taksim','탁심'], x: 28.9742, y: 41.0256 },
    { name_ko: '보스포루스/아시아', name_en: 'Bosphorus/Asian Side', keywords: ['bosphorus','보스포루스','dolmabahce','돌마바흐체','princes island','프린스 섬','ortakoy'], x: 29.0121, y: 41.0379 }
  ];

  CITY_CLUSTERS.milan = [
    { name_ko: '두오모/갈레리아', name_en: 'Duomo/Galleria', keywords: ['duomo','두오모','galleria','갈레리아','last supper','최후의 만찬','santa maria','castello','스포르체스코','montenapoleone'], x: 9.1919, y: 45.4641 },
    { name_ko: '나빌리/브레라', name_en: 'Navigli/Brera', keywords: ['navigli','나빌리','brera','브레라','canal','운하'], x: 9.1762, y: 45.4490 }
  ];

  CITY_CLUSTERS.houston = [
    { name_ko: '다운타운/뮤지엄 디스트릭트', name_en: 'Downtown/Museum District', keywords: ['museum','뮤지엄','buffalo bayou','버펄로','downtown','galleria','갤러리아','zoo'], x: -95.3731, y: 29.7604 },
    { name_ko: '스페이스 센터/케마', name_en: 'Space Center/Kemah', keywords: ['space center','스페이스 센터','nasa','나사','kemah','케마'], x: -95.0977, y: 29.5519 }
  ];

  CITY_CLUSTERS.rio = [
    { name_ko: '코파카바나/이파네마', name_en: 'Copacabana/Ipanema', keywords: ['copacabana','코파카바나','ipanema','이파네마','beach','해변','hippie','히피'], x: -43.1820, y: -22.9711 },
    { name_ko: '예수상/슈가로프', name_en: 'Christ/Sugarloaf', keywords: ['corcovado','코르코바도','christ','예수','sugarloaf','슈가로프','tijuca','티주카','forest'], x: -43.2105, y: -22.9519 },
    { name_ko: '산타 테레사/라파', name_en: 'Santa Teresa/Lapa', keywords: ['santa teresa','산타 테레사','lapa','라파','arches','churrascaria','마라카나'], x: -43.1926, y: -22.9088 }
  ];

  CITY_CLUSTERS.geneva = [
    { name_ko: '제 도/레만 호수', name_en: "Jet d'Eau/Lake Geneva", keywords: ["jet d'eau","제 도","jet d","lake geneva","레만","vieille ville","구시가","st pierre","cathedral","palais des nations","palace of nations","un"], x: 6.1553, y: 46.2068 },
    { name_ko: '생제르베/플랭팔레', name_en: 'St-Gervais/Plainpalais', keywords: ['patek','파텍','carouge','카루주','cern','세른'], x: 6.1423, y: 46.1979 }
  ];

  CITY_CLUSTERS.edinburgh = [
    { name_ko: '에딘버러 성/로열 마일', name_en: 'Edinburgh Castle/Royal Mile', keywords: ['edinburgh castle','에딘버러 성','royal mile','로열 마일','holyrood','holyrood','scotlands','national museum','greyfriars','victoria street','victoria'], x: -3.2001, y: 55.9486 },
    { name_ko: '아서스 시트/칼튼 힐', name_en: "Arthur's Seat/Calton Hill", keywords: ["arthur's seat",'아서스','holyrood park','princes street','princes','calton'], x: -3.1615, y: 55.9442 }
  ];

  // ---- EXTRA_CITIES_META cities: real geographic CITY_CLUSTERS ----
  var extraClusters = {
    stockholm:   [{ name_ko:'감라스탄/시청사',    name_en:'Gamla Stan/City Hall',       keywords:['gamla stan','감라','city hall','시청','vasa','바사','skansen','스칸센','djurgarden','djurgård'], x:18.0686, y:59.3293 }],
    brussels:    [{ name_ko:'그랑플라스/아토미움', name_en:'Grand Place/Atomium',         keywords:['grand place','그랑플라스','atomium','아토미움','manneken','마네켄','chocolate','초콜릿','galeries saint-hubert'], x:4.3517, y:50.8503 }],
    dublin:      [{ name_ko:'트리니티/성 패트릭',  name_en:'Trinity/Temple Bar',          keywords:['trinity','트리니티','guinness','기네스','phoenix','피닉스','temple bar','템플바','grafton'], x:-6.2603, y:53.3498 }],
    oslo:        [{ name_ko:'오페라/비겔란',       name_en:'Opera/Vigeland',              keywords:['opera','오페라','vigeland','비겔란','holmenkollen','홀멘','akershus','아케르브뤼게'], x:10.7522, y:59.9139 }],
    vienna:      [{ name_ko:'성 슈테판/링',        name_en:"St. Stephen's/Ring",          keywords:["st. stephen","슈테판","schonbrunn","쇤브룬","belvedere","벨베데레","prater","프라터","hofburg","opera","kartner"], x:16.3738, y:48.2082 }],
    copenhagen:  [{ name_ko:'뉘하운/아말리엔보르', name_en:'Nyhavn/Amalienborg',          keywords:['nyhavn','뉘하운','amalienborg','아말리엔','tivoli','티볼리','stroget','스트뢰에','round tower'], x:12.5683, y:55.6761 }],
    helsinki:    [{ name_ko:'헬싱키 대성당/수오멘린나',name_en:'Cathedral/Suomenlinna',  keywords:['cathedral','대성당','suomenlinna','수오멘린나','market square','마켓','esplanade','에스플러','kaivopuisto'], x:24.9384, y:60.1699 }],
    lisbon:      [{ name_ko:'벨렘/제로니무스',     name_en:'Belém/Jerónimos',             keywords:['jeronimos','제로니','belem','벨렘','tram','트램','alfama','알파마','mouraria','rua augusta'], x:-9.1393, y:38.7223 }],
    athens:      [{ name_ko:'아크로폴리스/플라카', name_en:'Acropolis/Plaka',             keywords:['acropolis','아크로폴리스','parthenon','파르테논','plaka','플라카','monastiraki','모나스티라키','lycabettus','national gardens'], x:23.7275, y:37.9838 }],
    jakarta:     [{ name_ko:'모나스/코타',         name_en:'Monas/Kota',                  keywords:['monas','모나스','kota','코타','taman mini','타만 미니','national monument','독립기념탑','suropati'], x:106.8456, y:-6.2088 }],
    mexicocity:  [{ name_ko:'소칼로/차풀테펙',    name_en:'Zócalo/Chapultepec',          keywords:['zocalo','소칼로','chapultepec','차풀테펙','teotihuacan','테오티우아칸','frida kahlo','la ciudadela'], x:-99.1332, y:19.4326 }],
    abudhabi:    [{ name_ko:'그랜드 모스크/코니시', name_en:'Grand Mosque/Corniche',      keywords:['grand mosque','그랜드 모스크','sheikh zayed','셰이크 자이드','corniche','코니시','ferrari world','yas mall','louvre'], x:54.3773, y:24.4539 }],
    manila:      [{ name_ko:'인트라무로스/리잘',   name_en:'Intramuros/Rizal Park',       keywords:['intramuros','인트라무로스','rizal','리잘','fort santiago','산티아고','sm mall of asia','monas'], x:120.9842, y:14.5995 }],
    hanoi:       [{ name_ko:'호안끼엠/구시가',     name_en:'Hoan Kiem/Old Quarter',       keywords:['hoan kiem','호안끼엠','old quarter','구시가','ho chi minh','호찌민','literature temple','동쑤언','dong xuan','bun cha'], x:105.8542, y:21.0285 }],
    kualalumpur: [{ name_ko:'페트로나스/부킷빈탕', name_en:'Petronas/Bukit Bintang',      keywords:['petronas','페트로나스','batu caves','바투 동굴','klcc','bukit bintang','부킷빈탕','jalan alor','pavilion'], x:101.6869, y:3.1390 }],
    bogota:      [{ name_ko:'몬세라테/황금박물관', name_en:'Monserrate/Museo del Oro',    keywords:['monserrate','몬세라테','gold museum','황금 박물관','simon bolivar','볼리바르','andino','안디노'], x:-74.0721, y:4.7110 }],
    santiago:    [{ name_ko:'산 크리스토발/산타 루시아',name_en:'San Cristobal/Santa Lucia',keywords:['san cristobal','산 크리스토발','santa lucia','산타 루시아','costanera','코스타네라','galindo','갈린도','plaza de armas'], x:-70.6693, y:-33.4489 }],
    bucharest:   [{ name_ko:'의회궁전/헤라스트라우', name_en:'Parliament/Herastrau',      keywords:['parliament','의회 궁전','palace of the parliament','herastrau','헤라스트라우','caru','카루','athenaeum','아테네움','obor'], x:26.1025, y:44.4268 }],
    lima:        [{ name_ko:'미라플로레스/리마 시내',name_en:'Miraflores/Lima Centro',    keywords:['miraflores','미라플로레스','larcomar','라르코마르','huaca','우아카 푸클라나','cathedral','대성당','la mar'], x:-77.0282, y:-12.0464 }],
    wellington:  [{ name_ko:'테 파파/케이블카',    name_en:'Te Papa/Cable Car',           keywords:['te papa','테 파파','cable car','케이블카','oriental bay','오리엔탈 베이','lambton','람튼 쿼이','fidels'], x:174.7762, y:-41.2865 }],
    luxembourg:  [{ name_ko:'보크 카제마트/구시가', name_en:'Bock Casemates/Old Town',    keywords:['bock','복 포르테','casemates','카제마트','notre-dame','노트르담','alzette','알제트','petrüsse','grand rue'], x:6.1319, y:49.6116 }],
    reykjavik:   [{ name_ko:'할그림스키르캬/블루라군',name_en:'Hallgrímskirkja/Blue Lagoon',keywords:['hallgrimskirkja','할드그림','blue lagoon','블루라군','golden circle','골든서클','geysir','게이시르','laugavegur','baejarins'], x:-21.8174, y:64.1466 }],
    amsterdam:   [{ name_ko:'반 고흐/담 광장',     name_en:'Van Gogh/Dam Square',         keywords:['van gogh','반 고흐','rijksmuseum','레이크스뮤지엄','anne frank','안네 프랑크','dam','담 광장','vondelpark','폰델'], x:4.9041, y:52.3676 }],
    moscow:      [{ name_ko:'붉은 광장/크렘린',    name_en:'Red Square/Kremlin',          keywords:['red square','붉은 광장','kremlin','크렘린','bolshoi','볼쇼이','tretyakov','트레티야코프','arbat','gorky'], x:37.6173, y:55.7558 }],
    buenosaires: [{ name_ko:'레콜레타/팔레르모',   name_en:'Recoleta/Palermo',            keywords:['recoleta','레콜레타','tango','탱고','teatro colon','콜론','palermo','팔레르모','san telmo','산 텔모','florida'], x:-58.3816, y:-34.6037 }],
    canberra:    [{ name_ko:'국회의사당/전쟁기념관', name_en:'Parliament/War Memorial',   keywords:['parliament','국회의사당','national gallery','국립갤러리','war memorial','전쟁기념관','burley griffin'], x:149.1300, y:-35.2809 }],
    ottawa:      [{ name_ko:'의회언덕/리도',        name_en:'Parliament Hill/Rideau',      keywords:['parliament','의회언덕','rideau','리도 운하','national gallery','국립갤러리','byward','바이워드'], x:-75.6972, y:45.4215 }],
    neworleans:  [{ name_ko:'프렌치 쿼터/다운타운', name_en:'French Quarter/Downtown', keywords:['french quarter','프렌치','bourbon','잭슨','jackson','café du monde','cafe du monde'], x:-90.0715, y:29.9511 }],
    doha:        [{ name_ko:'수크 와키프/웨스트 베이', name_en:'Souq Waqif/West Bay', keywords:['souq','수크','museum','박물관','doha','katara','카타라','pearl','펄'], x:51.5310, y:25.2854 }],
    lasvegas:    [{ name_ko:'라스베이거스 스트립', name_en:'Las Vegas Strip', keywords:['strip','스트립','bellagio','벨라지오','caesar','시저스','fremont','프리몬트'], x:-115.1398, y:36.1716 }],
    losangeles:  [{ name_ko:'할리우드/산타모니카', name_en:'Hollywood/Santa Monica', keywords:['hollywood','할리우드','griffith','그리피스','universal','유니버설','santa monica','산타모니카','venice','베니스','getty','게티'], x:-118.2437, y:34.0522 }],
    riyadh:      [{ name_ko:'디리야/킹덤 센터', name_en:'Diriyah/Kingdom Centre', keywords:['diriyah','디리야','kingdom','킹덤','masmak','마스막','national museum'], x:46.6753, y:24.7136 }],
    madrid:      [{ name_ko:'솔 광장/프라도 미술관', name_en:'Puerta del Sol/Prado', keywords:['sol','솔','prado','프라도','royal palace','왕궁','retiro','레티로','gran via','그란비아'], x:-3.7038, y:40.4168 }],
    miami:       [{ name_ko:'마이애미 비치/사우스 비치', name_en:'Miami Beach/South Beach', keywords:['miami beach','마이애미 비치','south beach','사우스 비치','wynwood','윈우드','vizcaya','비즈카야','bayside'], x:-80.1918, y:25.7617 }],
    monaco:      [{ name_ko:'몬테카를로 카지노/항구', name_en:'Monte Carlo/Harbour', keywords:['monte carlo','몬테카를로','casino','카지노','palace','왕궁','larvotto','라르보토'], x:7.4246, y:43.7384 }],
    warsaw:      [{ name_ko:'올드 타운/문화과학궁전', name_en:'Old Town/Palace of Culture', keywords:['old town','올드타운','royal castle','왕궁','culture','문화과학','lazienki','와젠키','chopin','쇼팽'], x:21.0122, y:52.2297 }],
    bali:        [{ name_ko:'우붓/꾸타 비치', name_en:'Ubud/Kuta Beach', keywords:['ubud','우붓','kuta','꾸타','uluwatu','울루와투','tanah lot','따나롯','seminyak','스미냑'], x:115.1889, y:-8.4095 }],
    bern:        [{ name_ko:'베른 올드타운/곰 공원', name_en:'Bern Old Town/Bear Pit', keywords:['old town','올드타운','clock tower','시계탑','zytglogge','cathedral','대성당','bear','곰','bundeshaus'], x:7.4474, y:46.9480 }],
    berlin:      [{ name_ko:'브란덴부르크/체크포인트 찰리', name_en:'Brandenburg/Checkpoint Charlie', keywords:['brandenburg','브란덴부르크','reichstag','의사당','checkpoint','체크포인트','pergamon','페르가몬','museum island','박물관 섬','kurfurstendamm'], x:13.4050, y:52.5200 }],
    boston:      [{ name_ko:'프리덤 트레일/하버드', name_en:'Freedom Trail/Harvard', keywords:['freedom trail','프리덤','common','보스턴 커먼','quincy','퀸시','harvard','하버드','mit','museum of fine arts'], x:-71.0589, y:42.3601 }],
    budapest:    [{ name_ko:'국회의사당/세체니 온천', name_en:'Parliament/Szechenyi', keywords:['parliament','국회의사당','buda castle','부다성','fisherman','어부','szechenyi','세체니','gellert','겔레르트','chain bridge'], x:19.0402, y:47.4979 }],
    sandiego:    [{ name_ko:'발보아 파크/코로나도', name_en:'Balboa Park/Coronado', keywords:['balboa','발보아','coronado','코로나도','gaslamp','가스램프','zoo','동물원','la jolla','라호야'], x:-117.1611, y:32.7157 }],
    sanfrancisco:[{ name_ko:'금문교/피셔맨스 워프', name_en:'Golden Gate/Fisherman\'s Wharf', keywords:['golden gate','금문교','fisherman','피셔맨스','alcatraz','알카트라즈','union square','유니온','lombard','롬바드'], x:-122.4194, y:37.7749 }],
    seattle:     [{ name_ko:'스페이스 니들/파이크 플레이스', name_en:'Space Needle/Pike Place', keywords:['space needle','스페이스 니들','pike place','파이크','chihuly','치훌리','museum of flight','비행기'], x:-122.3321, y:47.6062 }],
    chicago:     [{ name_ko:'밀레니엄 파크/네이비 피어', name_en:'Millennium Park/Navy Pier', keywords:['millennium','밀레니엄','bean','클라우드','art institute','미술관','navy pier','네이비','willis','윌리스'], x:-87.6298, y:41.8781 }],
    addis_ababa: [{ name_ko:'국립박물관/메르카토', name_en:'National Museum/Mercato', keywords:['national museum','국립','lucy','루시','mercato','메르카토','entoto','엔토토','holy trinity'], x:38.7400, y:9.0300 }],
    ankara:      [{ name_ko:'아타튀르크 묘역/성채', name_en:'Anitkabir/Citadel', keywords:['anitkabir','아타튀르크','citadel','성채','museum of anatolian','아나톨리아'], x:32.8597, y:39.9334 }],
    orlando:     [{ name_ko:'디즈니월드/유니버설', name_en:'Disney World/Universal', keywords:['disney','디즈니','universal','유니버설','epcot','앱콧','sea world','씨월드'], x:-81.3792, y:28.5383 }],
    washington:  [{ name_ko:'내셔널 몰/백악관', name_en:'National Mall/White House', keywords:['national mall','내셔널 몰','white house','백악관','capitol','국회의사당','lincoln','링컨','smithsonian','스미소니언'], x:-77.0369, y:38.9072 }],
    cancun:      [{ name_ko:'호텔 존/치첸 이샤', name_en:'Hotel Zone/Chichen Itza', keywords:['hotel zone','호텔존','beach','해변','chichen','치첸','tulum','툴룸','isla mujeres','여인'], x:-86.8515, y:21.1619 }],
    quito:       [{ name_ko:'올드 타운/적도 기념비', name_en:'Old Town/Equator Monument', keywords:['old town','올드타운','basilica','바실리카','teleferico','케이블카','mitad del mundo','적도'], x:-78.4678, y:-0.1807 }],
    taipei:      [{ name_ko:'타이베이 101/시먼딩', name_en:'Taipei 101/Ximending', keywords:['taipei 101','타이베이','ximending','시먼딩','shilin','스린','jiufen','지우펀','national palace','고궁'], x:121.5654, y:25.0330 }],
    hawaii:      [{ name_ko:'와이키키/다이아몬드 헤드', name_en:'Waikiki/Diamond Head', keywords:['waikiki','와이키키','diamond head','다이아몬드','pearl harbor','진주만','hanauma','하나우마','north shore'], x:-157.8583, y:21.3069 }]
  };
  Object.keys(extraClusters).forEach(function(cid) {
    if (_CITIES_REMOVE_IDS.indexOf(cid) !== -1) return;
    if (!CITY_CLUSTERS[cid]) CITY_CLUSTERS[cid] = extraClusters[cid];
  });

});

