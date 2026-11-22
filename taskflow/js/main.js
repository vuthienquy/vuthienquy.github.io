const STORAGE = {
  tasks: 'taskflow_tasks',
  user: 'taskflow_user',
  session: 'taskflow_session',
  contacts: 'taskflow_contacts'
};

function getJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (_) { return fallback; }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toast(message) {
  const el = document.querySelector('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

const session = getJSON(STORAGE.session, null);
const authLinks = document.querySelector('.auth-links');
if (authLinks) {
  if (session) {
    authLinks.innerHTML = `<a class="nav-auth" href="change-password.html">Đổi mật khẩu</a><a class="nav-auth primary" id="logoutBtn" href="#">Thoát</a>`;
    document.querySelector('#logoutBtn')?.addEventListener('click', event => {
      event.preventDefault();
      localStorage.removeItem(STORAGE.session);
      location.href = 'index.html';
    });
  } else {
    authLinks.innerHTML = `<a class="nav-auth" href="login.html">Đăng nhập</a><a class="nav-auth primary" href="register.html">Đăng ký</a>`;
  }
}
