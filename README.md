# i18n Manager

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Nitro](https://img.shields.io/badge/Nitro-Server-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nitro.unjs.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A user-friendly web application for easy management of i18n JSON files for developers. With an intuitive user interface, you can manage translation keys, add languages, and efficiently organize your internationalization **directly in your application**.

## ✨ Features

- 🌍 **Translation Management**: View and edit all i18n keys in a centralized interface
- 🔧 **Real-time Editing**: All changes are automatically saved to the corresponding JSON files and are immediately available in your application
- 🌐 **Multi-Language Support**: Manage multiple languages simultaneously
- ➕ **Dynamic Addition**: Create new translation keys and languages on-the-fly
- 🗑️ **Delete Function**: Remove unnecessary keys and languages
- 🔍 **Find Missing Translations**: Identify and manage missing translation keys easily
- 🐳 **Docker Ready**: Easy deployment with Docker Compose

## 📋 Prerequisites

- Docker & Docker Compose installed
- A project with i18n JSON files (or an empty folder if you haven't any translations yet)
📁 **Structure of translation folder**
  ```
  /data/                    # Mounted i18n folder
  ├── de.json              # German translations
  ├── en.json              # English translations
  ├── fr.json              # French translations
  └── ...                  # Additional language files
  ```

## 🚀 Quick Start
### 📦 With Docker Compose (recommended)
Create a `docker-compose.yml` file in your project root:
```yaml
name: i18n-manager

services:
  i18n-manager:
    build: flowa.me/i18n-manager
    ports:
      - '4000:4000'
    # mount i18n folder to the service
    volumes:
      - ./path/to/i18nFolder:/data
```
Start the service:
```bash
docker-compose up -d
```

Open your browser and navigate to: http://localhost:4000

### 🐳 With Docker
Run Docker Container with mounted i18n folder
```bash
docker run -p 4000:4000 -v /your/i18n/folder:/data i18n-manager
```

Open your browser and navigate to: http://localhost:4000

## 🔧 Development

Clone the repository
```bash
git clone <repository-url>
cd i18n-manager
```

Install Dependencies
```bash
bun install
```

Start development server
```bash
bun dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/i18n` | Get all translations |
| `POST` | `/api/i18n` | Create or update translation key |

## 🚀 Deployment

Build the application for production
```bash
bun run build
```

```bash
# Build production image
docker build -t i18n-manager:latest .

... TODO
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
