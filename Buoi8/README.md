# BookStore Buổi 8 — bản hoàn thiện

**[Tải ZIP Windows chạy ngay](../downloads/BookStore_Buoi8_HoanThien.zip)** · [Hướng dẫn tải từ GitHub](../TAI_BUOI8.md)

Hoàn thành BT8.1–BT8.8, hai thử thách C1/C2 và câu hỏi bổ sung theo tài liệu Word đi kèm starter. Stack giữ nguyên: Expo SDK 57, React Native 0.86, TypeScript, React Navigation 7, Redux Toolkit, Axios, AsyncStorage và json-server.

## Chạy ngay trên Windows 64-bit

1. Giải nén **toàn bộ** `BookStore_Buoi8_HoanThien.zip` vào một thư mục có quyền ghi, ví dụ Documents.
2. Mở thư mục vừa giải nén, bấm đúp **CHAY_WINDOWS.bat**.
3. Trình duyệt mặc định sẽ mở ứng dụng. Giữ cửa sổ lệnh đang chạy; đóng cửa sổ hoặc Ctrl+C để dừng.

Bản ZIP chạy ngay có sẵn `runtime/node.exe` chính thức từ nodejs.org và bản web đã build trong `dist/`. Không cần cài Node, không cần `npm install`, không cần Internet để dùng bản này. Dùng trình duyệt Chrome/Edge/Firefox hiện đại; không mở trực tiếp `dist/index.html`. Cần Windows 10/11 x64. File `CHAY_WINDOWS.bat` phải nằm cùng cấp với `server.cjs`, `db.json`, `dist/` và `runtime/`.

Nếu trình duyệt không tự mở, xem địa chỉ được in trong cửa sổ lệnh rồi nhập vào trình duyệt. Nếu cổng 8080 đang được dùng, đóng bản BookStore đang chạy hoặc mở Command Prompt trong thư mục dự án và chạy:

```bat
set PORT=8082
CHAY_WINDOWS.bat
```

Bản chạy nhanh dùng máy chủ Node cục bộ không cần thư viện ngoài, cung cấp các API mà ứng dụng sử dụng và ghi tài khoản/đánh giá vào `db.json`. Máy chủ chỉ lắng nghe máy hiện tại. Đây là bản web của cùng mã nguồn React Native; không phải file APK.

## macOS / Linux

Cài Node.js 22+ rồi chạy `sh chay-macos-linux.sh`. Không cần cài thư viện để sử dụng bản web đã dựng sẵn. Bản mã nguồn nhỏ không chứa Node Windows; có thể chạy `node server.cjs` sau khi cài Node.

## Tài khoản và dữ liệu

- Email: **demo@bookstore.vn**
- Mật khẩu: **123456**
- Đăng ký và đánh giá mới được ghi vào `db.json` cạnh `server.cjs`.
- Phiên đăng nhập, giỏ hàng và yêu thích lưu bằng AsyncStorage; trên web là Local Storage của trình duyệt. Dùng cùng trình duyệt và cùng địa chỉ/cổng để tiếp tục dữ liệu đã lưu. Chế độ ẩn danh hoặc xóa dữ liệu trình duyệt sẽ xóa phần lưu trên trình duyệt.
- Mã **SALE10** giảm 10%; **GIAM50K** giảm tối đa 50.000 đ, tổng không âm. Chỉ áp dụng một mã tại một thời điểm; mã giảm giá không được lưu qua lần tải lại.
- `db.seed.json` là dữ liệu ban đầu. Để đặt lại, dừng app, chép file này đè lên `db.json`, rồi xóa dữ liệu trang trong trình duyệt nếu cũng muốn xóa phiên/giỏ/yêu thích.

Đăng nhập giả lập và token tự tạo được giữ đúng phạm vi bài tập; không dùng tài khoản/mật khẩu thật. Màn Thanh toán có lớp chặn đăng nhập và hiển thị tổng tiền đúng theo đề; form địa chỉ, tạo đơn, cổng thanh toán không thuộc yêu cầu Buổi 8.

## Phát triển và chạy bằng Expo / json-server

Cần Node.js 22 LTS hoặc 24 LTS, npm và Internet khi cài thư viện. Mở terminal trong thư mục có `package.json`:

```sh
npm ci
npm run api
```

Mở terminal thứ hai cùng thư mục:

```sh
npm run web
```

Hoặc `npm start` để chạy Expo Go tương thích SDK 57 / development build. Điện thoại và máy tính phải cùng Wi-Fi. Nếu không tự xác định được IP máy tính, trong PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://IP-LAN-MAY-TINH:3000"
npm run start:clear
```

Thay `IP-LAN-MAY-TINH` bằng IP thực của máy tính. Có thể cần cho phép cổng 3000 qua tường lửa. Để quay lại mặc định: `Remove-Item Env:EXPO_PUBLIC_API_URL` rồi khởi động lại Expo. Bản chạy nhanh Windows không cần làm các bước Expo này.

## Build và kiểm thử

```sh
npm run typecheck
npm test
npm run build:web
npm run preview
```

`build:web` đặt API thành `/api` và dựng bản web để chạy cùng `server.cjs`. Nếu sửa mã nguồn, phải chạy lại lệnh này để cập nhật bản chạy nhanh. Kiểm thử trình duyệt tùy chọn:

```sh
npx playwright install chromium
npm run test:e2e
```

Nếu đã có Chromium, đặt biến `CHROMIUM_PATH` thành đường dẫn trình duyệt. Bộ E2E tự mở máy chủ riêng ở cổng 18080, dùng bản sao dữ liệu trong thư mục tạm và đóng sau khi kiểm thử; không thay đổi `db.json` của bạn. Có thể cần cài thêm thư viện hệ thống cho Chromium trên Linux.

## Nội dung bàn giao

- [Đối chiếu từng yêu cầu](docs/DOI_CHIEU_YEU_CAU.md).
- [Kết quả kiểm thử](docs/KIEM_THU.md).
- [Trả lời 5 câu hỏi](TraLoi.md).
- `docs/screenshots/`: ảnh chụp từ bản chạy thực tế.
- `docs/ui/`, `docs/UI.md`: tài liệu giao diện có sẵn của starter.
- `src/`: mã nguồn hoàn thiện; `tests/`: kiểm thử logic và luồng trình duyệt.
- `runtime/NODE-LICENSE.txt`: giấy phép Node đi kèm bản chạy Windows.

Không chứa `node_modules`, bộ nhớ đệm Expo, tài khoản kiểm thử phát sinh hoặc file bí mật. Đã kiểm thử ứng dụng web trên Chromium/Linux; chưa chạy trực tiếp launcher trên Windows hoặc kiểm thử thiết bị Android/iOS thật.
