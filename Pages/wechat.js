// ===== 应用状态 =====
const appState = {
  currentSection: 'chat',
  activeChatId: 'mom',
  reporterAdded: false,
  searchQuery: '',
  unreadCount: 0
};

// ===== 联系人数据 =====
const contacts = [
  {
    id: 'mom',
    name: '妈妈',
    avatar: '妈',
    weChat: 'mom_wechat',
    region: '中国',
    signature: '花开朵朵红',
    lastMessage: '妈，别再一个人胡思乱想了。哥肯定也不希望你一直这样。我明天就回去了，到家以后我陪你。',
    lastTime: '今天 20:15',
    messages: [
      { sender: 'them', text: '亲爱的，我听说了...这一切真的很难接受', time: '今天 19:30' },
      { sender: 'me', text: '妈妈，我在这边。一切都会好的。', time: '今天 19:31' },
      { sender: 'them', text: '你要保重身体啊，妈妈很担心你', time: '今天 19:32' },
      { sender: 'me', text: '我没事。妈妈，哥哥的事已经过去了，他也会好好生活的。我们都要往前看。', time: '今天 19:35' },
      { sender: 'them', text: '嗯...妈妈知道了。你也要好好照顾自己，别太难过。', time: '今天 20:05' },
      { sender: 'me', text: '嗯。最近在忙什么呢？', time: '今天 20:08' },
      { sender: 'them', text: '就是在家，心里还是有些乱。有时候一个人坐着就开始想', time: '今天 20:10' },
      { sender: 'them', text: '特别是晚上，就会想起他', time: '今天 20:11' },
      { sender: 'me', text: '妈，我理解你的感受。但是你要相信，时间会慢慢抚平一切的', time: '今天 20:13' },
      { sender: 'me', text: '妈，别再一个人胡思乱想了。哥肯定也不希望你一直这样。我明天就回去了，到家以后我陪你。', time: '今天 20:15' }
    ]
  },
  {
    id: 'dad',
    name: '爸爸',
    avatar: '爸',
    weChat: 'dad_wechat',
    region: '中国',
    signature: '人生如梦',
    lastMessage: '知道了。你路上注意安全，到机场给我发消息。',
    lastTime: '今天 18:45',
    messages: [
      { sender: 'them', text: '警方那边今天给了最后通知，案子已经结了。', time: '今天 18:20' },
      { sender: 'them', text: '认定为意外，咱们也别再折腾了。', time: '今天 18:22' },
      { sender: 'me', text: '好，我知道了。', time: '今天 18:25' },
      { sender: 'me', text: '我机票已经订好了，明天回去。', time: '今天 18:30' },
      { sender: 'them', text: '好的，这样也好。', time: '今天 18:32' },
      { sender: 'me', text: '这两天你多陪陪妈，她嘴上不说，心里肯定还是过不去。', time: '今天 18:38' },
      { sender: 'them', text: '我明白。已经在家里陪她了，试着转移一下她的注意力。', time: '今天 18:40' },
      { sender: 'them', text: '你路上注意安全，到机场给我发消息。', time: '今天 18:45' }
    ]
  },
  {
    id: 'brother',
    name: '哥哥',
    avatar: '哥',
    weChat: 'brother_wechat',
    region: '中国',
    signature: '生活继续',
    lastMessage: '行了，别担心我。我在这边一切都好。',
    lastTime: '9月24日',
    messages: [
      { sender: 'me', text: '哥，最近怎么样？在便利店怎么样？', time: '9月20日 13:45' },
      { sender: 'them', text: '还不错。今天来了不少学生，人气还可以。', time: '9月20日 14:10' },
      { sender: 'me', text: '爸爸身体还好吗？', time: '9月20日 14:15' },
      { sender: 'them', text: '还好。有我在帮忙，他轻松多了。我们分了工，我负责补货和整理。', time: '9月20日 14:25' },
      { sender: 'me', text: '辛苦你了。', time: '9月21日 10:30' },
      { sender: 'them', text: '没事，这是我应该做的。顺便说一下，我已经办好了退学的手续。', time: '9月21日 10:45' },
      { sender: 'me', text: '都处理好了？', time: '9月21日 10:50' },
      { sender: 'them', text: '嗯，学校那边也理解。现在全力在店里了。妈呢，她怎么样？', time: '9月21日 11:00' },
      { sender: 'me', text: '她有时候还是会想起来，但比之前好多了。知道你在家里陪爸，她放心不少。', time: '9月23日 19:30' },
      { sender: 'them', text: '那就好。你要好好读书，不要为家里的事情太担心。', time: '9月23日 19:45' },
      { sender: 'me', text: '嗯。你一个人在那边要照顾好自己。', time: '9月24日 18:00' },
      { sender: 'them', text: '放心吧。便利店今天生意还不错，爸也挺高兴的。', time: '9月24日 18:20' },
      { sender: 'me', text: '那就好。晚安哥。', time: '9月24日 18:30' },
      { sender: 'them', text: '行了，别担心我。我在这边一切都好。', time: '9月24日 19:15' }
    ]
  },
  {
    id: 'zeyue',
    name: '陈泽宇',
    avatar: '宇',
    weChat: 'zeyue_wechat',
    region: '美国',
    signature: '人生路还长，一起慢慢走',
    lastMessage: '别一个人硬扛，到家给我发个消息。',
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
      { sender: 'me', text: '票订好了，明天飞。家里这个样子，我还是得回去一趟。', time: '今天 17:20' },
      { sender: 'them', text: '对，你得回去。这边的东西先不用管。', time: '今天 17:22' },
      { sender: 'them', text: '课上的东西我给你留着，随时可以补。你宿舍的钥匙我有，有快递来了我帮你签收。', time: '今天 17:25' },
      { sender: 'them', text: '别一个人硬扛，到家给我发个消息。', time: '今天 17:30' }
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
  messages: [
    { sender: 'system', type: 'greeting', text: '我们已经是好友啦，快来聊天吧。', time: '今天 21:10' },
    { sender: 'system', type: 'divider', text: '以上为打招呼消息', time: '' }
  ]
};

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
    moreBtn: document.querySelector('.more-btn')
  };
}

