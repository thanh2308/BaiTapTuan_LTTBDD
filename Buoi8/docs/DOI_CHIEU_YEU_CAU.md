# Đối chiếu yêu cầu Buổi 8

| Mục | Nội dung hoàn thành | Mã nguồn |
| --- | --- | --- |
| BT8.1 | Hai ô đăng nhập, lỗi ngay dưới ô, lỗi API, loading chống bấm lặp, đăng nhập về Home hoặc Checkout đúng tổng | `src/screens/LoginScreen.tsx`, `src/components/FormField.tsx` |
| BT8.2 | Họ tên/email/mật khẩu/nhập lại; kiểm tra rỗng, định dạng, mật khẩu khớp; email trùng; đăng ký tự đăng nhập | `src/screens/RegisterScreen.tsx`, `src/services/authService.ts` |
| BT8.3 | Đọc phiên trước khi hiện app; lưu khi đăng nhập; xóa khi đăng xuất; còn sau tải lại | `src/hooks/usePersistence.ts`, `src/storage/authStorage.ts` |
| BT8.4 | Chặn từ giỏ hàng và ngay tại Checkout; chuyển Login kèm redirect/total; replace về đúng Checkout | `src/screens/CartScreen.tsx`, `src/screens/CheckoutScreen.tsx`, `src/screens/LoginScreen.tsx` |
| BT8.5 | RatingStars dùng lại, chọn 1–5 sao, điểm trung bình useMemo, form khi đăng nhập, validate, POST đánh giá, thêm vào đầu danh sách và reset form | `src/components/RatingStars.tsx`, `src/screens/BookDetailScreen.tsx`, `src/services/reviewService.ts` |
| BT8.6 | Số lượng cục bộ, debounce 300 ms, đồng bộ khi store đổi; giới hạn 1 đến tồn kho, nút giới hạn mờ; tổng đổi theo Redux | `src/components/CartItemRow.tsx`, `src/hooks/useDebounce.ts`, `src/store/cartSlice.ts` |
| BT8.7 | Xác nhận xóa trên web/native; đọc giỏ/yêu thích song song; hook lưu chung có cờ ready | `src/screens/CartScreen.tsx`, `src/utils/dialog.ts`, `src/hooks/usePersistence.ts`, `src/hooks/useAutoPersist.ts` |
| BT8.8 | Tim chung Redux ở lưới/chi tiết/yêu thích; loading, lỗi/thử lại, rỗng; bỏ tim sách biến mất | `src/components/HeartButton.tsx`, `src/screens/WishlistScreen.tsx` |
| BT8.C1 | Sách cùng danh mục trừ sách hiện tại, FlatList ngang, BookCard và navigation.push | `src/screens/BookDetailScreen.tsx` |
| BT8.C2 | SALE10 và GIAM50K; báo mã sai, tạm tính/giảm/tổng; đưa tổng sau giảm sang Checkout | `src/screens/CartScreen.tsx` |
| Câu bổ sung | 5 câu trả lời, nút 👁 cạnh ô mật khẩu và ảnh chạy thực tế | `TraLoi.md`, `docs/screenshots/01-hien-mat-khau.png` |
| Nộp bài | Mã nguồn không còn ô cam/chỗ trống của starter; có lockfile; ZIP không có node_modules | Toàn dự án |

Thanh toán được giữ đúng khung tối giản của đề Buổi 8; xác thực vẫn là mô phỏng học tập trên json-server.
