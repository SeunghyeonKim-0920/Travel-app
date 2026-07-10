// ===== MULTI-CITY ROUTE OPTIMIZER =====

// Travel time database (door-to-door in minutes)
// Format: { flight: {time, note?}, train: {time, note?}|null, bus: {time, note?}|null }
// Flight door-to-door = city_to_airport(60) + checkin_security(120) + flight_time + baggage(30) + arrival_airport_to_city(60)
const TRAVEL_DB = {
  // ---- EUROPE ----
  'monaco|rome':        { train: { time: 590, note: '니스/벤티밀리아 경유 열차 9h50m (구글맵 기준)' }, flight: { time: 300, note: '니스 공항 출발 로마행 직항 약 5h (공항 이동/대기 포함)' }, bus: { time: 840, note: '시외버스 약 14h' } },
  'monaco|paris':       { train: { time: 390, note: '니스 환승 TGV 열차 6h30m' }, flight: { time: 310, note: '니스 공항 출발 파리행 직항 약 5h10m (공항 이동/대기 포함)' }, bus: { time: 1020, note: '시외버스 약 17h' } },
  'paris|berlin':       { flight: { time: 450 }, train: { time: 510, note: 'TGV/ICE 열차 약 8h30m' }, bus: { time: 1080 } },
  'paris|london':       { train: { time: 155, note: '유로스타 직통 2h35m (시내-시내)' }, flight: { time: 360 }, bus: { time: 555 } },
  'paris|rome':         { flight: { time: 420 }, train: { time: 690, note: 'TGV+야간열차 11h30m (직통)' }, bus: { time: 1260 } },
  'paris|barcelona':    { train: { time: 390, note: 'TGV 직통 6h30m (시내-시내)' }, flight: { time: 390 }, bus: { time: 840 } },
  'paris|amsterdam':    { train: { time: 215, note: 'Thalys 직통 3h25m' }, flight: { time: 360 }, bus: { time: 420 } },
  'paris|interlaken':   { train: { time: 305, note: 'TGV+IC 5h5m' }, flight: null, bus: { time: 600 } },
  'paris|vienna':       { train: { time: 720, note: '야간열차 12h (CNL)' }, flight: { time: 420 }, bus: { time: 1200 } },
  'paris|prague':       { flight: { time: 420 }, train: { time: 750, note: '야간열차 12h30m' }, bus: { time: 840 } },
  'paris|budapest':     { flight: { time: 420 }, train: { time: 825, note: '야간열차 13h45m' }, bus: { time: 1260 } },
  'paris|lisbon':       { flight: { time: 450 }, train: { time: 1350, note: '22h30m (환승 포함)' }, bus: { time: 1620 } },
  'paris|munich':       { train: { time: 370, note: 'TGV+ICE 6h10m' }, flight: { time: 420 }, bus: { time: 780 } },
  'paris|istanbul':     { flight: { time: 480 }, train: null, bus: null },
  'paris|kyoto':        { flight: { time: 900 }, train: null, bus: null },
  'paris|hongkong':     { flight: { time: 810 }, train: null, bus: null },

  'berlin|london':      { flight: { time: 420 }, train: { time: 600, note: '유로스타 환승 포함 10h' }, bus: { time: 1080 } },
  'berlin|rome':        { flight: { time: 420 }, train: { time: 1080, note: '야간열차 18h (환승)' }, bus: { time: 1260 } },
  'berlin|barcelona':   { flight: { time: 420 }, train: null, bus: { time: 1680 } },
  'berlin|amsterdam':   { train: { time: 370, note: 'ICE 6h10m' }, flight: { time: 390 }, bus: { time: 480 } },
  'berlin|interlaken':  { train: { time: 480, note: '8h (환승)' }, flight: null, bus: { time: 720 } },
  'berlin|vienna':      { train: { time: 270, note: 'Railjet 4h30m 직통' }, flight: { time: 390 }, bus: { time: 540 } },
  'berlin|prague':      { train: { time: 240, note: 'EC 4h 직통' }, flight: { time: 390 }, bus: { time: 300 } },
  'berlin|budapest':    { train: { time: 390, note: 'EC 6h30m (직통)' }, flight: { time: 390 }, bus: { time: 720 } },
  'berlin|munich':      { train: { time: 240, note: 'ICE 4h 직통' }, flight: { time: 390 }, bus: { time: 480 } },
  'berlin|istanbul':    { flight: { time: 450 }, train: null, bus: null },
  'berlin|lisbon':      { flight: { time: 480 }, train: null, bus: null },
  'berlin|kyoto':       { flight: { time: 900 }, train: null, bus: null },
  'berlin|hongkong':    { flight: { time: 810 }, train: null, bus: null },
  'berlin|seoul':       { flight: { time: 870 }, train: null, bus: null },
  'berlin|tokyo':       { flight: { time: 870 }, train: null, bus: null },

  'london|rome':        { flight: { time: 390 }, train: null, bus: null },
  'london|barcelona':   { flight: { time: 360 }, train: null, bus: null },
  'london|amsterdam':   { train: { time: 215, note: 'Eurostar 3h35m' }, flight: { time: 360 }, bus: { time: 480 } },
  'london|interlaken':  { train: { time: 450, note: 'Eurostar+TGV+IC 7h30m' }, flight: null, bus: null },
  'london|vienna':      { flight: { time: 390 }, train: null, bus: null },
  'london|prague':      { flight: { time: 360 }, train: null, bus: null },
  'london|budapest':    { flight: { time: 390 }, train: null, bus: null },
  'london|munich':      { flight: { time: 360 }, train: null, bus: null },
  'london|istanbul':    { flight: { time: 450 }, train: null, bus: null },
  'london|lisbon':      { flight: { time: 420 }, train: null, bus: null },
  'london|dublin':      { flight: { time: 330 }, bus: { time: 690, note: '버스+페리 11h30m' } },

  'rome|barcelona':     { flight: { time: 390 }, train: null, bus: null },
  'rome|amsterdam':     { flight: { time: 390 }, train: { time: 1020, note: '17h (야간열차)' }, bus: null },
  'rome|interlaken':    { train: { time: 390, note: 'IC 6h30m' }, flight: null, bus: null },
  'rome|vienna':        { train: { time: 450, note: 'Railjet 7h30m' }, flight: { time: 390 }, bus: null },
  'rome|prague':        { flight: { time: 390 }, train: { time: 1320, note: '22h (야간)' }, bus: null },
  'rome|budapest':      { train: { time: 720, note: '12h (야간열차 직통)' }, flight: { time: 390 }, bus: null },
  'rome|munich':        { train: { time: 560, note: 'EuroCity 직통 열차 약 9h20m' }, flight: { time: 390 }, bus: null },
  'rome|istanbul':      { flight: { time: 420 }, train: null, bus: null },
  'rome|lisbon':        { flight: { time: 450 }, train: null, bus: null },

  'barcelona|amsterdam':  { flight: { time: 390 }, train: null, bus: null },
  'barcelona|interlaken': { train: { time: 450, note: 'TGV+IC 7h30m' }, flight: null, bus: null },
  'barcelona|vienna':     { flight: { time: 390 }, train: null, bus: null },
  'barcelona|prague':     { flight: { time: 390 }, train: null, bus: null },
  'barcelona|budapest':   { flight: { time: 390 }, train: null, bus: null },
  'barcelona|munich':     { train: { time: 420, note: 'TGV+ICE 7h' }, flight: { time: 390 }, bus: null },
  'barcelona|lisbon':     { flight: { time: 390 }, train: { time: 720, note: '12h (Trenhotel 야간)' }, bus: null },
  'barcelona|istanbul':   { flight: { time: 450 }, train: null, bus: null },

  'amsterdam|interlaken': { train: { time: 390, note: 'ICE+IC 6h30m' }, flight: null, bus: null },
  'amsterdam|vienna':     { train: { time: 660, note: 'ICE 11h (환승)' }, flight: { time: 390 }, bus: null },
  'amsterdam|prague':     { train: { time: 480, note: 'ICE 8h (직통)' }, flight: { time: 360 }, bus: null },
  'amsterdam|budapest':   { flight: { time: 390 }, train: { time: 720, note: '12h (야간)' }, bus: null },
  'amsterdam|munich':     { train: { time: 360, note: 'ICE 6h' }, flight: { time: 390 }, bus: null },
  'amsterdam|istanbul':   { flight: { time: 420 }, train: null, bus: null },
  'amsterdam|lisbon':     { flight: { time: 420 }, train: null, bus: null },

  'interlaken|vienna':    { train: { time: 420, note: '7h (환승)' }, flight: null, bus: null },
  'interlaken|prague':    { train: { time: 480, note: '8h (환승)' }, flight: null, bus: null },
  'interlaken|budapest':  { train: { time: 540, note: '9h (환승)' }, flight: null, bus: null },
  'interlaken|munich':    { train: { time: 210, note: '3h30m (환승)' }, flight: null, bus: null },
  'interlaken|milan':     { train: { time: 210, note: '3h30m 직통' }, flight: null, bus: null },

  'vienna|prague':        { train: { time: 240, note: 'Railjet 4h 직통' }, bus: { time: 270 }, flight: { time: 360 } },
  'vienna|budapest':      { train: { time: 165, note: 'Railjet 2h45m 직통' }, bus: { time: 195 }, flight: null },
  'vienna|munich':        { train: { time: 230, note: 'Railjet 3h50m 직통' }, flight: { time: 360 }, bus: { time: 300 } },
  'vienna|istanbul':      { flight: { time: 420 }, train: null, bus: null },
  'vienna|lisbon':        { flight: { time: 450 }, train: null, bus: null },

  'prague|budapest':      { train: { time: 270, note: 'EC 4h30m 직통' }, bus: { time: 300 }, flight: null },
  'prague|munich':        { train: { time: 240, note: 'EC 4h 직통' }, bus: { time: 300 }, flight: { time: 360 } },
  'prague|istanbul':      { flight: { time: 390 }, train: null, bus: null },

  'budapest|munich':      { train: { time: 360, note: 'Railjet 6h 직통' }, flight: { time: 390 }, bus: { time: 450 } },
  'budapest|istanbul':    { flight: { time: 390 }, train: null, bus: null },
  'budapest|lisbon':      { flight: { time: 450 }, train: null, bus: null },

  'munich|istanbul':      { flight: { time: 420 }, train: null, bus: null },
  'munich|lisbon':        { flight: { time: 450 }, train: null, bus: null },

  // ---- ASIA ----
  'istanbul|kyoto':       { flight: { time: 840 }, train: null, bus: null },
  'istanbul|hongkong':    { flight: { time: 690 }, train: null, bus: null },
  'istanbul|seoul':       { flight: { time: 720 }, train: null, bus: null },
  'istanbul|tokyo':       { flight: { time: 780 }, train: null, bus: null },
  'istanbul|dubai':       { flight: { time: 420 }, train: null, bus: null },

  'seoul|tokyo':          { flight: { time: 390 }, train: null, bus: null },
  'seoul|osaka':          { flight: { time: 390 }, train: null, bus: null },
  'seoul|kyoto':          { flight: { time: 390 }, train: null, bus: null },
  'seoul|hongkong':       { flight: { time: 450 }, train: null, bus: null },
  'seoul|taipei':         { flight: { time: 420 }, train: null, bus: null },
  'seoul|bangkok':        { flight: { time: 510 }, train: null, bus: null },
  'seoul|singapore':      { flight: { time: 540 }, train: null, bus: null },
  'seoul|jeju':           { flight: { time: 210 }, train: null, bus: null },

  'tokyo|osaka':          { train: { time: 165, note: '신칸센 노조미 2h45m 직통' }, flight: { time: 360 }, bus: { time: 540 } },
  'tokyo|kyoto':          { train: { time: 145, note: '신칸센 노조미 2h25m 직통' }, flight: null, bus: { time: 480 } },
  'tokyo|hongkong':       { flight: { time: 480 }, train: null, bus: null },
  'tokyo|taipei':         { flight: { time: 420 }, train: null, bus: null },
  'tokyo|bangkok':        { flight: { time: 540 }, train: null, bus: null },
  'tokyo|singapore':      { flight: { time: 570 }, train: null, bus: null },

  'osaka|kyoto':          { train: { time: 30, note: '신칸센/JR 30분 직통' }, bus: { time: 75 }, flight: null },
  'osaka|hongkong':       { flight: { time: 450 }, train: null, bus: null },
  'osaka|taipei':         { flight: { time: 420 }, train: null, bus: null },
  'osaka|bangkok':        { flight: { time: 510 }, train: null, bus: null },

  'kyoto|hongkong':       { flight: { time: 450 }, train: null, bus: null },

  'hongkong|taipei':      { flight: { time: 360 }, train: null, bus: null },
  'hongkong|bangkok':     { flight: { time: 390 }, train: null, bus: null },
  'hongkong|singapore':   { flight: { time: 420 }, train: null, bus: null },

  'taipei|bangkok':       { flight: { time: 420 }, train: null, bus: null },
  'taipei|singapore':     { flight: { time: 450 }, train: null, bus: null },

  'bangkok|singapore':    { flight: { time: 420 }, train: { time: 1320, note: '22h (야간열차+버스)' }, bus: null },
  'bangkok|bali':         { flight: { time: 450 }, train: null, bus: null },

  'singapore|bali':       { flight: { time: 390 }, train: null, bus: null },

  // ---- AMERICAS ----
  'newyork|london':       { flight: { time: 600 }, train: null, bus: null },
  'newyork|paris':        { flight: { time: 600 }, train: null, bus: null },
  'newyork|toronto':      { flight: { time: 360 }, train: { time: 840, note: 'VIA Rail 14h (환승)' }, bus: { time: 810 } },

  // ---- MIDDLE EAST / OTHERS ----
  'dubai|singapore':      { flight: { time: 570 }, train: null, bus: null },
  'dubai|bangkok':        { flight: { time: 480 }, train: null, bus: null },
  'dubai|tokyo':          { flight: { time: 660 }, train: null, bus: null },
  'dubai|seoul':          { flight: { time: 630 }, train: null, bus: null },

  // Italian city connections
  'rome|florence':      { train: { time: 95, note: '고속열차(Frecciarossa/Italo) 직통 1h35m' }, bus: { time: 210, note: '고속버스 3h30m' } },
  'florence|venice':    { train: { time: 125, note: '고속열차 직통 2h5m' }, bus: { time: 250, note: '고속버스 4h10m' } },
  'venice|milan':       { train: { time: 145, note: '고속열차 직통 2h25m' }, bus: { time: 260, note: '고속버스 4h20m' } },
  'rome|venice':        { train: { time: 225, note: '고속열차 직통 3h45m' }, flight: { time: 330 } },
  'rome|milan':         { train: { time: 200, note: '고속열차 직통 3h20m' }, flight: { time: 330 } },
  'milan|florence':     { train: { time: 110, note: '고속열차 직통 1h50m' }, bus: { time: 240 } },
  
  'venice|munich':      { train: { time: 420, distanceKm: 306, connectionType: 'direct', note_ko: '베니스-뮌헨 열차 약 6시간 45분~7시간 30분, 10분 단위 반올림', note_en: 'Venice-Munich rail route about 6h45m-7h30m; rounded to 10 minutes.' }, bus: { time: 650, distanceKm: 540, connectionType: 'direct', note_ko: '도시간 버스/도로 이동 약 10시간 50분', note_en: 'Intercity coach/road route about 10h50m.' }, flight: null },
  'helsinki|stockholm': { flight: { time: 300, actualFlightTime: 70, waitTime: 90, transferTime: 140, distanceKm: 462, connectionType: 'direct', fixedTime: true, note_ko: '헬싱키-스톡홀름은 항공 이동이 실질적으로 가장 빠릅니다. 공항 이동과 대기 시간을 포함한 door-to-door 기준입니다.', note_en: 'Flight is the practical fastest option; door-to-door estimate includes airports.' }, ferry: { time: 1020, distanceKm: 460, connectionType: 'direct', note_ko: '직항 발트해 페리는 보통 약 16~17시간 소요', note_en: 'Direct Baltic ferry usually takes about 16-17h.' }, train: null, bus: null },
  'copenhagen|berlin':  { flight: { time: 350, actualFlightTime: 80, waitTime: 120, transferTime: 150, distanceKm: 410, connectionType: 'direct', fixedTime: true, note_ko: '코펜하겐-베를린 항공 약 5시간 50분 (공항 이동/수속/대기 포함)', note_en: 'Copenhagen-Berlin flight about 5h50m door-to-door, including airport transfers and wait time.' }, train: { time: 450, distanceKm: 620, connectionType: 'via', note_ko: '함부르크 경유 열차 약 7시간 30분 (시내-시내 기준)', note_en: 'Train via Hamburg about 7h30m city-to-city.' }, bus: { time: 460, distanceKm: 440, connectionType: 'direct', note_ko: '직행 시외버스 약 7시간 40분', note_en: 'Direct coach about 7h40m.' } },

  // ---- PORTUGAL / SPAIN / UK / SWITZERLAND CONNECTIONS ----
  'porto|lisbon':       { train: { time: 180, note: 'Alfa Pendular 고속열차 직통 3h (구글맵 기준)' }, bus: { time: 210, note: '시외버스 약 3h30m (구글맵 기준)' } },
  'porto|madrid':       { train: { time: 540, note: '열차 환승 약 9h (구글맵 기준)' }, bus: { time: 480, note: '시외버스 약 8h (구글맵 기준)' } },
  'geneva|paris':       { train: { time: 195, note: 'TGV Lyria 직통 3h15m (구글맵 기준)' }, bus: { time: 420, note: '시외버스 약 7h (구글맵 기준)' } },
  'geneva|milan':       { train: { time: 240, note: 'EuroCity 직통 4h (구글맵 기준)' }, bus: { time: 330, note: '시외버스 약 5h30m (구글맵 기준)' } },
  'geneva|interlaken':  { train: { time: 165, note: '열차 환승 2h45m (구글맵 기준)' }, bus: { time: 210, note: '시외버스 약 3h30m (구글맵 기준)' } },
  'geneva|munich':      { train: { time: 390, note: '열차 환승 6h30m (구글맵 기준)' }, bus: { time: 480, note: '시외버스 약 8h (구글맵 기준)' } },
  'edinburgh|london':    { train: { time: 260, note: 'LNER 직통 열차 4h20m (구글맵 기준)' }, bus: { time: 570, note: '시외버스 약 9h30m (구글맵 기준)' } },

  // ---- EXTRA USER REAL GOOGLE MAPS CONNECTIONS ----
  'lisbon|madrid':      { train: { time: 540, note: '열차 환승 약 9h (구글맵 기준)' }, bus: { time: 450, note: '시외버스 약 7h30m (구글맵 기준)' }, flight: { time: 80 } },
  'barcelona|madrid':   { train: { time: 150, note: 'AVE 고속열차 직통 2h30m (구글맵 기준)' }, bus: { time: 450, note: '시외버스 약 7h30m (구글맵 기준)' } },
  'barcelona|andorra_la_vella': { bus: { time: 180, note: '시외버스 약 3h (구글맵 기준)' } },
  'interlaken|vaduz':   { train: { time: 150, note: '열차 환승 약 2h30m (구글맵 기준)' }, bus: { time: 240, note: '시외버스 약 4h (구글맵 기준)' } },
  'munich|vaduz':       { train: { time: 180, note: '열차 환승 약 3h (구글맵 기준)' }, bus: { time: 220, note: '시외버스 약 3h40m (구글맵 기준)' } },
  'monaco|milan':       { train: { time: 270, note: '열차 환승 약 4h30m (구글맵 기준)' } },
  'rome|geneva':        { train: { time: 420, note: '열차 환승 약 7h (구글맵 기준)' }, flight: { time: 90 } },
  'paris|madrid':       { train: { time: 570, note: 'TGV 직통 열차 약 9h30m (구글맵 기준)' }, flight: { time: 120 } },
  'london|milan':       { flight: { time: 120 } },
  'london|geneva':      { flight: { time: 100 }, train: { time: 390, note: '유로스타+TGV 환승 약 6h30m (구글맵 기준)' } },
  'tokyo|sapporo':      { flight: { time: 90 }, train: { time: 480, note: '신칸센 환승 약 8h (구글맵 기준)' } },
  'osaka|sapporo':      { flight: { time: 120 } },
  'kyoto|sapporo':      { flight: { time: 120 } },
  'geneva|vienna':      { train: { time: 470, note: 'Railjet 직통 열차 약 7h50m (구글맵 기준)' }, flight: { time: 100 } },
  'geneva|prague':      { train: { time: 690, note: '열차 환승 약 11h30m (구글맵 기준)' }, flight: { time: 90 } },
  'madrid|rome':        { flight: { time: 140 } },
  'madrid|munich':      { flight: { time: 150 } },
  'madrid|berlin':      { flight: { time: 180 } },
  'madrid|london':      { flight: { time: 140 } },
  'madrid|amsterdam':   { flight: { time: 160 } },
  'madrid|vienna':      { flight: { time: 180 } },
  'madrid|prague':      { flight: { time: 170 } },
  'madrid|budapest':    { flight: { time: 190 } }
};

