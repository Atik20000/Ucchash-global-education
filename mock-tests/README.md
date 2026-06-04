# IELTS Mock Tests

This directory contains complete IELTS Academic mock tests in JSON format, ready to be uploaded to the system.

## 📁 Available Tests

- **ielts-academic-mock-test-01.json** - Complete IELTS Academic practice test
  - Target Band: 6.0 - 8.0
  - Listening: 40 questions across 4 sections
  - Reading: 40 questions across 3 passages
  - Writing: 2 tasks (Task 1: 150+ words, Task 2: 250+ words)
  - Total Time: 170 minutes (30L + 60R + 60W + 10 transfer)

## 🚀 How to Upload Tests

### Method 1: Using the Bash Script (Recommended)

```bash
# Make the script executable (first time only)
chmod +x scripts/upload-test.sh

# Upload the test
cd scripts
./upload-test.sh ../mock-tests/ielts-academic-mock-test-01.json
```

**Requirements:**
- `jq` command-line JSON processor
  - macOS: `brew install jq`
  - Ubuntu/Debian: `sudo apt-get install jq`
  - Other systems: [Download jq](https://stedolan.github.io/jq/download/)

### Method 2: Using the TypeScript Script

```bash
# Install dependencies (if not already done)
pnpm install

# Run the upload script
cd scripts
tsx upload-mock-test.ts ../mock-tests/ielts-academic-mock-test-01.json
```

### Method 3: Using the Admin UI

1. Start your development servers:
   ```bash
   # API
   cd apps/api-nestjs
   pnpm start:dev
   
   # Frontend (in another terminal)
   cd ../../
   pnpm dev
   ```

2. Navigate to http://localhost:3000/admin/test/create

3. Copy the contents of `ielts-academic-mock-test-01.json`

4. Paste into the JSON input field

5. Click "Upload Test"

## 📋 Test JSON Format

Each test JSON file follows this structure:

```json
{
  "title": "Test Title",
  "description": "Test description with metadata",
  
  "listeningQuestions": [
    {
      "sectionNumber": 1,
      "questionNumber": 1,
      "questionType": "form_completion|multiple_choice|matching|note_completion|map_labeling",
      "questionText": "Question text",
      "options": ["Option A", "Option B", "Option C"],
      "correctAnswer": "Answer",
      "audioUrl": "YouTube URL",
      "instruction": "Instructions for this question"
    }
  ],
  
  "readingPassages": [
    {
      "passageNumber": 1,
      "title": "Passage Title",
      "passageText": "Full passage text...",
      "questions": [
        {
          "questionNumber": 1,
          "questionType": "true_false_not_given|multiple_choice|matching_headings|sentence_completion",
          "questionText": "Question text",
          "options": ["Option A", "Option B"],
          "correctAnswer": "Answer",
          "instruction": "Instructions"
        }
      ]
    }
  ],
  
  "writingTasks": [
    {
      "taskNumber": 1,
      "instruction": "Task instructions",
      "questionText": "Task question with data/prompt",
      "wordLimit": 150,
      "imageUrl": "Optional image URL for Task 1"
    }
  ]
}
```

## 🎯 Question Types

### Listening Question Types
- `form_completion` - Fill in forms/notes/tables
- `multiple_choice` - Choose from A, B, C options
- `matching` - Match items to categories
- `note_completion` - Complete notes/summaries
- `map_labeling` - Label maps/diagrams (uses form completion format)

### Reading Question Types
- `true_false_not_given` - TRUE/FALSE/NOT GIVEN statements
- `multiple_choice` - Choose from multiple options
- `matching_headings` - Match headings to paragraphs
- `sentence_completion` - Complete sentences with words from passage

## ✅ Validation Checklist

Before uploading a test, ensure:

- [ ] Listening section has exactly 40 questions (4 sections × 10 questions)
- [ ] Reading section has exactly 40 questions across 3 passages
- [ ] Writing section has exactly 2 tasks
- [ ] All question numbers are sequential and unique within their section
- [ ] All questions have correct answers
- [ ] Audio URL is a valid YouTube link
- [ ] Passage texts are properly formatted
- [ ] Word limits are specified for writing tasks (150 for Task 1, 250 for Task 2)

## 🔧 Troubleshooting

### Upload Fails
1. Check if the API is running: `curl http://localhost:3001/api/admin/tests`
2. Verify JSON syntax: `jq . mock-tests/ielts-academic-mock-test-01.json`
3. Check server logs in `apps/api-nestjs`

### Database Errors
1. Ensure PostgreSQL is running
2. Check database connection in `apps/api-nestjs/.env`
3. Run migrations: `cd apps/api-nestjs && pnpm typeorm migration:run`

### Authentication Errors
- If JWT guards are enabled, add Authorization header to upload scripts
- For testing, you can temporarily comment out `@UseGuards(JwtAuthGuard)` decorators

## 📊 After Upload

Once uploaded, you can:

1. **Admin Dashboard**: http://localhost:3000/admin/dashboard
   - View all tests
   - Activate/deactivate tests
   - View test results
   - Grade writing sections

2. **Student Dashboard**: http://localhost:3000/exam/dashboard
   - Take available tests
   - View completed results
   - See band scores

## 🎨 Creating New Tests

To create a new test:

1. Copy `ielts-academic-mock-test-01.json` as a template
2. Update the title and description
3. Replace all questions with new content
4. Ensure all answers are correct
5. Validate JSON syntax
6. Upload using one of the methods above

**Important Notes:**
- Each test must follow the official IELTS format (40+40+2)
- Question numbers must be sequential (1-40 for Listening, 1-40 for Reading)
- Listening sections should be numbered 1-4
- Reading passages should be numbered 1-3
- Writing tasks should be numbered 1-2

## 📚 Official IELTS Format

The system enforces official IELTS exam standards:

- **Listening**: 30 minutes + transfer time
  - Section 1-2: Everyday social contexts
  - Section 3-4: Educational and training contexts
  
- **Reading**: 60 minutes
  - 3 passages of increasing difficulty
  - Academic texts from books, journals, magazines
  
- **Writing**: 60 minutes
  - Task 1: Describe visual information (150+ words)
  - Task 2: Essay on a topic (250+ words)

Band scores are calculated using official IELTS conversion tables:
- Listening/Reading: Raw score → Band score (e.g., 39-40 = 9.0)
- Writing: Manual grading by admin
- Overall: Average of all sections, rounded to nearest 0.5
