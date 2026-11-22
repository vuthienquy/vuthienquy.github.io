const registerForm = document.querySelector('#registerForm');
if (registerForm) registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#regName').value.trim();
  const email = document.querySelector('#regEmail').value.trim().toLowerCase();
  const password = document.querySelector('#regPassword').value;
  const confirm = document.querySelector('#regConfirm').value;
  if (password !== confirm) return toast('Mật khẩu xác nhận không khớp');
  if (getJSON(STORAGE.user, null)?.email === email) return toast('Email đã được đăng ký');
  setJSON(STORAGE.user, {name, email, password});
  setJSON(STORAGE.session, {name, email});
  toast('Đăng ký thành công');
  setTimeout(() => location.href = 'index.html', 700);
});

const loginForm = document.querySelector('#loginForm');
if (loginForm) loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#loginEmail').value.trim().toLowerCase();
  const password = document.querySelector('#loginPassword').value;
  const user = getJSON(STORAGE.user, null);
  if (!user || user.email !== email || user.password !== password) return toast('Email hoặc mật khẩu không đúng');
  setJSON(STORAGE.session, {name:user.name, email:user.email});
  toast('Đăng nhập thành công');
  setTimeout(() => location.href = 'index.html', 700);
});

const changeForm = document.querySelector('#changePasswordForm');
if (changeForm) changeForm.addEventListener('submit', event => {
  event.preventDefault();
  const session = getJSON(STORAGE.session, null);
  if (!session) return toast('Vui lòng đăng nhập trước');
  const oldPassword = document.querySelector('#oldPassword').value;
  const newPassword = document.querySelector('#newPassword').value;
  const confirm = document.querySelector('#confirmNewPassword').value;
  const user = getJSON(STORAGE.user, null);
  if (!user || user.password !== oldPassword) return toast('Mật khẩu hiện tại không đúng');
  if (newPassword !== confirm) return toast('Mật khẩu xác nhận không khớp');
  setJSON(STORAGE.user, {...user, password:newPassword});
  toast('Đổi mật khẩu thành công');
  event.currentTarget.reset();
});
