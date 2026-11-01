# Kết quả kiểm tra Buổi 7

Ngày kiểm tra: 31/10/2026. Môi trường: Windows, Node.js v24.12.0, Expo web và json-server.

## Kiểm tra tự động

- `npm run typecheck`: đạt, TypeScript strict không có lỗi.
- `npm test`: đạt 5/5 nhóm kiểm thử, không có ca thất bại.
- Các nhóm bao phủ tìm kiếm tiếng Việt không dấu, tên/tác giả, trường hợp rỗng, lọc AND, ranh giới giá 100.000/300.000, tính bất biến Redux, gộp sách, giới hạn tồn kho, tổng tiền, xóa giỏ, xác thực giả lập và bật/tắt yêu thích.

## Kiểm tra thao tác bản web

| Tình huống | Kết quả |
| --- | --- |
| Home gọi API | Hiện đủ 12 sách, 5 danh mục |
| Tìm `nha gia` | Chỉ còn Nhà Giả Kim sau debounce |
| Từ khóa không khớp | Hiện Không tìm thấy sách phù hợp và Xóa bộ lọc |
| Mở Chi tiết từ Home | Đúng Clean Code, giá 389.000 đ, tồn kho 5 |
| Yêu thích | Chuyển từ ♡ sang ♥ |
| Nhấn thêm Clean Code 7 lần | Giỏ chỉ có một dòng x5, badge 5 |
| Tổng tiền giỏ | 389.000 × 5 = 1.945.000 đ |
| Thanh toán | Hiển thị đúng 1.945.000 đ nhận qua params |
| Đăng nhập thử | Hiện Học viên Demo, demo@bookstore.vn |
| Đăng xuất | Trở về Bạn chưa đăng nhập |
| Chọn Lập trình trong Danh mục | Về Home, chọn chip Lập trình |
| Lập trình + react + trên 300k | Chỉ còn React Native in Action, 320.000 đ |
| Giá tăng dần | Bắt đầu bằng Lão Hạc 45.000 đ, Dế Mèn 65.000 đ |
| Tắt thật json-server rồi tải lại | Hiện lỗi kết nối tiếng Việt và Thử lại |
| Khởi động lại json-server, nhấn Thử lại | Sách và danh mục tải lại thành công |

Ảnh minh chứng được chụp từ bản web chạy thực tế trong [screenshots](./screenshots/); ảnh giao diện mẫu của đề vẫn nằm riêng trong [ui](./ui/).

Chưa kiểm tra trên điện thoại thật hoặc emulator. Đăng nhập và màn Thanh toán giữ phạm vi giả lập của Buổi 7; chưa có đặt đơn hoặc thanh toán trực tuyến.
