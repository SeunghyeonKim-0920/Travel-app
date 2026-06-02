// --- State Management ---
const state = {
  lang: 'ko', // 'ko' or 'en'
  currentView: 'dashboard',
  activeProfile: {
    name: '홍길동',
    gender: '남성',
    mbti: 'ESFP',
    verified: false
  },
  rooms: [],
  joinedRoomId: null,
  editingRoomId: null,
  chatLogs: {},
  activeCourse: null, // Stores currently generated course
  currentItineraryDay: 1, // Currently selected day tab in planner
  savedCourses: [],
  regenConfig: null
};

// --- Remote Sync Endpoint (MockBolt) ---
const REMOTE_GET_URL = 'https://mockbolt.com/b/8e036b0d-2bf4-439f-a36f-b22bc0e3c426';
const REMOTE_PUT_URL = 'https://mockbolt.com/api/v1/manage/80010013-d710-4a69-9514-3be2eb36dc74';

// --- Message Helper ---
function createMessageObject({ sender, mbti, text, system = false }) {
  return {
    id: Math.random().toString(36).substring(2, 11) + '-' + Date.now(),
    timestamp: Date.now(),
    system,
    sender: sender || '',
    mbti: mbti || '',
    text: text
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
  try {
    const urlWithCacheBuster = REMOTE_GET_URL + '?t=' + Date.now();
    const res = await fetch(urlWithCacheBuster, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const data = await res.json();
    if (data && Array.isArray(data.rooms)) {
      state.rooms = data.rooms;
      state.chatLogs = mergeChatLogs(state.chatLogs, data.chatLogs || {});
      
      // Auto-kick / room-deleted logic
      if (state.joinedRoomId !== null) {
        const joinedRoom = state.rooms.find(r => r.id === state.joinedRoomId);
        if (!joinedRoom) {
          // Room was deleted
          state.joinedRoomId = null;
          if (state.currentView === 'chat') {
            state.currentView = 'companions';
            updateView();
            showToast(state.lang === 'ko' ? '방장이 동행 방을 삭제하였습니다.' : 'The room creator has deleted this companion room.');
          }
        } else if (joinedRoom.joinedUsers && !joinedRoom.joinedUsers.includes(state.activeProfile.name)) {
          // User was kicked from the room
          state.joinedRoomId = null;
          if (state.currentView === 'chat') {
            state.currentView = 'companions';
            updateView();
            showToast(state.lang === 'ko' ? '방장에 의해 퇴장되었습니다.' : 'You have been removed from the room by the creator.');
          }
        }
      }

      renderCompanionRooms();
      if (state.currentView === 'chat' && state.joinedRoomId !== null) {
        renderChatRoom();
      }
      saveToLocalStorage();
    }
  } catch (err) {
    console.error("Failed to pull from remote:", err);
  }
}

async function pushToRemote() {
  try {
    const payload = {
      rooms: state.rooms,
      chatLogs: state.chatLogs
    };
    const res = await fetch(REMOTE_PUT_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        json_payload: payload
      })
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    saveToLocalStorage();
  } catch (err) {
    console.error("Failed to push to remote:", err);
  }
}

// --- Initialization ---
function init() {
  loadFromLocalStorage();
  setupUIStrings();
  setupEventListeners();
  renderPopularDestinations();
  renderCitySelectors();
  renderCompanionRooms();
  
  // Parse shared query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const shareData = urlParams.get('share');
  if (shareData) {
    try {
      const decodedJson = decodeURIComponent(escape(atob(shareData)));
      const sharedCourse = JSON.parse(decodedJson);
      if (sharedCourse && sharedCourse.days && sharedCourse.cityName) {
        state.activeCourse = sharedCourse;
        state.currentItineraryDay = 1;
        state.currentView = 'planner';
        
        // Remove share query parameter from URL without page reload
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        
        showToast(state.lang === 'ko' ? '공유받은 일정을 로드했습니다.' : 'Shared itinerary loaded.');
      }
    } catch (e) {
      console.error("Failed to decode shared itinerary:", e);
    }
  }

  // Populate lodging selector for the initial city selection
  const selectPlanner = document.getElementById('plannerDest');
  if (selectPlanner) {
    updateLodgingSelector(selectPlanner.value);
  }
  
  // Render saved courses
  renderSavedCoursesList();

  updateView();
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
        const welcomeMsg = state.lang === 'ko' 
          ? `[안내] '${room.creator.name}'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.`
          : `[System] Room created by '${room.creator.name}'. Please be respectful in chat.`;
        
        state.chatLogs[room.id] = [
          createMessageObject({ text: welcomeMsg, system: true })
        ];
      });
      pushToRemote();
    }
  });

  // Periodically pull remote updates every 4 seconds
  setInterval(pullFromRemote, 4000);
}

// --- Local Storage Integration ---
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

function loadFromLocalStorage() {
  const localLang = localStorage.getItem('wander_lang');
  if (localLang) state.lang = localLang;

  const localProfile = localStorage.getItem('wander_profile');
  if (localProfile) {
    state.activeProfile = JSON.parse(localProfile);
  } else {
    // Generate a deterministic nickname like 여행자_4821 based on device parameters
    const deviceId = getDeviceDeterministicId();
    const randNum = 1000 + (deviceId % 9000);
    state.activeProfile.name = `여행자_${randNum}`;
    saveToLocalStorage();
  }

  const localRooms = localStorage.getItem('wander_rooms');
  if (localRooms) {
    state.rooms = JSON.parse(localRooms);
  } else {
    state.rooms = [...MOCK_COMPANION_ROOMS];
  }

  const localChatLogs = localStorage.getItem('wander_chat_logs');
  if (localChatLogs) {
    state.chatLogs = JSON.parse(localChatLogs);
  } else {
    // Populate default chat logs
    state.chatLogs = {};
    state.rooms.forEach(room => {
      const welcomeMsg = state.lang === 'ko' 
        ? `[안내] '${room.creator.name}'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.`
        : `[System] Room created by '${room.creator.name}'. Please be respectful in chat.`;
      
      state.chatLogs[room.id] = [
        createMessageObject({ text: welcomeMsg, system: true })
      ];
    });
  }

  const localJoinedRoom = localStorage.getItem('wander_joined_room_id');
  if (localJoinedRoom) {
    state.joinedRoomId = parseInt(localJoinedRoom, 10) || null;
  } else {
    state.joinedRoomId = null;
  }

  const localView = localStorage.getItem('wander_current_view');
  if (localView) {
    state.currentView = localView;
  } else {
    state.currentView = 'dashboard';
  }

  const localActiveCourse = localStorage.getItem('wander_active_course');
  if (localActiveCourse) {
    state.activeCourse = JSON.parse(localActiveCourse);
  } else {
    state.activeCourse = null;
  }

  const localCurrentItineraryDay = localStorage.getItem('wander_current_itinerary_day');
  if (localCurrentItineraryDay) {
    state.currentItineraryDay = parseInt(localCurrentItineraryDay, 10) || 1;
  } else {
    state.currentItineraryDay = 1;
  }

  const localSavedCourses = localStorage.getItem('wander_saved_courses');
  if (localSavedCourses) {
    state.savedCourses = JSON.parse(localSavedCourses);
  } else {
    state.savedCourses = [];
  }
  
  // Sync profile values to input fields
  document.getElementById('profileName').value = state.activeProfile.name;
  document.getElementById('profileGender').value = state.activeProfile.gender;
  document.getElementById('profileMBTI').value = state.activeProfile.mbti;
  
  // Sync profile badge
  updateProfileVerificationUI();
}

function saveToLocalStorage() {
  localStorage.setItem('wander_lang', state.lang);
  localStorage.setItem('wander_profile', JSON.stringify(state.activeProfile));
  localStorage.setItem('wander_rooms', JSON.stringify(state.rooms));
  localStorage.setItem('wander_chat_logs', JSON.stringify(state.chatLogs));
  localStorage.setItem('wander_joined_room_id', state.joinedRoomId !== null ? String(state.joinedRoomId) : '');
  localStorage.setItem('wander_current_view', state.currentView);
  localStorage.setItem('wander_active_course', state.activeCourse ? JSON.stringify(state.activeCourse) : '');
  localStorage.setItem('wander_current_itinerary_day', String(state.currentItineraryDay || 1));
  localStorage.setItem('wander_saved_courses', JSON.stringify(state.savedCourses || []));
}

// --- Translation Engine ---
function setupUIStrings() {
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) {
      elem.textContent = TRANSLATIONS[state.lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) {
      elem.setAttribute('placeholder', TRANSLATIONS[state.lang][key]);
    }
  });

  // Toggle button styling
  if (state.lang === 'ko') {
    document.getElementById('lang-ko').classList.add('active');
    document.getElementById('lang-en').classList.remove('active');
  } else {
    document.getElementById('lang-ko').classList.remove('active');
    document.getElementById('lang-en').classList.add('active');
  }

  // Update header widget
  document.getElementById('headerProfileName').textContent = state.activeProfile.name;
  
  // Re-render components with translated fields
  renderPopularDestinations();
  renderCitySelectors();
  updateDurationSelectorOptions();
  const selectPlanner = document.getElementById('plannerDest');
  if (selectPlanner) {
    updateLodgingSelector(selectPlanner.value);
  }
  renderCompanionRooms();
  if (state.activeCourse) {
    renderItinerary(state.activeCourse);
  }
}

function updateDurationSelectorOptions() {
  const select = document.getElementById('plannerDuration');
  if (!select) return;
  const currentVal = select.value || "2";
  select.innerHTML = '';
  for (let i = 1; i <= 7; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    if (state.lang === 'ko') {
      opt.textContent = `${i}일 (${i} days)`;
    } else {
      opt.textContent = i === 1 ? `1 Day` : `${i} Days`;
    }
    if (String(i) === String(currentVal)) {
      opt.selected = true;
    }
    select.appendChild(opt);
  }
}

