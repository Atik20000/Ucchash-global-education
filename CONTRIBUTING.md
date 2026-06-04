# Contributing to Ucchash IELTS Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow project guidelines

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/ucchash-IELTS.git
   cd ucchash-IELTS
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup development environment**
   - Follow [QUICKSTART.md](QUICKSTART.md)
   - Create `.env` files for all apps
   - Setup PostgreSQL database

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Branch Naming

- `feature/` - New features (e.g., `feature/add-listening-test`)
- `fix/` - Bug fixes (e.g., `fix/timer-overflow`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/auth-service`)
- `test/` - Tests (e.g., `test/exam-flow`)

### Making Changes

1. **Start development servers**
   ```bash
   pnpm dev
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   # Run tests
   pnpm test
   
   # Check TypeScript types
   pnpm type-check
   
   # Lint code
   pnpm lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add listening test module"
   ```

## 📝 Coding Standards

### TypeScript/JavaScript (Next.js, NestJS)

- Use **TypeScript** for all new code
- Follow **Airbnb style guide**
- Use **functional components** with hooks (React)
- Prefer **async/await** over promises
- Use **meaningful variable names**

```typescript
// ✅ Good
const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// ❌ Bad
const f = (x) => {
  return api.get(`/users/${x}`).then(r => r.data);
};
```

### Python (Django)

- Follow **PEP 8** style guide
- Use **type hints** where applicable
- Write **docstrings** for functions/classes
- Use **snake_case** for variables and functions
- Keep functions **small and focused**

```python
# ✅ Good
def calculate_band_score(total_score: int, max_score: int) -> float:
    """
    Calculate IELTS band score from percentage.
    
    Args:
        total_score: Student's total score
        max_score: Maximum possible score
    
    Returns:
        Band score rounded to nearest 0.5 (1.0-9.0)
    """
    percentage = (total_score / max_score) * 100
    band = 1.0 + (percentage / 100 * 8)
    return round(band * 2) / 2

# ❌ Bad
def calc(s, m):
    return round((1.0 + ((s/m)*100/100*8)) * 2) / 2
```

### CSS/Tailwind

- Use **Tailwind utility classes** first
- Create **custom components** only when necessary
- Follow **mobile-first** approach
- Maintain **consistent spacing** (4px grid)

```tsx
{/* ✅ Good */}
<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
  Start Test
</button>

{/* ❌ Bad */}
<button style={{padding: "12px 24px", background: "#1a1f71"}}>
  Start Test
</button>
```

## 📦 Commit Guidelines

We follow **Conventional Commits** specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(exam): add listening test with audio player

# Bug fix
fix(timer): prevent negative countdown values

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(auth): simplify JWT validation logic

# Multiple files
feat(exam): implement speaking test module

- Add microphone recording
- Add audio upload to S3
- Add AI evaluation endpoint
```

## 🔄 Pull Request Process

1. **Update your branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/your-feature
   git rebase main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

3. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template:
     - **Title**: Clear, descriptive summary
     - **Description**: What, why, how
     - **Screenshots**: For UI changes
     - **Testing**: How to test changes
     - **Checklist**: Complete all items

4. **PR Review**
   - Address reviewer feedback
   - Make requested changes
   - Keep discussion focused and respectful

5. **Merge**
   - Maintainer will merge after approval
   - Delete feature branch after merge

## 🏗️ Project Structure

Understanding the codebase:

```
ucchash-IELTS/
├── apps/
│   ├── landing-nextjs/        # Marketing site
│   │   ├── app/              # Next.js 15 app directory
│   │   ├── components/       # React components
│   │   └── lib/              # Utility functions
│   │
│   ├── api-nestjs/           # Backend API
│   │   ├── src/
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── users/       # User management
│   │   │   └── payments/    # Payment integration
│   │   └── test/            # API tests
│   │
│   └── exam-django/          # Exam system
│       ├── exams/           # Main exam app
│       │   ├── models.py    # Database models
│       │   ├── views.py     # View controllers
│       │   ├── admin.py     # Admin interface
│       │   └── management/  # Custom commands
│       ├── anti_cheat/      # Anti-cheating system
│       └── results/         # Result processing
│
├── packages/
│   └── shared-types/        # Shared TypeScript types
│
└── docs/                    # Documentation
```

## 🧪 Testing Guidelines

### TypeScript/JavaScript Tests

```typescript
// Use Jest + React Testing Library
import { render, screen } from '@testing-library/react';
import { ExamTimer } from './ExamTimer';

describe('ExamTimer', () => {
  it('should countdown from initial time', () => {
    render(<ExamTimer duration={60} />);
    expect(screen.getByText('60:00')).toBeInTheDocument();
  });
});
```

### Python Tests

```python
# Use Django TestCase
from django.test import TestCase
from exams.models import UserProfile, Test

class SequentialUnlockTestCase(TestCase):
    def test_cannot_skip_tests(self):
        """Student cannot access Test 2 without completing Test 1"""
        profile = UserProfile.objects.create(
            user_id='student-001',
            tests_allowed=5
        )
        test_2 = Test.objects.get(order_number=2)
        
        # Should return False since Test 1 not completed
        self.assertFalse(profile.can_access_test(2))
```

## 📖 Documentation

- Update README.md for major features
- Add JSDoc/docstrings for public APIs
- Update relevant .md files in root directory
- Include code examples where helpful

## 🎯 Areas to Contribute

### High Priority
- [ ] AI evaluation for Writing tasks (GPT-4 integration)
- [ ] Face detection for anti-cheating (OpenCV)
- [ ] Listening test with audio player
- [ ] Speaking test with microphone recording
- [ ] Mobile responsive improvements

### Medium Priority
- [ ] Advanced analytics dashboard
- [ ] Certificate generation (PDF)
- [ ] Email notifications
- [ ] Test result history graphs
- [ ] Practice drills library

### Low Priority
- [ ] Dark mode support
- [ ] Multi-language interface
- [ ] Social sharing features
- [ ] Referral system

## ❓ Questions?

- Open an issue on GitHub
- Email: dev@ucchash.com
- Documentation: See `/docs` folder

## 🙏 Thank You!

Your contributions make this project better for IELTS students everywhere!
