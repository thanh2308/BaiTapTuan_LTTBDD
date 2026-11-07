# Kịch bản demo Buổi 9

1. Khởi động bản chạy nhanh hoặc hai terminal `npm run api` và `npm run web`.
2. Đăng nhập `demo@bookstore.vn / 123456`. Tài khoản có tên, email, SĐT và menu Đơn hàng, Thông báo, Yêu thích.
3. Home: tìm sách, mở Chi tiết, thả tim, thêm vào giỏ. Làm mới bằng nút ↻ trên web; trên native kéo danh sách xuống.
4. Giỏ: đổi số lượng; áp dụng SALE10/GIAM50K nếu muốn; Thanh toán.
5. Checkout: tên/SĐT có sẵn, thiếu địa chỉ thì nút mờ. Điền địa chỉ, chọn COD/ngân hàng rồi xác nhận; ngân hàng chỉ minh họa, không gửi tiền thật.
6. Kiểm tra thông báo thành công và giỏ rỗng. Mở Đơn hàng: đơn mới ở đầu, mở thẻ thấy sách/địa chỉ/phương thức; thử bộ lọc trạng thái.
7. Mở đơn Hoàn tất → Mua lại: về Giỏ, giá và tồn kho lấy lại từ API, số lượng không vượt tồn.
8. Tài khoản → Chỉnh sửa: thử tên rỗng/SĐT sai, rồi sửa hợp lệ và lưu. Tên đổi ngay và còn sau tải lại.
9. Thông báo: bấm thông báo chưa đọc để đổi trạng thái và mở Đơn hàng/Chi tiết sách tương ứng.
10. Tải lại app: phiên, hồ sơ, giỏ và yêu thích được giữ. Đăng xuất rồi tải lại: không tự đăng nhập.

## Demo lỗi với quy trình Expo/json-server

- Dừng json-server, gửi đơn với form hợp lệ: hiện lỗi, giỏ còn nguyên. Bật API lại rồi gửi lại.
- Khi API đang dừng, vào Đơn hàng hoặc Thông báo: thấy lỗi và Thử lại; bật API rồi nhấn Thử lại.
- Trên Home làm mới khi API lỗi: sách cũ vẫn còn, hiện thông báo không thể làm mới.

## Đặt lại dữ liệu trước khi trình bày

Dừng app/API, chép `db.seed.json` đè lên `db.json`. Nếu muốn xóa phiên/giỏ/yêu thích, xóa dữ liệu trang của bản web (hoặc bộ nhớ ứng dụng native). Không đặt lại dữ liệu trong khi máy chủ đang chạy; dùng dữ liệu mô phỏng cho bài tập.
