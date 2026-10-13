// Khởi tạo ứng dụng Vue 3 (nhúng qua CDN, không cần Node.js/npm).
// Vue.global.js cung cấp đối tượng toàn cục "Vue".
const app = Vue.createApp({

  // data(): trạng thái (state) của ứng dụng. Khi các biến này đổi, UI tự cập nhật (reactivity).
  data() {
    return {
      tuKhoa: '', // liên kết 2 chiều với ô tìm kiếm qua v-model
      cart: [],   // mảng sản phẩm trong giỏ
      products: [
        { id: 1, ten: 'Electric Blue Case',   gia: 250000, anh: '../images/case-blue.svg',     moTa: 'Ốp lưng silicon xanh điện, chống sốc.' },
        { id: 2, ten: 'Clear Silver Case',    gia: 220000, anh: '../images/case-silver.svg',   moTa: 'Ốp trong suốt viền bạc, giữ màu máy.' },
        { id: 3, ten: 'Wireless Charger Pad', gia: 250000, anh: '../images/charger-pad.svg',   moTa: 'Đế sạc không dây 15W, sạc nhanh.' },
        { id: 4, ten: 'Active TWS Earbuds',   gia: 450000, anh: '../images/earbuds.svg',       moTa: 'Tai nghe true wireless, pin 24 giờ.' },
        { id: 5, ten: 'Matte Black Case',     gia: 230000, anh: '../images/case-black.svg',    moTa: 'Ốp nhám đen, chống vân tay.' },
        { id: 6, ten: 'Fast USB-C Cable',     gia: 120000, anh: '../images/cable.svg',         moTa: 'Cáp USB-C bọc dù dài 1m, sạc nhanh.' },
        { id: 7, ten: 'Power Bank 10000mAh',  gia: 390000, anh: '../images/powerbank.svg',     moTa: 'Pin dự phòng mỏng nhẹ, 2 cổng ra.' },
        { id: 8, ten: 'Car Phone Holder',     gia: 150000, anh: '../images/holder.svg',        moTa: 'Giá đỡ điện thoại gắn xe hơi, xoay 360°.' }
      ]
    };
  },

  computed: {
    // cartCount: số sản phẩm trong giỏ, hiển thị ở header bằng {{ cartCount }}.
    // So sánh với Vanilla JS: nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector
    // + cập nhật DOM thủ công. Vue tự động làm điều này nhờ reactivity.
    cartCount() {
      return this.cart.length;
    },

    // tongTien: tổng giá các sản phẩm trong giỏ. Tự tính lại mỗi khi cart thay đổi.
    tongTien() {
      return this.cart.reduce((tong, sp) => tong + sp.gia, 0);
    },

    // danhSachLoc: lọc products theo tuKhoa (không phân biệt hoa thường).
    // "UI = function của data": gõ từ khoá -> tuKhoa đổi -> danh sách tự render lại.
    danhSachLoc() {
      const tk = this.tuKhoa.trim().toLowerCase();
      if (!tk) return this.products;
      return this.products.filter((sp) =>
        sp.ten.toLowerCase().includes(tk) || sp.moTa.toLowerCase().includes(tk)
      );
    }
  },

  methods: {
    // themVaoGio: đẩy sản phẩm vào mảng cart (gọi bằng @click ở nút "Thêm vào giỏ").
    // Vanilla JS cần tự tạo phần tử <li>, appendChild và cập nhật số lượng; Vue chỉ cần push.
    themVaoGio(sanPham) {
      this.cart.push(sanPham);
    },

    // xoaKhoiGio: xoá sản phẩm tại vị trí index khỏi giỏ (gọi bằng @click ở nút xoá).
    // Chỉ cần splice mảng, giao diện (danh sách, tổng tiền, số lượng) tự cập nhật.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },

    // dinhDangGia: định dạng số thành tiền VND, ví dụ 250000 -> "250,000 VND".
    dinhDangGia(so) {
      return so.toLocaleString('en-US') + ' VND';
    }
  }
});

// Gắn ứng dụng vào <div id="app"> trong index.html
app.mount('#app');