// Recalculate all flight times in TRAVEL_DB to reflect total travel duration (flight time + airport wait + transfers)
function initializeTravelDatabase() {
  // Do not recalculate transport times from geographic distance.
  // Only explicit TRAVEL_DB values should be displayed as travel durations.
}

function getCityLandmass(cityId) {
  // Direct city overrides
  const cityMap = {
    seoul: 'korea',
    jeju: 'jeju',
    tokyo: 'japan_honshu',
    osaka: 'japan_honshu',
    kyoto: 'japan_honshu',
    sapporo: 'japan_hokkaido',
    taipei: 'taiwan',
    hongkong: 'china_mainland',
    shanghai: 'china_mainland',
    singapore: 'southeast_asia',
    kuala_lumpur: 'southeast_asia',
    bangkok: 'southeast_asia',
    hanoi: 'southeast_asia',
    dublin: 'ireland',
    wellington: 'new_zealand_north',
    queenstown: 'new_zealand_south',
    bali: 'bali',
    istanbul: 'europe' // Spans Europe/Asia, connects to Europe
  };

  if (cityMap[cityId]) return cityMap[cityId];

  // Try to find the city in CITIES to check its country
  const found = typeof CITIES !== 'undefined' && CITIES.find(c => c.id === cityId);
  if (found) {
    const country = (found.country_en || '').toLowerCase();
    
    // Europe countries
    const europeCountries = [
      'france', 'germany', 'spain', 'italy', 'united kingdom', 'uk', 'portugal', 
      'czech republic', 'switzerland', 'greece', 'ukraine', 'luxembourg', 
      'monaco', 'belgium', 'norway', 'finland', 'sweden', 'denmark', 'austria', 
      'hungary', 'romania', 'poland', 'netherlands'
    ];
    if (europeCountries.some(c => country.includes(c))) {
      return 'europe';
    }

    // North America countries
    const naCountries = ['united states', 'usa', 'us', 'canada', 'mexico'];
    if (naCountries.some(c => country.includes(c))) {
      return 'north_america';
    }

    // South America countries
    const saCountries = ['brazil', 'colombia', 'chile', 'peru', 'ecuador', 'argentina'];
    if (saCountries.some(c => country.includes(c))) {
      return 'south_america';
    }

    // Middle East
    const meCountries = ['uae', 'united arab emirates', 'qatar', 'kuwait', 'saudi arabia', 'iraq'];
    if (meCountries.some(c => country.includes(c))) {
      return 'middle_east';
    }

    // Australia
    if (country.includes('australia')) return 'australia';

    // South Africa
    if (country.includes('south africa')) return 'south_africa';

    // Egypt
    if (country.includes('egypt')) return 'egypt';

    // Morocco
    if (country.includes('morocco')) return 'morocco';

    // Vietnam, Malaysia, Thailand, etc.
    const seaCountries = ['vietnam', 'malaysia', 'thailand', 'singapore', 'indonesia', 'philippines'];
    if (seaCountries.some(c => country.includes(c))) {
      return 'southeast_asia';
    }
  }

  return 'unknown';
}

function areCitiesLandConnected(id1, id2, km) {
  const m1 = getCityLandmass(id1);
  const m2 = getCityLandmass(id2);
  
  // If either landmass is unknown, fall back to geographic distance.
  // If they are within 350km, assume they can be land-connected (e.g. custom cities).
  if (m1 === 'unknown' || m2 === 'unknown') {
    return km < 350;
  }
  
  return m1 === m2;
}

function getRouteCityCountryKey(cityId) {
  const found = typeof CITIES !== 'undefined' && CITIES.find(c => c.id === cityId);
  return found ? String(found.country_en || '').trim().toLowerCase() : '';
}

function isRouteCountryPair(country1, country2, a, b) {
  return (country1 === a && country2 === b) || (country1 === b && country2 === a);
}

function getLandFallbackTimingProfile(fromId, toId, km) {
  const baseTrainSpeed = km < 120 ? 70 : (km < 500 ? 120 : 145);
  const baseTrainBuffer = km < 120 ? 35 : (km < 500 ? 55 : 80);
  const baseProfile = {
    railFactor: 1.25,
    roadFactor: 1.25,
    trainSpeed: baseTrainSpeed,
    trainBuffer: baseTrainBuffer,
    busSpeed: 80,
    busBuffer: 45,
    connectionType: null,
    adjusted: false
  };

  const country1 = getRouteCityCountryKey(fromId);
  const country2 = getRouteCityCountryKey(toId);
  const hasNordicCentralRailFriction = country1 && country2 && country1 !== country2 && km >= 300 && km < 900 && [
    ['denmark', 'germany'],
    ['denmark', 'czech republic'],
    ['denmark', 'austria'],
    ['sweden', 'germany'],
    ['norway', 'germany']
  ].some(([a, b]) => isRouteCountryPair(country1, country2, a, b));

  if (!hasNordicCentralRailFriction) return baseProfile;

  return {
    railFactor: 1.55,
    roadFactor: 1.35,
    trainSpeed: km < 500 ? 95 : 110,
    trainBuffer: km < 500 ? 95 : 130,
    busSpeed: 75,
    busBuffer: 60,
    connectionType: 'via',
    adjusted: true
  };
}

function buildFallbackLandOptions(fromId, toId, km, isKo) {
  const profile = getLandFallbackTimingProfile(fromId, toId, km);
  const railKm = km * profile.railFactor;
  const roadKm = km * profile.roadFactor;
  const trainTime = roundRouteMinutes(profile.trainBuffer + (railKm / profile.trainSpeed) * 60);
  const busTime = roundRouteMinutes(profile.busBuffer + (roadKm / profile.busSpeed) * 60);
  const trainNote = profile.adjusted
    ? (isKo ? '국경/환승/우회 구간을 반영한 도시간 철도 추정 시간' : 'Rail estimate adjusted for border crossings, transfers, and indirect routing')
    : (isKo ? '도시간 철도 기준 이동시간' : 'Rail-based city-to-city travel time');
  const busNote = profile.adjusted
    ? (isKo ? '국경/우회 구간을 반영한 도시간 도로 추정 시간' : 'Road estimate adjusted for border crossings and indirect routing')
    : (isKo ? '도시간 도로 기준 이동시간' : 'Road-based city-to-city travel time');

  return {
    train: {
      time: trainTime,
      distanceKm: Math.round(railKm),
      note: trainNote,
      ...(profile.connectionType ? { connectionType: profile.connectionType } : {})
    },
    bus: {
      time: busTime,
      distanceKm: Math.round(roadKm),
      note: busNote
    }
  };
}

let routeMixedBuildDepth = 0;

function cloneTravelData(data) {
  if (!data) return {};
  const cloned = {};
  ['flight', 'train', 'bus', 'ferry', 'mixed'].forEach(type => {
    if (data[type]) cloned[type] = { ...data[type] };
  });
  return cloned;
}

const ROUTE_MAJOR_AIR_HUBS = new Set([
  'newyork', 'losangeles', 'sanfrancisco', 'seattle', 'chicago', 'miami', 'boston',
  'london', 'paris', 'amsterdam', 'madrid', 'barcelona', 'rome', 'milan', 'munich',
  'berlin', 'istanbul', 'dubai', 'abudhabi', 'seoul', 'tokyo', 'osaka', 'hongkong',
  'bangkok', 'taipei', 'singapore', 'sydney', 'toronto', 'mexicocity'
]);

function getRouteDistanceKm(fromId, toId) {
  const from = getCityCenter(fromId);
  const to = getCityCenter(toId);
  if (!from || !to) return Infinity;
  const km = haversineKm(from.lat, from.lon, to.lat, to.lon);
  return Number.isFinite(km) ? km : Infinity;
}

function getEstimatedFlightProfile(fromId, toId, km) {
  const shortHaul = km < 900;
  const mediumHaul = km < 4200;
  const longHaul = km >= 4200;
  const bothHubs = ROUTE_MAJOR_AIR_HUBS.has(fromId) && ROUTE_MAJOR_AIR_HUBS.has(toId);
  const direct = km <= 3600 || (bothHubs && km <= 9200);
  const speed = shortHaul ? 610 : mediumHaul ? 760 : 850;
  const taxiAndClimb = shortHaul ? 35 : 50;
  let actualFlightTime = roundRouteMinutes((km / speed) * 60 + taxiAndClimb);
  let layoverTime = 0;
  if (!direct) {
    layoverTime = roundRouteMinutes(longHaul ? 150 : 110);
    actualFlightTime = roundRouteMinutes(actualFlightTime + 45);
  }
  const transferTime = roundRouteMinutes(shortHaul ? 130 : 160);
  const airportProcessTime = roundRouteMinutes(shortHaul ? 105 : 135);
  const baggageTime = roundRouteMinutes(shortHaul ? 20 : 30);
  const waitTime = airportProcessTime + layoverTime;
  const total = roundRouteMinutes(actualFlightTime + transferTime + waitTime + baggageTime);

  return {
    time: total,
    actualFlightTime,
    waitTime,
    transferTime,
    baggageTime,
    layoverTime,
    distanceKm: Math.round(km),
    connectionType: direct ? 'direct' : 'via',
    estimated: true,
    note_ko: direct
      ? '항공편 기준 도어투도어 예상 시간입니다. 시내-공항 이동, 체크인/보안검색, 수하물 시간을 포함합니다.'
      : '직항이 제한적인 구간으로 경유 항공편 기준 도어투도어 예상 시간입니다. 시내-공항 이동, 체크인/보안검색, 경유 대기, 수하물 시간을 포함합니다.',
    note_en: direct
      ? 'Door-to-door flight estimate including city-airport transfers, check-in/security, and baggage time.'
      : 'Connecting-flight door-to-door estimate including city-airport transfers, check-in/security, layover, and baggage time.'
  };
}

function shouldAddEstimatedFlightOption(cloned, fromId, toId, km) {
  if (!Number.isFinite(km) || km < 280) return false;
  const landBest = getBestTransport({
    train: cloned.train,
    bus: cloned.bus,
    ferry: cloned.ferry,
    mixed: cloned.mixed
  });
  if (!landBest || !landBest.best) return true;
  const landTime = Number(landBest.best.time);
  if (!Number.isFinite(landTime)) return true;
  return km >= 650 && landTime >= 360;
}

function addEstimatedFlightFallback(cloned, fromId, toId) {
  if (!cloned || cloned.flight) return cloned;
  const km = getRouteDistanceKm(fromId, toId);
  if (!shouldAddEstimatedFlightOption(cloned, fromId, toId, km)) return cloned;
  cloned.flight = getEstimatedFlightProfile(fromId, toId, km);
  return cloned;
}

function normalizeExplicitFlightTiming(cloned, fromId, toId) {
  if (!cloned || !cloned.flight || cloned.flight.fixedTime) return cloned;
  const km = getRouteDistanceKm(fromId, toId);
  if (!Number.isFinite(km) || km < 1) return cloned;
  const estimate = getEstimatedFlightProfile(fromId, toId, km);
  const existing = cloned.flight;
  const existingTime = Number(existing.time);
  const looksLikeAirborneOnly = Number.isFinite(existingTime) && existingTime > 0 && existingTime < Math.max(210, estimate.actualFlightTime + 45);
  cloned.flight = {
    ...estimate,
    ...existing,
    actualFlightTime: Number.isFinite(existing.actualFlightTime)
      ? roundRouteMinutes(existing.actualFlightTime)
      : (looksLikeAirborneOnly ? roundRouteMinutes(existingTime) : estimate.actualFlightTime),
    waitTime: Number.isFinite(existing.waitTime) ? roundRouteMinutes(existing.waitTime) : estimate.waitTime,
    transferTime: Number.isFinite(existing.transferTime) ? roundRouteMinutes(existing.transferTime) : estimate.transferTime,
    baggageTime: Number.isFinite(existing.baggageTime) ? roundRouteMinutes(existing.baggageTime) : estimate.baggageTime,
    layoverTime: Number.isFinite(existing.layoverTime) ? roundRouteMinutes(existing.layoverTime) : estimate.layoverTime,
    distanceKm: Number.isFinite(existing.distanceKm) ? existing.distanceKm : estimate.distanceKm,
    connectionType: existing.connectionType || estimate.connectionType,
    estimated: existing.estimated === false ? false : true
  };
  const doorToDoor = roundRouteMinutes(
    cloned.flight.actualFlightTime +
    cloned.flight.waitTime +
    cloned.flight.transferTime +
    cloned.flight.baggageTime
  );
  cloned.flight.time = roundRouteMinutes(Math.max(Number.isFinite(existingTime) ? existingTime : 0, doorToDoor));
  if (!existing.note && !existing.note_ko && !existing.note_en) {
    cloned.flight.note_ko = estimate.note_ko;
    cloned.flight.note_en = estimate.note_en;
  }
  return cloned;
}

// Get travel data for a city pair (bidirectional)
function getTravelData(fromId, toId) {
  const key1 = `${fromId}|${toId}`;
  const key2 = `${toId}|${fromId}`;
  let data = TRAVEL_DB[key1] || TRAVEL_DB[key2];
  const cloned = addEstimatedFlightFallback(cloneTravelData(data), fromId, toId);
  normalizeExplicitFlightTiming(cloned, fromId, toId);
  if (routeMixedBuildDepth === 0) {
    const mixed = buildMixedTransportOption(fromId, toId, cloned);
    if (mixed) cloned.mixed = mixed;
  }
  return Object.keys(cloned).length ? cloned : null;
}

function getRouteCurrentLang(isKo = null) {
  if (typeof isKo === 'boolean') return isKo ? 'ko' : 'en';
  if (typeof isKo === 'string') {
    return typeof normalizeLanguageCode === 'function' ? normalizeLanguageCode(isKo) : isKo.toLowerCase();
  }
  if (typeof normalizeLanguageCode === 'function' && typeof state !== 'undefined') return normalizeLanguageCode(state.lang);
  if (typeof state !== 'undefined' && state.lang) return String(state.lang).toLowerCase();
  return 'en';
}

function getRouteCityDisplayName(city, isKo = null) {
  if (!city) return '';
  const lang = getRouteCurrentLang(isKo);
  if (typeof getLocalizedCityField === 'function') return getLocalizedCityField(city, 'name', lang);
  return lang === 'ko' ? (city.name_ko || city.name_en || city.id) : (city.name_en || city.name_ko || city.id);
}

