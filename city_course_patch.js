// WanderSync curated city/course patch.
// Loaded after the base mock data and before the planner engine.
(function () {
  if (typeof CITIES === 'undefined' || typeof ATTRACTIONS === 'undefined') return;

  var removedIds = ['quito', 'riyadh', 'addis_ababa', 'bogota', 'jakarta', 'canberra', 'manila', 'doha', 'luxembourg'];
  for (var i = CITIES.length - 1; i >= 0; i--) {
    if (removedIds.indexOf(CITIES[i].id) !== -1) CITIES.splice(i, 1);
  }
  removedIds.forEach(function (id) {
    delete ATTRACTIONS[id];
    if (typeof CITY_CLUSTERS !== 'undefined') delete CITY_CLUSTERS[id];
  });

  function hasCity(id) {
    return CITIES.some(function (city) { return city.id === id; });
  }

  function addCity(city) {
    if (!hasCity(city.id)) CITIES.push(city);
  }

  addCity({ id: 'busan', name_ko: '부산', name_en: 'Busan', country_ko: '한국', country_en: 'South Korea', desc_ko: '바다, 시장, 산복도로 야경이 어우러진 한국 대표 항구 도시', desc_en: 'South Korea coastal city of beaches, markets, temples, and harbor views.' });
  addCity({ id: 'nice', name_ko: '니스', name_en: 'Nice', country_ko: '프랑스', country_en: 'France', desc_ko: '프렌치 리비에라의 해변 산책로와 구시가지가 빛나는 지중해 도시', desc_en: 'French Riviera city with Mediterranean promenades, old town lanes, and museums.' });

  if (typeof CITY_CLUSTERS !== 'undefined') {
    CITY_CLUSTERS.busan = CITY_CLUSTERS.busan || [
      { name_ko: '해운대/동백섬', name_en: 'Haeundae/Dongbaekseom', keywords: ['haeundae', '해운대', 'dongbaek', '동백섬', 'the bay 101'], x: 129.1587, y: 35.1587 },
      { name_ko: '남포동/감천', name_en: 'Nampo/Gamcheon', keywords: ['jagalchi', '자갈치', 'gamcheon', '감천', 'biff', '용두산', 'busan tower'], x: 129.0325, y: 35.0975 },
      { name_ko: '광안리/해동용궁사', name_en: 'Gwangalli/Yonggungsa', keywords: ['gwangalli', '광안리', 'gwangan', '광안대교', 'yonggungsa', '용궁사'], x: 129.1186, y: 35.1532 }
    ];
    CITY_CLUSTERS.nice = CITY_CLUSTERS.nice || [
      { name_ko: '영국인의 산책로/구시가지', name_en: 'Promenade/Old Nice', keywords: ['promenade', 'anglais', '영국인의 산책로', 'old nice', 'vieux nice', '구시가지', 'cours saleya'], x: 7.2656, y: 43.6953 },
      { name_ko: '샤토 언덕/시미에', name_en: 'Castle Hill/Cimiez', keywords: ['castle hill', 'colline du chateau', '샤토', 'cimiez', '시미에', 'matisse', 'chagall'], x: 7.2797, y: 43.6990 }
    ];
  }

  function ensurePools(cityId) {
    if (!ATTRACTIONS[cityId]) {
      ATTRACTIONS[cityId] = { healing: [], gourmet: [], culture: [], activity: [], shopping: [] };
    }
    ['healing', 'gourmet', 'culture', 'activity', 'shopping'].forEach(function (cat) {
      if (!Array.isArray(ATTRACTIONS[cityId][cat])) ATTRACTIONS[cityId][cat] = [];
    });
    return ATTRACTIONS[cityId];
  }

  function textKey(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9가-힣]+/g, ' ').trim();
  }

  function addEntries(cityId, entries) {
    var pools = ensurePools(cityId);
    entries.forEach(function (entry, idx) {
      var cat = entry.cat || 'culture';
      if (!Array.isArray(pools[cat])) pools[cat] = [];
      var key = textKey(entry.en || entry.ko);
      var existing = pools[cat].find(function (item) {
        return textKey(item.name_en || item.name_ko) === key;
      });
      if (existing) {
        existing.priorityRank = Math.min(Number(existing.priorityRank) || 5000, entry.rank || (100 + idx));
        existing.isLandmark = existing.isLandmark || entry.landmark !== false;
        existing.duration = Math.max(Number(existing.duration) || 0, entry.dur || 120);
        if (Number.isFinite(entry.x) && Number.isFinite(entry.y)) {
          existing.x = entry.x;
          existing.y = entry.y;
        } else {
          delete existing.x;
          delete existing.y;
        }
        existing.curatedEssential = true;
        return;
      }
      pools[cat].push({
        name_ko: entry.ko,
        name_en: entry.en,
        duration: entry.dur || 120,
        isLandmark: entry.landmark !== false,
        priorityRank: entry.rank || (100 + idx),
        x: entry.x,
        y: entry.y,
        open: entry.open || 540,
        close: entry.close || 1200,
        desc_ko: entry.desc_ko || entry.ko + '을(를) 중심으로 실제 방문 동선에 맞춰 관람하는 대표 일정입니다.',
        desc_en: entry.desc_en || 'A real, city-specific sightseeing stop planned around visitor-friendly routing.',
        curatedEssential: true
      });
    });
    ['healing', 'culture', 'activity', 'shopping'].forEach(function (cat) {
      pools[cat].sort(function (a, b) {
        return (Number(a.priorityRank) || 5000) - (Number(b.priorityRank) || 5000);
      });
    });
  }

  var E = {
    busan: [
      { cat: 'healing', ko: '해운대 해변과 동백섬 산책', en: 'Haeundae Beach & Dongbaekseom Walk', dur: 150, rank: 1, x: 129.1587, y: 35.1587 },
      { cat: 'culture', ko: '감천문화마을 골목 산책', en: 'Gamcheon Culture Village', dur: 150, rank: 2, x: 129.0106, y: 35.0974 },
      { cat: 'healing', ko: '광안리 해변과 광안대교 전망', en: 'Gwangalli Beach & Gwangan Bridge View', dur: 120, rank: 3, x: 129.1186, y: 35.1532 },
      { cat: 'culture', ko: '해동용궁사 해안 사찰', en: 'Haedong Yonggungsa Temple', dur: 150, rank: 4, x: 129.2232, y: 35.1883 },
      { cat: 'shopping', ko: '자갈치시장과 BIFF 광장', en: 'Jagalchi Market & BIFF Square', dur: 150, rank: 5, x: 129.0306, y: 35.0967 },
      { cat: 'culture', ko: '부산타워와 용두산공원', en: 'Busan Tower & Yongdusan Park', dur: 100, rank: 6, x: 129.0324, y: 35.1010 },
      { cat: 'activity', ko: '송도해상케이블카', en: 'Songdo Marine Cable Car', dur: 120, rank: 7, x: 129.0167, y: 35.0769 },
      { cat: 'healing', ko: '태종대 해안 절벽 산책', en: 'Taejongdae Coastal Park', dur: 180, rank: 8, x: 129.0799, y: 35.0538 },
      { cat: 'shopping', ko: '전포카페거리와 서면 산책', en: 'Jeonpo Cafe Street & Seomyeon Walk', dur: 100, rank: 9, x: 129.0636, y: 35.1577 },
      { cat: 'culture', ko: '범어사 고찰 관람', en: 'Beomeosa Temple', dur: 150, rank: 10, x: 129.0685, y: 35.2840 }
    ],
    nice: [
      { cat: 'healing', ko: '영국인의 산책로 해변 산책', en: 'Promenade des Anglais', dur: 150, rank: 1, x: 7.2656, y: 43.6953 },
      { cat: 'culture', ko: '니스 구시가지 비유 니스', en: 'Vieux Nice Old Town', dur: 150, rank: 2, x: 7.2760, y: 43.6976 },
      { cat: 'healing', ko: '샤토 언덕 전망대', en: 'Castle Hill of Nice', dur: 120, rank: 3, x: 7.2808, y: 43.6974 },
      { cat: 'shopping', ko: '쿠르 살레야 꽃시장', en: 'Cours Saleya Market', dur: 90, rank: 4, x: 7.2763, y: 43.6956 },
      { cat: 'culture', ko: '마티스 미술관', en: 'Musee Matisse', dur: 150, rank: 5, x: 7.2760, y: 43.7190 },
      { cat: 'culture', ko: '마르크 샤갈 국립미술관', en: 'Marc Chagall National Museum', dur: 150, rank: 6, x: 7.2690, y: 43.7090 },
      { cat: 'culture', ko: '마세나 광장과 장 메드생 거리', en: 'Place Massena & Avenue Jean Medecin', dur: 100, rank: 7, x: 7.2708, y: 43.6979 },
      { cat: 'culture', ko: '니스 러시아 정교회 대성당', en: 'St Nicholas Orthodox Cathedral Nice', dur: 90, rank: 8, x: 7.2531, y: 43.7039 },
      { cat: 'healing', ko: '시미에 수도원 정원', en: 'Cimiez Monastery Garden', dur: 90, rank: 9, x: 7.2767, y: 43.7198 },
      { cat: 'activity', ko: '에즈와 모나코 당일치기', en: 'Eze & Monaco Day Trip', dur: 480, rank: 40, x: 7.3619, y: 43.7278, desc_ko: '니스 후반부 일정에 어울리는 에즈 마을과 모나코 근교 하루 코스입니다.', desc_en: 'A full-day side trip from Nice to Eze village and Monaco.' }
    ],
    london: [
      { cat: 'culture', ko: '버킹엄 궁전과 근위병 교대', en: 'Buckingham Palace & Changing of the Guard', dur: 120, rank: 1 },
      { cat: 'culture', ko: '타워 오브 런던', en: 'Tower of London', dur: 210, rank: 2 },
      { cat: 'culture', ko: '웨스트민스터 사원과 국회의사당', en: 'Westminster Abbey & Houses of Parliament', dur: 180, rank: 3 },
      { cat: 'culture', ko: '대영박물관', en: 'British Museum', dur: 240, rank: 4 },
      { cat: 'activity', ko: '런던 아이 전망대', en: 'London Eye', dur: 90, rank: 5 },
      { cat: 'culture', ko: '내셔널 갤러리', en: 'The National Gallery London', dur: 180, rank: 6 },
      { cat: 'healing', ko: '하이드 파크와 켄싱턴 가든', en: 'Hyde Park & Kensington Gardens', dur: 120, rank: 7 },
      { cat: 'shopping', ko: '코벤트 가든과 소호 산책', en: 'Covent Garden & Soho Walk', dur: 150, rank: 8 }
    ],
    paris: [
      { cat: 'culture', ko: '루브르 박물관', en: 'Louvre Museum', dur: 240, rank: 1 },
      { cat: 'culture', ko: '에펠탑과 트로카데로 전망', en: 'Eiffel Tower & Trocadero View', dur: 150, rank: 2 },
      { cat: 'culture', ko: '개선문과 샹젤리제', en: 'Arc de Triomphe & Champs-Elysees', dur: 120, rank: 3 },
      { cat: 'culture', ko: '팡테옹', en: 'Pantheon Paris', dur: 120, rank: 4 },
      { cat: 'culture', ko: '노트르담 대성당과 시테섬', en: 'Notre-Dame Cathedral & Ile de la Cite', dur: 150, rank: 5 },
      { cat: 'culture', ko: '오르세 미술관', en: 'Musee d Orsay', dur: 210, rank: 6 },
      { cat: 'culture', ko: '몽마르트르와 사크레쾨르 대성당', en: 'Montmartre & Sacre-Coeur Basilica', dur: 180, rank: 7 },
      { cat: 'healing', ko: '뤽상부르 공원 산책', en: 'Luxembourg Gardens', dur: 90, rank: 8 }
    ],
    seoul: [
      { cat: 'culture', ko: '경복궁과 광화문', en: 'Gyeongbokgung Palace & Gwanghwamun', dur: 210, rank: 1 },
      { cat: 'culture', ko: '북촌한옥마을', en: 'Bukchon Hanok Village', dur: 120, rank: 2 },
      { cat: 'activity', ko: '롯데타워 서울스카이 전망대', en: 'Lotte Tower Seoul Sky Observatory', dur: 120, rank: 3 },
      { cat: 'healing', ko: '한강공원 피크닉', en: 'Hangang Park Picnic', dur: 150, rank: 4 },
      { cat: 'culture', ko: '창덕궁 후원', en: 'Changdeokgung Secret Garden', dur: 180, rank: 5 },
      { cat: 'culture', ko: '국립중앙박물관', en: 'National Museum of Korea', dur: 240, rank: 6 },
      { cat: 'activity', ko: 'N서울타워 전망대', en: 'N Seoul Tower Observatory', dur: 120, rank: 7 }
    ],
    newyork: [
      { cat: 'culture', ko: '자유의 여신상과 엘리스섬', en: 'Statue of Liberty & Ellis Island', dur: 300, rank: 1 },
      { cat: 'healing', ko: '센트럴파크', en: 'Central Park', dur: 180, rank: 2 },
      { cat: 'culture', ko: '메트로폴리탄 미술관', en: 'The Metropolitan Museum of Art', dur: 240, rank: 3 },
      { cat: 'activity', ko: '엠파이어 스테이트 빌딩 전망대', en: 'Empire State Building Observatory', dur: 120, rank: 4 },
      { cat: 'shopping', ko: '타임스퀘어와 브로드웨이', en: 'Times Square & Broadway', dur: 120, rank: 5 },
      { cat: 'healing', ko: '브루클린 브리지와 덤보', en: 'Brooklyn Bridge & DUMBO', dur: 150, rank: 6 },
      { cat: 'culture', ko: '9/11 메모리얼과 박물관', en: '9/11 Memorial & Museum', dur: 180, rank: 7 },
      { cat: 'healing', ko: '하이라인과 첼시마켓', en: 'High Line & Chelsea Market', dur: 150, rank: 8 }
    ],
    hongkong: [
      { cat: 'activity', ko: '빅토리아 피크와 피크트램', en: 'Victoria Peak & Peak Tram', dur: 180, rank: 1 },
      { cat: 'healing', ko: '스타페리와 침사추이 산책로', en: 'Star Ferry & Tsim Sha Tsui Promenade', dur: 120, rank: 2 },
      { cat: 'culture', ko: '란타우 천단대불과 포린사', en: 'Tian Tan Buddha & Po Lin Monastery', dur: 300, rank: 3 },
      { cat: 'culture', ko: '홍콩 고궁박물관', en: 'Hong Kong Palace Museum', dur: 180, rank: 4 },
      { cat: 'culture', ko: '만모사원', en: 'Man Mo Temple', dur: 80, rank: 5 },
      { cat: 'shopping', ko: '몽콕 레이디스 마켓', en: 'Mong Kok Ladies Market', dur: 120, rank: 6 },
      { cat: 'healing', ko: '스탠리 마켓과 해변', en: 'Stanley Market & Beach', dur: 150, rank: 7 },
      { cat: 'culture', ko: '\uC6E1\uD0C0\uC774\uC2E0 \uC0AC\uC6D0', en: 'Wong Tai Sin Temple', dur: 90, rank: 8, x: 114.1931, y: 22.3420, desc_ko: '\uD64D\uCF69\uC758 \uB300\uD45C \uB3C4\uAD50 \uC0AC\uC6D0\uC744 \uC2E4\uC81C \uBC29\uBB38 \uB3D9\uC120\uC5D0 \uB9DE\uCDB0 \uAD00\uB78C\uD558\uB294 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A real Hong Kong temple visit at Wong Tai Sin Temple.' },
      { cat: 'healing', ko: '\uB09C\uB9AC\uC548 \uAC00\uB4E0\uACFC \uCE58\uB9B0 \uC218\uB140\uC6D0', en: 'Nan Lian Garden & Chi Lin Nunnery', dur: 150, rank: 9, x: 114.2040, y: 22.3401, desc_ko: '\uB2E4\uC774\uC544\uBAAC\uB4DC\uD790\uC758 \uC911\uAD6D\uC2DD \uC815\uC6D0\uACFC \uC218\uB140\uC6D0\uC744 \uD568\uAED8 \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A quiet garden and nunnery route in Diamond Hill.' },
      { cat: 'activity', ko: '\uB4DC\uB798\uACE4\uC2A4 \uBC31 \uD558\uC774\uD0B9', en: "Dragon's Back Hike", dur: 180, rank: 10, x: 114.2456, y: 22.2367, desc_ko: '\uD64D\uCF69\uC12C \uB3D9\uCABD\uC758 \uBC14\uB2E4 \uC804\uB9DD\uC744 \uBCF4\uB294 \uB300\uD45C \uD558\uC774\uD0B9 \uCF54\uC2A4\uC785\uB2C8\uB2E4.', desc_en: 'A classic Hong Kong Island ridge hike with coastal views.' },
      { cat: 'culture', ko: '\uD0C0\uC774\uD034 \uD5E4\uB9AC\uD2F0\uC9C0 \uC544\uD2B8 \uC13C\uD130', en: 'Tai Kwun Centre for Heritage and Arts', dur: 150, rank: 11, x: 114.1547, y: 22.2818, desc_ko: '\uC911\uC559 \uC9C0\uAD6C\uC758 \uBCF5\uD569 \uC720\uC0B0\uACFC \uD604\uB300 \uC608\uC220 \uACF5\uAC04\uC744 \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A real heritage and contemporary arts complex in Central Hong Kong.' },
      { cat: 'shopping', ko: 'PMQ\uC640 \uC18C\uD638 \uC0B0\uCC45', en: 'PMQ & Soho Central Walk', dur: 120, rank: 12, x: 114.1527, y: 22.2836, desc_ko: '\uB514\uC790\uC778 \uC0F5\uACFC \uAC24\uB7EC\uB9AC\uAC00 \uBAA8\uC778 PMQ, \uC18C\uD638 \uACE8\uBAA9\uC744 \uD568\uAED8 \uAC77\uB294 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A Central route through PMQ design shops and Soho lanes.' },
      { cat: 'culture', ko: '\uD64D\uCF69 \uC5ED\uC0AC\uBC15\uBB3C\uAD00', en: 'Hong Kong Museum of History', dur: 180, rank: 13, x: 114.1771, y: 22.3015, desc_ko: '\uD64D\uCF69\uC758 \uC5ED\uC0AC\uC640 \uB3C4\uC2DC \uBB38\uD654\uB97C \uD55C\uBC88\uC5D0 \uBCF4\uB294 \uB300\uD45C \uBC15\uBB3C\uAD00 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A major museum covering Hong Kong history and urban culture.' },
      { cat: 'culture', ko: 'M+\uC640 \uC6E8\uC2A4\uD2B8 \uCF54\uC6B8\uB8EC \uC544\uD2B8\uD30C\uD06C', en: 'M+ Museum & West Kowloon Art Park', dur: 180, rank: 14, x: 114.1586, y: 22.3029, desc_ko: '\uD604\uB300 \uC2DC\uAC01\uBB38\uD654 \uBBF8\uC220\uAD00 M+\uC640 \uC11C\uAD6C\uB8E1 \uD574\uBCC0 \uACF5\uC6D0\uC744 \uC5F0\uACB0\uD55C \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A real West Kowloon route combining M+ and the waterfront art park.' },
      { cat: 'healing', ko: '\uC0AC\uC774\uACF5 \uD574\uBCC0\uACFC \uC2DC\uD478\uB4DC \uAC70\uB9AC', en: 'Sai Kung Waterfront & Seafood Street', dur: 180, rank: 15, x: 114.2734, y: 22.3814, desc_ko: '\uC0AC\uC774\uACF5 \uD574\uBCC0 \uC0B0\uCC45\uACFC \uC2DC\uD478\uB4DC \uAC70\uB9AC\uB97C \uD568\uAED8 \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A real waterfront and seafood-street route in Sai Kung.' },
      { cat: 'activity', ko: '\uB78C\uB9C8\uC12C \uD558\uC774\uD0B9\uACFC \uC6A9\uC218\uC644 \uC0B0\uCC45', en: 'Lamma Island Trail & Yung Shue Wan', dur: 240, rank: 18, x: 114.1121, y: 22.2256, desc_ko: '\uD64D\uCF69 \uADFC\uAD50\uC12C \uB78C\uB9C8\uC12C\uC5D0\uC11C \uD558\uC774\uD0B9\uACFC \uB9C8\uC744 \uC0B0\uCC45\uC744 \uC5F0\uACB0\uD558\uB294 \uBC18\uC77C \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A half-day Hong Kong island walk on Lamma Island and Yung Shue Wan.' },
      { cat: 'activity', ko: '\uD64D\uCF69 \uB514\uC988\uB2C8\uB79C\uB4DC \uC62C\uB370\uC774', en: 'Hong Kong Disneyland Full-Day Visit', dur: 480, rank: 35, x: 114.0413, y: 22.3129, open: 600, close: 1320, desc_ko: '\uB780\uD0C0\uC6B0\uC12C\uC758 \uD64D\uCF69 \uB514\uC988\uB2C8\uB79C\uB4DC\uB97C \uD558\uB8E8\uB85C \uC7A1\uB294 \uC2E4\uC81C \uD14C\uB9C8\uD30C\uD06C \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A full-day visit to Hong Kong Disneyland on Lantau Island.' },
      { cat: 'activity', ko: '\uC624\uC158\uD30C\uD06C \uD64D\uCF69 \uC62C\uB370\uC774', en: 'Ocean Park Hong Kong Full-Day Visit', dur: 420, rank: 36, x: 114.1740, y: 22.2466, open: 600, close: 1200, desc_ko: '\uC544\uD06C\uC544\uB9AC\uC6C0\uACFC \uC5B4\uD2B8\uB799\uC158\uC744 \uD568\uAED8 \uC990\uAE30\uB294 \uD64D\uCF69 \uB300\uD45C \uD14C\uB9C8\uD30C\uD06C \uC77C\uC815\uC785\uB2C8\uB2E4.', desc_en: 'A full-day theme park and aquarium visit at Ocean Park Hong Kong.' },
      { cat: 'activity', ko: '\uB9C8\uCE74\uC624 \uC5ED\uC0AC \uC9C0\uAD6C \uB2F9\uC77C\uCE58\uAE30', en: 'Macau Historic Centre Day Trip', dur: 540, rank: 45, x: 113.5439, y: 22.1987, open: 480, close: 1260, desc_ko: '\uD64D\uCF69\uC5D0\uC11C \uC774\uB3D9\uD574 \uB9C8\uCE74\uC624 \uC5ED\uC0AC \uC9C0\uAD6C\uC640 \uC138\uB098\uB3C4 \uAD11\uC7A5\uC744 \uB458\uB7EC\uBCF4\uB294 \uD558\uB8E8 \uCF54\uC2A4\uC785\uB2C8\uB2E4.', desc_en: 'A full-day side trip from Hong Kong to Macau Historic Centre and Senado Square.' },
      { cat: 'activity', ko: '\uC120\uC804 OCT \uB85C\uD504\uD2B8\uC640 \uC2DC\uB0B4 \uB2F9\uC77C\uCE58\uAE30', en: 'Shenzhen OCT Loft & City Day Trip', dur: 480, rank: 46, x: 113.9870, y: 22.5400, open: 480, close: 1260, desc_ko: '\uD64D\uCF69\uC5D0\uC11C \uC120\uC804\uC73C\uB85C \uC774\uB3D9\uD574 OCT \uB85C\uD504\uD2B8\uC640 \uC2DC\uB0B4\uB97C \uB458\uB7EC\uBCF4\uB294 \uADFC\uAD50 \uD558\uB8E8 \uCF54\uC2A4\uC785\uB2C8\uB2E4.', desc_en: 'A full-day side trip from Hong Kong to Shenzhen OCT Loft and the city centre.' }
    ],
    tokyo: [
      { cat: 'culture', ko: '센소지와 아사쿠사', en: 'Senso-ji Temple & Asakusa', dur: 150, rank: 1 },
      { cat: 'shopping', ko: '시부야 스크램블 교차로', en: 'Shibuya Scramble Crossing', dur: 90, rank: 2 },
      { cat: 'culture', ko: '메이지 신궁', en: 'Meiji Shrine', dur: 120, rank: 3 },
      { cat: 'activity', ko: '도쿄 스카이트리 전망대', en: 'Tokyo Skytree', dur: 120, rank: 4 },
      { cat: 'culture', ko: '도쿄국립박물관', en: 'Tokyo National Museum', dur: 210, rank: 5 },
      { cat: 'activity', ko: '팀랩 플래닛 도쿄', en: 'teamLab Planets Tokyo', dur: 150, rank: 6 },
      { cat: 'shopping', ko: '긴자 쇼핑 거리', en: 'Ginza Shopping District', dur: 150, rank: 7 },
      { cat: 'healing', ko: '신주쿠 교엔', en: 'Shinjuku Gyoen National Garden', dur: 120, rank: 8 }
    ]
  };

  var more = {
    amsterdam: ['Rijksmuseum|레이크스미술관', 'Van Gogh Museum|반 고흐 미술관', 'Anne Frank House|안네 프랑크의 집', 'Amsterdam Canal Cruise|암스테르담 운하 크루즈', 'Dam Square|담 광장', 'Vondelpark|폰델파크'],
    dublin: ['Trinity College and Book of Kells|트리니티 칼리지와 켈스의 서', 'Dublin Castle|더블린 성', 'Guinness Storehouse|기네스 스토어하우스', 'St Patrick Cathedral|성 패트릭 대성당', 'Kilmainham Gaol|킬메이넘 감옥', 'Phoenix Park|피닉스 파크', 'National Museum of Ireland Archaeology|아일랜드 국립고고학박물관', 'EPIC The Irish Emigration Museum|에픽 아일랜드 이민 박물관'],
    athens: ['Acropolis and Parthenon|아크로폴리스와 파르테논', 'Acropolis Museum|아크로폴리스 박물관', 'Ancient Agora of Athens|아테네 고대 아고라', 'Plaka Neighborhood|플라카 지구', 'Panathenaic Stadium|파나티나이코 스타디움', 'National Archaeological Museum Athens|아테네 국립고고학박물관'],
    abudhabi: ['Sheikh Zayed Grand Mosque|셰이크 자이드 그랜드 모스크', 'Louvre Abu Dhabi|루브르 아부다비', 'Qasr Al Watan|카스르 알 와탄', 'Abu Dhabi Corniche|아부다비 코니시', 'Qasr Al Hosn|카스르 알 호슨', 'Heritage Village Abu Dhabi|아부다비 헤리티지 빌리지', 'Mangrove National Park Abu Dhabi|아부다비 맹그로브 국립공원', 'Emirates Palace|에미리트 팰리스'],
    warsaw: ['Warsaw Old Town Market Square|바르샤바 구시가지 광장', 'Royal Castle Warsaw|바르샤바 왕궁', 'Lazienki Park|와지엔키 공원', 'POLIN Museum|폴린 유대인 역사박물관', 'Palace of Culture and Science|문화과학궁전', 'Wilanow Palace|빌라누프 궁전'],
    bali: ['Ubud Monkey Forest|우붓 원숭이 숲', 'Tegallalang Rice Terrace|뜨갈랄랑 계단식 논', 'Uluwatu Temple|울루와뚜 사원', 'Tanah Lot Temple|따나롯 사원', 'Seminyak Beach|스미냑 해변', 'Tirta Empul Temple|티르타 엠풀 사원'],
    moscow: ['Red Square Moscow|모스크바 붉은 광장', 'Moscow Kremlin|모스크바 크렘린', 'Saint Basil Cathedral|성 바실리 대성당', 'Bolshoi Theatre|볼쇼이 극장', 'State Tretyakov Gallery|트레티야코프 미술관', 'Gorky Park Moscow|고리키 공원', 'Pushkin State Museum of Fine Arts|푸시킨 미술관', 'VDNKh Exhibition Centre|베데엔하 전시장'],
    oslo: ['Oslo Opera House|오슬로 오페라 하우스', 'MUNCH Museum|뭉크 미술관', 'Akershus Fortress|아케르스후스 요새', 'Vigeland Sculpture Park|비겔란 조각공원', 'Fram Museum|프람 박물관', 'Holmenkollen Ski Museum|홀멘콜렌 스키 박물관', 'National Museum Oslo|오슬로 국립미술관', 'Royal Palace Oslo|오슬로 왕궁'],
    stockholm: ['Gamla Stan|감라스탄', 'Vasa Museum|바사 박물관', 'Stockholm City Hall|스톡홀름 시청사', 'Skansen Open-Air Museum|스칸센 야외박물관', 'ABBA The Museum|아바 박물관', 'Royal Palace Stockholm|스톡홀름 왕궁', 'Fotografiska Stockholm|포토그라피스카 스톡홀름', 'Drottningholm Palace|드로트닝홀름 궁전'],
    lisbon: ['Belem Tower|벨렘탑', 'Jeronimos Monastery|제로니무스 수도원', 'Alfama District|알파마 지구', 'Sao Jorge Castle|상 조르즈 성', 'Praca do Comercio|코메르시우 광장', 'Santa Justa Lift|산타 주스타 엘리베이터'],
    madrid: ['Prado Museum|프라도 미술관', 'Royal Palace of Madrid|마드리드 왕궁', 'Retiro Park|레티로 공원', 'Plaza Mayor Madrid|마요르 광장', 'Puerta del Sol|푸에르타 델 솔', 'Reina Sofia Museum|레이나 소피아 미술관'],
    mexicoCity: [],
    mexicocity: ['Zocalo Mexico City|멕시코시티 소칼로', 'National Museum of Anthropology Mexico|국립인류학박물관', 'Chapultepec Castle|차풀테펙 성', 'Palacio de Bellas Artes|팔라시오 데 베야스 아르테스', 'Frida Kahlo Museum|프리다 칼로 미술관', 'Teotihuacan Day Trip|테오티우아칸 당일치기'],
    reykjavik: ['Hallgrimskirkja Church|할그림스키르캬', 'Harpa Concert Hall|하르파 콘서트홀', 'Sun Voyager|선 보이저', 'Perlan Museum|페를란 박물관', 'Blue Lagoon Iceland|블루라군', 'Golden Circle Day Trip|골든서클 당일치기'],
    luxembourg: ['Bock Casemates|보크 카제마트', 'Luxembourg Old Town|룩셈부르크 구시가지', 'Grand Ducal Palace Luxembourg|룩셈부르크 대공궁', 'Notre-Dame Cathedral Luxembourg|노트르담 대성당', 'Chemin de la Corniche|코르니슈 산책로', 'Mudam Luxembourg|무담 현대미술관'],
    lima: ['Plaza Mayor Lima|리마 마요르 광장', 'Larco Museum|라르코 박물관', 'Miraflores Boardwalk|미라플로레스 해안 산책로', 'Huaca Pucllana|우아카 푹야나', 'Barranco District|바랑코 지구', 'Lima Cathedral|리마 대성당'],
    milan: ['Duomo di Milano|밀라노 두오모', 'Galleria Vittorio Emanuele II|비토리오 에마누엘레 2세 갤러리아', 'Sforza Castle|스포르체스코 성', 'Santa Maria delle Grazie Last Supper|최후의 만찬 산타마리아 델레 그라치에', 'La Scala Theatre|라 스칼라 극장', 'Brera Art Gallery|브레라 미술관'],
    venice: ['St Mark Square|산 마르코 광장', 'Doge Palace|두칼레 궁전', 'Rialto Bridge|리알토 다리', 'Grand Canal Vaporetto Ride|대운하 바포레토', 'Peggy Guggenheim Collection|페기 구겐하임 컬렉션', 'Burano Island|부라노 섬'],
    bern: ['Bern Old Town|베른 구시가지', 'Zytglogge Clock Tower|치트글로게 시계탑', 'Bear Park Bern|베른 곰 공원', 'Bern Cathedral|베른 대성당', 'Federal Palace of Switzerland|스위스 연방궁', 'Rosengarten Bern|베른 장미정원'],
    berlin: ['Brandenburg Gate|브란덴부르크 문', 'Reichstag Building|라이히스타크 의사당', 'Museum Island Berlin|베를린 박물관섬', 'Berlin Wall Memorial|베를린 장벽 기념관', 'Checkpoint Charlie|체크포인트 찰리', 'East Side Gallery|이스트 사이드 갤러리'],
    brussels: ['Grand Place Brussels|브뤼셀 그랑플라스', 'Atomium|아토미움', 'Manneken Pis|오줌싸개 소년상', 'Royal Gallery of Saint Hubert|생튀베르 왕립 갤러리', 'Royal Palace of Brussels|브뤼셀 왕궁', 'Mont des Arts|몽데자르'],
    vienna: ['Schonbrunn Palace|쇤브룬 궁전', 'St Stephen Cathedral Vienna|빈 슈테판 대성당', 'Belvedere Museum Vienna|벨베데레 미술관', 'Hofburg Palace|호프부르크 왕궁', 'Vienna State Opera|빈 국립오페라극장', 'Prater Ferris Wheel|프라터 대관람차'],
    rio: ['Christ the Redeemer|구세주 그리스도상', 'Sugarloaf Mountain|슈거로프 산', 'Copacabana Beach|코파카바나 해변', 'Ipanema Beach|이파네마 해변', 'Selaron Steps|셀라론 계단', 'Maracana Stadium|마라카낭 경기장'],
    buenosaires: ['Recoleta Cemetery|레콜레타 묘지', 'Teatro Colon|테아트로 콜론', 'La Boca Caminito|라 보카 카미니토', 'Plaza de Mayo|마요 광장', 'Palermo Parks|팔레르모 공원', 'San Telmo Market|산텔모 시장'],
    bucharest: ['Palace of the Parliament Bucharest|부쿠레슈티 의회궁', 'Romanian Athenaeum|루마니아 아테네움', 'Old Town Bucharest|부쿠레슈티 구시가지', 'Herastrau Park|헤러스트러우 공원', 'Village Museum Bucharest|부쿠레슈티 야외민속박물관', 'Stavropoleos Monastery|스타브로폴레오스 수도원'],
    santiago: ['San Cristobal Hill Santiago|산 크리스토발 언덕', 'Plaza de Armas Santiago|산티아고 아르마스 광장', 'La Moneda Palace|라 모네다 궁전', 'Santa Lucia Hill|산타 루시아 언덕', 'Costanera Center Sky|코스타네라 센터 전망대', 'Museum of Memory and Human Rights|기억과 인권 박물관'],
    ankara: ['Anitkabir|아느트카비르', 'Museum of Anatolian Civilizations|아나톨리아 문명 박물관', 'Ankara Castle|앙카라 성', 'Kocatepe Mosque|코자테페 모스크', 'Genclik Park|겐츨릭 공원', 'Atakule Tower|아타쿨레 타워'],
    ottawa: ['Parliament Hill Ottawa|오타와 의회언덕', 'Rideau Canal|리도 운하', 'National Gallery of Canada|캐나다 국립미술관', 'ByWard Market|바이워드 시장', 'Canadian Museum of History|캐나다 역사박물관', 'Notre-Dame Cathedral Basilica Ottawa|오타와 노트르담 대성당'],
    wellington: ['Museum of New Zealand Te Papa Tongarewa|테 파파 통가레와 박물관', 'Wellington Cable Car|웰링턴 케이블카', 'Wellington Botanic Garden|웰링턴 식물원', 'Mount Victoria Lookout|마운트 빅토리아 전망대', 'Zealandia Ecosanctuary|질랜디아 생태보호구역', 'Cuba Street Wellington|쿠바 스트리트'],
    geneva: ['Jet d Eau|제 도 분수', 'Palais des Nations|팔레 데 나시옹', 'St Pierre Cathedral Geneva|제네바 생피에르 대성당', 'Lake Geneva Promenade|레만호 산책로', 'Patek Philippe Museum|파텍 필립 박물관', 'CERN Science Gateway|세른 사이언스 게이트웨이'],
    casablanca: ['Hassan II Mosque|하산 2세 모스크', 'Old Medina Casablanca|카사블랑카 올드 메디나', 'Rick Cafe Casablanca|릭스 카페', 'Mohammed V Square Casablanca|무함마드 5세 광장', 'Corniche Ain Diab|아인 디아브 코니시', 'Habous Quarter|하부스 지구'],
    cairo: ['Giza Pyramids and Sphinx|기자 피라미드와 스핑크스', 'Egyptian Museum Cairo|이집트 박물관', 'Khan el-Khalili|칸 엘 칼릴리', 'Citadel of Saladin|살라딘 성채', 'Coptic Cairo|콥트 카이로', 'Grand Egyptian Museum|그랜드 이집트 박물관'],
    cancun: ['Cancun Hotel Zone Beach|칸쿤 호텔존 해변', 'Chichen Itza Day Trip|치첸이트사 당일치기', 'Tulum Ruins|툴룸 유적', 'Isla Mujeres|이슬라 무헤레스', 'Museo Maya de Cancun|칸쿤 마야 박물관', 'Cenote Ik Kil|익킬 세노테'],
    copenhagen: ['Nyhavn|니하운', 'Tivoli Gardens Copenhagen|코펜하겐 티볼리 공원', 'Amalienborg Palace|아말리엔보르 궁전', 'Rosenborg Castle|로센보르 성', 'The Little Mermaid Copenhagen|인어공주상', 'Round Tower Copenhagen|룬데토른'],
    kualalumpur: ['Petronas Twin Towers|페트로나스 트윈타워', 'Batu Caves|바투 동굴', 'Merdeka Square Kuala Lumpur|메르데카 광장', 'KL Tower|쿠알라룸푸르 타워', 'Central Market Kuala Lumpur|센트럴 마켓', 'Jalan Alor Food Street|잘란 알로 야시장'],
    queenstown: ['Skyline Queenstown Gondola|퀸스타운 스카이라인 곤돌라', 'Lake Wakatipu Cruise|와카티푸 호수 크루즈', 'Arrowtown|애로타운', 'Kawarau Bridge Bungy|카와라우 브리지 번지', 'Queenstown Gardens|퀸스타운 가든', 'Milford Sound Day Tour|밀포드 사운드 당일투어'],
    hanoi: ['Hoan Kiem Lake|호안끼엠 호수', 'Hanoi Old Quarter|하노이 구시가지', 'Temple of Literature Hanoi|문묘', 'Ho Chi Minh Mausoleum|호찌민 묘소', 'Imperial Citadel of Thang Long|탕롱 황성', 'Train Street Hanoi|하노이 기찻길 거리'],
    hawaii: ['Waikiki Beach|와이키키 해변', 'Diamond Head State Monument|다이아몬드 헤드', 'Pearl Harbor National Memorial|진주만 국립기념관', 'Hanauma Bay|하나우마 베이', 'Iolani Palace|이올라니 궁전', 'North Shore Oahu|오아후 노스쇼어'],
    helsinki: ['Helsinki Cathedral|헬싱키 대성당', 'Suomenlinna Fortress|수오멘린나 요새', 'Temppeliaukio Church|템펠리아우키오 교회', 'Market Square Helsinki|헬싱키 마켓 광장', 'Oodi Central Library|오디 중앙도서관', 'Sibelius Monument|시벨리우스 기념비'],
    houston: ['Space Center Houston|스페이스 센터 휴스턴', 'Houston Museum of Natural Science|휴스턴 자연과학박물관', 'Museum of Fine Arts Houston|휴스턴 미술관', 'Buffalo Bayou Park|버팔로 바이유 공원', 'Discovery Green|디스커버리 그린', 'Minute Maid Park|미닛메이드 파크']
  };

  Object.keys(more).forEach(function (cityId) {
    if (!more[cityId] || !more[cityId].length) return;
    E[cityId] = (E[cityId] || []).concat(more[cityId].map(function (pair, idx) {
      var parts = pair.split('|');
      var en = parts[0];
      var ko = parts[1] || parts[0];
      var lower = en.toLowerCase();
      var cat = /park|beach|garden|lake|hill|bay|promenade|canal|sound|shore|lagoon/.test(lower) ? 'healing'
        : /market|square|street|shopping|zone/.test(lower) ? 'shopping'
        : /gondola|cruise|tower|stadium|bungy|day trip|day tour|sky/.test(lower) ? 'activity'
        : 'culture';
      var dur = /museum|palace|castle|pyramids|acropolis|space center|gallery/.test(lower) ? 210
        : /day trip|day tour|milford|chichen|teotihuacan|blue lagoon|golden circle/.test(lower) ? 480
        : /park|beach|garden|promenade|market|square|street/.test(lower) ? 120
        : 150;
      return { cat: cat, ko: ko, en: en, dur: dur, rank: 20 + idx, landmark: true };
    }));
  });

  Object.keys(E).forEach(function (cityId) {
    if (removedIds.indexOf(cityId) === -1) addEntries(cityId, E[cityId]);
  });

  CITIES.sort(function (a, b) {
    return String(a.name_en || a.id).localeCompare(String(b.name_en || b.id));
  });
  if (typeof window !== 'undefined') {
    window._CITIES_SORTED_EN = CITIES.slice();
  }
})();
