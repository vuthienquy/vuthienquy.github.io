# COMP1802 - Bài tập và ứng dụng cá nhân

Trang chính của project là `index.html`. Ứng dụng TaskFlow nằm trong thư mục `taskflow/` và dùng HTML, CSS, JavaScript thuần.
Bài hồ cá nằm trong `ho_ca_vui_nhon/` theo cấu trúc `Images/`, `mystyle.css` và `ho_ca.html`.
CV cá nhân cùng các tài nguyên liên quan nằm trong `CV/`.

## Chạy project

Mở `index.html` trực tiếp hoặc chạy một web server tại thư mục project:

```powershell
python -m http.server 4173
```

Sau đó truy cập `http://localhost:4173`.

- Trang chính: `http://localhost:4173/`
- Bài hồ cá: `http://localhost:4173/ho_ca_vui_nhon/ho_ca.html`
- CV cá nhân: `http://localhost:4173/CV/cv.html`
- TaskFlow: `http://localhost:4173/taskflow/`

## Tính năng

- CRUD công việc
- Tìm kiếm và lọc công việc
- Lưu dữ liệu bằng localStorage
- Đăng ký, đăng nhập và đổi mật khẩu giả lập
- Form liên hệ/góp ý
- Giao diện responsive
- Giao diện lấy cảm hứng từ Windows XP trên trang chính, TaskFlow, bài hồ cá và CV
- Animation và thông báo tương tác
- Hoạt cảnh hồ cá với các sinh vật chuyển động, 4 cảnh nền luân phiên và nút bật/tắt giai điệu nền
- CV cá nhân theo bố cục hai cột 40/60, có thể in hoặc lưu thành PDF