function getRouteCityCountryName(city, isKo = null) {
  if (!city) return '';
  const lang = getRouteCurrentLang(isKo);
  if (typeof getLocalizedCityField === 'function') return getLocalizedCityField(city, 'country', lang);
  return lang === 'ko' ? (city.country_ko || city.country_en || '') : (city.country_en || city.country_ko || '');
}

function buildMixedTransportOption(fromId, toId, baseData) {
  if (fromId === toId || routeMixedBuildDepth > 0 || typeof CITIES === 'undefined' || !Array.isArray(CITIES)) return null;
  const isKo = typeof state !== 'undefined' && state.lang === 'ko';
  const baseBest = getBestTransport(baseData);
  const baseTime = baseBest && baseBest.best ? baseBest.best.time : Infinity;
  let best = null;

  routeMixedBuildDepth++;
  try {
    for (const hub of CITIES) {
      if (!hub || !hub.id || hub.id === fromId || hub.id === toId) continue;
      const first = getBestTransport(getTravelData(fromId, hub.id));
      const second = getBestTransport(getTravelData(hub.id, toId));
      if (!first || !second || !first.best || !second.best) continue;

      const firstType = first.best.type;
      const secondType = second.best.type;
      const modes = Array.from(new Set([firstType, secondType]));
      const includesFlight = modes.includes('flight');
      const includesLand = modes.some(type => ['train', 'bus', 'ferry'].includes(type));
      if (!includesFlight || !includesLand) continue;

      const transferBuffer = 60;
      const totalTime = roundRouteMinutes(first.best.time + second.best.time + transferBuffer);
      if (!best || totalTime < best.time) {
        const hubName = getRouteCityDisplayName(hub, isKo);
        const firstLabel = getTransportLabel(firstType);
        const secondLabel = getTransportLabel(secondType);
        best = {
          type: 'mixed',
          modes,
          time: totalTime,
          connectionType: 'mixed',
          transferCity: serializeRouteCity(hub),
          legs: [
            { fromId, toId: hub.id, transport: first.best },
            { fromId: hub.id, toId, transport: second.best }
          ],
          note: isKo
            ? `${hubName} 경유 · ${firstLabel}+${secondLabel} 복합 이동 · 환승/대기 ${formatTime(transferBuffer)} 포함`
            : `Via ${hubName} · mixed ${firstLabel}+${secondLabel} · includes ${formatTime(transferBuffer)} transfer buffer`
        };
      }
    }
  } finally {
    routeMixedBuildDepth--;
  }

  if (!best) return null;
  if (!Number.isFinite(baseTime)) return best;
  return best.time <= baseTime * 1.3 ? best : null;
}

// Get best transport option
function getBestTransport(data) {
  if (!data) return null;
  const options = [];
  const addOption = (type, option) => {
    if (!option || !Number.isFinite(option.time)) return;
    const normalized = { type, ...option, time: roundRouteMinutes(option.time) };
    if (Number.isFinite(normalized.actualFlightTime)) normalized.actualFlightTime = roundRouteMinutes(normalized.actualFlightTime);
    if (Number.isFinite(normalized.waitTime)) normalized.waitTime = roundRouteMinutes(normalized.waitTime);
    if (Number.isFinite(normalized.transferTime)) normalized.transferTime = roundRouteMinutes(normalized.transferTime);
    if (Number.isFinite(normalized.baggageTime)) normalized.baggageTime = roundRouteMinutes(normalized.baggageTime);
    if (Number.isFinite(normalized.layoverTime)) normalized.layoverTime = roundRouteMinutes(normalized.layoverTime);
    options.push(normalized);
  };
  addOption('flight', data.flight);
  addOption('train', data.train);
  addOption('bus', data.bus);
  addOption('ferry', data.ferry);
  addOption('mixed', data.mixed);
  if (options.length === 0) return null;

  options.sort((a, b) => a.time - b.time);
  const best = options[0];
  const alternatives = options.slice(1).filter(a => a.time <= best.time * 1.3);
  return { best, alternatives };
}

function getTransportIcon(type) {
  return { flight: '✈️', train: '🚆', bus: '🚌', ferry: '⛴️', mixed: '🔁' }[type] || '🚗';
}

function getTransportLabel(type, transport = null, langOverride = null) {
  const lang = getRouteCurrentLang(langOverride);
  if (type === 'mixed') {
    const modes = transport && Array.isArray(transport.modes) ? transport.modes : [];
    const labels = modes.map(mode => getTransportLabel(mode, null, lang)).filter(Boolean);
    if (labels.length) return labels.join('+');
    return ({ ko: '복합 이동', en: 'Mixed transport', fr: 'Transport mixte', zh: '复合交通', ja: '複合移動', es: 'Transporte mixto' }[lang] || 'Mixed transport');
  }
  const labels = {
    ko: { flight: '비행기', train: '기차', bus: '버스', ferry: '페리', mixed: '복합 이동' },
    en: { flight: 'Flight', train: 'Train', bus: 'Bus', ferry: 'Ferry', mixed: 'Mixed transport' },
    fr: { flight: 'Avion', train: 'Train', bus: 'Bus', ferry: 'Ferry', mixed: 'Transport mixte' },
    zh: { flight: '飞机', train: '火车', bus: '巴士', ferry: '渡轮', mixed: '复合交通' },
    ja: { flight: '飛行機', train: '列車', bus: 'バス', ferry: 'フェリー', mixed: '複合移動' },
    es: { flight: 'Avión', train: 'Tren', bus: 'Autobús', ferry: 'Ferry', mixed: 'Transporte mixto' }
  };
  return (labels[lang] || labels.en)[type] || type;
}

function formatTime(mins) {
  const lang = getRouteCurrentLang();
  const value = Number(mins);
  const rounded = Number.isFinite(value) && value > 0 ? roundRouteMinutes(value) : 0;
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (lang === 'ko') return h > 0 ? (m > 0 ? `${h}시간 ${m}분` : `${h}시간`) : `${m}분`;
  if (lang === 'zh') return h > 0 ? (m > 0 ? `${h}小时 ${m}分钟` : `${h}小时`) : `${m}分钟`;
  if (lang === 'ja') return h > 0 ? (m > 0 ? `${h}時間 ${m}分` : `${h}時間`) : `${m}分`;
  return h > 0 ? (m > 0 ? `${h}h ${m}min` : `${h}h`) : `${m}min`;
}

function formatDistanceKm(value, isKo = typeof state !== 'undefined' && state.lang === 'ko') {
  const km = Number(value);
  if (!Number.isFinite(km) || km <= 0) return '';
  const rounded = Math.round(km / 5) * 5;
  const lang = getRouteCurrentLang(isKo);
  if (lang === 'ko') return `약 ${rounded}km`;
  if (lang === 'zh') return `约 ${rounded}公里`;
  if (lang === 'ja') return `約${rounded}km`;
  if (lang === 'fr') return `env. ${rounded} km`;
  if (lang === 'es') return `aprox. ${rounded} km`;
  return `~${rounded} km`;
}

function hasNonEnglishRouteText(value) {
  return /[가-힣ㄱ-ㅎㅏ-ㅣ]|[ìíëêÃÂ]|[\uFFFD]/.test(String(value || ''));
}

function getGenericRouteNote(transport, lang = 'en') {
  const type = transport && transport.type;
  const notes = {
    en: {
      default: 'Travel time is based on stored route data and rounded to the nearest 10 minutes.',
      flight: 'Door-to-door flight estimate includes airport transfers, check-in, security and baggage time.',
      train: 'Rail travel estimate based on city-to-city route data.',
      bus: 'Intercity road travel estimate based on city-to-city route data.',
      ferry: 'Ferry travel estimate based on route data.'
    },
    fr: {
      default: 'Temps basé sur les données de trajet enregistrées, arrondi aux 10 minutes.',
      flight: 'Estimation porte-à-porte avec transferts aéroport, enregistrement, sécurité et bagages.',
      train: 'Estimation ferroviaire basée sur les données ville à ville.',
      bus: 'Estimation par autocar basée sur les données ville à ville.',
      ferry: 'Estimation en ferry basée sur les données de trajet.'
    },
    zh: {
      default: '时间基于已保存的路线数据，并按10分钟取整。',
      flight: '航班门到门估算包含机场往返、值机、安检和行李时间。',
      train: '铁路时间基于城市间路线数据估算。',
      bus: '城际巴士/道路时间基于城市间路线数据估算。',
      ferry: '渡轮时间基于路线数据估算。'
    },
    ja: {
      default: '所要時間は保存済みルートデータをもとに10分単位で丸めています。',
      flight: '空港移動、チェックイン、保安検査、荷物受取を含むドアツードアの推定です。',
      train: '鉄道所要時間は都市間ルートデータに基づく推定です。',
      bus: '都市間バス/道路移動は都市間ルートデータに基づく推定です。',
      ferry: 'フェリー所要時間はルートデータに基づく推定です。'
    },
    es: {
      default: 'Tiempo basado en datos de ruta guardados y redondeado a 10 minutos.',
      flight: 'Estimación puerta a puerta con traslados al aeropuerto, check-in, seguridad y equipaje.',
      train: 'Estimación ferroviaria basada en datos ciudad a ciudad.',
      bus: 'Estimación por autobús/carretera basada en datos ciudad a ciudad.',
      ferry: 'Estimación de ferry basada en datos de ruta.'
    }
  };
  const table = notes[lang] || notes.en;
  return table[type] || table.default;
}

function getGenericEnglishRouteNote(transport) {
  return getGenericRouteNote(transport, 'en');
}

function formatRouteNoteForDisplay(note, transport, langOrKo) {
  const lang = getRouteCurrentLang(langOrKo);
  const localizedNote = transport && transport[`note_${lang}`];
  if (localizedNote) return lang === 'ko' ? normalizeRouteNoteTimes(localizedNote, true) : localizedNote;
  if (lang !== 'ko' && lang !== 'en') return getGenericRouteNote(transport, lang);
  if (!note) return '';
  if (lang === 'ko') return normalizeRouteNoteTimes(note, true);
  const translated = translateRouteNote(note, false);
  return hasNonEnglishRouteText(translated) ? getGenericEnglishRouteNote(transport) : translated;
}

// ===== Route State =====
const routeState = {
  cities: [],
  lastResult: null,
  startCityId: null,
  endCityId: null,
  usePreloadedOrder: false,
  preserveLoadedOrder: false
};

function serializeRouteCity(city) {
  if (!city) return null;
  return {
    id: city.id,
    name_ko: city.name_ko,
    name_en: city.name_en,
    country_ko: city.country_ko || '',
    country_en: city.country_en || '',
    desc_ko: city.desc_ko || '',
    desc_en: city.desc_en || ''
  };
}

function serializeRouteCities(cities) {
  return (cities || []).map(serializeRouteCity).filter(Boolean);
}

function uniqueRouteCities(cities) {
  const seen = new Set();
  return serializeRouteCities(cities).filter(city => {
    if (!city.id || seen.has(city.id)) return false;
    seen.add(city.id);
    return true;
  });
}

function restoreRouteStateFromPayload(payload) {
  if (!payload) return;
  if (typeof isSupportedLanguage === 'function' ? isSupportedLanguage(payload.lang) : (payload.lang === 'ko' || payload.lang === 'en')) {
    if (typeof applySharedLanguage === 'function') {
      applySharedLanguage(payload.lang);
    } else if (typeof state !== 'undefined') {
      const nextLang = typeof normalizeLanguageCode === 'function' ? normalizeLanguageCode(payload.lang) : payload.lang;
      state.lang = nextLang;
      try { localStorage.setItem('wander_lang', nextLang); } catch (e) {}
    }
  }
  const savedOrder = serializeRouteCities(payload.optimized || payload.cities || payload.displayCities || []);
  const displayOrder = uniqueRouteCities(payload.displayCities || savedOrder || payload.originalCities || payload.inputCities || []);
  const fallbackInput = uniqueRouteCities(payload.originalCities || payload.inputCities || savedOrder);

  routeState.cities = displayOrder.length ? displayOrder : fallbackInput;
  routeState.startCityId = payload.startCityId || null;
  routeState.endCityId = payload.endCityId || null;
  routeState.lastResult = {
    optimized: savedOrder.length ? savedOrder : routeState.cities,
    segments: payload.segments || [],
    totalTime: payload.totalTime || 0
  };
  routeState.usePreloadedOrder = true;
  routeState.preserveLoadedOrder = true;
}

function clearRouteLoadedOrderLock() {
  routeState.usePreloadedOrder = false;
  routeState.preserveLoadedOrder = false;
  routeState.lastResult = null;
  const placeholder = document.getElementById('routeResultPlaceholder');
  const content = document.getElementById('routeResultContent');
  if (placeholder) placeholder.style.display = 'flex';
  if (content) {
    content.style.display = 'none';
    content.innerHTML = '';
  }
}

// ===== Permutations (for brute-force <=8 cities) =====
function* permutations(arr) {
  if (arr.length <= 1) { yield arr; return; }
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permutations(rest)) { yield [arr[i], ...p]; }
  }
}

function nearestNeighbor(cities, getTime, startIdx = 0) {
  const visited = new Set();
  const route = [cities[startIdx]];
  visited.add(cities[startIdx].id);
  while (route.length < cities.length) {
    const last = route[route.length - 1];
    let bestNext = null, bestTime = Infinity;
    for (const c of cities) {
      if (visited.has(c.id)) continue;
      const t = getTime(last.id, c.id);
      if (t < bestTime) { bestTime = t; bestNext = c; }
    }
    if (!bestNext) break;
    route.push(bestNext);
    visited.add(bestNext.id);
  }
  return route;
}

