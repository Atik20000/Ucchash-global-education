// Test Types
export interface Test {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  listeningDuration: number;
  readingDuration: number;
  writingDuration: number;
  listeningQuestions: ListeningQuestion[];
  readingPassages: ReadingPassage[];
  writingTasks: WritingTask[];
  createdAt: string;
  updatedAt: string;
}

// Listening Types
export enum ListeningQuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  FORM_COMPLETION = 'form_completion',
  NOTE_COMPLETION = 'note_completion',
  MATCHING = 'matching',
  MAP_LABELING = 'map_labeling',
}

export interface ListeningQuestion {
  id: string;
  testId: string;
  sectionNumber: number;
  questionNumber: number;
  questionType: ListeningQuestionType;
  questionText: string;
  options?: string[];
  correctAnswer?: string; // Only for admin
  audioUrl?: string;
  instruction?: string;
  createdAt: string;
}

// Reading Types
export enum ReadingQuestionType {
  TRUE_FALSE_NOT_GIVEN = 'true_false_not_given',
  MATCHING_HEADINGS = 'matching_headings',
  SENTENCE_COMPLETION = 'sentence_completion',
  MULTIPLE_CHOICE = 'multiple_choice',
  SUMMARY_COMPLETION = 'summary_completion',
}

export interface ReadingPassage {
  id: string;
  testId: string;
  passageNumber: number;
  title: string;
  passageText: string;
  questions: ReadingQuestion[];
  createdAt: string;
}

export interface ReadingQuestion {
  id: string;
  passageId: string;
  questionNumber: number;
  questionType: ReadingQuestionType;
  questionText: string;
  options?: string[];
  correctAnswer?: string; // Only for admin
  instruction?: string;
  createdAt: string;
}

// Writing Types
export interface WritingTask {
  id: string;
  testId: string;
  taskNumber: number;
  instruction: string;
  questionText: string;
  wordLimit: number;
  imageUrl?: string;
  createdAt: string;
}

// Answer Types
export enum AnswerType {
  LISTENING = 'listening',
  READING = 'reading',
  WRITING = 'writing',
}

export interface StudentAnswer {
  id: string;
  userId: string;
  testId: string;
  answerType: AnswerType;
  questionId: string;
  questionNumber: number;
  studentAnswer: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

// Result Types
export enum TestStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  status: TestStatus;
  startedAt: string;
  completedAt?: string;
  listeningScore?: number;
  listeningBand?: number;
  readingScore?: number;
  readingBand?: number;
  writingBand?: number;
  overallBand?: number;
  listeningCompleted: boolean;
  readingCompleted: boolean;
  writingCompleted: boolean;
  test?: Test;
  user?: any; // For admin views
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface SubmitAnswerDto {
  testId: string;
  answerType: AnswerType;
  questionId: string;
  questionNumber: number;
  studentAnswer: string;
}

export interface BulkSubmitAnswersDto {
  testId: string;
  answers: SubmitAnswerDto[];
}
