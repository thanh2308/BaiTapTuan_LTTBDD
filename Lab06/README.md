# Lab 06 — Navigation

Huỳnh Hoài Thanh — 23633801. Expo SDK 54, React Native, TypeScript.

## Chạy project

Cần Node.js 20.19+ (đã kiểm tra với Node 24).

```sh
npm ci
npm run typecheck
npm start
```

Quét QR bằng Expo Go tương thích SDK 54; hoặc `npm run android` với Android emulator đã cấu hình. `npm run web` để chạy trình duyệt. Máy cần cùng mạng với điện thoại. Nếu Expo Go hiện tại không hỗ trợ SDK 54, dùng bản Android SDK 54 từ https://expo.dev/go hoặc development build tương thích; bản web không cần Expo Go.

## Nội dung theo đề

- **Bài 1:** Product và ChooseColor tạo 4 trạng thái: ban đầu xanh, mở chọn màu, chọn đỏ hiện màu/nhà cung cấp/giá, XONG trả màu về Product. Nút CHỌN MUA ở đáy chỉ xác nhận lựa chọn, không có giỏ hàng/thanh toán ngoài đề.
- **Bài 2:** tải sản phẩm `phones/1`, loading, lỗi, thử lại; dùng endpoint MockAPI bạn cung cấp theo mặc định. Đặt `EXPO_PUBLIC_API_URL=` để dùng dữ liệu offline với độ trễ 600 ms theo hướng dẫn.
- **Bài 3:** Home FlatList 6 sản phẩm, Search lọc không phân biệt hoa/thường và thông báo rỗng, Profile avatar/tên/email. Tab có icon đặc/viền.
- **Bài 4:** Stack Home chứa Products/Favorites; truyền `{ id }` đến ProductDetails; lưu/bỏ yêu thích bằng Context. Không lưu qua lần đóng app vì đề không yêu cầu.
- **Bài 5:** Drawer Trang chủ/Cá nhân/Cài đặt; hai Switch, mặc định thông báo bật và giao diện tối tắt; dòng trạng thái đổi ngay. Không làm Context đổi nền toàn app vì đó là phần nâng cao tùy chọn trong Word.

Bài 2 nằm tại `src/ex2/SelectPhoneApi.tsx`, gọi API qua `src/api/phoneApi.ts` và dùng lại giao diện `src/ex1/SelectPhoneApp.tsx`.

Một NavigationContainer ở App quản lý bài đang chọn; mỗi bài dùng navigator riêng, không lồng các container độc lập. `popTo('Product', { color })` là cách trả kết quả cho React Navigation 7.

## Cấu hình API thật cho Bài 2

1. Trong tài khoản https://mockapi.io của bạn, tạo resource **phones** với các trường trong `mockapi_phones.json`.
2. Nhập 6 bản ghi từ file JSON (bản ghi đầu phải có id `1`). Các giá trị giá/số sao/số đánh giá là number, colors là array gồm silver/red/black/blue.
3. Sao chép `.env.example` thành `.env` và đặt URL gốc, ví dụ:

```dotenv
EXPO_PUBLIC_API_URL=https://6addbf314e88f1bba4a494f8.mockapi.io
```

URL không chứa `/phones` ở cuối. Không điền token/bí mật vào biến EXPO_PUBLIC vì biến này công khai trong ứng dụng.

4. Chạy lại `npx expo start -c`. Mở Bài 2; sửa tên/giá trên API rồi về menu và mở lại bài để tải dữ liệu mới.
5. Để kiểm tra lỗi, đặt URL không hợp lệ rồi khởi động lại; màn lỗi có nút THỬ LẠI. Mỗi yêu cầu giới hạn 15 giây.

Project đã cấu hình endpoint bạn cung cấp: `https://6addbf314e88f1bba4a494f8.mockapi.io/phones`. Endpoint này được đặt mặc định trong mã nguồn nên tải từ GitHub không cần tạo `.env` để dùng API. File `.env.example` dùng URL gốc không có `/phones`; app gọi `/phones/1`. Cloud hiện chặn domain này nên chưa xác nhận nội dung dữ liệu thật. Cần kiểm tra resource có id `1` và các trường đúng như JSON mẫu. Không tự ghi hay thay đổi dữ liệu trên API của bạn. Đặt `EXPO_PUBLIC_API_URL=` nếu muốn chạy offline.

## Ảnh và dữ liệu

`assets/phones/` chứa 4 ảnh minh họa cục bộ, hoạt động offline; đây không phải ảnh Vsmart gốc từ Figma/file RAR. Có thể thay đúng bốn file PNG bằng ảnh gốc mà không đổi mã. Joy 3 và Live 4 có giá đúng các mốc trong hướng dẫn; giá của các mẫu còn lại là dữ liệu mẫu.

## Kiểm tra thủ công trên điện thoại

- Bài 1: kiểm tra đủ 4 trạng thái, chọn từng màu và quay lại, nút XONG không tạo thêm Product trong stack.
- Bài 2: kiểm tra tải, dữ liệu API thật, URL lỗi và thử lại khi mạng phục hồi.
- Bài 3: gõ `aris` được 1 kết quả, `zzz` được thông báo rỗng; chuyển đủ 3 tab.
- Bài 4: Live 4 giá 3.990.000 đ; lưu, quay về Favorites, bỏ lưu và kiểm tra rỗng.
- Bài 5: mở hamburger/kéo mép trái trên Android/iOS, chuyển 3 mục, gạt hai Switch.

`npm run typecheck` kiểm tra TypeScript. `npx expo export --platform web` kiểm tra bundling web. Kết quả kiểm tra trình duyệt được ghi trong `VALIDATION.md`; các thao tác native cần emulator/điện thoại để xác nhận riêng.