// ===== 初始化 =====
function init() {
  initDOM();
  setupEventListeners();
  renderChatList();
  renderChatMessages();
}

// ===== 事件监听 =====
function setupEventListeners() {
  DOM.chatBtn.addEventListener('click', () => switchSection('chat'));
  DOM.contactBtn.addEventListener('click', () => switchSection('contact'));
  DOM.newFriendItem.addEventListener('click', () => switchToAddFriend());
  DOM.searchFriendBtn.addEventListener('click', () => searchReporter());
  DOM.moreBtn.addEventListener('click', () => showToast('功能开发中...'));
  DOM.inputBox.addEventListener('click', () => showToast('当前无法发送消息'));
  DOM.sendBtn.addEventListener('click', () => showToast('当前无法发送消息'));
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
  
  // 处理月份和日期的情况（如 "9月24日" 或 "9月24日 14:10"）
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
    <div class="chat-avatar">${contact.avatar}</div>
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
    renderChatList();
    renderChatMessages();
  });
  
  return div;
}

// ===== 计算时间差（分钟）=====
function getMinutesDifference(time1, time2) {
  // 从时间字符串中提取小时和分钟
  // 格式: "9月20日 13:45" 或 "今天 15:30"
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
  
  DOM.chatTitle.textContent = contact.name;
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
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = contact.avatar;
        group.appendChild(avatar);
      }
      
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.textContent = msg.text;
      group.appendChild(bubble);
      
      DOM.chatMessages.appendChild(group);
    }
  });
  
  // 自动滚到底部
  setTimeout(() => {
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
  }, 0);
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
    <div class="contact-avatar">${contact.avatar}</div>
    <div class="contact-name">${contact.name}</div>
  `;
  
  div.addEventListener('click', () => {
    showContactProfile(contact);
  });
  
  return div;
}

// ===== 显示联系人资料卡 =====
function showContactProfile(contact) {
  DOM.chatView.classList.add('hidden');
  DOM.profileView.classList.remove('hidden');
  DOM.addFriendView.classList.add('hidden');
  
  DOM.profileCard.innerHTML = `
    <div class="profile-avatar">${contact.avatar}</div>
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
}

// ===== 搜索记者 =====
function searchReporter() {
  const query = DOM.addFriendInput.value.trim().replace(/\s+/g, '').toLowerCase();
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
        <div class="profile-avatar">丁</div>
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
  
  appState.reporterAdded = true;
  appState.unreadCount = 1;
  appState.activeChatId = 'outqianyiding';
  
  // 重新渲染搜索结果
  searchReporter();
  
  // 自动切换回聊天视图，显示记者对话
  setTimeout(() => {
    switchSection('chat');
    renderChatList();
    renderChatMessages();
  }, 300);
  
  showToast('添加成功');
}

// ===== 获取当前激活的联系人 =====
function getActiveContact() {
  if (appState.reporterAdded && appState.activeChatId === 'outqianyiding') {
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
