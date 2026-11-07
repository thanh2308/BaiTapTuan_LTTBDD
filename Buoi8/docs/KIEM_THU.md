# Kết quả kiểm thử Buổi 8

Kiểm tra ngày 07/11/2026 (giờ Việt Nam). Môi trường: Linux, Node.js v24.22.1, Chromium headless; kích thước trình duyệt 430 × 932.

## Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run typecheck` | Đạt; TypeScript strict không có lỗi |
| `npm test` | 7/7 nhóm đạt, không bỏ qua |
| `npm run build:web` | Đạt; Expo/Metro xuất bản web thành công |
| `CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e` | 32/32 tình huống đạt, không có lỗi JavaScript trình duyệt |
| API json-server của quy trình phát triển | GET books/categories/users/reviews và POST users/reviews đạt trên cơ sở dữ liệu tạm |
| Node Windows đi kèm | SHA-256 khớp `win-x64/node.exe` trong SHASUMS256 chính thức của nodejs.org, phiên bản 24.22.1 |

7 nhóm logic kiểm tra tìm kiếm không dấu; lọc AND và ranh giới giá; giỏ hàng bất biến/tồn kho; auth reducer; wishlist reducer; validators; và hydrate giỏ/yêu thích.

## Các tình huống trình duyệt đã chạy

```text
PASS 1 Home tải sách
PASS 2 Yêu thích có trạng thái lỗi API
PASS 3 Yêu thích dùng chung store
PASS 4 Yêu thích còn sau reload
PASS 5 Bỏ tim hiện empty state
PASS 6 Điểm trung bình và sách liên quan
PASS 7 Chưa đăng nhập không hiện form đánh giá
PASS 8 Mở sách liên quan bằng push
PASS 9 Chặn giảm dưới 1
PASS 10 Tăng số lượng debounce và tổng
PASS 11 Giảm số lượng cập nhật tổng
PASS 12 Mã sai
PASS 13 SALE10
PASS 14 GIAM50K
PASS 15 Login lỗi rỗng dưới ô
PASS 16 Login lỗi định dạng
PASS 17 Login sai mật khẩu
PASS 18 Hiện mật khẩu
PASS 19 Đăng nhập trở về Checkout đúng tổng
PASS 20 Giữ phiên
PASS 21 Chưa chọn sao
PASS 22 Thiếu bình luận
PASS 23 POST đánh giá, cập nhật trung bình
PASS 24 Giỏ lưu sau reload
PASS 25 Chặn vượt tồn kho
PASS 26 Hủy xóa giữ sản phẩm
PASS 27 Xác nhận xóa
PASS 28 Đăng xuất xóa phiên
PASS 29 Đăng ký lỗi từng ô
PASS 30 Mật khẩu nhập lại
PASS 31 Email trùng
PASS 32 Đăng ký tự đăng nhập
TOTAL 32 PASS; no browser errors
```

Bộ E2E dùng bản sao `db.seed.json`, máy chủ tạm tại cổng 18080 và browser context mới, tự dọn sau khi hoàn thành. Tài khoản/đánh giá kiểm thử không nằm trong dữ liệu bàn giao. Trạng thái lỗi API của Yêu thích được tạo bằng chặn request, sau đó bỏ chặn và thử lại.

## Ảnh thực tế

- [Hiện mật khẩu bằng nút mắt](screenshots/01-hien-mat-khau.png).
- [Đánh giá mới, điểm trung bình đổi 4.5 → 4.7](screenshots/02-danh-gia.png).

## Giới hạn kiểm chứng

Ứng dụng web và máy chủ đóng gói đã chạy trên Linux/Chromium. Chưa thực thi `CHAY_WINDOWS.bat` / `node.exe` trên Windows, chưa chạy Android/iOS thật. Xác thực và token là mô phỏng theo đề; Thanh toán chỉ hiển thị tổng và có chặn đăng nhập, không thực hiện giao dịch thật.
