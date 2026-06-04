# 🎓 Ucchash IELTS - Professional Mock Test Platform

A production-ready, full-stack IELTS mock test platform with advanced anti-cheating system, sequential test unlock mechanism, and British Council-style exam interface.

[![Built with Turborepo](https://img.shields.io/badge/Built%20with-Turborepo-EF4444?style=for-the-badge)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![Django](https://img.shields.io/badge/Django-5-092E20?style=for-the-badge&logo=django)](https://www.djangoproject.com/)

## 🌟 Key Features

### 📝 Exam System
- **25 Pre-configured IELTS Academic Reading Tests** stored in database
- **Sequential Test Unlock** - Students must complete Test 1 before accessing Test 2
- **One-Time Attempt Policy** - Each test can only be taken once
- **British Council-Style UI** - Pixel-perfect replica of official IELTS computer-based test interface
- **Automatic Band Score Calculation** - Instant results with detailed scoring (1.0-9.0 bands)
- **Package System** - Choose from 5, 10, 20 tests, or Unlimited access

### 🔒 Advanced Anti-Cheating
- **Fullscreen Enforcement** - Auto-locks exam in fullscreen mode
- **Tab Switch Detection** - Logs and warns when students leave the exam tab
- **Webcam Monitoring** - Camera activation ready (Phase 2: AI face detection)
- **Multi-Tab Blocking** - Prevents opening exam in multiple tabs
- **Screenshot Prevention** - Disables right-click, copy, paste

### 🎨 British Council Interface
- **Split Screen Layout** - Reading passage on left, questions on right
- **Question Navigator** - 40-button grid showing answered/flagged/current status
- **Smart Timer** - Countdown with warnings at 5 minutes, auto-submit at 0:00
- **Flag System** - Mark questions for review
- **Auto-Save** - Answers saved automatically every 30 seconds

### 💳 Payment Integration (Bangladesh)
- bKash Mobile Banking
- Nagad Wallet
- SSLCommerz Gateway
- Package-based pricing

## 🏗️ Architecture

# Ucchash-global-education

This is a **Turborepo monorepo** with 3 main applications:

```
ucchash-IELTS/
├── apps/
│   ├── landing-nextjs/      # Marketing landing page (Port 3000)
│   ├── api-nestjs/          # Auth & Payment API (Port 4000)
│   └── exam-django/         # Exam system (Port 8000)
├── packages/
│   └── shared-types/        # Shared TypeScript types
└── docker/                  # Docker configurations
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js 15, React 19, TailwindCSS |
| **Backend API** | NestJS, TypeScript, TypeORM |
| **Exam System** | Django 5, Python 3.14 |
| **Database** | PostgreSQL 16 |
| **Authentication** | JWT (Passport.js) |
| **Monorepo** | Turborepo + pnpm workspaces |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.12+
- PostgreSQL 16+
- pnpm 8+

### Installation

```bash
# Clone repository
git clone https://github.com/Atik1000/ucchash-IELTS.git
cd ucchash-IELTS

# Install dependencies
pnpm install

# Setup PostgreSQL database
createdb ielts_platform

# Run Django migrations
cd apps/exam-django
python manage.py migrate
python manage.py populate_tests  # Creates 25 IELTS tests
cd ../..

# Start all services
pnpm dev
```

### Access Points
- **Landing Page**: http://localhost:3000
- **API Backend**: http://localhost:4000
- **Exam Dashboard**: http://localhost:8000/dashboard
- **Django Admin**: http://localhost:8000/admin

## 📚 Documentation

- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Complete feature implementation guide
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing scenarios and checklist
- [MONOREPO_README.md](MONOREPO_README.md) - Monorepo architecture details
- [CLOUD_SETUP_GUIDE.md](CLOUD_SETUP_GUIDE.md) - Cloud deployment guide
- [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) - Google Sheets integration

## 🎯 How It Works

### Authentication Flow
```
Student → Next.js Landing Page → Register/Login
                                      ↓
                              NestJS API (JWT Token)
                                      ↓
                         Django Exam System (Validates JWT)
                                      ↓
                              Dashboard with 25 Tests
```

### Sequential Test System
1. **Student purchases package** (e.g., 5 Mock Tests via bKash)
2. **UserProfile created** with `tests_allowed=5`, `tests_remaining=5`
3. **Test #1 is FREE** and immediately accessible
4. **Complete Test #1** → Test #2 unlocks automatically
5. **Complete Test #2** → Test #3 unlocks automatically
6. **Repeat** until all purchased tests are used
7. **Cannot retake** any completed test (enforced by database constraints)

### Band Score Calculation
- **Automatic conversion** from percentage (0-100%) to IELTS band (1.0-9.0)
- **Rounded to nearest 0.5** (e.g., 7.0, 7.5, 8.0)
- **Detailed breakdown**: Reading, Listening, Writing, Speaking bands
- **AI Feedback Ready** (Phase 2)

## 🧪 Testing the System

### Quick Test with JWT Token

```bash
# Generate test token
cd apps/exam-django
python3 generate_test_token.py

# Copy the token and visit:
# http://localhost:8000/dashboard?token=YOUR_TOKEN_HERE
```

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing instructions.

## 📦 Package System

| Package | Tests Included | Price (BDT) |
|---------|---------------|-------------|
| **MOCK_5** | 5 Mock Tests | ৳500 |
| **MOCK_10** | 10 Mock Tests | ৳900 |
| **MOCK_20** | 20 Mock Tests | ৳1,600 |
| **UNLIMITED** | All Tests | ৳3,000 |

*Test #1 is FREE for all users*

## 🛠️ Development

### Run Individual Apps

```bash
# Landing page only
pnpm --filter landing-nextjs dev

# API backend only
pnpm --filter api-nestjs dev

# Exam system only
cd apps/exam-django
python manage.py runserver 8000
```

### Database Management

```bash
# Create migrations
cd apps/exam-django
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Populate 25 tests
python manage.py populate_tests
```

## 🔐 Environment Variables

### NestJS API (.env)
```env
DATABASE_URL=postgresql://foysal@localhost:5432/ielts_platform
JWT_SECRET=/sN5dkTVyvuMsgjFhBZWbhWSX29qOa5uVxTdQNo40nc=
JWT_EXPIRES_IN=7d
```

### Django Exam System (.env)
```env
SECRET_KEY=django-insecure-key-here
DATABASE_NAME=ielts_platform
DATABASE_USER=foysal
DATABASE_PASSWORD=
DATABASE_HOST=localhost
DATABASE_PORT=5432
JWT_SECRET=/sN5dkTVyvuMsgjFhBZWbhWSX29qOa5uVxTdQNo40nc=
```

## 🎨 Color Scheme

- **Primary Blue**: `#1a1f71` / `oklch(0.35 0.15 250)`
- **Accent Red**: `#d63031` / `oklch(0.55 0.22 25)`
- **Gradient**: Purple-blue theme matching landing page

## 🚧 Roadmap

### Phase 1 (Completed ✅)
- [x] Monorepo architecture
- [x] JWT authentication
- [x] 25 predefined IELTS tests
- [x] Sequential unlock system
- [x] One-time attempt restriction
- [x] British Council UI
- [x] Band score calculation
- [x] Anti-cheating basics
- [x] Package system

### Phase 2 (Upcoming)
- [ ] AI-powered Writing evaluation (GPT-4)
- [ ] AI-powered Speaking evaluation
- [ ] Face detection for cheating prevention
- [ ] Listening tests with audio player
- [ ] Writing tests with rich text editor
- [ ] Speaking tests with microphone
- [ ] Advanced analytics dashboard
- [ ] Certificate generation

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] PTE Academic tests
- [ ] Live tutoring integration
- [ ] Community forum
- [ ] Practice drills library

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

This project is proprietary software developed for Ucchash IELTS.

## 👨‍💻 Authors

- **Frontend & Backend**: GitHub Copilot + Claude Sonnet 4.5
- **Project Owner**: Ucchash IELTS Team

## 🆘 Support

For issues and questions:
- Email: support@ucchash.com
- Documentation: See docs/ folder
- Issues: GitHub Issues tab

---

**Built with ❤️ for IELTS students in Bangladesh**