function syncProfileFromInputs(propagateToRemote = false) {
  const nameInput = document.getElementById('profileName');
  if (!nameInput) return;
  const newNameInput = nameInput.value.trim();
  if (!newNameInput) return;

  const oldName = state.activeProfile.name;

  state.activeProfile.name = newNameInput;
  state.activeProfile.gender = document.getElementById('profileGender').value;
  state.activeProfile.mbti = document.getElementById('profileMBTI').value;

  saveToLocalStorage();
  
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
          room.creator.age = state.activeProfile.age;
          room.creator.gender = state.activeProfile.gender;
          room.creator.nationality = state.activeProfile.nationality;
          room.creator.mbti = state.activeProfile.mbti;
        }
      });
    } else {
      state.rooms.forEach(room => {
        if (room.creator && room.creator.name === newNameInput) {
          if (
            room.creator.age !== state.activeProfile.age ||
            room.creator.gender !== state.activeProfile.gender ||
            room.creator.nationality !== state.activeProfile.nationality ||
            room.creator.mbti !== state.activeProfile.mbti
          ) {
            room.creator.age = state.activeProfile.age;
            room.creator.gender = state.activeProfile.gender;
            room.creator.nationality = state.activeProfile.nationality;
            room.creator.mbti = state.activeProfile.mbti;
            changed = true;
          }
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
  // Lang Toggle Click
  document.getElementById('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'ko' ? 'en' : 'ko';
    saveToLocalStorage();
    setupUIStrings();
  });

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
      }
      
      // Switch view to planner
      document.querySelector('[data-target=planner]').click();
    }
  });

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
    showToast(TRANSLATIONS[state.lang].profile_saved_toast);
  });

  // Auto-save listeners
  document.getElementById('profileName').addEventListener('input', () => {
    syncProfileFromInputs(false);
  });
  document.getElementById('profileName').addEventListener('change', () => {
    syncProfileFromInputs(true);
  });

  ['profileGender', 'profileMBTI'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('change', () => {
        syncProfileFromInputs(true);
      });
    }
  });

  // Identity Verification click
  document.getElementById('verifyIdentityBtn').addEventListener('click', () => {
    state.activeProfile.verified = true;
    saveToLocalStorage();
    updateProfileVerificationUI();

    // Propagate verification status to rooms created by the user
    let changed = false;
    state.rooms.forEach(room => {
      if (room.creator && room.creator.name === state.activeProfile.name) {
        room.creator.verified = true;
        changed = true;
      }
    });
    if (changed) {
      pushToRemote().then(() => {
        renderCompanionRooms();
        if (state.currentView === 'chat' && state.joinedRoomId !== null) {
          renderChatRoom();
        }
      });
    }

    showToast(state.lang === 'ko' ? '실명인증이 성공적으로 완료되었습니다!' : 'Real-name verification completed!');
  });

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
    document.getElementById('createRoomModalTitle').textContent = state.lang === 'ko' ? '새 동행 모집 생성' : 'Create Companion Room';
    document.getElementById('createRoomModalSubmitBtn').textContent = state.lang === 'ko' ? '동행 방 생성하기' : 'Create Room';
    // Sync min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('modalRoomDate').value = today;
    document.getElementById('createRoomModal').classList.add('active');
  });

  document.getElementById('closeCreateRoomModalBtn').addEventListener('click', closeCreateModal);
  document.getElementById('cancelCreateRoomModalBtn').addEventListener('click', closeCreateModal);

  // Form creation for new companion room
  document.getElementById('createRoomForm').addEventListener('submit', createCompanionRoom);

  // Leave Chat Room click
  document.getElementById('leaveChatRoomBtn').addEventListener('click', async () => {
    await pullFromRemote();
    const room = state.rooms.find(r => r.id === state.joinedRoomId);
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
      const leaveNotice = state.lang === 'ko'
        ? `[안내] '${state.activeProfile.name}'님이 퇴장하셨습니다.`
        : `[System] '${state.activeProfile.name}' has left the room.`;
      
      if (!state.chatLogs[state.joinedRoomId]) {
        state.chatLogs[state.joinedRoomId] = [];
      }
      state.chatLogs[state.joinedRoomId].push(createMessageObject({ text: leaveNotice, system: true }));
    }
    
    state.joinedRoomId = null;
    await pushToRemote();
    state.currentView = 'companions';
    updateView();
    showToast(state.lang === 'ko' ? '동행방을 퇴장했습니다.' : 'Left the companion room.');
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
      updateLodgingSelector(e.target.value);
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
    downloadBtn.addEventListener('click', exportItineraryToMarkdown);
  }

  // Custom AI Regeneration Submit Button
  const customRegenSubmit = document.getElementById('customRegenSubmitBtn');
  if (customRegenSubmit) {
    customRegenSubmit.addEventListener('click', () => {
      const input = document.getElementById('customRegenInput');
      const text = input ? input.value.trim() : '';
      if (text) {
        handleCustomRegen(text);
        if (input) input.value = '';
      }
    });
  }

  // Custom AI Regeneration Tag Buttons
  document.querySelectorAll('.regen-tag-btn').forEach(tagBtn => {
    tagBtn.addEventListener('click', (e) => {
      const tagText = e.currentTarget.textContent;
      handleCustomRegen(tagText);
    });
  });

  // Chat Share Course Button
  const chatShareBtn = document.getElementById('chatShareCourseBtn');
  if (chatShareBtn) {
    chatShareBtn.addEventListener('click', () => {
      if (!state.activeCourse) {
        showToast(state.lang === 'ko' ? '공유할 일정이 없습니다. 코스를 먼저 생성해주세요.' : 'No itinerary to share. Please generate a course first.');
        return;
      }
      if (!state.joinedRoomId) return;
      
      const course = state.activeCourse;
      const text = state.lang === 'ko'
        ? `[일정 공유] ${state.activeProfile.name}님이 짠 ${course.cityName} ${course.days.length}일 코스`
        : `[Shared Course] ${state.activeProfile.name}'s ${course.days.length}-day course for ${course.cityName}`;
        
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
      
      showToast(state.lang === 'ko' ? '채팅방에 일정이 공유되었습니다.' : 'Itinerary shared in chat.');
    });
  }
}

function closeCreateModal() {
  document.getElementById('createRoomModal').classList.remove('active');
  document.getElementById('createRoomForm').reset();
  state.editingRoomId = null;
  // Restore default CREATE mode labels
  document.getElementById('createRoomModalTitle').textContent = state.lang === 'ko' ? '새 동행 모집 생성' : 'Create Companion Room';
  document.getElementById('createRoomModalSubmitBtn').textContent = state.lang === 'ko' ? '동행 방 생성하기' : 'Create Room';
}

function openEditRoomModal(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  state.editingRoomId = roomId;

  // Pre-fill fields with room's current data
  document.getElementById('modalRoomTitle').value = state.lang === 'ko' ? (room.title_ko || '') : (room.title_en || '');
  document.getElementById('modalRoomDest').value = room.cityId || '';
  document.getElementById('modalRoomCat').value = room.category || 'city';
  document.getElementById('modalRoomPlace').value = room.place_ko || room.place_en || '';
  document.getElementById('modalRoomDate').value = room.date || '';
  document.getElementById('modalRoomTime').value = room.time || '14:00';
  document.getElementById('modalRoomMax').value = (room.maxPeople >= 9999) ? '0' : String(room.maxPeople || 4);
  document.getElementById('modalRoomGender').value = room.targetGender || '성별 무관';
  document.getElementById('modalRoomDesc').value = state.lang === 'ko' ? (room.desc_ko || '') : (room.desc_en || '');

  // Switch modal to EDIT mode labels
  document.getElementById('createRoomModalTitle').textContent = state.lang === 'ko' ? '동행 방 수정하기' : 'Edit Companion Room';
  document.getElementById('createRoomModalSubmitBtn').textContent = state.lang === 'ko' ? '수정 완료' : 'Save Changes';

  document.getElementById('createRoomModal').classList.add('active');
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

  saveToLocalStorage();
}

