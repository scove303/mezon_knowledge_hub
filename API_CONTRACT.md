# Tài Liệu Giao Tiếp API - Mezon Knowledge Hub

Tài liệu này quy định cấu trúc và các điểm kết nối (endpoints) giữa Frontend (Dashboard) và Backend.
- **Base URL (Local):** `http://localhost:3000/api/v1`
- **Môi trường:** JSON (`Content-Type: application/json`)

---

## 1. QUY ƯỚC CHUNG (GLOBAL FORMAT)
Tất cả các API trả về BẮT BUỘC phải tuân theo cấu trúc JSON sau:

### ✅ Khi thành công (HTTP Status 200/201)
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": { ... } // Có thể là object hoặc array
}
```

### ❌ Khi thất bại (HTTP Status 400/401/403/500)
```json
{
  "success": false,
  "message": "Mô tả chi tiết lỗi để Frontend hiện thông báo",
  "data": null
}
```

---

## 2. NHÓM API XÁC THỰC (AUTH)
### 2.1. Đăng nhập

* **Method:** `POST /auth/login`
* **Mô tả:** Frontend gửi user/pass để lấy Token đăng nhập.
* **Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
* **Response (Success):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "ADMIN"
    }
  }
}
```

---

## 3. NHÓM API KIẾN THỨC (KNOWLEDGE BASE)
### 3.1. Lấy danh sách Q&A

* **Method:** `GET /knowledge`
* **Mô tả:** Lấy danh sách các câu hỏi để hiển thị trên bảng Dashboard. Có phân trang.
* **Headers:** `Authorization: Bearer <accessToken>`
* **Query Parameters:** `?page=1&limit=10&search=keyword`
* **Response (Success):**
```json
{
  "success": true,
  "message": "Lấy dữ liệu thành công",
  "data": {
    "items": [
      {
        "id": 1,
        "question": "Làm sao để tạo server?",
        "answer": "Để tạo server bạn cần...",
        "author_name": "admin",
        "tags": ["hướng dẫn", "server"],
        "is_active": true,
        "created_at": "2026-07-13T10:00:00Z"
      }
    ],
    "pagination": {
      "totalRecords": 45,
      "currentPage": 1,
      "totalPages": 5
    }
  }
}
```

### 3.2. Thêm mới một Q&A

* **Method:** `POST /knowledge`
* **Mô tả:** Lưu câu hỏi và câu trả lời mới vào DB để dạy Bot.
* **Headers:** `Authorization: Bearer <accessToken>`
* **Request Body:**
```json
{
  "question": "Bot có thể trả lời những gì?",
  "answer": "Bot có thể đọc dữ liệu từ MySQL để trả lời.",
  "tags": ["bot", "tính năng"]
}
```
* **Response (Success):**
```json
{
  "success": true,
  "message": "Tạo dữ liệu thành công",
  "data": {
    "id": 2,
    "question": "Bot có thể trả lời những gì?"
  }
}
```

---

## 4. NHÓM API CẤU HÌNH BOT (BOT CONFIG)
### 4.1. Lấy cấu hình hiện tại

* **Method:** `GET /bot/config`
* **Mô tả:** Lấy các thiết lập hệ thống của Bot.
* **Headers:** `Authorization: Bearer <accessToken>`
* **Response (Success):**
```json
{
  "success": true,
  "message": "Thành công",
  "data": {
    "active_channels": ["channel_id_1", "channel_id_2"],
    "bot_personality": "Chuyên nghiệp, ngắn gọn"
  }
}
```

### 4.2. Cập nhật cấu hình Bot

* **Method:** `PUT /bot/config`
* **Mô tả:** Sửa thiết lập của Bot từ Dashboard.
* **Headers:** `Authorization: Bearer <accessToken>`
* **Request Body (Gửi lên những trường cần update):**
```json
{
  "active_channels": ["channel_id_1", "channel_id_2", "channel_id_3"]
}
```
* **Response (Success):**
```json
{
  "success": true,
  "message": "Cập nhật cấu hình thành công",
  "data": null
}
```
