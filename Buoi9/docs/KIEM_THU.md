# Kết quả kiểm thử Buổi 9

Ngày 07/11/2026. Môi trường: Linux, Node.js v24.22.1, Chromium headless, viewport 430 × 932.

| Kiểm tra | Kết quả |
| --- | --- |
| npm run typecheck | Đạt, TypeScript strict không lỗi |
| npm test | 8/8 nhóm đạt, không bỏ qua |
| npm run build:web | Đạt, Expo xuất bản web thành công |
| npm run test:api | Đạt với json-server thật: lọc/sắp xếp đơn, POST đơn, PATCH hồ sơ giữ email/password, GET/PATCH thông báo |
| Expo config --type public | Đạt; icon/splash/adaptiveIcon đúng đường dẫn và màu |
| Kiểm tra PNG | Icon/adaptive icon 1024×1024; splash 1284×2778, PNG hợp lệ |
| Kiểm thử trình duyệt | 31/31 tình huống đạt, không có lỗi JavaScript trình duyệt |
| Node Windows đóng gói | SHA-256 khớp SHASUMS256 chính thức của Node v24.22.1 |

## Kết quả E2E thực tế

```text
PASS 1 Home lấy đủ 12 sách
PASS 2 Làm mới Home tải lại dữ liệu API
PASS 3 Làm mới lỗi vẫn giữ danh sách cũ
PASS 4 Đăng nhập và số điện thoại tài khoản
PASS 5 Ba đơn mẫu mới nhất ở trên
PASS 6 Mở chi tiết đơn tại chỗ
PASS 7 Mở đơn khác đóng đơn trước
PASS 8 Bấm lại thu gọn
PASS 9 Lọc trạng thái hoàn tất
PASS 10 Trạng thái lọc rỗng
PASS 11 Email bị khóa
PASS 12 Hồ sơ validate dưới từng ô
PASS 13 PATCH cập nhật tài khoản, giữ mật khẩu server
PASS 14 Hồ sơ còn sau reload
PASS 15 Checkout điền sẵn thông tin mới
PASS 16 Thiếu địa chỉ khóa nút, chưa hiện lỗi đỏ
PASS 17 Số điện thoại sai khóa nút
PASS 18 Chọn chuyển khoản
PASS 19 POST lỗi giữ giỏ và báo lỗi
PASS 20 POST thành công tạo đúng đơn
PASS 21 Đặt thành công xóa giỏ và lưu giỏ rỗng
PASS 22 Đơn hàng lỗi có thử lại và đơn mới đứng đầu
PASS 23 Mua lại dùng giá mới và chặn tồn kho
PASS 24 Thông báo tải và thử lại khi lỗi
PASS 25 Đánh dấu đọc lạc quan ngay
PASS 26 PATCH lỗi hoàn lại chưa đọc
PASS 27 Thử lại lưu đã đọc trên server
PASS 28 Thông báo mở Đơn hàng
PASS 29 Thông báo mở đúng Chi tiết sách
PASS 30 User mới không thấy đơn của người khác
PASS 31 Thông báo rỗng của user mới
TOTAL 31 PASS; no browser JavaScript errors
```

E2E khởi động máy chủ đóng gói ở cổng 18090, dùng bản sao dữ liệu seed trong thư mục tạm và browser context mới, tự dọn khi xong. Lỗi POST/PATCH/GET được tạo bằng chặn/phản hồi lỗi request; dữ liệu bản giao giữ nguyên seed.

## Ảnh thực tế

- `screenshots/01-bo-loc-don-hang.png`: bộ lọc trạng thái cho câu bổ sung 5.
- `screenshots/02-ho-so.png`: thông tin sau PATCH.
- `screenshots/03-checkout-loi.png`, `screenshots/04-checkout.png`: form và lỗi đặt hàng, giữ nguyên giỏ.
- `screenshots/05-don-hang.png`: đơn mới và chi tiết mở rộng.
- `screenshots/06-thong-bao.png`: thông báo đã/chưa đọc.

## Giới hạn

Chưa chạy launcher trên Windows hoặc Expo Go/điện thoại Android/iOS thật. Nút Làm mới trên web đã kiểm thử cùng callback dùng cho RefreshControl; động tác kéo trên native cần kiểm tra trên thiết bị. Ngân hàng chỉ là lựa chọn giao diện, thông báo không phải push thật, xác thực vẫn mô phỏng theo đề.
