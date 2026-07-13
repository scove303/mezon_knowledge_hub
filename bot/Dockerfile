FROM python:3.10-slim

WORKDIR /app

# Cài đặt các thư viện hệ thống cần thiết (nếu có dùng Playwright để cào web)
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Cài đặt trình duyệt cho Playwright (nếu bot cần cào dữ liệu web)
RUN playwright install --with-deps chromium

COPY . .

CMD ["python", "main.py"]
