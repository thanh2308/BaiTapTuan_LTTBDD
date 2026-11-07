# Trả lời câu hỏi bổ sung — Buổi 8

## 1. Vì sao cần cờ ready?

Ở lần render đầu, Redux đang chứa giỏ rỗng, trong khi việc đọc AsyncStorage chưa hoàn thành. Nếu tự ghi ngay, mảng rỗng có thể ghi đè giỏ cũ trước khi dữ liệu cũ được nạp. `ready` chỉ bật sau khi đọc và dispatch xong phiên, giỏ hàng, yêu thích; các effect ghi chỉ chạy từ thời điểm đó.

## 2. Hai vấn đề của token giả và cách làm thật

Mật khẩu trong `db.json` được lưu dạng rõ và API cho phép client đọc được; việc so mật khẩu ở client có thể bị bỏ qua. Token tự ghép từ ID và thời gian cũng có thể bị giả mạo, không có chữ ký hay cơ chế hết hạn đáng tin cậy. Ở hệ thống thật, server phải kiểm tra mật khẩu đã băm và cấp token có thời hạn; ứng dụng native nên lưu token bằng SecureStore/Keychain/Keystore, còn web có thể dùng cookie HttpOnly, Secure, SameSite theo kiến trúc xác thực.

## 3. Tại sao CartItemRow có hai effect?

Effect thứ nhất đưa số lượng người dùng vừa chọn vào store sau khi ngừng thao tác 300 ms. Effect thứ hai kéo số lượng mới từ store về state cục bộ: ví dụ đang có 1 cuốn, chuyển sang Chi tiết thêm cùng cuốn đó rồi quay lại Giỏ hàng, store đã thành 2 nhưng dòng giỏ có thể vẫn hiện 1 nếu thiếu effect đồng bộ. Hai effect đảm bảo số lượng cục bộ và store khớp nhau khi cập nhật từ hai phía.

## 4. Vì sao dùng một nguồn state cho tim?

Nếu mỗi HeartButton có `useState` riêng, việc thả tim ở Home chỉ đổi nút đó, còn tim ở Chi tiết vẫn chưa chọn. Store wishlist giữ duy nhất mảng ID; mọi nút đọc `isFavorite(bookId)` và gọi `toggle(bookId)` trên cùng store. Khi ID đổi, các màn đang sử dụng nó cùng cập nhật, và màn Yêu thích tự lọc lại danh sách.

## 5. Hiện/ẩn mật khẩu

Màn Đăng nhập có state `showPassword`; FormField nhận `secureTextEntry={!showPassword}` và nút 👁 bên phải ô nhập đổi state khi bấm. Nút có nhãn trợ năng “Hiện mật khẩu” / “Ẩn mật khẩu”. Ảnh kiểm thử thực tế: [01-hien-mat-khau.png](docs/screenshots/01-hien-mat-khau.png).