const ROUTE_CITY_CENTERS = Object.freeze({
  newyork: { lat: 40.7128, lon: -74.0060 },
  dublin: { lat: 53.3498, lon: -6.2603 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  doha: { lat: 25.2854, lon: 51.5310 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  lasvegas: { lat: 36.1699, lon: -115.1398 },
  london: { lat: 51.5074, lon: -0.1278 },
  reykjavik: { lat: 64.1466, lon: -21.9426 },
  rome: { lat: 41.9028, lon: 12.4964 },
  losangeles: { lat: 34.0522, lon: -118.2437 },
  luxembourg: { lat: 49.6116, lon: 6.1319 },
  lima: { lat: -12.0464, lon: -77.0428 },
  lisbon: { lat: 38.7223, lon: -9.1393 },
  riyadh: { lat: 24.7136, lon: 46.6753 },
  rio: { lat: -22.9068, lon: -43.1729 },
  manila: { lat: 14.5995, lon: 120.9842 },
  madrid: { lat: 40.4168, lon: -3.7038 },
  miami: { lat: 25.7617, lon: -80.1918 },
  mexicocity: { lat: 19.4326, lon: -99.1332 },
  monaco: { lat: 43.7384, lon: 7.4246 },
  moscow: { lat: 55.7558, lon: 37.6173 },
  munich: { lat: 48.1351, lon: 11.5820 },
  milan: { lat: 45.4642, lon: 9.1900 },
  warsaw: { lat: 52.2297, lon: 21.0122 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  bali: { lat: -8.6500, lon: 115.2167 },
  bangkok: { lat: 13.7563, lon: 100.5018 },
  venice: { lat: 45.4408, lon: 12.3155 },
  bern: { lat: 46.9480, lon: 7.4474 },
  berlin: { lat: 52.5200, lon: 13.4050 },
  bogota: { lat: 4.7110, lon: -74.0721 },
  boston: { lat: 42.3601, lon: -71.0589 },
  budapest: { lat: 47.4979, lon: 19.0402 },
  buenosaires: { lat: -34.6037, lon: -58.3816 },
  bucharest: { lat: 44.4268, lon: 26.1025 },
  brussels: { lat: 50.8503, lon: 4.3517 },
  vienna: { lat: 48.2082, lon: 16.3738 },
  santiago: { lat: -33.4489, lon: -70.6693 },
  sapporo: { lat: 43.0618, lon: 141.3545 },
  shanghai: { lat: 31.2304, lon: 121.4737 },
  sandiego: { lat: 32.7157, lon: -117.1611 },
  sanfrancisco: { lat: 37.7749, lon: -122.4194 },
  seoul: { lat: 37.5665, lon: 126.9780 },
  busan: { lat: 35.1796, lon: 129.0756 },
  stockholm: { lat: 59.3293, lon: 18.0686 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  seattle: { lat: 47.6062, lon: -122.3321 },
  chicago: { lat: 41.8781, lon: -87.6298 },
  addis_ababa: { lat: 8.9806, lon: 38.7578 },
  abudhabi: { lat: 24.4539, lon: 54.3773 },
  athens: { lat: 37.9838, lon: 23.7275 },
  amsterdam: { lat: 52.3676, lon: 4.9041 },
  ankara: { lat: 39.9334, lon: 32.8597 },
  edinburgh: { lat: 55.9533, lon: -3.1883 },
  osaka: { lat: 34.6937, lon: 135.5023 },
  kyoto: { lat: 35.0116, lon: 135.7681 },
  oslo: { lat: 59.9139, lon: 10.7522 },
  ottawa: { lat: 45.4215, lon: -75.6972 },
  orlando: { lat: 28.5383, lon: -81.3792 },
  washington: { lat: 38.9072, lon: -77.0369 },
  wellington: { lat: -41.2865, lon: 174.7762 },
  istanbul: { lat: 41.0082, lon: 28.9784 },
  jakarta: { lat: -6.2088, lon: 106.8456 },
  geneva: { lat: 46.2044, lon: 6.1432 },
  interlaken: { lat: 46.6863, lon: 7.8632 },
  vaduz: { lat: 47.1410, lon: 9.5209 },
  andorra_la_vella: { lat: 42.5063, lon: 1.5218 },
  jeju: { lat: 33.4996, lon: 126.5312 },
  casablanca: { lat: 33.5731, lon: -7.5898 },
  cairo: { lat: 30.0444, lon: 31.2357 },
  cancun: { lat: 21.1619, lon: -86.8515 },
  canberra: { lat: -35.2809, lon: 149.1300 },
  capetown: { lat: -33.9249, lon: 18.4241 },
  copenhagen: { lat: 55.6761, lon: 12.5683 },
  kualalumpur: { lat: 3.1390, lon: 101.6869 },
  queenstown: { lat: -45.0312, lon: 168.6626 },
  quito: { lat: -0.1807, lon: -78.4678 },
  taipei: { lat: 25.0330, lon: 121.5654 },
  toronto: { lat: 43.6532, lon: -79.3832 },
  paris: { lat: 48.8566, lon: 2.3522 },
  porto: { lat: 41.1579, lon: -8.6291 },
  prague: { lat: 50.0755, lon: 14.4378 },
  florence: { lat: 43.7696, lon: 11.2558 },
  hanoi: { lat: 21.0278, lon: 105.8342 },
  hawaii: { lat: 21.3069, lon: -157.8583 },
  helsinki: { lat: 60.1699, lon: 24.9384 },
  hongkong: { lat: 22.3193, lon: 114.1694 },
  houston: { lat: 29.7604, lon: -95.3698 }
});

// Get city center coordinates from CITY_CLUSTERS or the route fallback map.
function getCityCenter(cityId) {
  if (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[cityId] && CITY_CLUSTERS[cityId][0]) {
    const c = CITY_CLUSTERS[cityId][0];
    return { lat: c.y, lon: c.x };
  }
  return ROUTE_CITY_CENTERS[cityId] || null;
}

// Haversine distance in km
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function roundRouteMinutes(minutes) {
  const value = Number(minutes);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.max(10, Math.round(value / 10) * 10);
}

function formatTimeCompact(mins, isKo) {
  const rounded = roundRouteMinutes(mins);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (isKo) {
    if (h > 0 && m > 0) return `${h}시간 ${m}분`;
    if (h > 0) return `${h}시간`;
    return `${m}분`;
  }
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
}

function normalizeRouteNoteTimes(note, isKo) {
  if (!note) return note;
  let text = String(note);
  text = text.replace(/(\d+)\s*h\s*(\d+)\s*m/gi, (_, h, m) => {
    return formatTimeCompact(parseInt(h, 10) * 60 + parseInt(m, 10), isKo);
  });
  text = text.replace(/(\d+)\s*h\b/gi, (_, h) => {
    return formatTimeCompact(parseInt(h, 10) * 60, isKo);
  });
  text = text.replace(/(\d+)\s*시간\s*(\d+)\s*분/g, (_, h, m) => {
    return formatTimeCompact(parseInt(h, 10) * 60 + parseInt(m, 10), isKo);
  });
  text = text.replace(/(\d+)\s*시간/g, (_, h) => {
    return formatTimeCompact(parseInt(h, 10) * 60, isKo);
  });
  return text;
}

function estimateTimeFromDistance(fromId, toId) {
  return Infinity;
}

function getLegTravelTime(fromId, toId) {
  const data = getTravelData(fromId, toId);
  const opt = getBestTransport(data);
  if (opt && opt.best && Number.isFinite(opt.best.time)) {
    return roundRouteMinutes(opt.best.time);
  }
  return Infinity;
}

function getLegOptimizationCost(fromId, toId) {
  const verified = getLegTravelTime(fromId, toId);
  if (Number.isFinite(verified)) return verified;

  const from = getCityCenter(fromId);
  const to = getCityCenter(toId);
  if (!from || !to) return 1000000;

  const km = haversineKm(from.lat, from.lon, to.lat, to.lon);
  if (!Number.isFinite(km) || km <= 0) return 1000000;

  if (areCitiesLandConnected(fromId, toId, km)) {
    const profile = getLandFallbackTimingProfile(fromId, toId, km);
    const railCost = profile.trainBuffer + ((km * profile.railFactor) / profile.trainSpeed) * 60;
    const busCost = profile.busBuffer + ((km * profile.roadFactor) / profile.busSpeed) * 60;
    return roundRouteMinutes(Math.min(railCost, busCost));
  }

  // Internal ordering score only. This is never displayed as a travel time.
  return roundRouteMinutes(270 + (km / 780) * 60);
}

function calcRouteTime(cityIds) {
  let total = 0;
  for (let i = 0; i < cityIds.length - 1; i++) {
    total += getLegOptimizationCost(cityIds[i], cityIds[i + 1]);
  }
  return total;
}

function ensureOptimizedRouteIntegrity(optimized, sourceCities, startId = null, endId = null) {
  const source = uniqueRouteCities(Array.isArray(sourceCities) ? sourceCities : []);
  if (!source.length) return [];

  const byId = new Map(source.map(city => [city.id, city]));
  const result = [];
  const seen = new Set();

  (Array.isArray(optimized) ? optimized : []).forEach(city => {
    if (!city || !city.id || seen.has(city.id) || !byId.has(city.id)) return;
    result.push(byId.get(city.id));
    seen.add(city.id);
  });

  source.forEach(city => {
    if (!seen.has(city.id)) {
      result.push(city);
      seen.add(city.id);
    }
  });

  if (startId && byId.has(startId)) {
    const startCity = byId.get(startId);
    const idx = result.findIndex(city => city.id === startId);
    if (idx > 0) {
      result.splice(idx, 1);
      result.unshift(startCity);
    } else if (idx < 0) {
      result.unshift(startCity);
    }
  }

  if (endId && endId !== startId && byId.has(endId)) {
    const endCity = byId.get(endId);
    const idx = result.findIndex(city => city.id === endId);
    if (idx >= 0 && idx !== result.length - 1) {
      result.splice(idx, 1);
      result.push(endCity);
    } else if (idx < 0) {
      result.push(endCity);
    }
  }

  if (startId && endId && startId === endId && byId.has(startId)) {
    result.push({ ...byId.get(startId) });
  }

  return result;
}

const EXACT_ROUTE_CITY_LIMIT = 18;

const ROUTE_STAY_DAYS = Object.freeze({
  newyork: [4, 6], losangeles: [3, 5], sanfrancisco: [3, 4], lasvegas: [2, 3],
  seattle: [2, 3], chicago: [3, 4], boston: [2, 3], washingtondc: [2, 3],
  miami: [3, 4], orlando: [3, 5], houston: [2, 3], honolulu: [4, 6],
  paris: [4, 5], london: [4, 5], rome: [3, 5], florence: [2, 3],
  venice: [2, 3], milan: [2, 3], barcelona: [3, 4], madrid: [3, 4],
  lisbon: [3, 4], porto: [2, 3], amsterdam: [2, 3], berlin: [3, 4],
  munich: [2, 3], vienna: [2, 4], prague: [2, 3], budapest: [2, 3],
  athens: [3, 4], istanbul: [3, 5], dubai: [3, 4], cairo: [3, 4],
  tokyo: [4, 6], osaka: [3, 4], kyoto: [2, 4], sapporo: [2, 4],
  fukuoka: [2, 3], seoul: [4, 6], busan: [2, 3], jeju: [3, 4],
  singapore: [3, 4], bangkok: [3, 5], chiangmai: [3, 4], phuket: [3, 5],
  hongkong: [3, 4], taipei: [3, 4], shanghai: [3, 4], beijing: [4, 5],
  sydney: [4, 5], melbourne: [3, 4], auckland: [2, 3],
  rio: [3, 5], buenosaires: [3, 5], cancun: [4, 6]
});

function getRecommendedStayDays(cityId, isKo = null) {
  const range = ROUTE_STAY_DAYS[cityId] || [2, 3];
  const lang = getRouteCurrentLang(isKo);
  const single = range[0] === range[1];
  const value = single ? String(range[0]) : `${range[0]}-${range[1]}`;
  if (lang === 'ko') return `${value}일`;
  if (lang === 'zh') return `${value}天`;
  if (lang === 'ja') return `${value}日`;
  if (lang === 'fr') return `${value} ${single && range[0] === 1 ? 'jour' : 'jours'}`;
  if (lang === 'es') return `${value} ${single && range[0] === 1 ? 'día' : 'días'}`;
  return `${value} ${single && range[0] === 1 ? 'day' : 'days'}`;
}

function getAverageStayDaysValue(cityId) {
  const range = ROUTE_STAY_DAYS[cityId] || [2, 3];
  return (range[0] + range[1]) / 2;
}

function getRouteSupportedCities() {
  if (typeof getSortedSupportedDestinationCities === 'function') {
    return getSortedSupportedDestinationCities();
  }
  if (typeof getSupportedDestinationCities === 'function') {
    return getSupportedDestinationCities().slice().sort((a, b) => {
      const locale = typeof getLanguageLocale === 'function' ? getLanguageLocale() : 'en-US';
      const an = String(getRouteCityDisplayName(a) || a.id || '');
      const bn = String(getRouteCityDisplayName(b) || b.id || '');
      return an.localeCompare(bn, locale, { sensitivity: 'base', numeric: true });
    });
  }
  if (typeof CITIES === 'undefined' || !Array.isArray(CITIES)) return [];
  const removed = new Set(['quito', 'riyadh', 'addis_ababa', 'addisababa', 'bogota', 'jakarta', 'canberra', 'manila', 'doha', 'luxembourg', 'sandiego']);
  const locale = typeof getLanguageLocale === 'function' ? getLanguageLocale() : 'en-US';
  return CITIES
    .filter(city => city && !removed.has(String(city.id || '').toLowerCase()))
    .sort((a, b) => String(getRouteCityDisplayName(a) || a.id || '').localeCompare(
      String(getRouteCityDisplayName(b) || b.id || ''),
      locale,
      { sensitivity: 'base', numeric: true }
    ));
}

function findRouteCityByTypedName(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q || typeof CITIES === 'undefined') return null;
  return getRouteSupportedCities().find(city => {
    const localizedNames = (typeof SUPPORTED_LANG_CODES !== 'undefined' ? SUPPORTED_LANG_CODES : ['ko', 'en']).flatMap(lang => [
      getRouteCityDisplayName(city, lang === 'ko'),
      typeof getLocalizedCityField === 'function' ? getLocalizedCityField(city, 'name', lang) : '',
      typeof getLocalizedCityField === 'function' ? getLocalizedCityField(city, 'country', lang) : ''
    ]);
    const names = [city.id, city.name_ko, city.name_en, city.country_ko, city.country_en, ...localizedNames]
      .filter(Boolean)
      .map(value => String(value).toLowerCase());
    return names.some(name => name === q) || names.some(name => name.startsWith(q));
  }) || null;
}

function updateRouteUnsupportedCityState() {
  const input = document.getElementById('routeCitySearchInput');
  const box = document.getElementById('routeUnsupportedCityBox');
  const btn = document.getElementById('routeRequestCityBtn');
  if (!input || !box) return;
  const value = input.value.trim();
  const unsupported = !!value && !findRouteCityByTypedName(value);
  box.style.display = unsupported ? 'flex' : 'none';
  if (btn) btn.disabled = !unsupported;
}

function connectRouteCitySearch() {
  const input = document.getElementById('routeCitySearchInput');
  const select = document.getElementById('routeCitySelect');
  const datalist = document.getElementById('routeCityDatalist');
  if (!input || !select || input.dataset.boundRouteCitySearch === 'true') return;
  input.dataset.boundRouteCitySearch = 'true';
  const isKo = typeof state !== 'undefined' && state.lang === 'ko';
  if (datalist && typeof CITIES !== 'undefined') {
    datalist.innerHTML = getRouteSupportedCities().map(city => `<option value="${getRouteCityDisplayName(city)}"></option>`).join('');
  }
  input.addEventListener('input', () => {
    const found = findRouteCityByTypedName(input.value);
    if (found) {
      select.value = found.id;
      const customInput = document.getElementById('routeCityCustomInput');
      if (customInput) customInput.style.display = 'none';
    }
    updateRouteUnsupportedCityState();
  });
  select.addEventListener('change', () => {
    const city = getRouteSupportedCities().find(c => c.id === select.value);
    if (city) input.value = getRouteCityDisplayName(city);
    updateRouteUnsupportedCityState();
  });
  const requestBtn = document.getElementById('routeRequestCityBtn');
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      if (typeof requestUnsupportedCity === 'function') {
        requestUnsupportedCity('route-planner', 'routeCitySearchInput');
      } else {
        const message = isKo ? '도시 추가 요청이 기록되었습니다.' : 'City request recorded.';
        if (typeof showToast === 'function') {
          showToast(message);
        } else {
          window.alert(message);
        }
      }
    });
  }
}

function solveExactShortestRouteIds(cityIds, startId = null, endId = null) {
  const ids = Array.from(new Set((cityIds || []).filter(Boolean)));
  const n = ids.length;
  if (n < 2) return ids;
  if (n > EXACT_ROUTE_CITY_LIMIT) return null;

  const startIdx = startId ? ids.indexOf(startId) : -1;
  const endIdx = endId ? ids.indexOf(endId) : -1;
  const isRoundTrip = startId && endId && startId === endId && startIdx >= 0;
  const fixedStartIdx = startIdx >= 0 ? startIdx : -1;
  const fixedEndIdx = (!isRoundTrip && endIdx >= 0) ? endIdx : -1;
  const fullMask = (1 << n) - 1;
  const totalStates = (1 << n) * n;
  const dp = new Float64Array(totalStates);
  const prev = new Int16Array(totalStates);
  dp.fill(Infinity);
  prev.fill(-1);

  const starts = fixedStartIdx >= 0
    ? [fixedStartIdx]
    : ids.map((_, idx) => idx).filter(idx => idx !== fixedEndIdx);

  starts.forEach(idx => {
    const pos = ((1 << idx) * n) + idx;
    dp[pos] = 0;
  });

  for (let mask = 1; mask <= fullMask; mask++) {
    for (let last = 0; last < n; last++) {
      const current = dp[mask * n + last];
      if (!Number.isFinite(current)) continue;

      for (let next = 0; next < n; next++) {
        const bit = 1 << next;
        if (mask & bit) continue;
        const nextMask = mask | bit;

        if (fixedEndIdx >= 0 && next === fixedEndIdx && nextMask !== fullMask) continue;
        if (isRoundTrip && next === fixedStartIdx) continue;

        const candidate = current + getLegTravelTime(ids[last], ids[next]);
        const idx = nextMask * n + next;
        if (candidate < dp[idx]) {
          dp[idx] = candidate;
          prev[idx] = last;
        }
      }
    }
  }

  let bestLast = -1;
  let bestCost = Infinity;
  if (isRoundTrip) {
    for (let last = 0; last < n; last++) {
      if (last === fixedStartIdx) continue;
      const current = dp[fullMask * n + last];
      if (!Number.isFinite(current)) continue;
      const candidate = current + getLegTravelTime(ids[last], ids[fixedStartIdx]);
      if (candidate < bestCost) {
        bestCost = candidate;
        bestLast = last;
      }
    }
  } else if (fixedEndIdx >= 0) {
    bestLast = fixedEndIdx;
    bestCost = dp[fullMask * n + fixedEndIdx];
  } else {
    for (let last = 0; last < n; last++) {
      const current = dp[fullMask * n + last];
      if (current < bestCost) {
        bestCost = current;
        bestLast = last;
      }
    }
  }

  if (bestLast < 0 || !Number.isFinite(bestCost)) return null;

  const routeIdx = [];
  let mask = fullMask;
  let last = bestLast;
  while (last >= 0) {
    routeIdx.push(last);
    const previous = prev[mask * n + last];
    mask ^= (1 << last);
    last = previous;
  }
  routeIdx.reverse();
  if (isRoundTrip) routeIdx.push(fixedStartIdx);
  return routeIdx.map(idx => ids[idx]);
}

// 2-opt improvement respecting start and end city constraints
function twoOptImproveWithConstraints(cityIds, startId, endId) {
  let improved = true;
  let route = [...cityIds];
  const maxIdx = endId ? route.length - 2 : route.length - 1;

  while (improved) {
    improved = false;
    for (let i = 1; i < maxIdx; i++) {
      for (let j = i + 1; j <= maxIdx; j++) {
        // Reverse segment route[i...j]
        const newRoute = [
          ...route.slice(0, i),
          ...route.slice(i, j + 1).reverse(),
          ...route.slice(j + 1)
        ];
        if (calcRouteTime(newRoute) < calcRouteTime(route)) {
          route = newRoute;
          improved = true;
        }
      }
    }
  }
  return route;
}

