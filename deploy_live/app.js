// --- State Management ---
function getDeviceDeterministicId() {
  const agent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  const w = (typeof screen !== 'undefined' && screen.width) || 0;
  const h = (typeof screen !== 'undefined' && screen.height) || 0;
  const depth = (typeof screen !== 'undefined' && screen.colorDepth) || 0;
  const info = [agent, w, h, depth].join('|');
  let hash = 0;
  for (let i = 0; i < info.length; i++) {
    const char = info.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

const initialDeviceId = getDeviceDeterministicId();
const initialRandNum = 1000 + (initialDeviceId % 9000);

const SUPPORTED_LANG_CODES = ['ko', 'en', 'fr', 'zh', 'ja', 'es'];
const LANGUAGE_LABELS = {
  ko: '한국어',
  en: 'English',
  fr: 'Français',
  zh: '中文',
  ja: '日本語',
  es: 'Español'
};
const LANGUAGE_SHORT_LABELS = {
  ko: '한국어',
  en: 'English',
  fr: 'Français',
  zh: '中文',
  ja: '日本語',
  es: 'Español'
};
const LANGUAGE_LOCALES = {
  ko: 'ko-KR',
  en: 'en-US',
  fr: 'fr-FR',
  zh: 'zh-CN',
  ja: 'ja-JP',
  es: 'es-ES'
};

const RUNTIME_TEXT_TRANSLATIONS = {
  en: {
    '\uD648': 'Home',
    'AI \uC77C\uC815 \uC0DD\uC131': 'AI Itinerary',
    '\uB3D9\uD589 \uB9E4\uCE6D': 'Companion Matching',
    '\uB3C4\uC2DC\uAC04 \uB3D9\uC120 \uC9DC\uAE30': 'Intercity Routes',
    '\uB0B4 \uD504\uB85C\uD544': 'My Profile',
    '\uC0AD\uC81C': 'Delete',
    '\uC218\uC815': 'Edit',
    '\uCDE8\uC18C': 'Cancel',
    '\uD655\uC778': 'OK',
    '\uC9C0\uB3C4 \uBCF4\uAE30': 'View Map',
    '\uACF5\uC2DD \uC0AC\uC774\uD2B8': 'Website',
    '\uC0C8\uB85C\uC6B4 \uC7A5\uC18C \uCD94\uAC00': 'Add New Place',
    '\uC810\uC2EC\uC2DC\uAC04': 'Lunch Time',
    '\uC800\uB141\uC2DC\uAC04': 'Dinner Time',
    '\uD558\uB8E8\uC885\uC77C': 'All day',
    '\uC2DC\uAC04': 'Time',
    '\uD3C9\uADE0 \uCCB4\uB958': 'Average stay',
    '\uBC29\uBB38 \uB3C4\uC2DC': 'Cities',
    '\uAD6C\uAC04 \uC218': 'Segments',
    '\uCD94\uCC9C \uCCB4\uB958': 'Suggested Stay'
  },
  fr: {
    Home: 'Accueil',
    'AI Itinerary': 'Itinéraire IA',
    'AI Course Planner': 'Planificateur IA',
    Companions: 'Compagnons',
    'Companion Matching': 'Compagnons',
    'Intercity Routes': 'Trajets entre villes',
    'My Profile': 'Mon profil',
    Delete: 'Supprimer',
    Edit: 'Modifier',
    Cancel: 'Annuler',
    OK: 'OK',
    Time: 'Heure',
    'View Map': 'Voir la carte',
    Website: 'Site officiel',
    'Add New Place': 'Ajouter un lieu',
    'Lunch Time': 'Déjeuner',
    'Dinner Time': 'Dîner',
    'All day': 'Toute la journée',
    Cities: 'Villes',
    Segments: 'Étapes',
    'Suggested Stay': 'Séjour conseillé',
    'Average stay': 'Séjour moyen',
    'Save Route': 'Enregistrer',
    'Share Route': 'Partager',
    Download: 'Télécharger',
    'Reload Planner': 'Recharger',
    'Route Type': 'Type de trajet',
    Note: 'Note',
    Sequence: 'Ordre',
    Best: 'Meilleur',
    'Optimizing route...': 'Optimisation du trajet...',
    '🗺 AI Multi-City Route Planner': 'AI - trajets entre villes',
    'Add cities you plan to visit and AI will recommend the most efficient route. Flight times include airport transfers, check-in, security, and baggage claim.': "Ajoutez les villes à visiter. L'IA recommande l'ordre le plus court et les moyens de transport, avec les temps de vol porte-à-porte.",
    '🔍 Analyze Optimal Route': 'Analyser le trajet optimal',
    '✏️ Custom entry...': 'Saisie directe...',
    'Type a city name': 'Saisissez le nom de la ville',
    'Search city by name': 'Rechercher une ville',
    'This city is not supported yet.': "Cette ville n'est pas encore prise en charge.",
    'Request City Support': 'Demander cette ville',
    'Select city...': 'Choisir une ville...',
    'Custom entry...': 'Saisie directe...',
    'Enter city name...': 'Nom de la ville...',
    '+ Add': '+ Ajouter',
    'Start City (In)': 'Ville de départ (In)',
    'End City (Out)': 'Ville finale (Out)',
    'None (Auto)': 'Aucune (auto)',
    'Analyze Optimal Route': 'Analyser le trajet optimal',
    'Add 2 or more cities': 'Ajoutez au moins 2 villes',
    'to get the optimal route': 'pour obtenir le trajet optimal',
    'Select city to add': 'Choisir une ville à ajouter',
    'Custom city name': 'Nom de ville personnalisé',
    '\uD648': 'Accueil',
    '\uC0AD\uC81C': 'Supprimer',
    '\uC9C0\uB3C4 \uBCF4\uAE30': 'Voir la carte',
    '\uACF5\uC2DD \uC0AC\uC774\uD2B8': 'Site officiel',
    '\uC0C8\uB85C\uC6B4 \uC7A5\uC18C \uCD94\uAC00': 'Ajouter un lieu',
    '\uC810\uC2EC\uC2DC\uAC04': 'Déjeuner',
    '\uC800\uB141\uC2DC\uAC04': 'Dîner',
    '\uD558\uB8E8\uC885\uC77C': 'Toute la journée'
  },
  zh: {
    Home: '首页',
    'AI Itinerary': 'AI行程',
    'AI Course Planner': 'AI行程规划',
    Companions: '结伴',
    'Companion Matching': '结伴匹配',
    'Intercity Routes': '城市间路线',
    'My Profile': '我的资料',
    Delete: '删除',
    Edit: '编辑',
    Cancel: '取消',
    OK: '确定',
    Time: '时间',
    'View Map': '查看地图',
    Website: '官方网站',
    'Add New Place': '添加新地点',
    'Lunch Time': '午餐时间',
    'Dinner Time': '晚餐时间',
    'All day': '全天',
    Cities: '城市',
    Segments: '路段',
    'Suggested Stay': '建议停留',
    'Average stay': '平均停留',
    'Save Route': '保存路线',
    'Share Route': '分享路线',
    Download: '下载',
    'Reload Planner': '重新加载',
    'Route Type': '路线类型',
    Note: '备注',
    Sequence: '顺序',
    Best: '最佳',
    'Optimizing route...': '正在优化路线...',
    '🗺 AI Multi-City Route Planner': 'AI城市间路线规划',
    'Add cities you plan to visit and AI will recommend the most efficient route. Flight times include airport transfers, check-in, security, and baggage claim.': '添加要访问的城市，AI会推荐移动时间最短的顺序和交通方式。航班时间包含机场往返和手续时间。',
    '🔍 Analyze Optimal Route': '分析最优路线',
    '✏️ Custom entry...': '手动输入...',
    'Type a city name': '输入城市名',
    'Search city by name': '搜索城市',
    'This city is not supported yet.': '暂不支持这个城市。',
    'Request City Support': '请求添加城市',
    'Select city...': '选择城市...',
    'Custom entry...': '手动输入...',
    'Enter city name...': '输入城市名...',
    '+ Add': '+ 添加',
    'Start City (In)': '开始城市 (In)',
    'End City (Out)': '最后城市 (Out)',
    'None (Auto)': '不指定（自动）',
    'Analyze Optimal Route': '分析最优路线',
    'Add 2 or more cities': '添加2个以上城市后',
    'to get the optimal route': '即可推荐最优路线',
    'Select city to add': '选择要添加的城市',
    'Custom city name': '自定义城市名',
    '\uD648': '首页',
    '\uC0AD\uC81C': '删除',
    '\uC9C0\uB3C4 \uBCF4\uAE30': '查看地图',
    '\uACF5\uC2DD \uC0AC\uC774\uD2B8': '官方网站',
    '\uC0C8\uB85C\uC6B4 \uC7A5\uC18C \uCD94\uAC00': '添加新地点',
    '\uC810\uC2EC\uC2DC\uAC04': '午餐时间',
    '\uC800\uB141\uC2DC\uAC04': '晚餐时间',
    '\uD558\uB8E8\uC885\uC77C': '全天'
  },
  ja: {
    Home: 'ホーム',
    'AI Itinerary': 'AI日程',
    'AI Course Planner': 'AIプランナー',
    Companions: '同行者',
    'Companion Matching': '同行マッチング',
    'Intercity Routes': '都市間ルート',
    'My Profile': 'プロフィール',
    Delete: '削除',
    Edit: '編集',
    Cancel: 'キャンセル',
    OK: 'OK',
    Time: '時間',
    'View Map': '地図を見る',
    Website: '公式サイト',
    'Add New Place': '新しい場所を追加',
    'Lunch Time': 'ランチ時間',
    'Dinner Time': '夕食時間',
    'All day': '終日',
    Cities: '都市',
    Segments: '区間',
    'Suggested Stay': 'おすすめ滞在',
    'Average stay': '平均滞在',
    'Save Route': 'ルートを保存',
    'Share Route': '共有',
    Download: 'ダウンロード',
    'Reload Planner': '再読み込み',
    'Route Type': '移動タイプ',
    Note: 'メモ',
    Sequence: '順序',
    Best: '最適',
    'Optimizing route...': 'ルートを最適化中...',
    '🗺 AI Multi-City Route Planner': 'AI都市間ルート',
    'Add cities you plan to visit and AI will recommend the most efficient route. Flight times include airport transfers, check-in, security, and baggage claim.': '訪問する都市を追加すると、AIが移動時間の短い順序と交通手段を提案します。飛行機は空港移動や手続き時間込みです。',
    '🔍 Analyze Optimal Route': '最適ルートを分析',
    '✏️ Custom entry...': '直接入力...',
    'Type a city name': '都市名を入力',
    'Search city by name': '都市名で検索',
    'This city is not supported yet.': 'まだ対応していない都市です。',
    'Request City Support': '都市追加をリクエスト',
    'Select city...': '都市を選択...',
    'Custom entry...': '直接入力...',
    'Enter city name...': '都市名を入力...',
    '+ Add': '+ 追加',
    'Start City (In)': '開始都市 (In)',
    'End City (Out)': '最後の都市 (Out)',
    'None (Auto)': '指定なし（自動）',
    'Analyze Optimal Route': '最適ルートを分析',
    'Add 2 or more cities': '都市を2つ以上追加すると',
    'to get the optimal route': '最適ルートを提案します',
    'Select city to add': '追加する都市を選択',
    'Custom city name': '直接入力する都市名',
    '\uD648': 'ホーム',
    '\uC0AD\uC81C': '削除',
    '\uC9C0\uB3C4 \uBCF4\uAE30': '地図を見る',
    '\uACF5\uC2DD \uC0AC\uC774\uD2B8': '公式サイト',
    '\uC0C8\uB85C\uC6B4 \uC7A5\uC18C \uCD94\uAC00': '新しい場所を追加',
    '\uC810\uC2EC\uC2DC\uAC04': 'ランチ時間',
    '\uC800\uB141\uC2DC\uAC04': '夕食時間',
    '\uD558\uB8E8\uC885\uC77C': '終日'
  },
  es: {
    Home: 'Inicio',
    'AI Itinerary': 'Itinerario IA',
    'AI Course Planner': 'Planificador IA',
    Companions: 'Compañeros',
    'Companion Matching': 'Compañeros',
    'Intercity Routes': 'Rutas entre ciudades',
    'My Profile': 'Mi perfil',
    Delete: 'Eliminar',
    Edit: 'Editar',
    Cancel: 'Cancelar',
    OK: 'Aceptar',
    Time: 'Hora',
    'View Map': 'Ver mapa',
    Website: 'Sitio oficial',
    'Add New Place': 'Agregar lugar',
    'Lunch Time': 'Almuerzo',
    'Dinner Time': 'Cena',
    'All day': 'Todo el día',
    Cities: 'Ciudades',
    Segments: 'Tramos',
    'Suggested Stay': 'Estancia sugerida',
    'Average stay': 'Estancia media',
    'Save Route': 'Guardar ruta',
    'Share Route': 'Compartir',
    Download: 'Descargar',
    'Reload Planner': 'Recargar',
    'Route Type': 'Tipo de ruta',
    Note: 'Nota',
    Sequence: 'Orden',
    Best: 'Mejor',
    'Optimizing route...': 'Optimizando ruta...',
    '🗺 AI Multi-City Route Planner': 'Rutas IA entre ciudades',
    'Add cities you plan to visit and AI will recommend the most efficient route. Flight times include airport transfers, check-in, security, and baggage claim.': 'Agrega las ciudades que visitarás. La IA recomienda el orden con menor tiempo de traslado y los medios de transporte.',
    '🔍 Analyze Optimal Route': 'Analizar ruta óptima',
    '✏️ Custom entry...': 'Entrada manual...',
    'Type a city name': 'Escribe el nombre de la ciudad',
    'Search city by name': 'Buscar ciudad',
    'This city is not supported yet.': 'Esta ciudad aún no está disponible.',
    'Request City Support': 'Solicitar ciudad',
    'Select city...': 'Seleccionar ciudad...',
    'Custom entry...': 'Entrada manual...',
    'Enter city name...': 'Nombre de ciudad...',
    '+ Add': '+ Agregar',
    'Start City (In)': 'Ciudad inicial (In)',
    'End City (Out)': 'Ciudad final (Out)',
    'None (Auto)': 'Ninguna (auto)',
    'Analyze Optimal Route': 'Analizar ruta óptima',
    'Add 2 or more cities': 'Agrega 2 o más ciudades',
    'to get the optimal route': 'para obtener la ruta óptima',
    'Select city to add': 'Seleccionar ciudad para agregar',
    'Custom city name': 'Nombre de ciudad personalizado',
    '\uD648': 'Inicio',
    '\uC0AD\uC81C': 'Eliminar',
    '\uC9C0\uB3C4 \uBCF4\uAE30': 'Ver mapa',
    '\uACF5\uC2DD \uC0AC\uC774\uD2B8': 'Sitio oficial',
    '\uC0C8\uB85C\uC6B4 \uC7A5\uC18C \uCD94\uAC00': 'Agregar lugar',
    '\uC810\uC2EC\uC2DC\uAC04': 'Almuerzo',
    '\uC800\uB141\uC2DC\uAC04': 'Cena',
    '\uD558\uB8E8\uC885\uC77C': 'Todo el día'
  }
};

const RUNTIME_ENGLISH_TEXT_PATCHES = {
  'View Map': { ko: '지도 보기', fr: 'Voir la carte', zh: '查看地图', ja: '地図を見る', es: 'Ver mapa' },
  'Website': { ko: '공식 사이트', fr: 'Site officiel', zh: '官方网站', ja: '公式サイト', es: 'Sitio oficial' },
  'Add New Place': { ko: '새로운 장소 추가', fr: 'Ajouter un lieu', zh: '添加新地点', ja: '新しい場所を追加', es: 'Agregar lugar' },
  'Delete': { ko: '삭제', fr: 'Supprimer', zh: '删除', ja: '削除', es: 'Eliminar' },
  'Edit': { ko: '수정', fr: 'Modifier', zh: '编辑', ja: '編集', es: 'Editar' },
  'Cancel': { ko: '취소', fr: 'Annuler', zh: '取消', ja: 'キャンセル', es: 'Cancelar' },
  'Time': { ko: '시간', fr: 'Heure', zh: '时间', ja: '時間', es: 'Hora' },
  'Lunch Time': { ko: '점심시간', fr: 'Déjeuner', zh: '午餐时间', ja: 'ランチ時間', es: 'Almuerzo' },
  'Dinner Time': { ko: '저녁시간', fr: 'Dîner', zh: '晚餐时间', ja: '夕食時間', es: 'Cena' },
  'All day': { ko: '하루종일', fr: 'Toute la journée', zh: '全天', ja: '終日', es: 'Todo el día' },
  'Cities': { ko: '방문 도시', fr: 'Villes', zh: '城市', ja: '都市', es: 'Ciudades' },
  'Segments': { ko: '구간 수', fr: 'Étapes', zh: '路段', ja: '区間', es: 'Tramos' },
  'Suggested Stay': { ko: '추천 체류', fr: 'Séjour conseillé', zh: '建议停留', ja: 'おすすめ滞在', es: 'Estancia sugerida' },
  'Average stay': { ko: '평균 체류', fr: 'Séjour moyen', zh: '平均停留', ja: '平均滞在', es: 'Estancia media' },
  'Save Route': { ko: '경로 저장', fr: 'Enregistrer', zh: '保存路线', ja: 'ルートを保存', es: 'Guardar ruta' },
  'Share Route': { ko: '경로 공유', fr: 'Partager', zh: '分享路线', ja: 'ルートを共有', es: 'Compartir ruta' },
  'Download': { ko: '다운로드', fr: 'Télécharger', zh: '下载', ja: 'ダウンロード', es: 'Descargar' },
  'Reload Planner': { ko: '화면 다시 불러오기', fr: 'Recharger', zh: '重新加载', ja: '再読み込み', es: 'Recargar' },
  'Route Type': { ko: '운행 방식', fr: 'Type de trajet', zh: '路线类型', ja: '移動タイプ', es: 'Tipo de ruta' },
  'Route': { ko: '경로', fr: 'Itinéraire', zh: '路线', ja: 'ルート', es: 'Ruta' },
  'Start': { ko: '출발', fr: 'Départ', zh: '出发', ja: '出発', es: 'Salida' },
  'End': { ko: '도착', fr: 'Arrivée', zh: '到达', ja: '到着', es: 'Llegada' },
  'Stop': { ko: '경유', fr: 'Étape', zh: '经停', ja: '経由', es: 'Parada' },
  'Note': { ko: '참고', fr: 'Remarque', zh: '备注', ja: 'メモ', es: 'Nota' },
  'Sequence': { ko: '순서', fr: 'Ordre', zh: '顺序', ja: '順序', es: 'Orden' },
  'Best': { ko: '최적', fr: 'Meilleur', zh: '最佳', ja: '最適', es: 'Mejor' },
  'AI is crafting your optimized route...': { ko: 'AI가 최적의 동선을 구성하고 있습니다...', fr: "L'IA prépare votre itinéraire optimisé...", zh: 'AI正在生成优化路线...', ja: 'AIが最適なルートを作成しています...', es: 'La IA está preparando tu ruta optimizada...' },
  'Rainy day indoor-course adjustment': { ko: '비 오는 날 실내 코스 재조정', fr: 'Réorganisation en intérieur pour un jour de pluie', zh: '雨天室内行程调整', ja: '雨の日の屋内コース再調整', es: 'Ajuste de ruta interior para un día de lluvia' },
  'Make Selected Day Indoor Only': { ko: '선택한 일차를 실내 코스로 바꾸기', fr: 'Passer la journée sélectionnée en intérieur', zh: '将所选日期改为室内行程', ja: '選択した日を屋内コースに変更', es: 'Convertir el día seleccionado en ruta interior' },
  'Non-smoker': { ko: '비흡연', fr: 'Non-fumeur', zh: '不吸烟', ja: '非喫煙者', es: 'No fumador' },
  'Smoker': { ko: '흡연', fr: 'Fumeur', zh: '吸烟', ja: '喫煙者', es: 'Fumador' },
  'No preference': { ko: '상관없음', fr: 'Sans préférence', zh: '不限', ja: 'こだわらない', es: 'Sin preferencia' },
  'No alcohol': { ko: '마시지 않음', fr: "Pas d'alcool", zh: '不喝酒', ja: '飲まない', es: 'Sin alcohol' },
  'Social drinking': { ko: '가볍게 가능', fr: 'Occasionnellement', zh: '社交饮酒', ja: '付き合い程度', es: 'Consumo social' },
  'Enjoys drinks': { ko: '좋아함', fr: "Apprécie l'alcool", zh: '喜欢饮酒', ja: 'お酒が好き', es: 'Le gusta beber' },
  'Gender': { ko: '성별', fr: 'Genre', zh: '性别', ja: '性別', es: 'Género' },
  'Male': { ko: '남성', fr: 'Homme', zh: '男性', ja: '男性', es: 'Hombre' },
  'Female': { ko: '여성', fr: 'Femme', zh: '女性', ja: '女性', es: 'Mujer' },
  'Companion Chat': { ko: '동행 소통방', fr: 'Discussion entre compagnons', zh: '结伴聊天室', ja: '同行チャット', es: 'Chat de compañeros' },
  'Share My Itinerary': { ko: '내 일정 공유하기', fr: 'Partager mon itinéraire', zh: '分享我的行程', ja: '自分の日程を共有', es: 'Compartir mi itinerario' },
  'Unlimited': { ko: '인원 제한 없음', fr: 'Illimité', zh: '不限人数', ja: '人数制限なし', es: 'Sin límite' },
  '2 People': { ko: '2명', fr: '2 personnes', zh: '2人', ja: '2人', es: '2 personas' },
  '3 People': { ko: '3명', fr: '3 personnes', zh: '3人', ja: '3人', es: '3 personas' },
  '4 People': { ko: '4명', fr: '4 personnes', zh: '4人', ja: '4人', es: '4 personas' },
  '6 People': { ko: '6명', fr: '6 personnes', zh: '6人', ja: '6人', es: '6 personas' },
  '8 People': { ko: '8명', fr: '8 personnes', zh: '8人', ja: '8人', es: '8 personas' },
  '10 People': { ko: '10명', fr: '10 personnes', zh: '10人', ja: '10人', es: '10 personas' },
  'Any Gender': { ko: '성별 무관', fr: 'Tous les genres', zh: '性别不限', ja: '性別不問', es: 'Cualquier género' },
  'Preferred Age Range': { ko: '희망 나이대', fr: "Tranche d'âge souhaitée", zh: '期望年龄段', ja: '希望年代', es: 'Rango de edad preferido' },
  'Any Age': { ko: '나이 무관', fr: 'Tous les âges', zh: '年龄不限', ja: '年齢不問', es: 'Cualquier edad' },
  '20s': { ko: '20대', fr: '20-29 ans', zh: '20多岁', ja: '20代', es: '20-29 años' },
  '30s': { ko: '30대', fr: '30-39 ans', zh: '30多岁', ja: '30代', es: '30-39 años' },
  '40s': { ko: '40대', fr: '40-49 ans', zh: '40多岁', ja: '40代', es: '40-49 años' },
  '50s': { ko: '50대', fr: '50-59 ans', zh: '50多岁', ja: '50代', es: '50-59 años' },
  '60s+': { ko: '60대 이상', fr: '60 ans et plus', zh: '60岁以上', ja: '60代以上', es: '60 años o más' },
  'Preferred Languages': { ko: '희망 사용 언어', fr: 'Langues souhaitées', zh: '期望语言', ja: '希望言語', es: 'Idiomas preferidos' },
  'Smoking Compatibility': { ko: '흡연 호환', fr: 'Compatibilité tabac', zh: '吸烟偏好', ja: '喫煙条件', es: 'Compatibilidad con el tabaco' },
  'Alcohol Preference': { ko: '술 선호', fr: "Préférence d'alcool", zh: '饮酒偏好', ja: 'お酒の好み', es: 'Preferencia de alcohol' },
  'Generate an itinerary first': { ko: '일정 생성 후 선택', fr: "Générez d'abord un itinéraire", zh: '请先生成行程', ja: '先に日程を作成してください', es: 'Genera primero un itinerario' },
  'Choose a city and travel settings, then generate an AI itinerary.': { ko: '도시와 여행 조건을 선택한 뒤 AI 맞춤 코스를 생성해주세요.', fr: "Choisissez une ville et vos paramètres, puis générez un itinéraire IA.", zh: '请选择城市和旅行条件，然后生成AI行程。', ja: '都市と旅行条件を選び、AI日程を作成してください。', es: 'Elige una ciudad y las condiciones del viaje y genera un itinerario IA.' },
  'Please choose an image file.': { ko: '이미지 파일을 선택해주세요.', fr: 'Choisissez un fichier image.', zh: '请选择图片文件。', ja: '画像ファイルを選択してください。', es: 'Selecciona un archivo de imagen.' },
  'Please choose a profile photo under 1 MB.': { ko: '프로필 사진은 1MB 이하로 선택해주세요.', fr: 'Choisissez une photo de profil de moins de 1 Mo.', zh: '请选择小于1MB的头像。', ja: '1MB以下のプロフィール写真を選択してください。', es: 'Elige una foto de perfil de menos de 1 MB.' },
  'Please select a destination city.': { ko: '목적지 도시를 선택해주세요.', fr: 'Choisissez une ville de destination.', zh: '请选择目的地城市。', ja: '目的地の都市を選択してください。', es: 'Selecciona una ciudad de destino.' },
  'Profile photo reset to default.': { ko: '프로필 사진을 기본으로 되돌렸습니다.', fr: 'La photo de profil par défaut a été restaurée.', zh: '头像已恢复为默认图片。', ja: 'プロフィール写真を初期状態に戻しました。', es: 'La foto de perfil volvió a la predeterminada.' },
  'Profile saved successfully!': { ko: '프로필을 저장했습니다.', fr: 'Profil enregistré.', zh: '资料已保存。', ja: 'プロフィールを保存しました。', es: 'Perfil guardado.' },
  'No itinerary to share. Please generate a course first.': { ko: '공유할 일정이 없습니다. 코스를 먼저 생성해주세요.', fr: "Aucun itinéraire à partager. Générez d'abord un parcours.", zh: '没有可分享的行程，请先生成路线。', ja: '共有する日程がありません。先にコースを作成してください。', es: 'No hay un itinerario para compartir. Genera primero una ruta.' },
  'Itinerary shared in chat.': { ko: '채팅방에 일정이 공유되었습니다.', fr: "L'itinéraire a été partagé dans la discussion.", zh: '行程已分享到聊天室。', ja: 'チャットに日程を共有しました。', es: 'El itinerario se compartió en el chat.' },
  'This room is full.': { ko: '정원이 가득 찬 방입니다.', fr: 'Cette salle est complète.', zh: '该房间人数已满。', ja: 'このルームは満員です。', es: 'Esta sala está completa.' },
  'Any Nationality': { ko: '국적 무관', fr: 'Toutes nationalités', zh: '国籍不限', ja: '国籍不問', es: 'Cualquier nacionalidad' },
  'Room updated successfully!': { ko: '동행 방 정보가 수정되었습니다!', fr: 'Salle mise à jour.', zh: '结伴房间已更新。', ja: '同行ルームを更新しました。', es: 'Sala actualizada.' },
  'Companion room created!': { ko: '동행 모집방이 생성되었습니다!', fr: 'Salle de compagnons créée.', zh: '结伴房间已创建。', ja: '同行ルームを作成しました。', es: 'Sala de compañeros creada.' },
  'Are you sure you want to delete this companion room?': { ko: '정말로 이 동행 모집 글을 삭제하시겠습니까?', fr: 'Voulez-vous vraiment supprimer cette salle ?', zh: '确定要删除这个结伴房间吗？', ja: 'この同行ルームを削除しますか？', es: '¿Seguro que quieres eliminar esta sala?' },
  'Companion room deleted.': { ko: '동행 모집 글이 삭제되었습니다.', fr: 'Salle supprimée.', zh: '结伴房间已删除。', ja: '同行ルームを削除しました。', es: 'Sala eliminada.' },
  'Kick': { ko: '강퇴', fr: 'Exclure', zh: '移出', ja: '退出させる', es: 'Expulsar' },
  'Shared Course': { ko: '공유된 여행 코스', fr: 'Itinéraire partagé', zh: '已分享的旅行路线', ja: '共有された旅行コース', es: 'Ruta compartida' },
  'Preferences:': { ko: '주요 취향:', fr: 'Préférences :', zh: '偏好：', ja: '好み：', es: 'Preferencias:' },
  'Load Itinerary': { ko: '일정 불러오기', fr: "Charger l'itinéraire", zh: '加载行程', ja: '日程を読み込む', es: 'Cargar itinerario' },
  'No itinerary to save.': { ko: '저장할 일정이 없습니다.', fr: 'Aucun itinéraire à enregistrer.', zh: '没有可保存的行程。', ja: '保存する日程がありません。', es: 'No hay un itinerario para guardar.' },
  'Please enter a name for this itinerary:': { ko: '여행 일정의 이름을 입력해주세요:', fr: "Saisissez un nom pour cet itinéraire :", zh: '请输入此行程的名称：', ja: 'この日程の名前を入力してください：', es: 'Escribe un nombre para este itinerario:' },
  'Saved itinerary updated.': { ko: '기존 여행 일정이 업데이트되었습니다.', fr: 'Itinéraire enregistré mis à jour.', zh: '已更新保存的行程。', ja: '保存済みの日程を更新しました。', es: 'Itinerario guardado actualizado.' },
  'Itinerary saved.': { ko: '여행 일정이 저장되었습니다.', fr: 'Itinéraire enregistré.', zh: '行程已保存。', ja: '日程を保存しました。', es: 'Itinerario guardado.' },
  'Are you sure you want to delete this trip?': { ko: '정말 삭제하시겠습니까?', fr: 'Voulez-vous vraiment supprimer ce voyage ?', zh: '确定要删除这个旅行吗？', ja: 'この旅行を削除しますか？', es: '¿Seguro que quieres eliminar este viaje?' },
  'Deleted.': { ko: '삭제되었습니다.', fr: 'Supprimé.', zh: '已删除。', ja: '削除しました。', es: 'Eliminado.' },
  'No itinerary to share.': { ko: '공유할 일정이 없습니다.', fr: 'Aucun itinéraire à partager.', zh: '没有可分享的行程。', ja: '共有する日程がありません。', es: 'No hay un itinerario para compartir.' },
  'Share link copied to clipboard!': { ko: '공유 링크가 클립보드에 복사되었습니다!', fr: 'Lien de partage copié.', zh: '分享链接已复制。', ja: '共有リンクをコピーしました。', es: 'Enlace para compartir copiado.' },
  'Failed to generate share link.': { ko: '공유 링크 생성에 실패했습니다.', fr: 'Impossible de créer le lien de partage.', zh: '生成分享链接失败。', ja: '共有リンクを作成できませんでした。', es: 'No se pudo crear el enlace para compartir.' },
  'Copy this link to share:': { ko: '아래 링크를 복사하여 공유하세요:', fr: 'Copiez ce lien pour le partager :', zh: '复制此链接进行分享：', ja: 'このリンクをコピーして共有してください：', es: 'Copia este enlace para compartirlo:' },
  'Please generate an itinerary first.': { ko: '먼저 일정을 생성해주세요.', fr: "Générez d'abord un itinéraire.", zh: '请先生成行程。', ja: '先に日程を作成してください。', es: 'Genera primero un itinerario.' },
  'AI is rebuilding the route with the selected mode...': { ko: 'AI가 선택한 모드를 반영해 코스를 재구성하고 있습니다...', fr: "L'IA réorganise le parcours selon le mode choisi...", zh: 'AI正在按所选模式重新安排行程...', ja: 'AIが選択したモードでコースを再構成しています...', es: 'La IA está reorganizando la ruta con el modo elegido...' },
  'Itinerary successfully adjusted.': { ko: '일정이 성공적으로 재조정되었습니다.', fr: 'Itinéraire réorganisé.', zh: '行程已成功调整。', ja: '日程を再調整しました。', es: 'Itinerario reajustado.' },
  'You must have at least 1 attraction in a day.': { ko: '하루에 최소 1개 이상의 일반 관광지는 있어야 합니다.', fr: 'Chaque journée doit conserver au moins une visite.', zh: '每天至少要保留一个景点。', ja: '1日に少なくとも1か所の観光地が必要です。', es: 'Cada día debe conservar al menos una atracción.' },
  'Place deleted.': { ko: '장소가 삭제되었습니다.', fr: 'Lieu supprimé.', zh: '地点已删除。', ja: '場所を削除しました。', es: 'Lugar eliminado.' },
  'Itinerary reordered.': { ko: '일정 순서가 변경되었습니다.', fr: "L'ordre de l'itinéraire a été modifié.", zh: '行程顺序已更改。', ja: '日程の順序を変更しました。', es: 'Se cambió el orden del itinerario.' },
  'Shared route loaded.': { ko: '공유받은 경로를 불러왔습니다.', fr: 'Trajet partagé chargé.', zh: '已加载分享路线。', ja: '共有ルートを読み込みました。', es: 'Ruta compartida cargada.' },
  'Shared itinerary loaded.': { ko: '공유받은 일정을 불러왔습니다.', fr: 'Itinéraire partagé chargé.', zh: '已加载分享行程。', ja: '共有日程を読み込みました。', es: 'Itinerario compartido cargado.' },
  'The room creator has deleted this companion room.': { ko: '방장이 동행 방을 삭제했습니다.', fr: 'Le créateur a supprimé cette salle.', zh: '房主已删除此结伴房间。', ja: 'ルーム作成者がこの同行ルームを削除しました。', es: 'El creador eliminó esta sala.' },
  'You have been removed from the room by the creator.': { ko: '방장에 의해 퇴장되었습니다.', fr: 'Le créateur vous a retiré de la salle.', zh: '你已被房主移出房间。', ja: 'ルーム作成者によって退出させられました。', es: 'El creador te retiró de la sala.' },
  'Left the companion room.': { ko: '동행방을 퇴장했습니다.', fr: 'Vous avez quitté la salle.', zh: '已退出结伴房间。', ja: '同行ルームを退出しました。', es: 'Saliste de la sala.' },
  'City request recorded.': { ko: '도시 추가 요청이 기록되었습니다.', fr: 'Demande de ville enregistrée.', zh: '城市添加请求已记录。', ja: '都市追加リクエストを受け付けました。', es: 'Solicitud de ciudad registrada.' },
  'Please analyze the route first.': { ko: '먼저 경로를 분석해주세요.', fr: "Analysez d'abord le trajet.", zh: '请先分析路线。', ja: '先にルートを分析してください。', es: 'Analiza primero la ruta.' },
  'Enter a name for this itinerary:': { ko: '저장할 일정 이름을 입력하세요:', fr: "Saisissez un nom pour cet itinéraire :", zh: '请输入行程名称：', ja: '日程名を入力してください：', es: 'Escribe un nombre para este itinerario:' },
  'Saved route itinerary updated.': { ko: '기존 경로 일정이 업데이트되었습니다.', fr: 'Trajet enregistré mis à jour.', zh: '已更新保存的路线。', ja: '保存済みのルートを更新しました。', es: 'Ruta guardada actualizada.' },
  'Route saved as itinerary! Check AI Planner.': { ko: '경로가 일정으로 저장되었습니다. AI 일정에서 확인하세요.', fr: "Trajet enregistré comme itinéraire. Consultez le planificateur IA.", zh: '路线已保存为行程，请在AI行程中查看。', ja: 'ルートを日程として保存しました。AI日程で確認してください。', es: 'Ruta guardada como itinerario. Revísala en el planificador IA.' },
  'Route share link has been copied.': { ko: '경로 공유 링크가 복사되었습니다.', fr: 'Lien de partage du trajet copié.', zh: '路线分享链接已复制。', ja: 'ルート共有リンクをコピーしました。', es: 'Enlace de la ruta copiado.' },
  'Copy:': { ko: '복사:', fr: 'Copier :', zh: '复制：', ja: 'コピー：', es: 'Copiar:' },
  'Failed to generate link.': { ko: '링크 생성에 실패했습니다.', fr: 'Impossible de créer le lien.', zh: '生成链接失败。', ja: 'リンクを作成できませんでした。', es: 'No se pudo crear el enlace.' },
  'Route downloaded!': { ko: '경로가 다운로드되었습니다!', fr: 'Trajet téléchargé.', zh: '路线已下载。', ja: 'ルートをダウンロードしました。', es: 'Ruta descargada.' },
  'Copy and save:': { ko: '아래 내용을 복사하여 저장하세요:', fr: 'Copiez puis enregistrez :', zh: '复制并保存：', ja: 'コピーして保存してください：', es: 'Copia y guarda:' },
  'Direct': { ko: '직통', fr: 'Direct', zh: '直达', ja: '直行', es: 'Directo' },
  'Via stopover': { ko: '경유', fr: 'Avec correspondance', zh: '经停', ja: '経由', es: 'Con escala' },
  'Via airport': { ko: '공항 경유', fr: "Via l'aéroport", zh: '经机场', ja: '空港経由', es: 'Vía aeropuerto' }
};

Object.entries(RUNTIME_ENGLISH_TEXT_PATCHES).forEach(([source, translations]) => {
  Object.entries(translations).forEach(([lang, translated]) => {
    if (!RUNTIME_TEXT_TRANSLATIONS[lang]) RUNTIME_TEXT_TRANSLATIONS[lang] = {};
    RUNTIME_TEXT_TRANSLATIONS[lang][source] = translated;
  });
});

const RUNTIME_TEXT_PATTERN_TRANSLATIONS = [
  { pattern: /^(.+) Route$/, text: { ko: '$1 경로', fr: 'Itinéraire $1', zh: '$1路线', ja: '$1ルート', es: 'Ruta $1' } },
  { pattern: /^Admin alert: (.+) city support was requested\.$/, text: { ko: '관리자 알림: $1 도시 추가 요청이 들어왔습니다.', fr: "Alerte administrateur : ajout de la ville $1 demandé.", zh: '管理员通知：收到添加城市$1的请求。', ja: '管理者通知：$1の都市追加リクエストが届きました。', es: 'Aviso de administración: se solicitó añadir $1.' } },
  { pattern: /^\[System\] Room created by '(.+)'\. Please be respectful in chat\.$/, text: { ko: "[안내] '$1'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.", fr: "[Système] Salle créée par '$1'. Merci de rester courtois.", zh: "[系统] '$1'创建了此结伴房间，请文明交流。", ja: "[案内] '$1'さんが作成した同行ルームです。丁寧な会話をお願いします。", es: "[Sistema] Sala creada por '$1'. Mantén una conversación respetuosa." } },
  { pattern: /^\[System\] '(.+)' has left the room\.$/, text: { ko: "[안내] '$1'님이 퇴장하셨습니다.", fr: "[Système] '$1' a quitté la salle.", zh: "[系统] '$1'已退出房间。", ja: "[案内] '$1'さんが退出しました。", es: "[Sistema] '$1' salió de la sala." } },
  { pattern: /^(.+) has joined the chat\.$/, text: { ko: '$1님이 동행방에 입장하셨습니다.', fr: '$1 a rejoint la discussion.', zh: '$1加入了聊天室。', ja: '$1さんがチャットに参加しました。', es: '$1 se unió al chat.' } },
  { pattern: /^\[Shared Course\] (.+)'s (\d+)-day course for (.+)$/, text: { ko: '[일정 공유] $1님의 $3 $2일 코스', fr: '[Itinéraire partagé] Parcours de $1 à $3 pour $2 jours', zh: '[行程分享] $1的$3 $2天路线', ja: '[日程共有] $1さんの$3 $2日コース', es: '[Ruta compartida] Ruta de $1 por $3 durante $2 días' } },
  { pattern: /^Loaded shared route "(.+)"\.$/, text: { ko: '"$1" 공유 경로를 불러왔습니다.', fr: 'Trajet partagé « $1 » chargé.', zh: '已加载分享路线“$1”。', ja: '共有ルート「$1」を読み込みました。', es: 'Ruta compartida «$1» cargada.' } },
  { pattern: /^Loaded shared "(.+)" itinerary\.$/, text: { ko: '"$1" 공유 일정을 불러왔습니다.', fr: 'Itinéraire partagé « $1 » chargé.', zh: '已加载分享行程“$1”。', ja: '共有日程「$1」を読み込みました。', es: 'Itinerario compartido «$1» cargado.' } },
  { pattern: /^Loaded "(.+)" route\.$/, text: { ko: '"$1" 경로를 불러왔습니다.', fr: 'Trajet « $1 » chargé.', zh: '已加载路线“$1”。', ja: 'ルート「$1」を読み込みました。', es: 'Ruta «$1» cargada.' } },
  { pattern: /^Loaded "(.+)" itinerary\.$/, text: { ko: '"$1" 일정을 불러왔습니다.', fr: 'Itinéraire « $1 » chargé.', zh: '已加载行程“$1”。', ja: '日程「$1」を読み込みました。', es: 'Itinerario «$1» cargado.' } },
  { pattern: /^Are you sure you want to kick '(.+)'\?$/, text: { ko: "'$1'님을 강퇴하시겠습니까?", fr: "Voulez-vous exclure '$1' ?", zh: '确定要移出“$1”吗？', ja: '「$1」さんを退出させますか？', es: "¿Seguro que quieres expulsar a '$1'?" } },
  { pattern: /^\[System\] '(.+)' was removed by the room creator\.$/, text: { ko: "[안내] '$1'님이 방장에 의해 퇴장되었습니다.", fr: "[Système] '$1' a été retiré par le créateur.", zh: "[系统] '$1'已被房主移出。", ja: "[案内] '$1'さんがルーム作成者によって退出させられました。", es: "[Sistema] '$1' fue expulsado por el creador." } },
  { pattern: /^'(.+)' has been kicked\.$/, text: { ko: "'$1'님을 강퇴했습니다.", fr: "'$1' a été exclu.", zh: '已移出“$1”。', ja: '「$1」さんを退出させました。', es: "Se expulsó a '$1'." } },
  { pattern: /^\[안내\] '(.+)'님이 만든 동행방입니다\. 매너 있는 대화를 부탁드립니다\.$/, text: { ko: "[안내] '$1'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.", fr: "[Système] Salle créée par '$1'. Merci de rester courtois.", zh: "[系统] '$1'创建了此结伴房间，请文明交流。", ja: "[案内] '$1'さんが作成した同行ルームです。丁寧な会話をお願いします。", es: "[Sistema] Sala creada por '$1'. Mantén una conversación respetuosa." } },
  { pattern: /^\[안내\] '(.+)'님이 퇴장하셨습니다\.$/, text: { ko: "[안내] '$1'님이 퇴장하셨습니다.", fr: "[Système] '$1' a quitté la salle.", zh: "[系统] '$1'已退出房间。", ja: "[案内] '$1'さんが退出しました。", es: "[Sistema] '$1' salió de la sala." } },
  { pattern: /^(.+)님이 동행방에 입장하셨습니다\.$/, text: { ko: '$1님이 동행방에 입장하셨습니다.', fr: '$1 a rejoint la discussion.', zh: '$1加入了聊天室。', ja: '$1さんがチャットに参加しました。', es: '$1 se unió al chat.' } },
  { pattern: /^\[안내\] '(.+)'님이 방장에 의해 퇴장되었습니다\.$/, text: { ko: "[안내] '$1'님이 방장에 의해 퇴장되었습니다.", fr: "[Système] '$1' a été retiré par le créateur.", zh: "[系统] '$1'已被房主移出。", ja: "[案内] '$1'さんがルーム作成者によって退出させられました。", es: "[Sistema] '$1' fue expulsado por el creador." } }
];

function isSupportedLanguage(lang) {
  return SUPPORTED_LANG_CODES.includes(String(lang || '').toLowerCase());
}

function normalizeLanguageCode(lang) {
  const normalized = String(lang || '').toLowerCase();
  return isSupportedLanguage(normalized) ? normalized : 'ko';
}

function isKoreanLanguage(lang = state.lang) {
  return normalizeLanguageCode(lang) === 'ko';
}

function getLanguageLocale(lang = state.lang) {
  return LANGUAGE_LOCALES[normalizeLanguageCode(lang)] || 'en-US';
}

function localizeRuntimeText(text, langOverride = null) {
  if (typeof text !== 'string' || !text.trim()) return text;
  const lang = langOverride
    ? normalizeLanguageCode(langOverride)
    : (typeof state !== 'undefined' ? normalizeLanguageCode(state.lang) : 'ko');
  const map = RUNTIME_TEXT_TRANSLATIONS[lang];
  const leading = text.match(/^\s*/)[0];
  const trailing = text.match(/\s*$/)[0];
  const core = text.trim();
  if (map && map[core]) return leading + repairMojibakeText(map[core]) + trailing;
  const decorated = core.match(/^([\u2600-\u27BF\u{1F000}-\u{1FAFF}\uFE0F\u200D]+\s*)(.+)$/u);
  if (map && decorated && map[decorated[2]]) {
    return leading + decorated[1] + repairMojibakeText(map[decorated[2]]) + trailing;
  }
  if (lang !== 'en') {
    for (const rule of RUNTIME_TEXT_PATTERN_TRANSLATIONS) {
      const match = core.match(rule.pattern);
      const template = rule.text && rule.text[lang];
      if (!match || !template) continue;
      const localized = template.replace(/\$(\d+)/g, (_, index) => match[Number(index)] || '');
      return leading + repairMojibakeText(localized) + trailing;
    }
  }
  const dayMatch = core.match(/^Day\s+(\d+)$/i);
  if (dayMatch) {
    const n = dayMatch[1];
    const labels = {
      ko: `${n}\uC77C\uCC28`,
      fr: `Jour ${n}`,
      zh: `第${n}天`,
      ja: `${n}\u65E5\u76EE`,
      es: `Día ${n}`
    };
    return leading + repairMojibakeText(labels[lang] || core) + trailing;
  }
  const daysMatch = core.match(/^(\d+)\s+Days?$/i);
  if (daysMatch) return leading + getDurationOptionLabel(daysMatch[1]) + trailing;
  return text;
}

const state = {
  lang: 'ko',
  currentView: 'dashboard',
  activeProfile: {
    name: `\uC5EC\uD589\uC790_${initialRandNum}`,
    nameEn: `Traveler_${initialRandNum}`,
    gender: '\uB0A8\uC131',
    mbti: 'ESFP',
    verified: false,
    avatarDataUrl: ''
  },
  rooms: [],
  cityRequests: [],
  feedbacks: [],
  travelPace: 'moderate',
  joinedRoomId: null,
  editingRoomId: null,
  chatLogs: {},
  activeCourse: null, // Stores currently generated course
  currentItineraryDay: 1, // Currently selected day tab in planner
  savedCourses: [],
  editingSavedCourseId: null,
  regenConfig: null
};

const UNSUPPORTED_DESTINATION_CITY_IDS = new Set([
  'quito',
  'riyadh',
  'addis_ababa',
  'addisababa',
  'bogota',
  'jakarta',
  'canberra',
  'manila',
  'doha',
  'luxembourg',
  'sandiego'
]);

function isSupportedDestinationCity(city) {
  return !!(city && !UNSUPPORTED_DESTINATION_CITY_IDS.has(String(city.id || '').toLowerCase()));
}

function getSupportedDestinationCities() {
  if (typeof CITIES === 'undefined' || !Array.isArray(CITIES)) return [];
  return CITIES.filter(isSupportedDestinationCity);
}

const COUNTRY_CODE_BY_EN = {
  Argentina: 'AR',
  Australia: 'AU',
  Austria: 'AT',
  Belgium: 'BE',
  Brazil: 'BR',
  Canada: 'CA',
  Chile: 'CL',
  China: 'CN',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Egypt: 'EG',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  Iceland: 'IS',
  Indonesia: 'ID',
  Ireland: 'IE',
  Italy: 'IT',
  Japan: 'JP',
  Luxembourg: 'LU',
  Malaysia: 'MY',
  Mexico: 'MX',
  Monaco: 'MC',
  Morocco: 'MA',
  Netherlands: 'NL',
  'New Zealand': 'NZ',
  Norway: 'NO',
  Peru: 'PE',
  Poland: 'PL',
  Portugal: 'PT',
  Qatar: 'QA',
  Romania: 'RO',
  Russia: 'RU',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  Taiwan: 'TW',
  Thailand: 'TH',
  Turkey: 'TR',
  UAE: 'AE',
  UK: 'GB',
  'United Kingdom': 'GB',
  USA: 'US',
  'United States': 'US',
  Vietnam: 'VN'
};

const CITY_LOCALIZED_NAMES = {
  abudhabi: { fr: 'Abou Dabi', zh: '阿布扎比', ja: 'アブダビ', es: 'Abu Dabi' },
  amsterdam: { fr: 'Amsterdam', zh: '阿姆斯特丹', ja: 'アムステルダム', es: 'Ámsterdam' },
  ankara: { fr: 'Ankara', zh: '安卡拉', ja: 'アンカラ', es: 'Ankara' },
  athens: { fr: 'Athènes', zh: '雅典', ja: 'アテネ', es: 'Atenas' },
  bali: { fr: 'Bali', zh: '巴厘岛', ja: 'バリ', es: 'Bali' },
  bangkok: { fr: 'Bangkok', zh: '曼谷', ja: 'バンコク', es: 'Bangkok' },
  barcelona: { fr: 'Barcelone', zh: '巴塞罗那', ja: 'バルセロナ', es: 'Barcelona' },
  berlin: { fr: 'Berlin', zh: '柏林', ja: 'ベルリン', es: 'Berlín' },
  bern: { fr: 'Berne', zh: '伯尔尼', ja: 'ベルン', es: 'Berna' },
  boston: { fr: 'Boston', zh: '波士顿', ja: 'ボストン', es: 'Boston' },
  brussels: { fr: 'Bruxelles', zh: '布鲁塞尔', ja: 'ブリュッセル', es: 'Bruselas' },
  bucharest: { fr: 'Bucarest', zh: '布加勒斯特', ja: 'ブカレスト', es: 'Bucarest' },
  budapest: { fr: 'Budapest', zh: '布达佩斯', ja: 'ブダペスト', es: 'Budapest' },
  buenosaires: { fr: 'Buenos Aires', zh: '布宜诺斯艾利斯', ja: 'ブエノスアイレス', es: 'Buenos Aires' },
  busan: { fr: 'Busan', zh: '釜山', ja: '釜山', es: 'Busan' },
  cairo: { fr: 'Le Caire', zh: '开罗', ja: 'カイロ', es: 'El Cairo' },
  cancun: { fr: 'Cancún', zh: '坎昆', ja: 'カンクン', es: 'Cancún' },
  capetown: { fr: 'Le Cap', zh: '开普敦', ja: 'ケープタウン', es: 'Ciudad del Cabo' },
  casablanca: { fr: 'Casablanca', zh: '卡萨布兰卡', ja: 'カサブランカ', es: 'Casablanca' },
  chicago: { fr: 'Chicago', zh: '芝加哥', ja: 'シカゴ', es: 'Chicago' },
  copenhagen: { fr: 'Copenhague', zh: '哥本哈根', ja: 'コペンハーゲン', es: 'Copenhague' },
  doha: { fr: 'Doha', zh: '多哈', ja: 'ドーハ', es: 'Doha' },
  dubai: { fr: 'Dubaï', zh: '迪拜', ja: 'ドバイ', es: 'Dubái' },
  dublin: { fr: 'Dublin', zh: '都柏林', ja: 'ダブリン', es: 'Dublín' },
  edinburgh: { fr: 'Édimbourg', zh: '爱丁堡', ja: 'エディンバラ', es: 'Edimburgo' },
  florence: { fr: 'Florence', zh: '佛罗伦萨', ja: 'フィレンツェ', es: 'Florencia' },
  frankfurt: { fr: 'Francfort', zh: '法兰克福', ja: 'フランクフルト', es: 'Fráncfort' },
  geneva: { fr: 'Genève', zh: '日内瓦', ja: 'ジュネーブ', es: 'Ginebra' },
  hanoi: { fr: 'Hanoï', zh: '河内', ja: 'ハノイ', es: 'Hanói' },
  hawaii: { fr: 'Hawaï', zh: '夏威夷', ja: 'ハワイ', es: 'Hawái' },
  helsinki: { fr: 'Helsinki', zh: '赫尔辛基', ja: 'ヘルシンキ', es: 'Helsinki' },
  hongkong: { fr: 'Hong Kong', zh: '香港', ja: '香港', es: 'Hong Kong' },
  houston: { fr: 'Houston', zh: '休斯敦', ja: 'ヒューストン', es: 'Houston' },
  istanbul: { fr: 'Istanbul', zh: '伊斯坦布尔', ja: 'イスタンブール', es: 'Estambul' },
  interlaken: { fr: 'Interlaken', zh: '因特拉肯', ja: 'インターラーケン', es: 'Interlaken' },
  jeju: { fr: 'Jeju', zh: '济州', ja: '済州', es: 'Jeju' },
  kualalumpur: { fr: 'Kuala Lumpur', zh: '吉隆坡', ja: 'クアラルンプール', es: 'Kuala Lumpur' },
  lasvegas: { fr: 'Las Vegas', zh: '拉斯维加斯', ja: 'ラスベガス', es: 'Las Vegas' },
  lima: { fr: 'Lima', zh: '利马', ja: 'リマ', es: 'Lima' },
  lisbon: { fr: 'Lisbonne', zh: '里斯本', ja: 'リスボン', es: 'Lisboa' },
  london: { fr: 'Londres', zh: '伦敦', ja: 'ロンドン', es: 'Londres' },
  losangeles: { fr: 'Los Angeles', zh: '洛杉矶', ja: 'ロサンゼルス', es: 'Los Ángeles' },
  luxembourg: { fr: 'Luxembourg', zh: '卢森堡', ja: 'ルクセンブルク', es: 'Luxemburgo' },
  madrid: { fr: 'Madrid', zh: '马德里', ja: 'マドリード', es: 'Madrid' },
  mexicocity: { fr: 'Mexico', zh: '墨西哥城', ja: 'メキシコシティ', es: 'Ciudad de México' },
  miami: { fr: 'Miami', zh: '迈阿密', ja: 'マイアミ', es: 'Miami' },
  milan: { fr: 'Milan', zh: '米兰', ja: 'ミラノ', es: 'Milán' },
  monaco: { fr: 'Monaco', zh: '摩纳哥', ja: 'モナコ', es: 'Mónaco' },
  moscow: { fr: 'Moscou', zh: '莫斯科', ja: 'モスクワ', es: 'Moscú' },
  munich: { fr: 'Munich', zh: '慕尼黑', ja: 'ミュンヘン', es: 'Múnich' },
  newyork: { fr: 'New York', zh: '纽约', ja: 'ニューヨーク', es: 'Nueva York' },
  nice: { fr: 'Nice', zh: '尼斯', ja: 'ニース', es: 'Niza' },
  orlando: { fr: 'Orlando', zh: '奥兰多', ja: 'オーランド', es: 'Orlando' },
  osaka: { fr: 'Osaka', zh: '大阪', ja: '大阪', es: 'Osaka' },
  oslo: { fr: 'Oslo', zh: '奥斯陆', ja: 'オスロ', es: 'Oslo' },
  ottawa: { fr: 'Ottawa', zh: '渥太华', ja: 'オタワ', es: 'Ottawa' },
  paris: { fr: 'Paris', zh: '巴黎', ja: 'パリ', es: 'París' },
  porto: { fr: 'Porto', zh: '波尔图', ja: 'ポルト', es: 'Oporto' },
  prague: { fr: 'Prague', zh: '布拉格', ja: 'プラハ', es: 'Praga' },
  queenstown: { fr: 'Queenstown', zh: '皇后镇', ja: 'クイーンズタウン', es: 'Queenstown' },
  reykjavik: { fr: 'Islande - route circulaire', zh: '冰岛环岛公路', ja: 'アイスランド一周リングロード', es: 'Islandia - Ring Road' },
  rio: { fr: 'Rio de Janeiro', zh: '里约热内卢', ja: 'リオデジャネイロ', es: 'Río de Janeiro' },
  rome: { fr: 'Rome', zh: '罗马', ja: 'ローマ', es: 'Roma' },
  sandiego: { fr: 'San Diego', zh: '圣迭戈', ja: 'サンディエゴ', es: 'San Diego' },
  sanfrancisco: { fr: 'San Francisco', zh: '旧金山', ja: 'サンフランシスコ', es: 'San Francisco' },
  santiago: { fr: 'Santiago', zh: '圣地亚哥', ja: 'サンティアゴ', es: 'Santiago' },
  sapporo: { fr: 'Sapporo', zh: '札幌', ja: '札幌', es: 'Sapporo' },
  seattle: { fr: 'Seattle', zh: '西雅图', ja: 'シアトル', es: 'Seattle' },
  seoul: { fr: 'Séoul', zh: '首尔', ja: 'ソウル', es: 'Seúl' },
  shanghai: { fr: 'Shanghai', zh: '上海', ja: '上海', es: 'Shanghái' },
  stockholm: { fr: 'Stockholm', zh: '斯德哥尔摩', ja: 'ストックホルム', es: 'Estocolmo' },
  sydney: { fr: 'Sydney', zh: '悉尼', ja: 'シドニー', es: 'Sídney' },
  taipei: { fr: 'Taipei', zh: '台北', ja: '台北', es: 'Taipéi' },
  tokyo: { fr: 'Tokyo', zh: '东京', ja: '東京', es: 'Tokio' },
  toronto: { fr: 'Toronto', zh: '多伦多', ja: 'トロント', es: 'Toronto' },
  venice: { fr: 'Venise', zh: '威尼斯', ja: 'ベネチア', es: 'Venecia' },
  vienna: { fr: 'Vienne', zh: '维也纳', ja: 'ウィーン', es: 'Viena' },
  warsaw: { fr: 'Varsovie', zh: '华沙', ja: 'ワルシャワ', es: 'Varsovia' },
  washington: { fr: 'Washington D.C.', zh: '华盛顿特区', ja: 'ワシントンD.C.', es: 'Washington D.C.' },
  wellington: { fr: 'Wellington', zh: '惠灵顿', ja: 'ウェリントン', es: 'Wellington' }
};

const CITY_DEFAULT_COORDS = {
  abudhabi: { x: 54.3773, y: 24.4539 }, amsterdam: { x: 4.9041, y: 52.3676 }, ankara: { x: 32.8597, y: 39.9334 },
  athens: { x: 23.7275, y: 37.9838 }, bali: { x: 115.1889, y: -8.4095 }, bangkok: { x: 100.5018, y: 13.7563 },
  barcelona: { x: 2.1734, y: 41.3851 }, berlin: { x: 13.4050, y: 52.5200 }, bern: { x: 7.4474, y: 46.9480 },
  boston: { x: -71.0589, y: 42.3601 }, brussels: { x: 4.3517, y: 50.8503 }, bucharest: { x: 26.1025, y: 44.4268 },
  budapest: { x: 19.0402, y: 47.4979 }, buenosaires: { x: -58.3816, y: -34.6037 }, busan: { x: 129.0756, y: 35.1796 },
  cairo: { x: 31.2357, y: 30.0444 }, cancun: { x: -86.8515, y: 21.1619 }, capetown: { x: 18.4241, y: -33.9249 },
  casablanca: { x: -7.5898, y: 33.5731 }, chicago: { x: -87.6298, y: 41.8781 }, copenhagen: { x: 12.5683, y: 55.6761 },
  doha: { x: 51.5310, y: 25.2854 }, dubai: { x: 55.2708, y: 25.2048 }, dublin: { x: -6.2603, y: 53.3498 },
  edinburgh: { x: -3.1883, y: 55.9533 }, florence: { x: 11.2558, y: 43.7696 }, frankfurt: { x: 8.6821, y: 50.1109 },
  geneva: { x: 6.1432, y: 46.2044 },
  hanoi: { x: 105.8342, y: 21.0278 }, hawaii: { x: -157.8583, y: 21.3069 }, helsinki: { x: 24.9384, y: 60.1699 },
  hongkong: { x: 114.1694, y: 22.3193 }, houston: { x: -95.3698, y: 29.7604 }, interlaken: { x: 7.8632, y: 46.6863 },
  istanbul: { x: 28.9784, y: 41.0082 },
  jeju: { x: 126.5312, y: 33.4996 }, kualalumpur: { x: 101.6869, y: 3.1390 }, lasvegas: { x: -115.1398, y: 36.1699 },
  lima: { x: -77.0428, y: -12.0464 }, lisbon: { x: -9.1393, y: 38.7223 }, london: { x: -0.1276, y: 51.5074 },
  losangeles: { x: -118.2437, y: 34.0522 }, luxembourg: { x: 6.1296, y: 49.6116 }, madrid: { x: -3.7038, y: 40.4168 },
  mexicocity: { x: -99.1332, y: 19.4326 }, miami: { x: -80.1918, y: 25.7617 }, milan: { x: 9.1900, y: 45.4642 },
  monaco: { x: 7.4246, y: 43.7384 }, moscow: { x: 37.6173, y: 55.7558 }, munich: { x: 11.5820, y: 48.1351 },
  newyork: { x: -74.0060, y: 40.7128 }, nice: { x: 7.2619, y: 43.7102 }, orlando: { x: -81.3792, y: 28.5383 },
  osaka: { x: 135.5023, y: 34.6937 }, oslo: { x: 10.7522, y: 59.9139 }, ottawa: { x: -75.6972, y: 45.4215 },
  paris: { x: 2.3522, y: 48.8566 }, porto: { x: -8.6291, y: 41.1579 }, prague: { x: 14.4378, y: 50.0755 },
  queenstown: { x: 168.6626, y: -45.0312 }, reykjavik: { x: -18.9000, y: 64.9631 }, rio: { x: -43.1729, y: -22.9068 },
  rome: { x: 12.4964, y: 41.9028 }, sandiego: { x: -117.1611, y: 32.7157 }, sanfrancisco: { x: -122.4194, y: 37.7749 },
  santiago: { x: -70.6693, y: -33.4489 }, sapporo: { x: 141.3545, y: 43.0618 }, seattle: { x: -122.3321, y: 47.6062 },
  seoul: { x: 126.9780, y: 37.5665 }, shanghai: { x: 121.4737, y: 31.2304 }, stockholm: { x: 18.0686, y: 59.3293 },
  sydney: { x: 151.2093, y: -33.8688 }, taipei: { x: 121.5654, y: 25.0330 }, tokyo: { x: 139.6917, y: 35.6895 },
  toronto: { x: -79.3832, y: 43.6532 }, venice: { x: 12.3155, y: 45.4408 }, vienna: { x: 16.3738, y: 48.2082 },
  warsaw: { x: 21.0122, y: 52.2297 }, washington: { x: -77.0369, y: 38.9072 }, wellington: { x: 174.7762, y: -41.2865 }
};

const CITY_DESCRIPTION_TEMPLATES = {
  ko: (city, country) => `${city}${country ? `, ${country}` : ''}의 대표 여행지를 중심으로 구성한 여행 코스입니다.`,
  en: (city, country) => `A travel course built around the main sights of ${city}${country ? `, ${country}` : ''}.`,
  fr: (city, country) => `Un itinéraire organisé autour des sites incontournables de ${city}${country ? `, ${country}` : ''}.`,
  zh: (city, country) => `围绕${city}${country ? `（${country}）` : ''}主要景点安排的旅行路线。`,
  ja: (city, country) => `${city}${country ? `（${country}）` : ''}の代表的な見どころを中心に組んだ旅行コースです。`,
  es: (city, country) => `Un itinerario organizado alrededor de los lugares principales de ${city}${country ? `, ${country}` : ''}.`
};

const MAX_REASONABLE_DAY_TRIP_KM = 160;
const MAX_REASONABLE_DAY_TRIP_ONE_WAY_MINUTES = 120;
const FAR_DAY_TRIP_TEXT_PATTERN = /(norway in a nutshell|nutshell|naeroyfjord|nærøyfjord|flam|flåm|meteora|cliffs of moher|giant'?s causeway|krakow|belfast|long full[-\s]?day|장거리|메테오라|모허|자이언츠|크라쿠프|벨파스트)/i;

const DATA_LABELS = {
  ko: { lunch: '점심시간', dinner: '저녁시간', breakfast: '아침식사', mealDesc: '주변 식당에서 자유로운 개별 식사', freeBreak: '자유 시간', lodgingStart: '숙소 출발', lodgingEnd: '숙소 복귀', transit: '이동', dayTrip: '근교 당일치기', fullDay: '하루종일', routeDesc: (name) => `${name} 중심의 실제 방문 가능한 일정입니다.` },
  en: { lunch: 'Lunch Time', dinner: 'Dinner Time', breakfast: 'Breakfast', mealDesc: 'Enjoy individual dining at a nearby restaurant.', freeBreak: 'Free Time', lodgingStart: 'Depart from Lodging', lodgingEnd: 'Return to Lodging', transit: 'Transit', dayTrip: 'Day Trip', fullDay: 'All day', routeDesc: (name) => `A practical visit built around ${name}.` },
  fr: { lunch: 'Déjeuner', dinner: 'Dîner', breakfast: 'Petit-déjeuner', mealDesc: 'Repas libre dans un restaurant à proximité.', freeBreak: 'Temps libre', lodgingStart: 'Départ de l’hébergement', lodgingEnd: 'Retour à l’hébergement', transit: 'Trajet', dayTrip: 'Excursion d’une journée', fullDay: 'Toute la journée', routeDesc: (name) => `Étape réelle et organisée autour de ${name}.` },
  zh: { lunch: '午餐时间', dinner: '晚餐时间', breakfast: '早餐', mealDesc: '在附近餐厅自由用餐。', freeBreak: '自由时间', lodgingStart: '从住宿出发', lodgingEnd: '返回住宿', transit: '移动', dayTrip: '周边一日游', fullDay: '全天', routeDesc: (name) => `围绕${name}安排的实际可访问行程。` },
  ja: { lunch: 'ランチ時間', dinner: '夕食時間', breakfast: '朝食', mealDesc: '近くの飲食店で自由に食事。', freeBreak: '自由時間', lodgingStart: '宿泊先を出発', lodgingEnd: '宿泊先へ戻る', transit: '移動', dayTrip: '近郊日帰り', fullDay: '終日', routeDesc: (name) => `${name}を中心にした実際に訪問できる行程です。` },
  es: { lunch: 'Almuerzo', dinner: 'Cena', breakfast: 'Desayuno', mealDesc: 'Comida libre en un restaurante cercano.', freeBreak: 'Tiempo libre', lodgingStart: 'Salida desde el alojamiento', lodgingEnd: 'Regreso al alojamiento', transit: 'Traslado', dayTrip: 'Excursión de un día', fullDay: 'Todo el día', routeDesc: (name) => `Parada real y práctica organizada alrededor de ${name}.` }
};

const PLACE_TERM_TRANSLATIONS = {
  fr: [[/Public Transit/gi, 'Transport public'], [/Times Square/gi, 'Times Square'], [/Statue of Liberty/gi, 'Statue de la Liberté'], [/Central Park/gi, 'Central Park'], [/Brooklyn Bridge/gi, 'pont de Brooklyn'], [/Ellis Island/gi, 'Ellis Island'], [/Lunch Time/gi, 'Déjeuner'], [/Dinner Time/gi, 'Dîner'], [/Breakfast/gi, 'Petit-déjeuner'], [/Museum/gi, 'musée'], [/Palace/gi, 'palais'], [/Temple/gi, 'temple'], [/Shrine/gi, 'sanctuaire'], [/Garden/gi, 'jardin'], [/Park/gi, 'parc'], [/Market/gi, 'marché'], [/Beach/gi, 'plage'], [/Tower/gi, 'tour'], [/Bridge/gi, 'pont'], [/Cathedral/gi, 'cathédrale'], [/Castle/gi, 'château'], [/Square/gi, 'place'], [/Street/gi, 'rue'], [/Promenade/gi, 'promenade'], [/Observatory/gi, 'observatoire'], [/Waterfront/gi, 'front de mer'], [/Old Town/gi, 'vieille ville'], [/Day Trip/gi, 'excursion d’une journée'], [/Full-Day Visit/gi, 'visite toute la journée'], [/Hike/gi, 'randonnée'], [/Trail/gi, 'sentier'], [/Island/gi, 'île']],
  zh: [[/Public Transit/gi, '公共交通'], [/Times Square Neon Walk/gi, '时代广场霓虹街区漫步'], [/Times Square/gi, '时代广场'], [/Statue of Liberty/gi, '自由女神像'], [/Central Park/gi, '中央公园'], [/Brooklyn Bridge/gi, '布鲁克林大桥'], [/Ellis Island/gi, '埃利斯岛'], [/DUMBO/gi, '丹波区'], [/Lunch Time/gi, '午餐时间'], [/Dinner Time/gi, '晚餐时间'], [/Breakfast/gi, '早餐'], [/Museum/gi, '博物馆'], [/Palace/gi, '宫殿'], [/Temple/gi, '寺庙'], [/Shrine/gi, '神社'], [/Garden/gi, '花园'], [/Park/gi, '公园'], [/Market/gi, '市场'], [/Beach/gi, '海滩'], [/Tower/gi, '塔'], [/Bridge/gi, '桥'], [/Cathedral/gi, '大教堂'], [/Castle/gi, '城堡'], [/Square/gi, '广场'], [/Street/gi, '街'], [/Promenade/gi, '步道'], [/Observatory/gi, '观景台'], [/Waterfront/gi, '滨水区'], [/Old Town/gi, '老城'], [/Day Trip/gi, '一日游'], [/Full-Day Visit/gi, '全天游览'], [/Hike/gi, '徒步'], [/Trail/gi, '步道'], [/Island/gi, '岛']],
  ja: [[/Public Transit/gi, '公共交通機関'], [/Times Square Neon Walk/gi, 'タイムズスクエアのネオン散策'], [/Times Square/gi, 'タイムズスクエア'], [/Statue of Liberty/gi, '自由の女神'], [/Central Park/gi, 'セントラルパーク'], [/Brooklyn Bridge/gi, 'ブルックリン橋'], [/Ellis Island/gi, 'エリス島'], [/DUMBO/gi, 'ダンボ地区'], [/Lunch Time/gi, 'ランチ時間'], [/Dinner Time/gi, '夕食時間'], [/Breakfast/gi, '朝食'], [/Museum/gi, '博物館'], [/Palace/gi, '宮殿'], [/Temple/gi, '寺院'], [/Shrine/gi, '神社'], [/Garden/gi, '庭園'], [/Park/gi, '公園'], [/Market/gi, '市場'], [/Beach/gi, 'ビーチ'], [/Tower/gi, 'タワー'], [/Bridge/gi, '橋'], [/Cathedral/gi, '大聖堂'], [/Castle/gi, '城'], [/Square/gi, '広場'], [/Street/gi, '通り'], [/Promenade/gi, '遊歩道'], [/Observatory/gi, '展望台'], [/Waterfront/gi, 'ウォーターフロント'], [/Old Town/gi, '旧市街'], [/Day Trip/gi, '日帰り旅行'], [/Full-Day Visit/gi, '終日訪問'], [/Hike/gi, 'ハイキング'], [/Trail/gi, 'トレイル'], [/Island/gi, '島']],
  es: [[/Public Transit/gi, 'Transporte público'], [/Times Square/gi, 'Times Square'], [/Statue of Liberty/gi, 'Estatua de la Libertad'], [/Central Park/gi, 'Central Park'], [/Brooklyn Bridge/gi, 'puente de Brooklyn'], [/Ellis Island/gi, 'Ellis Island'], [/Lunch Time/gi, 'Almuerzo'], [/Dinner Time/gi, 'Cena'], [/Breakfast/gi, 'Desayuno'], [/Museum/gi, 'museo'], [/Palace/gi, 'palacio'], [/Temple/gi, 'templo'], [/Shrine/gi, 'santuario'], [/Garden/gi, 'jardín'], [/Park/gi, 'parque'], [/Market/gi, 'mercado'], [/Beach/gi, 'playa'], [/Tower/gi, 'torre'], [/Bridge/gi, 'puente'], [/Cathedral/gi, 'catedral'], [/Castle/gi, 'castillo'], [/Square/gi, 'plaza'], [/Street/gi, 'calle'], [/Promenade/gi, 'paseo'], [/Observatory/gi, 'mirador'], [/Waterfront/gi, 'zona costera'], [/Old Town/gi, 'casco antiguo'], [/Day Trip/gi, 'excursión de un día'], [/Full-Day Visit/gi, 'visita de día completo'], [/Hike/gi, 'senderismo'], [/Trail/gi, 'sendero'], [/Island/gi, 'isla']]
};

const ENGLISH_CITY_PLACE_TRANSLATIONS = {
  fr: [
    [/Empire State Building/gi, 'gratte-ciel Empire State'], [/Rockefeller Center/gi, 'Rockefeller Center'], [/One World Observatory/gi, 'Observatoire One World'], [/Wall Street/gi, 'Wall Street'], [/New York Stock Exchange/gi, 'Bourse de New York'], [/High Line/gi, 'High Line'], [/Chelsea Market/gi, 'Chelsea Market'], [/Metropolitan Museum of Art|The Met/gi, 'Metropolitan Museum of Art'], [/Broadway/gi, 'Broadway'], [/Hollywood/gi, 'Hollywood'], [/Griffith Observatory/gi, 'observatoire Griffith'], [/Santa Monica Pier/gi, 'jetée de Santa Monica'], [/Venice Beach/gi, 'plage de Venice'], [/Golden Gate Bridge/gi, 'pont du Golden Gate'], [/Fisherman'?s Wharf/gi, 'Fisherman’s Wharf'], [/Alcatraz/gi, 'Alcatraz'], [/Space Needle/gi, 'Space Needle'], [/Pike Place Market/gi, 'marché Pike Place'], [/Navy Pier/gi, 'Navy Pier'], [/Millennium Park/gi, 'Millennium Park'], [/Freedom Trail/gi, 'Freedom Trail'], [/Harvard/gi, 'Harvard'], [/South Beach/gi, 'South Beach'], [/Walt Disney World/gi, 'Walt Disney World'], [/Universal Orlando/gi, 'Universal Orlando'], [/Buckingham Palace/gi, 'palais de Buckingham'], [/Westminster Abbey/gi, 'abbaye de Westminster'], [/Tower of London/gi, 'tour de Londres'], [/British Museum/gi, 'British Museum'], [/London Eye/gi, 'London Eye'], [/Tower Bridge/gi, 'Tower Bridge'], [/Hyde Park/gi, 'Hyde Park'], [/Sydney Opera House/gi, 'opéra de Sydney'], [/Harbour Bridge/gi, 'pont du port de Sydney'], [/Bondi Beach/gi, 'plage de Bondi'], [/Darling Harbour/gi, 'Darling Harbour'], [/Blue Mountains/gi, 'Blue Mountains'], [/Te Papa/gi, 'Te Papa'], [/Wellington Cable Car/gi, 'funiculaire de Wellington'], [/Mount Victoria/gi, 'mont Victoria'], [/Botanic Garden/gi, 'jardin botanique']
  ],
  zh: [
    [/Empire State Building/gi, '帝国大厦'], [/Rockefeller Center/gi, '洛克菲勒中心'], [/One World Observatory/gi, '世贸一号观景台'], [/Wall Street/gi, '华尔街'], [/New York Stock Exchange/gi, '纽约证券交易所'], [/High Line/gi, '高线公园'], [/Chelsea Market/gi, '切尔西市场'], [/Metropolitan Museum of Art|The Met/gi, '大都会艺术博物馆'], [/Broadway/gi, '百老汇'], [/Hollywood/gi, '好莱坞'], [/Griffith Observatory/gi, '格里菲斯天文台'], [/Santa Monica Pier/gi, '圣莫尼卡码头'], [/Venice Beach/gi, '威尼斯海滩'], [/Golden Gate Bridge/gi, '金门大桥'], [/Fisherman'?s Wharf/gi, '渔人码头'], [/Alcatraz/gi, '恶魔岛'], [/Space Needle/gi, '太空针塔'], [/Pike Place Market/gi, '派克市场'], [/Navy Pier/gi, '海军码头'], [/Millennium Park/gi, '千禧公园'], [/Freedom Trail/gi, '自由之路'], [/Harvard/gi, '哈佛'], [/South Beach/gi, '南海滩'], [/Walt Disney World/gi, '华特迪士尼世界'], [/Universal Orlando/gi, '奥兰多环球影城'], [/Buckingham Palace/gi, '白金汉宫'], [/Westminster Abbey/gi, '威斯敏斯特教堂'], [/Tower of London/gi, '伦敦塔'], [/British Museum/gi, '大英博物馆'], [/London Eye/gi, '伦敦眼'], [/Tower Bridge/gi, '塔桥'], [/Hyde Park/gi, '海德公园'], [/Sydney Opera House/gi, '悉尼歌剧院'], [/Harbour Bridge/gi, '海港大桥'], [/Bondi Beach/gi, '邦迪海滩'], [/Darling Harbour/gi, '达令港'], [/Blue Mountains/gi, '蓝山'], [/Te Papa/gi, '蒂帕帕国家博物馆'], [/Wellington Cable Car/gi, '惠灵顿缆车'], [/Mount Victoria/gi, '维多利亚山'], [/Botanic Garden/gi, '植物园']
  ],
  ja: [
    [/Empire State Building/gi, 'エンパイアステートビル'], [/Rockefeller Center/gi, 'ロックフェラーセンター'], [/One World Observatory/gi, 'ワンワールド展望台'], [/Wall Street/gi, 'ウォール街'], [/New York Stock Exchange/gi, 'ニューヨーク証券取引所'], [/High Line/gi, 'ハイライン'], [/Chelsea Market/gi, 'チェルシーマーケット'], [/Metropolitan Museum of Art|The Met/gi, 'メトロポリタン美術館'], [/Broadway/gi, 'ブロードウェイ'], [/Hollywood/gi, 'ハリウッド'], [/Griffith Observatory/gi, 'グリフィス天文台'], [/Santa Monica Pier/gi, 'サンタモニカ・ピア'], [/Venice Beach/gi, 'ベニスビーチ'], [/Golden Gate Bridge/gi, 'ゴールデンゲートブリッジ'], [/Fisherman'?s Wharf/gi, 'フィッシャーマンズワーフ'], [/Alcatraz/gi, 'アルカトラズ島'], [/Space Needle/gi, 'スペースニードル'], [/Pike Place Market/gi, 'パイクプレイスマーケット'], [/Navy Pier/gi, 'ネイビーピア'], [/Millennium Park/gi, 'ミレニアムパーク'], [/Freedom Trail/gi, 'フリーダムトレイル'], [/Harvard/gi, 'ハーバード'], [/South Beach/gi, 'サウスビーチ'], [/Walt Disney World/gi, 'ウォルト・ディズニー・ワールド'], [/Universal Orlando/gi, 'ユニバーサル・オーランド'], [/Buckingham Palace/gi, 'バッキンガム宮殿'], [/Westminster Abbey/gi, 'ウェストミンスター寺院'], [/Tower of London/gi, 'ロンドン塔'], [/British Museum/gi, '大英博物館'], [/London Eye/gi, 'ロンドン・アイ'], [/Tower Bridge/gi, 'タワーブリッジ'], [/Hyde Park/gi, 'ハイドパーク'], [/Sydney Opera House/gi, 'シドニー・オペラハウス'], [/Harbour Bridge/gi, 'ハーバーブリッジ'], [/Bondi Beach/gi, 'ボンダイビーチ'], [/Darling Harbour/gi, 'ダーリングハーバー'], [/Blue Mountains/gi, 'ブルーマウンテンズ'], [/Te Papa/gi, 'テ・パパ国立博物館'], [/Wellington Cable Car/gi, 'ウェリントン・ケーブルカー'], [/Mount Victoria/gi, 'マウント・ビクトリア'], [/Botanic Garden/gi, '植物園']
  ],
  es: [
    [/Empire State Building/gi, 'edificio Empire State'], [/Rockefeller Center/gi, 'Rockefeller Center'], [/One World Observatory/gi, 'mirador One World'], [/Wall Street/gi, 'Wall Street'], [/New York Stock Exchange/gi, 'Bolsa de Nueva York'], [/High Line/gi, 'High Line'], [/Chelsea Market/gi, 'Chelsea Market'], [/Metropolitan Museum of Art|The Met/gi, 'Museo Metropolitano de Arte'], [/Broadway/gi, 'Broadway'], [/Hollywood/gi, 'Hollywood'], [/Griffith Observatory/gi, 'Observatorio Griffith'], [/Santa Monica Pier/gi, 'muelle de Santa Monica'], [/Venice Beach/gi, 'playa Venice'], [/Golden Gate Bridge/gi, 'puente Golden Gate'], [/Fisherman'?s Wharf/gi, 'Fisherman’s Wharf'], [/Alcatraz/gi, 'Alcatraz'], [/Space Needle/gi, 'Space Needle'], [/Pike Place Market/gi, 'mercado Pike Place'], [/Navy Pier/gi, 'Navy Pier'], [/Millennium Park/gi, 'Millennium Park'], [/Freedom Trail/gi, 'Freedom Trail'], [/Harvard/gi, 'Harvard'], [/South Beach/gi, 'South Beach'], [/Walt Disney World/gi, 'Walt Disney World'], [/Universal Orlando/gi, 'Universal Orlando'], [/Buckingham Palace/gi, 'palacio de Buckingham'], [/Westminster Abbey/gi, 'abadía de Westminster'], [/Tower of London/gi, 'Torre de Londres'], [/British Museum/gi, 'Museo Británico'], [/London Eye/gi, 'London Eye'], [/Tower Bridge/gi, 'Tower Bridge'], [/Hyde Park/gi, 'Hyde Park'], [/Sydney Opera House/gi, 'Ópera de Sídney'], [/Harbour Bridge/gi, 'puente del Puerto de Sídney'], [/Bondi Beach/gi, 'playa Bondi'], [/Darling Harbour/gi, 'Darling Harbour'], [/Blue Mountains/gi, 'Montañas Azules'], [/Te Papa/gi, 'Te Papa'], [/Wellington Cable Car/gi, 'teleférico de Wellington'], [/Mount Victoria/gi, 'Monte Victoria'], [/Botanic Garden/gi, 'jardín botánico']
  ]
};

const CURATED_PLACE_NAME_TRANSLATIONS = {
  'lower manhattan/soho (south)': { ko: '로어 맨해튼/소호 (남부)', fr: 'Lower Manhattan/SoHo (sud)', zh: '下曼哈顿/苏豪区（南部）', ja: 'ロウアー・マンハッタン/ソーホー（南部）', es: 'Lower Manhattan/SoHo (sur)' },
  'queens/astoria (northeast)': { ko: '퀸스/아스토리아 (북동부)', fr: 'Queens/Astoria (nord-est)', zh: '皇后区/阿斯托里亚（东北部）', ja: 'クイーンズ/アストリア（北東部）', es: 'Queens/Astoria (noreste)' },
  'griffith observatory park': { ko: '그리피스 천문대 공원', fr: 'parc de l’observatoire Griffith', zh: '格里菲斯天文台公园', ja: 'グリフィス天文台公園', es: 'parque del Observatorio Griffith' },
  'hollywood walk of fame': { ko: '할리우드 명예의 거리', fr: 'Walk of Fame d’Hollywood', zh: '好莱坞星光大道', ja: 'ハリウッド・ウォーク・オブ・フェーム', es: 'Paseo de la Fama de Hollywood' },
  'universal studios hollywood': { ko: '유니버설 스튜디오 할리우드', fr: 'Universal Studios Hollywood', zh: '好莱坞环球影城', ja: 'ユニバーサル・スタジオ・ハリウッド', es: 'Universal Studios Hollywood' },
  'rodeo drive beverly hills': { ko: '베벌리힐스 로데오 드라이브', fr: 'Rodeo Drive à Beverly Hills', zh: '比佛利山庄罗迪欧大道', ja: 'ビバリーヒルズ・ロデオドライブ', es: 'Rodeo Drive de Beverly Hills' },
  'the getty center': { ko: '게티 센터', fr: 'centre Getty', zh: '盖蒂中心', ja: 'ゲティ・センター', es: 'Centro Getty' },
  'the broad': { ko: '더 브로드 미술관', fr: 'musée The Broad', zh: '布洛德博物馆', ja: 'ザ・ブロード美術館', es: 'Museo The Broad' },
  'tcl chinese theatre': { ko: 'TCL 차이니즈 시어터', fr: 'TCL Chinese Theatre', zh: 'TCL中国剧院', ja: 'TCLチャイニーズ・シアター', es: 'Teatro Chino TCL' },
  'lacma urban light': { ko: 'LACMA 어반 라이트', fr: 'Urban Light du LACMA', zh: '洛杉矶郡艺术博物馆都市之光', ja: 'LACMAアーバン・ライト', es: 'Urban Light del LACMA' },
  'santa monica pier': { ko: '산타모니카 피어', fr: 'jetée de Santa Monica', zh: '圣莫尼卡码头', ja: 'サンタモニカ・ピア', es: 'muelle de Santa Mónica' },
  'venice beach boardwalk': { ko: '베니스 비치 보드워크', fr: 'promenade de Venice Beach', zh: '威尼斯海滩木板路', ja: 'ベニスビーチ・ボードウォーク', es: 'paseo de Venice Beach' },
  'getty villa': { ko: '게티 빌라', fr: 'villa Getty', zh: '盖蒂别墅', ja: 'ゲティ・ヴィラ', es: 'Villa Getty' },
  'the grove los angeles': { ko: '더 그로브 로스앤젤레스', fr: 'The Grove de Los Angeles', zh: '洛杉矶格罗夫购物中心', ja: 'ザ・グローブ・ロサンゼルス', es: 'The Grove de Los Ángeles' },
  'grand central market los angeles': { ko: '로스앤젤레스 그랜드 센트럴 마켓', fr: 'Grand Central Market de Los Angeles', zh: '洛杉矶中央大市场', ja: 'ロサンゼルス・グランドセントラルマーケット', es: 'Grand Central Market de Los Ángeles' },
  'abbot kinney boulevard': { ko: '애벗 키니 불러바드', fr: 'boulevard Abbot Kinney', zh: '阿博特金尼大道', ja: 'アボット・キニー・ブールバード', es: 'bulevar Abbot Kinney' },
  'warner bros studio tour hollywood': { ko: '워너 브라더스 스튜디오 투어 할리우드', fr: 'visite des studios Warner Bros Hollywood', zh: '华纳兄弟好莱坞影城之旅', ja: 'ワーナー・ブラザース・スタジオツアー・ハリウッド', es: 'tour de Warner Bros Studio Hollywood' },
  'space center houston & nasa': { ko: '스페이스 센터 휴스턴과 NASA', fr: 'centre spatial de Houston et NASA', zh: '休斯敦太空中心与NASA', ja: 'ヒューストン宇宙センターとNASA', es: 'Centro Espacial de Houston y NASA' },
  'space center houston': { ko: '스페이스 센터 휴스턴', fr: 'centre spatial de Houston', zh: '休斯敦太空中心', ja: 'ヒューストン宇宙センター', es: 'Centro Espacial de Houston' },
  'houston museum of natural science': { ko: '휴스턴 자연과학박물관', fr: 'musée des sciences naturelles de Houston', zh: '休斯敦自然科学博物馆', ja: 'ヒューストン自然科学博物館', es: 'Museo de Ciencias Naturales de Houston' },
  'museum of fine arts houston': { ko: '휴스턴 미술관', fr: 'musée des Beaux-Arts de Houston', zh: '休斯敦美术博物馆', ja: 'ヒューストン美術館', es: 'Museo de Bellas Artes de Houston' },
  'buffalo bayou park': { ko: '버펄로 바이유 공원', fr: 'parc Buffalo Bayou', zh: '布法罗河口公园', ja: 'バッファロー・バイユー公園', es: 'parque Buffalo Bayou' },
  'discovery green': { ko: '디스커버리 그린', fr: 'parc Discovery Green', zh: '探索绿地公园', ja: 'ディスカバリー・グリーン', es: 'parque Discovery Green' },
  'minute maid park': { ko: '미닛메이드 파크', fr: 'stade Minute Maid Park', zh: '美汁源球场', ja: 'ミニッツメイド・パーク', es: 'estadio Minute Maid Park' },
  'museum district & natural science museum': { ko: '뮤지엄 디스트릭트와 자연과학박물관', fr: 'quartier des musées et musée des sciences naturelles', zh: '博物馆区与自然科学博物馆', ja: 'ミュージアム地区と自然科学博物館', es: 'Distrito de Museos y Museo de Ciencias Naturales' },
  'kemah boardwalk': { ko: '케마 보드워크', fr: 'promenade de Kemah', zh: '凯马木板路', ja: 'ケマー・ボードウォーク', es: 'paseo marítimo de Kemah' },
  'buffalo bayou park & kayaking': { ko: '버펄로 바이유 공원과 카약', fr: 'parc Buffalo Bayou et kayak', zh: '布法罗河口公园与皮划艇', ja: 'バッファロー・バイユー公園とカヤック', es: 'parque Buffalo Bayou y kayak' },
  'sam houston national forest hiking': { ko: '샘 휴스턴 국유림 하이킹', fr: 'randonnée dans la forêt nationale Sam Houston', zh: '萨姆休斯敦国家森林徒步', ja: 'サム・ヒューストン国有林ハイキング', es: 'senderismo en el Bosque Nacional Sam Houston' },
  'galleria houston shopping mall': { ko: '갤러리아 휴스턴 쇼핑몰', fr: 'centre commercial Galleria Houston', zh: '休斯敦商业街购物中心', ja: 'ギャレリア・ヒューストン', es: 'centro comercial Galleria Houston' },
  'texas bbq & brisket experience': { ko: '텍사스 바비큐와 브리스킷 체험', fr: 'barbecue texan et brisket', zh: '德州烧烤与牛胸肉体验', ja: 'テキサスBBQとブリスケット体験', es: 'experiencia de barbacoa y brisket de Texas' },
  'houston tex-mex tacos & fajitas': { ko: '휴스턴 텍스멕스 타코와 파히타', fr: 'tacos et fajitas tex-mex de Houston', zh: '休斯敦德墨塔可与法士达', ja: 'ヒューストンのテクスメクス・タコスとファヒータ', es: 'tacos y fajitas tex-mex de Houston' },
  'bellagio fountain show': { ko: '벨라지오 분수 쇼', fr: 'spectacle des fontaines du Bellagio', zh: '百乐宫喷泉秀', ja: 'ベラージオ噴水ショー', es: 'espectáculo de fuentes del Bellagio' },
  'las vegas strip': { ko: '라스베이거스 스트립', fr: 'Strip de Las Vegas', zh: '拉斯维加斯大道', ja: 'ラスベガス・ストリップ', es: 'Strip de Las Vegas' },
  "gordon ramsay hell's kitchen": { ko: '고든 램지 헬스 키친', fr: "Hell's Kitchen de Gordon Ramsay", zh: '戈登·拉姆齐地狱厨房', ja: 'ゴードン・ラムゼイ・ヘルズキッチン', es: "Hell's Kitchen de Gordon Ramsay" },
  'the neon museum': { ko: '네온 박물관', fr: 'musée du Néon', zh: '霓虹博物馆', ja: 'ネオン博物館', es: 'Museo del Neón' },
  'grand canyon helicopter tour': { ko: '그랜드 캐니언 헬리콥터 투어', fr: 'survol du Grand Canyon en hélicoptère', zh: '大峡谷直升机之旅', ja: 'グランドキャニオン・ヘリコプターツアー', es: 'tour en helicóptero por el Gran Cañón' },
  'the forum shops at caesars': { ko: '시저스 팰리스 포럼 숍스', fr: 'Forum Shops du Caesars Palace', zh: '凯撒宫论坛商店街', ja: 'シーザーズ・パレスのフォーラムショップス', es: 'Forum Shops de Caesars Palace' },
  'fremont street experience': { ko: '프리몬트 스트리트 익스피리언스', fr: 'Fremont Street Experience', zh: '弗里蒙特街体验', ja: 'フリーモント・ストリート・エクスペリエンス', es: 'Experiencia de Fremont Street' },
  'the mob museum': { ko: '몹 뮤지엄', fr: 'musée de la Mafia', zh: '黑帮博物馆', ja: 'モブ・ミュージアム', es: 'Museo de la Mafia' },
  'sphere las vegas': { ko: '스피어 라스베이거스', fr: 'Sphere Las Vegas', zh: '拉斯维加斯巨型球', ja: 'スフィア・ラスベガス', es: 'Sphere Las Vegas' },
  'bellagio conservatory and botanical gardens': { ko: '벨라지오 온실과 식물원', fr: 'conservatoire et jardins botaniques du Bellagio', zh: '百乐宫温室与植物园', ja: 'ベラージオ温室・植物園', es: 'Conservatorio y Jardines Botánicos del Bellagio' },
  'red rock canyon scenic drive': { ko: '레드 록 캐니언 경관 드라이브', fr: 'route panoramique de Red Rock Canyon', zh: '红岩峡谷景观公路', ja: 'レッドロックキャニオン景観ドライブ', es: 'ruta panorámica de Red Rock Canyon' },
  'grand canal shoppes at the venetian': { ko: '베네시안 그랜드 캐널 숍스', fr: 'Grand Canal Shoppes du Venetian', zh: '威尼斯人大运河购物中心', ja: 'ベネチアン・グランドキャナル・ショップス', es: 'Grand Canal Shoppes del Venetian' },
  'linq promenade': { ko: '링크 프롬나드', fr: 'promenade LINQ', zh: 'LINQ步行街', ja: 'LINQプロムナード', es: 'paseo LINQ' },
  'high roller observation wheel': { ko: '하이 롤러 대관람차', fr: 'grande roue High Roller', zh: '豪客摩天轮', ja: 'ハイローラー観覧車', es: 'noria High Roller' },
  'area15 las vegas': { ko: '에어리어15 라스베이거스', fr: 'AREA15 Las Vegas', zh: '拉斯维加斯AREA15', ja: 'AREA15ラスベガス', es: 'AREA15 Las Vegas' }
};

const TARGET_COUNTRY_PLACE_TRANSLATIONS = {
  ko: [
    [/Oculus Westfield Mall/gi, '오큘러스 웨스트필드 몰'], [/Free Time & Rest before Meal/gi, '식사 전 자유 시간과 휴식'], [/Free Time & Rest in City/gi, '도심 자유 시간과 휴식'],
    [/Hyde Park Serpentine Lake Walk/gi, '하이드 파크 서펜타인 호수 산책'], [/Bondi to Bronte Coastal Walk/gi, '본다이-브론테 해안 산책'], [/Royal Botanic Garden Walk/gi, '왕립 식물원 산책'],
    [/Art Gallery of NSW Australian Art/gi, '뉴사우스웨일스 주립 미술관 호주 미술'], [/Queen Victoria Building Shopping/gi, '퀸 빅토리아 빌딩 쇼핑'], [/Blue Mountains Scenic World/gi, '블루마운틴 시닉 월드'],
    [/Sydney Cafe Dessert Break/gi, '시드니 카페 디저트 휴식'], [/Darling Harbour Jet Boat Spin/gi, '달링하버 제트보트 체험'], [/Wellington Cafe Dessert Break/gi, '웰링턴 카페 디저트 휴식'],
    [/Arrowtown/gi, '애로타운'], [/Skyline Gondola & Ledge Bungy/gi, '스카이라인 곤돌라와 레지 번지'], [/AJ Hackett Kawarau Gorge Bungy/gi, '에이제이 해킷 카와라우 협곡 번지'],
    [/Queenstown Central Shopping/gi, '퀸스타운 중심가 쇼핑'], [/The Remarkables Ski Area/gi, '리마커블스 스키장'], [/Queenstown Cafe Dessert Break/gi, '퀸스타운 카페 디저트 휴식'],
    [/Empire State Building/gi, '엠파이어 스테이트 빌딩'], [/Buckingham Palace/gi, '버킹엄 궁전'], [/Sydney Opera House/gi, '시드니 오페라 하우스'],
    [/Museum of New Zealand Te Papa Tongarewa/gi, '뉴질랜드 테파파 통가레와 국립박물관'], [/Skyline Queenstown Gondola/gi, '스카이라인 퀸스타운 곤돌라'],
    [/Changing of the Guard/gi, '근위병 교대식'], [/Houses of Parliament/gi, '영국 국회의사당'], [/The National Gallery London/gi, '런던 내셔널 갤러리'],
    [/Kensington Gardens/gi, '켄싱턴 가든'], [/Covent Garden/gi, '코번트 가든'], [/Soho Walk/gi, '소호 산책'], [/9\/11 Memorial/gi, '9·11 메모리얼'],
    [/Wellington Botanic Garden/gi, '웰링턴 식물원'], [/Mount Victoria Lookout/gi, '마운트 빅토리아 전망대'], [/Zealandia Ecosanctuary/gi, '질랜디아 생태보호구역'],
    [/Cuba Street Wellington/gi, '웰링턴 쿠바 스트리트'], [/Lake Wakatipu Cruise/gi, '와카티푸호 크루즈'], [/Kawarau Bridge Bungy/gi, '카와라우 다리 번지점프'],
    [/Queenstown Gardens/gi, '퀸스타운 가든'], [/Milford Sound Day Tour/gi, '밀퍼드 사운드 당일 투어']
  ],
  fr: [
    [/Oculus Westfield Mall/gi, 'centre commercial Oculus Westfield'], [/Free Time & Rest before Meal/gi, 'temps libre et repos avant le repas'], [/Free Time & Rest in City/gi, 'temps libre et repos en ville'],
    [/Hyde Park Serpentine Lake Walk/gi, 'promenade au lac Serpentine de Hyde Park'], [/Bondi to Bronte Coastal Walk/gi, 'promenade côtière de Bondi à Bronte'], [/Royal Botanic Garden Walk/gi, 'promenade au jardin botanique royal'],
    [/Art Gallery of NSW Australian Art/gi, 'art australien à la Galerie d’art de Nouvelle-Galles du Sud'], [/Queen Victoria Building Shopping/gi, 'shopping au Queen Victoria Building'], [/Blue Mountains Scenic World/gi, 'Scenic World des Montagnes Bleues'],
    [/Sydney Cafe Dessert Break/gi, 'pause café et dessert à Sydney'], [/Darling Harbour Jet Boat Spin/gi, 'tour en jet boat à Darling Harbour'], [/Wellington Cafe Dessert Break/gi, 'pause café et dessert à Wellington'],
    [/Arrowtown/gi, 'Arrowtown'], [/Skyline Gondola & Ledge Bungy/gi, 'télécabine Skyline et saut Ledge'], [/AJ Hackett Kawarau Gorge Bungy/gi, 'saut à l’élastique AJ Hackett dans les gorges de Kawarau'],
    [/Queenstown Central Shopping/gi, 'shopping dans le centre de Queenstown'], [/The Remarkables Ski Area/gi, 'domaine skiable The Remarkables'], [/Queenstown Cafe Dessert Break/gi, 'pause café et dessert à Queenstown'],
    [/Changing of the Guard/gi, 'relève de la garde'], [/Houses of Parliament/gi, 'Palais de Westminster'], [/The National Gallery London/gi, 'National Gallery de Londres'], [/Kensington Gardens/gi, 'jardins de Kensington'], [/Covent Garden/gi, 'Covent Garden'], [/Soho Walk/gi, 'promenade dans Soho'],
    [/9\/11 Memorial/gi, 'Mémorial du 11-Septembre'], [/Museum of New Zealand Te Papa Tongarewa/gi, 'musée de Nouvelle-Zélande Te Papa Tongarewa'], [/Wellington Botanic Garden/gi, 'jardin botanique de Wellington'], [/Mount Victoria Lookout/gi, 'belvédère du mont Victoria'], [/Zealandia Ecosanctuary/gi, 'sanctuaire écologique Zealandia'], [/Cuba Street Wellington/gi, 'rue Cuba à Wellington'],
    [/Skyline Queenstown Gondola/gi, 'télécabine Skyline de Queenstown'], [/Lake Wakatipu Cruise/gi, 'croisière sur le lac Wakatipu'], [/Kawarau Bridge Bungy/gi, 'saut à l’élastique du pont Kawarau'], [/Queenstown Gardens/gi, 'jardins de Queenstown'], [/Milford Sound Day Tour/gi, 'excursion d’une journée à Milford Sound']
  ],
  zh: [
    [/Oculus Westfield Mall/gi, '欧库鲁斯韦斯特菲尔德购物中心'], [/Free Time & Rest before Meal/gi, '用餐前的自由时间与休息'], [/Free Time & Rest in City/gi, '市区自由活动与休息'],
    [/Hyde Park Serpentine Lake Walk/gi, '海德公园蛇形湖漫步'], [/Bondi to Bronte Coastal Walk/gi, '邦迪至布朗特海岸步道'], [/Royal Botanic Garden Walk/gi, '皇家植物园漫步'],
    [/Art Gallery of NSW Australian Art/gi, '新南威尔士州美术馆澳大利亚艺术展'], [/Queen Victoria Building Shopping/gi, '维多利亚女王大厦购物'], [/Blue Mountains Scenic World/gi, '蓝山景观世界'],
    [/Sydney Cafe Dessert Break/gi, '悉尼咖啡甜点休息'], [/Darling Harbour Jet Boat Spin/gi, '达令港喷射快艇体验'], [/Wellington Cafe Dessert Break/gi, '惠灵顿咖啡甜点休息'],
    [/Arrowtown/gi, '箭镇'], [/Skyline Gondola & Ledge Bungy/gi, '天空缆车与悬崖蹦极'], [/AJ Hackett Kawarau Gorge Bungy/gi, '哈克特卡瓦劳峡谷蹦极'],
    [/Queenstown Central Shopping/gi, '皇后镇中心购物'], [/The Remarkables Ski Area/gi, '卓越山滑雪场'], [/Queenstown Cafe Dessert Break/gi, '皇后镇咖啡甜点休息'],
    [/Changing of the Guard/gi, '卫兵换岗仪式'], [/Houses of Parliament/gi, '英国议会大厦'], [/The National Gallery London/gi, '伦敦国家美术馆'], [/Kensington Gardens/gi, '肯辛顿花园'], [/Covent Garden/gi, '科文特花园'], [/Soho Walk/gi, '苏豪区漫步'],
    [/9\/11 Memorial/gi, '九一一国家纪念博物馆'], [/Museum of New Zealand Te Papa Tongarewa/gi, '新西兰蒂帕帕国家博物馆'], [/Wellington Botanic Garden/gi, '惠灵顿植物园'], [/Mount Victoria Lookout/gi, '维多利亚山观景台'], [/Zealandia Ecosanctuary/gi, '西兰蒂亚生态保护区'], [/Cuba Street Wellington/gi, '惠灵顿古巴街'],
    [/Skyline Queenstown Gondola/gi, '皇后镇天空缆车'], [/Lake Wakatipu Cruise/gi, '瓦卡蒂普湖游船'], [/Kawarau Bridge Bungy/gi, '卡瓦劳大桥蹦极'], [/Queenstown Gardens/gi, '皇后镇花园'], [/Milford Sound Day Tour/gi, '米尔福德峡湾一日游']
  ],
  ja: [
    [/Oculus Westfield Mall/gi, 'オキュラス・ウェストフィールド・モール'], [/Free Time & Rest before Meal/gi, '食事前の自由時間と休憩'], [/Free Time & Rest in City/gi, '市内での自由時間と休憩'],
    [/Hyde Park Serpentine Lake Walk/gi, 'ハイドパークのサーペンタイン湖散策'], [/Bondi to Bronte Coastal Walk/gi, 'ボンダイからブロンテまでの海岸散策'], [/Royal Botanic Garden Walk/gi, '王立植物園散策'],
    [/Art Gallery of NSW Australian Art/gi, 'ニューサウスウェールズ州立美術館のオーストラリア美術'], [/Queen Victoria Building Shopping/gi, 'クイーン・ビクトリア・ビルディングでのショッピング'], [/Blue Mountains Scenic World/gi, 'ブルーマウンテンズ・シーニックワールド'],
    [/Sydney Cafe Dessert Break/gi, 'シドニーのカフェとデザート休憩'], [/Darling Harbour Jet Boat Spin/gi, 'ダーリングハーバーのジェットボート体験'], [/Wellington Cafe Dessert Break/gi, 'ウェリントンのカフェとデザート休憩'],
    [/Arrowtown/gi, 'アロータウン'], [/Skyline Gondola & Ledge Bungy/gi, 'スカイライン・ゴンドラとレッジ・バンジー'], [/AJ Hackett Kawarau Gorge Bungy/gi, 'AJハケット・カワラウ渓谷バンジー'],
    [/Queenstown Central Shopping/gi, 'クイーンズタウン中心部でのショッピング'], [/The Remarkables Ski Area/gi, 'リマーカブルズ・スキー場'], [/Queenstown Cafe Dessert Break/gi, 'クイーンズタウンのカフェとデザート休憩'],
    [/Changing of the Guard/gi, '衛兵交代式'], [/Houses of Parliament/gi, '英国国会議事堂'], [/The National Gallery London/gi, 'ロンドン・ナショナル・ギャラリー'], [/Kensington Gardens/gi, 'ケンジントン・ガーデンズ'], [/Covent Garden/gi, 'コヴェント・ガーデン'], [/Soho Walk/gi, 'ソーホー散策'],
    [/9\/11 Memorial/gi, '9.11メモリアル'], [/Museum of New Zealand Te Papa Tongarewa/gi, 'ニュージーランド国立博物館テ・パパ・トンガレワ'], [/Wellington Botanic Garden/gi, 'ウェリントン植物園'], [/Mount Victoria Lookout/gi, 'マウント・ビクトリア展望台'], [/Zealandia Ecosanctuary/gi, 'ジーランディア自然保護区'], [/Cuba Street Wellington/gi, 'ウェリントンのキューバ・ストリート'],
    [/Skyline Queenstown Gondola/gi, 'スカイライン・クイーンズタウン・ゴンドラ'], [/Lake Wakatipu Cruise/gi, 'ワカティプ湖クルーズ'], [/Kawarau Bridge Bungy/gi, 'カワラウ橋バンジー'], [/Queenstown Gardens/gi, 'クイーンズタウン・ガーデンズ'], [/Milford Sound Day Tour/gi, 'ミルフォード・サウンド日帰りツアー']
  ],
  es: [
    [/Oculus Westfield Mall/gi, 'centro comercial Oculus Westfield'], [/Free Time & Rest before Meal/gi, 'tiempo libre y descanso antes de comer'], [/Free Time & Rest in City/gi, 'tiempo libre y descanso en la ciudad'],
    [/Hyde Park Serpentine Lake Walk/gi, 'paseo por el lago Serpentine de Hyde Park'], [/Bondi to Bronte Coastal Walk/gi, 'paseo costero de Bondi a Bronte'], [/Royal Botanic Garden Walk/gi, 'paseo por el Real Jardín Botánico'],
    [/Art Gallery of NSW Australian Art/gi, 'arte australiano en la Galería de Arte de Nueva Gales del Sur'], [/Queen Victoria Building Shopping/gi, 'compras en el edificio Queen Victoria'], [/Blue Mountains Scenic World/gi, 'Scenic World de las Montañas Azules'],
    [/Sydney Cafe Dessert Break/gi, 'pausa de café y postre en Sídney'], [/Darling Harbour Jet Boat Spin/gi, 'paseo en lancha rápida por Darling Harbour'], [/Wellington Cafe Dessert Break/gi, 'pausa de café y postre en Wellington'],
    [/Arrowtown/gi, 'Arrowtown'], [/Skyline Gondola & Ledge Bungy/gi, 'teleférico Skyline y salto Ledge'], [/AJ Hackett Kawarau Gorge Bungy/gi, 'puenting AJ Hackett en la garganta de Kawarau'],
    [/Queenstown Central Shopping/gi, 'compras en el centro de Queenstown'], [/The Remarkables Ski Area/gi, 'estación de esquí The Remarkables'], [/Queenstown Cafe Dessert Break/gi, 'pausa de café y postre en Queenstown'],
    [/Changing of the Guard/gi, 'cambio de guardia'], [/Houses of Parliament/gi, 'Palacio de Westminster'], [/The National Gallery London/gi, 'Galería Nacional de Londres'], [/Kensington Gardens/gi, 'jardines de Kensington'], [/Covent Garden/gi, 'Covent Garden'], [/Soho Walk/gi, 'paseo por Soho'],
    [/9\/11 Memorial/gi, 'Memorial del 11-S'], [/Museum of New Zealand Te Papa Tongarewa/gi, 'Museo de Nueva Zelanda Te Papa Tongarewa'], [/Wellington Botanic Garden/gi, 'Jardín Botánico de Wellington'], [/Mount Victoria Lookout/gi, 'mirador del monte Victoria'], [/Zealandia Ecosanctuary/gi, 'santuario ecológico Zealandia'], [/Cuba Street Wellington/gi, 'calle Cuba de Wellington'],
    [/Skyline Queenstown Gondola/gi, 'teleférico Skyline de Queenstown'], [/Lake Wakatipu Cruise/gi, 'crucero por el lago Wakatipu'], [/Kawarau Bridge Bungy/gi, 'puenting del puente Kawarau'], [/Queenstown Gardens/gi, 'jardines de Queenstown'], [/Milford Sound Day Tour/gi, 'excursión de un día a Milford Sound']
  ]
};
Object.entries(ENGLISH_CITY_PLACE_TRANSLATIONS).forEach(([lang, rules]) => {
  if (!PLACE_TERM_TRANSLATIONS[lang]) PLACE_TERM_TRANSLATIONS[lang] = [];
  PLACE_TERM_TRANSLATIONS[lang].unshift(...rules);
});

Object.entries(TARGET_COUNTRY_PLACE_TRANSLATIONS).forEach(([lang, rules]) => {
  if (!PLACE_TERM_TRANSLATIONS[lang]) PLACE_TERM_TRANSLATIONS[lang] = [];
  PLACE_TERM_TRANSLATIONS[lang].unshift(...rules);
});

const PROFILE_LANGUAGE_LABELS = {
  ko: { ko: '한국어', en: '영어', fr: '프랑스어', zh: '중국어', ja: '일본어', es: '스페인어', de: '독일어', it: '이탈리아어', ar: '아랍어' },
  en: { ko: 'Korean', en: 'English', fr: 'French', zh: 'Chinese', ja: 'Japanese', es: 'Spanish', de: 'German', it: 'Italian', ar: 'Arabic' },
  fr: { ko: 'coréen', en: 'anglais', fr: 'français', zh: 'chinois', ja: 'japonais', es: 'espagnol', de: 'allemand', it: 'italien', ar: 'arabe' },
  zh: { ko: '韩语', en: '英语', fr: '法语', zh: '中文', ja: '日语', es: '西班牙语', de: '德语', it: '意大利语', ar: '阿拉伯语' },
  ja: { ko: '韓国語', en: '英語', fr: 'フランス語', zh: '中国語', ja: '日本語', es: 'スペイン語', de: 'ドイツ語', it: 'イタリア語', ar: 'アラビア語' },
  es: { ko: 'coreano', en: 'inglés', fr: 'francés', zh: 'chino', ja: 'japonés', es: 'español', de: 'alemán', it: 'italiano', ar: 'árabe' }
};

const PROFILE_LANGUAGE_CODE_ALIASES = {
  ko: ['ko', 'korean', '한국어', 'coreano', 'coréen', '韩语', '韓国語'],
  en: ['en', 'english', '영어', 'anglais', '英语', '英語', 'inglés'],
  fr: ['fr', 'french', 'français', 'francais', '프랑스어', '法语', 'フランス語', 'francés'],
  zh: ['zh', 'chinese', '中文', '중국어', 'chinois', '中国語', 'chino'],
  ja: ['ja', 'japanese', '日本語', '일본어', 'japonais', '日语', 'japonés'],
  es: ['es', 'spanish', 'español', 'espanol', '스페인어', 'espagnol', '西班牙语', 'スペイン語'],
  de: ['de', 'german', 'deutsch', '독일어', 'allemand', '德语', 'ドイツ語', 'alemán'],
  it: ['it', 'italian', 'italiano', '이탈리아어', 'italien', '意大利语', 'イタリア語'],
  ar: ['ar', 'arabic', 'العربية', '아랍어', 'arabe', '阿拉伯语', 'アラビア語']
};

function getLocalizedCountryName(cityOrCountry, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  const rawCountry = typeof cityOrCountry === 'string'
    ? cityOrCountry
    : (cityOrCountry && (cityOrCountry.country_en || cityOrCountry.country || cityOrCountry.country_ko)) || '';
  const repaired = repairMojibakeText(String(rawCountry || '')).trim();
  const code = COUNTRY_CODE_BY_EN[repaired] || COUNTRY_CODE_BY_EN[repairMojibakeText(String((cityOrCountry && cityOrCountry.country_en) || ''))];
  if (code) {
    try {
      const display = new Intl.DisplayNames([getLanguageLocale(codeLang)], { type: 'region' });
      const localized = display.of(code);
      if (localized) return localized;
    } catch (err) {}
  }
  if (codeLang === 'ko' && cityOrCountry && cityOrCountry.country_ko) return cleanUiText(cityOrCountry.country_ko);
  return cleanUiText(repaired);
}

function getLocalizedCityField(city, field = 'name', lang = state.lang) {
  if (!city) return '';
  const codeLang = normalizeLanguageCode(lang);
  if (field === 'country') return getLocalizedCountryName(city, codeLang);
  if (field === 'desc') {
    const direct = city[`desc_${codeLang}`];
    if (direct) return cleanUiText(direct);
    const baseDesc = codeLang === 'ko' ? city.desc_ko : codeLang === 'en' ? city.desc_en : '';
    if (baseDesc) return cleanUiText(baseDesc);
    const cityName = getLocalizedCityField(city, 'name', codeLang);
    const countryName = getLocalizedCountryName(city, codeLang);
    return cleanUiText((CITY_DESCRIPTION_TEMPLATES[codeLang] || CITY_DESCRIPTION_TEMPLATES.en)(cityName, countryName));
  }
  const direct = city[`${field}_${codeLang}`];
  if (direct) return cleanUiText(direct);
  if (field === 'name' && CITY_LOCALIZED_NAMES[city.id] && CITY_LOCALIZED_NAMES[city.id][codeLang]) {
    return cleanUiText(CITY_LOCALIZED_NAMES[city.id][codeLang]);
  }
  if (codeLang === 'ko') return cleanUiText(city.name_ko || city.name || city.name_en || city.id);
  return cleanUiText(city.name_en || city.name || city.name_ko || city.id);
}

function localizePlaceName(value, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  let text = cleanUiText(value || '');
  if (!text) return '';
  const exactKey = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const curated = CURATED_PLACE_NAME_TRANSLATIONS[exactKey];
  if (curated && curated[codeLang]) return cleanUiText(curated[codeLang]);
  if (codeLang === 'en') return text;
  (PLACE_TERM_TRANSLATIONS[codeLang] || []).forEach(([pattern, replacement]) => {
    text = text.replace(pattern, cleanUiText(replacement));
  });
  Object.entries(CITY_LOCALIZED_NAMES).forEach(([cityId, names]) => {
    const city = (typeof CITIES !== 'undefined' && Array.isArray(CITIES))
      ? CITIES.find(c => c && c.id === cityId)
      : null;
    const enName = city && city.name_en ? city.name_en : '';
    if (enName && names[codeLang]) {
      text = text.replace(new RegExp(`\\b${escapeRegExpLiteral(enName)}\\b`, 'gi'), cleanUiText(names[codeLang]));
    }
  });
  if (codeLang === 'ko' && /[A-Za-z]{3}/.test(text)) {
    text = translateKnownPlaceNameToKorean(text) || text;
  }
  return cleanUiText(text);
}

function getLocalizedDataField(item, base, lang = state.lang, options = {}) {
  if (!item) return '';
  const codeLang = normalizeLanguageCode(lang);
  const direct = item[`${base}_${codeLang}`];
  if (direct) return cleanUiText(direct);

  const fallbackOrder = codeLang === 'ko'
    ? [`${base}_ko`, `${base}_en`, base]
    : codeLang === 'en'
      ? [`${base}_en`, base, `${base}_ko`]
      : [`${base}_en`, base, `${base}_ko`];

  let value = '';
  for (const key of fallbackOrder) {
    if (item[key]) {
      value = cleanUiText(item[key]);
      break;
    }
  }

  if (base === 'name') {
    if (codeLang === 'ko' && value && !/[\uAC00-\uD7A3]/.test(value) && /[A-Za-z]/.test(value)) {
      return translateKnownPlaceNameToKorean(value) || value;
    }
    return localizePlaceName(value, codeLang);
  }

  if (base === 'desc') {
    if (codeLang === 'ko') {
      if (value && !/[\uAC00-\uD7A3]/.test(value) && /[A-Za-z]/.test(value)) {
        return buildLocalizedItemDescription(item, codeLang);
      }
      return value;
    }
    if (codeLang === 'en') {
      if (value && /[\uAC00-\uD7A3]/.test(value) && !/[A-Za-z]/.test(value)) return '';
      return value;
    }
    if (options.description === false) return localizePlaceName(value, codeLang);
    return buildLocalizedItemDescription(item, codeLang);
  }

  return localizePlaceName(value, codeLang);
}

function buildLocalizedItemDescription(item, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  const labels = DATA_LABELS[codeLang] || DATA_LABELS.en;
  const name = getLocalizedDataField(item, 'name', codeLang, { description: false }) || '';
  if (isMealBreakItem(item)) return cleanUiText(labels.mealDesc);
  if (item.isTransit) return cleanUiText(name || labels.transit);
  if (item.isLodging) return cleanUiText(item.isEnd ? labels.lodgingEnd : labels.lodgingStart);
  if (item.isAllDayTrip || isNearbyDayTripItem(item)) return cleanUiText(`${labels.fullDay} · ${name || labels.dayTrip}`);
  return name ? cleanUiText(labels.routeDesc(name)) : '';
}

function getLanguageCodeFromValue(value) {
  const normalized = repairMojibakeText(String(value || '')).trim().toLowerCase();
  if (!normalized) return '';
  for (const [code, aliases] of Object.entries(PROFILE_LANGUAGE_CODE_ALIASES)) {
    if (aliases.some(alias => normalized === String(alias).toLowerCase())) return code;
  }
  return '';
}

function localizeProfileLanguageList(value, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  const labels = PROFILE_LANGUAGE_LABELS[codeLang] || PROFILE_LANGUAGE_LABELS.en;
  const parts = String(value || '')
    .split(',')
    .map(v => repairMojibakeText(v).trim())
    .filter(Boolean);
  if (!parts.length) return '';
  return parts.map(part => {
    const code = getLanguageCodeFromValue(part);
    return code && labels[code] ? cleanUiText(labels[code]) : cleanUiText(part);
  }).join(', ');
}

function localizeLanguageChoiceChips(lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  const labels = PROFILE_LANGUAGE_LABELS[codeLang] || PROFILE_LANGUAGE_LABELS.en;
  ['profileLanguages', 'modalRoomLanguage'].forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('label.multi-select-chip').forEach(label => {
      const input = label.querySelector('input');
      const text = label.querySelector('span');
      if (!input || !text) return;
      const languageCode = getLanguageCodeFromValue(input.value);
      if (languageCode && labels[languageCode]) text.textContent = cleanUiText(labels[languageCode]);
    });
  });
}

function updateProfileLanguageControlLabels(lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  const labels = PROFILE_LANGUAGE_LABELS[codeLang] || PROFILE_LANGUAGE_LABELS.en;
  document.querySelectorAll('#profileLanguages .multi-select-chip').forEach(chip => {
    const input = chip.querySelector('input');
    const label = chip.querySelector('span');
    if (!input || !label) return;
    const code = getLanguageCodeFromValue(input.value);
    if (code && labels[code]) label.textContent = cleanUiText(labels[code]);
  });
}

const LODGING_LABEL_TRANSLATIONS = {
  ko: [
    [/\(Center\)/gi, '(중심부)'], [/\(South\)/gi, '(남부)'], [/\(North\)/gi, '(북부)'],
    [/\(Southeast\)/gi, '(동남부)'], [/\(Northeast\)/gi, '(북동부)']
  ],
  fr: [
    [/Midtown/gi, 'centre de Manhattan'], [/Lower Manhattan/gi, 'sud de Manhattan'], [/Times Square/gi, 'Times Square'],
    [/Soho/gi, 'SoHo'], [/Central Park/gi, 'Central Park'], [/Brooklyn Bridge/gi, 'pont de Brooklyn'],
    [/DUMBO/gi, 'DUMBO'], [/Queens/gi, 'Queens'], [/Astoria/gi, 'Astoria'],
    [/\(Center\)/gi, '(centre)'], [/\(South\)/gi, '(sud)'], [/\(North\)/gi, '(nord)'],
    [/\(Southeast\)/gi, '(sud-est)'], [/\(Northeast\)/gi, '(nord-est)']
  ],
  es: [
    [/Midtown/gi, 'centro de Manhattan'], [/Lower Manhattan/gi, 'Bajo Manhattan'], [/Times Square/gi, 'Times Square'],
    [/Soho/gi, 'SoHo'], [/Central Park/gi, 'Central Park'], [/Brooklyn Bridge/gi, 'puente de Brooklyn'],
    [/DUMBO/gi, 'DUMBO'], [/Queens/gi, 'Queens'], [/Astoria/gi, 'Astoria'],
    [/\(Center\)/gi, '(centro)'], [/\(South\)/gi, '(sur)'], [/\(North\)/gi, '(norte)'],
    [/\(Southeast\)/gi, '(sureste)'], [/\(Northeast\)/gi, '(noreste)']
  ],
  ja: [
    [/Midtown/gi, 'マンハッタン中心部'], [/Lower Manhattan/gi, 'ロウアー・マンハッタン'], [/Times Square/gi, 'タイムズスクエア'],
    [/Soho/gi, 'ソーホー'], [/Central Park/gi, 'セントラルパーク'], [/Brooklyn Bridge/gi, 'ブルックリン橋'],
    [/DUMBO/gi, 'ダンボ地区'], [/Queens/gi, 'クイーンズ'], [/Astoria/gi, 'アストリア'],
    [/\(Center\)/gi, '(中心部)'], [/\(South\)/gi, '(南部)'], [/\(North\)/gi, '(北部)'],
    [/\(Southeast\)/gi, '(南東部)'], [/\(Northeast\)/gi, '(北東部)']
  ],
  zh: [
    [/Midtown/gi, '曼哈顿中城'], [/Lower Manhattan/gi, '曼哈顿下城'], [/Times Square/gi, '时代广场'],
    [/Soho/gi, '苏豪区'], [/Central Park/gi, '中央公园'], [/Brooklyn Bridge/gi, '布鲁克林大桥'],
    [/DUMBO/gi, '丹波区'], [/Queens/gi, '皇后区'], [/Astoria/gi, '阿斯托里亚'],
    [/\(Center\)/gi, '(中心区)'], [/\(South\)/gi, '(南部)'], [/\(North\)/gi, '(北部)'],
    [/\(Southeast\)/gi, '(东南部)'], [/\(Northeast\)/gi, '(东北部)']
  ]
};

function getLocalizedLodgingLabel(nameKo, nameEn, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  let value = cleanUiText(codeLang === 'ko' ? (nameKo || nameEn) : (nameEn || nameKo));
  if (codeLang !== 'ko' && codeLang !== 'en') value = localizePlaceName(value, codeLang);
  (LODGING_LABEL_TRANSLATIONS[codeLang] || []).forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });
  return cleanUiText(value);
}

function getDataLabel(key, lang = state.lang) {
  const labels = DATA_LABELS[normalizeLanguageCode(lang)] || DATA_LABELS.en;
  return cleanUiText(labels[key] || DATA_LABELS.en[key] || key);
}

function getInlineText(values, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  if (!values || typeof values !== 'object') return '';
  return cleanUiText(values[codeLang] || values.en || values.ko || '');
}

function localizeLeafletMapControls(map) {
  if (!map || typeof map.getContainer !== 'function') return;
  const container = map.getContainer();
  if (!container) return;
  const zoomInLabel = getInlineText({ ko: '확대', en: 'Zoom in', fr: 'Zoom avant', zh: '放大', ja: '拡大', es: 'Acercar' });
  const zoomOutLabel = getInlineText({ ko: '축소', en: 'Zoom out', fr: 'Zoom arrière', zh: '缩小', ja: '縮小', es: 'Alejar' });
  const zoomIn = container.querySelector('.leaflet-control-zoom-in');
  const zoomOut = container.querySelector('.leaflet-control-zoom-out');
  if (zoomIn) {
    zoomIn.title = zoomInLabel;
    zoomIn.setAttribute('aria-label', zoomInLabel);
  }
  if (zoomOut) {
    zoomOut.title = zoomOutLabel;
    zoomOut.setAttribute('aria-label', zoomOutLabel);
  }
}

function formatInlineText(values, replacements = {}, lang = state.lang) {
  let text = getInlineText(values, lang);
  Object.entries(replacements).forEach(([key, value]) => {
    text = text.replaceAll(`{${key}}`, cleanUiText(value));
  });
  return cleanUiText(text);
}

function getRoomSystemMessage(kind, values = {}) {
  const messages = {
    welcome: {
      ko: "[안내] '{name}'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.",
      en: "[System] Room created by '{name}'. Please be respectful in chat.",
      fr: "[Système] Salon créé par « {name} ». Merci de rester respectueux.",
      zh: "[系统] 该同行房由“{name}”创建，请文明交流。",
      ja: "[システム] 「{name}」さんが作成した同行ルームです。マナーを守って会話してください。",
      es: "[Sistema] Sala creada por « {name} ». Mantén una conversación respetuosa."
    },
    joined: {
      ko: "{name}님이 동행방에 입장하셨습니다.", en: "{name} joined the companion room.", fr: "{name} a rejoint le salon.", zh: "{name}已加入同行房。", ja: "{name}さんが同行ルームに参加しました。", es: "{name} se unió a la sala."
    },
    left: {
      ko: "[안내] '{name}'님이 퇴장하셨습니다.", en: "[System] '{name}' left the room.", fr: "[Système] « {name} » a quitté le salon.", zh: "[系统]“{name}”已退出房间。", ja: "[システム] 「{name}」さんが退出しました。", es: "[Sistema] « {name} » salió de la sala."
    },
    kicked: {
      ko: "[안내] '{name}'님이 방장에 의해 퇴장되었습니다.", en: "[System] '{name}' was removed by the room creator.", fr: "[Système] « {name} » a été exclu par le créateur.", zh: "[系统]“{name}”已被房主移出。", ja: "[システム] 「{name}」さんが作成者によって退出されました。", es: "[Sistema] El creador retiró a « {name} » de la sala."
    },
    sharedCourse: {
      ko: "[일정 공유] {name}님이 만든 {city} {days}일 코스", en: "[Shared Course] {name}'s {days}-day course for {city}", fr: "[Itinéraire partagé] Parcours de {days} jours à {city}, créé par {name}", zh: "[分享行程] {name}创建的{city}{days}日路线", ja: "[旅程共有] {name}さんが作成した{city}の{days}日コース", es: "[Ruta compartida] Ruta de {days} días por {city}, creada por {name}"
    }
  };
  return formatInlineText(messages[kind] || {}, values);
}

function formatDayLabel(dayNumber, lang = state.lang) {
  const n = parseInt(dayNumber, 10) || dayNumber;
  const codeLang = normalizeLanguageCode(lang);
  if (codeLang === 'ko') return `${n}일차`;
  if (codeLang === 'fr') return `Jour ${n}`;
  if (codeLang === 'zh') return `第${n}天`;
  if (codeLang === 'ja') return `${n}日目`;
  if (codeLang === 'es') return `Día ${n}`;
  return `Day ${n}`;
}

function getCityDisplaySortName(city, lang = state.lang) {
  if (!city) return '';
  const raw = getLocalizedCityField(city, 'name', lang);
  return repairMojibakeText(String(raw || '')).trim();
}

function getSortedSupportedDestinationCities(lang = state.lang) {
  const locale = getLanguageLocale(lang);
  const collator = new Intl.Collator(locale, { sensitivity: 'base', numeric: true });
  return getSupportedDestinationCities().slice().sort((a, b) => {
    const primary = collator.compare(getCityDisplaySortName(a, lang), getCityDisplaySortName(b, lang));
    if (primary !== 0) return primary;
    return String(a.id || '').localeCompare(String(b.id || ''));
  });
}

// --- Optional remote sync ---
// The former MockBolt host no longer resolves. Keep remote sync opt-in so a
// failed third-party endpoint cannot block room creation or spam the console.
const REMOTE_SYNC_CONFIG = (typeof window !== 'undefined' && window.WANDERSYNC_REMOTE_SYNC) || {};
const REMOTE_GET_URL = String(REMOTE_SYNC_CONFIG.getUrl || '');
const REMOTE_PUT_URL = String(REMOTE_SYNC_CONFIG.putUrl || '');
const REMOTE_SYNC_ENABLED = Boolean(
  REMOTE_GET_URL && REMOTE_PUT_URL
);
const REMOTE_SYNC_TIMEOUT_MS = 8000;
let remotePushQueue = Promise.resolve();

const WINDOWS_1252_BYTE_OVERRIDES = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
  0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
  0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
  0x017E: 0x9E, 0x0178: 0x9F
};

function getWindows1252Byte(char) {
  const code = char.charCodeAt(0);
  if (code <= 0xFF) return code;
  return WINDOWS_1252_BYTE_OVERRIDES[code] ?? null;
}

function hasMojibakeSignal(text) {
  return /[ÃÂâðìíëê�]/.test(text || '');
}

function scoreReadableText(text) {
  const broken = (text.match(/[ÃÂâð�]/g) || []).length +
    (text.match(/[ìíëê][\u0080-\u00ff]/g) || []).length * 3;
  const hangul = (text.match(/[\uAC00-\uD7A3]/g) || []).length;
  const emoji = (text.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length;
  const replacement = (text.match(/\uFFFD/g) || []).length;
  return hangul * 5 + emoji * 2 - broken * 5 - replacement * 50;
}

function decodeWindows1252Utf8Once(text) {
  if (!text || typeof TextDecoder === 'undefined') return null;
  const bytes = [];
  for (const char of text) {
    const byte = getWindows1252Byte(char);
    if (byte === null) return null;
    bytes.push(byte);
  }
  try {
    return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(bytes));
  } catch (err) {
    return null;
  }
}

function repairMojibakeSegment(segment) {
  if (!segment || !hasMojibakeSignal(segment)) return segment;
  let best = segment;
  let bestScore = scoreReadableText(segment);
  let current = segment;
  for (let i = 0; i < 4; i++) {
    const decoded = decodeWindows1252Utf8Once(current);
    if (!decoded || decoded === current) break;
    const decodedScore = scoreReadableText(decoded);
    if (decodedScore > bestScore) {
      best = decoded;
      bestScore = decodedScore;
    }
    current = decoded;
  }
  return best;
}

function repairMojibakeText(value) {
  if (typeof value !== 'string' || !value || !hasMojibakeSignal(value)) return value;
  const repairToken = (token) => {
    if (!token || !hasMojibakeSignal(token)) return token;
    let tokenOutput = '';
    let byteRun = '';
    const flush = () => {
      if (!byteRun) return;
      tokenOutput += repairMojibakeSegment(byteRun);
      byteRun = '';
    };
    for (const char of token) {
      if (getWindows1252Byte(char) !== null) {
        byteRun += char;
      } else {
        flush();
        tokenOutput += char;
      }
    }
    flush();
    return tokenOutput;
  };
  return value.split(/([ \t\r\n\f\v]+)/).map(part => /^[ \t\r\n\f\v]+$/.test(part) ? part : repairToken(part)).join('');
}

function sanitizeNativeDialogText(value, dialogType = 'alert') {
  let fixed = localizeRuntimeText(repairCommonMojibakeLiterals(repairMojibakeText(String(value ?? ''))));
  if (!hasMojibakeSignal(fixed)) return fixed;

  const raw = String(value ?? '').toLowerCase();
  const lang = (typeof state !== 'undefined' && state.lang) || 'ko';
  const genericConfirm = {
    ko: '정말 진행하시겠습니까?',
    en: 'Please confirm.',
    fr: 'Veuillez confirmer.',
    zh: '请确认。',
    ja: '確認してください。',
    es: 'Confirma la acción.'
  };
  if (dialogType === 'confirm') {
    if (lang === 'ko' && /delete|remove|ì‚|ì œ|ë™|trip|room/.test(raw)) return '정말 삭제하시겠습니까?';
    return genericConfirm[normalizeLanguageCode(lang)] || genericConfirm.en;
  }
  if (lang !== 'ko') return fixed.replace(/[ÃÂâðìíëê�]+/g, '').trim() || (genericConfirm[normalizeLanguageCode(lang)] || genericConfirm.en);

  if (dialogType === 'prompt') {
    if (/link|share|ë§|ê³µ|ì•„/.test(raw)) return '\uC544\uB798 \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD558\uC5EC \uACF5\uC720\uD558\uC138\uC694:';
    if (/trip|itinerary|name|ì—|ì´|ìž…/.test(raw)) return '\uC5EC\uD589 \uC77C\uC815\uC758 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694:';
    return '\uC785\uB825\uD574\uC8FC\uC138\uC694:';
  }

  if (/delete|remove|ì‚|ì œ|ë™|trip|room/.test(raw)) return '\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?';
  return '\uD655\uC778\uD574 \uC8FC\uC138\uC694.';
}

function installNativeDialogSanitizers() {
  if (typeof window === 'undefined' || window.__wanderNativeDialogsSanitized) return;
  window.__wanderNativeDialogsSanitized = true;

  const nativeAlert = window.alert && window.alert.bind(window);
  const nativeConfirm = window.confirm && window.confirm.bind(window);
  const nativePrompt = window.prompt && window.prompt.bind(window);

  if (nativeAlert) {
    window.alert = function(message) {
      return nativeAlert(sanitizeNativeDialogText(message, 'alert'));
    };
  }
  if (nativeConfirm) {
    window.confirm = function(message) {
      return nativeConfirm(sanitizeNativeDialogText(message, 'confirm'));
    };
  }
  if (nativePrompt) {
    window.prompt = function(message, defaultValue) {
      return nativePrompt(
        sanitizeNativeDialogText(message, 'prompt'),
        typeof defaultValue === 'string' ? localizeRuntimeText(repairMojibakeText(defaultValue)) : defaultValue
      );
    };
  }
}

function repairVisibleMojibake(root = document.body) {
  if (!root || typeof document === 'undefined') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const fixed = localizeRuntimeText(repairCommonMojibakeLiterals(repairMojibakeText(node.nodeValue)));
    if (fixed !== node.nodeValue) node.nodeValue = fixed;
  });
  root.querySelectorAll && root.querySelectorAll('[placeholder], [title], [aria-label]').forEach(elem => {
    ['placeholder', 'title', 'aria-label'].forEach(attr => {
      const val = elem.getAttribute(attr);
      const fixed = localizeRuntimeText(repairCommonMojibakeLiterals(repairMojibakeText(val)));
      if (fixed && fixed !== val) elem.setAttribute(attr, fixed);
    });
  });
}

function installMojibakeRepairObserver() {
  if (window.__wanderMojibakeRepairInstalled || typeof MutationObserver === 'undefined') return;
  window.__wanderMojibakeRepairInstalled = true;
  let timer = null;
  const run = () => {
    timer = null;
    repairVisibleMojibake(document.body);
  };
  new MutationObserver(() => {
    if (timer) return;
    timer = setTimeout(run, 80);
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
  setTimeout(run, 0);
  setTimeout(run, 400);
  setTimeout(run, 1200);
}

function applyEnhancedTranslations() {
  if (typeof TRANSLATIONS === 'undefined') return;
  const feedbackLanguagePatches = {
    ko: {
      feedback_title: '\uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31',
      feedback_subtitle: '\uC5EC\uD589 \uACC4\uD68D \uC11C\uBE44\uC2A4\uB97C \uC0AC\uC6A9\uD558\uBA70 \uB290\uB080 \uC810\uC744 \uB0A8\uACA8\uC8FC\uC138\uC694. \uD53C\uB4DC\uBC31\uC740 \uC11C\uBE44\uC2A4 \uAC1C\uC120\uC5D0 \uBC18\uC601\uB429\uB2C8\uB2E4.',
      feedback_rating_label: '\uD3C9\uC810', feedback_name_label: '\uB2C9\uB124\uC784',
      feedback_name_placeholder: '\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD558\uC138\uC694',
      feedback_text_label: '\uD53C\uB4DC\uBC31 \uB0B4\uC6A9',
      feedback_text_placeholder: '\uC88B\uC558\uB358 \uC810\uC774\uB098 \uAC1C\uC120\uC774 \uD544\uC694\uD55C \uC810\uC744 \uC54C\uB824\uC8FC\uC138\uC694.',
      feedback_submit: '\uD53C\uB4DC\uBC31 \uBCF4\uB0B4\uAE30'
    },
    en: {
      feedback_title: 'User feedback', feedback_subtitle: 'Tell us about your experience planning a trip. Your feedback helps improve the service.',
      feedback_rating_label: 'Rating', feedback_name_label: 'Nickname', feedback_name_placeholder: 'Enter your nickname',
      feedback_text_label: 'Feedback', feedback_text_placeholder: 'Tell us what worked well or what needs improvement.', feedback_submit: 'Send feedback'
    },
    fr: {
      feedback_title: 'Avis des utilisateurs', feedback_subtitle: 'Partagez votre exp\u00E9rience de planification. Vos avis nous aident \u00E0 am\u00E9liorer le service.',
      feedback_rating_label: 'Note', feedback_name_label: 'Pseudonyme', feedback_name_placeholder: 'Saisissez votre pseudonyme',
      feedback_text_label: 'Avis', feedback_text_placeholder: 'Indiquez ce qui fonctionne bien ou ce qui doit \u00EAtre am\u00E9lior\u00E9.', feedback_submit: 'Envoyer'
    },
    zh: {
      feedback_title: '\u7528\u6237\u53CD\u9988', feedback_subtitle: '\u8BF7\u5206\u4EAB\u60A8\u7684\u65C5\u884C\u89C4\u5212\u4F53\u9A8C\u3002\u60A8\u7684\u53CD\u9988\u5C06\u5E2E\u52A9\u6211\u4EEC\u6539\u8FDB\u670D\u52A1\u3002',
      feedback_rating_label: '\u8BC4\u5206', feedback_name_label: '\u6635\u79F0', feedback_name_placeholder: '\u8BF7\u8F93\u5165\u6635\u79F0',
      feedback_text_label: '\u53CD\u9988\u5185\u5BB9', feedback_text_placeholder: '\u8BF7\u544A\u8BC9\u6211\u4EEC\u54EA\u4E9B\u505A\u5F97\u597D\uFF0C\u54EA\u4E9B\u9700\u8981\u6539\u8FDB\u3002', feedback_submit: '\u63D0\u4EA4\u53CD\u9988'
    },
    ja: {
      feedback_title: '\u30E6\u30FC\u30B6\u30FC\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF', feedback_subtitle: '\u65C5\u884C\u8A08\u753B\u306E\u4F7F\u7528\u4F53\u9A13\u3092\u304A\u805E\u304B\u305B\u304F\u3060\u3055\u3044\u3002\u30B5\u30FC\u30D3\u30B9\u6539\u5584\u306B\u6D3B\u7528\u3057\u307E\u3059\u3002',
      feedback_rating_label: '\u8A55\u4FA1', feedback_name_label: '\u30CB\u30C3\u30AF\u30CD\u30FC\u30E0', feedback_name_placeholder: '\u30CB\u30C3\u30AF\u30CD\u30FC\u30E0\u3092\u5165\u529B',
      feedback_text_label: '\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF', feedback_text_placeholder: '\u826F\u304B\u3063\u305F\u70B9\u3084\u6539\u5584\u304C\u5FC5\u8981\u306A\u70B9\u3092\u304A\u77E5\u3089\u305B\u304F\u3060\u3055\u3044\u3002', feedback_submit: '\u9001\u4FE1\u3059\u308B'
    },
    es: {
      feedback_title: 'Opiniones de usuarios', feedback_subtitle: 'Cu\u00E9ntanos tu experiencia al planificar el viaje. Tus comentarios nos ayudan a mejorar el servicio.',
      feedback_rating_label: 'Puntuaci\u00F3n', feedback_name_label: 'Apodo', feedback_name_placeholder: 'Escribe tu apodo',
      feedback_text_label: 'Comentario', feedback_text_placeholder: 'Cu\u00E9ntanos qu\u00E9 funciona bien o qu\u00E9 debemos mejorar.', feedback_submit: 'Enviar comentario'
    }
  };
  Object.entries(feedbackLanguagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });
  const feedbackActionLanguagePatches = {
    ko: { feedback_edit: '편집', feedback_delete: '삭제', feedback_save: '저장', feedback_cancel: '취소', feedback_delete_confirm: '이 피드백을 삭제할까요?', feedback_updated: '피드백을 수정했습니다.', feedback_deleted: '피드백을 삭제했습니다.', feedback_update_failed: '피드백 수정 내용을 저장하지 못했습니다.', feedback_delete_failed: '피드백을 삭제하지 못했습니다.', feedback_edited: '수정됨' },
    en: { feedback_edit: 'Edit', feedback_delete: 'Delete', feedback_save: 'Save', feedback_cancel: 'Cancel', feedback_delete_confirm: 'Delete this feedback?', feedback_updated: 'Feedback updated.', feedback_deleted: 'Feedback deleted.', feedback_update_failed: 'Could not save the feedback update.', feedback_delete_failed: 'Could not delete the feedback.', feedback_edited: 'Edited' },
    fr: { feedback_edit: 'Modifier', feedback_delete: 'Supprimer', feedback_save: 'Enregistrer', feedback_cancel: 'Annuler', feedback_delete_confirm: 'Supprimer cet avis ?', feedback_updated: 'Avis modifié.', feedback_deleted: 'Avis supprimé.', feedback_update_failed: "Impossible d'enregistrer la modification.", feedback_delete_failed: "Impossible de supprimer l'avis.", feedback_edited: 'Modifié' },
    zh: { feedback_edit: '编辑', feedback_delete: '删除', feedback_save: '保存', feedback_cancel: '取消', feedback_delete_confirm: '要删除这条反馈吗？', feedback_updated: '反馈已更新。', feedback_deleted: '反馈已删除。', feedback_update_failed: '无法保存反馈修改。', feedback_delete_failed: '无法删除反馈。', feedback_edited: '已编辑' },
    ja: { feedback_edit: '編集', feedback_delete: '削除', feedback_save: '保存', feedback_cancel: 'キャンセル', feedback_delete_confirm: 'このフィードバックを削除しますか？', feedback_updated: 'フィードバックを更新しました。', feedback_deleted: 'フィードバックを削除しました。', feedback_update_failed: '変更を保存できませんでした。', feedback_delete_failed: 'フィードバックを削除できませんでした。', feedback_edited: '編集済み' },
    es: { feedback_edit: 'Editar', feedback_delete: 'Eliminar', feedback_save: 'Guardar', feedback_cancel: 'Cancelar', feedback_delete_confirm: '¿Eliminar este comentario?', feedback_updated: 'Comentario actualizado.', feedback_deleted: 'Comentario eliminado.', feedback_update_failed: 'No se pudo guardar el cambio.', feedback_delete_failed: 'No se pudo eliminar el comentario.', feedback_edited: 'Editado' }
  };
  Object.entries(feedbackActionLanguagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });
  Object.keys(TRANSLATIONS).forEach(lang => {
    const table = TRANSLATIONS[lang];
    if (!table || typeof table !== 'object') return;
    Object.keys(table).forEach(key => {
      if (typeof table[key] === 'string') {
        table[key] = repairMojibakeText(table[key]);
      }
    });
  });
  const ko = TRANSLATIONS.ko || (TRANSLATIONS.ko = {});
  const en = TRANSLATIONS.en || (TRANSLATIONS.en = {});
  Object.assign(ko, {
    nav_dashboard: '\uD648',
    nav_planner: 'AI \uC77C\uC815 \uC0DD\uC131',
    nav_companions: '\uB3D9\uD589 \uB9E4\uCE6D',
    nav_routeplanner: '\uB3C4\uC2DC\uAC04 \uB3D9\uC120 \uC9DC\uAE30',
    nav_profile: '\uB0B4 \uD504\uB85C\uD544',
    dash_welcome: '\uC5B4\uB514\uB85C \uB5A0\uB098\uC2DC\uB098\uC694?',
    dash_subtitle: '\uD63C\uC790 \uC5EC\uD589, \uCF54\uC2A4\uB294 AI\uAC00 \uC9DC\uACE0 \uD544\uC694\uD55C \uC21C\uAC04\uC5D4 \uB3D9\uD589\uC744 \uCC3E\uC544\uBCF4\uC138\uC694.',
    dash_start_planner: 'AI \uCF54\uC2A4 \uC9DC\uB7EC\uAC00\uAE30',
    dash_find_companion: '\uD568\uAED8\uD560 \uB3D9\uD589 \uCC3E\uAE30',
    dash_popular_dest: '\uC778\uAE30 \uC5EC\uD589\uC9C0',
    onboard_eyebrow: '3\uBD84 \uC548\uC5D0 \uCCAB \uC77C\uC815 \uB9CC\uB4E4\uAE30',
    onboard_title: '\uBE48 \uD654\uBA74 \uB300\uC2E0, \uB3C4\uC2DC \uD558\uB098\uB85C \uBC14\uB85C \uC2DC\uC791\uD558\uC138\uC694',
    onboard_desc: '\uB3C4\uC2DC\uC640 \uAE30\uAC04\uB9CC \uACE0\uB974\uBA74 AI\uAC00 \uB300\uD45C \uBA85\uC18C, \uC2DD\uC0AC \uC2DC\uAC04, \uB3D9\uC120\uC744 \uBA3C\uC800 \uC7A1\uC544\uC90D\uB2C8\uB2E4. \uB9C8\uC74C\uC5D0 \uB4DC\uB294 \uC77C\uC815\uC740 \uC800\uC7A5\uD558\uACE0 \uB9C1\uD06C\uB85C \uACF5\uC720\uD560 \uC218 \uC788\uC5B4\uC694.',
    onboard_quick_title: '\uBE60\uB978 \uC2DC\uC791',
    onboard_city_label: '\uB3C4\uC2DC',
    onboard_days_label: '\uAE30\uAC04',
    onboard_quick_hint: '\uC120\uD0DD\uD55C \uB3C4\uC2DC\uB85C AI \uC77C\uC815 \uC0DD\uC131 \uD654\uBA74\uC774 \uC5F4\uB9BD\uB2C8\uB2E4.',
    onboard_start_btn: '\uB0B4 \uCCAB \uCF54\uC2A4 \uC0DD\uC131\uD558\uAE30',
    onboard_steps_aria: '\uC628\uBCF4\uB529 \uB2E8\uACC4',
    onboard_step1_title: '\uB3C4\uC2DC\uC640 \uCDE8\uD5A5 \uC120\uD0DD',
    onboard_step1_desc: '\uC219\uC18C \uC704\uCE58, \uC5EC\uD589 \uAE30\uAC04, \uC120\uD638\uD558\uB294 \uC5EC\uD589 \uC2A4\uD0C0\uC77C\uC744 \uAC00\uBCCD\uAC8C \uACE0\uB985\uB2C8\uB2E4.',
    onboard_step2_title: 'AI \uCF54\uC2A4 \uD655\uC778',
    onboard_step2_desc: '\uBA85\uC18C, \uC2DD\uC0AC, \uC774\uB3D9 \uC21C\uC11C\uB97C \uD55C \uD654\uBA74\uC5D0\uC11C \uBCF4\uACE0 \uC9C1\uC811 \uC7A5\uC18C\uB97C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    onboard_step3_title: '\uC800\uC7A5\uD558\uACE0 \uD568\uAED8 \uC870\uC728',
    onboard_step3_desc: '\uC77C\uC815\uC744 \uC800\uC7A5\uD558\uAC70\uB098 \uB9C1\uD06C\uB85C \uACF5\uC720\uD558\uACE0, \uD544\uC694\uD55C \uB3D9\uD589\uB3C4 \uBC14\uB85C \uCC3E\uC2B5\uB2C8\uB2E4.',
    onboard_preview_eyebrow: '\uC0D8\uD50C \uACB0\uACFC',
    onboard_preview_title: '\uC0DD\uC131 \uD6C4 \uBC14\uB85C \uBCFC \uC218 \uC788\uB294 \uAC83',
    onboard_preview_desc: '\uD558\uB8E8 \uC77C\uC815\uC740 \uC2DC\uAC04\uB300\uBCC4\uB85C \uC815\uB9AC\uB418\uACE0, \uC810\uC2EC\uACFC \uC800\uB141\uCC98\uB7FC \uC790\uC720\uB85C\uC6B4 \uC2DD\uC0AC \uC2DC\uAC04\uC740 \uBD88\uD544\uC694\uD55C \uC774\uB3D9 \uD45C\uC2DC \uC5C6\uC774 \uAE54\uB054\uD558\uAC8C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.',
    onboard_preview_item1: '\uB300\uD45C \uB79C\uB4DC\uB9C8\uD06C\uBD80\uD130 \uC2DC\uC791',
    onboard_preview_item2: '\uC790\uC720\uB85C\uC6B4 \uC810\uC2EC\uC2DC\uAC04',
    onboard_preview_item3: '\uADFC\uCC98 \uCE74\uD398 \uB610\uB294 \uB514\uC800\uD2B8 \uD734\uC2DD',
    profile_title: '\uD504\uB85C\uD544 \uC124\uC815',
    profile_info: '\uB3D9\uD589 \uB9E4\uCE6D \uC2DC \uC0C1\uB300\uBC29\uC5D0\uAC8C \uACF5\uAC1C\uB418\uB294 \uC815\uBCF4\uC785\uB2C8\uB2E4.',
    profile_name: '\uC774\uB984/\uB2C9\uB124\uC784',
    profile_gender: '\uC131\uBCC4',
    profile_mbti: 'MBTI',
    profile_photo: '\uD504\uB85C\uD544 \uC0AC\uC9C4',
    profile_photo_reset: '\uAE30\uBCF8 \uC0AC\uC9C4\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30',
    profile_photo_hint: '1MB \uC774\uD558\uC758 JPG, PNG \uC774\uBBF8\uC9C0\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    profile_save: '\uD504\uB85C\uD544 \uC800\uC7A5\uD558\uAE30',
    gender_male: '\uB0A8\uC131',
    gender_female: '\uC5EC\uC131',
    gender_any: '\uC131\uBCC4 \uBB34\uAD00',
    planner_title: 'AI \uC5EC\uD589 \uCF54\uC2A4 \uD50C\uB798\uB108',
    planner_desc: '\uB3C4\uC2DC\uB97C \uC120\uD0DD\uD558\uACE0 \uC5EC\uD589 \uB0A0\uC9DC\uC640 \uC120\uD638\uD558\uB294 \uCDE8\uD5A5\uC744 \uACE0\uB974\uC2DC\uBA74 AI\uAC00 \uC815\uBC00\uD55C \uC2DC\uAC04\uB300\uBCC4 \uC77C\uC815\uC744 \uCD94\uCC9C\uD574 \uB4DC\uB9BD\uB2C8\uB2E4.',
    planner_dest_label: '\uBAA9\uC801\uC9C0 \uB3C4\uC2DC \uC120\uD0DD',
    planner_date_label: '\uC5EC\uD589 \uAE30\uAC04 (\uC77C\uC218)',
    planner_pref_label: '\uB098\uC758 \uC5EC\uD589 \uCDE8\uD5A5 (\uB2E4\uC911 \uC120\uD0DD \uAC00\uB2A5)',
    planner_pref_healing: '\uD790\uB9C1 & \uD734\uC2DD',
    planner_pref_gourmet: '\uC2DD\uB3C4\uB77D & \uCE74\uD398',
    planner_pref_culture: '\uAD00\uAD11 & \uC5ED\uC0AC/\uBB38\uD654',
    planner_pref_activity: '\uC561\uD2F0\uBE44\uD2F0',
    planner_pref_sports: '\uC2A4\uD3EC\uCE20 \uACBD\uAE30 \uC9C1\uAD00',
    planner_pref_shopping: '\uC1FC\uD551',
    planner_pref_photo: '\uC778\uC0DD\uC0F7',
    planner_generate_btn: 'AI \uB9DE\uCDA4 \uCF54\uC2A4 \uC0DD\uC131\uD558\uAE30',
    planner_generating: 'AI\uAC00 \uAC00\uC7A5 \uCD5C\uC801\uC758 \uB8E8\uD2B8\uB97C \uC0DD\uC131\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4...',
    planner_result_title: '\uCD94\uCC9C \uC5EC\uD589 \uC77C\uC815',
    planner_result_desc: '\uC120\uD0DD\uD558\uC2E0 \uCDE8\uD5A5\uC5D0 \uCD5C\uC801\uD654\uB41C \uC2DC\uAC04\uB300\uBCC4 \uB3D9\uC120\uC785\uB2C8\uB2E4.',
    planner_day: '\uC77C\uCC28',
    planner_duration: '\uC608\uC0C1 \uC18C\uC694\uC2DC\uAC04',
    planner_lodging_label: '\uC219\uC18C/\uC2DC\uC791 \uC9C0\uC810',
    planner_lodging_none: '\uC120\uD0DD \uC548 \uD568 (\uAD00\uAD11\uC9C0\uC5D0\uC11C \uBC14\uB85C \uC2DC\uC791)',
    saved_trips_label: '\uC800\uC7A5\uB41C \uB098\uC758 \uC5EC\uD589',
    saved_trips_empty: '\uC800\uC7A5\uB41C \uC5EC\uD589\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
    btn_save_trip: '\uC774 \uC77C\uC815 \uC800\uC7A5',
    btn_share_trip: '\uC77C\uC815 \uACF5\uC720',
    planner_city_search_label: '\uB3C4\uC2DC\uBA85\uC73C\uB85C \uBE60\uB974\uAC8C \uCC3E\uAE30',
    planner_city_search_placeholder: '\uB3C4\uC2DC\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694',
    unsupported_city_text: '\uC544\uC9C1 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uB3C4\uC2DC\uC608\uC694',
    request_city_btn: '\uB3C4\uC2DC \uCD94\uAC00 \uC694\uCCAD\uD558\uAE30',
    city_request_sent: '\uB3C4\uC2DC \uCD94\uAC00 \uC694\uCCAD\uC774 \uAD00\uB9AC\uC790\uC5D0\uAC8C \uC804\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    planner_pace_label: '\uC5EC\uD589 \uC18D\uB3C4',
    pace_relaxed: '\uC5EC\uC720\uB86D\uAC8C',
    pace_moderate: '\uC801\uB2F9\uD788',
    pace_packed: '\uBE61\uBE61\uD558\uAC8C',
    profile_age: '\uB098\uC774\uB300',
    profile_languages: '\uC0AC\uC6A9 \uC5B8\uC5B4',
    profile_smoking: '\uD761\uC5F0 \uC5EC\uBD80',
    profile_alcohol: '\uC220 \uC120\uD638 \uC5EC\uBD80',
    age_any: '\uB098\uC774 \uBB34\uAD00',
    age_20s: '20\uB300',
    age_30s: '30\uB300',
    age_40s: '40\uB300',
    age_50s: '50\uB300',
    age_60s: '60\uB300+',
    smoking_no: '\uBE44\uD761\uC5F0',
    smoking_yes: '\uD761\uC5F0',
    smoking_ok: '\uC0C1\uAD00\uC5C6\uC74C',
    alcohol_none: '\uB9C8\uC2DC\uC9C0 \uC54A\uC74C',
    alcohol_social: '\uAC00\uBCCD\uAC8C \uAC00\uB2A5',
    alcohol_yes: '\uC88B\uC544\uD568',
    modal_room_age: '\uD76C\uB9DD \uB098\uC774\uB300',
    modal_room_language: '\uD76C\uB9DD \uC0AC\uC6A9 \uC5B8\uC5B4',
    modal_room_smoking: '\uD761\uC5F0 \uD638\uD658',
    modal_room_alcohol: '\uC220 \uC120\uD638',
    modal_room_any: '\uC0C1\uAD00\uC5C6\uC74C',
    member_profile_btn: '\uD504\uB85C\uD544 \uBCF4\uAE30',
    member_profile_title: '\uCC38\uC5EC\uC790 \uD504\uB85C\uD544',
    member_no_info: '\uCD94\uAC00 \uD504\uB85C\uD544 \uC815\uBCF4 \uC5C6\uC74C',
    rain_regen_label: '\uBE44 \uC624\uB294 \uB0A0 \uC2E4\uB0B4\uCF54\uC2A4\uB85C \uC7AC\uC870\uC815',
    rain_regen_btn: '\uC120\uD0DD\uD55C \uC77C\uCC28 \uC2E4\uB0B4\uCF54\uC2A4\uB85C \uBC14\uAFB8\uAE30',
    rain_regen_done: '\uC120\uD0DD\uD55C \uC77C\uCC28\uB97C \uC2E4\uB0B4 \uC704\uC8FC \uCF54\uC2A4\uB85C \uC7AC\uC870\uC815\uD588\uC2B5\uB2C8\uB2E4.',
    rain_regen_no_course: '\uBA3C\uC800 \uC77C\uC815\uC744 \uC0DD\uC131\uD574\uC8FC\uC138\uC694.',
    rain_regen_no_candidates: '\uD574\uB2F9 \uB3C4\uC2DC\uC758 \uC2E4\uB0B4 \uD6C4\uBCF4\uAC00 \uBD80\uC871\uD574\uC694.',
    pdf_download_started: 'PDF \uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uC2DC\uC791\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    btn_download_offline: 'PDF \uC624\uD504\uB77C\uC778 \uC800\uC7A5',
    comp_title: '\uC2E4\uC2DC\uAC04 \uB3D9\uD589 \uB9E4\uCE6D',
    comp_desc: '\uCE74\uD14C\uACE0\uB9AC\uB97C \uC120\uD0DD\uD558\uAC70\uB098 \uD2B9\uC815 \uC7A5\uC18C\uB97C \uACE8\uB77C \uB3D9\uD589 \uBC29\uC744 \uB9CC\uB4E4\uC5B4 \uD568\uAED8 \uC5EC\uD589\uD574 \uBCF4\uC138\uC694.',
    comp_btn_create: '\uB3D9\uD589 \uBC29 \uB9CC\uB4E4\uAE30',
    comp_category_all: '\uC804\uCCB4',
    comp_category_country: '\uB098\uB77C\uBCC4',
    comp_category_city: '\uB3C4\uC2DC\uBCC4',
    comp_category_place: '\uD2B9\uC815 \uC7A5\uC18C',
    comp_category_restaurant: '\uC2DD\uB2F9',
    comp_category_taxi: '\uD0DD\uC2DC \uC170\uC5B4',
    comp_category_rent: '\uB80C\uD2B8\uCE74 \uC170\uC5B4',
    comp_category_activity: '\uC561\uD2F0\uBE44\uD2F0',
    comp_room_recruiting: '\uBAA8\uC9D1\uC911',
    comp_room_closed: '\uB9C8\uAC10',
    comp_room_people: '\uC778\uC6D0',
    comp_room_joined: '\uCC38\uC5EC\uD568',
    comp_room_join_btn: '\uB3D9\uD589 \uCC38\uC5EC \uBC0F \uCC44\uD305\uBC29 \uB4E4\uC5B4\uAC00\uAE30',
    comp_room_pref_match: '\uCDE8\uD5A5 \uC77C\uCE58\uB3C4',
    modal_title: '\uC0C8 \uB3D9\uD589 \uBAA8\uC9D1 \uC0DD\uC131',
    modal_room_title: '\uBAA8\uC9D1 \uC81C\uBAA9',
    modal_room_dest: '\uBAA9\uC801\uC9C0 \uB3C4\uC2DC',
    modal_room_cat: '\uB3D9\uD589 \uCE74\uD14C\uACE0\uB9AC',
    modal_room_place: '\uC815\uD655\uD55C \uC7A5\uC18C',
    modal_room_date: '\uB3D9\uD589 \uB0A0\uC9DC',
    modal_room_time: '\uB3D9\uD589 \uC2DC\uC791 \uC2DC\uAC04',
    modal_room_max: '\uCD5C\uB300 \uBAA8\uC9D1 \uC778\uC6D0',
    modal_room_title_placeholder: '\uC608: \uC5EC\uC758\uB3C4 \uB354\uD604\uB300 \uC11C\uC6B8 \uC1FC\uD551\uD558\uACE0 \uCE74\uD398 \uAC19\uC774 \uAC00\uC2E4 \uBD84!',
    modal_room_place_placeholder: '\uC608: \uB354\uD604\uB300 \uC815\uBB38 \uC55E \uC0AC\uAC70\uB9AC',
    modal_room_desc_placeholder: '\uB3D9\uD589\uBE44 \uC815\uC0B0 \uBC0F \uB9CC\uB0A0 \uC0C1\uC138 \uC704\uCE58, \uCD94\uAC00 \uC124\uBA85\uC5D0 \uAD00\uD574 \uC801\uC5B4\uC8FC\uC138\uC694...',
    modal_submit: '\uB3D9\uD589 \uBC29 \uC0DD\uC131\uD558\uAE30',
    modal_cancel: '\uCDE8\uC18C',
    chat_title: '\uB3D9\uD589 \uC18C\uD1B5\uBC29',
    chat_members: '\uCC38\uC5EC\uC790 \uBAA9\uB85D',
    chat_placeholder: '\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694... (\uCF54\uC2A4 \uBC0F \uBE44\uC6A9 \uB4F1 \uC790\uC720\uB85C\uC6B4 \uC870\uC728)',
    chat_send: '\uC804\uC1A1',
    chat_leave_btn: '\uB3D9\uD589 \uD0C8\uD1F4\uD558\uAE30',
    chat_share_course_title: '\uB0B4 \uC77C\uC815 \uACF5\uC720\uD558\uAE30',
    chat_room_default_title: '\uB3D9\uD589 \uC18C\uD1B5\uBC29'
  });
  Object.assign(en, {
    nav_dashboard: 'Home',
    nav_planner: 'AI Itinerary',
    nav_companions: 'Companion Matching',
    nav_routeplanner: 'Intercity Routes',
    nav_profile: 'My Profile',
    dash_welcome: 'Where are you going?',
    dash_subtitle: 'Travel solo. Let AI plan the course, and find companions when you need them.',
    dash_start_planner: 'Plan an AI Course',
    dash_find_companion: 'Find a Companion',
    dash_popular_dest: 'Popular Destinations',
    onboard_eyebrow: 'Create your first itinerary in 3 minutes',
    onboard_title: 'Start with a city instead of a blank page',
    onboard_desc: 'Choose a city and trip length, and AI will draft landmark stops, meal times, and route order. Save the itinerary you like and share it with a link.',
    onboard_quick_title: 'Quick Start',
    onboard_city_label: 'City',
    onboard_days_label: 'Duration',
    onboard_quick_hint: 'The AI itinerary screen opens with your selected city.',
    onboard_start_btn: 'Create My First Course',
    onboard_steps_aria: 'Onboarding steps',
    onboard_step1_title: 'Choose City and Style',
    onboard_step1_desc: 'Pick lodging area, trip length, and your preferred travel style.',
    onboard_step2_title: 'Review AI Course',
    onboard_step2_desc: 'Check sights, meals, and route order in one view, then add places directly.',
    onboard_step3_title: 'Save and Coordinate',
    onboard_step3_desc: 'Save your itinerary, share it by link, and find companions when needed.',
    onboard_preview_eyebrow: 'Sample Result',
    onboard_preview_title: 'What you can see right after generation',
    onboard_preview_desc: 'Each day is organized by time, and flexible meal breaks stay clean without unnecessary distance or transit labels.',
    onboard_preview_item1: 'Start with major landmarks',
    onboard_preview_item2: 'Flexible lunch time',
    onboard_preview_item3: 'Nearby cafe or dessert break',
    profile_photo: 'Profile Photo',
    profile_photo_reset: 'Reset to Default Photo',
    profile_photo_hint: 'Use a JPG or PNG image under 1 MB.',
    planner_city_search_label: 'Find city by typing',
    planner_city_search_placeholder: 'Type a city name',
    unsupported_city_text: 'This city is not supported yet.',
    request_city_btn: 'Request City Support',
    city_request_sent: 'City support request has been sent to the admin.',
    planner_pace_label: 'Travel Speed',
    pace_relaxed: 'Relaxed',
    pace_moderate: 'Moderate',
    pace_packed: 'Packed',
    profile_age: 'Age Range',
    profile_languages: 'Languages',
    profile_smoking: 'Smoking',
    profile_alcohol: 'Alcohol Preference',
    age_any: 'Any Age',
    age_20s: '20s',
    age_30s: '30s',
    age_40s: '40s',
    age_50s: '50s',
    age_60s: '60s+',
    smoking_no: 'Non-smoker',
    smoking_yes: 'Smoker',
    smoking_ok: 'No preference',
    alcohol_none: 'No alcohol',
    alcohol_social: 'Social drinking',
    alcohol_yes: 'Enjoys drinks',
    modal_room_age: 'Preferred Age Range',
    modal_room_language: 'Preferred Languages',
    modal_room_smoking: 'Smoking Compatibility',
    modal_room_alcohol: 'Alcohol Preference',
    modal_room_any: 'No preference',
    member_profile_btn: 'View Profile',
    member_profile_title: 'Member Profile',
    member_no_info: 'No extra profile info',
    rain_regen_label: 'Rainy day indoor-course adjustment',
    rain_regen_btn: 'Make Selected Day Indoor Only',
    rain_regen_done: 'Selected day has been rebuilt with indoor-friendly stops.',
    rain_regen_no_course: 'Please generate an itinerary first.',
    rain_regen_no_candidates: 'Not enough indoor candidates for this city.',
    pdf_download_started: 'PDF download started.',
    btn_download_offline: 'Save PDF Offline',
    ai_regen_title: 'AI Course Regeneration',
    ai_regen_desc: 'Use these buttons to quickly adjust course density and theme.',
    regen_tag_relaxed: 'Relaxed',
    regen_tag_packed: 'Packed',
    regen_tag_noshopping: 'No Shopping',
    regen_tag_culture: 'More Culture',
    comp_category_all: 'All',
    comp_category_country: 'Country',
    comp_category_city: 'City',
    comp_category_place: 'Specific Venue',
    comp_category_restaurant: 'Restaurant',
    comp_category_taxi: 'Taxi Share',
    comp_category_rent: 'Car Share',
    comp_category_activity: 'Activity',
    profile_verify_btn: 'Unavailable feature',
    modal_room_gender: 'Preferred Gender',
    modal_room_desc: 'Details and notes'
  });

  const languagePatches = {
    fr: {
      nav_dashboard: 'Accueil',
      nav_planner: 'Itinéraire IA',
      nav_companions: 'Compagnons',
      nav_routeplanner: 'Trajets entre villes',
      nav_profile: 'Mon profil',
      dash_welcome: 'Où partez-vous ?',
      dash_subtitle: "Voyagez solo. L'IA prépare le parcours et vous trouvez des compagnons au bon moment.",
      dash_start_planner: 'Créer un parcours IA',
      dash_find_companion: 'Trouver un compagnon',
      dash_popular_dest: 'Destinations populaires',
      onboard_eyebrow: 'Créez votre premier itinéraire en 3 minutes',
      onboard_title: 'Commencez avec une ville, pas une page vide',
      onboard_desc: "Choisissez une ville et une durée. L'IA prépare les lieux incontournables, les repas et l'ordre du parcours.",
      onboard_quick_title: 'Démarrage rapide',
      onboard_city_label: 'Ville',
      onboard_days_label: 'Durée',
      onboard_quick_hint: "L'écran de création IA s'ouvrira avec la ville choisie.",
      onboard_start_btn: 'Créer mon premier parcours',
      onboard_steps_aria: 'Étapes de démarrage',
      onboard_step1_title: 'Choisir ville et style',
      onboard_step1_desc: "Sélectionnez le quartier de départ, la durée et votre style de voyage.",
      onboard_step2_title: 'Vérifier le parcours IA',
      onboard_step2_desc: "Consultez les visites, repas et déplacements puis ajoutez des lieux vous-même.",
      onboard_step3_title: 'Enregistrer et organiser',
      onboard_step3_desc: "Enregistrez, partagez le lien et trouvez des compagnons si nécessaire.",
      onboard_preview_eyebrow: 'Exemple',
      onboard_preview_title: 'Ce que vous voyez après génération',
      onboard_preview_desc: 'Chaque journée est organisée par heure, avec des repas libres affichés clairement.',
      onboard_preview_item1: 'Commencer par les grands repères',
      onboard_preview_item2: 'Déjeuner libre',
      onboard_preview_item3: 'Pause café ou dessert à proximité',
      planner_title: 'Planificateur de voyage IA',
      planner_desc: "Sélectionnez la ville, la durée et vos préférences. L'IA recommande un itinéraire par heure.",
      planner_dest_label: 'Ville de destination',
      planner_lodging_label: 'Hébergement / point de départ',
      planner_lodging_none: 'Aucun (commencer directement aux sites)',
      planner_date_label: 'Durée du voyage (jours)',
      planner_pref_label: 'Préférences de voyage (choix multiple)',
      planner_pref_healing: 'Détente et repos',
      planner_pref_gourmet: 'Gastronomie et café',
      planner_pref_culture: 'Sites touristiques et histoire/culture',
      planner_pref_activity: 'Activités',
      planner_pref_sports: 'Matchs sportifs en direct',
      planner_pref_shopping: 'Achats',
      planner_pref_photo: 'Spots photo',
      planner_generate_btn: "Générer l'itinéraire IA",
      planner_result_title: 'Itinéraire recommandé',
      planner_result_desc: 'Parcours optimisé selon vos préférences.',
      planner_duration: 'Durée estimée',
      saved_trips_label: 'Mes voyages enregistrés',
      saved_trips_empty: 'Aucun voyage enregistré.',
      btn_save_trip: 'Enregistrer cet itinéraire',
      btn_share_trip: "Partager l'itinéraire",
      btn_download_offline: 'Enregistrer en PDF',
      planner_city_search_label: 'Trouver une ville en tapant',
      planner_city_search_placeholder: 'Saisissez le nom de la ville',
      unsupported_city_text: "Cette ville n'est pas encore prise en charge.",
      request_city_btn: 'Demander cette ville',
      planner_pace_label: 'Rythme du voyage',
      pace_relaxed: 'Détendu',
      pace_moderate: 'Modéré',
      pace_packed: 'Soutenu',
      comp_title: 'Recherche de compagnons',
      comp_desc: 'Créez une salle par catégorie ou lieu précis pour voyager ensemble.',
      comp_btn_create: 'Créer une salle',
      comp_room_recruiting: 'Ouvert',
      comp_room_people: 'Participants',
      comp_room_join_btn: 'Rejoindre et discuter',
      comp_room_pref_match: 'Affinité',
      modal_title: 'Créer une salle compagnon',
      modal_room_title: 'Titre',
      modal_room_dest: 'Ville',
      modal_room_cat: 'Catégorie',
      modal_room_place: 'Lieu précis',
      modal_room_date: 'Date',
      modal_room_time: 'Heure de début',
      modal_room_max: 'Nombre maximum',
      modal_room_title_placeholder: 'ex. Qui veut visiter un musée et prendre un café ensemble ?',
      modal_room_place_placeholder: 'ex. devant l’entrée principale du musée',
      modal_room_desc_placeholder: 'Ajoutez le point de rendez-vous, les frais à partager et les détails utiles...',
      modal_submit: 'Créer la salle',
      modal_cancel: 'Annuler',
      chat_members: 'Participants',
      chat_placeholder: 'Écrivez un message...',
      chat_send: 'Envoyer',
      chat_leave_btn: 'Quitter la salle',
      profile_title: 'Paramètres du profil',
      profile_info: 'Ces informations sont visibles dans les salles de compagnons.',
      profile_name: 'Nom / pseudo',
      profile_age: "Tranche d'âge",
      profile_languages: 'Langues',
      profile_smoking: 'Tabac',
      profile_alcohol: 'Alcool',
      profile_photo: 'Photo de profil',
      profile_photo_reset: 'Revenir à la photo par défaut',
      profile_photo_hint: 'Image JPG ou PNG de moins de 1 Mo.',
      profile_save: 'Enregistrer le profil'
    },
    zh: {
      nav_dashboard: '首页',
      nav_planner: 'AI行程',
      nav_companions: '结伴匹配',
      nav_routeplanner: '城市间路线',
      nav_profile: '我的资料',
      dash_welcome: '你想去哪里？',
      dash_subtitle: '一个人旅行，路线交给AI，需要时再寻找旅伴。',
      dash_start_planner: '生成AI路线',
      dash_find_companion: '寻找旅伴',
      dash_popular_dest: '热门目的地',
      onboard_eyebrow: '3分钟创建第一个行程',
      onboard_title: '从一个城市开始，不再面对空白页面',
      onboard_desc: '选择城市和天数，AI会先安排地标、用餐时间和路线顺序。',
      onboard_quick_title: '快速开始',
      onboard_city_label: '城市',
      onboard_days_label: '天数',
      onboard_quick_hint: '将用所选城市打开AI行程生成页面。',
      onboard_start_btn: '创建我的第一个路线',
      onboard_steps_aria: '入门步骤',
      onboard_step1_title: '选择城市和偏好',
      onboard_step1_desc: '选择住宿位置、旅行天数和喜欢的旅行方式。',
      onboard_step2_title: '查看AI路线',
      onboard_step2_desc: '在一个页面查看景点、用餐和移动顺序，也可以手动添加地点。',
      onboard_step3_title: '保存并协调',
      onboard_step3_desc: '保存行程、分享链接，并在需要时寻找旅伴。',
      onboard_preview_eyebrow: '示例结果',
      onboard_preview_title: '生成后可以看到的内容',
      onboard_preview_desc: '每天按时间整理，自由用餐时间不会显示多余的移动信息。',
      onboard_preview_item1: '从代表性地标开始',
      onboard_preview_item2: '自由午餐时间',
      onboard_preview_item3: '附近咖啡或甜点休息',
      planner_title: 'AI旅行行程规划器',
      planner_desc: '选择目的地、天数和旅行偏好，AI会推荐按时间安排的路线。',
      planner_dest_label: '目的地城市',
      planner_lodging_label: '住宿 / 出发点',
      planner_lodging_none: '不选择（直接从景点开始）',
      planner_date_label: '旅行天数',
      planner_pref_label: '我的旅行偏好（可多选）',
      planner_pref_healing: '疗愈与休息',
      planner_pref_gourmet: '美食与咖啡',
      planner_pref_culture: '观光与历史/文化',
      planner_pref_activity: '活动体验',
      planner_pref_sports: '现场观看体育比赛',
      planner_pref_shopping: '购物',
      planner_pref_photo: '拍照打卡',
      planner_generate_btn: '生成AI行程',
      planner_result_title: '推荐行程',
      planner_result_desc: '根据偏好优化的时间路线。',
      planner_duration: '预计停留时间',
      saved_trips_label: '已保存的我的旅行',
      saved_trips_empty: '没有已保存的旅行。',
      btn_save_trip: '保存此行程',
      btn_share_trip: '分享行程',
      btn_download_offline: '保存为PDF',
      planner_city_search_label: '输入城市名快速查找',
      planner_city_search_placeholder: '请输入城市名',
      unsupported_city_text: '暂不支持这个城市。',
      request_city_btn: '请求添加城市',
      planner_pace_label: '旅行节奏',
      pace_relaxed: '轻松',
      pace_moderate: '适中',
      pace_packed: '紧凑',
      comp_title: '实时结伴匹配',
      comp_desc: '选择类别或指定地点，创建旅伴房间一起出行。',
      comp_btn_create: '创建结伴房间',
      comp_room_recruiting: '招募中',
      comp_room_people: '人数',
      comp_room_join_btn: '加入并进入聊天',
      comp_room_pref_match: '偏好匹配',
      modal_title: '创建新的结伴房间',
      modal_room_title: '标题',
      modal_room_dest: '目的地城市',
      modal_room_cat: '类别',
      modal_room_place: '具体地点',
      modal_room_date: '日期',
      modal_room_time: '开始时间',
      modal_room_max: '最多人数',
      modal_room_title_placeholder: '例如：有人想一起逛博物馆再喝咖啡吗？',
      modal_room_place_placeholder: '例如：博物馆正门前',
      modal_room_desc_placeholder: '请填写见面位置、费用分摊和其他说明...',
      modal_submit: '创建房间',
      modal_cancel: '取消',
      chat_members: '成员列表',
      chat_placeholder: '请输入消息...',
      chat_send: '发送',
      chat_leave_btn: '退出房间',
      profile_title: '资料设置',
      profile_info: '这些信息会在结伴匹配时公开给其他人。',
      profile_name: '姓名 / 昵称',
      profile_age: '年龄段',
      profile_languages: '使用语言',
      profile_smoking: '吸烟',
      profile_alcohol: '饮酒偏好',
      profile_photo: '头像',
      profile_photo_reset: '恢复默认头像',
      profile_photo_hint: '可使用1MB以下的JPG或PNG图片。',
      profile_save: '保存资料'
    },
    ja: {
      nav_dashboard: 'ホーム',
      nav_planner: 'AI日程',
      nav_companions: '同行マッチング',
      nav_routeplanner: '都市間ルート',
      nav_profile: 'プロフィール',
      dash_welcome: 'どこへ行きますか？',
      dash_subtitle: 'ひとり旅のコースはAIが作成。必要な瞬間に同行者を探せます。',
      dash_start_planner: 'AIコースを作成',
      dash_find_companion: '同行者を探す',
      dash_popular_dest: '人気の旅行先',
      onboard_eyebrow: '3分で最初の日程を作成',
      onboard_title: '空白ではなく、都市ひとつから始めましょう',
      onboard_desc: '都市と日数を選ぶだけで、AIが代表スポット、食事時間、移動順を先に組みます。',
      onboard_quick_title: 'クイック開始',
      onboard_city_label: '都市',
      onboard_days_label: '日数',
      onboard_quick_hint: '選択した都市でAI日程作成画面を開きます。',
      onboard_start_btn: '最初のコースを作成',
      onboard_steps_aria: '開始手順',
      onboard_step1_title: '都市と好みを選択',
      onboard_step1_desc: '宿泊エリア、旅行日数、好みのスタイルを選びます。',
      onboard_step2_title: 'AIコースを確認',
      onboard_step2_desc: '観光地、食事、移動順を一画面で確認し、場所を追加できます。',
      onboard_step3_title: '保存して調整',
      onboard_step3_desc: '日程を保存し、リンクで共有し、必要なら同行者を探します。',
      onboard_preview_eyebrow: 'サンプル結果',
      onboard_preview_title: '生成後すぐに見られる内容',
      onboard_preview_desc: '1日の予定は時間別に整理され、自由な食事時間は余計な移動表示なしで見えます。',
      onboard_preview_item1: '代表ランドマークから開始',
      onboard_preview_item2: '自由なランチ時間',
      onboard_preview_item3: '近くのカフェまたはデザート休憩',
      planner_title: 'AI旅行コースプランナー',
      planner_desc: '目的地、日数、好みを選ぶと、AIが時間帯別の日程を提案します。',
      planner_dest_label: '目的地の都市',
      planner_lodging_label: '宿泊 / 出発地点',
      planner_lodging_none: '選択なし（観光地から直接開始）',
      planner_date_label: '旅行日数',
      planner_pref_label: '旅行の好み（複数選択可）',
      planner_pref_healing: '癒やしと休息',
      planner_pref_gourmet: 'グルメとカフェ',
      planner_pref_culture: '観光と歴史/文化',
      planner_pref_activity: 'アクティビティ',
      planner_pref_sports: 'スポーツ観戦',
      planner_pref_shopping: 'ショッピング',
      planner_pref_photo: '写真スポット',
      planner_generate_btn: 'AI日程を生成',
      planner_result_title: 'おすすめ日程',
      planner_result_desc: '好みに合わせた時間帯別ルートです。',
      planner_duration: '目安所要時間',
      saved_trips_label: '保存した旅行',
      saved_trips_empty: '保存した旅行はありません。',
      btn_save_trip: 'この日程を保存',
      btn_share_trip: '日程を共有',
      btn_download_offline: 'PDFで保存',
      planner_city_search_label: '都市名で検索',
      planner_city_search_placeholder: '都市名を入力',
      unsupported_city_text: 'まだ対応していない都市です。',
      request_city_btn: '都市追加をリクエスト',
      planner_pace_label: '旅行ペース',
      pace_relaxed: 'ゆったり',
      pace_moderate: '標準',
      pace_packed: 'しっかり',
      comp_title: 'リアルタイム同行マッチング',
      comp_desc: 'カテゴリや場所を選んで同行ルームを作成できます。',
      comp_btn_create: '同行ルームを作成',
      comp_room_recruiting: '募集中',
      comp_room_people: '人数',
      comp_room_join_btn: '参加してチャットへ',
      comp_room_pref_match: '好みの一致度',
      modal_title: '新しい同行募集を作成',
      modal_room_title: '募集タイトル',
      modal_room_dest: '目的地の都市',
      modal_room_cat: 'カテゴリ',
      modal_room_place: '正確な場所',
      modal_room_date: '同行日',
      modal_room_time: '開始時間',
      modal_room_max: '最大人数',
      modal_room_title_placeholder: '例：美術館を見てカフェに行く方いますか？',
      modal_room_place_placeholder: '例：美術館の正面入口前',
      modal_room_desc_placeholder: '待ち合わせ場所、費用分担、補足説明を書いてください...',
      modal_submit: 'ルームを作成',
      modal_cancel: 'キャンセル',
      chat_members: '参加者一覧',
      chat_placeholder: 'メッセージを入力...',
      chat_send: '送信',
      chat_leave_btn: '退出する',
      profile_title: 'プロフィール設定',
      profile_info: '同行マッチング時に相手へ公開される情報です。',
      profile_name: '名前 / ニックネーム',
      profile_age: '年代',
      profile_languages: '使用言語',
      profile_smoking: '喫煙',
      profile_alcohol: 'お酒の好み',
      profile_photo: 'プロフィール写真',
      profile_photo_reset: '標準写真に戻す',
      profile_photo_hint: '1MB以下のJPGまたはPNG画像を使用できます。',
      profile_save: 'プロフィールを保存'
    },
    es: {
      nav_dashboard: 'Inicio',
      nav_planner: 'Itinerario IA',
      nav_companions: 'Compañeros',
      nav_routeplanner: 'Rutas entre ciudades',
      nav_profile: 'Mi perfil',
      dash_welcome: '¿A dónde viajas?',
      dash_subtitle: 'Viaja solo: la IA arma el recorrido y tú encuentras compañía cuando la necesitas.',
      dash_start_planner: 'Crear ruta IA',
      dash_find_companion: 'Buscar compañero',
      dash_popular_dest: 'Destinos populares',
      onboard_eyebrow: 'Crea tu primer itinerario en 3 minutos',
      onboard_title: 'Empieza con una ciudad, no con una página vacía',
      onboard_desc: 'Elige ciudad y duración. La IA organiza lugares principales, comidas y orden de ruta.',
      onboard_quick_title: 'Inicio rápido',
      onboard_city_label: 'Ciudad',
      onboard_days_label: 'Duración',
      onboard_quick_hint: 'Se abrirá la pantalla de itinerario IA con la ciudad elegida.',
      onboard_start_btn: 'Crear mi primera ruta',
      onboard_steps_aria: 'Pasos de inicio',
      onboard_step1_title: 'Elige ciudad y estilo',
      onboard_step1_desc: 'Selecciona zona de alojamiento, duración y estilo de viaje.',
      onboard_step2_title: 'Revisa la ruta IA',
      onboard_step2_desc: 'Consulta lugares, comidas y traslados en una vista y añade sitios manualmente.',
      onboard_step3_title: 'Guarda y coordina',
      onboard_step3_desc: 'Guarda el itinerario, comparte el enlace y busca compañía cuando haga falta.',
      onboard_preview_eyebrow: 'Ejemplo',
      onboard_preview_title: 'Lo que verás tras generar',
      onboard_preview_desc: 'Cada día se organiza por hora y las comidas libres se muestran sin traslados innecesarios.',
      onboard_preview_item1: 'Empezar por grandes iconos',
      onboard_preview_item2: 'Almuerzo libre',
      onboard_preview_item3: 'Pausa de café o postre cerca',
      planner_title: 'Planificador de viaje IA',
      planner_desc: 'Selecciona destino, duración y preferencias. La IA recomienda un itinerario por horas.',
      planner_dest_label: 'Ciudad de destino',
      planner_lodging_label: 'Alojamiento / punto de salida',
      planner_lodging_none: 'Ninguno (empezar directamente en atracciones)',
      planner_date_label: 'Duración del viaje (días)',
      planner_pref_label: 'Preferencias de viaje (selección múltiple)',
      planner_pref_healing: 'Descanso y bienestar',
      planner_pref_gourmet: 'Gastronomía y café',
      planner_pref_culture: 'Turismo e historia/cultura',
      planner_pref_activity: 'Actividades',
      planner_pref_sports: 'Deportes en directo',
      planner_pref_shopping: 'Compras',
      planner_pref_photo: 'Lugares fotogénicos',
      planner_generate_btn: 'Generar itinerario IA',
      planner_result_title: 'Itinerario recomendado',
      planner_result_desc: 'Ruta optimizada según tus preferencias.',
      planner_duration: 'Duración estimada',
      saved_trips_label: 'Mis viajes guardados',
      saved_trips_empty: 'No hay viajes guardados.',
      btn_save_trip: 'Guardar este itinerario',
      btn_share_trip: 'Compartir itinerario',
      btn_download_offline: 'Guardar PDF',
      planner_city_search_label: 'Buscar ciudad escribiendo',
      planner_city_search_placeholder: 'Escribe el nombre de la ciudad',
      unsupported_city_text: 'Esta ciudad aún no está disponible.',
      request_city_btn: 'Solicitar ciudad',
      planner_pace_label: 'Ritmo de viaje',
      pace_relaxed: 'Relajado',
      pace_moderate: 'Moderado',
      pace_packed: 'Intenso',
      comp_title: 'Emparejamiento de compañeros',
      comp_desc: 'Crea una sala por categoría o lugar concreto para viajar juntos.',
      comp_btn_create: 'Crear sala',
      comp_room_recruiting: 'Abierta',
      comp_room_people: 'Personas',
      comp_room_join_btn: 'Unirse y chatear',
      comp_room_pref_match: 'Afinidad',
      modal_title: 'Crear sala de compañero',
      modal_room_title: 'Título',
      modal_room_dest: 'Ciudad',
      modal_room_cat: 'Categoría',
      modal_room_place: 'Lugar exacto',
      modal_room_date: 'Fecha',
      modal_room_time: 'Hora de inicio',
      modal_room_max: 'Máximo de personas',
      modal_room_title_placeholder: 'p. ej., ¿Alguien quiere visitar un museo y tomar café?',
      modal_room_place_placeholder: 'p. ej., frente a la entrada principal del museo',
      modal_room_desc_placeholder: 'Añade punto de encuentro, gastos compartidos y detalles útiles...',
      modal_submit: 'Crear sala',
      modal_cancel: 'Cancelar',
      chat_members: 'Participantes',
      chat_placeholder: 'Escribe un mensaje...',
      chat_send: 'Enviar',
      chat_leave_btn: 'Salir de la sala',
      profile_title: 'Ajustes de perfil',
      profile_info: 'Esta información se muestra a otros viajeros en las salas de compañeros.',
      profile_name: 'Nombre / apodo',
      profile_age: 'Rango de edad',
      profile_languages: 'Idiomas',
      profile_smoking: 'Fumar',
      profile_alcohol: 'Alcohol',
      profile_photo: 'Foto de perfil',
      profile_photo_reset: 'Volver a la foto predeterminada',
      profile_photo_hint: 'Usa una imagen JPG o PNG de menos de 1 MB.',
      profile_save: 'Guardar perfil'
    }
  };

  Object.entries(languagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });
  const mobileNavLanguagePatches = {
    ko: {
      nav_dashboard_short: '홈', nav_planner_short: '코스 생성', nav_companions_short: '동행',
      nav_routeplanner_short: '도시간 경로', nav_profile_short: '프로필'
    },
    en: {
      nav_dashboard_short: 'Home', nav_planner_short: 'Plan', nav_companions_short: 'Match',
      nav_routeplanner_short: 'Routes', nav_profile_short: 'Profile'
    },
    fr: {
      nav_dashboard_short: 'Accueil', nav_planner_short: 'Parcours', nav_companions_short: 'Compagnons',
      nav_routeplanner_short: 'Itinéraire', nav_profile_short: 'Profil'
    },
    zh: {
      nav_dashboard_short: '首页', nav_planner_short: '行程', nav_companions_short: '结伴',
      nav_routeplanner_short: '城市路线', nav_profile_short: '资料'
    },
    ja: {
      nav_dashboard_short: 'ホーム', nav_planner_short: '日程', nav_companions_short: '同行',
      nav_routeplanner_short: '都市ルート', nav_profile_short: 'プロフィール'
    },
    es: {
      nav_dashboard_short: 'Inicio', nav_planner_short: 'Plan', nav_companions_short: 'Compañía',
      nav_routeplanner_short: 'Rutas', nav_profile_short: 'Perfil'
    }
  };
  Object.entries(mobileNavLanguagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });
  const supplementalLanguagePatches = {
    fr: {
      ai_regen_title: 'Régénération du parcours IA',
      ai_regen_desc: 'Utilisez ces boutons pour ajuster rapidement la densité et le thème du parcours.',
      regen_tag_relaxed: 'Détendu',
      regen_tag_packed: 'Soutenu',
      regen_tag_noshopping: 'Sans shopping',
      regen_tag_culture: 'Plus de culture',
      comp_category_all: 'Tout',
      comp_category_country: 'Pays',
      comp_category_city: 'Ville',
      comp_category_place: 'Lieu précis',
      comp_category_restaurant: 'Restaurant',
      comp_category_taxi: 'Taxi partagé',
      comp_category_rent: 'Voiture partagée',
      comp_category_activity: 'Activité',
      profile_verify_btn: 'Fonction non disponible',
      modal_room_gender: 'Genre souhaité',
      modal_room_desc: 'Détails et consignes'
    },
    zh: {
      ai_regen_title: 'AI行程重新调整',
      ai_regen_desc: '使用这些按钮快速调整行程密度和主题。',
      regen_tag_relaxed: '轻松',
      regen_tag_packed: '紧凑',
      regen_tag_noshopping: '不安排购物',
      regen_tag_culture: '更多文化',
      comp_category_all: '全部',
      comp_category_country: '按国家',
      comp_category_city: '按城市',
      comp_category_place: '指定地点',
      comp_category_restaurant: '餐厅',
      comp_category_taxi: '拼出租车',
      comp_category_rent: '拼车',
      comp_category_activity: '活动',
      profile_verify_btn: '暂不提供此功能',
      modal_room_gender: '期望性别',
      modal_room_desc: '详细说明'
    },
    ja: {
      ai_regen_title: 'AIコース再調整',
      ai_regen_desc: 'ボタンでコースの密度やテーマをすばやく調整できます。',
      regen_tag_relaxed: 'ゆったり',
      regen_tag_packed: 'しっかり',
      regen_tag_noshopping: 'ショッピングなし',
      regen_tag_culture: '文化中心',
      comp_category_all: 'すべて',
      comp_category_country: '国別',
      comp_category_city: '都市別',
      comp_category_place: '特定の場所',
      comp_category_restaurant: 'レストラン',
      comp_category_taxi: 'タクシー相乗り',
      comp_category_rent: '車シェア',
      comp_category_activity: 'アクティビティ',
      profile_verify_btn: '現在利用できない機能',
      modal_room_gender: '希望する性別',
      modal_room_desc: '詳細と案内'
    },
    es: {
      ai_regen_title: 'Regeneración de ruta IA',
      ai_regen_desc: 'Usa estos botones para ajustar rápidamente la densidad y el tema de la ruta.',
      regen_tag_relaxed: 'Relajado',
      regen_tag_packed: 'Intenso',
      regen_tag_noshopping: 'Sin compras',
      regen_tag_culture: 'Más cultura',
      comp_category_all: 'Todo',
      comp_category_country: 'País',
      comp_category_city: 'Ciudad',
      comp_category_place: 'Lugar específico',
      comp_category_restaurant: 'Restaurante',
      comp_category_taxi: 'Taxi compartido',
      comp_category_rent: 'Coche compartido',
      comp_category_activity: 'Actividad',
      profile_verify_btn: 'Función no disponible',
      modal_room_gender: 'Género preferido',
      modal_room_desc: 'Detalles e indicaciones'
    }
  };
  Object.entries(supplementalLanguagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });

  const strictLanguagePatches = {
    ko: {
      room_create_success: '동행 모집방이 생성되었습니다!',
      room_create_failed: '동행방을 저장하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해주세요.',
      room_create_local_only: '동행방을 이 기기에 생성했습니다. 서버 연결이 복구되면 자동으로 동기화됩니다.',
      room_update_success: '동행 방 정보가 수정되었습니다!',
      room_update_failed: '동행 방 정보를 저장하지 못했습니다. 다시 시도해주세요.',
      room_deleted: '동행 모집 글이 삭제되었습니다.',
      room_full: '정원이 가득 찬 방입니다.',
      room_left: '동행방을 퇴장했습니다.',
      room_deleted_by_owner: '방장이 동행 방을 삭제하였습니다.',
      room_removed_by_owner: '방장에 의해 퇴장되었습니다.',
      planner_generate_first: '일정을 먼저 생성해주세요.',
      planner_select_destination: '목적지 도시를 선택해주세요.',
      profile_choose_image: '이미지 파일을 선택해주세요.',
      profile_image_too_large: '프로필 사진은 1MB 이하로 선택해주세요.',
      profile_photo_reset_toast: '프로필 사진을 기본으로 되돌렸습니다.',
      chat_no_itinerary: '공유할 일정이 없습니다. 코스를 먼저 생성해주세요.',
      chat_itinerary_shared: '채팅방에 일정이 공유되었습니다.',
      itinerary_none_to_save: '저장할 일정이 없습니다.',
      itinerary_saved: '여행 일정이 저장되었습니다.',
      itinerary_updated: '기존 여행 일정이 업데이트되었습니다.',
      itinerary_none_to_share: '공유할 일정이 없습니다.',
      itinerary_delete_confirm: '정말 삭제하시겠습니까?',
      action_deleted: '삭제되었습니다.',
      share_link_copied: '🔗 공유 링크가 클립보드에 복사되었습니다!',
      share_link_failed: '공유 링크 생성에 실패했습니다.',
      share_link_prompt: '아래 링크를 복사하여 공유하세요:',
      itinerary_adjusted: '일정이 성공적으로 재조정되었습니다.',
      itinerary_min_attraction: '하루에 최소 1개 이상의 일반 관광지는 있어야 합니다.',
      itinerary_place_deleted: '장소가 삭제되었습니다.',
      itinerary_reordered: '일정 순서가 변경되었습니다.',
      route_desc: '방문할 도시를 추가하세요. AI가 항공편의 문 앞에서 문 앞까지 걸리는 시간을 포함해 가장 짧은 순서와 교통수단을 추천합니다.',
      route_add_city: '도시 선택...',
      route_add_btn: '+ 추가',
      route_empty_hint: '도시를 2개 이상 추가하세요',
      route_result_placeholder: '최적 경로를 확인할 수 있습니다',
      opt_custom_input: '✏️ 직접 입력...',
      route_analyze_first: '먼저 경로를 분석해주세요.',
      shared_route_loaded: '공유받은 경로를 불러왔습니다.',
      shared_itinerary_loaded: '공유받은 일정을 불러왔습니다.',
      kick_member: '강퇴',
      shared_course_label: '공유된 여행 코스',
      load_itinerary: '일정 불러오기',
      preference_label: '메인 취향',
      nav_logo: 'TripTogether',
      profile_mbti: 'MBTI',
      gender_private: '공개 안 함',
      chat_safety_notice: '외부 메신저 이동이나 선입금·송금을 요구하면 주의하세요.',
      dash_welcome: '다음 여행, 어디로 갈까요?',
      dash_subtitle: 'AI 코스와 필요한 순간의 동행.',
      onboard_eyebrow: '바로 계획하기',
      onboard_title: '도시와 기간만 고르세요',
      onboard_desc: '대표 명소와 이동 순서를 바로 만듭니다.',
      onboard_quick_hint: '선택한 도시로 일정을 만듭니다.'
    },
    en: {
      room_create_success: 'Companion room created!',
      room_create_failed: 'The companion room could not be saved. Please review the form and try again.',
      room_create_local_only: 'The room was created on this device and will sync automatically when the server is available.',
      room_update_success: 'Room updated successfully!',
      room_update_failed: 'The room changes could not be saved. Please try again.',
      room_deleted: 'Companion room deleted.',
      room_full: 'This room is full.',
      room_left: 'Left the companion room.',
      room_deleted_by_owner: 'The room creator has deleted this companion room.',
      room_removed_by_owner: 'You have been removed from the room by the creator.',
      planner_generate_first: 'Please generate an itinerary first.',
      planner_select_destination: 'Please select a destination city.',
      profile_choose_image: 'Please choose an image file.',
      profile_image_too_large: 'Please choose a profile photo under 1 MB.',
      profile_photo_reset_toast: 'Profile photo reset to default.',
      chat_no_itinerary: 'No itinerary to share. Please generate a course first.',
      chat_itinerary_shared: 'Itinerary shared in chat.',
      itinerary_none_to_save: 'No itinerary to save.',
      itinerary_saved: 'Itinerary saved.',
      itinerary_updated: 'Saved itinerary updated.',
      itinerary_none_to_share: 'No itinerary to share.',
      itinerary_delete_confirm: 'Are you sure you want to delete this trip?',
      action_deleted: 'Deleted.',
      share_link_copied: '🔗 Share link copied to clipboard!',
      share_link_failed: 'Failed to generate share link.',
      share_link_prompt: 'Copy this link to share:',
      itinerary_adjusted: 'Itinerary successfully adjusted.',
      itinerary_min_attraction: 'You must have at least 1 attraction in a day.',
      itinerary_place_deleted: 'Place deleted.',
      itinerary_reordered: 'Itinerary reordered.',
      route_desc: 'Add the cities you plan to visit. AI recommends the fastest order and transport, including door-to-door flight time.',
      route_add_city: 'Select a city...',
      route_add_btn: '+ Add',
      route_empty_hint: 'Add at least 2 cities',
      route_result_placeholder: 'to get the optimal route',
      opt_custom_input: '✏️ Enter directly...',
      route_analyze_first: 'Please analyze the route first.',
      shared_route_loaded: 'Shared route loaded.',
      shared_itinerary_loaded: 'Shared itinerary loaded.',
      kick_member: 'Kick',
      shared_course_label: 'Shared Course',
      load_itinerary: 'Load Itinerary',
      preference_label: 'Preferences',
      nav_logo: 'TripTogether',
      profile_mbti: 'MBTI',
      gender_private: 'Prefer not to say',
      chat_safety_notice: 'Be cautious if someone asks you to move to an external messenger or send money.',
      dash_welcome: 'Where will you go next?',
      dash_subtitle: 'AI itineraries. Companions when you need them.',
      onboard_eyebrow: 'Plan now',
      onboard_title: 'Choose a city and duration',
      onboard_desc: 'Get key sights in a practical order.',
      onboard_quick_hint: 'Build an itinerary for this city.'
    },
    fr: {
      age_20s: '20–29 ans', age_30s: '30–39 ans', age_40s: '40–49 ans', age_50s: '50–59 ans', age_60s: '60 ans et plus', age_any: 'Tous les âges',
      alcohol_none: 'Sans alcool', alcohol_social: 'Occasionnellement', alcohol_yes: 'Apprécie boire',
      btn_apply: 'Appliquer', chat_joined_notice: 'A rejoint le salon.', chat_room_default_title: 'Discussion entre compagnons', chat_share_course_title: 'Partager mon itinéraire', chat_title: 'Salon de discussion', city_request_sent: 'La demande d’ajout de ville a été envoyée.',
      comp_room_age_limit: 'Âge souhaité', comp_room_closed: 'Fermée', comp_room_details: 'Détails', comp_room_filters: 'Filtres', comp_room_gender_limit: 'Genre souhaité', comp_room_joined: 'Participant', comp_room_nat_limit: 'Nationalité souhaitée', comp_room_time: 'Horaire', comp_room_verify_badge: 'Profil vérifié',
      dash_ref_desc: 'Des méthodes de mise en relation éprouvées sont utilisées pour proposer des compagnons adaptés.', dash_ref_title: 'Communauté de voyage', dash_stat_matches: 'Taux de mise en relation : 94,2 %', dash_stat_users: '124 000 utilisateurs cumulés', dash_stat_verified: 'Profil prêt',
      duration_1: '1 jour', duration_2: '2 jours', duration_3: '3 jours', duration_4: '4 jours', duration_5: '5 jours', duration_6: '6 jours', duration_7: '7 jours',
      gender_any: 'Sans préférence', gender_female: 'Femme', gender_male: 'Homme', gender_private: 'Ne pas afficher',
      chat_safety_notice: 'Soyez vigilant si l’on vous demande de passer sur une messagerie externe ou d’envoyer de l’argent.',
      dash_welcome: 'Votre prochain voyage ?', dash_subtitle: 'Itinéraire IA et compagnons au bon moment.', onboard_eyebrow: 'Planifier maintenant', onboard_title: 'Choisissez une ville et une durée', onboard_desc: 'Obtenez les lieux essentiels dans un ordre pratique.', onboard_quick_hint: 'Créer un itinéraire pour cette ville.',
      member_no_info: 'Aucune information supplémentaire', member_profile_btn: 'Voir le profil', member_profile_title: 'Profil du participant',
      modal_any: 'Sans préférence', modal_room_age: 'Tranche d’âge souhaitée', modal_room_alcohol: 'Préférence pour l’alcool', modal_room_any: 'Sans préférence', modal_room_language: 'Langues souhaitées', modal_room_nationality: 'Nationalité souhaitée', modal_room_pref: 'Style de voyage', modal_room_smoking: 'Compatibilité tabac',
      nat_any: 'Toute nationalité', nat_foreign: 'Voyageur international', nat_korean: 'Coréen', nav_logo: 'TripTogether', pdf_download_started: 'Le téléchargement du PDF a commencé.',
      planner_day: 'Jour', planner_dest_placeholder: 'Sélectionnez une ville', planner_generating: 'L’IA prépare le meilleur itinéraire…',
      profile_gender: 'Genre', profile_mbti: 'MBTI', profile_nationality: 'Nationalité', profile_saved_toast: 'Profil enregistré.', profile_sns: 'Réseau social', profile_unverified: 'Non vérifié', profile_verified: 'Vérifié',
      rain_regen_btn: 'Adapter la journée sélectionnée aux lieux couverts', rain_regen_done: 'La journée sélectionnée a été réorganisée avec des lieux couverts.', rain_regen_label: 'Adapter en cas de pluie', rain_regen_no_candidates: 'Il n’y a pas assez de lieux couverts dans cette ville.', rain_regen_no_course: 'Créez d’abord un itinéraire.', regen_input_placeholder: 'Décrivez le changement souhaité…',
      room_max_10: '10 personnes', room_max_2: '2 personnes', room_max_3: '3 personnes', room_max_4: '4 personnes', room_max_6: '6 personnes', room_max_8: '8 personnes', room_max_unlimited: 'Sans limite',
      smoking_no: 'Non-fumeur', smoking_ok: 'Sans préférence', smoking_yes: 'Fumeur',
      room_create_success: 'Le salon de compagnons a été créé !', room_create_failed: 'Impossible d’enregistrer le salon. Vérifiez le formulaire et réessayez.', room_create_local_only: 'Le salon a été créé sur cet appareil et sera synchronisé automatiquement dès que le serveur sera disponible.', room_update_success: 'Le salon a été mis à jour !', room_update_failed: 'Impossible d’enregistrer les modifications. Réessayez.', room_deleted: 'Le salon a été supprimé.', room_full: 'Ce salon est complet.', room_left: 'Vous avez quitté le salon.', room_deleted_by_owner: 'Le créateur a supprimé ce salon.', room_removed_by_owner: 'Le créateur vous a retiré du salon.',
      planner_generate_first: 'Créez d’abord un itinéraire.', planner_select_destination: 'Sélectionnez une ville de destination.', profile_choose_image: 'Choisissez un fichier image.', profile_image_too_large: 'Choisissez une photo de profil de moins de 1 Mo.', profile_photo_reset_toast: 'La photo de profil par défaut a été rétablie.', chat_no_itinerary: 'Aucun itinéraire à partager. Créez d’abord un parcours.', chat_itinerary_shared: 'L’itinéraire a été partagé dans le salon.',
      itinerary_none_to_save: 'Aucun itinéraire à enregistrer.', itinerary_saved: 'Itinéraire enregistré.', itinerary_updated: 'Itinéraire enregistré mis à jour.', itinerary_none_to_share: 'Aucun itinéraire à partager.', itinerary_delete_confirm: 'Voulez-vous vraiment supprimer ce voyage ?', action_deleted: 'Supprimé.', share_link_copied: '🔗 Le lien de partage a été copié !', share_link_failed: 'Impossible de créer le lien de partage.', share_link_prompt: 'Copiez ce lien pour le partager :', itinerary_adjusted: 'L’itinéraire a été réorganisé.', itinerary_min_attraction: 'Chaque journée doit contenir au moins une visite.', itinerary_place_deleted: 'Lieu supprimé.', itinerary_reordered: 'Ordre de l’itinéraire modifié.', route_desc: "Ajoutez les villes à visiter. L'IA recommande l'ordre le plus court et les transports, avec les temps de vol porte-à-porte.", route_add_city: 'Choisir une ville...', route_add_btn: '+ Ajouter', route_empty_hint: 'Ajoutez au moins 2 villes', route_result_placeholder: 'pour obtenir le trajet optimal', opt_custom_input: '✏️ Saisie directe...', route_analyze_first: 'Analysez d’abord le trajet.', shared_route_loaded: 'Trajet partagé chargé.', shared_itinerary_loaded: 'Itinéraire partagé chargé.', kick_member: 'Exclure', shared_course_label: 'Itinéraire partagé', load_itinerary: 'Charger l’itinéraire', preference_label: 'Préférences'
    },
    zh: {
      age_20s: '20多岁', age_30s: '30多岁', age_40s: '40多岁', age_50s: '50多岁', age_60s: '60岁以上', age_any: '年龄不限',
      alcohol_none: '不饮酒', alcohol_social: '偶尔饮酒', alcohol_yes: '喜欢饮酒',
      btn_apply: '应用', chat_joined_notice: '已加入聊天房。', chat_room_default_title: '同行聊天房', chat_share_course_title: '分享我的行程', chat_title: '同行聊天房', city_request_sent: '城市添加请求已发送。',
      comp_room_age_limit: '期望年龄', comp_room_closed: '已结束', comp_room_details: '详细信息', comp_room_filters: '筛选', comp_room_gender_limit: '期望性别', comp_room_joined: '已参加', comp_room_nat_limit: '期望国籍', comp_room_time: '时间', comp_room_verify_badge: '资料已验证',
      dash_ref_desc: '结合成熟的旅行同行匹配经验，为您推荐合适的同行者。', dash_ref_title: '旅行社区', dash_stat_matches: '匹配成功率 94.2%', dash_stat_users: '累计用户 12.4 万', dash_stat_verified: '资料已准备',
      duration_1: '1天', duration_2: '2天', duration_3: '3天', duration_4: '4天', duration_5: '5天', duration_6: '6天', duration_7: '7天',
      gender_any: '性别不限', gender_female: '女性', gender_male: '男性', gender_private: '不公开',
      chat_safety_notice: '如有人要求转到外部聊天软件或提前汇款，请提高警惕。',
      dash_welcome: '下一站去哪里？', dash_subtitle: 'AI规划行程，需要时寻找旅伴。', onboard_eyebrow: '立即规划', onboard_title: '选择城市和天数', onboard_desc: '按合理顺序安排必游景点。', onboard_quick_hint: '为所选城市生成行程。',
      member_no_info: '暂无更多资料', member_profile_btn: '查看资料', member_profile_title: '参与者资料',
      modal_any: '不限', modal_room_age: '期望年龄段', modal_room_alcohol: '饮酒偏好', modal_room_any: '不限', modal_room_language: '期望语言', modal_room_nationality: '期望国籍', modal_room_pref: '旅行风格', modal_room_smoking: '吸烟偏好',
      nat_any: '国籍不限', nat_foreign: '国际旅行者', nat_korean: '韩国人', nav_logo: 'TripTogether', pdf_download_started: 'PDF下载已开始。',
      planner_day: '第几天', planner_dest_placeholder: '请选择城市', planner_generating: 'AI正在生成最佳路线…',
      profile_gender: '性别', profile_mbti: 'MBTI', profile_nationality: '国籍', profile_saved_toast: '资料已保存。', profile_sns: '社交账号', profile_unverified: '未验证', profile_verified: '已验证',
      rain_regen_btn: '将所选日期改为室内行程', rain_regen_done: '所选日期已调整为适合雨天的室内行程。', rain_regen_label: '雨天室内调整', rain_regen_no_candidates: '该城市的室内地点不足。', rain_regen_no_course: '请先生成行程。', regen_input_placeholder: '请输入希望调整的内容…',
      room_max_10: '最多10人', room_max_2: '最多2人', room_max_3: '最多3人', room_max_4: '最多4人', room_max_6: '最多6人', room_max_8: '最多8人', room_max_unlimited: '人数不限',
      smoking_no: '不吸烟', smoking_ok: '不限', smoking_yes: '吸烟',
      room_create_success: '同行房已创建！', room_create_failed: '无法保存同行房。请检查填写内容后重试。', room_create_local_only: '同行房已保存在此设备上，服务器恢复后会自动同步。', room_update_success: '同行房已更新！', room_update_failed: '无法保存修改，请重试。', room_deleted: '同行房已删除。', room_full: '该房间人数已满。', room_left: '您已退出同行房。', room_deleted_by_owner: '房主已删除该同行房。', room_removed_by_owner: '房主已将您移出同行房。',
      planner_generate_first: '请先生成行程。', planner_select_destination: '请选择目的地城市。', profile_choose_image: '请选择图片文件。', profile_image_too_large: '请选择小于1MB的头像图片。', profile_photo_reset_toast: '头像已恢复为默认图片。', chat_no_itinerary: '没有可分享的行程，请先生成路线。', chat_itinerary_shared: '行程已分享到聊天房。',
      itinerary_none_to_save: '没有可保存的行程。', itinerary_saved: '行程已保存。', itinerary_updated: '已更新保存的行程。', itinerary_none_to_share: '没有可分享的行程。', itinerary_delete_confirm: '确定要删除这个行程吗？', action_deleted: '已删除。', share_link_copied: '🔗 分享链接已复制！', share_link_failed: '无法生成分享链接。', share_link_prompt: '复制以下链接进行分享：', itinerary_adjusted: '行程已成功调整。', itinerary_min_attraction: '每天至少需要保留一个普通景点。', itinerary_place_deleted: '地点已删除。', itinerary_reordered: '行程顺序已更新。', route_desc: '添加要访问的城市。AI会推荐用时最短的顺序和交通方式，并计算航班门到门总时间。', route_add_city: '选择城市...', route_add_btn: '+ 添加', route_empty_hint: '请至少添加2个城市', route_result_placeholder: '以生成最佳路线', opt_custom_input: '✏️ 直接输入...', route_analyze_first: '请先分析路线。', shared_route_loaded: '已加载分享路线。', shared_itinerary_loaded: '已加载分享行程。', kick_member: '移出', shared_course_label: '分享的旅行行程', load_itinerary: '加载行程', preference_label: '偏好'
    },
    ja: {
      age_20s: '20代', age_30s: '30代', age_40s: '40代', age_50s: '50代', age_60s: '60代以上', age_any: '年齢不問',
      alcohol_none: '飲まない', alcohol_social: '時々飲む', alcohol_yes: 'お酒が好き',
      btn_apply: '適用', chat_joined_notice: 'チャットルームに参加しました。', chat_room_default_title: '同行チャットルーム', chat_share_course_title: '自分の旅程を共有', chat_title: '同行チャットルーム', city_request_sent: '都市追加のリクエストを送信しました。',
      comp_room_age_limit: '希望年齢', comp_room_closed: '募集終了', comp_room_details: '詳細', comp_room_filters: '絞り込み', comp_room_gender_limit: '希望する性別', comp_room_joined: '参加済み', comp_room_nat_limit: '希望する国籍', comp_room_time: '時間', comp_room_verify_badge: 'プロフィール確認済み',
      dash_ref_desc: '旅行同行サービスの実績あるマッチング方法を活用し、相性のよい同行者を提案します。', dash_ref_title: '旅行コミュニティ', dash_stat_matches: 'マッチング成功率 94.2%', dash_stat_users: '累計利用者 12.4万人', dash_stat_verified: 'プロフィール準備完了',
      duration_1: '1日', duration_2: '2日', duration_3: '3日', duration_4: '4日', duration_5: '5日', duration_6: '6日', duration_7: '7日',
      gender_any: '性別不問', gender_female: '女性', gender_male: '男性', gender_private: '非公開',
      chat_safety_notice: '外部メッセンジャーへの移動や送金を求められた場合は注意してください。',
      dash_welcome: '次はどこへ行きますか？', dash_subtitle: 'AIの旅程と、必要な時の旅仲間。', onboard_eyebrow: '今すぐ計画', onboard_title: '都市と日数を選択', onboard_desc: '定番スポットを効率よく並べます。', onboard_quick_hint: '選んだ都市の旅程を作成します。',
      member_no_info: '追加プロフィール情報なし', member_profile_btn: 'プロフィールを見る', member_profile_title: '参加者プロフィール',
      modal_any: '指定なし', modal_room_age: '希望年齢層', modal_room_alcohol: '飲酒の希望', modal_room_any: '指定なし', modal_room_language: '希望言語', modal_room_nationality: '希望する国籍', modal_room_pref: '旅行スタイル', modal_room_smoking: '喫煙の相性',
      nat_any: '国籍不問', nat_foreign: '海外旅行者', nat_korean: '韓国人', nav_logo: 'TripTogether', pdf_download_started: 'PDFのダウンロードを開始しました。',
      planner_day: '日目', planner_dest_placeholder: '都市を選択', planner_generating: 'AIが最適なルートを作成しています…',
      profile_gender: '性別', profile_mbti: 'MBTI', profile_nationality: '国籍', profile_saved_toast: 'プロフィールを保存しました。', profile_sns: 'SNS', profile_unverified: '未確認', profile_verified: '確認済み',
      rain_regen_btn: '選択した日を屋内中心に変更', rain_regen_done: '選択した日を雨天向けの屋内コースに調整しました。', rain_regen_label: '雨天時の屋内コース調整', rain_regen_no_candidates: 'この都市には屋内候補が十分ありません。', rain_regen_no_course: '先に旅程を作成してください。', regen_input_placeholder: '変更したい内容を入力してください…',
      room_max_10: '最大10人', room_max_2: '最大2人', room_max_3: '最大3人', room_max_4: '最大4人', room_max_6: '最大6人', room_max_8: '最大8人', room_max_unlimited: '人数制限なし',
      smoking_no: '非喫煙', smoking_ok: '指定なし', smoking_yes: '喫煙',
      room_create_success: '同行ルームを作成しました！', room_create_failed: '同行ルームを保存できませんでした。入力内容を確認して再試行してください。', room_create_local_only: '同行ルームをこの端末に作成しました。サーバー復旧後に自動同期されます。', room_update_success: '同行ルームを更新しました！', room_update_failed: '変更を保存できませんでした。再試行してください。', room_deleted: '同行ルームを削除しました。', room_full: 'このルームは満員です。', room_left: '同行ルームから退出しました。', room_deleted_by_owner: '作成者が同行ルームを削除しました。', room_removed_by_owner: '作成者によって同行ルームから退出されました。',
      planner_generate_first: '先に旅程を作成してください。', planner_select_destination: '目的地の都市を選択してください。', profile_choose_image: '画像ファイルを選択してください。', profile_image_too_large: '1MB未満のプロフィール画像を選択してください。', profile_photo_reset_toast: 'プロフィール画像を初期状態に戻しました。', chat_no_itinerary: '共有できる旅程がありません。先にコースを作成してください。', chat_itinerary_shared: '旅程をチャットルームに共有しました。',
      itinerary_none_to_save: '保存できる旅程がありません。', itinerary_saved: '旅程を保存しました。', itinerary_updated: '保存済みの旅程を更新しました。', itinerary_none_to_share: '共有できる旅程がありません。', itinerary_delete_confirm: 'この旅行を削除しますか？', action_deleted: '削除しました。', share_link_copied: '🔗 共有リンクをコピーしました！', share_link_failed: '共有リンクを作成できませんでした。', share_link_prompt: '次のリンクをコピーして共有してください：', itinerary_adjusted: '旅程を再調整しました。', itinerary_min_attraction: '1日につき少なくとも1件の観光地が必要です。', itinerary_place_deleted: '場所を削除しました。', itinerary_reordered: '旅程の順序を変更しました。', route_desc: '訪問する都市を追加してください。AIが最短時間の順序と交通手段を、航空便のドアツードア時間を含めて提案します。', route_add_city: '都市を選択...', route_add_btn: '+ 追加', route_empty_hint: '2都市以上を追加してください', route_result_placeholder: '最適ルートを生成します', opt_custom_input: '✏️ 直接入力...', route_analyze_first: '先にルートを分析してください。', shared_route_loaded: '共有ルートを読み込みました。', shared_itinerary_loaded: '共有旅程を読み込みました。', kick_member: '退出させる', shared_course_label: '共有された旅行コース', load_itinerary: '旅程を読み込む', preference_label: '好み'
    },
    es: {
      age_20s: '20–29 años', age_30s: '30–39 años', age_40s: '40–49 años', age_50s: '50–59 años', age_60s: '60 años o más', age_any: 'Cualquier edad',
      alcohol_none: 'Sin alcohol', alcohol_social: 'Ocasionalmente', alcohol_yes: 'Le gusta beber',
      btn_apply: 'Aplicar', chat_joined_notice: 'Se unió a la sala.', chat_room_default_title: 'Chat de compañeros', chat_share_course_title: 'Compartir mi itinerario', chat_title: 'Sala de chat', city_request_sent: 'La solicitud para añadir la ciudad fue enviada.',
      comp_room_age_limit: 'Edad preferida', comp_room_closed: 'Cerrada', comp_room_details: 'Detalles', comp_room_filters: 'Filtros', comp_room_gender_limit: 'Género preferido', comp_room_joined: 'Participando', comp_room_nat_limit: 'Nacionalidad preferida', comp_room_time: 'Horario', comp_room_verify_badge: 'Perfil verificado',
      dash_ref_desc: 'Usamos métodos contrastados de comunidades de viaje para recomendar compañeros compatibles.', dash_ref_title: 'Comunidad de viajes', dash_stat_matches: 'Tasa de coincidencia: 94,2 %', dash_stat_users: '124 000 usuarios acumulados', dash_stat_verified: 'Perfil preparado',
      duration_1: '1 día', duration_2: '2 días', duration_3: '3 días', duration_4: '4 días', duration_5: '5 días', duration_6: '6 días', duration_7: '7 días',
      gender_any: 'Cualquier género', gender_female: 'Mujer', gender_male: 'Hombre', gender_private: 'No mostrar',
      chat_safety_notice: 'Ten cuidado si te piden pasar a una mensajería externa o enviar dinero.',
      dash_welcome: '¿Cuál será tu próximo viaje?', dash_subtitle: 'Ruta con IA y compañía cuando la necesites.', onboard_eyebrow: 'Planifica ahora', onboard_title: 'Elige ciudad y duración', onboard_desc: 'Organiza los lugares esenciales en un orden práctico.', onboard_quick_hint: 'Crea una ruta para esta ciudad.',
      member_no_info: 'Sin información adicional', member_profile_btn: 'Ver perfil', member_profile_title: 'Perfil del participante',
      modal_any: 'Sin preferencia', modal_room_age: 'Rango de edad preferido', modal_room_alcohol: 'Preferencia de alcohol', modal_room_any: 'Sin preferencia', modal_room_language: 'Idiomas preferidos', modal_room_nationality: 'Nacionalidad preferida', modal_room_pref: 'Estilo de viaje', modal_room_smoking: 'Compatibilidad con tabaco',
      nat_any: 'Cualquier nacionalidad', nat_foreign: 'Viajero internacional', nat_korean: 'Coreano', nav_logo: 'TripTogether', pdf_download_started: 'La descarga del PDF ha comenzado.',
      planner_day: 'Día', planner_dest_placeholder: 'Selecciona una ciudad', planner_generating: 'La IA está creando la mejor ruta…',
      profile_gender: 'Género', profile_mbti: 'MBTI', profile_nationality: 'Nacionalidad', profile_saved_toast: 'Perfil guardado.', profile_sns: 'Red social', profile_unverified: 'Sin verificar', profile_verified: 'Verificado',
      rain_regen_btn: 'Convertir el día seleccionado en ruta interior', rain_regen_done: 'El día seleccionado se reorganizó con lugares interiores.', rain_regen_label: 'Ajuste para días de lluvia', rain_regen_no_candidates: 'No hay suficientes lugares interiores en esta ciudad.', rain_regen_no_course: 'Primero genera un itinerario.', regen_input_placeholder: 'Describe el cambio que deseas…',
      room_max_10: 'Máximo 10 personas', room_max_2: 'Máximo 2 personas', room_max_3: 'Máximo 3 personas', room_max_4: 'Máximo 4 personas', room_max_6: 'Máximo 6 personas', room_max_8: 'Máximo 8 personas', room_max_unlimited: 'Sin límite',
      smoking_no: 'No fumador', smoking_ok: 'Sin preferencia', smoking_yes: 'Fumador',
      room_create_success: '¡Sala de compañeros creada!', room_create_failed: 'No se pudo guardar la sala. Revisa el formulario e inténtalo de nuevo.', room_create_local_only: 'La sala se creó en este dispositivo y se sincronizará automáticamente cuando el servidor esté disponible.', room_update_success: '¡Sala actualizada!', room_update_failed: 'No se pudieron guardar los cambios. Inténtalo de nuevo.', room_deleted: 'Sala eliminada.', room_full: 'Esta sala está llena.', room_left: 'Has salido de la sala.', room_deleted_by_owner: 'El creador eliminó esta sala.', room_removed_by_owner: 'El creador te retiró de la sala.',
      planner_generate_first: 'Primero genera un itinerario.', planner_select_destination: 'Selecciona una ciudad de destino.', profile_choose_image: 'Selecciona un archivo de imagen.', profile_image_too_large: 'Selecciona una foto de perfil de menos de 1 MB.', profile_photo_reset_toast: 'La foto de perfil volvió a la imagen predeterminada.', chat_no_itinerary: 'No hay itinerario para compartir. Primero genera una ruta.', chat_itinerary_shared: 'El itinerario se compartió en el chat.',
      itinerary_none_to_save: 'No hay itinerario para guardar.', itinerary_saved: 'Itinerario guardado.', itinerary_updated: 'Itinerario guardado actualizado.', itinerary_none_to_share: 'No hay itinerario para compartir.', itinerary_delete_confirm: '¿Seguro que quieres eliminar este viaje?', action_deleted: 'Eliminado.', share_link_copied: '🔗 ¡Enlace de compartir copiado!', share_link_failed: 'No se pudo crear el enlace de compartir.', share_link_prompt: 'Copia este enlace para compartir:', itinerary_adjusted: 'El itinerario se ajustó correctamente.', itinerary_min_attraction: 'Cada día debe contener al menos una atracción.', itinerary_place_deleted: 'Lugar eliminado.', itinerary_reordered: 'Orden del itinerario actualizado.', route_desc: 'Añade las ciudades que visitarás. La IA recomienda el orden más rápido y los transportes, incluido el tiempo total puerta a puerta de los vuelos.', route_add_city: 'Seleccionar ciudad...', route_add_btn: '+ Añadir', route_empty_hint: 'Añade al menos 2 ciudades', route_result_placeholder: 'para obtener la ruta óptima', opt_custom_input: '✏️ Entrada directa...', route_analyze_first: 'Primero analiza la ruta.', shared_route_loaded: 'Ruta compartida cargada.', shared_itinerary_loaded: 'Itinerario compartido cargado.', kick_member: 'Expulsar', shared_course_label: 'Ruta compartida', load_itinerary: 'Cargar itinerario', preference_label: 'Preferencias'
    }
  };
  Object.entries(strictLanguagePatches).forEach(([lang, patch]) => {
    TRANSLATIONS[lang] = { ...(TRANSLATIONS[lang] || {}), ...patch };
  });
  Object.keys(TRANSLATIONS).forEach(lang => {
    const table = TRANSLATIONS[lang];
    if (!table || typeof table !== 'object') return;
    Object.keys(en).forEach(key => {
      if (table[key] !== undefined) return;
      if (lang === 'en') {
        table[key] = en[key];
        return;
      }
      const localized = localizeRuntimeText(en[key]);
      if (localized !== en[key]) {
        table[key] = localized;
        return;
      }
      const missingLabels = { ko: '표시할 수 없는 문구', fr: 'Libellé indisponible', zh: '文本暂不可用', ja: '表示できない文言', es: 'Texto no disponible' };
      table[key] = missingLabels[lang] || key;
      console.warn(`Missing ${lang} translation for key: ${key}`);
    });
    Object.keys(table).forEach(key => {
      if (typeof table[key] === 'string') table[key] = cleanUiText(table[key]);
    });
  });
}

function ensureProfileDefaults() {
  if (!state.activeProfile) state.activeProfile = {};
  const profile = state.activeProfile;
  profile.name = repairMojibakeText(profile.name || `\uC5EC\uD589\uC790_${initialRandNum}`);
  if (!profile.name || /[ÃƒÃ‚Ã¢Ã°]/.test(profile.name)) profile.name = `\uC5EC\uD589\uC790_${initialRandNum}`;
  profile.nameEn = profile.nameEn || `Traveler_${initialRandNum}`;
  profile.ageRange = profile.ageRange || profile.age || '30s';
  profile.gender = repairMojibakeText(profile.gender || '\uB0A8\uC131');
  profile.languages = repairMojibakeText(profile.languages || '\uD55C\uAD6D\uC5B4, English');
  profile.smoking = profile.smoking || 'no';
  profile.alcohol = profile.alcohol || 'social';
  profile.mbti = profile.mbti || 'ESFP';
  profile.verified = !!profile.verified;
  profile.avatarDataUrl = profile.avatarDataUrl || '';
}

function fetchWithTimeout(url, options = {}, timeoutMs = REMOTE_SYNC_TIMEOUT_MS) {
  if (typeof AbortController === 'undefined') {
    return fetch(url, options);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

async function fetchRemotePayload() {
  if (!REMOTE_SYNC_ENABLED) {
    return { rooms: [], chatLogs: {}, cityRequests: [], feedbacks: [] };
  }
  const urlWithCacheBuster = REMOTE_GET_URL + '?t=' + Date.now();
  const res = await fetchWithTimeout(urlWithCacheBuster, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
  if (!res.ok) throw new Error("HTTP error " + res.status);
  const data = await res.json();
  return pruneExpiredRemotePayload({
    rooms: Array.isArray(data && data.rooms) ? data.rooms : [],
    chatLogs: data && data.chatLogs ? data.chatLogs : {},
    cityRequests: Array.isArray(data && data.cityRequests) ? data.cityRequests : [],
    feedbacks: Array.isArray(data && data.feedbacks) ? data.feedbacks : []
  });
}

function isRoomExpired(room) {
  if (!room || !room.date) return false;
  const roomEndOfDay = new Date(`${room.date}T23:59:59.999`);
  if (Number.isNaN(roomEndOfDay.getTime())) return false;
  return roomEndOfDay.getTime() < Date.now();
}

function pruneExpiredRemotePayload(payload) {
  const activeRooms = [];
  const expiredIds = new Set();
  (payload.rooms || []).forEach(room => {
    if (isRoomExpired(room)) {
      expiredIds.add(String(room.id));
    } else {
      activeRooms.push(room);
    }
  });
  const chatLogs = { ...(payload.chatLogs || {}) };
  expiredIds.forEach(id => delete chatLogs[id]);
  return {
    rooms: activeRooms,
    chatLogs,
    cityRequests: Array.isArray(payload.cityRequests) ? payload.cityRequests : [],
    feedbacks: normalizeFeedbackCollection(payload.feedbacks)
  };
}

const LEGACY_TEST_FEEDBACK_IDS = new Set([
  'feedback-1783887539379-t59ej7',
  'feedback-1783885879766-9zl97i',
  'feedback-1783857619640-5pivdc'
]);

const LEGACY_TEST_FEEDBACK_TEXTS = new Set([
  'anonymous-feedback-qa',
  'mobile feedback verification'
]);

function isLegacyTestFeedback(entry) {
  if (!entry || typeof entry !== 'object') return false;
  if (LEGACY_TEST_FEEDBACK_IDS.has(String(entry.id || ''))) return true;
  return LEGACY_TEST_FEEDBACK_TEXTS.has(String(entry.text || '').trim().toLowerCase());
}

function normalizeFeedbackCollection(entries) {
  const byId = new Map();
  (Array.isArray(entries) ? entries : []).forEach(entry => {
    if (!entry || !entry.id) return;
    if (isLegacyTestFeedback(entry)) return;
    const timestamp = Number(entry.timestamp) || 0;
    byId.set(String(entry.id), {
      id: String(entry.id),
      name: cleanUiText(String(entry.name || '')).slice(0, 30),
      text: cleanUiText(String(entry.text || '')).slice(0, 500),
      rating: Math.max(1, Math.min(5, Number(entry.rating) || 1)),
      timestamp,
      updatedAt: Number(entry.updatedAt) || 0,
      lang: normalizeLanguageCode(entry.lang || 'en')
    });
  });
  return Array.from(byId.values())
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 50);
}

function getPublicProfileSnapshot(profile = state.activeProfile) {
  const p = profile || {};
  return {
    name: repairMojibakeText(p.name || ''),
    ageRange: p.ageRange || p.age || '30s',
    gender: repairMojibakeText(p.gender || ''),
    languages: repairMojibakeText(p.languages || ''),
    smoking: p.smoking || 'no',
    alcohol: p.alcohol || 'social',
    mbti: p.mbti || '',
    verified: !!p.verified,
    avatarDataUrl: p.avatarDataUrl || '',
    sns: p.sns || 'None'
  };
}

function repairMojibakeDeep(value, key = '', seen = new WeakSet()) {
  if (typeof value === 'string') {
    if (/dataurl|avatar|image|photo/i.test(key) || value.startsWith('data:image/')) return value;
    return repairMojibakeText(value);
  }
  if (!value || typeof value !== 'object') return value;
  if (seen.has(value)) return value;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = repairMojibakeDeep(item, key, seen);
    });
    return value;
  }
  Object.keys(value).forEach(childKey => {
    value[childKey] = repairMojibakeDeep(value[childKey], childKey, seen);
  });
  return value;
}

function repairStateMojibake() {
  repairMojibakeDeep(state.activeProfile, 'activeProfile');
  repairMojibakeDeep(state.rooms, 'rooms');
  repairMojibakeDeep(state.chatLogs, 'chatLogs');
  repairMojibakeDeep(state.cityRequests, 'cityRequests');
  repairMojibakeDeep(state.feedbacks, 'feedbacks');
  repairMojibakeDeep(state.activeCourse, 'activeCourse');
  repairMojibakeDeep(state.savedCourses, 'savedCourses');
}

function normalizeRoomRecord(room) {
  if (!room) return room;
  const normalized = repairMojibakeDeep({ ...room }, 'room');
  const members = Array.isArray(normalized.joinedUsers) ? [...normalized.joinedUsers] : [];
  const creatorName = normalized.creator && normalized.creator.name;
  if (creatorName && !members.includes(creatorName)) {
    members.unshift(creatorName);
  }
  normalized.joinedUsers = Array.from(new Set(members.filter(Boolean)));
  normalized.joinedCount = normalized.joinedUsers.length;
  normalized.memberProfiles = normalized.memberProfiles && typeof normalized.memberProfiles === 'object'
    ? { ...normalized.memberProfiles }
    : {};
  if (creatorName) {
    normalized.creator = { ...getPublicProfileSnapshot(normalized.creator), ...normalized.creator };
    normalized.memberProfiles[creatorName] = getPublicProfileSnapshot(normalized.creator);
  }
  return normalized;
}


function mergeRemoteRoomsWithPending(remoteRooms, localRooms = state.rooms) {
  const remoteById = new Map((remoteRooms || []).filter(Boolean).map(room => {
    const normalized = normalizeRoomRecord(room);
    normalized.pendingSync = false;
    return [String(normalized.id), normalized];
  }));
  (localRooms || []).filter(room => room && room.pendingSync).forEach(room => {
    const key = String(room.id);
    if (!remoteById.has(key)) remoteById.set(key, normalizeRoomRecord(room));
  });
  return Array.from(remoteById.values());
}

function stripRoomSyncMetadata(room) {
  const cleanRoom = { ...room };
  delete cleanRoom.pendingSync;
  return cleanRoom;
}

function mergeRemotePayload(localPayload, remotePayload, options = {}) {
  const deletedRoomIds = new Set((options.deletedRoomIds || []).map(String));
  const deletedFeedbackIds = new Set((options.deletedFeedbackIds || []).map(String));
  const replaceMembershipRoomIds = new Set((options.replaceMembershipRoomIds || []).map(String));
  const roomsById = new Map();

  (remotePayload.rooms || []).forEach(room => {
    if (!room || deletedRoomIds.has(String(room.id))) return;
    roomsById.set(String(room.id), normalizeRoomRecord(room));
  });

  (localPayload.rooms || []).forEach(room => {
    if (!room || deletedRoomIds.has(String(room.id))) {
      if (room && room.id !== undefined) roomsById.delete(String(room.id));
      return;
    }
    const key = String(room.id);
    const localRoom = normalizeRoomRecord(room);
    const remoteRoom = roomsById.get(key);
    if (!remoteRoom) {
      roomsById.set(key, localRoom);
      return;
    }

    const merged = { ...remoteRoom, ...localRoom };
    const remoteMembers = Array.isArray(remoteRoom.joinedUsers) ? remoteRoom.joinedUsers : [];
    const localMembers = Array.isArray(localRoom.joinedUsers) ? localRoom.joinedUsers : [];
    merged.joinedUsers = replaceMembershipRoomIds.has(key)
      ? Array.from(new Set(localMembers.filter(Boolean)))
      : Array.from(new Set([...remoteMembers, ...localMembers].filter(Boolean)));
    if (merged.creator && merged.creator.name && !merged.joinedUsers.includes(merged.creator.name)) {
      merged.joinedUsers.unshift(merged.creator.name);
    }
    merged.memberProfiles = {
      ...(remoteRoom.memberProfiles || {}),
      ...(localRoom.memberProfiles || {})
    };
    merged.joinedUsers.forEach(username => {
      if (!merged.memberProfiles[username]) {
        merged.memberProfiles[username] = getPublicProfileSnapshot(
          username === (merged.creator && merged.creator.name) ? merged.creator : { name: username }
        );
      }
    });
    merged.joinedCount = merged.joinedUsers.length;
    roomsById.set(key, merged);
  });

  const chatLogs = mergeChatLogs(localPayload.chatLogs || {}, remotePayload.chatLogs || {});
  deletedRoomIds.forEach(roomId => delete chatLogs[roomId]);
  const requestMap = new Map();
  [...(remotePayload.cityRequests || []), ...(localPayload.cityRequests || [])].forEach(req => {
    if (!req) return;
    const key = req.id || `${req.cityName || ''}|${req.createdAt || ''}|${req.source || ''}`;
    requestMap.set(String(key), req);
  });
  const feedbackMap = new Map();
  [...(remotePayload.feedbacks || []), ...(localPayload.feedbacks || [])].forEach(entry => {
    if (!entry || !entry.id || deletedFeedbackIds.has(String(entry.id))) return;
    feedbackMap.set(String(entry.id), entry);
  });

  return pruneExpiredRemotePayload({
    rooms: Array.from(roomsById.values()),
    chatLogs,
    cityRequests: Array.from(requestMap.values()),
    feedbacks: Array.from(feedbackMap.values())
  });
}

function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn("Failed to persist localStorage key:", key, err);
  }
}

function safeGetLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.warn("Failed to read localStorage key:", key, err);
    return null;
  }
}

function safeRemoveLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn("Failed to remove localStorage key:", key, err);
  }
}

function safeGetStoredJson(key, fallbackValue) {
  const raw = safeGetLocalStorage(key);
  if (!raw) return fallbackValue;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Ignoring corrupted localStorage key:", key, err);
    safeRemoveLocalStorage(key);
    return fallbackValue;
  }
}

function applySharedLanguage(lang) {
  const nextLang = normalizeLanguageCode(lang);
  if (!isSupportedLanguage(nextLang)) return;
  state.lang = nextLang;
  document.documentElement.lang = nextLang;
  safeSetLocalStorage('wander_lang', nextLang);
  if (typeof setupUIStrings === 'function') {
    setupUIStrings();
  }
}

function getSharedLinkErrorText() {
  return getInlineText({
    ko: '공유된 여행 정보를 불러오지 못했습니다. 링크가 잘리지 않았는지 확인해주세요.',
    en: 'Could not load the shared trip. Check that the link is complete.',
    fr: "Impossible de charger le voyage partagé. Vérifiez que le lien est complet.",
    zh: '无法加载共享旅行。请确认链接完整。',
    ja: '共有された旅行を読み込めませんでした。リンクが完全か確認してください。',
    es: 'No se pudo cargar el viaje compartido. Comprueba que el enlace esté completo.'
  });
}

function restoreDecodedSharedPayload(payload, expectedView = '') {
  if (!payload || typeof payload !== 'object') return false;
  if (payload.lang && isSupportedLanguage(payload.lang)) applySharedLanguage(payload.lang);

  const isRoute = payload.type === 'route' || payload.isRoute;
  if (isRoute) {
    const routeCities = payload.cities || payload.optimized || payload.displayCities;
    if (!Array.isArray(routeCities) || routeCities.length < 2 || typeof restoreRouteStateFromPayload !== 'function') return false;
    restoreRouteStateFromPayload(payload);
    state.currentView = 'routeplanner';
    state.activeCourse = null;
    state.editingSavedCourseId = null;
    saveToLocalStorage();
    updateView();
    showToast(getText('shared_route_loaded'));
    return true;
  }

  if (payload.days && (payload.cityName || payload.cityId)) {
    normalizeCourseMetadata(payload);
    state.activeCourse = payload;
    state.editingSavedCourseId = null;
    state.currentItineraryDay = 1;
    state.currentView = 'planner';
    syncPlannerControlsFromCourse(payload);
    saveToLocalStorage();
    updateView();
    renderItinerary(payload);
    showToast(getText('shared_itinerary_loaded'));
    return true;
  }

  if (expectedView === 'routeplanner' || expectedView === 'planner') state.currentView = expectedView;
  return false;
}

async function restoreCompactSharedLink(encodedPayload, expectedView) {
  try {
    const payload = await decodeSharePayloadFromUrl(encodedPayload);
    if (!restoreDecodedSharedPayload(payload, expectedView)) throw new Error('Invalid shared payload.');
    window.history.replaceState(null, '', window.location.pathname);
  } catch (error) {
    console.error('Failed to restore compact share link:', error);
    state.currentView = expectedView === 'routeplanner' ? 'routeplanner' : 'planner';
    updateView();
    showToast(getSharedLinkErrorText());
  }
}

function renderRouteOptimizerFallback(error) {
  const container = document.getElementById('routeOptimizerContainer');
  if (!container) return;
  console.error('Route optimizer render failed:', error);
  container.innerHTML = `
    <div class="route-optimizer-wrap">
      <h2 class="route-title">${getInlineText({ ko: 'AI 도시간 동선 짜기', en: 'AI Multi-City Route Planner', fr: 'AI - trajets entre villes', zh: 'AI城市间路线规划', ja: 'AI都市間ルート', es: 'Rutas IA entre ciudades' })}</h2>
      <p class="route-desc">${getInlineText({ ko: '화면을 불러오는 중 문제가 생겼습니다. 다시 시도하면 현재 저장된 도시 목록으로 동선을 이어서 불러옵니다.', en: 'Something went wrong while loading this planner. Try again to reload your saved city list.', fr: "Impossible de charger cet écran. Réessayez pour récupérer votre liste de villes.", zh: '加载路线规划时出现问题。重试后会恢复已保存的城市列表。', ja: '画面の読み込み中に問題が発生しました。再試行すると保存済みの都市リストを読み込みます。', es: 'Hubo un problema al cargar esta pantalla. Inténtalo de nuevo para recuperar tu lista de ciudades.' })}</p>
      <div class="route-empty-hint">
        <p>${getInlineText({ ko: '빈 화면으로 멈추지 않도록 복구 화면을 표시했습니다.', en: 'Recovery view shown instead of leaving the page blank.', fr: "Une vue de récupération s'affiche au lieu d'un écran vide.", zh: '已显示恢复页面，避免空白页面。', ja: '空白画面で止まらないよう復旧画面を表示しました。', es: 'Se muestra una vista de recuperación en lugar de una pantalla en blanco.' })}</p>
        <button type="button" class="route-add-btn" onclick="safeRenderRouteOptimizerTab()">${getInlineText({ ko: '다시 불러오기', en: 'Reload Planner', fr: 'Recharger', zh: '重新加载', ja: '再読み込み', es: 'Recargar' })}</button>
      </div>
    </div>
  `;
}

function safeRenderRouteOptimizerTab() {
  if (typeof renderRouteOptimizerTab !== 'function') return false;
  try {
    renderRouteOptimizerTab();
    return true;
  } catch (error) {
    renderRouteOptimizerFallback(error);
    return false;
  }
}

// --- Message Helper ---
function createMessageObject({ sender, mbti, text, system = false }) {
  return {
    id: Math.random().toString(36).substring(2, 11) + '-' + Date.now(),
    timestamp: Date.now(),
    system,
    sender: cleanUiText(sender || ''),
    mbti: cleanUiText(mbti || ''),
    text: cleanUiText(text || '')
  };
}

function mergeChatLogs(localLogs, remoteLogs) {
  const merged = {};
  const allRoomIds = new Set([...Object.keys(localLogs), ...Object.keys(remoteLogs)]);
  
  for (const roomId of allRoomIds) {
    const local = localLogs[roomId] || [];
    const remote = remoteLogs[roomId] || [];
    
    const mergedRoomLogs = [...remote];
    local.forEach(localMsg => {
      const exists = remote.some(remoteMsg => {
        if (localMsg.id && remoteMsg.id) {
          return localMsg.id === remoteMsg.id;
        }
        return localMsg.sender === remoteMsg.sender && 
               localMsg.text === remoteMsg.text && 
               Math.abs((localMsg.timestamp || 0) - (remoteMsg.timestamp || 0)) < 2000;
      });
      if (!exists) {
        mergedRoomLogs.push(localMsg);
      }
    });
    
    mergedRoomLogs.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    merged[roomId] = mergedRoomLogs;
  }
  return merged;
}

async function pullFromRemote() {
  if (!REMOTE_SYNC_ENABLED) return false;
  try {
    const data = await fetchRemotePayload();
    if (data && Array.isArray(data.rooms)) {
      state.rooms = mergeRemoteRoomsWithPending(data.rooms, state.rooms);
      state.chatLogs = mergeChatLogs(state.chatLogs, data.chatLogs || {});
      state.cityRequests = Array.isArray(data.cityRequests) ? data.cityRequests : [];
      let mergedFeedbacks = normalizeFeedbackCollection([...(state.feedbacks || []), ...(data.feedbacks || [])]);
      if (typeof pendingFeedbackDeletes !== 'undefined' && pendingFeedbackDeletes.size) {
        mergedFeedbacks = mergedFeedbacks.filter(entry => !pendingFeedbackDeletes.has(entry.id));
      }
      if (typeof pendingFeedbackEdits !== 'undefined' && pendingFeedbackEdits.size) {
        mergedFeedbacks = normalizeFeedbackCollection([
          ...Array.from(pendingFeedbackEdits.values()),
          ...mergedFeedbacks.filter(entry => !pendingFeedbackEdits.has(entry.id))
        ]);
      }
      state.feedbacks = mergedFeedbacks;
      repairStateMojibake();
      
      // Auto-kick / room-deleted logic
      if (state.joinedRoomId !== null) {
        const joinedRoom = state.rooms.find(r => r.id === state.joinedRoomId);
        if (!joinedRoom) {
          // Room was deleted
          state.joinedRoomId = null;
          if (state.currentView === 'chat') {
            state.currentView = 'companions';
            updateView();
            showToast(getText('room_deleted_by_owner'));
          }
        } else if (joinedRoom.joinedUsers && !joinedRoom.joinedUsers.includes(state.activeProfile.name)) {
          // User was kicked from the room
          state.joinedRoomId = null;
          if (state.currentView === 'chat') {
            state.currentView = 'companions';
            updateView();
            showToast(getText('room_removed_by_owner'));
          }
        }
      }

      renderCompanionRooms();
      renderFeedbackList();
      if (state.currentView === 'chat' && state.joinedRoomId !== null) {
        renderChatRoom();
      }
      saveToLocalStorage();
    }
  } catch (err) {
    console.error("Failed to pull from remote:", err);
  }
}

async function pushToRemote(options = {}) {
  remotePushQueue = remotePushQueue
    .catch(() => {})
    .then(() => pushToRemoteNow(options));
  return remotePushQueue;
}

async function pushToRemoteNow(options = {}) {
  if (!REMOTE_SYNC_ENABLED) {
    state.rooms = state.rooms.map(room => ({ ...room, pendingSync: false }));
    saveToLocalStorage();
    return true;
  }
  try {
    repairStateMojibake();
    const localPayload = {
      rooms: state.rooms.map(stripRoomSyncMetadata),
      chatLogs: state.chatLogs,
      cityRequests: state.cityRequests || [],
      feedbacks: normalizeFeedbackCollection(state.feedbacks)
    };
    let payload = localPayload;
    try {
      const remotePayload = await fetchRemotePayload();
      payload = mergeRemotePayload(localPayload, remotePayload, options);
    } catch (mergeErr) {
      console.warn("Remote pre-merge skipped:", mergeErr);
    }

    const res = await fetchWithTimeout(REMOTE_PUT_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        json_payload: payload
      })
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    state.rooms = payload.rooms.map(room => ({ ...normalizeRoomRecord(room), pendingSync: false }));
    state.chatLogs = mergeChatLogs(state.chatLogs, payload.chatLogs || {});
    state.cityRequests = Array.isArray(payload.cityRequests) ? payload.cityRequests : [];
    state.feedbacks = normalizeFeedbackCollection(payload.feedbacks);
    repairStateMojibake();
    saveToLocalStorage();
    return true;
  } catch (err) {
    console.error("Failed to push to remote:", err);
    saveToLocalStorage();
    return false;
  }
}

// --- Initialization ---
function installCoreNavigationFallback() {
  if (window.__wanderCoreNavigationFallbackInstalled) return;
  window.__wanderCoreNavigationFallbackInstalled = true;

  function showCoreView(target) {
    const view = document.getElementById(target + '-view');
    if (!view) return;

    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.toggle('active', section === view);
    });
    document.querySelectorAll('.nav-tab-btn[data-target]').forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-target') === target);
    });
    if (typeof state !== 'undefined' && target !== 'chat') {
      state.currentView = target;
    }

    if (target === 'routeplanner' && typeof safeRenderRouteOptimizerTab === 'function') {
      safeRenderRouteOptimizerTab();
    }
    if (target === 'planner') {
      const plannerDest = document.getElementById('plannerDest');
      if (plannerDest && typeof updateLodgingSelector === 'function') {
        updateLodgingSelector(plannerDest.value);
      }
    }
  }

  document.addEventListener('click', event => {
    const button = event.target && event.target.closest && event.target.closest('.nav-tab-btn[data-target]');
    if (button) {
      const target = button.getAttribute('data-target');
      if (!target) return;

      setTimeout(() => {
        const activeButton = document.querySelector('.nav-tab-btn.active');
        if (!activeButton || activeButton.getAttribute('data-target') !== target) {
          showCoreView(target);
        } else if (target === 'routeplanner' && typeof safeRenderRouteOptimizerTab === 'function') {
          const routeContainer = document.getElementById('routeOptimizerContainer');
          if (routeContainer && !routeContainer.textContent.trim()) {
            safeRenderRouteOptimizerTab();
          }
        }
      }, 0);
      return;
    }

    const prefChip = event.target && event.target.closest && event.target.closest('.pref-chip');
    if (prefChip) {
      const wasSelected = prefChip.classList.contains('selected');
      setTimeout(() => {
        if (prefChip.classList.contains('selected') === wasSelected) {
          prefChip.classList.toggle('selected');
        }
      }, 0);
      return;
    }

    const generateButton = event.target && event.target.closest && event.target.closest('#generateItineraryBtn');
    if (generateButton && typeof generateItinerary === 'function') {
      setTimeout(() => {
        const loader = document.getElementById('itineraryLoader');
        if (!loader || loader.style.display !== 'flex') {
          generateItinerary();
        }
      }, 0);
    }
  }, true);

  document.addEventListener('change', event => {
    if (!event.target || event.target.id !== 'plannerDest') return;
    const cityId = event.target.value;
    if (typeof beginPlannerDraftForCity === 'function') {
      beginPlannerDraftForCity(cityId);
    }
    if (typeof updateLodgingSelector === 'function') {
      updateLodgingSelector(cityId, { preserveSelection: false });
    }
  }, true);
}

function recoverCurrentViewAfterError() {
  try {
    const target = (typeof state !== 'undefined' && state.currentView) ? state.currentView : 'dashboard';
    const view = document.getElementById(target + '-view') || document.getElementById('dashboard-view');
    if (view && !view.classList.contains('active')) {
      document.querySelectorAll('.view-section').forEach(section => {
        section.classList.toggle('active', section === view);
      });
      document.querySelectorAll('.nav-tab-btn[data-target]').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-target') === target);
      });
    }
    if (target === 'routeplanner') {
      const container = document.getElementById('routeOptimizerContainer');
      if (!container || !container.textContent.trim() || !document.getElementById('routeCitySelect')) {
        safeRenderRouteOptimizerTab();
      }
    }
    if (target === 'planner' && state.activeCourse) {
      const tabs = document.getElementById('itineraryDayTabs');
      const timeline = document.getElementById('itineraryTimelineList');
      if (tabs && timeline && (!tabs.textContent.trim() || !timeline.textContent.trim())) {
        renderItinerary(state.activeCourse);
      }
    }
  } catch (recoverErr) {
    console.error('View recovery failed:', recoverErr);
  }
}

function installGlobalErrorRecovery() {
  if (window.__wanderGlobalErrorRecoveryInstalled) return;
  window.__wanderGlobalErrorRecoveryInstalled = true;
  window.addEventListener('error', event => {
    console.error('Recovered from UI error:', event.error || event.message);
    setTimeout(recoverCurrentViewAfterError, 0);
  });
  window.addEventListener('unhandledrejection', event => {
    console.error('Recovered from async UI error:', event.reason);
    setTimeout(recoverCurrentViewAfterError, 0);
  });
}

function startViewHealthMonitor() {
  if (window.__wanderViewHealthMonitorStarted) return;
  window.__wanderViewHealthMonitorStarted = true;
  setInterval(() => {
    try {
      const activeView = document.querySelector('.view-section.active');
      if (!activeView) {
        recoverCurrentViewAfterError();
        return;
      }
      if (state.currentView === 'routeplanner') {
        const container = document.getElementById('routeOptimizerContainer');
        if (!container || !container.textContent.trim() || !document.getElementById('routeCitySelect')) {
          safeRenderRouteOptimizerTab();
        }
      }
      if (state.currentView === 'planner' && state.activeCourse) {
        const tabs = document.getElementById('itineraryDayTabs');
        const timeline = document.getElementById('itineraryTimelineList');
        if (tabs && timeline && (!tabs.textContent.trim() || !timeline.textContent.trim())) {
          renderItinerary(state.activeCourse);
        }
      }
    } catch (err) {
      console.error('View health monitor recovered from error:', err);
    }
  }, 1500);
}

function init() {
  installCoreNavigationFallback();
  installGlobalErrorRecovery();
  applyEnhancedTranslations();
  ensureEnhancedControls();
  installNativeDialogSanitizers();
  installMojibakeRepairObserver();
  if (typeof initializeTravelDatabase === 'function') {
    initializeTravelDatabase();
  }
  dedupeAllAttractionPools();
  loadFromLocalStorage();
  setupUIStrings();
  setupEventListeners();
  initFeedbackSystem();
  renderPopularDestinations();
  renderCitySelectors();
  renderCompanionRooms();
  
  // Parse shared query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const compactShareData = urlParams.get('shared');
  if (compactShareData) {
    const expectedView = urlParams.get('view') === 'routeplanner' ? 'routeplanner' : 'planner';
    state.currentView = expectedView;
    if (expectedView === 'routeplanner') state.activeCourse = null;
    updateView();
    restoreCompactSharedLink(compactShareData, expectedView);
  }
  const shareData = compactShareData ? null : urlParams.get('share');
  if (shareData) {
    try {
      const sharedCourse = decodeSharePayload(shareData);
      if (sharedCourse && isSupportedLanguage(sharedCourse.lang)) {
        applySharedLanguage(sharedCourse.lang);
      }
      if (sharedCourse && (sharedCourse.isRoute || sharedCourse.type === 'route')) {
        if (typeof restoreRouteStateFromPayload === 'function') {
          restoreRouteStateFromPayload(sharedCourse);
        } else if (typeof routeState !== 'undefined') {
          routeState.cities = sharedCourse.displayCities || sharedCourse.optimized || sharedCourse.originalCities || [];
          routeState.startCityId = sharedCourse.startCityId || null;
          routeState.endCityId = sharedCourse.endCityId || null;
          routeState.lastResult = {
            optimized: sharedCourse.optimized || sharedCourse.displayCities || [],
            segments: sharedCourse.segments || [],
            totalTime: sharedCourse.totalTime || 0
          };
          routeState.usePreloadedOrder = true;
          routeState.preserveLoadedOrder = true;
        }
        state.currentView = 'routeplanner';
        state.activeCourse = null;
        state.editingSavedCourseId = null;
        
        saveToLocalStorage();
        updateView();
        // Only clear the share payload after the route view has rendered successfully.
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        
        showToast(getText('shared_route_loaded'));
      } else if (sharedCourse && sharedCourse.days && (sharedCourse.cityName || sharedCourse.cityId)) {
        normalizeCourseMetadata(sharedCourse);
        state.activeCourse = sharedCourse;
        state.editingSavedCourseId = null;
        state.currentItineraryDay = 1;
        state.currentView = 'planner';
        syncPlannerControlsFromCourse(sharedCourse);
        
        saveToLocalStorage();
        updateView();
        renderItinerary(state.activeCourse);
        // Only clear the share payload after the itinerary has rendered successfully.
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        
        showToast(getText('shared_itinerary_loaded'));
      }
    } catch (e) {
      console.error("Failed to decode shared itinerary:", e);
    }
  }

  // Handle hash-based sharing: #itinerary= for itineraries, #share= for routes
  const hash = window.location.hash;
  if (hash && !compactShareData) {
    if (hash.startsWith('#share=')) {
      // Route share - just set view, let renderRouteOptimizerTab() handle the rest
      try {
        const payload = decodeSharePayload(hash.slice(7));
        if (payload && isSupportedLanguage(payload.lang)) {
          applySharedLanguage(payload.lang);
        }
        if (payload.type === 'route' && Array.isArray(payload.cities) && payload.cities.length >= 2) {
          if (typeof restoreRouteStateFromPayload === 'function') {
            restoreRouteStateFromPayload(payload);
          }
          state.currentView = 'routeplanner';
          state.activeCourse = null;
          state.editingSavedCourseId = null;
          updateView();
        }
      } catch(e) {
        console.error('Failed to parse share hash in init:', e);
      }
    } else if (hash.startsWith('#itinerary=')) {
      // Itinerary share
      try {
        const sharedCourse = decodeSharePayload(hash.slice(11));
        if (sharedCourse && isSupportedLanguage(sharedCourse.lang)) {
          applySharedLanguage(sharedCourse.lang);
        }
        if (sharedCourse && sharedCourse.days && (sharedCourse.cityName || sharedCourse.cityId)) {
          normalizeCourseMetadata(sharedCourse);
          state.activeCourse = sharedCourse;
          state.editingSavedCourseId = null;
          state.currentItineraryDay = 1;
          state.currentView = 'planner';
          syncPlannerControlsFromCourse(sharedCourse);
          
          saveToLocalStorage();
          updateView();
          // Render the shared itinerary immediately
          renderItinerary(state.activeCourse);
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          showToast(getText('shared_itinerary_loaded'));
        }
      } catch(e) {
        console.error('Failed to parse itinerary hash in init:', e);
      }
    }
  }

  // Populate lodging selector for the initial city selection
  const selectPlanner = document.getElementById('plannerDest');
  if (selectPlanner) {
    if (state.activeCourse && state.currentView === 'planner') {
      syncPlannerControlsFromCourse(state.activeCourse);
    } else {
      updateLodgingSelector(selectPlanner.value);
    }
  }
  
  // Render saved courses
  renderSavedCoursesList();

  updateView();
  startViewHealthMonitor();
  if (state.currentView === 'chat' && state.joinedRoomId !== null) {
    renderChatRoom();
  }

  // Initial pull from remote
  pullFromRemote().then(() => {
    // If the remote server is completely fresh or has no valid rooms, seed it with the default mock rooms!
    if (state.rooms.length === 0 || (state.rooms.length === 1 && state.rooms[0].title === "Test")) {
      state.rooms = [...MOCK_COMPANION_ROOMS];
      state.chatLogs = {};
      state.rooms.forEach(room => {
        const welcomeMsg = getRoomSystemMessage('welcome', { name: room.creator.name });
        
        state.chatLogs[room.id] = [
          createMessageObject({ text: welcomeMsg, system: true })
        ];
      });
      pushToRemote();
    }
  });

  // Periodically pull remote updates with jitter so many users do not sync at once.
  const syncIntervalMs = 12000 + Math.floor(Math.random() * 4000);
  setInterval(pullFromRemote, syncIntervalMs);
}

// --- Local Storage Integration ---
const FOREIGN_PLACE_ALIAS_GROUPS = {
  anaheim: ['anaheim'],
  bangkok: ['bangkok'],
  beijing: ['beijing', 'beijing national stadium', 'bird nest', "bird's nest", '베이징', '북경'],
  barcelona: ['barcelona'],
  hongkong: ['hong kong', 'hongkong'],
  houston: ['houston'],
  lasvegas: ['las vegas'],
  london: ['london'],
  losangeles: ['los angeles'],
  munich: ['munich'],
  newyork: ['new york', 'nyc', 'manhattan', 'brooklyn'],
  osaka: ['osaka'],
  paris: ['paris'],
  rome: ['rome'],
  seoul: ['seoul', '서울'],
  shanghai: ['shanghai', '상하이', '상해'],
  singapore: ['singapore'],
  sydney: ['sydney'],
  tokyo: ['tokyo']
};

const PLACE_SPECIFIC_CITY_PATTERNS = [
  { allowed: ['beijing'], patterns: [/\bbeijing national stadium\b/i, /\bbird'?s nest\b/i] },
  { allowed: ['losangeles', 'anaheim'], patterns: [/\bhonda center\b/i, /\banaheim\b/i] },
  { allowed: ['seoul'], patterns: [/\bbts\b/i, /\bhybe\b/i] }
];

function escapeRegExpLiteral(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesPlaceAlias(text, alias) {
  if (!text || !alias) return false;
  const haystack = String(text).toLowerCase();
  const needle = String(alias).trim().toLowerCase();
  if (!needle) return false;
  if (/^[a-z0-9\s'.-]+$/.test(needle)) {
    const escaped = escapeRegExpLiteral(needle).replace(/\s+/g, '\\s+');
    return new RegExp(`(^|[^a-z0-9])${escaped}(?=[^a-z0-9]|$)`, 'i').test(haystack);
  }
  return haystack.includes(needle);
}

function getCityAliasSet(cityId) {
  const aliases = new Set();
  if (cityId) aliases.add(String(cityId).toLowerCase());
  const manual = FOREIGN_PLACE_ALIAS_GROUPS[cityId] || [];
  manual.forEach(alias => aliases.add(String(alias).toLowerCase()));
  if (Array.isArray(CITIES)) {
    const city = CITIES.find(c => c && c.id === cityId);
    if (city) {
      [city.id, city.name_en, city.name_ko].filter(Boolean).forEach(alias => {
        aliases.add(String(alias).toLowerCase());
      });
    }
  }
  return aliases;
}

function titleMentionsForeignCity(item, cityId) {
  if (!cityId) return false;
  const titleText = `${item?.name_ko || ''} ${item?.name_en || ''} ${item?.name || ''}`.trim();
  if (!titleText) return false;
  const ownAliases = getCityAliasSet(cityId);
  return Object.entries(FOREIGN_PLACE_ALIAS_GROUPS).some(([otherCityId, aliases]) => {
    if (otherCityId === cityId) return false;
    if (ownAliases.has(otherCityId)) return false;
    return aliases.some(alias => matchesPlaceAlias(titleText, alias));
  });
}

function matchesPlaceSpecificForeignPattern(item, cityId) {
  const text = `${item?.name_ko || ''} ${item?.name_en || ''} ${item?.name || ''} ${item?.desc_ko || ''} ${item?.desc_en || ''}`.toLowerCase();
  if (!text.trim()) return false;
  return PLACE_SPECIFIC_CITY_PATTERNS.some(rule => {
    if (rule.allowed.includes(cityId)) return false;
    return rule.patterns.some(pattern => pattern.test(text));
  });
}

function isTooFarFromBaseCity(item, cityId) {
  if (!item || !cityId || item.x == null || item.y == null || typeof getHaversineDistance !== 'function') return false;
  let center = null;
  if (typeof getCityCenterCluster === 'function') {
    center = getCityCenterCluster(cityId);
  }
  if (!center || center.x == null || center.y == null) return false;
  const distanceKm = getHaversineDistance(Number(item.y), Number(item.x), Number(center.y), Number(center.x));
  if (!Number.isFinite(distanceKm)) return false;
  const limitKm = (typeof isNearbyDayTripItem === 'function' && isNearbyDayTripItem(item)) ? 500 : 350;
  return distanceKm > limitKm;
}

const BLOCKED_UNOPENED_PLACE_PATTERNS = [
  /^(?:the\s+)?dubai\s*land$/i,
  /^dubai\s*land\s+(?:theme\s*park|entertainment\s*complex|project)$/i,
  /^universal\s+studios\s+dubai(?:land)?$/i,
  /^\uB450\uBC14\uC774\s*\uB79C\uB4DC(?:\s*(?:\uD14C\uB9C8\uD30C\uD06C|\uAC1C\uBC1C\uC9C0))?$/
];

function isBlockedUnopenedPlace(item) {
  if (!item || item.isTransit || item.isLodging || item.isRest) return false;
  const titles = [item.name_en, item.name_ko, item.name]
    .filter(Boolean)
    .map(value => repairMojibakeText(String(value)).replace(/[\s_-]+/g, ' ').trim());
  return titles.some(title => BLOCKED_UNOPENED_PLACE_PATTERNS.some(pattern => pattern.test(title)));
}

function isInvalidGeneratedPlaceForCity(item, cityId) {
  if (!item || item.isTransit || item.isLodging || item.isRest) return false;
  if (isBlockedUnopenedPlace(item)) return true;
  if (matchesPlaceSpecificForeignPattern(item, cityId)) return true;
  if (titleMentionsForeignCity(item, cityId)) return true;
  if (isTooFarFromBaseCity(item, cityId)) return true;
  return false;
}

function sanitizeFictionalActivities(course) {
  if (!course || !course.days) return;

  const cityId = course.cityId;

  const isInvalidItineraryPlace = (item) => {
    if (!item || item.isTransit || item.isLodging || item.isRest) return false;
    const text = `${item.name_ko || ''} ${item.name_en || ''} ${item.desc_ko || ''} ${item.desc_en || ''}`.toLowerCase();
    if (isInvalidGeneratedPlaceForCity(item, cityId)) return true;
    const invalidPatterns = [
      /\btourism in\b/,
      /\bcultural impact\b/,
      /\bbts\b/,
      /\bboy band\b/,
      /\bgirl group\b/,
      /\bdiscography\b/,
      /\bfilmography\b/,
      /\balbum\b/,
      /\bsong\b/,
      /\btelevision series\b/,
      /\blist of\b/,
      /\boutline of\b/,
      /\bhistory of\b/,
      /\beconomy of\b/,
      /\bpolitics of\b/,
      /\btransport in\b/,
      /\bdemographics of\b/
    ];
    if (invalidPatterns.some(pattern => pattern.test(text))) return true;

    if (cityId && Array.isArray(CITIES)) {
      const otherCity = CITIES.find(city => {
        if (!city || city.id === cityId) return false;
        const names = [city.id, city.name_en, city.name_ko]
          .filter(Boolean)
          .map(name => String(name).toLowerCase());
        return names.some(name => name.length >= 4 && text.includes(name));
      });
      if (otherCity) {
        const ownCity = CITIES.find(city => city.id === cityId);
        const ownNames = ownCity
          ? [ownCity.id, ownCity.name_en, ownCity.name_ko].filter(Boolean).map(name => String(name).toLowerCase())
          : [];
        if (!ownNames.some(name => name && text.includes(name))) return true;
      }
    }

    return false;
  };

  // 1. Remove lodging if it belongs to a different city (distance > 150km)
  if (course.lodging) {
    const l = course.lodging;
    const clusters = (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[cityId]) || [];
    if (clusters.length > 0) {
      const baseCluster = clusters[0];
      if (typeof getHaversineDistance === 'function') {
        const dist = getHaversineDistance(baseCluster.y, baseCluster.x, l.y, l.x);
        if (dist > 150) {
          course.lodging = null;
          course.days.forEach(dayPlan => {
            if (dayPlan.items) {
              dayPlan.items = dayPlan.items.filter(it => !it.isLodging);
              recalculateDayPlanTimes(dayPlan, cityId);
            }
          });
        }
      }
    }
  }

  // 2. Filter fictional activities and clean up meal names
  course.days.forEach(dayPlan => {
    if (dayPlan.items) {
      dayPlan.items = dayPlan.items.filter(item => !isEndOfDayRestItem(item));
      const originalLength = dayPlan.items.length;
      
      // Filter out fictional/go-kart activities
      dayPlan.items = dayPlan.items.filter(item => {
        if (isInvalidItineraryPlace(item)) {
          return false;
        }
        const nameKo = (item.name_ko || '').toLowerCase();
        const nameEn = (item.name_en || '').toLowerCase();
        if (nameKo.includes('레이싱 카트') || nameKo.includes('고카트 레이싱') || nameKo.includes('레이싱카트') || 
            nameEn.includes('go-kart circuit') || nameEn.includes('go-kart racing')) {
          return false;
        }
        return true;
      });

      let changed = (dayPlan.items.length !== originalLength);

      // Sanitize specific meal names to generic ones
      dayPlan.items.forEach(item => {
        if (item.isTransit || item.isLodging || item.isRest) return;

        const nameKo = item.name_ko || '';
        const nameEn = item.name_en || '';
        const descKo = item.desc_ko || '';
        const descEn = item.desc_en || '';
        
        if (nameKo === "점심시간" || nameKo === "저녁시간") return;

        const text = (nameKo + ' ' + nameEn + ' ' + descKo + ' ' + descEn).toLowerCase();
        
        const isCafe = ['카페', '커피', '베이커리', '디저트', '빵집', '제과', '에스프레소', '찻집', '티룸', '티하우스',
                        'cafe', 'coffee', 'bakery', 'dessert', 'pastry', 'espresso', 'tea room', 'tea house', 'teahouse'].some(kw => text.includes(kw));
        
        const isMeal = ['식당', '맛집', '식사', '점심', '저녁', '런치', '디너', 'lunch', 'dinner', 'diner', 'bites', 'feast'].some(kw => text.includes(kw));

        if (isMeal && !isCafe) {
          if (item.timeSlot) {
            const startMin = getTimeSlotStartMinutes(item.timeSlot);
            if (startMin === null) return;

            if (startMin >= 690 && startMin <= 840) {
              item.name_ko = "점심시간";
              item.name_en = "Lunch Time";
              item.desc_ko = "주변 식당에서 자유로운 개별 식사";
              item.desc_en = "Enjoy individual dining at a nearby restaurant.";
              changed = true;
            } else if (startMin >= 1080 && startMin <= 1260) {
              item.name_ko = "저녁시간";
              item.name_en = "Dinner Time";
              item.desc_ko = "주변 식당에서 자유로운 개별 식사";
              item.desc_en = "Enjoy individual dining at a nearby restaurant.";
              changed = true;
            }
          }
        }
      });

      if (changed) {
        recalculateDayPlanTimes(dayPlan, cityId);
      }
    }
  });
}

function loadFromLocalStorage() {
  const localLang = safeGetLocalStorage('wander_lang');
  if (localLang) state.lang = normalizeLanguageCode(localLang);

  const localProfile = safeGetLocalStorage('wander_profile');
  if (localProfile) {
    state.activeProfile = safeGetStoredJson('wander_profile', state.activeProfile) || state.activeProfile;
    if (!('avatarDataUrl' in state.activeProfile)) state.activeProfile.avatarDataUrl = '';
    if (state.activeProfile.name === '홍길동') {
      const deviceId = getDeviceDeterministicId();
      const randNum = 1000 + (deviceId % 9000);
      state.activeProfile.name = `여행자_${randNum}`;
      saveToLocalStorage();
    }
  } else {
    // Generate a deterministic nickname like 여행자_4821 based on device parameters
    const deviceId = getDeviceDeterministicId();
    const randNum = 1000 + (deviceId % 9000);
    state.activeProfile.name = `여행자_${randNum}`;
    saveToLocalStorage();
  }

  ensureProfileDefaults();

  const localCityRequests = safeGetStoredJson('wander_city_requests', []);
  state.cityRequests = Array.isArray(localCityRequests) ? localCityRequests : [];
  loadFeedbacksFromStorage();

  const storedPace = safeGetLocalStorage('wander_travel_pace');
  state.travelPace = ['relaxed', 'moderate', 'packed'].includes(storedPace) ? storedPace : (state.travelPace || 'moderate');

  const localRooms = safeGetLocalStorage('wander_rooms');
  if (localRooms) {
    state.rooms = safeGetStoredJson('wander_rooms', [...MOCK_COMPANION_ROOMS]);
    if (!Array.isArray(state.rooms)) state.rooms = [...MOCK_COMPANION_ROOMS];
  } else {
    state.rooms = [...MOCK_COMPANION_ROOMS];
  }
  state.rooms = pruneExpiredRemotePayload({
    rooms: state.rooms,
    chatLogs: state.chatLogs || {},
    cityRequests: state.cityRequests
  }).rooms.map(normalizeRoomRecord);

  const localChatLogs = safeGetLocalStorage('wander_chat_logs');
  if (localChatLogs) {
    state.chatLogs = safeGetStoredJson('wander_chat_logs', {});
    if (!state.chatLogs || typeof state.chatLogs !== 'object' || Array.isArray(state.chatLogs)) {
      state.chatLogs = {};
    }
  } else {
    // Populate default chat logs
    state.chatLogs = {};
    state.rooms.forEach(room => {
      const welcomeMsg = getRoomSystemMessage('welcome', { name: room.creator.name });
      
      state.chatLogs[room.id] = [
        createMessageObject({ text: welcomeMsg, system: true })
      ];
    });
  }
  const prunedLocalPayload = pruneExpiredRemotePayload({
    rooms: state.rooms,
    chatLogs: state.chatLogs,
    cityRequests: state.cityRequests
  });
  state.rooms = prunedLocalPayload.rooms.map(normalizeRoomRecord);
  state.chatLogs = prunedLocalPayload.chatLogs;

  const localJoinedRoom = safeGetLocalStorage('wander_joined_room_id');
  if (localJoinedRoom) {
    state.joinedRoomId = parseInt(localJoinedRoom, 10) || null;
  } else {
    state.joinedRoomId = null;
  }

  // Always start on the home (dashboard) tab
  state.currentView = 'dashboard';

  const localActiveCourse = safeGetLocalStorage('wander_active_course');
  if (localActiveCourse) {
    try {
      const parsed = JSON.parse(localActiveCourse);
      if (parsed && parsed.isRoute) {
        if (typeof restoreRouteStateFromPayload === 'function') {
          restoreRouteStateFromPayload(parsed);
        } else if (typeof routeState !== 'undefined') {
          routeState.cities = parsed.displayCities || parsed.optimized || parsed.originalCities || [];
          routeState.startCityId = parsed.startCityId || null;
          routeState.endCityId = parsed.endCityId || null;
          routeState.lastResult = {
            optimized: parsed.optimized || parsed.displayCities || [],
            segments: parsed.segments || [],
            totalTime: parsed.totalTime || 0
          };
          routeState.usePreloadedOrder = true;
          routeState.preserveLoadedOrder = true;
        }
        state.activeCourse = null;
      } else {
        state.activeCourse = parsed;
        normalizeCourseMetadata(state.activeCourse);
        sanitizeFictionalActivities(state.activeCourse);
        normalizeCourseTimeDisplay(state.activeCourse);
      }
    } catch (e) {
      console.error(e);
      state.activeCourse = null;
    }
  } else {
    state.activeCourse = null;
  }

  const localCurrentItineraryDay = safeGetLocalStorage('wander_current_itinerary_day');
  if (localCurrentItineraryDay) {
    state.currentItineraryDay = parseInt(localCurrentItineraryDay, 10) || 1;
  } else {
    state.currentItineraryDay = 1;
  }

  const localEditingSavedCourseId = safeGetLocalStorage('wander_editing_saved_course_id');
  state.editingSavedCourseId = localEditingSavedCourseId || null;

  const localSavedCourses = safeGetLocalStorage('wander_saved_courses');
  if (localSavedCourses) {
    try {
      state.savedCourses = JSON.parse(localSavedCourses);
      if (Array.isArray(state.savedCourses)) {
        state.savedCourses.forEach(trip => {
          if (trip.course) {
            normalizeCourseMetadata(trip.course);
            sanitizeFictionalActivities(trip.course);
            normalizeCourseTimeDisplay(trip.course);
          }
        });
      }
    } catch (e) {
      console.error(e);
      state.savedCourses = [];
    }
  } else {
    state.savedCourses = [];
  }
  repairStateMojibake();
  
  // Sync profile values to input fields
  document.getElementById('profileName').value = getLocalizedProfileDisplayName(state.activeProfile.name);
  document.getElementById('profileGender').value = state.activeProfile.gender;
  document.getElementById('profileMBTI').value = state.activeProfile.mbti;
  const profileAgeRange = document.getElementById('profileAgeRange');
  if (profileAgeRange) profileAgeRange.value = state.activeProfile.ageRange || '30s';
  setMultiSelectValues('profileLanguages', state.activeProfile.languages || '');
  const profileSmoking = document.getElementById('profileSmoking');
  if (profileSmoking) profileSmoking.value = state.activeProfile.smoking || 'no';
  const profileAlcohol = document.getElementById('profileAlcohol');
  if (profileAlcohol) profileAlcohol.value = state.activeProfile.alcohol || 'social';
  const paceSelect = document.getElementById('plannerPace');
  if (paceSelect) paceSelect.value = state.travelPace || 'moderate';
  
  const headerName = document.getElementById('headerProfileName');
  if (headerName) {
    headerName.textContent = getLocalizedProfileDisplayName(state.activeProfile.name);
  }
  updateProfileAvatarUI();
  updateProfileAvatarUI();

  // Sync profile badge
  updateProfileVerificationUI();
}

function saveToLocalStorage() {
  safeSetLocalStorage('wander_lang', state.lang);
  safeSetLocalStorage('wander_profile', JSON.stringify(state.activeProfile));
  safeSetLocalStorage('wander_rooms', JSON.stringify(state.rooms));
  safeSetLocalStorage('wander_city_requests', JSON.stringify(state.cityRequests || []));
  safeSetLocalStorage('wander_feedbacks', JSON.stringify(normalizeFeedbackCollection(state.feedbacks)));
  safeSetLocalStorage('wander_travel_pace', state.travelPace || 'moderate');
  safeSetLocalStorage('wander_chat_logs', JSON.stringify(state.chatLogs));
  safeSetLocalStorage('wander_joined_room_id', state.joinedRoomId !== null ? String(state.joinedRoomId) : '');
  safeSetLocalStorage('wander_current_view', state.currentView);
  // Persist route state for page refresh
  if (state.currentView === 'routeplanner' && typeof routeState !== 'undefined' && routeState.lastResult) {
    const routeCourse = {
      isRoute: true,
      optimized: routeState.lastResult.optimized || [],
      segments: routeState.lastResult.segments || [],
      totalTime: routeState.lastResult.totalTime || 0,
      lang: state.lang,
      startCityId: routeState.startCityId || null,
      endCityId: routeState.endCityId || null,
      displayCities: typeof serializeRouteCities === 'function' ? serializeRouteCities(routeState.lastResult.optimized || []) : (routeState.lastResult.optimized || []),
      inputCities: typeof serializeRouteCities === 'function' ? serializeRouteCities(routeState.cities || []) : (routeState.cities || []),
      originalCities: typeof serializeRouteCities === 'function' ? serializeRouteCities(routeState.lastResult.optimized || []) : (routeState.lastResult.optimized || [])
    };
    safeSetLocalStorage('wander_active_course', JSON.stringify(routeCourse));
  } else {
  safeSetLocalStorage('wander_active_course', state.activeCourse ? JSON.stringify(state.activeCourse) : '');
  }
  safeSetLocalStorage('wander_current_itinerary_day', String(state.currentItineraryDay || 1));
  safeSetLocalStorage('wander_editing_saved_course_id', state.editingSavedCourseId || '');
  safeSetLocalStorage('wander_saved_courses', JSON.stringify(state.savedCourses || []));
}

// --- Translation Engine ---
function setupUIStrings() {
  applyEnhancedTranslations();
  state.lang = normalizeLanguageCode(state.lang);
  ensureEnhancedControls();
  localizeLanguageChoiceChips();
  updateProfileLanguageControlLabels(state.lang);
  document.documentElement.lang = state.lang;
  document.title = getInlineText({
    ko: 'TripTogether - AI 여행 코스와 동행',
    en: 'TripTogether - AI Itineraries and Companions',
    fr: 'TripTogether - Itinéraires IA et compagnons',
    zh: 'TripTogether - AI旅行行程与结伴',
    ja: 'TripTogether - AI旅行コースと同行',
    es: 'TripTogether - Rutas con IA y compañeros'
  });
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.textContent = cleanUiText(getText(key));
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    elem.setAttribute('placeholder', cleanUiText(getText(key)));
  });

  // Update tooltips/titles
  document.querySelectorAll('[data-i18n-title]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-title');
    elem.setAttribute('title', cleanUiText(getText(key)));
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-aria-label');
    elem.setAttribute('aria-label', cleanUiText(getText(key)));
  });

  updateLanguageControl();

  // Update header widget
  const displayName = getLocalizedProfileDisplayName(state.activeProfile, state.lang);
  document.getElementById('headerProfileName').textContent = displayName;
  const profileNameInput = document.getElementById('profileName');
  if (profileNameInput && /^(?:여행자|Traveler|Voyageur|旅行者|Viajero)_\d+$/i.test(profileNameInput.value || '')) {
    profileNameInput.value = displayName;
  }
  updateProfileAvatarUI();
  
  // Re-render components with translated fields
  renderPopularDestinations();
  renderCitySelectors();
  updateDurationSelectorOptions();
  updateOnboardingQuickDaysOptions();
  const selectPlanner = document.getElementById('plannerDest');
  if (selectPlanner) {
    if (state.activeCourse && state.currentView === 'planner') {
      syncPlannerControlsFromCourse(state.activeCourse);
    } else {
      updateLodgingSelector(selectPlanner.value);
    }
  }
  renderCompanionRooms();
  renderSavedCoursesList();
  if (state.activeCourse && state.currentView === 'planner') {
    try {
      renderItinerary(state.activeCourse);
    } catch (error) {
      console.error('Itinerary render failed:', error);
    }
  }
  // Re-render route planner with correct language
  if (state.currentView === 'routeplanner' && typeof safeRenderRouteOptimizerTab === 'function') {
    safeRenderRouteOptimizerTab();
  }
  updateRainyDaySelector();
  if (typeof updateFeedbackStarUI === 'function') updateFeedbackStarUI();
  if (typeof renderFeedbackList === 'function') renderFeedbackList();
  repairVisibleMojibake(document.body);
}

function updateLanguageControl() {
  const control = document.getElementById('langToggle');
  if (!control) return;
  if (control.tagName === 'SELECT') {
    if (!control.options.length) {
      SUPPORTED_LANG_CODES.forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = cleanUiText(LANGUAGE_SHORT_LABELS[code]);
        option.setAttribute('aria-label', cleanUiText(LANGUAGE_LABELS[code]));
        control.appendChild(option);
      });
    }
    control.value = normalizeLanguageCode(state.lang);
    control.setAttribute('aria-label', cleanUiText(LANGUAGE_LABELS[control.value] || 'Language'));
    return;
  }
  control.textContent = cleanUiText(LANGUAGE_SHORT_LABELS[normalizeLanguageCode(state.lang)] || '한국어');
  control.setAttribute('aria-label', cleanUiText(LANGUAGE_LABELS[normalizeLanguageCode(state.lang)] || 'Language'));
}

function getDurationOptionLabel(days) {
  const count = Number(days) || 1;
  const labels = {
    ko: `${count}\uC77C`,
    fr: count === 1 ? '1 jour' : `${count} jours`,
    zh: `${count}天`,
    ja: `${count}\u65E5`,
    es: count === 1 ? '1 día' : `${count} días`,
    en: count === 1 ? '1 Day' : `${count} Days`
  };
  return labels[normalizeLanguageCode(state.lang)] || labels.en;
}

function updateDurationSelectorOptions() {
  const select = document.getElementById('plannerDuration');
  if (!select) return;
  const currentVal = select.value || "2";
  select.innerHTML = '';
  for (let i = 1; i <= 7; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = getDurationOptionLabel(i);
    if (String(i) === String(currentVal)) {
      opt.selected = true;
    }
    select.appendChild(opt);
  }
}

function updateOnboardingQuickDaysOptions() {
  const select = document.getElementById('onboardingQuickDays');
  if (!select) return;
  const currentVal = select.value || "2";
  select.innerHTML = '';
  for (let i = 1; i <= 7; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = getDurationOptionLabel(i);
    if (String(i) === String(currentVal)) {
      opt.selected = true;
    }
    select.appendChild(opt);
  }
}

function getText(key) {
  const table = (TRANSLATIONS && TRANSLATIONS[state.lang]) || {};
  if (table[key] !== undefined) {
    const direct = cleanUiText(table[key]);
    const lang = normalizeLanguageCode(state.lang);
    if (lang !== 'en' && TRANSLATIONS.en && cleanUiText(TRANSLATIONS.en[key]) === direct) {
      return cleanUiText(localizeRuntimeText(direct));
    }
    return direct;
  }
  const primaryFallback = isKoreanLanguage() ? (TRANSLATIONS.ko || {}) : (TRANSLATIONS.en || {});
  if (primaryFallback[key] !== undefined) {
    const repaired = cleanUiText(primaryFallback[key]);
    return normalizeLanguageCode(state.lang) === 'en' || isKoreanLanguage()
      ? repaired
      : cleanUiText(localizeRuntimeText(repaired));
  }
  const secondaryFallback = TRANSLATIONS.en || TRANSLATIONS.ko || {};
  if (secondaryFallback[key] !== undefined) {
    const repaired = cleanUiText(secondaryFallback[key]);
    return normalizeLanguageCode(state.lang) === 'en'
      ? repaired
      : cleanUiText(localizeRuntimeText(repaired));
  }
  const runtimeFallback = localizeRuntimeText(key);
  if (runtimeFallback !== key) return cleanUiText(runtimeFallback);
  return key;
}

function runLocalizationAudit() {
  applyEnhancedTranslations();
  const attributes = ['data-i18n', 'data-i18n-placeholder', 'data-i18n-title'];
  const keys = Array.from(new Set(
    Array.from(document.querySelectorAll(attributes.map(attr => `[${attr}]`).join(',')))
      .flatMap(elem => attributes.map(attr => elem.getAttribute(attr)))
      .filter(Boolean)
  ));
  const legitimateSharedValues = {
    fr: new Set(['nav_logo', 'profile_mbti', 'comp_category_restaurant', 'modal_room_date']),
    zh: new Set(['nav_logo', 'profile_mbti']),
    ja: new Set(['nav_logo', 'profile_mbti']),
    es: new Set(['nav_logo', 'profile_mbti', 'comp_category_restaurant', 'modal_room_date'])
  };
  const report = {};
  SUPPORTED_LANG_CODES.forEach(lang => {
    const table = TRANSLATIONS[lang] || {};
    const english = TRANSLATIONS.en || {};
    const missing = keys.filter(key => table[key] === undefined && english[key] === undefined);
    const untranslated = [];
    if (lang !== 'en' && lang !== 'ko') {
      keys.forEach(key => {
        const source = cleanUiText(table[key] !== undefined ? table[key] : english[key]);
        const englishValue = cleanUiText(english[key]);
        if (!source || !englishValue || source !== englishValue || !/[A-Za-z]{3}/.test(source)) return;
        const effective = cleanUiText(localizeRuntimeText(source, lang));
        if (effective === source && !(legitimateSharedValues[lang] || new Set()).has(key)) {
          untranslated.push({ key, value: source });
        }
      });
    }
    report[lang] = { missing, untranslated, pass: missing.length === 0 && untranslated.length === 0 };
  });
  return {
    keyCount: keys.length,
    pass: SUPPORTED_LANG_CODES.every(lang => report[lang].pass),
    languages: report
  };
}

if (typeof window !== 'undefined') window.runLocalizationAudit = runLocalizationAudit;

function getCategoryLabel(category) {
  return getText(`comp_category_${category}`) || category;
}

function getGenderLabel(value) {
  const raw = String(value || '').trim();
  const lower = raw.toLowerCase();
  const ko = TRANSLATIONS.ko || {};
  const maleAliases = ['male', 'man', 'homme', 'hombre', '男性', '남성'];
  const femaleAliases = ['female', 'woman', 'femme', 'mujer', '女性', '여성'];
  const privateAliases = ['private', 'prefer not to say', 'ne pas afficher', 'no mostrar', '不公开', '非公開', '공개 안 함'];
  if (raw === ko.gender_male || maleAliases.includes(lower)) return getText('gender_male');
  if (raw === ko.gender_female || femaleAliases.includes(lower)) return getText('gender_female');
  if (raw === ko.gender_private || privateAliases.includes(lower)) return getText('gender_private');
  if (raw === ko.gender_any || lower.includes('any')) return getText('gender_any');
  return raw;
}

// Helper: Get comma-separated string from multi-select checkbox group
function getMultiSelectValues(containerId, exclusiveAnyValue = '') {
  const container = document.getElementById(containerId);
  if (!container) return '';
  const checked = container.querySelectorAll('input[type="checkbox"]:checked');
  let values = Array.from(checked).map(cb => cb.value);
  if (exclusiveAnyValue && values.includes(exclusiveAnyValue) && values.length > 1) {
    values = values.filter(value => value !== exclusiveAnyValue);
  }
  return values.join(', ');
}

// Helper: Set checkboxes in a multi-select group from comma-separated string
function setMultiSelectValues(containerId, valuesStr) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const values = (valuesStr || '').split(',').map(v => v.trim()).filter(Boolean);
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = values.includes(cb.value);
  });
}

function bindExclusiveAnyCheckboxGroup(containerId, anyValue = 'any') {
  const container = document.getElementById(containerId);
  if (!container || container.dataset.boundExclusiveAny === 'true') return;
  container.dataset.boundExclusiveAny = 'true';
  container.addEventListener('change', (event) => {
    const changed = event.target && event.target.matches('input[type="checkbox"]') ? event.target : null;
    if (!changed) return;
    const boxes = Array.from(container.querySelectorAll('input[type="checkbox"]'));
    const anyBox = boxes.find(box => box.value === anyValue);
    if (!anyBox) return;
    if (changed === anyBox && anyBox.checked) {
      boxes.forEach(box => {
        if (box !== anyBox) box.checked = false;
      });
      return;
    }
    if (changed !== anyBox && changed.checked) {
      anyBox.checked = false;
    }
    if (!boxes.some(box => box.checked)) {
      anyBox.checked = true;
    }
  });
}

function getProfileChoiceLabel(kind, value) {
  const key = kind + '_' + value;
  const translated = getText(key);
  return translated === key ? (value || '') : translated;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAgeRangeLabel(value) {
  const values = String(value || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
  const normalizedValues = values.map(item => {
    const clean = repairMojibakeText(item).toLowerCase();
    if (/20/.test(clean)) return '20s';
    if (/30/.test(clean)) return '30s';
    if (/40/.test(clean)) return '40s';
    if (/50/.test(clean)) return '50s';
    if (/60/.test(clean)) return '60s';
    if (/any|all|무관|상관없|不限|不問|todos|tous/.test(clean)) return 'any';
    return item;
  });
  const specificValues = normalizedValues.filter(v => v !== 'any');
  if (!specificValues.length) return getText('age_any');
  return specificValues.map(v => getProfileChoiceLabel('age', v)).join(', ');
}

function getMemberDetailsText(profile) {
  const p = profile || {};
  const parts = [];
  if (p.ageRange || p.age) parts.push(getAgeRangeLabel(p.ageRange || p.age));
  if (p.languages) parts.push(localizeProfileLanguageList(p.languages));
  if (p.smoking) parts.push(getProfileChoiceLabel('smoking', p.smoking));
  if (p.alcohol) parts.push(getProfileChoiceLabel('alcohol', p.alcohol));
  return parts.filter(Boolean).join(' · ') || getText('member_no_info');
}

function getRoomConditionTagsHTML(room) {
  const tags = [];
  if (room.targetAge) tags.push(`${getText('profile_age')}: ${getAgeRangeLabel(room.targetAge)}`);
  if (room.targetLanguage) tags.push(`${getText('profile_languages')}: ${localizeProfileLanguageList(room.targetLanguage)}`);
  if (room.targetSmoking) tags.push(`${getText('profile_smoking')}: ${getProfileChoiceLabel('smoking', room.targetSmoking)}`);
  if (room.targetAlcohol) tags.push(`${getText('profile_alcohol')}: ${getProfileChoiceLabel('alcohol', room.targetAlcohol)}`);
  return tags.map(tag => `<span class="room-tag">${escapeHtml(tag)}</span>`).join('');
}

function findCityByTypedName(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return null;
  return getSortedSupportedDestinationCities().find(city => {
    const localizedNames = SUPPORTED_LANG_CODES.flatMap(lang => [
      getLocalizedCityField(city, 'name', lang),
      getLocalizedCityField(city, 'country', lang)
    ]);
    const names = [city.id, city.name_ko, city.name_en, city.country_ko, city.country_en, ...localizedNames]
      .filter(Boolean)
      .map(v => String(v).toLowerCase());
    return names.some(name => name === q);
  }) || null;
}

function notifyAdminCityRequest(request) {
  if (!request) return;
  const notifications = safeGetStoredJson('wander_admin_city_notifications', []);
  const record = {
    id: request.id,
    type: 'city_request',
    cityName: request.cityName,
    source: request.source,
    requesterName: request.requester && request.requester.name,
    createdAt: request.createdAt,
    read: false
  };
  notifications.unshift(record);
  safeSetLocalStorage('wander_admin_city_notifications', JSON.stringify(notifications.slice(0, 100)));
  const message = formatInlineText({
    ko: '관리자 알림: {city} 도시 추가 요청이 들어왔습니다.',
    en: 'Admin alert: city support was requested for {city}.',
    fr: 'Alerte administrateur : une demande a été envoyée pour {city}.',
    zh: '管理员提醒：收到添加{city}的请求。',
    ja: '管理者通知：{city}の追加リクエストが届きました。',
    es: 'Aviso de administración: se solicitó añadir {city}.'
  }, { city: request.cityName });
  showToast(message);
  window.dispatchEvent(new CustomEvent('wander:admin-city-request', { detail: record }));
  if (!window.__wanderSuppressAdminRequestAlert) {
    setTimeout(() => {
      try { window.alert(message); } catch (err) {}
    }, 30);
  }
}

function requestUnsupportedCity(source, inputId) {
  const input = document.getElementById(inputId);
  const cityName = input ? input.value.trim() : '';
  if (!cityName) return;
  const request = {
    id: `city-request-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    cityName,
    source,
    requester: getPublicProfileSnapshot(),
    lang: state.lang,
    createdAt: new Date().toISOString(),
    status: 'requested'
  };
  state.cityRequests = Array.isArray(state.cityRequests) ? state.cityRequests : [];
  state.cityRequests.push(request);
  saveToLocalStorage();
  pushToRemote();
  notifyAdminCityRequest(request);
  showToast(getText('city_request_sent'));
}

function updateUnsupportedCityState(inputId, statusId, requestBtnId) {
  const input = document.getElementById(inputId);
  const status = document.getElementById(statusId);
  const btn = document.getElementById(requestBtnId);
  if (!input || !status) return;
  const value = input.value.trim();
  const unsupported = value && !findCityByTypedName(value);
  status.style.display = unsupported ? 'flex' : 'none';
  if (btn) btn.disabled = !unsupported;
}

function getMatchingCities(query, limit = 10) {
  const q = String(query || '').trim().toLowerCase();
  const cities = getSortedSupportedDestinationCities();
  if (!q) return cities.slice(0, limit);
  return cities.filter(city => {
    const localizedNames = SUPPORTED_LANG_CODES.flatMap(lang => [
      getLocalizedCityField(city, 'name', lang),
      getLocalizedCityField(city, 'country', lang)
    ]);
    return [city.id, city.name_ko, city.name_en, city.country_ko, city.country_en, ...localizedNames]
      .filter(Boolean)
      .some(value => String(value).toLowerCase().includes(q));
  }).slice(0, limit);
}

function renderCitySearchResults(input, results, select, onSelected) {
  if (!results) return;
  const matches = getMatchingCities(input.value);
  results.innerHTML = '';
  matches.forEach(city => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'city-search-result';
    button.setAttribute('role', 'option');
    button.dataset.cityId = city.id;
    const cityName = getLocalizedCityField(city, 'name');
    const countryName = getLocalizedCityField(city, 'country');
    button.innerHTML = `<strong>${escapeHtml(cityName)}</strong><span>${escapeHtml(countryName)}</span>`;
    button.addEventListener('pointerdown', event => event.preventDefault());
    button.addEventListener('keydown', event => {
      const options = [...results.querySelectorAll('.city-search-result')];
      const index = options.indexOf(button);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        (options[index + 1] || options[0])?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        (options[index - 1] || input)?.focus();
      } else if (event.key === 'Escape') {
        results.hidden = true;
        input.setAttribute('aria-expanded', 'false');
        input.focus();
      }
    });
    button.addEventListener('click', () => {
      select.value = city.id;
      input.value = cityName;
      results.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      select.dispatchEvent(new Event('change', { bubbles: true }));
      input.focus({ preventScroll: true });
    });
    results.appendChild(button);
  });
  results.hidden = matches.length === 0;
  input.setAttribute('aria-expanded', matches.length ? 'true' : 'false');
}

function connectCitySearch(inputId, selectId, statusId, requestBtnId, onSelected) {
  const input = document.getElementById(inputId);
  const select = document.getElementById(selectId);
  const results = document.getElementById(inputId.replace(/Input$/, 'Results'));
  if (!input || !select || input.dataset.boundCitySearch === 'true') return;
  input.dataset.boundCitySearch = 'true';
  input.addEventListener('input', () => {
    const found = findCityByTypedName(input.value);
    if (found) {
      select.value = found.id;
      updateUnsupportedCityState(inputId, statusId, requestBtnId);
      if (typeof onSelected === 'function') onSelected(found.id);
    } else {
      updateUnsupportedCityState(inputId, statusId, requestBtnId);
    }
    renderCitySearchResults(input, results, select, onSelected);
  });
  input.addEventListener('focus', () => renderCitySearchResults(input, results, select, onSelected));
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape' && results) {
      results.hidden = true;
      input.setAttribute('aria-expanded', 'false');
    } else if (event.key === 'ArrowDown' && results && !results.hidden) {
      event.preventDefault();
      results.querySelector('.city-search-result')?.focus();
    }
  });
  input.addEventListener('blur', () => {
    window.setTimeout(() => {
      if (results) results.hidden = true;
      input.setAttribute('aria-expanded', 'false');
    }, 160);
  });
  select.addEventListener('change', () => {
    const city = getSortedSupportedDestinationCities().find(c => c.id === select.value);
    if (city) input.value = getLocalizedCityField(city, 'name');
    updateUnsupportedCityState(inputId, statusId, requestBtnId);
  });
  const btn = document.getElementById(requestBtnId);
  if (btn && btn.dataset.boundCityRequest !== 'true') {
    btn.dataset.boundCityRequest = 'true';
    btn.addEventListener('click', () => requestUnsupportedCity(inputId.includes('modal') ? 'companion-room' : 'planner', inputId));
  }
}

function buildCitySearchMarkup(prefix) {
  return `
    <div class="city-search-control" id="${prefix}CitySearchWrap">
      <label class="form-label" for="${prefix}CitySearchInput" data-i18n="planner_city_search_label">${getText('planner_city_search_label')}</label>
      <input type="text" class="form-control" id="${prefix}CitySearchInput" list="${prefix}CityDatalist" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${prefix}CitySearchResults" data-i18n-placeholder="planner_city_search_placeholder" autocomplete="off">
      <datalist id="${prefix}CityDatalist"></datalist>
      <div class="city-search-results" id="${prefix}CitySearchResults" role="listbox" hidden></div>
      <div class="unsupported-city-box" id="${prefix}UnsupportedCityBox" style="display:none;">
        <span data-i18n="unsupported_city_text">${getText('unsupported_city_text')}</span>
        <button type="button" class="city-request-btn" id="${prefix}RequestCityBtn" data-i18n="request_city_btn">${getText('request_city_btn')}</button>
      </div>
    </div>
  `;
}

function ensureEnhancedControls() {
  applyEnhancedTranslations();

  const plannerDest = document.getElementById('plannerDest');
  if (plannerDest && !document.getElementById('plannerCitySearchWrap')) {
    plannerDest.closest('.form-group').insertAdjacentHTML('beforeend', buildCitySearchMarkup('planner'));
  }

  const plannerDuration = document.getElementById('plannerDuration');
  if (plannerDuration && !document.getElementById('plannerPace')) {
    plannerDuration.closest('.form-group').insertAdjacentHTML('afterend', `
      <div class="form-group">
        <label class="form-label" for="plannerPace" data-i18n="planner_pace_label">${getText('planner_pace_label')}</label>
        <select class="form-control" id="plannerPace">
          <option value="relaxed" data-i18n="pace_relaxed">${getText('pace_relaxed')}</option>
          <option value="moderate" data-i18n="pace_moderate" selected>${getText('pace_moderate')}</option>
          <option value="packed" data-i18n="pace_packed">${getText('pace_packed')}</option>
        </select>
      </div>
    `);
  }

  const profileGrid = document.querySelector('#profileForm .grid-2col');
  if (profileGrid && !document.getElementById('profileAgeRange')) {
    profileGrid.insertAdjacentHTML('beforebegin', `
      <div class="grid-2col profile-extra-grid">
        <div class="form-group">
          <label class="form-label" for="profileAgeRange" data-i18n="profile_age">${getText('profile_age')}</label>
          <select class="form-control" id="profileAgeRange">
            <option value="20s" data-i18n="age_20s">${getText('age_20s')}</option>
            <option value="30s" data-i18n="age_30s" selected>${getText('age_30s')}</option>
            <option value="40s" data-i18n="age_40s">${getText('age_40s')}</option>
            <option value="50s" data-i18n="age_50s">${getText('age_50s')}</option>
            <option value="60s" data-i18n="age_60s">${getText('age_60s')}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" data-i18n="profile_languages">${getText('profile_languages')}</label>
          <div class="multi-select-group" id="profileLanguages">
            <label class="multi-select-chip"><input type="checkbox" value="\uD55C\uAD6D\uC5B4" checked><span>\uD55C\uAD6D\uC5B4</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="English" checked><span>English</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u65E5\u672C\u8A9E"><span>\u65E5\u672C\u8A9E</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u4E2D\u6587"><span>\u4E2D\u6587</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Espa\u00F1ol"><span>Espa\u00F1ol</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Fran\u00E7ais"><span>Fran\u00E7ais</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Deutsch"><span>Deutsch</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Italiano"><span>Italiano</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u0627\u0644\u0639\u0631\u0628\u064A\u0629"><span>\u0627\u0644\u0639\u0631\u0628\u064A\u0629</span></label>
          </div>
        </div>
      </div>
      <div class="grid-2col profile-extra-grid">
        <div class="form-group">
          <label class="form-label" for="profileSmoking" data-i18n="profile_smoking">${getText('profile_smoking')}</label>
          <select class="form-control" id="profileSmoking">
            <option value="no" data-i18n="smoking_no">${getText('smoking_no')}</option>
            <option value="yes" data-i18n="smoking_yes">${getText('smoking_yes')}</option>
            <option value="ok" data-i18n="smoking_ok">${getText('smoking_ok')}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="profileAlcohol" data-i18n="profile_alcohol">${getText('profile_alcohol')}</label>
          <select class="form-control" id="profileAlcohol">
            <option value="none" data-i18n="alcohol_none">${getText('alcohol_none')}</option>
            <option value="social" data-i18n="alcohol_social" selected>${getText('alcohol_social')}</option>
            <option value="yes" data-i18n="alcohol_yes">${getText('alcohol_yes')}</option>
          </select>
        </div>
      </div>
    `);
  }

  const modalDest = document.getElementById('modalRoomDest');
  if (modalDest && !document.getElementById('modalRoomCitySearchWrap')) {
    modalDest.closest('.form-group').insertAdjacentHTML('beforeend', buildCitySearchMarkup('modalRoom'));
  }

  const modalGender = document.getElementById('modalRoomGender');
  if (modalGender && !document.getElementById('modalRoomLanguage')) {
    modalGender.closest('.grid-2col').insertAdjacentHTML('afterend', `
      <div class="grid-2col companion-extra-grid">
        <div class="form-group">
          <label class="form-label" data-i18n="modal_room_age">${getText('modal_room_age')}</label>
          <div class="multi-select-group" id="modalRoomAge" role="group" aria-label="${getText('modal_room_age')}">
            <label class="multi-select-chip"><input type="checkbox" value="any" checked><span data-i18n="age_any">${getText('age_any')}</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="20s"><span data-i18n="age_20s">${getText('age_20s')}</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="30s"><span data-i18n="age_30s">${getText('age_30s')}</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="40s"><span data-i18n="age_40s">${getText('age_40s')}</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="50s"><span data-i18n="age_50s">${getText('age_50s')}</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="60s"><span data-i18n="age_60s">${getText('age_60s')}</span></label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" data-i18n="modal_room_language">${getText('modal_room_language')}</label>
          <div class="multi-select-group" id="modalRoomLanguage">
            <label class="multi-select-chip"><input type="checkbox" value="\uD55C\uAD6D\uC5B4" checked><span>\uD55C\uAD6D\uC5B4</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="English" checked><span>English</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u65E5\u672C\u8A9E"><span>\u65E5\u672C\u8A9E</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u4E2D\u6587"><span>\u4E2D\u6587</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Espa\u00F1ol"><span>Espa\u00F1ol</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Fran\u00E7ais"><span>Fran\u00E7ais</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Deutsch"><span>Deutsch</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="Italiano"><span>Italiano</span></label>
            <label class="multi-select-chip"><input type="checkbox" value="\u0627\u0644\u0639\u0631\u0628\u064A\u0629"><span>\u0627\u0644\u0639\u0631\u0628\u064A\u0629</span></label>
          </div>
        </div>
      </div>
      <div class="grid-2col companion-extra-grid">
        <div class="form-group">
          <label class="form-label" for="modalRoomSmoking" data-i18n="modal_room_smoking">${getText('modal_room_smoking')}</label>
          <select class="form-control" id="modalRoomSmoking">
            <option value="ok" data-i18n="smoking_ok">${getText('smoking_ok')}</option>
            <option value="no" data-i18n="smoking_no">${getText('smoking_no')}</option>
            <option value="yes" data-i18n="smoking_yes">${getText('smoking_yes')}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="modalRoomAlcohol" data-i18n="modal_room_alcohol">${getText('modal_room_alcohol')}</label>
          <select class="form-control" id="modalRoomAlcohol">
            <option value="ok" data-i18n="smoking_ok">${getText('smoking_ok')}</option>
            <option value="none" data-i18n="alcohol_none">${getText('alcohol_none')}</option>
            <option value="social" data-i18n="alcohol_social">${getText('alcohol_social')}</option>
            <option value="yes" data-i18n="alcohol_yes">${getText('alcohol_yes')}</option>
          </select>
        </div>
      </div>
    `);
  }

  const regenPanel = document.querySelector('.custom-regen-panel');
  if (regenPanel && !document.getElementById('rainyDaySelect')) {
    regenPanel.insertAdjacentHTML('beforeend', `
      <div class="rainy-regen-row">
        <label class="form-label" for="rainyDaySelect" data-i18n="rain_regen_label">${getText('rain_regen_label')}</label>
        <div class="rainy-regen-controls">
          <select class="form-control" id="rainyDaySelect"></select>
          <button type="button" class="regen-tag-btn rainy-regen-btn" id="rainyDayRegenBtn" data-i18n="rain_regen_btn">${getText('rain_regen_btn')}</button>
        </div>
      </div>
    `);
  }

  connectCitySearch('plannerCitySearchInput', 'plannerDest', 'plannerUnsupportedCityBox', 'plannerRequestCityBtn', (cityId) => {
    beginPlannerDraftForCity(cityId);
    updateLodgingSelector(cityId, { preserveSelection: false });
  });
  connectCitySearch('modalRoomCitySearchInput', 'modalRoomDest', 'modalRoomUnsupportedCityBox', 'modalRoomRequestCityBtn');
  bindExclusiveAnyCheckboxGroup('modalRoomAge', 'any');
  renderCitySelectors();
  updateRainyDaySelector();
  repairVisibleMojibake(document.body);
}

function getRainyDayOptionLabel(dayNumber) {
  return formatDayLabel(dayNumber);
}

function updateRainyDaySelector() {
  const select = document.getElementById('rainyDaySelect');
  if (!select) return;
  const currentValue = select.value;
  select.innerHTML = '';
  const days = state.activeCourse && Array.isArray(state.activeCourse.days)
    ? state.activeCourse.days
    : [];
  if (!days.length) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = getText('planner_generate_first');
    select.appendChild(opt);
    select.disabled = true;
    return;
  }
  select.disabled = false;
  days.forEach(dayPlan => {
    const opt = document.createElement('option');
    opt.value = String(dayPlan.day);
    opt.textContent = getRainyDayOptionLabel(dayPlan.day);
    select.appendChild(opt);
  });
  if (currentValue && days.some(dayPlan => String(dayPlan.day) === currentValue)) {
    select.value = currentValue;
  } else {
    select.value = String(state.currentItineraryDay || days[0].day);
  }
}

function getSimplePlaceKey(item) {
  return String((item && (item.name_en || item.name_ko)) || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isIndoorFriendlyItem(item) {
  if (!item || item.isTransit || item.isLodging || item.isRest || item.isFlexibleBreak) return false;
  const text = `${item.name_en || ''} ${item.name_ko || ''} ${item.desc_en || ''} ${item.desc_ko || ''}`.toLowerCase();
  const outdoorOnly = /(beach|trail|hike|hiking|garden|park|zoo|safari|island|waterfall|river cruise|bike|cycling|outdoor|street walk|walking tour|day trip|national park)/i;
  const indoorSignals = /(museum|gallery|palace|castle|cathedral|church|temple|mosque|synagogue|aquarium|mall|market|arcade|library|theater|theatre|opera|concert hall|exhibition|observatory|tower|space center|science center|\uBC15\uBB3C\uAD00|\uBBF8\uC220\uAD00|\uAD81|\uC131|\uC131\uB2F9|\uC0AC\uC6D0|\uBAA8\uC2A4\uD06C|\uC218\uC871\uAD00|\uBAA8\uB4E0|\uC1FC\uD551\uBAB0|\uC2DC\uC7A5|\uB3C4\uC11C\uAD00|\uACF5\uC5F0\uC7A5|\uC804\uC2DC|\uC804\uB9DD\uB300|\uC6B0\uC8FC\uC13C\uD130)/i;
  return indoorSignals.test(text) && !outdoorOnly.test(text);
}

function getIndoorCandidatesForCity(cityId) {
  const pools = (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS[cityId]) || null;
  if (!pools) return [];
  const sourceCats = ['culture', 'activity', 'shopping', 'healing'];
  const seen = new Set();
  const candidates = [];
  sourceCats.forEach(cat => {
    (pools[cat] || []).forEach(item => {
      if (!isIndoorFriendlyItem(item)) return;
      const key = getSimplePlaceKey(item);
      if (!key || seen.has(key)) return;
      const clone = { ...item, cityId, isRainyIndoor: true };
      const coords = getAttractionCoords(clone, cityId);
      clone.x = coords.x;
      clone.y = coords.y;
      normalizeVisitDurationByType(clone);
      seen.add(key);
      candidates.push(clone);
    });
  });
  candidates.sort((a, b) => {
    const landmarkDelta = Number(!!b.isLandmark) - Number(!!a.isLandmark);
    if (landmarkDelta) return landmarkDelta;
    return (b.duration || 90) - (a.duration || 90);
  });
  return candidates;
}

function insertSwappedOutdoorIntoDay(dayPlan, outdoorItem, cityId) {
  if (!dayPlan || !Array.isArray(dayPlan.items) || !outdoorItem) return;
  const dinnerIdx = dayPlan.items.findIndex(item => isMealBreakItem(item) && isDinnerMealBreakItem(item));
  const insertAt = dinnerIdx >= 0 ? dinnerIdx : dayPlan.items.length;
  const clone = { ...outdoorItem, isRainySwapOutdoor: true, swappedFromRainyDay: true };
  dayPlan.items.splice(insertAt, 0, clone);
  recalculateDayPlanTimes(dayPlan, cityId);
}

function handleRainyDayRegen() {
  if (!state.activeCourse || !Array.isArray(state.activeCourse.days)) {
    showToast(getText('rain_regen_no_course'));
    return;
  }
  const select = document.getElementById('rainyDaySelect');
  const dayNumber = parseInt(select && select.value, 10) || state.currentItineraryDay || 1;
  const dayPlan = state.activeCourse.days.find(day => day.day === dayNumber);
  if (!dayPlan) return;

  const cityId = state.activeCourse.cityId;
  const isReplaceableSightseeing = (item) =>
    item && !item.isTransit && !item.isLodging && !isMealBreakItem(item) && !isFlexibleBreakItem(item);
  const rainyOriginalOutdoor = (dayPlan.items || [])
    .filter(item => isReplaceableSightseeing(item) && !isIndoorFriendlyItem(item))
    .map(item => ({ ...item, isRainySwapOutdoor: true }));

  const existingIndoor = (dayPlan.items || [])
    .filter(item => isReplaceableSightseeing(item) && isIndoorFriendlyItem(item))
    .map(item => ({ ...item, isRainyIndoor: true }));

  const movableIndoorSources = [];
  state.activeCourse.days.forEach(sourceDay => {
    if (sourceDay.day === dayNumber) return;
    (sourceDay.items || []).forEach((item, index) => {
      if (!isReplaceableSightseeing(item) || !isIndoorFriendlyItem(item)) return;
      movableIndoorSources.push({
        sourceDay,
        sourceDayNumber: sourceDay.day,
        index,
        item: { ...item, isRainyIndoor: true },
        key: getSimplePlaceKey(item)
      });
    });
  });

  const cityPool = getIndoorCandidatesForCity(cityId);
  const replaceableCount = (dayPlan.items || []).filter(isReplaceableSightseeing).length;
  const paceCap = state.travelPace === 'relaxed' ? 2 : (state.travelPace === 'packed' ? 5 : 4);
  const targetCount = Math.min(
    paceCap,
    Math.max(2, replaceableCount || 3),
    movableIndoorSources.length + existingIndoor.length + cityPool.length
  );

  if (targetCount < 1) {
    showToast(getText('rain_regen_no_candidates'));
    return;
  }

  const selectedIndoor = [];
  const swapSources = [];
  const usedKeys = new Set();

  const tryAddIndoor = (item, sourceMeta) => {
    const key = getSimplePlaceKey(item);
    if (!key || usedKeys.has(key) || selectedIndoor.length >= targetCount) return false;
    usedKeys.add(key);
    selectedIndoor.push({ ...item, isRainyIndoor: true });
    if (sourceMeta) swapSources.push(sourceMeta);
    return true;
  };

  // 1) 다른 날의 실내 일정을 우선 이동 (이동 시 비 오는 날 실외 일정과 1:1 교환)
  movableIndoorSources.forEach(source => {
    if (selectedIndoor.length >= targetCount) return;
    tryAddIndoor(source.item, source);
  });

  // 2) 비 오는 날에 이미 있던 실내 일정 유지
  existingIndoor.forEach(item => tryAddIndoor(item, null));

  // 3) 부족하면 도시 실내 후보로 보충 (교환 대상 없음)
  cityPool.forEach(item => tryAddIndoor(item, null));

  if (!selectedIndoor.length) {
    showToast(getText('rain_regen_no_candidates'));
    return;
  }

  const startLodging = (dayPlan.items || []).find(item => item.isLodging && item.isStart);
  const endLodging = (dayPlan.items || []).find(item => item.isLodging && item.isEnd);
  const lunch = (dayPlan.items || []).find(item => isMealBreakItem(item) && isLunchMealBreakItem(item));
  const dinner = (dayPlan.items || []).find(item => isMealBreakItem(item) && isDinnerMealBreakItem(item));
  const midpoint = Math.ceil(selectedIndoor.length / 2);
  dayPlan.items = [
    startLodging,
    ...selectedIndoor.slice(0, midpoint),
    lunch,
    ...selectedIndoor.slice(midpoint),
    dinner,
    endLodging
  ].filter(Boolean);
  recalculateDayPlanTimes(dayPlan, cityId);

  const outdoorQueue = [...rainyOriginalOutdoor];
  const touchedDays = new Set();

  // 다른 날에서 가져온 실내 ↔ 비 오는 날 실외 1:1 교환 (원래 장소 삭제 금지)
  swapSources.forEach((source, swapIndex) => {
    if (!source.sourceDay || !Array.isArray(source.sourceDay.items)) return;
    const outdoorReplacement = outdoorQueue[swapIndex];
    if (!outdoorReplacement) return;
    source.sourceDay.items[source.index] = {
      ...outdoorReplacement,
      isRainySwapOutdoor: true,
      swappedFromRainyDay: dayNumber
    };
    recalculateDayPlanTimes(source.sourceDay, cityId);
    touchedDays.add(source.sourceDayNumber);
  });

  // 교환되지 않은 나머지 실외 일정은 다른 날로 분산 배치 (삭제하지 않음)
  const remainingOutdoor = outdoorQueue.slice(swapSources.length);
  if (remainingOutdoor.length) {
    const fallbackDays = state.activeCourse.days
      .filter(day => day.day !== dayNumber)
      .sort((a, b) => {
        const aTouched = touchedDays.has(a.day) ? 0 : 1;
        const bTouched = touchedDays.has(b.day) ? 0 : 1;
        if (aTouched !== bTouched) return aTouched - bTouched;
        return a.day - b.day;
      });
    remainingOutdoor.forEach((outdoor, idx) => {
      const targetDay = fallbackDays[idx % fallbackDays.length];
      if (!targetDay) return;
      insertSwappedOutdoorIntoDay(targetDay, outdoor, cityId);
    });
  }

  normalizeCourseTimeDisplay(state.activeCourse);
  state.currentItineraryDay = dayNumber;
  saveToLocalStorage();
  renderItinerary(state.activeCourse);
  showToast(getText('rain_regen_done'));
}

function getSelectedPlannerPreferences() {
  const selected = [];
  document.querySelectorAll('.pref-chip.selected').forEach(chip => {
    const pref = chip.getAttribute('data-pref');
    if (pref && !selected.includes(pref)) selected.push(pref);
  });
  return selected;
}

function getCoursePreferences(course, fallbackToUi = false) {
  if (course && Array.isArray(course.preferences) && course.preferences.length > 0) {
    return course.preferences.filter(Boolean);
  }
  if (course && Array.isArray(course.selectedPrefs) && course.selectedPrefs.length > 0) {
    return course.selectedPrefs.filter(Boolean);
  }
  return fallbackToUi ? getSelectedPlannerPreferences() : [];
}

function getCourseDurationDays(course) {
  if (!course) return 1;
  const explicitDays = parseInt(course.durationDays || course.daysCount || course.duration, 10);
  if (!Number.isNaN(explicitDays) && explicitDays > 0) return explicitDays;
  if (Array.isArray(course.days) && course.days.length > 0) return course.days.length;
  const select = document.getElementById('plannerDuration');
  const selectedDays = select ? parseInt(select.value, 10) : 1;
  return Number.isNaN(selectedDays) || selectedDays <= 0 ? 1 : selectedDays;
}

function getCityDisplayName(cityId) {
  const city = CITIES.find(c => c.id === cityId);
  if (!city) return cityId || '';
  return getLocalizedCityField(city, 'name');
}

function normalizeCourseMetadata(course, fallbackPrefsToUi = false) {
  if (!course) return course;
  const prefs = getCoursePreferences(course, fallbackPrefsToUi);
  if (prefs.length > 0) {
    course.preferences = [...prefs];
  }
  course.durationDays = getCourseDurationDays(course);
  if (course.cityId && course.cityId !== 'multi_route') {
    course.cityName = getCityDisplayName(course.cityId);
  }
  return course;
}

function parseLodgingValue(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function getLodgingDisplayName(lodging) {
  if (!lodging) return '';
  return getLocalizedDataField(lodging, 'name') || lodging.name || lodging.name_en || lodging.name_ko || '';
}

function isSameLodging(a, b) {
  if (!a || !b) return false;
  const ax = Number(a.x);
  const ay = Number(a.y);
  const bx = Number(b.x);
  const by = Number(b.y);
  if (!Number.isNaN(ax) && !Number.isNaN(ay) && !Number.isNaN(bx) && !Number.isNaN(by)) {
    if (Math.abs(ax - bx) < 0.000001 && Math.abs(ay - by) < 0.000001) return true;
  }
  const namesA = [a.name_ko, a.name_en, a.name].filter(Boolean).map(name => String(name).trim().toLowerCase());
  const namesB = [b.name_ko, b.name_en, b.name].filter(Boolean).map(name => String(name).trim().toLowerCase());
  return namesA.some(name => namesB.includes(name));
}

function syncPlannerControlsFromCourse(course) {
  if (!course) return;
  normalizeCourseMetadata(course);

  const selectDest = document.getElementById('plannerDest');
  if (selectDest && course.cityId) {
    selectDest.value = course.cityId;
  }
  const plannerCitySearchInput = document.getElementById('plannerCitySearchInput');
  if (plannerCitySearchInput && course.cityId) {
    const city = CITIES.find(c => c.id === course.cityId);
    plannerCitySearchInput.value = city ? getLocalizedCityField(city, 'name') : (course.cityName || course.cityId);
    updateUnsupportedCityState('plannerCitySearchInput', 'plannerUnsupportedCityBox', 'plannerRequestCityBtn');
  }

  updateDurationSelectorOptions();
  const durationSelect = document.getElementById('plannerDuration');
  if (durationSelect) {
    durationSelect.value = String(getCourseDurationDays(course));
  }

  const paceSelect = document.getElementById('plannerPace');
  if (paceSelect) {
    const pace = ['relaxed', 'moderate', 'packed'].includes(course.travelPace)
      ? course.travelPace
      : (state.travelPace || 'moderate');
    paceSelect.value = pace;
    state.travelPace = pace;
  }

  if (course.cityId) {
    updateLodgingSelector(course.cityId);
  }
  const lodgingSelect = document.getElementById('plannerLodging');
  if (lodgingSelect) {
    if (course.lodging) {
      let matchedValue = '';
      Array.from(lodgingSelect.options).forEach(opt => {
        const optLodging = parseLodgingValue(opt.value);
        if (!matchedValue && isSameLodging(optLodging, course.lodging)) {
          matchedValue = opt.value;
        }
      });
      if (!matchedValue) {
        const opt = document.createElement('option');
        opt.value = JSON.stringify(course.lodging);
        opt.textContent = getLodgingDisplayName(course.lodging) || getText('planner_lodging_label') || 'Shared lodging/start point';
        lodgingSelect.appendChild(opt);
        matchedValue = opt.value;
      }
      lodgingSelect.value = matchedValue;
    } else {
      lodgingSelect.value = '';
    }
  }

  const prefs = getCoursePreferences(course);
  if (prefs.length > 0) {
    document.querySelectorAll('.pref-chip').forEach(chip => {
      chip.classList.toggle('selected', prefs.includes(chip.getAttribute('data-pref')));
    });
  }
}

function clearPlannerResultForDraft() {
  const mapContainer = document.getElementById('itineraryMapContainer');
  if (mapContainer) mapContainer.style.display = 'none';

  const dayTabs = document.getElementById('itineraryDayTabs');
  if (dayTabs) dayTabs.innerHTML = '';

  const timeline = document.getElementById('itineraryTimelineList');
  if (timeline) {
    timeline.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: 12px;">
        ${getInlineText({ ko: '도시와 여행 조건을 선택한 뒤 AI 맞춤 코스를 생성해주세요.', en: 'Choose a city and travel settings, then generate an AI itinerary.', fr: 'Choisissez une ville et vos préférences, puis créez un itinéraire IA.', zh: '请选择城市和旅行条件，然后生成AI行程。', ja: '都市と旅行条件を選び、AI旅程を作成してください。', es: 'Elige una ciudad y las condiciones del viaje, y genera un itinerario con IA.' })}
      </div>
    `;
  }
}

function beginPlannerDraftForCity(cityId) {
  const activeCityId = state.activeCourse && state.activeCourse.cityId;
  const hasRouteLoaded = state.activeCourse && state.activeCourse.isRoute;
  const shouldReset = hasRouteLoaded || (activeCityId && cityId && activeCityId !== cityId);

  if (!shouldReset && !state.activeCourse) {
    return;
  }

  state.activeCourse = null;
  state.currentItineraryDay = 1;
  state.regenConfig = null;
  clearPlannerResultForDraft();
  saveToLocalStorage();
}

function isMealBreakItem(item) {
  if (!item) return false;
  const nameKo = String(item.name_ko || '');
  const nameEn = String(item.name_en || '').toLowerCase();
  const mealType = String(item.mealType || '').toLowerCase();
  return mealType === 'lunch' ||
    mealType === 'dinner' ||
    nameKo.includes('\uC810\uC2EC\uC2DC\uAC04') ||
    nameKo.includes('\uC800\uB141\uC2DC\uAC04') ||
    nameKo.includes('점심시간') ||
    nameKo.includes('저녁시간') ||
    nameEn.includes('lunch') ||
    nameEn.includes('dinner');
}

function isLunchMealBreakItem(item) {
  if (!item) return false;
  const nameKo = String(item.name_ko || '');
  const nameEn = String(item.name_en || '').toLowerCase();
  const mealType = String(item.mealType || '').toLowerCase();
  return mealType === 'lunch' ||
    nameKo.includes('\uC810\uC2EC') ||
    nameKo.includes('점심') ||
    nameEn.includes('lunch');
}

function isDinnerMealBreakItem(item) {
  if (!item) return false;
  const nameKo = String(item.name_ko || '');
  const nameEn = String(item.name_en || '').toLowerCase();
  const mealType = String(item.mealType || '').toLowerCase();
  return mealType === 'dinner' ||
    nameKo.includes('\uC800\uB141') ||
    nameKo.includes('저녁') ||
    nameEn.includes('dinner');
}

function createFallbackMealBreakItem(mealType) {
  const isLunch = mealType === 'lunch';
  return {
    name_ko: isLunch ? '\uC810\uC2EC\uC2DC\uAC04' : '\uC800\uB141\uC2DC\uAC04',
    name_en: isLunch ? 'Lunch Time' : 'Dinner Time',
    desc_ko: '\uC8FC\uBCC0 \uC2DD\uB2F9\uC5D0\uC11C \uC790\uC720\uB85C\uC6B4 \uAC1C\uBCC4 \uC2DD\uC0AC',
    desc_en: 'Enjoy individual dining at a nearby restaurant.',
    mealType,
    isRest: true,
    duration: 120,
    open: 0,
    close: 1440
  };
}

const MEAL_TIME_WINDOWS = {
  lunch: { earliest: 690, latest: 840 },
  dinner: { earliest: 1080, latest: 1260 }
};

function getMealWindowForItem(itemOrType) {
  const mealType = typeof itemOrType === 'string'
    ? itemOrType
    : (isDinnerMealBreakItem(itemOrType) ? 'dinner' : 'lunch');
  return MEAL_TIME_WINDOWS[mealType] || MEAL_TIME_WINDOWS.lunch;
}

function clampMealStartMinutes(startMinutes, itemOrType) {
  const window = getMealWindowForItem(itemOrType);
  const start = Number.isFinite(startMinutes) ? startMinutes : window.earliest;
  return Math.min(window.latest, Math.max(window.earliest, start));
}

function enforceMealTimeWindowsForItems(items) {
  if (!Array.isArray(items)) return false;
  let changed = false;
  items.forEach(item => {
    if (!isMealBreakItem(item)) return;
    const start = getTimeSlotStartMinutes(item.timeSlot);
    if (start === null) return;
    const clamped = clampMealStartMinutes(start, item);
    if (clamped === start) return;
    const duration = Number(item.duration) || (isDinnerMealBreakItem(item) ? 90 : 120);
    const startLabel = formatMinutesGlobal(clamped);
    item.timeSlot = item.timeSlot && String(item.timeSlot).includes('~')
      ? `${startLabel} ~`
      : `${startLabel} - ${formatMinutesGlobal(clamped + duration)}`;
    changed = true;
  });
  return changed;
}

function isFlexibleBreakItem(item) {
  return !!(item && (item.isFlexibleBreak || item.isDessertBreak));
}

function isEndOfDayRestItem(item) {
  if (!item || !item.isRest) return false;
  const nameKo = String(item.name_ko || '');
  const nameEn = String(item.name_en || '').toLowerCase();
  return nameKo.includes('하루 일정 마무리') ||
    nameEn.includes('wrap up the day');
}

function isReturnToLodgingItem(item) {
  if (!item) return false;
  const nameEn = String(item.name_en || '').toLowerCase();
  return !!item.isEnd || (item.isLodging && nameEn.includes('return to lodging'));
}

function stripGeneratedVenueLunchNotes(text) {
  if (!text) return text;
  return String(text)
    .replace(/\s*\*\([^)]*lunch inside the venue[^)]*\)\*/gi, '')
    .replace(/\s*\*\([^)]*free time for lunch[^)]*\)\*/gi, '')
    .replace(/\s*\*\([^)]*theme park[^)]*\)\*/gi, '')
    .replace(/\s*\*\([^)]*테마파크[^)]*\)\*/g, '')
    .trim();
}

function getDisplayTimeSlot(item) {
  if (!item || isReturnToLodgingItem(item)) return '';
  if (item.isAllDayTrip || isNearbyDayTripItem(item)) return getAllDayTripLabel();
  return item.timeSlot || '';
}

function getTimeSlotStartMinutes(timeSlot) {
  if (!timeSlot) return null;
  const match = String(timeSlot).match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

function getTimeSlotEndMinutes(item) {
  if (!item || !item.timeSlot) return null;
  const parts = String(item.timeSlot).split('-');
  if (parts.length > 1) {
    const end = getTimeSlotStartMinutes(parts[1]);
    if (end !== null) return end;
  }
  const start = getTimeSlotStartMinutes(item.timeSlot);
  if (start === null) return null;
  return start + (item.duration || 0);
}

function hasRealScheduleAfter(items, index) {
  for (let i = index + 1; i < items.length; i++) {
    const item = items[i];
    if (!item || item.isTransit || item.isRest || item.isLodging) continue;
    if (isMealBreakItem(item)) continue;
    return true;
  }
  return false;
}

function normalizeOpenEndedDinnerSlots(items) {
  if (!Array.isArray(items)) return;
  items.forEach((item, index) => {
    if (!isMealBreakItem(item)) return;
    const nameEn = String(item.name_en || '').toLowerCase();
    const isDinner = isDinnerMealBreakItem(item);
    if (!isDinner) return;

    const start = getTimeSlotStartMinutes(item.timeSlot);
    if (start === null) return;
    const normalizedStart = clampMealStartMinutes(start, item);
    const startLabel = formatMinutesGlobal(normalizedStart);
    if (!hasRealScheduleAfter(items, index)) {
      item.timeSlot = `${startLabel} ~`;
      item.hideDuration = true;
    } else {
      const end = normalizedStart + (item.duration || 90);
      item.timeSlot = `${startLabel} - ${formatMinutesGlobal(end)}`;
      item.hideDuration = false;
    }
  });
}

function isSunsetItineraryItem(item) {
  if (!item || item.isTransit || item.isLodging || isMealBreakItem(item)) return false;
  if (item.sunsetActivity === true) return true;
  const rawText = [item.name_en, item.name_ko, item.name, item.desc_en, item.desc_ko]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  const text = normalizePlaceIntentText(item);
  return /\bsunset(?: view| walk| viewpoint| cruise)?\b|\bgolden hour\b/.test(text)
    || /\bsunset(?: view| walk| viewpoint| cruise)?\b|\bgolden hour\b/.test(rawText)
    || /\uC77C\uBAB0|\uC11D\uC591|\uB178\uC744|\uC11C\uB178\uC744/.test(rawText);
}

function isNightViewItineraryItem(item) {
  if (!item || item.isTransit || item.isLodging || isMealBreakItem(item)) return false;
  if (item.eveningAfterDinner === true || item.nightView === true) return true;
  if (isSunsetItineraryItem(item)) return false;
  const rawText = [item.name_en, item.name_ko, item.name, item.desc_en, item.desc_ko]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  const text = normalizePlaceIntentText(item);
  return /\b(?:night view|night scenery|night walk|night market|after dark|evening lights|illuminated|skyline at night)\b/.test(text)
    || /\b(?:night view|night scenery|night walk|night market|after dark|evening lights|illuminated|skyline at night)\b/.test(rawText)
    || /\uC57C\uACBD|\uC57C\uAC04|\uC57C\uC2DC\uC7A5|\uC57C\uACBD\uBA85\uC18C|\uC57C\uAC04\uC870\uBA85/.test(rawText)
    || /\bhungarian parliament\b/.test(text);
}

function getCourseSunsetStartMinutes(course, dayPlan, cityId) {
  const explicit = Number(dayPlan && dayPlan.sunsetStartMin);
  if (Number.isFinite(explicit)) return Math.min(1260, Math.max(1020, Math.round(explicit / 10) * 10));

  // Planner dates are optional. When present, keep a stable local-evening
  // estimate; otherwise use a conservative 18:30 fallback that stays inside
  // the existing dinner window and never pushes a stop into the morning.
  const rawDate = course && (course.startDate || course.travelDate || course.tripStartDate);
  if (!rawDate) return 1110;
  const date = new Date(rawDate);
  if (!Number.isFinite(date.getTime())) return 1110;
  const center = getCityCenterCluster(cityId);
  if (!center || !isPlausibleGeoCoord(center)) return 1110;

  const dayOfYear = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000) + ((Number(dayPlan && dayPlan.day) || 1) - 1);
  const declination = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
  const latitude = Number(center.y) * Math.PI / 180;
  const dec = declination * Math.PI / 180;
  const cosHour = (Math.cos(90.833 * Math.PI / 180) - Math.sin(latitude) * Math.sin(dec)) / (Math.cos(latitude) * Math.cos(dec));
  if (!Number.isFinite(cosHour) || cosHour <= -1 || cosHour >= 1) return 1110;
  const hourAngle = Math.acos(cosHour) * 180 / Math.PI;
  const solarUtcHour = 18 + (hourAngle / 15) - (Number(center.x) / 15);
  const timezoneMap = {
    paris: 'Europe/Paris', london: 'Europe/London', budapest: 'Europe/Budapest',
    sydney: 'Australia/Sydney', reykjavik: 'Atlantic/Reykjavik', interlaken: 'Europe/Zurich'
  };
  const zone = timezoneMap[cityId] || 'UTC';
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(solarUtcHour), Math.round((solarUtcHour % 1) * 60)));
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(utcDate);
  const localHour = Number(parts.find(part => part.type === 'hour') && parts.find(part => part.type === 'hour').value);
  const localMinute = Number(parts.find(part => part.type === 'minute') && parts.find(part => part.type === 'minute').value);
  const minutes = localHour * 60 + localMinute;
  return Number.isFinite(minutes) ? Math.min(1260, Math.max(1020, Math.round(minutes / 10) * 10)) : 1110;
}

function normalizeEveningIntentForDay(dayPlan, course) {
  if (!dayPlan || !Array.isArray(dayPlan.items)) return false;
  const original = dayPlan.items;
  const nonTransit = original.filter(item => item && !item.isTransit);
  const sunsetItems = nonTransit.filter(isSunsetItineraryItem);
  const nightItems = nonTransit.filter(item => isNightViewItineraryItem(item) && !sunsetItems.includes(item));
  if (!sunsetItems.length && !nightItems.length) return false;

  const movable = new Set([...sunsetItems, ...nightItems]);
  const base = nonTransit.filter(item => !movable.has(item));
  const dinnerIndex = base.findIndex(isDinnerMealBreakItem);
  const endLodgingIndex = base.findIndex(item => isReturnToLodgingItem(item));
  const fallbackIndex = endLodgingIndex >= 0 ? endLodgingIndex : base.length;
  const beforeDinnerIndex = dinnerIndex >= 0 ? dinnerIndex : fallbackIndex;
  const afterDinnerIndex = dinnerIndex >= 0 ? dinnerIndex + 1 : fallbackIndex;

  const sunsetStart = getCourseSunsetStartMinutes(course, dayPlan, course && course.cityId);
  let lockedStartChanged = false;
  sunsetItems.forEach(item => {
    if (!Number.isFinite(Number(item.lockedStartMin))) {
      item.lockedStartMin = sunsetStart;
      lockedStartChanged = true;
    }
  });

  const ordered = [
    ...base.slice(0, beforeDinnerIndex),
    ...sunsetItems,
    ...base.slice(beforeDinnerIndex, afterDinnerIndex),
    ...nightItems,
    ...base.slice(afterDinnerIndex)
  ];
  const orderChanged = ordered.length !== nonTransit.length
    || ordered.some((item, index) => item !== nonTransit[index]);
  if (!orderChanged && !lockedStartChanged) return false;
  dayPlan.items = ordered;
  return true;
}

function normalizeEveningIntentForCourse(course) {
  if (!course || !Array.isArray(course.days)) return false;
  let changed = false;
  course.days.forEach(dayPlan => {
    changed = normalizeEveningIntentForDay(dayPlan, course) || changed;
  });
  return changed;
}

const ICELAND_RING_ROAD_STOP_GROUPS = Object.freeze([
  Object.freeze({ day: 2, region: 'golden-circle', aliases: Object.freeze(['thingvellir', 'geysir geothermal', 'gullfoss']) }),
  Object.freeze({ day: 3, region: 'south-coast', aliases: Object.freeze(['seljalandsfoss', 'skogafoss', 'reynisfjara']) }),
  Object.freeze({ day: 4, region: 'southeast', aliases: Object.freeze(['skaftafell', 'jokulsarlon', 'glacier lagoon']) }),
  Object.freeze({ day: 5, region: 'north', aliases: Object.freeze(['godafoss', 'lake myvatn', 'myvatn geothermal', 'akureyri']) }),
  Object.freeze({ day: 6, region: 'west-snaefellsnes', aliases: Object.freeze(['kirkjufell']) })
]);

function getIcelandRingRoadSourceItems() {
  if (typeof ATTRACTIONS === 'undefined' || !ATTRACTIONS.reykjavik) return [];
  const all = ['healing', 'culture', 'activity', 'shopping']
    .flatMap(category => Array.isArray(ATTRACTIONS.reykjavik[category]) ? ATTRACTIONS.reykjavik[category] : []);
  const found = [];
  ICELAND_RING_ROAD_STOP_GROUPS.forEach(group => {
    group.aliases.forEach(alias => {
      const key = normalizeCoordinateLookupText(alias);
      const item = all.find(candidate => {
        const text = normalizePlaceIntentText(candidate);
        return text.includes(key) && !found.includes(candidate);
      });
      if (item) found.push(item);
    });
  });
  return found;
}

function isSameIcelandRingRoadStop(item, source) {
  if (!item || !source) return false;
  const itemText = normalizePlaceIntentText(item);
  const sourceText = normalizePlaceIntentText(source);
  return itemText === sourceText || itemText.includes(sourceText) || sourceText.includes(itemText);
}

function normalizeIcelandRingRoadDays(course) {
  if (!course || course.cityId !== 'reykjavik' || !Array.isArray(course.days) || course.ringRoadNormalized) return;
  const sources = getIcelandRingRoadSourceItems();
  if (!sources.length) return;

  const ringStops = new Set(sources);
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    dayPlan.items = dayPlan.items.filter(item => {
      if (!item || item.isTransit) return false;
      return !sources.some(source => isSameIcelandRingRoadStop(item, source));
    });
  });

  ICELAND_RING_ROAD_STOP_GROUPS.forEach(group => {
    const dayPlan = course.days.find(day => Number(day.day) === group.day);
    if (!dayPlan) return;
    const stops = group.aliases.map(alias => {
      const key = normalizeCoordinateLookupText(alias);
      return sources.find(source => normalizePlaceIntentText(source).includes(key));
    }).filter((item, index, items) => item && items.indexOf(item) === index);
    if (!stops.length) return;

    const existingStart = dayPlan.items.find(item => item && item.isLodging && item.isStart) || null;
    const existingEnd = dayPlan.items.find(item => item && item.isLodging && item.isEnd) || null;
    const ordered = existingStart ? [existingStart] : [];
    stops.forEach((source, index) => {
      const item = {
        ...source,
        cityId: 'reykjavik',
        ringRoadRegion: group.region,
        ringRoadDay: group.day,
        duration: Number(source.duration) || (index === 0 ? 150 : 120)
      };
      delete item.isAllDayTrip;
      delete item.hideDuration;
      delete item.timeSlot;
      ordered.push(item);
      if (index === 1) ordered.push(createFallbackMealBreakItem('lunch'));
    });
    if (!ordered.some(isLunchMealBreakItem)) ordered.splice(Math.min(2, ordered.length), 0, createFallbackMealBreakItem('lunch'));
    ordered.push(createFallbackMealBreakItem('dinner'));
    if (existingEnd) ordered.push(existingEnd);
    dayPlan.items = ordered;
    if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, 'reykjavik');
  });

  course.ringRoadNormalized = true;
}

function getRealSightseeingItems(dayPlan) {
  if (!dayPlan || !Array.isArray(dayPlan.items)) return [];
  return dayPlan.items.filter(item => {
    if (!item || item.isTransit || item.isRest || item.isLodging) return false;
    if (isMealBreakItem(item) || isFlexibleBreakItem(item)) return false;
    if (isFoodOrDrinkAttraction(item)) return false;
    return true;
  });
}

const TOO_BROAD_PLACE_KEYS = new Set([
  'hong kong', 'new york', 'los angeles', 'san francisco', 'las vegas',
  'mexico city', 'kuala lumpur', 'rio de janeiro'
]);

let BROAD_CITY_PLACE_KEYS_CACHE = null;

function getBroadCityPlaceKeys() {
  if (BROAD_CITY_PLACE_KEYS_CACHE) return BROAD_CITY_PLACE_KEYS_CACHE;
  const keys = new Set(TOO_BROAD_PLACE_KEYS);
  if (typeof CITIES !== 'undefined' && Array.isArray(CITIES)) {
    CITIES.forEach(city => {
      if (!city) return;
      [city.name_en, city.name_ko, city.name].filter(Boolean).forEach(name => {
        const normalized = normalizeGlobalPlaceKey(name);
        if (normalized) keys.add(normalized);
      });
    });
  }
  BROAD_CITY_PLACE_KEYS_CACHE = keys;
  return keys;
}

function isBroadCityPlaceKey(key) {
  if (!key) return true;
  return getBroadCityPlaceKeys().has(key);
}

const GLOBAL_PLACE_ALIAS_RULES = [
  {
    canonical: 'hong kong disneyland',
    patterns: [/hong\s*kong\s*disney(?:land)?/i, /disneyland\s*hong\s*kong/i, /\uD64D\uCF69.*\uB514\uC988\uB2C8|\uB514\uC988\uB2C8.*\uD64D\uCF69/i]
  },
  {
    canonical: 'tai wo hau',
    patterns: [/tai\s*wo\s*hau/i, /\uB2E4\uC774\s*\uC6CC\s*\uD558\uC6B0|\uB2E4\uC774\uC6CC\uD558\uC6B0|\uD0C0\uC774\uC6CC\uD558\uC6B0/i]
  },
  {
    canonical: 'victoria peak',
    patterns: [/victoria\s*peak|peak\s*tram/i, /\uBE45\uD1A0\uB9AC\uC544.*\uD53C\uD06C|\uD53C\uD06C\s*\uD2B8\uB7A8/i]
  },
  {
    canonical: 'tsim sha tsui waterfront',
    patterns: [/tsim\s*sha\s*tsui|avenue\s*of\s*stars|star\s*ferry/i, /\uCE68\uC0AC\uCD94\uC774|\uC2A4\uD0C0\s*\uD398\uB9AC|\uC2A4\uD0C0\uC758\s*\uAC70\uB9AC/i]
  },
  {
    canonical: 'lantau big buddha',
    patterns: [/lantau|big\s*buddha|tian\s*tan|po\s*lin|ngong\s*ping/i, /\uB780\uD0C0\uC6B0|\uCC9C\uB2E8|\uB300\uBD88|\uD3EC\uB9B0/i]
  },
  {
    canonical: 'mong kok ladies market',
    patterns: [/mong\s*kok|ladies\s*market/i, /\uBABD\uCF55|\uB808\uC774\uB514\uC2A4\s*\uB9C8\uCF13/i]
  },
  {
    canonical: 'stanley market beach',
    patterns: [/stanley\s*(market|beach)?/i, /\uC2A4\uD0E0\uB9AC/i]
  },
  {
    canonical: 'wong tai sin temple',
    patterns: [/wong\s*tai\s*sin/i, /\uC6E1\uD0C0\uC774\uC2E0/i]
  },
  {
    canonical: 'hong kong palace museum',
    patterns: [/hong\s*kong\s*palace\s*museum/i, /\uD64D\uCF69\s*\uACE0\uAD81\s*\uBC15\uBB3C\uAD00/i]
  },
  {
    canonical: 'man mo temple',
    patterns: [/man\s*mo\s*temple/i, /\uB9CC\uBAA8/i]
  },
  {
    canonical: 'dragon back hike',
    patterns: [/dragon'?s?\s*back/i, /\uB4DC\uB798\uACE4/i]
  },
  {
    canonical: 'lan kwai fong',
    patterns: [/lan\s*kwai\s*fong/i, /\uB780\uCF70\uC774\uD401|\uB780\uCFE0\uC544\uC774\uD401/i]
  },
  {
    canonical: 'ocean park hong kong',
    patterns: [/ocean\s*park\s*hong\s*kong|hong\s*kong\s*ocean\s*park/i, /\uC624\uC158\s*\uD30C\uD06C/i]
  },
  {
    canonical: 'macau historic centre',
    patterns: [/macau|macao|ruins\s*of\s*st\s*paul|senado\s*square/i, /\uB9C8\uCE74\uC624|\uC138\uB098\uB3C4|\uC131\s*\uD30C\uC6B8\uB8E8/i]
  },
  {
    canonical: 'shenzhen city day trip',
    patterns: [/shenzhen|oct\s*loft|window\s*of\s*the\s*world/i, /\uC120\uC804|\uC2EC\uCC9C|\uD654\uAD50\uC131/i]
  }
];

function normalizeGlobalPlaceKey(value) {
  const repaired = repairMojibakeText(String(value || ''));
  return repaired
    .toLowerCase()
    .replace(/&|\+|\//g, ' and ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’'`]/g, '')
    .replace(/[^\w\s\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7A3]/g, ' ')
    .replace(/\b(the|a|an|official|classic|famous|major|main|central|nearby|local|around|near|full|day)\b/g, ' ')
    .replace(/\b(tour|visit|walk|walking|stroll|experience|historic|historical|landmark|route|course|area|district|neighborhood|neighbourhood|quarter|zone|view|views|viewpoint|observatory|promenade|waterfront|pier|harbour|harbor|mtr|metro|subway|railway|station|terminal|stop|entrance|exit|gate|square|plaza|street|road|avenue|market|village|park|garden|temple|shrine|museum|palace|tower|bridge|cathedral|castle|beach|trip|highlight|highlights)\b/g, ' ')
    .replace(/(주변|일대|방문|체험|탐방|관람|산책|투어|코스|루트|도심|근교|당일치기|역|정류장|터미널|공항|전망대|광장|거리|시장|공원|정원|사원|신사|박물관|궁전|타워|다리|해변)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isUsefulPlaceKey(key) {
  if (!key || isBroadCityPlaceKey(key)) return false;
  const compact = String(key).replace(/\s+/g, '');
  if (compact.length < 3) return false;
  const asciiTokens = String(key).match(/[a-z0-9]+/g) || [];
  const cjkLength = (String(key).match(/[\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7A3]/g) || []).length;
  if (cjkLength >= 3) return true;
  return asciiTokens.length >= 2 || compact.length >= 5;
}

function getGlobalPlaceAliasKeysFromText(value) {
  const repaired = repairMojibakeText(String(value || ''));
  if (!repaired) return [];
  const normalized = normalizeGlobalPlaceKey(repaired);
  const haystack = `${repaired} ${normalized}`.toLowerCase();
  return GLOBAL_PLACE_ALIAS_RULES
    .filter(rule => rule.patterns.some(pattern => pattern.test(haystack)))
    .map(rule => rule.canonical);
}

function addPlaceKeyVariant(keySet, value) {
  const key = normalizeGlobalPlaceKey(value);
  if (isUsefulPlaceKey(key)) keySet.add(key);
}

function addPlaceCoordinateKey(keySet, item) {
  if (!item) return;
  const x = Number(item.x);
  const y = Number(item.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  keySet.add(`coord:${Math.round(y * 500)}:${Math.round(x * 500)}`);
}

function getGlobalPlaceKeys(item) {
  if (!item) return [];
  if (item.isFallbackExploration) {
    const day = item.fallbackDay || item.day || item.routeDay || item.name_en || item.name_ko || 'day';
    return [`fallback-exploration:${item.cityId || 'city'}:${day}`];
  }
  const values = [item.name_en, item.name_ko, item.name, item.title].filter(Boolean);
  const keySet = new Set();
  values.forEach(value => {
    getGlobalPlaceAliasKeysFromText(value).forEach(key => keySet.add(key));
    const key = normalizeGlobalPlaceKey(value);
    addPlaceKeyVariant(keySet, key);
    addPlaceKeyVariant(keySet, key.replace(/\b(and|with|plus)\b/g, ' '));
    key.split(/\b(?:and|with|plus)\b/g).forEach(part => addPlaceKeyVariant(keySet, part));
  });
  addPlaceCoordinateKey(keySet, item);
  return Array.from(keySet);
}

function getGlobalPlaceKey(item) {
  return getGlobalPlaceKeys(item)[0] || '';
}

function getPlaceKeyTokens(key) {
  return String(key || '')
    .split(/\s+/)
    .filter(token => token && !['and', 'with', 'plus', 'the', 'of', 'de', 'la', 'le', 'el', 'di', 'del', 'du'].includes(token));
}

function doPlaceKeysOverlap(a, b) {
  if (!isUsefulPlaceKey(a) || !isUsefulPlaceKey(b)) return false;
  if (a === b) return true;

  const compactA = a.replace(/\s+/g, '');
  const compactB = b.replace(/\s+/g, '');
  if (compactA.length >= 4 && compactB.length >= 4 && (compactA.includes(compactB) || compactB.includes(compactA))) {
    return true;
  }

  const aTokens = getPlaceKeyTokens(a);
  const bTokens = getPlaceKeyTokens(b);
  if (aTokens.length < 2 || bTokens.length < 2) return false;

  const shorter = aTokens.length <= bTokens.length ? aTokens : bTokens;
  const longer = aTokens.length <= bTokens.length ? bTokens : aTokens;
  const common = shorter.filter(token => longer.includes(token)).length;
  if (shorter.length >= 2 && common === shorter.length) return true;
  return shorter.length >= 3 && common >= 3 && common / shorter.length >= 0.75;
}

function placeKeysOverlap(keysA, keysB) {
  const aList = Array.isArray(keysA) ? keysA : [keysA];
  const bList = Array.isArray(keysB) ? keysB : [keysB];
  return aList.some(a => bList.some(b => doPlaceKeysOverlap(a, b)));
}

function hasUsedPlaceKeys(keys, usedKeys) {
  const keyList = Array.isArray(keys) ? keys : [keys];
  if (!keyList.length || !usedKeys) return false;
  for (const usedKey of usedKeys) {
    if (placeKeysOverlap(keyList, usedKey)) return true;
  }
  return false;
}

function rememberUsedPlaceKeys(itemOrKeys, usedKeys) {
  if (!usedKeys) return;
  const keys = Array.isArray(itemOrKeys) ? itemOrKeys : getGlobalPlaceKeys(itemOrKeys);
  keys.forEach(key => {
    if (isUsefulPlaceKey(key)) usedKeys.add(key);
  });
}

function isDuplicateCheckSightseeingItem(item) {
  if (!item || item.isTransit || item.isRest || item.isLodging) return false;
  if (isMealBreakItem(item) || isFlexibleBreakItem(item)) return false;
  return true;
}

function getReplacementCandidatePool(cityId) {
  const cityPools = (typeof ATTRACTIONS !== 'undefined' && ATTRACTIONS[cityId]) || null;
  if (!cityPools) return [];
  const categories = ['must', 'landmarks', 'culture', 'healing', 'activity', 'shopping', 'photo', 'sports'];
  const pool = [];
  categories.forEach(category => {
    (cityPools[category] || []).forEach(item => {
      if (!isDuplicateCheckSightseeingItem(item) || isFoodOrDrinkAttraction(item)) return;
      if (isNearbyDayTripItem(item) && !isReasonableNearbyDayTripForCity(item, cityId)) return;
      pool.push(item);
    });
  });
  return pool.sort((a, b) => {
    if (!!b.isLandmark !== !!a.isLandmark) return Number(!!b.isLandmark) - Number(!!a.isLandmark);
    return compareAttractionPriority(b, a);
  });
}

function findUniqueReplacementCandidate(cityId, usedKeys) {
  const pool = getReplacementCandidatePool(cityId);
  for (const candidate of pool) {
    const keys = getGlobalPlaceKeys(candidate);
    if (hasUsedPlaceKeys(keys, usedKeys)) continue;
    const replacement = { ...candidate, cityId };
    const coords = getAttractionCoords(replacement, cityId);
    replacement.x = coords.x;
    replacement.y = coords.y;
    normalizeVisitDurationByType(replacement);
    return replacement;
  }
  return null;
}

function removeDuplicateSightseeingAcrossDays(course) {
  if (!course || !course.cityId || !Array.isArray(course.days)) return false;
  const usedKeys = new Set();
  let changed = false;

  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    const nextItems = [];
    dayPlan.items.forEach(item => {
      if (!isDuplicateCheckSightseeingItem(item)) {
        nextItems.push(item);
        return;
      }

      const keys = getGlobalPlaceKeys(item);
      const alreadyUsed = hasUsedPlaceKeys(keys, usedKeys);
      if (!alreadyUsed) {
        rememberUsedPlaceKeys(keys, usedKeys);
        nextItems.push(item);
        return;
      }

      const replacement = findUniqueReplacementCandidate(course.cityId, usedKeys);
      if (replacement) {
        rememberUsedPlaceKeys(replacement, usedKeys);
        nextItems.push(replacement);
      }
      changed = true;
    });

    if (changed) {
      dayPlan.items = nextItems;
      if (typeof recalculateDayPlanTimes === 'function') {
        recalculateDayPlanTimes(dayPlan, course.cityId);
      }
    }
  });

  return changed;
}

const DEDUPED_ATTRACTION_POOL_CITY_IDS = new Set();

function getAttractionCategoryOrder(pools) {
  const preferredOrder = ['must', 'landmarks', 'culture', 'healing', 'activity', 'photo', 'shopping', 'sports', 'gourmet'];
  const keys = Object.keys(pools || {});
  return [
    ...preferredOrder.filter(key => keys.includes(key)),
    ...keys.filter(key => !preferredOrder.includes(key))
  ];
}

function dedupeAttractionPoolsForCity(cityId, options = {}) {
  if (!cityId || typeof ATTRACTIONS === 'undefined' || !ATTRACTIONS[cityId]) return 0;
  if (!options.force && DEDUPED_ATTRACTION_POOL_CITY_IDS.has(cityId)) return 0;
  const pools = ATTRACTIONS[cityId];
  const usedKeys = new Set();
  let removed = 0;

  getAttractionCategoryOrder(pools).forEach(category => {
    const list = pools[category];
    if (!Array.isArray(list)) return;
    const next = [];
    list.forEach(item => {
      if (!item || item.isTransit || item.isRest || item.isLodging) {
        next.push(item);
        return;
      }
      if (typeof isInvalidGeneratedPlaceForCity === 'function' && isInvalidGeneratedPlaceForCity(item, cityId)) {
        removed += 1;
        return;
      }
      const keys = item.regionalRoute
        ? [`regional:${item.regionalRoute}:${Number(item.regionalStopOrder) || 0}`]
        : getGlobalPlaceKeys(item);
      if (keys.length && hasUsedPlaceKeys(keys, usedKeys)) {
        removed += 1;
        return;
      }
      rememberUsedPlaceKeys(keys, usedKeys);
      next.push(item);
    });
    pools[category] = next;
  });

  DEDUPED_ATTRACTION_POOL_CITY_IDS.add(cityId);
  return removed;
}

function dedupeAllAttractionPools() {
  if (typeof ATTRACTIONS === 'undefined' || !ATTRACTIONS) return 0;
  return Object.keys(ATTRACTIONS).reduce((sum, cityId) => sum + dedupeAttractionPoolsForCity(cityId), 0);
}

function getCityRepresentativeCoords(cityId) {
  if (!cityId) return null;
  if (typeof CITY_CLUSTERS !== 'undefined') {
    const clusters = CITY_CLUSTERS[cityId];
    if (Array.isArray(clusters) && clusters.length) {
      const first = clusters.find(cluster => Number.isFinite(Number(cluster.x)) && Number.isFinite(Number(cluster.y)));
      if (first) return { x: Number(first.x), y: Number(first.y) };
    }
  }
  const pools = typeof ATTRACTIONS !== 'undefined' ? ATTRACTIONS[cityId] : null;
  if (pools) {
    for (const category of getAttractionCategoryOrder(pools)) {
      const item = Array.isArray(pools[category])
        ? pools[category].find(candidate => Number.isFinite(Number(candidate.x)) && Number.isFinite(Number(candidate.y)))
        : null;
      if (item) return { x: Number(item.x), y: Number(item.y) };
    }
  }
  if (CITY_DEFAULT_COORDS[cityId]) return CITY_DEFAULT_COORDS[cityId];
  return null;
}

function getDayTripDistanceFromCityKm(item, cityId) {
  if (!item || !cityId || typeof getHaversineDistance !== 'function') return Infinity;
  const base = getCityRepresentativeCoords(cityId);
  if (!base) return Infinity;
  let coords = null;
  if (Number.isFinite(Number(item.x)) && Number.isFinite(Number(item.y))) {
    coords = { x: Number(item.x), y: Number(item.y) };
  } else if (typeof getAttractionCoords === 'function') {
    coords = getAttractionCoords(item, cityId);
  }
  if (!coords || !Number.isFinite(Number(coords.x)) || !Number.isFinite(Number(coords.y))) return Infinity;
  return getHaversineDistance(base.y, base.x, Number(coords.y), Number(coords.x));
}

function isReasonableNearbyDayTripForCity(item, cityId) {
  if (!isNearbyDayTripItem(item)) return true;
  const text = getAttractionSearchText(item);
  if (FAR_DAY_TRIP_TEXT_PATTERN.test(text)) return false;
  const oneWayMinutes = Number(item.oneWayTravelMinutes);
  if (Number.isFinite(oneWayMinutes) && oneWayMinutes > MAX_REASONABLE_DAY_TRIP_ONE_WAY_MINUTES) return false;
  const distanceKm = getDayTripDistanceFromCityKm(item, cityId || item.cityId);
  return Number.isFinite(distanceKm) && distanceKm <= MAX_REASONABLE_DAY_TRIP_KM;
}

function getVerifiedGroundDayTripMinutes(fromId, toId) {
  if (typeof getTravelData !== 'function') return null;
  const data = getTravelData(fromId, toId);
  if (!data) return null;
  const options = ['train', 'bus', 'ferry']
    .map(type => data[type])
    .filter(option => option && option.estimated !== true && Number.isFinite(Number(option.time)))
    .map(option => Number(option.time));
  return options.length ? Math.min(...options) : null;
}

function getDynamicNearbyCityDayTripCandidate(cityId, usedKeys = new Set()) {
  if (!cityId || typeof CITIES === 'undefined' || !Array.isArray(CITIES)) return null;
  const baseCity = CITIES.find(city => city && city.id === cityId);
  const baseCoords = getCityRepresentativeCoords(cityId);
  if (!baseCity || !baseCoords || typeof getHaversineDistance !== 'function') return null;

  const candidates = getSupportedDestinationCities()
    .filter(city => city && city.id !== cityId)
    .map(city => {
      const coords = getCityRepresentativeCoords(city.id);
      if (!coords) return null;
      const distanceKm = getHaversineDistance(baseCoords.y, baseCoords.x, coords.y, coords.x);
      if (!Number.isFinite(distanceKm) || distanceKm < 35 || distanceKm > MAX_REASONABLE_DAY_TRIP_KM) return null;
      const oneWayTravelMinutes = getVerifiedGroundDayTripMinutes(cityId, city.id);
      if (!Number.isFinite(oneWayTravelMinutes) || oneWayTravelMinutes > MAX_REASONABLE_DAY_TRIP_ONE_WAY_MINUTES) return null;
      return { city, coords, distanceKm, oneWayTravelMinutes };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const sameCountryA = a.city.country_en && baseCity.country_en && a.city.country_en === baseCity.country_en ? 0 : 1;
      const sameCountryB = b.city.country_en && baseCity.country_en && b.city.country_en === baseCity.country_en ? 0 : 1;
      if (sameCountryA !== sameCountryB) return sameCountryA - sameCountryB;
      return a.distanceKm - b.distanceKm;
    });

  for (const candidate of candidates) {
    const target = candidate.city;
    const duration = candidate.distanceKm > 180 ? 540 : 480;
    const item = {
      name_ko: `${target.name_ko || target.name_en} 당일치기`,
      name_en: `${target.name_en || target.name_ko} Day Trip`,
      desc_ko: `${baseCity.name_ko || baseCity.name_en}에서 ${target.name_ko || target.name_en}까지 이동해 대표 관광지와 도심을 둘러보는 실제 당일 코스`,
      desc_en: `Real day trip from ${baseCity.name_en || baseCity.name_ko} to ${target.name_en || target.name_ko}, focused on the destination city center and major sights.`,
      duration,
      isLandmark: false,
      isNearbyDayTrip: true,
      isAllDayTrip: true,
      oneWayTravelMinutes: candidate.oneWayTravelMinutes,
      x: candidate.coords.x,
      y: candidate.coords.y,
      open: duration >= 600 ? 420 : 480,
      close: 1320,
      cityId
    };
    if (isReasonableNearbyDayTripForCity(item, cityId) && !hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys)) return item;
  }
  return null;
}

function getGenericCityExplorationCandidate(cityId, dayNumber, usedKeys = new Set()) {
  if (!cityId || typeof CITIES === 'undefined' || !Array.isArray(CITIES)) return null;
  const city = CITIES.find(candidate => candidate && candidate.id === cityId);
  const coords = getCityRepresentativeCoords(cityId);
  if (!city || !coords) return null;

  const day = Number(dayNumber) || 1;
  const offset = Math.min(0.04, day * 0.006);
  const cityNameKo = city.name_ko || city.name_en || city.id;
  const cityNameEn = city.name_en || city.name_ko || city.id;
  const item = {
    name_ko: `${cityNameKo} 도심·동네 탐방 루트 ${day}`,
    name_en: `${cityNameEn} Local City Exploration Route ${day}`,
    desc_ko: `${cityNameKo}의 실제 도심, 시장, 산책 구역, 동네 명소를 여유롭게 둘러보는 보충 일정입니다.`,
    desc_en: `Flexible real-world exploration around ${cityNameEn}, using central neighborhoods, markets, waterfronts, parks, and walkable local areas.`,
    duration: 300,
    isLandmark: false,
    isFallbackExploration: true,
    fallbackDay: day,
    x: Number(coords.x) + offset,
    y: Number(coords.y) + offset,
    open: 540,
    close: 1260,
    cityId
  };
  return hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys) ? null : item;
}

function isFoodOrDrinkAttraction(item) {
  if (isNearbyDayTripItem(item) || item?.isAllDayTrip) return false;
  const text = (((item && item.name_ko) || '') + ' ' + ((item && item.name_en) || '')).toLowerCase();
  if (text.includes('café')) return true;
  if (['식당', '레스토랑', '맛집', '음식점', '카페', '찻집', '베이커리', '빵집', '디저트', '펍', '선술집', '바 ', '이자카야'].some(kw => text.includes(kw))) return true;
  return /\b(restaurant|cafe|café|coffee|bistro|diner|eatery|pub|bar|bakery|patisserie|brunch|gastronomy)\b/.test(text);
}

function isFullDayAnchorItem(item) {
  if (!item) return false;
  const text = getAttractionSearchText(item).toLowerCase();
  const duration = Number(item.duration) || 0;
  if (isOutletOrFarShoppingItem(item) || isNearbyDayTripItem(item)) return duration >= 420;
  return duration >= 420 && ['universal', 'disney', 'theme park', 'amusement park', 'lotte world', 'everland', 'legoland'].some(kw => text.includes(kw));
}

function getAllDayTripLabel() {
  return getDataLabel('fullDay');
}

function markNearbyDayTripPresentation(item) {
  if (!item || !isNearbyDayTripItem(item)) return item;
  item.isAllDayTrip = true;
  item.hideDuration = true;
  item.timeSlot = getAllDayTripLabel();
  item.duration = Math.max(Number(item.duration) || 0, getTypicalVisitDuration(item));
  return item;
}

function isSparseSightseeingDay(dayPlan) {
  const realItems = getRealSightseeingItems(dayPlan);
  if (realItems.length === 0) return true;
  if (realItems.some(isFullDayAnchorItem)) return false;
  const visitMinutes = realItems.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  return realItems.length < 2 && visitMinutes < 300;
}

function getTypicalVisitDuration(item) {
  if (!item) return 90;
  const text = getAttractionSearchText(item).toLowerCase();
  if (isOutletOrFarShoppingItem(item)) return 480;
  if (isNearbyDayTripItem(item)) return /(hangzhou|nikko|pompeii|fjord|flam|fl\u00e5m|naeroyfjord|n\u00e6r\u00f8yfjord|meteora|saronic|cliffs of moher|giant s causeway|milford)/.test(text) ? 540 : 480;
  if (['universal', 'disney', 'theme park', 'amusement park', 'lotte world', 'everland', 'legoland'].some(kw => text.includes(kw))) return 480;
  if (['coney island', 'boardwalk', 'aquarium', 'zoo'].some(kw => text.includes(kw))) return 180;
  if (['statue of liberty', 'ellis island', 'liberty island ferry'].some(kw => text.includes(kw))) return 240;
  if (['forbidden city', 'versailles'].some(kw => text.includes(kw))) return 240;
  if (['gyeongbokgung', 'changdeokgung', 'summer palace', 'topkapi', 'grand palace', 'palace'].some(kw => text.includes(kw))) return 180;
  if (['metropolitan museum', 'american museum of natural history', 'british museum', 'louvre', 'vatican museum', 'uffizi', 'prado', 'rijksmuseum', 'national museum'].some(kw => text.includes(kw))) return 210;
  if (['museum', 'gallery', 'moma', 'exhibition'].some(kw => text.includes(kw))) return 150;
  if (['tower', 'observatory', 'viewpoint', 'skydeck', 'skyline'].some(kw => text.includes(kw))) return 90;
  if (['garden', 'park', 'beach', 'market', 'street', 'square', 'neighborhood', 'district', 'lane', 'walk'].some(kw => text.includes(kw))) return 120;
  return Number(item.duration) || 90;
}

function getRequiredVisitDuration(item) {
  if (!item || item.isTransit || item.isLodging || item.isRest) return 0;
  const text = getAttractionSearchText(item).toLowerCase();
  if (isOutletOrFarShoppingItem(item)) return 480;
  if (isNearbyDayTripItem(item)) return getTypicalVisitDuration(item);
  if (['universal', 'disney', 'theme park', 'amusement park', 'lotte world', 'everland', 'legoland'].some(kw => text.includes(kw))) return 480;
  if (['statue of liberty', 'ellis island', 'liberty island ferry'].some(kw => text.includes(kw))) return 240;
  if (['forbidden city', 'versailles'].some(kw => text.includes(kw))) return 240;
  if (['gyeongbokgung', 'changdeokgung', 'summer palace', 'topkapi', 'grand palace', 'palace'].some(kw => text.includes(kw))) return 180;
  if (['metropolitan museum', 'american museum of natural history', 'british museum', 'louvre', 'vatican museum', 'uffizi', 'prado', 'rijksmuseum', 'national museum'].some(kw => text.includes(kw))) return 210;
  if (['museum', 'gallery', 'moma', 'exhibition'].some(kw => text.includes(kw))) return 150;
  return 0;
}

function normalizeUndersizedGeneratedDurations(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    let changed = false;
    getRealSightseeingItems(dayPlan).forEach(item => {
      const required = getRequiredVisitDuration(item);
      const current = Number(item.duration) || 0;
      if (required > 0 && current < required) {
        item.duration = required;
        changed = true;
      }
    });
    if (changed && typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
  });
}

function normalizeOverextendedGeneratedDurations(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    let changed = false;
    getRealSightseeingItems(dayPlan).forEach(item => {
      if (isFullDayAnchorItem(item)) return;
      const current = Number(item.duration) || 0;
      const typical = getTypicalVisitDuration(item);
      if (current >= 420 && typical < 300) {
        item.duration = typical;
        changed = true;
      }
    });
    if (changed && typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
  });
}

function getInsertBeforeDinnerIndex(items) {
  if (!Array.isArray(items)) return -1;
  const dinnerIdx = items.findIndex(item => isMealBreakItem(item) && isDinnerMealBreakItem(item));
  return dinnerIdx >= 0 ? dinnerIdx : items.length;
}

function removeItemFromDay(dayPlan, item) {
  if (!dayPlan || !Array.isArray(dayPlan.items)) return false;
  const idx = dayPlan.items.indexOf(item);
  if (idx >= 0) {
    dayPlan.items.splice(idx, 1);
    return true;
  }
  const key = getGlobalPlaceKey(item);
  const fallbackIdx = dayPlan.items.findIndex(candidate => getGlobalPlaceKey(candidate) === key);
  if (fallbackIdx >= 0) {
    dayPlan.items.splice(fallbackIdx, 1);
    return true;
  }
  return false;
}

function insertSightseeingBeforeDinner(dayPlan, item) {
  if (!dayPlan || !Array.isArray(dayPlan.items) || !item) return;
  dayPlan.items.splice(getInsertBeforeDinnerIndex(dayPlan.items), 0, item);
}

function rebalanceSparseItineraryDays(course) {
  if (!course || !Array.isArray(course.days)) return;
  normalizeUndersizedGeneratedDurations(course);
  normalizeOverextendedGeneratedDurations(course);
  for (let i = 0; i < course.days.length; i++) {
    if (i < 2) continue;
    const targetDay = course.days[i];
    if (!isSparseSightseeingDay(targetDay)) continue;
    for (let j = i + 1; j < course.days.length; j++) {
      const sourceDay = course.days[j];
      const sourceRealItems = getRealSightseeingItems(sourceDay);
      if (sourceRealItems.length <= 1) continue;
      const movable = sourceRealItems.find(item => !isFullDayAnchorItem(item));
      if (!movable) continue;
      if (removeItemFromDay(sourceDay, movable)) {
        insertSightseeingBeforeDinner(targetDay, movable);
        if (typeof recalculateDayPlanTimes === 'function') {
          recalculateDayPlanTimes(targetDay, course.cityId);
          recalculateDayPlanTimes(sourceDay, course.cityId);
        }
      }
      break;
    }
  }
}

const SPARSE_DAY_CITY_SUPPLEMENTS = {
  newyork: [
    { name_ko: '브루클린 브리지와 덤보 산책', name_en: 'Brooklyn Bridge & DUMBO Walk', name_zh: '布鲁克林大桥与丹波区漫步', name_ja: 'ブルックリン橋とダンボ散策', name_fr: 'Pont de Brooklyn et DUMBO', name_es: 'Puente de Brooklyn y DUMBO', duration: 120, x: -73.9969, y: 40.7061, open: 540, close: 1320, desc_ko: '브루클린 브리지를 건너 덤보와 맨해튼 브리지 전망을 함께 보는 실제 뉴욕 산책 코스', desc_en: 'Real New York walk across Brooklyn Bridge to DUMBO and Manhattan Bridge viewpoints', desc_zh: '穿过布鲁克林大桥，欣赏丹波区和曼哈顿桥景观。' },
    { name_ko: '타임스퀘어 네온 거리 산책', name_en: 'Times Square Neon Walk', name_zh: '时代广场霓虹街区漫步', name_ja: 'タイムズスクエアのネオン散策', name_fr: 'Promenade lumineuse à Times Square', name_es: 'Paseo por Times Square', duration: 90, x: -73.9855, y: 40.7580, open: 540, close: 1440, desc_ko: '브로드웨이 극장가와 대형 전광판이 모인 뉴욕 대표 야간 거리 산책', desc_en: 'Classic New York evening walk through Broadway theaters and Times Square lights', desc_zh: '漫步百老汇剧院区和时代广场霓虹灯牌之间。' }
  ],
  shanghai: [
    { name_ko: '상하이 박물관 청동기 컬렉션', name_en: 'Shanghai Museum', duration: 150, x: 121.4737, y: 31.2304, open: 540, close: 1080, desc_ko: '인민광장에 있는 상하이 대표 박물관에서 중국 고대 예술과 청동기 컬렉션을 관람', desc_en: 'Visit Shanghai Museum at People Square for Chinese ancient art and bronze collections' },
    { name_ko: '더 번드 와이탄 산책', name_en: 'The Bund Waterfront Promenade', duration: 120, x: 121.4897, y: 31.2382, open: 540, close: 1440, desc_ko: '황푸강 서안의 역사 건축과 푸둥 스카이라인을 함께 보는 상하이 대표 산책 코스', desc_en: 'Walk the historic Bund waterfront with Pudong skyline views across the Huangpu River' },
    { name_ko: '푸싱공원과 프랑스 조계지 산책', name_en: 'Fuxing Park & Former French Concession Walk', duration: 120, x: 121.4635, y: 31.2197, open: 540, close: 1200, desc_ko: '푸싱공원과 옛 프랑스 조계지 가로수길을 잇는 실제 도심 산책 코스', desc_en: 'Real central Shanghai walk through Fuxing Park and the former French Concession streets' }
  ],
  seoul: [
    { name_ko: '북촌한옥마을 골목 산책', name_en: 'Bukchon Hanok Village Walk', duration: 120, x: 126.9849, y: 37.5826, open: 540, close: 1080, desc_ko: '경복궁과 창덕궁 사이 실제 한옥 골목을 따라 걷는 서울 대표 산책 코스', desc_en: 'Walk Seoul historic hanok alleys between Gyeongbokgung and Changdeokgung' },
    { name_ko: '남산서울타워 전망', name_en: 'N Seoul Tower Observatory', duration: 120, x: 126.9882, y: 37.5512, open: 600, close: 1320, desc_ko: '남산 정상에서 서울 도심 전망을 보는 대표 전망 명소', desc_en: 'Classic Seoul viewpoint from N Seoul Tower on Namsan' }
  ],
  rome: [
    { name_ko: '트라스테베레 골목 산책', name_en: 'Trastevere Neighborhood Walk', duration: 120, x: 12.4697, y: 41.8896, open: 540, close: 1320, desc_ko: '로마 현지 분위기가 남아 있는 트라스테베레 골목과 광장을 걷는 실제 산책 코스', desc_en: 'Walk the real Trastevere lanes and piazzas for a classic Rome neighborhood experience' },
    { name_ko: '캄피돌리오 광장과 카피톨리노 언덕', name_en: 'Piazza del Campidoglio & Capitoline Hill', duration: 120, x: 12.4828, y: 41.8933, open: 540, close: 1200, desc_ko: '미켈란젤로가 설계한 광장과 포로 로마노 전망을 함께 보는 로마 중심 코스', desc_en: 'Visit Michelangelo designed Piazza del Campidoglio and Capitoline Hill views' }
  ]
};

function getUsedSightseeingKeys(dayPlans) {
  const used = new Set();
  (dayPlans || []).forEach(dayPlan => {
    getRealSightseeingItems(dayPlan).forEach(item => {
      rememberUsedPlaceKeys(item, used);
    });
  });
  return used;
}

function pickSupplementalAttractionForDay(dayPlan, cityPools, cityId, usedKeys) {
  const currentReal = getRealSightseeingItems(dayPlan);
  const anchor = currentReal[currentReal.length - 1] || null;
  const candidates = ['culture', 'healing', 'activity', 'shopping']
    .flatMap(cat => cityPools && Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => {
      if (!item || item.isRest || item.isTransit || item.isLodging) return false;
      if (isMealBreakItem(item) || isFlexibleBreakItem(item) || isFoodOrDrinkAttraction(item)) return false;
      if (isFullDayAnchorItem(item)) return false;
      const keys = getGlobalPlaceKeys(item);
      return !hasUsedPlaceKeys(keys, usedKeys);
    })
    .map(item => {
      const coords = getAttractionCoords(item, cityId);
      const candidate = { ...item, cityId, x: item.x ?? coords.x, y: item.y ?? coords.y };
      normalizeVisitDurationByType(candidate);
      return { item: candidate, score: (candidate.isLandmark ? -1000 : 0) + (anchor ? getDistance(anchor, candidate) : 0) };
    })
    .sort((a, b) => a.score - b.score);

  if (candidates.length) return candidates[0].item;

  const extras = SPARSE_DAY_CITY_SUPPLEMENTS[cityId] || [];
  const extra = extras.find(item => {
    const keys = getGlobalPlaceKeys(item);
    return !hasUsedPlaceKeys(keys, usedKeys);
  });
  return extra ? { ...extra, cityId } : null;
}

function fillSparseDaysFromPools(dayPlans, cityPools, cityId) {
  if (!Array.isArray(dayPlans)) return;
  const usedKeys = getUsedSightseeingKeys(dayPlans);
  dayPlans.forEach(dayPlan => {
    let attempts = 0;
    while (isSparseSightseeingDay(dayPlan) && attempts < 2) {
      attempts++;
      const candidate = pickSupplementalAttractionForDay(dayPlan, cityPools, cityId, usedKeys);
      if (!candidate) break;
      insertSightseeingBeforeDinner(dayPlan, candidate);
      rememberUsedPlaceKeys(candidate, usedKeys);
      if (typeof recalculateDayPlanTimes === 'function') {
        recalculateDayPlanTimes(dayPlan, cityId);
      }
    }
  });
}

function countNearbyTripDays(dayPlans) {
  return (Array.isArray(dayPlans) ? dayPlans : []).filter(dayPlan =>
    dayPlan && Array.isArray(dayPlan.items) && dayPlan.items.some(isNearbyDayTripItem)
  ).length;
}

function ensureNonEmptySightseeingDays(dayPlans, cityPools, cityId) {
  if (!Array.isArray(dayPlans) || !cityPools) return;
  const usedKeys = getUsedSightseeingKeys(dayPlans);
  const sourceCats = ['culture', 'healing', 'activity', 'shopping'];
  const candidates = sourceCats
    .flatMap(cat => Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => item && !item.isRest && !item.isTransit && !item.isLodging && !isMealBreakItem(item) && !isFlexibleBreakItem(item))
    .filter(item => !isFoodOrDrinkAttraction(item))
    .sort(compareAttractionPriority);

  dayPlans.forEach(dayPlan => {
    if (!isSparseSightseeingDay(dayPlan)) return;
    const allowDayTrip = dayPlans.length >= 5 && dayPlan.day >= 4 && countNearbyTripDays(dayPlans) < 2;
    const allowOtherFullDay = dayPlans.length >= 5 && dayPlan.day >= 5;
    const hasUnusedLocal = candidates.some(item =>
      !isNearbyDayTripItem(item) && !hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys)
    );
    let candidate = candidates.find(item => {
      if (isNearbyDayTripItem(item)) return false;
      if (!allowOtherFullDay && isFullDayAnchorItem(item)) return false;
      const keys = getGlobalPlaceKeys(item);
      return !hasUsedPlaceKeys(keys, usedKeys);
    });
    if (!candidate && !hasUnusedLocal && allowDayTrip) {
      candidate = candidates.find(item => isNearbyDayTripItem(item)
        && isReasonableNearbyDayTripForCity(item, cityId)
        && !hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys));
    }
    if (!candidate) return;
    const coords = getAttractionCoords(candidate, cityId);
    const item = { ...candidate, cityId, x: candidate.x ?? coords.x, y: candidate.y ?? coords.y };
    normalizeVisitDurationByType(item);
    insertSightseeingBeforeDinner(dayPlan, item);
    rememberUsedPlaceKeys(item, usedKeys);
    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, cityId);
    }
  });
}

function ensureEveryDayHasSightseeing(dayPlans, cityPools, cityId) {
  if (!Array.isArray(dayPlans) || !cityPools) return;
  const usedKeys = getUsedSightseeingKeys(dayPlans);
  const candidates = ['culture', 'healing', 'activity', 'shopping']
    .flatMap(cat => Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => item && !item.isRest && !item.isTransit && !item.isLodging)
    .filter(item => !isMealBreakItem(item) && !isFlexibleBreakItem(item) && !isFoodOrDrinkAttraction(item))
    .sort(compareAttractionPriority);

  dayPlans.forEach(dayPlan => {
    if (getRealSightseeingItems(dayPlan).length > 0) return;
    const allowDayTrip = dayPlans.length >= 5 && dayPlan.day >= 4 && countNearbyTripDays(dayPlans) < 2;
    const allowOtherFullDay = dayPlans.length >= 5 && dayPlan.day >= 5;
    const hasUnusedLocal = candidates.some(item =>
      !isNearbyDayTripItem(item) && !hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys)
    );
    let candidate = candidates.find(item => {
      if (isNearbyDayTripItem(item)) return false;
      if (!allowOtherFullDay && isFullDayAnchorItem(item)) return false;
      const keys = getGlobalPlaceKeys(item);
      return !hasUsedPlaceKeys(keys, usedKeys);
    });
    if (!candidate && !hasUnusedLocal && allowDayTrip) {
      candidate = candidates.find(item => isNearbyDayTripItem(item)
        && isReasonableNearbyDayTripForCity(item, cityId)
        && !hasUsedPlaceKeys(getGlobalPlaceKeys(item), usedKeys));
    }
    if (!candidate && !hasUnusedLocal && allowDayTrip) {
      candidate = getDynamicNearbyCityDayTripCandidate(cityId, usedKeys);
    }
    if (!candidate) return;

    const coords = getAttractionCoords(candidate, cityId);
    const item = { ...candidate, cityId, x: candidate.x ?? coords.x, y: candidate.y ?? coords.y };
    normalizeVisitDurationByType(item);
    insertSightseeingBeforeDinner(dayPlan, item);
    rememberUsedPlaceKeys(item, usedKeys);
    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, cityId);
    }
  });
}

function removeLowPriorityFillersFromEarlyDay(dayPlan) {
  if (!dayPlan || !Array.isArray(dayPlan.items)) return;
  const realSightseeing = getRealSightseeingItems(dayPlan)
    .filter(item => !isFoodOrDrinkAttraction(item) && !isFlexibleBreakItem(item));
  if (realSightseeing.length > 0) return;
  dayPlan.items = dayPlan.items.filter(item => {
    if (!item) return false;
    if (isMealBreakItem(item) || item.isTransit || item.isLodging) return true;
    if (item.isRest || isFlexibleBreakItem(item) || isFoodOrDrinkAttraction(item)) return false;
    return true;
  });
}

function ensureEarlyDaysHaveCityAttractions(dayPlans, cityPools, cityId) {
  if (!Array.isArray(dayPlans) || !cityPools) return;
  const usedKeys = getUsedSightseeingKeys(dayPlans);
  const candidates = ['culture', 'healing', 'activity', 'shopping', 'photo']
    .flatMap(cat => Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => {
      if (!item || item.isRest || item.isTransit || item.isLodging) return false;
      if (isMealBreakItem(item) || isFlexibleBreakItem(item) || isFoodOrDrinkAttraction(item)) return false;
      if (isNearbyDayTripItem(item) || isFullDayAnchorItem(item)) return false;
      return true;
    })
    .sort(compareAttractionPriority);

  dayPlans.slice(0, Math.min(2, dayPlans.length)).forEach((dayPlan, idx) => {
    removeLowPriorityFillersFromEarlyDay(dayPlan);
    const targetCount = idx === 0 ? 2 : 1;
    let realCount = getRealSightseeingItems(dayPlan)
      .filter(item => !isFoodOrDrinkAttraction(item) && !isNearbyDayTripItem(item))
      .length;

    for (const candidate of candidates) {
      if (realCount >= targetCount) break;
      const keys = getGlobalPlaceKeys(candidate);
      if (hasUsedPlaceKeys(keys, usedKeys)) continue;
      const coords = getAttractionCoords(candidate, cityId);
      const item = { ...candidate, cityId, x: candidate.x ?? coords.x, y: candidate.y ?? coords.y };
      normalizeVisitDurationByType(item);
      insertSightseeingBeforeDinner(dayPlan, item);
      rememberUsedPlaceKeys(keys, usedKeys);
      realCount++;
    }

    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, cityId);
    }
  });
}

function ensureTopCityAttractionsInFirstTwoDays(dayPlans, cityPools, cityId) {
  if (!Array.isArray(dayPlans) || dayPlans.length === 0 || !cityPools) return;
  const earlyDays = dayPlans.slice(0, Math.min(2, dayPlans.length));
  const topCandidates = ['culture', 'healing', 'activity', 'shopping', 'photo']
    .flatMap(cat => Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => {
      if (!item || item.isRest || item.isTransit || item.isLodging) return false;
      if (isMealBreakItem(item) || isFlexibleBreakItem(item) || isFoodOrDrinkAttraction(item)) return false;
      if (isNearbyDayTripItem(item) || isFullDayAnchorItem(item)) return false;
      return item.isLandmark || item.curatedEssential || Number.isFinite(Number(item.priorityRank));
    })
    .sort(compareAttractionPriority)
    .slice(0, Math.min(5, earlyDays.length * 3));

  const earlyKeys = getUsedSightseeingKeys(earlyDays);
  const removeFromLaterDays = (candidate) => {
    const keys = getGlobalPlaceKeys(candidate);
    for (let idx = earlyDays.length; idx < dayPlans.length; idx++) {
      const dayPlan = dayPlans[idx];
      if (!dayPlan || !Array.isArray(dayPlan.items)) continue;
      dayPlan.items = dayPlan.items.filter(item => {
        if (!item || item.isTransit) return true;
        const itemKeys = getGlobalPlaceKeys(item);
        const matches = placeKeysOverlap(itemKeys, keys);
        return !matches;
      });
    }
  };

  topCandidates.forEach(candidate => {
    const keys = getGlobalPlaceKeys(candidate);
    if (hasUsedPlaceKeys(keys, earlyKeys)) return;

    const targetDay = earlyDays
      .slice()
      .sort((a, b) => getRealSightseeingItems(a).length - getRealSightseeingItems(b).length)[0];
    if (!targetDay) return;

    removeLowPriorityFillersFromEarlyDay(targetDay);
    removeFromLaterDays(candidate);
    const coords = getAttractionCoords(candidate, cityId);
    const item = { ...candidate, cityId, x: candidate.x ?? coords.x, y: candidate.y ?? coords.y };
    normalizeVisitDurationByType(item);
    insertSightseeingBeforeDinner(targetDay, item);
    rememberUsedPlaceKeys(keys, earlyKeys);
  });

  earlyDays.forEach(dayPlan => {
    if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, cityId);
  });
}

const ESSENTIAL_EARLY_CITY_ATTRACTIONS = {
  shanghai: [
    { name_ko: '\uB354 \uBC88\uB4DC/\uC640\uC774\uD0C4 \uC0B0\uCC45', name_en: 'The Bund Waterfront Promenade', duration: 120, isLandmark: true, x: 121.4897, y: 31.2382, open: 540, close: 1440, desc_ko: '\uD669\uD478\uAC15 \uC11C\uC548\uC758 \uC678\uD0C4 \uC5ED\uC0AC \uAC74\uCD95\uACFC \uD478\uB465 \uC2A4\uCE74\uC774\uB77C\uC778\uC744 \uBCF4\uB294 \uC0C1\uD558\uC774 \uB300\uD45C \uC0B0\uCC45', desc_en: 'Historic Bund waterfront with Pudong skyline views.' },
    { name_ko: '\uC0C1\uD558\uC774 \uBC15\uBB3C\uAD00', name_en: 'Shanghai Museum', duration: 150, isLandmark: true, x: 121.4737, y: 31.2304, open: 540, close: 1080, desc_ko: '\uC778\uBBFC\uAD11\uC7A5\uC758 \uC911\uAD6D \uACE0\uB300 \uC608\uC220\uACFC \uCCAD\uB3D9\uAE30 \uCEEC\uB809\uC158\uC73C\uB85C \uC720\uBA85\uD55C \uB300\uD45C \uBC15\uBB3C\uAD00', desc_en: 'Major museum at People Square for Chinese ancient art and bronzes.' }
  ],
  seoul: [
    { name_ko: '\uC885\uBB18', name_en: 'Jongmyo Shrine', duration: 120, isLandmark: true, x: 126.9949, y: 37.5746, open: 540, close: 1080, desc_ko: '\uC870\uC120 \uC655\uC2E4\uC758 \uC81C\uB840 \uACF5\uAC04\uC778 \uC720\uB124\uC2A4\uCF54 \uC138\uACC4\uC720\uC0B0 \uC885\uBB18 \uAD00\uB78C', desc_en: 'UNESCO royal ancestral shrine of the Joseon dynasty.' },
    { name_ko: '\uD55C\uAC15\uACF5\uC6D0 \uD53C\uD06C\uB2C9', name_en: 'Hangang Park Picnic', duration: 150, isLandmark: true, x: 126.9346, y: 37.5284, open: 540, close: 1320, desc_ko: '\uD55C\uAC15\uBCC0\uC5D0\uC11C \uC11C\uC6B8\uC758 \uD558\uB298\uACFC \uAC15\uBCC0\uC744 \uC990\uAE30\uB294 \uB3C4\uC2EC \uD53C\uD06C\uB2C9', desc_en: 'Riverside picnic time at Hangang Park.' },
    { name_ko: '\uB3D9\uB300\uBB38\uB514\uC790\uC778\uD50C\uB77C\uC790(DDP)', name_en: 'Dongdaemun Design Plaza', duration: 120, isLandmark: true, x: 127.0096, y: 37.5665, open: 540, close: 1320, desc_ko: '\uB3D9\uB300\uBB38\uC758 \uB300\uD45C \uD604\uB300 \uAC74\uCD95\uACFC \uC804\uC2DC \uACF5\uAC04\uC744 \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815', desc_en: 'Modern architecture and exhibition stop at Dongdaemun Design Plaza.' }
  ],
  paris: [
    { name_ko: '\uB8E8\uBE0C\uB974 \uBC15\uBB3C\uAD00', name_en: 'Louvre Museum', duration: 240, isLandmark: true, x: 2.3376, y: 48.8606, open: 540, close: 1080, desc_ko: '\uD30C\uB9AC \uB300\uD45C \uBBF8\uC220\uAD00\uC5D0\uC11C \uD575\uC2EC \uC18C\uC7A5\uD488\uC744 \uAD00\uB78C', desc_en: 'Essential visit to the Louvre Museum.' },
    { name_ko: '\uD321\uD14C\uC639', name_en: 'Pantheon Paris', duration: 120, isLandmark: true, x: 2.3460, y: 48.8462, open: 540, close: 1080, desc_ko: '\uD504\uB791\uC2A4 \uC704\uC778\uB4E4\uC774 \uC548\uCE58\uB41C \uB77C\uD2F4 \uC9C0\uAD6C\uC758 \uB300\uD45C \uAE30\uB150\uAC74\uCD95', desc_en: 'Landmark mausoleum in the Latin Quarter.' }
  ],
  london: [
    { name_ko: '\uBC84\uD0B9\uC5C4 \uAD81\uC804', name_en: 'Buckingham Palace', duration: 120, isLandmark: true, x: -0.1419, y: 51.5014, open: 540, close: 1080, desc_ko: '\uC601\uAD6D \uC655\uC2E4\uC758 \uB300\uD45C \uAD81\uC804\uACFC \uADFC\uC704\uBCD1 \uAD50\uB300\uC2DD \uAD00\uB78C', desc_en: 'Royal palace and Changing of the Guard area.' }
  ],
  newyork: [
    { name_ko: '\uD0C0\uC784\uC2A4\uD018\uC5B4 \uB124\uC628 \uAC70\uB9AC \uC0B0\uCC45', name_en: 'Times Square Neon Walk', name_fr: 'Promenade lumineuse à Times Square', name_zh: '时代广场霓虹街区漫步', name_ja: 'タイムズスクエアのネオン散策', name_es: 'Paseo por Times Square', duration: 90, isLandmark: true, x: -73.9855, y: 40.7580, open: 540, close: 1440, desc_ko: '\uBE0C\uB85C\uB4DC\uC6E8\uC774 \uADF9\uC7A5\uAC00\uC640 \uB300\uD615 \uC804\uAD11\uD310\uC774 \uBAA8\uC778 \uB274\uC695 \uB300\uD45C \uAD11\uC7A5', desc_en: 'Classic New York walk through Broadway theaters and Times Square lights.', desc_fr: 'Promenade classique dans le quartier des théâtres de Broadway et des panneaux lumineux.', desc_zh: '漫步百老汇剧院区和时代广场霓虹灯牌之间。', desc_ja: 'ブロードウェイ劇場街と巨大電光掲示板が集まる代表的な広場を歩きます。', desc_es: 'Paseo clásico por los teatros de Broadway y las luces de Times Square.' },
    { name_ko: '\uC6D4\uC2A4\uD2B8\uB9AC\uD2B8\uC640 \uB274\uC695\uC99D\uAD8C\uAC70\uB798\uC18C \uAC70\uB9AC', name_en: 'Wall Street & New York Stock Exchange Walk', name_fr: 'Wall Street et la Bourse de New York', name_zh: '华尔街与纽约证券交易所街区', name_ja: 'ウォール街とニューヨーク証券取引所周辺', name_es: 'Wall Street y la Bolsa de Nueva York', duration: 100, isLandmark: true, x: -74.0105, y: 40.7069, open: 540, close: 1200, desc_ko: '\uB274\uC695 \uAE08\uC735\uC9C0\uAD6C\uC758 \uC5ED\uC0AC\uC801\uC778 \uAC70\uB9AC\uC640 \uB79C\uB4DC\uB9C8\uD06C \uC0B0\uCC45', desc_en: 'Walk Wall Street, the New York Stock Exchange exterior, and Financial District landmarks.', desc_fr: 'Balade dans le quartier financier, devant Wall Street et la Bourse de New York.', desc_zh: '参观华尔街、纽约证券交易所外观和金融区地标。', desc_ja: '金融街の歴史的な通りとニューヨーク証券取引所周辺を歩きます。', desc_es: 'Recorrido por Wall Street, el exterior de la Bolsa y los iconos del distrito financiero.' }
  ]
};

function ensureEssentialEarlyCityAttractions(course) {
  if (!course || !Array.isArray(course.days)) return;
  const essentials = ESSENTIAL_EARLY_CITY_ATTRACTIONS[course.cityId] || [];
  if (!essentials.length) return;
  const earlyDays = course.days.slice(0, Math.min(2, course.days.length));
  const earlyKeys = getUsedSightseeingKeys(earlyDays);
  const essentialKeys = new Set(essentials.flatMap(item => getGlobalPlaceKeys(item)));

  const rebuildEarlyDayWithMorningAnchor = (dayPlan) => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    const startLodging = dayPlan.items.find(item => item && item.isLodging && item.isStart) || null;
    const endLodging = dayPlan.items.find(item => item && item.isLodging && item.isEnd) || null;
    const lunch = dayPlan.items.find(item => isMealBreakItem(item) && isLunchMealBreakItem(item)) || createFallbackMealBreakItem('lunch');
    const dinner = dayPlan.items.find(item => isMealBreakItem(item) && isDinnerMealBreakItem(item)) || createFallbackMealBreakItem('dinner');
    const realItems = getRealSightseeingItems(dayPlan)
      .filter(item => !isFoodOrDrinkAttraction(item) && !isFlexibleBreakItem(item) && !isNearbyDayTripItem(item));
    if (!realItems.length) return;

    const withScores = realItems.map((item, index) => {
      const itemKeys = getGlobalPlaceKeys(item);
      const isEssential = hasUsedPlaceKeys(itemKeys, essentialKeys);
      return { item, index, isEssential };
    }).sort((a, b) => {
      if (a.isEssential !== b.isEssential) return a.isEssential ? -1 : 1;
      return compareAttractionPriority(a.item, b.item) || (a.index - b.index);
    });

    const morningAnchor = withScores[0].item;
    const rest = realItems.filter(item => item !== morningAnchor);
    dayPlan.items = [
      ...(startLodging ? [startLodging] : []),
      morningAnchor,
      ...(lunch ? [lunch] : []),
      ...rest,
      ...(dinner ? [dinner] : []),
      ...(endLodging ? [endLodging] : [])
    ];
  };

  const trimLowerPriorityEarlyItem = (dayPlan) => {
    const realItems = getRealSightseeingItems(dayPlan);
    if (realItems.length < 3) return;
    const removable = realItems
      .filter(item => {
        const keys = getGlobalPlaceKeys(item);
        return !hasUsedPlaceKeys(keys, essentialKeys);
      })
      .sort((a, b) => {
        const aText = getAttractionSearchText(a).toLowerCase();
        const bText = getAttractionSearchText(b).toLowerCase();
        const aShopping = /(shopping|mall|market|street|\uC1FC\uD551|\uBAB0|\uC2DC\uC7A5|\uAC70\uB9AC)/.test(aText) ? 1 : 0;
        const bShopping = /(shopping|mall|market|street|\uC1FC\uD551|\uBAB0|\uC2DC\uC7A5|\uAC70\uB9AC)/.test(bText) ? 1 : 0;
        if (aShopping !== bShopping) return bShopping - aShopping;
        if (!!a.isLandmark !== !!b.isLandmark) return Number(!!a.isLandmark) - Number(!!b.isLandmark);
        return compareAttractionPriority(b, a);
      })[0];
    if (removable) removeItemFromDay(dayPlan, removable);
  };

  essentials.forEach((essential, essentialIndex) => {
    const keys = getGlobalPlaceKeys(essential);
    if (hasUsedPlaceKeys(keys, earlyKeys)) return;

    for (let idx = earlyDays.length; idx < course.days.length; idx++) {
      const dayPlan = course.days[idx];
      if (!dayPlan || !Array.isArray(dayPlan.items)) continue;
      dayPlan.items = dayPlan.items.filter(item => {
        if (!item || item.isTransit) return true;
        const itemKeys = getGlobalPlaceKeys(item);
        return !placeKeysOverlap(itemKeys, keys);
      });
    }

    const targetDay = earlyDays[essentialIndex % earlyDays.length];
    if (!targetDay) return;
    trimLowerPriorityEarlyItem(targetDay);
    const item = { ...essential, cityId: course.cityId };
    normalizeVisitDurationByType(item);
    insertSightseeingBeforeDinner(targetDay, item);
    rememberUsedPlaceKeys(keys, earlyKeys);
  });

  earlyDays.forEach(dayPlan => {
    rebuildEarlyDayWithMorningAnchor(dayPlan);
    if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, course.cityId);
  });
}

function forceCitySupplementForShortSingleDays(dayPlans, cityId) {
  if (!Array.isArray(dayPlans)) return;
  const extras = SPARSE_DAY_CITY_SUPPLEMENTS[cityId] || [];
  if (!extras.length) return;
  const usedKeys = getUsedSightseeingKeys(dayPlans);

  dayPlans.forEach(dayPlan => {
    const realItems = getRealSightseeingItems(dayPlan);
    const visitMinutes = realItems.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
    if (realItems.length !== 1 || visitMinutes >= 300 || isFullDayAnchorItem(realItems[0])) return;

    const extra = extras.find(item => {
      const keys = getGlobalPlaceKeys(item);
      return !hasUsedPlaceKeys(keys, usedKeys);
    });
    if (!extra) return;

    const item = { ...extra, cityId };
    insertSightseeingBeforeDinner(dayPlan, item);
    rememberUsedPlaceKeys(item, usedKeys);
    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, cityId);
    }
  });
}

function getLastMovableSightseeingEnd(dayPlan) {
  const realItems = getRealSightseeingItems(dayPlan).filter(item => !isFullDayAnchorItem(item));
  if (!realItems.length) return 510;
  return realItems.reduce((latest, item) => {
    const end = getTimeSlotEndMinutes(item);
    if (end !== null) return Math.max(latest, end);
    const start = getTimeSlotStartMinutes(item.timeSlot) || latest;
    return Math.max(latest, start + (Number(item.duration) || 90));
  }, 510);
}

function getLastMovableSightseeingItem(dayPlan) {
  const realItems = getRealSightseeingItems(dayPlan).filter(item => !isFullDayAnchorItem(item));
  return realItems.length ? realItems[realItems.length - 1] : null;
}

function getMovableFutureItem(sourceDay) {
  const realItems = getRealSightseeingItems(sourceDay);
  for (let i = realItems.length - 1; i >= 0; i--) {
    const item = realItems[i];
    if (
      !isFullDayAnchorItem(item) &&
      !isNearbyDayTripItem(item) &&
      !isOutletOrFarShoppingItem(item) &&
      (Number(item.duration) || getTypicalVisitDuration(item)) <= 180
    ) {
      return item;
    }
  }
  return null;
}

function canFitPulledItemIntoDay(targetDay, item, cityId) {
  if (!targetDay || !item || isFullDayAnchorItem(item)) return false;
  const targetRealItems = getRealSightseeingItems(targetDay);
  if (targetRealItems.some(isFullDayAnchorItem)) return false;

  const lastEnd = getLastMovableSightseeingEnd(targetDay);
  const lastItem = getLastMovableSightseeingItem(targetDay);
  const duration = Number(item.duration) || getTypicalVisitDuration(item);
  const transit = lastItem ? calculateTransit(lastItem, { ...item, cityId }).duration : 0;
  const projectedEnd = lastEnd + transit + duration;
  return projectedEnd <= 1110;
}

function compactFutureSightseeingIntoEarlierGaps(course) {
  if (!course || !Array.isArray(course.days)) return;
  const cityId = course.cityId;
  const targetEnd = 1020; // Keep normal sightseeing days useful into late afternoon.

  for (let i = 0; i < course.days.length - 1; i++) {
    if (i < 2) continue; // Keep the first two landmark-heavy days stable.
    const targetDay = course.days[i];
    if (!targetDay || !Array.isArray(targetDay.items)) continue;
    const targetRealItems = getRealSightseeingItems(targetDay);
    if (!targetRealItems.length || targetRealItems.some(isFullDayAnchorItem)) continue;

    let movedCount = 0;
    while (getLastMovableSightseeingEnd(targetDay) < targetEnd && movedCount < 2) {
      let moved = false;
      for (let j = i + 1; j < course.days.length; j++) {
        const sourceDay = course.days[j];
        if (!sourceDay || !Array.isArray(sourceDay.items)) continue;
        const sourceRealItems = getRealSightseeingItems(sourceDay);
        if (!sourceRealItems.length || sourceRealItems.some(isFullDayAnchorItem)) continue;

        const movable = getMovableFutureItem(sourceDay);
        if (!movable || !canFitPulledItemIntoDay(targetDay, movable, cityId)) continue;

        if (removeItemFromDay(sourceDay, movable)) {
          insertSightseeingBeforeDinner(targetDay, movable);
          if (typeof recalculateDayPlanTimes === 'function') {
            recalculateDayPlanTimes(targetDay, cityId);
            recalculateDayPlanTimes(sourceDay, cityId);
          }
          moved = true;
          movedCount++;
          break;
        }
      }
      if (!moved) break;
    }
  }
}

function normalizeNearbyDayTripDays(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    const dayTrip = dayPlan.items.find(item => isNearbyDayTripItem(item));
    if (!dayTrip) return;
    markNearbyDayTripPresentation(dayTrip);
    dayPlan.items = dayPlan.items.filter(item =>
      item === dayTrip ||
      item.isLodging
    );
    dayPlan.items.forEach(item => {
      if (isNearbyDayTripItem(item)) markNearbyDayTripPresentation(item);
      if (isReturnToLodgingItem(item)) item.timeSlot = '';
    });
  });
}

function enforceNearbyTripPolicy(course) {
  if (!course || !Array.isArray(course.days) || course.days.length < 5) return;
  const localPayloads = [];
  const nearbyPayloads = [];
  const emptyPayloads = [];

  course.days.forEach(dayPlan => {
    const items = Array.isArray(dayPlan.items) ? dayPlan.items : [];
    const sightseeing = getRealSightseeingItems(dayPlan);
    if (sightseeing.some(isNearbyDayTripItem)) {
      nearbyPayloads.push(items);
    } else if (sightseeing.length) {
      localPayloads.push(items);
    } else {
      emptyPayloads.push(items);
    }
  });

  const keptNearby = nearbyPayloads.slice(0, 2);
  const droppedNearby = nearbyPayloads.slice(2).map(() => []);
  const orderedPayloads = [...localPayloads, ...keptNearby, ...emptyPayloads, ...droppedNearby];
  course.days.forEach((dayPlan, index) => {
    dayPlan.items = orderedPayloads[index] || [];
  });
}

function getClockMinuteValues(timeSlot) {
  const matches = String(timeSlot || '').matchAll(/(\d+):(\d{2})/g);
  return Array.from(matches, match => (parseInt(match[1], 10) * 60) + parseInt(match[2], 10));
}

function hasImpossibleClockTime(item) {
  if (!item || item.isAllDayTrip || isNearbyDayTripItem(item)) return false;
  return getClockMinuteValues(item.timeSlot).some(minutes => minutes >= 1440 || !Number.isFinite(minutes));
}

function rebuildDayFromSightseeingOnly(dayPlan, cityId) {
  if (!dayPlan || !Array.isArray(dayPlan.items)) return false;
  const startLodging = dayPlan.items.find(item => item && item.isLodging && item.isStart) || null;
  const endLodging = dayPlan.items.find(item => item && item.isLodging && item.isEnd) || null;
  const realItems = getRealSightseeingItems(dayPlan);
  if (!realItems.length) return false;

  realItems.forEach(item => {
    if (!item) return;
    delete item.lockedStartMin;
    if (cityId && !item.cityId) item.cityId = cityId;
    if (isNearbyDayTripItem(item)) markNearbyDayTripPresentation(item);
  });

  dayPlan.items = [
    ...(startLodging ? [startLodging] : []),
    ...realItems,
    ...(endLodging ? [endLodging] : [])
  ];

  if (realItems.some(isNearbyDayTripItem)) {
    normalizeNearbyDayTripDays({ cityId, days: [dayPlan] });
  } else if (typeof recalculateDayPlanTimes === 'function') {
    recalculateDayPlanTimes(dayPlan, cityId);
  }
  return true;
}

function repairImpossibleClockTimes(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    if (dayPlan.items.some(hasImpossibleClockTime)) {
      rebuildDayFromSightseeingOnly(dayPlan, course.cityId);
    }
    normalizeOpenEndedDinnerSlots(dayPlan.items);
  });
}

function ensureMorningSightseeingBeforeLunch(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    const realItems = getRealSightseeingItems(dayPlan)
      .filter(item => !isFoodOrDrinkAttraction(item) && !isFlexibleBreakItem(item) && !isNearbyDayTripItem(item));
    if (!realItems.length || realItems.some(isFullDayAnchorItem)) return;
    const firstReal = realItems[0];

    const startLodging = dayPlan.items.find(item => item && item.isLodging && item.isStart) || null;
    const endLodging = dayPlan.items.find(item => item && item.isLodging && item.isEnd) || null;
    const lunch = dayPlan.items.find(item => isMealBreakItem(item) && isLunchMealBreakItem(item)) || createFallbackMealBreakItem('lunch');
    const dinner = dayPlan.items.find(item => isMealBreakItem(item) && isDinnerMealBreakItem(item)) || createFallbackMealBreakItem('dinner');
    dayPlan.items = [
      ...(startLodging ? [startLodging] : []),
      firstReal,
      ...(lunch ? [lunch] : []),
      ...realItems.slice(1),
      ...(dinner ? [dinner] : []),
      ...(endLodging ? [endLodging] : [])
    ];
    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
  });
}

function ensureMealBreaksForRegularDays(course) {
  if (!course || !Array.isArray(course.days)) return;
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    const realItems = getRealSightseeingItems(dayPlan)
      .filter(item => !isNearbyDayTripItem(item) && !isFullDayAnchorItem(item));
    if (!realItems.length) return;

    let changed = false;
    if (!dayPlan.items.some(item => isMealBreakItem(item) && isLunchMealBreakItem(item))) {
      const firstRealIdx = dayPlan.items.findIndex(item => item === realItems[0]);
      dayPlan.items.splice(Math.max(firstRealIdx + 1, 1), 0, createFallbackMealBreakItem('lunch'));
      changed = true;
    }
    if (!dayPlan.items.some(item => isMealBreakItem(item) && isDinnerMealBreakItem(item))) {
      dayPlan.items.push(createFallbackMealBreakItem('dinner'));
      changed = true;
    }
    if (changed && typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
  });
}

function repairEmptySightseeingDays(course) {
  if (!course || !course.cityId || !Array.isArray(course.days)) return;
  const usedKeys = getUsedSightseeingKeys(course.days);
  course.days.forEach(dayPlan => {
    if (!dayPlan || !Array.isArray(dayPlan.items)) return;
    if (getRealSightseeingItems(dayPlan).length > 0) return;
    let candidate = null;
    if (course.days.length >= 5 && (Number(dayPlan.day) || 1) >= 4 && countNearbyTripDays(course.days) < 2) {
      candidate = getDynamicNearbyCityDayTripCandidate(course.cityId, usedKeys);
    }
    if (!candidate) return;
    const coords = getAttractionCoords(candidate, course.cityId);
    const item = { ...candidate, cityId: course.cityId, x: candidate.x ?? coords.x, y: candidate.y ?? coords.y };
    normalizeVisitDurationByType(item);
    insertSightseeingBeforeDinner(dayPlan, item);
    rememberUsedPlaceKeys(item, usedKeys);
    if (typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
  });
}

function normalizeCourseTimeDisplay(course) {
  if (!course || !Array.isArray(course.days)) return course;
  if (normalizeEveningIntentForCourse(course)) {
    course.days.forEach(dayPlan => {
      if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, course.cityId);
    });
  }
  rebalanceSparseItineraryDays(course);
  compactFutureSightseeingIntoEarlierGaps(course);
  removeDuplicateSightseeingAcrossDays(course);
  forceCitySupplementForShortSingleDays(course.days, course.cityId);
  normalizeNearbyDayTripDays(course);
  repairImpossibleClockTimes(course);
  ensureMorningSightseeingBeforeLunch(course);
  ensureMealBreaksForRegularDays(course);
  removeDuplicateSightseeingAcrossDays(course);
  const cityPools = (typeof ATTRACTIONS !== 'undefined' && course.cityId && ATTRACTIONS[course.cityId]) || null;
  if (cityPools) {
    ensureEveryDayHasSightseeing(course.days, cityPools, course.cityId);
    normalizeNearbyDayTripDays(course);
    repairImpossibleClockTimes(course);
    removeDuplicateSightseeingAcrossDays(course);
  }
  course.days.forEach(dayPlan => {
    if (!Array.isArray(dayPlan.items)) return;
    const needsTransitRepair = !!course.cityId && dayPlan.items.some(item => {
      if (!item) return false;
      if (!item.isTransit && !item.cityId) return true;
      const name = `${item.name_ko || ''} ${item.name_en || ''}`;
      return item.isTransit && /([4-9]\d{2,}|\d{4,})(\.\d+)?km/.test(name);
    });
    if (needsTransitRepair && typeof recalculateDayPlanTimes === 'function') {
      dayPlan.items.forEach(item => {
        if (item && !item.isTransit && !item.cityId) item.cityId = course.cityId;
      });
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
    dayPlan.items.forEach(item => {
      if (isReturnToLodgingItem(item)) {
        item.timeSlot = '';
      }
      if (item && !item.isTransit) {
        item.desc_ko = stripGeneratedVenueLunchNotes(item.desc_ko);
        item.desc_en = stripGeneratedVenueLunchNotes(item.desc_en);
      }
    });
    if (enforceMealTimeWindowsForItems(dayPlan.items) && typeof recalculateDayPlanTimes === 'function') {
      recalculateDayPlanTimes(dayPlan, course.cityId);
    }
    normalizeOpenEndedDinnerSlots(dayPlan.items);
  });
  repairEmptySightseeingDays(course);
  normalizeNearbyDayTripDays(course);
  removeDuplicateSightseeingAcrossDays(course);
  enforceNearbyTripPolicy(course);
  normalizeInterlakenRegionalDays(course);
  normalizeIcelandRingRoadDays(course);
  if (normalizeEveningIntentForCourse(course)) {
    course.days.forEach(dayPlan => {
      if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, course.cityId);
    });
  }
  return course;
}

function padDatePart(value) {
  return String(value).padStart(2, '0');
}

function getLocalDateInputValue(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const safeDate = Number.isFinite(d.getTime()) ? d : new Date();
  return `${safeDate.getFullYear()}-${padDatePart(safeDate.getMonth() + 1)}-${padDatePart(safeDate.getDate())}`;
}

function getLocalTimeInputValue(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const safeDate = Number.isFinite(d.getTime()) ? d : new Date();
  return `${padDatePart(safeDate.getHours())}:${padDatePart(safeDate.getMinutes())}`;
}

function getSuggestedCompanionDateTime() {
  const suggested = new Date(Date.now() + 30 * 60 * 1000);
  suggested.setMinutes(Math.ceil(suggested.getMinutes() / 10) * 10, 0, 0);
  return suggested;
}

function getCompanionDateTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null;
  const selected = new Date(`${dateValue}T${timeValue}`);
  return Number.isFinite(selected.getTime()) ? selected : null;
}

function isPastCompanionDateTime(dateValue, timeValue) {
  const selected = getCompanionDateTime(dateValue, timeValue);
  if (!selected) return true;
  return selected.getTime() < Date.now();
}

function getCompanionPastTimeMessage() {
  return getInlineText({
    ko: '이미 지난 날짜나 시간으로는 동행 방을 만들 수 없습니다.',
    en: 'You cannot create a companion room for a past date or time.',
    fr: 'Vous ne pouvez pas créer une salle pour une date ou une heure passée.',
    zh: '不能为过去的日期或时间创建结伴房间。',
    ja: '過去の日付や時間では同行ルームを作成できません。',
    es: 'No puedes crear una sala para una fecha u hora pasada.'
  });
}

function syncCompanionDateTimeConstraints(options = {}) {
  const coerce = options.coerce !== false;
  const dateInput = document.getElementById('modalRoomDate');
  const timeInput = document.getElementById('modalRoomTime');
  if (!dateInput || !timeInput) return;

  const today = getLocalDateInputValue();
  const nowTime = getLocalTimeInputValue();
  dateInput.min = today;

  if (coerce && (!dateInput.value || dateInput.value < today)) {
    dateInput.value = today;
  }

  if (dateInput.value === today) {
    timeInput.min = nowTime;
    if (coerce && (!timeInput.value || timeInput.value < nowTime)) {
      timeInput.value = nowTime;
    }
  } else {
    timeInput.removeAttribute('min');
    if (coerce && !timeInput.value) timeInput.value = '14:00';
  }
}

function syncProfileFromInputs(propagateToRemote = false) {
  const nameInput = document.getElementById('profileName');
  if (!nameInput) return;
  const newNameInput = nameInput.value.trim();
  if (!newNameInput) return;

  const oldName = state.activeProfile.name;

  state.activeProfile.name = newNameInput;
  state.activeProfile.ageRange = document.getElementById('profileAgeRange')?.value || state.activeProfile.ageRange || '30s';
  state.activeProfile.age = state.activeProfile.ageRange;
  state.activeProfile.gender = document.getElementById('profileGender').value;
  state.activeProfile.languages = getMultiSelectValues('profileLanguages') || state.activeProfile.languages || '';
  state.activeProfile.smoking = document.getElementById('profileSmoking')?.value || state.activeProfile.smoking || 'no';
  state.activeProfile.alcohol = document.getElementById('profileAlcohol')?.value || state.activeProfile.alcohol || 'social';
  state.activeProfile.mbti = document.getElementById('profileMBTI').value;

  saveToLocalStorage();
  renderSavedCoursesList();
  
  const headerName = document.getElementById('headerProfileName');
  if (headerName) {
    headerName.textContent = state.activeProfile.name;
  }

  if (propagateToRemote) {
    let changed = false;
    if (oldName !== newNameInput) {
      changed = true;
      state.rooms.forEach(room => {
        if (room.joinedUsers) {
          if (room.joinedUsers.includes(oldName)) {
            room.joinedUsers = room.joinedUsers.map(u => u === oldName ? newNameInput : u);
            room.joinedCount = room.joinedUsers.length;
          }
        }
        if (room.creator && room.creator.name === oldName) {
          room.creator.name = newNameInput;
          room.creator = { ...room.creator, ...getPublicProfileSnapshot() };
          room.memberProfiles = room.memberProfiles || {};
          room.memberProfiles[newNameInput] = getPublicProfileSnapshot();
        }
      });
    } else {
      state.rooms.forEach(room => {
        if (room.creator && room.creator.name === newNameInput) {
          room.creator = { ...room.creator, ...getPublicProfileSnapshot() };
          room.memberProfiles = room.memberProfiles || {};
          room.memberProfiles[newNameInput] = getPublicProfileSnapshot();
          changed = true;
        } else if (Array.isArray(room.joinedUsers) && room.joinedUsers.includes(newNameInput)) {
          room.memberProfiles = room.memberProfiles || {};
          room.memberProfiles[newNameInput] = getPublicProfileSnapshot();
          changed = true;
        }
      });
    }

    if (changed) {
      pushToRemote().then(() => {
        renderCompanionRooms();
        if (state.currentView === 'chat' && state.joinedRoomId !== null) {
          renderChatRoom();
        }
      });
    }
  }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  const langControl = document.getElementById('langToggle');
  if (langControl) {
    const applyLanguageChange = (nextLang) => {
      state.lang = normalizeLanguageCode(nextLang);
      saveToLocalStorage();
      setupUIStrings();
    };
    if (langControl.tagName === 'SELECT') {
      langControl.addEventListener('change', (event) => {
        applyLanguageChange(event.target.value);
      });
    } else {
      langControl.addEventListener('click', () => {
        const currentIndex = SUPPORTED_LANG_CODES.indexOf(normalizeLanguageCode(state.lang));
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % SUPPORTED_LANG_CODES.length : 0;
        applyLanguageChange(SUPPORTED_LANG_CODES[nextIndex]);
      });
    }
  }

  // Navigation tab click
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');
      
      // If user clicks on Chat but hasn't joined a room, ignore or route to companions
      if (target === 'chat' && !state.joinedRoomId) {
        state.currentView = 'companions';
      } else {
        state.currentView = target;
      }
      
      updateView();
    });
  });

  // Destination selections on dashboard (card click) -> Route to AI planner with that destination selected
  document.getElementById('popularDestinationsGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.dest-card');
    if (card) {
      const cityId = card.getAttribute('data-city-id');
      const selectDest = document.getElementById('plannerDest');
      if (selectDest) {
        selectDest.value = cityId;
        beginPlannerDraftForCity(cityId);
        updateLodgingSelector(cityId, { preserveSelection: false });
      }
      
      // Switch view to planner
      document.querySelector('[data-target=planner]').click();
    }
  });

  const quickStartForm = document.getElementById('onboardingQuickStartForm');
  if (quickStartForm) {
    quickStartForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cityId = document.getElementById('onboardingQuickCity')?.value || 'newyork';
      const days = document.getElementById('onboardingQuickDays')?.value || '2';
      const selectDest = document.getElementById('plannerDest');
      const selectDuration = document.getElementById('plannerDuration');

      if (selectDest) {
        selectDest.value = cityId;
        beginPlannerDraftForCity(cityId);
        updateLodgingSelector(cityId, { preserveSelection: false });
      }
      if (selectDuration) {
        selectDuration.value = days;
      }

      document.querySelector('[data-target=planner]')?.click();
      window.requestAnimationFrame(() => {
        if (typeof generateItinerary === 'function') {
          generateItinerary();
        }
      });
    });
  }

  // Preference Chip Selection
  document.querySelectorAll('.pref-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('selected');
    });
  });

  // AI Course Generator Click
  document.getElementById('generateItineraryBtn').addEventListener('click', generateItinerary);

  // Profile Save Submit
  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    syncProfileFromInputs(true);
    showToast(getText('profile_saved_toast'));
  });

  // Auto-save listeners
  document.getElementById('profileName').addEventListener('input', () => {
    syncProfileFromInputs(false);
  });
  document.getElementById('profileName').addEventListener('change', () => {
    syncProfileFromInputs(true);
  });

  const profilePhotoInput = document.getElementById('profilePhotoInput');
  if (profilePhotoInput) {
    profilePhotoInput.addEventListener('change', () => {
      const file = profilePhotoInput.files && profilePhotoInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast(getText('profile_choose_image'));
        profilePhotoInput.value = '';
        return;
      }
      if (file.size > 1024 * 1024) {
        showToast(getText('profile_image_too_large'));
        profilePhotoInput.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        state.activeProfile.avatarDataUrl = String(reader.result || '');
        saveToLocalStorage();
        updateProfileAvatarUI();
        syncProfileFromInputs(true);
      };
      reader.readAsDataURL(file);
    });
  }

  const profilePhotoResetBtn = document.getElementById('profilePhotoResetBtn');
  if (profilePhotoResetBtn) {
    profilePhotoResetBtn.addEventListener('click', () => {
      state.activeProfile.avatarDataUrl = '';
      if (profilePhotoInput) profilePhotoInput.value = '';
      saveToLocalStorage();
      updateProfileAvatarUI();
      syncProfileFromInputs(true);
      showToast(getText('profile_photo_reset_toast'));
    });
  }

  ['profileGender', 'profileMBTI', 'profileAgeRange', 'profileSmoking', 'profileAlcohol'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      const eventName = elem.tagName === 'INPUT' ? 'input' : 'change';
      elem.addEventListener(eventName, () => {
        syncProfileFromInputs(true);
      });
    }
  });
  // Multi-select checkbox groups
  ['profileLanguages'].forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      container.addEventListener('change', () => {
        syncProfileFromInputs(true);
      });
    }
  });

  const plannerPace = document.getElementById('plannerPace');
  if (plannerPace) {
    plannerPace.addEventListener('change', () => {
      state.travelPace = plannerPace.value || 'moderate';
      saveToLocalStorage();
    });
  }

  const verifyIdentityBtn = document.getElementById('verifyIdentityBtn');
  if (verifyIdentityBtn) {
    verifyIdentityBtn.addEventListener('click', () => {
      showToast(getInlineText({
        ko: '현재 이 기능은 제공하지 않습니다.',
        en: 'This feature is not available right now.',
        fr: "Cette fonctionnalité n'est pas disponible pour le moment.",
        zh: '目前暂不提供此功能。',
        ja: '現在、この機能は提供していません。',
        es: 'Esta función no está disponible ahora.'
      }));
    });
  }

  // Companion Categories filters
  document.getElementById('companionCategoryFilterList').addEventListener('click', (e) => {
    const btn = e.target.closest('.category-tab-btn');
    if (btn) {
      document.querySelectorAll('#companionCategoryFilterList .category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCompanionRooms();
    }
  });

  // Modal Dialog events
  document.getElementById('openCreateRoomModalBtn').addEventListener('click', () => {
    // Reset to CREATE mode
    state.editingRoomId = null;
    document.getElementById('createRoomModalTitle').textContent = getText('modal_title');
    document.getElementById('createRoomModalSubmitBtn').textContent = getText('modal_submit');
    const suggestedDateTime = getSuggestedCompanionDateTime();
    document.getElementById('modalRoomDate').value = getLocalDateInputValue(suggestedDateTime);
    document.getElementById('modalRoomTime').value = getLocalTimeInputValue(suggestedDateTime);
    syncCompanionDateTimeConstraints({ coerce: true });
    const profile = getPublicProfileSnapshot();
    const modalAge = document.getElementById('modalRoomAge');
    const modalLanguage = document.getElementById('modalRoomLanguage');
    const modalSmoking = document.getElementById('modalRoomSmoking');
    const modalAlcohol = document.getElementById('modalRoomAlcohol');
    if (modalAge) setMultiSelectValues('modalRoomAge', 'any');
    setMultiSelectValues('modalRoomLanguage', profile.languages || '');
    if (modalSmoking) modalSmoking.value = 'ok';
    if (modalAlcohol) modalAlcohol.value = 'ok';
    document.getElementById('createRoomModal').classList.add('active');
    document.body.classList.add('modal-open');
  });

  document.getElementById('closeCreateRoomModalBtn').addEventListener('click', closeCreateModal);
  document.getElementById('cancelCreateRoomModalBtn').addEventListener('click', closeCreateModal);

  // Form creation for new companion room
  document.getElementById('createRoomForm').addEventListener('submit', createCompanionRoom);
  const modalRoomDateInput = document.getElementById('modalRoomDate');
  const modalRoomTimeInput = document.getElementById('modalRoomTime');
  if (modalRoomDateInput) modalRoomDateInput.addEventListener('change', () => syncCompanionDateTimeConstraints({ coerce: true }));
  if (modalRoomTimeInput) modalRoomTimeInput.addEventListener('change', () => syncCompanionDateTimeConstraints({ coerce: true }));

  // Leave Chat Room click
  document.getElementById('leaveChatRoomBtn').addEventListener('click', async () => {
    await pullFromRemote();
    const leavingRoomId = state.joinedRoomId;
    const room = state.rooms.find(r => r.id === leavingRoomId);
    if (room) {
      if (!room.joinedUsers) {
        room.joinedUsers = [room.creator.name];
      }
      const username = state.activeProfile.name;
      if (room.joinedUsers.includes(username)) {
        room.joinedUsers = room.joinedUsers.filter(u => u !== username);
        room.joinedCount = room.joinedUsers.length;
      }

      // Add a system leave notice locally
      const leaveNotice = getRoomSystemMessage('left', { name: state.activeProfile.name });
      
      if (!state.chatLogs[leavingRoomId]) {
        state.chatLogs[leavingRoomId] = [];
      }
      state.chatLogs[leavingRoomId].push(createMessageObject({ text: leaveNotice, system: true }));
    }
    
    state.joinedRoomId = null;
    await pushToRemote({ replaceMembershipRoomIds: [leavingRoomId] });
    state.currentView = 'companions';
    updateView();
    showToast(getText('room_left'));
  });

  // Send message events
  document.getElementById('chatSendMessageBtn').addEventListener('click', sendChatMessage);
  document.getElementById('chatInputMessageField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // Lodging selector updater
  const plannerDestSelect = document.getElementById('plannerDest');
  if (plannerDestSelect) {
    plannerDestSelect.addEventListener('change', (e) => {
      beginPlannerDraftForCity(e.target.value);
      updateLodgingSelector(e.target.value, { preserveSelection: false });
    });
  }

  // Itinerary Save Action Button
  const saveBtn = document.getElementById('saveTripActionBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveCurrentItinerary);
  }

  // Itinerary Share Action Button
  const shareBtn = document.getElementById('shareTripActionBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', copyShareLink);
  }

  // Itinerary Download Action Button
  const downloadBtn = document.getElementById('downloadTripActionBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', exportItineraryToPdf);
  }

  // Custom AI Regeneration Tag Buttons
  document.querySelectorAll('.regen-tag-btn').forEach(tagBtn => {
    tagBtn.addEventListener('click', (e) => {
      if (e.currentTarget.id === 'rainyDayRegenBtn') return;
      const tagText = e.currentTarget.getAttribute('data-tag') || e.currentTarget.textContent;
      handleCustomRegen(tagText);
    });
  });

  const rainyBtn = document.getElementById('rainyDayRegenBtn');
  if (rainyBtn) {
    rainyBtn.addEventListener('click', handleRainyDayRegen);
  }

  // Chat Share Course Button
  const chatShareBtn = document.getElementById('chatShareCourseBtn');
  if (chatShareBtn) {
    chatShareBtn.addEventListener('click', () => {
      if (!state.activeCourse) {
        showToast(getText('chat_no_itinerary'));
        return;
      }
      if (!state.joinedRoomId) return;
      
      const course = normalizeCourseMetadata(state.activeCourse, true);
      const courseDays = getCourseDurationDays(course);
      const text = getRoomSystemMessage('sharedCourse', {
        name: state.activeProfile.name,
        city: course.cityName,
        days: courseDays
      });
        
      const msgObj = createMessageObject({
        sender: state.activeProfile.name,
        mbti: state.activeProfile.mbti,
        text: text
      });
      
      msgObj.type = 'share_course';
      msgObj.course = course;
      
      if (!state.chatLogs[state.joinedRoomId]) {
        state.chatLogs[state.joinedRoomId] = [];
      }
      state.chatLogs[state.joinedRoomId].push(msgObj);
      
      pushToRemote().then(() => {
        renderChatRoom();
      });
      
      showToast(getText('chat_itinerary_shared'));
    });
  }
}

function closeCreateModal() {
  document.getElementById('createRoomModal').classList.remove('active');
  document.body.classList.remove('modal-open');
  document.getElementById('createRoomForm').reset();
  state.editingRoomId = null;
  // Restore default CREATE mode labels
  document.getElementById('createRoomModalTitle').textContent = getText('modal_title');
  document.getElementById('createRoomModalSubmitBtn').textContent = getText('modal_submit');
}

function openEditRoomModal(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  state.editingRoomId = roomId;

  // Pre-fill fields with room's current data
  document.getElementById('modalRoomTitle').value = getLocalizedRoomField(room, 'title');
  document.getElementById('modalRoomDest').value = room.cityId || '';
  const modalCitySearch = document.getElementById('modalRoomCitySearchInput');
  if (modalCitySearch) {
    const city = CITIES.find(c => c.id === room.cityId);
    modalCitySearch.value = city ? getLocalizedCityField(city, 'name') : (room.cityId || '');
    updateUnsupportedCityState('modalRoomCitySearchInput', 'modalRoomUnsupportedCityBox', 'modalRoomRequestCityBtn');
  }
  document.getElementById('modalRoomCat').value = room.category || 'city';
  document.getElementById('modalRoomPlace').value = getLocalizedRoomField(room, 'place');
  document.getElementById('modalRoomDate').value = room.date || '';
  document.getElementById('modalRoomTime').value = room.time || '14:00';
  document.getElementById('modalRoomMax').value = (room.maxPeople >= 9999) ? '0' : String(room.maxPeople || 4);
  document.getElementById('modalRoomGender').value = room.targetGender || '성별 무관';
  const modalAge = document.getElementById('modalRoomAge');
  const modalLanguage = document.getElementById('modalRoomLanguage');
  const modalSmoking = document.getElementById('modalRoomSmoking');
  const modalAlcohol = document.getElementById('modalRoomAlcohol');
  if (modalAge) setMultiSelectValues('modalRoomAge', room.targetAge || 'any');
  setMultiSelectValues('modalRoomLanguage', room.targetLanguage || '');
  if (modalSmoking) modalSmoking.value = room.targetSmoking || 'ok';
  if (modalAlcohol) modalAlcohol.value = room.targetAlcohol || 'ok';
  document.getElementById('modalRoomDesc').value = getLocalizedRoomField(room, 'desc');

  // Switch modal to EDIT mode labels
  document.getElementById('createRoomModalTitle').textContent = getInlineText({ ko: '동행 방 수정하기', en: 'Edit Companion Room', fr: 'Modifier la salle', zh: '编辑结伴房间', ja: '同行ルームを編集', es: 'Editar sala' });
  document.getElementById('createRoomModalSubmitBtn').textContent = getInlineText({ ko: '수정 완료', en: 'Save Changes', fr: 'Enregistrer', zh: '保存修改', ja: '変更を保存', es: 'Guardar cambios' });

  syncCompanionDateTimeConstraints({ coerce: true });
  document.getElementById('createRoomModal').classList.add('active');
  document.body.classList.add('modal-open');
}

// --- View Router Updates ---
function updateView() {
  // Hide all sections, show active
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });
  
  const viewId = `${state.currentView}-view`;
  const viewElem = document.getElementById(viewId);
  if (viewElem) {
    viewElem.classList.add('active');
  }

  // Update tabs active state
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-target') === state.currentView) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // If chat view is loaded, run scrolling to bottom
  if (state.currentView === 'chat') {
    scrollChatToBottom();
  }

  if (state.currentView === 'routeplanner') {
    if (typeof safeRenderRouteOptimizerTab === 'function') {
      safeRenderRouteOptimizerTab();
    }
  }

  if (state.currentView === 'planner' && state.activeCourse) {
    syncPlannerControlsFromCourse(state.activeCourse);
  }

  saveToLocalStorage();
  requestAnimationFrame(() => repairVisibleMojibake(document.body));
}

// --- Dynamic Rendering Components ---
function renderPopularDestinations() {
  const grid = document.getElementById('popularDestinationsGrid');
  grid.innerHTML = '';

  const destinationPhotos = {
    paris: 'assets/travel/paris.jpg',
    newyork: 'assets/travel/new-york.jpg',
    tokyo: 'assets/travel/tokyo.jpg',
    rome: 'assets/travel/rome.jpg',
    seoul: 'assets/travel/seoul.jpg',
    losangeles: 'assets/travel/losangeles.jpg'
  };
  const featuredCities = ['paris', 'newyork', 'tokyo', 'rome', 'seoul', 'losangeles']
    .map(id => getSortedSupportedDestinationCities().find(city => city.id === id))
    .filter(Boolean);

  featuredCities.forEach(city => {
    const name = getLocalizedCityField(city, 'name');
    const country = getLocalizedCityField(city, 'country');
    const desc = getLocalizedCityField(city, 'desc');

    const card = document.createElement('div');
    card.className = `dest-card ${city.id}`;
    card.setAttribute('data-city-id', city.id);
    card.style.setProperty('--destination-photo', `url("${destinationPhotos[city.id]}")`);
    card.innerHTML = `
      <span class="dest-tag">${country}</span>
      <div class="dest-info">
        <h4>${name}</h4>
        <p>${desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderCitySelectors() {
  const selectPlanner = document.getElementById('plannerDest');
  const selectModal = document.getElementById('modalRoomDest');
  const selectQuickStart = document.getElementById('onboardingQuickCity');
  const plannerCityList = document.getElementById('plannerCityDatalist');
  const modalCityList = document.getElementById('modalRoomCityDatalist');
  
  const currentPlannerVal = selectPlanner ? selectPlanner.value : '';
  const currentModalVal = selectModal ? selectModal.value : '';
  const currentQuickStartVal = selectQuickStart ? selectQuickStart.value : '';

  if (selectPlanner) {
    selectPlanner.innerHTML = '';
    getSortedSupportedDestinationCities().forEach(city => {
      const name = getLocalizedCityField(city, 'name');
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = name;
      selectPlanner.appendChild(option);
    });
  }

  if (selectModal) {
    selectModal.innerHTML = '';
    getSortedSupportedDestinationCities().forEach(city => {
      const name = getLocalizedCityField(city, 'name');
      const optionHTML = `<option value="${city.id}">${name}</option>`;
      selectModal.insertAdjacentHTML('beforeend', optionHTML);
    });
  }

  if (selectQuickStart) {
    selectQuickStart.innerHTML = '';
    getSortedSupportedDestinationCities().forEach(city => {
      const name = getLocalizedCityField(city, 'name');
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = name;
      selectQuickStart.appendChild(option);
    });
  }

  [plannerCityList, modalCityList].forEach(list => {
    if (!list) return;
    list.innerHTML = '';
    getSortedSupportedDestinationCities().forEach(city => {
      const opt = document.createElement('option');
      opt.value = getLocalizedCityField(city, 'name');
      opt.label = `${getLocalizedCityField(city, 'name')}${getLocalizedCityField(city, 'country') ? ', ' + getLocalizedCityField(city, 'country') : ''}`;
      list.appendChild(opt);
    });
  });

  // Restore values
  if (selectPlanner && currentPlannerVal) {
    selectPlanner.value = currentPlannerVal;
  }
  if (selectModal && currentModalVal) {
    selectModal.value = currentModalVal;
  }
  if (selectQuickStart) {
    const fallbackCity = currentPlannerVal || 'newyork';
    if (currentQuickStartVal && [...selectQuickStart.options].some(opt => opt.value === currentQuickStartVal)) {
      selectQuickStart.value = currentQuickStartVal;
    } else if ([...selectQuickStart.options].some(opt => opt.value === fallbackCity)) {
      selectQuickStart.value = fallbackCity;
    }
  }

  const plannerSearch = document.getElementById('plannerCitySearchInput');
  if (plannerSearch && selectPlanner) {
    const city = getSortedSupportedDestinationCities().find(c => c.id === selectPlanner.value);
    const typedCity = findCityByTypedName(plannerSearch.value);
    if (city && (!plannerSearch.value || typedCity)) plannerSearch.value = getLocalizedCityField(city, 'name');
  }
  const modalSearch = document.getElementById('modalRoomCitySearchInput');
  if (modalSearch && selectModal) {
    const city = getSortedSupportedDestinationCities().find(c => c.id === selectModal.value);
    const typedCity = findCityByTypedName(modalSearch.value);
    if (city && (!modalSearch.value || typedCity)) modalSearch.value = getLocalizedCityField(city, 'name');
  }
}


const DEFAULT_TRAVELER_LABELS = {
  ko: '여행자',
  en: 'Traveler',
  fr: 'Voyageur',
  es: 'Viajero',
  ja: '旅行者',
  zh: '旅行者'
};

function getLocalizedProfileDisplayName(profileOrName, lang = state.lang) {
  const rawName = typeof profileOrName === 'string'
    ? profileOrName
    : String((profileOrName && profileOrName.name) || '');
  const name = repairMojibakeText(rawName).trim();
  const match = name.match(/^(?:여행자|Traveler|Voyageur|Viajero|旅行者)_(\d+)$/i);
  if (!match) return name;
  const codeLang = normalizeLanguageCode(lang);
  return `${DEFAULT_TRAVELER_LABELS[codeLang] || DEFAULT_TRAVELER_LABELS.en}_${match[1]}`;
}

function getProfileInitial(profile = state.activeProfile) {
  const name = getLocalizedProfileDisplayName(profile);
  return name ? name.charAt(0).toUpperCase() : '?';
}

function renderAvatarMarkup(profile, className) {
  const avatar = profile && profile.avatarDataUrl;
  const label = getLocalizedProfileDisplayName(profile) || getText('profile_title');
  const photoLabel = getInlineText({ ko: '프로필 사진', en: 'profile photo', fr: 'photo de profil', zh: '头像', ja: 'プロフィール写真', es: 'foto de perfil' });
  if (avatar) {
    return `<img class="${className}" src="${avatar}" alt="${escapeHtml(`${label} ${photoLabel}`.trim())}">`;
  }
  return `<div class="${className}">${escapeHtml(getProfileInitial(profile))}</div>`;
}

function repairCommonMojibakeLiterals(value) {
  return String(value || '')
    .replace(/Ã©/g, 'é')
    .replace(/Ã¨/g, 'è')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã®/g, 'î')
    .replace(/Ã´/g, 'ô')
    .replace(/Ã¹/g, 'ù')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã€/g, 'À')
    .replace(/Ã‡/g, 'Ç')
    .replace(/Â·/g, '·')
    .replace(/Â°/g, '°')
    .replace(/â€™|â€˜/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€“|â€”/g, '-')
    .replace(/â€¦/g, '...')
    .replace(/\uFFFD/g, '');
}

function cleanUiText(value) {
  return repairCommonMojibakeLiterals(repairMojibakeText(String(value || '')))
    .replace(/^Korean detail:\s*/i, '')
    .replace(/^Translation missing\.?\s*(Description:)?\s*/i, '')
    .replace(/^\[(KOR|ENG)\]\s*/i, '')
    .replace(/\s*·\s*/g, ' · ')
    .replace(/\s*→\s*/g, ' → ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLocalizedRoomField(room, base) {
  const lang = normalizeLanguageCode(state.lang);
  const direct = room && room[`${base}_${lang}`];
  if (direct) return localizePlaceName(cleanUiText(direct), lang);
  if (lang !== 'ko' && lang !== 'en') {
    const city = room && typeof CITIES !== 'undefined' ? CITIES.find(item => item.id === room.cityId) : null;
    const cityName = city ? getLocalizedCityField(city, 'name', lang) : '';
    const category = getCategoryLabel((room && room.category) || 'city');
    const sourcePlace = room && (room.place_en || room.place_ko || room.place);
    const cleanSourcePlace = cleanUiText(sourcePlace || cityName);
    const place = /[\uAC00-\uD7A3]/.test(cleanSourcePlace)
      ? getInlineText({ fr: `point de rencontre à ${cityName}`, zh: `${cityName}集合地点`, ja: `${cityName}の集合場所`, es: `punto de encuentro en ${cityName}` }, lang)
      : localizePlaceName(cleanSourcePlace, lang);
    if (base === 'title') {
      return getInlineText({
        fr: `${category} à ${cityName}`,
        zh: `${cityName}${category}结伴`,
        ja: `${cityName}の${category}同行募集`,
        es: `${category} en ${cityName}`
      }, lang);
    }
    if (base === 'desc') {
      return getInlineText({
        fr: `Retrouvez les participants à ${place} et coordonnez les détails dans la discussion.`,
        zh: `在${place}与同行者会合，并在聊天室协调详细安排。`,
        ja: `${place}で合流し、チャットで詳細を調整します。`,
        es: `Reúnete con los participantes en ${place} y coordina los detalles en el chat.`
      }, lang);
    }
    if (base === 'place') return place;
  }
  const fallbackKeys = lang === 'ko'
    ? [`${base}_ko`, `${base}_en`, base]
    : lang === 'en'
      ? [`${base}_en`, base, `${base}_ko`]
      : [`${base}_en`, base, `${base}_ko`];
  for (const key of fallbackKeys) {
    if (room && room[key]) return cleanUiText(room[key]);
  }
  return '';
}

const KNOWN_KOREAN_PLACE_NAMES = {
  'statue of liberty & ellis island': '\uC790\uC720\uC758 \uC5EC\uC2E0\uC0C1\uACFC \uC5D8\uB9AC\uC2A4\uC12C',
  'central park': '\uC13C\uD2B8\uB7F4\uD30C\uD06C',
  'the metropolitan museum of art': '\uBA54\uD2B8\uB85C\uD3F4\uB9AC\uD0C4 \uBBF8\uC220\uAD00',
  'empire state building observatory': '\uC5E0\uD30C\uC774\uC5B4 \uC2A4\uD14C\uC774\uD2B8 \uBE4C\uB529 \uC804\uB9DD\uB300',
  'times square & broadway': '\uD0C0\uC784\uC2A4\uD018\uC5B4\uC640 \uBE0C\uB85C\uB4DC\uC6E8\uC774',
  'brooklyn bridge & dumbo': '\uBE0C\uB8E8\uD074\uB9B0 \uBE0C\uB9AC\uC9C0\uC640 \uB364\uBCF4',
  'british museum': '\uB300\uC601\uBC15\uBB3C\uAD00',
  'buckingham palace': '\uBC84\uD0B9\uC5C4 \uAD81\uC804',
  'tower of london': '\uB7F0\uB358 \uD0D1',
  'westminster abbey': '\uC6E8\uC2A4\uD2B8\uBBFC\uC2A4\uD130 \uC0AC\uC6D0',
  'london eye': '\uB7F0\uB358 \uC544\uC774',
  'shanghai museum': '\uC0C1\uD558\uC774 \uBC15\uBB3C\uAD00',
  'the bund waterfront promenade': '\uB354 \uBC88\uB4DC \uC640\uC774\uD0C4 \uC0B0\uCC45',
  'oriental pearl tower': '\uB3D9\uBC29\uBA85\uC8FC \uD0C0\uC6CC',
  'yu garden': '\uC608\uC6D0',
  'nanjing road': '\uB09C\uC9D5\uB3D9\uB85C',
  'fuxing park & former french concession walk': '\uD478\uC2F1\uACF5\uC6D0\uACFC \uD504\uB791\uC2A4 \uC870\uACC4\uC9C0 \uC0B0\uCC45',
  'people square': '\uC778\uBBFC\uAD11\uC7A5'
};

function translateKnownPlaceNameToKorean(value) {
  const key = String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  return KNOWN_KOREAN_PLACE_NAMES[key] || (CURATED_PLACE_NAME_TRANSLATIONS[key] && CURATED_PLACE_NAME_TRANSLATIONS[key].ko) || '';
}

function getLocalizedItineraryField(item, base) {
  return getLocalizedDataField(item, base);
}

function formatRoomSchedule(room) {
  const lang = normalizeLanguageCode(state.lang);
  const date = room && room.date ? new Date(`${room.date}T00:00:00`) : null;
  const dateText = date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString(getLanguageLocale(lang), { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })
    : '';
  const timeText = cleanUiText(room && room.time ? room.time : '');
  return [dateText, timeText].filter(Boolean).join(lang === 'ko' ? ' ' : ' · ');
}

function updateProfileAvatarUI() {
  const displayName = getLocalizedProfileDisplayName(state.activeProfile.name);
  const photoLabel = getInlineText({ ko: '프로필 사진', en: 'profile photo', fr: 'photo de profil', zh: '头像', ja: 'プロフィール写真', es: 'foto de perfil' });
  const initialLabel = getInlineText({ ko: '프로필 이니셜', en: 'profile initial', fr: 'initiale du profil', zh: '头像首字母', ja: 'プロフィールの頭文字', es: 'inicial del perfil' });
  const headerWidget = document.querySelector('.user-status-widget');
  if (headerWidget) {
    let headerAvatar = document.getElementById('headerProfileAvatar');
    if (!headerAvatar) {
      headerAvatar = document.createElement('div');
      headerAvatar.id = 'headerProfileAvatar';
      headerWidget.insertBefore(headerAvatar, document.getElementById('headerProfileName'));
    }
    headerAvatar.className = 'header-profile-avatar';
    if (state.activeProfile.avatarDataUrl) {
      headerAvatar.style.backgroundImage = `url("${state.activeProfile.avatarDataUrl}")`;
      headerAvatar.textContent = '';
      headerAvatar.setAttribute('aria-label', `${displayName} ${photoLabel}`);
    } else {
      headerAvatar.style.backgroundImage = '';
      headerAvatar.textContent = getProfileInitial();
      headerAvatar.setAttribute('aria-label', `${displayName} ${initialLabel}`);
    }
  }

  const preview = document.getElementById('profilePhotoPreview');
  if (preview) {
    if (state.activeProfile.avatarDataUrl) {
      preview.style.backgroundImage = `url("${state.activeProfile.avatarDataUrl}")`;
      preview.textContent = '';
    } else {
      preview.style.backgroundImage = '';
      preview.textContent = getProfileInitial();
    }
  }

  const resetBtn = document.getElementById('profilePhotoResetBtn');
  if (resetBtn) {
    resetBtn.disabled = !state.activeProfile.avatarDataUrl;
  }
}

function updateProfileVerificationUI() {
  const stamp = document.getElementById('profileVerifiedStamp');
  const btn = document.getElementById('verifyIdentityBtn');
  
  if (stamp) {
    stamp.style.display = 'none';
    stamp.textContent = '';
  }
  
  if (btn) {
    btn.style.display = 'none';
  }
}
// Infer realistic visit duration for wiki-fetched attractions based on type and keywords
function inferWikiDuration(category, title, extract) {
  const t = (title + ' ' + (extract || '')).toLowerCase();

  // Official visitor centers for major space facilities are usually half-day to full-day visits.
  if (['space center', 'space centre', 'nasa', 'johnson space center', 'kennedy space center'].some(kw => t.includes(kw))) {
    return 420;
  }
  
  // Major museums (3-4 hours)
  if (['museum', 'musée', 'museo', '박물관', '미술관', 'gallery', 'galerie'].some(kw => t.includes(kw))) {
    // World-famous mega museums
    if (['louvre', 'british museum', 'metropolitan', 'hermitage', 'vatican', 'uffizi', 'prado', 'rijksmuseum',
         '루브르', '대영박물관', '에르미타주', '바티칸', '우피치', '오르세', 'orsay', '국립박물관', 'national museum'].some(kw => t.includes(kw))) {
      return 240; // 4 hours
    }
    return 150; // 2.5 hours for other museums
  }
  
  // Theme parks / amusement parks (full day)
  if (['disneyland', 'disney', 'universal', 'legoland', 'lotte world', '디즈니', '유니버셜', '롯데월드',
       'theme park', 'amusement park', '테마파크', '놀이공원'].some(kw => t.includes(kw))) {
    return 480; // 8 hours
  }
  
  // Large parks and gardens (1.5-2 hours)
  if (['park', 'garden', 'botanical', '공원', '정원', '식물원', 'forest', '숲'].some(kw => t.includes(kw))) {
    return 90;
  }
  
  // Churches, cathedrals, temples (1-1.5 hours)
  if (['cathedral', 'church', 'basilica', 'temple', 'shrine', 'mosque', '성당', '대성당', '사원', '신사', '모스크',
       'notre-dame', 'sagrada', '사그라다'].some(kw => t.includes(kw))) {
    if (['sagrada', 'notre-dame', 'st peter', 'westminster', '사그라다'].some(kw => t.includes(kw))) {
      return 120; // 2 hours for famous ones
    }
    return 60;
  }
  
  // Markets (1-2 hours)
  if (['market', 'bazaar', 'mercado', '시장', '마켓', '바자'].some(kw => t.includes(kw))) {
    return 90;
  }
  
  // Palaces, castles (1.5-2.5 hours)
  if (['palace', 'castle', 'château', 'chateau', 'fortress', '궁', '성', '궁전'].some(kw => t.includes(kw))) {
    if (['versailles', 'forbidden city', 'alhambra', '베르사유', '자금성', '알함브라'].some(kw => t.includes(kw))) {
      return 210; // 3.5 hours
    }
    return 120;
  }
  
  // Towers, viewpoints, observation (30-60 min)
  if (['tower', 'observation', 'viewpoint', '타워', '전망대', 'å±•æœ›'].some(kw => t.includes(kw))) {
    return 60;
  }
  
  // Aquariums, zoos (2-3 hours)  
  if (['aquarium', 'zoo', '수족관', '동물원', 'oceanarium'].some(kw => t.includes(kw))) {
    return 180;
  }
  
  // Default by category
  const defaults = { healing: 90, gourmet: 80, culture: 120, activity: 120, shopping: 90 };
  return defaults[category] || 90;
}

function shouldSupplementAttractionsFromWiki(cityId) {
  const isKnownCity = cityId !== 'custom' && Array.isArray(CITIES) && CITIES.some(city => city.id === cityId);
  // Supported cities must stay on maintained place records. Wikipedia category
  // pages do not provide a reliable open/closed or public-access status.
  if (cityId !== 'custom' && (isKnownCity || ATTRACTIONS[cityId])) return false;
  return true;
}

function fetchWikiAttractions(cityName, cityId, lang) {
  const isKnownCity = cityId !== 'custom' && Array.isArray(CITIES) && CITIES.some(city => city.id === cityId);
  if (cityId !== 'custom' && (isKnownCity || ATTRACTIONS[cityId]) && !shouldSupplementAttractionsFromWiki(cityId)) {
    return Promise.resolve(null);
  }

  const wikiLang = lang === 'ko' ? 'ko' : 'en';
  const wikiApi = `https://${wikiLang}.wikipedia.org/w/api.php`;

  // --- Helper: fetch JSON from Wikipedia API ---
  const wikiQuery = (params) => {
    const qs = new URLSearchParams({ format: 'json', origin: '*', ...params }).toString();
    return fetch(`${wikiApi}?${qs}`).then(r => r.json());
  };

  // --- Helper: deterministic hash for pseudo-random positioning ---
  const hashStr = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003;
    return h;
  };

  // --- Helper: classify an article into a category ---
  const classifyArticle = (title, extract) => {
    const ft = (title + ' ' + extract).toLowerCase();
    if (ft.includes('market') || ft.includes('시장') || ft.includes('쇼핑') || ft.includes('mall') || ft.includes('아울렛') || ft.includes('shopping') || ft.includes('street') || ft.includes('거리') || ft.includes('길')) return 'shopping';
    if (ft.includes('restaurant') || ft.includes('맛집') || ft.includes('카페') || ft.includes('cafe') || ft.includes('식당') || ft.includes('커피') || ft.includes('음식') || ft.includes('요리') || ft.includes('피자') || ft.includes('pizza') || ft.includes('파스타') || ft.includes('치즈') || ft.includes('와인') || ft.includes('food') || ft.includes('cuisine') || ft.includes('bakery') || ft.includes('bistro') || ft.includes('diner') || ft.includes('eatery') || ft.includes('pub') || ft.includes('bar') || ft.includes('tavern') || ft.includes('brewery') || ft.includes('brunch') || ft.includes('tea house') || ft.includes('tea room') || ft.includes('식사') || ft.includes('디저트') || ft.includes('베이커리') || ft.includes('빵집') || ft.includes('바 ') || ft.includes('펍') || ft.includes('이자카야') || ft.includes('맥주') || ft.includes('브런치') || ft.includes('찻집') || ft.includes('디너') || ft.includes('런치') || ft.includes('조식') || ft.includes('아침') || ft.includes('점심') || ft.includes('저녁')) return 'gourmet';
    if (ft.includes('park') || ft.includes('공원') || ft.includes('beach') || ft.includes('해변') || ft.includes('해수욕장') || ft.includes('숲') || ft.includes('forest') || ft.includes('lake') || ft.includes('호수') || ft.includes('산') || ft.includes('mountain') || ft.includes('계곡') || ft.includes('view') || ft.includes('전망') || ft.includes('섬') || ft.includes('island') || ft.includes('항구') || ft.includes('port') || ft.includes('미항') || ft.includes('garden') || ft.includes('정원') || ft.includes('nature') || ft.includes('자연')) return 'healing';
    if (ft.includes('amusement') || ft.includes('theme park') || ft.includes('테마파크') || ft.includes('놀이공원') || ft.includes('월드') || ft.includes('랜드') || ft.includes('zoo') || ft.includes('동물원') || ft.includes('수족관') || ft.includes('aquarium') || ft.includes('stadium') || ft.includes('경기장') || ft.includes('스포츠') || ft.includes('레포츠') || ft.includes('sports') || ft.includes('adventure')) return 'activity';
    return 'culture';
  };

  // --- Helper: clean description text ---
  const cleanDescription = (extract) => {
    let d = extract.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    d = d.replace(/\s*\([^)]*\)/g, '').trim();
    d = d.replace(/\s+/g, ' ');
    return d;
  };

  const WIKI_META_TITLE_PATTERN = /^(?:user|user talk|사용자|사용자토론|wikipedia|위키백과|template|틀|category|분류|file|파일|mediawiki|module|모듈|talk|토론|wikiproject|portal|draft|help|special)\s*:/i;
  const WIKI_META_NOISE_PATTERN = /(\/wikivault\/|wikivault|sandbox|연습장|user page|사용자 문서|wiki project|wikiproject|draft:|template:|category:|사용자:|위키백과:|분류:|파일:)/i;
  const WIKI_NON_OPERATIONAL_PATTERN = /\b(?:permanently closed|closed (?:in|since|to the public)|defunct|demolished|never opened|not open to the public|under construction|still under development|planned (?:theme park|development|complex)|private residence)\b/i;
  const isRejectedWikiTitle = (title) => {
    const clean = repairMojibakeText(String(title || '')).trim();
    if (!clean) return true;
    if (WIKI_META_TITLE_PATTERN.test(clean)) return true;
    if (WIKI_META_NOISE_PATTERN.test(clean)) return true;
    return /^[^:]{1,32}:.+\/.+/.test(clean);
  };
  const hasWikiMetaNoise = (value) => WIKI_META_NOISE_PATTERN.test(repairMojibakeText(String(value || '')));
  const sanitizeWikiTitle = (title) => cleanUiText(String(title || '').replace(/\s*\(.*?\)\s*/g, ' '));
  const sanitizeWikiDescription = (extract) => {
    const desc = cleanUiText(cleanDescription(repairMojibakeText(String(extract || ''))));
    if (!desc || hasWikiMetaNoise(desc) || isRejectedWikiTitle(desc.slice(0, 100))) return '';
    return desc;
  };

  // ========== STEP 1: Resolve the city's official Wikipedia title & center coordinates ==========
  const resolveCityInfo = () => {
    return wikiQuery({ action: 'query', list: 'search', srsearch: cityName, srlimit: '1' })
      .then(data => {
        let officialTitle = cityName;
        if (data.query && data.query.search && data.query.search.length > 0) {
          officialTitle = data.query.search[0].title;
        }
        // Fetch coordinates of the city article
        return wikiQuery({
          action: 'query', prop: 'coordinates', titles: officialTitle
        }).then(coordData => {
          let centerLat = null, centerLon = null;
          if (coordData.query && coordData.query.pages) {
            const pages = coordData.query.pages;
            const pid = Object.keys(pages)[0];
            const coords = pages[pid]?.coordinates;
            if (coords && coords.length > 0) {
              centerLat = coords[0].lat;
              centerLon = coords[0].lon;
            }
          }
          return { officialTitle, centerLat, centerLon };
        });
      });
  };

  // ========== STEP 2: Fetch category members from Wikipedia Category API ==========
  const fetchCategoryMembers = (categoryTitle, limit = 50) => {
    return wikiQuery({
      action: 'query', list: 'categorymembers', cmtitle: categoryTitle,
      cmtype: 'page', cmlimit: String(limit)
    }).then(data => {
      if (data.query && data.query.categorymembers) {
        return data.query.categorymembers.map(m => m.title).filter(t => !isRejectedWikiTitle(t));
      }
      return [];
    }).catch(() => []);
  };

  // Fetch subcategory names from a category
  const fetchSubcategories = (categoryTitle) => {
    return wikiQuery({
      action: 'query', list: 'categorymembers', cmtitle: categoryTitle,
      cmtype: 'subcat', cmlimit: '50'
    }).then(data => {
      if (data.query && data.query.categorymembers) {
        return data.query.categorymembers.map(m => m.title);
      }
      return [];
    }).catch(() => []);
  };

  // ========== STEP 3: Collect attraction titles via category tree ==========
  const collectCategoryTitles = (officialTitle) => {
    // Build candidate category names to try
    const categoryPrefix = wikiLang === 'ko' ? '분류' : 'Category';
    const candidateCategories = wikiLang === 'ko'
      ? [
          `${categoryPrefix}:${officialTitle}의 관광지`,
          `${categoryPrefix}:${officialTitle}의 건축물`,
          `${categoryPrefix}:${officialTitle}의 공원`,
          `${categoryPrefix}:${officialTitle}의 박물관`,
          `${categoryPrefix}:${officialTitle}의 문화`
        ]
      : [
          `${categoryPrefix}:Tourist attractions in ${officialTitle}`,
          `${categoryPrefix}:Buildings and structures in ${officialTitle}`,
          `${categoryPrefix}:Parks in ${officialTitle}`,
          `${categoryPrefix}:Museums in ${officialTitle}`,
          `${categoryPrefix}:Culture in ${officialTitle}`,
          `${categoryPrefix}:Landmarks in ${officialTitle}`
        ];

    // Fetch all candidate categories in parallel
    return Promise.all(candidateCategories.map(cat => fetchCategoryMembers(cat, 30)))
      .then(results => {
        const allTitles = new Set();
        results.forEach(titles => titles.forEach(t => allTitles.add(t)));
        return allTitles;
      })
      .then(titleSet => {
        // If we have enough, return early
        if (titleSet.size >= 15) {
          return Array.from(titleSet);
        }

        // Try to expand via subcategories of the main tourist category
        const mainCategory = candidateCategories[0];
        return fetchSubcategories(mainCategory).then(subCats => {
          if (subCats.length === 0) return Array.from(titleSet);
          // Fetch members from up to 10 subcategories
          const subFetches = subCats.slice(0, 10).map(sc => fetchCategoryMembers(sc, 20));
          return Promise.all(subFetches).then(subResults => {
            subResults.forEach(titles => titles.forEach(t => titleSet.add(t)));
            return Array.from(titleSet);
          });
        });
      });
  };

  // ========== STEP 4: Fallback text search ==========
  const textSearchFallback = (officialTitle) => {
    let searchTerms = wikiLang === 'ko'
      ? [`${officialTitle} 관광`, `${officialTitle} 맛집`, `${officialTitle} 카페`]
      : [`${officialTitle} tourism attractions`, `${officialTitle} restaurant`, `${officialTitle} cafe`];
      
    if (cityId !== 'custom' && (isKnownCity || ATTRACTIONS[cityId])) {
      searchTerms = [
        `${officialTitle} tourist attractions`,
        `${officialTitle} landmarks`,
        `${officialTitle} museums`,
        `${officialTitle} parks`
      ];
    }

    const fetches = searchTerms.map(term => {
      return wikiQuery({
        action: 'query', list: 'search', srsearch: term, srlimit: '15'
      }).then(data => {
        if (!data.query || !data.query.search) return [];
        return data.query.search.map(item => item.title).filter(t => !isRejectedWikiTitle(t));
      }).catch(() => []);
    });
    
    return Promise.all(fetches).then(results => {
      const merged = new Set();
      results.forEach(titles => titles.forEach(t => merged.add(t)));
      return Array.from(merged);
    });
  };

  // ========== STEP 5: Fetch coordinates + extracts for a batch of titles ==========
  const fetchArticleDetails = (titles) => {
    titles = (titles || []).filter(t => !isRejectedWikiTitle(t));
    if (titles.length === 0) return Promise.resolve([]);
    // Wikipedia API allows up to 50 titles per request
    const batches = [];
    for (let i = 0; i < titles.length; i += 50) {
      batches.push(titles.slice(i, i + 50));
    }
    return Promise.all(batches.map(batch => {
      return wikiQuery({
        action: 'query', prop: 'coordinates|extracts',
        exintro: '1', explaintext: '1', exsentences: '2',
        titles: batch.join('|')
      }).then(data => {
        if (!data.query || !data.query.pages) return [];
        const results = [];
        for (const pid in data.query.pages) {
          const page = data.query.pages[pid];
          if (page.missing !== undefined) continue;
          if (page.ns !== undefined && page.ns !== 0) continue;
          if (isRejectedWikiTitle(page.title)) continue;
          const coords = page.coordinates && page.coordinates.length > 0 ? page.coordinates[0] : null;
          results.push({
            title: page.title,
            ns: page.ns,
            extract: page.extract || '',
            lat: coords ? coords.lat : null,
            lon: coords ? coords.lon : null
          });
        }
        return results;
      }).catch(() => []);
    })).then(batchResults => batchResults.flat());
  };

  // ========== STEP 6: Filter and build the final attraction object ==========
  const buildAttractionResult = (articles, centerLat, centerLon) => {
    const categories = {
      healing: [], gourmet: [], culture: [], activity: [], shopping: []
    };
    const isKnownSupplement = cityId !== 'custom' && (isKnownCity || ATTRACTIONS[cityId]);

    // Scale factors: ~20km spans the full 0-10 range
    // 1 degree latitude ≈ 111km, so 20km ≈ 0.18 degrees → scale = 10/0.36 ≈ 27.8
    // For longitude, cos(lat) factor applies; use ~30 as default
    const latScale = 27.8;
    const lonScale = 30.0;

    const excludeKeywords = [
      '목록', 'list of', '교통', '행정', '인구', '기후', '지리', '역사',
      '축구', 'fc', '올림픽', '전쟁', '조약', '대통령', '총리', '선거',
      '의회', '정부', '군사', '정치', '회사', '기업', '산업',
      'highway', 'railway', 'route', 'road', 'expressway', 'airport',
      'tourism in', 'cultural impact', 'discography', 'filmography',
      'boy band', 'girl group', 'album', 'song', 'television series',
      'outline of', 'history of', 'economy of', 'politics of',
      'transport in', 'demographics of',
      '고속도로', '철도', '노선', '공항', '터미널'
    ];

    const seenTitles = new Set();
    const ownCityNames = (() => {
      const own = Array.isArray(CITIES) ? CITIES.find(city => city && city.id === cityId) : null;
      return [cityId, own && own.name_en, own && own.name_ko, cityName]
        .filter(Boolean)
        .map(name => String(name).toLowerCase());
    })();
    const mentionsOtherKnownCity = (title, extract) => {
      if (!isKnownSupplement || !Array.isArray(CITIES)) return false;
      const titleText = String(title || '').toLowerCase();
      const shortText = `${title || ''} ${String(extract || '').slice(0, 240)}`.toLowerCase();
      return CITIES.some(city => {
        if (!city || city.id === cityId) return false;
        const names = [city.id, city.name_en, city.name_ko]
          .filter(Boolean)
          .map(name => String(name).toLowerCase())
          .filter(name => name.length >= 4);
        if (!names.length) return false;
        const ownMentioned = ownCityNames.some(name => name && shortText.includes(name));
        const otherInTitle = names.some(name => titleText.includes(name));
        const otherInLead = names.some(name => shortText.includes(name));
        return otherInTitle || (otherInLead && !ownMentioned);
      });
    };

    articles.forEach(article => {
      const { title, extract, lat, lon } = article;
      if (article.ns !== undefined && article.ns !== 0) return;
      if (isRejectedWikiTitle(title) || hasWikiMetaNoise(extract)) return;
      const cleanTitle = sanitizeWikiTitle(title);
      if (!cleanTitle || isRejectedWikiTitle(cleanTitle)) return;
      const desc = sanitizeWikiDescription(extract);
      const titleLower = cleanTitle.toLowerCase();
      const articleText = `${cleanTitle} ${desc || extract || ''}`.toLowerCase();

      // Exclude non-attraction articles
      if (excludeKeywords.some(kw => articleText.includes(kw))) return;
      if (WIKI_NON_OPERATIONAL_PATTERN.test(articleText)) return;
      if (mentionsOtherKnownCity(cleanTitle, desc || extract)) return;
      if (/\bbts\b/.test(articleText)) return;
      if (lat == null || lon == null) return;
      // Skip duplicates
      if (seenTitles.has(titleLower)) return;

      // Filter out attractions that are too far from the center (e.g. > 30km)
      if (lat !== null && lon !== null && centerLat !== null && centerLon !== null) {
        const distFromCenter = getHaversineDistance(lat, lon, centerLat, centerLon);
        if (distFromCenter > 30.0) return;
      }

      seenTitles.add(titleLower);

      // Compute x, y from GPS coordinates
      let x, y;
      if (lat !== null && lon !== null) {
        x = lon;
        y = lat;
      } else if (centerLat !== null && centerLon !== null) {
        // Deterministic pseudo-random position near center for articles without coordinates
        const h = hashStr(cleanTitle);
        const offsetLon = ((h % 40) - 20) / 1000.0;
        const offsetLat = (((h >> 3) % 40) - 20) / 1000.0;
        x = centerLon + offsetLon;
        y = centerLat + offsetLat;
      } else {
        x = 126.9780;
        y = 37.5665;
      }

      const cat = classifyArticle(cleanTitle, desc || extract);
      if (isKnownSupplement && cat === 'gourmet') return;
      const wikiAttractionCityCheck = {
        name_ko: cleanTitle,
        name_en: cleanTitle,
        name: cleanTitle,
        desc_ko: desc,
        desc_en: desc,
        x: x,
        y: y
      };
      if (isInvalidGeneratedPlaceForCity(wikiAttractionCityCheck, cityId)) return;

      categories[cat].push({
        name_ko: cleanTitle,
        name_en: cleanTitle,
        desc_ko: desc || `${cleanTitle} 방문 일정`,
        desc_en: desc || `Visit to ${cleanTitle}`,
        duration: inferWikiDuration(cat, cleanTitle, desc || extract),
        lat: lat,
        lon: lon,
        x: x,
        y: y
      });
    });

    return categories;
  };

  // ========== MAIN PIPELINE ==========
  return resolveCityInfo()
    .then(({ officialTitle, centerLat, centerLon }) => {
      console.log(`[Wiki Fetch] City: ${cityName}, Official: ${officialTitle}, Center: ${centerLat}, ${centerLon}`);

      return collectCategoryTitles(officialTitle).then(categoryTitles => {
        console.log(`[Wiki Fetch] Category API returned ${categoryTitles.length} titles`);

        // If too few results from categories, supplement with text search
        let titlesPromise;
        if (categoryTitles.length < 10) {
          titlesPromise = textSearchFallback(officialTitle).then(searchTitles => {
            const combined = new Set(categoryTitles);
            searchTitles.forEach(t => combined.add(t));
            console.log(`[Wiki Fetch] After text search fallback: ${combined.size} titles`);
            return Array.from(combined);
          });
        } else {
          titlesPromise = Promise.resolve(categoryTitles);
        }

        return titlesPromise.then(allTitles => {
          if (allTitles.length === 0) return null;

          // Cap at 80 to avoid overly long API calls
          const capped = allTitles.slice(0, 80);

          return fetchArticleDetails(capped).then(articles => {
            console.log(`[Wiki Fetch] Got details for ${articles.length} articles`);
            if (articles.length === 0) return null;
            return buildAttractionResult(articles, centerLat, centerLon);
          });
        });
      });
    })
    .catch(err => {
      console.error("Error in fetchWikiAttractions:", err);
      return null;
    });
}

// --- Itinerary Engine (AI Course Generation) ---
function generateItinerary() {
  const cityId = document.getElementById('plannerDest').value;
  if (!cityId) {
    showToast(getText('planner_select_destination'));
    return;
  }

  const pace = document.getElementById('plannerPace')?.value || state.travelPace || 'moderate';
  state.travelPace = pace;
  state.regenConfig = {
    relaxed: pace === 'relaxed',
    packed: pace === 'packed',
    travelPace: pace
  };

  // Find matched city
  const matchedCity = CITIES.find(city => city.id === cityId);
  const cityName = matchedCity ? getLocalizedCityField(matchedCity, 'name') : cityId;
  const days = parseInt(document.getElementById('plannerDuration').value, 10);
  
  // Collect checked preferences
  const selectedPrefs = [];
  document.querySelectorAll('.pref-chip.selected').forEach(chip => {
    selectedPrefs.push(chip.getAttribute('data-pref'));
  });

  // Require at least one preference, default to healing
  if (selectedPrefs.length === 0) selectedPrefs.push('healing');

  // Trigger Shimmer animation
  const loader = document.getElementById('itineraryLoader');
  const content = document.getElementById('itineraryResultContent');
  
  loader.style.display = 'flex';
  content.style.display = 'none';

  // Use stable city names for external lookup; display uses the localized cityName above.
  const searchName = matchedCity
    ? getLocalizedCityField(matchedCity, 'name')
    : cityName;

  // Fetch lodging selection
  const lodgingSelect = document.getElementById('plannerLodging');
  let lodging = null;
  if (lodgingSelect && lodgingSelect.value) {
    try {
      lodging = JSON.parse(lodgingSelect.value);
    } catch (e) {
      console.error(e);
    }
  }

  fetchWikiAttractions(searchName, cityId, state.lang)
    .then(wikiPools => {
      try {
        const itinerary = buildCourseStructure(cityId, days, selectedPrefs, cityName, wikiPools);
        itinerary.cityName = cityName;
        itinerary.preferences = [...selectedPrefs];
        itinerary.durationDays = days;
        itinerary.travelPace = pace;
        
        // Save lodging configuration
        itinerary.lodging = lodging;
        
        // Inject lodging start/end to all days
        if (lodging) {
          itinerary.days.forEach(dayPlan => {
            const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
            
            const lodgingStart = {
              name_ko: `🏨 숙소 출발 (${lodging.name_ko || lodging.name})`,
              name_en: `🏨 Depart from Lodging (${lodging.name_en || lodging.name})`,
              desc_ko: '숙소에서 오늘의 일정을 시작합니다.',
              desc_en: 'Start today\'s itinerary from your accommodation.',
              x: lodging.x,
              y: lodging.y,
              cityId: cityId,
              isLodging: true,
              isStart: true,
              duration: 0,
              hideDuration: true
            };
            
            const lodgingEnd = {
              name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
              name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
              desc_ko: '숙소로 복귀합니다.',
              desc_en: 'Return to your accommodation.',
              x: lodging.x,
              y: lodging.y,
              cityId: cityId,
              isLodging: true,
              isEnd: true,
              duration: 0,
              hideDuration: true
            };
            
            dayPlan.items = [lodgingStart, ...attractions, lodgingEnd];
            recalculateDayPlanTimes(dayPlan, cityId);
          });
        }

        normalizeNearbyDayTripDays(itinerary);
        repairImpossibleClockTimes(itinerary);
        state.activeCourse = itinerary;
        state.editingSavedCourseId = null;
        state.currentItineraryDay = 1;
        saveToLocalStorage();

        renderItinerary(itinerary);

        loader.style.display = 'none';
        content.style.display = 'block';
      } catch (err) {
        console.error("Error generating itinerary inside promise:", err);
        loader.style.display = 'none';
        content.style.display = 'block';
      }
    })
    .catch(err => {
      console.error("Error fetching attractions:", err);
      try {
        const itinerary = buildCourseStructure(cityId, days, selectedPrefs, cityName, null);
        itinerary.cityName = cityName;
        itinerary.preferences = [...selectedPrefs];
        itinerary.durationDays = days;
        itinerary.travelPace = pace;
        
        itinerary.lodging = lodging;
        if (lodging) {
          itinerary.days.forEach(dayPlan => {
            const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
            
            const lodgingStart = {
              name_ko: `🏨 숙소 출발 (${lodging.name})`,
              name_en: `🏨 Depart from Lodging (${lodging.name})`,
              desc_ko: '숙소에서 오늘의 일정을 시작합니다.',
              desc_en: 'Start today\'s itinerary from your accommodation.',
              x: lodging.x,
              y: lodging.y,
              cityId: cityId,
              isLodging: true,
              isStart: true,
              duration: 0,
              hideDuration: true
            };
            
            const lodgingEnd = {
              name_ko: `🏨 숙소 복귀 (${lodging.name})`,
              name_en: `🏨 Return to Lodging (${lodging.name})`,
              desc_ko: '숙소로 복귀합니다.',
              desc_en: 'Return to your accommodation.',
              x: lodging.x,
              y: lodging.y,
              cityId: cityId,
              isLodging: true,
              isEnd: true,
              duration: 0,
              hideDuration: true
            };
            
            dayPlan.items = [lodgingStart, ...attractions, lodgingEnd];
            recalculateDayPlanTimes(dayPlan, cityId);
          });
        }

        normalizeNearbyDayTripDays(itinerary);
        repairImpossibleClockTimes(itinerary);
        state.activeCourse = itinerary;
        state.editingSavedCourseId = null;
        state.currentItineraryDay = 1;
        saveToLocalStorage();

        renderItinerary(itinerary);
      } catch (innerErr) {
        console.error(innerErr);
      }
      loader.style.display = 'none';
      content.style.display = 'block';
    });
}

// City-specific real restaurant fallbacks (no franchises!)
const CITY_RESTAURANTS = {
  seoul: {
    lunch: [
      { ko: "명동교자", en: "Myeongdong Kyoja", dk: "50년 전통의 칼국수와 만두 맛집", de: "Famous handmade knife-cut noodles and dumplings since 1966" },
      { ko: "토속촌 삼계탕", en: "Tosokchon Samgyetang", dk: "대통령들도 찾았던 경복궁 인근 삼계탕 전문점", de: "Traditional ginseng chicken soup near Gyeongbokgung Palace" },
      { ko: "삼청동 수제비", en: "Samcheong-dong Sujebi", dk: "삼청동에서 가장 유명한 쫀득한 수제비와 감자전", de: "Famous hand-pulled dough soup and potato pancake in Samcheong-dong" },
      { ko: "우래옥", en: "Wooraeok", dk: "서울에서 가장 오래된 전통 평양냉면과 불고기 맛집", de: "One of the oldest traditional Pyongyang Naengmyeon restaurants in Seoul" },
      { ko: "필동면옥", en: "Pildong Myeonok", dk: "맑고 깔끔한 육수의 미쉐린 가이드 평양냉면 맛집", de: "Michelin-starred clean broth Pyongyang-style cold noodles" },
      { ko: "을지다락", en: "Eulji Darak", dk: "을지로 감성의 매콤크림파스타와 오므라이스 맛집", de: "Trendy fusion pasta and fluffy omelet in Euljiro district" },
      { ko: "광화문 미진", en: "Gwanghwamun Mijin", dk: "메밀국수와 바삭한 돈까스로 유명한 광화문 노포", de: "Historic buckwheat noodle and tonkatsu spot in Gwanghwamun" },
      { ko: "진옥화할매닭한마리", en: "Jin Ok-hwa Halmae Dakhanmari", dk: "동대문 닭한마리 골목의 원조 맛집", de: "The original whole chicken soup restaurant in Dongdaemun" },
      { ko: "피맛골 열차집", en: "Pimatgol Yeolchajib", dk: "종로 피맛골의 오래된 빈대떡과 막걸리 대포집", de: "Historic mungbean pancake and makgeolli tavern in Jongno" },
      { ko: "깡통만두", en: "Kkangtong Mandu", dk: "북촌 안국역 인근의 정갈한 손만두 전골 전문점", de: "Handmade dumpling hotpot restaurant near Bukchon Hanok Village" }
    ],
    dinner: [
      { ko: "벽제갈비", en: "Byeokje Galbi", dk: "최상급 한우 숯불 갈비와 평양냉면 전문점", de: "Premium Korean Hanwoo beef charcoal barbecue dining" },
      { ko: "정식당", en: "Jungsik", dk: "임정식 셰프의 현대식 한식 파인다이닝 (미쉐린 2스타)", de: "Modern Korean fine dining by Chef Yim Jung-sik (2 Michelin Stars)" },
      { ko: "밍글스", en: "Mingles", dk: "강민구 셰프의 아시안 창작 한식 파인다이닝 (미쉐린 2스타)", de: "Innovative fine dining blending Korean heritage with global techniques" },
      { ko: "라연", en: "La Yeon", dk: "신라호텔 23층에 위치한 격조 높은 정통 한식 파인다이닝", de: "Exquisite traditional Korean fine dining at The Shilla Seoul" },
      { ko: "대도식당", en: "Daedo Sikdang", dk: "왕십리에서 시작된 무쇠판 한우 등심구이 전문점", de: "Famous Hanwoo ribeye steak grilled on a cast iron pan since 1964" },
      { ko: "한일관", en: "Hanilkwan", dk: "1939년 개업한 유서 깊은 불고기와 갈비탕 명가", de: "Historic Korean bulgogi and galbitang restaurant established in 1939" },
      { ko: "삼청각", en: "Samcheonggak", dk: "북악산 자락 한옥에서 즐기는 격조 높은 한정식", de: "Premium traditional Korean course dinner in a scenic hanok estate" },
      { ko: "송강", en: "Songgang", dk: "방배동의 오래된 전통 갯벌장어와 복요리 전문점", de: "Classic river eel and pufferfish restaurant in Bangbae-dong" },
      { ko: "남포면옥", en: "Nampo Myeonok", dk: "동치미 육수 냉면과 어복쟁반이 유명한 다동 노포", de: "Classic cold noodles and traditional beef hotpot (Eobok Jaengban)" },
      { ko: "진주회관", en: "Jinju Hoeguan", dk: "시청역 인근의 50년 전통 걸쭉한 서리태 콩국수 맛집", de: "Famous thick and creamy cold soybean noodle house near City Hall" }
    ],
    coffee: [
      { ko: "프릳츠 커피 컴퍼니", en: "Fritz Coffee Company", dk: "마포 한옥에서 맛보는 스페셜티 커피와 갓 구운 빵", de: "Specialty coffee and freshly baked bread in a cozy hanok setting" },
      { ko: "카페 어니언 성수", en: "Cafe Onion Seongsu", dk: "폐공장을 개조한 성수동 대표 인더스트리얼 감성 카페", de: "Renovated industrial factory cafe famous for its pandoro pastry" },
      { ko: "블루보틀 삼청 한옥", en: "Blue Bottle Samcheong Hanok", dk: "삼청동 한옥에서 즐기는 여유롭고 깔끔한 드립 커피", de: "Premium drip coffee served in a beautiful traditional hanok space" },
      { ko: "펠트커피", en: "Felt Coffee", dk: "미니멀한 인테리어와 산뜻한 원두의 스페셜티 에스프레소 바", de: "Minimalist espresso bar serving specialty single-origin coffees" },
      { ko: "테라로사 광화문점", en: "Terarosa Gwanghwamun", dk: "넓고 아늑한 북카페 스타일의 강릉 대표 로스터리 카페", de: "Spacious library-style cafe serving fresh hand-drip coffee" },
      { ko: "커피한약방", en: "Coffee Hanyakbang", dk: "을지로 좁은 골목 속 아날로그 감성이 흐르는 필터 커피숍", de: "Retro analog-style hand-drip coffee shop hidden in Euljiro alley" },
      { ko: "학림다방", en: "Hakrim Dabang", dk: "1956년 문을 열어 대학로의 역사를 지켜온 유서 깊은 다방", de: "Historic coffee shop open since 1956, preserving retro Seoul vibes" },
      { ko: "앤트러사이트 서교", en: "Anthracite Seokyo", dk: "고요하고 차분한 주택 개조형 커피 테라피 공간", de: "Quiet residential-style cafe focusing on peaceful drip coffee" },
      { ko: "카페 레이어드 연남", en: "Cafe Layered Yeonnam", dk: "아기자기한 영국식 스콘과 조각 케이크가 가득한 디저트 카페", de: "Charming British-style bakery famous for delicious scones and cakes" },
      { ko: "대충유원지", en: "Daechoong Yuwonji", dk: "서촌 골목길에서 산 전망과 함께 차와 커피를 즐기는 공간", de: "Cozy rooftop cafe in Seochon offering coffee and tea with mountain views" }
    ]
  },
  jeju: {
    lunch: [
      { ko: "자매국수", en: "Jamae Guksu", dk: "진한 돈사골 육수에 쫄깃한 돔베고기를 얹은 제주의 대표 고기국수", de: "Jeju's famous pork noodle soup topped with tender boiled pork slices" },
      { ko: "올래국수", en: "Olle Guksu", dk: "담백하고 시원한 국물 맛이 일품인 공항 근처 고기국수 맛집", de: "Delicious pork noodle soup near Jeju Airport, loved for its clean broth" },
      { ko: "우진해장국", en: "Ujin Haejangguk", dk: "제주산 고사리를 갈아 넣고 푹 끓인 걸쭉하고 구수한 해장국", de: "Thick and savory hangover soup made with finely shredded local bracken" },
      { ko: "은희네해장국", en: "Eunhine Haejangguk", dk: "소고기와 선지, 콩나물이 듬뿍 들어가 얼큰하고 시원한 해장국", de: "Spicy and hearty beef and congealed blood soup with bean sprouts" },
      { ko: "춘심이네", en: "Chunsimine", dk: "식탁 길이를 넘어서는 압도적인 비주얼의 통갈치구이 전문점", de: "Famous restaurant specializing in grilled giant whole cutlassfish" },
      { ko: "명진전복", en: "Myeongjin Jeonbok", dk: "돌솥에 고소하게 구워 나오는 전복돌솥밥과 전복구이 맛집", de: "Savory abalone stone pot rice and grilled abalone overlooking the sea" },
      { ko: "산방식당", en: "Sanbang Sikdang", dk: "새콤달콤한 양념의 제주식 밀면과 두툼한 수육 맛집", de: "Jeju-style wheat cold noodles and tender boiled pork slices" },
      { ko: "가시식당", en: "Gasi Sikdang", dk: "몸국과 두루치기가 유명한 표선 가시리의 로컬 식당", de: "Authentic local diner famous for pork seaweed soup and grilled pork" },
      { ko: "네거리식당", en: "Neogeori Sikdang", dk: "칼칼하고 달큰한 갈치조림과 싱싱한 성게미역국 전문점", de: "Spicy braised cutlassfish and fresh sea urchin seaweed soup" },
      { ko: "광원", en: "Gwangwon", dk: "정갈한 조경을 보며 즐기는 한우와 흑돼지 양념구이", de: "Elegant Korean beef and pork barbecue dining set in a beautiful garden" }
    ],
    dinner: [
      { ko: "돈사돈", en: "Donsadon", dk: "두툼한 제주 흑돼지 근고기를 멜젓에 찍어 먹는 숯불구이 맛집", de: "Famous thick-cut Jeju black pork barbecue served with salted anchovy sauce" },
      { ko: "칠돈가", en: "Childonga", dk: "참숯 위에서 직원이 직접 구워주는 흑돼지 목살과 오겹살", de: "Premium charcoal-grilled black pork belly and shoulder butt" },
      { ko: "숙성도", en: "Sukseongdo", dk: "수십 일간 숙성하여 육즙이 가득 차오른 뼈등심과 삼겹살 맛집", de: "Highly popular dry-aged bone-in pork chops and belly slices" },
      { ko: "연리지가든", en: "Yeonriji Garden", dk: "제주 토종 흑돼지의 깊고 구수한 풍미를 맛볼 수 있는 곳", de: "Rare traditional pure-breed Jeju black pork barbecue restaurant" },
      { ko: "삼보식당", en: "Sambo Sikdang", dk: "오뚝이처럼 뚝배기 가득 해산물이 들어간 해물뚝배기 명가", de: "Classic seafood hotpot and grilled tilefish in Seogwipo" },
      { ko: "늘봄흑돼지", en: "Neulbom Black Pork", dk: "대형 규모에서 즐기는 깔끔하고 부드러운 흑돼지 양념갈비", de: "Spacious dining hall serving tender marinated black pork ribs" },
      { ko: "유리네", en: "Yurine", dk: "대통령들이 방문했던 향토 음식점으로 갈치조림과 물회 전문", de: "Renowned local restaurant famous for spicy braised fish and raw fish soup" },
      { ko: "덤장", en: "Deomjang", dk: "다채로운 향토 요리가 코스로 나오는 중문 관광단지 한정식", de: "Full Jeju-style traditional course dining in Jungmun complex" },
      { ko: "신설오름", en: "Shinseol Oreum", dk: "구수하고 걸쭉한 몸국과 돔베고기로 유명한 야간 맛집", de: "Popular evening restaurant serving traditional seaweed pork soup" },
      { ko: "앞뱅디식당", en: "Apbaengdi Sikdang", dk: "각재기국(전갱이국)과 멜국(멸치국)이 유명한 로컬 맛집", de: "Traditional local diner famous for fresh mackerel and anchovy soup" }
    ],
    coffee: [
      { ko: "앤트러사이트 한림", en: "Anthracite Hallim", dk: "버려진 전분공장을 개조해 울창한 수풀과 함께 커피를 즐기는 카페", de: "Renovated starch factory cafe surrounded by lush green indoor gardens" },
      { ko: "카페 델문도 함덕", en: "Cafe Delmoondo", dk: "함덕 서우봉해변 에메랄드빛 바다 바로 위에 위치한 오션뷰 카페", de: "Oceanfront cafe sitting directly on the sands of Hamdeok Beach" },
      { ko: "아뜰리에안", en: "Atelier An", dk: "서귀포 법환포구 앞바다를 바라보며 즐기는 조용한 티카페", de: "Cozy specialty tea cafe overlooking the peaceful Seogwipo ocean" },
      { ko: "볼스카페", en: "Volls Cafe", dk: "귤밭 창고를 개조해 감각적인 빵과 스페셜티 커피를 파는 곳", de: "Renovated tangerine warehouse bakery cafe with vintage vibes" },
      { ko: "바다다", en: "VADADA", dk: "대형 야외 정원에서 일몰과 음악을 즐기는 라운지 카페", de: "Oceanfront luxury lounge cafe offering sunset views and chill music" },
      { ko: "울트라마린", en: "Ultramarine", dk: "신창풍차해안도로 옆 낙조가 아름다운 인스타 성지 카페", de: "Trendy modern cafe famous for its sunset view over wind turbines" },
      { ko: "테라로사 서귀포점", en: "Terarosa Seogwipo", dk: "붉은 벽돌과 감귤나무 정원이 어우러진 이국적인 분위기 카페", de: "Beautiful brick cafe building surrounded by tangerine orchards" },
      { ko: "마노르블랑", en: "Manor Blanc", dk: "핑크뮬리와 수국이 만발하는 산방산 전망의 정원 카페", de: "Garden cafe famous for seasonal hydrangeas and Sanbangsan views" },
      { ko: "더클리프", en: "The Cliff", dk: "중문 색달해변 절벽 위 힙한 비치 클럽 스타일 펍 카페", de: "Vibrant beach-club style cafe and pub overlooking Jungmun Beach" },
      { ko: "몽상드애월", en: "Monsant de Aewol", dk: "한담해안산책로 언덕 위 유리 외벽이 돋보이는 애월 대표 카페", de: "Iconic oceanfront cafe on Aewol cliffs with mirror-glass walls" }
    ]
  },
  tokyo: {
    lunch: [
      { ko: "츠키지 스시코우", en: "Tsukiji Sushikou", dk: "츠키지 시장 장외의 정갈하고 가성비 좋은 판스시 전문점", de: "Authentic and affordable fresh sushi set at Tsukiji Outer Market" },
      { ko: "아사쿠사 다이코쿠야 텐동", en: "Asakusa Daikokuya Tendon", dk: "1887년 창업해 참기름에 튀긴 고소하고 짭조름한 텐동 맛집", de: "Historic tempura rice bowl restaurant operating since 1887" },
      { ko: "신주쿠 후운지 라멘", en: "Shinjuku Fuunji", dk: "진하고 걸쭉한 닭 육수와 가쓰오부시 분말의 츠케멘 명가", de: "Highly popular ramen shop famous for rich poultry and fish tsukemen" },
      { ko: "시부야 이치란 라멘", en: "Shibuya Ichiran Ramen", dk: "독서실 스타일 1인석에서 즐기는 돈코츠 라멘 전문점", de: "Famous solo-booth Hakata-style pork bone broth ramen shop" },
      { ko: "미도리스시 시부야", en: "Midori Sushi Shibuya", dk: "가성비 좋은 신선하고 큼직한 네타의 초밥 세트 전문점", de: "Popular restaurant offering fresh and generous sushi platters" },
      { ko: "돈카츠 마이센 아오야마", en: "Tonkatsu Maisen Aoyama", dk: "부드럽게 씹히는 육즙 가득한 정통 흑돼지 돈카츠 전문점", de: "Famous tonkatsu restaurant set in a renovated public bathhouse" },
      { ko: "규카츠 모토무라 시부야", en: "Gyukatsu Motomura", dk: "개인 미니 화로에 살짝 구워 먹는 부드러운 소고기 카츠 맛집", de: "Crispy deep-fried beef cutlets cooked on individual stone grills" },
      { ko: "요시노야 신주쿠", en: "Yoshinoya Shinjuku", dk: "일본의 대표적인 대중적 쇠고기 덮밥 규동 전문점", de: "Quick and classic Japanese beef bowl restaurant chain" },
      { ko: "스키야 시부야", en: "Sukiya Shibuya", dk: "다양한 토핑의 치즈 규동과 덮밥을 즐길 수 있는 대중 식당", de: "Popular quick-service chain famous for cheese beef bowls" },
      { ko: "긴자 카가리", en: "Ginza Kagari", dk: "크림수프처럼 고소하고 진한 닭 백탕 토리소바 라멘 맛집", de: "Renowned ramen eatery serving creamy chicken broth noodles" }
    ],
    dinner: [
      { ko: "신주쿠 오모이데 요코초", en: "Shinjuku Omoide Yokocho", dk: "좁은 골목길 노포에서 사케와 숯불 꼬치구이를 즐기는 저녁", de: "Retro alleyway izakayas serving charcoal yakitori and draft beer" },
      { ko: "아사쿠사 이마한 스키야키", en: "Asakusa Imahan", dk: "100년 넘는 역사 속 최상급 와규 스키야키 전문점", de: "Legendary restaurant serving premium wagyu beef Sukiyaki since 1895" },
      { ko: "롯폰기 곤파치", en: "Roppongi Gonpachi", dk: "영화 킬빌의 배경이 된 웅장한 목조 인테리어 이자카야", de: "Iconic wooden izakaya that inspired the famous movie Kill Bill" },
      { ko: "뉴욕 그릴 파크 하얏트", en: "New York Grill Park Hyatt", dk: "도쿄의 빌딩 야경을 감상하며 즐기는 파인다이닝 스테이크", de: "Upscale dining on the 52nd floor with stunning Tokyo night views" },
      { ko: "야키니쿠 고급 와규 지로", en: "Yakiniku premium Wagyu Jiro", dk: "A5 등급 와규를 숯불 석쇠에 구워 먹는 프리미엄 야키니쿠", de: "Premium A5 wagyu charcoal-grill dining experience" },
      { ko: "긴자 가이세키 요시타케", en: "Ginza Kaiseki Yoshitake", dk: "전통 가이세키 예술을 보여주는 미쉐린 스타 일식당", de: "Exquisite Michelin-starred multi-course kaiseki dining" },
      { ko: "에비스 야키토리 하치베", en: "Ebisu Yakitori Hachibei", dk: "에비스 맥주와 페어링하기 좋은 깔끔한 숯불 꼬치 전문점", de: "Stylish yakitori bistro serving charcoal-grilled skewers" },
      { ko: "롯폰기 로바타야", en: "Roppongi Robataya", dk: "신선한 재료를 손님이 고르면 화로에 직접 구워주는 식당", de: "Traditional hearthside grill served on long wooden paddles" },
      { ko: "스시 요시타케", en: "Sushi Yoshitake", dk: "장인의 정교한 기술로 쥐어내는 최고급 오마카세 스시", de: "Masterfully crafted premium omakase sushi course dinner" },
      { ko: "닌교초 이마한 스키야키", en: "Ningyocho Imahan", dk: "대대로 내려오는 비법 소스로 조리하는 스키야키 명가", de: "Renowned historic dining house famous for wagyu shabu-shabu" }
    ],
    coffee: [
      { ko: "오니버스 커피 나카메구로", en: "Onibus Coffee Nakameguro", dk: "철길 옆 오래된 주택가 감성의 플랫화이트 전문 카페", de: "Charming neighborhood cafe serving specialty coffee next to the train tracks" },
      { ko: "푸글렌 도쿄 시부야", en: "Fuglen Tokyo", dk: "노르웨이 오슬로에서 온 북유럽 빈티지 인테리어 에스프레소 바", de: "Oslo-born vintage cafe serving light-roast coffee and craft cocktails" },
      { ko: "블루보틀 키요스미 로스터리", en: "Blue Bottle Kiyosumi", dk: "도쿄에 첫 발을 내딛은 대형 통창의 블루보틀 1호점", de: "The first Blue Bottle roastery cafe in Tokyo, featuring airy glass walls" },
      { ko: "카페 드 람브르 긴자", en: "Cafe de L'Ambre", dk: "1948년부터 오직 커피만을 연구해 온 긴자의 노포 커피 전문점", de: "Historic Kissaten coffee shop serving aged coffee beans since 1948" },
      { ko: "사루타히코 커피 에비스", en: "Sarutahiko Coffee Ebisu", dk: "아기자기한 머그잔에 담아주는 도쿄 로컬 드립 커피 브랜드", de: "Popular local specialty coffee brand born in Ebisu district" },
      { ko: "스트리머 커피 컴퍼니 시부야", en: "Streamer Coffee Company", dk: "라떼아트 챔피언이 운영하는 진하고 부드러운 라떼 맛집", de: "Famous cafe known for its world-class latte art and creamy beverages" },
      { ko: "아오야마 플라워 마켓 티하우스", en: "Aoyama Flower Market Tea House", dk: "온실 속에 들어온 듯 꽃과 허브티를 즐기는 힐링 공간", de: "Botanical tea house surrounded by fresh seasonal flowers and herbs" },
      { ko: "글리치 커피 로스터스 진보초", en: "Glitch Coffee Roasters", dk: "원두 고유의 산미를 극한으로 살리는 라이트 로스팅 성지", de: "Light-roast coffee paradise focusing on single-origin pour-overs" },
      { ko: "토라야 앙 카페 아오야마", en: "Toraya An Cafe", dk: "전통 단팥 페이스트를 현대적으로 해석한 말차 디저트 카페", de: "Modern cafe specializing in traditional sweet red bean paste and matcha" },
      { ko: "도쿄 차 키사 코소안", en: "Kosoan Jiyugaoka", dk: "자유가오카 조용한 정원 한옥에서 즐기는 전통 맛차와 디저트", de: "Tranquil traditional Japanese wooden house serving matcha in Jiyugaoka" }
    ]
  },
  osaka: {
    lunch: [
      { ko: "도톤보리 킨류라멘", en: "Dotonbori Kinryu Ramen", dk: "용 조각 간판 아래에서 24시간 즐기는 구수한 돈코츠 라멘", de: "Iconic 24-hour pork broth ramen shop under the giant dragon sign" },
      { ko: "구로몬 시장 산페이 수산", en: "Kuromon Sanpei Suisan", dk: "원하는 횟감을 즉석에서 골라 즐기는 스시와 해산물 덮밥", de: "Fresh sashimi and sea urchin rice bowls selected right at the market stall" },
      { ko: "신세카이 쿠시카츠 다루마", en: "Kushikatsu Daruma", dk: "바삭하게 튀겨 소스에 딱 한 번만 찍어 먹는 꼬치 튀김의 원조", de: "The pioneer of crispy deep-fried skewers in Shinsekai district" },
      { ko: "난바 오코노미야키 치보", en: "Namba Chibo Okonomiyaki", dk: "눈앞의 철판에서 화려하게 만들어주는 오사카 대표 오코노미야키", de: "Famous teppanyaki restaurant serving savory cabbage pancakes" },
      { ko: "한큐 삼번가 이카야키", en: "Hankyu Ikayaki", dk: "짭조름하고 쫄깃한 오사카식 정통 오징어 부침개 런치", de: "Local favorite chewy squid pancake in Umeda underground mall" },
      { ko: "미즈노 오코노미야키", ko: "Mizuno Okonomiyaki", dk: "마를 갈아 넣어 촉촉하고 부드러운 도톤보리 미쉐린 텐동", de: "Michelin-rated okonomiyaki shop operating for three generations" },
      { ko: "카메스시 총본점", en: "Kame Sushi", dk: "우메다 골목길에 위치한 도톰하고 싱싱한 가성비 초밥 노포", de: "Long-standing popular sushi restaurant famous for thick fresh cuts" },
      { ko: "요시노야 우메다역점", en: "Yoshinoya Umeda", dk: "바쁜 여행자들을 위한 빠르고 담백한 정통 소고기 규동", de: "Quick and convenient traditional Japanese beef bowl diner" },
      { ko: "하나마루 우동 난바점", en: "Hanamaru Udon", dk: "쫄깃한 면발과 다양한 튀김 토핑의 셀프 사누키 우동 전문점", de: "Self-service Sanuki udon shop with various tempura toppings" },
      { ko: "치보 테라스 도톤보리", en: "Chibo Terrace", dk: "도톤보리 강변을 바라보며 야외에서 먹는 야키소바와 오코노미야키", de: "Canal-view dining serving hot plates of yakisoba and okonomiyaki" }
    ],
    dinner: [
      { ko: "도톤보리 카니도라쿠", en: "Kani Doraku Dotonbori", dk: "움직이는 대형 게 간판 아래서 즐기는 품격 있는 게 코스 요리", de: "Elegant multi-course crab dinner at the iconic moving crab sign" },
      { ko: "신사이바시 와규 하치", en: "Shinsaibashi Yakiniku Hachi", dk: "개인 미니 석쇠에 최상급 와규를 부위별로 구워 먹는 야키니쿠", de: "Premium wagyu yakiniku grilled over hot coals in Shinsaibashi" },
      { ko: "키타무라 스키야키", en: "Kitamura Sukiyaki", dk: "1881년부터 이어져 온 정통 관서식 설탕 간장 와규 스키야키", de: "Michelin-starred Kansai-style sweet soy sauce Sukiyaki since 1881" },
      { ko: "아부리야 와규 뷔페", en: "Aburiya Wagyu Buffet", dk: "고품질 와규와 다양한 사이드 메뉴를 무제한으로 즐기는 저녁", de: "All-you-can-eat high-quality wagyu barbecue restaurant in Umeda" },
      { ko: "나카노시마 리스토란테 오로라", en: "Nakanoshima Italian Aurora", dk: "나카노시마 강변 야경을 바라보며 즐기는 로맨틱 이탈리안 코스", de: "Fine Italian dining set along the scenic Nakanoshima River" },
      { ko: "덴포잔 시푸드 마켓 이자카야", en: "Tempozan Seafood Izakaya", dk: "항구의 신선한 횟감과 모둠 조개구이에 사케 한 잔", de: "Harbor-side seafood izakaya serving sashimi platters and grilled clams" },
      { ko: "타요시 이자카야 난바", en: "Tayoshi Izakaya Namba", dk: "오사카 서민적인 분위기의 꼬치구이와 맥주가 가득한 선술집", de: "Classic local pub serving cold beer, yakitori, and side dishes" },
      { ko: "규카츠 타케루 센니치마에", en: "Gyukatsu Takeru", dk: "육즙이 살아있는 부드러운 소고기 카츠와 특제 양념장 저녁", de: "Juicy deep-fried beef cutlet sets with specialty seasoning" },
      { ko: "야키토리 아키요시 우메다", en: "Yakitori Akiyoshi", dk: "석쇠 화로에서 구워내는 닭꼬치를 따뜻한 철판 위에 서빙하는 곳", de: "Charcoal yakitori served on a heated counter plate to keep warm" },
      { ko: "라시메 레스토랑", en: "La Cime Restaurant", dk: "현대 프랑스 미식과 일본 식재료의 융합 (미쉐린 2스타)", de: "Acclaimed creative French dining by Chef Yusuke Takada (2 Stars)" }
    ],
    coffee: [
      { ko: "브루클린 로스팅 컴퍼니 키타하마", en: "Brooklyn Roasting Company", dk: "나카노시마 강변 테라스에서 즐기는 진한 카푸치노와 베이커리", de: "Waterside terrace cafe serving Brooklyn-style specialty coffee" },
      { ko: "모토 커피 키타하마", en: "Moto Coffee", dk: "강바람을 맞으며 맛있는 라떼와 치즈케이크를 먹는 강변 카페", de: "Cozy riverside cafe famous for beautiful views and rich cheesecakes" },
      { ko: "리로 커피 로스터스 아메리카무라", en: "LiLo Coffee Roasters", dk: "원두 카드를 선택하여 나만의 개성 있는 드립 커피를 맛보는 카페", de: "Tiny specialty coffee shop offering customized single-origin beans" },
      { ko: "얏 나카자키쵸", en: "Yatt Nakazakicho", dk: "빈티지 골목길 카페거리 속 아늑한 원목 인테리어 디저트 카페", de: "Cozy wooden cafe in the retro Nakazakicho alleyway district" },
      { ko: "닐 나카자키쵸", en: "Neel Nakazakicho", dk: "유럽풍 주택 외관에 수제 푸딩과 크레페가 유명한 힐링 카페", de: "European-style cottage cafe famous for handmade pudding and crepes" },
      { ko: "아오마 커피", en: "Aoma Coffee", dk: "지속가능한 원두 수확을 지향하는 친절한 동네 스페셜티 커피숍", de: "Friendly local cafe focusing on sustainable beans and micro-roasting" },
      { ko: "마루후쿠 커피점 센니치마에 본점", en: "Marufuku Coffee", dk: "1934년 창업해 짙고 묵직한 정통 일본식 융드립 커피의 명가", de: "Historic Kissaten serving strong copper-filtered drip coffee since 1934" },
      { ko: "카페 가브리엘 우메다", en: "Cafe Gabriel", dk: "조용한 골목길 핸드드립 전문 다방 스타일 카페", de: "Quiet alleyway hand-drip coffee saloon with vintage music" },
      { ko: "스트리머 커피 컴퍼니 신사이바시", en: "Streamer Coffee Osaka", dk: "넓은 창으로 바깥 풍경을 보며 마시는 대용량 시그니처 스트리머 라떼", de: "Modern industrial cafe famous for giant cups of Streamer Latte" },
      { ko: "타블로 코프 카페", en: "Tablo Cafe", dk: "신선한 과일 타르트와 파르페가 맛있는 디저트 전문점", de: "Charming dessert parlor serving beautiful fresh fruit tarts and parfaits" }
    ]
  },
  paris: {
    lunch: [
      { ko: "르 프로코프", en: "Le Procope", dk: "1686년 개업하여 나폴레옹도 즐겨 찾았던 파리에서 가장 오래된 카페 레스토랑", de: "The oldest continuously operating cafe restaurant in Paris, since 1686" },
      { ko: "라스 뒤 팔라펠", en: "L'As du Fallafel", dk: "마레 지구에서 매일 줄 서서 먹는 세계적인 정통 중동식 팔라펠 맛집", de: "Legendary and bustling falafel pocket wrap shop in Le Marais district" },
      { ko: "부이용 샤르티에", en: "Bouillon Chartier", dk: "19세기 벨에포크 인테리어 속 가성비 좋은 프랑스 전통 서민 식당", de: "Historic low-cost traditional French brasserie open since 1896" },
      { ko: "브레이즈 카페", en: "Breizh Cafe", dk: "신선한 메밀 갈레트와 프랑스 전통 시드르(사과주) 전문 크레페리", de: "Renowned creperie serving organic buckwheat galettes and apple cider" },
      { ko: "르 콩투아르 뒤 를레", en: "Le Comptoir du Relais", dk: "생제르맹 지구에서 유명한 셰프의 고품격 캐주얼 프렌치 비스트로", de: "Famous French bistro serving classic country cuisine in Saint-Germain" },
      { ko: "라방 콩투아르", en: "L'Avant Comptoir", dk: "서서 간단히 와인과 고품격 프렌치 타파스를 즐기는 바", de: "Trendy standing-only bar serving French charcuterie and tapas" },
      { ko: "셰 글라딘", en: "Chez Gladines", dk: "바스크 지방의 푸짐하고 맛깔스러운 오리 요리와 샐러드 맛집", de: "Popular hearty Basque restaurant famous for duck confit and salads" },
      { ko: "안젤리나 파리", en: "Angelina Paris", dk: "튈르리 정원 앞 유서 깊은 프랑스 살롱의 달콤한 핫초콜릿과 디저트 런치", de: "Belle Epoque tearoom famous for L'Africain hot chocolate and Mont-Blanc" },
      { ko: "카페 데 두 마고", en: "Cafe des Deux Magots", dk: "헤밍웨이와 사르트르가 글을 쓰던 역사적인 생제르맹 광장의 카페 식당", de: "Legendary historic cafe once frequented by Hemingway and Sartre" },
      { ko: "카페 드 플로르", en: "Cafe de Flore", dk: "파리의 지성과 예술이 탄생한 유서 깊은 노천 카페 런치", de: "Iconic cafe serving classic French club sandwiches and coffee" }
    ],
    dinner: [
      { ko: "르 쥘 베른", en: "Le Jules Verne", dk: "에펠탑 2층 전망에서 파리 시내 야경과 함께하는 미쉐린 프렌치 파인다이닝", de: "Michelin-starred dining inside the Eiffel Tower with panoramic city views" },
      { ko: "라 튀르 달장", en: "La Tour d'Argent", dk: "센강과 노트르담 대성당을 내려다보며 즐기는 역사적인 오리 요리 전문점", de: "Historic luxury restaurant overlooking the Seine, famous for pressed duck" },
      { ko: "브누아 파리", en: "Benoit Paris", dk: "알랭 뒤카스 그룹이 운영하는 미쉐린 1스타 정통 파리지앵 비스트로", de: "Michelin-starred traditional Parisian bistro operating since 1912" },
      { ko: "르 트랭 블뢰", en: "Le Train Bleu", dk: "리옹역 내부에 위치한 베르사유 궁전을 연상케 하는 웅장한 궁전 레스토랑", de: "Breathtaking restaurant inside Gare de Lyon with opulent gold murals" },
      { ko: "셉팀", en: "Septime", dk: "예약하기 매우 어려운 파리의 트렌디한 네오 비스트로 파인다이닝", de: "Highly acclaimed progressive French dining with farm-to-table focus" },
      { ko: "프렌치", en: "Frenchie", dk: "골목길 감성 속 세련된 영국식 프렌치 퓨전 테이스팅 코스 저녁", de: "Michelin-starred tiny alleyway restaurant serving modern creative dishes" },
      { ko: "람브루아지", en: "L'Ambroisie", dk: "보주 광장 한구석에 위치한 클래식 프랑스 파인다이닝의 정점 (미쉐린 3스타)", de: "Exquisite classic French haute cuisine set in a historic townhouse" },
      { ko: "기 사부아", en: "Guy Savoy", dk: "예술적인 프렌치 요리와 품격 있는 서비스의 세계 최고 수준 파인다이닝", de: "Legendary multi-course French dining by master chef Guy Savoy" },
      { ko: "라 쿠폴 브라스리", en: "La Coupole Montparnasse", dk: "1920년대 아티스트들이 모이던 몽파르나스의 상징적인 해산물 뷔페 브라스리", de: "Famous Art Deco brasserie known for raw seafood platters since 1927" },
      { ko: "알라르 레스토랑", en: "Allard", dk: "생제르맹 지구에서 대대로 비법 조리법을 지켜온 정통 가정식 프랑스 식당", de: "Classic bistro serving heritage dishes like duck with olives" }
    ],
    coffee: [
      { ko: "카페 드 플로르", en: "Cafe de Flore", dk: "생제르맹데프레의 유서 깊은 녹색 차양 아래 야외 테이블 카페", de: "Iconic cafe serving classic French coffee and hot chocolate since 1887" },
      { ko: "카페 des 두 마고", en: "Cafe des Deux Magots", dk: "두 개의 중국 목조 인형이 반겨주는 파리 예술의 발상지 카페", de: "Historic coffee house offering elegant pastries and café au lait" },
      { ko: "쿠튀메 카페", en: "Coutume Cafe", dk: "파리 7구의 선구적인 현대식 스페셜티 커피 브런치 카페", de: "Specialty coffee pioneer in Paris serving excellent flat whites" },
      { ko: "KB 커피 로스터스", en: "KB Coffee Roasters", dk: "몽마르뜨 언덕 아래 활기찬 노천 테라스에서 마시는 직접 로스팅한 스페셜티 커피", de: "Montmartre-area roastery cafe with a bustling outdoor terrace" },
      { ko: "부트 카페", en: "Boot Cafe", dk: "마레 지구 오래된 구두 수선소 외관을 보존한 파리의 가장 작은 카페", de: "The smallest cafe in Paris, housed in a charming old shoe repair shop" },
      { ko: "카페 오베르캄프", en: "Cafe Oberkampf", dk: "힙한 오베르캄프 골목길에서 즐기는 아보카도 토스트와 플랫화이트 맛집", de: "Trendy cafe famous for great brunch dishes and specialty coffee" },
      { ko: "프래그먼츠 파리", en: "Fragments Paris", dk: "마레 지구 뒷골목에 숨어있는 조용하고 묵직한 에스프레소 바", de: "Hidden Marais district cafe serving artisanal coffee and fresh cinnamon rolls" },
      { ko: "텐 벨즈", en: "Ten Belles", dk: "생마르탱 운하 옆 테이크아웃해서 운하를 보며 마시기 좋은 스페셜티 카페", de: "Canal Saint-Martin area coffee shop famous for sourdough bakery" },
      { ko: "홀리벨리 5", en: "Holybelly 5", dk: "파리에서 줄 서서 먹는 대기 줄이 끊이지 않는 호주식 브런치 카페", de: "Highly popular Melbourne-style brunch cafe famous for pancakes and eggs" },
      { ko: "텔레스코프 카페", en: "Telescope Cafe", dk: "루브르 박물관 인근의 미니멀하고 클래식한 드립 커피 전문 찻집", de: "Minimalist coffee shop focusing on pure filter coffee extraction near Louvre" }
    ]
  },
  london: {
    lunch: [
      { ko: "버로우 마켓 스트리트 푸드", en: "Borough Market Street Food", dk: "천년 역사의 런던 대표 마켓에서 맛보는 갓 만든 글로벌 스트리트 푸드", de: "Lively street food stalls serving global eats in London's oldest market" },
      { ko: "플랫 아이언", en: "Flat Iron Covent Garden", dk: "가성비 좋은 도끼 칼 소고기 스테이크와 고소한 시금치 샐러드 런치", de: "Affordable and delicious flat iron steak served with signature cleaver" },
      { ko: "디슘 킹스크로스", en: "Dishoom King's Cross", dk: "영국 런던에서 줄 서서 먹는 봄베이 감성의 인도식 블랙 달 커리와 난 브런치", de: "Highly popular Irani-Bombay style cafe serving legendary curry and naans" },
      { ko: "더 처칠 암즈", en: "The Churchill Arms", dk: "꽃으로 둘러싸인 노팅힐 명소 펍에서 즐기는 정통 영국 맥주와 태국 요리 점심", de: "Historic flower-covered pub in Kensington serving authentic Thai dishes" },
      { ko: "포피스 피시 앤 칩스", en: "Poppies Fish & Chips", dk: "레트로 1950년대 분위기 속 바삭하고 도톰한 전통 영국 피시앤칩스", de: "Award-winning traditional cod fish and chips in retro Shoreditch/Spitalfields" },
      { ko: "홉스무어", en: "Hawksmoor Seven Dials", dk: "코벤트 가든 지하 동굴 같은 아늑한 공간의 정통 영국 스테이크 하우스 런치", de: "Acclaimed steakhouse serving charcoal-grilled dry-aged British beef" },
      { ko: "타야브스", en: "Tayyabs", dk: "동런던 화이트채플의 인도/파키스탄 양갈비 탄두리 구이 전문 대중 식당", de: "Bustling, legendary Punjabi restaurant famous for sizzling lamb chops" },
      { ko: "파델라", en: "Padella Borough Market", dk: "버로우 마켓 입구의 생면 파스타 즉석 요리 웨이팅 맛집", de: "Highly rated counter-serve bar serving freshly rolled handmade pasta" },
      { ko: "덕 앤 와플", en: "Duck & Waffle", dk: "38층 고층 빌딩에서 런던 전망을 보며 먹는 바삭한 오리다리 와플 런치", de: "24-hour restaurant on the 38th floor serving crispy duck leg on waffle" },
      { ko: "룰스 레스토랑", en: "Rules Restaurant", dk: "1798년 개업한 런던에서 가장 오래된 전통 영국 정통 사냥 요리 식당", de: "London's oldest restaurant, serving traditional British game and pies" }
    ],
    dinner: [
      { ko: "더 샤드 전망 레스토랑", en: "The Shard Oblix", dk: "유럽 최고층 빌딩 더 샤드에서 야경과 함께하는 프리미엄 그릴 저녁", de: "Premium dining overlooking London skyline from the iconic Shard building" },
      { ko: "스케치 갤러리", en: "Sketch Gallery", dk: "핑크빛 인테리어와 예술적인 프랑스 요리가 융합된 런던 최고의 핫플레이스", de: "Sophisticated art-gallery dining room serving creative French dishes" },
      { ko: "더 레드버리", en: "The Ledbury", dk: "노팅힐에 위치한 혁신적인 제철 터치 코스 요리의 미쉐린 3스타 파인다이닝", de: "Exquisite three-Michelin-starred modern British dining in Notting Hill" },
      { ko: "디너 바이 헤스턴 블루멘탈", en: "Dinner by Heston Blumenthal", dk: "영국 역사적 요리책의 조리법을 현대적으로 재현한 미쉐린 스타 디너", de: "Innovative historic British gastronomy by master chef Heston Blumenthal" },
      { ko: "더 울슬리", en: "The Wolseley", dk: "피카딜리 광장 유서 깊은 자동차 전시장을 개조한 품격 있는 그랜드 유럽 브라스리", de: "Grand European brasserie serving premium steaks and classic dinners" },
      { ko: "코어 바이 클레어 스미스", en: "Core by Clare Smyth", dk: "여성 셰프 최초로 미쉐린 3스타를 획득한 정교하고 현대적인 영국식 파인다이닝", de: "Masterfully crafted modern British fine dining in Notting Hill" },
      { ko: "클로 마조르", en: "Clos Maggiore", dk: "천장이 꽃으로 뒤덮인 로맨틱한 분위기의 코벤트가든 프랑스 요리 와인 디너", de: "Voted London's most romantic restaurant, featuring a flower-lined glass room" },
      { ko: "짐카나", en: "Gymkhana", dk: "영국 식민지 시절 인도 사교 클럽 컨셉의 프리미엄 탄두리 와인 다이닝", de: "Michelin-starred Indian restaurant famous for wild game and tandoori grills" },
      { ko: "세인트 존", en: "St. John Restaurant", dk: "영국 전통 고기 부위를 머리부터 발끝까지 요리하는 노즈투테일 요리 개척지", de: "Pioneering Michelin-starred restaurant serving nose-to-tail British dining" },
      { ko: "고든 램지 로열 호스피탈 로드", en: "Restaurant Gordon Ramsay", dk: "스타 셰프 고든 램지의 미쉐린 3스타 프렌치 정통 파인다이닝 본점", de: "Gordon Ramsay's flagship three-Michelin-starred French restaurant in Chelsea" }
    ],
    coffee: [
      { ko: "몬머스 커피 컴퍼니 코벤트가든", en: "Monmouth Coffee Company", dk: "런던 스페셜티 커피의 발상지이자 드립 필터 커피와 올드 빈티지 분위기", de: "Pioneer of London's specialty coffee scene serving excellent filter drip" },
      { ko: "워크숍 커피 피츠로비아", en: "Workshop Coffee", dk: "깔끔하고 세련된 매장에서 추출하는 고품질 싱글 오리진 라떼 에스프레소", de: "Sleek coffee bar focusing on sweet, clean, and acidic single-origin roasts" },
      { ko: "캐러밴 킹스크로스", en: "Caravan King's Cross", dk: "오래된 곡물 창고를 개조해 원두를 직접 볶는 런던 대표 브런치 로스터리", de: "Renovated grain store roastery cafe serving excellent brunch and coffee" },
      { ko: "오존 커피 로스터스 쇼디치", en: "Ozone Coffee Roasters Shoreditch", dk: "힙스터들의 성지 쇼디치에 위치한 넓은 지하 지하창고 로스터리 에스프레소", de: "Industrial Shoreditch roastery cafe known for outstanding cold brews" },
      { ko: "프루프록 커피", en: "Prufrock Coffee", dk: "런던 에스프레소 추출 기술 교육을 주도하는 바리스타들의 성지 커피숍", de: "World-class baristas' hub serving rotating guest coffees in Clerkenwell" },
      { ko: "오리진 커피 로스터스 샬럿 로드", en: "Origin Coffee Roasters", dk: "동런던의 미니멀한 공간에서 만나는 친환경 다이렉트 트레이드 스페셜티", de: "Minimalist cafe serving direct-trade single-origin filter coffees" },
      { ko: "카페인 피츠로비아", en: "Kaffeine", dk: "호주와 뉴질랜드 스타일의 정교한 플랫화이트와 스퀘어 베이커리 델리", de: "Leading Australian-style espresso bar offering rich flat whites" },
      { ko: "모노클 카페 메릴본", en: "Monocle Cafe", dk: "모노클 매거진이 운영하는 미니멀하고 단정한 일본풍 커피 디저트 카페", de: "Stylish boutique cafe operated by Monocle Magazine in Marylebone" },
      { ko: "페기 포션 벨그라비아", en: "Peggy Porschen Belgravia", dk: "꽃 장식 외벽과 핑크 파스텔톤의 인스타 감성 컵케이크 디저트 찻집", de: "Highly photogenic pastel-pink bakery cafe famous for beautiful cakes" },
      { ko: "세인트 에임스", en: "Saint Aymes", dk: "보라색 글리시니아 꽃잎 벽이 돋보이는 유니크 럭셔리 라떼 아발론 카페", de: "Beautiful floral cafe serving gold-leaf hot chocolates and creative lattes" }
    ]
  },
  newyork: {
    lunch: [
      { ko: "카츠 델리카트슨", en: "Katz's Delicatessen", dk: "1888년 개업하여 영화에도 등장한 뉴욕 전설의 촉촉한 파스트라미 샌드위치", de: "Legendary Lower East Side deli serving massive hot pastrami sandwiches since 1888" },
      { ko: "조스 피자 타임스퀘어", en: "Joe's Pizza Times Square", dk: "스파이더맨 피자로 알려진 얇고 바삭한 접어 먹는 정통 뉴욕식 조각 피자", de: "Classic Manhattan street slice pizza shop loved by celebrities" },
      { ko: "첼시마켓 랍스터 플레이스", en: "Chelsea Market Lobster Place", dk: "첼시 마켓의 활기찬 해산물 코너에서 맛보는 통 랍스터 찜과 클램차우더 스프", de: "Freshly steamed whole lobsters and seafood rolls inside Chelsea Market" },
      { ko: "쉐이크쉑 매디슨 스퀘어 파크", en: "Shake Shack Madison Square", dk: "울창한 공원 속 야외 테이블에서 즐기는 쉐이크쉑 수제 버거 1호점 본점", de: "The original outdoor burger stand in the heart of Madison Square Park" },
      { ko: "시안 페이머스 푸드", en: "Xi'an Famous Foods", dk: "맨해튼에서 유명한 매콤하고 얼얼한 중국 서안식 수제 양고기 뱡뱡면 국수", de: "Popular local chain serving spicy hand-pulled Liangpi noodles" },
      { ko: "코너 비스트로", en: "Corner Bistro", dk: "그리니치 빌리지 오래된 선술집 분위기에서 즐기는 묵직한 오리지널 수제 버거", de: "Classic West Village tavern serving legendary thick-cut cheeseburgers" },
      { ko: "에스어베이글", en: "Ess-a-Bagel", dk: "겉은 바삭하고 속은 쫄깃한 뉴욕 베스트 연어 크림치즈 베이글 전문점", de: "Iconic New York bagel shop famous for loaded lox and cream cheese" },
      { ko: "그레이스 파파야", en: "Gray's Papaya", dk: "가성비 좋은 뉴욕식 정통 그릴드 핫도그와 상큼한 파파야 주스 런치", de: "Historic cheap eats hot dog stand on the Upper West Side" },
      { ko: "로버타스 피자", en: "Roberta's Bushwick", dk: "브루클린 빈티지 분위기 속 화덕에서 구워내는 뉴욕 스타일 나폴리 피자", de: "Hip Brooklyn warehouse pizzeria serving artisanal wood-fired pies" },
      { ko: "발타자르", en: "Balthazar", dk: "소호 중심가에서 프랑스 파리 분위기를 그대로 재현한 정통 프렌치 브라스리 런치", de: "Bustling French brasserie in SoHo famous for steak frites and seafood" }
    ],
    dinner: [
      { ko: "피터 루거 스테이크하우스", en: "Peter Luger Steak House", dk: "130년 넘는 역사와 전통의 브루클린 드라이에이징 포터하우스 티본 스테이크", de: "World-famous dry-aged porterhouse steaks in Brooklyn since 1887" },
      { ko: "일레븐 매디슨 파크", en: "Eleven Madison Park", dk: "세계 최고 레스토랑 1위를 기록한 미쉐린 3스타 현대식 비건 다이닝 저녁", de: "Three-Michelin-starred plant-based fine dining overlooking Madison Park" },
      { ko: "르 베르나르댕", en: "Le Bernardin", dk: "에릭 리페르 셰프의 세계 최고 수준 해산물 전용 프랑스식 파인다이닝", de: "Elite French seafood fine dining holding three Michelin Stars since 1986" },
      { ko: "그래머시 테이번", en: "Gramercy Tavern", dk: "뉴욕의 따뜻하고 편안한 분위기 속 고품격 아메리칸 타번 테이스팅 디너", de: "Beloved flatiron institution serving contemporary American wood-fired dining" },
      { ko: "카본 레스토랑", en: "Carbone", dk: "그리니치 빌리지에 위치한 1950년대 스타일의 예약 곤란 정통 이탈리안 디너", de: "Highly popular mid-century style Italian restaurant famous for spicy rigatoni" },
      { ko: "미네타 타번", en: "Minetta Tavern", dk: "그리니치 빌리지의 빈티지 비스트로에서 맛보는 드라이에이징 블랙라벨 수제 버거", de: "Historic tavern serving the legendary prime dry-aged Black Label Burger" },
      { ko: "킨스 스테이크하우스", en: "Keens Steakhouse", dk: "1885년 개업하여 천장에 수천 개의 곰방대가 걸려 있는 정통 머튼 찹 갈비", de: "Historic midtown steakhouse famous for its legendary mutton chops" },
      { ko: "블루 힐 뉴욕", en: "Blue Hill New York", dk: "그리니치 빌리지 지하 아늑한 공간의 친환경 유기농 팜투테이블 파인다이닝", de: "Exquisite farm-to-table dining showcasing local Hudson Valley ingredients" },
      { ko: "장 조지 레스토랑", en: "Jean-Georges", dk: "센트럴파크 입구 프렌치와 아시안 스타일의 미쉐린 스타 파인다이닝", de: "Acclaimed French fine dining featuring Asian seasonings by Jean-Georges" },
      { ko: "퍼 세 레스토랑", en: "Per Se", dk: "토마스 켈러 셰프의 타임워너 센터 9코스 프렌치 파인다이닝 (미쉐린 3스타)", de: "Thomas Keller's spectacular French fine dining overlooking Columbus Circle" }
    ],
    coffee: [
      { ko: "블루보틀 커피 브라이언트 파크", en: "Blue Bottle Coffee", dk: "브라이언트 파크를 걸으며 즐기는 깔끔하고 섬세한 드립 커피", de: "Minimalist coffee shop offering fresh pour-overs near Bryant Park" },
      { ko: "스텀프타운 커피 에이스호텔점", en: "Stumptown Coffee Roasters", dk: "에이스호텔 로비의 힙한 감성과 포틀랜드 발 스페셜티 니트로 콜드브루", de: "Hip lobby cafe serving rich cold brew and robust espresso blends" },
      { ko: "라 콜롬브 토레팩시온 노호", en: "La Colombe Torrefaction", dk: "부드럽고 묵직한 캔 드래프트 라떼로 유명한 필라델피아 발 커피숍", de: "Trendy cafe famous for its draft cold-brew lattes on tap" },
      { ko: "버치 커피 미드타운", en: "Birch Coffee", dk: "뉴욕 도심의 아늑한 나무 도서관 분위기 속 친근한 로컬 드립 커피숍", de: "Cozy local coffee shop serving fresh roasts with a book-exchange shelf" },
      { ko: "데보시온 커피 플랫아이언", en: "Devocion Coffee", dk: "콜롬비아에서 항공 직송한 생두를 볶는 대형 실내 식물원 테마 로스터리", de: "Stunning industrial cafe with vertical plant walls serving fresh Colombian beans" },
      { ko: "컬처 에스프레소 미드타운", en: "Culture Espresso", dk: "뉴욕 미드타운에서 가장 맛있는 초코칩 쿠키와 에스프레소 마끼아또 맛집", de: "Trendy midtown cafe famous for warm chocolate chip cookies and flat whites" },
      { ko: "아브람스 카페 센트럴파크", en: "Abram's Cafe", dk: "센트럴파크 내 호숫가 보트 선착장 옆 평화로운 야외 테라스 테이크아웃 카페", de: "Scenic outdoor cafe stall located inside Central Park next to the lake" },
      { ko: "카페 그럼피 그린포인트", en: "Cafe Grumpy", dk: "브루클린 그린포인트 주택가 골목길의 인더스트리얼 감성 로컬 커피숍", de: "Famous independent Brooklyn roastery cafe with cozy local vibes" },
      { ko: "서드 레일 커피 그리니치 빌리지", en: "Third Rail Coffee", dk: "뉴욕대 근처의 아주 작지만 커피 애호가들이 숨겨두고 찾는 에스프레소 바", de: "Tiny but highly regarded espresso bar serving rotating guest roasters" },
      { ko: "에브리맨 에스프레소 이스트빌리지", en: "Everyman Espresso", dk: "클래식 극장 로비를 개조한 세련된 에스프레소 토닉 전문 로컬 카페", de: "Sleek coffee shop serving creative espresso tonics and pastries" }
    ]
  },
  barcelona: {
    lunch: [
      { ko: "바 카녜테", en: "Bar Canete", dk: "엘 라발 지구 바 테이블에서 맛보는 고품격 스페인 정통 타파스 런치", de: "Renowned traditional Spanish tapas bar with lively counter seating" },
      { ko: "보데가 라 뿐뚜알", en: "Bodega La Puntual", dk: "엘 본 지구의 유서 깊은 건물에서 즐기는 하몬과 크로케타, 레드 와인 점심", de: "Classic tapas bar in El Born serving premium jamon and wine" },
      { ko: "엘 킴 뒤 라 보케리아", en: "El Quim de la Boqueria", dk: "보케리아 시장 한복판 철판 위에서 요리하는 계란 프라이 꼴뚜기 타파스", de: "Famous market stall cooking baby squids with fried eggs" },
      { ko: "시우다드 콘달", en: "Ciudad Condal", dk: "카탈루냐 광장 인근 꿀대구와 해산물 타파스로 가장 유명한 웨이팅 맛집", de: "Highly popular tapas restaurant famous for honey cod and seafood skewers" },
      { ko: "세르베세리아 카탈라나", en: "Cerveceria Catalana", dk: "그라시아 거리 인근에서 정갈한 핀초스와 타파스를 맥주와 즐기는 런치", de: "Renowned tapas bar serving excellent montaditos and cold beer" },
      { ko: "타파스 24", en: "Tapas 24", dk: "미쉐린 스타 셰프 카를레스 아벨란의 트렌디한 현대식 타파스 바 점심", de: "Modern gourmet twist on classic tapas by Chef Carles Abellan" },
      { ko: "칼 뻽", en: "Cal Pep", dk: "엘 본 지구에서 그날 가장 신선한 해산물로 셰프가 즉흥 추천하는 타파스", de: "Legendary seafood tapas bar serving custom daily catches" },
      { ko: "칸 파이샤노", en: "Can Paixano", dk: "바르셀로네타 항구 골목길 가성비 좋은 스파클링 까바 와인과 샌드위치 런치", de: "Nostalgic local tavern famous for cheap sparkling cava and hot sandwiches" },
      { ko: "엘 샴파네트", en: "El Xampanyet", dk: "피카소 미술관 옆 카탈루냐 전통 스파클링 와인과 통조림 핀초스 노포", de: "Historic tapas bar serving homemade cava and anchovies since 1929" },
      { ko: "세테 포르테스", en: "7 Portes", dk: "1836년 개업하여 역사적 인물들이 방문한 정통 지중해식 해산물 빠에야 명가", de: "Historic restaurant famous for rich, traditional seafood paella" }
    ],
    dinner: [
      { ko: "꼬시나 에르마노스 토레스", en: "Cocina Hermanos Torres", dk: "토레스 쌍둥이 셰프의 오픈 키친 극장식 파인다이닝 (미쉐린 3스타)", de: "Spectacular theatrical open-kitchen fine dining (3 Michelin Stars)" },
      { ko: "디스프루타르", en: "Disfrutar", dk: "엘 불리 출신 셰프들의 예술적이고 창의적인 미쉐린 3스타 현대식 분자 요리", de: "World-class avant-garde molecular gastronomy (3 Michelin Stars)" },
      { ko: "아바크 레스토랑", en: "ABaC Restaurant", dk: "스타 셰프 조르디 크루즈의 정교하고 현대적인 카탈루냐 럭셔리 디너", de: "Elegant three-Michelin-starred creative dining in a boutique hotel" },
      { ko: "보타푸메이로", en: "Botafumeiro", dk: "그라시아 지구의 랜드마크 고급 해산물 식당의 초대형 지중해 랍스터 구이", de: "Barcelona's legendary premium seafood dining house" },
      { ko: "빠사디스 델 뻽", en: "Passadis del Pep", dk: "간판 없는 입구를 지나 맛보는 바르셀로네타의 신선한 코스 해산물 저녁", de: "Hidden restaurant serving exquisite multi-course seafood platters" },
      { ko: "엘스 콰트레 가츠", en: "Els Quatre Gats", dk: "피카소가 첫 전시회를 열고 메뉴판을 디자인한 역사적인 예술가 카페 식당", de: "Historic modernista restaurant where young Picasso held his first exhibition" },
      { ko: "리아스 데 갈리시아", en: "Rias de Galicia", dk: "정통 갈리시아 스타일의 신선한 문어 요리(뽈뽀)와 지중해 털게 저녁", de: "High-end Galician restaurant famous for octopus and fresh crabs" },
      { ko: "비아 베네토", en: "Via Veneto", dk: "살바도르 달리도 단골이었던 벨에포크 인테리어의 클래식 정통 카탈루냐 요리", de: "Historic elegant restaurant serving classical Catalan dishes" },
      { ko: "칸 솔레", en: "Can Sole", dk: "바르셀로네타 어부들의 골목길에서 100년 넘게 빠에야와 해산물을 요리해 온 식당", de: "Classic seaside dining house cooking rich paella and stews since 1903" },
      { ko: "테아트로 키친 & 바", en: "Teatro Kitchen & Bar", dk: "알베르트 아드리아의 타파스 바 컨셉을 이은 창조적인 타파스 디너 극장", de: "Playful creative tapas theatre succeeding the legacy of Tickets" }
    ],
    coffee: [
      { ko: "아르티사 바르셀로나", en: "ARTiSA Barcelona", dk: "레이알 광장 초입 골목의 수제 크레페와 오가닉 에스프레소 디저트 카페", de: "Charming cafe serving organic coffee and homemade crepes near Placa Reial" },
      { ko: "리틀 번 포블레누", en: "Little Fern Poblenou", dk: "포블레누 예술 지구의 뉴질랜드 스타일 세련된 아보카도 브런치 카페", de: "New Zealand-inspired bright cafe serving excellent flat whites" },
      { ko: "에이샴펠링 카페", en: "Eixampeling Cafe", dk: "에이샴플레 지구의 화려한 꽃 장식과 달콤한 레인보우 케이크 디저트 찻집", de: "Beautiful floral cafe famous for colorful rainbow cakes and lattes" },
      { ko: "사탄스 커피 코너", en: "Satan's Coffee Corner", dk: "고딕 지구 골목길에 위치한 파격적인 이름의 바르셀로나 스페셜티 1세대 카페", de: "Pioneering specialty coffee shop hidden in the Gothic Quarter" },
      { ko: "노마드 커피 랩", en: "Nomad Coffee Lab", dk: "바르셀로나 로컬 원두 로스팅 트렌드를 이끄는 에스프레소 시음 전문 공간", de: "Renowned roastery lab focusing on coffee flavor extraction profiles" },
      { ko: "시라 커피 그라시아", en: "Syra Coffee Gracia", dk: "그라시아 골목길의 미니멀한 테이크아웃 전용 로컬 에스프레소 바", de: "Minimalist local coffee chain serving premium micro-lot coffees" },
      { ko: "페더럴 카페 바르셀로나", en: "Federal Cafe", dk: "산 안토니 지구의 조용하고 채광 좋은 북유럽풍 루프탑 테라스 카페", de: "Spacious Scandinavian-style cafe with a relaxing roof garden" },
      { ko: "카페 데 로페라", en: "Cafe de L'Opera", dk: "람블라스 거리 리세우 오페라 극장 맞은편의 19세기풍 전통 역사 카페", de: "Historic 19th-century cafe serving traditional churros and chocolate" },
      { ko: "그란하 비아데르", en: "Granja M. Viader", dk: "스페인 전통 초콜릿 음료 카카오랏이 탄생한 1870년 개업 츄러스 노포", de: "Historic dairy shop serving authentic thick hot chocolate and churros" },
      { ko: "카라벨 바르셀로나", en: "Caravelle", dk: "라발 지구의 세련되고 밝은 화이트톤 공간의 수제 타코 맥주 브런치 카페", de: "Trendy cafe serving outstanding shakshuka and house-brewed craft beers" }
    ]
  },
  rome: {
    lunch: [
      { ko: "아르만도 알 판테온", en: "Armando al Pantheon", dk: "판테온 바로 옆 골목에서 즐기는 예약 필수 전통 로마식 파스타 런치", de: "Historic Roman trattoria next to the Pantheon, serving classic carbonara" },
      { ko: "오스테리아 다 포르투나타", en: "Osteria da Fortunata", dk: "할머니가 창가에서 직접 손으로 빚는 쫄깃한 생면 스트로차프레티 파스타", de: "Famous for handmade fresh pasta rolled right in front of the window" },
      { ko: "트라토리아 다 엔초 알 29", en: "Trattoria da Enzo al 29", dk: "트라스테베레 외곽 골목의 줄 서서 먹는 정통 카치오 에 페페 파스타 노포", de: "Tiny, legendary local trattoria famous for authentic cacio e pepe" },
      { ko: "피차리움 본치", en: "Pizzarium Bonci", dk: "가브리엘레 본치 셰프가 가위로 잘라 판매하는 로마 최고의 사각 조각 피자", de: "Gourmet Roman pizza al taglio topped with creative artisan ingredients" },
      { ko: "엠마 피제리아", en: "Emma Pizza", dk: "바삭하고 얇은 정통 로마식 씬 피자와 카프레제 샐러드 점심", de: "Excellent thin-crust Roman-style pizza served in a refined setting" },
      { ko: "펠리체 아 테스타치오", en: "Felice a Testaccio", dk: "테스타치오 지구에서 테이블 옆에서 소스를 직접 비벼주는 카치오에페페", de: "Historic restaurant where servers mix cacio e pepe tableside" },
      { ko: "오스타리아 다 피에트로", en: "Hostaria da Pietro", dk: "포폴로 광장 인근의 정갈하고 아늑한 로마식 아티초크와 구이 요리", de: "Cozy neighborhood hostaria serving fresh Roman artichokes" },
      { ko: "칸티나 에 쿠치나", en: "Cantina e Cucina", dk: "나보나 광장 골목의 활기찬 이탈리아 분위기와 짭조름한 핀사 피자 맛집", de: "Lively retro-style diner serving pinsa pizza and house red wine" },
      { ko: "톤나렐로", en: "Tonnarello", dk: "트라스테베레 중심가에서 가장 대기 줄이 긴 노란색 냄비 생면 파스타 식당", de: "Bustling tavern famous for serving pinsa and tonnarello in yellow pans" },
      { ko: "다 체사레 알 카살레토", en: "Da Cesare al Casaletto", dk: "로마 시내 외곽 트램 종점 옆에 위치한 미식가들의 숨겨진 로컬 트라토리아", de: "Acclaimed local trattoria famous for fried gnocchi and carbonara" }
    ],
    dinner: [
      { ko: "아로마 레스토랑", en: "Aroma Restaurant", dk: "콜로세움이 손에 잡힐 듯한 야경 루프탑 테라스의 미쉐린 스타 파인다이닝", de: "Michelin-starred rooftop dining with spectacular Colosseum night views" },
      { ko: "라 페르고라", en: "La Pergola", dk: "로마 전체가 내려다보이는 카발리에리 호텔의 미쉐린 3스타 이탈리안 하이엔드 디너", de: "Rome's only three-Michelin-starred restaurant, featuring panoramic views" },
      { ko: "이마고 레스토랑", en: "Imago", dk: "하셀 호텔 6층에서 스페인 계단을 내려다보며 즐기는 현대식 이탈리안 코스", de: "Stunning panoramic rooftop dining overlooking the Spanish Steps" },
      { ko: "리스토란테 피페르노", en: "Ristorante Piperno", dk: "유대인 지구 골목 끝에 위치한 1860년 창업 로마식 튀김 요리 전문점", de: "Historic dining room serving traditional deep-fried artichokes since 1860" },
      { ko: "일 팔리아초", en: "Il Pagliaccio", dk: "로마 역사지구 내 프랑스풍 터치가 가미된 현대 이탈리안 파인다이닝 (2스타)", de: "Sophisticated multi-course contemporary Italian dining (2 Stars)" },
      { ko: "툴리오 레스토랑", en: "Tullio Ristorante", dk: "바르베리니 광장 인근 피렌체식 티본 스테이크(비스테카) 전문 노포 저녁", de: "Classic Roman steakhouse serving giant Florentine T-bone steaks" },
      { ko: "소라 렐라", en: "Sora Lella", dk: "티베르 섬 한가운데 다리 옆 옛 건물의 유서 깊은 로마 전통 파스타와 완당 디너", de: "Historic family restaurant set on the Tiber Island, serving Roman classics" },
      { ko: "케키노 달 1887", en: "Checchino dal 1887", dk: "테스타치오 도살장 인근의 전통 내장 요리(트리파, 꼬리찜) 원조 레스토랑", de: "Historic restaurant famous for inventing oxtail stew (Coda alla Vaccinara)" },
      { ko: "로스치올리 살루메리아", en: "Salumeria Roscioli", dk: "식료품점 뒤 숨겨진 테이블에서 맛보는 로마 최고 평점의 부라타 치즈 카르보나라", de: "Gourmet deli-restaurant serving world-class carbonara and cold cuts" },
      { ko: "다 조르조 알 포로 로마노", en: "Giuseppe al Foro Romano", dk: "포로 로마노 고대 유적지 야경을 바라보며 마시는 와인과 이탈리안 스테이크", de: "Stunning terrace dining overlooking the illuminated Roman Forum ruins" }
    ],
    coffee: [
      { ko: "산테우스토키오 일 카페", en: "Sant'Eustachio Il Caffe", dk: "판테온 인근 황금빛 크레마의 에스프레소 그라니따 전문 로마 3대 커피숍", de: "Legendary coffee shop serving sweet frothy espresso near Pantheon" },
      { ko: "타짜도로", en: "La Casa del Caffe Tazza d'Oro", dk: "판테온 바로 앞 콘파냐 에스프레소 슬러시(그라니따)가 가장 유명한 역사 카페", de: "Historic cafe famous for granita di caffe con panna (coffee slush)" },
      { ko: "안티코 카페 그레코", en: "Antico Caffe Greco", dk: "1760년 개업하여 괴테와 리스트가 방문한 스페인 광장 옆 로마에서 가장 오래된 카페", de: "Rome's oldest cafe operating since 1760 near Spanish Steps" },
      { ko: "로스치올리 카페", en: "Roscioli Caffe", dk: "최고의 에스프레소 추출 기술과 부드러운 이탈리아 전통 크림빵 마리토초 디저트", de: "Sleek coffee bar famous for fresh maritozzo sweet cream buns" },
      { ko: "시아시아 카페 1919", en: "Sciascia Caffe 1919", dk: "프라티 지구 골목길 에스프레소 잔 안쪽에 녹인 초콜릿을 발라주는 커피 맛집", de: "Historic cafe famous for its signature espresso with melted chocolate" },
      { ko: "파로 커피", en: "Faro - Luminari del Caffe", dk: "로마 최초의 현대식 스페셜티 3세대 브루잉 커피 전문 스페셜티 카페", de: "Rome's pioneer in third-wave specialty brewing and single-origin beans" },
      { ko: "참피니 카페", en: "Ciampini Roma", dk: "코르소 거리 인근 조용한 광장 테라스에서 즐기는 에스프레소와 젤라또", de: "Elegant cafe plaza serving rich espresso and artisanal tartufo gelato" },
      { ko: "페르가미노 카페", en: "Pergamino Caffe", dk: "바티칸 박물관 출구 앞 바리스타들의 감각적인 에스프레소 스페셜티 커피 바", de: "Specialty coffee shop serving excellent pour-overs near Vatican" },
      { ko: "트램 디포 카페", en: "Tram Depot", dk: "테스타치오 지구 오래된 녹색 트램 전차 차량을 개조한 야외 정원 키오스크 카페", de: "Charming outdoor kiosk cafe housed in a vintage green tram car" },
      { ko: "바빙턴스 티 룸", en: "Babingtons Tea Rooms", dk: "스페인 광장 계단 옆 1893년 영국인들이 세운 역사적인 정통 홍차 티룸", de: "Historic Victorian-style English tearoom open since 1893" }
    ]
  },
  bangkok: {
    lunch: [
      { ko: "란 제이파이", en: "Raan Jay Fai", dk: "스노클 고글을 쓴 할머니가 웍에서 튀겨내는 미쉐린 1스타 게살 오믈렛", de: "Legendary Michelin-starred street food stall famous for crab omelette" },
      { ko: "솜탐 더", en: "Somtum Der Saladaeng", dk: "실롬 지구에서 즐기는 깔끔하고 매콤새콤한 정통 이산식 솜탐과 치킨 런치", de: "Michelin-starred Esan-style restaurant serving fresh green papaya salad" },
      { ko: "팁싸마이", en: "Thip Samai Pad Thai", dk: "얇은 계란 지단으로 감싼 팟타이와 생오렌지 주스가 유명한 맛집", de: "Bangkok's most famous pad thai restaurant serving egg-wrapped noodles" },
      { ko: "크루아 압손", en: "Krua Apsorn", dk: "태국 왕실의 극찬을 받은 게살 볶음과 푸팟퐁커리 가성비 로컬 레스토랑", de: "Acclaimed local restaurant serving authentic curry crab meat scramble" },
      { ko: "와타나 파니치", en: "Wattana Panich", dk: "수십 년간 끓여온 거대한 솥의 깊고 진한 소고기 고기국수(나이소이) 맛집", de: "Famous noodle shop cooking rich beef broth in a giant perpetual pot" },
      { ko: "폴로 프라이드 치킨", en: "Polo Fried Chicken", dk: "바삭한 마늘 칩이 가득 올라간 태국 전통 시장 스타일 닭튀김 가이양 런치", de: "Legendary eatery famous for its crispy garlic-topped fried chicken" },
      { ko: "사바이 자이 냥", en: "Sabai Jai Niang", dk: "에어컨 룸에서 쾌적하게 먹는 에까마이의 이산 요리 목살 구이", de: "Popular restaurant in Ekkamai serving grilled pork neck and sticky rice" },
      { ko: "해 솜탐 콘벤트", en: "Hai Somtum Convent", dk: "실롬 콘벤트 로드 골목의 현지 직장인들로 붐비는 솜탐 타이식 닭구이 식당", de: "Bustling local diner serving spicy papaya salad and grilled chicken wings" },
      { ko: "피앙오 똠얌꿍", en: "Peang-Or Tom Yum", dk: "랍스터와 대형 해산물이 들어간 얼큰하고 시그니처 똠얌꿍 누들 점심", de: "Famous noodle bowl restaurant serving giant seafood tom yum soup" },
      { ko: "타이 푸드 코트 이타이", en: "Eathai Central Embassy", dk: "센트럴 엠버시 백화점 지하의 깨끗하고 다채로운 고급 로컬 미식 홀", de: "Premium clean food court offering classic street dishes from all regions" }
    ],
    dinner: [
      { ko: "손 레스토랑", en: "Sorn Fine Dining", dk: "남부 태국 식재료의 전통 기술을 한 입 코스로 재현한 미쉐린 2스타 파인다이닝", de: "Ultra-exclusive two-Michelin-starred southern Thai fine dining" },
      { ko: "누사라 레스토랑", en: "Nusara", dk: "톤부리 왕궁 뷰와 함께 즐기는 현대식 셰프 특선 타파스 타이 파인다이닝", de: "Contemporary Thai dining overlooking Wat Pho by Chef Ton" },
      { ko: "포통 레스토랑", en: "Potong", dk: "방콕 차이나타운 100년 된 약국 건물을 복원한 미쉐린 스타 20코스 디너", de: "Progressive Thai-Chinese fine dining housed in a historic building" },
      { ko: "가간 아난드", en: "Gaggan Anand", dk: "아시아 베스트 레스토랑 1위를 연이어 차지한 인도 분자 요리 다이닝 극장", de: "Theatrical progressive Indian molecular gastronomy experience" },
      { ko: "르 두 레스토랑", en: "Le Du Restaurant", dk: "태국 전통 요리를 서양식 요리법으로 재해석한 미쉐린 스타 현대식 디너", de: "Modern agricultural Thai dining holding one Michelin Star" },
      { ko: "블루 엘리펀트 방콕", en: "Blue Elephant", dk: "유서 깊은 식민지풍 유럽식 대저택에서 맛보는 정통 태국 왕실 요리 코스 저녁", de: "Royal Thai cuisine served in a majestic colonial-style historic mansion" },
      { ko: "이싸야 샤미즈 클럽", en: "Issaya Siamese Club", dk: "조용한 주택가 속 정원 저택의 알록달록한 태국 퓨전 요리와 칵테일 디너", de: "Charming heritage house serving creative organic Thai fusion dining" },
      { ko: "남 레스토랑", en: "Nahm Restaurant", dk: "방콕 메트로폴리탄 호텔 내 위치한 고품격 정통 타이 레시피 파인다이닝", de: "Acclaimed traditional Thai fine dining using ancient recipes" },
      { ko: "반 팟타이", en: "Baan Phadthai", dk: "사판탁신 인근 빈티지 파란색 건물에서 즐기는 숯불 게살 팟타이와 와인 저녁", de: "Michelin Bib Gourmand restaurant specializing in charcoal-grilled pad thai" },
      { ko: "페이스트 방콕", en: "Paste Bangkok", dk: "셰프 비 송비사바의 역사적 왕실 요리법 복원 미쉐린 스타 타이 디너", de: "Refined, award-winning historic Thai dining in Ratchaprasong" }
    ],
    coffee: [
      { ko: "나나 커피 로스터스 아리", en: "NANA Coffee Roasters", dk: "아리 지구의 숲속 온실 같은 정원에서 즐기는 월드 바리스타의 스페셜티 에스프레소", de: "Beautiful forest-like garden cafe serving award-winning espresso" },
      { ko: "디바나 시그니처 카페", en: "Divana Signature Cafe", dk: "고급 스파 브랜드 디바나가 운영하는 화려한 꽃 장식의 애프터눈 티 라운지", de: "Floral paradise cafe offering luxury afternoon tea sets" },
      { ko: "더 우드 랜드 카페", en: "The Wood Land", dk: "온눗 역 인근 빌딩 숲 속 나무 담장 안의 평화로운 잔디밭 야외 정원 카페", de: "Hidden green oasis cafe with wooden decks and lawn seating" },
      { ko: "루츠 커피 통로", en: "Roots Coffee Commons", dk: "통로 지구 커먼즈 복합문화공간 1층의 방콕 대표 스페셜티 로스터리 커피숍", de: "Bangkok's leading third-wave coffee roaster located in The Commons" },
      { ko: "팩토리 커피 방콕", en: "Factory Coffee Phayathai", dk: "스프레이 에스프레소와 크림 라떼 등 시그니처 창작 커피 챔피언 바", de: "Award-winning cafe famous for theatrical tableside signature coffees" },
      { ko: "블루 고래 카페", en: "Blue Whale Cafe", dk: "왕궁 근처의 버터플라이 피 꽃잎 차로 만든 파란색 라떼로 유명한 3층 협소 카페", de: "Famous blue-colored butterfly pea latte cafe near Grand Palace" },
      { ko: "헤더스톤 카페", en: "Featherstone Cafe", dk: "에까마이 골목길 서양 옛날 약국 박물관 스타일의 판타지 인테리어 카페", de: "Magical apothecary-themed boutique cafe serving fruit ice-cube sodas" },
      { ko: "파톰 오가닉 리빙", en: "Patom Organic Living", dk: "통로의 원형 통창 유리온실 속 친환경 태국 전통 코코넛 디저트와 유기농 커피", de: "Glass pavilion cafe set in a lush garden serving organic products" },
      { ko: "세레시아 커피 로스터스", en: "Ceresia Coffee Roasters", dk: "프롬퐁역 일본인 거리 뒤편의 정직하고 미니멀한 단일 원두 브루잉 로스터리", de: "Artisanal coffee roaster focusing on single-origin filter coffees" },
      { ko: "핸즈 앤 하트 카페", en: "Hands and Heart", dk: "통로 골목길의 극단적인 화이트 앤 블랙 미니멀리즘 인테리어 에스프레소 바", de: "Ultra-minimalist monochrome cafe serving clean pour-over coffee" }
    ]
  },
  sydney: {
    lunch: [
      { ko: "해리스 카페 드 휠", en: "Harry's Cafe de Wheels", dk: "울루물루 항구의 80년 역사 트럭에서 맛보는 호주식 전통 미트파이", de: "Historic harbor-side cart serving legendary meat pies topped with mushy peas" },
      { ko: "챗 타이 시드니", en: "Chat Thai Haymarket", dk: "시드니 차이나타운 인근에서 즐기는 매콤하고 트렌디한 타이 국수와 솜탐", de: "Highly popular Thai restaurant serving authentic street-style noodles" },
      { ko: "마막 레스토랑", en: "Mamak Chinatown", dk: "손으로 얇게 늘려 구워내는 바삭한 말레이시아식 로티 차나이 카레 런치", de: "Award-winning Malaysian diner famous for flaky roti and satay skewers" },
      { ko: "시드니 피시 마켓", en: "Sydney Fish Market", dk: "남반구 최대 수산시장에서 즉석 랍스터 구이와 굴, 신선한 회 점심", de: "Huge fish market offering freshly shucked oysters and grilled lobsters" },
      { ko: "빌스 달링허스트", en: "Bill's Darlinghurst", dk: "세계적인 셰프 빌 그랜저의 부드러운 리코타 핫케이크와 스크램블 에그 브런치", de: "The birthplace of Bills' legendary ricotta hotcakes and creamy eggs" },
      { ko: "싱글 오 써리 힐즈", en: "Single O Surry Hills", dk: "써리 힐즈 골목길 커피 탭 시스템의 스페셜티 브루잉과 샌드위치 런치", de: "Specialty coffee bar serving self-serve tap brews and gourmet bites" },
      { ko: "버크 스트리트 베이커리", en: "Bourke Street Bakery", dk: "바삭한 사워도우와 수제 진저 롤, 타르트로 유명한 로컬 베이커리 런치", de: "Famous bakery cafe renowned for organic sourdough and pork sausage rolls" },
      { ko: "프라텔리 프레시", en: "Fratelli Fresh CBD", dk: "시드니 CBD 중심가 지하의 활기찬 대형 정통 이탈리안 피자 파스타 식당", de: "Lively Italian trattoria serving freshly tossed salads and pizzas" },
      { ko: "카페 시드니", en: "Cafe Sydney", dk: "서큘러 키 커스텀즈 하우스 루프탑에서 즐기는 지중해식 해산물 플래터 런치", de: "Rooftop dining at Circular Quay offering iconic harbour bridge views" },
      { ko: "블랙 스타 페이스트리", en: "Black Star Pastry Newtown", dk: "뉴타운 본점의 인스타 세계 최다 업로드 수박 딸기 케이크 디저트 런치", de: "Home of the world-famous strawberry watermelon cake and tarts" }
    ],
    dinner: [
      { ko: "퀘이 레스토랑", en: "Quay Restaurant", dk: "시드니 오페라 하우스와 하버 브릿지 사이 절경의 파인다이닝 (세계 50대 식당)", de: "Spectacular fine dining overlooking Sydney Harbour, by Chef Peter Gilmore" },
      { ko: "테츠야 레스토랑", en: "Tetsuya's", dk: "일식과 프렌치가 융합된 시드니의 전설적인 와규 요리 및 송어 콘피 파인다이닝", de: "Legendary Japanese-French fusion dining famous for confit of ocean trout" },
      { ko: "베넬롱 오페라하우스", en: "Bennelong", dk: "시드니 오페라하우스의 거대한 돛 내부 돔 아래에서 즐기는 호주식 디너", de: "Dramatic restaurant set inside the sails of the Sydney Opera House" },
      { ko: "아리아 레스토랑 시드니", en: "Aria Restaurant", dk: "서큘러 키 워터프런트의 맷 모란 셰프의 럭셔리 모던 오스트레일리안 디너", de: "Luxury waterfront dining overlooking Circular Quay by Chef Matt Moran" },
      { ko: "레스토랑 휴버트", en: "Restaurant Hubert", dk: "1920년대 프랑스 파리 지하 재즈 바 분위기의 프리미엄 스테이크 와인 다이닝", de: "Stunning underground French bistro with live jazz and classic steak frites" },
      { ko: "락풀 바 & 그릴", en: "Rockpool Bar & Grill", dk: "시드니 CBD 내 아르데코 빌딩에 위치한 최고급 드라이에이징 소고기 석쇠구이", de: "High-end steakhouse located in an Art Deco building, famous for aged beef" },
      { ko: "아이스버그 다이닝 룸", en: "Icebergs Dining Room", dk: "본다이 비치 해수 수영장 바로 위 절벽의 이국적인 지중해 이탈리안 디너", de: "Oceanfront fine dining perched above the iconic Bondi Icebergs pool" },
      { ko: "파이어도어 시드니", en: "Firedoor Surry Hills", dk: "가스나 전기 없이 오직 장작불의 화력과 연기로 요리하는 독창적인 그릴 디너", de: "Unique wood-fire only restaurant by Chef Lennox Hastie (from Chef's Table)" },
      { ko: "노마드 시드니", en: "Nomad Sydney", dk: "써리 힐즈 개조된 마구간 공간의 지중해식 수제 사퀴테리와 화덕 빵 디너", de: "Industrial-chic restaurant serving Mediterranean wood-fired dishes" },
      { ko: "치즈윅 레스토랑", en: "Chiswick Woollahra", dk: "정원에서 직접 기른 야채와 허브를 사용하는 평화로운 팜투테이블 다이닝", de: "Beautiful garden-to-table dining showcasing local roasted lamb" }
    ],
    coffee: [
      { ko: "더 그라운드 오브 알렉산드리아", en: "The Grounds of Alexandria", dk: "식물원과 농장을 개조해 동화 속 정원처럼 꾸며놓은 시드니 대표 테마 카페", de: "Magical garden cafe estate featuring a flower shop, farm animal yard, and roastery" },
      { ko: "싱글 오 써리 힐즈 카페", en: "Single O Surry Hills", dk: "호주 스페셜티 3세대 로스팅 브랜드의 대표적인 빈티지 에스프레소 바", de: "Surry Hills local coffee roaster serving excellent cold brews and flat whites" },
      { ko: "에디션 커피 로스터스 써리힐즈", en: "Edition Coffee Roasters", dk: "미니멀한 블랙 모노톤 공간의 일식과 북유럽식 퓨전 드립 커피 전문점", de: "Nordic-Japanese fusion cafe famous for beautiful batch brews and soufflés" },
      { ko: "패러마운트 커피 프로젝트", en: "Paramount Coffee Project", dk: "써리 힐즈 역사적인 아르데코 패러마운트 하우스 내 글로벌 게스트 바리스타 카페", de: "Hip specialty coffee bar showcasing rotating global roasters" },
      { ko: "셀시우스 커피 Co.", en: "Celsius Coffee Co.", dk: "키리빌리 페리 선착장 나무 데크 위에 떠 있는 바다 한가운데 오션뷰 카페", de: "Breathtaking waterfront cafe floating directly on Kirribilli Wharf" },
      { ko: "메카 커피 시드니", en: "Mecca Coffee Alexandria", dk: "인더스트리얼 창고형 공간에서 직접 로스팅하는 묵직한 바디감의 에스프레소", de: "Alexandria roastery headquarters serving outstanding specialty coffee" },
      { ko: "룸 텐 킹스크로스", en: "Room Ten Kings Cross", dk: "좁은 뒷골목에 위치해 아침마다 줄을 서는 가성비 샌드위치와 라떼 맛집", de: "Tiny laneway cafe famous for its Reuben sandwiches and strong flat whites" },
      { ko: "루벤 힐즈 써리 힐즈", en: "Reuben Hills", dk: "남미 농장에서 다이렉트 트레이드한 원두를 볶는 2층 규모 로스터리 카페", de: "Surry Hills roastery cafe known for South American origin coffee beans" },
      { ko: "아티피서 스페셜티 커피", en: "Artificer Specialty Coffee", dk: "디저트나 사이드 없이 오직 순수한 고품질 브루잉 커피 한 잔만 판매하는 카페", de: "Minimalist surry hills cafe focusing purely on roasting and brewing coffee" },
      { ko: "데본 카페 바랑가루", en: "Devon Cafe Barangaroo", dk: "일식 요소를 가미한 독창적인 크루아상 샌드위치와 맛차 라떼 디저트", de: "Barangaroo cafe famous for its egg sando, matcha lattes, and treats" }
    ]
  },
  // We can populate the rest of the 19 cities using the compiled actual famous list
  singapore: {
    lunch: [
      { ko: "맥스웰 푸드 센터", en: "Maxwell Food Centre", dk: "차이나타운의 유명 야외 호커 센터에서 맛보는 싱가포르식 길거리 미식", de: "Bustling hawker centre famous for Hainanese chicken rice and local snacks" },
      { ko: "하오커 찬", en: "Liao Fan Hawker Chan", dk: "세계 최초로 미쉐린 1스타를 획득한 차이나타운의 소이소스 치킨 라이스", de: "The world's first Michelin-starred street food stall serving soy sauce chicken" },
      { ko: "티안티안 하이난 치킨라이스", en: "Tian Tian Hainanese Chicken Rice", dk: "맥스웰 호커 센터 내 부드러운 닭고기살과 향긋한 닭육수 밥 맛집", de: "Highly popular hawker stall famous for its succulent chicken rice" },
      { ko: "송파 바쿠테 본점", en: "Song Fa Bak Kut Teh", dk: "클락 키 본점에서 줄 서서 마시는 마늘과 통후추 향의 싱가포르 갈비탕", de: "Classic pork rib soup served in a garlicky, peppery broth near Clarke Quay" },
      { ko: "328 카통 락사", en: "328 Katong Laksa", dk: "스푼으로 떠먹는 매콤하고 고소한 코코넛 밀크 육수의 정통 락사 국수", de: "Famous Katong-style spicy coconut curry noodle soup eaten only with a spoon" },
      { ko: "잠잠 레스토랑", en: "Singapore Zam Zam", dk: "아랍 스트리트 맞은편 100년 역사의 싱가포르 대표 인도 무르타박 만두피 요리", de: "Historic Muslim-Indian eatery famous for venison/chicken murtabak pancakes" },
      { ko: "야쿤 카야 토스트", en: "Ya Kun Kaya Toast China Street", dk: "차이나 스트리트 본점에서 맛보는 바삭한 토스트와 수란, 카야 잼 정식", de: "The historic headquarters serving charcoal-grilled kaya butter toast" },
      { ko: "라우파삿 사테 거리", en: "Lau Pa Sat Satay Street", dk: "해 질 무렵 금융가 도로를 통제하고 열리는 대형 야외 숯불 꼬치구이 시장", de: "Outdoor satay street behind the historic Victorian-style market pavilion" },
      { ko: "점보 시푸드 클락키", en: "Jumbo Seafood Riverside", dk: "클락 키 강변 테라스에서 비닐 장갑을 끼고 뜯는 매콤달콤한 칠리크랩", de: "Waterside restaurant famous for signature Singaporean sweet-chili mud crabs" },
      { ko: "딘타이펑 마리나베이", en: "Din Tai Fung Marina Bay", dk: "마리나 베이 샌즈 지하의 정갈한 샤오롱바오 만두와 계란 볶음밥", de: "Popular Taiwanese dining outlet serving fresh steaming dumplings" }
    ],
    dinner: [
      { ko: "오데뜨 레스토랑", en: "Odette Restaurant", dk: "싱가포르 국립 미술관 내부의 현대적인 아시아풍 프랑스 파인다이닝 (미쉐린 3스타)", de: "Spectacular three-Michelin-starred French restaurant inside the National Gallery" },
      { ko: "번트 엔즈", en: "Burnt Ends", dk: "데이브 핀트 셰프가 맞춤 석쇠 그릴에서 조리하는 오스트레일리안 바비큐 저녁", de: "Highly popular Michelin-starred custom wood-fired barbecue kitchen" },
      { ko: "캔들너트", en: "Candlenut", dk: "세계 최초이자 유일하게 미쉐린 스타를 획득한 정통 페라나칸(바바논야) 요리", de: "Contemporary Peranakan cuisine showcasing heritage heritage recipes" },
      { ko: "바이올렛 온 국립미술관", en: "National Kitchen by Violet Oon", dk: "싱가포르 국립미술관 내 식민지 시대 분위기 속 고급 페라나칸 요리", de: "Gorgeous interior serving authentic spicy Nyonya curries and laksa" },
      { ko: "와쿠 긴", en: "Waku Ghin", dk: "마리나 베이 샌즈 내 테츠야 와쿠다 셰프의 극상 오마카세 퓨전 다이닝", de: "Ultra-luxury Japanese-European tasting menus using Japanese ingredients" },
      { ko: "얀 바이 커크 웨스타웨이", en: "Jaan by Kirk Westaway", dk: "스탬포드 호텔 70층에서 야경을 바라보며 즐기는 현대 영국식 파인다이닝", de: "Two-Michelin-starred creative British dining with sky-high harbor views" },
      { ko: "레스 아미", en: "Les Amis", dk: "오차드 로드의 상징적인 전통 클래식 프랑스 고급 요리 (미쉐린 3스타)", de: "Pioneering three-Michelin-starred classic French haute cuisine" },
      { ko: "래비린스 레스토랑", en: "Labyrinth Singapore", dk: "싱가포르 현지 호커 푸드를 분자 요리와 창의적 기법으로 변형한 디너 코스", de: "Michelin-starred restaurant reinterpreting local street food dishes" },
      { ko: "코너 하우스 보타닉 가든", en: "Corner House Botanic Gardens", dk: "보타닉 가든 식물원 내 역사적인 흑백 방갈로 속 프렌치 허브 가든 디너", de: "Romantic heritage bungalow serving fine French-Asian botanic cuisine" },
      { ko: "임페리얼 트레저", en: "Imperial Treasure Super Peking Duck", dk: "싱가포르에서 베이징 카오야로 가장 높은 평점을 받는 고급 광둥식 요리", de: "Award-winning restaurant famous for expertly carved Beijing roast duck" }
    ],
    coffee: [
      { ko: "커먼맨 커피 로스터스 마틴로드", en: "Common Man Coffee Roasters", dk: "마틴 로드 인근 힙스터들의 브런치 성지이자 싱가포르 스페셜티 3세대 카페", de: "Popular industrial cafe serving robust espresso and organic brunch" },
      { ko: "나일론 커피 로스터스", en: "Nylon Coffee Roasters", dk: "HDB 공공주택 1층 구석의 아주 작지만 원두 수입과 드립 커피 실력 최상급 카페", de: "Tiny micro-roastery shop highly respected by local coffee enthusiasts" },
      { ko: "맥시 커피 바", en: "Maxi Coffee Bar", dk: "차이나타운 인근 파란색 외관의 활기차고 귀여운 에스프레소 토닉 로컬 카페", de: "Charming neighborhood espresso bar serving excellent coffee and melts" },
      { ko: "차이생후앗 하드웨어", en: "Chye Seng Huat Hardware", dk: "철물점 간판과 외관을 그대로 살려 로스팅 시설을 갖춘 힙한 인더스트리얼 카페", de: "Renovated hardware shop housing a specialty coffee bar and roastery" },
      { ko: "PS.카페 뎀시 힐", en: "PS.Cafe at Dempsey Hill", dk: "뎀시 힐 울창한 열대우림 숲속 온실 같은 유리창 너머로 나무를 보며 즐기는 트러플 감자튀김과 라떼", de: "Stunning forest-framed cafe famous for truffle fries and scenic views" },
      { ko: "바샤 커피 아이온 오차드", en: "Bacha Coffee ION Orchard", dk: "모로코 마라케시 궁전을 연상케 하는 금빛 인테리어의 화려한 드립 백 커피 숍", de: "Opulent Moroccan-themed boutique serving single-origin Arabica drip coffee" },
      { ko: "아틀라스 바", en: "Atlas Bar", dk: "배트맨 고담시티 궁전 같은 웅장한 아르데코 인테리어의 로비 칵테일 펍 커피 라운지", de: "Breathtaking Art Deco lobby bar offering premium afternoon tea and coffee" },
      { ko: "티옹바루 베이커리", en: "Tiong Bahru Bakery", dk: "티옹바루 보헤미안 거리의 프랑스 셰프의 고소한 크루아상 맛집 베이커리", de: "Famous bakery cafe renowned for the best French croissants in Singapore" },
      { ko: "토비스 에스테이트 로버슨 키", en: "Toby's Estate Robertson Quay", dk: "로버슨 키 싱가포르 강변 인도에 앉아 마시는 시드니 발 스페셜티 커피", de: "Riverside cafe serving premium blends by the Australian coffee brand" },
      { ko: "시메트리 카페 클락키", en: "Symmetry Cafe", dk: "파스텔 그린톤 프랑스풍 외관의 아기자기한 브런치 커피숍", de: "Charming French-style casual restaurant serving excellent flat whites" }
    ]
  },
  dubai: {
    lunch: [
      { ko: "아라비안 티 하우스 알 파히디", en: "Arabian Tea House", dk: "바스타키아 역사지구 내 흰 벽과 하늘색 의자의 평화로운 전통 에미리티 브런치", de: "Charming courtyard restaurant serving traditional Emirati breakfast trays" },
      { ko: "알 파나르 레스토랑", en: "Al Fanar Restaurant", dk: "두바이 마리나에서 맛보는 1960년대 전통 두바이 생활상을 재현한 전통 고기 볶음밥 맛집", de: "Nostalgic restaurant serving authentic Emirati chicken machboos and stews" },
      { ko: "오퍼레이션 팔라펠", en: "Operation Falafel JBR", dk: "JBR 비치 워크에서 간단히 즐기는 바삭한 팔라펠과 홈무스 피타랩 런치", de: "Trendy fast-casual diner serving Middle Eastern street wraps and hummus" },
      { ko: "로그마 델리카트슨", en: "Logma Dubai Mall", dk: "두바이 몰 내부의 현대적이고 감각적인 전통 에미리티 디저트와 누들 런치", de: "Modern Emirati eatery famous for sweet lugaimat and khameer sandwiches" },
      { ko: "라비 레스토랑", en: "Ravi Restaurant Al Satwa", dk: "두바이에서 가장 유명한 가성비 인도/파키스탄 정통 카레와 치킨 카라히 노포", de: "Legendary local Pakistani diner famous for mutton curry and garlic naan" },
      { ko: "솔트 카이트 비치", en: "Salt Kite Beach", dk: "카이트 비치 모래사장 위 실버 푸드트럭 컨셉의 시원한 수제 비프 슬라이더 버거 맛집", de: "Airstream trailer burger joint sitting directly on the sand of Kite Beach" },
      { ko: "자룹 셰이크 자이드 로드", en: "Zaroob", dk: "금융가 고층빌딩 사이 화려한 그래피티 벽면의 레바논 스타일 길거리 샌드위치", de: "Vibrant Arabic street eatery serving fresh shawarmas and falafels" },
      { ko: "부 크타이르 해산물 식당", en: "Bu Qtair", dk: "움 알 셰이프 항구 포장마차에서 맛보는 매콤한 인도식 소스 생선 생새우 튀김", de: "Simple fishermen's shack serving fresh catch marinated in spicy masala" },
      { ko: "스페셜 오스타디 Kebab", en: "Special Ostadi", dk: "1978년 개업하여 두바이 백종원 맛집으로 알려진 정통 이란식 치킨 케밥 노포", de: "Historic Persian kebab restaurant famous for its yogurt-marinated meats" },
      { ko: "존스 더 그로서", en: "Jones the Grocer Palm", dk: "팜 주메이라 비치를 보며 즐기는 호주식 유기농 치즈 플레이트 브런치 런치", de: "Australian-style gourmet food store and beachside terrace cafe" }
    ],
    dinner: [
      { ko: "앳머스피어 버즈칼리파", en: "At.mosphere Burj Khalifa", dk: "세계 최고층 빌딩 버즈 칼리파 122층에서 야경과 함께하는 프렌치 그릴 디너", de: "The world's highest fine dining restaurant, located on Burj Khalifa's 122nd floor" },
      { ko: "트레신드 스튜디오", en: "Tresind Studio", dk: "셰프 히만슈 사이니의 현대 인도 요리 스토리텔링 파인다이닝 (미쉐린 2스타)", de: "Immersive Michelin-starred theatrical Indian tasting menu experience" },
      { ko: "오시아노 수중 레스토랑", en: "Ossiano Atlantis", dk: "아틀란티스 호텔 대형 수족관 통창 옆 상어가 지나가는 바다 속 파인다이닝", de: "Award-winning seafood dining set next to the giant aquarium lagoon" },
      { ko: "피어시크", en: "Pierchic", dk: "알 카스르 호텔 프라이빗 부두 끝 바다 위에 떠서 즐기는 로맨틱 이탈리안 디너", de: "Stunning overwater seafood dining overlooking Burj Al Arab hotel" },
      { ko: "주마 두바이", en: "Zuma Dubai", dk: "두바이 금융센터 내 글로벌 정통 현대식 일식 이자카야의 정점 저녁 식사", de: "Highly popular upscale contemporary Japanese restaurant in DIFC" },
      { ko: "라 쁘띠 메종", en: "LPM Restaurant & Bar", dk: "두바이 금융가에 위치한 신선한 지중해 프랑스 니스 스타일 요리 레스토랑", de: "Charming upscale French-Mediterranean dining serving escargots" },
      { ko: "코야 두바이", en: "Coya Dubai", dk: "화려한 잉카 테마 인테리어 속 페루 전통 세비체와 그릴 꼬치 와인 디너", de: "Vibrant Peruvian dining lounge famous for fresh ceviche and pisco sour" },
      { ko: "파이 타이", en: "Pai Thai Madinat", dk: "마디낫 주메이라 수로를 통해 전통 목조 보트(아브라)를 타고 들어가는 태국 식당", de: "Traditional Thai dining accessed by abra boat ride through canals" },
      { ko: "누스렛 스테이크하우스", en: "Nusr-Et Steakhouse Dubai", dk: "솔트 배(Salt Bae) 셰프의 고기를 썰어 소금을 뿌려주는 화려한 쇼 스테이크", de: "Salt Bae's famous steakhouse serving gold-leaf steaks and beef ribs" },
      { ko: "알 마하라 레스토랑", en: "Burj Al Arab Ristorante L'Olivo", dk: "7성급 호텔 버즈 알 아랍 내부의 금빛 황금 터널 속 고급 지중해식 디너", de: "Exquisite Italian dining set inside Burj Al Arab's iconic undersea room" }
    ],
    coffee: [
      { ko: "아라비안 티 하우스 카페", en: "Arabian Tea House", dk: "바스타키아 역사지구의 나무 그늘 아래 정통 아랍 민트 티와 대추야자", de: "Tranquil outdoor heritage courtyard serving Arabic mint tea and dates" },
      { ko: "톰앤서그 알쿠즈", en: "Tom&Serg", dk: "알 쿠즈 공업지구 창고를 개조해 뉴욕 분위기를 낸 시드니식 브런치 카페", de: "Industrial warehouse Melbourne-style cafe serving outstanding flat whites" },
      { ko: "나이트자 커피 로스터스", en: "Nightjar Coffee Roasters", dk: "알세르칼 예술 지구의 힙스터 로스터리이자 탭 콜드브루와 레트로 도넛 카페", de: "Hip cafe in Alserkal Avenue famous for draft nitro coffee and local bites" },
      { ko: "로우 커피 컴퍼니", en: "Raw Coffee Company", dk: "두바이 최초의 친환경 다이렉트 트레이드 스페셜티 대형 커피 로스터리", de: "Specialty coffee roastery in Dubai offering custom single-origin beans" },
      { ko: "더 썸 오브 어스", en: "The Sum of Us", dk: "두바이 월드트레이드 센터 인근 직접 빵을 굽고 원두를 볶는 올인원 로컬 카페", de: "Spacious cafe featuring an in-house bakery, roastery, and dining hall" },
      { ko: "스필 더 빈", en: "Spill the Bean", dk: "두바이 지속가능 도시 내 위치한 유기농 식재료와 수제 비건 케이크 커피숍", de: "Sustainable organic cafe focusing on healthy treats and single-origin coffee" },
      { ko: "프렌즈 애비뉴 카페", en: "Friends Avenue Cafe", dk: "JLT 주거지구 호숫가 옆 아늑하고 따뜻한 원목 감성의 브런치 카페", de: "Cozy neighborhood cafe serving colorful acai bowls and coffee" },
      { ko: "보스턴 레인 알쿠즈", en: "Boston Lane", dk: "쿠즈 수공예 단지 안 파스텔 핑크 테마의 샌드위치와 에스프레소 정원 카페", de: "Beautiful pastel-pink courtyard cafe serving gourmet toasties" },
      { ko: "카페 라이더", en: "Cafe Rider Custom", dk: "오토바이 커스텀 워크숍과 스페셜티 에스프레소 바가 결합된 이색 공간", de: "Cool garage cafe combining motorcycle custom builds with specialty coffee" },
      { ko: "드롭 커피 주메이라", en: "Drop Coffee Jumeirah", dk: "미니멀한 인더스트리얼 인테리어의 라떼 아트 챔피언 스페셜티 에스프레소 바", de: "Sleek coffee shop serving outstanding espresso mocktails and pastries" }
    ]
  },
  munich: {
    lunch: [
      { ko: "호프브로이하우스", en: "Hofbrauhaus Munchen", dk: "1589년 바이에른 공작이 세운 뮌헨에서 가장 유명한 대형 맥주홀 학센 런치", de: "The world's most famous beer hall, serving giant pork knuckles and draft lagers" },
      { ko: "아우구스티너 클로스터비르트", en: "Augustiner Klosterwirt", dk: "프라우엔 교회 바로 앞 야외 테이블의 오리지널 아우구스티너 생맥주와 슈바인학센", de: "Traditional Bavarian tavern next to the cathedral, serving roast pork" },
      { ko: "빅투알리엔마르크트 야외 시장", en: "Viktualienmarkt Stalls", dk: "시장에서 갓 구매한 바이에른 화이트 소시지와 비어가든 프레첼 점심", de: "Bavarian white sausages (Weisswurst) and pretzels in the market beer garden" },
      { ko: "슈나이더 브로이하우스", en: "Schneider Brauhaus", dk: "마리엔 광장 인근 밀맥주(바이스비어)의 원조와 정통 바이에른 학센 점심", de: "Historic wheat beer brewery house serving traditional Bavarian cuts" },
      { ko: "라츠켈러 뮌헨", en: "Ratskeller Munchen", dk: "뮌헨 신시청사 거대한 아치형 지하 궁전 속 정갈한 슈니첼과 바이에른 요리", de: "Grand neo-Gothic cellar restaurant serving premium veal schnitzels" },
      { ko: "학센바우어", en: "Haxnbauer im Scholastikahaus", dk: "회전 꼬치 기계에 구워 껍질이 바삭한 슈바인학센 전문 최고 인기 맛집", de: "Famous tavern spit-roasting pork knuckles to absolute crispy perfection" },
      { ko: "슈파텐하우스 안 데어 오퍼", en: "Spatenhaus an der Oper", dk: "국립 오페라 극장 맞은편 격조 높은 공간에서 즐기는 전통 슈니첼과 맥주", de: "Elegant Bavarian dining room overlooking the National Theatre" },
      { ko: "바이스 브로이하우스", en: "Weisses Brauhaus", dk: "뮌헨에서 아침 식사로 화이트 소시지와 밀맥주를 즐기기 가장 좋은 유서 깊은 곳", de: "Historic institution serving traditional morning weisswurst and wheat beer" },
      { ko: "비르츠하우스 데어 아우", en: "Wirtshaus in der Au", dk: "오래된 현지 거주지구 속 가장 큰 만두(크뢰델)와 재즈 비어 런치 식당", de: "Classic local tavern famous for giant potato dumplings and craft beers" },
      { ko: "데어 프쇼르", en: "Der Pschorr", dk: "빅투알리엔마르크트 시장 초입 친환경 식재료를 고집하는 현대식 비어 레스토랑", de: "Modern Bavarian restaurant serving regional beef and beer from wooden casks" }
    ],
    dinner: [
      { ko: "탄트리스 레스토랑", en: "Tantris", dk: "1970년대 아방가르드 인테리어를 보존한 뮌헨 최고의 미쉐린 2스타 프랑스식 파인다이닝", de: "Iconic avant-garde French fine dining restaurant holding two Michelin Stars" },
      { ko: "아틀리에 레스토랑", en: "Atelier", dk: "바이에리셔 호프 호텔 내부의 감각적이고 현대적인 코스 다이닝 (미쉐린 3스타)", de: "Three-Michelin-starred culinary art theatre in hotel Bayerischer Hof" },
      { ko: "알로이스 달마이어", en: "Alois - Dallmayr Fine Dining", dk: "달마이어 왕실 식료품점 2층의 격조 높은 지중해식 프렌치 퓨전 파인다이닝", de: "Gourmet Michelin-starred modern French restaurant inside the royal deli" },
      { ko: "레스토랑 181", en: "Restaurant 181", dk: "올림픽 타워 181m 고층의 360도 회전 전망 레스토랑 코스 디너", de: "Fine dining in a revolving restaurant 181 meters up the Olympic Tower" },
      { ko: "에스치머 BMW 벨트", en: "EssZimmer BMW Welt", dk: "BMW 벨트 내부 바비 메이어 셰프의 초현대적 감각 미쉐린 스타 디너", de: "Michelin-starred creative dining located inside the BMW Welt building" },
      { ko: "브레너 그릴", en: "Brenner Grill", dk: "막시밀리안 거리에 위치한 거대한 오픈 그릴 키친의 이탈리안 파스타 스테이크", de: "Spacious stylish restaurant famous for wood-fired meat and pasta" },
      { ko: "달마이어 레스토랑", en: "Dallmayr Restaurant", dk: "유서 깊은 달마이어 백화점 내 최고급 해산물과 전통 독일 한정식 디너", de: "Premium seafood and European classics inside the historic Dallmayr delicatessen" },
      { ko: "폴라너 암 노케르베르크", en: "Paulaner am Nockherberg", dk: "폴라너 양조장 직영의 거대한 구리 솥이 있는 현대식 비어가든 저녁 식사", de: "Spacious brewery restaurant serving fresh unfiltered Paulaner beers" },
      { ko: "슈만스 바", en: "Schumann's Bar", dk: "호프가르텐 정원 옆 전설적인 찰스 슈만 바리스타의 클래식 스테이크 칵테일 저녁", de: "Legendary bar and kitchen serving classic cocktails and steaks" },
      { ko: "뵈르트스하우스 인 데어 아우", en: "Wirtshaus in der Au", dk: "바이에른 전통 의상을 입은 직원들이 서빙하는 양고기 슈테커 피쉬 석쇠구이", de: "Traditional Bavarian grill serving roasted fish on a stick" }
    ],
    coffee: [
      { ko: "카페 루이트폴트", en: "Cafe Luitpold", dk: "1888년 개업하여 작가들과 예술가들이 모이던 뮌헨의 상징적인 왕실풍 대형 디저트 카페", de: "Historic majestic grand cafe famous for royal pastries and chocolates" },
      { ko: "카페 프리슈후트", en: "Cafe Frischhut", dk: "빅투알리엔마르크트 시장 옆 독일식 도넛(슈말츠누델)과 신선한 드립 커피 전문 노포", de: "Famous bakery cafe serving fresh warm Bavarian fried dough pastries" },
      { ko: "달마이어 카페", en: "Dallmayr Cafe", dk: "왕실 납품 식료품점 달마이어의 클래식 커피 바에서 마시는 프로도모 커피", de: "Elegant coffee salon inside the historic Dallmayr serving gourmet roasts" },
      { ko: "카페 탐보시", en: "Cafe Tambosi", dk: "호프가르텐 정원이 훤히 내려다보이는 뮌헨에서 가장 오래된 야외 노천 정원 테라스 카페", de: "Munich's oldest cafe facing the Hofgarten, with beautiful terrace tables" },
      { ko: "맨 버서스 머신 커피 로스터스", en: "Man versus Machine Coffee", dk: "글로크엔바흐 힙스터 지구의 스페셜티 3세대 브루잉 커피 대표 로스터리", de: "Trendy specialty coffee roastery roaster serving outstanding flat whites" },
      { ko: "스위트 클럽 디저트 카페", en: "Sweet Club", dk: "마리엔 광장 인근의 아기자기한 프랑스풍 마카롱과 생과일 타르트 디저트 찻집", de: "Charming dessert boutique serving premium macarons and fruit tarts" },
      { ko: "카페 멜루", en: "Cafe Maelu", dk: "테아티너 거리에 위치한 보석같이 화려하고 독창적인 디자인 조각 케이크 명가", de: "Luxury patisserie famous for high-end glazed cakes and colorful treats" },
      { ko: "아란 카페", en: "Aran Cafe", dk: "테아티너호프 내 천연 사워도우 스프레드 빵과 오가닉 루이보스 티 전문점", de: "Cozy cafe famous for organic teas and fresh bread with savory spreads" },
      { ko: "브라운스 티 바", en: "Brown's Tea Bar", dk: "전 세계 다양한 잎차와 수제 영국식 스콘, 밀크티를 전문으로 제공하는 찻집", de: "Charming tea salon serving specialty loose-leaf teas and fresh scones" },
      { ko: "스테레오 카페", en: "Stereo Cafe", dk: "레지덴츠 궁전 맞은편 편집숍 2층에 숨겨진 조용하고 감각적인 로컬 아지트 카페", de: "Trendy hidden cafe on the second floor, overlooking the Residenz" }
    ]
  },
  prague: {
    lunch: [
      { ko: "로칼 들로우하아아", en: "Lokal Dlouhaaa", dk: "체코 프라하 최고의 신선한 필스너 우르켈 캔맥주와 체코 전통 등심 스테이크 런치", de: "Legendary long beer hall serving fresh tank Pilsner and beef in cream sauce" },
      { ko: "우 파를라멘투", en: "U Parlamentu", dk: "구시가지 골목의 현지인들로 가득한 가성비 정통 체코 굴라시와 감자 덤플링", de: "Cozy local tavern serving authentic beef goulash and potato dumplings" },
      { ko: "카페 루브르", en: "Cafe Louvre", dk: "1902년 개업하여 아인슈타인과 카프카가 토론하던 파스텔 핑크 테마의 역사적인 카페 식당", de: "Historic pastel-pink grand cafe and restaurant operating since 1902" },
      { ko: "나세 마소", en: "Nase Maso", dk: "정육점에서 즉석 구워주는 육즙 가득한 수제 햄버거와 체코식 고기 타르타르 런치", de: "Popular butcher shop grill famous for fresh beef burgers and meatloaf" },
      { ko: "시스터즈 비스트로", en: "Sisters Bistro", dk: "나세 마소 맞은편 체코식 오픈 샌드위치 오브로제니(Oblozene) 핑거푸드 런치", de: "Modern cafe specializing in traditional Czech open-faced sandwiches" },
      { ko: "우 메드비드쿠", en: "U Medvidku", dk: "1466년부터 양조를 해온 역사 속 체코 전통 맥주 브루어리와 족발 요리 꼴레뇨", de: "Historic brewery tavern serving traditional pork knuckle and dark beers" },
      { ko: "하벨스카 코루나", en: "Havelska Koruna", dk: "하벨시장 골목의 저렴하고 푸짐한 셀프 서비스 급식소 스타일 정통 체코 식당", de: "Traditional self-service cafeteria serving local dumplings and goulash" },
      { ko: "민코브나 레스토랑", en: "Mincovna", dk: "구시가지 광장 인근 세련된 구리 테마 인테리어의 현대식 체코 펍 요리와 맥주", de: "Modern Czech restaurant serving excellent duck legs and tank beers" },
      { ko: "콜코브나 첼니체", en: "Kolkovna Celnice", dk: "화약탑 인근 필스너 우르켈 공식 직영의 바삭하고 부드러운 오븐 꼴레뇨 닭날개 구이", de: "Popular restaurant famous for pork knuckles, wings, and fresh Pilsner" },
      { ko: "우 플레쿠", en: "U Fleku", dk: "1499년부터 500년 넘게 흑맥주를 직접 양조해 온 유서 깊은 야외 정원 비어홀", de: "Prague's oldest brewery tavern famous for its unique dark lager" }
    ],
    dinner: [
      { ko: "카페 임페리얼", en: "Cafe Imperial", dk: "화려한 100년 역사의 모자이크 타일 벽면 속 프라하 대표 아르데코 파인다이닝", de: "Breathtaking Art Deco grand cafe serving upscale traditional Czech classics" },
      { ko: "라 데구스타시옹", en: "La Degustation", dk: "19세기 체코 요리책 조리법을 현대적으로 승화한 미쉐린 1스타 파인다이닝", de: "Exquisite Michelin-starred contemporary Czech tasting menu experience" },
      { ko: "필드 레스토랑", en: "Field Restaurant", dk: "농장에서 갓 수확한 자연 재료의 거친 매력을 살린 세련된 미쉐린 스타 디너", de: "Innovative Michelin-starred dining showcasing seasonal natural flavors" },
      { ko: "캄파 파크", en: "Kampa Park", dk: "블타바 강가 카를교 바로 옆 테라스에서 강물과 불빛 야경을 보며 즐기는 스테이크", de: "Waterfront fine dining on Kampa Island next to the Charles Bridge" },
      { ko: "믈리네츠", en: "Mlynec", dk: "카를교 다리 아래 물이 흐르는 물레방아 소리를 들으며 즐기는 모던 체코 요리", de: "Modern Czech dining offering spectacular views of the illuminated bridge" },
      { ko: "벨뷰 레스토랑", en: "Bellevue", dk: "프라하 성의 아름다운 전경을 창 너머로 바라보며 즐기는 정교한 유럽식 디너", de: "Elegant dining room serving international cuisine with Prague Castle views" },
      { ko: "테라사 우 즐라테 스투드네", en: "Terasa u Zlate Studne", dk: "프라하 붉은 지붕들이 한눈에 펼쳐지는 성벽 위 럭셔리 루프탑 테라스 디너", de: "Breathtaking terrace restaurant offering panoramic views of the city" },
      { ko: "코토크루도 포시즌스", en: "CottoCrudo", dk: "포시즌스 호텔 내 블타바 강 야경을 내려다보며 즐기는 파인 이탈리안 해산물", de: "Chic Italian restaurant and raw bar overlooking the Vltava River" },
      { ko: "헤르게토바 치헬나", en: "Hergetova Cihelna", dk: "강변의 옛 기와공장을 개조해 카를교를 가장 정면에서 바라보는 야외 테라스 디너", de: "Spacious riverside restaurant with a terrace facing the Charles Bridge" },
      { ko: "블루 왜건", en: "Blue Wagon", dk: "구시가지 인근 현지인들 사이 가성비 좋은 현대식 유럽 요리 코스 맛집 저녁", de: "Cozy local favorite restaurant serving creative European tasting courses" }
    ],
    coffee: [
      { ko: "카페 루브르", en: "Cafe Louvre", dk: "1902년부터 파리지앵 스타일의 웅장한 천장 아래에서 즐기는 커피와 비엔나 멜랑주", de: "Historic grand cafe serving classic Viennese coffee and delicious cakes" },
      { ko: "카페 Savoy", en: "Cafe Savoy", dk: "화려한 네오르네상스 천장 아래 프라하 최고의 밀크 크림 케이크 베트르니크 맛집", de: "Beautiful historic cafe famous for gourmet breakfasts and Czech pastries" },
      { ko: "EMA 에스프레소 바", en: "EMA Espresso Bar", dk: "프라하 기차역 인근 미니멀하고 활기찬 분위기의 1세대 현대 스페셜티 카페", de: "Prague's favorite specialty coffee hub serving excellent flat whites" },
      { ko: "슈퍼 트램프 커피", en: "Super Tramp Coffee", dk: "구시가지 좁은 건물 통로 뒤 버려진 중세 정원 안 숨겨진 아날로그 감성 찻집", de: "Hidden courtyard cafe offering specialty filter coffee in a quiet yard" },
      { ko: "원십 커피", en: "Onesip Coffee", dk: "구시가지 유대인 지구 골목길 서서 마시는 아주 작지만 에스프레소 실력 최상인 카페", de: "Tiny, friendly espresso bar serving outstanding coffees and cookies" },
      { ko: "무이 살렉 카비", en: "Muj Salek Kavy", dk: "칼린 지구의 플라타너스 가로수 아래 야외 벤치가 운치 있는 브런치 로스터리 카페", de: "Popular roastery cafe in Karlin district serving outstanding breakfast" },
      { ko: "카페 드 파리 프라하", en: "Cafe du Paris", dk: "말라 스트라나 골목길 조용하고 고풍스러운 프랑스풍 노천 테이블 카페", de: "Charming French-style cafe serving excellent pastries in Lesser Town" },
      { ko: "카페 에벨", en: "Cafe Ebel", dk: "구시가지 성당 골목 안 작고 따뜻한 노란색 조명의 핸드드립 로컬 커피숍", de: "Cozy old-town cafe serving fresh roasted single-origin coffees" },
      { ko: "트리카페", en: "TriCafe", dk: "카를교 인근 골목길 편안한 가정집 거실 분위기의 빈티지 가구 디저트 카페", de: "Cozy living-room style cafe offering quiet space and homemade cakes" },
      { ko: "카페 임페리얼 커피숍", en: "Cafe Imperial", dk: "화려한 아르데코 모자이크 속 바삭한 크루아상과 정통 체코식 카푸치노 한 잔", de: "Enjoy fresh coffee and cakes in the historic mosaic-tiled grand salon" }
    ]
  },
  beijing: {
    lunch: [
      { ko: "다동 카오야 레스토랑", en: "Dadong Roast Duck Jinbao", dk: "대형 붉은 가마에서 구워 기름기를 뺀 베이징 최고의 오븐 카오야 점심", de: "Acclaimed roast duck dining famous for crispy skin and lean meat" },
      { ko: "만헝지 구러우점", en: "Manhengji Hotpot Gulou", dk: "구러우 뒷골목 구리 냄비에 숯을 넣어 끓이는 정통 노북경 맑은 탕 양고기 샤브샤브", de: "Legendary copper-pot hotpot eatery famous for thin sliced mutton" },
      { ko: "경풍 만두 왕푸징", en: "Qing Feng Steamed Dumpling", dk: "대통령도 방문했던 서민적인 정통 중국식 물만두와 찐만두 만두포자 전문점", de: "Historic popular chain serving traditional steamed pork buns" },
      { ko: "딘타이펑 베이징", en: "Din Tai Fung Beijing Mall", dk: "왕푸징 프리미엄 몰 내부의 얇은 피 샤오롱바오와 깔끔한 계란 볶음밥", de: "Reliable upscale Taiwanese restaurant serving fresh soup dumplings" },
      { ko: "금정헌 지단공원점", en: "Jin Ding Xuan Ditan", dk: "지단 공원 옆 24시간 화려한 등불 아래 즐기는 다채로운 광둥식 딤섬 점심", de: "Giant multi-story restaurant serving Cantonese dim sum 24/7" },
      { ko: "선라오만 만두", en: "Xian Lao Man", dk: "안딩먼 골목길 큼직하고 육즙 가득한 소고기 군만두와 꿔바로우 가성비 노포", de: "Local favorite restaurant famous for giant fried pork and leek dumplings" },
      { ko: "하이디라오 핫팟 왕푸징", en: "Haidilao Hotpot", dk: "극진한 서비스와 수십 가지 소스 바, 수타면 쇼가 펼쳐지는 정통 훠궈 런치", de: "Famous hotpot flagship restaurant offering outstanding service and noodle shows" },
      { ko: "외할머니댁 레스토랑", en: "Grandma's Home Beijing", dk: "합리적인 가격에 즐기는 달콤 짭조름한 항저우식 돼지고기 조림(동파육) 맛집", de: "Highly popular chain serving Hangzhou-style home comfort dishes" },
      { ko: "동래순 왕푸징", en: "Dong Lai Shun", dk: "1903년 창업하여 정통 이슬람식 청진 훠궈의 역사와 칼로 썬 양고기 명가", de: "Historic halal copper-pot hotpot restaurant operating since 1903" },
      { ko: "사계민복 카오야", en: "Siji Minfu Roast Duck", dk: "자금성 성곽길 옆 대기가 긴 번호표 맛집의 바삭한 정통 북경 오리구이", de: "Highly rated restaurant famous for classic roast duck with palace views" }
    ],
    dinner: [
      { ko: "성융싱 레스토랑", en: "Sheng Yong Xing Chaoyang", dk: "차오양구 고급 주택가 속 캐비어를 얹은 최고급 오리 껍질 카오야 디너 코스", de: "Michelin-starred premium roast duck paired with caviar and fine wine" },
      { ko: "킹스 조이 베이징", en: "King's Joy Yonghegong", dk: "용화궁 맞은편 안개 가득한 정원에서 즐기는 최고급 채식 파인다이닝 (3스타)", de: "Three-Michelin-starred elegant vegetarian dining near Lama Temple" },
      { ko: "TRB 후통 레스토랑", en: "TRB Hutong", dk: "600년 된 고대 불교 사원 건물을 리모델링한 방콕 스타일 현대 프렌치 디너", de: "Award-winning French fine dining set in a historic 600-year-old temple" },
      { ko: "채이선 포시즌스", en: "Cai Yi Xuan Four Seasons", dk: "포시즌스 호텔 내 화려한 현대식 광둥 요리와 해산물 제철 코스 저녁", de: "Upscale Cantonese dining holding one Michelin Star, in Liangmaqiao" },
      { ko: "컨트리 키친 로즈우드", en: "Country Kitchen Rosewood", dk: "로즈우드 호텔 내부 세련된 붉은 벽돌 공간에서 맛보는 노북경 오리구이", de: "Michelin-starred restaurant reinterpreting lost northern Chinese recipes" },
      { ko: "징 야 당 오포지트하우스", en: "Jing Yaa Tang", dk: "싼리툰 오포지트 하우스 지하 극장식 인테리어 속 미쉐린 1스타 베이징 카오야", de: "Sleek dining room serving outstanding roast duck and dim sum" },
      { ko: "메이드 인 차이나 그랜드하얏트", en: "Made in China Grand Hyatt", dk: "오픈 키친에서 불 쇼를 관람하며 먹는 품격 있는 중국 4대 요리 명가", de: "Famous open-kitchen restaurant serving authentic northern specialties" },
      { ko: "화가이원 귀가로점", en: "Huajia Yiyuan Guijie", dk: "홍등이 켜진 전통 사합원 마당에서 맛보는 매운 사천식 가재(마라롱샤) 요리", de: "Traditional courtyard restaurant serving spicy crayfish on Ghost Street" },
      { ko: "귀가 맛집 거리 투어", en: "Gui Jie Street Food Tour", dk: "붉은 전등 아래 수백 개 훠궈와 마라롱샤 식당이 불야성을 이루는 야간 미식", de: "Vibrant food street famous for spicy crayfish and late-night hotpots" },
      { ko: "템플 레스토랑 베이징", en: "Temple Restaurant Beijing (TRB)", dk: "자금성 인근 오래된 인쇄 공장을 세련되게 개조한 현대 미술품 가득한 프렌치", de: "Outstanding European dining set in a renovated industrial printing house" }
    ],
    coffee: [
      { ko: "플랫 화이트 카페 싼리툰", en: "Flat White Cafe", dk: "뉴질랜드와 호주식의 정통 에스프레소와 부드러운 우유 거품의 플랫화이트 전문점", de: "Specialty coffee shop serving rich flat whites and Western brunch" },
      { ko: "메탈 핸즈 우다오잉 후통", en: "Metal Hands Hutong", dk: "후통 골목길 한구석 수제 에스프레소 머신이 돋보이는 레트로 베이징 로컬 카페", de: "Trendy hutong cafe famous for dirty lattes and industrial design" },
      { ko: "솔로이스트 커피 Co. 대栅栏", en: "Soloist Coffee Co.", dk: "전문가용 기구와 빈티지 인더스트리얼 가구의 대형 3세대 스페셜티 로스터리", de: "Spacious multi-level cafe featuring vintage school desks and batch brews" },
      { ko: "보야지 커피 난뤄구샹", en: "Voyage Coffee Hutong", dk: "벽돌 벽면과 채광 좋은 유리 천장이 예쁜 난뤄구샹 후통 스페셜티 브루잉 바", de: "Minimalist brick-walled cafe focusing on high-quality pour-overs" },
      { ko: "베리 빈스 첸먼", en: "Berry Beans Qianmen", dk: "첸먼 후통 옛 가옥 옥상 테라스에서 자금성 기와지붕을 보며 마시는 시그니처 흑설탕 커피", de: "Rooftop cafe in a traditional courtyard house serving brown sugar latte" },
      { ko: "바리스타 스페셜티 우다오잉", en: "Barista Specialty Coffee", dk: "우다오잉 후통의 아주 작지만 바리스타들의 내공이 느껴지는 에스프레소 토닉 카페", de: "Tiny specialty coffee stand serving outstanding cold brew tonics" },
      { ko: "만 커피 조양공원", en: "Maan Coffee Chaoyang", dk: "넓고 아늑한 빈티지 가구와 다양한 빈티지 스탠드 조명의 와플 디저트 대형 카페", de: "Spacious local chain famous for delicious waffles and fruit teas" },
      { ko: "카페 드 라 포스트", en: "Cafe de la Poste Yonghegong", dk: "용화궁 근처 프랑스인들이 모여 맥주와 에스프레소를 즐기는 캐주얼 비스트로 카페", de: "Casual French-style corner cafe serving excellent espresso" },
      { ko: "알바 카페 구러우", en: "Alba Cafe Gulou", dk: "드럼타워가 보이는 루프탑 테라스에서 마시는 깔끔한 아이스 아메리카노와 와플", de: "Relaxed cafe with a rooftop deck overlooking the Drum Tower" },
      { ko: "자라 카페 후통", en: "Zarah Cafe", dk: "사합원을 모던하게 개조해 넓은 마당 정원과 라이브 DJ 음악이 있는 문화 카페", de: "Spacious renovated courtyard cafe serving organic teas and brunch" }
    ]
  },
  cairo: {
    lunch: [
      { ko: "아부 타렉", en: "Abou Tarek", dk: "카이로 중심가 5층 건물 전체를 쓰는 체코 전통 대표 스트리트 푸드 코샤리 원조 맛집", de: "Legendary multi-story restaurant serving Cairo's ultimate koshary bowl" },
      { ko: "나기브 마흐푸즈 카페", en: "Naguib Mahfouz Cafe", dk: "칸 엘 칼릴리 시장 안 노벨 문학상 작가의 이름을 딴 전통 에미리티 양고기 볶음 런치", de: "Historic restaurant in the bazaar serving traditional Egyptian stews" },
      { ko: "코샤리 엘 타흐리르", en: "Koshary El Tahrir", dk: "타흐리르 광장 인근 현지인들로 가득한 회전율 빠른 대중적 코샤리 전문점", de: "Popular local chain serving quick and delicious bowls of classic koshary" },
      { ko: "펠펠라 레스토랑", en: "Felfela Downtown", dk: "1959년 개업하여 동굴 같은 특이한 인테리어 속 이집트 전통 타메야(팔라펠) 맛집", de: "Historic downtown restaurant serving traditional fava bean ta'ameya" },
      { ko: "주바 카이로", en: "Zooba Zamalek", dk: "자말렉 섬의 세련되고 힙한 네온 인테리어 속 현대식 이집트 스트리트 푸드 델리", de: "Trendy colorful eatery serving modern versions of Egyptian street food" },
      { ko: "카자즈 다운타운", en: "Kazaz Restaurant", dk: "다운타운 중심가 직장인들이 줄 서는 중동식 샤와르마 샌드위치 가성비 식당", de: "Bustling fast-casual restaurant famous for lamb shawarma wraps" },
      { ko: "가드 레스토랑", en: "Gad Restaurant Giza", dk: "기자 피라미드 초입 근처에서 맛보는 전통 아랍 플랫브레드와 케밥 런치", de: "Reliable popular chain serving fresh flatbreads and grilled meats" },
      { ko: "소브히 카베르", en: "Sobhy Kaber", dk: "카이로 외곽 대형 야외 테이블에서 줄 서서 먹는 이집트 전통 몰로키아 수프와 갈비구이", de: "Massive local favorite restaurant famous for molokhia and beef ribs" },
      { ko: "케브데 엘 프린스", en: "Kebdet El Prince", dk: "임바바 지구 서민적인 골목길 양고기 간 볶음 요리로 가장 핫한 대중 식당", de: "Famous local eatery specializing in spiced beef liver and rice plates" },
      { ko: "안드레아 마리우테야", en: "Andrea Mariouteya New Giza", dk: "뉴 기자 언덕 위에서 카이로 시내를 보며 먹는 전통 숯불 허브 닭구이 런치", de: "Scenic outdoor restaurant serving legendary charcoal-grilled chicken" }
    ],
    dinner: [
      { ko: "아부 엘 시드", en: "Abou El Sid Zamalek", dk: "1930년대 카이로 귀족 대저택 분위기 속 정통 비둘기 구이와 이집트 와인 디너", de: "Atmospheric restaurant serving premium stuffed pigeon and tagines" },
      { ko: "시코이아 라운지", en: "Sequoia Nile", dk: "나일강 물 바로 옆 오픈 테라스에서 강바람을 맞으며 맛보는 고급 메제 타파스 디너", de: "Waterside open-air restaurant on the tip of Zamalek, serving Mezze" },
      { ko: "더 블루 레스토랑", en: "The Blue Restaurant Kempinski", dk: "가든 시티 켐핀스키 호텔 내 나일강 야경을 보며 즐기는 고품격 중동식 파인다이닝", de: "Elegant dining room overlooking Nile River night views at Kempinski" },
      { ko: "지투니 레스토랑", en: "Zitouni Four Seasons", dk: "포시즌스 호텔 3층 나일강 뷰와 함께하는 최고급 이집트 왕실 요리 뷔페 디너", de: "Luxury Middle Eastern buffet overlooking the Nile at Four Seasons" },
      { ko: "크림슨 바 & 그릴 루프탑", en: "Crimson Bar & Grill Rooftop", dk: "자말렉 섬 고층 루프탑에서 나일강 다리와 도시 야경을 보며 먹는 스테이크", de: "Stunning rooftop grill and bar offering panoramic Nile night views" },
      { ko: "사치 헬리오폴리스", en: "Sachi Heliopolis", dk: "헬리오폴리스 고급 지구에 위치한 현대식 아시안 퓨전 일식 사시미 와인 디너", de: "Trendy upscale restaurant serving Mediterranean-Asian fusion dining" },
      { ko: "오스만리 레스토랑", en: "Osmanly Restaurant", dk: "켐핀스키 호텔 내부 오스만 제국 황실 스타일의 격조 높은 탄두리 디너 코스", de: "Premium restaurant serving Ottoman imperial recipes and grilled meats" },
      { ko: "피에르 88 나일강 크루즈", en: "Pier 88 Nile River", dk: "나일강에 정박한 럭셔리 보트 내부 세련된 통창 유리창의 파인 이탈리안 디너", de: "Chic Italian dining set inside a luxury yacht docked on the Nile" },
      { ko: "케밥지 그랜드나일", en: "Kebabgy Sofitel", dk: "소피텔 호텔 나일강변 정원에서 숯불에 직접 구워내는 양갈비와 전통 아랍 디너", de: "Waterside garden grill serving premium charcoal-grilled lamb chops" },
      { ko: "회전 레스토랑 그랜드나일", en: "Revolving Restaurant Grand Nile Tower", dk: "카이로 랜드마크 타워 꼭대기 회전하며 피라미드와 나일강 야경을 즐기는 식당", de: "Slowly rotating restaurant offering 360-degree views of Cairo and Giza" }
    ],
    coffee: [
      { ko: "엘 피샤위 카페", en: "El Fishawy Cafe", dk: "칸 엘 칼릴리 시장 내 240년 역사의 거울과 구리 장식으로 뒤덮인 카이로 최고 다방", de: "Cairo's most famous historic coffee house serving mint tea since 1773" },
      { ko: "나기브 마흐푸즈 티룸", en: "Naguib Mahfouz Tea Room", dk: "시장 안 아늑한 실내 에어컨 룸에서 마시는 정통 아랍 커피와 터키식 디저트", de: "Elegant air-conditioned tearoom inside Khan el-Khalili bazaar" },
      { ko: "카페 리셰 다운타운", en: "Cafe Riche", dk: "1908년 개업하여 혁명가들과 지식인들이 모여 모의를 하던 역사 박물관 같은 카페", de: "Historic downtown cafe featuring vintage photos and classic espresso" },
      { ko: "그로피 카페 다운타운", en: "Groppi Cafe", dk: "1890년대 스위스 파티시에가 세운 카이로의 전설적인 디저트 살롱 노포", de: "Historic Belle Epoque cafe famous for its chocolate and pastries" },
      { ko: "비아노스 카페 자말렉", en: "Beano's Cafe Zamalek", dk: "자말렉 주택가 골목길의 깔끔하고 현대적인 이집트 로컬 프랜차이즈 커피숍", de: "Popular local coffee chain serving excellent iced coffees and pastries" },
      { ko: "실란트로 카페 다운타운", en: "Cilantro Cafe", dk: "타흐리르 광장 인근의 캐주얼하고 조용한 분위기 속 스페셜티 에스프레소 바", de: "Cozy local cafe chain offering specialty brews and fresh wraps" },
      { ko: "브라운 노즈 커피", en: "Brown Nose Coffee Heliopolis", dk: "헬리오폴리스의 감각적인 인테리어와 에스프레소 토닉 전문 스페셜티 로스터리", de: "Trendy third-wave coffee shop serving outstanding single-origin pour-overs" },
      { ko: "에스프레소 랩 카이로", en: "Espresso Lab Cairo Mall", dk: "대형 몰 내부의 실험실 컨셉 브루잉 도구 가득한 스페셜티 커피 바", de: "Modern cafe specializing in syphon and cold drip extraction methods" },
      { ko: "포터리 카페 자말렉", en: "Pottery Cafe", dk: "나일강변 근처의 나무 그늘 아래 야외 테이블에서 마시는 카푸치노와 케이크", de: "Relaxed neighborhood cafe serving fresh coffee, juice, and light bites" },
      { ko: "해리스 카페 헬리오폴리스", en: "Harris Cafe", dk: "조용한 골목길의 고풍스러운 영국식 티룸 감성의 밀크티와 스콘 디저트 찻집", de: "Charming Victorian-style cafe serving loose-leaf teas and baked goods" }
    ]
  },
  rio: {
    lunch: [
      { ko: "바 도 미네이루", en: "Bar do Mineiro", dk: "산타 테레사 언덕 위 골목의 브라질 전통 검은콩 고기 스튜 페이조아다 맛집", de: "Famous local tavern in Santa Teresa serving authentic feijoada stew" },
      { ko: "세르반테스 코파카바나", en: "Cervantes Copacabana", dk: "코파카바나 해변 인근 구운 파인애플을 넣은 두툼한 삼겹살 스테이크 샌드위치", de: "Legendary late-night sandwich shop famous for pork and pineapple buns" },
      { ko: "비비 수코스 코파카바나", en: "Bibi Sucos", dk: "해변가에서 즐기는 신선한 열대 아사이볼과 브라질 대표 탄산음료 과라나 주스", de: "Popular juice bar chain serving fresh acai bowls and tropical shakes" },
      { ko: "TT 버거 레블론", en: "TT Burger", dk: "브라질 미쉐린 스타 셰프 클로드 트로와그로가 만든 수제 과바 젤리 소스 버거", de: "Acclaimed gourmet burger joint featuring unique guava-ketchup sauce" },
      { ko: "브라세이루 다 가베아", en: "Braseiro da Gavea", dk: "가베아 지구의 시끌벅적한 로컬 식당 그릴에 구운 소시지와 피카냐 스테이크", de: "Bustling traditional steakhouse serving grilled sausages and picanha cuts" },
      { ko: "아프라지벨", en: "Aprazivel Santa Teresa", dk: "산타 테레사 언덕 위 열대 정원 방갈로에서 즐기는 지중해식 브라질 전통 요리", de: "Stunning treetop restaurant serving organic Brazilian dishes with views" },
      { ko: "타카카 도 노르테", en: "Tacaca do Norte", dk: "플라멩구 지구 북부 아마존 식재료로 만든 새콤하고 매콤한 타카카 국물 수프", de: "Local counter diner famous for amazon-style shrimp soup and acai" },
      { ko: "가로타 데 이파네마", en: "Garota de Ipanema", dk: "보사노바 명곡 '이파네마의 소녀'가 작사된 역사적인 음악가 단골 레스토랑", de: "The historic restaurant where the famous Bossa Nova song was written" },
      { ko: "굴라 굴라 레블론", en: "Gula Gula", dk: "레블론 쇼핑가 인근의 깨끗하고 건강한 브라질식 퓨전 샐러드 파스타 런치", de: "Charming casual eatery serving healthy contemporary Brazilian dishes" },
      { ko: "아미르 레스토랑", en: "Amir Restaurant Copacabana", dk: "코파카바나 광장 인근 중동 레바논 이민자들이 운영하는 팔라펠 홈무스 런치", de: "Excellent Middle Eastern restaurant serving fresh kebabs and hummus" }
    ],
    dinner: [
      { ko: "오테케 레스토랑", en: "Oteque Botafogo", dk: "알베르토 란도그라프 셰프의 미쉐린 2스타 현대식 해산물 파인다이닝", de: "Exquisite two-Michelin-starred contemporary seafood-focused dining" },
      { ko: "라사이 레스토랑", en: "Lasai Botafogo", dk: "셰프 하파 코스타의 자체 오가닉 농장 채소를 사용하는 미쉐린 스타 디너 코스", de: "Michelin-starred dining set in a historic house, with farm-to-table focus" },
      { ko: "마리우스 데구스타레", en: "Marius Degustare", dk: "코파카바나 해변 끝 바이킹 해적선 컨셉의 화려한 슈하스코 고기 해산물 뷔페", de: "Unique maritime-themed restaurant serving premium grilled meats" },
      { ko: "사티리콘 해산물 식당", en: "Satyricon Ipanema", dk: "이파네마 고급 주거단지 내 신선한 통 생선 얼음 진열대 소금구이 전문점", de: "High-end Mediterranean seafood dining house serving whole baked fish" },
      { ko: "오로 레스토랑", en: "Oro Restaurant Leblon", dk: "펠리페 브론즈 셰프의 현대 브라질 아방가르드 숯불 파인다이닝 (미쉐린 2스타)", de: "Two-Michelin-starred progressive Brazilian cuisine cooked over fire" },
      { ko: "슈하스카리아 팰리스", en: "Churrascaria Palace", dk: "1951년 코파카바나에 문을 연 로컬 음악가들의 성지 전통 슈하스코 코스", de: "Historic churrascaria serving dozens of cuts of spit-roasted meats" },
      { ko: "포고 데 차오 보타포고", en: "Fogo de Chao", dk: "보타포고 만의 웅장한 빵드아수카르 야경을 보며 즐기는 브라질 대표 슈하스코", de: "Premium steakhouse overlooking Botafogo Bay and Sugarloaf Mountain" },
      { ko: "CT 부셰리 레블론", en: "CT Boucherie", dk: "트로와그로 형제 셰프가 운영하는 프렌치 스타일 프리미엄 스테이크 비스트로", de: "French-style steakhouse serving prime beef cut with endless side dishes" },
      { ko: "주세페 그릴 센트로", en: "Giuseppe Grill", dk: "리오 금융가 중심의 클래식 목조 공간의 드라이에이징 소고기 전문점 저녁", de: "Acclaimed downtown steakhouse famous for aged beef cuts and wine cellar" },
      { ko: "미 레스토랑 코파카바나팰리스", en: "Mee Belmond Copacabana Palace", dk: "최고급 벨몬드 호텔 내부의 미쉐린 스타 현대식 아시안 퓨전 일식 디너 코스", de: "Sophisticated pan-Asian fine dining located in the historic palace hotel" }
    ],
    coffee: [
      { ko: "콘페이타리아 콜롬보 센트로", en: "Confeitaria Colombo", dk: "1894년 문을 열어 거대한 유럽식 거울과 화려한 천장 아치형 글라스의 역사 티하우스", de: "Rio's grand historic coffee palace featuring Belgian stained glass and mirrors" },
      { ko: "카페 도 포르테", en: "Cafe do Forte Copacabana", dk: "코파카바나 요새 내부 절벽에서 파도 소리를 들으며 콜롬보 빵과 커피를 즐기는 곳", de: "Scenic cafe set inside the Copacabana Fort, overlooking the entire beach" },
      { ko: "플라주 카페 라주", en: "Plage Cafe Parque Lage", dk: "예술학교 중앙 중정 에메랄드빛 수영장 바로 옆 예수상을 보며 마시는 라떼", de: "Stunning cafe set next to the pool inside the historic mansion at Parque Lage" },
      { ko: "엠포리오 자르딤 보타니코", en: "Emporio Jardim", dk: "식물원 인근 전 세계 빵 순례자들이 찾는 브라질 베스트 브런치 카페", de: "Award-winning bakery cafe serving highly custom French-Brazilian breakfasts" },
      { ko: "쿨티바르 이파네마", en: "Cultivar Ipanema", dk: "이파네마 골목길 브라질 전통 타피오카 빵 폼데케주와 시원한 마테차 한 잔", de: "Cozy local cafe famous for fresh pão de queijo and organic mate tea" },
      { ko: "카페 두 라주", en: "Cafe du Lage", dk: "울창한 국립공원 숲 속 옛 저택 안 그늘 아래 조용하고 이색적인 커피 테라피", de: "Charming rainforest-framed coffee shop situated in the Parque Lage grounds" },
      { ko: "크라프트 카페 이파네마", en: "Kraft Cafe Ipanema", dk: "호주 멜버른 스타일 스페셜티 에스프레소와 아침 아보카도 토스트 브런치", de: "Specialty coffee shop serving rich flat whites and vegan-friendly bites" },
      { ko: "바스타르다 커피 자르딤보타니코", en: "Bastarda Coffee", dk: "식물원 옆 자전거 라이더들의 성지이자 묵직한 더블 에스프레소 샷 라떼 맛집", de: "Cool cycling-themed cafe offering strong cold brews and energy snacks" },
      { ko: "카페 세크레토 라르고마샤도", en: "Cafe Secreto", dk: "주택가 안뜰 좁은 통로 속 나만 알고 싶은 아기자기한 브루잉 로컬 에스프레소 바", de: "Hidden courtyard espresso bar serving outstanding batch brews" },
      { ko: "소피텔 카페 이파네마", en: "Sofitel Cafe", dk: "이파네마 해변 바로 앞 고급 호텔 로비의 세련되고 단정한 뷰 카페", de: "Chic oceanview cafe serving premium coffee and French pastries" }
    ]
  },
  vancouver: {
    lunch: [
      { ko: "잼 카페 가스타운", en: "Jam Cafe Gastown", dk: "가스타운의 엄청난 대기 줄을 자랑하는 푸짐한 미국식 Eggs Benedict 브런치 맛집", de: "Highly popular rustic diner famous for massive portions of eggs benedict" },
      { ko: "미트 & 브레드", en: "Meat & Bread Gastown", dk: "바삭하게 구운 이탈리아식 포르케타 롤 샌드위치와 겨자 소스 테이크아웃 런치", de: "Trendy sandwich shop famous for its crispy sliced pork belly porchetta rolls" },
      { ko: "카페 메디나 다운타운", en: "Cafe Medina", dk: "지중해풍 샤크슈카(에그인헬) 요리와 달콤한 벨기에식 와플이 가장 유명한 브런치 맛집", de: "Acclaimed Mediterranean brunch spot famous for lavender lattes and waffles" },
      { ko: "타코피노 가스타운", en: "Tacofino Taco Bar", dk: "Jordy 셰프의 바삭한 생선 튀김 피시 타코와 멕시칸 수제 나초 칩 런치", de: "Hip Gastown taco bar serving outstanding Pacific cod fish tacos" },
      { ko: "비즈 레스토랑", en: "Vij's Restaurant", dk: "벤쿠버의 캐주얼하고 대중적인 인도식 버터 치킨 커리와 갈릭 화덕 난 점심", de: "Famous Indian dining outlet serving lamb chops and rich coconut curries" },
      { ko: "칵투스 클럽 카페", en: "Cactus Club Cafe Coal Harbour", dk: "콜 하버 바닷가 테라스에서 설산을 보며 먹는 연어 버거와 시저 샐러드", de: "Modern waterfront bistro serving local salmon burgers and craft beers" },
      { ko: "프놈펜 레스토랑", en: "Phnom Penh", dk: "차이나타운에 위치한 캄보디아/베트남식 버터 닭날개 튀김과 쇠고기 락사 맛집", de: "Legendary local eatery famous for crispy garlic chicken wings and beef luc lac" },
      { ko: "아스크 포 루이지", en: "Ask for Luigi", dk: "가스타운 인근 한적한 주택가 모퉁이의 미니멀 생면 파스타 웨이팅 노포", de: "Cozy neighborhood trattoria serving outstanding handmade fresh pasta" },
      { ko: "구우 위드 갈릭", en: "Guu with Garlic Robson", dk: "롭슨 스트리트의 활기찬 일본식 퓨전 타파스 이자카야 런치", de: "Lively Robson Street izakaya serving Japanese-style tapas and draft beer" },
      { ko: "진야 라멘 바 다운타운", en: "Jinya Ramen Bar", dk: "진하고 걸쭉한 돈코츠 차슈 라멘과 바삭한 크리스피 만두 런치", de: "Sleek modern ramen bar serving rich pork bone broth noodles" }
    ],
    dinner: [
      { ko: "블루 워터 카페", en: "Blue Water Cafe", dk: "예일타운 랜드마크 붉은 벽돌 건물의 최고급 태평양 해산물 랍스터 플래터 디너", de: "Widely regarded as Vancouver's best seafood restaurant, in Yaletown" },
      { ko: "친친 리스토란테", en: "CinCin Ristorante", dk: "롭슨 스트리트 2층 테라스의 거대한 참나무 화덕 우드파이어 이탈리안 다이닝", de: "Elegant second-floor dining room serving wood-fired Italian classics" },
      { ko: "호크스워스 레스토랑", en: "Hawksworth Restaurant", dk: "로즈우드 호텔 내부 데이비드 호크스워스 셰프의 고품격 캐나다 현대식 파인다이닝", de: "Sophisticated award-winning fine dining inside the Rosewood Hotel Georgia" },
      { ko: "르 크로코딜", en: "Le Crocodile", dk: "30년 넘게 벤쿠버 정통 프랑스 요리의 기준을 지켜온 격조 높은 미쉐린 스타 프렌치", de: "Legendary elegant French restaurant serving classic escargots and duck" },
      { ko: "미쿠 벤쿠버", en: "Miku Vancouver", dk: "콜 하버 캐나다 플레이스 바로 옆 하버 뷰 테라스의 하코즈시 아부리 스시 디너 코스", de: "Upscale waterfront dining famous for its flame-seared Aburi salmon sushi" },
      { ko: "조 포티스 시푸드", en: "Joe Fortes Seafood", dk: "1985년부터 이어진 시내 중심의 루프탑 가든 야외 바와 신선한 굴 굴타워 디너", de: "Iconic oyster bar and chop house featuring a rooftop garden terrace" },
      { ko: "살몬 하우스 온 더 힐", en: "Salmon House on the Hill", dk: "웨스트 밴쿠버 산등성이에서 밴쿠버 다운타운 바다 전망을 내려다보며 먹는 태평양 최고급 연어 구이", de: "Scenic mountaintop restaurant serving alderwood-grilled wild salmon" },
      { ko: "보타니스트 레스토랑", en: "Botanist Restaurant", dk: "페어몬트 퍼시픽 림 호텔 내 유리 식물원 테마 현대 캐나다 요리 파인다이닝", de: "Stunning botanic-themed dining room serving creative local cuisine" },
      { ko: "나이팅게일 레스토랑", en: "Nightingale", dk: "CBD 중심가 역사 빌딩 내 화려하고 캐주얼한 현대식 캐나다 그릴 펍 저녁", de: "Chic two-story space serving wood-fired pizzas and local vegetables" },
      { ko: "라바투아 레스토랑", en: "L'Abattoir Gastown", dk: "가스타운의 고풍스러운 벽돌 공간 속 프렌치 터치의 현대식 캐나다 요리 디너", de: "Refined French-inspired West Coast dining in a historic Gastown brick building" }
    ],
    coffee: [
      { ko: "리볼버 커피 가스타운", en: "Revolver Coffee", dk: "가스타운의 빈티지 벽돌 공간에서 전 세계 다양한 원두의 핸드드립 비교 시음 전문 카페", de: "Gastown specialty coffee hub famous for pour-over flights and flights" },
      { ko: "49th 패럴렐 커피 로스터스", en: "49th Parallel Coffee Roasters", dk: "키칠라노 해변 인근의 민트 그린 컵과 달콤한 럭키 래빗 도넛 베이커리 카페", de: "Popular local roaster famous for fresh artisan Lucky's Doughnuts" },
      { ko: "매치스틱 커피 차이나타운", en: "Matchstick Coffee", dk: "원목 감성의 조용하고 넓은 테이블 공간의 싱글 오리진 에스프레소 카페", de: "Spacious wooden interior cafe serving organic coffee and fresh pastries" },
      { ko: "팀버트레인 커피 로스터스", en: "Timbertrain Coffee Roasters", dk: "가스타운의 19세기 벽돌 건물 속 기차 객실 칸 인테리어 드립 커피숍", de: "Charming Gastown cafe featuring train-cabin style booths and filter brews" },
      { ko: "엘리시안 커피 브로드웨이", en: "Elysian Coffee Broadway", dk: "시내 외곽의 조용한 주택가 앞바다 근처 스페셜티 3세대 로컬 드립 카페", de: "Specialty coffee roaster serving sweet, clean, and complex single-origin cups" },
      { ko: "네메시스 커피 개스타운", en: "Nemesis Coffee Gastown", dk: "붉은 꽃 문양의 지붕 외관 속 크루아상 샌드위치가 맛있는 힙스터 로컬 카페", de: "Modern chic cafe famous for high-quality espresso and artisan croissants" },
      { ko: "프라도 카페 로브슨", en: "Prado Cafe Robson", dk: "롭슨 스트리트 가로수 아래 야외 테이블에서 마시는 바리스타 챔피언 라떼", de: "Friendly neighborhood cafe serving outstanding flat whites and muffins" },
      { ko: "카페 메디나 와플 바", en: "Cafe Medina Waffle", dk: "메디나 입구 테이크아웃 창구에서 갓 구운 벨기에 와플과 라벤더 시럽 티 카페", de: "Grab-and-go kiosk serving fresh warm Belgian waffles and rich lattes" },
      { ko: "빈 어라운드 더 월드", en: "Bean Around the World", dk: "가스타운 역사 지구의 오래된 목조 가구와 유기농 드립 커피 전문 노포", de: "Rustic coffee shop featuring organic fair-trade coffee and vintage design" },
      { ko: "JJ 빈 커피 로스터스", en: "JJ Bean Coffee Roasters", dk: "밴쿠버 전역에 위치한 대중적이고 믿음직한 에스프레소와 머핀 로컬 체인", de: "Reliable local coffee chain roasting organic beans in small batches" }
    ]
  }
};

const getCityMealFallback = (cityId, cityNameKo, cityNameEn, mealType, idx, visitedNames) => {
  const cityData = CITY_RESTAURANTS[cityId];
  let pool = [];
  if (cityData) {
    pool = cityData[mealType] || cityData.lunch || [];
  }
  
  // Find an unvisited one in the city-specific pool first
  let selectedItem = null;
  for (let i = 0; i < pool.length; i++) {
    const item = pool[i];
    if (item && item.ko && (!visitedNames || !visitedNames.has(item.ko))) {
      selectedItem = item;
      break;
    }
  }
  
  // Do not use a global restaurant/cafe pool here; it may not exist in the selected city.
  
  if (selectedItem) {
    return {
      name_ko: selectedItem.ko,
      name_en: selectedItem.en,
      desc_ko: selectedItem.dk,
      desc_en: selectedItem.de,
      isFallback: true,
      open: mealType === 'coffee' ? 480 : (mealType === 'dinner' ? 1080 : 660),
      close: mealType === 'coffee' ? 1320 : (mealType === 'dinner' ? 1440 : 1320)
    };
  }
  
  // If all are exhausted, return a generic rest/free meal block
  return {
    name_ko: mealType === 'coffee' ? "자유시간 및 휴식" : "자유시간 및 식사",
    name_en: mealType === 'coffee' ? "Free Time & Rest" : "Free Time & Meal",
    desc_ko: mealType === 'coffee' ? "일정 사이에 갖는 여유로운 자유 시간 및 개별 휴식" : "주변 식당에서 자유로운 개별 식사",
    desc_en: mealType === 'coffee' ? "Enjoy a relaxing free time and personal rest between schedules." : "Enjoy individual dining at a nearby restaurant.",
    isFallback: true,
    isRest: true,
    open: 0,
    close: 1440
  };
};

const CITY_CLUSTERS = {
  seoul: [
    { name_ko: "종로/명동 (시내 중심)", name_en: "Jongno/Myeongdong (Center)", keywords: ["경복궁", "북촌", "인사동", "창덕궁", "명동", "남산", "인왕산", "광장시장", "익선", "Gyeongbokgung", "Bukchon", "Insadong", "Changdeokgung", "Myeongdong", "Namsan", "Inwangsan", "Gwangjang", "Ikseon"], x: 126.9780, y: 37.5665 },
    { name_ko: "성수/DDP (동부)", name_en: "Seongsu/DDP (East)", keywords: ["성수", "서울숲", "뚝섬", "동대문", "DDP", "신당동", "Seongsu", "Seoul Forest", "Ttukseom", "Dongdaemun", "Sindang"], x: 127.0565, y: 37.5370 },
    { name_ko: "잠실 (동남부)", name_en: "Jamsil (Southeast)", keywords: ["잠실", "롯데월드", "Jamsil", "Lotte World"], x: 127.1245, y: 37.5113 },
    { name_ko: "홍대/망원 (서부)", name_en: "Hongdae/Mangwon (West)", keywords: ["홍대", "망원", "Hongdae", "Mangwon"], x: 126.9230, y: 37.5560 },
    { name_ko: "강남/신사 (남부)", name_en: "Gangnam/Sinsa (South)", keywords: ["신사", "가로수길", "강남", "Sinsa", "Garosu", "Gangnam"], x: 127.0225, y: 37.5215 },
    { name_ko: "용산 (중남부)", name_en: "Yongsan (Center-South)", keywords: ["박물관", "Museum", "Yongsan", "용산"], x: 126.9790, y: 37.5325 },
    { name_ko: "여의도 (서중부)", name_en: "Yeouido (West-Center)", keywords: ["여의도", "더현대", "Yeouido", "Hyundai"], x: 126.9215, y: 37.5255 }
  ],
  jeju: [
    { name_ko: "제주시/공항 (북부)", name_en: "Jeju City/Airport (North)", keywords: ["공항", "동문", "용두암", "Airport", "Dongmun", "Yongduam", "보말"], x: 126.4930, y: 33.5113 },
    { name_ko: "동부 (성산/월정리)", name_en: "East (Seongsan/Woljeongri)", keywords: ["성산", "우도", "월정리", "평대리", "사려니", "비자림", "함덕", "김녕", "벙커", "민속마을", "Seongsan", "Udo", "Woljeongri", "Pyeongdae", "Saryeoni", "Bijarim", "Hamdeok", "Gimnyeong", "Bunker", "Seongeup"], x: 126.9279, y: 33.4580 },
    { name_ko: "남부 (서귀포)", name_en: "South (Seogwipo)", keywords: ["서귀포", "이중섭", "쇠소깍", "올레시장", "천지연", "정방", "민속촌", "Seogwipo", "Lee Jung-seop", "Soesokkak", "Olle Market", "Cheonjiyeon", "Jeongbang", "Folk Village"], x: 126.5601, y: 33.2541 },
    { name_ko: "서부 (애월/협재)", name_en: "West (Aewol/Hyeopjae)", keywords: ["애월", "협재", "한담", "미술관", "Hyeopjae", "Aewol", "Handam", "Contemporary Art", "저지"], x: 126.2390, y: 33.3940 },
    { name_ko: "남서부 (중문/오설록)", name_en: "Southwest (Jungmun/O'sulloc)", keywords: ["중문", "오설록", "산방산", "카멜리아", "송악산", "Jungmun", "O'sulloc", "Sanbangsan", "Camellia", "Songaksan"], x: 126.2894, y: 33.2513 }
  ],
  tokyo: [
    { name_ko: "신주쿠 (서부)", name_en: "Shinjuku/West", keywords: ["신주쿠", "시모키타자와", "Shinjuku", "Shimokitazawa"], x: 139.6917, y: 35.6895 },
    { name_ko: "시부야/하라주쿠 (남서부)", name_en: "Shibuya/Harajuku/Southwest", keywords: ["시부야", "하라주쿠", "메이지", "Shibuya", "Harajuku", "Meiji"], x: 139.7016, y: 35.6580 },
    { name_ko: "도쿄역/긴자/츠키지 (동부)", name_en: "Tokyo Station/Ginza/Tsukiji", keywords: ["도쿄역", "긴자", "츠키지", "도쿄 타워", "도쿄타워", "가부키자", "Tokyo Station", "Ginza", "Tsukiji", "Tokyo Tower", "Kabukiza"], x: 139.7671, y: 35.6812 },
    { name_ko: "아사쿠사/우에노 (북동부)", name_en: "Asakusa/Ueno/Northeast", keywords: ["아사쿠사", "우에노", "센소지", "스카이트리", "아키하바라", "야네센", "박물관", "Asakusa", "Ueno", "Sensoji", "Skytree", "Akihabara", "Yanesen", "Edo-Tokyo"], x: 139.7967, y: 35.7148 },
    { name_ko: "오다이바/롯폰기 (남동부)", name_en: "Odaiba/Roppongi/Southeast", keywords: ["오다이바", "롯폰기", "토요스", "팀랩", "하네다", "Odaiba", "Roppongi", "Toyosu", "teamLab", "Haneda"], x: 139.7764, y: 35.6264 },
    { name_ko: "디즈니/치바 (극동부)", name_en: "Disney/Chiba (Far East)", keywords: ["디즈니", "Disney", "Disneyland"], x: 139.8804, y: 35.6329 }
  ],
  osaka: [
    { name_ko: "난바/도톤보리 (남부)", name_en: "Namba/Dotonbori (South)", keywords: ["난바", "도톤보리", "신세카이", "하루카스", "구로몬", "텐노지", "쯔텐카쿠", "덴덴타운", "시텐노지", "스미요시", "신사이바시", "우키요에", "분라쿠", "오렌지", "스파월드", "Namba", "Dotonbori", "Shinsekai", "Harukas", "Kuromon", "Tennoji", "Tsutenkaku", "Den Den Town", "Shitennoji", "Sumiyoshi", "Shinsaibashi", "Ukiyoe", "Bunraku", "Orange Street", "Spa World"], x: 135.5013, y: 34.6687 },
    { name_ko: "우메다 (북부)", name_en: "Umeda (North)", keywords: ["우메다", "공중정원", "헵파이브", "나카노시마", "미노오", "한신", "Umeda", "Floating Garden", "Hep Five", "Nakanoshima", "Minoo", "Hanshin"], x: 135.4959, y: 34.7025 },
    { name_ko: "오사카성 (동부)", name_en: "Osaka Castle (East)", keywords: ["오사카성", "주택박물관", "Osaka Castle", "Housing Museum"], x: 135.5262, y: 34.6873 },
    { name_ko: "베이 에어리어 (서부)", name_en: "Bay Area (West)", keywords: ["유니버셜", "덴포잔", "가이유칸", "산타마리아", "Universal", "Tempozan", "Kaiyukan", "Santa Maria", "린쿠", "Rinku"], x: 135.4304, y: 34.6431 }
  ],
  paris: [
    { name_ko: "에펠탑/센강 (서부)", name_en: "Eiffel/Seine (West)", keywords: ["에펠탑", "바토무슈", "센강", "Eiffel", "Bateaux", "Seine", "셰익스피어"], x: 2.2945, y: 48.8584 },
    { name_ko: "루브르/시내 중심 (중부)", name_en: "Louvre/Center", keywords: ["루브르", "오르세", "퐁피두", "노트르담", "마레", "시테", "튈르리", "룩셈부르크", "Louvre", "Orsay", "Pompidou", "Notre", "Marais", "Cite", "Tuileries", "Luxembourg", "안젤리나", "플로르", "생제르맹", "샤르티에", "생트샤펠", "카타콤", "Angelina", "Germain", "Chartier", "Sainte-Chapelle", "Catacombs"], x: 2.3376, y: 48.8606 },
    { name_ko: "몽마르뜨 (북부)", name_en: "Montmartre (North)", keywords: ["몽마르뜨", "사크레", "사랑해", "Montmartre", "Sacre", "Je t'aime", "마르탱", "생마르탱", "Saint-Martin", "투앙"], x: 2.3431, y: 48.8867 },
    { name_ko: "샹젤리제 (북서부)", name_en: "Champs-Elysees (Northwest)", keywords: ["샹젤리제", "개선문", "오페라 가르니에", "Champs", "Arc de", "Opera Garnier", "라파예트", "Lafayette"], x: 2.2950, y: 48.8738 },
    { name_ko: "베르사유 (극서부)", name_en: "Versailles (Far West)", keywords: ["베르사유", "Versailles"], x: 2.1301, y: 48.8014 },
    { name_ko: "마른라발레/디즈니랜드 (극동부)", name_en: "Marne-la-Vallee (Far East)", keywords: ["디즈니", "라발레", "Disney", "Vallee", "Disneyland"], x: 2.7758, y: 48.8722 }
  ],
  london: [
    { name_ko: "웨스트민스터/런던아이 (중남부)", name_en: "Westminster/Eye (Center-South)", keywords: ["웨스트민스터", "빅벤", "런던아이", "런던 아이", "Westminster", "Big Ben", "London Eye", "제임스", "James"], x: -0.1246, y: 51.5007 },
    { name_ko: "소호/코벤트 가든 (중북부)", name_en: "Soho/Covent Garden (Center-North)", keywords: ["소호", "코벤트 가든", "코벤트가든", "대영박물관", "대영 박물관", "러셀", "세인트폴", "세인트 폴", "Soho", "Covent Garden", "British Museum", "Russell", "St. Paul", "몬머스", "테이트 모던", "Tate Modern"], x: -0.1220, y: 51.5120 },
    { name_ko: "타워 브릿지/시티 (동부)", name_en: "Tower Bridge/City (East)", keywords: ["타워 브릿지", "타워브릿지", "런던탑", "런던 탑", "더 샤드", "버로우", "Tower Bridge", "Tower of London", "The Shard", "Borough"], x: -0.0754, y: 51.5055 },
    { name_ko: "켄싱턴/첼시 (서부)", name_en: "Kensington/Chelsea (West)", keywords: ["켄싱턴", "하이드 파크", "하이드파크", "자연사", "해로즈", "빅토리아", "Kensington", "Hyde Park", "Natural History", "Harrods", "Victoria", "앨버트", "V&A"], x: -0.1910, y: 51.4950 },
    { name_ko: "그리니치 (극동남부)", name_en: "Greenwich (Far Southeast)", keywords: ["그리니치", "천문대", "Greenwich", "Observatory"], x: 0.0000, y: 51.4800 },
    { name_ko: "왓포드/외곽 (극북서부)", name_en: "Watford/Outskirts (Far Northwest)", keywords: ["해리포터", "Harry Potter", "Warner Bros", "워너브라더스"], x: -0.4178, y: 51.6900 }
  ],
  newyork: [
    { name_ko: "미드타운/타임스 스퀘어 (시내 중심)", name_en: "Midtown/Times Square (Center)", keywords: ["타임스스퀘어", "타임즈스퀘어", "엠파이어", "록펠러", "현대미술관", "모마", "탑오브더락", "브로드웨이", "공립도서관", "센트럴파크", "Times Square", "Empire State", "Rockefeller", "MoMA", "Top of the Rock", "Broadway", "Public Library", "Central Park", "Intelligentsia", "조스 피자", "Joe's Pizza", "카마인스", "Carmine's", "하이드아웃", "Hideout", "그럼피", "Grumpy"], x: -73.9855, y: 40.7580 },
    { name_ko: "로어 맨해튼/소호 (남부)", name_en: "Lower Manhattan/Soho (South)", keywords: ["자유의 여신상", "자유의여신상", "원월드", "그라운드 제로", "소호", "첼시마켓", "하이라인", "그리니치", "Statue of Liberty", "One World", "Ground Zero", "Soho", "Chelsea Market", "High Line", "Greenwich", "블루보틀", "Blue Bottle", "노부", "Nobu", "조앤더주스", "Joe & The Juice", "로리스", "Lawry's"], x: -74.0007, y: 40.7220 },
    { name_ko: "센트럴 파크 (북부)", name_en: "Central Park (North)", keywords: ["메트로폴리탄 미술관", "구겐하임", "Metropolitan Museum", "Guggenheim"], x: -73.9683, y: 40.7851 },
    { name_ko: "브루클린 브릿지/덤보 (동남부)", name_en: "Brooklyn Bridge/DUMBO (Southeast)", keywords: ["덤보", "브루클린", "DUMBO", "Brooklyn", "그릴"], x: -73.9969, y: 40.7061 },
    { name_ko: "퀸즈/아스토리아 (북동부)", name_en: "Queens/Astoria (Northeast)", keywords: ["퀸즈", "아스토리아", "Queens", "Astoria"], x: -73.9235, y: 40.7644 }
  ],
  barcelona: [
    { name_ko: "고딕 지구/람블라스 (시내 중심)", name_en: "Gothic Quarter/Ramblas (Center)", keywords: ["고딕 지구", "고딕지구", "람블라스", "보케리아", "레이알", "피카소", "Gothic Quarter", "Ramblas", "Boqueria", "Placa Reial", "Picasso", "카탈루냐", "Catalunya"], x: 2.1730, y: 41.3800 },
    { name_ko: "에샤플레/사그라다 파밀리아 (북부)", name_en: "Eixample/Sagrada Familia (North)", keywords: ["사그라다", "카사 바트요", "카사 밀라", "카사바트요", "카사밀라", "Sagrada Familia", "Casa Batllo", "Casa Mila"], x: 2.1744, y: 41.4036 },
    { name_ko: "몬주익 (남서부)", name_en: "Montjuic (Southwest)", keywords: ["몬주익", "에스파냐", "미로", "Montjuic", "Placa d'Espanya", "Joan Miro"], x: 2.1528, y: 41.3685 },
    { name_ko: "구엘 공원/그라시아 (북서부)", name_en: "Park Guell/Gracia (Far North)", keywords: ["구엘", "Park Guell", "Gracia", "티비다보", "Tibidabo"], x: 2.1527, y: 41.4144 },
    { name_ko: "바르셀로네타 (동부 해안)", name_en: "Barceloneta (East/Waterfront)", keywords: ["바르셀로네타", "포트 벨", "Barceloneta", "Port Vell"], x: 2.1925, y: 41.3780 }
  ],
  rome: [
    { name_ko: "콜로세움/고대 로마 유적지 (동남부)", name_en: "Colosseum/Ancient (South-East)", keywords: ["콜로세움", "포로 로마노", "팔라티노", "Colosseum", "Roman Forum", "Palatine"], x: 12.4922, y: 41.8902 },
    { name_ko: "바티칸 (극서부)", name_en: "Vatican (Far West)", keywords: ["바티칸", "성 베드로", "천사의 성", "성베드로", "천사의성", "Vatican", "St. Peter", "Sant'Angelo"], x: 12.4539, y: 41.9022 },
    { name_ko: "트레비 분수/판테온 (시내 중심)", name_en: "Trevi/Pantheon (Center)", keywords: ["트레비", "판테온", "나보나", "스페인 광장", "스페인광장", "진실의 입", "Trevi", "Pantheon", "Navona", "Spanish Steps", "Spanish", "Bocca della"], x: 12.4833, y: 41.9009 },
    { name_ko: "트라스테베레 (남서부)", name_en: "Trastevere (South-West)", keywords: ["트라스테베레", "Trastevere"], x: 12.4707, y: 41.8883 },
    { name_ko: "보르게세 (북동부)", name_en: "Borghese (North-East)", keywords: ["보르게세", "포폴로", "Borghese", "Popolo"], x: 12.4862, y: 41.9142 }
  ],
  bangkok: [
    { name_ko: "방콕 왕궁/왓 아룬 (서부)", name_en: "Grand Palace/Wat Arun (West)", keywords: ["왕궁", "왓 아룬", "왓 포", "카오산", "Grand Palace", "Wat Arun", "Wat Pho", "Khaosan"], x: 100.4900, y: 13.7500 },
    { name_ko: "시암/빠뚜남 (시내 중심)", name_en: "Siam/Pratunam (Center)", keywords: ["시암", "센트럴월드", "빠뚜남", "스쿰빗", "수쿰빗", "Siam", "Centralworld", "Pratunam", "Sukhumvit"], x: 100.5340, y: 13.7460 },
    { name_ko: "실롬/차이나타운 (남/남서부)", name_en: "Silom/Chinatown (South/Southwest)", keywords: ["실롬", "차이나타운", "야오와랏", "룸피니", "Silom", "Chinatown", "Yaowarat", "Lumpini"], x: 100.5160, y: 13.7240 },
    { name_ko: "강변/아이콘시암 (남서부)", name_en: "Riverside/Iconsiam (Southwest)", keywords: ["아이콘시암", "아시아티크", "짜오프라야", "Iconsiam", "Asiatique", "Chao Phraya"], x: 100.5100, y: 13.7200 },
    { name_ko: "짜뚜짝 주말시장 (극북부)", name_en: "Chatuchak (Far North)", keywords: ["짜뚜짝", "Chatuchak"], x: 100.5530, y: 13.8030 }
  ],
  sydney: [
    { name_ko: "써큘러 키 (북부)", name_en: "Circular Quay (North)", keywords: ["오페라", "Circular Quay", "Harbour Bridge", "Rocks", "록스", "하버 브릿지", "천문대", "Observatory"], x: 151.2108, y: -33.8614 },
    { name_ko: "달링 하버/CBD (시내 중심)", name_en: "Darling Harbour/CBD (Center)", keywords: ["달링", "Darling", "CBD", "Town Hall", "Hyde Park", "하이드"], x: 151.2009, y: -33.8748 },
    { name_ko: "타롱가 동물원 (북부 해안)", name_en: "Taronga Zoo (North Coast)", keywords: ["타롱가", "Taronga"], x: 151.2413, y: -33.8436 },
    { name_ko: "본다이 비치 (동부)", name_en: "Bondi Beach (East)", keywords: ["본다이", "Bondi"], x: 151.2767, y: -33.8915 },
    { name_ko: "블루 마운틴 (극서부)", name_en: "Blue Mountains (Far West)", keywords: ["블루마운틴", "블루 마운틴", "Blue Mountain"], x: 150.3119, y: -33.7149 }
  ],
  singapore: [
    { name_ko: "마리나 베이 (동부)", name_en: "Marina Bay (East)", keywords: ["마리나", "Gardens by the Bay", "Flyer", "Merlion", "머라이언", "플라이어"], x: 103.8609, y: 1.2828 },
    { name_ko: "클락 키/CBD (시내 중심)", name_en: "Clarke Quay/CBD (Center)", keywords: ["클락 키", "클락키", "래플스", "Raffles", "Clarke Quay"], x: 103.8465, y: 1.2906 },
    { name_ko: "오차드/보타닉 가든 (서부)", name_en: "Orchard/Botanic (West)", keywords: ["오차드", "보타닉", "Orchard", "Botanic"], x: 103.8318, y: 1.3048 },
    { name_ko: "차이나타운/리틀 인디아 (중부)", name_en: "Chinatown/Little India (Center)", keywords: ["차이나타운", "리틀 인디아", "Chinatown", "Little India"], x: 103.8439, y: 1.2848 },
    { name_ko: "센토사 섬 (남부)", name_en: "Sentosa (South)", keywords: ["센토사", "유니버셜", "Sentosa", "Universal"], x: 103.8303, y: 1.2494 }
  ],
  dubai: [
    { name_ko: "다운타운 (시내 중심)", name_en: "Downtown (Center)", keywords: ["버즈 칼리파", "버즈칼리파", "두바이 몰", "두바이몰", "Burj Khalifa", "Dubai Mall"], x: 55.2744, y: 25.1972 },
    { name_ko: "주메이라 (해안가)", name_en: "Jumeirah (Coast)", keywords: ["주메이라", "버즈 알 아랍", "Jumeirah", "Burj Al Arab"], x: 55.2000, y: 25.1500 },
    { name_ko: "두바이 마리나 (남서부)", name_en: "Marina (Southwest)", keywords: ["마리나", "Marina", "Palm Jumeirah", "팜 주메이라"], x: 55.1400, y: 25.0800 },
    { name_ko: "올드 두바이 (북동부)", name_en: "Old Dubai (Northeast)", keywords: ["알 파히디", "수크", "크리크", "Al Fahidi", "Souk", "Creek"], x: 55.3090, y: 25.2630 },
    { name_ko: "사막 지구 (극동부)", name_en: "Desert (Far East)", keywords: ["사막", "사파리", "Desert", "Safari"], x: 55.6000, y: 24.9500 }
  ],
  munich: [
    { name_ko: "알트슈타트 (시내 중심)", name_en: "Altstadt (Center)", keywords: ["마리엔", "레지덴츠", "호프브로이", "Marienplatz", "Viktualienmarkt", "Residenz", "Hofbrauhaus"], x: 11.5755, y: 48.1372 },
    { name_ko: "영국 정원 (북동부)", name_en: "Englischer Garten (North-East)", keywords: ["영국 정원", "영국정원", "Englischer Garten"], x: 11.6019, y: 48.1627 },
    { name_ko: "님펜부르크 (서부)", name_en: "Nymphenburg (West)", keywords: ["님펜부르크", "Nymphenburg"], x: 11.5033, y: 48.1581 },
    { name_ko: "알리안츠 아레나 (북부)", name_en: "Allianz Arena (North)", keywords: ["알리안츠", "Allianz"], x: 11.6247, y: 48.2188 },
    { name_ko: "옥토버페스트/테레지엔비제 (남서부)", name_en: "Oktoberfest (South-West)", keywords: ["옥토버페스트", "테레지엔비제", "Oktoberfest", "Deutsches Museum", "독일박물관"], x: 11.5492, y: 48.1312 }
  ],
  prague: [
    { name_ko: "프라하 성 (서부)", name_en: "Prague Castle (West)", keywords: ["프라하 성", "프라하성", "카렐교", "존 레논", "Prague Castle", "Charles Bridge", "Lennon"], x: 14.4005, y: 50.0902 },
    { name_ko: "구시가지 (시내 중심)", name_en: "Old Town (Center)", keywords: ["구시가지", "틴 성당", "천문 시계", "천문시계", "Old Town", "Astronomical Clock"], x: 14.4205, y: 50.0878 },
    { name_ko: "신시가지 (중남부)", name_en: "New Town (South-Center)", keywords: ["바츨라프", "댄싱 하우스", "Wenceslas", "Dancing House"], x: 14.4255, y: 50.0784 },
    { name_ko: "비셰하드 (남부)", name_en: "Vysehrad (South)", keywords: ["비셰하드", "Vysehrad"], x: 14.4200, y: 50.0644 },
    { name_ko: "레트나 공원 (북부)", name_en: "Letna Park (North)", keywords: ["레트나", "Letna"], x: 14.4150, y: 50.0950 }
  ],
  beijing: [
    { name_ko: "자금성/천안문 (시내 중심)", name_en: "Forbidden City (Center)", keywords: ["자금성", "천안문", "경산공원", "Forbidden City", "Tiananmen", "Jingshan"], x: 116.3970, y: 39.9169 },
    { name_ko: "왕푸징 (동부)", name_en: "Wangfujing/East", keywords: ["왕푸징", "난뤄구샹", "옹화궁", "Temple of Heaven", "천단", "Wangfujing", "Nanluoguxiang", "Yonghe", "Temple of Heaven"], x: 116.4110, y: 39.9140 },
    { name_ko: "이화원 (북서부)", name_en: "Summer Palace (Northwest)", keywords: ["이화원", "원명원", "Summer Palace", "Yuanmingyuan"], x: 116.2710, y: 39.9972 },
    { name_ko: "올림픽 경기장 (북부)", name_en: "Olympic Stadium (North)", keywords: ["올림픽", "주경기장", "Bird's Nest", "Olympic Stadium"], x: 116.3960, y: 40.0016 },
    { name_ko: "만리장성 (극북부)", name_en: "Great Wall (Far North)", keywords: ["만리장성", "Great Wall"], x: 116.0200, y: 40.3597 }
  ],
  cairo: [
    { name_ko: "기자/피라미드 (서부)", name_en: "Giza (West)", keywords: ["피라미드", "스핑크스", "기자", "Pyramids", "Sphinx", "Giza", "Saqqara", "사카라"], x: 31.1342, y: 29.9792 },
    { name_ko: "카이로 다운타운 (시내 중심)", name_en: "Downtown (Center)", keywords: ["이집트 박물관", "타흐리르", "Tahrir", "Egyptian Museum"], x: 31.2357, y: 30.0444 },
    { name_ko: "자말렉 (서중부)", name_en: "Zamalek (West-Center)", keywords: ["자말렉", "카이로 타워", "Zamalek", "Cairo Tower"], x: 31.2208, y: 30.0631 },
    { name_ko: "이슬람 카이로 (동부)", name_en: "Islamic Cairo (East)", keywords: ["칸 엘 칼릴리", "시타델", "무함마드 알리", "아즈하르", "Khan El Khalili", "Citadel", "Mosque", "Azhar"], x: 31.2625, y: 30.0478 },
    { name_ko: "뉴 카이로 (극동부)", name_en: "New Cairo (Far East)", keywords: ["페스티벌", "Festival City"], x: 31.4800, y: 30.0300 }
  ],
  rio: [
    { name_ko: "코파카바나 해변 (동부 해안)", name_en: "Copacabana (East Coast)", keywords: ["코파카바나", "Copacabana"], x: -43.1857, y: -22.9714 },
    { name_ko: "이파네마 해변 (남부 해안)", name_en: "Ipanema (South Coast)", keywords: ["이파네마", "레블론", "Ipanema", "Leblon", "Hippie"], x: -43.2081, y: -22.9836 },
    { name_ko: "센트로 (북부)", name_en: "Centro (North)", keywords: ["도서관", "셀라론", "대성당", "Reading Room", "Selaron", "Cathedral", "Tomorrow"], x: -43.1797, y: -22.9064 },
    { name_ko: "코르코바두 예수상 (중동부)", name_en: "Corcovado/Sugarloaf (Center-East)", keywords: ["예수상", "빵드아수카르", "Christ the Redeemer", "Sugarloaf"], x: -43.2105, y: -22.9519 },
    { name_ko: "티주카/식물원 (서부)", name_en: "Tijuca/Botanico (West)", keywords: ["식물원", "라주", "티주카", "Jardim Botanico", "Lage", "Tijuca"], x: -43.2244, y: -22.9697 }
  ],
  vancouver: [
    { name_ko: "스탠리 파크 (북서부)", name_en: "Stanley Park (North-West)", keywords: ["스탠리", "콜 해버", "Stanley", "Coal Harbour"], x: -123.1417, y: 49.3017 },
    { name_ko: "개스타운/다운타운 (시내 중심)", name_en: "Gastown/Downtown (Center)", keywords: ["개스타운", "증기시계", "롭슨", "퍼시픽", "아트 갤러리", "Gastown", "Steam Clock", "Robson", "Pacific Centre", "Art Gallery", "Medina"], x: -123.1207, y: 49.2827 },
    { name_ko: "그랜빌/키칠라노 (남서부)", name_en: "Granville/Kitsilano (South-West)", keywords: ["그랜빌", "잉글리시", "키칠라노", "Granville", "English Bay", "Kitsilano"], x: -123.1364, y: 49.2734 },
    { name_ko: "카필라노/그라우스 마운틴 (극북부)", name_en: "Capilano/Grouse (Far North)", keywords: ["카필라노", "그라우스", "Capilano", "Grouse"], x: -123.1112, y: 49.3429 },
    { name_ko: "리치먼드/메트로타운 (남/동부)", name_en: "Richmond/Metrotown (South/East)", keywords: ["리치먼드", "메트로타운", "Richmond", "Metrotown", "McArthurGlen"], x: -123.1333, y: 49.1667 }
  ]
};

function getAttractionCoords(item, preferredCityId) {
  if (!item) return { x: 5.0, y: 5.0, coordinateSource: 'estimated-cluster' };

  // Resolve cityId
  let cityId = preferredCityId || item.cityId;
  if (!cityId) {
    for (const cid in ATTRACTIONS) {
      for (const cat in ATTRACTIONS[cid]) {
        if (ATTRACTIONS[cid][cat].some(att => placeKeysOverlap(getGlobalPlaceKeys(att), getGlobalPlaceKeys(item)))) {
          cityId = cid;
          item.cityId = cid;
          break;
        }
      }
      if (cityId) break;
    }
  }
  
  // Use active course's cityId as fallback instead of defaulting to Seoul
  if (!cityId) {
    cityId = (state && state.activeCourse && state.activeCourse.cityId) || 'paris';
  }

  // Reuse canonical landmark coordinates for both route calculations and map
  // rendering. Older records may still carry a synthetic cluster coordinate.
  if (typeof getCanonicalPlaceCoordinate === 'function') {
    const canonical = getCanonicalPlaceCoordinate(item, cityId);
    if (canonical) return canonical;
  }

  if (hasUsableAttractionCoords(item, cityId)) {
    return {
      x: Number(item.x),
      y: Number(item.y),
      coordinateSource: item.coordinateSource || 'curated-data'
    };
  }
  
  const centerCluster = getCityCenterCluster(cityId);
  const clusters = CITY_CLUSTERS[cityId] || (centerCluster ? [centerCluster] : CITY_CLUSTERS['paris']);
  const nameKo = item.name_ko || '';
  const nameEn = item.name_en || '';
  const descKo = item.desc_ko || '';
  const descEn = item.desc_en || '';
  const fullText = (nameKo + ' ' + nameEn + ' ' + descKo + ' ' + descEn).toLowerCase();
  
  let targetCluster = null;
  for (const cluster of clusters) {
    if (cluster.keywords.some(kw => fullText.includes(kw.toLowerCase()))) {
      targetCluster = cluster;
      break;
    }
  }
  
  // Deterministic hash for jitter and fallback
  let hash = 0;
  const name = item.name_en || '';
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 10007;
  }
  
  if (!targetCluster) {
    // Deterministic fallback to one of the city's clusters
    const clusterIdx = hash % clusters.length;
    targetCluster = clusters[clusterIdx];
  }
  
  const jitterX = ((hash % 11) - 5) / 500.0; // range [-0.01, +0.01]
  const jitterY = (((hash >> 2) % 11) - 5) / 500.0; // range [-0.01, +0.01]
  
  return {
    x: Math.max(-180, Math.min(180, targetCluster.x + jitterX)),
    y: Math.max(-90, Math.min(90, targetCluster.y + jitterY)),
    coordinateSource: 'estimated-cluster'
  };
}

function getQuadrant(item) {
  return null;
}

function getQuadrantWithMostItems(pool) {
  if (!pool || pool.length === 0) return 1;
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  pool.forEach(item => {
    const q = getQuadrant(item);
    if (q !== null) {
      counts[q]++;
    }
  });
  let maxQ = 1;
  let maxCount = -1;
  for (let q = 1; q <= 4; q++) {
    if (counts[q] > maxCount) {
      maxCount = counts[q];
      maxQ = q;
    }
  }
  return maxQ;
}

function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getCityCenterCluster(cityId) {
  const clusters = (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[cityId]) || null;
  if (Array.isArray(clusters) && clusters.length > 0) return clusters[0];
  if (typeof ROUTE_CITY_CENTERS !== 'undefined' && ROUTE_CITY_CENTERS[cityId]) {
    const center = ROUTE_CITY_CENTERS[cityId];
    return { x: center.lon, y: center.lat, keywords: [] };
  }
  return null;
}

function isPlausibleGeoCoord(coord) {
  return coord &&
    Number.isFinite(coord.x) &&
    Number.isFinite(coord.y) &&
    coord.x >= -180 &&
    coord.x <= 180 &&
    coord.y >= -90 &&
    coord.y <= 90;
}

function hasUsableAttractionCoords(item, cityId) {
  if (!isPlausibleGeoCoord(item)) return false;
  const center = getCityCenterCluster(cityId);
  if (!center || !isPlausibleGeoCoord(center)) return true;

  const distanceFromCenter = getHaversineDistance(item.y, item.x, center.y, center.x);
  const maxKm = cityId === 'reykjavik'
    ? 700
    : ((isNearbyDayTripItem(item) || item.isAllDayTrip) ? MAX_REASONABLE_DAY_TRIP_KM : 90);
  return distanceFromCenter <= maxKm;
}

const VERIFIED_PLACE_COORDINATES = Object.freeze({
  london: Object.freeze([
    Object.freeze({
      aliases: Object.freeze(['buckingham palace', '버킹엄 궁전']),
      x: -0.14194444,
      y: 51.50083333,
      source: 'canonical-override'
    })
  ]),
  sydney: Object.freeze([
    Object.freeze({
      aliases: Object.freeze(['sydney opera house', 'opera house inside tour']),
      x: 151.2153,
      y: -33.8568,
      source: 'canonical-override'
    }),
    Object.freeze({
      aliases: Object.freeze(['sydney bridgeclimb', 'sydney harbour bridge', 'harbour bridge']),
      x: 151.2108,
      y: -33.8523,
      source: 'canonical-override'
    })
  ])
});

// Display-only map corrections for water activities. Transit calculations keep
// the attraction's route coordinate, while the marker uses a nearby shore or
// boarding point so it never appears in open water.
const MAP_LAND_COORDINATE_OVERRIDES = Object.freeze({
  sydney: Object.freeze([
    Object.freeze({ aliases: Object.freeze(['darling harbour jet boat', 'darling harbour jet boat spin']), x: 151.2012, y: -33.8745, source: 'land-boarding-point' }),
    Object.freeze({ aliases: Object.freeze(['sydney harbour cruise', 'harbour cruise']), x: 151.2150, y: -33.8565, source: 'land-boarding-point' })
  ]),
  interlaken: Object.freeze([
    Object.freeze({ aliases: Object.freeze(['lake brienz cruise']), x: 7.8537, y: 46.6872, source: 'land-boarding-point' }),
    Object.freeze({ aliases: Object.freeze(['lake thun cruise']), x: 7.6296, y: 46.7580, source: 'land-boarding-point' })
  ]),
  reykjavik: Object.freeze([
    Object.freeze({ aliases: Object.freeze(['lake myvatn', 'myvatn geothermal']), x: -16.9186, y: 65.6414, source: 'land-shore-point' }),
    Object.freeze({ aliases: Object.freeze(['jokulsarlon', 'glacier lagoon', 'diamond beach']), x: -16.2306, y: 64.0481, source: 'land-shore-point' }),
    Object.freeze({ aliases: Object.freeze(['blue lagoon']), x: -22.4495, y: 63.8804, source: 'land-shore-point' })
  ]),
  paris: Object.freeze([
    Object.freeze({ aliases: Object.freeze(['seine river cruise', 'bateaux parisiens']), x: 2.2945, y: 48.8584, source: 'land-boarding-point' })
  ]),
  venice: Object.freeze([
    Object.freeze({ aliases: Object.freeze(['grand canal vaporetto', 'vaporetto ride']), x: 12.3359, y: 45.4380, source: 'land-boarding-point' })
  ])
});

const INTRA_CITY_TRANSIT_OVERRIDES = Object.freeze({
  sydney: Object.freeze([
    Object.freeze({
      from: Object.freeze(['sydney opera house', 'opera house inside tour']),
      to: Object.freeze(['sydney bridgeclimb', 'sydney harbour bridge', 'harbour bridge']),
      distance: 0.7,
      duration: 10,
      type_ko: '\uB3C4\uBCF4',
      type_en: 'Walk',
      source: 'curated-adjacent-landmarks'
    }),
    Object.freeze({
      from: Object.freeze(['sydney opera house', 'opera house inside tour']),
      to: Object.freeze(['royal botanic garden', 'royal botanic garden walk']),
      distance: 0.5,
      duration: 10,
      type_ko: '\uB3C4\uBCF4',
      type_en: 'Walk',
      source: 'curated-adjacent-landmarks'
    })
  ])
});

function normalizePlaceIntentText(item) {
  return normalizeCoordinateLookupText([
    item && item.name_en,
    item && item.name_ko,
    item && item.name,
    item && item.desc_en,
    item && item.desc_ko
  ].filter(Boolean).join(' '));
}

function findPlaceCoordinateOverride(item, cityId, table) {
  const candidates = table[cityId] || [];
  const text = normalizePlaceIntentText(item);
  const match = candidates.find(candidate => candidate.aliases.some(alias => {
    const key = normalizeCoordinateLookupText(alias);
    return key && text.includes(key);
  }));
  return match ? { x: match.x, y: match.y, coordinateSource: match.source } : null;
}

function getMapLandCoordinateOverride(item, cityId) {
  if (item && item.mapOnlyLandFallback && isPlausibleGeoCoord({ x: Number(item.mapX), y: Number(item.mapY) })) {
    return {
      x: Number(item.mapX),
      y: Number(item.mapY),
      coordinateSource: item.mapCoordinateSource || 'curated-nearby-land'
    };
  }
  return findPlaceCoordinateOverride(item, cityId, MAP_LAND_COORDINATE_OVERRIDES);
}

function isWaterBasedMapItem(item) {
  const text = normalizePlaceIntentText(item);
  return /\b(?:lake|river|cruise|boat|ferry|harbour|harbor|waterfront|bay|lagoon|canal|vaporetto)\b/.test(text)
    || /\uD638\uC218|\uAC15|\uD06C\uB8E8\uC988|\uBC30|\uD398\uB9AC|\uD574\uC548|\uB9CC|\uC6B4\uD558/.test(text);
}

function getLandMapFallbackCoordinate(item, cityId) {
  const override = getMapLandCoordinateOverride(item, cityId);
  if (override) return override;
  const center = getCityCenterCluster(cityId);
  if (isWaterBasedMapItem(item) && center && isPlausibleGeoCoord(center)) {
    return { x: center.x, y: center.y, coordinateSource: 'land-cluster-fallback' };
  }
  const coords = getAttractionCoords(item, cityId);
  const source = coords.coordinateSource === 'estimated-cluster'
    ? 'map-cluster-fallback'
    : (coords.coordinateSource || 'map-fallback');
  return isPlausibleGeoCoord(coords)
    ? { x: Number(coords.x), y: Number(coords.y), coordinateSource: source }
    : null;
}

function getIntraCityTransitOverride(item1, item2, cityId) {
  const rules = INTRA_CITY_TRANSIT_OVERRIDES[cityId] || [];
  const text1 = normalizePlaceIntentText(item1);
  const text2 = normalizePlaceIntentText(item2);
  const matches = (aliases, text) => aliases.some(alias => text.includes(normalizeCoordinateLookupText(alias)));
  const rule = rules.find(candidate =>
    (matches(candidate.from, text1) && matches(candidate.to, text2))
    || (matches(candidate.from, text2) && matches(candidate.to, text1))
  );
  return rule ? {
    distance: rule.distance,
    duration: rule.duration,
    type_ko: rule.type_ko,
    type_en: rule.type_en,
    source: rule.source
  } : null;
}

function getVerifiedTransitRouteOverride(item1, item2, cityId) {
  const registry = (typeof window !== 'undefined' && window.CITY_TRANSIT_ROUTE_OVERRIDES) ||
    (typeof globalThis !== 'undefined' && globalThis.CITY_TRANSIT_ROUTE_OVERRIDES) || {};
  if (!registry || !cityId) return null;

  const names = item => Array.from(new Set([
    item && item.name_en,
    item && item.name_ko,
    item && item.name
  ].filter(Boolean).map(value => normalizeCoordinateLookupText(value)).filter(Boolean)));
  const fromNames = names(item1);
  const toNames = names(item2);
  let record = null;
  for (const from of fromNames) {
    for (const to of toNames) {
      record = registry[`${cityId}|${from}|${to}`] || registry[`${cityId}|${to}|${from}`];
      if (record) break;
    }
    if (record) break;
  }
  if (!record) return null;

  const distance = Number(record.distanceKm);
  const durationSeconds = Number(record.durationSeconds);
  if (!Number.isFinite(distance) || !Number.isFinite(durationSeconds) || distance < 0 || durationSeconds < 0) return null;
  const isWalking = String(record.mode || '').includes('walking');
  return {
    distance: Number(distance.toFixed(1)),
    duration: roundTransitMinutes(durationSeconds / 60),
    type_ko: isWalking ? '도보' : '대중교통',
    type_en: isWalking ? 'Walk' : 'Public Transit',
    source: record.source,
    routeMode: record.mode,
    provider: record.provider
  };
}

const VERIFIED_COORDINATE_CACHE_KEY = 'wandersync_verified_place_coordinates_v1';
let verifiedCoordinateCache = null;

function normalizeCoordinateLookupText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9가-힣]+/g, ' ')
    .trim();
}

function getCoordinateLookupName(item) {
  return String((item && (item.name_en || item.name_ko || item.name)) || '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+(?:&|and)\s+.*$/i, '')
    .trim();
}

function getCanonicalPlaceCoordinate(item, cityId) {
  const candidates = VERIFIED_PLACE_COORDINATES[cityId] || [];
  const names = normalizeCoordinateLookupText([
    item && item.name_en,
    item && item.name_ko,
    item && item.name
  ].filter(Boolean).join(' '));
  const match = candidates.find(candidate => candidate.aliases.some(alias => {
    const aliasKey = normalizeCoordinateLookupText(alias);
    return Boolean(aliasKey && names.includes(aliasKey));
  }));
  return match ? { x: match.x, y: match.y, coordinateSource: match.source } : null;
}

function getLegacyEstimatedCoordinate(item, cityId) {
  if (!item) return null;
  const estimateInput = Object.assign({}, item);
  delete estimateInput.x;
  delete estimateInput.y;
  delete estimateInput.coordinateSource;
  return getAttractionCoords(estimateInput, cityId);
}

function isSyntheticAttractionCoordinate(item, cityId) {
  if (!item) return true;
  if (item.coordinateSource === 'estimated-cluster') return true;
  if (!Number.isFinite(Number(item.x)) || !Number.isFinite(Number(item.y))) return true;
  const estimated = getLegacyEstimatedCoordinate(item, cityId);
  return Boolean(estimated &&
    Math.abs(Number(item.x) - estimated.x) < 0.0000001 &&
    Math.abs(Number(item.y) - estimated.y) < 0.0000001);
}

function getVerifiedCoordinateCache() {
  if (verifiedCoordinateCache) return verifiedCoordinateCache;
  const parsed = safeGetStoredJson(VERIFIED_COORDINATE_CACHE_KEY, {});
  verifiedCoordinateCache = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  return verifiedCoordinateCache;
}

function cacheVerifiedPlaceCoordinate(cacheKey, coordinate) {
  const cache = getVerifiedCoordinateCache();
  cache[cacheKey] = {
    x: coordinate.x,
    y: coordinate.y,
    coordinateSource: coordinate.coordinateSource,
    cachedAt: Date.now()
  };
  const keys = Object.keys(cache);
  if (keys.length > 240) {
    keys.sort((a, b) => Number(cache[a].cachedAt || 0) - Number(cache[b].cachedAt || 0))
      .slice(0, keys.length - 240)
      .forEach(key => delete cache[key]);
  }
  safeSetLocalStorage(VERIFIED_COORDINATE_CACHE_KEY, JSON.stringify(cache));
}

function isCoordinatePlausibleForPlace(coordinate, item, cityId) {
  if (!isPlausibleGeoCoord(coordinate)) return false;
  const center = getCityCenterCluster(cityId);
  if (!center || !isPlausibleGeoCoord(center)) return true;
  const distance = getHaversineDistance(coordinate.y, coordinate.x, center.y, center.x);
  const maxKm = cityId === 'reykjavik'
    ? 700
    : ((isNearbyDayTripItem(item) || item.isAllDayTrip) ? MAX_REASONABLE_DAY_TRIP_KM : 90);
  return distance <= maxKm;
}

async function lookupWikipediaPlaceCoordinate(item, cityId) {
  const placeName = getCoordinateLookupName(item);
  if (!placeName || item.isLodging || item.isRest || item.isTransit) return null;
  const city = Array.isArray(CITIES) ? CITIES.find(candidate => candidate.id === cityId) : null;
  const cityName = (city && (city.name_en || city.name_ko)) || cityId || '';
  const cacheKey = `${cityId || 'custom'}:${normalizeCoordinateLookupText(placeName)}`;
  const cached = getVerifiedCoordinateCache()[cacheKey];
  if (cached && isCoordinatePlausibleForPlace(cached, item, cityId)) {
    return { x: Number(cached.x), y: Number(cached.y), coordinateSource: 'wikipedia-cache' };
  }

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrnamespace: '0',
    gsrlimit: '6',
    gsrsearch: `${placeName} ${cityName}`.trim(),
    prop: 'coordinates'
  });

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
    if (!response.ok) return null;
    const payload = await response.json();
    const pages = Object.values((payload.query && payload.query.pages) || {})
      .sort((a, b) => Number(a.index || 999) - Number(b.index || 999));
    const targetTokens = normalizeCoordinateLookupText(placeName).split(' ').filter(token => token.length >= 3);
    const ranked = pages.map(page => {
      const pageCoordinate = page.coordinates && page.coordinates[0]
        ? { x: Number(page.coordinates[0].lon), y: Number(page.coordinates[0].lat) }
        : null;
      const titleTokens = normalizeCoordinateLookupText(page.title).split(' ').filter(token => token.length >= 3);
      const overlap = targetTokens.length
        ? targetTokens.filter(token => titleTokens.includes(token)).length / targetTokens.length
        : 0;
      return { page, pageCoordinate, overlap };
    }).filter(result =>
      result.pageCoordinate &&
      result.overlap >= 0.34 &&
      isCoordinatePlausibleForPlace(result.pageCoordinate, item, cityId)
    ).sort((a, b) => b.overlap - a.overlap || Number(a.page.index || 999) - Number(b.page.index || 999));

    if (!ranked.length) return null;
    const resolved = {
      x: ranked[0].pageCoordinate.x,
      y: ranked[0].pageCoordinate.y,
      coordinateSource: 'wikipedia-place'
    };
    cacheVerifiedPlaceCoordinate(cacheKey, resolved);
    return resolved;
  } catch (error) {
    console.warn('Place coordinate lookup failed:', placeName, error);
    return null;
  }
}

async function resolveVerifiedMapCoordinate(item, cityId) {
  const landOverride = getMapLandCoordinateOverride(item, cityId);
  if (landOverride) return landOverride;

  const canonical = getCanonicalPlaceCoordinate(item, cityId);
  if (canonical) return canonical;

  const lookedUp = await lookupWikipediaPlaceCoordinate(item, cityId);
  if (lookedUp) return lookedUp;

  if (hasUsableAttractionCoords(item, cityId) && !isSyntheticAttractionCoordinate(item, cityId)) {
    return { x: Number(item.x), y: Number(item.y), coordinateSource: item.coordinateSource || 'curated-data' };
  }
  return null;
}

function getDistance(item1, item2) {
  const preferredCityId = (item1 && item1.cityId) || (item2 && item2.cityId) || (state && state.activeCourse && state.activeCourse.cityId) || null;
  const c1 = getAttractionCoords(item1, preferredCityId);
  const c2 = getAttractionCoords(item2, preferredCityId);
  return getHaversineDistance(c1.y, c1.x, c2.y, c2.x);
}

function roundTransitMinutes(minutes) {
  return Math.max(10, Math.round(minutes / 10) * 10);
}

function calculateTransit(item1, item2) {
  if (!item1 || !item2) {
    return { distance: 0, duration: 0, type_ko: "도보", type_en: "Walk" };
  }
  
  const preferredCityId = item1.cityId || item2.cityId || (state && state.activeCourse && state.activeCourse.cityId) || null;
  const curatedOverride = preferredCityId
    ? getIntraCityTransitOverride(item1, item2, preferredCityId)
    : null;
  if (curatedOverride) return curatedOverride;

  const verifiedRoute = preferredCityId
    ? getVerifiedTransitRouteOverride(item1, item2, preferredCityId)
    : null;
  if (verifiedRoute) return verifiedRoute;

  let c1 = getAttractionCoords(item1, preferredCityId);
  let c2 = getAttractionCoords(item2, preferredCityId);
  
  let dist = getHaversineDistance(c1.y, c1.x, c2.y, c2.x);

  if (item1.name_ko === item2.name_ko || dist < 0.01) {
    return { distance: 0, duration: 0, type_ko: "도보", type_en: "Walk" };
  }
  
  let duration;
  let type_ko, type_en;
  
  if (dist < 1.0) {
    type_ko = "도보";
    type_en = "Walk";
    duration = roundTransitMinutes(dist * 13);
  } else if (dist < 8.0) {
    type_ko = "대중교통";
    type_en = "Public Transit";
    duration = roundTransitMinutes(15 + dist * 3.5);
  } else {
    if (dist > 15.0) {
      type_ko = "택시";
      type_en = "Taxi";
      duration = roundTransitMinutes(8 + dist * 1.5);
    } else {
      type_ko = "대중교통";
      type_en = "Public Transit";
      duration = roundTransitMinutes(20 + dist * 3.0);
    }
  }
  
  return {
    distance: parseFloat(dist.toFixed(1)),
    duration: duration,
    type_ko: type_ko,
    type_en: type_en
  };
}


const getGenericAttractions = () => ({
  healing: [],
  gourmet: [],
  culture: [],
  activity: [],
  shopping: []
});

const SYNTHETIC_ATTRACTION_NAME_PATTERNS = [
  /Scenic Forest & Lake Park Walk/i,
  /Quiet Local Alleyway Tea House with View/i,
  /Botanical Garden & Arboretum Walk/i,
  /Scenic Outdoor Terrace Observatory/i,
  /Waterfront Promenade & Bicycle Riding/i,
  /Famous Traditional & Night Market Food Tour/i,
  /Famous Fluffy Souffle Pancake Brunch Cafe/i,
  /Famous Fluffy Soufflé Pancake Brunch Cafe/i,
  /Specialty Roastery & Espresso Bar/i,
  /Top-rated Local Delicacy Restaurant/i,
  /Downtown Fusion Family Bistro/i,
  /Historic Heritage & Cultural Site Tour/i,
  /City Museum of Modern Art Tour/i,
  /Traditional Handcraft DIY Workshop/i,
  /Landmark Memorial Square & Exhibition/i,
  /Artsy Cultural Street & Local Boutique Hop/i,
  /Thrilling Outdoor Sports & Activities/i,
  /Peak View Ridge Night Hiking/i,
  /Local Historic Alleyway & Craft Market Tour/i,
  /Scenic Nature Hiking & Relaxation Spa/i,
  /Landmark View Tower & Downtown Square Stroll/i,
  /Premium Flagship Outlet Shopping/i,
  /Hipster Designer Brand & Concept Street/i,
  /Cosmetics & Street Snack Market Alley/i,
  /Historic Flea & Vintage Market/i,
  /Tree-lined Fashion & Lifestyle Pop-up Avenue/i,
  /Scenic Waterfront Promenade/i,
  /Cozy Garden Tea House/i,
  /Municipal Botanical Conservatory/i,
  /Relaxation Plaza Benches/i,
  /Municipal Museum of Contemporary Art/i,
  /City Guided Walking Tour/i,
  /Park Bike Stroll/i,
  /City Observatory & Viewpoint/i,
  /Traditional Market & Local Food Tour/i,
  /Central Shopping Street/i,
  /Local Flea Market/i,
  /Local Night Market/i
];

function isSyntheticAttraction(item) {
  if (!item) return false;
  const text = `${item.name_en || ''} ${item.name_ko || ''}`;
  return SYNTHETIC_ATTRACTION_NAME_PATTERNS.some(pattern => pattern.test(text));
}

function filterSyntheticAttractionPools(pools, cityId) {
  const filtered = {};
  ['healing', 'gourmet', 'culture', 'activity', 'shopping'].forEach(cat => {
    filtered[cat] = (pools[cat] || []).filter(item =>
      !isSyntheticAttraction(item) &&
      !isInvalidGeneratedPlaceForCity(item, cityId)
    );
  });
  return filtered;
}

function getOperatingHours(item) {
  if (!item) return { open: 540, close: 1260 };
  if (typeof item.open === 'number' && typeof item.close === 'number') {
    return { open: item.open, close: item.close };
  }
  const nameKo = (item.name_ko || '').toLowerCase();
  const nameEn = (item.name_en || '').toLowerCase();
  const descKo = (item.desc_ko || '').toLowerCase();
  const descEn = (item.desc_en || '').toLowerCase();
  const text = nameKo + ' ' + nameEn + ' ' + descKo + ' ' + descEn;

  // Breakfast spots
  if (['아침', '조식', 'breakfast'].some(kw => text.includes(kw))) {
    return { open: 420, close: 1200 }; // 07:00 to 20:00
  }
  // Lunch spots
  if (['점심', '런치', 'lunch'].some(kw => text.includes(kw))) {
    return { open: 660, close: 1260 }; // 11:00 to 21:00
  }
  // Dinner spots
  if (['저녁', '디너', 'dinner'].some(kw => text.includes(kw))) {
    return { open: 660, close: 1320 }; // 11:00 to 22:00
  }

  // Night markets

  if (text.includes('야시장') || text.includes('night market')) {
    return { open: 1020, close: 1380 };
  }
  // Cafes / bakeries / desserts
  if (['카페', '커피', '베이커리', '디저트', '빵집', '제과', '에스프레소', '찻집', '티룸', '티하우스'].some(kw => text.includes(kw)) ||
      ['cafe', 'coffee', 'bakery', 'dessert', 'pastry', 'espresso', 'tea room', 'tea house', 'teahouse'].some(kw => text.includes(kw))) {
    return { open: 600, close: 1320 };
  }
  // Bars / pubs / clubs / rooftop
  if (['바 ', '펍', '클럽', '루프탑', '이자카야'].some(kw => text.includes(kw)) ||
      ['bar', 'pub', 'club', 'rooftop', 'izakaya'].some(kw => text.includes(kw))) {
    return { open: 1020, close: 1440 };
  }
  // Night views / sunset spots
  if (['야경', '야간', '일몰', '석양', '선셋', '노을'].some(kw => text.includes(kw)) ||
      ['night view', 'sunset', 'night scenery'].some(kw => text.includes(kw))) {
    return { open: 960, close: 1380 };
  }
  // Temples / shrines / palaces / churches
  if (['사찰', '절', '신사', '궁', '궁전', '왕궁', '성당', '교회', '대성당'].some(kw => text.includes(kw)) ||
      ['temple', 'shrine', 'palace', 'church', 'cathedral', 'basilica'].some(kw => text.includes(kw))) {
    return { open: 540, close: 1080 };
  }
  // Museums / galleries / exhibitions
  if (['박물관', '미술관', '갤러리', '전시'].some(kw => text.includes(kw)) ||
      ['museum', 'gallery', 'exhibition'].some(kw => text.includes(kw))) {
    return { open: 600, close: 1080 };
  }
  // Parks / gardens / forests / trails / beaches
  if (['공원', '정원', '숲', '산책', '해변', '비치', '트레일', '등산', '하이킹'].some(kw => text.includes(kw)) ||
      ['park', 'garden', 'forest', 'trail', 'beach', 'hiking', 'promenade'].some(kw => text.includes(kw))) {
    return { open: 360, close: 1260 };
  }
  // Markets / traditional markets
  if (['시장', '재래시장', '전통시장'].some(kw => text.includes(kw)) ||
      ['market', 'traditional market'].some(kw => text.includes(kw))) {
    return { open: 600, close: 1260 };
  }
  // Theme parks / amusement
  if (['테마파크', '놀이공원', '어트랙션', '유니버셜', '디즈니', '롯데월드'].some(kw => text.includes(kw)) ||
      ['theme park', 'amusement', 'universal', 'disney', 'lotte world'].some(kw => text.includes(kw))) {
    return { open: 600, close: 1260 };
  }
  // Shopping malls / outlets
  if (['쇼핑몰', '아울렛', '백화점', '편집숍', '몰'].some(kw => text.includes(kw)) ||
      ['mall', 'outlet', 'department store', 'shopping'].some(kw => text.includes(kw))) {
    return { open: 630, close: 1260 };
  }
  // Default
  return { open: 540, close: 1260 };
}

function getAttractionSearchText(item) {
  return ((item && item.name_ko) || '') + ' ' +
    ((item && item.name_en) || '') + ' ' +
    ((item && item.desc_ko) || '') + ' ' +
    ((item && item.desc_en) || '');
}

function isOutletOrFarShoppingItem(item) {
  const text = getAttractionSearchText(item).toLowerCase();
  return [
    'outlet', 'premium outlets', 'designer outlet', 'shopping village',
    'woodbury', 'la vallee', 'la vallée', 'castel romano', 'ingolstadt village',
    'rinku premium', 'birkenhead point', 'mcarthurglen'
  ].some(kw => text.includes(kw));
}

function supportsOnSiteMealBreak(item) {
  const text = getAttractionSearchText(item).toLowerCase();
  return /(?:the\s+)?dubai mall|\uB450\uBC14\uC774\s*\uBAB0/i.test(text);
}

function isNearbyDayTripItem(item) {
  if (!item || item.isTransit || item.isLodging || item.isRest || isMealBreakItem(item) || isFlexibleBreakItem(item)) return false;
  const nameText = `${item.name_ko || ''} ${item.name_en || ''} ${item.name || ''}`.toLowerCase();
  const text = getAttractionSearchText(item).toLowerCase();
  if (/\b(day trip|day tour|full[-\s]?day|side trip)\b/.test(nameText)) return true;
  return [
    'day trip', 'day tour', 'full-day', 'full day', 'side trip',
    'pompeii', 'naples', 'sorrento', 'tivoli', 'suzhou', 'hangzhou', 'zhujiajiao', 'water town',
    'nikko', 'kamakura', 'enoshima', 'nara', 'kyoto', 'windsor', 'oxford',
    'dmz', 'suwon', 'montserrat', 'girona', 'giverny', 'loire',
    'fjord', 'fjords', 'flam', 'fl\u00e5m', 'naeroyfjord', 'n\u00e6r\u00f8yfjord',
    'oslofjord', 'delphi', 'meteora', 'sounion', 'saronic', 'hydra', 'aegina',
    'poros', 'mycenae', 'epidaurus', 'zaanse schans', 'volendam', 'delft',
    'cliffs of moher', 'glendalough', 'wicklow', 'giant s causeway',
    'uppsala', 'sigtuna', 'archipelago', 'gyeongju', 'eze',
    '\uADFC\uAD50', '\uB2F9\uC77C\uCE58\uAE30', '\uC218\uD5A5', '\uACE0\uC9C4', '\uC8FC\uC790\uC790\uC624', '\uC8FC\uC790\uC9C0\uC544\uC624'
  ].some(kw => text.includes(kw));
}

function normalizeVisitDurationByType(item) {
  if (!item || item.isRest || item.isTransit || item.isLodging) return item;
  const text = getAttractionSearchText(item).toLowerCase();
  const current = Number(item.duration) || 90;
  let minDuration = current;

  const majorVenueOverride = [
    { pattern: /(?:the\s+)?dubai mall|\uB450\uBC14\uC774\s*\uBAB0/i, minutes: 240 }
  ].find(rule => rule.pattern.test(text));

  if (majorVenueOverride) {
    item.duration = Math.max(current, majorVenueOverride.minutes);
    item.durationSource = 'curated-venue-guidance';
    return item;
  }

  if (isOutletOrFarShoppingItem(item)) {
    minDuration = Math.max(minDuration, 480);
  } else if (isNearbyDayTripItem(item)) {
    minDuration = Math.max(minDuration, 480);
  } else if (['universal', 'disney', 'theme park', 'amusement park', 'lotte world', 'everland', 'legoland'].some(kw => text.includes(kw))) {
    minDuration = Math.max(minDuration, 480);
  } else if (['statue of liberty', 'ellis island', 'liberty island ferry'].some(kw => text.includes(kw))) {
    minDuration = Math.max(minDuration, 240);
  } else if ([
    'gyeongbokgung', 'changdeokgung', 'forbidden city', 'summer palace',
    'versailles', 'topkapi', 'grand palace', 'nymphenburg', 'residenz',
    'pitti palace', 'doge', 'palace'
  ].some(kw => text.includes(kw))) {
    minDuration = Math.max(minDuration, text.includes('forbidden city') || text.includes('versailles') ? 240 : 180);
  } else if ([
    'metropolitan museum', 'american museum of natural history', 'british museum',
    'louvre', 'vatican museum', 'uffizi', 'prado', 'rijksmuseum',
    'national museum', 'museum district', 'natural science museum'
  ].some(kw => text.includes(kw))) {
    minDuration = Math.max(minDuration, 210);
  } else if (['museum', 'gallery', 'moma', 'exhibition'].some(kw => text.includes(kw))) {
    minDuration = Math.max(minDuration, 150);
  }

  item.duration = Math.min(minDuration, 540);
  return item;
}

function normalizeVisitDurationsInPools(pools) {
  if (!pools) return pools;
  Object.keys(pools).forEach(cat => {
    if (Array.isArray(pools[cat])) {
      pools[cat].forEach(normalizeVisitDurationByType);
    }
  });
  return pools;
}

const DESSERT_BREAK_BY_CITY = {
  seoul: { ko: '빙수나 전통차', en: 'bingsu or traditional tea' },
  jeju: { ko: '오메기떡과 녹차 디저트', en: 'omegi rice cake and green tea dessert' },
  tokyo: { ko: '말차 디저트와 커피', en: 'matcha dessert and coffee' },
  osaka: { ko: '말차 디저트와 커피', en: 'matcha dessert and coffee' },
  sapporo: { ko: '우유 아이스크림과 치즈 디저트', en: 'milk ice cream and cheese dessert' },
  paris: { ko: '마카롱이나 프랑스 파티스리', en: 'macarons or French patisserie' },
  london: { ko: '스콘과 애프터눈 티', en: 'scones and afternoon tea' },
  rome: { ko: '티라미수와 에스프레소', en: 'tiramisu and espresso' },
  venice: { ko: '티라미수와 에스프레소', en: 'tiramisu and espresso' },
  florence: { ko: '젤라토와 에스프레소', en: 'gelato and espresso' },
  milan: { ko: '파네토네나 이탈리아 파티스리', en: 'panettone or Italian patisserie' },
  barcelona: { ko: '추로스와 초콜라테', en: 'churros with hot chocolate' },
  madrid: { ko: '추로스와 초콜라테', en: 'churros with hot chocolate' },
  lisbon: { ko: '파스텔 드 나타와 커피', en: 'pastel de nata and coffee' },
  porto: { ko: '파스텔 드 나타와 커피', en: 'pastel de nata and coffee' },
  vienna: { ko: '자허토르테와 멜랑주 커피', en: 'Sachertorte and melange coffee' },
  prague: { ko: '꿀 케이크와 커피', en: 'honey cake and coffee' },
  istanbul: { ko: '바클라바와 터키식 커피', en: 'baklava and Turkish coffee' },
  dubai: { ko: '대추야자 디저트와 아랍식 커피', en: 'date dessert and Arabic coffee' },
  bangkok: { ko: '망고 찹쌀밥과 타이 티', en: 'mango sticky rice and Thai tea' },
  singapore: { ko: '카야 토스트와 로컬 커피', en: 'kaya toast and local coffee' },
  hongkong: { ko: '에그타르트와 밀크티', en: 'egg tart and milk tea' },
  newyork: { ko: '뉴욕 치즈케이크와 커피', en: 'New York cheesecake and coffee' },
  losangeles: { ko: '미국식 치즈케이크와 아이스커피', en: 'American cheesecake and iced coffee' },
  sanfrancisco: { ko: '초콜릿 디저트와 커피', en: 'chocolate dessert and coffee' },
  chicago: { ko: '브라우니나 치즈케이크와 커피', en: 'brownie or cheesecake with coffee' },
  boston: { ko: '보스턴 크림 파이와 커피', en: 'Boston cream pie and coffee' },
  miami: { ko: '키 라임 파이와 커피', en: 'key lime pie and coffee' },
  seattle: { ko: '시나몬롤과 커피', en: 'cinnamon roll and coffee' },
  cairo: { ko: '바스부사와 민트 티', en: 'basbousa and mint tea' },
  sydney: { ko: '파블로바와 롱블랙 커피', en: 'pavlova and long black coffee' }
};

const DESSERT_BREAK_BY_COUNTRY = {
  'South Korea': { ko: '빙수나 전통차', en: 'bingsu or traditional tea' },
  'Japan': { ko: '말차 디저트와 커피', en: 'matcha dessert and coffee' },
  'France': { ko: '마카롱이나 프랑스 파티스리', en: 'macarons or French patisserie' },
  'Italy': { ko: '티라미수와 에스프레소', en: 'tiramisu and espresso' },
  'United Kingdom': { ko: '스콘과 애프터눈 티', en: 'scones and afternoon tea' },
  'United States': { ko: '치즈케이크와 커피', en: 'cheesecake and coffee' },
  'Spain': { ko: '추로스와 초콜라테', en: 'churros with hot chocolate' },
  'Portugal': { ko: '파스텔 드 나타와 커피', en: 'pastel de nata and coffee' },
  'Austria': { ko: '자허토르테와 커피', en: 'Sachertorte and coffee' },
  'Turkey': { ko: '바클라바와 터키식 커피', en: 'baklava and Turkish coffee' },
  'Thailand': { ko: '망고 찹쌀밥과 타이 티', en: 'mango sticky rice and Thai tea' },
  'Singapore': { ko: '카야 토스트와 로컬 커피', en: 'kaya toast and local coffee' },
  'China': { ko: '에그타르트와 밀크티', en: 'egg tart and milk tea' },
  'United Arab Emirates': { ko: '대추야자 디저트와 아랍식 커피', en: 'date dessert and Arabic coffee' },
  'Egypt': { ko: '바스부사와 민트 티', en: 'basbousa and mint tea' },
  'Australia': { ko: '파블로바와 커피', en: 'pavlova and coffee' }
};

function getDessertBreakInfo(cityId, customCityName) {
  const normalizedCustomName = String(customCityName || '').trim().toLowerCase();
  const city = (typeof CITIES !== 'undefined' && (
    CITIES.find(c => c.id === cityId) ||
    CITIES.find(c => normalizedCustomName && (
      String(c.name_en || '').toLowerCase() === normalizedCustomName ||
      String(c.name_ko || '').toLowerCase() === normalizedCustomName
    ))
  )) || null;
  const cityNameKo = (city && city.name_ko) || customCityName || '이 도시';
  const cityNameEn = (city && city.name_en) || customCityName || 'the city';
  const countryEn = city && city.country_en;
  const dessert = DESSERT_BREAK_BY_CITY[cityId] ||
    (city && DESSERT_BREAK_BY_CITY[city.id]) ||
    (countryEn && DESSERT_BREAK_BY_COUNTRY[countryEn]) ||
    { ko: '현지 대표 디저트와 커피', en: 'a local signature dessert and coffee' };
  return { cityNameKo, cityNameEn, dessert };
}

function createDessertBreakItem(cityId, customCityName, coords, duration) {
  const info = getDessertBreakInfo(cityId, customCityName);
  return {
    name_ko: `${info.cityNameKo}의 카페에서 ${info.dessert.ko} 휴식`,
    name_en: `${info.cityNameEn} Cafe Dessert Break`,
    desc_ko: `${info.cityNameKo}의 실제 카페나 디저트 가게를 자유롭게 골라 ${info.dessert.ko}를 즐기는 휴식 시간입니다. 특정 가게 이름은 지어내지 않습니다.`,
    desc_en: `Pick any real local cafe or dessert shop in ${info.cityNameEn} and enjoy ${info.dessert.en}. No made-up venue name is used.`,
    duration: duration || 60,
    isRest: true,
    isFlexibleBreak: true,
    isDessertBreak: true,
    hideDuration: true,
    open: 0,
    close: 1440,
    cityId: cityId,
    x: coords && coords.x,
    y: coords && coords.y
  };
}

const NEARBY_DAY_TRIP_SUPPLEMENTS = {
  berlin: [
    {
      name_ko: '\uD3EC\uCE20\uB2F4 \uC0B0\uC218\uC2DC \uAD81\uC804\uACFC \uAD6C\uC2DC\uAC00\uC9C0 \uB2F9\uC77C\uCE58\uAE30',
      name_en: 'Potsdam Sanssouci & Historic Center Day Trip',
      duration: 480,
      oneWayTravelMinutes: 35,
      isLandmark: false,
      x: 13.0406,
      y: 52.4030,
      open: 480,
      close: 1260,
      desc_ko: '\uBCA0\uB97C\uB9B0\uC5D0\uC11C \uC9C1\uD1B5 \uAD50\uD1B5\uC73C\uB85C \uC774\uB3D9\uD574 \uC0B0\uC218\uC2DC \uAD81\uC804\uACFC \uD3EC\uCE20\uB2F4 \uC5ED\uC0AC \uC9C0\uAD6C\uB97C \uB458\uB7EC\uBCF4\uB294 \uD6C4\uBC18\uBD80 \uD558\uB8E8 \uC77C\uC815',
      desc_en: 'A later full-day rail excursion from Berlin to Sanssouci Palace and Potsdam historic center.'
    },
    {
      name_ko: '\uC288\uD504\uB808\uBC1C\uD2B8 \uB8E8\uBCA0\uB098\uC6B0 \uC6B4\uD558 \uB2F9\uC77C\uCE58\uAE30',
      name_en: 'Spreewald Lubbenau Canals Day Trip',
      duration: 480,
      oneWayTravelMinutes: 70,
      isLandmark: false,
      x: 13.9665,
      y: 51.8680,
      open: 480,
      close: 1260,
      desc_ko: '\uBCA0\uB97C\uB9B0\uC5D0\uC11C \uC774\uB3D9\uD574 \uB8E8\uBCA0\uB098\uC6B0\uC758 \uC288\uD504\uB808\uBC1C\uD2B8 \uC6B4\uD558\uC640 \uC5ED\uC0AC \uC911\uC2EC\uC744 \uB458\uB7EC\uBCF4\uB294 \uD6C4\uBC18\uBD80 \uD558\uB8E8 \uC77C\uC815',
      desc_en: 'A later full-day excursion from Berlin to the Spreewald canals and Lubbenau historic center.'
    }
  ],
  milan: [
    {
      name_ko: '\uCF54\uBAA8\uC640 \uCF54\uBAA8 \uD638\uC218 \uB2F9\uC77C\uCE58\uAE30',
      name_en: 'Como & Lake Como Day Trip',
      duration: 480,
      oneWayTravelMinutes: 40,
      isLandmark: true,
      x: 9.0852,
      y: 45.8081,
      open: 480,
      close: 1260,
      desc_ko: '\uBC00\uB77C\uB178 \uC911\uC559\uC5ED\uC5D0\uC11C \uC9C1\uD1B5 \uC5F4\uCC28\uB85C \uC57D 40\uBD84 \uC774\uB3D9\uD574 \uCF54\uBAA8 \uAD6C\uC2DC\uAC00\uC9C0\uC640 \uD638\uC218\uBCC0\uC744 \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815',
      desc_en: 'Verified direct rail day trip from Milano Centrale to Como in about 40 minutes, with time for the old town and lakefront.'
    },
    {
      name_ko: '\uD30C\uBE44\uC544 \uAD6C\uC2DC\uAC00\uC9C0 \uB2F9\uC77C\uCE58\uAE30',
      name_en: 'Pavia Historic Center Day Trip',
      duration: 420,
      oneWayTravelMinutes: 30,
      isLandmark: false,
      x: 9.1582,
      y: 45.1847,
      open: 480,
      close: 1200,
      desc_ko: '\uBC00\uB77C\uB178\uC5D0\uC11C \uC9C1\uD1B5 \uC5F4\uCC28\uB85C \uC57D 30\uBD84 \uC774\uB3D9\uD574 \uD30C\uBE44\uC544 \uB300\uC131\uB2F9\uACFC \uC911\uC138 \uAD6C\uC2DC\uAC00\uC9C0\uB97C \uB458\uB7EC\uBCF4\uB294 \uC77C\uC815',
      desc_en: 'Verified direct rail day trip from Milan to Pavia in about 30 minutes, focused on the cathedral and medieval center.'
    }
  ],
  oslo: [
    { name_ko: '노르웨이 인 어 넛셸 피요르 당일치기', name_en: 'Norway in a Nutshell Fjord Day Trip', duration: 600, isLandmark: true, x: 7.1132, y: 60.8610, open: 420, close: 1320, desc_ko: '오슬로에서 기차와 보트를 이어 플롬과 네뢰이피요르 일대를 다녀오는 장거리 피요르 하루 코스', desc_en: 'Full-day fjord route from Oslo using train and boat connections around Flam and Naeroyfjord.' },
    { name_ko: '오슬로피요르 섬 투어 당일치기', name_en: 'Oslofjord Islands Day Trip', duration: 480, isLandmark: false, x: 10.7340, y: 59.8860, open: 480, close: 1260, desc_ko: '오슬로 시내에서 페리로 이동해 오슬로피요르의 섬과 해안 산책로를 둘러보는 실제 당일 코스', desc_en: 'Real Oslo day trip by ferry through Oslofjord islands and waterfront walking routes.' },
    { name_ko: '릴레함메르 올림픽 타운과 마이하우겐 당일치기', name_en: 'Lillehammer Olympic Town & Maihaugen Day Trip', duration: 480, isLandmark: false, x: 10.4662, y: 61.1153, open: 480, close: 1260, desc_ko: '오슬로에서 기차로 릴레함메르에 다녀와 올림픽 유산과 마이하우겐 야외박물관을 보는 하루 코스', desc_en: 'Rail day trip from Oslo to Lillehammer for Olympic heritage and Maihaugen open-air museum.' },
    { name_ko: '드뢰박과 오스카르스보르그 요새 당일치기', name_en: 'Drobak & Oscarsborg Fortress Day Trip', duration: 420, isLandmark: false, x: 10.6046, y: 59.6765, open: 480, close: 1260, desc_ko: '오슬로 남쪽 드뢰박 마을과 오스카르스보르그 요새를 함께 둘러보는 근교 당일 코스', desc_en: 'Nearby Oslo day trip to Drobak village and Oscarsborg Fortress.' }
  ],
  athens: [
    { name_ko: '델포이 고고학 유적 당일치기', name_en: 'Delphi Archaeological Site Day Trip', duration: 540, isLandmark: true, x: 22.5010, y: 38.4824, open: 480, close: 1260, desc_ko: '아테네에서 이동해 델포이 고고학 유적과 아폴론 신전을 둘러보는 대표 근교 하루 코스', desc_en: 'Classic full-day trip from Athens to Delphi Archaeological Site and the Temple of Apollo.' },
    { name_ko: '메테오라 수도원 장거리 당일치기', name_en: 'Meteora Monasteries Day Trip', duration: 600, isLandmark: true, x: 21.6320, y: 39.7217, open: 420, close: 1320, desc_ko: '기차나 투어 버스로 메테오라의 바위 수도원들을 다녀오는 장거리 전일 일정', desc_en: 'Long full-day trip by train or tour coach to the cliff-top monasteries of Meteora.' },
    { name_ko: '사로닉 제도 히드라 포로스 에기나 크루즈', name_en: 'Saronic Islands Hydra Poros Aegina Day Cruise', duration: 600, isLandmark: false, x: 23.4662, y: 37.3490, open: 420, close: 1320, desc_ko: '아테네 항구에서 출발해 히드라, 포로스, 에기나를 둘러보는 실제 사로닉 제도 전일 크루즈', desc_en: 'Full-day Saronic Islands cruise from Athens to Hydra, Poros, and Aegina.' },
    { name_ko: '미케네와 에피다우로스 당일치기', name_en: 'Mycenae & Epidaurus Day Trip', duration: 540, isLandmark: true, x: 22.7549, y: 37.7308, open: 480, close: 1260, desc_ko: '펠로폰네소스의 미케네 유적과 에피다우로스 고대 극장을 함께 보는 하루 코스', desc_en: 'Full-day Peloponnese trip from Athens to Mycenae and the ancient theatre of Epidaurus.' },
    { name_ko: '수니온 곶 포세이돈 신전 당일치기', name_en: 'Cape Sounion & Temple of Poseidon Day Trip', duration: 420, isLandmark: false, x: 24.0243, y: 37.6506, open: 600, close: 1320, desc_ko: '아테네 남쪽 해안도로를 따라 수니온 곶과 포세이돈 신전을 다녀오는 근교 코스', desc_en: 'Nearby coastal day trip from Athens to Cape Sounion and the Temple of Poseidon.' }
  ],
  amsterdam: [
    { name_ko: '잔서스칸스와 볼렌담 풍차 마을 당일치기', name_en: 'Zaanse Schans & Volendam Day Trip', duration: 480, isLandmark: false, x: 4.8166, y: 52.4731, open: 480, close: 1260, desc_ko: '암스테르담 근교의 풍차 마을 잔서스칸스와 어촌 볼렌담을 함께 둘러보는 하루 코스', desc_en: 'Nearby day trip from Amsterdam to Zaanse Schans windmills and Volendam.' },
    { name_ko: '헤이그와 델프트 당일치기', name_en: 'The Hague & Delft Day Trip', duration: 480, isLandmark: false, x: 4.3007, y: 52.0705, open: 480, close: 1260, desc_ko: '기차로 헤이그의 미술관과 델프트 구시가지를 함께 보는 근교 당일 코스', desc_en: 'Rail day trip from Amsterdam to The Hague museums and Delft old town.' },
    { name_ko: '로테르담 건축 산책 당일치기', name_en: 'Rotterdam Architecture Day Trip', duration: 480, isLandmark: false, x: 4.4777, y: 51.9244, open: 480, close: 1260, desc_ko: '암스테르담에서 로테르담으로 이동해 큐브하우스, 마켓홀, 항구 전망을 보는 하루 코스', desc_en: 'Day trip to Rotterdam for Cube Houses, Markthal, and harbor architecture.' }
  ],
  dublin: [
    { name_ko: '클리프 오브 모허 당일치기', name_en: 'Cliffs of Moher Day Trip', duration: 600, isLandmark: true, x: -9.4309, y: 52.9715, open: 420, close: 1320, desc_ko: '더블린에서 아일랜드 서해안 클리프 오브 모허까지 다녀오는 장거리 전일 코스', desc_en: 'Long full-day trip from Dublin to the Cliffs of Moher on Ireland west coast.' },
    { name_ko: '글렌달록과 위클로 산맥 당일치기', name_en: 'Glendalough & Wicklow Mountains Day Trip', duration: 540, isLandmark: false, x: -6.3297, y: 53.0107, open: 480, close: 1260, desc_ko: '더블린 근교 글렌달록 수도원 유적과 위클로 산맥 풍경을 함께 보는 하루 코스', desc_en: 'Nearby Dublin day trip to Glendalough monastic site and Wicklow Mountains scenery.' },
    { name_ko: '벨파스트와 자이언츠 코즈웨이 당일치기', name_en: "Belfast & Giant's Causeway Day Trip", duration: 600, isLandmark: true, x: -6.5116, y: 55.2408, open: 420, close: 1320, desc_ko: '북아일랜드 벨파스트와 자이언츠 코즈웨이를 함께 다녀오는 장거리 하루 코스', desc_en: "Full-day trip from Dublin to Belfast and Giant's Causeway." }
  ],
  stockholm: [
    { name_ko: '웁살라와 시그투나 당일치기', name_en: 'Uppsala & Sigtuna Day Trip', duration: 480, isLandmark: false, x: 17.6389, y: 59.8586, open: 480, close: 1260, desc_ko: '스톡홀름에서 웁살라 대성당과 시그투나 고도시를 함께 보는 근교 당일 코스', desc_en: 'Rail day trip from Stockholm to Uppsala Cathedral and historic Sigtuna.' },
    { name_ko: '스톡홀름 군도 크루즈 당일치기', name_en: 'Stockholm Archipelago Day Cruise', duration: 480, isLandmark: false, x: 18.7360, y: 59.4022, open: 480, close: 1260, desc_ko: '스톡홀름 군도의 섬과 해안 풍경을 크루즈로 둘러보는 전일 일정', desc_en: 'Full-day cruise through the islands and coastline of the Stockholm Archipelago.' },
    { name_ko: '비르카 바이킹 유적 당일치기', name_en: 'Birka Viking Site Day Trip', duration: 480, isLandmark: false, x: 17.5430, y: 59.3354, open: 480, close: 1260, desc_ko: '보트로 유네스코 비르카 바이킹 유적을 다녀오는 스톡홀름 근교 하루 코스', desc_en: 'Boat day trip from Stockholm to the UNESCO-listed Birka Viking site.' }
  ],
  warsaw: [
    { name_ko: '크라쿠프 구시가지 장거리 당일치기', name_en: 'Krakow Old Town Day Trip', duration: 600, isLandmark: true, x: 19.9370, y: 50.0614, open: 420, close: 1320, desc_ko: '바르샤바에서 고속열차로 크라쿠프 구시가지와 바벨 언덕을 다녀오는 장거리 하루 코스', desc_en: 'Long rail day trip from Warsaw to Krakow Old Town and Wawel Hill.' },
    { name_ko: '토룬 중세 구시가지 당일치기', name_en: 'Torun Medieval Old Town Day Trip', duration: 480, isLandmark: false, x: 18.6048, y: 53.0138, open: 480, close: 1260, desc_ko: '바르샤바에서 토룬의 중세 구시가지와 코페르니쿠스 관련 명소를 보는 당일 코스', desc_en: 'Rail day trip from Warsaw to Torun medieval old town and Copernicus sights.' },
    { name_ko: '젤라조바 볼라 쇼팽 생가 당일치기', name_en: 'Zelazowa Wola Chopin Birthplace Day Trip', duration: 420, isLandmark: false, x: 20.3156, y: 52.2632, open: 480, close: 1200, desc_ko: '바르샤바 근교의 쇼팽 생가와 정원을 둘러보는 반나절 이상 근교 코스', desc_en: 'Nearby Warsaw trip to Chopin birthplace and gardens in Zelazowa Wola.' }
  ],
  abudhabi: [
    { name_ko: '알아인 오아시스와 제벨 하피트 당일치기', name_en: 'Al Ain Oasis & Jebel Hafeet Day Trip', duration: 540, isLandmark: false, x: 55.8065, y: 24.1302, open: 480, close: 1260, desc_ko: '아부다비에서 알아인 오아시스, 요새, 제벨 하피트 전망을 다녀오는 내륙 하루 코스', desc_en: 'Full-day trip from Abu Dhabi to Al Ain Oasis, forts, and Jebel Hafeet views.' },
    { name_ko: '두바이 대표 명소 당일치기', name_en: 'Dubai Highlights Day Trip', duration: 540, isLandmark: false, x: 55.2744, y: 25.1972, open: 480, close: 1320, desc_ko: '아부다비에서 두바이로 이동해 부르즈 할리파와 두바이 몰 일대를 보는 하루 코스', desc_en: 'Intercity day trip from Abu Dhabi to Dubai for Burj Khalifa and Downtown Dubai.' }
  ],
  busan: [
    { name_ko: '경주 불국사와 동궁과 월지 당일치기', name_en: 'Gyeongju Bulguksa & Donggung Wolji Day Trip', duration: 540, isLandmark: true, x: 129.3319, y: 35.7900, open: 480, close: 1260, desc_ko: '부산에서 경주로 이동해 불국사, 대릉원, 동궁과 월지를 둘러보는 대표 당일 코스', desc_en: 'Full-day trip from Busan to Gyeongju for Bulguksa, royal tombs, and Donggung Wolji.' },
    { name_ko: '통영 동피랑과 한려수도 당일치기', name_en: 'Tongyeong Dongpirang & Hallyeo Waterway Day Trip', duration: 540, isLandmark: false, x: 128.4240, y: 34.8460, open: 480, close: 1260, desc_ko: '부산에서 통영으로 이동해 동피랑 마을과 한려수도 전망을 즐기는 하루 코스', desc_en: 'Full-day trip from Busan to Tongyeong for Dongpirang village and Hallyeo Waterway views.' }
  ],
  nice: [
    { name_ko: '에즈와 모나코 당일치기', name_en: 'Eze & Monaco Day Trip', duration: 480, isLandmark: true, x: 7.4246, y: 43.7384, open: 480, close: 1260, desc_ko: '니스에서 에즈 언덕 마을과 모나코 몬테카를로를 함께 보는 프렌치 리비에라 하루 코스', desc_en: 'French Riviera day trip from Nice to Eze hill village and Monaco Monte Carlo.' },
    { name_ko: '칸과 앙티브 당일치기', name_en: 'Cannes & Antibes Day Trip', duration: 480, isLandmark: false, x: 7.0174, y: 43.5528, open: 480, close: 1260, desc_ko: '니스에서 칸 해변 산책로와 앙티브 구시가지를 함께 보는 근교 당일 코스', desc_en: 'Nearby day trip from Nice to Cannes waterfront and Antibes old town.' },
    { name_ko: '생폴드방스 예술 마을 당일치기', name_en: 'Saint-Paul-de-Vence Day Trip', duration: 420, isLandmark: false, x: 7.1229, y: 43.6974, open: 480, close: 1200, desc_ko: '니스 근교의 생폴드방스 골목과 갤러리를 둘러보는 예술 마을 하루 코스', desc_en: 'Nearby Nice day trip to the art village lanes and galleries of Saint-Paul-de-Vence.' }
  ],
  newyork: [
    { name_ko: '필라델피아 역사 지구 당일치기', name_en: 'Philadelphia Historic District Day Trip', duration: 480, isLandmark: false, x: -75.1503, y: 39.9489, open: 480, close: 1260, desc_ko: '뉴욕에서 기차로 이동해 독립기념관과 리버티 벨을 둘러보는 실제 근교 당일 코스', desc_en: 'Real nearby day trip from New York to Independence Hall and the Liberty Bell in Philadelphia' }
  ],
  rome: [
    { name_ko: '폼페이 유적과 나폴리 당일치기', name_en: 'Pompeii Archaeological Park & Naples Day Trip', duration: 540, isLandmark: true, x: 14.4869, y: 40.7484, open: 480, close: 1260, desc_ko: '로마에서 이동해 폼페이 고대 유적과 나폴리 구시가를 함께 보는 근교 당일 코스', desc_en: 'Full-day nearby trip from Rome to Pompeii Archaeological Park and historic Naples' },
    { name_ko: '티볼리 빌라 데스테와 하드리아누스 빌라', name_en: "Tivoli Villa d'Este & Hadrian's Villa Day Trip", duration: 480, isLandmark: false, x: 12.7963, y: 41.9633, open: 480, close: 1260, desc_ko: '로마 근교 티볼리의 유네스코 정원과 고대 별장을 둘러보는 당일 코스', desc_en: 'Nearby Rome day trip to Tivoli for Villa d Este gardens and Hadrian s Villa' }
  ],
  shanghai: [
    { name_ko: '쑤저우 정원과 핑장루 당일치기', name_en: 'Suzhou Classical Gardens & Pingjiang Road Day Trip', duration: 480, isLandmark: true, x: 120.6273, y: 31.3249, open: 480, close: 1260, desc_ko: '상하이에서 고속철로 이동해 쑤저우 고전원림과 운하 거리를 보는 근교 코스', desc_en: 'Real high-speed-rail day trip from Shanghai to Suzhou classical gardens and canal streets' },
    { name_ko: '항저우 서호 당일치기', name_en: 'Hangzhou West Lake Day Trip', duration: 540, isLandmark: true, x: 120.1486, y: 30.2431, open: 480, close: 1260, desc_ko: '상하이에서 이동해 서호와 호반 산책로를 하루 동안 둘러보는 근교 코스', desc_en: 'Full-day nearby trip from Shanghai to Hangzhou West Lake and lakeside paths' }
  ],
  tokyo: [
    { name_ko: '가마쿠라와 에노시마 당일치기', name_en: 'Kamakura & Enoshima Day Trip', duration: 480, isLandmark: true, x: 139.5357, y: 35.3168, open: 480, close: 1260, desc_ko: '도쿄에서 이동해 대불, 사찰, 에노시마 해안을 둘러보는 실제 근교 코스', desc_en: 'Real Tokyo day trip to Kamakura temples, the Great Buddha, and Enoshima coast' },
    { name_ko: '닛코 도쇼구 당일치기', name_en: 'Nikko Toshogu Shrine Day Trip', duration: 540, isLandmark: true, x: 139.5989, y: 36.7581, open: 480, close: 1260, desc_ko: '도쿄에서 이동해 닛코 도쇼구와 자연 경관을 보는 근교 당일 코스', desc_en: 'Full-day Tokyo side trip to Nikko Toshogu Shrine and mountain scenery' }
  ],
  osaka: [
    { name_ko: '교토 후시미이나리와 기온 당일치기', name_en: 'Kyoto Fushimi Inari & Gion Day Trip', duration: 480, isLandmark: true, x: 135.7727, y: 34.9671, open: 480, close: 1260, desc_ko: '오사카에서 교토로 이동해 후시미이나리와 기온을 둘러보는 근교 코스', desc_en: 'Nearby Osaka day trip to Kyoto for Fushimi Inari and Gion' },
    { name_ko: '나라 도다이지와 사슴공원 당일치기', name_en: 'Nara Todai-ji & Deer Park Day Trip', duration: 420, isLandmark: true, x: 135.8398, y: 34.6889, open: 480, close: 1260, desc_ko: '오사카에서 나라로 이동해 도다이지와 나라공원을 보는 실제 근교 코스', desc_en: 'Real nearby day trip from Osaka to Todai-ji Temple and Nara Park' }
  ],
  seoul: [
    { name_ko: '수원 화성 행궁 당일치기', name_en: 'Suwon Hwaseong Fortress Day Trip', duration: 420, isLandmark: true, x: 127.0095, y: 37.2870, open: 480, close: 1260, desc_ko: '서울에서 이동해 유네스코 수원화성과 화성행궁을 둘러보는 근교 코스', desc_en: 'Nearby Seoul day trip to UNESCO-listed Suwon Hwaseong Fortress and palace' },
    { name_ko: 'DMZ 임진각 평화누리 당일치기', name_en: 'DMZ Imjingak Peace Park Day Trip', duration: 480, isLandmark: false, x: 126.7401, y: 37.8893, open: 480, close: 1260, desc_ko: '서울에서 이동해 임진각과 평화누리 일대를 둘러보는 실제 근교 코스', desc_en: 'Real Seoul side trip to Imjingak and Peace Park near the DMZ' }
  ],
  london: [
    { name_ko: '윈저성 당일치기', name_en: 'Windsor Castle Day Trip', duration: 420, isLandmark: true, x: -0.6044, y: 51.4839, open: 480, close: 1260, desc_ko: '런던에서 기차로 이동해 윈저성과 템스 강변을 둘러보는 근교 코스', desc_en: 'Nearby London day trip by train to Windsor Castle and the Thames riverside' },
    { name_ko: '옥스퍼드 대학 도시 당일치기', name_en: 'Oxford University City Day Trip', duration: 480, isLandmark: false, x: -1.2544, y: 51.7548, open: 480, close: 1260, desc_ko: '런던에서 이동해 옥스퍼드 칼리지와 보들리언 도서관 주변을 보는 근교 코스', desc_en: 'Nearby London day trip to Oxford colleges and the Bodleian Library area' }
  ],
  barcelona: [
    { name_ko: '몬세라트 수도원 당일치기', name_en: 'Montserrat Monastery Day Trip', duration: 480, isLandmark: true, x: 1.8374, y: 41.5930, open: 480, close: 1260, desc_ko: '바르셀로나에서 이동해 몬세라트 산악 수도원과 전망을 보는 근교 코스', desc_en: 'Nearby Barcelona day trip to Montserrat monastery and mountain views' },
    { name_ko: '지로나 구시가지 당일치기', name_en: 'Girona Old Town Day Trip', duration: 420, isLandmark: false, x: 2.8249, y: 41.9794, open: 480, close: 1260, desc_ko: '바르셀로나에서 기차로 이동해 지로나 성벽과 구시가를 걷는 근교 코스', desc_en: 'Nearby Barcelona rail day trip to Girona walls and medieval old town' }
  ]
};

function addNearbyDayTripSupplements(cityPools, cityId, days) {
  const trips = NEARBY_DAY_TRIP_SUPPLEMENTS[cityId];
  if (!trips || !cityPools) return;
  const totalSightseeing = ['healing', 'culture', 'activity', 'shopping']
    .flatMap(cat => Array.isArray(cityPools[cat]) ? cityPools[cat] : [])
    .filter(item => item && !isNearbyDayTripItem(item) && !isFoodOrDrinkAttraction(item))
    .filter(item => !isInvalidGeneratedPlaceForCity(item, cityId) && hasUsableAttractionCoords(item, cityId))
    .length;
  if (totalSightseeing >= days * 3) return;

  cityPools.activity = cityPools.activity || [];
  const existing = new Set();
  ['healing', 'culture', 'activity', 'shopping'].forEach(cat => {
    (cityPools[cat] || []).forEach(item => {
      rememberUsedPlaceKeys(item, existing);
    });
  });
  trips.slice(0, 2).forEach(trip => {
    if (!isReasonableNearbyDayTripForCity({ ...trip, cityId }, cityId)) return;
    const keys = getGlobalPlaceKeys(trip);
    if (!hasUsedPlaceKeys(keys, existing)) {
      cityPools.activity.push(markNearbyDayTripPresentation({ ...trip, cityId }));
      rememberUsedPlaceKeys(keys, existing);
    }
  });
}

const SPORTS_EVENT_DURATION_MINUTES = {
  football: 120,
  baseball: 180,
  basketball: 150,
  hockey: 150,
  americanFootball: 210,
  cricket: 210,
  rugby: 150
};

const SPORTS_EVENT_SUGGESTIONS = {
  seoul: { ko: '잠실야구장 KBO 야구 경기 직관', en: 'KBO Baseball Game at Jamsil Baseball Stadium', sport: 'baseball', x: 127.0719, y: 37.5123 },
  tokyo: { ko: '도쿄돔 프로야구 경기 직관', en: 'Professional Baseball Game at Tokyo Dome', sport: 'baseball', x: 139.7519, y: 35.7056 },
  osaka: { ko: '한신 고시엔 스타디움 야구 경기 직관', en: 'Hanshin Baseball Game at Koshien Stadium', sport: 'baseball', x: 135.3616, y: 34.7212 },
  paris: { ko: '파르크 데 프랭스 축구 경기 직관', en: 'Football Match at Parc des Princes', sport: 'football', x: 2.2528, y: 48.8414 },
  london: { ko: '웸블리 스타디움 축구 경기 직관', en: 'Football Match at Wembley Stadium', sport: 'football', x: -0.2796, y: 51.5560 },
  newyork: { ko: '양키 스타디움 MLB 야구 경기 직관', en: 'MLB Baseball Game at Yankee Stadium', sport: 'baseball', x: -73.9262, y: 40.8296 },
  losangeles: { ko: '다저 스타디움 MLB 야구 경기 직관', en: 'MLB Baseball Game at Dodger Stadium', sport: 'baseball', x: -118.2400, y: 34.0739 },
  barcelona: { ko: '캄 노우 축구 경기 직관', en: 'Football Match at Camp Nou', sport: 'football', x: 2.1228, y: 41.3809 },
  madrid: { ko: '산티아고 베르나베우 축구 경기 직관', en: 'Football Match at Santiago Bernabeu', sport: 'football', x: -3.6883, y: 40.4531 },
  rome: { ko: '스타디오 올림피코 축구 경기 직관', en: 'Football Match at Stadio Olimpico', sport: 'football', x: 12.4547, y: 41.9339 },
  munich: { ko: '알리안츠 아레나 축구 경기 직관', en: 'Football Match at Allianz Arena', sport: 'football', x: 11.6247, y: 48.2188 },
  berlin: { ko: '올림피아슈타디온 축구 경기 직관', en: 'Football Match at Olympiastadion Berlin', sport: 'football', x: 13.2394, y: 52.5147 },
  amsterdam: { ko: '요한 크루이프 아레나 축구 경기 직관', en: 'Football Match at Johan Cruyff Arena', sport: 'football', x: 4.9419, y: 52.3142 },
  rio: { ko: '마라카낭 스타디움 축구 경기 직관', en: 'Football Match at Maracana Stadium', sport: 'football', x: -43.2302, y: -22.9122 },
  buenosaires: { ko: '라 봄보네라 축구 경기 직관', en: 'Football Match at La Bombonera', sport: 'football', x: -58.3647, y: -34.6356 },
  sydney: { ko: '시드니 크리켓 그라운드 럭비/AFL 경기 직관', en: 'Rugby or AFL Match at Sydney Cricket Ground', sport: 'rugby', x: 151.2248, y: -33.8915 },
  doha: { ko: '루사일 스타디움 축구 경기 직관', en: 'Football Match at Lusail Stadium', sport: 'football', x: 51.4900, y: 25.4209 },
  dubai: { ko: '두바이 인터내셔널 크리켓 스타디움 경기 직관', en: 'Cricket Match at Dubai International Cricket Stadium', sport: 'cricket', x: 55.2216, y: 25.0468 },
  boston: { ko: '펜웨이 파크 MLB 야구 경기 직관', en: 'MLB Baseball Game at Fenway Park', sport: 'baseball', x: -71.0972, y: 42.3467 },
  chicago: { ko: '리글리 필드 MLB 야구 경기 직관', en: 'MLB Baseball Game at Wrigley Field', sport: 'baseball', x: -87.6553, y: 41.9484 },
  miami: { ko: '카세야 센터 NBA 농구 경기 직관', en: 'NBA Basketball Game at Kaseya Center', sport: 'basketball', x: -80.1870, y: 25.7814 },
  sanfrancisco: { ko: '체이스 센터 NBA 농구 경기 직관', en: 'NBA Basketball Game at Chase Center', sport: 'basketball', x: -122.3877, y: 37.7680 },
  lasvegas: { ko: '티모바일 아레나 NHL 하키 경기 직관', en: 'NHL Hockey Game at T-Mobile Arena', sport: 'hockey', x: -115.1783, y: 36.1028 },
  houston: { ko: '미닛메이드 파크 MLB 야구 경기 직관', en: 'MLB Baseball Game at Minute Maid Park', sport: 'baseball', x: -95.3555, y: 29.7573 },
  shanghai: { ko: '상하이 스타디움 축구 경기 직관', en: 'Football Match at Shanghai Stadium', sport: 'football', x: 121.4372, y: 31.1836 },
  singapore: { ko: '싱가포르 국립경기장 축구 경기 직관', en: 'Football Match at Singapore National Stadium', sport: 'football', x: 103.8742, y: 1.3040 },
  bangkok: { ko: '라자망갈라 국립경기장 축구 경기 직관', en: 'Football Match at Rajamangala National Stadium', sport: 'football', x: 100.6222, y: 13.7556 }
};

function getExpandedTravelPreferenceSet(preferences) {
  const set = new Set((Array.isArray(preferences) ? preferences : []).filter(Boolean));
  if (set.has('sports')) set.add('activity');
  if (set.has('photo')) {
    set.add('culture');
    set.add('healing');
  }
  return set;
}

function getSightseeingCategoryKeys(cityPools) {
  return ['healing', 'culture', 'activity', 'sports', 'shopping', 'photo']
    .filter(cat => Array.isArray(cityPools && cityPools[cat]));
}

function getAttractionPriorityRank(item) {
  const rank = Number(item && item.priorityRank);
  if (Number.isFinite(rank)) return rank;
  if (item && item.isLandmark) return 1000;
  return 5000;
}

function compareAttractionPriority(a, b) {
  const diff = getAttractionPriorityRank(a) - getAttractionPriorityRank(b);
  if (diff) return diff;
  return Number(!!b && b.isLandmark) - Number(!!a && a.isLandmark);
}

function sortCityPoolsByAttractionPriority(cityPools) {
  if (!cityPools) return;
  getSightseeingCategoryKeys(cityPools).forEach(cat => {
    cityPools[cat].sort(compareAttractionPriority);
  });
}

function createSportsEventForCity(cityId, customCityName) {
  const suggestion = SPORTS_EVENT_SUGGESTIONS[cityId] || null;
  const city = Array.isArray(CITIES) ? CITIES.find(c => c.id === cityId) : null;
  const clusterList = (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[cityId]) ? CITY_CLUSTERS[cityId] : [];
  const fallbackCenter = (typeof getCityCenterCluster === 'function' && getCityCenterCluster(cityId)) ||
    (clusterList[0] || { x: 5, y: 5 });
  const sport = suggestion ? suggestion.sport : 'football';
  const duration = SPORTS_EVENT_DURATION_MINUTES[sport] || 150;
  const koCity = (city && city.name_ko) || customCityName || '';
  const enCity = (city && city.name_en) || customCityName || 'Local';
  return {
    name_ko: suggestion ? suggestion.ko : `${koCity} 대표 스포츠 경기 직관`,
    name_en: suggestion ? suggestion.en : `${enCity} Live Sports Match`,
    desc_ko: `현지 팬들과 함께 보는 대표 스포츠 경기 관람. 평균 관람 시간 ${Math.round(duration / 30) / 2}시간 기준으로 배치합니다.`,
    desc_en: `Watch a signature local sports match with home fans. Scheduled using an average live-event duration of ${duration} minutes.`,
    duration,
    x: suggestion ? suggestion.x : fallbackCenter.x,
    y: suggestion ? suggestion.y : fallbackCenter.y,
    cityId,
    open: 960,
    close: 1410,
    isSportsEvent: true
  };
}

function buildPhotogenicPool(cityPools) {
  const sourceCats = ['healing', 'culture', 'activity', 'shopping'];
  const keywords = [
    'view', 'skyline', 'tower', 'observatory', 'bridge', 'palace', 'castle', 'garden', 'park', 'beach', 'street',
    'square', 'promenade', 'waterfront', 'photo', 'sunset', 'night view', 'landmark', 'scenic'
  ];
  const seen = new Set();
  const photoItems = [];
  sourceCats.forEach(cat => {
    (cityPools[cat] || []).forEach(item => {
      const text = `${item.name_en || ''} ${item.desc_en || ''}`.toLowerCase();
      const key = (item.name_en || item.name_ko || '').toLowerCase();
      if (!key || seen.has(key)) return;
      if (item.isLandmark || keywords.some(kw => text.includes(kw))) {
        seen.add(key);
        photoItems.push({ ...item, isPhotoSpot: true });
      }
    });
  });
  return photoItems;
}

function buildCourseStructure(cityId, days, preferences, customCityName, wikiPools) {
  dedupeAttractionPoolsForCity(cityId);
  const dayPlans = [];
  const preferenceSet = getExpandedTravelPreferenceSet(preferences);
  let cityPools;
  if (cityId === 'custom' || !ATTRACTIONS[cityId]) {
    cityPools = {
      healing: [],
      gourmet: [],
      culture: [],
      activity: [],
      shopping: []
    };

    const categoriesList = ['healing', 'gourmet', 'culture', 'activity', 'shopping'];
    categoriesList.forEach(cat => {
      const wikiItems = (wikiPools && wikiPools[cat]) || [];
      
      // Preserve lat/lon/x/y from wiki items and mark them with correct cityId
      wikiItems.forEach(item => {
        item.cityId = cityId;
      });
      
      cityPools[cat] = [...wikiItems];
      
      cityPools[cat].forEach((item, idx) => {
        item.isLandmark = idx < 2;
      });
    });
  } else {
    const originalPools = ATTRACTIONS[cityId] || ATTRACTIONS['seoul'];
    cityPools = {
      healing: [...(originalPools.healing || [])],
      gourmet: [...(originalPools.gourmet || [])],
      culture: [...(originalPools.culture || [])],
      activity: [...(originalPools.activity || [])],
      shopping: [...(originalPools.shopping || [])]
    };
    if (cityId === 'interlaken') {
      ['healing', 'culture', 'activity', 'shopping'].forEach(category => {
        cityPools[category] = cityPools[category].filter(item => !item.regionalRoute);
      });
    }

    // Supplement curated pools with wiki data when attractions are insufficient
    // Each day needs ~4 sightseeing spots; if total sightseeing < days * 4, merge wiki items
    const totalSightseeing = (cityPools.healing.length + cityPools.culture.length +
                              cityPools.activity.length + cityPools.shopping.length);
    const neededSpots = days * 4;
    if (totalSightseeing < neededSpots && wikiPools) {
      const sightseeingCats = ['healing', 'culture', 'activity', 'shopping'];
      sightseeingCats.forEach(cat => {
        const wikiItems = (wikiPools[cat] || []);
        const existingNames = new Set(cityPools[cat].map(item =>
          (item.name_en || '').toLowerCase()
        ));
        wikiItems.forEach(item => {
          const nameKey = (item.name_en || '').toLowerCase();
          if (nameKey && !existingNames.has(nameKey)) {
            item.cityId = cityId;
            cityPools[cat].push(item);
            existingNames.add(nameKey);
          }
        });
      });
    }
  }

  // Curated cities use vetted city-specific pools, supplemented with wiki data when insufficient.
  addNearbyDayTripSupplements(cityPools, cityId, days);
  normalizeVisitDurationsInPools(cityPools);

  cityPools = filterSyntheticAttractionPools(cityPools, cityId);
  sortCityPoolsByAttractionPriority(cityPools);

  cityPools.sports = preferenceSet.has('sports')
    ? [createSportsEventForCity(cityId, customCityName)]
    : [];
  cityPools.photo = preferenceSet.has('photo')
    ? buildPhotogenicPool(cityPools)
    : [];

  // Handle custom regeneration filters
  if (state.regenConfig) {
    if (state.regenConfig.excludeShopping) {
      cityPools.shopping = [];
      cityPools.photo = (cityPools.photo || []).filter(item => {
        const text = `${item.name_en || ''} ${item.name_ko || ''} ${item.desc_en || ''} ${item.desc_ko || ''}`.toLowerCase();
        return !/(shopping|shop|mall|outlet|market|쇼핑|시장|아울렛|몰)/i.test(text);
      });
    }
  }

  // Pre-resolve coordinates and cityId for all pool items
  for (const cat in cityPools) {
    if (Array.isArray(cityPools[cat])) {
      cityPools[cat].forEach(item => {
        item.cityId = cityId;
        const coords = getAttractionCoords(item, cityId);
        item.x = coords.x;
        item.y = coords.y;
        item.coordinateSource = coords.coordinateSource;
      });
    }
  }


  const isThemePark = (item) => {
    if (!item) return false;
    const text = ((item.name_ko || '') + ' ' + (item.desc_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_en || '')).toLowerCase();
    return ['테마파크', '놀이공원', '놀이동산', '어트랙션', '유니버셜', '디즈니', '롯데월드', '에버랜드', '레고랜드',
            'theme park', 'amusement', 'universal', 'disney', 'lotte world', 'everland', 'legoland'].some(kw => text.includes(kw));
  };

  const isFullDayTripItem = (item) => {
    if (!item) return false;
    if (isThemePark(item) || isOutletOrFarShoppingItem(item) || isNearbyDayTripItem(item)) return true;
    if ((item.duration || 0) >= 420) return true;
    const text = ((item.name_ko || '') + ' ' + (item.desc_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_en || '')).toLowerCase();
    if (['statue of liberty', 'liberty island ferry', 'ellis island'].some(kw => text.includes(kw))) return false;
    return [
      '근교', '당일치기', '데이투어', '일일투어', '섬 투어', '섬 여행', '외곽', '교외',
      'day trip', 'day tour', 'full-day', 'full day', 'suburban', 'outskirts', 'nearby town',
      'national park', 'safari'
    ].some(kw => text.includes(kw));
  };

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

  const isVerifiedCafeItem = (item) => {
    if (!isCafeItem(item)) return false;
    if (item.verifiedCafe) return true;
    const normalize = (value) => String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and');
    const text = normalize((item.name_en || '') + ' ' + (item.name_ko || ''));
    const verifiedCafeFragments = [
      'urth caffe', 'blue bottle coffee', 'republik coffee', 'alfred coffee',
      'sightglass coffee', 'ritual coffee', 'tartine bakery', 'sambalatte',
      'mothership coffee', 'jean philippe patisserie', 'intelligentsia coffee',
      'dark matter coffee', 'sawada coffee', 'stans donuts', 'panther coffee',
      'versailles bakery', 'vice city bean', 'all day specialty coffee',
      'george howell coffee', 'thinking cup', 'tatte bakery', 'ogawa coffee',
      'original starbucks', 'la marzocco', 'elm coffee', 'victrola coffee',
      'lineage coffee', 'foxtail coffee', 'craft and common', 'stardust video and coffee',
      'better buzz coffee', 'bird rock coffee', 'copa vida', 'lestats coffee',
      'baked and wired', 'compass coffee', 'colada shop',
      'angelina tea room', 'cafe de flore', 'les deux magots', 'antico caffe greco',
      'levain bakery', 'arabian tea house', 'dallmayr', 'cafe luitpold',
      'cafe louvre', 'cafe imperial', 'el fishawy cafe', 'medina cafe',
      'ya kun kaya toast', 'the ritz london afternoon tea', 'dishoom',
      'osulloc tea museum', 'bukchon cha-teul', 'o sulloc tea museum'
    ];
    return verifiedCafeFragments.some(fragment => text.includes(fragment));
  };

  const isNightOnly = (item) => {
    const name_ko = item.name_ko || '';
    const name_en = item.name_en || '';
    const desc_ko = item.desc_ko || '';
    const desc_en = item.desc_en || '';

    const name_ko_lower = name_ko.toLowerCase();
    const name_en_lower = name_en.toLowerCase();
    const desc_ko_lower = desc_ko.toLowerCase();
    const desc_en_lower = desc_en.toLowerCase();

    // 1. Check NAME against all night keywords
    const clean_name_en = name_en_lower.replace(/[,.&-/]/g, ' ');
    const words_name_en = clean_name_en.split(/\s+/).filter(Boolean);

    const night_words_en = ['night', 'pub', 'pubs', 'beer', 'beers', 'club', 'clubs', 'bar', 'bars', 'dinner', 'dinners', 'rooftop', 'brewery', 'breweries', 'izakaya', 'diner', 'diners', 'sunset'];
    const has_night_en_name = words_name_en.some(w => night_words_en.includes(w));

    const night_keywords_ko = ['야시장', '야경', '야간', '펍', '맥주', '디너', '이자카야', '루프탑', '클럽', '저녁', '노을', '일몰', '석양', '선셋', '심야'];
    const has_night_ko_name = night_keywords_ko.some(kw => name_ko_lower.includes(kw));

    let has_bar_ko_name = false;
    const words_ko_name = name_ko_lower.split(/\s+/).filter(Boolean);
    if (words_ko_name.includes('바') || words_ko_name.some(w => w.startsWith('바(') || w.endsWith(')바'))) {
      const exclusions = ['바다', '바닥', '바람', '바토무슈', '바이에른', '바티칸', '바르셀로나', '오다이바', '블타바', '파블로바', '바스타키아', '바하'];
      if (!exclusions.some(fp => name_ko_lower.includes(fp))) {
        has_bar_ko_name = true;
      }
    }

    // 2. Check DESCRIPTION ONLY against strict dinner/sunset/night-only keywords
    const clean_desc_en = desc_en_lower.replace(/[,.&-/]/g, ' ');
    const words_desc_en = clean_desc_en.split(/\s+/).filter(Boolean);

    const strict_desc_en = ['dinner', 'dinners', 'diner', 'diners', 'sunset', 'sunsets', 'nightlife', 'night-only', 'midnight'];
    const has_night_en_desc = words_desc_en.some(w => strict_desc_en.includes(w));

    const strict_desc_ko = ['저녁', '디너', '노을', '일몰', '석양', '선셋', '야경', '야간', '야시장', '심야'];
    const has_night_ko_desc = strict_desc_ko.some(kw => desc_ko_lower.includes(kw));

    const is_night = has_night_en_name || has_night_ko_name || has_bar_ko_name || has_night_en_desc || has_night_ko_desc;

    // Exclusions
    const is_sports_club = ['카약 클럽', '요트 클럽', '보트 클럽', '서핑 클럽'].some(sc => name_ko_lower.includes(sc));
    const is_beer_cosmetics = name_ko_lower.includes('맥주 샴푸') || name_ko_lower.includes('맥주 화장품');
    const is_daytime_coffee = ['에스프레소', '커피', '카페', '브런치'].some(c => name_ko_lower.includes(c));

    if (is_sports_club || is_beer_cosmetics || is_daytime_coffee) {
      const text_ko = (name_ko + ' ' + desc_ko).toLowerCase();
      if (!['야간', '야경', '야시장', '저녁', '디너', '노을', '일몰', '석양', '선셋', '심야'].some(kw => text_ko.includes(kw))) {
        return false;
      }
    }

    return !!is_night;
  };

  const isActualNightView = (item) => {
    if (!item) return false;
    const text = ((item.name_ko || '') + ' ' + (item.desc_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_en || '')).toLowerCase();
    // Core night-only keywords (strong signals)
    const strongNightKeywords = ['야경', 'night view', '야간', '바 ', '펍', 'pub', 'bar'];
    if (strongNightKeywords.some(kw => text.includes(kw))) return true;
    // For landmarks, 'tower', 'observatory', 'cruise' etc. are daytime activities too
    if (item.isLandmark) {
      return false;
    }
    const weakNightKeywords = ['night', '유람선', '크루즈', 'cruise', '관람차', '전망대', 'observatory', '타워', 'tower'];
    return weakNightKeywords.some(kw => text.includes(kw));
  };

  const isFoodOrDrinkPlace = (item) => {
    return isFoodOrDrinkAttraction(item);
    const name = ((item.name_ko || '') + ' ' + (item.name_en || '')).toLowerCase();
    const keywords = [
      '식당', '레스토랑', '맛집', '음식점', '카페', '찻집', '베이커리', '빵집', '디저트', '펍', '선술집', '바 ', '이자카야',
      'restaurant', 'cafe', 'bistro', 'diner', 'eatery', 'pub', 'bar', 'bakery', 'patisserie', 'brunch', 'gastronomy'
    ];
    return keywords.some(kw => name.includes(kw));
  };

  const landmarks = [];
  const sightseeingCategories = getSightseeingCategoryKeys(cityPools);
  
  sightseeingCategories.forEach(cat => {
    const list = cityPools[cat] || [];
    list.forEach(att => {
      if (att.isLandmark) {
        if (isFoodOrDrinkPlace(att)) return;
        if (!landmarks.some(l => placeKeysOverlap(getGlobalPlaceKeys(l), getGlobalPlaceKeys(att)))) {
          landmarks.push(att);
        }
      }
    });
  });
  landmarks.sort(compareAttractionPriority);

  const getPlaceKeys = (item) => getGlobalPlaceKeys(item);
  const getPlaceKey = (item) => getPlaceKeys(item)[0] || '';
  const samePlace = (a, b) => placeKeysOverlap(getPlaceKeys(a), getPlaceKeys(b));
  const prioritySightseeingTargets = [];
  const addPrioritySightseeingTarget = (item) => {
    if (!item || isFoodOrDrinkPlace(item)) return;
    const key = getPlaceKey(item);
    if (!key) return;
    if (!prioritySightseeingTargets.some(target => samePlace(target, item))) {
      prioritySightseeingTargets.push(item);
    }
  };

  // City data is ordered by representative tourist importance.
  // Force landmarks plus the top sightseeing spots into the first two days before softer filler stops.
  sightseeingCategories.forEach(cat => {
    const list = cityPools[cat] || [];
    list.forEach((att, idx) => {
      if (att.isLandmark || idx < 2) {
        addPrioritySightseeingTarget(att);
      }
    });
  });
  prioritySightseeingTargets.sort(compareAttractionPriority);

  const preferred = [];
  const others = [];
  sightseeingCategories.forEach(cat => {
    const list = cityPools[cat] || [];
    const isPreferred = preferenceSet.has(cat);
    list.forEach(att => {
      if (att.isLandmark) return;
      if (isFoodOrDrinkPlace(att)) return;
      if (isPreferred) {
        if (!preferred.some(p => samePlace(p, att))) {
          preferred.push(att);
        }
      } else {
        if (!others.some(o => samePlace(o, att))) {
          others.push(att);
        }
      }
    });
  });

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  shuffle(preferred);
  shuffle(others);

  const visitedNames = new Set();
  const markVisited = (item) => {
    if (!item) return;
    [item.name_ko, item.name_en].forEach(name => {
      if (name) visitedNames.add(name);
    });
    rememberUsedPlaceKeys(item, visitedNames);
  };
  const hasVisited = (item) => {
    if (!item) return false;
    if (visitedNames.has(item.name_ko) || visitedNames.has(item.name_en)) return true;
    return hasUsedPlaceKeys(getPlaceKeys(item), visitedNames);
  };
  const unvisitedLandmarks = [...landmarks];
  const unvisitedPriorityTargets = [...prioritySightseeingTargets];
  let fallbackCount = 0;
  let lunchFallbackCount = 0;
  let dinnerFallbackCount = 0;
  let coffeeFallbackCount = 0;

  const markAsVisited = (item, isNightSlot) => {
    if (!item) return;
    markVisited(item);
    if (item.isFallback) return;
    
    const ulIdx = unvisitedLandmarks.findIndex(l => samePlace(l, item) || l.name_ko === item.name_ko || l.name_en === item.name_en);
    if (ulIdx !== -1) unvisitedLandmarks.splice(ulIdx, 1);

    const upIdx = unvisitedPriorityTargets.findIndex(l => samePlace(l, item));
    if (upIdx !== -1) unvisitedPriorityTargets.splice(upIdx, 1);
    
    const pool = isNightSlot ? nightSightseeing : daySightseeing;
    const pIdx = pool.findIndex(p => samePlace(p, item) || p.name_ko === item.name_ko || p.name_en === item.name_en);
    if (pIdx !== -1) pool.splice(pIdx, 1);
  };

  const markCafeAsVisited = (item) => {
    if (!item) return;
    markVisited(item);
    if (item.isFallback) return;
    
    const idx = dayCafes.findIndex(c => samePlace(c, item) || c.name_ko === item.name_ko || c.name_en === item.name_en);
    if (idx !== -1) dayCafes.splice(idx, 1);
    
    const idx2 = cafes.findIndex(c => samePlace(c, item) || c.name_ko === item.name_ko || c.name_en === item.name_en);
    if (idx2 !== -1) cafes.splice(idx2, 1);
  };

  const dayPreferred = preferred.filter(att => !isActualNightView(att));
  const nightPreferred = preferred.filter(att => isActualNightView(att));
  const dayOthers = others.filter(att => !isActualNightView(att));
  const nightOthers = others.filter(att => isActualNightView(att));

  const daySightseeing = [...dayPreferred, ...dayOthers];
  const nightSightseeing = [...nightPreferred, ...nightOthers];

  const gourmetPool = cityPools.gourmet || [];
  const cafes = gourmetPool.filter(item => isCafeItem(item) && isVerifiedCafeItem(item));
  const diners = gourmetPool.filter(item => !isCafeItem(item));
  let totalCafeCount = 0;

  shuffle(cafes);
  shuffle(diners);

  const isBreakfastOnly = (item) => {
    if (isCafeItem(item)) return false;
    const text = ((item.name_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_ko || '') + ' ' + (item.desc_en || '')).toLowerCase();
    return ['아침', '조식', 'breakfast'].some(kw => text.includes(kw));
  };

  const isLunchOnly = (item) => {
    if (isCafeItem(item)) return false;
    const text = ((item.name_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_ko || '') + ' ' + (item.desc_en || '')).toLowerCase();
    return ['점심', '런치', 'lunch'].some(kw => text.includes(kw));
  };

  const isDinnerOnly = (item) => {
    if (isCafeItem(item)) return false;
    const text = ((item.name_ko || '') + ' ' + (item.name_en || '') + ' ' + (item.desc_ko || '') + ' ' + (item.desc_en || '')).toLowerCase();
    const containsDinnerKeyword = ['저녁', '디너', 'dinner', '야간', '펍', 'pub', 'bar', 'rooftop', 'night'].some(kw => text.includes(kw));
    return containsDinnerKeyword || isNightOnly(item);
  };


  const lunchDiners = diners.filter(item => {
    if (isBreakfastOnly(item) || isDinnerOnly(item)) return false;
    const hours = getOperatingHours(item);
    return hours.open <= 780 && hours.close >= 870;
  });
  const dinnerDiners = diners.filter(item => {
    if (isBreakfastOnly(item) || isLunchOnly(item)) return false;
    const hours = getOperatingHours(item);
    return hours.open <= 1200 && hours.close >= 1290;
  });


  const dayCafes = cafes.filter(item => !isNightOnly(item));

  const QUADRANT_PREFERENCES = {
    1: [1, 2, 3, 4],
    2: [2, 1, 4, 3],
    3: [3, 1, 4, 2],
    4: [4, 2, 3, 1]
  };

  const pullClosestItem = (fromItem, array, preferredQuadrant) => {
    if (array.length === 0) return null;
    let minIdx = -1;
    let minDist = Infinity;

    const order = (preferredQuadrant && QUADRANT_PREFERENCES[preferredQuadrant])
      ? QUADRANT_PREFERENCES[preferredQuadrant]
      : [1, 2, 3, 4];

    // Try each quadrant in preference order
    for (const q of order) {
      for (let i = 0; i < array.length; i++) {
        if (getQuadrant(array[i]) === q) {
          const dist = fromItem ? getDistance(fromItem, array[i]) : 0;
          if (dist < minDist) {
            minDist = dist;
            minIdx = i;
          }
        }
      }
      if (minIdx !== -1) {
        break;
      }
    }

    // Fallback: if no item is in any quadrant of the preference order, find closest overall
    if (minIdx === -1) {
      minDist = Infinity;
      for (let i = 0; i < array.length; i++) {
        const dist = fromItem ? getDistance(fromItem, array[i]) : 0;
        if (dist < minDist) {
          minDist = dist;
          minIdx = i;
        }
      }
    }

    const item = array[minIdx];
    array.splice(minIdx, 1);
    return item;
  };



  const isRelaxedMode = !!(state.regenConfig && state.regenConfig.relaxed);
  const isPackedMode = !!(state.regenConfig && state.regenConfig.packed);
  const DAY_START = isPackedMode ? 480 : (isRelaxedMode ? 570 : 510);
  const HARD_CAP = isPackedMode ? 1380 : (isRelaxedMode ? 1260 : 1320);
  const MEAL_DURATION = isPackedMode ? 70 : (isRelaxedMode ? 120 : 90);
  const MAX_VISITS_PER_DAY = isPackedMode ? 6 : (isRelaxedMode ? 2 : 4);
  const PACE_DURATION_FACTOR = isPackedMode ? 0.82 : (isRelaxedMode ? 1.18 : 1);

  const getItemDuration = (item) => {
    const dur = item.duration || 90;
    if (item.durationSource === 'curated-venue-guidance') return dur;
    // Full-day attractions (theme parks, big day trips) keep their actual duration
    // These places dominate an entire day intentionally
    const FULL_DAY_THRESHOLD = 300; // 5 hours or more = full day attraction
    if (dur >= FULL_DAY_THRESHOLD) return dur;
    // Large half-day attractions (major sites, big outlets) - keep up to 360min
    const HALF_DAY_THRESHOLD = 180; // 3+ hours = half day
    const text = `${item.name_ko || ''} ${item.name_en || ''} ${item.desc_ko || ''} ${item.desc_en || ''}`.toLowerCase();
    const isMajorIndoor = /(museum|gallery|palace|castle|aquarium|space center|\uBC15\uBB3C\uAD00|\uBBF8\uC220\uAD00|\uAD81|\uC131|\uC218\uC871\uAD00|\uC6B0\uC8FC\uC13C\uD130)/i.test(text);
    const minDuration = isMajorIndoor ? 120 : (item.isLandmark ? 90 : 60);
    const cap = dur >= HALF_DAY_THRESHOLD ? 360 : 180;
    const adjusted = Math.round((Math.min(dur, cap) * PACE_DURATION_FACTOR) / 10) * 10;
    return Math.max(minDuration, Math.min(cap, adjusted));
  };

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = cleanUiText(localizeRuntimeText(message));
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// --- User Feedback System ---
let feedbackSelectedRating = 0;

function initFeedbackSystem() {
  // Star rating interaction
  const starsContainer = document.getElementById('feedbackStars');
  if (starsContainer) {
    starsContainer.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        feedbackSelectedRating = parseInt(btn.getAttribute('data-star'));
        updateFeedbackStarUI();
      });
    });
  }

  // Submit button
  const submitBtn = document.getElementById('feedbackSubmitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitFeedback);
  }

  // Pre-fill name from profile
  const nameInput = document.getElementById('feedbackName');
  if (nameInput && state.activeProfile && state.activeProfile.name) {
    nameInput.value = repairMojibakeText(state.activeProfile.name);
  }

  renderFeedbackList();
}

function updateFeedbackStarUI() {
  const starsContainer = document.getElementById('feedbackStars');
  if (!starsContainer) return;
  starsContainer.querySelectorAll('.star-btn').forEach(btn => {
    const starVal = parseInt(btn.getAttribute('data-star'));
    btn.classList.toggle('active', starVal <= feedbackSelectedRating);
  });
}

function submitFeedback() {
  const nameInput = document.getElementById('feedbackName');
  const textInput = document.getElementById('feedbackText');
  if (!nameInput || !textInput) return;

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!text) {
    showToast(getInlineText({
      ko: '피드백 내용을 입력해주세요.',
      en: 'Please enter your feedback.',
      fr: 'Veuillez saisir votre avis.',
      zh: '请输入反馈内容。',
      ja: 'フィードバック内容を入力してください。',
      es: 'Por favor, escribe tu opinión.'
    }));
    return;
  }
  if (feedbackSelectedRating === 0) {
    showToast(getInlineText({
      ko: '평점을 선택해주세요.',
      en: 'Please select a rating.',
      fr: 'Veuillez sélectionner une note.',
      zh: '请选择评分。',
      ja: '評点を選択してください。',
      es: 'Por favor, selecciona una puntuación.'
    }));
    return;
  }

  const feedback = {
    id: Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8),
    name: cleanUiText(name || getInlineText({
      ko: '익명',
      en: 'Anonymous',
      fr: 'Anonyme',
      zh: '匿名',
      ja: '匿名',
      es: 'Anónimo'
    })).slice(0, 30),
    text: cleanUiText(text),
    rating: feedbackSelectedRating,
    timestamp: Date.now(),
    lang: state.lang
  };

  if (!Array.isArray(state.feedbacks)) {
    state.feedbacks = [];
  }
  state.feedbacks.unshift(feedback);

  // Keep maximum 50 feedbacks
  if (state.feedbacks.length > 50) {
    state.feedbacks = state.feedbacks.slice(0, 50);
  }

  saveFeedbacksToStorage();
  pushToRemote().catch(() => {});
  renderFeedbackList();

  // Reset form
  textInput.value = '';
  feedbackSelectedRating = 0;
  updateFeedbackStarUI();

  showToast(getInlineText({
    ko: '피드백이 등록되었습니다. 감사합니다! 🙏',
    en: 'Feedback submitted. Thank you! 🙏',
    fr: 'Avis envoyé. Merci ! 🙏',
    zh: '反馈已提交，谢谢！🙏',
    ja: 'フィードバックが送信されました。ありがとうございます！🙏',
    es: '¡Opinión enviada. Gracias! 🙏'
  }));
}

function saveFeedbacksToStorage() {
  try {
    safeSetLocalStorage('wander_feedbacks', JSON.stringify(state.feedbacks || []));
  } catch (e) {
    console.warn('Failed to save feedbacks:', e);
  }
}

function loadFeedbacksFromStorage() {
  try {
    const raw = safeGetLocalStorage('wander_feedbacks');
    if (raw) {
      state.feedbacks = JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load feedbacks:', e);
  }
  if (!Array.isArray(state.feedbacks)) {
    state.feedbacks = [];
  }
}

function renderFeedbackList() {
  const container = document.getElementById('feedbackList');
  if (!container) return;

  const feedbacks = Array.isArray(state.feedbacks) ? state.feedbacks : [];

  if (feedbacks.length === 0) {
    container.innerHTML = `<div class="feedback-empty">${getInlineText({
      ko: '아직 피드백이 없습니다. 첫 번째 피드백을 남겨보세요!',
      en: 'No feedback yet. Be the first to share your thoughts!',
      fr: 'Aucun avis pour le moment. Soyez le premier à partager !',
      zh: '还没有反馈，成为第一个分享想法的人吧！',
      ja: 'まだフィードバックがありません。最初のフィードバックを投稿しましょう！',
      es: '¡Aún no hay opiniones. Sé el primero en compartir!'
    })}</div>`;
    return;
  }

  container.innerHTML = feedbacks.map(fb => {
    const stars = '★'.repeat(fb.rating || 0) + '☆'.repeat(5 - (fb.rating || 0));
    const date = new Date(fb.timestamp);
    const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    const deleteBtn = `<button class="feedback-delete-btn" onclick="deleteFeedback('${fb.id}')" title="${getInlineText({ ko: '삭제', en: 'Delete', fr: 'Supprimer', zh: '删除', ja: '削除', es: 'Eliminar' })}">✕</button>`;

    return `
      <div class="feedback-card">
        <div class="feedback-card-header">
          <span class="feedback-author">${cleanUiText(fb.name)}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="feedback-date">${dateStr}</span>
            ${deleteBtn}
          </div>
        </div>
        <div class="feedback-card-stars">${stars}</div>
        <div class="feedback-card-text">${cleanUiText(fb.text)}</div>
      </div>
    `;
  }).join('');
}

function deleteFeedback(feedbackId) {
  if (!Array.isArray(state.feedbacks)) return;
  const confirmMsg = getInlineText({
    ko: '이 피드백을 삭제하시겠습니까?',
    en: 'Delete this feedback?',
    fr: 'Supprimer cet avis ?',
    zh: '删除此反馈？',
    ja: 'このフィードバックを削除しますか？',
    es: '¿Eliminar esta opinión?'
  });
  if (!confirm(confirmMsg)) return;

  state.feedbacks = state.feedbacks.filter(fb => fb.id !== feedbackId);
  saveFeedbacksToStorage();
  pushToRemote({ deletedFeedbackIds: [feedbackId] }).catch(() => {});
  renderFeedbackList();
  showToast(getInlineText({
    ko: '피드백이 삭제되었습니다.',
    en: 'Feedback deleted.',
    fr: 'Avis supprimé.',
    zh: '反馈已删除。',
    ja: 'フィードバックを削除しました。',
    es: 'Opinión eliminada.'
  }));
}

// --- WanderSync Enhancements Helper Functions ---

  const isOpenDuring = (item, startMin, endMin) => {
    if (!item || item.isFallback) return true;
    const hours = getOperatingHours(item);
    return startMin >= hours.open && endMin <= hours.close;
  };

  const resolveCoords = (item, fallbackCoords) => {
    item.cityId = cityId;
    if (item.x === undefined || item.y === undefined) {
      const coords = getAttractionCoords(item, cityId);
      item.x = coords.x;
      item.y = coords.y;
      item.coordinateSource = coords.coordinateSource;
    }
  };

  const formatMinutes = (m) => {
    const hrs = Math.floor(m / 60);
    const mins = m % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  let scheduledNightViewCount = 0;
  let scheduledSportsEventCount = 0;

  for (let d = 1; d <= days; d++) {
    let items = [];
    const rawActivities = [];
    let currentTime = DAY_START;
    let preferredQuadrant = null;
    let lastItem = null;
    let currentCoords = { x: 5.0, y: 5.0 };
    let dessertBreaksToday = 0;
    let cafeCountToday = 0; // Max 1 cafe/dessert per day
    let visitCountToday = 0;

    const isCountableVisit = (item) => {
      if (!item || item.isFallback || item.isRest || item.isLodging) return false;
      if (isMealBreakItem(item) || isFlexibleBreakItem(item)) return false;
      return true;
    };

    // === CLUSTER ANCHORING: Prefer nearby places on the same day ===
    // If a heavy attraction (4+ hrs: theme park, big outlet, major day trip)
    // is still unvisited, anchor today's cluster around it so nearby places follow.
    const getHeavyUnvisited = () => {
      const allPools = [
        ...(cityPools.activity || []),
        ...(cityPools.shopping || []),
        ...(cityPools.culture || []),
      ];
      return allPools.find(item => {
        if (hasVisited(item)) return false;
        if (isFullDayTripItem(item) && !(days >= 5 && d >= 5)) return false;
        return (item.duration || 0) >= 240; // 4+ hours
      }) || null;
    };
    let dayAnchorCluster = null;
    const heavyForToday = getHeavyUnvisited();
    if (heavyForToday) {
      const hCoords = getAttractionCoords(heavyForToday, cityId);
      const clusters = CITY_CLUSTERS[cityId] || [];
      let minDist = Infinity;
      clusters.forEach(cluster => {
        const dist = getHaversineDistance(cluster.y, cluster.x, hCoords.y, hCoords.x);
        if (dist < minDist) { minDist = dist; dayAnchorCluster = cluster; }
      });
    }

    const prepareItem = (item) => {
      if (!item) return;
      item.cityId = cityId;
      if (item.x === undefined || item.y === undefined) {
        const coords = getAttractionCoords(item, cityId);
        item.x = coords.x;
        item.y = coords.y;
        item.coordinateSource = coords.coordinateSource;
      }
    };

    const addRestBlock = (gap, type) => {
      if (gap <= 0) return;
      if (type === 'end_of_day') return;
      if (gap >= 60 && dessertBreaksToday < 1 && cafeCountToday < 1 && totalCafeCount < 1) {
        const dessertDuration = Math.min(gap, 70);
        const dessertItem = createDessertBreakItem(cityId, customCityName, currentCoords, dessertDuration);
        rawActivities.push({ start: currentTime, end: currentTime + dessertDuration, item: dessertItem, isRest: true });
        currentTime += dessertDuration;
        dessertBreaksToday++;
        cafeCountToday++;
        totalCafeCount++;
        gap -= dessertDuration;
        if (gap <= 0) return;
      }
      let name_ko, name_en, desc_ko, desc_en;
      if (type === 'meal') {
        if (gap >= 120) {
          name_ko = "도심 자유시간 및 휴식";
          name_en = "Free Time & Rest in City";
          desc_ko = "다음 일정인 식사 시간 전까지 주변 지역을 자유롭게 둘러보며 휴식을 취하는 시간";
          desc_en = "Explore the city freely and relax before the next scheduled meal.";
        } else {
          name_ko = "식사 전 자유시간 및 휴식";
          name_en = "Free Time & Rest before Meal";
          desc_ko = "식당 오픈 시간 또는 식사 시간 전까지 주변을 둘러보며 대기하는 시간";
          desc_en = "Explore the surroundings or relax before the meal starts.";
        }
      } else {
        name_ko = "도심 자유시간 및 휴식";
        name_en = "Free Time & Rest";
        desc_ko = "일정 시작 시간 전까지 주변 거리를 거닐며 휴식을 취하는 시간";
        desc_en = "Take a stroll or relax around the area before the venue opens.";
      }
      
      const restItem = {
        name_ko: name_ko,
        name_en: name_en,
        desc_ko: desc_ko,
        desc_en: desc_en,
        isRest: true,
        x: currentCoords.x,
        y: currentCoords.y
      };
      rawActivities.push({ start: currentTime, end: currentTime + gap, item: restItem, isRest: true });
      currentTime += gap;
    };

    const getFallbackMealObject = (mealType) => {
      const cityNameKo = customCityName || (CITIES.find(c => c.id === cityId) || {}).name_ko || '';
      const cityNameEn = (CITIES.find(c => c.id === cityId) || {}).name_en || '';
      
      let uniqueItem = null;
      let attempt = 0;
      while (attempt < 100) {
        const idx = mealType === 'lunch'
          ? lunchFallbackCount++
          : (mealType === 'dinner' ? dinnerFallbackCount++ : coffeeFallbackCount++);
        const fallbackObj = getCityMealFallback(cityId, cityNameKo, cityNameEn, mealType, idx, visitedNames);
        if (fallbackObj.isRest || !hasVisited(fallbackObj)) {
          uniqueItem = fallbackObj;
          break;
        }
        attempt++;
      }
      
      if (!uniqueItem) {
        const idx = mealType === 'lunch'
          ? lunchFallbackCount
          : (mealType === 'dinner' ? dinnerFallbackCount : coffeeFallbackCount);
        uniqueItem = getCityMealFallback(cityId, cityNameKo, cityNameEn, mealType, idx, visitedNames);
      }
      return uniqueItem;
    };

    const scheduleMeal = (mealType, preferredQuadrant) => {
      const name_ko = mealType === 'lunch' ? "점심시간" : "저녁시간";
      const name_en = mealType === 'lunch' ? "Lunch Time" : "Dinner Time";
      const desc_ko = "주변 식당에서 자유로운 개별 식사";
      const desc_en = "Enjoy individual dining at a nearby restaurant.";
      const duration = mealType === 'lunch'
        ? (isPackedMode ? 75 : 120)
        : (isPackedMode ? 70 : (isRelaxedMode ? 110 : 90));

      const meal = {
        name_ko,
        name_en,
        desc_ko,
        desc_en,
        mealType,
        duration,
        isFallback: true,
        isRest: true,
        x: lastItem ? lastItem.x : currentCoords.x,
        y: lastItem ? lastItem.y : currentCoords.y,
        open: 0,
        close: 1440
      };
      prepareItem(meal);

      const mealWindow = getMealWindowForItem(mealType);
      const earliestStart = mealWindow.earliest;
      const latestStart = mealWindow.latest;

      // Fill gaps before meals with additional sightseeing instead of large rest blocks
      if (currentTime < earliestStart && isRelaxedMode) {
        addRestBlock(earliestStart - currentTime, 'meal');
      } else if (currentTime < earliestStart) {
        let fillAttempts = 0;
        const MAX_FILL_ATTEMPTS = isPackedMode ? 12 : 8;
        const triedInFill = new Set(); // Track spots we already tried in this fill loop
        while (currentTime < earliestStart && fillAttempts < MAX_FILL_ATTEMPTS) {
          const remainingGap = earliestStart - currentTime;
          // If remaining gap < 60 min, just add rest and break
          if (remainingGap < 60) {
            addRestBlock(remainingGap, 'meal');
            break;
          }
          // Try to find a sightseeing spot that fits in the gap
          const isNight = false;
          const extraSpot = getSightseeingSpot(lastItem, isNight, preferredQuadrant);
          if (!extraSpot || extraSpot.isRest) {
            // No more spots available — add rest for the remaining gap
            addRestBlock(remainingGap, 'meal');
            break;
          }
          // Skip if we already tried this spot in this fill session
          const extraSpotKeys = getPlaceKeys(extraSpot);
          if (hasUsedPlaceKeys(extraSpotKeys, triedInFill)) {
            addRestBlock(remainingGap, 'meal');
            break;
          }
          rememberUsedPlaceKeys(extraSpotKeys, triedInFill);
          prepareItem(extraSpot);
          
          // Calculate transit and available time
          const transitDur = lastItem ? calculateTransit(lastItem, extraSpot).duration : 0;
          const arrivalTime = currentTime + transitDur;
          const hours = getOperatingHours(extraSpot);
          const possibleStart = Math.max(arrivalTime, hours.open);
          
          // Cap duration by: item duration, remaining gap, and closing time
          let spotDur = getItemDuration(extraSpot);
          spotDur = Math.min(spotDur, earliestStart - possibleStart); // don't go past meal time
          spotDur = Math.min(spotDur, hours.close - possibleStart); // don't go past closing
          
          if (spotDur < 30 || possibleStart + spotDur > earliestStart || possibleStart >= hours.close) {
            // This spot doesn't work, try next one
            fillAttempts++;
            continue;
          }
          
          if (tryScheduleAttraction(extraSpot, spotDur)) {
            markAsVisited(extraSpot, false);
            fillAttempts++;
          } else {
            // tryScheduleAttraction failed, try next spot
            fillAttempts++;
            continue;
          }
        }
        // Final check: if still gap remains after all attempts
        if (currentTime < earliestStart) {
          addRestBlock(earliestStart - currentTime, 'meal');
        }
      }

      if (currentTime > latestStart) {
        currentTime = latestStart;
      }

      prepareItem(meal);

      trySchedule(meal, duration, mealType);
    };

    if (d > 1) {
      preferredQuadrant = getQuadrantWithMostItems(daySightseeing);
    }

    // Helper: try to schedule item, return true if scheduled, false if would exceed cap
    const trySchedule = (item, duration, mealType) => {
      if (currentTime + duration > HARD_CAP) return false;
      resolveCoords(item, currentCoords);
      if (!item.isFallback) {
        currentCoords = { x: item.x, y: item.y };
      }
      markVisited(item);
      rawActivities.push({ start: currentTime, end: currentTime + duration, item: item, mealType: mealType });
      currentTime += duration;
      lastItem = item;
      const q = getQuadrant(item);
      if (q !== null) preferredQuadrant = q;
      return true;
    };

    const tryScheduleFlexibleBreak = (item, duration) => {
      if (!item || currentTime + duration > HARD_CAP) return false;
      item.cityId = cityId;
      item.x = currentCoords.x;
      item.y = currentCoords.y;
      item.duration = duration;
      rawActivities.push({ start: currentTime, end: currentTime + duration, item: item, isRest: true });
      currentTime += duration;
      lastItem = item;
      return true;
    };

    // Helper: add transit between lastItem and nextItem, return transit duration
    const addTransit = (fromItem, toItem) => {
      if (!fromItem) return 0;
      if (isFlexibleBreakItem(fromItem) || isFlexibleBreakItem(toItem)) return 0;
      resolveCoords(toItem, currentCoords);
      const transit = calculateTransit(fromItem, toItem);
      if (transit.duration > 0) {
        rawActivities.push({ start: currentTime, end: currentTime + transit.duration, item: null, transit: transit });
        currentTime += transit.duration;
      }
      return transit.duration;
    };

    // Helper: try to schedule an attraction, handle transit and morning wait automatically.
    // Returns true if successfully scheduled, false otherwise.
    const adjustTimelineGap = (gap) => {
      if (gap <= 0) return;
      const lunchIdx = rawActivities.findIndex(act => act.mealType === 'lunch');
      let lastActIdx = -1;
      for (let i = rawActivities.length - 1; i >= 0; i--) {
        if (lunchIdx !== -1 && i <= lunchIdx) {
          break;
        }
        const act = rawActivities[i];
        if (act.item && !act.transit && !act.mealType) {
          // Check if extending/shifting from this index is safe for all items from i to the end
          let safe = true;
          for (let j = i; j < rawActivities.length; j++) {
            const nextAct = rawActivities[j];
            if (nextAct.item && !nextAct.transit) {
              const hours = getOperatingHours(nextAct.item);
              if (nextAct.end + gap > hours.close) {
                safe = false;
                break;
              }
            }
          }
          if (safe) {
            lastActIdx = i;
            break;
          }
        }
      }
      
      if (lastActIdx !== -1) {
        rawActivities[lastActIdx].end += gap;
        for (let i = lastActIdx + 1; i < rawActivities.length; i++) {
          rawActivities[i].start += gap;
          rawActivities[i].end += gap;
        }
        currentTime += gap;
      } else {
        if (lunchIdx === -1) {
          for (let i = 0; i < rawActivities.length; i++) {
            rawActivities[i].start += gap;
            rawActivities[i].end += gap;
          }
          currentTime += gap;
        } else {
          if (rawActivities.length > 0) {
            const lastAct = rawActivities[rawActivities.length - 1];
            if (lastAct.transit) {
              lastAct.start += gap;
              lastAct.end += gap;
            }
          }
          currentTime += gap;
        }
      }
    };

    const tryScheduleAttraction = (item, duration, mealType) => {
      if (isCountableVisit(item) && visitCountToday >= MAX_VISITS_PER_DAY) {
        return false;
      }
      const transitDur = lastItem && !isFlexibleBreakItem(lastItem) && !isFlexibleBreakItem(item)
        ? calculateTransit(lastItem, item).duration
        : 0;
      const hours = getOperatingHours(item);
      
      const arrivalTime = currentTime + transitDur;
      const possibleStart = Math.max(arrivalTime, hours.open);
      const endTime = possibleStart + duration;
      
      if (endTime > hours.close || endTime > HARD_CAP) {
        return false;
      }
      
      if (transitDur > 0) {
        addTransit(lastItem, item);
      }
      
      if (currentTime < possibleStart) {
        const gap = possibleStart - currentTime;
        // Don't add rest block at the very start of the day or for short waits (<=30 min)
        if (rawActivities.length === 0 || gap <= 30) {
          currentTime = possibleStart; // Just skip ahead silently
        } else {
          addRestBlock(gap, 'sightseeing');
        }
      }
      
      resolveCoords(item, currentCoords);
      if (!item.isFallback) {
        currentCoords = { x: item.x, y: item.y };
      }
      markVisited(item);
      rawActivities.push({ start: currentTime, end: endTime, item: item, mealType: mealType });
      if (isCountableVisit(item)) {
        visitCountToday += isFullDayTripItem(item) ? MAX_VISITS_PER_DAY : 1;
      }
      currentTime = endTime;
      lastItem = item;
      const q = getQuadrant(item);
      if (q !== null) preferredQuadrant = q;
      return true;
    };

    const getUniqueSightseeingFallback = (isNightSlot) => {
      return {
        name_ko: "자유 시간 및 휴식",
        name_en: "Free Time & Rest",
        desc_ko: "일정 사이에 갖는 여유로운 자유 시간 및 감볼 휴식",
        desc_en: "Enjoy a relaxing free time and personal rest between schedules.",
        isRest: true,
        open: 0,
        close: 1440
      };
    };

    const getSightseeingSpot = (fromItem, isNightSlot, preferredQuadrant) => {
      // 1. Try must-see tourist targets first on Day 1-2, then remaining landmarks.
      const earlyDayLimit = Math.min(2, days);
      const prioritySource = d <= earlyDayLimit ? unvisitedPriorityTargets : unvisitedLandmarks;
      let landmarkCandidates = prioritySource.filter(l => !hasVisited(l));
      
      // If Day 1 or Day 2, prioritize non-nightview must-sees during day, or nightview must-sees during night
      if (d <= earlyDayLimit) {
        landmarkCandidates = landmarkCandidates.filter(l => 
          isNightSlot ? isActualNightView(l) : !isActualNightView(l)
        );
      } else {
        landmarkCandidates = landmarkCandidates.filter(l => 
          isNightSlot ? isActualNightView(l) : (d === 1 || !isActualNightView(l))
        );
      }
      
      // Filter out theme parks/full-day attractions unconditionally from gap-fillers
      landmarkCandidates = landmarkCandidates.filter(l => 
        !isFullDayTripItem(l)
      );
      
      if (landmarkCandidates.length > 0) {
        let openLandmarks = landmarkCandidates.filter(candidate => {
          const dur = getItemDuration(candidate);
          let estimatedTransit = 0;
          if (fromItem) {
            estimatedTransit = calculateTransit(fromItem, candidate).duration;
          }
          const plannedStart = currentTime + estimatedTransit;
          const plannedEnd = plannedStart + dur;
          return isOpenDuring(candidate, plannedStart, plannedEnd) && plannedEnd <= HARD_CAP;
        });

        // Relaxed check: ignore operating hours if no matching open landmarks
        if (openLandmarks.length === 0) {
          openLandmarks = landmarkCandidates.filter(candidate => {
            const dur = getItemDuration(candidate);
            let estimatedTransit = 0;
            if (fromItem) {
              estimatedTransit = calculateTransit(fromItem, candidate).duration;
            }
            const plannedStart = currentTime + estimatedTransit;
            const plannedEnd = plannedStart + dur;
            return plannedEnd <= HARD_CAP;
          });
        }
        
        if (openLandmarks.length > 0) {
          // On Day 1-2, select must-sees by original array order (popularity/importance)
          // rather than by distance, ensuring the most famous landmarks come first
          if (d <= earlyDayLimit) {
            const selected = openLandmarks[0];
            return selected;
          }
          const temp = [...openLandmarks];
          const selected = pullClosestItem(fromItem || null, temp, preferredQuadrant);
          return selected;
        }
      }

      // 2. General pool
      const pool = isNightSlot ? nightSightseeing : daySightseeing;
      let unvisitedPool = pool.filter(item => !hasVisited(item));
      
      // Filter out theme parks/full-day attractions unconditionally from gap-fillers
      unvisitedPool = unvisitedPool.filter(item => 
        !isFullDayTripItem(item)
      );

      if (unvisitedPool.length === 0) {
        return getUniqueSightseeingFallback(isNightSlot);
      }

      let openCandidates = unvisitedPool.filter(candidate => {
        const dur = getItemDuration(candidate);
        let estimatedTransit = 0;
        if (fromItem) {
          estimatedTransit = calculateTransit(fromItem, candidate).duration;
        }
        const plannedStart = currentTime + estimatedTransit;
        const plannedEnd = plannedStart + dur;
        return isOpenDuring(candidate, plannedStart, plannedEnd) && plannedEnd <= HARD_CAP;
      });

      // Relaxed check: ignore operating hours if no matching open candidates
      if (openCandidates.length === 0) {
        openCandidates = unvisitedPool.filter(candidate => {
          const dur = getItemDuration(candidate);
          let estimatedTransit = 0;
          if (fromItem) {
            estimatedTransit = calculateTransit(fromItem, candidate).duration;
          }
          const plannedStart = currentTime + estimatedTransit;
          const plannedEnd = plannedStart + dur;
          return plannedEnd <= HARD_CAP;
        });
      }

      if (openCandidates.length > 0) {
        const temp = [...openCandidates];
        const selected = pullClosestItem(fromItem || null, temp, preferredQuadrant);
        return selected;
      }
      
      return getUniqueSightseeingFallback(isNightSlot);
    };

    const hasPendingDaytimePriorityTarget = () => {
      const earlyDayLimit = Math.min(2, days);
      return d <= earlyDayLimit && unvisitedPriorityTargets.some(item =>
        !hasVisited(item) &&
        !isActualNightView(item) &&
        !isFullDayTripItem(item)
      );
    };

    const hasPendingRegularCitySightseeing = () => {
      const allCandidates = [
        ...unvisitedPriorityTargets,
        ...unvisitedLandmarks,
        ...daySightseeing,
        ...nightSightseeing
      ];
      return allCandidates.some(item =>
        item &&
        !hasVisited(item) &&
        !isFoodOrDrinkPlace(item) &&
        !isFullDayTripItem(item)
      );
    };

        // Helper: peek diner spot with no side effects
    const peekDinerSpot = (mealType, fromItem) => {
      let pool = mealType === 'lunch' ? lunchDiners : dinnerDiners;
      let unvisitedPool = pool.filter(d => !hasVisited(d));
      if (unvisitedPool.length === 0) {
        unvisitedPool = mealType === 'lunch'
          ? diners.filter(item => {
              if (isBreakfastOnly(item) || isDinnerOnly(item) || hasVisited(item)) return false;
              const hours = getOperatingHours(item);
              return hours.open <= 810 && hours.close >= 780;
            })
          : diners.filter(item => {
              if (isBreakfastOnly(item) || isLunchOnly(item) || hasVisited(item)) return false;
              const hours = getOperatingHours(item);
              return hours.open <= 1200 && hours.close >= 1230;
            });
      }
      if (unvisitedPool.length === 0) {
        return {
          name_ko: mealType === 'lunch' ? "점심시간" : "저녁시간",
          name_en: mealType === 'lunch' ? "Lunch Time" : "Dinner Time",
          desc_ko: "주변 식당에서 자유로운 개별 식사",
          desc_en: "Enjoy individual dining at a nearby restaurant.",
          isFallback: true,
          isRest: true,
          x: currentCoords.x,
          y: currentCoords.y,
          open: 0,
          close: 1440
        };
      }
      
      const openPool = unvisitedPool.filter(d => {
        const hours = getOperatingHours(d);
        let transitDur = 0;
        if (fromItem) {
          transitDur = calculateTransit(fromItem, d).duration;
        }
        if (mealType === 'lunch') {
          const estStart = Math.max(690, currentTime + transitDur);
          return hours.open <= estStart && hours.close >= estStart + MEAL_DURATION;
        } else {
          const estStart = Math.max(1140, currentTime + transitDur);
          return hours.open <= estStart && hours.close >= estStart + MEAL_DURATION;
        }
      });
      
      const targetPool = openPool.length > 0 ? openPool : unvisitedPool;
      let closest = targetPool[0];
      let minDist = Infinity;
      for (const d of targetPool) {
        const dist = fromItem ? getDistance(fromItem, d) : 0;
        if (dist < minDist) {
          minDist = dist;
          closest = d;
        }
      }
      return closest;
    };

    // Helper: get diner spot with meal filter and operating hours check
    const getDinerSpot = (day, mealType, fromItem, preferredQuadrant) => {
      let item = null;
      if (mealType === 'lunch') {
        let unvisitedLunch = lunchDiners.filter(d => !hasVisited(d));
        
        if (unvisitedLunch.length === 0) {
          const freshLunch = diners.filter(item => {
            if (isBreakfastOnly(item) || isDinnerOnly(item)) return false;
            if (hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          freshLunch.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !hasVisited(d));
        }
        if (unvisitedLunch.length === 0) {
          const originalDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || isBreakfastOnly(item) || isDinnerOnly(item)) return false;
            if (hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          originalDiners.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !hasVisited(d));
        }
        if (unvisitedLunch.length === 0) {
          const fallbackDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          fallbackDiners.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !hasVisited(d));
        }

        const openLunchDiners = unvisitedLunch.filter(d => {
          const hours = getOperatingHours(d);
          let transitDur = 0;
          if (fromItem) {
            transitDur = calculateTransit(fromItem, d).duration;
          }
          const estStart = currentTime + transitDur;
          return estStart <= 810 && hours.close >= estStart + MEAL_DURATION;
        });

        const targetPool = openLunchDiners.length > 0 ? openLunchDiners : unvisitedLunch;

        if (targetPool.length > 0) {
          item = pullClosestItem(fromItem || null, targetPool, preferredQuadrant);
          markVisited(item);
          
          const idx1 = lunchDiners.findIndex(d => samePlace(d, item) || d.name_ko === item.name_ko || d.name_en === item.name_en);
          if (idx1 !== -1) lunchDiners.splice(idx1, 1);
          const idx2 = dinnerDiners.findIndex(d => samePlace(d, item) || d.name_ko === item.name_ko || d.name_en === item.name_en);
          if (idx2 !== -1) dinnerDiners.splice(idx2, 1);
        } else {
          const idx = lunchFallbackCount;
          lunchFallbackCount++;
          item = getFallbackMealObject('lunch');
        }
      } else {
        let unvisitedDinner = dinnerDiners.filter(d => !hasVisited(d));
        
        if (unvisitedDinner.length === 0) {
          const freshDinner = diners.filter(item => {
            if (isBreakfastOnly(item) || isLunchOnly(item)) return false;
            if (hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          freshDinner.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !hasVisited(d));
        }
        if (unvisitedDinner.length === 0) {
          const originalDinners = gourmetPool.filter(item => {
            if (isCafeItem(item) || isBreakfastOnly(item) || isLunchOnly(item)) return false;
            if (hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          originalDinners.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !hasVisited(d));
        }
        if (unvisitedDinner.length === 0) {
          const fallbackDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || hasVisited(item)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          fallbackDiners.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !hasVisited(d));
        }

        const openDinnerDiners = unvisitedDinner.filter(d => {
          const hours = getOperatingHours(d);
          let transitDur = 0;
          if (fromItem) {
            transitDur = calculateTransit(fromItem, d).duration;
          }
          const estStart = currentTime + transitDur;
          return estStart <= 1230 && hours.close >= estStart + MEAL_DURATION;
        });

        const targetPool = openDinnerDiners.length > 0 ? openDinnerDiners : unvisitedDinner;

        if (targetPool.length > 0) {
          item = pullClosestItem(fromItem || null, targetPool, preferredQuadrant);
          markVisited(item);
          
          const idx1 = lunchDiners.findIndex(d => samePlace(d, item) || d.name_ko === item.name_ko || d.name_en === item.name_en);
          if (idx1 !== -1) lunchDiners.splice(idx1, 1);
          const idx2 = dinnerDiners.findIndex(d => samePlace(d, item) || d.name_ko === item.name_ko || d.name_en === item.name_en);
          if (idx2 !== -1) dinnerDiners.splice(idx2, 1);
        } else {
          const idx = dinnerFallbackCount;
          dinnerFallbackCount++;
          item = getFallbackMealObject('dinner');
        }
      }
      return item;
    };

    // Helper: get cafe spot
    const getCafeSpot = (day, fromItem, preferredQuadrant) => {
      if (cafeCountToday >= 1 || totalCafeCount >= 1) {
        return getUniqueSightseeingFallback(false);
      }

      let unvisitedCafes = dayCafes.filter(c => !hasVisited(c));
      
      if (unvisitedCafes.length === 0) {
        const freshCafes = cafes.filter(item => !isNightOnly(item) && !hasVisited(item));
        freshCafes.forEach(c => dayCafes.push(c));
        unvisitedCafes = dayCafes.filter(c => !hasVisited(c));
      }
      if (unvisitedCafes.length === 0) {
        const originalCafes = gourmetPool.filter(item => isCafeItem(item) && isVerifiedCafeItem(item) && !isNightOnly(item) && !hasVisited(item));
        originalCafes.forEach(c => dayCafes.push(c));
        unvisitedCafes = dayCafes.filter(c => !hasVisited(c));
      }

      const openCafes = unvisitedCafes.filter(c => {
        const hours = getOperatingHours(c);
        let transitDur = 0;
        if (fromItem) {
          transitDur = calculateTransit(fromItem, c).duration;
        }
        const estStart = currentTime + transitDur;
        const estEnd = estStart + (c.duration || 90);
        return hours.open <= estStart && hours.close >= estEnd;
      });

      const targetPool = openCafes.length > 0 ? openCafes : unvisitedCafes;

      if (targetPool.length === 0) {
        return totalCafeCount < 1
          ? createDessertBreakItem(cityId, customCityName, currentCoords, 60)
          : getUniqueSightseeingFallback(false);
      }

      if (targetPool.length > 0) {
        const temp = [...targetPool];
        const item = pullClosestItem(fromItem || null, temp, preferredQuadrant);
        return item;
      } else {
        return {
          name_ko: "자유 시간 및 휴식",
          name_en: "Free Time & Rest",
          desc_ko: "일정 사이에 갖는 여유로운 자유 시간 및 감볼 휴식",
          desc_en: "Enjoy a relaxing free time and personal rest between schedules.",
          isFallback: true,
          isRest: true,
          x: currentCoords.x,
          y: currentCoords.y,
          open: 0,
          close: 1440
        };
      }
    };

    // Helper: check if a candidate fits before Dinner (Dinner must start by 20:30 = 1230)
    const fitsBeforeDinner = (candidate, duration) => {
      const transitToCand = lastItem ? calculateTransit(lastItem, candidate).duration : 0;
      const dinnerItem = peekDinerSpot('dinner', candidate) || { x: 5.0, y: 5.0 };
      if (!dinnerItem) return false;
      const transitCandToDinner = calculateTransit(candidate, dinnerItem).duration;
      
      const hours = getOperatingHours(candidate);
      const arrival = currentTime + transitToCand;
      const minStart = Math.max(arrival, hours.open);
      const minEnd = minStart + duration;
      
      if (minEnd > hours.close || minEnd + transitCandToDinner > 1230) {
        return false;
      }
      return true;
    };

    // Helper: check if a candidate fits before Lunch (Lunch must start by 14:00 = 840)
    const fitsBeforeLunch = (candidate, duration) => {
      const transitToCand = lastItem ? calculateTransit(lastItem, candidate).duration : 0;
      const lunchItem = peekDinerSpot('lunch', candidate) || { x: 5.0, y: 5.0 };
      if (!lunchItem) return false;
      const transitCandToLunch = supportsOnSiteMealBreak(candidate)
        ? 0
        : calculateTransit(candidate, lunchItem).duration;
      
      const hours = getOperatingHours(candidate);
      const arrival = currentTime + transitToCand;
      const minStart = Math.max(arrival, hours.open);
      const minEnd = minStart + duration;
      
      if (minEnd > hours.close || minEnd + transitCandToLunch > 840) {
        return false;
      }
      return true;
    };

    // === SPECIAL PROCESS: Full-Day / Theme Park / Day-Trip Day ===
    let isFullDayAttractionDay = false;
    let fullDayAttraction = null;

    const allowFullDayAttractionToday =
      (days >= 5 && d >= 5 && !hasPendingDaytimePriorityTarget() && !hasPendingRegularCitySightseeing());
    if (allowFullDayAttractionToday) {
      const allSightseeing = [
        ...unvisitedLandmarks,
        ...daySightseeing,
        ...nightSightseeing
      ];
      fullDayAttraction = allSightseeing.find(item => {
        if (hasVisited(item)) return false;
        if (!isFullDayTripItem(item)) return false;
        return true;
      });

      if (fullDayAttraction) {
        isFullDayAttractionDay = true;
      }
    }

    if (isFullDayAttractionDay && fullDayAttraction) {
      prepareItem(fullDayAttraction);
      resolveCoords(fullDayAttraction, currentCoords);
      currentCoords = { x: fullDayAttraction.x, y: fullDayAttraction.y };

      // Transit to the attraction
      const transitDur = lastItem ? calculateTransit(lastItem, fullDayAttraction).duration : 30;
      if (transitDur > 0) {
        const transit = lastItem 
          ? calculateTransit(lastItem, fullDayAttraction)
          : { type_ko: "도보", type_en: "Walk", distance: 1.5, duration: 30 };
        rawActivities.push({ start: currentTime, end: currentTime + transitDur, item: null, transit: transit });
        currentTime += transitDur;
      }

      // Keep the place description specific to the place. Lunch is handled by the time block.
      const desc_ko = fullDayAttraction.desc_ko || '';
      const desc_en = fullDayAttraction.desc_en || '';
      const lunch_note_ko = ' *(테마파크 내부 식당에서 자유로운 개별 점심 식사가 포함되어 있습니다)*';
      const lunch_note_en = ' *(Includes free time for lunch inside the venue)*';
      
      const patchedItem = Object.assign({}, fullDayAttraction, {
        desc_ko: stripGeneratedVenueLunchNotes(desc_ko),
        desc_en: stripGeneratedVenueLunchNotes(desc_en)
      });
      markNearbyDayTripPresentation(patchedItem);

      // Duration: keep full duration
      const attractionDur = fullDayAttraction.duration || 480; // 8 hours default
      rawActivities.push({ start: currentTime, end: currentTime + attractionDur, item: patchedItem });
      currentTime += attractionDur;
      lastItem = patchedItem;

      // Mark as visited
      markAsVisited(fullDayAttraction, false);

      // Full-day attractions intentionally do not add other same-day activities.
    } else {
      // === PHASE 0: Breakfast (Optional) ===
      let breakfastItem = null;
    const breakfastCandidates = gourmetPool.filter(item => isBreakfastOnly(item) && !hasVisited(item));
    if (breakfastCandidates.length > 0) {
      breakfastItem = pullClosestItem(null, breakfastCandidates, preferredQuadrant);
      prepareItem(breakfastItem);
      markVisited(breakfastItem);
      const idx1 = diners.findIndex(d => d.name_ko === breakfastItem.name_ko);
      if (idx1 !== -1) diners.splice(idx1, 1);
      const idx2 = lunchDiners.findIndex(d => d.name_ko === breakfastItem.name_ko);
      if (idx2 !== -1) lunchDiners.splice(idx2, 1);
      const idx3 = dinnerDiners.findIndex(d => d.name_ko === breakfastItem.name_ko);
      if (idx3 !== -1) dinnerDiners.splice(idx3, 1);
      const idx4 = cafes.findIndex(c => c.name_ko === breakfastItem.name_ko);
      if (idx4 !== -1) cafes.splice(idx4, 1);
      const idx5 = dayCafes.findIndex(c => c.name_ko === breakfastItem.name_ko);
      if (idx5 !== -1) dayCafes.splice(idx5, 1);
    }

    if (breakfastItem) {
      const bDuration = 60; // 60 minutes for breakfast
      resolveCoords(breakfastItem, currentCoords);
      currentCoords = { x: breakfastItem.x, y: breakfastItem.y };

      rawActivities.push({ start: currentTime, end: currentTime + bDuration, item: breakfastItem, mealType: 'breakfast' });
      currentTime += bDuration;
      lastItem = breakfastItem;
      const q = getQuadrant(breakfastItem);
      if (q !== null) preferredQuadrant = q;
    }

    // === PHASE 1 & 2: Sightseeing 1 & 2 (오전 관광) ===
    const lunchRestaurant = peekDinerSpot('lunch', lastItem);

    // Sightseeing 1 — always schedule at least 1 morning activity
    let s1 = getSightseeingSpot(lastItem, false, preferredQuadrant);
    prepareItem(s1);

    let morningScheduled = false;
    if (s1 && !s1.isRest) {
      const s1dur = getItemDuration(s1);
      if (fitsBeforeLunch(s1, s1dur)) {
        if (tryScheduleAttraction(s1, s1dur)) {
          markAsVisited(s1, false);
          morningScheduled = true;
        }
      } else {
        // Try with shortened duration (min 60 min) to guarantee morning
        const shortDur = Math.max(60, Math.min(s1dur, 120));
        if (fitsBeforeLunch(s1, shortDur)) {
          if (tryScheduleAttraction(s1, shortDur)) {
            markAsVisited(s1, false);
            morningScheduled = true;
          }
        } else {
          // Force schedule as last resort — guarantee morning activity
          if (tryScheduleAttraction(s1, shortDur)) {
            markAsVisited(s1, false);
            morningScheduled = true;
          }
        }
      }

      // Sightseeing 2 (Optional) — keep must-see targets moving on Day 1-2 even in relaxed mode
      if (morningScheduled && ((!state.regenConfig || !state.regenConfig.relaxed) || hasPendingDaytimePriorityTarget())) {
        let s2 = getSightseeingSpot(lastItem, false, preferredQuadrant);
        prepareItem(s2);

        if (s2 && !s2.isRest) {
          const s2dur = getItemDuration(s2);
          if (fitsBeforeLunch(s2, s2dur)) {
            if (tryScheduleAttraction(s2, s2dur)) {
              markAsVisited(s2, false);
            }
          }
        }
      }
    }

    // === Go to Lunch ===
    scheduleMeal('lunch', preferredQuadrant);

    // === Afternoon Sightseeing (Cafe/Sightseeing 3 & Sightseeing 4) ===
    const dinnerRestaurant = peekDinerSpot('dinner', lastItem);

    if (preferenceSet.has('sports') && scheduledSportsEventCount < 1) {
      const sportsEvent = (cityPools.sports || []).find(item => !hasVisited(item));
      if (sportsEvent) {
        prepareItem(sportsEvent);
        const sportsDuration = getItemDuration(sportsEvent);
        if (fitsBeforeDinner(sportsEvent, sportsDuration)) {
          if (tryScheduleAttraction(sportsEvent, sportsDuration)) {
            markAsVisited(sportsEvent, false);
            scheduledSportsEventCount++;
          }
        }
      }
    }

    // Sightseeing 3 first; cafe/dessert is only a fallback when no attraction fits.
    let s3 = getSightseeingSpot(lastItem, false, preferredQuadrant);
    let s3IsCafe = false;
    if (!hasPendingDaytimePriorityTarget() && (!s3 || s3.isRest) && cafeCountToday < 1 && totalCafeCount < 1) {
      s3 = getCafeSpot(d, lastItem, preferredQuadrant);
      s3IsCafe = !!s3 && (isCafeItem(s3) || isFlexibleBreakItem(s3));
    }
    prepareItem(s3);

    if (s3 && isFlexibleBreakItem(s3)) {
      if (dessertBreaksToday < 1 && cafeCountToday < 1 && totalCafeCount < 1 && tryScheduleFlexibleBreak(s3, s3.duration || 60)) {
        dessertBreaksToday++;
        cafeCountToday++;
        totalCafeCount++;
      }
    } else if (s3 && !s3.isRest) {
      const s3dur = getItemDuration(s3);
      if (fitsBeforeDinner(s3, s3dur)) {
        if (tryScheduleAttraction(s3, s3dur)) {
          if (s3IsCafe || isCafeItem(s3)) {
            markCafeAsVisited(s3);
            cafeCountToday++;
            totalCafeCount++;
          } else {
            markAsVisited(s3, false);
          }

          // Sightseeing 4 (Optional) — keep must-see targets moving on Day 1-2 even in relaxed mode
          if ((!state.regenConfig || !state.regenConfig.relaxed) || hasPendingDaytimePriorityTarget()) {
            let s4 = getSightseeingSpot(lastItem, false, preferredQuadrant);
            prepareItem(s4);
            if (s4 && !s4.isRest) {
              const s4dur = getItemDuration(s4);
              if (fitsBeforeDinner(s4, s4dur)) {
                if (tryScheduleAttraction(s4, s4dur)) {
                  markAsVisited(s4, false);
                }
              }
            }
          }
        }
      }
    }

    // === Go to Dinner ===
    scheduleMeal('dinner', preferredQuadrant);

    // === PHASE 5: Evening activity (only night view '야경'/'night' and ends before 22:00) ===
    const isFamous = (() => {
      const famousIds = ['seoul', 'paris', 'london', 'newyork', 'singapore', 'dubai', 'prague', 'tokyo', 'barcelona', 'rome', 'sydney', 'bangkok'];
      if (famousIds.includes(cityId)) return true;
      const name = (customCityName || '').toLowerCase();
      const famousNames = [
        'seoul', 'paris', 'london', 'newyork', 'singapore', 'dubai', 'prague', 'tokyo', 'barcelona', 'rome', 'sydney', 'bangkok',
        '서울', '파리', '런던', '뉴욕', '싱가포르', '두바이', '프라하', '도쿄', '바르셀로나', '로마', '시드니', '방콕',
        '홍콩', 'hong kong', 'hongkong', '부다페스트', 'budapest', '라스베이거스', '라스베가스', 'las vegas', 'lasvegas',
        '상하이', '상해', 'shanghai'
      ];
      return famousNames.some(n => name.includes(n));
    })();

    if (isFamous && scheduledNightViewCount < 1) {
      if (currentTime + 30 <= HARD_CAP) {
        let sEvening = getSightseeingSpot(lastItem, true, preferredQuadrant);
        prepareItem(sEvening);
        
        if (sEvening && !sEvening.isFallback && isActualNightView(sEvening)) {
          const sEveningDur = getItemDuration(sEvening);
          if (tryScheduleAttraction(sEvening, Math.min(sEveningDur, HARD_CAP - currentTime))) {
            markAsVisited(sEvening, true);
            scheduledNightViewCount++;
          }
        }
      }
    }

    } // End of !isFullDayAttractionDay block


    // === Build final items array with proper time slots ===
    for (let i = 0; i < rawActivities.length; i++) {
      const act = rawActivities[i];
      if (act.transit) {
        const transit = act.transit;
        const transitStart = act.start;
        const transitEnd = act.end;

        const transitIcon = transit.type_ko === "도보" ? "🚶" : "🚌";
        const transitNameKo = `${transitIcon} ${transit.type_ko} (${transit.distance}km)`;
        const transitNameEn = `${transitIcon} ${transit.type_en} (${transit.distance}km)`;

        items.push({
          isTransit: true,
          transitType: transit.type_en,
          timeSlot: `${formatMinutes(transitStart)} - ${formatMinutes(transitEnd)}`,
          name_ko: transitNameKo,
          name_en: transitNameEn,
          duration: transit.duration
        });
      } else {
        const actDuration = act.end - act.start;
        const actStart = act.start;
        const actEnd = act.end;

        let nameKo = act.item.name_ko;
        let nameEn = act.item.name_en;
        let descKo = act.item.desc_ko;
        let descEn = act.item.desc_en;
        let isDinner = false;

        if (act.mealType === 'lunch') {
          nameKo = "점심시간";
          nameEn = "Lunch Time";
          descKo = "주변 식당에서 자유로운 개별 식사";
          descEn = "Enjoy individual dining at a nearby restaurant.";
        } else if (act.mealType === 'dinner') {
          nameKo = "저녁시간";
          nameEn = "Dinner Time";
          descKo = "주변 식당에서 자유로운 개별 식사";
          descEn = "Enjoy individual dining at a nearby restaurant.";
          isDinner = true;
        } else if (act.mealType === 'breakfast') {
          if (!nameKo.includes('아침') && !nameKo.includes('조식')) {
            nameKo = `[아침] ${nameKo}`;
          }
          if (!nameEn.toLowerCase().includes('breakfast')) {
            nameEn = `[Breakfast] ${nameEn}`;
          }
        } else if (act.isRest || (act.item && act.item.isRest)) {
          // Keep rest names intact
        } else {
          // Replace meal keywords from non-meal activities
          nameKo = nameKo.replace(/브런치/g, '디저트');
          nameEn = nameEn.replace(/brunch/gi, 'Dessert');
          
          nameKo = nameKo.replace(/런치/g, '세트');
          nameKo = nameKo.replace(/점심/g, '식사');
          nameEn = nameEn.replace(/lunch/gi, 'Bites');

          nameKo = nameKo.replace(/디너/g, '특선');
          nameKo = nameKo.replace(/저녁/g, '야간');
          nameEn = nameEn.replace(/dinner/gi, 'Feast');
        }

        items.push({
          isRest: !!(act.isRest || (act.item && act.item.isRest)),
          timeSlot: act.item.isAllDayTrip ? getAllDayTripLabel() : (isDinner ? `${formatMinutes(actStart)} -` : `${formatMinutes(actStart)} - ${formatMinutes(actEnd)}`),
          name_ko: nameKo,
          name_en: nameEn,
          desc_ko: descKo,
          desc_en: descEn,
          duration: actDuration,
          x: act.item.x,
          y: act.item.y,
          cityId: act.item.cityId || cityId,
          open: act.item.open,
          close: act.item.close,
          isLandmark: !!act.item.isLandmark,
          isSportsEvent: !!act.item.isSportsEvent,
          isPhotoSpot: !!act.item.isPhotoSpot,
          hideDuration: isDinner || !!act.item.hideDuration || !!act.item.isAllDayTrip,
          isFlexibleBreak: !!act.item.isFlexibleBreak,
          isDessertBreak: !!act.item.isDessertBreak,
          isAllDayTrip: !!act.item.isAllDayTrip
        });
      }
    }
    // Post-process: remove rest items that appear after the last dinner
    let lastDinnerIdx = -1;
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].name_ko === '저녁시간' || items[i].name_en === 'Dinner Time') {
        lastDinnerIdx = i;
        break;
      }
    }
    if (lastDinnerIdx >= 0) {
      items = items.filter((item, idx) => {
        if (idx > lastDinnerIdx && item.isRest) return false;
        return true;
      });
    }
    normalizeOpenEndedDinnerSlots(items);

    dayPlans.push({
      day: d,
      items: items
    });
  }

  const draftCourse = { cityId, days: dayPlans };
  ensureEarlyDaysHaveCityAttractions(dayPlans, cityPools, cityId);
  ensureTopCityAttractionsInFirstTwoDays(dayPlans, cityPools, cityId);
  rebalanceSparseItineraryDays(draftCourse);
  compactFutureSightseeingIntoEarlierGaps(draftCourse);
  fillSparseDaysFromPools(dayPlans, cityPools, cityId);
  forceCitySupplementForShortSingleDays(dayPlans, cityId);
  compactFutureSightseeingIntoEarlierGaps(draftCourse);
  fillSparseDaysFromPools(dayPlans, cityPools, cityId);
  forceCitySupplementForShortSingleDays(dayPlans, cityId);
  ensureNonEmptySightseeingDays(dayPlans, cityPools, cityId);
  normalizeNearbyDayTripDays(draftCourse);
  repairImpossibleClockTimes(draftCourse);
  ensureNonEmptySightseeingDays(dayPlans, cityPools, cityId);
  ensureEveryDayHasSightseeing(dayPlans, cityPools, cityId);
  ensureEarlyDaysHaveCityAttractions(dayPlans, cityPools, cityId);
  ensureTopCityAttractionsInFirstTwoDays(dayPlans, cityPools, cityId);
  ensureEssentialEarlyCityAttractions(draftCourse);
  normalizeNearbyDayTripDays(draftCourse);
  repairImpossibleClockTimes(draftCourse);

  draftCourse.cityName = customCityName || getCityDisplayName(cityId);
  draftCourse.preferences = Array.isArray(preferences) ? [...preferences] : [];
  draftCourse.durationDays = days;
  enforceNearbyTripPolicy(draftCourse);
  normalizeInterlakenRegionalDays(draftCourse);
  normalizeIcelandRingRoadDays(draftCourse);
  if (normalizeEveningIntentForCourse(draftCourse)) {
    draftCourse.days.forEach(dayPlan => recalculateDayPlanTimes(dayPlan, cityId));
  }
  return draftCourse;
}

function renderItinerary(itinerary) {
  normalizeCourseMetadata(itinerary);
  sanitizeFictionalActivities(itinerary);
  ensureEssentialEarlyCityAttractions(itinerary);
  normalizeCourseTimeDisplay(itinerary);
  const tabContainer = document.getElementById('itineraryDayTabs');
  const timelineContainer = document.getElementById('itineraryTimelineList');

  tabContainer.innerHTML = '';
  timelineContainer.innerHTML = '';

  syncPlannerControlsFromCourse(itinerary);

  itinerary.days.forEach(dayPlan => {
    const isActive = dayPlan.day === state.currentItineraryDay;
    const btn = document.createElement('button');
    btn.className = `day-btn ${isActive ? 'active' : ''}`;
    btn.textContent = formatDayLabel(dayPlan.day);
    btn.addEventListener('click', () => {
      state.currentItineraryDay = dayPlan.day;
      renderItineraryTimeline(dayPlan.items);
      document.querySelectorAll('#itineraryDayTabs .day-btn').forEach((b, i) => {
        b.classList.toggle('active', i === dayPlan.day - 1);
      });
      // Update map when clicking day tabs
      renderMapForDay(state.currentItineraryDay - 1);
    });
    tabContainer.appendChild(btn);
  });
  updateRainyDaySelector();

  const activeDayPlan = itinerary.days.find(d => d.day === state.currentItineraryDay);
  if (activeDayPlan) {
    renderItineraryTimeline(activeDayPlan.items);
  }
  // Render map on loading itinerary
  renderMapForDay(state.currentItineraryDay - 1);
}

function renderItineraryTimeline(items) {
  const list = document.getElementById('itineraryTimelineList');
  list.innerHTML = '';

  const dayIndex = state.currentItineraryDay - 1;
  const dayPlan = state.activeCourse.days[dayIndex];
  const cityId = state.activeCourse.cityId;
  
  // Calculate attraction indices (excluding transits)
  const attractions = dayPlan.items.filter(it => !it.isTransit);

  dayPlan.items.forEach((item, itemIndex) => {
    if (isEndOfDayRestItem(item)) {
      return;
    }

    // Hide rest items immediately before meals (meal location is free)
    if (item.isRest && !isFlexibleBreakItem(item)) {
      // Find next non-transit, non-rest item
      for (let ni = itemIndex + 1; ni < dayPlan.items.length; ni++) {
        const nextItem = dayPlan.items[ni];
        if (nextItem.isTransit) continue;
        if (isMealBreakItem(nextItem)) return; // rest before meal → hide
        break;
      }
    }

    const name = getLocalizedItineraryField(item, 'name');
    const desc = getLocalizedItineraryField(item, 'desc');
    const durationLabel = getText('planner_duration');
    const displayTime = getDisplayTimeSlot(item);

    if (item.isTransit) {
      // Find nearest non-transit item before this transit
      let prevNonTransit = null;
      for (let pi = itemIndex - 1; pi >= 0; pi--) {
        if (!dayPlan.items[pi].isTransit) { prevNonTransit = dayPlan.items[pi]; break; }
      }
      // Find nearest non-transit item after this transit
      let nextNonTransit = null;
      for (let ni = itemIndex + 1; ni < dayPlan.items.length; ni++) {
        if (!dayPlan.items[ni].isTransit) { nextNonTransit = dayPlan.items[ni]; break; }
      }
      // Hide transit if adjacent to a meal or a rest-before-meal item
      const isAdjacentToMeal = isMealBreakItem(prevNonTransit) || isMealBreakItem(nextNonTransit) ||
        isFlexibleBreakItem(prevNonTransit) || isFlexibleBreakItem(nextNonTransit) ||
        (prevNonTransit && prevNonTransit.isRest && isMealBreakItem(nextNonTransit)) ||
        (nextNonTransit && nextNonTransit.isRest && isMealBreakItem(prevNonTransit));
      if (isAdjacentToMeal) {
        return;
      }

      const isWalk = item.transitType === 'Walk';
      const iconSVG = isWalk 
        ? `<svg viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 21.5h2.1l1.9-8.6 2.1 2v6.6h2v-8.1l-2.1-2 1-4.9c1.6 1.8 3.8 2.9 6.2 2.9v-2c-1.9 0-3.6-1-4.7-2.5l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.6.1-.9.2L6 5.8v6.5h2V9.3l1.8-.4"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z"/></svg>`;
      const itemHTML = `
        <div class="timeline-item transit">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-time-badge">${item.timeSlot}</span>
            <h4 class="timeline-title">
              ${iconSVG}
              <span>${name}</span>
            </h4>
          </div>
        </div>
      `;
      list.insertAdjacentHTML('beforeend', itemHTML);
    } else {
      const attIdx = attractions.indexOf(item);
      const details = getAttractionDetails(item, cityId);
      const hideDurationControl = item.hideDuration || item.isAllDayTrip || isNearbyDayTripItem(item);
      const isSpecialItem = item.isRest || isMealBreakItem(item) || item.isLodging;
      
      const itemHTML = `
        <div class="timeline-item" draggable="${item.isLodging ? 'false' : 'true'}" data-attraction-index="${attIdx}">
          <div class="timeline-marker" style="${item.isLodging ? 'background: #10b981; border-color: #10b981;' : ''}"></div>
          <div class="timeline-content">
            <div class="timeline-card-header">
              ${displayTime ? `<span class="timeline-time-badge">${displayTime}</span>` : ''}
              <div class="timeline-card-actions">
                ${hideDurationControl || isSpecialItem ? '' : `
                  <span style="font-size:11px; color:var(--text-muted);">${durationLabel}:</span>
                  <input type="number" class="timeline-duration-input" data-attraction-index="${attIdx}" value="${item.duration || 90}" min="10" max="600" step="10">
                  <span style="font-size:11px; color:var(--text-muted); margin-right:8px;">${getInlineText({ ko: '분', en: 'min', fr: 'min', zh: '分钟', ja: '分', es: 'min' })}</span>
                `}
                ${item.isLodging ? '' : `
                  <button class="timeline-delete-btn" data-attraction-index="${attIdx}" title="${getText('Delete')}">&times;</button>
                `}
              </div>
            </div>
            <h4 class="timeline-title" style="display: flex; align-items: center; gap: 8px;">
              ${item.isLodging ? '' : `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="color: var(--text-muted); cursor: grab; flex-shrink:0;"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>
              `}
              <span style="${item.isLodging ? 'font-weight:700; color:#10b981;' : ''}">${name}</span>
            </h4>
            ${desc ? `<p class="timeline-desc">${desc}</p>` : ''}
            
            ${isSpecialItem ? '' : `
              <div class="timeline-extra-info">
                <div class="timeline-info-links">
                  <a href="${details.mapsLink || item.mapsLink || '#'}" target="_blank" class="timeline-link-btn">
                    📍 ${getText('View Map')}
                  </a>
                  <a href="${item.website || details.website}" target="_blank" class="timeline-link-btn">
                    🌐 ${getText('Website')}
                  </a>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
      list.insertAdjacentHTML('beforeend', itemHTML);
    }
  });

  // Add the "장소 추가" button at the bottom of the timeline
  const addPlaceHTML = `
    <div class="timeline-add-place-container">
      <button class="timeline-add-place-btn" id="timelineAddPlaceBtn">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        <span>${getText('Add New Place')}</span>
      </button>
    </div>
  `;
  list.insertAdjacentHTML('beforeend', addPlaceHTML);
  
  // Bind actions
  bindTimelineActions();
}

// --- Companion Board Engine ---
function activateCompanionCategory(category = 'all') {
  const buttons = Array.from(document.querySelectorAll('#companionCategoryFilterList .category-tab-btn'));
  if (!buttons.length) return null;
  const target = buttons.find(button => button.getAttribute('data-category') === category)
    || buttons.find(button => button.getAttribute('data-category') === 'all')
    || buttons[0];
  buttons.forEach(button => button.classList.toggle('active', button === target));
  return target ? target.getAttribute('data-category') : null;
}

function renderCompanionRooms() {
  const grid = document.getElementById('companionRoomCardsGrid');
  grid.innerHTML = '';

  const prunedPayload = pruneExpiredRemotePayload({
    rooms: state.rooms || [],
    chatLogs: state.chatLogs || {},
    cityRequests: state.cityRequests || []
  });
  if (prunedPayload.rooms.length !== (state.rooms || []).length) {
    state.rooms = prunedPayload.rooms.map(normalizeRoomRecord);
    state.chatLogs = prunedPayload.chatLogs;
    saveToLocalStorage();
    pushToRemote().catch(() => {});
  }

  // Get current active category filter
  const activeTab = document.querySelector('#companionCategoryFilterList .category-tab-btn.active');
  const categoryFilter = activeTab ? activeTab.getAttribute('data-category') : 'all';

  // Filter rooms
  const filtered = state.rooms.filter(room => {
    if (categoryFilter === 'all') return true;
    return room.category === categoryFilter;
  });

  filtered.forEach(room => {
    const title = getLocalizedRoomField(room, 'title');
    const place = getLocalizedRoomField(room, 'place');
    const desc = getLocalizedRoomField(room, 'desc');
    const city = CITIES.find(c => c.id === room.cityId);
    const cityName = city ? getLocalizedCityField(city, 'name') : cleanUiText(room.cityId);
    const categoryLabel = getCategoryLabel(room.category);
    const scheduleText = formatRoomSchedule(room);
    const scheduleLabel = getText('modal_room_date') || getText('Meet time');
    const placeLabel = getText('modal_room_place') || getText('Place');

    // Calculate custom matching score based on user MBTI and selected preference
    let matchPercentage = 80;
    if (room.preferenceCode === state.activeProfile.mbti.toLowerCase() || room.preferenceCode === 'healing') {
      matchPercentage = 95;
    } else if (state.activeProfile.mbti.startsWith('E')) {
      matchPercentage = 90;
    }

    const isCreator = room.creator.name === state.activeProfile.name;
    
    let actionButtonsHTML = '';
    if (isCreator) {
      actionButtonsHTML = `
        <div class="room-actions-grid">
          <button class="btn-primary join-chat-btn" data-room-id="${room.id}" style="flex: 1; justify-content: center; padding: 10px;">
            <span data-i18n="comp_room_joined">${getText('comp_room_join_btn')}</span>
          </button>
          <button class="edit-room-btn" data-room-id="${room.id}" title="${getText('Edit')}">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="delete-room-btn" data-room-id="${room.id}" title="${getText('Delete')}">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;
    } else {
      actionButtonsHTML = `
        <button class="btn-primary join-chat-btn" data-room-id="${room.id}" style="width: 100%; justify-content: center; padding: 10px;">
          <span data-i18n="comp_room_joined">${getText('comp_room_join_btn')}</span>
        </button>
      `;
    }

    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.roomId = String(room.id);
    card.innerHTML = `
      <div>
        <div class="room-header">
          <span class="room-badge">${categoryLabel} (${cityName})</span>
          <span class="room-status" data-i18n="comp_room_recruiting">${getText('comp_room_recruiting')}</span>
        </div>
        
        <h4 class="room-title">${escapeHtml(title)}</h4>
        <div class="room-meet-summary">
          <div><strong>${scheduleLabel}</strong><span>${escapeHtml(scheduleText || '-')}</span></div>
          <div><strong>${placeLabel}</strong><span>${escapeHtml(place || '-')}</span></div>
        </div>
        
        <div class="room-creator">
          ${renderAvatarMarkup(room.creator, 'creator-avatar')}
          <div class="creator-info">
            <h5>${escapeHtml(getLocalizedProfileDisplayName(room.creator))}</h5>
            <p>${escapeHtml(room.creator.mbti)} · ${escapeHtml(getGenderLabel(room.creator.gender))}</p>
            <p class="creator-profile-line">${escapeHtml(getMemberDetailsText(room.creator))}</p>
          </div>
        </div>

        <p style="font-size:12px; color:var(--text-muted); margin-bottom: 12px; line-height: 1.4; height: 36px; overflow: hidden;">${escapeHtml(desc)}</p>
        
        <div class="room-tags">
          <span class="room-tag match">${getText('comp_room_pref_match')} ${matchPercentage}%</span>
          <span class="room-tag">${getText('comp_room_people')}: ${room.joinedCount}/${room.maxPeople >= 9999 ? '∞' : room.maxPeople}</span>
          ${getRoomConditionTagsHTML(room)}
        </div>
      </div>

      ${actionButtonsHTML}
    `;

    // Bind Join Room event
    card.querySelector('.join-chat-btn').addEventListener('click', (e) => {
      const roomId = parseInt(e.currentTarget.getAttribute('data-room-id'), 10);
      joinCompanionRoom(roomId);
    });

    // Bind Edit Room event if creator
    if (isCreator) {
      card.querySelector('.edit-room-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const roomId = parseInt(e.currentTarget.getAttribute('data-room-id'), 10);
        openEditRoomModal(roomId);
      });
    }

    // Bind Delete Room event if creator
    if (isCreator) {
      card.querySelector('.delete-room-btn').addEventListener('click', (e) => {
        const roomId = parseInt(e.currentTarget.getAttribute('data-room-id'), 10);
        deleteCompanionRoom(roomId);
      });
    }

    grid.appendChild(card);
  });
}

async function joinCompanionRoom(roomId) {
  syncProfileFromInputs(true);
  await pullFromRemote();
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  // Initialize joinedUsers array if not present
  if (!room.joinedUsers) {
    room.joinedUsers = [room.creator.name];
  }

  const username = state.activeProfile.name;
  room.memberProfiles = room.memberProfiles || {};
  room.memberProfiles[username] = getPublicProfileSnapshot();
  if (!room.joinedUsers.includes(username)) {
    const isUnlimited = !room.maxPeople || room.maxPeople >= 9999;
    if (isUnlimited || room.joinedUsers.length < room.maxPeople) {
      room.joinedUsers.push(username);
      room.joinedCount = room.joinedUsers.length;
      
      // Add join notification to chat log
      const joinMsg = getRoomSystemMessage('joined', { name: state.activeProfile.name });
      
      if (!state.chatLogs[roomId]) {
        state.chatLogs[roomId] = [];
      }
      state.chatLogs[roomId].push(createMessageObject({ text: joinMsg, system: true }));
      await pushToRemote();
    } else {
      showToast(getText('room_full'));
      return;
    }
  }

  state.joinedRoomId = roomId;

  // Switch view to chat page
  state.currentView = 'chat';
  updateView();
  renderChatRoom();
}

async function createCompanionRoom(e) {
  if (e) e.preventDefault();

  syncProfileFromInputs(true);

  const title = document.getElementById('modalRoomTitle').value;
  const cityId = document.getElementById('modalRoomDest').value;
  const category = document.getElementById('modalRoomCat').value;
  const place = document.getElementById('modalRoomPlace').value;
  const date = document.getElementById('modalRoomDate').value;
  const time = document.getElementById('modalRoomTime').value;
  const maxPeopleRaw = parseInt(document.getElementById('modalRoomMax').value, 10);
  const maxPeople = maxPeopleRaw === 0 ? 9999 : maxPeopleRaw; // 0 = unlimited
  const targetAge = getMultiSelectValues('modalRoomAge', 'any') || 'any';
  const targetGender = document.getElementById('modalRoomGender').value;
  const targetLanguage = getMultiSelectValues('modalRoomLanguage') || '';
  const targetSmoking = document.getElementById('modalRoomSmoking')?.value || 'ok';
  const targetAlcohol = document.getElementById('modalRoomAlcohol')?.value || 'ok';
  const targetNationality = getText('nat_any');
  const preferenceCode = 'healing';
  const desc = document.getElementById('modalRoomDesc').value;
  const roomLang = normalizeLanguageCode(state.lang);
  const roomTitleKey = `title_${roomLang}`;
  const roomPlaceKey = `place_${roomLang}`;
  const roomDescKey = `desc_${roomLang}`;

  syncCompanionDateTimeConstraints({ coerce: false });
  if (!date || !time || isPastCompanionDateTime(date, time)) {
    showToast(getCompanionPastTimeMessage());
    return;
  }

  await pullFromRemote();

  // ── EDIT MODE ──
  if (state.editingRoomId !== null) {
    const room = state.rooms.find(r => r.id === state.editingRoomId);
    if (room && room.creator.name === state.activeProfile.name) {
      room[roomTitleKey] = title;
      if (roomLang === 'ko') {
        room.title_en = cleanUiText(room.title_en) || title;
      } else if (roomLang === 'en') {
        room.title_ko = cleanUiText(room.title_ko) || title;
      }
      room.cityId = cityId;
      room.category = category;
      room.place_ko = place;
      room.place_en = place;
      room[roomPlaceKey] = place;
      room.date = date;
      room.time = time;
      room.maxPeople = maxPeople;
      room.targetAge = targetAge;
      room.targetGender = targetGender;
      room.targetLanguage = targetLanguage;
      room.targetSmoking = targetSmoking;
      room.targetAlcohol = targetAlcohol;
      room.targetNationality = targetNationality;
      room.preferenceCode = preferenceCode;
      room[roomDescKey] = desc;
      if (roomLang === 'ko') {
        room.desc_en = cleanUiText(room.desc_en) || desc;
      } else if (roomLang === 'en') {
        room.desc_ko = cleanUiText(room.desc_ko) || desc;
      }

      const updateSaved = await pushToRemote();
      const updatedRoomExists = state.rooms.some(candidate => candidate.id === room.id);
      if (!updateSaved || !updatedRoomExists) {
        showToast(getText('room_update_failed'));
        return;
      }
      closeCreateModal();
      activateCompanionCategory('all');
      renderCompanionRooms();
      showToast(getText('room_update_success'));
    }
    return;
  }

  const newRoomId = Date.now() + Math.floor(Math.random() * 1000);
  const creatorProfile = getPublicProfileSnapshot();
  const newRoom = {
    id: newRoomId,
    title_ko: title,
    title_en: title,
    [roomTitleKey]: title,
    cityId,
    category,
    place_ko: place,
    place_en: place,
    [roomPlaceKey]: place,
    date,
    time,
    maxPeople,
    joinedCount: 1, // Creator is first
    joinedUsers: [creatorProfile.name], // Initialize with creator
    targetAge,
    targetGender,
    targetLanguage,
    targetSmoking,
    targetAlcohol,
    targetNationality,
    preferenceCode,
    creator: {
      name: state.activeProfile.name,
      age: state.activeProfile.age || '30대',
      gender: state.activeProfile.gender,
      nationality: state.activeProfile.nationality || '한국인',
      mbti: state.activeProfile.mbti,
      verified: state.activeProfile.verified,
      avatarDataUrl: state.activeProfile.avatarDataUrl || '',
      sns: state.activeProfile.sns || 'None'
    },
    creator: creatorProfile,
    memberProfiles: {
      [creatorProfile.name]: creatorProfile
    },
    desc_ko: desc,
    desc_en: desc,
    [roomDescKey]: desc,
    status: 'recruiting',
    pendingSync: true
  };

  state.rooms.push(newRoom);
  
  // Set up empty chat log for new room
  const welcomeMsg = getRoomSystemMessage('welcome', { name: state.activeProfile.name });
  state.chatLogs[newRoomId] = [
    createMessageObject({ text: welcomeMsg, system: true })
  ];
  saveToLocalStorage();

  const createSaved = await pushToRemote();
  const createdRoom = state.rooms.find(room => room.id === newRoomId);
  if (!createSaved || !createdRoom) {
    state.rooms = state.rooms.filter(room => room.id !== newRoomId);
    delete state.chatLogs[newRoomId];
    saveToLocalStorage();
    showToast(getText('room_create_failed'));
    return;
  }
  createdRoom.pendingSync = false;
  saveToLocalStorage();

  closeCreateModal();
  activateCompanionCategory('all');
  renderCompanionRooms();
  const createdCard = document.querySelector(`.room-card[data-room-id="${newRoomId}"]`);
  if (createdCard) {
    createdCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  showToast(getText('room_create_success'));
}

async function deleteCompanionRoom(roomId) {
  const confirmMsg = getInlineText({
    ko: '정말로 이 동행 모집 글을 삭제하시겠습니까?',
    en: 'Are you sure you want to delete this companion room?',
    fr: 'Voulez-vous vraiment supprimer ce salon de compagnons ?',
    zh: '确定要删除这个同行房吗？',
    ja: 'この同行募集を削除しますか？',
    es: '¿Seguro que quieres eliminar esta sala de compañeros?'
  });
  if (!confirm(confirmMsg)) return;

  await pullFromRemote();

  state.rooms = state.rooms.filter(r => r.id !== roomId);
  if (state.chatLogs[roomId]) {
    delete state.chatLogs[roomId];
  }

  await pushToRemote({ deletedRoomIds: [roomId] });
  renderCompanionRooms();
  
  showToast(getText('room_deleted'));
}

// --- Live Chat Room Simulation ---
function renderChatRoom() {
  const room = state.rooms.find(r => r.id === state.joinedRoomId);
  if (!room) return;

  const shareBtn = document.getElementById('chatShareCourseBtn');
  if (shareBtn) {
    shareBtn.style.display = state.activeCourse ? 'flex' : 'none';
  }

  const title = getLocalizedRoomField(room, 'title');
  
  // Update header titles
  document.getElementById('chatRoomTitleText').textContent = title;
  document.getElementById('chatRoomCategoryBadge').textContent = getCategoryLabel(room.category);

  // Render members sidebar
  const membersContainer = document.getElementById('chatMemberListContainer');
  membersContainer.innerHTML = '';

  // Initialize joinedUsers array if not present
  if (!room.joinedUsers) {
    room.joinedUsers = [room.creator.name];
  }

  // Build membersList from room.joinedUsers
  const membersList = [];
  room.memberProfiles = room.memberProfiles || {};
  room.joinedUsers.forEach(username => {
    const savedProfile = room.memberProfiles[username];
    if (savedProfile) {
      membersList.push({ ...savedProfile, name: username });
    } else if (username === room.creator.name) {
      membersList.push(room.creator);
    } else if (username === state.activeProfile.name) {
      membersList.push(getPublicProfileSnapshot());
    } else {
      const mockProf = MOCK_USER_PROFILES.find(p => p.name === username);
      if (mockProf) {
        membersList.push(mockProf);
      } else {
        membersList.push({
          name: username,
          mbti: 'INFP',
          gender: '성별 무관',
          nationality: '한국인'
        });
      }
    }
  });

  const isCreator = room.creator.name === state.activeProfile.name;

  membersList.forEach(m => {
    const isMe = m.name === state.activeProfile.name;
    const isRoomCreator = m.name === room.creator.name;
    const showKick = isCreator && !isMe && !isRoomCreator;

    const kickBtn = showKick ? `
      <button class="kick-member-btn" data-username="${m.name}" title="${getText('kick_member')}">
        <svg viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
      </button>` : '';

    const memberItem = document.createElement('div');
    memberItem.className = 'member-item';
    memberItem.innerHTML = `
      ${renderAvatarMarkup(m, 'avatar')}
      <div class="member-copy">
        <div class="name">${escapeHtml(m.name)}${isRoomCreator ? ' 👑' : ''}</div>
        <div class="member-details">${escapeHtml(getMemberDetailsText(m))}</div>
      </div>
      <span class="mbti">${escapeHtml(m.mbti || '')}</span>
      ${kickBtn}
    `;

    if (showKick) {
      memberItem.querySelector('.kick-member-btn').addEventListener('click', () => {
        kickMember(m.name);
      });
    }

    membersContainer.appendChild(memberItem);
  });

  // Render message logs
  renderChatMessages();
}

function renderChatMessages(forceScrollToBottom = false) {
  const container = document.getElementById('chatMessagesLogList');
  if (!container) return;

  // Remember if user is near the bottom BEFORE clearing content
  const threshold = 120;
  const isNearBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) <= threshold;
  const prevScrollHeight = container.scrollHeight;

  container.innerHTML = '';

  const logs = state.chatLogs[state.joinedRoomId] || [];

  logs.forEach(log => {
    if (log.system) {
      container.insertAdjacentHTML('beforeend', `<div class="chat-msg-system">${escapeHtml(localizeRuntimeText(cleanUiText(log.text)))}</div>`);
    } else if (log.type === 'share_course') {
      const isMe = log.sender === state.activeProfile.name;
      const bubbleClass = isMe ? 'outgoing' : 'incoming';
      const senderText = isMe ? '' : `<span class="chat-msg-sender">${log.sender} (${log.mbti})</span>`;
      
      const course = normalizeCourseMetadata(log.course);
      const cardId = `chat-card-${log.id}`;
      const coursePrefs = getCoursePreferences(course);
      const prefText = coursePrefs.length > 0
        ? coursePrefs.map(p => getText('planner_pref_' + p)).join(', ')
        : '-';
      const courseDays = getCourseDurationDays(course);
      const localizedCourseCity = course.cityId && course.cityId !== 'multi_route'
        ? getCityDisplayName(course.cityId)
        : localizePlaceName(course.cityName);
      const itineraryNoun = getInlineText({ ko: '일정', en: 'itinerary', fr: 'itinéraire', zh: '行程', ja: '日程', es: 'itinerario' });
      
      const cardHTML = `
        <div class="chat-msg-bubble ${bubbleClass}">
          ${senderText}
          <div class="chat-msg-text" style="padding: 10px;">
            <div class="chat-msg-card">
              <div class="chat-msg-card-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="color:var(--primary);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/></svg>
                <span>${localizeRuntimeText('Shared Course')}</span>
              </div>
              <div class="chat-msg-card-desc">
                <b>${localizedCourseCity}</b> ${formatExportDurationDays(courseDays)} ${itineraryNoun}<br>
                ${localizeRuntimeText('Preferences:')} ${prefText}
              </div>
              <button class="chat-msg-card-btn" id="${cardId}">${localizeRuntimeText('Load Itinerary')}</button>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHTML);
      
      // Bind load course action
      const btn = document.getElementById(cardId);
      if (btn) {
        btn.addEventListener('click', () => {
          if (course && course.isRoute) {
            if (typeof restoreRouteStateFromPayload === 'function') {
              restoreRouteStateFromPayload(course);
            } else if (typeof routeState !== 'undefined') {
              routeState.cities = course.displayCities || course.optimized || course.originalCities || [];
              routeState.startCityId = course.startCityId || null;
              routeState.endCityId = course.endCityId || null;
              routeState.lastResult = {
                optimized: course.optimized || course.displayCities || [],
                segments: course.segments || [],
                totalTime: course.totalTime || 0
              };
              routeState.usePreloadedOrder = true;
              routeState.preserveLoadedOrder = true;
            }
            state.currentView = 'routeplanner';
            saveToLocalStorage();
            updateView();
            showToast(formatInlineText({ ko: '"{name}" 공유 경로를 불러왔습니다.', en: 'Loaded shared route "{name}".', fr: 'Trajet partagé « {name} » chargé.', zh: '已加载分享路线“{name}”。', ja: '共有ルート「{name}」を読み込みました。', es: 'Ruta compartida « {name} » cargada.' }, { name: course.cityName }));
          } else {
            normalizeCourseMetadata(course);
            state.activeCourse = course;
            state.currentItineraryDay = 1;
            state.currentView = 'planner';
            syncPlannerControlsFromCourse(course);
            saveToLocalStorage();
            updateView();
            renderItinerary(state.activeCourse);
            showToast(formatInlineText({ ko: '"{name}" 공유 일정을 불러왔습니다.', en: 'Loaded shared itinerary "{name}".', fr: 'Itinéraire partagé « {name} » chargé.', zh: '已加载分享行程“{name}”。', ja: '共有旅程「{name}」を読み込みました。', es: 'Itinerario compartido « {name} » cargado.' }, { name: course.cityName }));
          }
        });
      }
    } else {
      const isMe = log.sender === state.activeProfile.name;
      const bubbleClass = isMe ? 'outgoing' : 'incoming';
      const senderText = isMe ? '' : `<span class="chat-msg-sender">${log.sender} (${log.mbti})</span>`;

      const msgHTML = `
        <div class="chat-msg-bubble ${bubbleClass}">
          ${senderText}
          <div class="chat-msg-text">${escapeHtml(cleanUiText(log.text))}</div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', msgHTML);
    }
  });

  // Only scroll to bottom if: user was near the bottom OR we're forcing it (e.g. new message sent by user)
  if (forceScrollToBottom || isNearBottom) {
    scrollChatToBottom();
  } else {
    // Maintain relative scroll position after re-render
    const scrollDiff = container.scrollHeight - prevScrollHeight;
    container.scrollTop += scrollDiff;
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chatInputMessageField');
  const text = input.value.trim();
  if (!text) return;

  input.value = ''; // clear immediately for better local responsiveness

  await pullFromRemote();

  // Add user's message
  const msgObj = createMessageObject({
    sender: state.activeProfile.name,
    mbti: state.activeProfile.mbti,
    text: text
  });

  if (!state.chatLogs[state.joinedRoomId]) {
    state.chatLogs[state.joinedRoomId] = [];
  }

  state.chatLogs[state.joinedRoomId].push(msgObj);
  await pushToRemote();
  renderChatMessages(true); // force scroll to bottom when sending

  // Trigger simulated replies
  triggerSimulatedReply(text);
}

function triggerSimulatedReply(userText) {
  const roomId = state.joinedRoomId;
  const responses = CHAT_SIMULATOR_RESPONSES[roomId];
  if (!responses || responses.length === 0) return;

  // Take the first reply, pop it or cycle it to simulate responses
  responses.forEach(resp => {
    setTimeout(async () => {
      // Check if user is still in the same room
      if (state.joinedRoomId !== roomId) return;

      const replyText = state.lang === 'ko' ? resp.message_ko : localizeRuntimeText(resp.message_en);
      
      await pullFromRemote();

      // Check if already posted to avoid duplicated triggers
      const alreadyPosted = state.chatLogs[roomId].some(log => log.sender === resp.sender && log.text === replyText);
      if (alreadyPosted) return;

      const msgObj = createMessageObject({
        sender: resp.sender,
        mbti: resp.mbti,
        text: replyText
      });

      state.chatLogs[roomId].push(msgObj);
      await pushToRemote();
      
      // If we are currently viewing this chat room, re-render
      if (state.currentView === 'chat' && state.joinedRoomId === roomId) {
        renderChatMessages();
      }
    }, resp.delay);
  });
}

function scrollChatToBottom() {
  const container = document.getElementById('chatMessagesLogList');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

async function kickMember(username) {
  const confirmMsg = formatInlineText({
    ko: "'{name}'님을 강퇴하시겠습니까?", en: "Are you sure you want to remove '{name}'?", fr: "Voulez-vous exclure « {name} » ?", zh: '确定要移出“{name}”吗？', ja: '「{name}」さんを退出させますか？', es: '¿Quieres expulsar a « {name} »?'
  }, { name: username });
  if (!confirm(confirmMsg)) return;

  await pullFromRemote();
  const room = state.rooms.find(r => r.id === state.joinedRoomId);
  if (!room) return;

  // Only creator can kick
  if (room.creator.name !== state.activeProfile.name) return;

  if (room.joinedUsers) {
    room.joinedUsers = room.joinedUsers.filter(u => u !== username);
    room.joinedCount = room.joinedUsers.length;
  }

  const kickMsg = getRoomSystemMessage('kicked', { name: username });

  if (!state.chatLogs[state.joinedRoomId]) {
    state.chatLogs[state.joinedRoomId] = [];
  }
  state.chatLogs[state.joinedRoomId].push(createMessageObject({ text: kickMsg, system: true }));

  await pushToRemote({ replaceMembershipRoomIds: [state.joinedRoomId] });
  renderChatRoom();
  showToast(formatInlineText({ ko: "'{name}'님을 강퇴했습니다.", en: "'{name}' was removed.", fr: '« {name} » a été exclu.', zh: '已移出“{name}”。', ja: '「{name}」さんを退出させました。', es: 'Se expulsó a « {name} ».' }, { name: username }));
}

// --- Toast and Feedback ---
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = cleanUiText(localizeRuntimeText(message));
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

const OWNED_FEEDBACK_IDS_KEY = 'wander_feedback_owned_ids_v1';
let sharedFeedbackSelectedRating = 0;
let feedbackEditingId = null;
let ownedFeedbackIds = new Set();
const pendingFeedbackEdits = new Map();
const pendingFeedbackDeletes = new Set();

function getFeedbackStarLabel(value) {
  return getInlineText({ ko: `${value}점`, en: `${value} stars`, fr: `${value} étoiles`, zh: `${value}星`, ja: `${value}つ星`, es: `${value} estrellas` });
}

function loadOwnedFeedbackIds() {
  const stored = safeGetStoredJson(OWNED_FEEDBACK_IDS_KEY, []);
  ownedFeedbackIds = new Set((Array.isArray(stored) ? stored : []).filter(id => typeof id === 'string' && /^feedback-[\w-]+$/.test(id)).slice(0, 100));
}

function saveOwnedFeedbackIds() {
  const existingIds = new Set((state.feedbacks || []).map(entry => String(entry.id)));
  ownedFeedbackIds = new Set(Array.from(ownedFeedbackIds).filter(id => existingIds.has(id)).slice(-100));
  safeSetLocalStorage(OWNED_FEEDBACK_IDS_KEY, JSON.stringify(Array.from(ownedFeedbackIds)));
}

function isOwnedFeedback(entryOrId) {
  const id = typeof entryOrId === 'string' ? entryOrId : entryOrId && entryOrId.id;
  return !!id && ownedFeedbackIds.has(String(id));
}

function loadFeedbacksFromStorage() {
  const stored = safeGetStoredJson('wander_feedbacks', []);
  state.feedbacks = normalizeFeedbackCollection(stored);
  if (JSON.stringify(stored) !== JSON.stringify(state.feedbacks)) {
    safeSetLocalStorage('wander_feedbacks', JSON.stringify(state.feedbacks));
  }
}

function saveFeedbacksToStorage() {
  state.feedbacks = normalizeFeedbackCollection(state.feedbacks);
  safeSetLocalStorage('wander_feedbacks', JSON.stringify(state.feedbacks));
}

function updateFeedbackStarUI() {
  document.querySelectorAll('#feedbackStars .star-btn').forEach(button => {
    const value = Number(button.dataset.star);
    button.classList.toggle('active', value <= sharedFeedbackSelectedRating);
    button.setAttribute('aria-pressed', value === sharedFeedbackSelectedRating ? 'true' : 'false');
    button.setAttribute('aria-label', getFeedbackStarLabel(value));
  });
}

function normalizeInterlakenRegionalDays(course) {
  if (!course || course.cityId !== 'interlaken' || !Array.isArray(course.days) || typeof ATTRACTIONS === 'undefined') return;
  const pools = ATTRACTIONS.interlaken || {};
  const regionalStops = ['healing', 'culture', 'activity', 'shopping']
    .flatMap(category => Array.isArray(pools[category]) ? pools[category] : [])
    .filter(item => item && item.regionalRoute && Number.isFinite(Number(item.regionalRouteOrder)))
    .sort((a, b) => (Number(a.regionalRouteOrder) - Number(b.regionalRouteOrder))
      || (Number(a.regionalStopOrder) - Number(b.regionalStopOrder)));
  if (!regionalStops.length) return;

  const routes = new Map();
  regionalStops.forEach(item => {
    const routeOrder = Number(item.regionalRouteOrder);
    if (!routes.has(routeOrder)) routes.set(routeOrder, []);
    routes.get(routeOrder).push(item);
  });

  course.days.slice(1).forEach((dayPlan, dayIndex) => {
    const routeStops = routes.get(dayIndex + 1);
    if (!routeStops || !routeStops.length || !dayPlan || !Array.isArray(dayPlan.items)) return;
    const startLodging = dayPlan.items.find(item => item && item.isLodging && item.isStart) || null;
    const endLodging = dayPlan.items.find(item => item && item.isLodging && item.isEnd) || null;
    const lunch = createFallbackMealBreakItem('lunch');
    const dinner = createFallbackMealBreakItem('dinner');
    const ordered = [...(startLodging ? [startLodging] : [])];
    let lunchInserted = false;
    routeStops.forEach(source => {
      const item = {
        ...source,
        cityId: 'interlaken',
        duration: Number(source.regionalVisitDuration) || Number(source.duration) || 120
      };
      delete item.isAllDayTrip;
      delete item.hideDuration;
      delete item.timeSlot;
      ordered.push(item);
      if (source.regionalLunchAfter && !lunchInserted) {
        ordered.push(lunch);
        lunchInserted = true;
      }
    });
    if (!lunchInserted) ordered.splice(Math.min(2, ordered.length), 0, lunch);
    ordered.push(dinner);
    if (endLodging) ordered.push(endLodging);
    dayPlan.items = ordered;
    if (typeof recalculateDayPlanTimes === 'function') recalculateDayPlanTimes(dayPlan, 'interlaken');
  });
}

function initFeedbackSystem() {
  loadOwnedFeedbackIds();
  document.querySelectorAll('#feedbackStars .star-btn').forEach(button => {
    const value = Number(button.dataset.star);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      sharedFeedbackSelectedRating = value;
      updateFeedbackStarUI();
    });
  });
  const nameInput = document.getElementById('feedbackName');
  if (nameInput && !nameInput.value && state.activeProfile && state.activeProfile.name) nameInput.value = repairMojibakeText(state.activeProfile.name);
  const submitButton = document.getElementById('feedbackSubmitBtn');
  if (submitButton) submitButton.addEventListener('click', submitFeedback);
  const list = document.getElementById('feedbackList');
  if (list) {
    list.addEventListener('click', event => {
      const action = event.target.closest('[data-feedback-action]');
      if (!action) return;
      const id = action.dataset.feedbackId;
      if (action.dataset.feedbackAction === 'edit') beginFeedbackEdit(id);
      if (action.dataset.feedbackAction === 'cancel') cancelFeedbackEdit();
      if (action.dataset.feedbackAction === 'save') saveFeedbackEdit(id);
      if (action.dataset.feedbackAction === 'delete') deleteFeedback(id);
    });
  }
  renderFeedbackList();
}

async function submitFeedback() {
  const nameInput = document.getElementById('feedbackName');
  const textInput = document.getElementById('feedbackText');
  if (!nameInput || !textInput) return;
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!text) {
    showToast(getInlineText({ ko: '피드백 내용을 입력해주세요.', en: 'Please enter your feedback.', fr: 'Veuillez saisir votre avis.', zh: '请输入反馈内容。', ja: 'フィードバックを入力してください。', es: 'Escribe tu comentario.' }));
    return;
  }
  if (!sharedFeedbackSelectedRating) {
    showToast(getInlineText({ ko: '평점을 선택해주세요.', en: 'Please select a rating.', fr: 'Veuillez choisir une note.', zh: '请选择评分。', ja: '評価を選択してください。', es: 'Selecciona una puntuación.' }));
    return;
  }
  const entry = {
    id: `feedback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanUiText(name || getInlineText({ ko: '익명', en: 'Anonymous', fr: 'Anonyme', zh: '匿名', ja: '匿名', es: 'Anónimo' })).slice(0, 30),
    text: cleanUiText(text).slice(0, 500),
    rating: sharedFeedbackSelectedRating,
    timestamp: Date.now(),
    lang: normalizeLanguageCode(state.lang)
  };
  state.feedbacks = normalizeFeedbackCollection([entry, ...(state.feedbacks || [])]);
  saveFeedbacksToStorage();
  renderFeedbackList();
  const saved = await pushToRemote();
  if (saved) {
    ownedFeedbackIds.add(entry.id);
    saveOwnedFeedbackIds();
    textInput.value = '';
    sharedFeedbackSelectedRating = 0;
    updateFeedbackStarUI();
    renderFeedbackList();
  } else {
    state.feedbacks = state.feedbacks.filter(item => item.id !== entry.id);
    saveFeedbacksToStorage();
    renderFeedbackList();
  }
  showToast(saved
    ? getInlineText({ ko: '피드백이 등록되었습니다. 감사합니다!', en: 'Feedback submitted. Thank you!', fr: 'Avis envoyé. Merci !', zh: '反馈已提交，谢谢！', ja: 'フィードバックを送信しました。', es: 'Comentario enviado. ¡Gracias!' })
    : getInlineText({ ko: '서버 저장에 실패했습니다. 다시 시도해주세요.', en: 'Could not save feedback to the server. Please try again.', fr: "Impossible d'enregistrer l'avis. Réessayez.", zh: '无法保存反馈，请重试。', ja: 'サーバーに保存できませんでした。', es: 'No se pudo guardar. Inténtalo de nuevo.' }));
}

function beginFeedbackEdit(feedbackId) {
  if (!isOwnedFeedback(feedbackId) || pendingFeedbackEdits.has(String(feedbackId)) || pendingFeedbackDeletes.has(String(feedbackId))) return;
  feedbackEditingId = String(feedbackId);
  renderFeedbackList();
  const editor = document.querySelector(`[data-feedback-editor="${CSS.escape(feedbackEditingId)}"]`);
  if (editor) {
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }
}

function cancelFeedbackEdit() {
  feedbackEditingId = null;
  renderFeedbackList();
}

async function saveFeedbackEdit(feedbackId) {
  const id = String(feedbackId || '');
  if (!isOwnedFeedback(id) || pendingFeedbackEdits.has(id) || pendingFeedbackDeletes.has(id)) return;
  const original = (state.feedbacks || []).find(entry => entry.id === id);
  const editor = document.querySelector(`[data-feedback-editor="${CSS.escape(id)}"]`);
  if (!original || !editor) return;
  const text = cleanUiText(editor.value.trim()).slice(0, 500);
  if (!text) return showToast(getInlineText({ ko: '피드백 내용을 입력해주세요.', en: 'Please enter your feedback.', fr: 'Veuillez saisir votre avis.', zh: '请输入反馈内容。', ja: 'フィードバックを入力してください。', es: 'Escribe tu comentario.' }));
  const updated = { ...original, text, updatedAt: Date.now() };
  pendingFeedbackEdits.set(id, updated);
  state.feedbacks = normalizeFeedbackCollection([updated, ...state.feedbacks.filter(entry => entry.id !== id)]);
  feedbackEditingId = null;
  saveFeedbacksToStorage();
  renderFeedbackList();
  const saved = await pushToRemote();
  pendingFeedbackEdits.delete(id);
  if (!saved) {
    state.feedbacks = normalizeFeedbackCollection([original, ...state.feedbacks.filter(entry => entry.id !== id)]);
    saveFeedbacksToStorage();
  }
  renderFeedbackList();
  showToast(getText(saved ? 'feedback_updated' : 'feedback_update_failed'));
}

async function deleteFeedback(feedbackId) {
  const id = String(feedbackId || '');
  if (!isOwnedFeedback(id) || pendingFeedbackEdits.has(id) || pendingFeedbackDeletes.has(id) || !confirm(getText('feedback_delete_confirm'))) return;
  const original = (state.feedbacks || []).find(entry => entry.id === id);
  if (!original || !isOwnedFeedback(id)) return;
  pendingFeedbackDeletes.add(id);
  state.feedbacks = state.feedbacks.filter(entry => entry.id !== id);
  saveFeedbacksToStorage();
  renderFeedbackList();
  const saved = await pushToRemote({ deletedFeedbackIds: [id] });
  pendingFeedbackDeletes.delete(id);
  if (saved) {
    ownedFeedbackIds.delete(id);
    saveOwnedFeedbackIds();
  } else {
    state.feedbacks = normalizeFeedbackCollection([original, ...state.feedbacks]);
    saveFeedbacksToStorage();
    renderFeedbackList();
  }
  showToast(getText(saved ? 'feedback_deleted' : 'feedback_delete_failed'));
}

function renderFeedbackList() {
  const container = document.getElementById('feedbackList');
  if (!container) return;
  const entries = normalizeFeedbackCollection(state.feedbacks);
  if (!entries.length) {
    container.innerHTML = `<div class="feedback-empty">${escapeHtml(getInlineText({ ko: '아직 피드백이 없습니다.', en: 'No feedback yet.', fr: 'Aucun avis pour le moment.', zh: '暂无反馈。', ja: 'まだフィードバックはありません。', es: 'Aún no hay comentarios.' }))}</div>`;
    return;
  }
  container.innerHTML = entries.map(entry => {
    const id = escapeHtml(entry.id);
    const dateText = new Date(entry.timestamp).toLocaleDateString(normalizeLanguageCode(state.lang));
    const edited = entry.updatedAt ? `<span class="feedback-edited">${escapeHtml(getText('feedback_edited'))}</span>` : '';
    const stars = '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating);
    const editing = feedbackEditingId === entry.id && isOwnedFeedback(entry);
    const busy = pendingFeedbackEdits.has(entry.id) || pendingFeedbackDeletes.has(entry.id);
    const body = editing
      ? `<textarea class="form-control feedback-inline-editor" maxlength="500" data-feedback-editor="${id}">${escapeHtml(entry.text)}</textarea><div class="feedback-card-actions"><button type="button" class="feedback-action-btn feedback-save-btn" data-feedback-action="save" data-feedback-id="${id}">${escapeHtml(getText('feedback_save'))}</button><button type="button" class="feedback-action-btn" data-feedback-action="cancel" data-feedback-id="${id}">${escapeHtml(getText('feedback_cancel'))}</button></div>`
      : `<div class="feedback-card-text">${escapeHtml(entry.text)}</div>`;
    const controls = !editing && !busy && isOwnedFeedback(entry)
      ? `<div class="feedback-card-actions"><button type="button" class="feedback-action-btn" data-feedback-action="edit" data-feedback-id="${id}">${escapeHtml(getText('feedback_edit'))}</button><button type="button" class="feedback-action-btn feedback-delete-btn" data-feedback-action="delete" data-feedback-id="${id}">${escapeHtml(getText('feedback_delete'))}</button></div>`
      : '';
    return `<article class="feedback-card"><div class="feedback-card-header"><span class="feedback-author">${escapeHtml(entry.name)}</span><span class="feedback-date">${escapeHtml(dateText)} ${edited}</span></div><div class="feedback-card-stars" aria-label="${entry.rating}/5">${stars}</div>${body}${controls}</article>`;
  }).join('');
}

// --- WanderSync Enhancements Helper Functions ---

function formatMinutesGlobal(m) {
  const hrs = Math.floor(m / 60);
  const mins = m % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function getAttractionDetails(item, cityId) {
  const nameKo = item.name_ko || '';
  const nameEn = item.name_en || '';
  const name = (nameKo + ' ' + nameEn).toLowerCase();
  
  let fee = '';
  let feeEn = '';
  let reservation = '';
  let reservationEn = '';
  let website = '';
  
  // Paris Match
  if (cityId === 'paris' || name.includes('disney') || name.includes('디즈니')) {
    if (name.includes('디즈니랜드') || name.includes('disneyland')) {
      fee = '€105'; feeEn = '€105';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.disneylandparis.com/';
    } else if (name.includes('루브르') || name.includes('louvre')) {
      fee = '€22'; feeEn = '€22';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.louvre.fr/';
    } else if (name.includes('에펠탑') || name.includes('eiffel')) {
      fee = '€29'; feeEn = '€29';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://www.toureiffel.paris/';
    } else if (name.includes('베르사유') || name.includes('versailles')) {
      fee = '€21.50'; feeEn = '€21.50';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.chateauversailles.fr/';
    } else if (name.includes('오르세') || name.includes('orsay')) {
      fee = '€16'; feeEn = '€16';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://www.musee-orsay.fr/';
    } else if (name.includes('개선문') || name.includes('triomphe')) {
      fee = '€13'; feeEn = '€13';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://www.paris-arc-de-triomphe.fr/';
    } else if (name.includes('라발레') || name.includes('vallee')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '선택'; reservationEn = 'Optional';
      website = 'https://www.thebicestercollection.com/la-vallee-village/';
    }
  }
  
  // Tokyo Match
  if (cityId === 'tokyo' || name.includes('디즈니씨') || name.includes('disneysea')) {
    if (name.includes('디즈니씨') || name.includes('disneysea') || name.includes('디즈니랜드') || name.includes('disneyland')) {
      fee = '¥8,900'; feeEn = '¥8,900';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.tokyodisneyresort.jp/';
    } else if (name.includes('시부야 스카이') || name.includes('shibuya sky')) {
      fee = '¥2,200'; feeEn = '¥2,200';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.shibuya-scramble-square.com/sky/';
    } else if (name.includes('팀랩') || name.includes('teamlab')) {
      fee = '¥3,800'; feeEn = '¥3,800';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://planets.teamlab.art/tokyo/';
    } else if (name.includes('센소지') || name.includes('senso')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '불필요'; reservationEn = 'Walk-in';
      website = 'https://www.senso-ji.jp/';
    } else if (name.includes('신주쿠 교엔') || name.includes('shinjuku gyoen')) {
      fee = '¥500'; feeEn = '¥500';
      reservation = '불필요'; reservationEn = 'Walk-in';
      website = 'https://www.env.go.jp/garden/shinjukugyoen/';
    } else if (name.includes('도쿄 타워') || name.includes('tokyo tower')) {
      fee = '¥1,200'; feeEn = '¥1,200';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://www.tokyotower.co.jp/';
    }
  }

  // Seoul Match
  if (cityId === 'seoul') {
    if (name.includes('경복궁') || name.includes('gyeongbokgung')) {
      fee = '3,000원'; feeEn = '₩3,000';
      reservation = '불필요'; reservationEn = 'Walk-in';
      website = 'https://royal.khs.go.kr/';
    } else if (name.includes('창덕궁') || name.includes('changdeokgung')) {
      fee = '3,000원'; feeEn = '₩3,000';
      reservation = '후원은 필수'; reservationEn = 'Required for Secret Garden';
      website = 'https://royal.khs.go.kr/';
    } else if (name.includes('롯데월드') || name.includes('lotte world')) {
      fee = '62,000원'; feeEn = '₩62,000';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://adventure.lotteworld.com/';
    } else if (name.includes('더현대') || name.includes('hyundai')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '선택'; reservationEn = 'Optional';
      website = 'https://www.thehyundaiseoul.com/';
    } else if (name.includes('국립중앙박물관') || name.includes('national museum')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '불필요'; reservationEn = 'Walk-in';
      website = 'https://www.museum.go.kr/';
    }
  }

  // Osaka Match
  if (cityId === 'osaka') {
    if (name.includes('유니버설') || name.includes('universal') || name.includes('usj')) {
      fee = '¥8,600'; feeEn = '¥8,600';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.usj.co.jp/';
    } else if (name.includes('오사카성') || name.includes('osaka castle')) {
      fee = '¥600'; feeEn = '¥600';
      reservation = '불필요'; reservationEn = 'Walk-in';
      website = 'https://www.osakacastle.net/';
    } else if (name.includes('하루카스') || name.includes('harukas')) {
      fee = '¥1,500'; feeEn = '¥1,500';
      reservation = '권장'; reservationEn = 'Recommended';
      website = 'https://www.abenoharukas-300.jp/observatory/';
    } else if (name.includes('가이유칸') || name.includes('kaiyukan')) {
      fee = '¥2,700'; feeEn = '¥2,700';
      reservation = '필수'; reservationEn = 'Required';
      website = 'https://www.kaiyukan.com/';
    }
  }

  // Fallback defaults by category keywords
  if (!fee) {
    if (name.includes('시장') || name.includes('market') || name.includes('아울렛') || name.includes('outlet') || name.includes('거리') || name.includes('street') || name.includes('숍') || name.includes('shop') || name.includes('몰') || name.includes('mall') || name.includes('백화점') || name.includes('store')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '불필요'; reservationEn = 'Walk-in';
    } else if (name.includes('공원') || name.includes('park') || name.includes('해변') || name.includes('beach') || name.includes('광장') || name.includes('square') || name.includes('숲') || name.includes('forest') || name.includes('호수') || name.includes('lake') || name.includes('산') || name.includes('mountain') || name.includes('계곡') || name.includes('valley')) {
      fee = '무료'; feeEn = 'FREE';
      reservation = '불필요'; reservationEn = 'Walk-in';
    } else if (name.includes('카페') || name.includes('cafe') || name.includes('찻집') || name.includes('tea') || name.includes('맛집') || name.includes('식당') || name.includes('restaurant') || name.includes('바 ') || name.includes('bar ') || name.includes('펍') || name.includes('pub') || name.includes('요리') || name.includes('food')) {
      fee = '음료/식사비'; feeEn = 'Pay for food/drinks';
      reservation = '선택'; reservationEn = 'Optional';
    } else if (name.includes('박물관') || name.includes('museum') || name.includes('미술관') || name.includes('gallery') || name.includes('전시') || name.includes('exhibit')) {
      fee = '약 €10 / $10'; feeEn = 'Approx €10 / $10';
      reservation = '권장'; reservationEn = 'Recommended';
    } else {
      fee = '무료 또는 변동'; feeEn = 'Free or variable';
      reservation = '불필요'; reservationEn = 'Walk-in';
    }
  }
  
  // Map link generator. Include city and country to avoid ambiguous global search hits.
  const city = typeof CITIES !== 'undefined' && Array.isArray(CITIES)
    ? CITIES.find(c => c.id === cityId)
    : null;
  const cityName = city ? (city.name_en || city.name_ko || city.id) : cityId;
  const countryName = city ? (city.country_en || city.country_ko || '') : '';
  const placeName = item.name_en || item.name_ko || item.name || '';
  const mapQuery = [placeName, cityName, countryName].filter(Boolean).join(', ');
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    
  // Website link generator
  if (!website) {
    website = `https://www.google.com/search?q=${encodeURIComponent((item.name_en || item.name_ko) + ' official website')}`;
  }
  
  return {
    fee: '',
    reservation: '',
    mapsLink,
    website
  };
}

let leafletMap = null;
let leafletMarkersGroup = null;
let leafletPolyline = null;
let itineraryMapRenderSequence = 0;

function setItineraryMapStatus(message) {
  const mapContainer = document.getElementById('itineraryMapContainer');
  if (!mapContainer) return;
  let status = document.getElementById('itineraryMapStatus');
  if (!status) {
    status = document.createElement('div');
    status.id = 'itineraryMapStatus';
    status.setAttribute('role', 'status');
    status.style.cssText = 'position:absolute;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;background:rgba(255,255,255,.9);color:var(--text-muted);pointer-events:none;';
    mapContainer.appendChild(status);
  }
  status.textContent = message || '';
  status.style.display = message ? 'flex' : 'none';
}

async function renderMapForDay(dayIndex) {
  const renderSequence = ++itineraryMapRenderSequence;
  const mapContainer = document.getElementById('itineraryMapContainer');
  if (!mapContainer) return;
  
  const course = state.activeCourse;
  if (!course || !course.days || !course.days[dayIndex]) {
    mapContainer.style.display = 'none';
    return;
  }
  
  mapContainer.style.display = 'block';
  
  const dayPlan = course.days[dayIndex];
  const cityId = course.cityId;
  const candidates = dayPlan.items.filter(item => {
    if (item.isTransit || item.isRest || item.isLodging) return false;
    if (typeof isMealBreakItem === 'function' && isMealBreakItem(item)) return false;
    const nameKo = (item.name_ko || '').toLowerCase();
    const nameEn = (item.name_en || '').toLowerCase();
    return nameKo !== '점심시간' && nameKo !== '저녁시간' && nameEn !== 'lunch time' && nameEn !== 'dinner time';
  });

  setItineraryMapStatus(getInlineText({
    ko: '장소 위치를 확인하고 있습니다.',
    en: 'Verifying place locations...',
    fr: 'Vérification des lieux...',
    zh: '正在核对地点位置…',
    ja: '場所の位置を確認しています…',
    es: 'Verificando las ubicaciones...'
  }));

  const resolved = await Promise.all(candidates.map(async item => ({
    item,
    coords: (await resolveVerifiedMapCoordinate(item, cityId)) || getLandMapFallbackCoordinate(item, cityId)
  })));
  if (renderSequence !== itineraryMapRenderSequence) return;

  const attractions = resolved.filter(entry => entry.coords);
  const points = attractions.map(entry => [entry.coords.y, entry.coords.x]);
  if (points.length === 0) {
    if (leafletMarkersGroup && leafletMap) leafletMap.removeLayer(leafletMarkersGroup);
    if (leafletPolyline && leafletMap) leafletMap.removeLayer(leafletPolyline);
    leafletMarkersGroup = null;
    leafletPolyline = null;
    setItineraryMapStatus(getInlineText({
      ko: '확인된 위치가 없어 지도 핀을 표시하지 않습니다. 각 장소의 지도 보기 링크를 이용해 주세요.',
      en: 'No verified locations are available. Use each place\'s View Map link instead.',
      fr: 'Aucun lieu vérifié. Utilisez le lien Voir la carte de chaque lieu.',
      zh: '没有可验证的位置，请使用各地点的“查看地图”链接。',
      ja: '確認済みの位置がありません。各場所の「地図を見る」リンクをご利用ください。',
      es: 'No hay ubicaciones verificadas. Usa el enlace Ver mapa de cada lugar.'
    }));
    return;
  }
  
  try {
    if (typeof L === 'undefined') {
      setItineraryMapStatus(getInlineText({ ko: '지도를 불러올 수 없습니다. 인터넷 연결을 확인해주세요.', en: 'Unable to load the map. Check your internet connection.', fr: 'Impossible de charger la carte. Vérifiez votre connexion Internet.', zh: '无法加载地图，请检查网络连接。', ja: '地図を読み込めません。インターネット接続を確認してください。', es: 'No se pudo cargar el mapa. Comprueba la conexión a Internet.' }));
      return;
    }

    setItineraryMapStatus('');
    
    if (!leafletMap) {
      leafletMap = L.map('itineraryMap', {
        zoomControl: true,
        scrollWheelZoom: true
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(leafletMap);
    }
    localizeLeafletMapControls(leafletMap);
    
    // Invalidate Leaflet map size to prevent gray panes when container displays
    setTimeout(() => {
      leafletMap.invalidateSize();
    }, 50);
    
    if (leafletMarkersGroup) {
      leafletMap.removeLayer(leafletMarkersGroup);
    }
    if (leafletPolyline) {
      leafletMap.removeLayer(leafletPolyline);
    }
    
    leafletMarkersGroup = L.layerGroup().addTo(leafletMap);
    
    points.forEach((pt, idx) => {
      const { item, coords } = attractions[idx];
      const name = getLocalizedItineraryField(item, 'name');
      const desc = getLocalizedItineraryField(item, 'desc');
      const displayTime = getDisplayTimeSlot(item);
      
      const isLodging = item.isLodging;
      const pinColor = isLodging ? '#10b981' : '#8a5cf6';
      
      const numIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="pin-badge" data-verified-lat="${coords.y}" data-verified-lng="${coords.x}" data-coordinate-source="${escapeHtml(coords.coordinateSource || 'verified')}" style="background-color: ${pinColor};">${isLodging ? '🏨' : idx + 1}</div>
          <div class="pin-title">${escapeHtml(name)}</div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 20]
      });
      
      const marker = L.marker(pt, { icon: numIcon })
        .addTo(leafletMarkersGroup)
        .bindPopup(`
          <div style="color: #000; font-family: sans-serif; font-size:12.5px;">
            <b style="font-size:14px; color:${pinColor}">${isLodging ? '🏨' : (idx + 1) + '.'} ${escapeHtml(name)}</b><br>
            ${displayTime ? `<span style="font-weight:600;">${getText('Time')}:</span> ${escapeHtml(displayTime)}<br>` : ''}
            ${desc ? `<span style="color:#555;">${escapeHtml(desc)}</span>` : ''}
          </div>
        `);
      const markerElement = marker.getElement();
      if (markerElement) {
        markerElement.dataset.verifiedLat = String(coords.y);
        markerElement.dataset.verifiedLng = String(coords.x);
        markerElement.dataset.coordinateSource = coords.coordinateSource || 'verified';
        markerElement.setAttribute('aria-label', name);
      }
    });
    
    if (points.length > 1) {
      leafletPolyline = L.polyline(points, {
        color: '#8a5cf6',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 8'
      }).addTo(leafletMap);
    }
    
    const bounds = L.latLngBounds(points);
    // Fit the entire selected day, including compact landmark pairs.
    leafletMap.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    
  } catch (err) {
    console.error("Error rendering map:", err);
  }
}

function recalculateDayPlanTimes(dayPlan, cityId) {
  let attractions = dayPlan.items.filter(item => !item.isTransit && !isEndOfDayRestItem(item));
  
  const startLodging = attractions.find(item => item.isLodging && item.isStart);
  const endLodging = attractions.find(item => item.isLodging && item.isEnd);
  
  const actualAttractions = attractions.filter(item => !item.isLodging);
  
  if (actualAttractions.length === 0) {
    dayPlan.items = [];
    return;
  }
  
  let finalAttractions = [];
  if (startLodging) finalAttractions.push(startLodging);
  finalAttractions.push(...actualAttractions);
  if (endLodging) finalAttractions.push(endLodging);
  finalAttractions.forEach(item => {
    if (item && cityId && !item.cityId) item.cityId = cityId;
  });
  
  const newItems = [];
  let currentTime = 510; // 08:30
  
  for (let i = 0; i < finalAttractions.length; i++) {
    const item = finalAttractions[i];
    
    if (i > 0) {
      const prevItem = finalAttractions[i - 1];
      const transit = isMealBreakItem(prevItem) || isMealBreakItem(item) || isFlexibleBreakItem(prevItem) || isFlexibleBreakItem(item)
        ? { duration: 0 }
        : calculateTransit(prevItem, item);
      if (transit.duration > 0) {
        const transitStart = currentTime;
        const transitEnd = currentTime + transit.duration;
        
        const transitIcon = transit.type_ko === "도보" ? "🚶" : "🚌";
        const transitNameKo = `${transitIcon} ${transit.type_ko} (${transit.distance}km)`;
        const transitNameEn = `${transitIcon} ${transit.type_en} (${transit.distance}km)`;
        
        newItems.push({
          isTransit: true,
          transitType: transit.type_en,
          timeSlot: `${formatMinutesGlobal(transitStart)} - ${formatMinutesGlobal(transitEnd)}`,
          name_ko: transitNameKo,
          name_en: transitNameEn,
          duration: transit.duration
        });
        
        currentTime += transit.duration;
      }
    }
    
    if (!item.isLodging && Number.isFinite(item.lockedStartMin) && currentTime < item.lockedStartMin) {
      currentTime = item.lockedStartMin;
    }

    if (isMealBreakItem(item)) {
      currentTime = clampMealStartMinutes(currentTime, item);
    }

    const start = currentTime;
    markNearbyDayTripPresentation(item);
    const duration = item.isLodging ? 0 : (item.duration || 90);
    const end = start + duration;
    
    item.timeSlot = item.isLodging 
      ? (isReturnToLodgingItem(item) ? '' : formatMinutesGlobal(start))
      : (item.isAllDayTrip ? getAllDayTripLabel() : `${formatMinutesGlobal(start)} - ${formatMinutesGlobal(end)}`);
    
    if (!item.isLodging) {
      const details = getAttractionDetails(item, cityId || state.activeCourse.cityId);
      item.mapsLink = details.mapsLink;
      item.website = details.website;
    }
    
    newItems.push(item);
    currentTime = end;
  }
  
  normalizeOpenEndedDinnerSlots(newItems);
  dayPlan.items = newItems;
}

function cloneSavedCoursePayload(course) {
  try {
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.warn('Falling back to direct course reference for save:', error);
    return course;
  }
}

function saveCurrentItinerary() {
  const course = state.activeCourse;
  if (!course) {
    showToast(getText('itinerary_none_to_save'));
    return;
  }

  normalizeCourseMetadata(course, true);
  if (!state.savedCourses) state.savedCourses = [];

  const editingId = state.editingSavedCourseId || null;
  const existingIndex = editingId
    ? state.savedCourses.findIndex(trip => String(trip.id) === String(editingId))
    : -1;
  const existingTrip = existingIndex >= 0 ? state.savedCourses[existingIndex] : null;
  const defaultName = existingTrip
    ? existingTrip.name
    : `${course.cityName} ${formatExportDurationDays(course.days.length)}`;

  const tripName = prompt(
    getInlineText({
      ko: '여행 일정의 이름을 입력해주세요:',
      en: 'Please enter a name for this itinerary:',
      fr: 'Saisissez un nom pour cet itinéraire :',
      zh: '请输入此行程的名称：',
      ja: 'この旅程の名前を入力してください：',
      es: 'Introduce un nombre para este itinerario:'
    }),
    defaultName
  );

  if (tripName === null) return;
  const name = tripName.trim() || defaultName;

  if (existingTrip) {
    state.savedCourses[existingIndex] = {
      ...existingTrip,
      name: name,
      course: cloneSavedCoursePayload(course),
      savedAt: Date.now(),
      author: existingTrip.author || (state.activeProfile ? state.activeProfile.name : null)
    };
    state.editingSavedCourseId = existingTrip.id;
    saveToLocalStorage();
    renderSavedCoursesList();
    showToast(getText('itinerary_updated'));
    return;
  }

  const newTrip = {
    id: 'trip-' + Date.now(),
    name: name,
    course: cloneSavedCoursePayload(course),
    savedAt: Date.now(),
    author: state.activeProfile ? state.activeProfile.name : null
  };

  state.savedCourses.push(newTrip);
  state.editingSavedCourseId = newTrip.id;
  saveToLocalStorage();
  renderSavedCoursesList();
  showToast(getText('itinerary_saved'));
}

function saveCurrentItineraryLegacy() {
  const course = state.activeCourse;
  if (!course) {
    showToast(getText('itinerary_none_to_save'));
    return;
  }
  normalizeCourseMetadata(course, true);
  
  const tripName = prompt(
    getInlineText({
      ko: '여행 일정의 이름을 입력해주세요:',
      en: 'Please enter a name for this itinerary:',
      fr: 'Saisissez un nom pour cet itinéraire :',
      zh: '请输入此行程的名称：',
      ja: 'この旅程の名前を入力してください：',
      es: 'Introduce un nombre para este itinerario:'
    }),
    `${course.cityName} ${formatExportDurationDays(course.days.length)}`
  );
  
  if (tripName === null) return;
  const defaultName = `${course.cityName} ${formatExportDurationDays(course.days.length)}`;
  const name = tripName.trim() || defaultName;
  
  if (!state.savedCourses) state.savedCourses = [];
  
  const newTrip = {
    id: 'trip-' + Date.now(),
    name: name,
    course: course,
    savedAt: Date.now(),
    author: state.activeProfile ? state.activeProfile.name : null
  };
  
  state.savedCourses.push(newTrip);
  saveToLocalStorage();
  renderSavedCoursesList();
  showToast(getText('itinerary_saved'));
}

function renderSavedCoursesList() {
  const container = document.getElementById('savedTripsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  const allSaved = state.savedCourses || [];
  const saved = allSaved.filter(trip => !trip.author || (state.activeProfile && state.activeProfile.name && trip.author === state.activeProfile.name));
  
  if (saved.length === 0) {
    container.innerHTML = `
      <p style="font-size: 12px; color: var(--text-muted); text-align: center; margin: 8px 0;" data-i18n="saved_trips_empty">
        ${getText('saved_trips_empty')}
      </p>
    `;
    return;
  }
  
  saved.forEach(trip => {
    if (trip.course) normalizeCourseMetadata(trip.course);
    const formattedDate = new Date(trip.savedAt).toLocaleDateString(getLanguageLocale(), {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const item = document.createElement('div');
    item.className = 'saved-trip-item';
    item.innerHTML = `
      <div class="saved-trip-info">
        <div class="saved-trip-title">${trip.name}</div>
        <div class="saved-trip-meta">${trip.course.cityName} · ${formatExportDurationDays(trip.course.days.length)} · ${formattedDate}</div>
      </div>
      <button class="saved-trip-delete" title="${getText('Delete')}">
        <svg viewBox="0 0 24 24" style="width:14px; height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    
    item.querySelector('.saved-trip-info').addEventListener('click', () => {
      if (trip.course && trip.course.isRoute) {
        // Route trip: load into route planner view
        if (typeof restoreRouteStateFromPayload === 'function') {
          restoreRouteStateFromPayload(trip.course);
        } else if (typeof routeState !== 'undefined') {
          routeState.cities = trip.course.displayCities || trip.course.optimized || trip.course.originalCities || [];
          routeState.startCityId = trip.course.startCityId || null;
          routeState.endCityId = trip.course.endCityId || null;
          routeState.lastResult = {
            optimized: trip.course.optimized || trip.course.displayCities || [],
            segments: trip.course.segments || [],
            totalTime: trip.course.totalTime || 0
          };
          routeState.usePreloadedOrder = true;
          routeState.preserveLoadedOrder = true;
        }
        state.currentView = 'routeplanner';
        state.editingSavedCourseId = trip.id;
        saveToLocalStorage();
        updateView();
        showToast(formatInlineText({ ko: '"{name}" 경로를 불러왔습니다.', en: 'Loaded route "{name}".', fr: 'Trajet « {name} » chargé.', zh: '已加载路线“{name}”。', ja: 'ルート「{name}」を読み込みました。', es: 'Ruta « {name} » cargada.' }, { name: trip.name }));
      } else {
        // Regular itinerary trip
        const editableCourse = cloneSavedCoursePayload(trip.course);
        normalizeCourseMetadata(editableCourse);
        state.activeCourse = editableCourse;
        state.editingSavedCourseId = trip.id;
        state.currentItineraryDay = 1;
        state.currentView = 'planner';
        syncPlannerControlsFromCourse(state.activeCourse);
        saveToLocalStorage();
        updateView();
        renderItinerary(state.activeCourse);
        showToast(formatInlineText({ ko: '"{name}" 일정을 불러왔습니다.', en: 'Loaded itinerary "{name}".', fr: 'Itinéraire « {name} » chargé.', zh: '已加载行程“{name}”。', ja: '旅程「{name}」を読み込みました。', es: 'Itinerario « {name} » cargado.' }, { name: trip.name }));
      }
    });
    
    item.querySelector('.saved-trip-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!confirm(getText('itinerary_delete_confirm'))) return;
      
      state.savedCourses = state.savedCourses.filter(t => t.id !== trip.id);
      if (String(state.editingSavedCourseId || '') === String(trip.id)) {
        state.editingSavedCourseId = null;
      }
      saveToLocalStorage();
      renderSavedCoursesList();
      showToast(getText('action_deleted'));
    });
    
    container.appendChild(item);
  });
}

async function copyShareLink() {
  const course = state.activeCourse;
  if (!course) {
    showToast(getText('itinerary_none_to_share'));
    return;
  }
  
  try {
    normalizeCourseMetadata(course, true);
    const coursePreferences = getCoursePreferences(course, true);
    const durationDays = getCourseDurationDays(course);
    // Create a compact version of the course to keep URL short
    const compact = {
      lang: state.lang,
      cityId: course.cityId,
      cityName: course.cityName,
      preferences: coursePreferences,
      durationDays: durationDays,
      lodging: course.lodging || null,
      days: course.days.map(d => ({
        day: d.day,
        items: d.items.map(it => {
          const item = {
            name_ko: it.name_ko, name_en: it.name_en,
            desc_ko: it.desc_ko, desc_en: it.desc_en,
            timeSlot: it.timeSlot, duration: it.duration
          };
          if (it.isTransit) item.isTransit = true;
          if (it.isLodging) { item.isLodging = true; if (it.isStart) item.isStart = true; if (it.isEnd) item.isEnd = true; }
          if (it.isRest) item.isRest = true;
          if (it.isFlexibleBreak) item.isFlexibleBreak = true;
          if (it.isDessertBreak) item.isDessertBreak = true;
          if (it.x !== undefined) item.x = it.x;
          if (it.y !== undefined) item.y = it.y;
          if (it.cityId) item.cityId = it.cityId;
          if (it.hideDuration) item.hideDuration = true;
          if (Number.isFinite(it.lockedStartMin)) item.lockedStartMin = it.lockedStartMin;
          return item;
        })
      }))
    };
    
    const encodedPayload = await encodeSharePayloadForUrl(compact);
    const shareUrl = buildCompactShareUrl('planner', encodedPayload);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(getText('share_link_copied'));
      }).catch(err => {
        console.error(err);
        fallbackCopyText(shareUrl);
      });
    } else {
      fallbackCopyText(shareUrl);
    }
  } catch (e) {
    console.error("Failed to generate share link:", e);
    showToast(getText('share_link_failed'));
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (ok) {
      showToast(getText('share_link_copied'));
    } else {
      prompt(getText('share_link_prompt'), text);
    }
  } catch(e) {
    if (document.body.contains(textArea)) document.body.removeChild(textArea);
    prompt(getText('share_link_prompt'), text);
  }
}

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function buildPdfFromJpegs(images, pageWidthPt = 595.28, pageHeightPt = 841.89) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [];
  let offset = 0;

  const add = (chunk) => {
    const bytes = typeof chunk === 'string' ? encoder.encode(chunk) : chunk;
    chunks.push(bytes);
    offset += bytes.length;
  };
  const beginObj = (num) => {
    offsets[num] = offset;
    add(`${num} 0 obj\n`);
  };
  const endObj = () => add('\nendobj\n');

  add('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  beginObj(1);
  add('<< /Type /Catalog /Pages 2 0 R >>');
  endObj();

  const pageObjects = images.map((_, idx) => 3 + idx * 3);
  beginObj(2);
  add(`<< /Type /Pages /Kids [${pageObjects.map(n => `${n} 0 R`).join(' ')}] /Count ${images.length} >>`);
  endObj();

  images.forEach((image, idx) => {
    const pageObj = 3 + idx * 3;
    const contentsObj = pageObj + 1;
    const imageObj = pageObj + 2;
    const imageName = `Im${idx + 1}`;
    const draw = `q\n${pageWidthPt} 0 0 ${pageHeightPt} 0 0 cm\n/${imageName} Do\nQ`;
    const drawBytes = encoder.encode(draw);

    beginObj(pageObj);
    add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidthPt} ${pageHeightPt}] /Resources << /XObject << /${imageName} ${imageObj} 0 R >> >> /Contents ${contentsObj} 0 R >>`);
    endObj();

    beginObj(contentsObj);
    add(`<< /Length ${drawBytes.length} >>\nstream\n`);
    add(drawBytes);
    add('\nendstream');
    endObj();

    beginObj(imageObj);
    add(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`);
    add(image.bytes);
    add('\nendstream');
    endObj();
  });

  const xrefOffset = offset;
  const maxObj = 2 + images.length * 3;
  add(`xref\n0 ${maxObj + 1}\n`);
  add('0000000000 65535 f \n');
  for (let i = 1; i <= maxObj; i++) {
    add(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }
  add(`trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return new Blob(chunks, { type: 'application/pdf' });
}

const EXPORT_LABELS = {
  ko: {
    noItinerary: '\uB2E4\uC6B4\uB85C\uB4DC\uD560 \uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
    title: '\uC5EC\uD589 \uC77C\uC815\uD45C',
    destination: '\uBAA9\uC801\uC9C0',
    city: '\uB3C4\uC2DC',
    duration: '\uC5EC\uD589\uAE30\uAC04',
    dayUnit: '\uC77C',
    lodging: '\uC219\uC18C/\uC2DC\uC791 \uC9C0\uC810',
    travelStyle: '\uB098\uC758 \uC5EC\uD589 \uCDE8\uD5A5',
    travelSpeed: '\uC5EC\uD589 \uC18D\uB3C4',
    day: '\uC77C\uCC28',
    generatedBy: '\uC0DD\uC131 \uBC29\uC2DD',
    transit: '\uC774\uB3D9',
    fee: '\uC785\uC7A5\uB8CC',
    reservation: '\uC608\uC57D',
    closing: '\uC88B\uC740 \uC5EC\uD589 \uB418\uC138\uC694.',
    textDownloadStarted: '\uD14D\uC2A4\uD2B8 \uD30C\uC77C \uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uC2DC\uC791\uB418\uC5C8\uC2B5\uB2C8\uB2E4.'
  },
  en: {
    noItinerary: 'No itinerary to download.',
    title: 'Travel Itinerary',
    destination: 'Destination',
    city: 'City',
    duration: 'Duration',
    dayUnit: 'day',
    lodging: 'Lodging / Start Point',
    travelStyle: 'Travel Style',
    travelSpeed: 'Travel Speed',
    day: 'Day',
    generatedBy: 'Generated By',
    transit: 'Transit',
    fee: 'Fee',
    reservation: 'Reservation',
    closing: 'Have a great trip.',
    textDownloadStarted: 'Text file download started.'
  },
  fr: {
    noItinerary: 'Aucun itinéraire à télécharger.',
    title: 'Itinéraire de voyage',
    destination: 'Destination',
    city: 'Ville',
    duration: 'Durée',
    dayUnit: 'jour',
    lodging: 'Hébergement / point de départ',
    travelStyle: 'Style de voyage',
    travelSpeed: 'Rythme de voyage',
    day: 'Jour',
    generatedBy: 'Généré par',
    transit: 'Trajet',
    fee: 'Entrée',
    reservation: 'Réservation',
    closing: 'Bon voyage.',
    textDownloadStarted: 'Le téléchargement du fichier texte a commencé.'
  },
  zh: {
    noItinerary: '没有可下载的行程。',
    title: '旅行行程表',
    destination: '目的地',
    city: '城市',
    duration: '旅行天数',
    dayUnit: '天',
    lodging: '住宿 / 出发地点',
    travelStyle: '旅行偏好',
    travelSpeed: '旅行节奏',
    day: '第',
    generatedBy: '生成方式',
    transit: '移动',
    fee: '门票',
    reservation: '预约',
    closing: '祝旅途愉快。',
    textDownloadStarted: '文本文件开始下载。'
  },
  ja: {
    noItinerary: 'ダウンロードできる日程がありません。',
    title: '旅行日程表',
    destination: '目的地',
    city: '都市',
    duration: '旅行期間',
    dayUnit: '日',
    lodging: '宿泊先 / 開始地点',
    travelStyle: '旅の好み',
    travelSpeed: '旅行ペース',
    day: '日目',
    generatedBy: '生成方法',
    transit: '移動',
    fee: '入場料',
    reservation: '予約',
    closing: 'よい旅を。',
    textDownloadStarted: 'テキストファイルのダウンロードを開始しました。'
  },
  es: {
    noItinerary: 'No hay itinerario para descargar.',
    title: 'Itinerario de viaje',
    destination: 'Destino',
    city: 'Ciudad',
    duration: 'Duración',
    dayUnit: 'día',
    lodging: 'Alojamiento / punto de inicio',
    travelStyle: 'Estilo de viaje',
    travelSpeed: 'Ritmo de viaje',
    day: 'Día',
    generatedBy: 'Generado por',
    transit: 'Traslado',
    fee: 'Entrada',
    reservation: 'Reserva',
    closing: 'Buen viaje.',
    textDownloadStarted: 'La descarga del archivo de texto ha comenzado.'
  }
};

function normalizeExportLanguage(langOrIsKo = state.lang) {
  if (typeof langOrIsKo === 'boolean') return langOrIsKo ? 'ko' : 'en';
  return normalizeLanguageCode(langOrIsKo || state.lang);
}

function getExportLabel(key, langOrIsKo = state.lang) {
  const lang = normalizeExportLanguage(langOrIsKo);
  const table = EXPORT_LABELS[lang] || EXPORT_LABELS.en;
  return table[key] || EXPORT_LABELS.en[key] || key;
}

function formatExportDurationDays(days, langOrIsKo = state.lang) {
  const lang = normalizeExportLanguage(langOrIsKo);
  const value = Number(days) || 1;
  if (lang === 'ko') return `${value}${getExportLabel('dayUnit', lang)}`;
  if (lang === 'zh') return `${value}${getExportLabel('dayUnit', lang)}`;
  if (lang === 'ja') return `${value}${getExportLabel('dayUnit', lang)}`;
  if (lang === 'fr') return `${value} ${value === 1 ? 'jour' : 'jours'}`;
  if (lang === 'es') return `${value} ${value === 1 ? 'día' : 'días'}`;
  return `${value} ${value === 1 ? 'day' : 'days'}`;
}

const DETAIL_VALUE_TRANSLATIONS = {
  FREE: { fr: 'Gratuit', zh: '免费', ja: '無料', es: 'Gratis' },
  'Walk-in': { fr: 'Sans réservation', zh: '无需预约', ja: '予約不要', es: 'Sin reserva' },
  Recommended: { fr: 'Recommandée', zh: '建议预约', ja: '予約推奨', es: 'Recomendada' },
  Required: { fr: 'Obligatoire', zh: '必须预约', ja: '予約必須', es: 'Obligatoria' },
  Optional: { fr: 'Facultative', zh: '可选', ja: '任意', es: 'Opcional' },
  'Pay for food/drinks': { fr: 'Consommation payante', zh: '餐饮自费', ja: '飲食代別', es: 'Pago por comida/bebidas' },
  'Free or variable': { fr: 'Gratuit ou variable', zh: '免费或浮动', ja: '無料または変動', es: 'Gratis o variable' }
};

function localizeDetailValue(koValue, enValue, lang = state.lang) {
  const codeLang = normalizeLanguageCode(lang);
  if (codeLang === 'ko') return cleanUiText(koValue);
  const cleanEn = cleanUiText(enValue || koValue);
  if (codeLang === 'en') return cleanEn;
  const approxMatch = cleanEn.match(/^Approx\s+(.+)$/i);
  if (approxMatch) {
    const prefix = { fr: 'Environ', zh: '约', ja: '約', es: 'Aprox.' }[codeLang] || 'Approx';
    return `${prefix} ${approxMatch[1]}`;
  }
  const exact = DETAIL_VALUE_TRANSLATIONS[cleanEn];
  if (exact && exact[codeLang]) return exact[codeLang];
  return localizePlaceName(cleanEn, codeLang);
}

function cleanExportText(value) {
  return repairCommonMojibakeLiterals(repairMojibakeText(String(value || '')))
    .replace(/\u00C2\u00B7/g, '\u00B7')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripExportLanguageScaffold(value) {
  return cleanExportText(value)
    .replace(/^\[(KOR|ENG)\]\s*/i, '')
    .replace(/^Korean detail:\s*/i, '')
    .replace(/^Translation missing\.?\s*(Description:)?\s*/i, '')
    .trim();
}

function hasHangulText(value) {
  return /[\uAC00-\uD7A3]/.test(String(value || ''));
}

function hasLatinText(value) {
  return /[A-Za-z]/.test(String(value || ''));
}

function getLocalizedExportField(item, base, langOrIsKo = state.lang, options = {}) {
  if (!item) return '';
  const lang = normalizeExportLanguage(langOrIsKo);
  if (lang !== 'ko' && lang !== 'en') {
    return stripExportLanguageScaffold(getLocalizedDataField(item, base, lang, options));
  }
  const primaryKey = `${base}_${lang}`;
  const secondaryKey = `${base}_${lang === 'ko' ? 'en' : 'ko'}`;
  let primary = stripExportLanguageScaffold(item[primaryKey]);
  const secondary = stripExportLanguageScaffold(item[secondaryKey]);

  if (lang === 'ko') {
    if (!hasHangulText(primary) && hasHangulText(secondary)) primary = secondary;
    if (options.description && !hasHangulText(primary) && hasLatinText(primary)) return '';
    return primary;
  }

  if (hasHangulText(primary) && secondary && !hasHangulText(secondary)) primary = secondary;
  if (options.description && hasHangulText(primary)) return '';
  return primary;
}

function getLocalizedExportName(item, langOrIsKo = state.lang) {
  return getLocalizedExportField(item, 'name', langOrIsKo) || cleanExportText(item && (item.name || item.name_en || item.name_ko));
}

function getLocalizedExportDescription(item, langOrIsKo = state.lang) {
  return getLocalizedExportField(item, 'desc', langOrIsKo, { description: true });
}

function exportItineraryToPdf(inputCourse = null) {
  const course = inputCourse && Array.isArray(inputCourse.days) ? inputCourse : state.activeCourse;
  if (!course) {
    showToast(getExportLabel('noItinerary'));
    return;
  }

  const exportLang = normalizeExportLanguage(state.lang);
  const isKo = exportLang === 'ko';
  const cleanText = cleanExportText;
  const exportCityName = course.cityId && course.cityId !== 'multi_route'
    ? getCityDisplayName(course.cityId)
    : cleanText(course.cityName);
  const displayDurationDays = getCourseDurationDays(course);
  const preferences = typeof getCoursePreferences === 'function' ? getCoursePreferences(course, true) : (course.preferences || []);
  const preferenceLabels = preferences.map(pref => {
    const key = 'planner_pref_' + pref;
    const translated = getText(key);
    return translated && translated !== key ? translated : pref;
  }).join(', ');

  const pageWidth = 794;
  const pageHeight = 1123;
  const margin = 56;
  const pages = [];
  let canvas;
  let ctx;
  let y;
  let pageNo = 0;

  const setupPage = () => {
    canvas = document.createElement('canvas');
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageWidth, pageHeight);
    ctx.textBaseline = 'top';
    pageNo += 1;
    y = margin;
    if (pageNo > 1) {
      ctx.fillStyle = '#64748b';
      ctx.font = '16px "Malgun Gothic", "Segoe UI", Arial, sans-serif';
      ctx.fillText(`TripTogether - ${cleanText(exportCityName)}`, margin, 28);
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(margin, 54);
      ctx.lineTo(pageWidth - margin, 54);
      ctx.stroke();
      y = 78;
    }
  };

  const finishPage = () => {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px "Malgun Gothic", "Segoe UI", Arial, sans-serif';
    ctx.fillText(`TripTogether - ${pageNo}`, margin, pageHeight - 32);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    pages.push({
      bytes: base64ToUint8Array(dataUrl.split(',')[1]),
      width: pageWidth,
      height: pageHeight
    });
  };

  const ensureSpace = (needed) => {
    if (y + needed <= pageHeight - margin) return;
    finishPage();
    setupPage();
  };

  const wrapText = (text, font, maxWidth) => {
    ctx.font = font;
    const source = cleanText(text);
    if (!source) return [];
    const tokens = /[\uAC00-\uD7A3\u3040-\u30FF\u4E00-\u9FFF]/.test(source)
      ? Array.from(source)
      : source.split(/(\s+)/);
    const lines = [];
    let line = '';
    tokens.forEach(token => {
      const trial = line + token;
      if (ctx.measureText(trial).width <= maxWidth || !line) {
        line = trial;
      } else {
        lines.push(line.trim());
        line = token.trimStart ? token.trimStart() : token;
      }
    });
    if (line.trim()) lines.push(line.trim());
    return lines;
  };

  const addText = (text, options = {}) => {
    const size = options.size || 15;
    const weight = options.weight || 400;
    const color = options.color || '#334155';
    const indent = options.indent || 0;
    const maxWidth = (options.maxWidth || (pageWidth - margin * 2)) - indent;
    const font = `${weight} ${size}px "Malgun Gothic", "Segoe UI", Arial, sans-serif`;
    const lines = wrapText(text, font, maxWidth);
    const lineHeight = Math.ceil(size * 1.42);
    ensureSpace(Math.max(lineHeight, lines.length * lineHeight) + 8);
    ctx.font = font;
    ctx.fillStyle = color;
    lines.forEach(line => {
      ctx.fillText(line, margin + indent, y);
      y += lineHeight;
    });
    y += options.after == null ? 7 : options.after;
  };

  const addDivider = () => {
    ensureSpace(24);
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(margin, y + 6);
    ctx.lineTo(pageWidth - margin, y + 6);
    ctx.stroke();
    y += 24;
  };

  setupPage();
  addText('TripTogether', { size: 18, weight: 700, color: '#2563eb', after: 6 });
  addText(getExportLabel('title', exportLang), { size: 34, weight: 800, color: '#0f172a', after: 14 });
  addText(`${getExportLabel('destination', exportLang)}: ${cleanText(exportCityName)}`, { size: 16, weight: 700, color: '#111827' });
  addText(`${getExportLabel('duration', exportLang)}: ${formatExportDurationDays(displayDurationDays, exportLang)}`);
  if (course.lodging) {
    addText(`${getExportLabel('lodging', exportLang)}: ${cleanText(getLodgingDisplayName(course.lodging) || course.lodging.name)}`);
  }
  if (preferenceLabels) addText(`${getExportLabel('travelStyle', exportLang)}: ${cleanText(preferenceLabels)}`);
  if (course.travelPace) addText(`${getExportLabel('travelSpeed', exportLang)}: ${cleanText(getProfileChoiceLabel('pace', course.travelPace))}`);
  addDivider();

  course.days.forEach(dayPlan => {
    addText(formatDayLabel(dayPlan.day, exportLang), { size: 23, weight: 800, color: '#0f172a', after: 12 });
    (dayPlan.items || []).forEach(item => {
      const name = getLocalizedExportName(item, exportLang);
      const desc = getLocalizedExportDescription(item, exportLang);
      if (!name) return;
      const displayTime = cleanText(getDisplayTimeSlot(item));
      const prefix = displayTime ? `${displayTime}  ` : '';
      const titleColor = item.isTransit ? '#64748b' : (item.isLodging ? '#047857' : '#1f2937');
      addText(`${prefix}${name}`, { size: item.isTransit ? 13 : 15, weight: item.isTransit ? 500 : 700, color: titleColor, indent: item.isTransit ? 18 : 0, after: 3 });
      if (desc) {
        addText(desc, { size: 12, color: '#64748b', indent: 18, after: 8 });
      }
    });
    addDivider();
  });

  finishPage();
  const pdfBlob = buildPdfFromJpegs(pages);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  const safeName = cleanText(exportCityName).replace(/[\\/:*?"<>|]+/g, '_') || 'itinerary';
  const fileDayUnit = cleanText(getExportLabel('dayUnit', exportLang));
  link.href = url;
  link.download = `TripTogether_${safeName}_${displayDurationDays}${fileDayUnit}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(getText('pdf_download_started'));
}

function exportItineraryToMarkdown() {
  const course = state.activeCourse;
  if (!course) {
    showToast(getExportLabel('noItinerary'));
    return;
  }
  const exportLang = normalizeExportLanguage(state.lang);
  const isKo = exportLang === 'ko';

  const divider = '='.repeat(68);
  const thinDivider = '-'.repeat(68);
  const cleanText = cleanExportText;
  const exportCityName = course.cityId && course.cityId !== 'multi_route'
    ? getCityDisplayName(course.cityId)
    : cleanText(course.cityName);
  const coursePreferences = typeof getCoursePreferences === 'function' ? getCoursePreferences(course, true) : (course.preferences || []);
  const preferenceLabels = coursePreferences.map(pref => {
    if (typeof getText === 'function') {
      const translated = getText('pref_' + pref);
      if (translated && translated !== 'pref_' + pref) return translated;
    }
    return pref;
  }).join(', ');

  let txt = `${divider}\n`;
  txt += `TripTogether ${getExportLabel('title', exportLang)}\n`;
  txt += `${divider}\n`;
  txt += `${getExportLabel('destination', exportLang)} : ${cleanText(exportCityName)}\n`;
  txt += `${getExportLabel('duration', exportLang)} : ${formatExportDurationDays(course.days.length, exportLang)}\n`;
  if (course.lodging) {
    txt += `${getExportLabel('lodging', exportLang)} : ${cleanText(getLodgingDisplayName(course.lodging) || course.lodging.name || course.lodging.name_ko || '')}\n`;
  }
  if (preferenceLabels) {
    txt += `${getExportLabel('travelStyle', exportLang)} : ${cleanText(preferenceLabels)}\n`;
  }
  txt += `${getExportLabel('generatedBy', exportLang)} : TripTogether\n`;
  
  course.days.forEach(dayPlan => {
    txt += `\n${thinDivider}\n`;
    txt += `${formatDayLabel(dayPlan.day, exportLang)}\n`;
    txt += `${thinDivider}\n`;
    
    dayPlan.items.forEach(item => {
      const name = getLocalizedExportName(item, exportLang);
      const desc = getLocalizedExportDescription(item, exportLang);
      if (!name) return;
      const displayTime = cleanText(getDisplayTimeSlot(item));
      
      if (item.isTransit) {
        txt += `\n  ${getExportLabel('transit', exportLang)}\n`;
        txt += `  ${displayTime ? displayTime + '  ' : ''}${name}`;
        if (item.duration) {
          const minuteUnit = getInlineText({ ko: '분', en: 'min', fr: 'min', zh: '分钟', ja: '分', es: 'min' }, exportLang);
          txt += ` (${item.duration}${minuteUnit})`;
        }
        txt += `\n`;
      } else if (item.isLodging) {
        txt += `\n  ${displayTime ? displayTime + '  ' : ''}${name}\n`;
      } else {
        txt += `\n  ${displayTime ? displayTime + '  ' : ''}${name}\n`;
        if (desc) txt += `  ${desc}\n`;
        if (!item.isRest) {
          const details = getAttractionDetails(item, course.cityId);
          txt += `  Google Maps : ${details.mapsLink}\n`;
        }
      }
    });
  });

  txt += `\n${divider}\n`;
  txt += `${getExportLabel('closing', exportLang)}\n`;
  
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `TripTogether_${cleanText(exportCityName)}_${formatExportDurationDays(course.days.length, exportLang)}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(getExportLabel('textDownloadStarted', exportLang));
}

function showAddPlaceModal(allAttractions, dayPlan, cityId) {
  const addPlaceText = {
    title: getInlineText({ ko: '일정에 장소 추가', en: 'Add Place to Itinerary', fr: 'Ajouter un lieu à l’itinéraire', zh: '添加行程地点', ja: '日程に場所を追加', es: 'Agregar lugar al itinerario' }),
    name: getInlineText({ ko: '추가할 장소 이름', en: 'Place Name', fr: 'Nom du lieu', zh: '地点名称', ja: '場所名', es: 'Nombre del lugar' }),
    namePlaceholder: getInlineText({ ko: '예: 성수동 카페거리', en: 'e.g. Seongsu Cafe Street', fr: 'ex. rue des cafés de Seongsu', zh: '例如：圣水洞咖啡街', ja: '例：聖水洞カフェ通り', es: 'p. ej., calle de cafés de Seongsu' }),
    duration: getInlineText({ ko: '소요 시간 (분)', en: 'Duration (minutes)', fr: 'Durée (minutes)', zh: '停留时间（分钟）', ja: '所要時間（分）', es: 'Duración (minutos)' }),
    time: getInlineText({ ko: '원하는 시작 시간 (선택)', en: 'Desired Start Time (Optional)', fr: 'Heure de début souhaitée (facultatif)', zh: '期望开始时间（可选）', ja: '希望開始時間（任意）', es: 'Hora de inicio deseada (opcional)' }),
    cancel: getText('modal_cancel') || getText('Cancel'),
    add: getInlineText({ ko: '추가하기', en: 'Add', fr: 'Ajouter', zh: '添加', ja: '追加', es: 'Agregar' }),
    empty: getInlineText({ ko: '추가할 장소 이름을 입력해주세요.', en: 'Please enter a place name.', fr: 'Saisissez le nom du lieu.', zh: '请输入地点名称。', ja: '場所名を入力してください。', es: 'Introduce el nombre del lugar.' }),
    added: getInlineText({ ko: '장소가 추가되었습니다.', en: 'Place added.', fr: 'Lieu ajouté.', zh: '地点已添加。', ja: '場所を追加しました。', es: 'Lugar agregado.' })
  };
  let modal = document.getElementById('timelineAddPlaceModal');
  if (!modal) {
    const modalHTML = `
      <div class="modal-overlay" id="timelineAddPlaceModal" style="z-index: 2000;">
        <div class="modal-content add-place-modal-content" style="max-width: 450px;">
          <div class="modal-header">
            <h3 id="addPlaceModalTitle" style="font-size:18px; font-weight:700;">${addPlaceText.title}</h3>
            <button class="modal-close" onclick="document.getElementById('timelineAddPlaceModal').classList.remove('active')">&times;</button>
          </div>
          <div class="form-group">
            <label class="form-label" id="addPlaceNameLabel" for="addPlaceNameField">${addPlaceText.name}</label>
            <input type="text" class="form-control" id="addPlaceNameField" placeholder="${addPlaceText.namePlaceholder}" autocomplete="off">
          </div>
          <div class="form-group">
            <label class="form-label" id="addPlaceDurationLabel">${addPlaceText.duration}</label>
            <input type="number" class="form-control" id="addPlaceDurationField" value="90" min="10" max="600" step="10">
          </div>
          <div class="form-group">
            <label class="form-label" id="addPlaceTimeLabel">${addPlaceText.time}</label>
            <input type="time" class="form-control" id="addPlaceTimeField">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" id="addPlaceCancelBtn" onclick="document.getElementById('timelineAddPlaceModal').classList.remove('active')">${addPlaceText.cancel}</button>
            <button type="button" class="btn-primary" id="addPlaceModalSubmitBtn">${addPlaceText.add}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('timelineAddPlaceModal');
  }

  const setText = (id, text) => {
    const elem = document.getElementById(id);
    if (elem) elem.textContent = text;
  };
  setText('addPlaceModalTitle', addPlaceText.title);
  setText('addPlaceNameLabel', addPlaceText.name);
  setText('addPlaceDurationLabel', addPlaceText.duration);
  setText('addPlaceTimeLabel', addPlaceText.time);
  setText('addPlaceCancelBtn', addPlaceText.cancel);
  setText('addPlaceModalSubmitBtn', addPlaceText.add);

  const nameInput = document.getElementById('addPlaceNameField');
  nameInput.value = '';
  nameInput.placeholder = addPlaceText.namePlaceholder;

  // Calculate default time after the last attraction
  const attractionsOnly = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
  let defaultTime = "09:30";
  if (attractionsOnly.length > 0) {
    const lastAtt = attractionsOnly[attractionsOnly.length - 1];
    const endMin = getTimeSlotEndMinutes(lastAtt);
    if (endMin !== null) {
      defaultTime = formatMinutesGlobal(endMin);
    }
  }
  document.getElementById('addPlaceTimeField').value = defaultTime;

  modal.classList.add('active');
  setTimeout(() => nameInput.focus(), 0);

  const submitBtn = document.getElementById('addPlaceModalSubmitBtn');
  const newSubmitBtn = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

  nameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      newSubmitBtn.click();
    }
  };

  newSubmitBtn.addEventListener('click', () => {
    const typedName = nameInput.value.trim();
    if (!typedName) {
      showToast(addPlaceText.empty);
      nameInput.focus();
      return;
    }

    const duration = parseInt(document.getElementById('addPlaceDurationField').value, 10) || 90;
    let timeVal = document.getElementById('addPlaceTimeField').value;
    if (!timeVal) timeVal = defaultTime;
    
    const [hours, minutes] = timeVal.split(':').map(Number);
    const newStartMin = hours * 60 + minutes;
    const defaultCluster = (typeof CITY_CLUSTERS !== 'undefined' && CITY_CLUSTERS[cityId] && CITY_CLUSTERS[cityId][0]) || null;

    const newItem = {
      name_ko: typedName,
      name_en: typedName,
      desc_ko: '',
      desc_en: '',
      duration: duration,
      cityId: cityId,
      x: defaultCluster ? defaultCluster.x : undefined,
      y: defaultCluster ? defaultCluster.y : undefined,
      open: 0,
      close: 1440,
      isCustom: true,
      lockedStartMin: newStartMin
    };

    const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);

    function parseStartTime(item) {
      const start = getTimeSlotStartMinutes(item.timeSlot);
      return start === null ? 570 : start;
    }

    function parseEndTime(item) {
      const end = getTimeSlotEndMinutes(item);
      return end === null ? parseStartTime(item) : end;
    }

    // Find the first existing item whose time range overlaps or comes after the requested time.
    // The newly typed place has priority, so overlapping original items move after it.
    let insertIdx = attractions.length;
    for (let i = 0; i < attractions.length; i++) {
      if (parseEndTime(attractions[i]) > newStartMin) {
        insertIdx = i;
        break;
      }
    }

    attractions.splice(insertIdx, 0, newItem);

    // Reassemble itinerary day plan items
    const startLodging = dayPlan.items.find(it => it.isLodging && it.isStart);
    const endLodging = dayPlan.items.find(it => it.isLodging && it.isEnd);
    
    let finalItems = [];
    if (startLodging) finalItems.push(startLodging);
    finalItems.push(...attractions);
    if (endLodging) finalItems.push(endLodging);

    dayPlan.items = finalItems;
    recalculateDayPlanTimes(dayPlan, cityId);

    saveToLocalStorage();
    renderItinerary(state.activeCourse);
    
    modal.classList.remove('active');
    showToast(addPlaceText.added);
  });
}

function handleCustomRegen(requestText) {
  if (!state.activeCourse) {
    showToast(getText('planner_generate_first'));
    return;
  }
  
  const rawRequest = String(requestText || '').trim();
  const text = rawRequest.toLowerCase();
  
  state.regenConfig = {
    relaxed: false,
    packed: false,
    excludeShopping: false,
    forceCulture: false,
    travelPace: state.travelPace || 'moderate',
    customRequestText: rawRequest
  };
  
  if (text === 'relaxed' || text.includes('여유') || text.includes('천천히') || text.includes('relaxed') || text.includes('slow') || text.includes('leisure')) {
    state.regenConfig.relaxed = true;
    state.regenConfig.travelPace = 'relaxed';
    state.travelPace = 'relaxed';
  } else if (text === 'packed' || text.includes('타이트') || text.includes('빡빡') || text.includes('바쁘게') || text.includes('packed') || text.includes('busy') || text.includes('tight')) {
    state.regenConfig.packed = true;
    state.regenConfig.travelPace = 'packed';
    state.travelPace = 'packed';
  }
  
  if (text === 'no-shopping' || text.includes('쇼핑 제외') || text.includes('쇼핑 빼') || text.includes('no shopping') || text.includes('exclude shopping') || text.includes('without shopping')) {
    state.regenConfig.excludeShopping = true;
  }
  
  if (text === 'more-culture' || text.includes('관광 위주') || text.includes('관광위주') || text.includes('역사') || text.includes('문화') || text.includes('culture') || text.includes('history') || text.includes('sightseeing')) {
    state.regenConfig.forceCulture = true;
  }
  
  const loader = document.getElementById('itineraryLoader');
  const content = document.getElementById('itineraryResultContent');
  if (loader && content) {
    loader.style.display = 'flex';
    content.style.display = 'none';
    const loaderText = document.querySelector('#itineraryLoader h4');
    if (loaderText) {
      loaderText.textContent = getInlineText({
        ko: 'AI가 선택한 모드를 반영해 코스를 재구성하고 있습니다...',
        en: 'AI is rebuilding the route with the selected mode...',
        fr: 'L’IA reconstruit l’itinéraire selon le mode sélectionné…',
        zh: 'AI正在根据所选模式重新规划路线…',
        ja: 'AIが選択したモードを反映してコースを再構成しています…',
        es: 'La IA está reconstruyendo la ruta con el modo seleccionado…'
      });
    }
  }
  
  setTimeout(() => {
    try {
      const cityId = state.activeCourse.cityId;
      const days = state.activeCourse.days.length;
      const selectedPrefs = [];
      document.querySelectorAll('.pref-chip.selected').forEach(chip => {
        selectedPrefs.push(chip.getAttribute('data-pref'));
      });
      if (selectedPrefs.length === 0) selectedPrefs.push('healing');
      
      let filteredPrefs = [...selectedPrefs];
      if (state.regenConfig.excludeShopping) {
        filteredPrefs = filteredPrefs.filter(p => p !== 'shopping');
        if (filteredPrefs.length === 0) filteredPrefs.push('healing');
      }
      if (state.regenConfig.forceCulture && !filteredPrefs.includes('culture')) {
        filteredPrefs.push('culture');
      }
      
      const matchedCity = CITIES.find(city => city.id === cityId);
      const cityName = matchedCity ? getLocalizedCityField(matchedCity, 'name') : cityId;
      const searchName = matchedCity
        ? getLocalizedCityField(matchedCity, 'name')
        : cityName;
      
      fetchWikiAttractions(searchName, cityId, state.lang)
        .then(wikiPools => {
          const itinerary = buildCourseStructure(cityId, days, filteredPrefs, cityName, wikiPools);
          itinerary.cityName = cityName;
          itinerary.preferences = [...filteredPrefs];
          itinerary.durationDays = days;
          itinerary.travelPace = state.regenConfig.travelPace || state.travelPace || 'moderate';
          
          let isSameCityLodging = false;
          if (state.activeCourse.lodging) {
            const l = state.activeCourse.lodging;
            const clusters = CITY_CLUSTERS[cityId] || [];
            if (clusters.length > 0) {
              const baseCluster = clusters[0];
              const dist = getHaversineDistance(baseCluster.y, baseCluster.x, l.y, l.x);
              if (dist < 150) isSameCityLodging = true;
            }
          }
          if (isSameCityLodging) {
            itinerary.lodging = state.activeCourse.lodging;
            itinerary.days.forEach(dayPlan => {
              const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
              const lodging = itinerary.lodging;
              
              const lodgingStart = {
                name_ko: `🏨 숙소 출발 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Depart from Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '숙소에서 오늘의 일정을 시작합니다.',
                desc_en: 'Start today\'s itinerary from your accommodation.',
                x: lodging.x,
                y: lodging.y,
                cityId: cityId,
                isLodging: true,
                isStart: true,
                duration: 0,
                hideDuration: true
              };
              
              const lodgingEnd = {
                name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '숙소로 복귀합니다.',
                desc_en: 'Return to your accommodation.',
                x: lodging.x,
                y: lodging.y,
                cityId: cityId,
                isLodging: true,
                isEnd: true,
                duration: 0,
                hideDuration: true
              };
              
              dayPlan.items = [lodgingStart, ...attractions, lodgingEnd];
              recalculateDayPlanTimes(dayPlan, cityId);
            });
          }
          
          state.activeCourse = itinerary;
          state.currentItineraryDay = 1;
          saveToLocalStorage();
          renderItinerary(itinerary);
          
          if (loader && content) {
            loader.style.display = 'none';
            content.style.display = 'block';
          }
          showToast(getText('itinerary_adjusted'));
        })
        .catch(err => {
          console.error(err);
          const itinerary = buildCourseStructure(cityId, days, filteredPrefs, cityName, null);
          itinerary.cityName = cityName;
          itinerary.preferences = [...filteredPrefs];
          itinerary.durationDays = days;
          itinerary.travelPace = state.regenConfig.travelPace || state.travelPace || 'moderate';
          
          let isSameCityLodging = false;
          if (state.activeCourse.lodging) {
            const l = state.activeCourse.lodging;
            const clusters = CITY_CLUSTERS[cityId] || [];
            if (clusters.length > 0) {
              const baseCluster = clusters[0];
              const dist = getHaversineDistance(baseCluster.y, baseCluster.x, l.y, l.x);
              if (dist < 150) isSameCityLodging = true;
            }
          }
          if (isSameCityLodging) {
            itinerary.lodging = state.activeCourse.lodging;
            itinerary.days.forEach(dayPlan => {
              const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
              const lodging = itinerary.lodging;
              
              const lodgingStart = {
                name_ko: `🏨 숙소 출발 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Depart from Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '숙소에서 오늘의 일정을 시작합니다.',
                desc_en: 'Start today\'s itinerary from your accommodation.',
                x: lodging.x,
                y: lodging.y,
                cityId: cityId,
                isLodging: true,
                isStart: true,
                duration: 0,
                hideDuration: true
              };
              
              const lodgingEnd = {
                name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '숙소로 복귀합니다.',
                desc_en: 'Return to your accommodation.',
                x: lodging.x,
                y: lodging.y,
                cityId: cityId,
                isLodging: true,
                isEnd: true,
                duration: 0,
                hideDuration: true
              };
              
              dayPlan.items = [lodgingStart, ...attractions, lodgingEnd];
              recalculateDayPlanTimes(dayPlan, cityId);
            });
          }

          state.activeCourse = itinerary;
          state.currentItineraryDay = 1;
          saveToLocalStorage();
          renderItinerary(itinerary);
          
          if (loader && content) {
            loader.style.display = 'none';
            content.style.display = 'block';
          }
        });
    } catch (e) {
      console.error(e);
      if (loader && content) {
        loader.style.display = 'none';
        content.style.display = 'block';
      }
    }
  }, 1200);
}

function updateLodgingSelector(cityId, options = {}) {
  const select = document.getElementById('plannerLodging');
  if (!select) return;
  
  const preserveSelection = options.preserveSelection !== false;
  const prevVal = preserveSelection ? select.value : '';
  select.innerHTML = '';
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.setAttribute('data-i18n', 'planner_lodging_none');
  defaultOpt.textContent = getText('planner_lodging_none');
  select.appendChild(defaultOpt);

  const clusters = CITY_CLUSTERS[cityId];
  if (clusters && clusters.length > 0) {
    clusters.forEach(cluster => {
      const opt = document.createElement('option');
      const name_ko = cluster.name_ko || cluster.name;
      const name_en = cluster.name_en || cluster.name;
      opt.value = JSON.stringify({ 
        name_ko: name_ko, 
        name_en: name_en, 
        name: name_en, 
        x: cluster.x, 
        y: cluster.y 
      });
      opt.textContent = getLocalizedLodgingLabel(name_ko, name_en, state.lang);
      select.appendChild(opt);
    });
  } else if (typeof EXTRA_CITIES_META !== 'undefined' && EXTRA_CITIES_META[cityId]) {
    const meta = EXTRA_CITIES_META[cityId];
    const core = meta.core;
    if (core) {
      const extraClusters = [
        {
          name_ko: "시티 센터 (문화 지구)",
          name_en: "City Center (Culture District)",
          x: core.culture ? core.culture.x : (core.gourmet ? core.gourmet.x : 0),
          y: core.culture ? core.culture.y : (core.gourmet ? core.gourmet.y : 0)
        },
        {
          name_ko: "자연 & 힐링 구역",
          name_en: "Nature & Healing Area",
          x: core.healing ? core.healing.x : 0,
          y: core.healing ? core.healing.y : 0
        },
        {
          name_ko: "쇼핑 & 미식 거리",
          name_en: "Shopping & Gourmet District",
          x: core.shopping ? core.shopping.x : (core.gourmet ? core.gourmet.x : 0),
          y: core.shopping ? core.shopping.y : (core.gourmet ? core.gourmet.y : 0)
        }
      ];
      extraClusters.forEach(cluster => {
        const opt = document.createElement('option');
        opt.value = JSON.stringify({ 
          name_ko: cluster.name_ko, 
          name_en: cluster.name_en, 
          name: cluster.name_en, 
          x: cluster.x, 
          y: cluster.y 
        });
        opt.textContent = getLocalizedLodgingLabel(cluster.name_ko, cluster.name_en, state.lang);
        select.appendChild(opt);
      });
    }
  }

  // Restore selection if matching coordinates found
  if (prevVal) {
    try {
      const prevObj = JSON.parse(prevVal);
      for (let i = 0; i < select.options.length; i++) {
        const optVal = select.options[i].value;
        if (optVal) {
          const optObj = JSON.parse(optVal);
          if (optObj.x === prevObj.x && optObj.y === prevObj.y) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error restoring selected lodging value:", e);
    }
  }
  if (typeof repairVisibleMojibake === 'function') repairVisibleMojibake(select);
}

function bindTimelineActions() {
  const list = document.getElementById('itineraryTimelineList');
  if (!list) return;

  const dayIndex = state.currentItineraryDay - 1;
  const dayPlan = state.activeCourse.days[dayIndex];
  const cityId = state.activeCourse.cityId;

  // Delete button clicks
  list.querySelectorAll('.timeline-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const attIdx = parseInt(e.currentTarget.getAttribute('data-attraction-index'), 10);
      
      const attractions = dayPlan.items.filter(it => !it.isTransit);
      // Min 1 normal attraction excluding lodging
      const normalAttractions = attractions.filter(it => !it.isLodging);
      if (normalAttractions.length <= 1) {
        showToast(getText('itinerary_min_attraction'));
        return;
      }

      const itemToDelete = attractions[attIdx];
      const attractionsFiltered = attractions.filter((_, idx) => idx !== attIdx);
      
      dayPlan.items = attractionsFiltered;
      recalculateDayPlanTimes(dayPlan, cityId);
      
      saveToLocalStorage();
      renderItinerary(state.activeCourse);
      showToast(getText('itinerary_place_deleted'));
    });
  });

  // Duration input change
  list.querySelectorAll('.timeline-duration-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const attIdx = parseInt(e.currentTarget.getAttribute('data-attraction-index'), 10);
      const newDur = Math.max(10, Math.min(600, parseInt(e.currentTarget.value, 10) || 90));
      
      const attractions = dayPlan.items.filter(it => !it.isTransit);
      attractions[attIdx].duration = newDur;
      
      dayPlan.items = attractions;
      recalculateDayPlanTimes(dayPlan, cityId);
      
      saveToLocalStorage();
      renderItinerary(state.activeCourse);
    });
  });

  // "Add New Place" button click
  const addBtn = document.getElementById('timelineAddPlaceBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const cityPool = ATTRACTIONS[cityId] || ATTRACTIONS['seoul'];
      const allAttractions = [];
      for (const cat in cityPool) {
        if (Array.isArray(cityPool[cat])) {
          cityPool[cat].forEach(it => {
            if (!allAttractions.some(a => a.name_en === it.name_en)) {
              allAttractions.push(it);
            }
          });
        }
      }

      showAddPlaceModal(allAttractions, dayPlan, cityId);
    });
  }

  // Drag start
  let draggedItemIndex = null;
  list.querySelectorAll('.timeline-item[draggable="true"]').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      draggedItemIndex = parseInt(el.getAttribute('data-attraction-index'), 10);
      el.classList.add('dragging');
    });

    el.addEventListener('dragover', (e) => {
      e.preventDefault();
      const item = e.target.closest('.timeline-item[draggable="true"]');
      if (!item || item.classList.contains('dragging')) return;
      
      list.querySelectorAll('.timeline-item').forEach(x => x.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });

    el.addEventListener('dragleave', (e) => {
      const item = e.target.closest('.timeline-item');
      if (item) item.classList.remove('drag-over');
    });

    el.addEventListener('dragend', () => {
      list.querySelectorAll('.timeline-item').forEach(x => {
        x.classList.remove('dragging');
        x.classList.remove('drag-over');
      });
    });

    el.addEventListener('drop', (e) => {
      e.preventDefault();
      const item = e.target.closest('.timeline-item[draggable="true"]');
      if (!item) return;

      const targetIdx = parseInt(item.getAttribute('data-attraction-index'), 10);
      if (draggedItemIndex === null || draggedItemIndex === targetIdx) return;

      const attractions = dayPlan.items.filter(it => !it.isTransit);
      
      const movedItem = attractions.splice(draggedItemIndex, 1)[0];
      attractions.splice(targetIdx, 0, movedItem);

      dayPlan.items = attractions;
      recalculateDayPlanTimes(dayPlan, cityId);

      saveToLocalStorage();
      renderItinerary(state.activeCourse);
      
      draggedItemIndex = null;
      showToast(getText('itinerary_reordered'));
    });
  });
}

// Start application
function startApplication() {
  try {
    init();
  } catch (err) {
    console.error("TripTogether failed to initialize:", err);
    installCoreNavigationFallback();
  }
}

window.addEventListener('DOMContentLoaded', startApplication);
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#share=') || hash.startsWith('#itinerary=')) {
    // A pasted share URL can be a same-document navigation on mobile. Reload
    // once so the normal startup restoration path receives the new payload.
    window.location.reload();
  }
});

