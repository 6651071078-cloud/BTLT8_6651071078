// Tailwind không có sẵn hành vi JS (khác Bootstrap) nên phải tự viết:
// bấm hamburger -> bật/tắt class hidden/flex của menu di động.

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  mobileMenu.classList.toggle('flex', open);
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => {
  setMenu(mobileMenu.classList.contains('hidden'));
});

// Bấm vào một link trong menu di động thì tự đóng menu
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// Phóng to màn hình lên md trở lên thì đóng menu di động để tránh lỗi hiển thị
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setMenu(false);
});

// Hiệu ứng nhỏ: form đặt bánh hiện thông báo thay vì tải lại trang
const orderForm = document.getElementById('order-form');
const orderMsg = document.getElementById('order-msg');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  orderMsg.classList.remove('hidden');
  orderForm.reset();
  setTimeout(() => orderMsg.classList.add('hidden'), 4000);
});