function optimizeRoute(cities, startId = null, endId = null) {
  if (cities.length < 2) return cities;
  const sourceCities = uniqueRouteCities(cities);

  const cityIds = sourceCities.map(c => c.id);
  const exactRouteIds = solveExactShortestRouteIds(cityIds, startId, endId);
  if (exactRouteIds && exactRouteIds.length) {
    return ensureOptimizedRouteIntegrity(exactRouteIds.map(id => sourceCities.find(c => c.id === id)), sourceCities, startId, endId);
  }

  // If both startId and endId are specified and they are the same city (round-trip)
  if (startId && endId && startId === endId) {
    // Round-trip: start and end at the same city
    // Optimize the middle cities, then prepend start and append end
    const middleCities = sourceCities.filter(c => c.id !== startId);
    if (middleCities.length === 0) return sourceCities;
    const startCity = sourceCities.find(c => c.id === startId);
    if (middleCities.length === 1) {
      return [startCity, middleCities[0], { ...startCity }];
    }
    // Find best ordering of middle cities with start city at both ends
    const middleIds = middleCities.map(c => c.id);
    if (middleIds.length <= 8) {
      let bestOrder = null;
      let bestTime = Infinity;
      for (const perm of permutations(middleIds)) {
        const candidateRoute = [startId, ...perm, startId];
        const t = calcRouteTime(candidateRoute);
        if (t < bestTime) {
          bestTime = t;
          bestOrder = candidateRoute;
        }
      }
      return ensureOptimizedRouteIntegrity(bestOrder.map(id => sourceCities.find(c => c.id === id) || startCity), sourceCities, startId, endId);
    } else {
      // Nearest neighbor for larger sets
      const optimizedMiddle = runOptimizationForFixedStartEnd([startCity, ...middleCities], startId, null);
      return ensureOptimizedRouteIntegrity([...optimizedMiddle, { ...startCity }], sourceCities, startId, endId);
    }
  }

  // If both startId and endId are specified
  if (startId && endId) {
    return ensureOptimizedRouteIntegrity(runOptimizationForFixedStartEnd(sourceCities, startId, endId), sourceCities, startId, endId);
  }
  
  // If only startId is specified
  if (startId) {
    return ensureOptimizedRouteIntegrity(runOptimizationForFixedStartEnd(sourceCities, startId, null), sourceCities, startId, null);
  }

  // If only endId is specified
  if (endId) {
    let bestRoute = null;
    let bestTime = Infinity;
    for (const city of cities) {
      if (city.id === endId) continue;
    const route = runOptimizationForFixedStartEnd(sourceCities, city.id, endId);
      const t = calcRouteTime(route.map(c => c.id));
      if (t < bestTime) {
        bestTime = t;
        bestRoute = route;
      }
    }
    return ensureOptimizedRouteIntegrity(bestRoute, sourceCities, null, endId);
  }

  // If neither is specified (fully automatic start and end)
  let bestRoute = null;
  let bestTime = Infinity;
  for (const city of cities) {
    const route = runOptimizationForFixedStartEnd(sourceCities, city.id, null);
    const t = calcRouteTime(route.map(c => c.id));
    if (t < bestTime) {
      bestTime = t;
      bestRoute = route;
    }
  }
  return ensureOptimizedRouteIntegrity(bestRoute, sourceCities, null, null);
}

function runOptimizationForFixedStartEnd(cities, startId, endId) {
  const ids = cities.map(c => c.id);
  const finalStartId = startId;
  const finalEndId = endId || null;

  if (cities.length <= 9) {
    const remainingIds = ids.filter(id => id !== finalStartId && id !== finalEndId);
    let bestOrder = null;
    let bestTime = Infinity;

    for (const perm of permutations(remainingIds)) {
      let candidateRoute;
      if (finalEndId) {
        candidateRoute = [finalStartId, ...perm, finalEndId];
      } else {
        candidateRoute = [finalStartId, ...perm];
      }
      const t = calcRouteTime(candidateRoute);
      if (t < bestTime) {
        bestTime = t;
        bestOrder = candidateRoute;
      }
    }
    if (!bestOrder) bestOrder = finalEndId ? [finalStartId, ...remainingIds, finalEndId] : [finalStartId, ...remainingIds];
    return bestOrder.map(id => cities.find(c => c.id === id)).filter(Boolean);
  } else {
    // For larger sets: run nearest neighbor starting from finalStartId, applying constraints
    const startIdx = cities.findIndex(c => c.id === finalStartId);
    if (startIdx === -1) return cities;
    
    const visited = new Set();
    const route = [cities[startIdx]];
    visited.add(finalStartId);

    const getTime = (a, b) => getLegOptimizationCost(a, b);

    while (route.length < cities.length) {
      const last = route[route.length - 1];
      let bestNext = null;
      let bestTime = Infinity;

      if (finalEndId && route.length === cities.length - 1) {
        const endCity = cities.find(c => c.id === finalEndId);
        if (endCity) {
          route.push(endCity);
          break;
        }
      }

      for (const c of cities) {
        if (visited.has(c.id)) continue;
        if (finalEndId && c.id === finalEndId) continue;

        const t = getTime(last.id, c.id);
        if (t < bestTime) {
          bestTime = t;
          bestNext = c;
        }
      }

      if (!bestNext) {
        cities.forEach(c => {
          if (!visited.has(c.id) && (!finalEndId || c.id !== finalEndId)) {
            route.push(c);
            visited.add(c.id);
          }
        });
        if (finalEndId && !visited.has(finalEndId)) {
          const endCity = cities.find(c => c.id === finalEndId);
          if (endCity) route.push(endCity);
        }
        break;
      }

      route.push(bestNext);
      visited.add(bestNext.id);
    }

    const nnIds = route.map(c => c.id);
    const improved = twoOptImproveWithConstraints(nnIds, finalStartId, finalEndId);
    return ensureOptimizedRouteIntegrity(improved.map(id => cities.find(c => c.id === id)), cities, finalStartId, finalEndId);
  }
}

