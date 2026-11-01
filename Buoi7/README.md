# BookStore Buổi 7 hoàn chỉnh

Huỳnh Hoài Thanh — 23633801.

Ứng dụng Expo, React Native, TypeScript theo đề Buổi 7: điều hướng hai tầng, tab bar tự dựng, giỏ hàng và tài khoản Redux, Axios với json-server, tìm kiếm debounce 400 ms không dấu và lọc kết hợp.

## Cài đặt và chạy

Cần Node.js phù hợp với phiên bản Expo trong project.

```powershell
npm install
npm run api
```

Mở terminal thứ hai:

```powershell
npm run web
```

Chạy điện thoại: `npm start` rồi mở bằng Expo Go tương thích với SDK của project. Máy tính và điện thoại phải cùng Wi-Fi. Nếu cần chỉ định API trong PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.5:3000"
npm run start:clear
```

Thay địa chỉ ví dụ bằng IP LAN thật của máy tính. json-server lắng nghe cổng 3000 trên mọi interface; Android emulator dùng địa chỉ host phù hợp trong cấu hình API.

## Chức năng

- Native Stack: Tabs, Chi tiết sách, Thanh toán; bốn tab Home, Danh mục, Giỏ hàng, Tài khoản.
- Dữ liệu sách và danh mục lấy từ API; Home tải song song bằng Promise.all; có loading, thông báo lỗi tiếng Việt và Thử lại.
- Chi tiết nhận bookId; Thanh toán nhận tổng tiền; giỏ hàng giới hạn số lượng theo tồn kho và đồng bộ badge.
- Đăng nhập thử và đăng xuất bằng Redux; token được cấp cho Axios qua provider.
- Tìm tên sách hoặc tác giả không dấu, debounce 400 ms; lọc AND theo danh mục và giá; xóa bộ lọc và trạng thái không có kết quả.
- Chọn danh mục chuyển sang Home và xóa route param sau khi nhận.
- Hoàn thành cả hai thử thách: bật/tắt yêu thích và ba khoảng giá; thêm sắp xếp giá tăng/giảm.

Đăng nhập là giả lập theo đề: demo@bookstore.vn, không gọi API xác thực. Thanh toán hiển thị tổng tiền theo phạm vi Buổi 7; dữ liệu Redux nằm trong bộ nhớ và được đặt lại khi tải lại ứng dụng.

## Kiểm tra

```powershell
npm run typecheck
npm test
```

Câu hỏi bổ sung: [TraLoi.md](./TraLoi.md). Ảnh chạy thực tế: [docs/screenshots](./docs/screenshots/). Mô tả giao diện gốc: [docs/UI.md](./docs/UI.md).
