function goToPage(pageName) {
  window.open(pageName, '_blank', 'noopener,noreferrer');
}

const MAIL_STATE_KEY = 'mvp.mail.state.v1';
const MAIL_CLICK_LOG_KEY = 'mvp.mail.clickLog.v1';
const MAIL_DEFAULT_STATE = {
  unread: ['red-mail', 'qq-official', 'pdd-ad'],
  activeMailId: null
};

let mailState = loadMailState();

function readSessionJSON(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeSessionJSON(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function loadMailState() {
  try {
    const parsed = readSessionJSON(MAIL_STATE_KEY);
    if (!parsed) return { ...MAIL_DEFAULT_STATE };
    return {
      unread: Array.isArray(parsed.unread) ? parsed.unread : [...MAIL_DEFAULT_STATE.unread],
      activeMailId: typeof parsed.activeMailId === 'string' ? parsed.activeMailId : null
    };
  } catch (error) {
    return { ...MAIL_DEFAULT_STATE };
  }
}

function saveMailState() {
  writeSessionJSON(MAIL_STATE_KEY, mailState);
}

function recordMailClick(action, payload = {}) {
  try {
    const logs = readSessionJSON(MAIL_CLICK_LOG_KEY) || [];
    logs.push({
      action,
      payload,
      timestamp: new Date().toISOString()
    });
    const trimmed = logs.slice(-500);
    writeSessionJSON(MAIL_CLICK_LOG_KEY, trimmed);
  } catch (error) {
    // Ignore logging failures to avoid interrupting page behavior.
  }
}

function applyMailListState() {
  const mailItems = document.querySelectorAll('.mail-item');
  mailItems.forEach((item) => {
    const mailId = item.dataset.mailId;
    const isUnread = mailState.unread.includes(mailId);
    const isActive = mailState.activeMailId === mailId;
    item.classList.toggle('unread', isUnread);
    item.classList.toggle('active-item', isActive);
  });
}

function renderMailDetail(mailId) {
  const mail = mails[mailId];
  const detail = document.getElementById('mail-detail');
  if (!mail || !detail) return;

  detail.innerHTML = `
    <div class="detail-header">
      <h1 class="detail-title ${mail.danger ? 'danger' : ''}">
        ${mail.title}
      </h1>

      <div class="detail-meta">
        发件人：${mail.from}<br>
        收件人：${mail.to}<br>
        时间：${mail.time}
      </div>
    </div>

    <div class="detail-content">
      ${mail.content}
    </div>
  `;
}

function initializeMailPageState() {
  applyMailListState();
  if (mailState.activeMailId && mails[mailState.activeMailId]) {
    renderMailDetail(mailState.activeMailId);
  }
}

function setupMailClickTracking() {
  document.addEventListener('click', (event) => {
    const mailItem = event.target.closest('.mail-item');
    if (mailItem) {
      return;
    }

    const button = event.target.closest('button');
    if (button) {
      const label = button.getAttribute('aria-label') || button.textContent.trim();
      recordMailClick('button_click', { label });
      return;
    }

    const clickable = event.target.closest('a, .folder, .small-btn, .compose-btn');
    if (clickable) {
      const label = clickable.textContent.trim();
      recordMailClick('ui_click', { label });
    }
  });
}

function closeCurrentPage() {
  recordMailClick('close_page');
  window.location.href = 'desktop.html';
}

const mails = {
  "red-mail": {
        title: "不要相信警方的结论</span>",
        from: "mysterious@shadow.net",
        to: "user@qq.com",
        time: "今天 00:01",
        content: `
            <p>这不是什么玩笑。</p>

            <p>我的名字叫丁华，我是一名记者，正在追踪一系列失踪案与死亡疑点。</p>

            <p>写这封邮件是因为我发现了一些不寻常的迹象，你哥哥的死亡很可能和我调查的案件有关。</p>

            <p>我手里掌握了一些线索，还有一些疑点。若你愿意配合，我建议你尽快联系我。</p>

            <p>具体信息请添加微信：<strong>DingHua_101</strong></p>
            <p style="color:#b00000; font-weight:700;">这是我唯一留下的联络方式。</p>

            <div class="warning-box">
              记住：不要把这件事当成普通阴谋。<br>
              你越早行动，越可能找到真相。
            </div>
        `
},

  "qq-official": {
    title: "QQ邮箱官方团队",
    from: "mailteam@qq.com",
    to: "user@qq.com",
    time: "今天 09:21",
    danger: false,
    content: `
      <p>亲爱的用户：</p>

      <p>你的 QQ 邮箱近期登录状态正常。为了保障账号安全，请不要向陌生人透露验证码、密码或安全问题答案。</p>

      <p>如发现异常登录，请及时修改密码。</p>

      <p class="fake-link">查看安全中心</p>

      <p style="color:#999;">这个按钮没有反应。它只是普通邮件的一部分。</p>
    `
  },

  "pdd-ad": {
    title: "拼多多优惠精选",
    from: "promotion@pdd.example",
    to: "user@qq.com",
    time: "今天 18:40",
    danger: false,
    content: `
      <p>你可能感兴趣的商品正在限时优惠。</p>

      <div class="ad-box">
        今日推荐：<br>
        1. 无线耳机限时补贴<br>
        2. 游戏键盘满减优惠<br>
        3. 生活用品新人专享价
      </div>

      <p class="fake-link">点击查看优惠</p>

      <p style="color:#999;">广告链接已经失效。</p>
    `
  },

  "spam-mail": {
    title: "未知发件人",
    from: "lucky_prize@unknown.example",
    to: "user@qq.com",
    time: "今天 07:03",
    danger: false,
    content: `
      <p>恭喜你获得神秘大奖！</p>

      <div class="spam-box">
        请立即点击链接领取你的奖励。<br>
        奖励将在 5 分钟后失效。
      </div>

      <p class="fake-link">立即领取</p>

      <p style="color:#999;">明显是垃圾邮件。最好别信。</p>
    `
  }
};

function openMail(mailId) {
  if (!mails[mailId]) return;

  mailState.activeMailId = mailId;
  mailState.unread = mailState.unread.filter((id) => id !== mailId);
  saveMailState();
  applyMailListState();
  renderMailDetail(mailId);
  recordMailClick('open_mail', { mailId });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMailPageState();
  setupMailClickTracking();
});