// ===== UI: Add city chip =====
function renderRouteCityList() {
  const container = document.getElementById('routeCityList');
  const btn = document.getElementById('routeOptimizeBtn');
  if (!container) return;
  container.innerHTML = routeState.cities.map((city, idx) => {
    const name = getRouteCityDisplayName(city);
    return `
      <div class="route-city-chip">
        <span class="chip-num">${idx + 1}</span>
        <span class="chip-name">${name}</span>
        <button class="chip-remove" onclick="removeCityFromRoute(${idx})" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  if (btn) btn.style.display = routeState.cities.length >= 2 ? 'flex' : 'none';

  const constraintsRow = document.getElementById('routeConstraintsRow');
  if (constraintsRow) {
    if (routeState.cities.length >= 2) {
      constraintsRow.style.display = 'flex';
      populateConstraintsDropdowns();
    } else {
      constraintsRow.style.display = 'none';
      routeState.startCityId = null;
      routeState.endCityId = null;
    }
  }
}

function populateConstraintsDropdowns() {
  const startSelect = document.getElementById('routeStartSelect');
  const endSelect = document.getElementById('routeEndSelect');
  if (!startSelect || !endSelect) return;

  // If a previously selected start or end city was removed from routeState.cities, reset it
  if (routeState.startCityId && !routeState.cities.some(c => c.id === routeState.startCityId)) {
    routeState.startCityId = null;
  }
  if (routeState.endCityId && !routeState.cities.some(c => c.id === routeState.endCityId)) {
    routeState.endCityId = null;
  }

  const prevStart = routeState.startCityId;
  const prevEnd = routeState.endCityId;

  const noneAutoText = getRouteUiText('noneAuto', '지정 안 함 (자동)', 'None (Auto)');
  startSelect.innerHTML = `<option value="">${noneAutoText}</option>`;
  endSelect.innerHTML = `<option value="">${noneAutoText}</option>`;

  routeState.cities.forEach(city => {
    const name = getRouteCityDisplayName(city);
    
    const optStart = document.createElement('option');
    optStart.value = city.id;
    optStart.textContent = name;
    if (city.id === prevStart) {
      optStart.selected = true;
    }
    startSelect.appendChild(optStart);

    const optEnd = document.createElement('option');
    optEnd.value = city.id;
    optEnd.textContent = name;
    if (city.id === prevEnd) {
      optEnd.selected = true;
    }
    endSelect.appendChild(optEnd);
  });

  if (!startSelect.dataset.hasListener) {
    startSelect.dataset.hasListener = 'true';
    startSelect.addEventListener('change', () => {
      clearRouteLoadedOrderLock();
      routeState.startCityId = startSelect.value || null;
    });
  }

  if (!endSelect.dataset.hasListener) {
    endSelect.dataset.hasListener = 'true';
    endSelect.addEventListener('change', () => {
      clearRouteLoadedOrderLock();
      routeState.endCityId = endSelect.value || null;
    });
  }
}

function addCityToRoute() {
  const select = document.getElementById('routeCitySelect');
  const customInput = document.getElementById('routeCityCustomInput');

  let cityObj = null;

  if (select && select.value === '__custom__' && customInput) {
    const val = customInput.value.trim();
    if (!val) { showToast(getRouteUiText('enterCityName', '도시 이름을 입력해주세요.', 'Please enter a city name.')); return; }
    const found = findRouteCityByTypedName(val);
    if (!found) {
      const searchInput = document.getElementById('routeCitySearchInput');
      if (searchInput) searchInput.value = val;
      updateRouteUnsupportedCityState();
      showToast(getRouteUiText('unsupportedRequest', '아직 지원하지 않는 도시예요. 도시 추가 요청하기를 눌러주세요.', 'This city is not supported yet. Please request city support.'));
      return;
    }
    cityObj = found;
    customInput.value = '';
  } else if (select && select.value) {
    const found = getRouteSupportedCities().find(c => c.id === select.value);
    if (!found) { showToast(getRouteUiText('selectCityToast', '도시를 선택해주세요.', 'Please select a city.')); return; }
    cityObj = found;
    select.value = '';
  } else {
    showToast(getRouteUiText('selectCityToast', '도시를 선택해주세요.', 'Please select a city.')); return;
  }

  if (routeState.cities.some(c => c.id === cityObj.id)) {
    showToast(getRouteUiText('alreadyAdded', '이미 추가된 도시입니다.', 'This city is already added.'));
    return;
  }
  clearRouteLoadedOrderLock();
  routeState.cities.push(cityObj);
  const searchInput = document.getElementById('routeCitySearchInput');
  if (searchInput) searchInput.value = '';
  updateRouteUnsupportedCityState();
  renderRouteCityList();
}

function removeCityFromRoute(idx) {
  clearRouteLoadedOrderLock();
  routeState.cities.splice(idx, 1);
  renderRouteCityList();
}

// ===== Route Type Badge =====
function getRouteTypeBadge(transport, isKo) {
  if (!transport) return { label: '', cls: '' };
  const note = (transport.note || '').toLowerCase();
  const isDirect = note.includes('직통') || note.includes('직행') || note.includes('direct') || note.includes('nonstop');
  const isVia = note.includes('환승') || note.includes('via') || note.includes('transfer') || note.includes('경유');
  if (isDirect) return { label: isKo ? '✅ 직통' : '✅ Direct', cls: 'route-direct' };
  if (isVia) return { label: isKo ? '🔄 경유' : '🔄 Via stopover', cls: 'route-via' };
  if (transport.type === 'flight') return { label: isKo ? '✈️ 공항 경유' : '✈️ Via airport', cls: 'route-via' };
  return { label: isKo ? '✅ 직통' : '✅ Direct', cls: 'route-direct' };
}

function inferRouteConnectionType(transport) {
  if (!transport) return 'unknown';
  if (transport.connectionType) return transport.connectionType;
  if (transport.type === 'mixed') return 'mixed';
  const note = String(transport.note || '').toLowerCase();
  const directPattern = /(direct|nonstop|non-stop|\uC9C1\uD1B5|\uC9C1\uD589|\uC9C1\uD56D)/i;
  const viaPattern = /(via|transfer|stopover|\uD658\uC2B9|\uACBD\uC720|\+)/i;
  if (directPattern.test(note)) return 'direct';
  if (viaPattern.test(note)) return 'via';
  return 'unknown';
}

function getRouteConnectionText(key, langOrKo) {
  const lang = getRouteCurrentLang(langOrKo);
  const labels = {
    ko: { mixedVia: '복합/경유', via: '경유', direct: '직통', flight: '항공 이동', transfer: '도시 간 이동', mixedDetails: '복합 이동 상세' },
    en: { mixedVia: 'Mixed/Via', via: 'Via stopover', direct: 'Direct', flight: 'Flight route', transfer: 'City transfer', mixedDetails: 'Mixed Transport Details' },
    fr: { mixedVia: 'Mixte/avec correspondance', via: 'Avec correspondance', direct: 'Direct', flight: 'Trajet aérien', transfer: 'Trajet entre villes', mixedDetails: 'Détails du transport mixte' },
    zh: { mixedVia: '复合/中转', via: '中转', direct: '直达', flight: '航班路线', transfer: '城市间移动', mixedDetails: '复合交通详情' },
    ja: { mixedVia: '複合/経由', via: '経由', direct: '直通', flight: '航空ルート', transfer: '都市間移動', mixedDetails: '複合移動の詳細' },
    es: { mixedVia: 'Mixto/con escala', via: 'Con escala', direct: 'Directo', flight: 'Ruta aérea', transfer: 'Traslado entre ciudades', mixedDetails: 'Detalles de transporte mixto' }
  };
  return (labels[lang] || labels.en)[key] || (labels.en[key] || key);
}

function getRouteTypeBadge(transport, langOrKo) {
  const type = inferRouteConnectionType(transport);
  if (type === 'mixed') return { label: `🔁 ${getRouteConnectionText('mixedVia', langOrKo)}`, cls: 'route-via' };
  if (type === 'via') return { label: `🔄 ${getRouteConnectionText('via', langOrKo)}`, cls: 'route-via' };
  if (type === 'direct') return { label: `✅ ${getRouteConnectionText('direct', langOrKo)}`, cls: 'route-direct' };
  if (transport && transport.type === 'flight') return { label: `✈️ ${getRouteConnectionText('flight', langOrKo)}`, cls: 'route-direct' };
  return { label: getRouteConnectionText('transfer', langOrKo), cls: '' };
}

function getMixedRouteLegSummaries(transport, langOrKo) {
  if (!transport || transport.type !== 'mixed' || !Array.isArray(transport.legs)) return [];
  const lang = getRouteCurrentLang(langOrKo);
  return transport.legs.map((leg, idx) => {
    const legTransport = leg.transport || {};
    const fromCity = CITIES.find(c => c.id === leg.fromId);
    const toCity = CITIES.find(c => c.id === leg.toId);
    const fromName = getRouteCityDisplayName(fromCity, lang) || leg.fromId || '';
    const toName = getRouteCityDisplayName(toCity, lang) || leg.toId || '';
    if (!fromName || !toName) return '';
    const label = getTransportLabel(legTransport.type, legTransport, lang);
    const timeText = Number.isFinite(legTransport.time) ? ` ${formatTime(legTransport.time)}` : '';
    return `${idx + 1}. ${fromName} -> ${toName}: ${getTransportIcon(legTransport.type)} ${label}${timeText}`;
  }).filter(Boolean);
}

function getMixedRouteDetailsHTML(transport, langOrKo) {
  const rows = getMixedRouteLegSummaries(transport, langOrKo);
  if (!rows.length) return '';
  const note = transport.note ? formatRouteNoteForDisplay(transport.note, transport, langOrKo) : '';
  return `
    <div class="segment-note" style="margin-top:6px; border-left: 2px solid var(--primary-color); padding-left: 10px;">
      <strong>🔁 ${getRouteConnectionText('mixedDetails', langOrKo)}:</strong>
      <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc; font-size:12px; color:var(--text-muted); line-height:1.4;">
        ${rows.map(row => `<li>${row}</li>`).join('')}
        ${note ? `<li>${note}</li>` : ''}
      </ul>
    </div>`;
}

function getMixedRouteDetailsText(transport, langOrKo) {
  return getMixedRouteLegSummaries(transport, langOrKo).join('; ');
}

// ===== Translate Route Notes =====
function translateRouteNote(note, isKo) {
  if (!note) return note;
  if (isKo) return normalizeRouteNoteTimes(note, true);
  // Translate common Korean transport terms to English
  let t = note;
  const map = [
    ['유로스타', 'Eurostar'], ['직통', 'direct'], ['직행', 'direct'],
    ['환승', 'transfer'], ['경유', 'via'], ['야간열차', 'night train'],
    ['시내-시내', 'city-city'], ['시내', 'city center'],
    ['공항 출발', 'from airport'], ['공항행', 'to airport'], ['공항 이동/대기 포함', 'incl. airport transfer/wait'],
    ['공항 이동', 'airport transfer'], ['구글맵 기준', 'per Google Maps'],
    ['시외버스', 'intercity bus'], ['열차', 'train'], ['고속열차', 'high-speed train'],
    ['급행', 'express'], ['특급', 'express'], ['전철', 'metro/rail'],
    ['신칸센', 'Shinkansen'], ['노조미', 'Nozomi'], ['히카리', 'Hikari'],
    ['프레치아로사', 'Frecciarossa'], ['이탈로', 'Italo'],
    ['직항', 'non-stop'], ['왕복', 'roundtrip'],
    ['비행 시간', 'flight time'], ['대기 시간', 'wait time'],
    ['소요 시간', 'travel time'], ['총', 'total'],
    ['약', 'approx.'], ['포함', 'incl.'], ['구간', 'section'],
    ['거리', 'distance'], ['기준', 'based on'],
    ['니스', 'Nice'], ['벤티밀리아', 'Ventimiglia'],
    ['후련 비행', 'flight'], ['비행', 'flight'],
    ['버스', 'bus'], ['택시', 'taxi'], ['페리', 'ferry'],
    ['후쿠오카', 'Fukuoka'], ['삿포로', 'Sapporo'],
    ['광저우', 'Guangzhou'], ['상하이', 'Shanghai'],
    ['오사카', 'Osaka'], ['교토', 'Kyoto'],
    ['센트럴역', 'Central Station'], ['역', 'Station'],
    ['정류장', 'stop'], ['터미널', 'terminal'],
    ['1등석', '1st class'], ['2등석', '2nd class'],
    ['좌석', 'seat'], ['침대', 'sleeper'],
  ];
  for (const [ko, en] of map) {
    t = t.replace(new RegExp(ko, 'g'), en);
  }
  return normalizeRouteNoteTimes(t, false);
}

let routeLeafletMap = null;
let routeLeafletLayer = null;

function getRouteMapPointForCity(city) {
  if (!city) return null;
  const center = getCityCenter(city.id);
  if (!center) return null;
  return { lat: center.lat, lon: center.lon, city };
}

function getRouteMapPoints(optimized, segments) {
  const points = [];
  (optimized || []).forEach((city, idx) => {
    const cityPoint = getRouteMapPointForCity(city);
    if (cityPoint) points.push(cityPoint);
    const seg = segments && segments[idx];
    const transferCity = seg && seg.opt && seg.opt.best && seg.opt.best.transferCity;
    if (transferCity && idx < (optimized || []).length - 1) {
      const hubPoint = getRouteMapPointForCity(transferCity);
      if (hubPoint) {
        hubPoint.isTransfer = true;
        points.push(hubPoint);
      }
    }
  });
  return points;
}

function renderRouteResultMap(optimized, segments) {
  const mapEl = document.getElementById('routeResultMap');
  if (!mapEl || typeof L === 'undefined') return;
  const points = getRouteMapPoints(optimized, segments);
  if (points.length < 2) {
    mapEl.style.display = 'none';
    return;
  }
  mapEl.style.display = 'block';
  if (routeLeafletMap && routeLeafletMap._container !== mapEl) {
    routeLeafletMap.remove();
    routeLeafletMap = null;
    routeLeafletLayer = null;
  }
  if (!routeLeafletMap) {
    routeLeafletMap = L.map('routeResultMap', {
      zoomControl: true,
      scrollWheelZoom: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(routeLeafletMap);
  }
  setTimeout(() => routeLeafletMap && routeLeafletMap.invalidateSize(), 50);
  if (routeLeafletLayer) routeLeafletMap.removeLayer(routeLeafletLayer);
  routeLeafletLayer = L.layerGroup().addTo(routeLeafletMap);
  const latLngs = points.map(point => [point.lat, point.lon]);
  L.polyline(latLngs, {
    color: '#0891b2',
    weight: 4,
    opacity: 0.86,
    dashArray: '8, 8'
  }).addTo(routeLeafletLayer);
  points.forEach((point, idx) => {
    const isKo = typeof state !== 'undefined' && state.lang === 'ko';
    const label = point.isTransfer ? (isKo ? '\uACBD\uC720' : 'Via') : String(idx + 1);
    const name = point.city ? getRouteCityDisplayName(point.city) : '';
    const safeName = typeof escapeHtml === 'function' ? escapeHtml(name || '') : String(name || '').replace(/[&<>"']/g, '');
    const marker = L.divIcon({
      className: 'route-map-pin',
      html: `<div class="route-map-pin-dot ${point.isTransfer ? 'transfer' : ''}">${label}</div><div class="route-map-pin-label">${safeName}</div>`,
      iconSize: [36, 42],
      iconAnchor: [18, 20]
    });
    L.marker([point.lat, point.lon], { icon: marker })
      .addTo(routeLeafletLayer)
      .bindPopup(`<strong>${safeName}</strong>`);
  });
  routeLeafletMap.fitBounds(L.latLngBounds(latLngs), { padding: [42, 42] });
}

// ===== Render Route Result =====
function renderRouteResult() {
  const placeholder = document.getElementById('routeResultPlaceholder');
  const content = document.getElementById('routeResultContent');
  if (!content) return;

  placeholder.style.display = 'none';
  content.style.display = 'block';
  content.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:40px;">🔄 ${getRouteUiText('optimizing', '도시간 동선 짜는 중...', 'Optimizing route...')}</p>`;

  setTimeout(() => {
    const isKo = state.lang === 'ko';
    const routeLang = getRouteCurrentLang();
    let optimized;
    let totalTime = 0;
    const segments = [];
    const startId = routeState.startCityId || null;
    const endId = routeState.endCityId || null;

    // If loading a saved/shared route, keep the saved order instead of optimizing again.
    if ((routeState.preserveLoadedOrder || routeState.usePreloadedOrder) && routeState.lastResult && routeState.lastResult.optimized && routeState.lastResult.optimized.length >= 2) {
      optimized = routeState.lastResult.optimized;
    } else {
      optimized = optimizeRoute([...routeState.cities], startId, endId);
    }
    optimized = ensureOptimizedRouteIntegrity(optimized, routeState.cities, startId, endId);

    for (let i = 0; i < optimized.length - 1; i++) {
      const data = getTravelData(optimized[i].id, optimized[i + 1].id);
      const opt = getBestTransport(data);
      if (opt) {
        totalTime += opt.best.time;
        segments.push({ from: optimized[i], to: optimized[i + 1], opt, data });
      } else {
        segments.push({ from: optimized[i], to: optimized[i + 1], opt: null, data, estimatedTime: null });
      }
    }

    routeState.lastResult = { optimized, segments, totalTime };

    // === Calculate all valid permutations and their transit durations for user visibility ===
    let permAnalysisHTML = '';
    const ids = routeState.cities.map(c => c.id);
    if (ids.length >= 2 && ids.length <= 9) {
      const validRoutes = [];
      const finalStartId = startId;
      const finalEndId = endId;

      if (finalStartId && finalEndId) {
        const remainingIds = ids.filter(id => id !== finalStartId && id !== finalEndId);
        for (const perm of permutations(remainingIds)) {
          validRoutes.push([finalStartId, ...perm, finalEndId]);
        }
      } else if (finalStartId) {
        const remainingIds = ids.filter(id => id !== finalStartId);
        for (const perm of permutations(remainingIds)) {
          validRoutes.push([finalStartId, ...perm]);
        }
      } else if (finalEndId) {
        const remainingIds = ids.filter(id => id !== finalEndId);
        for (const perm of permutations(remainingIds)) {
          validRoutes.push([...perm, finalEndId]);
        }
      } else {
        for (const perm of permutations(ids)) {
          validRoutes.push(perm);
        }
      }

      const evaluatedPermutations = validRoutes.map(route => {
        const time = calcRouteTime(route);
        const cityList = route.map(id => routeState.cities.find(c => c.id === id));
        return { route, time, cityList };
      });

      // Sort ascending by duration
      evaluatedPermutations.sort((a, b) => a.time - b.time);

      const rowsHTML = evaluatedPermutations.slice(0, 10).map((p, pIdx) => {
        const isBest = pIdx === 0;
        const seqStr = p.cityList.map(c => getRouteCityDisplayName(c)).join(' → ');
        const bestBadge = isBest 
          ? `<span class="route-type-badge best" style="background:#10b981; color:white; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:700; margin-left:8px;">${getRouteResultLabel('best', '최적', 'Best')}</span>`
          : '';
        return `
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05); font-weight:${isBest ? '700' : 'normal'}; color:${isBest ? 'var(--primary-color)' : 'inherit'};">
            <td style="padding:8px 4px; color:var(--text-muted);">${pIdx + 1}</td>
            <td style="padding:8px 4px; display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
              <span>${seqStr}</span>
              ${bestBadge}
            </td>
          </tr>
        `;
      }).join('');

      const totalCount = evaluatedPermutations.length;
      permAnalysisHTML = `
        <div class="route-permutation-analysis" style="margin-top:28px; padding:18px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:12px;">
          <h4 style="margin:0 0 10px 0; font-size:14px; font-weight:700; display:flex; align-items:center; gap:8px;">
            📊 <span>${getRouteResultLabel('allPermutations', '모든 경우의 수 경로 순서 분석', 'All Permutations Route Order Analysis')}</span>
            <span style="font-size:11px; font-weight:normal; color:var(--text-muted); background:rgba(255,255,255,0.06); padding:2px 6px; border-radius:10px;">
              ${getRouteResultLabel('totalCombinations', `총 ${totalCount}가지 조합`, `Total ${totalCount} combinations`, totalCount)}
            </span>
          </h4>
          <p style="font-size:12px; color:var(--text-muted); margin:0 0 12px 0; line-height:1.4;">
            ${getRouteResultLabel('permutationsDesc', '지정한 조건(시작/끝 도시)을 만족하는 모든 경로 순열을 계산했습니다. 실제 구간 이동시간 합산이 가장 짧은 순서가 최적 경로로 표시됩니다.', 'Calculated every route order matching your start/end constraints. The sequence with the shortest segment travel calculation is highlighted as Best.')}
          </p>
          <div style="max-height: 250px; overflow-y: auto;">
            <table style="width:100%; font-size:12px; border-collapse:collapse; text-align:left;">
              <thead>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--text-muted); font-weight:600;">
                  <th style="padding:6px 4px; width:30px;">#</th>
                  <th style="padding:6px 4px;">${getRouteResultLabel('sequence', '이동 순서', 'Sequence')}</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHTML}
              </tbody>
            </table>
          </div>
          ${totalCount > 10 ? `
            <div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:8px;">
              ${getRouteResultLabel('topOnly', '... 상위 10개 조합만 표시하고 있습니다 ...', '... displaying top 10 combinations only ...')}
            </div>
          ` : ''}
        </div>
      `;
    }

    const totalRecommendedStayDays = optimized.reduce((sum, city) => sum + getAverageStayDaysValue(city.id), 0);
    const roundedStayDays = Math.round(totalRecommendedStayDays);
    const totalStayText = getRecommendedStayDays('__route_total__').replace(/\d+(?:-\d+)?/, String(roundedStayDays));

    const stopsHTML = optimized.map((city, idx) => {
      const name = getRouteCityDisplayName(city);
      const country = getRouteCityCountryName(city);
      const isFirst = idx === 0;
      const isLast = idx === optimized.length - 1;
      const dotClass = isFirst ? 'stop-dot start-dot' : isLast ? 'stop-dot end-dot' : 'stop-dot';
      const dotLabel = isFirst ? getRouteResultLabel('start', '출발', 'Start') : isLast ? getRouteResultLabel('end', '종착', 'End') : idx + 1;

      const seg = idx < segments.length ? segments[idx] : null;
      let segHTML = '';
      if (seg) {
        const toName = getRouteCityDisplayName(seg.to);
        if (seg.opt) {
          const b = seg.opt.best;
          const rt = getRouteTypeBadge(b, routeLang);
          const altHTML = seg.opt.alternatives.map(a => {
            const ar = getRouteTypeBadge(a, routeLang);
            return `<span class="route-alt-chip">${getTransportIcon(a.type)} ${getTransportLabel(a.type, a)} ${formatTime(a.time)} ${ar.cls ? `<span class="${ar.cls}">${ar.label}</span>` : ''}</span>`;
          }).join('');
          let noteHTML = '';
          if (b.type === 'mixed') {
            noteHTML = getMixedRouteDetailsHTML(b, routeLang) || (b.note ? `<div class="segment-note">💡 ${formatRouteNoteForDisplay(b.note, b, routeLang)}</div>` : '');
          } else if (b.type === 'flight') {
            const hasBreakdown = Number.isFinite(b.actualFlightTime) && Number.isFinite(b.waitTime) && Number.isFinite(b.transferTime);
            if (hasBreakdown) {
              noteHTML = `
                <div class="segment-note" style="margin-top:6px; border-left: 2px solid var(--primary-color); padding-left: 10px;">
                  <strong>✈️ ${getRouteResultLabel('flightBreakdown', '항공 소요시간 상세 분석 (Door-to-Door)', 'Flight Duration Breakdown')}:</strong>
                  <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc; font-size:12px; color:var(--text-muted); line-height:1.4;">
                    <li>${getRouteResultLabel('actualFlight', '실제 비행 시간', 'Actual Flight Time')}: ${formatTime(b.actualFlightTime)}</li>
                    <li>${getRouteResultLabel('airportWait', '공항 대기 시간 (수속 및 보안검색)', 'Airport Waiting Time (Check-in/Security)')}: ${formatTime(b.waitTime)}</li>
                    <li>${getRouteResultLabel('airportTransfer', '시내 ↔ 공항 이동 시간 (왕복)', 'City ↔ Airport Transfer (Roundtrip)')}: ${formatTime(b.transferTime)}</li>
                    ${Number.isFinite(b.baggageTime) ? `<li>${getRouteResultLabel('baggageTime', '수하물 수취 시간', 'Baggage Claim Time')}: ${formatTime(b.baggageTime)}</li>` : ''}
                    <li style="margin-top:2px;"><strong>${getRouteResultLabel('segmentTravelTime', '구간 소요 시간', 'Segment Travel Time')}: ${formatTime(b.time)}</strong></li>
                  </ul>
                </div>`;
            } else {
              noteHTML = b.note ? `<div class="segment-note">💡 ${formatRouteNoteForDisplay(b.note, b, routeLang)}</div>` : '';
            }
          } else {
            noteHTML = b.note ? `<div class="segment-note">💡 ${formatRouteNoteForDisplay(b.note, b, routeLang)}</div>` : '';
          }
          const rtBadge = rt.cls ? `<span class="route-type-badge ${rt.cls}">${rt.label}</span>` : '';
          const distanceText = formatDistanceKm(b.distanceKm || (seg.data && seg.data[b.type] && seg.data[b.type].distanceKm), routeLang);
          segHTML = `
            <div class="route-segment">
              <div class="segment-transport">
                <span class="transport-badge ${b.type}">${getTransportIcon(b.type)} ${getTransportLabel(b.type, b)}</span>
                ${rtBadge}
                <span style="font-size:13px; color:var(--text-muted);">${name} → ${toName}</span>
              </div>
              <div class="segment-details"><div class="segment-detail"><span aria-hidden="true">&#9201;</span> <strong>${formatTime(b.time)}</strong></div>${distanceText ? `<div class="segment-detail"><span aria-hidden="true">&#128205;</span> <strong>${distanceText}</strong></div>` : ``}</div>
              ${noteHTML}
              ${altHTML ? `<div class="route-alt-options">${getRouteResultLabel('alternatives', '다른 옵션', 'Alternatives')}: ${altHTML}</div>` : ''}
            </div>`;
        } else {
          segHTML = `
            <div class="route-segment">
              <div style="color:var(--text-muted); font-size:13px;">⚠️ ${name} → ${toName} ${getRouteResultLabel('noDirect', '실제 이동시간 데이터 없음 - 공식 교통편 확인 필요', 'No verified travel-time data - check official transport schedules')}</div>
            </div>`;
        }
      }
      return `
        <div class="route-stop">
          <div class="route-stop-marker">
            <div class="${dotClass}">${dotLabel}</div>
            ${!isLast ? '<div class="stop-line"></div>' : ''}
          </div>
          <div class="route-stop-info">
            <div class="stop-city-name">${name}</div>
            <div class="stop-country">${country}</div>
            <div class="stop-stay">${getRouteResultLabel('averageStay', '평균 체류', 'Average stay')}: ${getRecommendedStayDays(city.id)}</div>
          </div>
        </div>
        ${segHTML}`;
    }).join('');

    content.innerHTML = `
      <div class="route-summary-bar">
        <div class="summary-item"><div class="summary-label">${getRouteResultLabel('cities', '방문 도시', 'Cities')}</div><div class="summary-value">${optimized.length}${isKo ? '개' : ''}</div></div>
        <div class="summary-item"><div class="summary-label">${getRouteResultLabel('segments', '구간 수', 'Segments')}</div><div class="summary-value">${segments.length}${isKo ? '구간' : ''}</div></div>
        <div class="summary-item"><div class="summary-label">${getRouteResultLabel('suggestedStay', '추천 체류', 'Suggested Stay')}</div><div class="summary-value">${totalStayText}</div></div>
      </div>
      <div class="route-map-card">
        <div id="routeResultMap" class="route-result-map" aria-label="${getRouteResultLabel('routeMap', '도시간 이동 경로 지도', 'Multi-city route map')}"></div>
      </div>
      <div class="route-stop-list">${stopsHTML}</div>
      <div class="route-action-bar">
        <button class="route-action-btn" onclick="saveRouteAsCourse()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
          ${getRouteResultLabel('saveAsItinerary', '일정으로 저장', 'Save as Itinerary')}
        </button>
        <button class="route-action-btn" onclick="shareRouteLink()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
          ${getRouteResultLabel('shareLink', '링크 공유', 'Share Link')}
        </button>
        <button class="route-action-btn" onclick="downloadRouteOffline()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          ${getRouteResultLabel('saveOffline', '오프라인 저장', 'Save Offline')}
        </button>
      </div>
      `;
    if (typeof repairVisibleMojibake === 'function') repairVisibleMojibake(content);
    setTimeout(() => renderRouteResultMap(optimized, segments), 0);
  }, 300);
}

// ===== Save / Share / Download =====
function saveRouteAsCourse() {
  const result = routeState.lastResult;
  if (!result) { showToast(getText('route_analyze_first')); return; }
  const { optimized, segments, totalTime } = result;
  const isKo = state.lang === 'ko';
  const routeLang = getRouteCurrentLang();
  const localizedNameKey = `name_${routeLang}`;
  const localizedDescKey = `desc_${routeLang}`;
  const cityNames = optimized.map(c => getRouteCityDisplayName(c)).join(' → ');
  const defaultName = `${cityNames} ${isKo ? '루트' : 'Route'}`;

  const tripName = prompt(isKo ? '저장할 일정 이름을 입력하세요:' : 'Enter a name for this itinerary:', defaultName);
  if (tripName === null) return;
  const name = tripName.trim() || defaultName;

  const syntheticCourse = {
    cityName: cityNames, cityId: 'multi_route', isRoute: true, optimized, segments, totalTime,
    lang: state.lang,
    startCityId: routeState.startCityId || null,
    endCityId: routeState.endCityId || null,
    displayCities: serializeRouteCities(optimized),
    inputCities: serializeRouteCities(routeState.cities),
    originalCities: serializeRouteCities(optimized),
    days: [{ day: 1, items: optimized.flatMap((city, idx) => {
      const defaultCluster = (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[city.id] && CITY_CLUSTERS[city.id][0]) || (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS['seoul'] && CITY_CLUSTERS['seoul'][0]);
      const x = defaultCluster ? defaultCluster.x : 126.9780;
      const y = defaultCluster ? defaultCluster.y : 37.5665;
      const localizedCountry = getRouteCityCountryName(city);
      const items = [{
        name_ko: `📍 ${city.name_ko} (${city.country_ko || ''})`,
        name_en: `📍 ${city.name_en} (${city.country_en || ''})`,
        [localizedNameKey]: `📍 ${getRouteCityDisplayName(city)}${localizedCountry ? ` (${localizedCountry})` : ''}`,
        desc_ko: city.desc_ko || '', desc_en: city.desc_en || '',
        [localizedDescKey]: typeof getLocalizedCityField === 'function' ? getLocalizedCityField(city, 'desc', routeLang) : (city.desc_en || ''),
        timeSlot: `Stop ${idx + 1}`, isLodging: false, isTransit: false, duration: 0,
        cityId: city.id,
        x: x,
        y: y
      }];
      if (idx < segments.length && segments[idx].opt) {
        const b = segments[idx].opt.best;
        const note = b.note || '';
        const rtKo = getRouteTypeBadge(b, true).label.replace(/^[^\w가-힣]+/, '').trim();
        const rtEn = getRouteTypeBadge(b, false).label.replace(/^[^\w]+/, '').trim();
        const noteKo = note ? formatRouteNoteForDisplay(note, b, true) : '';
        const noteEn = note ? formatRouteNoteForDisplay(note, b, false) : '';
        const mixedKo = getMixedRouteDetailsText(b, true);
        const mixedEn = getMixedRouteDetailsText(b, false);
        const distanceKo = formatDistanceKm(b.distanceKm, true);
        const distanceEn = formatDistanceKm(b.distanceKm, false);
        const fromName = getRouteCityDisplayName(city);
        const toName = getRouteCityDisplayName(segments[idx].to);
        const routeType = getRouteTypeBadge(b, routeLang).label.replace(/^[^\w가-힣]+/, '').trim();
        const noteText = note ? formatRouteNoteForDisplay(note, b, routeLang) : '';
        const mixedText = getMixedRouteDetailsText(b, routeLang);
        const distanceText = formatDistanceKm(b.distanceKm, routeLang);
        items.push({
          name_ko: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, 'ko')}: ${city.name_ko} → ${segments[idx].to.name_ko}`,
          name_en: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, 'en')}: ${city.name_en} → ${segments[idx].to.name_en}`,
          [localizedNameKey]: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, routeLang)}: ${fromName} → ${toName}`,
          desc_ko: [`${formatTime(b.time)} \uC18C\uC694`, distanceKo, rtKo, noteKo, mixedKo].filter(Boolean).join(' \u00B7 '),
          desc_en: [`${formatTime(b.time)}`, distanceEn, rtEn, noteEn, mixedEn].filter(Boolean).join(' \u00B7 '),
          [localizedDescKey]: [`${formatTime(b.time)}`, distanceText, routeType, noteText, mixedText].filter(Boolean).join(' · '),
          timeSlot: '', isTransit: true, duration: b.time
        });
      }
      return items;
    }) }]
  };

  if (!state.savedCourses) state.savedCourses = [];
  const cloneCourse = typeof cloneSavedCoursePayload === 'function'
    ? cloneSavedCoursePayload
    : (course) => JSON.parse(JSON.stringify(course));
  const editingId = state.editingSavedCourseId || null;
  const existingIndex = editingId
    ? state.savedCourses.findIndex(trip => String(trip.id) === String(editingId))
    : -1;
  const existingTrip = existingIndex >= 0 ? state.savedCourses[existingIndex] : null;
  if (existingTrip) {
    state.savedCourses[existingIndex] = {
      ...existingTrip,
      name: name,
      course: cloneCourse(syntheticCourse),
      savedAt: Date.now(),
      author: existingTrip.author || (state.activeProfile ? state.activeProfile.name : null)
    };
    state.editingSavedCourseId = existingTrip.id;
    saveToLocalStorage();
    if (typeof renderSavedCoursesList === 'function') renderSavedCoursesList();
    showToast(isKo ? '✅ 기존 경로 일정이 업데이트되었습니다.' : '✅ Saved route itinerary updated.');
    return;
  }

  const newTrip = {
    id: 'trip-' + Date.now(),
    name: name,
    course: cloneCourse(syntheticCourse),
    savedAt: Date.now(),
    author: state.activeProfile ? state.activeProfile.name : null
  };
  state.savedCourses.push(newTrip);
  state.editingSavedCourseId = newTrip.id;
  // Do not overwrite state.activeCourse with the route planner course
  saveToLocalStorage();
  if (typeof renderSavedCoursesList === 'function') renderSavedCoursesList();
  showToast(isKo ? '✅ 경로가 일정으로 저장되었습니다! AI 일정에서 확인하세요.' : '✅ Route saved as itinerary! Check AI Planner.');

  // Navigate to AI planner to show saved courses
  setTimeout(() => {
    const plannerTab = document.querySelector('.nav-tab-btn[data-tab="planner"]') ||
      Array.from(document.querySelectorAll('.nav-tab-btn')).find(b => b.textContent.includes('일정') || b.textContent.includes('Planner'));
    if (plannerTab) plannerTab.click();
  }, 800);
}


