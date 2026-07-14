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
  addCity({
    id: 'frankfurt', name_ko: '프랑크푸르트', name_en: 'Frankfurt', name_fr: 'Francfort', name_zh: '法兰克福', name_ja: 'フランクフルト', name_es: 'Fráncfort',
    country_ko: '독일', country_en: 'Germany', desc_ko: '뢰머베르크의 역사 지구와 마인강, 박물관 지구가 이어지는 독일의 국제 도시',
    desc_en: 'A German city of the historic Römerberg, Main riverfront, museums, gardens, and skyline.',
    desc_fr: 'Une ville allemande entre le Römerberg historique, le Main, les musées, les jardins et les gratte-ciel.',
    desc_zh: '德国国际都市，拥有罗马广场老城、美因河畔、博物馆区、花园与天际线。',
    desc_ja: '歴史あるレーマー広場、マイン川、博物館街、庭園、スカイラインを楽しめるドイツの都市です。',
    desc_es: 'Ciudad alemana de casco histórico, ribera del Meno, museos, jardines y perfil urbano.'
  });
  addCity({
    id: 'interlaken', name_ko: '인터라켄', name_en: 'Interlaken', name_fr: 'Interlaken', name_zh: '因特拉肯', name_ja: 'インターラーケン', name_es: 'Interlaken',
    country_ko: '스위스', country_en: 'Switzerland', desc_ko: '두 호수 사이에서 라우터브루넨, 그린델발트, 융프라우 지역으로 이어지는 알프스 여행 거점',
    desc_en: 'An Alpine base between two lakes for Interlaken and the Lauterbrunnen, Grindelwald, and Jungfrau regions.',
    desc_fr: 'Une base alpine entre deux lacs pour découvrir Interlaken, Lauterbrunnen, Grindelwald et la région de la Jungfrau.',
    desc_zh: '位于两湖之间的阿尔卑斯旅行基地，可前往劳特布龙嫩、格林德瓦和少女峰地区。',
    desc_ja: '二つの湖の間に位置し、ラウターブルンネン、グリンデルワルト、ユングフラウ地方を巡る拠点です。',
    desc_es: 'Base alpina entre dos lagos para recorrer Interlaken, Lauterbrunnen, Grindelwald y la región de Jungfrau.'
  });

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
    CITY_CLUSTERS.frankfurt = CITY_CLUSTERS.frankfurt || [
      { name_ko: '뢰머베르크/알트슈타트', name_en: 'Römerberg/Old Town', keywords: ['römer', 'romer', 'old town', 'altstadt', 'cathedral', 'paul', '뢰머', '구시가지', '대성당'], x: 8.6822, y: 50.1106 },
      { name_ko: '박물관 지구/작센하우젠', name_en: 'Museumsufer/Sachsenhausen', keywords: ['museum', 'städel', 'stadel', 'sachsenhausen', 'eiserner', '박물관', '작센하우젠', '마인강'], x: 8.6770, y: 50.1048 },
      { name_ko: '베스텐트/팔멘가르텐', name_en: 'Westend/Palmengarten', keywords: ['palmengarten', 'senckenberg', 'alte oper', 'main tower', '팔멘가르텐', '젠켄베르크', '알테 오퍼'], x: 8.6608, y: 50.1194 }
    ];
    CITY_CLUSTERS.interlaken = CITY_CLUSTERS.interlaken || [
      { name_ko: '회에베크/회에마테', name_en: 'Höheweg/Höhematte', keywords: ['höheweg', 'hoheweg', 'höhematte', 'hohematte', '회에베크', '회에마테'], x: 7.8589, y: 46.6852 },
      { name_ko: '인터라켄 오스트/하더 쿨름', name_en: 'Interlaken Ost/Harder Kulm', keywords: ['interlaken ost', 'harder kulm', 'lake brienz', '하더 쿨름', '브리엔츠'], x: 7.8700, y: 46.6905 },
      { name_ko: '운터젠/인터라켄 베스트', name_en: 'Unterseen/Interlaken West', keywords: ['unterseen', 'interlaken west', 'lake thun', '운터젠', '툰 호수'], x: 7.8503, y: 46.6874 }
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

  var explicitMetadataFields = [
    'nightView', 'sunsetActivity',
    'waterActivity', 'isWaterActivity', 'harborMarker', 'isHarborMarker',
    'mapX', 'mapY', 'mapCoordinateSource', 'mapOnlyLandFallback',
    'regionalGroup'
  ];

  function copyExplicitMetadata(target, source) {
    explicitMetadataFields.forEach(function (field) {
      if (source[field] !== undefined) target[field] = source[field];
    });
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
        if (Number.isFinite(entry.open)) existing.open = entry.open;
        if (Number.isFinite(entry.close)) existing.close = entry.close;
        if (Number.isFinite(entry.x) && Number.isFinite(entry.y)) {
          existing.x = entry.x;
          existing.y = entry.y;
          existing.coordinateSource = 'curated-patch';
        }
        existing.curatedEssential = true;
        ['fr', 'zh', 'ja', 'es'].forEach(function (lang) {
          if (entry[lang]) existing['name_' + lang] = entry[lang];
          if (entry['desc_' + lang]) existing['desc_' + lang] = entry['desc_' + lang];
        });
        if (entry.regionalEssential === true) existing.regionalEssential = true;
        ['regionalRoute', 'regionalRouteOrder', 'regionalStopOrder', 'regionalVisitDuration', 'regionalLunchAfter'].forEach(function (field) {
          if (entry[field] !== undefined) existing[field] = entry[field];
        });
        copyExplicitMetadata(existing, entry);
        return;
      }
      var localizedNames = { fr: entry.fr, zh: entry.zh, ja: entry.ja, es: entry.es };
      var localizedDescriptions = {
        fr: entry.desc_fr || (entry.fr ? 'Visite de ' + entry.fr + ' avec un temps de découverte réaliste.' : ''),
        zh: entry.desc_zh || (entry.zh ? '按合理的停留时间游览' + entry.zh + '。' : ''),
        ja: entry.desc_ja || (entry.ja ? entry.ja + 'を無理のない滞在時間で巡ります。' : ''),
        es: entry.desc_es || (entry.es ? 'Visita de ' + entry.es + ' con un tiempo de estancia realista.' : '')
      };
      var item = {
        name_ko: entry.ko,
        name_en: entry.en,
        duration: entry.dur || 120,
        isLandmark: entry.landmark !== false,
        priorityRank: entry.rank || (100 + idx),
        x: entry.x,
        y: entry.y,
        open: Number.isFinite(entry.open) ? entry.open : 540,
        close: Number.isFinite(entry.close) ? entry.close : 1200,
        desc_ko: entry.desc_ko || entry.ko + '을(를) 중심으로 실제 방문 동선에 맞춰 관람하는 대표 일정입니다.',
        desc_en: entry.desc_en || 'A real, city-specific sightseeing stop planned around visitor-friendly routing.',
        curatedEssential: true,
        regionalEssential: entry.regionalEssential === true,
        regionalRoute: entry.regionalRoute,
        regionalRouteOrder: entry.regionalRouteOrder,
        regionalStopOrder: entry.regionalStopOrder,
        regionalVisitDuration: entry.regionalVisitDuration,
        regionalLunchAfter: entry.regionalLunchAfter === true,
        nightView: entry.nightView === true,
        sunsetActivity: entry.sunsetActivity === true,
        waterActivity: entry.waterActivity === true,
        isWaterActivity: entry.isWaterActivity === true,
        harborMarker: entry.harborMarker === true,
        isHarborMarker: entry.isHarborMarker === true,
        mapX: entry.mapX,
        mapY: entry.mapY,
        mapCoordinateSource: entry.mapCoordinateSource,
        mapOnlyLandFallback: entry.mapOnlyLandFallback === true,
        regionalGroup: entry.regionalGroup,
        coordinateSource: Number.isFinite(entry.x) && Number.isFinite(entry.y) ? 'curated-patch' : undefined
      };
      ['fr', 'zh', 'ja', 'es'].forEach(function (lang) {
        if (localizedNames[lang]) item['name_' + lang] = localizedNames[lang];
        if (localizedDescriptions[lang]) item['desc_' + lang] = localizedDescriptions[lang];
      });
      pools[cat].push(item);
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
    frankfurt: [
      { cat: 'culture', ko: '뢰머베르크와 신 구시가지', en: 'Römerberg & New Old Town', fr: 'Römerberg et nouvelle vieille ville', zh: '罗马广场与新老城', ja: 'レーマー広場と新旧市街', es: 'Römerberg y nuevo casco antiguo', dur: 180, rank: 1, x: 8.6822, y: 50.1106, desc_ko: '프랑크푸르트의 역사 중심지인 뢰머베르크와 복원된 신 구시가지를 함께 걷는 일정입니다.', desc_en: 'Walk Frankfurt historic center across Römerberg and the reconstructed New Old Town.' },
      { cat: 'culture', ko: '프랑크푸르트 황제 대성당', en: 'Frankfurt Imperial Cathedral', fr: 'Cathédrale impériale de Francfort', zh: '法兰克福皇帝大教堂', ja: 'フランクフルト大聖堂', es: 'Catedral Imperial de Fráncfort', dur: 120, rank: 2, x: 8.6850, y: 50.1106, desc_ko: '독일 왕과 황제의 선출·대관 역사로 알려진 성 바르톨로메오 대성당을 둘러봅니다.', desc_en: 'Visit St Bartholomew Cathedral, linked to the election and coronation history of German rulers.' },
      { cat: 'culture', ko: '프랑크푸르트 성 바울 교회', en: 'St Paul Church Frankfurt', fr: 'Église Saint-Paul de Francfort', zh: '法兰克福圣保罗教堂', ja: 'フランクフルト・パウルス教会', es: 'Iglesia de San Pablo de Fráncfort', dur: 90, rank: 3, x: 8.6808, y: 50.1111, desc_ko: '독일 민주주의 역사에서 중요한 성 바울 교회의 전시와 내부를 봅니다.', desc_en: 'Explore St Paul Church and its role in the history of German democracy.' },
      { cat: 'activity', ko: '마인 타워 전망대', en: 'Main Tower Observation Deck', fr: 'Belvédère de la Main Tower', zh: '美因塔观景台', ja: 'マインタワー展望台', es: 'Mirador de la Torre Main', dur: 120, rank: 4, x: 8.6719, y: 50.1122, desc_ko: '마인 타워 전망대에서 프랑크푸르트 도심과 스카이라인을 조망합니다.', desc_en: 'See Frankfurt city center and skyline from the Main Tower observation deck.' },
      { cat: 'culture', ko: '박물관강변과 슈테델 미술관', en: 'Museumsufer & Städel Museum', fr: 'Rive des musées et musée Städel', zh: '博物馆河岸与施泰德艺术馆', ja: 'ムゼウムスウーファーとシュテーデル美術館', es: 'Ribera de los Museos y Museo Städel', dur: 300, rank: 5, x: 8.6738, y: 50.1035, desc_ko: '마인강 박물관 지구를 산책하고 슈테델 미술관의 주요 소장품을 충분히 관람합니다.', desc_en: 'Walk the Museumsufer and allow a substantial visit to the Städel Museum collection.' },
      { cat: 'culture', ko: '괴테 하우스', en: 'Goethe House Frankfurt', fr: 'Maison de Goethe à Francfort', zh: '法兰克福歌德故居', ja: 'フランクフルトのゲーテハウス', es: 'Casa de Goethe en Fráncfort', dur: 150, rank: 6, x: 8.6775, y: 50.1111, desc_ko: '요한 볼프강 폰 괴테의 생가와 시대별 전시를 관람합니다.', desc_en: 'Tour the birthplace of Johann Wolfgang von Goethe and its period rooms and exhibitions.' },
      { cat: 'healing', ko: '팔멘가르텐 식물원', en: 'Palmengarten Frankfurt', fr: 'Palmengarten de Francfort', zh: '法兰克福棕榈园', ja: 'フランクフルト・パルメンガルテン', es: 'Palmengarten de Fráncfort', dur: 180, rank: 7, x: 8.6556, y: 50.1236, desc_ko: '대형 온실과 계절 정원을 갖춘 팔멘가르텐을 여유 있게 둘러봅니다.', desc_en: 'Explore Palmengarten glasshouses and seasonal gardens at a relaxed pace.' },
      { cat: 'culture', ko: '젠켄베르크 자연사박물관', en: 'Senckenberg Natural History Museum', fr: 'Musée d’histoire naturelle Senckenberg', zh: '森肯贝格自然博物馆', ja: 'ゼンケンベルク自然博物館', es: 'Museo de Historia Natural Senckenberg', dur: 210, rank: 8, x: 8.6518, y: 50.1175, desc_ko: '공룡 골격과 생물 다양성 전시로 유명한 자연사박물관을 충분히 관람합니다.', desc_en: 'Allow a substantial visit for the dinosaur and biodiversity galleries at Senckenberg.' },
      { cat: 'culture', ko: '알테 오퍼와 오페른 광장', en: 'Alte Oper & Opernplatz', fr: 'Alte Oper et Opernplatz', zh: '老歌剧院与歌剧院广场', ja: 'アルテ・オーパーとオペラ広場', es: 'Alte Oper y Opernplatz', dur: 90, rank: 9, x: 8.6719, y: 50.1158, landmark: false, desc_ko: '복원된 알테 오퍼 외관과 오페른 광장 주변을 산책합니다.', desc_en: 'Walk around the restored Alte Oper facade and Opernplatz.' },
      { cat: 'healing', ko: '아이제르너 슈테크와 마인강 산책', en: 'Eiserner Steg & Main River Walk', fr: 'Eiserner Steg et promenade du Main', zh: '铁桥与美因河畔漫步', ja: 'アイゼルナー・シュテークとマイン川散策', es: 'Eiserner Steg y paseo del Meno', dur: 120, rank: 10, x: 8.6822, y: 50.1081, landmark: false, desc_ko: '아이제르너 슈테크를 건너 마인강 양쪽의 스카이라인과 강변을 걷습니다.', desc_en: 'Cross Eiserner Steg and walk the Main riverfront for skyline views.' },
      { cat: 'activity', ko: '프랑크푸르트 동물원', en: 'Frankfurt Zoo', fr: 'Zoo de Francfort', zh: '法兰克福动物园', ja: 'フランクフルト動物園', es: 'Zoológico de Fráncfort', dur: 240, rank: 11, x: 8.7032, y: 50.1155, landmark: false, desc_ko: '다양한 동물 전시를 갖춘 프랑크푸르트 동물원에 반나절을 배정합니다.', desc_en: 'Set aside a half day for the varied animal habitats at Frankfurt Zoo.' },
      { cat: 'culture', ko: '작센하우젠 역사 지구', en: 'Historic Sachsenhausen District', fr: 'Quartier historique de Sachsenhausen', zh: '萨克森豪森历史街区', ja: 'ザクセンハウゼン歴史地区', es: 'Barrio histórico de Sachsenhausen', dur: 150, rank: 12, x: 8.6890, y: 50.1053, landmark: false, desc_ko: '마인강 남쪽 작센하우젠의 역사적인 거리와 광장을 둘러봅니다.', desc_en: 'Explore the historic streets and squares of Sachsenhausen south of the Main.' },
      { cat: 'shopping', ko: '클라인마르크트할레 시장', en: 'Kleinmarkthalle Market', fr: 'Marché Kleinmarkthalle', zh: '小市场大厅', ja: 'クラインマルクトハレ市場', es: 'Mercado Kleinmarkthalle', dur: 90, rank: 13, x: 8.6843, y: 50.1120, landmark: false, desc_ko: '도심 실내시장인 클라인마르크트할레의 식재료와 현지 먹거리를 둘러봅니다.', desc_en: 'Browse local produce and food stalls inside central Kleinmarkthalle.' },
      { cat: 'shopping', ko: '차일 거리와 마이차일', en: 'Zeil & MyZeil', fr: 'Zeil et MyZeil', zh: '采尔大街与MyZeil', ja: 'ツァイル通りとマイツァイル', es: 'Zeil y MyZeil', dur: 150, rank: 14, x: 8.6839, y: 50.1146, landmark: false, desc_ko: '프랑크푸르트 대표 보행 쇼핑 거리인 차일과 마이차일을 둘러봅니다.', desc_en: 'Explore Frankfurt main pedestrian shopping street and the MyZeil center.' },
      { cat: 'culture', ko: '프랑크푸르트 현대미술관', en: 'Museum of Modern Art Frankfurt', fr: 'Musée d’art moderne de Francfort', zh: '法兰克福现代艺术博物馆', ja: 'フランクフルト近代美術館', es: 'Museo de Arte Moderno de Fráncfort', dur: 150, rank: 15, x: 8.6854, y: 50.1118, landmark: false, desc_ko: '독특한 건축과 현대미술 소장품으로 알려진 MMK를 관람합니다.', desc_en: 'Visit MMK for its distinctive architecture and modern art collection.' },
      { cat: 'activity', ko: '하이델베르크 구시가지 당일치기', en: 'Heidelberg Old Town Day Trip', fr: 'Excursion dans la vieille ville de Heidelberg', zh: '海德堡老城一日游', ja: 'ハイデルベルク旧市街日帰り旅行', es: 'Excursión al casco antiguo de Heidelberg', dur: 480, rank: 50, x: 8.7156, y: 49.4106, landmark: false, desc_ko: '프랑크푸르트에서 철도로 이동해 하이델베르크 성과 구시가지를 둘러보는 후반부 하루 일정입니다.', desc_en: 'A later full-day rail excursion from Frankfurt to Heidelberg Castle and Old Town.' },
      { cat: 'activity', ko: '마인츠 구시가지와 라인강 당일치기', en: 'Mainz Old Town & Rhine Day Trip', fr: 'Excursion à Mayence et sur le Rhin', zh: '美因茨老城与莱茵河一日游', ja: 'マインツ旧市街とライン川日帰り旅行', es: 'Excursión a Maguncia y el Rin', dur: 480, rank: 51, x: 8.2742, y: 49.9990, landmark: false, desc_ko: '가까운 마인츠의 대성당과 구시가지, 라인강변을 묶어 둘러보는 후반부 하루 일정입니다.', desc_en: 'A later full-day rail excursion to Mainz Cathedral, Old Town, and the Rhine waterfront.' }
    ],
    berlin: [
      { cat: 'culture', ko: '\uBE0C\uB780\uB374\uBD80\uB974\uD06C \uBB38', en: 'Brandenburg Gate', fr: 'Porte de Brandebourg', zh: '\u52C3\u5170\u767B\u5821\u95E8', ja: '\u30D6\u30E9\u30F3\u30C7\u30F3\u30D6\u30EB\u30AF\u9580', es: 'Puerta de Brandeburgo', dur: 90, rank: 1, x: 13.3777, y: 52.5163 },
      { cat: 'culture', ko: '\uB77C\uC774\uD788\uC2A4\uD0C0\uD06C \uC758\uC0AC\uB2F9', en: 'Reichstag Building', fr: 'Palais du Reichstag', zh: '\u5FB7\u56FD\u56FD\u4F1A\u5927\u53A6', ja: '\u30C9\u30A4\u30C4\u9023\u90A6\u8B70\u4F1A\u8B70\u4E8B\u5802', es: 'Edificio del Reichstag', dur: 150, rank: 2, x: 13.3762, y: 52.5186 },
      { cat: 'culture', ko: '\uBCA0\uB97C\uB9B0 \uBC15\uBB3C\uAD00\uC12C', en: 'Museum Island Berlin', fr: 'Ile aux Musees de Berlin', zh: '\u67CF\u6797\u535A\u7269\u9986\u5C9B', ja: '\u30D9\u30EB\u30EA\u30F3\u535A\u7269\u9928\u5CF6', es: 'Isla de los Museos de Berlin', dur: 240, rank: 3, x: 13.4010, y: 52.5169 },
      { cat: 'culture', ko: '\uBCA0\uB97C\uB9B0 \uC7A5\uBCBD \uAE30\uB150\uAD00', en: 'Berlin Wall Memorial', fr: 'Memorial du mur de Berlin', zh: '\u67CF\u6797\u5899\u7EAA\u5FF5\u9986', ja: '\u30D9\u30EB\u30EA\u30F3\u306E\u58C1\u8A18\u5FF5\u9928', es: 'Memorial del Muro de Berlin', dur: 150, rank: 4, x: 13.3903, y: 52.5350 },
      { cat: 'culture', ko: '\uC774\uC2A4\uD2B8 \uC0AC\uC774\uB4DC \uAC24\uB7EC\uB9AC', en: 'East Side Gallery', fr: 'East Side Gallery', zh: '\u4E1C\u8FB9\u753B\u5ECA', ja: '\u30A4\u30FC\u30B9\u30C8\u30B5\u30A4\u30C9\u30AE\u30E3\u30E9\u30EA\u30FC', es: 'East Side Gallery', dur: 120, rank: 5, x: 13.4394, y: 52.5050 },
      { cat: 'culture', ko: '\uCCB4\uD06C\uD3EC\uC778\uD2B8 \uCC30\uB9AC', en: 'Checkpoint Charlie', fr: 'Checkpoint Charlie', zh: '\u67E5\u7406\u68C0\u67E5\u7AD9', ja: '\u30C1\u30A7\u30C3\u30AF\u30DD\u30A4\u30F3\u30C8\u30FB\u30C1\u30E3\u30FC\u30EA\u30FC', es: 'Checkpoint Charlie', dur: 90, rank: 6, x: 13.3904, y: 52.5076 },
      { cat: 'activity', ko: '\uBCA0\uB97C\uB9B0 TV \uD0C0\uC6CC\uC640 \uC54C\uB809\uC0B0\uB354\uD50C\uB77C\uCE20', en: 'Berlin TV Tower & Alexanderplatz', fr: 'Tour de television et Alexanderplatz', zh: '\u67CF\u6797\u7535\u89C6\u5854\u4E0E\u4E9A\u5386\u5C71\u5927\u5E7F\u573A', ja: '\u30D9\u30EB\u30EA\u30F3\u30C6\u30EC\u30D3\u5854\u3068\u30A2\u30EC\u30AF\u30B5\u30F3\u30C0\u30FC\u5E83\u5834', es: 'Torre de Television y Alexanderplatz', dur: 120, rank: 7, x: 13.4094, y: 52.5208 },
      { cat: 'culture', ko: '\uBCA0\uB97C\uB9B0 \uB300\uC131\uB2F9', en: 'Berlin Cathedral', fr: 'Cathedrale de Berlin', zh: '\u67CF\u6797\u5927\u6559\u5802', ja: '\u30D9\u30EB\u30EA\u30F3\u5927\u8056\u5802', es: 'Catedral de Berlin', dur: 120, rank: 8, x: 13.4010, y: 52.5191 },
      { cat: 'culture', ko: '\uD6D4\uBCFC\uD2B8 \uD3EC\uB7FC', en: 'Humboldt Forum', fr: 'Forum Humboldt', zh: '\u6D2A\u5821\u8BBA\u575B', ja: '\u30D5\u30F3\u30DC\u30EB\u30C8\u30FB\u30D5\u30A9\u30FC\u30E9\u30E0', es: 'Foro Humboldt', dur: 180, rank: 9, x: 13.4010, y: 52.5175 },
      { cat: 'culture', ko: '\uC0E4\uB97C\uB85C\uD150\uBD80\uB974\uD06C \uAD81\uC804', en: 'Charlottenburg Palace', fr: 'Chateau de Charlottenburg', zh: '\u590F\u6D1B\u817E\u5821\u5BAB', ja: '\u30B7\u30E3\u30EB\u30ED\u30C3\u30C6\u30F3\u30D6\u30EB\u30AF\u5BAE\u6BBF', es: 'Palacio de Charlottenburg', dur: 210, rank: 10, x: 13.2957, y: 52.5209 },
      { cat: 'culture', ko: '\uC7A0\uB2E4\uB974\uBA58\uB9C8\uB974\uD2B8', en: 'Gendarmenmarkt', fr: 'Gendarmenmarkt', zh: '\u5FA1\u6797\u5E7F\u573A', ja: '\u30B8\u30E3\u30F3\u30C0\u30EB\u30E1\u30F3\u30DE\u30EB\u30AF\u30C8', es: 'Gendarmenmarkt', dur: 90, rank: 11, x: 13.3927, y: 52.5138, landmark: false },
      { cat: 'culture', ko: '\uD3EC\uCE20\uB2F4\uD130 \uD50C\uB77C\uCE20', en: 'Potsdamer Platz', fr: 'Potsdamer Platz', zh: '\u6CE2\u8328\u5766\u5E7F\u573A', ja: '\u30DD\u30C4\u30C0\u30E0\u5E83\u5834', es: 'Potsdamer Platz', dur: 120, rank: 12, x: 13.3760, y: 52.5096, landmark: false },
      { cat: 'culture', ko: '\uD14C\uB7EC\uC758 \uC9C0\uD615\uB3C4', en: 'Topography of Terror', fr: 'Topographie de la Terreur', zh: '\u6050\u6016\u5730\u5F62\u56FE', ja: '\u30C6\u30ED\u306E\u30C8\u30DD\u30B0\u30E9\u30D5\u30A3\u30FC', es: 'Topografia del Terror', dur: 150, rank: 13, x: 13.3827, y: 52.5069, landmark: false },
      { cat: 'shopping', ko: '\uB9C8\uB974\uD2B8\uD560\uB808 \uB098\uC778', en: 'Markthalle Neun', fr: 'Markthalle Neun', zh: '\u4E5D\u53F7\u5E02\u573A\u5927\u5385', ja: '\u30DE\u30EB\u30AF\u30C8\u30CF\u30EC\u30FB\u30CE\u30A4\u30F3', es: 'Markthalle Neun', dur: 120, rank: 14, x: 13.4314, y: 52.4991, landmark: false },
      { cat: 'healing', ko: '\uD2F0\uC5B4\uAC00\uB974\uD150\uACFC \uC2B9\uB9AC\uC758 \uAE30\uB150\uD0D1', en: 'Tiergarten & Victory Column', fr: 'Tiergarten et colonne de la Victoire', zh: '\u8482\u5C14\u52A0\u817E\u516C\u56ED\u4E0E\u80DC\u5229\u7EAA\u5FF5\u67F1', ja: '\u30C6\u30A3\u30FC\u30A2\u30AC\u30EB\u30C6\u30F3\u3068\u6226\u52DD\u8A18\u5FF5\u5854', es: 'Tiergarten y Columna de la Victoria', dur: 150, rank: 15, x: 13.3501, y: 52.5145, landmark: false },
      { cat: 'culture', ko: '\uBCA0\uB97C\uB9B0 \uC720\uB300\uC778 \uBC15\uBB3C\uAD00', en: 'Jewish Museum Berlin', fr: 'Musee juif de Berlin', zh: '\u67CF\u6797\u72B9\u592A\u535A\u7269\u9986', ja: '\u30D9\u30EB\u30EA\u30F3\u30FB\u30E6\u30C0\u30E4\u535A\u7269\u9928', es: 'Museo Judio de Berlin', dur: 180, rank: 16, x: 13.3956, y: 52.5022, landmark: false },
      { cat: 'healing', ko: '\uD15C\uD50C\uD638\uD37C \uD3A0\uD2B8', en: 'Tempelhofer Feld', fr: 'Champ de Tempelhof', zh: '\u6CF0\u666E\u5C14\u970D\u592B\u516C\u56ED', ja: '\u30C6\u30F3\u30DA\u30EB\u30DB\u30FC\u30D5\u516C\u5712', es: 'Campo de Tempelhof', dur: 150, rank: 17, x: 13.4049, y: 52.4731, landmark: false },
      { cat: 'shopping', ko: '\uCFE0\uB974\uD4F4\uB974\uC2A4\uD150\uB2F4\uACFC \uCE74\uC774\uC800 \uBE4C\uD5EC\uB984 \uAE30\uB150\uAD50\uD68C', en: 'Kurfurstendamm & Kaiser Wilhelm Memorial Church', fr: 'Kurfurstendamm et eglise du Souvenir', zh: '\u9009\u5E1D\u4FAF\u5927\u8857\u4E0E\u5A01\u5EC9\u7687\u5E1D\u7EAA\u5FF5\u6559\u5802', ja: '\u30AF\u30FC\u30A2\u30D5\u30E5\u30EB\u30B9\u30C6\u30F3\u30C0\u30E0\u3068\u30AB\u30A4\u30B6\u30FC\u30FB\u30F4\u30A3\u30EB\u30D8\u30EB\u30E0\u8A18\u5FF5\u6559\u4F1A', es: 'Kurfurstendamm e Iglesia Memorial Kaiser Wilhelm', dur: 150, rank: 18, x: 13.3353, y: 52.5048, landmark: false }
    ],
    interlaken: [
      { cat: 'healing', ko: '회에마테 공원과 회에베크 산책', en: 'Höhematte Park & Höheweg Walk', fr: 'Parc Höhematte et promenade Höheweg', zh: '荷黑马特公园与荷黑威格漫步', ja: 'ヘーエマッテ公園とヘーエ通り散策', es: 'Parque Höhematte y paseo Höheweg', dur: 120, rank: 1, x: 7.8589, y: 46.6852, desc_ko: '인터라켄 중심의 넓은 공원과 산책로에서 융프라우 방향의 전망을 즐깁니다.', desc_en: 'Walk Interlaken central park and boulevard with views toward the Jungfrau massif.' },
      { cat: 'culture', ko: '운터젠 구시가지', en: 'Unterseen Old Town', fr: 'Vieille ville d’Unterseen', zh: '下森老城', ja: 'ウンターゼーン旧市街', es: 'Casco antiguo de Unterseen', dur: 120, rank: 2, x: 7.8503, y: 46.6874, desc_ko: '아레강 건너 운터젠의 역사적인 광장과 골목을 천천히 둘러봅니다.', desc_en: 'Explore the historic square and lanes of Unterseen across the Aare.' },
      { cat: 'activity', ko: '하더 쿨름 전망대', en: 'Harder Kulm Viewpoint', fr: 'Belvédère de Harder Kulm', zh: '哈德昆观景台', ja: 'ハーダー・クルム展望台', es: 'Mirador de Harder Kulm', dur: 210, rank: 3, x: 7.8500, y: 46.6977, desc_ko: '인터라켄에서 푸니쿨라로 올라 두 호수와 아이거·묀히·융프라우 전망을 봅니다.', desc_en: 'Ride the funicular from Interlaken for views of both lakes and the Eiger, Mönch, and Jungfrau.' },
      { cat: 'culture', ko: '성 베아투스 동굴', en: 'St Beatus Caves', fr: 'Grottes de Saint-Béat', zh: '圣贝阿图斯洞穴', ja: 'ザンクト・ベアトゥス洞窟', es: 'Cuevas de San Beato', dur: 210, rank: 4, x: 7.7810, y: 46.6848, desc_ko: '툰 호숫가의 성 베아투스 동굴과 폭포, 전시 공간을 반나절 동안 둘러봅니다.', desc_en: 'Spend a half day at the St Beatus cave system, waterfalls, and exhibition by Lake Thun.' },
      { cat: 'culture', ko: '인터라켄 수도원과 성', en: 'Interlaken Monastery & Castle', fr: 'Monastère et château d’Interlaken', zh: '因特拉肯修道院与城堡', ja: 'インターラーケン修道院と城', es: 'Monasterio y castillo de Interlaken', dur: 100, rank: 5, x: 7.8661, y: 46.6861, landmark: false, desc_ko: '인터라켄 중심의 옛 수도원과 성, 주변 역사 지구를 둘러봅니다.', desc_en: 'Visit the former monastery, castle, and surrounding historic area in central Interlaken.' },
      { cat: 'healing', ko: '라우터브루넨 계곡', en: 'Lauterbrunnen Valley', fr: 'Vallée de Lauterbrunnen', zh: '劳特布龙嫩山谷', ja: 'ラウターブルンネン渓谷', es: 'Valle de Lauterbrunnen', dur: 150, rank: 6, x: 7.9073, y: 46.5894, desc_ko: '72개 폭포로 유명한 라우터브루넨 계곡의 장관을 마을 산책과 함께 감상합니다.', desc_en: 'Walk through the stunning Lauterbrunnen Valley famous for its 72 waterfalls.' },
      { cat: 'activity', ko: '슈타우프바흐 폭포', en: 'Staubbach Falls', fr: 'Chutes de Staubbach', zh: '施陶河瀑布', ja: 'シュタウプバッハ滝', es: 'Cascada Staubbach', dur: 60, rank: 7, x: 7.9069, y: 46.5920, desc_ko: '300m 높이에서 쏟아지는 스위스 대표 폭포를 가까이에서 봅니다.', desc_en: 'See the iconic 300m free-falling waterfall up close in Lauterbrunnen.' },
      { cat: 'healing', ko: '벵엔 마을 산책', en: 'Wengen Village Walk', fr: 'Promenade à Wengen', zh: '文根小镇漫步', ja: 'ヴェンゲン村散策', es: 'Paseo por Wengen', dur: 120, rank: 8, x: 7.9221, y: 46.6075, desc_ko: '차 없는 산악 마을 벵엔에서 아이거·묀히·융프라우 전망과 함께 산책합니다.', desc_en: 'Stroll through the car-free alpine village of Wengen with Eiger, Mönch, and Jungfrau views.' },
      { cat: 'culture', ko: '그린델발트 마을', en: 'Grindelwald Village', fr: 'Village de Grindelwald', zh: '格林德瓦小镇', ja: 'グリンデルワルト村', es: 'Pueblo de Grindelwald', dur: 180, rank: 9, x: 8.0413, y: 46.6244, desc_ko: '아이거 북벽 아래 자리한 그린델발트 마을과 주변 전망을 둘러봅니다.', desc_en: 'Explore Grindelwald village beneath the Eiger north face with surrounding alpine views.' },
      { cat: 'activity', ko: '퍼스트 전망대', en: 'Grindelwald-First Viewpoint', fr: 'Belvédère de Grindelwald-First', zh: '格林德瓦菲斯特观景台', ja: 'グリンデルワルト・フィルスト展望台', es: 'Mirador de Grindelwald-First', dur: 180, rank: 10, x: 8.0537, y: 46.6603, desc_ko: '그린델발트에서 곤돌라를 타고 퍼스트 전망대에 올라 알프스 파노라마를 즐깁니다.', desc_en: 'Ride the gondola from Grindelwald to First for a panoramic Alpine view.' },
      { cat: 'activity', ko: '바흐알프제 하이킹', en: 'Bachalpsee Hiking Trail', fr: 'Randonnée au Bachalpsee', zh: '巴赫阿尔卑湖徒步', ja: 'バッハアルプゼー・ハイキング', es: 'Senderismo al Bachalpsee', dur: 180, rank: 11, x: 8.0210, y: 46.6710, desc_ko: '퍼스트에서 바흐알프제까지 왕복 하이킹으로 고산 호수의 거울 같은 수면을 봅니다.', desc_en: 'Hike from First to the mirror-like Bachalpsee alpine lake and back.' },
      { cat: 'activity', ko: '융프라우요흐 톱 오브 유럽', en: 'Jungfraujoch Top of Europe', fr: 'Jungfraujoch, Top of Europe', zh: '少女峰欧洲之巅', ja: 'ユングフラウヨッホ・トップ・オブ・ヨーロッパ', es: 'Jungfraujoch, Top of Europe', dur: 300, rank: 12, x: 7.9853, y: 46.5475, desc_ko: '유럽 최고 높이 기차역에서 알레치 빙하와 만년설 파노라마를 감상합니다.', desc_en: 'Visit Europe highest railway station for Aletsch Glacier and eternal snow panoramas.' },
      { cat: 'healing', ko: '뮈렌 마을 산책', en: 'Mürren Village Walk', fr: 'Promenade à Mürren', zh: '米伦小镇漫步', ja: 'ミューレン村散策', es: 'Paseo por Mürren', dur: 120, rank: 13, x: 7.8925, y: 46.5588, desc_ko: '차 없는 절벽 위 마을 뮈렌에서 알프스 절경과 함께 여유롭게 산책합니다.', desc_en: 'Walk through the car-free cliffside village of Mürren with stunning Alpine scenery.' },
      { cat: 'activity', ko: '쉴트호른 전망대', en: 'Schilthorn Viewpoint', fr: 'Belvédère du Schilthorn', zh: '雪朗峰观景台', ja: 'シルトホルン展望台', es: 'Mirador del Schilthorn', dur: 180, rank: 14, x: 7.8350, y: 46.5570, desc_ko: '해발 2,970m 쉴트호른 정상에서 200개 봉우리의 360도 파노라마를 봅니다.', desc_en: 'See a 360-degree panorama of 200 peaks from the 2,970m Schilthorn summit.' },
      { cat: 'healing', ko: '브리엔츠 호수 유람', en: 'Lake Brienz Cruise', fr: 'Croisière sur le lac de Brienz', zh: '布里恩茨湖游船', ja: 'ブリエンツ湖クルーズ', es: 'Crucero por el lago de Brienz', dur: 120, rank: 15, x: 7.9640, y: 46.7270, desc_ko: '에메랄드빛 브리엔츠 호수를 유람선으로 건너며 주변 산세를 감상합니다.', desc_en: 'Cruise across the emerald waters of Lake Brienz enjoying the surrounding mountain scenery.' },
      { cat: 'activity', ko: '기스바흐 폭포', en: 'Giessbach Falls', fr: 'Chutes de Giessbach', zh: '吉斯巴赫瀑布', ja: 'ギースバッハ滝', es: 'Cascadas Giessbach', dur: 120, rank: 16, x: 8.0220, y: 46.7330, desc_ko: '14단으로 떨어지는 기스바흐 폭포와 역사적인 그랜드호텔 주변을 산책합니다.', desc_en: 'Walk around the 14-tier Giessbach Falls and the historic Grand Hotel grounds.' },
      { cat: 'culture', ko: '슈피츠 성과 호숫가', en: 'Spiez Castle & Lakefront', fr: 'Château de Spiez et bord du lac', zh: '施皮茨城堡与湖畔', ja: 'シュピーツ城と湖畔', es: 'Castillo de Spiez y orilla del lago', dur: 120, rank: 17, x: 7.6915, y: 46.6882, desc_ko: '중세 슈피츠 성과 포도밭, 툰 호수 호숫가를 함께 둘러봅니다.', desc_en: 'Visit medieval Spiez Castle, its vineyards, and the Lake Thun waterfront.' },
      { cat: 'culture', ko: '툰 구시가지 산책', en: 'Thun Old Town Walk', fr: 'Promenade dans la vieille ville de Thoune', zh: '图恩老城漫步', ja: 'トゥーン旧市街散策', es: 'Paseo por el casco antiguo de Thun', dur: 150, rank: 18, x: 7.6298, y: 46.7580, desc_ko: '아레강변의 툰 구시가지와 성, 목조 수문 다리를 걸으며 둘러봅니다.', desc_en: 'Stroll through Thun Old Town along the Aare with its castle and covered sluice bridge.' }
    ],
    london: [
      { cat: 'culture', ko: '버킹엄 궁전과 근위병 교대', en: 'Buckingham Palace & Changing of the Guard', dur: 120, rank: 1, x: -0.14194444, y: 51.50083333 },
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
    ],
    sydney: [
      { cat: 'culture', ko: 'Sydney Opera House Inside Tour', en: 'Sydney Opera House Inside Tour', dur: 90, rank: 1, x: 151.215256, y: -33.856784, landmark: true },
      { cat: 'activity', ko: 'Sydney Harbour Bridge BridgeClimb', en: 'Sydney BridgeClimb Adventure', dur: 180, rank: 2, x: 151.210787, y: -33.852306, landmark: true, mapX: 151.2059, mapY: -33.8568, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'healing', ko: 'Royal Botanic Garden Walk', en: 'Royal Botanic Garden Walk', dur: 90, rank: 3, x: 151.2168, y: -33.8640, landmark: false },
      { cat: 'healing', ko: 'Taronga Zoo Ferry Ocean View', en: 'Taronga Zoo Ferry Ocean View', dur: 80, rank: 4, x: 151.2150, y: -33.8550, landmark: false, waterActivity: true, isWaterActivity: true, harborMarker: true, isHarborMarker: true, mapX: 151.2150, mapY: -33.8550, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'gourmet', ko: 'Sydney Fish Market Oyster Lunch', en: 'Sydney Fish Market Oyster Lunch', dur: 90, rank: 5, x: 151.1985, y: -33.8690, landmark: false, harborMarker: true, isHarborMarker: true, mapX: 151.1985, mapY: -33.8690, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'activity', ko: 'Darling Harbour Jet Boat Spin', en: 'Darling Harbour Jet Boat Spin', dur: 80, rank: 6, x: 151.2029, y: -33.8698, landmark: false, waterActivity: true, isWaterActivity: true, harborMarker: true, isHarborMarker: true, mapX: 151.2029, mapY: -33.8698, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'gourmet', ko: 'Hurricanes Grill Darling Harbour Ribs', en: 'Hurricanes Grill Darling Harbour Ribs', dur: 90, rank: 7, x: 151.2014, y: -33.8730, landmark: false, harborMarker: true, isHarborMarker: true, mapX: 151.2014, mapY: -33.8730, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'shopping', ko: 'Birkenhead Point Outlet Centre', en: 'Birkenhead Point Outlet Centre', dur: 180, rank: 8, x: 151.1837, y: -33.8534, landmark: false, harborMarker: true, isHarborMarker: true, mapX: 151.1837, mapY: -33.8534, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true },
      { cat: 'culture', ko: 'Museum of Contemporary Art MCA', en: 'Museum of Contemporary Art MCA', dur: 80, rank: 9, x: 151.2074, y: -33.8560, landmark: false },
      { cat: 'gourmet', ko: 'The Rocks Cafe Pavlova Dessert', en: 'The Rocks Cafe Pavlova Dessert', dur: 80, rank: 10, x: 151.2068, y: -33.8585, landmark: false, harborMarker: true, isHarborMarker: true, mapX: 151.2068, mapY: -33.8585, mapCoordinateSource: 'curated-nearby-land', mapOnlyLandFallback: true }
    ],
    budapest: [
      { cat: 'culture', ko: 'Hungarian Parliament Building', en: 'Hungarian Parliament Building', dur: 120, rank: 1, x: 19.0456, y: 47.5070, landmark: true, open: 540, close: 1320, nightView: true, desc_en: 'Neo-Gothic parliament on the Danube; its illuminated facade is a Budapest night-view landmark.' }
    ],
    reykjavik: [
      { cat: 'culture', ko: 'Hallgrimskirkja Church', en: 'Hallgrimskirkja Church', dur: 90, rank: 1, x: -21.9426, y: 64.1417, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 1, regionalVisitDuration: 90, regionalGroup: 'Reykjavik' },
      { cat: 'culture', ko: 'Harpa Concert Hall', en: 'Harpa Concert Hall', dur: 90, rank: 2, x: -21.9326, y: 64.1500, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 2, regionalVisitDuration: 90, regionalGroup: 'Reykjavik' },
      { cat: 'culture', ko: 'Sun Voyager', en: 'Sun Voyager', dur: 60, rank: 3, x: -21.9227, y: 64.1472, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 3, regionalVisitDuration: 60, regionalGroup: 'Reykjavik' },
      { cat: 'culture', ko: 'Perlan Museum', en: 'Perlan Museum', dur: 120, rank: 4, x: -21.9183, y: 64.1290, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 4, regionalVisitDuration: 120, regionalGroup: 'Reykjavik' },
      { cat: 'gourmet', ko: 'Reykjavik Harbor & Baejarins Beztu', en: 'Reykjavik Harbor & Baejarins Beztu', dur: 90, rank: 5, x: -21.9406, y: 64.1480, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 5, regionalVisitDuration: 90, regionalLunchAfter: true, regionalGroup: 'Reykjavik' },
      { cat: 'healing', ko: 'Blue Lagoon Geothermal Spa', en: 'Blue Lagoon Geothermal Spa', dur: 180, rank: 6, x: -22.4495, y: 63.8804, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 6, regionalVisitDuration: 180, regionalGroup: 'Reykjavik & Reykjanes' },
      { cat: 'healing', ko: 'Blue Lagoon Iceland', en: 'Blue Lagoon Iceland', dur: 180, rank: 7, x: -22.4495, y: 63.8804, regionalEssential: true, regionalRoute: 'reykjavik', regionalRouteOrder: 1, regionalStopOrder: 7, regionalVisitDuration: 180, regionalGroup: 'Reykjavik & Reykjanes' },
      { cat: 'culture', ko: 'Thingvellir National Park', en: 'Thingvellir National Park', dur: 180, rank: 8, x: -21.1300, y: 64.2559, regionalEssential: true, regionalRoute: 'golden-circle', regionalRouteOrder: 2, regionalStopOrder: 1, regionalVisitDuration: 180, regionalGroup: 'Golden Circle' },
      { cat: 'culture', ko: 'Geysir Geothermal Area', en: 'Geysir Geothermal Area', dur: 120, rank: 9, x: -20.3000, y: 64.3104, regionalEssential: true, regionalRoute: 'golden-circle', regionalRouteOrder: 2, regionalStopOrder: 2, regionalVisitDuration: 120, regionalLunchAfter: true, regionalGroup: 'Golden Circle' },
      { cat: 'culture', ko: 'Gullfoss Waterfall', en: 'Gullfoss Waterfall', dur: 120, rank: 10, x: -20.1200, y: 64.3271, regionalEssential: true, regionalRoute: 'golden-circle', regionalRouteOrder: 2, regionalStopOrder: 3, regionalVisitDuration: 120, regionalGroup: 'Golden Circle' },
      { cat: 'healing', ko: 'Seljalandsfoss Waterfall', en: 'Seljalandsfoss Waterfall', dur: 120, rank: 11, x: -19.9886, y: 63.6156, regionalEssential: true, regionalRoute: 'south-coast', regionalRouteOrder: 3, regionalStopOrder: 1, regionalVisitDuration: 120, regionalGroup: 'South Coast' },
      { cat: 'healing', ko: 'Skogafoss Waterfall', en: 'Skogafoss Waterfall', dur: 120, rank: 12, x: -19.5114, y: 63.5321, regionalEssential: true, regionalRoute: 'south-coast', regionalRouteOrder: 3, regionalStopOrder: 2, regionalVisitDuration: 120, regionalLunchAfter: true, regionalGroup: 'South Coast' },
      { cat: 'healing', ko: 'Reynisfjara Black Sand Beach', en: 'Reynisfjara Black Sand Beach', dur: 120, rank: 13, x: -19.0443, y: 63.4043, regionalEssential: true, regionalRoute: 'south-coast', regionalRouteOrder: 3, regionalStopOrder: 3, regionalVisitDuration: 120, regionalGroup: 'South Coast' },
      { cat: 'activity', ko: 'Skaftafell Glacier View Hike', en: 'Skaftafell Glacier View Hike', dur: 180, rank: 14, x: -16.9667, y: 64.0167, regionalEssential: true, regionalRoute: 'southeast', regionalRouteOrder: 4, regionalStopOrder: 1, regionalVisitDuration: 180, regionalGroup: 'Southeast' },
      { cat: 'activity', ko: 'Jokulsarlon Glacier Lagoon & Diamond Beach', en: 'Jokulsarlon Glacier Lagoon & Diamond Beach', dur: 240, rank: 15, x: -16.2306, y: 64.0481, regionalEssential: true, regionalRoute: 'southeast', regionalRouteOrder: 4, regionalStopOrder: 2, regionalVisitDuration: 240, regionalLunchAfter: true, regionalGroup: 'Southeast' },
      { cat: 'activity', ko: 'Godafoss Waterfall', en: 'Godafoss Waterfall', dur: 90, rank: 16, x: -17.5496, y: 65.6828, regionalEssential: true, regionalRoute: 'north', regionalRouteOrder: 5, regionalStopOrder: 1, regionalVisitDuration: 90, regionalGroup: 'North' },
      { cat: 'culture', ko: 'Lake Myvatn Geothermal Area', en: 'Lake Myvatn Geothermal Area', dur: 180, rank: 17, x: -16.9961, y: 65.6039, regionalEssential: true, regionalRoute: 'north', regionalRouteOrder: 5, regionalStopOrder: 2, regionalVisitDuration: 180, regionalLunchAfter: true, regionalGroup: 'North' },
      { cat: 'shopping', ko: 'Akureyri Old Town & Harbor Walk', en: 'Akureyri Old Town & Harbor Walk', dur: 120, rank: 18, x: -18.0907, y: 65.6885, regionalEssential: true, regionalRoute: 'north', regionalRouteOrder: 5, regionalStopOrder: 3, regionalVisitDuration: 120, regionalGroup: 'North' },
      { cat: 'activity', ko: 'Kirkjufell Mountain on Snaefellsnes', en: 'Kirkjufell Mountain on Snaefellsnes', dur: 180, rank: 19, x: -23.3119, y: 64.9417, regionalEssential: true, regionalRoute: 'west-snaefellsnes', regionalRouteOrder: 6, regionalStopOrder: 1, regionalVisitDuration: 180, regionalGroup: 'West / Snaefellsnes' }
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

  E.interlaken.push({
    cat: 'activity', ko: '\uD074\uB77C\uC774\uB124 \uC0E4\uC774\uB370\uD06C \uC0B0\uC545\uC5ED', en: 'Kleine Scheidegg Mountain Pass',
    fr: 'Col de la Kleine Scheidegg', zh: '\u5C0F\u8F9B\u514B\u5CE1\u8C37', ja: '\u30AF\u30E9\u30A4\u30CD\u30FB\u30B7\u30E3\u30A4\u30C7\u30C3\u30AF', es: 'Paso de Kleine Scheidegg',
    dur: 90, rank: 12, x: 7.9614, y: 46.5849,
    desc_ko: '\uC544\uC774\uAC70\u00B7\uBB3C\uD788\u00B7\uC735\uD504\uB77C\uC6B0\uB97C \uC870\uB9DD\uD558\uB294 \uC0B0\uC545 \uC5ED\uACFC \uACE0\uAC1C\uB97C \uB458\uB7EC\uBD05\uB2C8\uB2E4.',
    desc_en: 'Stop at the mountain pass and railway junction for close views of the Eiger, Monch, and Jungfrau.'
  });

  var interlakenRoutes = {
    'Lauterbrunnen Valley': ['lauterbrunnen', 1, 1, 150, false],
    'Staubbach Falls': ['lauterbrunnen', 1, 2, 60, true],
    'Wengen Village Walk': ['lauterbrunnen', 1, 3, 120, false],
    'Grindelwald Village': ['grindelwald', 2, 1, 150, false],
    'Grindelwald-First Viewpoint': ['grindelwald', 2, 2, 180, true],
    'Bachalpsee Hiking Trail': ['grindelwald', 2, 3, 180, false],
    'Kleine Scheidegg Mountain Pass': ['jungfrau', 3, 1, 90, true],
    'Jungfraujoch Top of Europe': ['jungfrau', 3, 2, 300, false],
    'M\u00FCrren Village Walk': ['murren', 4, 1, 120, true],
    'Schilthorn Viewpoint': ['murren', 4, 2, 180, false],
    'Lake Brienz Cruise': ['brienz', 5, 1, 120, true],
    'Giessbach Falls': ['brienz', 5, 2, 120, false],
    'Spiez Castle & Lakefront': ['thun', 6, 1, 120, true],
    'Thun Old Town Walk': ['thun', 6, 2, 150, false]
  };
  E.interlaken.forEach(function (entry) {
    var route = interlakenRoutes[entry.en]
      || (/rren Village Walk$/.test(entry.en || '') ? ['murren', 4, 1, 120, true] : null);
    if (!route) return;
    entry.regionalEssential = true;
    entry.regionalRoute = route[0];
    entry.regionalRouteOrder = route[1];
    entry.regionalStopOrder = route[2];
    entry.regionalVisitDuration = route[3];
    entry.regionalLunchAfter = route[4];
  });

  Object.keys(E).forEach(function (cityId) {
    if (removedIds.indexOf(cityId) === -1) addEntries(cityId, E[cityId]);
  });

  // Apply high-impact venue guidance after every base and curated pool has loaded.
  // Unknown or unopened development concepts are omitted rather than treated as attractions.
  Object.keys(ATTRACTIONS).forEach(function (cityId) {
    var pools = ATTRACTIONS[cityId] || {};
    Object.keys(pools).forEach(function (category) {
      if (!Array.isArray(pools[category])) return;
      pools[category] = pools[category].filter(function (item) {
        if (typeof isBlockedUnopenedPlace === 'function') return !isBlockedUnopenedPlace(item);
        var title = String((item && (item.name_en || item.name_ko || item.name)) || '').toLowerCase();
        return !/^(?:the\s+)?dubai\s*land$/.test(title.trim());
      });
      pools[category].forEach(function (item) {
        var title = String((item && (item.name_en || item.name_ko || item.name)) || '').toLowerCase();
        if (/(?:the\s+)?dubai mall/.test(title) || /\uB450\uBC14\uC774\s*\uBAB0/.test(title)) {
          item.duration = Math.max(Number(item.duration) || 0, 240);
          item.durationSource = 'curated-venue-guidance';
        }
      });
    });
  });

  CITIES.sort(function (a, b) {
    return String(a.name_en || a.id).localeCompare(String(b.name_en || b.id));
  });
  if (typeof window !== 'undefined') {
    window._CITIES_SORTED_EN = CITIES.slice();
  }
})();
