# BookStore Buổi 9 — Thanh toán, Đơn hàng và Thông báo

**[Tải ZIP chạy ngay Windows](https://github.com/thanh2308/BaiTapTuan_LTTBDD/raw/refs/heads/main/downloads/BookStore_Buoi9_HoanThien.zip)** · [ZIP mã nguồn](https://github.com/thanh2308/BaiTapTuan_LTTBDD/raw/refs/heads/main/downloads/BookStore_Buoi9_MaNguon.zip)

Hoàn thành BT9.1–BT9.8, thử thách **Mua lại**, bộ lọc trạng thái đơn hàng và 5 câu hỏi bổ sung theo Word Buổi 9. Giữ Expo SDK 57, React Native, TypeScript, Redux Toolkit, Axios, AsyncStorage và json-server của starter.

## Chạy từ mã nguồn GitHub

Cài Node.js 22 LTS hoặc 24 LTS. Mở terminal trong thư mục repository:

```powershell
cd Buoi9
npm ci
npm run api
```

Giữ terminal đó mở. Mở terminal thứ hai trong `Buoi9`:

```powershell
npm run web
```

API dùng cổng 3000, dữ liệu trong `db.json`. Tài khoản demo: **demo@bookstore.vn / 123456**. Cần Internet khi cài thư viện; không cần truy cập API bên ngoài để dùng dữ liệu bài tập.

## Bản ZIP chạy nhanh Windows 64-bit

Tải `BookStore_Buoi9_HoanThien.zip`, giải nén toàn bộ rồi bấm đúp `CHAY_WINDOWS.bat`. Bản ZIP có Node Windows chính thức và web dựng sẵn; không cần npm install. Giữ cửa sổ lệnh mở khi dùng; trình duyệt tự mở, hoặc dùng địa chỉ in trong cửa sổ. Bản này dùng máy chủ cục bộ cổng **8089**, không dùng cổng 3000.

Bản mã nguồn nhỏ không kèm Node Windows; cài Node rồi chạy `node server.cjs` để dùng web dựng sẵn. macOS/Linux có Node: `sh chay-macos-linux.sh`. Không mở trực tiếp `dist/index.html`.

Dữ liệu người dùng/đơn/đánh giá/thông báo nằm trong `db.json`. Phiên, hồ sơ hiện tại, giỏ và yêu thích lưu trên thiết bị bằng AsyncStorage; trên web là Local Storage, nên hãy dùng cùng trình duyệt và địa chỉ/cổng. `db.seed.json` giữ dữ liệu ban đầu; xem `docs/DEMO.md` để đặt lại.

## Expo Go / native

```sh
npm start
```

Dùng Expo Go tương thích SDK 57 hoặc development build, điện thoại và máy tính cùng Wi-Fi. Khi cần đặt API thủ công trong PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://IP-LAN-MAY-TINH:3000"
npm run start:clear
```

Thay IP thực, cho phép cổng 3000 trên tường lửa khi cần. Xóa biến sau bằng `Remove-Item Env:EXPO_PUBLIC_API_URL`. Icon/splash đã khai báo theo đề; Expo Go không hiển thị icon/splash riêng như một app được build.

## Build và kiểm thử

```sh
npm run typecheck
npm test
npm run test:api
npm run build:web
npm run preview
```

Sửa mã nguồn xong cần `npm run build:web` để cập nhật bản chạy nhanh. Lệnh build đặt API `/api` cho máy chủ đóng gói; khi phát triển bằng Expo và json-server, để API mặc định hoặc IP LAN như hướng dẫn trên.

Kiểm thử trình duyệt tùy chọn:

```sh
npx playwright install chromium
npm run test:e2e
```

Nếu có sẵn Chromium, đặt `CHROMIUM_PATH`. E2E dùng máy chủ cổng 18090 và dữ liệu tạm từ seed, không thay đổi `db.json`. Linux có thể cần cài thư viện hệ thống cho Chromium.

## Tài liệu bàn giao

- [Đối chiếu yêu cầu](docs/DOI_CHIEU_YEU_CAU.md).
- [Kịch bản demo](docs/DEMO.md).
- [Kết quả kiểm thử](docs/KIEM_THU.md).
- [5 câu trả lời bổ sung](TraLoi.md).
- `docs/screenshots/`: ảnh Checkout, Đơn hàng/bộ lọc, Hồ sơ, Thông báo chạy thực tế.

Chuyển khoản chỉ minh họa giao diện, chưa có cổng thanh toán thật. Thông báo là dữ liệu API, chưa có push notification. Xác thực mô phỏng theo đề, mật khẩu thử lưu rõ ở json-server; không dùng mật khẩu thật. Đã kiểm tra bản web; chưa kiểm thử launcher Windows, thiết bị Android/iOS thật hoặc động tác kéo để làm mới trên native.
