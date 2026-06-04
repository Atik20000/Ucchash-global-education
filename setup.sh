#!/bin/bash

# 🚀 UCCHASH IELTS Platform - Automated Setup Script
# This script automates the complete setup process in one command

set -e  # Exit on error

echo "🎓 UCCHASH IELTS Platform - Automated Setup"
echo "============================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Detect PostgreSQL username
if command -v whoami &> /dev/null; then
    PG_USER=$(whoami)
else
    PG_USER="postgres"
fi

# Shared JWT Secret (matches actual implementation)
SHARED_JWT_SECRET="/sN5dkTVyvuMsgjFhBZWbhWSX29qOa5uVxTdQNo40nc="

# Check prerequisites
echo "${BLUE}Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "${RED}❌ Node.js is not installed. Please install Node.js 20+${NC}"
    exit 1
fi
echo "${GREEN}✅ Node.js $(node -v)${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "${RED}❌ Python is not installed. Please install Python 3.12+${NC}"
    exit 1
fi
echo "${GREEN}✅ Python $(python3 --version)${NC}"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "${RED}❌ PostgreSQL is not installed. Please install PostgreSQL 14+${NC}"
    exit 1
fi
echo "${GREEN}✅ PostgreSQL installed${NC}"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "${BLUE}📦 Installing pnpm...${NC}"
    npm install -g pnpm
fi
echo "${GREEN}✅ pnpm $(pnpm -v)${NC}"

echo ""
echo "${BLUE}Step 1: Installing Node.js dependencies...${NC}"
pnpm install

echo ""
echo "${BLUE}Step 2: Setting up PostgreSQL database...${NC}"
echo "Using PostgreSQL user: ${YELLOW}${PG_USER}${NC}"
createdb ielts_platform 2>/dev/null && echo "${GREEN}✅ Database 'ielts_platform' created${NC}" || echo "${YELLOW}ℹ️  Database already exists${NC}"

echo ""
echo "${BLUE}Step 3: Generating Django secret...${NC}"
DJANGO_SECRET=$(python3 -c 'from secrets import token_urlsafe; print(token_urlsafe(50))')

echo ""
echo "${BLUE}Step 4: Creating NestJS environment file...${NC}"
cat > apps/api-nestjs/.env << EOF
# NestJS API Environment Configuration
NODE_ENV=development
PORT=4000

# Database (TypeORM uses DATABASE_URL)
DATABASE_URL=postgresql://${PG_USER}@localhost:5432/ielts_platform
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=${PG_USER}
DATABASE_PASSWORD=
DATABASE_NAME=ielts_platform

# JWT (Must match Django)
JWT_SECRET=${SHARED_JWT_SECRET}
JWT_EXPIRES_IN=7d

# Service URLs
NEXTJS_URL=http://localhost:3000
DJANGO_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
EOF
echo "${GREEN}✅ Created apps/api-nestjs/.env${NC}"

# Django Exam System Environment Configuration
SECRET_KEY=${DJANGO_SECRET}
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (Django uses these variable names)
DATABASE_NAME=ielts_platform
DATABASE_USER=${PG_USER}
DATABASE_PASSWORD=
DATABASE_HOST=localhost
DATABASE_PORT=5432

# JWT (Must match NestJS)
JWT_SECRET=${SHARED_JWT_SECRET}

# Service URLs
NESTJS_API_URL=http://localhost:4000
NEXTJS_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4000

# File Storage
MEDIA_URL=/media/
MEDIA_ROOT=media/
STATIC_URL=/static/
STATIC_ROOT=staticfilesGINS=http://localhost:3000,http://localhost:4000

MEDIA_URL=/media/
MEDIA_ROOT=media/
EOF
echo "${GREEN}✅ Created apps/exam-django/.env${NC}"

echo ""
echo "${BLUE}Step 6: Setting up Django...${NC}"
cd apps/exam-django

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip -q
pip install -r requirements.txt -q

# Create directories
mkdir -p media static staticfiles

# Run migrations
echo "Running Django migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Populate 25 IELTS tests
echo "${BLUE}Populating 25 IELTS mock tests...${NC}"
python manage.py populate_tests

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput -q

echo ""
echo "${GREEN}✅ Django setup complete!${NC}"

# Ask if user wants to create superuser
echo ""
read -p "${YELLOW}Create Django admin superuser now? (y/n):${NC} " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

deactivate
cd ../..

echo ""
echo "${BLUE}Step 7: Installing NestJS dependencies...${NC}"
cd apps/api-nestjs
pnpm install
cd ../..

echo ""
echo ""
echo "${GREEN}╔════════════════════════════════════════╗${NC}"
echo "${GREEN}║     ✅ Setup Complete Successfully!    ║${NC}"
echo "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "📊 ${BLUE}Setup Summary:${NC}"
echo "   ✅ Database: ielts_platform created"
echo "   ✅ 25 IELTS tests populated"
echo "   ✅ All dependencies installed"
echo "   ✅ Environment files configured"
echo ""
echo "🚀 ${BLUE}Start Development Servers:${NC}"
echo ""
echo "   ${YELLOW}Option 1: All at once (Turborepo)${NC}"
echo "   $ pnpm dev"
echo ""
echo "   ${YELLOW}Option 2: Individually${NC}"
echo "   Terminal 1: pnpm --filter landing-nextjs dev    ${BLUE}(Port 3000)${NC}"
echo "   Terminal 2: pnpm --filter api-nestjs dev         ${BLUE}(Port 4000)${NC}"
echo "   Terminal 3: cd apps/exam-django && source venv/bin/activate && python manage.py runserver ${BLUE}(Port 8000)${NC}"
echo ""
echo "🎯 ${BLUE}Access Points:${NC}"
echo "   Landing Page:  ${GREEN}http://localhost:3000${NC}"
echo "   API Backend:   ${GREEN}http://localhost:4000${NC}"
echo "   Exam Dashboard:${GREEN}http://localhost:8000/dashboard${NC}"
echo "   Admin Panel:   ${GREEN}http://localhost:8000/admin${NC}"
echo ""
echo "🧪 ${BLUE}Generate Test Token:${NC}"
echo "   $ cd apps/exam-django"
echo "   $ python3 generate_test_token.py"
echo "   Then visit: http://localhost:8000/dashboard?token=YOUR_TOKEN"
echo ""
echo "📚 ${BLUE}Documentation:${NC}"
echo "   📖 README.md - Project overview"
echo "   📖 QUICKSTART.md - Quick start guide"
echo "   📖 IMPLEMENTATION_SUMMARY.md - Feature details"
echo "   📖 TESTING_GUIDE.md - Testing instructions"
echo ""
echo "${GREEN}Happy coding! 🎉${NC}"
echo ""
