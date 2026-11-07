# Đối chiếu đề Buổi 9

| Mục | Phần hoàn thành | File |
| --- | --- | --- |
| BT9.1 | Errors/valid dẫn xuất; người nhận/SĐT/địa chỉ; điền sẵn từ user; lỗi sau lần gửi; COD/ngân hàng; khóa nút khi chưa hợp lệ | `src/screens/CheckoutScreen.tsx`, `src/components/PaymentOption.tsx` |
| BT9.2 | POST orders với status pending, createdAt ISO; loading; chỉ clear sau thành công; lỗi giữ giỏ; thông báo và về Home | `src/services/orderService.ts`, `src/screens/CheckoutScreen.tsx` |
| BT9.3 | GET lọc theo user và sắp xếp; mới nhất đầu; mã/ngày/tổng/badge; một thẻ mở rộng; địa chỉ/phương thức; loading/lỗi/thử lại/rỗng; menu Tài khoản | `src/screens/OrdersScreen.tsx`, `src/screens/AccountScreen.tsx` |
| BT9.4 | Tên/email/SĐT/chỉnh sửa; email khóa; validate tên và SĐT; PATCH đúng hai trường; bỏ password trong phản hồi; patchUser và lưu phiên | `src/screens/EditProfileScreen.tsx`, `src/services/userService.ts`, `src/screens/AccountScreen.tsx` |
| BT9.5 | GET theo user/sắp xếp; FlatList; nền và chấm chưa đọc; cập nhật lạc quan, PATCH, hoàn lại khi lỗi; chuyển Orders/BookDetail; loading/lỗi/thử lại/rỗng | `src/screens/NotificationsScreen.tsx`, `src/services/notificationService.ts` |
| BT9.6 | RefreshControl có sẵn được nối refreshing/onRefresh; Promise.all lấy sách/danh mục; không xóa danh sách khi làm mới lỗi; nút Làm mới trên web để demo cùng callback | `src/screens/HomeScreen.tsx`, `src/components/BookGrid.tsx` |
| BT9.7 | Name/icon/splash/adaptiveIcon, nền navy; tài nguyên PNG hợp lệ | `app.json`, `assets/` |
| BT9.8 | Kiểm thử web các luồng, dữ liệu demo sạch; hướng dẫn demo và kết quả riêng | `docs/DEMO.md`, `docs/KIEM_THU.md`, `db.seed.json` |
| BT9.C1 | Mua lại đơn hoàn tất; GET giá/tồn kho mới; gộp bằng một Redux action; không vượt tồn; bỏ qua sách không còn bán/hết hàng; về Giỏ | `src/screens/OrdersScreen.tsx`, `src/store/cartSlice.ts`, `src/store/hooks.ts` |
| Bổ sung | Trả lời đủ 5 câu; bộ lọc trạng thái và ảnh | `TraLoi.md`, `docs/screenshots/` |

Không còn khung bài tập chưa làm trong mã nguồn. Chuyển khoản chỉ là lựa chọn giao diện, thông báo lấy từ API, xác thực vẫn mô phỏng theo đề. Chưa kiểm thử thiết bị thật/Expo Go; cần người dùng xác nhận thao tác kéo để làm mới và khởi chạy native trên điện thoại.
