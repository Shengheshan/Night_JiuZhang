// ===== 应用状态 =====
const appState = {
  currentSection: 'chat',
  activeChatId: 'mom',
  reporterAdded: false,
  searchQuery: '',
  unreadCount: 0,
  reporterStoryStarted: false,
  reporterStoryIndex: 0,
  reporterDocLocked: false,
  reporterDocRead: false,
  reporterDraft: '',
  reporterMessages: [],
  reporterTyping: false
};

const WECHAT_STATE_KEY = 'mvp.wechat.state.v1';
const WECHAT_CLICK_LOG_KEY = 'mvp.wechat.clickLog.v1';

function loadWechatState() {
  try {
    const raw = localStorage.getItem(WECHAT_STATE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      if (typeof parsed.currentSection === 'string') appState.currentSection = parsed.currentSection;
      if (typeof parsed.activeChatId === 'string') appState.activeChatId = parsed.activeChatId;
      if (typeof parsed.reporterAdded === 'boolean') appState.reporterAdded = parsed.reporterAdded;
      if (typeof parsed.searchQuery === 'string') appState.searchQuery = parsed.searchQuery;
      if (typeof parsed.unreadCount === 'number') appState.unreadCount = parsed.unreadCount;
      if (typeof parsed.reporterStoryStarted === 'boolean') appState.reporterStoryStarted = parsed.reporterStoryStarted;
      if (typeof parsed.reporterStoryIndex === 'number') appState.reporterStoryIndex = parsed.reporterStoryIndex;
      if (typeof parsed.reporterDocLocked === 'boolean') appState.reporterDocLocked = parsed.reporterDocLocked;
      if (typeof parsed.reporterDocRead === 'boolean') appState.reporterDocRead = parsed.reporterDocRead;
      if (typeof parsed.reporterDraft === 'string') appState.reporterDraft = parsed.reporterDraft;
      if (Array.isArray(parsed.reporterMessages)) appState.reporterMessages = parsed.reporterMessages;
      if (typeof parsed.reporterTyping === 'boolean') appState.reporterTyping = parsed.reporterTyping;
    }
  } catch (error) {
    // Ignore corrupted local state and continue with defaults.
  }
}

function saveWechatState() {
  localStorage.setItem(WECHAT_STATE_KEY, JSON.stringify(appState));
}

