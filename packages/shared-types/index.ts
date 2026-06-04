// Shared TypeScript types across monorepo

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  plan: UserPlan;
  testsRemaining: number;
  validUntil: Date | null;
  isActive: boolean;
}

export enum UserPlan {
  FREE = 'free',
  MOCK_5 = 'mock_5',
  MOCK_10 = 'mock_10',
  MOCK_20 = 'mock_20',
  UNLIMITED = 'unlimited',
}

export interface JWTPayload {
  sub: string; // user ID
  email: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  redirect_url: string;
}

export interface Test {
  id: number;
  title: string;
  testType: 'IELTS' | 'PTE';
  sectionType: 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING';
  duration: number; // minutes
  isFree: boolean;
  description?: string;
}

export interface Question {
  id: number;
  testId: number;
  order: number;
  questionText: string;
  questionType: 'MCQ' | 'TF' | 'FB' | 'ESSAY' | 'AUDIO';
  passage?: string;
  audioFile?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer?: string;
  points: number;
}

export interface Attempt {
  id: number;
  userId: string;
  testId: number;
  startedAt: Date;
  finishedAt: Date | null;
  score: number | null;
  totalPoints: number;
  isCompleted: boolean;
}

export interface Answer {
  id: number;
  attemptId: number;
  questionId: number;
  answerText?: string;
  audioFile?: string;
  isCorrect: boolean | null;
  pointsEarned: number;
}

export interface CheatingEvent {
  id: number;
  userId: string;
  attemptId: number | null;
  eventType: CheatingEventType;
  timestamp: Date;
  details?: Record<string, any>;
  ipAddress?: string;
}

export enum CheatingEventType {
  TAB_SWITCH = 'TAB_SWITCH',
  CAMERA_OFF = 'CAMERA_OFF',
  FULLSCREEN_EXIT = 'FULLSCREEN_EXIT',
  MULTIPLE_TABS = 'MULTIPLE_TABS',
  FACE_NOT_DETECTED = 'FACE_NOT_DETECTED',
  COPY_PASTE = 'COPY_PASTE',
}

export interface Payment {
  id: string;
  userId: string;
  plan: string;
  amount: number;
  gateway: 'bkash' | 'nagad' | 'sslcommerz';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}
