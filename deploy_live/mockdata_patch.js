// ===== mockData Patches: Applied after mockData.js loads =====
// This file patches TRANSLATIONS and ATTRACTIONS without modifying mockData.js

(function () {
  // ---- 1. i18n Route Planner Keys ----
  if (typeof TRANSLATIONS !== 'undefined') {
    if (TRANSLATIONS.ko) {
      Object.assign(TRANSLATIONS.ko, {
        nav_routeplanner: 'AI 도시간 동선 짜기',
        route_desc: '방문할 도시들을 추가하면 AI가 이동시간이 가장 적은 최적 경로와 교통수단을 추천해드립니다. 비행기는 공항 이동, 체크인·보안수속, 수하물 수취까지 포함한 실제 소요시간입니다.',
        route_add_city: '도시 추가',
        route_add_btn: '+ 추가',
        route_optimize_btn: '최적 경로 분석하기',
        route_empty_hint: '도시를 2개 이상 추가하면<br>최적 경로를 추천해드립니다',
        route_result_placeholder: '도시를 추가하고 분석 버튼을 눌러주세요',
        opt_custom_input: '✏️ 직접 입력...'
      });
    }
    if (TRANSLATIONS.en) {
      Object.assign(TRANSLATIONS.en, {
        nav_routeplanner: 'AI Multi-City Route Planner',
        route_desc: 'Add cities you plan to visit and AI will recommend the most efficient route and transport. Flight times include airport transfers, check-in, security and baggage claim.',
        route_add_city: 'Add City',
        route_add_btn: '+ Add',
        route_optimize_btn: 'Analyze Optimal Route',
        route_empty_hint: 'Add 2 or more cities<br>to get the optimal route',
        route_result_placeholder: 'Add cities and click the analyze button',
        opt_custom_input: '✏️ Custom entry...'
      });
    }
  }

  // ---- 2. Seoul: Add 전쟁기념관 (용산) ----
  if (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS.seoul && ATTRACTIONS.seoul.culture) {
    var hasWarMemorial = ATTRACTIONS.seoul.culture.some(function(a) {
      return a.name_en && a.name_en.includes('War Memorial');
    });
    if (!hasWarMemorial) {
      ATTRACTIONS.seoul.culture.unshift({
        name_ko: '전쟁기념관 역사 투어',
        name_en: 'War Memorial of Korea Tour',
        duration: 120,
        desc_ko: '6.25 전쟁과 한국 군사 역사를 기록한 용산 대형 복합 기념관. 실내 전시와 야외 무기 전시 관람.',
        desc_en: 'Large memorial complex in Yongsan documenting the Korean War and military history, with outdoor weapon exhibits.',
        isLandmark: true,
        x: 126.9746,
        y: 37.5363,
        open: 540,
        close: 1080
      });
    }
  }

  // ---- 3. Paris: Move 개선문 & 샹젤리제 to culture (isLandmark) ----
  if (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS.paris) {
    // Remove from shopping if present
    if (ATTRACTIONS.paris.shopping) {
      ATTRACTIONS.paris.shopping = ATTRACTIONS.paris.shopping.filter(function(a) {
        return !((a.name_en || '').includes('Arc de Triomphe') || (a.name_en || '').includes('Champs'));
      });
    }
    // Add to culture front if not already there
    if (ATTRACTIONS.paris.culture) {
      var hasArc = ATTRACTIONS.paris.culture.some(function(a) {
        return (a.name_en || '').includes('Arc de Triomphe') || (a.name_en || '').includes('Champs');
      });
      if (!hasArc) {
        ATTRACTIONS.paris.culture.unshift({
          name_ko: '개선문 & 샹젤리제 대로 랜드마크 투어',
          name_en: 'Arc de Triomphe & Champs-Élysées Boulevard',
          duration: 120,
          desc_ko: '나폴레옹의 개선문에 올라 파리 전경을 내려다보고, 세계에서 가장 아름다운 대로 샹젤리제를 걷는 필수 코스',
          desc_en: 'Climb the Arc de Triomphe for panoramic Paris views, then stroll the world-famous Champs-Élysées boulevard.',
          isLandmark: true,
          x: 2.2950,
          y: 48.8738,
          open: 600,
          close: 1380
        });
      }
      // Add Panthéon
      var hasPantheon = ATTRACTIONS.paris.culture.some(function(a) {
        return (a.name_en || '').includes('Panthéon') || (a.name_ko || '').includes('팡테옹');
      });
      if (!hasPantheon) {
        ATTRACTIONS.paris.culture.push({
          name_ko: '팡테옹 국립묘지 역사 투어',
          name_en: 'Panthéon Historic Mausoleum Tour',
          duration: 90,
          desc_ko: '빅토르 위고, 마리 퀴리 등 프랑스 위인들이 잠든 신고전주의 양식의 웅장한 국립묘지 관람',
          desc_en: 'Visit the grand neoclassical mausoleum resting place of French icons like Victor Hugo and Marie Curie.',
          isLandmark: false,
          x: 2.3464,
          y: 48.8462,
          open: 600,
          close: 1110
        });
      }
    }
  }

  // ---- 4. Paris: Replace FlyView Paris VR Experience with Palais Garnier Opera Tour ----
  if (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS.paris && ATTRACTIONS.paris.activity) {
    ATTRACTIONS.paris.activity = ATTRACTIONS.paris.activity.filter(function(a) {
      return !((a.name_ko || '').includes('가상 패러글라이딩') || (a.name_en || '').includes('FlyView Paris'));
    });
    ATTRACTIONS.paris.activity.push({
      name_ko: '오페라 가르니에 발레 극장 관람',
      name_en: 'Palais Garnier Opera Tour',
      duration: 120,
      desc_ko: '뮤지컬 \'오페라의 유령\' 배경이 된 웅장한 대리석 계단과 샤갈의 천장화 관람',
      desc_en: 'Explore the golden auditorium and grand marble staircase of the historic opera house.',
      isLandmark: false,
      x: 2.3316,
      y: 48.8719,
      open: 600,
      close: 1020
    });
  }

  // ---- 5. Jeju: Replace Seogwipo Paragliding Flight with Jusangjeolli Cliff Coast Walk ----
  if (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS.jeju && ATTRACTIONS.jeju.activity) {
    ATTRACTIONS.jeju.activity = ATTRACTIONS.jeju.activity.filter(function(a) {
      return !((a.name_ko || '').includes('패러글라이딩') || (a.name_en || '').includes('Paragliding'));
    });
    ATTRACTIONS.jeju.activity.push({
      name_ko: '서귀포 대포동 주상절리대 산책',
      name_en: 'Jusangjeolli Cliff Coast Walk',
      duration: 90,
      desc_ko: '화산 폭발로 형성된 기둥 모양의 신비로운 해안 절벽과 산책로 관람',
      desc_en: 'Stroll along the volcanic hexagonal rock columns rising from the blue ocean.',
      isLandmark: false,
      x: 126.3862,
      y: 33.2384,
      open: 540,
      close: 1080
    });
  }

  // ---- 6. Major US cities: richer verified sightseeing data ----
  if (typeof ATTRACTIONS !== 'undefined') {
    function placeKey(item) {
      return String((item && (item.name_en || item.name_ko)) || '').trim().toLowerCase();
    }

    function p(name, duration, x, y, landmark, open, close) {
      return {
        name_ko: '',
        name_en: name,
        duration: duration,
        x: x,
        y: y,
        open: open == null ? 540 : open,
        close: close == null ? 1260 : close,
        isLandmark: !!landmark,
        desc_ko: '',
        desc_en: 'Visit the real verified place: ' + name + '.'
      };
    }

    function appendPlaces(cityId, category, places) {
      if (!ATTRACTIONS[cityId]) return;
      if (!ATTRACTIONS[cityId][category]) ATTRACTIONS[cityId][category] = [];
      var existing = {};
      ATTRACTIONS[cityId][category].forEach(function(item) {
        existing[placeKey(item)] = true;
      });
      places.forEach(function(place) {
        var key = placeKey(place);
        if (!key || existing[key]) return;
        place.cityId = cityId;
        ATTRACTIONS[cityId][category].push(place);
        existing[key] = true;
      });
    }

    function updatePlace(cityId, nameFragment, updates) {
      if (!ATTRACTIONS[cityId]) return;
      ['healing', 'gourmet', 'culture', 'activity', 'shopping'].forEach(function(category) {
        (ATTRACTIONS[cityId][category] || []).forEach(function(item) {
          var name = (item.name_en || item.name_ko || '').toLowerCase();
          if (name.indexOf(nameFragment.toLowerCase()) !== -1) Object.assign(item, updates);
        });
      });
    }

    appendPlaces('losangeles', 'culture', [
      p('The Getty Center', 180, -118.4741, 34.0780, true, 600, 1020),
      p('The Broad', 120, -118.2500, 34.0545, true, 660, 1020),
      p('TCL Chinese Theatre', 90, -118.3409, 34.1020, true, 600, 1320),
      p('LACMA Urban Light', 90, -118.3592, 34.0638, true, 540, 1320)
    ]);
    appendPlaces('losangeles', 'healing', [
      p('Santa Monica Pier', 120, -118.4965, 34.0101, true, 480, 1380),
      p('Venice Beach Boardwalk', 90, -118.4695, 33.9850, true, 480, 1260),
      p('Getty Villa', 150, -118.4759, 34.0459, false, 600, 1020)
    ]);
    appendPlaces('losangeles', 'shopping', [
      p('The Grove Los Angeles', 120, -118.3570, 34.0720, false, 600, 1320),
      p('Grand Central Market Los Angeles', 90, -118.2490, 34.0507, false, 480, 1260),
      p('Abbot Kinney Boulevard', 90, -118.4695, 33.9916, false, 600, 1260)
    ]);
    appendPlaces('losangeles', 'activity', [
      p('Warner Bros Studio Tour Hollywood', 180, -118.3421, 34.1484, true, 510, 1080)
    ]);
    updatePlace('losangeles', 'Universal Studios Hollywood', { duration:480, isLandmark:true });

    appendPlaces('sanfrancisco', 'culture', [
      p('San Francisco Museum of Modern Art', 150, -122.4011, 37.7857, true, 600, 1020),
      p('Palace of Fine Arts', 90, -122.4484, 37.8029, true, 420, 1320),
      p('Painted Ladies at Alamo Square', 60, -122.4330, 37.7764, true, 420, 1260)
    ]);
    appendPlaces('sanfrancisco', 'healing', [
      p('Twin Peaks San Francisco', 90, -122.4477, 37.7544, true, 420, 1260),
      p('Crissy Field', 90, -122.4659, 37.8036, false, 420, 1260)
    ]);
    appendPlaces('sanfrancisco', 'shopping', [
      p('Ferry Building Marketplace', 90, -122.3937, 37.7955, true, 480, 1200),
      p('Ghirardelli Square', 90, -122.4226, 37.8060, false, 600, 1320)
    ]);
    appendPlaces('sanfrancisco', 'activity', [
      p('Exploratorium', 150, -122.3973, 37.8014, false, 600, 1020)
    ]);

    appendPlaces('lasvegas', 'culture', [
      p('Fremont Street Experience', 120, -115.1443, 36.1708, true, 600, 1440),
      p('The Mob Museum', 120, -115.1410, 36.1728, true, 540, 1260),
      p('Sphere Las Vegas', 120, -115.1656, 36.1209, true, 600, 1380)
    ]);
    appendPlaces('lasvegas', 'healing', [
      p('Bellagio Conservatory and Botanical Gardens', 60, -115.1762, 36.1133, true, 0, 1440),
      p('Red Rock Canyon Scenic Drive', 240, -115.4442, 36.1350, false, 480, 1020)
    ]);
    appendPlaces('lasvegas', 'shopping', [
      p('Grand Canal Shoppes at The Venetian', 120, -115.1698, 36.1212, false, 600, 1380),
      p('LINQ Promenade', 90, -115.1691, 36.1175, false, 600, 1440)
    ]);
    appendPlaces('lasvegas', 'activity', [
      p('High Roller Observation Wheel', 90, -115.1682, 36.1177, true, 720, 1440),
      p('AREA15 Las Vegas', 150, -115.1828, 36.1316, false, 720, 1440)
    ]);

    appendPlaces('chicago', 'culture', [
      p('Field Museum', 180, -87.6169, 41.8663, true, 540, 1020),
      p('Willis Tower Skydeck Chicago', 90, -87.6359, 41.8789, true, 540, 1320),
      p('Chicago Cultural Center', 90, -87.6244, 41.8838, false, 600, 1020)
    ]);
    appendPlaces('chicago', 'healing', [
      p('Chicago Riverwalk', 90, -87.6277, 41.8872, true, 420, 1320),
      p('Navy Pier', 120, -87.6098, 41.8917, true, 600, 1320)
    ]);
    appendPlaces('chicago', 'shopping', [
      p('Magnificent Mile', 120, -87.6244, 41.8948, true, 600, 1260)
    ]);
    appendPlaces('chicago', 'activity', [
      p('Chicago Architecture River Cruise', 120, -87.6247, 41.8885, true, 540, 1140)
    ]);

    appendPlaces('miami', 'culture', [
      p('Wynwood Walls', 120, -80.1995, 25.8011, true, 600, 1140),
      p('Vizcaya Museum and Gardens', 150, -80.2101, 25.7444, true, 570, 1020),
      p('Perez Art Museum Miami', 120, -80.1860, 25.7860, false, 600, 1080)
    ]);
    appendPlaces('miami', 'healing', [
      p('South Beach Miami', 120, -80.1300, 25.7826, true, 420, 1320),
      p('Bayfront Park Miami', 90, -80.1870, 25.7751, false, 420, 1320)
    ]);
    appendPlaces('miami', 'shopping', [
      p('Lincoln Road Mall', 120, -80.1386, 25.7907, true, 600, 1320),
      p('Miami Design District', 120, -80.1923, 25.8132, false, 600, 1260)
    ]);
    appendPlaces('miami', 'activity', [
      p('Everglades Airboat Tour', 360, -80.7686, 25.7617, false, 480, 1020)
    ]);

    appendPlaces('boston', 'culture', [
      p('Freedom Trail Boston', 180, -71.0555, 42.3570, true, 480, 1260),
      p('Museum of Fine Arts Boston', 180, -71.0942, 42.3394, true, 600, 1020),
      p('Boston Tea Party Ships and Museum', 120, -71.0513, 42.3522, false, 600, 1020)
    ]);
    appendPlaces('boston', 'healing', [
      p('Boston Public Garden', 90, -71.0690, 42.3541, true, 420, 1260),
      p('Charles River Esplanade', 90, -71.0745, 42.3588, false, 420, 1260)
    ]);
    appendPlaces('boston', 'shopping', [
      p('Faneuil Hall Marketplace', 120, -71.0567, 42.3600, true, 600, 1260),
      p('Newbury Street Boston', 120, -71.0825, 42.3495, false, 600, 1260)
    ]);
    appendPlaces('boston', 'activity', [
      p('Fenway Park Tour', 120, -71.0972, 42.3467, true, 540, 1080)
    ]);

    appendPlaces('seattle', 'culture', [
      p('Chihuly Garden and Glass', 120, -122.3504, 47.6206, true, 600, 1080),
      p('Museum of Pop Culture', 150, -122.3486, 47.6215, true, 600, 1020),
      p('Seattle Art Museum', 120, -122.3375, 47.6074, false, 600, 1020)
    ]);
    appendPlaces('seattle', 'healing', [
      p('Kerry Park Seattle', 60, -122.3598, 47.6295, true, 420, 1320),
      p('Gas Works Park', 90, -122.3344, 47.6456, false, 420, 1260)
    ]);
    appendPlaces('seattle', 'shopping', [
      p('Pike Place Market', 150, -122.3425, 47.6097, true, 540, 1080),
      p('Seattle Waterfront', 90, -122.3403, 47.6062, false, 540, 1260)
    ]);
    appendPlaces('seattle', 'activity', [
      p('Space Needle', 90, -122.3493, 47.6205, true, 540, 1320),
      p('Seattle Underground Tour', 90, -122.3338, 47.6022, false, 600, 1080)
    ]);

    appendPlaces('orlando', 'culture', [
      p('Orlando Museum of Art', 120, -81.3668, 28.5724, false, 600, 1020),
      p('Charles Hosmer Morse Museum', 120, -81.3507, 28.5969, false, 570, 1020)
    ]);
    appendPlaces('orlando', 'healing', [
      p('Lake Eola Park', 90, -81.3723, 28.5436, true, 360, 1440),
      p('Harry P. Leu Gardens', 120, -81.3568, 28.5684, false, 540, 1020)
    ]);
    appendPlaces('orlando', 'shopping', [
      p('Disney Springs', 180, -81.5150, 28.3700, true, 600, 1380),
      p('The Mall at Millenia', 120, -81.4309, 28.4868, false, 600, 1260)
    ]);
    appendPlaces('orlando', 'activity', [
      p('Walt Disney World Magic Kingdom', 480, -81.5812, 28.4177, true, 480, 1380),
      p('Universal Orlando Resort', 480, -81.4690, 28.4744, true, 540, 1320),
      p('EPCOT', 480, -81.5494, 28.3747, false, 540, 1320)
    ]);
    updatePlace('orlando', 'Walt Disney', { duration:480, isLandmark:true });
    updatePlace('orlando', 'Universal', { duration:480, isLandmark:true });

    appendPlaces('sandiego', 'culture', [
      p('USS Midway Museum', 180, -117.1751, 32.7137, true, 600, 1020),
      p('Old Town San Diego State Historic Park', 120, -117.1962, 32.7549, true, 600, 1020)
    ]);
    appendPlaces('sandiego', 'healing', [
      p('La Jolla Cove', 120, -117.2713, 32.8507, true, 420, 1260),
      p('Coronado Beach', 120, -117.1831, 32.6859, false, 420, 1260)
    ]);
    appendPlaces('sandiego', 'shopping', [
      p('Seaport Village San Diego', 90, -117.1705, 32.7093, false, 600, 1260),
      p('Gaslamp Quarter', 120, -117.1604, 32.7115, true, 600, 1380)
    ]);
    appendPlaces('sandiego', 'activity', [
      p('San Diego Zoo', 360, -117.1490, 32.7353, true, 540, 1080),
      p('SeaWorld San Diego', 420, -117.2266, 32.7641, false, 540, 1200)
    ]);

    appendPlaces('washington', 'culture', [
      p('Lincoln Memorial', 90, -77.0502, 38.8893, true, 0, 1440),
      p('Smithsonian National Air and Space Museum', 150, -77.0199, 38.8882, true, 600, 1020),
      p('National Gallery of Art', 150, -77.0200, 38.8913, true, 600, 1020),
      p('United States Capitol', 120, -77.0091, 38.8899, true, 540, 1020)
    ]);
    appendPlaces('washington', 'healing', [
      p('National Mall', 120, -77.0365, 38.8895, true, 0, 1440),
      p('Tidal Basin', 90, -77.0425, 38.8845, true, 420, 1260)
    ]);
    appendPlaces('washington', 'shopping', [
      p('Union Market Washington DC', 90, -76.9975, 38.9087, false, 600, 1260),
      p('Georgetown M Street', 120, -77.0636, 38.9056, false, 600, 1260)
    ]);
    appendPlaces('washington', 'activity', [
      p('Smithsonian National Zoo', 180, -77.0498, 38.9296, false, 480, 1020)
    ]);

    var verifiedCafeNames = [
      'Urth Caffe West Hollywood', 'Blue Bottle Coffee Venice', 'Republik Coffee Lounge', 'Alfred Coffee Melrose',
      'Blue Bottle Coffee Ferry Building', 'Sightglass Coffee SoMa', 'Ritual Coffee Roasters', 'Tartine Bakery',
      'Sambalatte Coffee', 'Mothership Coffee Roasters', 'Urth Caffe Wynn', 'Jean Philippe Patisserie',
      'Intelligentsia Coffee', 'Dark Matter Coffee', 'Sawada Coffee', "Stan's Donuts & Coffee",
      'Panther Coffee Wynwood', 'Versailles Bakery Little Havana', 'Vice City Bean', 'All Day Specialty Coffee',
      'George Howell Coffee', 'Thinking Cup Common', 'Tatte Bakery & Cafe', 'Ogawa Coffee',
      'Original Starbucks Pike Place', 'La Marzocco Cafe', 'Elm Coffee Roasters', 'Victrola Coffee Roasters',
      'Lineage Coffee Roasting', 'Foxtail Coffee Co.', 'Craft & Common', 'Stardust Video & Coffee',
      'Better Buzz Coffee Hillcrest', 'Bird Rock Coffee Roasters', 'Copa Vida', "Lestat's Coffee House",
      'Baked & Wired Café', 'Compass Coffee Bar', 'Blue Bottle Coffee', 'Colada Shop Cafe'
    ];
    var verifiedLookup = {};
    verifiedCafeNames.forEach(function(name) { verifiedLookup[name.toLowerCase()] = true; });
    Object.keys(ATTRACTIONS).forEach(function(cityId) {
      (ATTRACTIONS[cityId].gourmet || []).forEach(function(item) {
        var name = String(item.name_en || item.name_ko || '').toLowerCase();
        if (verifiedLookup[name]) item.verifiedCafe = true;
      });
    });
  }
})();