function recordWechatClick(action, payload = {}) {
  try {
    const raw = localStorage.getItem(WECHAT_CLICK_LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    logs.push({
      action,
      payload,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(WECHAT_CLICK_LOG_KEY, JSON.stringify(logs.slice(-800)));
  } catch (error) {
    // Ignore logging failures to avoid interrupting interactions.
  }
}

function normalizeWechatState() {
  if (!appState.reporterAdded && appState.activeChatId === 'outqianyiding') {
    appState.activeChatId = 'mom';
  }

  if (appState.reporterStoryIndex < 0) {
    appState.reporterStoryIndex = 0;
  }
}

function closeCurrentPage() {
  recordWechatClick('close_page');
  window.location.href = 'desktop.html';
}

const AVATAR_IMAGE_BY_NAME = {
  '我': '本人头像.jpg',
  '本人': '本人头像.jpg',
  '妈妈': '妈妈头像.jpg',
  '爸爸': '爸爸头像.jpg',
  '哥哥': '哥哥头像.png',
  '陈泽宇': '陈泽宇头像.jpg',
  '出前一丁': '记者头像.jpg',
  '记者': '记者头像.jpg',
  '丁华': '记者头像.jpg'
};

const currentUser = {
  id: 'me',
  name: '我',
  avatar: '我',
  weChat: 'user_wechat'
};

function getAvatarImagePath(contact) {
  if (!contact) return '';

  const exactFile = AVATAR_IMAGE_BY_NAME[contact.name];
  if (exactFile) {
    return `../images/${exactFile}`;
  }

  const identity = `${contact.id || ''} ${contact.weChat || ''} ${contact.name || ''}`.toLowerCase();
  if (identity.includes('dinghua') || identity.includes('outqianyiding') || identity.includes('reporter') || identity.includes('记者')) {
    return '../images/记者头像.jpg';
  }

  return '';
}

function getAvatarHTML(contact, baseClass) {
  const avatarText = contact?.avatar || contact?.name?.charAt(0) || '?';
  const avatarPath = getAvatarImagePath(contact);
  const imageClass = avatarPath ? ' has-image' : '';
  const safeAlt = (contact?.name || '头像').replace(/"/g, '&quot;');

  if (avatarPath) {
    return `<div class="${baseClass}${imageClass}"><img class="avatar-image" src="${avatarPath}" alt="${safeAlt}"></div>`;
  }

  return `<div class="${baseClass}">${avatarText}</div>`;
}

function createAvatarElement(contact, baseClass) {
  const avatar = document.createElement('div');
  avatar.className = baseClass;

  const avatarPath = getAvatarImagePath(contact);
  if (avatarPath) {
    avatar.classList.add('has-image');

    const img = document.createElement('img');
    img.className = 'avatar-image';
    img.src = avatarPath;
    img.alt = contact?.name || '头像';
    img.addEventListener('error', () => {
      avatar.classList.remove('has-image');
      avatar.textContent = contact?.avatar || contact?.name?.charAt(0) || '?';
    });
    avatar.appendChild(img);
  } else {
    avatar.textContent = contact?.avatar || contact?.name?.charAt(0) || '?';
  }

  return avatar;
}

function renderCurrentUserAvatar() {
  const userAvatarEl = document.querySelector('.user-avatar');
  if (!userAvatarEl) return;

  const builtAvatar = createAvatarElement(currentUser, 'user-avatar');
  userAvatarEl.replaceWith(builtAvatar);
}

// ===== 联系人数据 =====
const contacts = [
  {
    id: 'mom',
    name: '妈妈',
    avatar: '妈',
    weChat: 'mom_wechat',
    region: '中国',
    signature: '花开朵朵红',
    lastMessage: '嗯...妈妈知道了。',
    lastTime: '今天 22:17',
    messages: [
      { sender: 'them', text: '小浩...这一切真的很难接受', time: '今天 21:30' },
      { sender: 'them', text: '我总是会想起他，想着他在便利店的样子，想着他在家里的样子', time: '今天 21:32' },
      { sender: 'them', text: '你回美国去以后要保重身体啊，妈妈很担心你' },
      { sender: 'me', text: '我没事。妈妈，哥哥的事已经过去了，他也会好好生活的。我们都要往前看。' },
      { sender: 'them', text: '嗯...妈妈知道了。' },
    ]
  },
  {
    id: 'dad',
    name: '爸爸',
    avatar: '爸',
    weChat: 'dad_wechat',
    region: '中国',
    signature: '人生如梦',
    lastMessage: '知道了。',
    lastTime: '今天 18:45',
    messages: [
      { sender: 'them', text: '警方那边今天给了最后通知，案子已经结了。', time: '今天 18:20' },
      { sender: 'them', text: '认定为意外，咱们也别再折腾了。', time: '今天 18:22' },
      { sender: 'me', text: '好，我知道了。', time: '今天 18:25' },
      { sender: 'me', text: '我机票已经订好了，明天回去。', time: '今天 18:30' },
      { sender: 'them', text: '好的，这样也好。', time: '今天 18:32' },
      { sender: 'them', text: '你今天多陪陪你妈，她嘴上不说，心里肯定还是过不去。', time: '今天 18:38' },
      { sender: 'me', text: '我明白。已经在家里陪她了，试着转移一下她的注意力。', time: '今天 18:40' },
      { sender: 'them', text: '那就好，明早到机场给我发消息。今天店里忙，我可能晚点回来，你和你妈就先睡吧，不用等我。', time: '今天 18:45' },
      { sender: 'me', text: '知道了。', time: '今天 18:45' }
    ]
  },
  {
    id: 'brother',
    name: '哥哥',
    avatar: '哥',
    weChat: 'brother_wechat',
    region: '中国',
    signature: '生活不止眼前的苟且，还有诗和远方。',
    lastMessage: '嗯，知道了。去复习吧臭小子',
    lastTime: '9月25日 19:15',
    messages: [
      { sender: 'me', text: '哥，最近怎么样？在便利店怎么样？', time: '9月20日 13:45' },
      { sender: 'them', text: '还不错。今天来了不少学生，人气还可以。', time: '9月20日 14:10' },
      { sender: 'me', text: '爸爸身体还好吗？', time: '9月20日 14:15' },
      { sender: 'them', text: '还好。有我在帮忙，他轻松多了。我们分了工，我负责补货和整理。', time: '9月20日 14:25' },
      { sender: 'me', text: '辛苦你了。', time: '9月21日 10:30' },
      { sender: 'them', text: '没事，这是我应该做的。顺便说一下，我已经办好了退学的手续。', time: '9月21日 10:45' },
      { sender: 'me', text: '都处理好了？', time: '9月21日 10:50' },
      { sender: 'them', text: '嗯，学校那边也理解。现在全力在店里了。你最近怎么样？', time: '9月21日 11:00' },
      { sender: 'me', text: '我最近挺好的，马上要期中考试，感觉复习的还可以，哈哈', time: '9月23日 19:30' },
      { sender: 'them', text: '那就好。你要好好读书，不要为家里的事情太担心。', time: '9月23日 19:45' },
      { sender: 'me', text: '嗯。你一个人在那边要照顾好自己。', time: '9月24日 18:00' },
      { sender: 'them', text: '放心吧。便利店今天生意还不错，爸也挺高兴的。', time: '9月24日 18:20' },
      { sender: 'me', text: '好嘞哥，你也注意休息', time: '9月25日 18:30' },
      { sender: 'them', text: '嗯，知道了。去复习吧臭小子', time: '9月25日 19:15' }
    ]
  },
  {
    id: 'zeyue',
    name: '陈泽宇',
    avatar: '宇',
    weChat: 'zeyue_wechat',
    region: '美国',
    signature: '大狗大狗叫叫叫',
    lastMessage: '谢谢兄弟...我知道。',
    lastTime: '今天 17:30',
    messages: [
      { sender: 'them', text: '哥们，你还好吗？最近没见你上课', time: '今天 16:30' },
      { sender: 'me', text: '嗯，家里有点急事', time: '今天 16:35' },
      { sender: 'them', text: '什么事啊？很严重吗？', time: '今天 16:37' },
      { sender: 'me', text: '...我哥出事了', time: '今天 16:40' },
      { sender: 'them', text: '啊？发生什么了？你没事吧？', time: '今天 16:42' },
      { sender: 'me', text: '警方的初步调查结果是意外。我现在心情有点乱', time: '今天 16:45' },
      { sender: 'them', text: '那真是太遗憾了。我很难受。', time: '今天 16:47' },
      { sender: 'them', text: '你别一个人扛着。有什么需要帮忙的，直接说。', time: '今天 16:50' },
      { sender: 'them', text: '我会一直在，不用硬扛。', time: '今天 16:52' },
      { sender: 'me', text: '谢谢兄弟...我知道。', time: '今天 17:10' },
    ]
  }
];

// ===== 记者联系人（初始不在列表中） =====
const reporterContact = {
  id: 'outqianyiding',
  name: '出前一丁',
  avatar: '丁',
  weChat: 'DingHua_101',
  region: '中国',
  signature: '记录事实，也记录被人遗忘的部分。',
  lastMessage: '我们已经是好友啦，快来聊天吧。',
  lastTime: '今天 21:10',
  messages: []
};

const REPORTER_BOOTSTRAP_MESSAGES = [
  { sender: 'system', type: 'greeting', text: '我们已经是好友啦，快来聊天吧。', time: '今天 21:10' },
  { sender: 'system', type: 'divider', text: '以上为打招呼消息', time: '' }
];

const REPORTER_STORY_TURNS = [
  { sender: 'them', text: '你好，是林浩对吗？' },
  { sender: 'me', text: '我是。你在邮件里说的是什么意思？什么叫我哥哥的死不是意外？' },
  { sender: 'them', text: '先自我介绍一下，我叫丁华，是九章报社的记者' },
  { sender: 'them', text: '我目前正在追踪一系列意外死亡案件。我严重怀疑，这一系列死亡案件全都不是意外，而是他杀。并且它的背后藏着一个很大的阴谋' },
  { sender: 'them', type: 'doc', text: '（发来一个文档）', fileName: '九章山异常死亡案件汇总' },
  { sender: 'them', text: '你有发现什么规律吗？' },
  { sender: 'me', text: '等一下，九章山。。。所有的人都是在九章山出事的，这是巧合吗？' },
  { sender: 'me', text: '但是据我所知，九章山本来就是未被完全开发的爬山景点，有一些爬山爱好者没做好防护，出了事，也不算很奇怪吧？' },
  { sender: 'me', text: '况且警方已经结案了，单凭这些证据，我很难相信你的话。' },
  { sender: 'them', text: '我明白这种事情很难令人相信。' },
  { sender: 'them', text: '我一开始也没有往阴谋的方向去想，只是把这些意外归咎于九章山的登山步道缺乏安全保护措施。直到今天九月。' },
  { sender: 'them', text: '田红死的当天，我正好在九章山附近，得以第一时间赶往案发现场，在警方封锁现场之前见到了尸体。' },
  { sender: 'them', text: '尸体的额头上有一个血红色的印记，看起来像某种宗教的印记。我后面问了受害者的家属，他们都不记得见过这个印记。' },
  { sender: 'them', text: '因此我推断，这个印记是受害者在登山以后才有的。' },
  { sender: 'them', text: '后面的几起案件也同理，受害人的额头都有这个印记。' },
  { sender: 'them', text: '今天我拖了个关系，偷偷溜进了九章医院太平间。你猜猜我在你哥哥的额头上发现了什么？' },
  { sender: 'them', type: 'image', text: '【图片】', imagePath: '../images/太平间尸体照片.png', alt: '太平间尸体照片' },
  { sender: 'them', text: '你别告诉我，这个印记之前就有。' },
  { sender: 'me', text: '这不可能。。。我哥哥难道真的是被人杀的？可是。。。可是为什么？警察怎么从没提过这个印记的事。。' },
  { sender: 'them', text: '凶手的作案规律，挑选受害人的规律，这个印记的含义等等，我都没有任何头绪。并且这系列案件的背后都有着层层的阻力，调查起来非常困难。' },
  { sender: 'them', text: '我只能说，不管凶手是谁，他一定都拥有很大的能量。你也注意到了，警察，法医，没有一个人说出这些异常。我不信他们都没有注意到' },
  { sender: 'me', text: '。。。。。' },
  { sender: 'me', text: '我相信你。' },
  { sender: 'me', text: '我想帮忙，想搞清楚我哥哥到底是怎么死的，为什么一定是我们家。。。' },
  { sender: 'me', text: '你找到我，肯定不单单是通知我一下这件事吧。需要我做什么？' },
  { sender: 'them', text: '我只是觉得，有必要让受害人的家属直到真相。这件事背后牵扯的势力很大，调查起来会很危险，我不想更多无辜的人被牵扯进来。' },
  { sender: 'me', text: '我不怕，我只想知道真相，为我哥哥报仇。' },
  { sender: 'them', text: '既然如此。' },
  { sender: 'them', type: 'link', text: '链接', href: 'level1.html' },
  { sender: 'them', text: '我目前唯一确定的线索，就是所有受害人生前都曾经登录过这个论坛。' },
  { sender: 'them', text: '你可以查一查，说不定能发现什么有用的线索。' },
  { sender: 'them', text: '记住，别相信任何人，尤其是官方的。' },
  { sender: 'me', text: '好的，保持联系。' }
];

function cloneReporterBootstrapMessages() {
  return REPORTER_BOOTSTRAP_MESSAGES.map((msg) => ({ ...msg }));
}

function ensureReporterStateInitialized(forceReset = false) {
  if (forceReset || !Array.isArray(appState.reporterMessages) || appState.reporterMessages.length === 0) {
    appState.reporterMessages = cloneReporterBootstrapMessages();
    if (!forceReset) {
      appState.reporterStoryStarted = false;
      appState.reporterStoryIndex = 0;
      appState.reporterDocLocked = false;
      appState.reporterDocRead = false;
      appState.reporterDraft = '';
    }
  }

  if (!appState.reporterAdded) {
    appState.reporterStoryStarted = false;
    appState.reporterStoryIndex = 0;
    appState.reporterDocLocked = false;
    appState.reporterDocRead = false;
    appState.reporterDraft = '';
    appState.reporterTyping = false;
    appState.reporterMessages = cloneReporterBootstrapMessages();
    return;
  }

  if (appState.reporterStoryIndex > REPORTER_STORY_TURNS.length) {
    appState.reporterStoryIndex = REPORTER_STORY_TURNS.length;
  }
}

function syncReporterContactFromState() {
  reporterContact.messages = appState.reporterMessages;
  const lastReal = [...reporterContact.messages].reverse().find((msg) => msg.sender === 'them' || msg.sender === 'me');
  if (lastReal) {
    reporterContact.lastMessage = lastReal.text || reporterContact.lastMessage;
    reporterContact.lastTime = lastReal.time || reporterContact.lastTime;
  }
}

function pushReporterStoryMessage(turn) {
  const message = {
    sender: turn.sender,
    text: turn.text,
    time: turn.time || ''
  };

  if (turn.type) {
    message.type = turn.type;
  }
  if (turn.fileName) {
    message.fileName = turn.fileName;
  }
  if (turn.imagePath) {
    message.imagePath = turn.imagePath;
  }
  if (turn.alt) {
    message.alt = turn.alt;
  }
  if (turn.href) {
    message.href = turn.href;
  }

  appState.reporterMessages.push(message);
}

let reporterFlowTimer = null;

function clearReporterFlowTimer() {
  if (reporterFlowTimer) {
    clearTimeout(reporterFlowTimer);
    reporterFlowTimer = null;
  }
}

function syncReporterUI() {
  syncReporterContactFromState();
  renderChatList();
  renderChatMessages();
  updateInputState();
  saveWechatState();
}

function replaceLoadingMessage(messageId, turn) {
  const index = appState.reporterMessages.findIndex((msg) => msg.id === messageId);
  if (index === -1) return;

  const resolved = {
    id: messageId,
    sender: turn.sender,
    text: turn.text,
    time: turn.time || ''
  };

  if (turn.type) resolved.type = turn.type;
  if (turn.fileName) resolved.fileName = turn.fileName;
  if (turn.imagePath) resolved.imagePath = turn.imagePath;
  if (turn.alt) resolved.alt = turn.alt;
  if (turn.href) resolved.href = turn.href;

  appState.reporterMessages[index] = resolved;
}

function advanceReporterStory() {
  if (!appState.reporterAdded) return;
  ensureReporterStateInitialized();
  clearReporterFlowTimer();

  if (!appState.reporterStoryStarted) {
    appState.reporterStoryStarted = true;
  }

  if (appState.reporterDocLocked) {
    appState.reporterDraft = '';
    appState.reporterTyping = false;
    syncReporterUI();
    return;
  }

  appState.reporterTyping = false;
  appState.reporterDraft = '';
  processNextReporterTurn();
}

function processNextReporterTurn() {
  if (!appState.reporterAdded) return;

  if (appState.reporterStoryIndex >= REPORTER_STORY_TURNS.length) {
    appState.reporterDraft = '';
    appState.reporterTyping = false;
    syncReporterUI();
    return;
  }

  const turn = REPORTER_STORY_TURNS[appState.reporterStoryIndex];

  if (turn.sender === 'me') {
    appState.reporterTyping = false;
    appState.reporterDraft = turn.text;
    syncReporterUI();
    return;
  }

  appState.reporterDraft = '';

  if (turn.type === 'doc' || turn.type === 'image') {
    const loadingId = `loading-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    appState.reporterMessages.push({
      id: loadingId,
      sender: 'them',
      type: 'loading',
      loadingFor: turn.type,
      text: turn.type === 'doc' ? '文档加载中...' : '图片加载中...',
      time: turn.time || ''
    });
    appState.reporterStoryIndex += 1;
    appState.reporterTyping = false;
    syncReporterUI();

    reporterFlowTimer = setTimeout(() => {
      replaceLoadingMessage(loadingId, turn);
      if (turn.type === 'doc') {
        appState.reporterDocLocked = true;
      }
      syncReporterUI();

      if (turn.type !== 'doc') {
        processNextReporterTurn();
      }
    }, 3000);
    return;
  }

  appState.reporterTyping = true;
  syncReporterUI();

  reporterFlowTimer = setTimeout(() => {
    pushReporterStoryMessage(turn);
    appState.reporterStoryIndex += 1;
    appState.reporterTyping = false;
    syncReporterUI();
    processNextReporterTurn();
  }, 3000);
}

function isReporterChatActive() {
  return appState.reporterAdded && appState.activeChatId === 'outqianyiding';
}

function updateInputState() {
  if (!DOM.inputBox || !DOM.sendBtn) return;

  if (!isReporterChatActive()) {
    DOM.inputBox.textContent = '当前为历史聊天记录，无法发送消息';
    DOM.inputBox.setAttribute('contenteditable', 'false');
    DOM.sendBtn.disabled = true;
    DOM.sendBtn.classList.add('is-disabled');
    return;
  }

  DOM.inputBox.setAttribute('contenteditable', 'false');

  if (appState.reporterTyping) {
    DOM.inputBox.textContent = '对方正在输入中...';
    DOM.sendBtn.disabled = true;
    DOM.sendBtn.classList.add('is-disabled');
    return;
  }

  if (appState.reporterDocLocked) {
    DOM.inputBox.textContent = '请先点击丁华发来的文档并阅读到底，再继续回复';
    DOM.sendBtn.disabled = true;
    DOM.sendBtn.classList.add('is-disabled');
    return;
  }

  if (appState.reporterDraft) {
    DOM.inputBox.textContent = appState.reporterDraft;
    DOM.sendBtn.disabled = false;
    DOM.sendBtn.classList.remove('is-disabled');
    return;
  }

  DOM.inputBox.textContent = '当前没有可发送的回复';
  DOM.sendBtn.disabled = true;
  DOM.sendBtn.classList.add('is-disabled');
}

// ===== DOM元素缓存 =====
let DOM = {};

function initDOM() {
  DOM = {
    chatBtn: document.querySelector('.chat-btn'),
    contactBtn: document.querySelector('.contact-btn'),
    chatListContainer: document.getElementById('chatListContainer'),
    contactListContainer: document.getElementById('contactListContainer'),
    chatList: document.getElementById('chatList'),
    contactList: document.getElementById('contactList'),
    newFriendItem: document.getElementById('newFriendItem'),
    chatView: document.getElementById('chatView'),
    profileView: document.getElementById('profileView'),
    addFriendView: document.getElementById('addFriendView'),
    chatTitle: document.getElementById('chatTitle'),
    chatMessages: document.getElementById('chatMessages'),
    profileCard: document.getElementById('profileCard'),
    inputBox: document.getElementById('inputBox'),
    sendBtn: document.getElementById('sendBtn'),
    toast: document.getElementById('toast'),
    searchInput: document.getElementById('searchInput'),
    addFriendInput: document.getElementById('addFriendInput'),
    searchFriendBtn: document.getElementById('searchFriendBtn'),
    searchStatus: document.getElementById('searchStatus'),
    searchResultCard: document.getElementById('searchResultCard'),
    moreBtn: document.querySelector('.more-btn'),
    docModal: document.getElementById('docModal'),
    docModalMask: document.getElementById('docModalMask'),
    docModalBody: document.getElementById('docModalBody'),
    docCloseBtn: document.getElementById('docCloseBtn')
  };
}

// ===== 初始化 =====
function init() {
  loadWechatState();
  normalizeWechatState();
  ensureReporterStateInitialized();
  syncReporterContactFromState();
  initDOM();
  if (DOM.searchInput) {
    DOM.searchInput.value = appState.searchQuery || '';
  }
  if (DOM.addFriendInput) {
    DOM.addFriendInput.value = appState.searchQuery || '';
  }
  renderCurrentUserAvatar();
  setupEventListeners();
  if (appState.currentSection === 'contact') {
    switchSection('contact');
  } else if (appState.currentSection === 'add-friend') {
    switchToAddFriend();
  } else {
    switchSection('chat');
  }
  if (appState.reporterAdded) {
    advanceReporterStory();
    renderChatList();
    renderChatMessages();
  }
  updateInputState();
  saveWechatState();
}

// ===== 事件监听 =====
function setupEventListeners() {
  DOM.chatBtn.addEventListener('click', () => {
    recordWechatClick('switch_section', { section: 'chat' });
    switchSection('chat');
  });
  DOM.contactBtn.addEventListener('click', () => {
    recordWechatClick('switch_section', { section: 'contact' });
    switchSection('contact');
  });
  DOM.newFriendItem.addEventListener('click', () => {
    recordWechatClick('open_add_friend');
    switchToAddFriend();
  });
  DOM.searchFriendBtn.addEventListener('click', () => {
    recordWechatClick('search_friend', { query: (DOM.addFriendInput.value || '').trim() });
    searchReporter();
  });
  DOM.moreBtn.addEventListener('click', () => showToast('功能开发中...'));
  DOM.inputBox.addEventListener('click', () => {
    if (isReporterChatActive() && appState.reporterDraft && !appState.reporterDocLocked) {
      showToast('回复内容已自动填充，点击发送即可');
      return;
    }
    if (appState.reporterDocLocked) {
      showToast('请先阅读并关闭文档');
      return;
    }
    showToast('当前无法发送消息');
  });
  DOM.sendBtn.addEventListener('click', () => {
    sendReporterReply();
  });
  DOM.searchInput.addEventListener('input', () => {
    appState.searchQuery = DOM.searchInput.value;
    saveWechatState();
  });

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, .chat-item, .contact-item, .section-item');
    if (!target) return;

    const label = target.getAttribute('title') || target.textContent.trim();
    recordWechatClick('ui_click', { label });
  });

  if (DOM.docModalBody) {
    DOM.docModalBody.addEventListener('scroll', handleDocModalScroll);
  }
  if (DOM.docCloseBtn) {
    DOM.docCloseBtn.addEventListener('click', closeDocModalIfReady);
  }
  if (DOM.docModalMask) {
    DOM.docModalMask.addEventListener('click', () => {
      showToast('请先滑动阅读到最底部再关闭');
    });
  }
}

// ===== 切换视图区域 =====
function switchSection(section) {
  appState.currentSection = section;
  
  // 更新导航按钮状态
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (section === 'chat') {
    DOM.chatBtn.classList.add('active');
    DOM.chatListContainer.classList.remove('hidden');
    DOM.contactListContainer.classList.add('hidden');
    DOM.chatView.classList.remove('hidden');
    DOM.profileView.classList.add('hidden');
    DOM.addFriendView.classList.add('hidden');
    renderChatList();
    renderChatMessages();
  } else if (section === 'contact') {
    DOM.contactBtn.classList.add('active');
    DOM.chatListContainer.classList.add('hidden');
    DOM.contactListContainer.classList.remove('hidden');
    DOM.chatView.classList.remove('hidden');
    DOM.profileView.classList.add('hidden');
    DOM.addFriendView.classList.add('hidden');
    renderContactList();
  }

  updateInputState();
  saveWechatState();
}

// ===== 切换到添加好友 =====
function switchToAddFriend() {
  appState.currentSection = 'add-friend';
  DOM.chatListContainer.classList.add('hidden');
  DOM.contactListContainer.classList.add('hidden');
  DOM.chatView.classList.add('hidden');
  DOM.profileView.classList.add('hidden');
  DOM.addFriendView.classList.remove('hidden');
  DOM.addFriendInput.value = '';
  DOM.searchStatus.textContent = '';
  DOM.searchResultCard.innerHTML = '';
  updateInputState();
  saveWechatState();
}

function sendReporterReply() {
  if (!isReporterChatActive()) {
    showToast('当前无法发送消息');
    return;
  }

  if (appState.reporterDocLocked) {
    showToast('请先阅读并关闭文档');
    return;
  }

  const currentTurn = REPORTER_STORY_TURNS[appState.reporterStoryIndex];
  if (!currentTurn || currentTurn.sender !== 'me') {
    showToast('当前没有可发送的回复');
    return;
  }

  pushReporterStoryMessage(currentTurn);
  appState.reporterStoryIndex += 1;
  appState.reporterDraft = '';
  recordWechatClick('send_reporter_reply', { text: currentTurn.text });

  syncReporterUI();
  processNextReporterTurn();
}

function openDocModal() {
  if (!DOM.docModal) return;

  DOM.docModal.classList.remove('hidden');
  if (DOM.docCloseBtn) {
    DOM.docCloseBtn.disabled = !appState.reporterDocRead;
  }
  handleDocModalScroll();
}

function handleDocModalScroll() {
  if (!DOM.docModalBody || !DOM.docCloseBtn) return;

  const nearBottom = DOM.docModalBody.scrollTop + DOM.docModalBody.clientHeight >= DOM.docModalBody.scrollHeight - 6;
  if (nearBottom) {
    appState.reporterDocRead = true;
    DOM.docCloseBtn.disabled = false;
    saveWechatState();
  }
}

function closeDocModalIfReady() {
  if (!appState.reporterDocRead) {
    showToast('请先滑动阅读到最底部');
    return;
  }

  if (DOM.docModal) {
    DOM.docModal.classList.add('hidden');
  }

  appState.reporterDocLocked = false;
  recordWechatClick('close_reporter_doc');
  advanceReporterStory();
  renderChatList();
  renderChatMessages();
  updateInputState();
  saveWechatState();
}

// ===== 渲染聊天列表 =====
// ===== 时间排序辅助函数 =====
function parseTimeForSort(timeStr) {
  // 返回一个可以用于排序的数值，数值越大越新
  if (!timeStr) return 0;
  
  // 处理"今天"的情况
  if (timeStr.includes('今天')) {
    return 1000000 + parseInt(timeStr.match(/(\d{1,2}):(\d{2})/)?.[1] || 0) * 100 + parseInt(timeStr.match(/(\d{1,2}):(\d{2})/)?.[2] || 0);
  }
  
  // 处理月份和日期的情况（如 "10月12日" 或 "10月12日 14:10"）
  const monthMatch = timeStr.match(/(\d{1,2})月/);
  const dayMatch = timeStr.match(/(\d{1,2})日/);
  const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
  
  if (monthMatch && dayMatch) {
    const month = parseInt(monthMatch[1]);
    const day = parseInt(dayMatch[1]);
    const hour = timeMatch ? parseInt(timeMatch[1]) : 0;
    const minute = timeMatch ? parseInt(timeMatch[2]) : 0;
    
    // 构建一个可比较的数值：月份*100000 + 日期*1000 + 小时*60 + 分钟
    return month * 100000 + day * 1000 + hour * 60 + minute;
  }
  
  return 0;
}

// ===== 渲染聊天列表 =====
function renderChatList() {
  DOM.chatList.innerHTML = '';
  
  // 如果记者已添加，添加到列表最前面
  if (appState.reporterAdded) {
    const reporterItem = createChatItem(reporterContact);
    DOM.chatList.appendChild(reporterItem);
  }
  
  // 按最后消息时间排序其他联系人
  const sortedContacts = [...contacts].sort((a, b) => {
    const timeA = parseTimeForSort(a.lastTime);
    const timeB = parseTimeForSort(b.lastTime);
    return timeB - timeA; // 从新到旧排序
  });
  
  // 添加其他联系人
  sortedContacts.forEach(contact => {
    const item = createChatItem(contact);
    DOM.chatList.appendChild(item);
  });
}

// ===== 创建聊天项 =====
function createChatItem(contact) {
  const div = document.createElement('div');
  div.className = 'chat-item' + (contact.id === appState.activeChatId ? ' active' : '');
  if (contact.id === 'outqianyiding' && appState.unreadCount > 0) {
    div.classList.add('unread');
    div.setAttribute('data-unread', appState.unreadCount);
  }
  
  div.innerHTML = `
    ${getAvatarHTML(contact, 'chat-avatar')}
    <div class="chat-info">
      <div class="chat-header">
        <div class="chat-name">${contact.name}</div>
        <div class="chat-time">${contact.lastTime}</div>
      </div>
      <div class="chat-preview">${contact.lastMessage}</div>
    </div>
  `;
  
  div.addEventListener('click', () => {
    appState.activeChatId = contact.id;
    if (contact.id === 'outqianyiding' && appState.unreadCount > 0) {
      appState.unreadCount = 0;
    }
    recordWechatClick('open_chat', { chatId: contact.id, name: contact.name });
    saveWechatState();
    renderChatList();
    renderChatMessages();
  });
  
  return div;
}

// ===== 计算时间差（分钟）=====
function getMinutesDifference(time1, time2) {
  // 从时间字符串中提取小时和分钟
  // 格式: "10月12日 13:45" 或 "今天 15:30"
  const extractTime = (timeStr) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 0;
  };
  
  const minutes1 = extractTime(time1);
  const minutes2 = extractTime(time2);
  
  return Math.abs(minutes1 - minutes2);
}

// ===== 渲染聊天消息 =====
function renderChatMessages() {
  const contact = getActiveContact();
  if (!contact) return;

  if (contact.id === 'outqianyiding') {
    syncReporterContactFromState();
  }

  DOM.chatTitle.textContent = (isReporterChatActive() && appState.reporterTyping)
    ? '对方正在输入中...'
    : contact.name;
  DOM.chatMessages.innerHTML = '';
  
  let lastDisplayedTime = '';
  contact.messages.forEach((msg, index) => {
    // 时间分隔符 - 只有当相隔超过5分钟时才显示
    if (msg.time && msg.type !== 'divider' && msg.type !== 'greeting') {
      let shouldShowTime = false;
      
      if (!lastDisplayedTime) {
        // 第一条消息显示时间
        shouldShowTime = true;
      } else if (msg.time !== lastDisplayedTime) {
        // 查找上一条非divider消息的时间
        for (let i = index - 1; i >= 0; i--) {
          if (contact.messages[i].type !== 'divider' && contact.messages[i].type !== 'greeting') {
            const prevMsg = contact.messages[i];
            if (getMinutesDifference(prevMsg.time, msg.time) > 5) {
              shouldShowTime = true;
            }
            break;
          }
        }
      }
      
      if (shouldShowTime) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time-divider';
        timeDiv.textContent = msg.time;
        DOM.chatMessages.appendChild(timeDiv);
        lastDisplayedTime = msg.time;
      }
    }
    
    if (msg.type === 'greeting') {
      const greeting = document.createElement('div');
      greeting.className = 'message-system';
      greeting.textContent = msg.text;
      DOM.chatMessages.appendChild(greeting);
    } else if (msg.type === 'divider') {
      const divider = document.createElement('div');
      divider.className = 'message-divider-line';
      divider.innerHTML = `<span>${msg.text}</span>`;
      DOM.chatMessages.appendChild(divider);
    } else {
      const group = document.createElement('div');
      group.className = 'message-group' + (msg.sender === 'me' ? ' me' : '');

      if (msg.sender !== 'me') {
        const avatar = createAvatarElement(contact, 'message-avatar');
        group.appendChild(avatar);
      }
      
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';

      if (msg.type === 'doc') {
        bubble.classList.add('doc-bubble');
        bubble.textContent = `${msg.text} ${msg.fileName ? ` ${msg.fileName}` : ''}`.trim();
        bubble.addEventListener('click', () => {
          recordWechatClick('open_reporter_doc');
          openDocModal();
        });
      } else if (msg.type === 'image') {
        bubble.classList.add('image-bubble');
        const img = document.createElement('img');
        img.className = 'chat-photo';
        img.src = msg.imagePath;
        img.alt = msg.alt || '图片';
        bubble.appendChild(img);
      } else if (msg.type === 'loading') {
        bubble.classList.add('loading-bubble');
        bubble.innerHTML = '<span class="loading-spinner" aria-hidden="true"></span><span>加载中...</span>';
      } else if (msg.type === 'link') {
        bubble.classList.add('link-bubble');
        bubble.textContent = msg.text;
        bubble.style.cursor = 'pointer';
        bubble.style.textDecoration = 'underline';
        bubble.addEventListener('click', () => {
          recordWechatClick('open_reporter_link', { href: msg.href || 'level1.html' });
          window.location.href = msg.href || 'level1.html';
        });
      } else {
        bubble.textContent = msg.text;
      }
      group.appendChild(bubble);

      if (msg.sender === 'me') {
        const myAvatar = createAvatarElement(currentUser, 'message-avatar');
        group.appendChild(myAvatar);
      }
      
      DOM.chatMessages.appendChild(group);
    }
  });
  
  // 自动滚到底部
  setTimeout(() => {
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
  }, 0);

  updateInputState();
}

// ===== 渲染联系人列表 =====
function renderContactList() {
  DOM.contactList.innerHTML = '';
  
  // 添加记者（如果已添加）
  if (appState.reporterAdded) {
    const reporterItem = createContactItem(reporterContact);
    DOM.contactList.appendChild(reporterItem);
  }
  
  // 按照A-Z分组
  const grouped = {};
  contacts.forEach(contact => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(contact);
  });
  
  const sortedKeys = Object.keys(grouped).sort();
  sortedKeys.forEach(letter => {
    grouped[letter].forEach(contact => {
      const item = createContactItem(contact);
      DOM.contactList.appendChild(item);
    });
  });
}

// ===== 创建联系人项 =====
function createContactItem(contact) {
  const div = document.createElement('div');
  div.className = 'contact-item';
  div.innerHTML = `
    ${getAvatarHTML(contact, 'contact-avatar')}
    <div class="contact-name">${contact.name}</div>
  `;
  
  div.addEventListener('click', () => {
    showContactProfile(contact);
  });
  
  return div;
}

// ===== 显示联系人资料卡 =====
function showContactProfile(contact) {
  appState.currentSection = 'profile';
  appState.activeChatId = contact.id;
  recordWechatClick('open_profile', { contactId: contact.id, name: contact.name });
  saveWechatState();

  DOM.chatView.classList.add('hidden');
  DOM.profileView.classList.remove('hidden');
  DOM.addFriendView.classList.add('hidden');
  
  DOM.profileCard.innerHTML = `
    ${getAvatarHTML(contact, 'profile-avatar')}
    <div class="profile-name">${contact.name}</div>
    <div class="profile-info">微信号: ${contact.weChat}</div>
    <div class="profile-info">地区: ${contact.region}</div>
    <div class="profile-signature">${contact.signature}</div>
    <div class="profile-actions">
      <button class="profile-btn primary" onclick="switchToChatFromProfile('${contact.id}')">发消息</button>
    </div>
  `;
}

// ===== 从资料卡回到聊天 =====
function switchToChatFromProfile(contactId) {
  appState.activeChatId = contactId;
  appState.currentSection = 'chat';
  recordWechatClick('chat_from_profile', { contactId });
  
  // 更新导航按钮状态
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  DOM.chatBtn.classList.add('active');
  
  DOM.chatListContainer.classList.remove('hidden');
  DOM.contactListContainer.classList.add('hidden');
  DOM.chatView.classList.remove('hidden');
  DOM.profileView.classList.add('hidden');
  DOM.addFriendView.classList.add('hidden');
  renderChatList();
  renderChatMessages();
  saveWechatState();
}

// ===== 搜索记者 =====
function searchReporter() {
  const query = DOM.addFriendInput.value.trim().replace(/\s+/g, '').toLowerCase();
  appState.searchQuery = DOM.addFriendInput.value.trim();
  saveWechatState();
  DOM.searchStatus.textContent = '';
  DOM.searchResultCard.innerHTML = '';
  
  if (!query) {
    DOM.searchStatus.textContent = '请输入微信号或手机号';
    return;
  }
  
  const reporterWeChat = reporterContact.weChat.toLowerCase().replace(/\s+/g, '');
  if (query === reporterWeChat) {
    DOM.searchResultCard.innerHTML = `
      <div class="profile-card">
        ${getAvatarHTML(reporterContact, 'profile-avatar')}
        <div class="profile-name">${reporterContact.name}</div>
        <div class="profile-info">微信号: ${reporterContact.weChat}</div>
        <div class="profile-info">地区: ${reporterContact.region}</div>
        <div class="profile-signature">${reporterContact.signature}</div>
        <div class="profile-actions">
          ${appState.reporterAdded ? 
            '<button class="profile-btn" disabled>已添加</button>' :
            '<button class="profile-btn primary" onclick="addReporter()">添加到通讯录</button>'
          }
        </div>
      </div>
    `;
  } else {
    DOM.searchStatus.textContent = '没有找到该用户';
  }
}

// ===== 添加记者 =====
function addReporter() {
  if (appState.reporterAdded) {
    showToast('已经添加过了');
    return;
  }
  
  ensureReporterStateInitialized(true);
  appState.reporterAdded = true;
  appState.unreadCount = 1;
  appState.activeChatId = 'outqianyiding';
  appState.currentSection = 'chat';
  appState.reporterStoryStarted = false;
  appState.reporterStoryIndex = 0;
  appState.reporterDocLocked = false;
  appState.reporterDocRead = false;
  appState.reporterDraft = '';
  appState.reporterMessages = cloneReporterBootstrapMessages();
  recordWechatClick('add_reporter', { weChat: reporterContact.weChat });
  advanceReporterStory();
  saveWechatState();
  
  // 重新渲染搜索结果
  searchReporter();
  
  // 自动切换回聊天视图，显示记者对话
  setTimeout(() => {
    switchSection('chat');
    renderChatList();
    renderChatMessages();
    updateInputState();
  }, 300);
  
  showToast('添加成功');
}

// ===== 获取当前激活的联系人 =====
function getActiveContact() {
  if (appState.reporterAdded && appState.activeChatId === 'outqianyiding') {
    syncReporterContactFromState();
    return reporterContact;
  }
  return contacts.find(c => c.id === appState.activeChatId);
}

// ===== Toast提示 =====
function showToast(message, duration = 2000) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add('show');
  
  setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, duration);
}

// ===== 启动应用 =====
document.addEventListener('DOMContentLoaded', init);
