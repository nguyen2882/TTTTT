# Hệ thống Quản lý Hợp đồng, Công nợ & Giá thành TTTT

Chào mừng bạn đến với ứng dụng quản lý hợp đồng chuyên nghiệp được thiết kế tối ưu, gọn nhẹ và dễ sử dụng. Hệ thống chạy trực tiếp trên trình duyệt của bạn (Single Page Application) mà không cần máy chủ phức tạp.

## 🚀 Cách Chạy Ứng Dụng

Bạn có thể chạy ứng dụng bằng 2 cách rất đơn giản:

1. **Mở trực tiếp (Nhanh nhất):**
   - Click đúp chuột vào file [index.html](file:///c:/Users/Novastars/Desktop/TTTT/index.html) để mở nó trực tiếp trên trình duyệt Chrome, Edge, hoặc Firefox của bạn.

2. **Chạy qua server phát triển cục bộ (Nếu có cài đặt Node.js):**
   - Chạy lệnh sau để khởi động một server web đơn giản tại thư mục hiện tại:
     ```bash
     npx http-server ./
     ```
   - Truy cập vào địa chỉ URL mà terminal hiển thị (thường là `http://127.0.0.1:8080`).

---

## 🛠️ Các Tính Năng Chính Khoa Học & Dễ Quản Lý

1. **Bảng điều khiển (Dashboard) trực quan:**
   - Các thẻ chỉ số KPI tự động cập nhật: Tổng doanh thu, Lợi nhuận thực tế, Tổng nợ phải thu, Nợ quá hạn.
   - So sánh doanh thu và giá thành (chi phí thực tế) bằng đồ thị cột trực quan.
   - Biểu đồ tròn thể hiện chi tiết cơ cấu chi phí (Vật tư, Nhân công, Thuê ngoài, Vận chuyển, Khác).
   - Danh sách cảnh báo tự động các hợp đồng **Quá hạn thanh toán** hoặc **Sắp đến hạn cần đôn đốc**.

2. **Quản lý & Lọc Hợp đồng dễ dàng:**
   - Thêm mới, chỉnh sửa, xóa thông tin hợp đồng.
   - Tìm kiếm nhanh bằng từ khóa bất kỳ (mã hợp đồng, tên khách hàng, ghi chú).
   - Bộ lọc chuyên sâu: Lọc theo trạng thái (Hoàn thành, Đang nợ, Quá hạn, Đang thực hiện) và Khoảng thời gian ký hợp đồng.
   - Sắp xếp linh hoạt tất cả các cột dữ liệu bằng cách ấn vào tiêu đề cột.

3. **Quản lý Giá thành Chi tiết:**
   - Cho phép nhập chi tiết 5 đầu mục chi phí thực tế cho mỗi hợp đồng: Vật tư, Nhân công, Thuê ngoài, Vận chuyển, Chi phí khác.
   - Tự động hiển thị tỷ lệ phần trăm Chi phí / Giá trị hợp đồng bằng thanh tiến độ đổi màu (Xanh -> Vàng -> Đỏ).
   - Tự động tính toán Lợi nhuận gộp thực tế của hợp đồng ngay lập tức khi bạn thay đổi dữ liệu.

4. **Tự động Điền & Trích xuất văn bản Hợp đồng:**
   - Chọn bất kỳ hợp đồng nào đã lưu và chọn Biểu mẫu (Hợp đồng Dịch vụ, Hợp đồng Mua bán, Biên bản Đối chiếu Công nợ).
   - Hệ thống tự động chuyển số tiền số thành **chữ Tiếng Việt** (ví dụ: `850.000.000` -> `Tám trăm năm mươi triệu đồng`).
   - Tự động điền đầy đủ các thông tin: Mã hợp đồng, Tên khách hàng, Địa chỉ, MST, Đại diện pháp luật, Giá trị, Đã trả, Công nợ còn lại, ngày tháng...
   - **Tính năng độc đáo:** Bạn có thể click trực tiếp vào văn bản xem trước trên màn hình để chỉnh sửa nội dung bằng tay trước khi in.
   - Nút **In / Xuất PDF (A4)** được tối ưu hóa hiển thị chuẩn trang giấy A4.

5. **An toàn dữ liệu (Nhập & Xuất):**
   - Toàn bộ dữ liệu được lưu trữ an toàn trong `localStorage` của trình duyệt.
   - Nút **Xuất CSV** giúp bạn tải dữ liệu về để mở trực tiếp trong Excel.
   - Nút **Nhập dữ liệu** giúp bạn tải lên file sao lưu `.json` hoặc file `.csv` từ máy tính để tiếp tục làm việc trên thiết bị khác mà không sợ mất dữ liệu.

---

## 📂 Danh sách Tệp tin Dự án

- [index.html](file:///c:/Users/Novastars/Desktop/TTTT/index.html) - Cấu trúc giao diện HTML5.
- [style.css](file:///c:/Users/Novastars/Desktop/TTTT/style.css) - Hệ thống CSS hiện đại hỗ trợ đổi giao diện sáng/tối (Dark/Light theme) và giao diện in A4.
- [app.js](file:///c:/Users/Novastars/Desktop/TTTT/app.js) - Logic điều khiển, tính toán và tích hợp đồ thị.
- [data-store.js](file:///c:/Users/Novastars/Desktop/TTTT/data-store.js) - Module xử lý cơ sở dữ liệu trình duyệt, tính toán tài chính và chuyển đổi Excel CSV.
- [templates.js](file:///c:/Users/Novastars/Desktop/TTTT/templates.js) - Thư viện biểu mẫu văn bản hợp đồng mẫu và thuật toán dịch số sang chữ Tiếng Việt.
- [sample-data.json](file:///c:/Users/Novastars/Desktop/TTTT/sample-data.json) - File chứa dữ liệu mẫu chuẩn để bạn thử nghiệm nhập/xuất.