// ---- 4. Update app name in translations ----
if (typeof TRANSLATIONS !== 'undefined') {
  if (TRANSLATIONS.ko) {
    TRANSLATIONS.ko.nav_logo = 'Together';
    TRANSLATIONS.ko.dash_welcome = '여행 준비를 더 빠르게 시작하세요';
    TRANSLATIONS.ko.dash_start_planner = 'AI 코스 바로 만들기';
    TRANSLATIONS.ko.dash_find_companion = '동행 찾기';
    TRANSLATIONS.ko.dash_popular_dest = '인기 도시로 시작하기';
    TRANSLATIONS.ko.onboard_eyebrow = '3분 안에 첫 일정 만들기';
    TRANSLATIONS.ko.onboard_title = '빈 화면 대신, 도시 하나로 바로 시작하세요';
    TRANSLATIONS.ko.onboard_desc = '도시와 기간만 고르면 AI가 대표 명소, 식사 시간, 동선을 먼저 잡아줍니다. 마음에 드는 일정은 저장하고 링크로 공유할 수 있어요.';
    TRANSLATIONS.ko.onboard_quick_title = '빠른 시작';
    TRANSLATIONS.ko.onboard_city_label = '도시';
    TRANSLATIONS.ko.onboard_days_label = '기간';
    TRANSLATIONS.ko.onboard_quick_hint = '선택한 도시로 AI 일정 생성 화면이 열립니다.';
    TRANSLATIONS.ko.onboard_start_btn = '내 첫 코스 생성하기';
    TRANSLATIONS.ko.onboard_step1_title = '도시와 취향 선택';
    TRANSLATIONS.ko.onboard_step1_desc = '숙소 위치, 여행 기간, 선호하는 여행 스타일을 가볍게 고릅니다.';
    TRANSLATIONS.ko.onboard_step2_title = 'AI 코스 확인';
    TRANSLATIONS.ko.onboard_step2_desc = '명소, 식사, 이동 순서를 한 화면에서 보고 직접 장소를 추가할 수 있습니다.';
    TRANSLATIONS.ko.onboard_step3_title = '저장하고 함께 조율';
    TRANSLATIONS.ko.onboard_step3_desc = '일정을 저장하거나 링크로 공유하고, 필요한 동행도 바로 찾습니다.';
    TRANSLATIONS.ko.onboard_preview_eyebrow = '샘플 결과';
    TRANSLATIONS.ko.onboard_preview_title = '생성 후 바로 볼 수 있는 것';
    TRANSLATIONS.ko.onboard_preview_desc = '하루 일정은 시간대별로 정리되고, 점심·저녁처럼 자유로운 식사 시간은 불필요한 이동 표시 없이 깔끔하게 보여줍니다.';
    TRANSLATIONS.ko.onboard_preview_item1 = '대표 랜드마크부터 시작';
    TRANSLATIONS.ko.onboard_preview_item2 = '자유로운 점심시간';
    TRANSLATIONS.ko.onboard_preview_item3 = '근처 카페 또는 디저트 휴식';
    TRANSLATIONS.ko.dash_subtitle = 'AI 맞춤 코스부터 동행 매칭까지 한 번에';
    TRANSLATIONS.ko.regen_tag_relaxed = '🌿 여유롭게';
    TRANSLATIONS.ko.regen_tag_packed = '🏃 타이트하게';
    TRANSLATIONS.ko.regen_tag_noshopping = '🛍️ 쇼핑 제외';
    TRANSLATIONS.ko.regen_tag_culture = '🏛️ 관광 위주';
    TRANSLATIONS.ko.regen_input_placeholder = '';
    // Planner UI
    TRANSLATIONS.ko.planner_lodging_label = '숙소/시작 지점';
    TRANSLATIONS.ko.planner_lodging_none = '선택 안 함 (관광지에서 바로 시작)';
    TRANSLATIONS.ko.saved_trips_label = '💾 저장된 나의 여행';
    TRANSLATIONS.ko.saved_trips_empty = '저장된 여행이 없습니다.';
    TRANSLATIONS.ko.btn_save_trip = '내 여행 저장';
    TRANSLATIONS.ko.btn_share_trip = '일정 공유';
    TRANSLATIONS.ko.btn_download_offline = '오프라인 다운로드';
    TRANSLATIONS.ko.ai_regen_title = 'AI 피드백 및 코스 재조정';
    TRANSLATIONS.ko.ai_regen_desc = '아래 버튼을 눌러 코스 밀도와 테마를 바로 재조정하세요.';
    TRANSLATIONS.ko.btn_apply = '적용';
    // Modal placeholders
    TRANSLATIONS.ko.modal_room_title_placeholder = '예: 여의도 더현대 서울 쇼핑하고 카폐 같이 가실 분!';
    TRANSLATIONS.ko.modal_room_place_placeholder = '예: 더현대 정문 앞 사거리';
    TRANSLATIONS.ko.modal_room_desc_placeholder = '동행비 정산 및 만날 상세 위치, 추가 설명에 관해 적어주세요...';
    TRANSLATIONS.ko.dash_subtitle = 'AI 맞춤 코스부터 동행 매칭까지 한 번에';
  }
  if (TRANSLATIONS.en) {
    TRANSLATIONS.en.nav_logo = 'Together';
    TRANSLATIONS.en.dash_welcome = 'Start planning your trip faster';
    TRANSLATIONS.en.dash_start_planner = 'Create AI Course';
    TRANSLATIONS.en.dash_find_companion = 'Find Companions';
    TRANSLATIONS.en.dash_popular_dest = 'Start with a Popular City';
    TRANSLATIONS.en.onboard_eyebrow = 'Build your first itinerary in 3 minutes';
    TRANSLATIONS.en.onboard_title = 'Start with one city, not a blank page';
    TRANSLATIONS.en.onboard_desc = 'Choose a city and trip length. AI drafts must-see landmarks, meal blocks, and route order first, then you can save or share the plan.';
    TRANSLATIONS.en.onboard_quick_title = 'Quick Start';
    TRANSLATIONS.en.onboard_city_label = 'City';
    TRANSLATIONS.en.onboard_days_label = 'Days';
    TRANSLATIONS.en.onboard_quick_hint = 'Opens the AI itinerary generator with your selected city.';
    TRANSLATIONS.en.onboard_start_btn = 'Generate My First Course';
    TRANSLATIONS.en.onboard_step1_title = 'Pick City & Style';
    TRANSLATIONS.en.onboard_step1_desc = 'Choose lodging, trip length, and the travel styles you care about.';
    TRANSLATIONS.en.onboard_step2_title = 'Review AI Course';
    TRANSLATIONS.en.onboard_step2_desc = 'See landmarks, meal blocks, and route order in one place, then add your own stops.';
    TRANSLATIONS.en.onboard_step3_title = 'Save & Coordinate';
    TRANSLATIONS.en.onboard_step3_desc = 'Save the itinerary, share a link, and find companions when you need them.';
    TRANSLATIONS.en.onboard_preview_eyebrow = 'Sample Output';
    TRANSLATIONS.en.onboard_preview_title = 'What you get after generation';
    TRANSLATIONS.en.onboard_preview_desc = 'Daily plans are organized by time, with free lunch and dinner blocks kept clean without unnecessary transit details.';
    TRANSLATIONS.en.onboard_preview_item1 = 'Start with must-see landmarks';
    TRANSLATIONS.en.onboard_preview_item2 = 'Flexible lunch block';
    TRANSLATIONS.en.onboard_preview_item3 = 'Nearby cafe or dessert break';
    TRANSLATIONS.en.dash_subtitle = 'AI-crafted itineraries to companion matching, all in one place';
    TRANSLATIONS.en.regen_tag_relaxed = '🌿 Relaxed';
    TRANSLATIONS.en.regen_tag_packed = '🏃 Packed';
    TRANSLATIONS.en.regen_tag_noshopping = '🛍️ No Shopping';
    TRANSLATIONS.en.regen_tag_culture = '🏛️ More Culture';
    TRANSLATIONS.en.regen_input_placeholder = 'Enter your requested change';
    // Planner UI
    TRANSLATIONS.en.planner_lodging_label = 'Lodging / Starting Point';
    TRANSLATIONS.en.planner_lodging_none = 'None (Start directly from attractions)';
    TRANSLATIONS.en.saved_trips_label = '💾 My Saved Trips';
    TRANSLATIONS.en.saved_trips_empty = 'No saved trips yet.';
    TRANSLATIONS.en.btn_save_trip = 'Save Trip';
    TRANSLATIONS.en.btn_share_trip = 'Share Itinerary';
    TRANSLATIONS.en.btn_download_offline = 'Offline Download';
    TRANSLATIONS.en.ai_regen_title = 'AI Feedback & Re-adjust Course';
    TRANSLATIONS.en.ai_regen_desc = 'Use the buttons below to rebuild the course density and theme.';
    TRANSLATIONS.en.btn_apply = 'Apply';
    // Modal placeholders
    TRANSLATIONS.en.modal_room_title_placeholder = 'e.g., Anyone want to shop at The Hyundai Seoul and grab coffee?';
    TRANSLATIONS.en.modal_room_place_placeholder = 'e.g., Intersection in front of The Hyundai main entrance';
    TRANSLATIONS.en.modal_room_desc_placeholder = 'Please write about split costs, exact meet-up location, and other details...';
  }
}

if (typeof TRANSLATIONS !== 'undefined') {
  if (TRANSLATIONS.ko) {
    TRANSLATIONS.ko.profile_photo = '프로필 사진';
    TRANSLATIONS.ko.profile_photo_hint = '1MB 이하의 JPG, PNG 이미지를 사용할 수 있습니다.';
  }
  if (TRANSLATIONS.en) {
    TRANSLATIONS.en.profile_photo = 'Profile Photo';
    TRANSLATIONS.en.profile_photo_hint = 'Use a JPG or PNG image under 1 MB.';
  }
}

if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.ko) {
  TRANSLATIONS.ko.profile_photo = '\uD504\uB85C\uD544 \uC0AC\uC9C4';
  TRANSLATIONS.ko.profile_photo_hint = '1MB \uC774\uD558\uC758 JPG, PNG \uC774\uBBF8\uC9C0\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.';
}

if (typeof TRANSLATIONS !== 'undefined') {
  if (TRANSLATIONS.ko) {
    TRANSLATIONS.ko.profile_photo_reset = '\uC0AC\uC9C4 \uC0AD\uC81C';
  }
  if (TRANSLATIONS.en) {
    TRANSLATIONS.en.profile_photo_reset = 'Remove photo';
  }
}
