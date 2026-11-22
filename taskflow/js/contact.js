document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `[TaskFlow] ${data.get('topic')}`;
  const body = [
    `Họ tên: ${data.get('name')}`,
    `Email liên hệ: ${data.get('email')}`,
    '',
    data.get('message')
  ].join('\n');
  const mailto = `mailto:vuthienquy08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  toast('Đã mở ứng dụng email để bạn xác nhận gửi');
});