function shareRouteLink() {
  const result = routeState.lastResult;
  if (!result) { showToast(getText('route_analyze_first')); return; }
  const isKo = state.lang === 'ko';
  const { optimized, totalTime } = result;
  const payload = {
    type: 'route',
    cities: serializeRouteCities(optimized),
    optimized: serializeRouteCities(optimized),
    displayCities: serializeRouteCities(optimized),
    inputCities: serializeRouteCities(routeState.cities),
    totalTime,
    lang: state.lang,
    startCityId: routeState.startCityId || null,
    endCityId: routeState.endCityId || null,
    originalCities: serializeRouteCities(optimized)
  };
  try {
    const base64Str = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const shareUrl = window.location.href.split('?')[0].split('#')[0] + '#share=' + base64Str;
    
    const alertMsg = isKo ? '경로 공유 링크가 복사되었습니다.' : 'Route share link has been copied.';
    const promptMsg = isKo ? '아래 링크를 복사하세요:' : 'Copy:';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(isKo ? '🔗 공유 링크가 클립보드에 복사되었습니다!' : '🔗 Share link copied to clipboard!');
        alert(alertMsg);
      }).catch(err => {
        console.error(err);
        fallbackCopyRouteText(shareUrl, alertMsg, promptMsg);
      });
    } else {
      fallbackCopyRouteText(shareUrl, alertMsg, promptMsg);
    }
  } catch(e) {
    showToast(isKo ? '링크 생성 실패.' : 'Failed to generate link.');
  }
}

function fallbackCopyRouteText(text, alertMsg, promptMsg) {
  const isKo = state.lang === 'ko';
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      showToast(isKo ? '🔗 공유 링크가 클립보드에 복사되었습니다!' : '🔗 Share link copied to clipboard!');
      alert(alertMsg);
    } else {
      prompt(promptMsg, text);
    }
  } catch (err) {
    if (document.body.contains(textArea)) {
      document.body.removeChild(textArea);
    }
    prompt(promptMsg, text);
  }
}