// --- Dynamic Rendering Components ---
function renderPopularDestinations() {
  const grid = document.getElementById('popularDestinationsGrid');
  grid.innerHTML = '';

  CITIES.forEach(city => {
    const name = state.lang === 'ko' ? city.name_ko : city.name_en;
    const country = state.lang === 'ko' ? city.country_ko : city.country_en;
    const desc = state.lang === 'ko' ? city.desc_ko : city.desc_en;

    const card = document.createElement('div');
    card.className = `dest-card ${city.id}`;
    card.setAttribute('data-city-id', city.id);
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
  
  const currentPlannerVal = selectPlanner ? selectPlanner.value : '';
  const currentModalVal = selectModal ? selectModal.value : '';

  if (selectPlanner) {
    selectPlanner.innerHTML = '';
    CITIES.forEach(city => {
      const name = state.lang === 'ko' ? city.name_ko : city.name_en;
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = name;
      selectPlanner.appendChild(option);
    });
  }

  if (selectModal) {
    selectModal.innerHTML = '';
    CITIES.forEach(city => {
      const name = state.lang === 'ko' ? city.name_ko : city.name_en;
      const optionHTML = `<option value="${city.id}">${name}</option>`;
      selectModal.insertAdjacentHTML('beforeend', optionHTML);
    });
  }

  // Restore values
  if (selectPlanner && currentPlannerVal) {
    selectPlanner.value = currentPlannerVal;
  }
  if (selectModal && currentModalVal) {
    selectModal.value = currentModalVal;
  }
}

function updateProfileVerificationUI() {
  const stamp = document.getElementById('profileVerifiedStamp');
  const btn = document.getElementById('verifyIdentityBtn');
  
  if (state.activeProfile.verified) {
    stamp.classList.remove('not-verified');
    stamp.textContent = TRANSLATIONS[state.lang].profile_verified;
    btn.style.display = 'none';
  } else {
    stamp.classList.add('not-verified');
    stamp.textContent = TRANSLATIONS[state.lang].profile_unverified;
    btn.style.display = 'flex';
  }
}

function fetchWikiAttractions(cityName, cityId, lang) {
  if (cityId !== 'custom' && ATTRACTIONS[cityId]) {
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
        return data.query.categorymembers.map(m => m.title);
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
    const searchTerms = wikiLang === 'ko'
      ? [`${officialTitle} 관광`, `${officialTitle} 맛집`, `${officialTitle} 카페`]
      : [`${officialTitle} tourism attractions`, `${officialTitle} restaurant`, `${officialTitle} cafe`];
      
    const fetches = searchTerms.map(term => {
      return wikiQuery({
        action: 'query', list: 'search', srsearch: term, srlimit: '15'
      }).then(data => {
        if (!data.query || !data.query.search) return [];
        return data.query.search.map(item => item.title);
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
          const coords = page.coordinates && page.coordinates.length > 0 ? page.coordinates[0] : null;
          results.push({
            title: page.title,
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
      '고속도로', '철도', '노선', '공항', '터미널'
    ];

    const seenTitles = new Set();

    articles.forEach(article => {
      const { title, extract, lat, lon } = article;
      const titleLower = title.toLowerCase();

      // Exclude non-attraction articles
      if (excludeKeywords.some(kw => titleLower.includes(kw))) return;
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
        const h = hashStr(title);
        const offsetLon = ((h % 40) - 20) / 1000.0;
        const offsetLat = (((h >> 3) % 40) - 20) / 1000.0;
        x = centerLon + offsetLon;
        y = centerLat + offsetLat;
      } else {
        x = 126.9780;
        y = 37.5665;
      }

      const cat = classifyArticle(title, extract);
      const cleanTitle = title.replace(/\s*\(.*?\)\s*/g, '');
      const desc = cleanDescription(extract);

      categories[cat].push({
        name_ko: cleanTitle,
        name_en: cleanTitle,
        desc_ko: desc || `${cleanTitle} 방문 일정`,
        desc_en: desc || `Visit to ${cleanTitle}`,
        duration: 120,
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
    showToast(state.lang === 'ko' ? '목적지 도시를 선택해주세요.' : 'Please select a destination city.');
    return;
  }

  // Clear previous regeneration config
  state.regenConfig = null;

  // Find matched city
  const matchedCity = CITIES.find(city => city.id === cityId);
  const cityName = matchedCity ? (state.lang === 'ko' ? matchedCity.name_ko : matchedCity.name_en) : cityId;
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

  // Use the name corresponding to UI language for searching
  const searchName = matchedCity 
    ? (state.lang === 'ko' ? matchedCity.name_ko : matchedCity.name_en) 
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
              isLodging: true,
              isStart: true,
              duration: 0,
              hideDuration: true
            };
            
            const lodgingEnd = {
              name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
              name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
              desc_ko: '오늘의 모든 일정을 마치고 숙소로 복귀하여 휴식을 취합니다.',
              desc_en: 'Finish today\'s activities and return to your accommodation to rest.',
              x: lodging.x,
              y: lodging.y,
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
              isLodging: true,
              isStart: true,
              duration: 0,
              hideDuration: true
            };
            
            const lodgingEnd = {
              name_ko: `🏨 숙소 복귀 (${lodging.name})`,
              name_en: `🏨 Return to Lodging (${lodging.name})`,
              desc_ko: '오늘의 모든 일정을 마치고 숙소로 복귀하여 휴식을 취합니다.',
              desc_en: 'Finish today\'s activities and return to your accommodation to rest.',
              x: lodging.x,
              y: lodging.y,
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

const UNIVERSAL_REAL_DINING = {
  lunch: [
    { ko: "하드록 카페", en: "Hard Rock Cafe", dk: "글로벌 록 테마의 수제 버거와 그릴 요리 전문점", de: "Famous rock 'n' roll themed restaurant serving classic burgers and ribs" },
    { ko: "쉐이크쉑", en: "Shake Shack", dk: "뉴욕에서 시작된 프리미엄 밀크쉐이크와 수제 버거 맛집", de: "Critically acclaimed roadside burger stand known for its delicious shakes" },
    { ko: "딘타이펑", en: "Din Tai Fung", dk: "세계적으로 유명한 정통 대만식 샤오롱바오와 만두 전문점", de: "World-renowned Taiwanese restaurant famous for its signature xiao long bao" },
    { ko: "조스 피자", en: "Joe's Pizza", dk: "뉴욕 스타일의 바삭한 조각 피자 전문점", de: "Famous classic New York street slice pizza shop" },
    { ko: "와가마마", en: "Wagamama", dk: "아시아 스타일의 누들과 라멘 요리를 제공하는 글로벌 식당", de: "Popular British restaurant chain serving Asian-inspired noodle dishes" },
    { ko: "치폴레 멕시칸 그릴", en: "Chipotle Mexican Grill", dk: "신선한 재료로 주문 제작하는 멕시칸 부리토와 타코 전문점", de: "Fast-casual Mexican grill known for custom burritos and bowls" },
    { ko: "바피아노", en: "Vapiano", dk: "주문 즉시 조리하는 이탈리안 신선 파스타와 피자 식당", de: "Casual Italian restaurant chain serving freshly made pasta and pizza" },
    { ko: "프레타망제", en: "Pret A Manger", dk: "신선한 유기농 커피와 수제 샌드위치를 제공하는 델리", de: "Popular organic coffee and freshly handmade sandwich shop" },
    { ko: "라스 뒤 팔라펠", en: "L'As du Fallafel", dk: "파리 마레 지구에서 유명한 정통 중동식 팔라펠 맛집", de: "Legendary falafel spot serving authentic Middle Eastern wraps" },
    { ko: "요시노야", en: "Yoshinoya", dk: "백년 전통의 일본식 쇠고기 덮밥 규동 전문점", de: "Historic quick-service beef bowl restaurant chain" }
  ],
  dinner: [
    { ko: "노부 레스토랑", en: "Nobu Restaurant", dk: "세계적인 셰프 노부 마츠히사의 고급 퓨전 일식 다이닝", de: "World-famous upscale Japanese-Peruvian fusion restaurant by Chef Nobu Matsuhisa" },
    { ko: "하카산", en: "Hakkasan", dk: "세련된 인테리어와 현대적인 광둥식 요리를 제공하는 미쉐린 맛집", de: "Modern Cantonese fine dining in a sleek, Michelin-starred environment" },
    { ko: "고든 램지 바 & 그릴", en: "Gordon Ramsay Bar & Grill", dk: "스타 셰프 고든 램지의 정통 비프 웰링턴과 스테이크 다이닝", de: "Gordon Ramsay's signature Beef Wellington and premium charcoal grills" },
    { ko: "주마 레스토랑", en: "Zuma Restaurant", dk: "현대적이고 스타일리시한 일식 이자카야 스타일 파인다이닝", de: "Sophisticated twist on the traditional Japanese izakaya style of informal eating" },
    { ko: "부다칸", en: "Buddakan", dk: "웅장한 샹들리에와 현대식 아시안 퓨전 요리가 유명한 레스토랑", de: "Grand, atmospheric restaurant serving innovative modern Asian cuisine" },
    { ko: "울프강 스테이크하우스", en: "Wolfgang's Steakhouse", dk: "최상급 드라이에이징 포터하우스 스테이크 전문점", de: "Famous USDA Prime dry-aged porterhouse steaks in a classic setting" },
    { ko: "카마인스 이탈리안 레스토랑", en: "Carmine's Italian Restaurant", dk: "패밀리 스타일의 푸짐한 정통 이탈리안 파스타와 요리 식당", de: "Legendary family-style Italian restaurant serving massive portions" },
    { ko: "모튼스 더 스테이크하우스", en: "Morton's The Steakhouse", dk: "미국식 정통 프리미엄 스테이크와 랍스터 다이닝", de: "Upscale steakhouse chain famous for its prime aged beef and seafood" },
    { ko: "로리스 더 프라임 립", en: "Lawry's The Prime Rib", dk: "실버 카트에서 즉석 서빙하는 전통 프라임 립 전문점", de: "Classic dining room famous for cart-carved prime rib and spinning salad" },
    { ko: "하이드아웃 비스트로", en: "Hideout Bistro", dk: "아늑한 분위기의 로컬 와인 비스트로와 수제 요리 저녁", de: "Cozy local wine bistro serving handmade regional specialties" }
  ],
  coffee: [
    { ko: "스타벅스 리저브 로스터리", en: "Starbucks Reserve Roastery", dk: "대형 로스팅 시설과 스페셜티 음료를 제공하는 메가 커피숍", de: "Immersive coffee wonderland featuring freshly roasted small-batch beans" },
    { ko: "블루보틀 커피", en: "Blue Bottle Coffee", dk: "미니멀한 감성과 핸드드립 스페셜티 싱글 오리진 카페", de: "Specialty coffee roaster known for its minimalist cafe design and pour-overs" },
    { ko: "카페 그럼피", en: "Cafe Grumpy", dk: "뉴욕 브루클린에서 시작된 친근하고 전문적인 로컬 카페", de: "Independent specialty coffee roaster established in Brooklyn" },
    { ko: "조앤더주스", en: "Joe & The Juice", dk: "신선한 착즙 주스와 프리미엄 에스프레소를 제공하는 주스 바", de: "Trendy coffee and juice bar serving fresh juices, shakes, and flatbreads" },
    { ko: "바샤 커피", en: "Bacha Coffee", dk: "화려한 인테리어와 전 세계 다양한 싱글 오리진 드립 커피 명가", de: "Luxurious coffee boutique offering a collection of 100% Arabica coffees" },
    { ko: "% 아라비카 커피", en: "% Arabica", dk: "깔끔하고 세련된 인테리어의 글로벌 스페셜티 텐프로 커피", de: "Kyoto-born specialty coffee brand known for its iconic '%' logo" },
    { ko: "몬머스 커피", en: "Monmouth Coffee", dk: "런던에서 시작된 줄 서서 먹는 역사 깊은 핸드드립 로스터리", de: "London's pioneer in sourcing, roasting, and retailing specialty coffee" },
    { ko: "콘페이타리아 콜롬보", en: "Confeitaria Colombo", dk: "세계에서 가장 아름다운 역사적인 왕실 풍 티 하우스", de: "One of the world's most historic and beautiful Viennese-style tearooms" },
    { ko: "카페 드 플로르", en: "Cafe de Flore", dk: "파리 생제르맹의 역사적인 예술가와 지식인들의 카페", de: "Legendary historic coffee house famous for its intellectual heritage" },
    { ko: "안젤리나 파리", en: "Angelina Paris", dk: "진하고 걸쭉한 핫초콜릿과 몽블랑 디저트로 유명한 프랑스 찻집", de: "Famous Belle Epoque tearoom renowned for its decadent hot chocolate" }
  ]
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
  
  // If not found, check the universal pool only for cities with a curated local list.
  if (!selectedItem && cityData) {
    const universalPool = UNIVERSAL_REAL_DINING[mealType] || UNIVERSAL_REAL_DINING.lunch || [];
    for (let i = 0; i < universalPool.length; i++) {
      const item = universalPool[i];
      if (item && item.ko && (!visitedNames || !visitedNames.has(item.ko))) {
        selectedItem = item;
        break;
      }
    }
  }
  
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

function getAttractionCoords(item) {
  if (!item) return { x: 5.0, y: 5.0 };
  
  // If the item already has x/y set (e.g. from Wiki GPS projection), return directly
  if (typeof item.x === 'number' && typeof item.y === 'number') {
    return { x: item.x, y: item.y };
  }
  
  // Resolve cityId
  let cityId = item.cityId;
  if (!cityId) {
    for (const cid in ATTRACTIONS) {
      for (const cat in ATTRACTIONS[cid]) {
        if (ATTRACTIONS[cid][cat].some(att => att.name_en === item.name_en)) {
          cityId = cid;
          item.cityId = cid;
          break;
        }
      }
      if (cityId) break;
    }
  }
  
  if (!cityId) cityId = 'seoul'; // final fallback
  
  const clusters = CITY_CLUSTERS[cityId] || CITY_CLUSTERS['seoul'];
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
    y: Math.max(-90, Math.min(90, targetCluster.y + jitterY))
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

function getDistance(item1, item2) {
  const c1 = (item1 && item1.x !== undefined && item1.y !== undefined) ? item1 : getAttractionCoords(item1);
  const c2 = (item2 && item2.x !== undefined && item2.y !== undefined) ? item2 : getAttractionCoords(item2);
  return getHaversineDistance(c1.y, c1.x, c2.y, c2.x);
}

function calculateTransit(item1, item2) {
  if (!item1 || !item2) {
    return { distance: 0, duration: 0, type_ko: "도보", type_en: "Walk" };
  }
  
  const c1 = (item1.x !== undefined && item1.y !== undefined) ? item1 : getAttractionCoords(item1);
  const c2 = (item2.x !== undefined && item2.y !== undefined) ? item2 : getAttractionCoords(item2);
  
  const dist = getHaversineDistance(c1.y, c1.x, c2.y, c2.x);
  
  if (item1.name_ko === item2.name_ko || dist < 0.01) {
    return { distance: 0, duration: 0, type_ko: "도보", type_en: "Walk" };
  }
  
  let duration;
  let type_ko, type_en;
  
  if (dist < 1.0) {
    type_ko = "도보";
    type_en = "Walk";
    duration = Math.max(5, Math.round((dist * 13) / 5) * 5);
  } else if (dist < 8.0) {
    type_ko = "대중교통";
    type_en = "Public Transit";
    duration = Math.round((15 + dist * 3.5) / 5) * 5;
  } else {
    if (dist > 15.0) {
      type_ko = "택시";
      type_en = "Taxi";
      duration = Math.round((8 + dist * 1.5) / 5) * 5;
    } else {
      type_ko = "대중교통";
      type_en = "Public Transit";
      duration = Math.round((20 + dist * 3.0) / 5) * 5;
    }
  }
  
  return {
    distance: parseFloat(dist.toFixed(1)),
    duration: duration,
    type_ko: type_ko,
    type_en: type_en
  };
}


const getGenericAttractions = (cityName) => {
  const name = cityName || "선택한 도시";
  return {
    healing: [
      { name_ko: `${name} 대표 숲길 & 호수공원 산책`, isLandmark: true, name_en: `${name} Scenic Forest & Lake Park Walk`, duration: 120, desc_ko: "자연의 피톤치드를 마시며 걷는 쾌적하고 조용한 산책로 코스", desc_en: "A refreshing walk along peaceful lake shores and green forest paths." },
      { name_ko: `${name} 한적한 로컬 골목길 전망 좋은 티하우스`, name_en: `${name} Quiet Local Alleyway Tea House with View`, duration: 90, desc_ko: "숨겨진 골목길 다도 카페에서 즐기는 한 잔의 여유와 힐링", desc_en: "Sip warm tea or coffee at a hidden local café with a great view." },
      { name_ko: `${name} 자연 속 힐링 테마파크 정원`, name_en: `${name} Nature Healing Theme Park & Garden`, duration: 120, desc_ko: "정갈하게 정돈된 테마 수목원 정원에서 꽃과 식물 감상", desc_en: "Enjoy beautiful seasonal flowers and plants in a landscaped botanical park." },
      { name_ko: `${name} 탁 트인 야외 테라스 전망대 휴식`, name_en: `${name} Scenic Outdoor Terrace Observatory`, duration: 90, desc_ko: "전망대에서 즐기는 도시 전체의 조망과 시원한 바람", desc_en: "Take in the grand cityscape or landscape views from an open deck." },
      { name_ko: `${name} 강변/해안 산책로 & 자전거 하이킹`, name_en: `${name} Waterfront Promenade & Bicycle Riding`, duration: 150, desc_ko: "물바람을 맞으며 여유롭게 자전거를 타거나 보행로 산책", desc_en: "Stroll or cycle along the refreshing local waterfront promenade." }
    ],
    gourmet: [
      { name_ko: `${name} 대표 재래시장 & 야시장 미식 투어`, name_en: `${name} Famous Traditional & Night Market Food Tour`, duration: 100, desc_ko: "현지 특산품으로 만든 먹거리와 다채로운 길거리 음식 체험", desc_en: "Taste various street foods and local specialties unique to this region." },
      { name_ko: `${name} 소문난 브런치 & 수플레 팬케이크 맛집`, name_en: `${name} Famous Fluffy Soufflé Pancake Brunch Cafe`, duration: 90, desc_ko: "인스타 감성의 인테리어와 훌륭한 디저트가 가득한 맛집", desc_en: "Enjoy cozy atmosphere, sweet soufflés, and premium coffee drinks." },
      { name_ko: `${name} 스페셜티 로스터리 커피 & 에스프레소 바`, name_en: `${name} Specialty Roastery & Espresso Bar`, duration: 90, desc_ko: "원두 향이 가득한 트렌디한 로컬 카페에서 오후 리프레시", desc_en: "Experience high-quality espresso and signature desserts loved by locals." },
      { name_ko: `${name} 현지 평점 1위 로컬 별미 맛집 방문`, name_en: `${name} Top-rated Local Delicacy Restaurant`, duration: 90, desc_ko: "방문객 만족도가 매우 높은 이 도시 고유의 특선 메뉴 식사", desc_en: "Dine at a highly recommended eatery specializing in regional classics." },
      { name_ko: `${name} 시내 중심가 퓨전 패밀리 비스트로`, name_en: `${name} Downtown Fusion Family Bistro`, duration: 80, desc_ko: "남녀노소 좋아하는 다양한 맛을 선사하는 패밀리 다이닝", desc_en: "Enjoy a relaxed dining experience with creative fusion dishes." }
    ],
    culture: [
      { name_ko: `${name} 역사 유적지 & 문화 공간 투어`, isLandmark: true, name_en: `${name} Historic Heritage & Cultural Site Tour`, duration: 150, desc_ko: "도시의 깊은 역사와 전통 건축의 미를 느껴보는 시간", desc_en: "Discover the historical roots and architectural beauty of the region." },
      { name_ko: `${name} 대표 시립 미술관 현대 예술 전시`, name_en: `${name} City Museum of Modern Art Tour`, duration: 120, desc_ko: "감각적인 로컬 아티스트들과 글로벌 거장들의 예술 세계 감상", desc_en: "Observe paintings and sculptures by local and global creative artists." },
      { name_ko: `${name} 전통 공예 체험 및 핸드메이드 워크숍`, name_en: `${name} Traditional Handcraft DIY Workshop`, duration: 120, desc_ko: "전문 강사의 안내에 따라 하나뿐인 나만의 기념품 제작", desc_en: "Create your own unique souvenir to take home at a local workshop." },
      { name_ko: `${name} 랜드마크 웅장한 기념 광장 & 기념관`, name_en: `${name} Landmark Memorial Square & Exhibition`, duration: 90, desc_ko: "도시를 대표하는 건축물이나 기념 광장에서 사진 촬영", desc_en: "Take a walking tour around the grand symbolic center plaza of the city." },
      { name_ko: `${name} 문화 거리 로컬 소품숍 & 갤러리 투어`, name_en: `${name} Artsy Cultural Street & Local Boutique Hop`, duration: 90, desc_ko: "아티스트들의 감성이 담긴 아기자기한 소품 및 전시 관람", desc_en: "Explore independent galleries and cozy artisan accessory boutiques." }
    ],
    activity: [
      { name_ko: `${name} 짜릿한 아웃도어 레포츠 & 액티비티`, name_en: `${name} Thrilling Outdoor Sports & Activities`, duration: 150, desc_ko: "현지 자연경관을 온몸으로 느끼며 즐기는 이색 스포츠 체험", desc_en: "Savor outdoor excitement and sports amidst the scenic landscapes." },
      { name_ko: `${name} 전망대 산등성이 야간 하이킹`, name_en: `${name} Peak View Ridge Night Hiking`, duration: 150, desc_ko: "도시의 야경이 한눈에 내려다보이는 산책로 등반 코스", desc_en: "Trek up to a viewpoints to see the beautiful city skyline glowing at night." },
      { name_ko: `${name} 실내 가상현실 VR & 배틀 테마파크`, name_en: `${name} Indoor VR & Battle Game Theme Park`, duration: 120, desc_ko: "최신 기술로 무장한 시뮬레이터와 액티브 레이저 대결 게임", desc_en: "Enjoy high-tech virtual reality matches and shooting arenas." },
      { name_ko: `${name} 속도감을 즐기는 스릴 고카트 레이싱`, name_en: `${name} High-speed Go-Kart Circuit Ride`, duration: 90, desc_ko: "친구들과 함께 속도 경쟁을 하며 스트레스를 해소하는 시간", desc_en: "Compete on the winding circuit track with fast go-karts." },
      { name_ko: `${name} 도심 속 랜드마크 어드벤처 놀이공원`, name_en: `${name} Iconic Adventure Theme Park`, duration: 240, desc_ko: "다채로운 스릴 어트랙션과 포토존 가득한 테마파크 탐방", desc_en: "Spend half a day enjoying thrilling rides and photo spots." }
    ],
    shopping: [
      { name_ko: `${name} 최대 규모 플래그십 아울렛 쇼핑`, name_en: `${name} Premium Flagship Outlet Shopping`, duration: 180, desc_ko: "글로벌 패션 브랜드와 트렌디한 매장이 가득한 쇼핑몰", desc_en: "Explore boutique collections and famous retail brands all in one mall." },
      { name_ko: `${name} 힙스터 성지 디자이너 편집숍 거리`, name_en: `${name} Hipster Designer Brand & Concept Street`, duration: 120, desc_ko: "독창적인 디자인 소품과 감각적인 의류 브랜드 매장 투어", desc_en: "Discover trendy local boutique shops and select fashion houses." },
      { name_ko: `${name} 야식과 미용 로드숍이 가득한 쇼핑 스트리트`, name_en: `${name} Cosmetics & Street Snack Market Alley`, duration: 120, desc_ko: "풍성한 먹거리 길거리 간식과 뷰티 로드숍 탐방", desc_en: "Shop for beauty items while trying delicious bites of street food." },
      { name_ko: `${name} 역사 깊은 벼룩시장 & 빈티지 마켓`, name_en: `${name} Historic Flea & Vintage Market`, duration: 150, desc_ko: "세월의 흔적이 묻은 독특한 소품들과 빈티지 패션 탐색", desc_en: "Seek unique vintage accessories and rare antiques in a lively flea market." },
      { name_ko: `${name} 가로수가 가득한 ��색 거리 편집숍 팝업`, name_en: `${name} Tree-lined Fashion & Lifestyle Pop-up Avenue`, duration: 120, desc_ko: "아름다운 거리를 걸으며 라이프스타일 팝업스토어 관람", desc_en: "Walk along a picturesque avenue visiting dynamic popup events." }
    ]
  };
};

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

function buildCourseStructure(cityId, days, preferences, customCityName, wikiPools) {
  const dayPlans = [];
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
  }

  // Handle custom regeneration filters
  if (state.regenConfig) {
    if (state.regenConfig.excludeShopping) {
      cityPools.shopping = [];
    }
  }

  // Pre-resolve coordinates and cityId for all pool items
  for (const cat in cityPools) {
    if (Array.isArray(cityPools[cat])) {
      cityPools[cat].forEach(item => {
        item.cityId = cityId;
        const coords = getAttractionCoords(item);
        item.x = coords.x;
        item.y = coords.y;
      });
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
    const keywords = ['야경', 'night view', '야간', 'night', '바 ', '펍', 'pub', 'bar', '유람선', '크루즈', 'cruise', '관람차', '전망대', 'observatory', '타워', 'tower'];
    return keywords.some(kw => text.includes(kw));
  };

  const isFoodOrDrinkPlace = (item) => {
    const name = ((item.name_ko || '') + ' ' + (item.name_en || '')).toLowerCase();
    const keywords = [
      '식당', '레스토랑', '맛집', '음식점', '카페', '찻집', '베이커리', '빵집', '디저트', '펍', '선술집', '바 ', '이자카야',
      'restaurant', 'cafe', 'bistro', 'diner', 'eatery', 'pub', 'bar', 'bakery', 'patisserie', 'brunch', 'gastronomy'
    ];
    return keywords.some(kw => name.includes(kw));
  };

  const landmarks = [];
  const sightseeingCategories = ['healing', 'culture', 'activity', 'shopping'];
  
  sightseeingCategories.forEach(cat => {
    const list = cityPools[cat] || [];
    list.forEach(att => {
      if (att.isLandmark) {
        if (isFoodOrDrinkPlace(att)) return;
        if (!landmarks.some(l => l.name_en === att.name_en)) {
          landmarks.push(att);
        }
      }
    });
  });

  const preferred = [];
  const others = [];
  sightseeingCategories.forEach(cat => {
    const list = cityPools[cat] || [];
    const isPreferred = preferences.includes(cat);
    list.forEach(att => {
      if (att.isLandmark) return;
      if (isFoodOrDrinkPlace(att)) return;
      if (isPreferred) {
        if (!preferred.some(p => p.name_en === att.name_en)) {
          preferred.push(att);
        }
      } else {
        if (!others.some(o => o.name_en === att.name_en)) {
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
  const unvisitedLandmarks = [...landmarks];
  let fallbackCount = 0;
  let lunchFallbackCount = 0;
  let dinnerFallbackCount = 0;
  let coffeeFallbackCount = 0;

  const markAsVisited = (item, isNightSlot) => {
    if (!item) return;
    visitedNames.add(item.name_ko);
    if (item.isFallback) return;
    
    const ulIdx = unvisitedLandmarks.findIndex(l => l.name_ko === item.name_ko);
    if (ulIdx !== -1) unvisitedLandmarks.splice(ulIdx, 1);
    
    const pool = isNightSlot ? nightSightseeing : daySightseeing;
    const pIdx = pool.findIndex(p => p.name_ko === item.name_ko);
    if (pIdx !== -1) pool.splice(pIdx, 1);
  };

  const markCafeAsVisited = (item) => {
    if (!item) return;
    visitedNames.add(item.name_ko);
    if (item.isFallback) return;
    
    const idx = dayCafes.findIndex(c => c.name_ko === item.name_ko);
    if (idx !== -1) dayCafes.splice(idx, 1);
    
    const idx2 = cafes.findIndex(c => c.name_ko === item.name_ko);
    if (idx2 !== -1) cafes.splice(idx2, 1);
  };

  const dayPreferred = preferred.filter(att => !isActualNightView(att));
  const nightPreferred = preferred.filter(att => isActualNightView(att));
  const dayOthers = others.filter(att => !isActualNightView(att));
  const nightOthers = others.filter(att => isActualNightView(att));

  const daySightseeing = [...dayPreferred, ...dayOthers];
  const nightSightseeing = [...nightPreferred, ...nightOthers];

  const gourmetPool = cityPools.gourmet || [];
  const cafes = gourmetPool.filter(isCafeItem);
  const diners = gourmetPool.filter(item => !isCafeItem(item));

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



  const HARD_CAP = 1320; // 22:00 in minutes
  const MEAL_DURATION = 90; // 90 min for both lunch and dinner

  const getItemDuration = (item) => {
    const dur = item.duration || 90;
    // Full-day attractions (theme parks, big day trips) keep their actual duration
    // These places dominate an entire day intentionally
    const FULL_DAY_THRESHOLD = 300; // 5 hours or more = full day attraction
    if (dur >= FULL_DAY_THRESHOLD) return dur;
    // Large half-day attractions (major sites, big outlets) - keep up to 360min
    const HALF_DAY_THRESHOLD = 180; // 3+ hours = half day
    if (dur >= HALF_DAY_THRESHOLD) return Math.min(dur, 360);
    // Regular sightseeing capped at 180 min
    return Math.min(dur, 180);
  };

  const isOpenDuring = (item, startMin, endMin) => {
    if (!item || item.isFallback) return true;
    const hours = getOperatingHours(item);
    return startMin >= hours.open && endMin <= hours.close;
  };

  const resolveCoords = (item, fallbackCoords) => {
    item.cityId = cityId;
    if (item.x === undefined || item.y === undefined) {
      const coords = getAttractionCoords(item);
      item.x = coords.x;
      item.y = coords.y;
    }
  };

  const formatMinutes = (m) => {
    const hrs = Math.floor(m / 60);
    const mins = m % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  let scheduledNightViewCount = 0;

  for (let d = 1; d <= days; d++) {
    const items = [];
    const rawActivities = [];
    let currentTime = 570; // 09:30
    let preferredQuadrant = null;
    let lastItem = null;
    let currentCoords = { x: 5.0, y: 5.0 };

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
        if (visitedNames.has(item.name_ko)) return false;
        return (item.duration || 0) >= 240; // 4+ hours
      }) || null;
    };
    let dayAnchorCluster = null;
    const heavyForToday = getHeavyUnvisited();
    if (heavyForToday) {
      const hCoords = getAttractionCoords(heavyForToday);
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
        const coords = getAttractionCoords(item);
        item.x = coords.x;
        item.y = coords.y;
      }
    };

    const addRestBlock = (gap, type) => {
      if (gap <= 0) return;
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
      } else if (type === 'end_of_day') {
        name_ko = "하루 일정 마무리 및 휴식";
        name_en = "Wrap up the Day & Rest";
        desc_ko = "오늘의 일정을 마무리하고 호텔로 복귀하거나 자유로운 개인 휴식 시간";
        desc_en = "Wrap up today's itinerary, return to the hotel, or enjoy personal free time.";
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
        if (fallbackObj.isRest || !visitedNames.has(fallbackObj.name_ko)) {
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
      const duration = mealType === 'lunch' ? 120 : 90;

      const meal = {
        name_ko,
        name_en,
        desc_ko,
        desc_en,
        duration,
        isFallback: true,
        isRest: true,
        x: lastItem ? lastItem.x : currentCoords.x,
        y: lastItem ? lastItem.y : currentCoords.y,
        open: 0,
        close: 1440
      };
      prepareItem(meal);

      const earliestStart = mealType === 'lunch' ? 690 : 1110; // 11:30 or 18:30

      // Fill gaps before meals with additional sightseeing instead of large rest blocks
      if (currentTime < earliestStart) {
        let fillAttempts = 0;
        const MAX_FILL_ATTEMPTS = 8;
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
          if (triedInFill.has(extraSpot.name_ko)) {
            addRestBlock(remainingGap, 'meal');
            break;
          }
          triedInFill.add(extraSpot.name_ko);
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

      const selectedMealPlace = getDinerSpot(d, mealType, lastItem, preferredQuadrant);
      if (selectedMealPlace) {
        Object.assign(meal, selectedMealPlace, {
          duration,
          isRest: !!selectedMealPlace.isRest,
          isMealPlace: !selectedMealPlace.isRest
        });
        prepareItem(meal);
      }

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
      visitedNames.add(item.name_ko);
      rawActivities.push({ start: currentTime, end: currentTime + duration, item: item, mealType: mealType });
      currentTime += duration;
      lastItem = item;
      const q = getQuadrant(item);
      if (q !== null) preferredQuadrant = q;
      return true;
    };

    // Helper: add transit between lastItem and nextItem, return transit duration
    const addTransit = (fromItem, toItem) => {
      if (!fromItem) return 0;
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
      const transitDur = lastItem ? calculateTransit(lastItem, item).duration : 0;
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
        addRestBlock(gap, 'sightseeing');
      }
      
      resolveCoords(item, currentCoords);
      if (!item.isFallback) {
        currentCoords = { x: item.x, y: item.y };
      }
      visitedNames.add(item.name_ko); // Added!
      rawActivities.push({ start: currentTime, end: endTime, item: item, mealType: mealType });
      currentTime = endTime;
      lastItem = item;
      const q = getQuadrant(item);
      if (q !== null) preferredQuadrant = q;
      return true;
    };

    const getUniqueSightseeingFallback = (isNightSlot) => {
      return {
        name_ko: "자유시간 및 휴식",
        name_en: "Free Time & Rest",
        desc_ko: "일정 사이에 갖는 여유로운 자유 시간 및 개별 휴식",
        desc_en: "Enjoy a relaxing free time and personal rest between schedules.",
        isRest: true,
        open: 0,
        close: 1440
      };
    };

    const getSightseeingSpot = (fromItem, isNightSlot, preferredQuadrant) => {
      // If today has a cluster anchor (due to heavy attraction), strongly prefer same cluster
      if (dayAnchorCluster && !isNightSlot) {
        const anchorX = dayAnchorCluster.x;
        const anchorY = dayAnchorCluster.y;
        const pool = isNightSlot ? nightSightseeing : daySightseeing;
        const unvisited = pool.filter(item => !visitedNames.has(item.name_ko));
        // Find items close to the anchor cluster (within 5km)
        const nearbyItems = unvisited.filter(item => {
          const coords = getAttractionCoords(item);
          const dist = getHaversineDistance(anchorY, anchorX, coords.y, coords.x);
          return dist <= 8.0; // 8km radius to match cluster items
        });
        if (nearbyItems.length > 0) {
          // Among nearby, pick closest to fromItem
          const sortedNearby = nearbyItems.slice().sort((a, b) => {
            const da = fromItem ? getDistance(fromItem, a) : 0;
            const db = fromItem ? getDistance(fromItem, b) : 0;
            return da - db;
          });
          // Return but don't remove yet - let the normal flow handle that
          const temp = [...sortedNearby];
          return pullClosestItem(fromItem, temp, preferredQuadrant);
        }
      }
      // 1. Try landmarks first!
      const landmarkCandidates = unvisitedLandmarks.filter(l => 
        (isNightSlot ? isActualNightView(l) : (d === 1 || !isActualNightView(l))) && !visitedNames.has(l.name_ko)
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
          const temp = [...openLandmarks];
          const selected = pullClosestItem(fromItem || null, temp, preferredQuadrant);
          return selected;
        }
      }

      // 2. General pool
      const pool = isNightSlot ? nightSightseeing : daySightseeing;
      const unvisitedPool = pool.filter(item => !visitedNames.has(item.name_ko));

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

        // Helper: peek diner spot with no side effects
    const peekDinerSpot = (mealType, fromItem) => {
      let pool = mealType === 'lunch' ? lunchDiners : dinnerDiners;
      let unvisitedPool = pool.filter(d => !visitedNames.has(d.name_ko));
      if (unvisitedPool.length === 0) {
        unvisitedPool = mealType === 'lunch'
          ? diners.filter(item => {
              if (isBreakfastOnly(item) || isDinnerOnly(item) || visitedNames.has(item.name_ko)) return false;
              const hours = getOperatingHours(item);
              return hours.open <= 810 && hours.close >= 780;
            })
          : diners.filter(item => {
              if (isBreakfastOnly(item) || isLunchOnly(item) || visitedNames.has(item.name_ko)) return false;
              const hours = getOperatingHours(item);
              return hours.open <= 1200 && hours.close >= 1230;
            });
      }
      if (unvisitedPool.length === 0) {
        return {
          name_ko: mealType === 'lunch' ? "임시 점심 식당" : "임시 저녁 식당",
          name_en: mealType === 'lunch' ? "Temp Lunch Diner" : "Temp Dinner Diner",
          isFallback: true,
          x: 5.0,
          y: 5.0,
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
        let unvisitedLunch = lunchDiners.filter(d => !visitedNames.has(d.name_ko));
        
        if (unvisitedLunch.length === 0) {
          const freshLunch = diners.filter(item => {
            if (isBreakfastOnly(item) || isDinnerOnly(item)) return false;
            if (visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          freshLunch.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !visitedNames.has(d.name_ko));
        }
        if (unvisitedLunch.length === 0) {
          const originalDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || isBreakfastOnly(item) || isDinnerOnly(item)) return false;
            if (visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          originalDiners.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !visitedNames.has(d.name_ko));
        }
        if (unvisitedLunch.length === 0) {
          const fallbackDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 780 && hours.close >= 870;
          });
          fallbackDiners.forEach(d => lunchDiners.push(d));
          unvisitedLunch = lunchDiners.filter(d => !visitedNames.has(d.name_ko));
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
          visitedNames.add(item.name_ko);
          
          const idx1 = lunchDiners.findIndex(d => d.name_ko === item.name_ko);
          if (idx1 !== -1) lunchDiners.splice(idx1, 1);
          const idx2 = dinnerDiners.findIndex(d => d.name_ko === item.name_ko);
          if (idx2 !== -1) dinnerDiners.splice(idx2, 1);
        } else {
          const idx = lunchFallbackCount;
          lunchFallbackCount++;
          item = getFallbackMealObject('lunch');
        }
      } else {
        let unvisitedDinner = dinnerDiners.filter(d => !visitedNames.has(d.name_ko));
        
        if (unvisitedDinner.length === 0) {
          const freshDinner = diners.filter(item => {
            if (isBreakfastOnly(item) || isLunchOnly(item)) return false;
            if (visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          freshDinner.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !visitedNames.has(d.name_ko));
        }
        if (unvisitedDinner.length === 0) {
          const originalDinners = gourmetPool.filter(item => {
            if (isCafeItem(item) || isBreakfastOnly(item) || isLunchOnly(item)) return false;
            if (visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          originalDinners.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !visitedNames.has(d.name_ko));
        }
        if (unvisitedDinner.length === 0) {
          const fallbackDiners = gourmetPool.filter(item => {
            if (isCafeItem(item) || visitedNames.has(item.name_ko)) return false;
            const hours = getOperatingHours(item);
            return hours.open <= 1200 && hours.close >= 1290;
          });
          fallbackDiners.forEach(d => dinnerDiners.push(d));
          unvisitedDinner = dinnerDiners.filter(d => !visitedNames.has(d.name_ko));
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
          visitedNames.add(item.name_ko);
          
          const idx1 = lunchDiners.findIndex(d => d.name_ko === item.name_ko);
          if (idx1 !== -1) lunchDiners.splice(idx1, 1);
          const idx2 = dinnerDiners.findIndex(d => d.name_ko === item.name_ko);
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
      let unvisitedCafes = dayCafes.filter(c => !visitedNames.has(c.name_ko));
      
      if (unvisitedCafes.length === 0) {
        const freshCafes = cafes.filter(item => !isNightOnly(item) && !visitedNames.has(item.name_ko));
        freshCafes.forEach(c => dayCafes.push(c));
        unvisitedCafes = dayCafes.filter(c => !visitedNames.has(c.name_ko));
      }
      if (unvisitedCafes.length === 0) {
        const originalCafes = gourmetPool.filter(item => isCafeItem(item) && !isNightOnly(item) && !visitedNames.has(item.name_ko));
        originalCafes.forEach(c => dayCafes.push(c));
        unvisitedCafes = dayCafes.filter(c => !visitedNames.has(c.name_ko));
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

      if (targetPool.length > 0) {
        const temp = [...targetPool];
        const item = pullClosestItem(fromItem || null, temp, preferredQuadrant);
        return item;
      } else {
        return getFallbackMealObject('coffee');
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

    // Helper: check if a candidate fits before Lunch (Lunch must start by 13:30 = 810)
    const fitsBeforeLunch = (candidate, duration) => {
      const transitToCand = lastItem ? calculateTransit(lastItem, candidate).duration : 0;
      const lunchItem = peekDinerSpot('lunch', candidate) || { x: 5.0, y: 5.0 };
      if (!lunchItem) return false;
      const transitCandToLunch = calculateTransit(candidate, lunchItem).duration;
      
      const hours = getOperatingHours(candidate);
      const arrival = currentTime + transitToCand;
      const minStart = Math.max(arrival, hours.open);
      const minEnd = minStart + duration;
      
      if (minEnd > hours.close || minEnd + transitCandToLunch > 810) {
        return false;
      }
      return true;
    };

    // === PHASE 0: Breakfast (Optional) ===
    let breakfastItem = null;
    const breakfastCandidates = gourmetPool.filter(item => isBreakfastOnly(item) && !visitedNames.has(item.name_ko));
    if (breakfastCandidates.length > 0) {
      breakfastItem = pullClosestItem(null, breakfastCandidates, preferredQuadrant);
      prepareItem(breakfastItem);
      visitedNames.add(breakfastItem.name_ko);
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

      // Sightseeing 2 (Optional) — only if we have room and not relaxed mode
      if (morningScheduled && (!state.regenConfig || !state.regenConfig.relaxed)) {
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

    // Cafe or Sightseeing 3
    let s3 = null;
    const coffee = getCafeSpot(d, lastItem, preferredQuadrant);
    if (dayCafes.length > 0 || coffee.isFallback === false) {
      s3 = coffee;
    } else {
      s3 = getSightseeingSpot(lastItem, false, preferredQuadrant);
    }
    prepareItem(s3);

    if (s3 && !s3.isRest) {
      const s3dur = getItemDuration(s3);
      if (fitsBeforeDinner(s3, s3dur)) {
        if (tryScheduleAttraction(s3, s3dur)) {
          if (s3 === coffee) {
            markCafeAsVisited(s3);
          } else {
            markAsVisited(s3, false);
          }

          // Sightseeing 4 (Optional) — only if not relaxed mode
          if (!state.regenConfig || !state.regenConfig.relaxed) {
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
        let isDinner = false;

        if (act.mealType === 'lunch') {
          nameKo = "점심시간";
          nameEn = "Lunch Time";
          if (!(act.item && act.item.isRest)) {
            nameKo = act.item.name_ko;
            nameEn = act.item.name_en;
          }
        } else if (act.mealType === 'dinner') {
          nameKo = "저녁시간";
          nameEn = "Dinner Time";
          if (!(act.item && act.item.isRest)) {
            nameKo = act.item.name_ko;
            nameEn = act.item.name_en;
          }
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
          timeSlot: isDinner ? `${formatMinutes(actStart)} -` : `${formatMinutes(actStart)} - ${formatMinutes(actEnd)}`,
          name_ko: nameKo,
          name_en: nameEn,
          desc_ko: act.item.desc_ko,
          desc_en: act.item.desc_en,
          duration: actDuration,
          hideDuration: isDinner
        });
      }
    }

    dayPlans.push({
      day: d,
      items: items
    });
  }

  return {
    cityId,
    days: dayPlans
  };
}

function renderItinerary(itinerary) {
  const tabContainer = document.getElementById('itineraryDayTabs');
  const timelineContainer = document.getElementById('itineraryTimelineList');

  tabContainer.innerHTML = '';
  timelineContainer.innerHTML = '';

  itinerary.days.forEach(dayPlan => {
    const isActive = dayPlan.day === state.currentItineraryDay;
    const btn = document.createElement('button');
    btn.className = `day-btn ${isActive ? 'active' : ''}`;
    btn.textContent = state.lang === 'ko' ? `${dayPlan.day}일차` : `Day ${dayPlan.day}`;
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

  dayPlan.items.forEach((item) => {
    const name = state.lang === 'ko' ? item.name_ko : item.name_en;
    const desc = state.lang === 'ko' ? item.desc_ko : item.desc_en;
    const durationLabel = TRANSLATIONS[state.lang].planner_duration;

    if (item.isTransit) {
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
      const isSpecialItem = item.isRest || name.includes('점심') || name.includes('저녁') || name.includes('Lunch') || name.includes('Dinner') || name.includes('식사') || name.includes('Meal') || name.includes('조식') || name.includes('아침') || name.includes('Breakfast') || item.isLodging;
      
      const itemHTML = `
        <div class="timeline-item" draggable="${item.isLodging ? 'false' : 'true'}" data-attraction-index="${attIdx}">
          <div class="timeline-marker" style="${item.isLodging ? 'background: #10b981; border-color: #10b981;' : ''}"></div>
          <div class="timeline-content">
            <div class="timeline-card-header">
              <span class="timeline-time-badge">${item.timeSlot}</span>
              <div class="timeline-card-actions">
                ${isSpecialItem ? '' : `
                  <span style="font-size:11px; color:var(--text-muted);">${durationLabel}:</span>
                  <input type="number" class="timeline-duration-input" data-attraction-index="${attIdx}" value="${item.duration || 90}" min="10" max="600" step="10">
                  <span style="font-size:11px; color:var(--text-muted); margin-right:8px;">m</span>
                `}
                ${item.isLodging ? '' : `
                  <button class="timeline-delete-btn" data-attraction-index="${attIdx}" title="${state.lang === 'ko' ? '삭제' : 'Delete'}">&times;</button>
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
                <span class="timeline-info-badge fee">
                  🎟️ ${item.fee || details.fee}
                </span>
                <span class="timeline-info-badge reservation">
                  📅 ${item.reservation || details.reservation}
                </span>
                <div class="timeline-info-links">
                  <a href="${item.mapsLink || details.mapsLink}" target="_blank" class="timeline-link-btn">
                    📍 ${state.lang === 'ko' ? '지도 보기' : 'View Map'}
                  </a>
                  <a href="${item.website || details.website}" target="_blank" class="timeline-link-btn">
                    🌐 ${state.lang === 'ko' ? '공식 사이트' : 'Website'}
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
        <span>${state.lang === 'ko' ? '새로운 장소 추가' : 'Add New Place'}</span>
      </button>
    </div>
  `;
  list.insertAdjacentHTML('beforeend', addPlaceHTML);
  
  // Bind actions
  bindTimelineActions();
}

// --- Companion Board Engine ---
function renderCompanionRooms() {
  const grid = document.getElementById('companionRoomCardsGrid');
  grid.innerHTML = '';

  // Get current active category filter
  const activeTab = document.querySelector('#companionCategoryFilterList .category-tab-btn.active');
  const categoryFilter = activeTab ? activeTab.getAttribute('data-category') : 'all';

  // Filter rooms
  const filtered = state.rooms.filter(room => {
    if (categoryFilter === 'all') return true;
    return room.category === categoryFilter;
  });

  filtered.forEach(room => {
    const title = state.lang === 'ko' ? room.title_ko : room.title_en;
    const place = state.lang === 'ko' ? room.place_ko : room.place_en;
    const desc = state.lang === 'ko' ? room.desc_ko : room.desc_en;
    const city = CITIES.find(c => c.id === room.cityId);
    const cityName = city ? (state.lang === 'ko' ? city.name_ko : city.name_en) : room.cityId;

    const limitGender = TRANSLATIONS[state.lang][`gender_${room.targetGender === '남성' ? 'male' : room.targetGender === '여성' ? 'female' : 'any'}`] || room.targetGender;

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
            <span data-i18n="comp_room_joined">${TRANSLATIONS[state.lang].comp_room_join_btn}</span>
          </button>
          <button class="edit-room-btn" data-room-id="${room.id}" title="${state.lang === 'ko' ? '수정' : 'Edit'}">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="delete-room-btn" data-room-id="${room.id}" title="${state.lang === 'ko' ? '삭제' : 'Delete'}">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;
    } else {
      actionButtonsHTML = `
        <button class="btn-primary join-chat-btn" data-room-id="${room.id}" style="width: 100%; justify-content: center; padding: 10px;">
          <span data-i18n="comp_room_joined">${TRANSLATIONS[state.lang].comp_room_join_btn}</span>
        </button>
      `;
    }

    const card = document.createElement('div');
    card.className = 'room-card';
    card.innerHTML = `
      <div>
        <div class="room-header">
          <span class="room-badge">${room.category} (${cityName})</span>
          <span class="room-status" data-i18n="comp_room_recruiting">${TRANSLATIONS[state.lang].comp_room_recruiting}</span>
        </div>
        
        <h4 class="room-title">${title}</h4>
        
        <div class="room-creator">
          <div class="creator-avatar">${room.creator.name.charAt(0)}</div>
          <div class="creator-info">
            <h5>${room.creator.name}</h5>
            <p>${room.creator.mbti} • ${room.creator.gender}</p>
          </div>
        </div>

        <p style="font-size:12px; color:var(--text-muted); margin-bottom: 12px; line-height: 1.4; height: 36px; overflow: hidden;">${desc}</p>
        
        <div class="room-tags">
          <span class="room-tag verify">${TRANSLATIONS[state.lang].comp_room_verify_badge}</span>
          <span class="room-tag match">${TRANSLATIONS[state.lang].comp_room_pref_match} ${matchPercentage}%</span>
          <span class="room-tag">${TRANSLATIONS[state.lang].comp_room_people}: ${room.joinedCount}/${room.maxPeople >= 9999 ? '∞' : room.maxPeople}</span>
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
  if (!room.joinedUsers.includes(username)) {
    const isUnlimited = !room.maxPeople || room.maxPeople >= 9999;
    if (isUnlimited || room.joinedUsers.length < room.maxPeople) {
      room.joinedUsers.push(username);
      room.joinedCount = room.joinedUsers.length;
      
      // Add join notification to chat log
      const joinMsg = state.lang === 'ko'
        ? `${state.activeProfile.name}님이 동행방에 입장하셨습니다.`
        : `${state.activeProfile.name} has joined the chat.`;
      
      if (!state.chatLogs[roomId]) {
        state.chatLogs[roomId] = [];
      }
      state.chatLogs[roomId].push(createMessageObject({ text: joinMsg, system: true }));
      await pushToRemote();
    } else {
      showToast(state.lang === 'ko' ? '정원이 가득 찬 방입니다.' : 'This room is full.');
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
  const targetAge = '연령 무관';
  const targetGender = document.getElementById('modalRoomGender').value;
  const targetNationality = '국적 무관';
  const preferenceCode = 'healing';
  const desc = document.getElementById('modalRoomDesc').value;

  await pullFromRemote();

  // ── EDIT MODE ──
  if (state.editingRoomId !== null) {
    const room = state.rooms.find(r => r.id === state.editingRoomId);
    if (room && room.creator.name === state.activeProfile.name) {
      // Update bilingual titles
      if (state.lang === 'ko') {
        room.title_ko = title;
        room.title_en = room.title_en && !room.title_en.startsWith('[KOR]') ? room.title_en : `[KOR] ${title}`;
      } else {
        room.title_en = title;
        room.title_ko = room.title_ko && !room.title_ko.startsWith('[ENG]') ? room.title_ko : `[ENG] ${title}`;
      }
      room.cityId = cityId;
      room.category = category;
      room.place_ko = place;
      room.place_en = place;
      room.date = date;
      room.time = time;
      room.maxPeople = maxPeople;
      room.targetAge = targetAge;
      room.targetGender = targetGender;
      room.targetNationality = targetNationality;
      room.preferenceCode = preferenceCode;
      if (state.lang === 'ko') {
        room.desc_ko = desc;
      } else {
        room.desc_en = desc;
      }

      await pushToRemote();
      closeCreateModal();
      renderCompanionRooms();
      showToast(state.lang === 'ko' ? '동행 방 정보가 수정되었습니다!' : 'Room updated successfully!');
    }
    return;
  }

  const newRoomId = Date.now() + Math.floor(Math.random() * 1000);
  const newRoom = {
    id: newRoomId,
    title_ko: state.lang === 'ko' ? title : `[ENG] ${title}`,
    title_en: state.lang === 'en' ? title : `[KOR] ${title}`,
    cityId,
    category,
    place_ko: place,
    place_en: place,
    date,
    time,
    maxPeople,
    joinedCount: 1, // Creator is first
    joinedUsers: [state.activeProfile.name], // Initialize with creator
    targetAge,
    targetGender,
    targetNationality,
    preferenceCode,
    creator: {
      name: state.activeProfile.name,
      age: state.activeProfile.age || '30대',
      gender: state.activeProfile.gender,
      nationality: state.activeProfile.nationality || '한국인',
      mbti: state.activeProfile.mbti,
      verified: state.activeProfile.verified,
      sns: state.activeProfile.sns || 'None'
    },
    desc_ko: state.lang === 'ko' ? desc : `Translation missing. Description: ${desc}`,
    desc_en: state.lang === 'en' ? desc : `Korean detail: ${desc}`,
    status: 'recruiting'
  };

  state.rooms.push(newRoom);
  
  // Set up empty chat log for new room
  const welcomeMsg = state.lang === 'ko'
    ? `[안내] '${state.activeProfile.name}'님이 만든 동행방입니다. 매너 있는 대화를 부탁드립니다.`
    : `[System] Room created by '${state.activeProfile.name}'. Please be respectful in chat.`;
  state.chatLogs[newRoomId] = [
    createMessageObject({ text: welcomeMsg, system: true })
  ];

  await pushToRemote();
  closeCreateModal();
  renderCompanionRooms();
  
  showToast(state.lang === 'ko' ? '동행 모집방이 생성되었습니다!' : 'Companion room created!');
}

async function deleteCompanionRoom(roomId) {
  const confirmMsg = state.lang === 'ko' 
    ? '정말로 이 동행 모집 글을 삭제하시겠습니까?' 
    : 'Are you sure you want to delete this companion room?';
  if (!confirm(confirmMsg)) return;

  await pullFromRemote();

  state.rooms = state.rooms.filter(r => r.id !== roomId);
  if (state.chatLogs[roomId]) {
    delete state.chatLogs[roomId];
  }

  await pushToRemote();
  renderCompanionRooms();
  
  showToast(state.lang === 'ko' ? '동행 모집 글이 삭제되었습니다.' : 'Companion room deleted.');
}

// --- Live Chat Room Simulation ---
function renderChatRoom() {
  const room = state.rooms.find(r => r.id === state.joinedRoomId);
  if (!room) return;

  const shareBtn = document.getElementById('chatShareCourseBtn');
  if (shareBtn) {
    shareBtn.style.display = state.activeCourse ? 'flex' : 'none';
  }

  const title = state.lang === 'ko' ? room.title_ko : room.title_en;
  
  // Update header titles
  document.getElementById('chatRoomTitleText').textContent = title;
  document.getElementById('chatRoomCategoryBadge').textContent = room.category.toUpperCase();

  // Render members sidebar
  const membersContainer = document.getElementById('chatMemberListContainer');
  membersContainer.innerHTML = '';

  // Initialize joinedUsers array if not present
  if (!room.joinedUsers) {
    room.joinedUsers = [room.creator.name];
  }

  // Build membersList from room.joinedUsers
  const membersList = [];
  room.joinedUsers.forEach(username => {
    if (username === room.creator.name) {
      membersList.push(room.creator);
    } else if (username === state.activeProfile.name) {
      membersList.push({
        name: state.activeProfile.name,
        mbti: state.activeProfile.mbti,
        gender: state.activeProfile.gender,
        nationality: state.activeProfile.nationality
      });
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
      <button class="kick-member-btn" data-username="${m.name}" title="${state.lang === 'ko' ? '강퇴' : 'Kick'}">
        <svg viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
      </button>` : '';

    const memberItem = document.createElement('div');
    memberItem.className = 'member-item';
    memberItem.innerHTML = `
      <div class="avatar">${m.name.charAt(0)}</div>
      <div class="name">${m.name}${isRoomCreator ? ' 👑' : ''}</div>
      <span class="mbti">${m.mbti}</span>
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
      container.insertAdjacentHTML('beforeend', `<div class="chat-msg-system">${log.text}</div>`);
    } else if (log.type === 'share_course') {
      const isMe = log.sender === state.activeProfile.name;
      const bubbleClass = isMe ? 'outgoing' : 'incoming';
      const senderText = isMe ? '' : `<span class="chat-msg-sender">${log.sender} (${log.mbti})</span>`;
      
      const course = log.course;
      const cardId = `chat-card-${log.id}`;
      
      const cardHTML = `
        <div class="chat-msg-bubble ${bubbleClass}">
          ${senderText}
          <div class="chat-msg-text" style="padding: 10px;">
            <div class="chat-msg-card">
              <div class="chat-msg-card-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="color:var(--primary);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/></svg>
                <span>${state.lang === 'ko' ? '공유된 여행 코스' : 'Shared Course'}</span>
              </div>
              <div class="chat-msg-card-desc">
                <b>${course.cityName}</b> ${course.days.length}일 일정<br>
                ${state.lang === 'ko' ? '메인 취향: ' + course.preferences.map(p => TRANSLATIONS.ko['planner_pref_' + p] || p).join(', ') : 'Preferences: ' + course.preferences.join(', ')}
              </div>
              <button class="chat-msg-card-btn" id="${cardId}">${state.lang === 'ko' ? '일정 불러오기' : 'Load Itinerary'}</button>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHTML);
      
      // Bind load course action
      const btn = document.getElementById(cardId);
      if (btn) {
        btn.addEventListener('click', () => {
          state.activeCourse = course;
          state.currentItineraryDay = 1;
          state.currentView = 'planner';
          saveToLocalStorage();
          updateView();
          renderItinerary(state.activeCourse);
          showToast(state.lang === 'ko' ? `"${course.cityName}" 공유된 일정을 불러왔습니다.` : `Loaded shared "${course.cityName}" itinerary.`);
        });
      }
    } else {
      const isMe = log.sender === state.activeProfile.name;
      const bubbleClass = isMe ? 'outgoing' : 'incoming';
      const senderText = isMe ? '' : `<span class="chat-msg-sender">${log.sender} (${log.mbti})</span>`;

      const msgHTML = `
        <div class="chat-msg-bubble ${bubbleClass}">
          ${senderText}
          <div class="chat-msg-text">${log.text}</div>
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

      const replyText = state.lang === 'ko' ? resp.message_ko : resp.message_en;
      
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
  const confirmMsg = state.lang === 'ko'
    ? `'${username}'님을 강퇴하시겠습니까?`
    : `Are you sure you want to kick '${username}'?`;
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

  const kickMsg = state.lang === 'ko'
    ? `[안내] '${username}'님이 방장에 의해 퇴장되었습니다.`
    : `[System] '${username}' was removed by the room creator.`;

  if (!state.chatLogs[state.joinedRoomId]) {
    state.chatLogs[state.joinedRoomId] = [];
  }
  state.chatLogs[state.joinedRoomId].push(createMessageObject({ text: kickMsg, system: true }));

  await pushToRemote();
  renderChatRoom();
  showToast(state.lang === 'ko' ? `'${username}'님을 강퇴했습니다.` : `'${username}' has been kicked.`);
}

// --- Toast and Feedback ---
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
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
  
  // Map link generator
  const isKoreanCity = ['seoul', 'jeju', 'busan'].includes(cityId);
  const mapsLink = isKoreanCity 
    ? `https://map.kakao.com/?q=${encodeURIComponent(item.name_ko || item.name_en)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name_en || item.name_ko)}`;
    
  // Website link generator
  if (!website) {
    website = `https://www.google.com/search?q=${encodeURIComponent((item.name_en || item.name_ko) + ' official website')}`;
  }
  
  return {
    fee: state.lang === 'ko' ? fee : feeEn,
    reservation: state.lang === 'ko' ? reservation : reservationEn,
    mapsLink,
    website
  };
}

let leafletMap = null;
let leafletMarkersGroup = null;
let leafletPolyline = null;

function renderMapForDay(dayIndex) {
  const mapContainer = document.getElementById('itineraryMapContainer');
  if (!mapContainer) return;
  
  const course = state.activeCourse;
  if (!course || !course.days || !course.days[dayIndex]) {
    mapContainer.style.display = 'none';
    return;
  }
  
  mapContainer.style.display = 'block';
  
  const dayPlan = course.days[dayIndex];
  const points = [];
  const attractions = [];
  
  dayPlan.items.forEach(item => {
    if (!item.isTransit) {
      const coords = getAttractionCoords(item);
      points.push([coords.y, coords.x]); // [lat, lon]
      attractions.push({ item, coords });
    }
  });
  
  if (points.length === 0) {
    mapContainer.style.display = 'none';
    return;
  }
  
  try {
    if (typeof L === 'undefined') {
      document.getElementById('itineraryMap').innerHTML = `
        <div style="height:100%; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.03); border-radius:16px; color:var(--text-muted); padding: 20px; text-align:center;">
          <span>지도를 로드할 수 없습니다 (인터넷 연결 확인)</span>
        </div>
      `;
      return;
    }
    
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
      const { item } = attractions[idx];
      const name = state.lang === 'ko' ? item.name_ko : item.name_en;
      const time = item.timeSlot ? item.timeSlot.split(' ')[0] : '';
      
      const isLodging = item.isLodging;
      const pinColor = isLodging ? '#10b981' : '#8a5cf6';
      
      const numIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="pin-badge" style="background-color: ${pinColor};">${isLodging ? '🏨' : idx + 1}</div>
          <div class="pin-title">${name}</div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 20]
      });
      
      L.marker(pt, { icon: numIcon })
        .addTo(leafletMarkersGroup)
        .bindPopup(`
          <div style="color: #000; font-family: sans-serif; font-size:12.5px;">
            <b style="font-size:14px; color:${pinColor}">${isLodging ? '🏨' : (idx + 1) + '.'} ${name}</b><br>
            <span style="font-weight:600;">시간:</span> ${item.timeSlot}<br>
            ${item.desc_ko ? `<span style="color:#555;">${state.lang === 'ko' ? item.desc_ko : item.desc_en}</span>` : ''}
          </div>
        `);
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
    leafletMap.fitBounds(bounds, { padding: [50, 50] });
    
  } catch (err) {
    console.error("Error rendering map:", err);
  }
}

function recalculateDayPlanTimes(dayPlan, cityId) {
  let attractions = dayPlan.items.filter(item => !item.isTransit);
  
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
  
  const newItems = [];
  let currentTime = 570; // 09:30
  
  for (let i = 0; i < finalAttractions.length; i++) {
    const item = finalAttractions[i];
    
    if (i > 0) {
      const prevItem = finalAttractions[i - 1];
      const transit = calculateTransit(prevItem, item);
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
    
    const start = currentTime;
    const duration = item.isLodging ? 0 : (item.duration || 90);
    const end = start + duration;
    
    item.timeSlot = item.isLodging 
      ? formatMinutesGlobal(start)
      : `${formatMinutesGlobal(start)} - ${formatMinutesGlobal(end)}`;
    
    if (!item.isLodging) {
      const details = getAttractionDetails(item, cityId || state.activeCourse.cityId);
      item.fee = details.fee;
      item.reservation = details.reservation;
      item.mapsLink = details.mapsLink;
      item.website = details.website;
    }
    
    newItems.push(item);
    currentTime = end;
  }
  
  dayPlan.items = newItems;
}

function saveCurrentItinerary() {
  const course = state.activeCourse;
  if (!course) {
    showToast(state.lang === 'ko' ? '저장할 일정이 없습니다.' : 'No itinerary to save.');
    return;
  }
  
  const tripName = prompt(
    state.lang === 'ko' 
      ? '여행 일정의 이름을 입력해주세요:' 
      : 'Please enter a name for this itinerary:',
    `${course.cityName} ${course.days.length}일 여행`
  );
  
  if (tripName === null) return;
  const name = tripName.trim() || `${course.cityName} ${course.days.length}일 여행`;
  
  if (!state.savedCourses) state.savedCourses = [];
  
  const newTrip = {
    id: 'trip-' + Date.now(),
    name: name,
    course: course,
    savedAt: Date.now()
  };
  
  state.savedCourses.push(newTrip);
  saveToLocalStorage();
  renderSavedCoursesList();
  showToast(state.lang === 'ko' ? '여행 일정이 저장되었습니다.' : 'Itinerary saved.');
}

function renderSavedCoursesList() {
  const container = document.getElementById('savedTripsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  const saved = state.savedCourses || [];
  
  if (saved.length === 0) {
    container.innerHTML = `
      <p style="font-size: 12px; color: var(--text-muted); text-align: center; margin: 8px 0;" data-i18n="saved_trips_empty">
        ${state.lang === 'ko' ? '저장된 여행이 없습니다.' : 'No saved trips.'}
      </p>
    `;
    return;
  }
  
  saved.forEach(trip => {
    const formattedDate = new Date(trip.savedAt).toLocaleDateString(state.lang === 'ko' ? 'ko-KR' : 'en-US', {
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
        <div class="saved-trip-meta">${trip.course.cityName} • ${trip.course.days.length}일 • ${formattedDate}</div>
      </div>
      <button class="saved-trip-delete" title="${state.lang === 'ko' ? '삭제' : 'Delete'}">
        <svg viewBox="0 0 24 24" style="width:14px; height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    
    item.querySelector('.saved-trip-info').addEventListener('click', () => {
      state.activeCourse = trip.course;
      state.currentItineraryDay = 1;
      saveToLocalStorage();
      renderItinerary(state.activeCourse);
      showToast(state.lang === 'ko' ? `"${trip.name}" 일정을 불러왔습니다.` : `Loaded "${trip.name}" itinerary.`);
    });
    
    item.querySelector('.saved-trip-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!confirm(state.lang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this trip?')) return;
      
      state.savedCourses = state.savedCourses.filter(t => t.id !== trip.id);
      saveToLocalStorage();
      renderSavedCoursesList();
      showToast(state.lang === 'ko' ? '삭제되었습니다.' : 'Deleted.');
    });
    
    container.appendChild(item);
  });
}

function copyShareLink() {
  const course = state.activeCourse;
  if (!course) {
    showToast(state.lang === 'ko' ? '공유할 일정이 없습니다.' : 'No itinerary to share.');
    return;
  }
  
  try {
    const jsonStr = JSON.stringify(course);
    const base64Str = btoa(unescape(encodeURIComponent(jsonStr)));
    const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?share=${base64Str}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast(state.lang === 'ko' ? '공유 링크가 클립보드에 복사되었습니다.' : 'Share link copied to clipboard.');
    }).catch(err => {
      console.error(err);
      prompt(state.lang === 'ko' ? '아래 링크를 복사하여 공유하세요:' : 'Copy this link to share:', shareUrl);
    });
  } catch (e) {
    console.error("Failed to generate share link:", e);
  }
}

function exportItineraryToMarkdown() {
  const course = state.activeCourse;
  if (!course) {
    showToast(state.lang === 'ko' ? '다운로드할 일정이 없습니다.' : 'No itinerary to download.');
    return;
  }
  
  let md = `# WanderSync Travel Itinerary: ${course.cityName}\n\n`;
  md += `*Generated via WanderSync AI Travel Course Planner*\n`;
  if (course.lodging) {
    md += `*Lodging / Start Point: ${course.lodging.name}*\n`;
  }
  md += `\n---\n\n`;
  
  course.days.forEach(dayPlan => {
    md += `## Day ${dayPlan.day}\n\n`;
    
    dayPlan.items.forEach(item => {
      const name = state.lang === 'ko' ? item.name_ko : item.name_en;
      const desc = state.lang === 'ko' ? item.desc_ko : item.desc_en;
      
      if (item.isTransit) {
        md += `* ${item.timeSlot} | **${name}** (Duration: ${item.duration}m)\n`;
      } else {
        md += `### 📍 [${item.timeSlot}] ${name}\n`;
        if (desc) md += `* ${desc}\n`;
        if (!item.isLodging) {
          const details = getAttractionDetails(item, course.cityId);
          md += `* **Entry Fee**: ${details.fee} | **Reservation**: ${details.reservation}\n`;
          md += `* [View on Google Maps](${details.mapsLink}) | [Official Website](${details.website})\n`;
        }
        md += `\n`;
      }
    });
    md += `---\n\n`;
  });
  
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `WanderSync_Itinerary_${course.cityId}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(state.lang === 'ko' ? '마크다운 파일 다운로드가 시작되었습니다.' : 'Markdown file download started.');
}

function showAddPlaceModal(allAttractions, dayPlan, cityId) {
  let modal = document.getElementById('timelineAddPlaceModal');
  if (!modal) {
    const modalHTML = `
      <div class="modal-overlay" id="timelineAddPlaceModal" style="z-index: 2000;">
        <div class="modal-content" style="max-width: 450px;">
          <div class="modal-header">
            <h3 style="font-size:18px; font-weight:700;">${state.lang === 'ko' ? '일정에 장소 추가' : 'Add Place to Itinerary'}</h3>
            <button class="modal-close" onclick="document.getElementById('timelineAddPlaceModal').classList.remove('active')">&times;</button>
          </div>
          <div class="form-group">
            <label class="form-label">${state.lang === 'ko' ? '추가할 관광지 선택' : 'Select Attraction'}</label>
            <select class="form-control" id="addPlaceSelectField" style="width:100%;">
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${state.lang === 'ko' ? '소요 시간 (분)' : 'Duration (minutes)'}</label>
            <input type="number" class="form-control" id="addPlaceDurationField" value="90" min="10" max="600" step="10">
          </div>
          <div class="form-group">
            <label class="form-label">${state.lang === 'ko' ? '원하는 시작 시간 (선택)' : 'Desired Start Time (Optional)'}</label>
            <input type="time" class="form-control" id="addPlaceTimeField">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" onclick="document.getElementById('timelineAddPlaceModal').classList.remove('active')">${state.lang === 'ko' ? '취소' : 'Cancel'}</button>
            <button type="button" class="btn-primary" id="addPlaceModalSubmitBtn">${state.lang === 'ko' ? '추가하기' : 'Add'}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('timelineAddPlaceModal');
  }

  const select = document.getElementById('addPlaceSelectField');
  select.innerHTML = '';
  
  allAttractions.sort((a, b) => {
    const na = state.lang === 'ko' ? a.name_ko : a.name_en;
    const nb = state.lang === 'ko' ? b.name_ko : b.name_en;
    return na.localeCompare(nb);
  });

  allAttractions.forEach(att => {
    const name = state.lang === 'ko' ? att.name_ko : att.name_en;
    const opt = document.createElement('option');
    opt.value = JSON.stringify(att);
    opt.textContent = name;
    select.appendChild(opt);
  });

  // Calculate default time after the last attraction
  const attractionsOnly = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);
  let defaultTime = "09:30";
  if (attractionsOnly.length > 0) {
    const lastAtt = attractionsOnly[attractionsOnly.length - 1];
    if (lastAtt.timeSlot) {
      const parts = lastAtt.timeSlot.split('-');
      if (parts.length > 1) {
        defaultTime = parts[1].trim();
      } else {
        defaultTime = parts[0].trim();
      }
    }
  }
  document.getElementById('addPlaceTimeField').value = defaultTime;

  modal.classList.add('active');

  const submitBtn = document.getElementById('addPlaceModalSubmitBtn');
  const newSubmitBtn = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

  newSubmitBtn.addEventListener('click', () => {
    const selectedVal = select.value;
    if (!selectedVal) return;

    const att = JSON.parse(selectedVal);
    const duration = parseInt(document.getElementById('addPlaceDurationField').value, 10) || 90;
    let timeVal = document.getElementById('addPlaceTimeField').value;
    if (!timeVal) timeVal = defaultTime;
    
    const [hours, minutes] = timeVal.split(':').map(Number);
    const newStartMin = hours * 60 + minutes;

    const newItem = {
      ...att,
      duration: duration,
      cityId: cityId
    };

    const attractions = dayPlan.items.filter(it => !it.isTransit && !it.isLodging);

    function parseStartTime(item) {
      if (!item.timeSlot) return 570;
      const parts = item.timeSlot.split('-');
      const startStr = parts[0].trim();
      const [h, m] = startStr.split(':').map(Number);
      return h * 60 + m;
    }

    function parseEndTime(item) {
      if (!item.timeSlot) return 570;
      const parts = item.timeSlot.split('-');
      if (parts.length > 1) {
        const [h, m] = parts[1].trim().split(':').map(Number);
        return h * 60 + m;
      }
      const [h, m] = parts[0].trim().split(':').map(Number);
      return h * 60 + m;
    }

    // Find chronological index
    let insertIdx = attractions.length;
    for (let i = 0; i < attractions.length; i++) {
      if (parseStartTime(attractions[i]) > newStartMin) {
        insertIdx = i;
        break;
      }
    }

    // Insert with idle gap filling
    if (insertIdx > 0) {
      const prevItem = attractions[insertIdx - 1];
      const prevEndMin = parseEndTime(prevItem);
      const transit = calculateTransit(prevItem, newItem);
      const arrivalMin = prevEndMin + transit.duration;

      if (newStartMin > arrivalMin + 10) {
        const gap = newStartMin - arrivalMin;
        const restItem = {
          name_ko: "자유시간 및 휴식",
          name_en: "Free Time & Rest",
          desc_ko: "일정 사이에 갖는 여유로운 자유 시간 및 개별 휴식",
          desc_en: "Enjoy a relaxing free time and personal rest between schedules.",
          isRest: true,
          duration: gap,
          cityId: cityId
        };
        attractions.splice(insertIdx, 0, restItem);
        attractions.splice(insertIdx + 1, 0, newItem);
      } else {
        attractions.splice(insertIdx, 0, newItem);
      }
    } else {
      const startLodging = dayPlan.items.find(it => it.isLodging && it.isStart);
      const startMin = 570; // 09:30
      let arrivalMin = startMin;
      if (startLodging) {
        const transit = calculateTransit(startLodging, newItem);
        arrivalMin = startMin + transit.duration;
      }

      if (newStartMin > arrivalMin + 10) {
        const gap = newStartMin - arrivalMin;
        const restItem = {
          name_ko: "자유시간 및 휴식",
          name_en: "Free Time & Rest",
          desc_ko: "일정 사이에 갖는 여유로운 자유 시간 및 개별 휴식",
          desc_en: "Enjoy a relaxing free time and personal rest between schedules.",
          isRest: true,
          duration: gap,
          cityId: cityId
        };
        attractions.splice(0, 0, restItem, newItem);
      } else {
        attractions.splice(0, 0, newItem);
      }
    }

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
    showToast(state.lang === 'ko' ? '장소가 추가되었습니다.' : 'Place added.');
  });
}

function handleCustomRegen(requestText) {
  if (!state.activeCourse) {
    showToast(state.lang === 'ko' ? '먼저 일정을 생성해주세요.' : 'Please generate an itinerary first.');
    return;
  }
  
  const text = requestText.toLowerCase();
  
  state.regenConfig = {
    relaxed: false,
    packed: false,
    excludeShopping: false,
    forceCulture: false,
    customRequestText: requestText
  };
  
  if (text.includes('여유') || text.includes('천천히') || text.includes('relaxed') || text.includes('slow') || text.includes('leisure')) {
    state.regenConfig.relaxed = true;
  } else if (text.includes('타이트') || text.includes('빡빡') || text.includes('바쁘게') || text.includes('packed') || text.includes('busy') || text.includes('tight')) {
    state.regenConfig.packed = true;
  }
  
  if (text.includes('쇼핑 제외') || text.includes('쇼핑 빼') || text.includes('no shopping') || text.includes('exclude shopping') || text.includes('without shopping')) {
    state.regenConfig.excludeShopping = true;
  }
  
  if (text.includes('관광 위주') || text.includes('관광위주') || text.includes('역사') || text.includes('문화') || text.includes('culture') || text.includes('history') || text.includes('sightseeing')) {
    state.regenConfig.forceCulture = true;
  }
  
  const loader = document.getElementById('itineraryLoader');
  const content = document.getElementById('itineraryResultContent');
  if (loader && content) {
    loader.style.display = 'flex';
    content.style.display = 'none';
    const loaderText = document.querySelector('#itineraryLoader h4');
    if (loaderText) {
      loaderText.textContent = state.lang === 'ko' 
        ? `"${requestText}" 요청을 반영하여 AI가 코스를 재구성하고 있습니다...`
        : `AI is reconstructing the route reflecting "${requestText}"...`;
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
      const cityName = matchedCity ? (state.lang === 'ko' ? matchedCity.name_ko : matchedCity.name_en) : cityId;
      
      fetchWikiAttractions(cityName, cityId, state.lang)
        .then(wikiPools => {
          const itinerary = buildCourseStructure(cityId, days, filteredPrefs, cityName, wikiPools);
          
          if (state.activeCourse.lodging) {
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
                isLodging: true,
                isStart: true,
                duration: 0,
                hideDuration: true
              };
              
              const lodgingEnd = {
                name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '오늘의 모든 일정을 마치고 숙소로 복귀하여 휴식을 취합니다.',
                desc_en: 'Finish today\'s activities and return to your accommodation to rest.',
                x: lodging.x,
                y: lodging.y,
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
          showToast(state.lang === 'ko' ? '일정이 성공적으로 재조정되었습니다.' : 'Itinerary successfully adjusted.');
        })
        .catch(err => {
          console.error(err);
          const itinerary = buildCourseStructure(cityId, days, filteredPrefs, cityName, null);
          
          if (state.activeCourse.lodging) {
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
                isLodging: true,
                isStart: true,
                duration: 0,
                hideDuration: true
              };
              
              const lodgingEnd = {
                name_ko: `🏨 숙소 복귀 (${lodging.name_ko || lodging.name})`,
                name_en: `🏨 Return to Lodging (${lodging.name_en || lodging.name})`,
                desc_ko: '오늘의 모든 일정을 마치고 숙소로 복귀하여 휴식을 취합니다.',
                desc_en: 'Finish today\'s activities and return to your accommodation to rest.',
                x: lodging.x,
                y: lodging.y,
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

function updateLodgingSelector(cityId) {
  const select = document.getElementById('plannerLodging');
  if (!select) return;
  
  const prevVal = select.value;
  select.innerHTML = '';
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.setAttribute('data-i18n', 'planner_lodging_none');
  defaultOpt.textContent = state.lang === 'ko' ? '선택 안 함 (관광지에서 바로 시작)' : 'None (Start directly at attraction)';
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
      opt.textContent = state.lang === 'ko' ? name_ko : name_en;
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
        opt.textContent = state.lang === 'ko' ? cluster.name_ko : cluster.name_en;
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
        showToast(state.lang === 'ko' ? '하루에 최소 1개 이상의 일반 관광지는 있어야 합니다.' : 'You must have at least 1 attraction in a day.');
        return;
      }

      const itemToDelete = attractions[attIdx];
      const attractionsFiltered = attractions.filter((_, idx) => idx !== attIdx);
      
      dayPlan.items = attractionsFiltered;
      recalculateDayPlanTimes(dayPlan, cityId);
      
      saveToLocalStorage();
      renderItinerary(state.activeCourse);
      showToast(state.lang === 'ko' ? '장소가 삭제되었습니다.' : 'Place deleted.');
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
      showToast(state.lang === 'ko' ? '일정 순서가 변경되었습니다.' : 'Itinerary reordered.');
    });
  });
}

// Start application
window.addEventListener('DOMContentLoaded', init);
