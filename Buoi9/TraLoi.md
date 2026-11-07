# Trả lời câu hỏi bổ sung — Buổi 9

## 1. Giá trị dẫn xuất: errors và valid

`errors` được suy ra từ họ tên, số điện thoại, địa chỉ; `valid` được suy ra từ các lỗi và giỏ hàng. Tính trực tiếp ở mỗi render giúp chúng luôn khớp với dữ liệu đang nhập, không cần đồng bộ thêm nhiều state. Nếu lưu riêng bằng `useState`, quên cập nhật ở một `onChangeText` có thể làm nút xác nhận bật sai hoặc giữ lỗi cũ dù dữ liệu đã đúng.

## 2. Thứ tự clear và createOrder

Nếu gọi `clear()` trước khi `await createOrder(...)`, khi mất mạng thì giỏ đã bị xóa dù server chưa tạo đơn; hook lưu bền còn ghi giỏ rỗng xuống AsyncStorage. Đặt `clear()` sau `await` chỉ xóa giỏ khi API trả về thành công. Trong `catch`, chỉ đặt thông báo lỗi và giữ dữ liệu để người dùng thử lại.

## 3. PUT hay PATCH?

`PUT /users/1` với `{ name, phone }` thay thế bản ghi bằng các trường mới cùng ID, có thể làm mất email và password. `PATCH` chỉ sửa các trường được gửi nên phù hợp với form chỉnh một phần hồ sơ. Service chỉ gửi `name` và `phone`, đồng thời bỏ `password` khỏi phản hồi trước khi cập nhật Redux.

## 4. Cập nhật lạc quan

Nếu không hoàn lại trong `catch`, màn hình vẫn hiển thị đã đọc trong khi server chưa lưu; mở lại sẽ thấy chưa đọc, khiến người dùng hiểu sai. Có thể dùng cách này cho thao tác nhẹ như thả tim có lưu API, với cơ chế hoàn lại khi lỗi. Đặt hàng/thanh toán cần chờ xác nhận từ server trước khi thông báo thành công và xóa giỏ.

## 5. Bộ lọc trạng thái đơn hàng

Đã thêm đủ Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã hủy trong `src/screens/OrdersScreen.tsx`. `useMemo` tính mảng lọc từ `orders` và `status`; chỉ đổi dữ liệu truyền vào FlatList, không sửa mảng đơn gốc.

```tsx
const [status, setStatus] = useState<"all" | OrderStatus>("all");
const filtered = useMemo(
  () => orders.filter(o => status === "all" || o.status === status),
  [orders, status]
);
// <FlatList data={filtered} ... />
```

Ảnh chạy thực tế: [01-bo-loc-don-hang.png](docs/screenshots/01-bo-loc-don-hang.png).
