# Kết quả kiểm tra Lab 06

## Đã chạy thành công

- `npm run typecheck`: không lỗi TypeScript.
- `npx expo export --platform web`: Metro tạo bundle web thành công.
- `npx expo export --platform android`: Metro/Hermes tạo bundle Android thành công. Đây không phải APK và không phải chạy emulator.
- Chromium, khung màn hình 390 × 844: mở cả 5 bài, không có lỗi JavaScript runtime.
- Bài 1: mở chọn màu, chọn đỏ, thông tin nhà cung cấp hiện ra, XONG quay lại Product với ảnh đỏ và nút CHỌN LOẠI.
- Bài 2 offline: có loading rồi hiển thị sản phẩm.
- Bài 3: chuyển Search, nhập aris, thấy Aris Pro; nhập zzz thấy thông báo rỗng; mở Profile thấy tên.
- Bài 4: mở Live 4, thấy 3.990.000 đ, lưu yêu thích, quay về Favorites mở lại được đúng sản phẩm; bỏ lưu rồi quay lại thấy danh sách rỗng.
- Bài 5: mở Drawer, chọn Cài đặt, kiểm tra mặc định BẬT/sáng; gạt hai Switch được TẮT/tối.
- Bài 2 với fetch và phản hồi được chặn/mô phỏng bằng Playwright: HTTP 503 hiện lỗi; JSON thiếu trường hiện lỗi dữ liệu; bấm THỬ LẠI gửi yêu cầu mới và hiển thị đúng tên/giá trả về. Tổng cộng ba yêu cầu, không rơi về dữ liệu offline khi API lỗi.

## Chưa xác nhận

- MockAPI thật `https://6addbf314e88f1bba4a494f8.mockapi.io/phones`: proxy cloud từ chối CONNECT HTTP 403. Đã cấu hình URL trong .env và khai báo domain trong bản nháp cấu hình môi trường. Chưa đọc được dữ liệu thực tế; không ghi/sửa dữ liệu trên API.
- Chạy trên thiết bị Android/iOS, thao tác kéo mép trái và nút Back vật lý: chưa có thiết bị/emulator để kiểm tra. Bundling Android đã qua.
- Ảnh khớp Figma: dùng 4 ảnh minh họa cục bộ, chưa có ảnh gốc từ RAR.

Các bài không có backend thanh toán, đăng nhập, giỏ hàng hoặc tính năng ngoài yêu cầu. Switch tối chỉ đổi trạng thái theo phần bắt buộc; Context đổi nền toàn app là phần nâng cao không thực hiện.