function downloadRouteOffline() {
  const result = routeState.lastResult;
  if (!result) { showToast(getText('route_analyze_first')); return; }
  const isKo = state.lang === 'ko';
  const { optimized, segments, totalTime } = result;
  const routeLang = getRouteCurrentLang();
  const localizedNameKey = `name_${routeLang}`;
  const localizedDescKey = `desc_${routeLang}`;
  const cityNames = optimized.map(c => getRouteCityDisplayName(c)).join(' → ');
  if (typeof exportItineraryToPdf === 'function') {
    const recommendedDurationDays = Math.max(1, Math.ceil(optimized.reduce((sum, city) => sum + getAverageStayDaysValue(city.id), 0)));
    const pdfCourse = {
      cityName: cityNames,
      cityId: 'multi_route',
      durationDays: recommendedDurationDays,
      travelPace: 'moderate',
      days: [{
        day: 1,
        items: optimized.flatMap((city, idx) => {
          const localizedCountry = getRouteCityCountryName(city);
          const stopItem = {
            name_ko: `📍 ${city.name_ko}${city.country_ko ? ' · ' + city.country_ko : ''}`,
            name_en: `📍 ${city.name_en}${city.country_en ? ' · ' + city.country_en : ''}`,
            [localizedNameKey]: `📍 ${getRouteCityDisplayName(city)}${localizedCountry ? ' · ' + localizedCountry : ''}`,
            desc_ko: `평균 체류: ${getRecommendedStayDays(city.id, true)}`,
            desc_en: `Average stay: ${getRecommendedStayDays(city.id, false)}`,
            [localizedDescKey]: `${getRouteResultLabel('averageStay', '평균 체류', 'Average stay')}: ${getRecommendedStayDays(city.id)}`,
            duration: 0,
            cityId: city.id
          };
          if (idx >= segments.length) return [stopItem];
          const seg = segments[idx];
          if (!seg || !seg.opt) return [stopItem];
          const b = seg.opt.best;
          const rtKo = getRouteTypeBadge(b, true).label;
          const rtEn = getRouteTypeBadge(b, false).label;
          const noteKo = b.note ? formatRouteNoteForDisplay(b.note, b, true) : '';
          const noteEn = b.note ? formatRouteNoteForDisplay(b.note, b, false) : '';
          const mixedKo = getMixedRouteDetailsText(b, true);
          const mixedEn = getMixedRouteDetailsText(b, false);
          const distanceKo = formatDistanceKm(b.distanceKm, true);
          const distanceEn = formatDistanceKm(b.distanceKm, false);
          const fromName = getRouteCityDisplayName(city);
          const toName = getRouteCityDisplayName(seg.to);
          const routeType = getRouteTypeBadge(b, routeLang).label;
          const noteText = b.note ? formatRouteNoteForDisplay(b.note, b, routeLang) : '';
          const mixedText = getMixedRouteDetailsText(b, routeLang);
          const distanceText = formatDistanceKm(b.distanceKm, routeLang);
          return [stopItem, {
            isTransit: true,
            name_ko: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, 'ko')}: ${city.name_ko} → ${seg.to.name_ko}`,
            name_en: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, 'en')}: ${city.name_en} → ${seg.to.name_en}`,
            [localizedNameKey]: `${getTransportIcon(b.type)} ${getTransportLabel(b.type, b, routeLang)}: ${fromName} → ${toName}`,
            desc_ko: [`${formatTime(b.time)} \uC18C\uC694`, distanceKo, rtKo, noteKo, mixedKo].filter(Boolean).join(' \u00B7 '),
            desc_en: [`${formatTime(b.time)}`, distanceEn, rtEn, noteEn, mixedEn].filter(Boolean).join(' \u00B7 '),
            [localizedDescKey]: [`${formatTime(b.time)}`, distanceText, routeType, noteText, mixedText].filter(Boolean).join(' · '),
            duration: b.time
          }];
        })
      }]
    };
    exportItineraryToPdf(pdfCourse);
    return;
  }
  const date = new Date().toLocaleDateString(isKo ? 'ko-KR' : 'en-US');
  let md = `# WanderSync ${isKo ? '다중 도시 최적 경로' : 'Multi-City Optimal Route'}\n\n`;
  md += `**${isKo ? '경로' : 'Route'}**: ${cityNames}\n`;
  md += `**${isKo ? '저장일' : 'Saved'}**: ${date}\n\n---\n\n`;
  optimized.forEach((city, idx) => {
    const name = getRouteCityDisplayName(city);
    const country = getRouteCityCountryName(city);
    const isFirst = idx === 0, isLast = idx === optimized.length - 1;
    const stopLabel = isFirst ? (isKo ? '🟢 출발' : '🟢 Start') : isLast ? (isKo ? '🔴 종착' : '🔴 End') : `📍 ${isKo ? '경유' : 'Stop'} ${idx}`;
    md += `## ${stopLabel}: ${name}${country ? ', ' + country : ''}\n\n`;
    if (idx < segments.length) {
      const seg = segments[idx];
      const toName = getRouteCityDisplayName(seg.to);
      if (seg.opt) {
        const b = seg.opt.best;
        const note = b.note || '';
        const rt = getRouteTypeBadge(b, isKo);
        const routeType = rt.label || (isKo ? '도시 간 이동' : 'City transfer');
        const mixedDetails = getMixedRouteDetailsText(b, isKo);
        md += `### ↓ ${name} → ${toName}\n`;
        md += `- **${isKo ? '교통수단' : 'Transport'}**: ${getTransportIcon(b.type)} ${getTransportLabel(b.type, b)}\n`;
        md += `- **${isKo ? '소요시간' : 'Travel Time'}**: ${formatTime(b.time)}\n`;
        md += `- **${isKo ? '운행 방식' : 'Route Type'}**: ${routeType}\n`;
        if (note) md += `- **${isKo ? '참고' : 'Note'}**: ${formatRouteNoteForDisplay(note, b, isKo)}\n`;
        if (mixedDetails) md += `- **${isKo ? '복합 이동 상세' : 'Mixed Legs'}**: ${mixedDetails}\n`;
        if (b.type === 'flight') md += `- ⚠️ ${isKo ? '비행시간+공항이동(왕복)+체크인+수하물 포함' : 'Includes flight + airport transfers + check-in + baggage'}\n`;
        if (seg.opt.alternatives.length > 0) {
          md += `- **${isKo ? '다른 옵션' : 'Alternatives'}**: `;
          md += seg.opt.alternatives.map(a => { const ar = getRouteTypeBadge(a, isKo); return `${getTransportIcon(a.type)} ${getTransportLabel(a.type, a)} ${formatTime(a.time)} (${ar.label || (isKo ? '도시 간 이동' : 'City transfer')})`; }).join(' | ');
          md += '\n';
        }
        md += '\n';
      } else { md += `### ↓ ${name} → ${toName}\n⚠️ ${isKo ? '직접 이동 정보 없음' : 'No direct route data'}\n\n`; }
    }
  });
  md += `\n---\n*${isKo ? 'WanderSync AI 도시간 동선 짜기로 생성' : 'Generated by WanderSync AI Route Planner'}*`;
  try {
    const blob = new Blob([md], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WanderSync_Route_${optimized.map(c => c.id).join('-')}_${Date.now()}.txt`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(isKo ? '📥 경로가 다운로드되었습니다!' : '📥 Route downloaded!');
  } catch(e) { prompt(isKo ? '아래 내용을 복사하여 저장하세요:' : 'Copy and save:', md); }
}

// ===== Route Optimizer Tab Render =====
const ROUTE_UI_TRANSLATIONS = {
  fr: {
    title: 'AI - trajets entre villes',
    desc: "Ajoutez les villes à visiter. L'IA recommande l'ordre le plus court et les moyens de transport, avec les temps de vol porte-à-porte.",
    searchPlaceholder: 'Saisissez le nom de la ville',
    searchLabel: 'Rechercher une ville',
    unsupported: "Cette ville n'est pas encore prise en charge.",
    requestCity: 'Demander cette ville',
    selectCity: 'Choisir une ville...',
    customEntry: 'Saisie directe...',
    customPlaceholder: 'Nom de la ville...',
    add: '+ Ajouter',
    startCity: 'Ville de départ (In)',
    endCity: 'Ville finale (Out)',
    noneAuto: 'Aucune (auto)',
    analyze: 'Analyser le trajet optimal',
    empty: 'Ajoutez au moins 2 villes<br>pour obtenir le trajet optimal',
    selectCityToAdd: 'Choisir une ville à ajouter',
    customCityName: 'Nom de ville personnalisé',
    enterCityName: 'Saisissez le nom de la ville.',
    unsupportedRequest: "Cette ville n'est pas encore prise en charge. Demandez son ajout.",
    selectCityToast: 'Choisissez une ville.',
    alreadyAdded: 'Cette ville a déjà été ajoutée.',
    optimizing: 'Optimisation du trajet...',
    sharedRouteLoaded: '🔗 Trajet partagé chargé.',
    loadFailedTitle: 'AI - trajets entre villes',
    loadFailedDesc: "Impossible de charger l'écran des trajets. Vous pouvez réessayer sans actualiser.",
    recoveryShown: "Une vue de récupération s'affiche au lieu d'un écran vide.",
    reloadPlanner: 'Recharger'
  },
  zh: {
    title: 'AI城市间路线规划',
    desc: '添加要访问的城市，AI会推荐移动时间最短的顺序和交通方式。航班时间包含机场往返和手续时间。',
    searchPlaceholder: '输入城市名',
    searchLabel: '搜索城市',
    unsupported: '暂不支持这个城市。',
    requestCity: '请求添加城市',
    selectCity: '选择城市...',
    customEntry: '手动输入...',
    customPlaceholder: '输入城市名...',
    add: '+ 添加',
    startCity: '开始城市 (In)',
    endCity: '最后城市 (Out)',
    noneAuto: '不指定（自动）',
    analyze: '分析最优路线',
    empty: '添加2个以上城市后<br>即可推荐最优路线',
    selectCityToAdd: '选择要添加的城市',
    customCityName: '自定义城市名',
    enterCityName: '请输入城市名。',
    unsupportedRequest: '暂不支持这个城市。请提交城市添加请求。',
    selectCityToast: '请选择城市。',
    alreadyAdded: '这个城市已经添加过。',
    optimizing: '正在优化路线...',
    sharedRouteLoaded: '🔗 已加载分享路线。',
    loadFailedTitle: 'AI城市间路线规划',
    loadFailedDesc: '路线规划页面加载失败。无需刷新即可重试。',
    recoveryShown: '已显示恢复页面，避免空白页面。',
    reloadPlanner: '重新加载'
  },
  ja: {
    title: 'AI都市間ルート',
    desc: '訪問する都市を追加すると、AIが移動時間の短い順序と交通手段を提案します。飛行機は空港移動や手続き時間込みです。',
    searchPlaceholder: '都市名を入力',
    searchLabel: '都市名で検索',
    unsupported: 'まだ対応していない都市です。',
    requestCity: '都市追加をリクエスト',
    selectCity: '都市を選択...',
    customEntry: '直接入力...',
    customPlaceholder: '都市名を入力...',
    add: '+ 追加',
    startCity: '開始都市 (In)',
    endCity: '最後の都市 (Out)',
    noneAuto: '指定なし（自動）',
    analyze: '最適ルートを分析',
    empty: '都市を2つ以上追加すると<br>最適ルートを提案します',
    selectCityToAdd: '追加する都市を選択',
    customCityName: '直接入力する都市名',
    enterCityName: '都市名を入力してください。',
    unsupportedRequest: 'まだ対応していない都市です。都市追加をリクエストしてください。',
    selectCityToast: '都市を選択してください。',
    alreadyAdded: 'この都市はすでに追加されています。',
    optimizing: 'ルートを最適化中...',
    sharedRouteLoaded: '🔗 共有ルートを読み込みました。',
    loadFailedTitle: 'AI都市間ルート',
    loadFailedDesc: '都市間ルート画面を読み込めませんでした。再読み込みなしで再試行できます。',
    recoveryShown: '空白画面の代わりに復旧画面を表示しました。',
    reloadPlanner: '再読み込み'
  },
  es: {
    title: 'Rutas IA entre ciudades',
    desc: 'Agrega las ciudades que visitarás. La IA recomienda el orden con menor tiempo de traslado y los medios de transporte.',
    searchPlaceholder: 'Escribe el nombre de la ciudad',
    searchLabel: 'Buscar ciudad',
    unsupported: 'Esta ciudad aún no está disponible.',
    requestCity: 'Solicitar ciudad',
    selectCity: 'Seleccionar ciudad...',
    customEntry: 'Entrada manual...',
    customPlaceholder: 'Nombre de ciudad...',
    add: '+ Agregar',
    startCity: 'Ciudad inicial (In)',
    endCity: 'Ciudad final (Out)',
    noneAuto: 'Ninguna (auto)',
    analyze: 'Analizar ruta óptima',
    empty: 'Agrega 2 o más ciudades<br>para obtener la ruta óptima',
    selectCityToAdd: 'Seleccionar ciudad para agregar',
    customCityName: 'Nombre de ciudad personalizado',
    enterCityName: 'Escribe el nombre de la ciudad.',
    unsupportedRequest: 'Esta ciudad aún no está disponible. Solicita agregarla.',
    selectCityToast: 'Selecciona una ciudad.',
    alreadyAdded: 'Esta ciudad ya está agregada.',
    optimizing: 'Optimizando ruta...',
    sharedRouteLoaded: '🔗 Ruta compartida cargada.',
    loadFailedTitle: 'Rutas IA entre ciudades',
    loadFailedDesc: 'No se pudo cargar la pantalla de rutas. Puedes intentarlo de nuevo sin actualizar.',
    recoveryShown: 'Se muestra una vista de recuperación en lugar de una pantalla en blanco.',
    reloadPlanner: 'Recargar'
  }
};

function getRouteUiText(key, koText, enText) {
  const lang = typeof state !== 'undefined'
    ? (typeof normalizeLanguageCode === 'function' ? normalizeLanguageCode(state.lang) : state.lang)
    : 'en';
  const clean = (value) => typeof cleanUiText === 'function'
    ? cleanUiText(value)
    : (typeof repairMojibakeText === 'function' ? repairMojibakeText(value) : value);
  if (lang === 'ko') {
    return clean(koText);
  }
  if (lang === 'en') return clean(enText);
  return clean((ROUTE_UI_TRANSLATIONS[lang] && ROUTE_UI_TRANSLATIONS[lang][key]) || enText);
}

const ROUTE_RESULT_LABELS = {
  fr: {
    allPermutations: 'Analyse de tous les ordres possibles',
    totalCombinations: (n) => `${n} combinaisons`,
    permutationsDesc: 'Toutes les permutations respectant les villes de départ/arrivée ont été calculées. L’ordre dont la somme des temps de trajet est la plus courte est marqué comme meilleur.',
    sequence: 'Ordre',
    topOnly: '... seules les 10 meilleures combinaisons sont affichées ...',
    start: 'Départ',
    end: 'Arrivée',
    stop: 'Étape',
    averageStay: 'Séjour moyen',
    cities: 'Villes',
    segments: 'Étapes',
    suggestedStay: 'Séjour conseillé',
    alternatives: 'Alternatives',
    saveAsItinerary: 'Enregistrer comme itinéraire',
    shareLink: 'Partager le lien',
    saveOffline: 'Enregistrer hors ligne',
    routeMap: 'Carte du trajet entre villes',
    noDirect: 'Aucune donnée de durée vérifiée - vérifiez les horaires officiels',
    flightBreakdown: 'Détail du temps de vol porte-à-porte',
    actualFlight: 'Temps de vol réel',
    airportWait: 'Temps à l’aéroport (enregistrement/sécurité)',
    airportTransfer: 'Transfert ville ↔ aéroport (aller-retour)',
    segmentTravelTime: 'Temps du segment',
    baggageTime: 'Temps de récupération des bagages'
    , best: 'Meilleur'
  },
  zh: {
    allPermutations: '所有路线顺序分析',
    totalCombinations: (n) => `共 ${n} 种组合`,
    permutationsDesc: '已计算满足起点/终点条件的所有路线顺序。总移动时间最短的顺序会标记为最佳。',
    sequence: '顺序',
    topOnly: '... 仅显示前 10 个组合 ...',
    start: '出发',
    end: '到达',
    stop: '停留点',
    averageStay: '平均停留',
    cities: '城市',
    segments: '路段',
    suggestedStay: '建议停留',
    alternatives: '其他选项',
    saveAsItinerary: '保存为行程',
    shareLink: '分享链接',
    saveOffline: '离线保存',
    routeMap: '城市间路线地图',
    noDirect: '没有已验证的移动时间数据，请确认官方交通时刻',
    flightBreakdown: '航班门到门时间明细',
    actualFlight: '实际飞行时间',
    airportWait: '机场等待时间（值机/安检）',
    airportTransfer: '市区 ↔ 机场往返',
    segmentTravelTime: '路段所需时间',
    baggageTime: '行李提取时间'
    , best: '最佳'
  },
  ja: {
    allPermutations: '全ルート順序の分析',
    totalCombinations: (n) => `全 ${n} 通り`,
    permutationsDesc: '開始/終了都市の条件を満たすすべての順序を計算しました。区間移動時間の合計が最短の順序を最適ルートとして表示します。',
    sequence: '順序',
    topOnly: '... 上位10件のみ表示しています ...',
    start: '出発',
    end: '到着',
    stop: '経由',
    averageStay: '平均滞在',
    cities: '都市',
    segments: '区間',
    suggestedStay: '推奨滞在',
    alternatives: '他の選択肢',
    saveAsItinerary: '日程として保存',
    shareLink: 'リンク共有',
    saveOffline: 'オフライン保存',
    routeMap: '都市間ルート地図',
    noDirect: '確認済みの移動時間データがありません。公式交通機関の時刻を確認してください',
    flightBreakdown: 'フライト所要時間の内訳',
    actualFlight: '実際の飛行時間',
    airportWait: '空港待機時間（チェックイン/保安検査）',
    airportTransfer: '市内 ↔ 空港移動（往復）',
    segmentTravelTime: '区間所要時間',
    baggageTime: '手荷物受取時間'
    , best: '最適'
  },
  es: {
    allPermutations: 'Análisis de todos los órdenes posibles',
    totalCombinations: (n) => `${n} combinaciones`,
    permutationsDesc: 'Se calcularon todas las permutaciones que cumplen las condiciones de ciudad inicial/final. El orden con menor suma de tiempos aparece como el mejor.',
    sequence: 'Orden',
    topOnly: '... se muestran solo las 10 mejores combinaciones ...',
    start: 'Inicio',
    end: 'Final',
    stop: 'Parada',
    averageStay: 'Estancia media',
    cities: 'Ciudades',
    segments: 'Tramos',
    suggestedStay: 'Estancia sugerida',
    alternatives: 'Alternativas',
    saveAsItinerary: 'Guardar como itinerario',
    shareLink: 'Compartir enlace',
    saveOffline: 'Guardar sin conexión',
    routeMap: 'Mapa de ruta entre ciudades',
    noDirect: 'No hay datos verificados de duración; consulta los horarios oficiales',
    flightBreakdown: 'Desglose puerta a puerta del vuelo',
    actualFlight: 'Tiempo real de vuelo',
    airportWait: 'Tiempo en aeropuerto (check-in/seguridad)',
    airportTransfer: 'Traslado ciudad ↔ aeropuerto (ida y vuelta)',
    segmentTravelTime: 'Tiempo del tramo',
    baggageTime: 'Tiempo de recogida de equipaje'
    , best: 'Mejor'
  }
};

function getRouteResultLabel(key, koText, enText, ...args) {
  const lang = getRouteCurrentLang();
  const clean = (value) => typeof cleanUiText === 'function'
    ? cleanUiText(value)
    : (typeof repairMojibakeText === 'function' ? repairMojibakeText(value) : value);
  if (lang === 'ko') return clean(koText);
  if (lang === 'en') return clean(enText);
  const value = ROUTE_RESULT_LABELS[lang] && ROUTE_RESULT_LABELS[lang][key];
  if (typeof value === 'function') return clean(value(...args));
  return clean(value || enText);
}

let _shareHashProcessed = false;
function renderRouteOptimizerTabImpl() {
  const container = document.getElementById('routeOptimizerContainer');
  if (!container) return;

  const isKo = typeof state !== 'undefined' ? state.lang === 'ko' : false;
  const knownCities = getRouteSupportedCities();
  const routeTitle = getRouteUiText('title', 'AI 도시간 동선 짜기', 'AI Multi-City Route Planner');
  const routeDesc = getRouteUiText('desc', '방문할 도시들을 추가하면 AI가 이동시간이 가장 적은 최적 경로와 교통수단을 추천해드립니다. 비행기는 공항 이동, 체크인·보안수속, 수하물 수취까지 포함된 실제 소요시간입니다.', 'Add cities you plan to visit and AI will recommend the most efficient route. Flight times include airport transfers, check-in, security, and baggage claim.');
  const searchPlaceholder = getRouteUiText('searchPlaceholder', '도시명을 입력해서 찾기', 'Type a city name');
  const searchLabel = getRouteUiText('searchLabel', '도시명 검색', 'Search city by name');
  const unsupportedText = getRouteUiText('unsupported', '아직 지원하지 않는 도시예요', 'This city is not supported yet.');
  const requestCityText = getRouteUiText('requestCity', '도시 추가 요청하기', 'Request City Support');
  const selectCityText = getRouteUiText('selectCity', '도시 선택...', 'Select city...');
  const customEntryText = getRouteUiText('customEntry', '직접 입력...', 'Custom entry...');
  const customPlaceholder = getRouteUiText('customPlaceholder', '도시명 입력...', 'Enter city name...');
  const addText = getRouteUiText('add', '+ 추가', '+ Add');
  const startCityText = getRouteUiText('startCity', '시작 도시 (In) 지정', 'Start City (In)');
  const endCityText = getRouteUiText('endCity', '마지막 도시 (Out) 지정', 'End City (Out)');
  const noneAutoText = getRouteUiText('noneAuto', '지정 안 함 (자동)', 'None (Auto)');
  const analyzeText = getRouteUiText('analyze', '최적 경로 분석하기', 'Analyze Optimal Route');
  const emptyText = getRouteUiText('empty', '도시를 2개 이상 추가하면<br>최적 경로를 추천해드립니다', 'Add 2 or more cities<br>to get the optimal route');
  const selectCityToAddText = getRouteUiText('selectCityToAdd', '도시 추가 선택', 'Select city to add');
  const customCityNameText = getRouteUiText('customCityName', '직접 입력할 도시명', 'Custom city name');

  // Build city options
  const cityOptions = knownCities.map(c => `<option value="${c.id}">${getRouteCityDisplayName(c)}</option>`).join('');
  const cityDatalistOptions = knownCities.map(c => `<option value="${getRouteCityDisplayName(c)}"></option>`).join('');

  container.innerHTML = `
    <div class="route-optimizer-wrap">
      <h2 class="route-title">🗺 ${routeTitle}</h2>
      <p class="route-desc">${routeDesc}</p>

      <div class="route-input-row">
        <div class="route-city-search-wrap">
          <input type="text" id="routeCitySearchInput" class="route-custom-input route-city-search-input" list="routeCityDatalist" placeholder="${searchPlaceholder}" autocomplete="off" aria-label="${searchLabel}" />
          <datalist id="routeCityDatalist">${cityDatalistOptions}</datalist>
          <div class="unsupported-city-box route-unsupported-city-box" id="routeUnsupportedCityBox" style="display:none;">
            <span>${unsupportedText}</span>
            <button type="button" class="city-request-btn" id="routeRequestCityBtn">${requestCityText}</button>
          </div>
        </div>
        <select id="routeCitySelect" class="route-city-select" aria-label="${selectCityToAddText}">
          <option value="">${selectCityText}</option>
          ${cityOptions}
          <option value="__custom__">✏️ ${customEntryText}</option>
        </select>
        <input type="text" id="routeCityCustomInput" class="route-custom-input" placeholder="${customPlaceholder}" style="display:none;" />
        <button id="routeAddCityBtn" class="route-add-btn" onclick="addCityToRoute()">${addText}</button>
      </div>
      <div id="routeCityList" class="route-city-list"></div>
      
      <div id="routeConstraintsRow" class="route-constraints-row" style="display:none; gap: 15px; margin: 16px 0; padding: 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); border-radius: 12px; align-items: center; justify-content: space-between;">
        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
          <label for="routeStartSelect" style="font-size: 11px; color: var(--text-muted); font-weight: 500;">
            ${startCityText}
          </label>
          <select id="routeStartSelect" class="route-city-select" style="margin-top:0; width: 100%;">
            <option value="">${noneAutoText}</option>
          </select>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
          <label for="routeEndSelect" style="font-size: 11px; color: var(--text-muted); font-weight: 500;">
            ${endCityText}
          </label>
          <select id="routeEndSelect" class="route-city-select" style="margin-top:0; width: 100%;">
            <option value="">${noneAutoText}</option>
          </select>
        </div>
      </div>

      <button id="routeOptimizeBtn" class="route-optimize-btn" style="display:none;" onclick="renderRouteResult()">
        🔍 ${analyzeText}
      </button>

      <div id="routeResultPlaceholder" class="route-empty-hint">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--text-muted)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <p>${emptyText}</p>
      </div>
      <div id="routeResultContent" style="display:none;"></div>
    </div>
  `;
  if (typeof repairVisibleMojibake === 'function') repairVisibleMojibake(container);

  // Handle custom input toggle
  const sel = document.getElementById('routeCitySelect');
  const customInput = document.getElementById('routeCityCustomInput');
  if (sel) {
    sel.setAttribute('aria-label', selectCityToAddText);
  }
  if (customInput) {
    customInput.setAttribute('aria-label', customCityNameText);
  }
  if (sel && customInput) {
    sel.addEventListener('change', () => {
      customInput.style.display = sel.value === '__custom__' ? 'block' : 'none';
    });
  }
  connectRouteCitySearch();

  // ===== Restore shared route from URL hash (runs once) =====
  if (!_shareHashProcessed) {
    _shareHashProcessed = true;
    const hash = window.location.hash;
    if (hash && hash.startsWith('#share=')) {
      try {
        const payload = JSON.parse(decodeURIComponent(escape(atob(hash.slice(7)))));
        if (payload.type === 'route' && Array.isArray(payload.cities) && payload.cities.length >= 2) {
          restoreRouteStateFromPayload(payload);
          if (typeof state !== 'undefined') {
            state.currentView = 'routeplanner';
            state.activeCourse = null;
          }
          history.replaceState(null, '', window.location.pathname + window.location.search);
          showToast(getRouteUiText('sharedRouteLoaded', '🔗 공유된 경로를 불러왔습니다.', '🔗 Shared route loaded.'));
        }
      } catch(e) {
        console.error('Failed to parse share hash:', e);
      }
    }
  }

  // Re-render city chips after local/saved/shared route state has been restored.
  renderRouteCityList();
  if (routeState.lastResult) renderRouteResult();
}

function renderRouteOptimizerTabFallback(error) {
  const container = document.getElementById('routeOptimizerContainer');
  if (!container) return;
  if (typeof window !== 'undefined') {
    window.__routeLastRenderError = error && (error.stack || error.message || String(error));
  }
  console.error('Route optimizer render failed:', error);
  container.innerHTML = `
    <div class="route-optimizer-wrap">
      <h2 class="route-title">${getRouteUiText('loadFailedTitle', 'AI 도시간 동선 짜기', 'AI Multi-City Route Planner')}</h2>
      <p class="route-desc">${getRouteUiText('loadFailedDesc', '도시간 동선 화면을 불러오지 못했습니다. 새로고침 없이 다시 시도할 수 있습니다.', 'The route planner failed to load. You can retry without refreshing the page.')}</p>
      <div class="route-empty-hint">
        <p>${getRouteUiText('recoveryShown', '문제가 생겨도 빈 화면으로 멈추지 않게 복구 화면을 표시했습니다.', 'Recovery view shown instead of a blank page.')}</p>
        <button type="button" class="route-add-btn" onclick="renderRouteOptimizerTab()">${getRouteUiText('reloadPlanner', '다시 불러오기', 'Reload Planner')}</button>
      </div>
    </div>
  `;
  if (window.__routeLastRenderError) {
    container.setAttribute('data-route-error', window.__routeLastRenderError);
  }
}

function renderRouteOptimizerTab() {
  try {
    renderRouteOptimizerTabImpl();
  } catch (error) {
    renderRouteOptimizerTabFallback(error);
  }
}
