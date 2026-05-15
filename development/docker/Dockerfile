FROM python:3.13-slim AS backend

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=America/Sao_Paulo

RUN apt-get update && apt-get install -y --no-install-recommends tzdata \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY development/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]


FROM node:20-alpine AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

CMD ["npm", "run", "dev"]
