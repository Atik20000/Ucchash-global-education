import mockExamData from '@/mock-tests/ielts-academic-mock-test-01.json';
import { fetchRemoteTestById, fetchRemoteTests, getStoredPortalToken } from './vocavolt-api';

import {
  AnswerType,
  BulkSubmitAnswersDto,
  ListeningQuestion,
  ListeningQuestionType,
  ReadingPassage,
  ReadingQuestion,
  ReadingQuestionType,
  StudentAnswer,
  SubmitAnswerDto,
  Test,
  TestResult,
  TestStatus,
  WritingTask,
} from './types/exam.types';

const STORAGE_KEYS = {
  tests: 'ucchashIELTS_exam_tests',
  results: 'ucchashIELTS_exam_results',
  answers: 'ucchashIELTS_exam_answers',
} as const;

const DEFAULT_TEST_ID = 'ielts-academic-mock-test-01';
const DEMO_USER = {
  id: 'local-user',
  email: 'demo.student@ucchash.local',
  name: 'Frontend Demo Student',
};

type ExamState = {
  tests: Test[];
  results: TestResult[];
  answers: StudentAnswer[];
};

type MockExamSeed = {
  title: string;
  description: string;
  listeningQuestions: Array<Partial<ListeningQuestion>>;
  readingPassages: Array<{
    passageNumber?: number;
    title?: string;
    passageText?: string;
    questions?: Array<Partial<ReadingQuestion>>;
  }>;
  writingTasks: Array<Partial<WritingTask>>;
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const now = () => new Date().toISOString();
const isBrowser = () => typeof window !== 'undefined';

function buildSeedTest(): Test {
  const seed = mockExamData as MockExamSeed;
  const testId = DEFAULT_TEST_ID;

  const listeningQuestions: ListeningQuestion[] = seed.listeningQuestions.map((question, index) => ({
    id: question.id || `${testId}-listening-${question.sectionNumber ?? 1}-${question.questionNumber ?? index + 1}`,
    testId,
    sectionNumber: question.sectionNumber ?? 1,
    questionNumber: question.questionNumber ?? index + 1,
    questionType: (question.questionType as ListeningQuestionType) || ListeningQuestionType.FORM_COMPLETION,
    questionText: question.questionText ?? '',
    options: question.options ? [...question.options] : undefined,
    correctAnswer: question.correctAnswer,
    audioUrl: question.audioUrl,
    instruction: question.instruction,
    createdAt: question.createdAt || now(),
  }));

  const readingPassages: ReadingPassage[] = seed.readingPassages.map((passage, passageIndex) => {
    const passageId = `reading-${testId}-${passage.passageNumber ?? passageIndex + 1}`;
    const questions: ReadingQuestion[] = (passage.questions || []).map((question, questionIndex) => ({
      id: question.id || `${passageId}-question-${question.questionNumber ?? questionIndex + 1}`,
      passageId,
      questionNumber: question.questionNumber ?? questionIndex + 1,
      questionType: (question.questionType as ReadingQuestionType) || ReadingQuestionType.MULTIPLE_CHOICE,
      questionText: question.questionText ?? '',
      options: question.options ? [...question.options] : undefined,
      correctAnswer: question.correctAnswer,
      instruction: question.instruction,
      createdAt: question.createdAt || now(),
    }));

    return {
      id: passageId,
      testId,
      passageNumber: passage.passageNumber ?? passageIndex + 1,
      title: passage.title ?? '',
      passageText: passage.passageText ?? '',
      questions,
      createdAt: now(),
    };
  });

  const writingTasks: WritingTask[] = seed.writingTasks.map((task, index) => ({
    id: task.id || `${testId}-writing-${task.taskNumber ?? index + 1}`,
    testId,
    taskNumber: task.taskNumber ?? index + 1,
    instruction: task.instruction ?? '',
    questionText: task.questionText ?? '',
    wordLimit: task.wordLimit ?? (index === 0 ? 150 : 250),
    imageUrl: task.imageUrl,
    createdAt: task.createdAt || now(),
  }));

  return {
    id: testId,
    title: seed.title,
    description: seed.description,
    isActive: true,
    listeningDuration: 40,
    readingDuration: 60,
    writingDuration: 60,
    listeningQuestions,
    readingPassages,
    writingTasks,
    createdAt: now(),
    updatedAt: now(),
  };
}

function createDefaultState(): ExamState {
  return {
    tests: [buildSeedTest()],
    results: [],
    answers: [],
  };
}

const memoryState: ExamState = createDefaultState();

function getStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function loadState(): ExamState {
  if (!isBrowser()) {
    return memoryState;
  }

  const tests = getStorage<Test[]>(STORAGE_KEYS.tests, []);
  const results = getStorage<TestResult[]>(STORAGE_KEYS.results, []);
  const answers = getStorage<StudentAnswer[]>(STORAGE_KEYS.answers, []);

  if (tests.length === 0) {
    const seeded = createDefaultState();
    setStorage(STORAGE_KEYS.tests, seeded.tests);
    setStorage(STORAGE_KEYS.results, seeded.results);
    setStorage(STORAGE_KEYS.answers, seeded.answers);
    return seeded;
  }

  return { tests, results, answers };
}

function saveState(state: ExamState): void {
  if (!isBrowser()) {
    memoryState.tests = state.tests;
    memoryState.results = state.results;
    memoryState.answers = state.answers;
    return;
  }

  setStorage(STORAGE_KEYS.tests, state.tests);
  setStorage(STORAGE_KEYS.results, state.results);
  setStorage(STORAGE_KEYS.answers, state.answers);
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function bandFromScore(score: number, total: number): number | undefined {
  if (total <= 0) {
    return undefined;
  }

  const scoreOutOfNine = Math.min(9, Math.max(1, (score / total) * 9));
  return roundToHalf(scoreOutOfNine);
}

function getTest(state: ExamState, testId: string): Test | undefined {
  return state.tests.find((test) => test.id === testId);
}

function upsertTest(state: ExamState, test: Test): void {
  const index = state.tests.findIndex((item) => item.id === test.id);
  if (index >= 0) {
    state.tests[index] = test;
  } else {
    state.tests.push(test);
  }
}

function upsertResult(state: ExamState, result: TestResult): void {
  const index = state.results.findIndex((item) => item.id === result.id);
  if (index >= 0) {
    state.results[index] = result;
  } else {
    state.results.push(result);
  }
}

function upsertAnswer(state: ExamState, answer: StudentAnswer): void {
  const index = state.answers.findIndex(
    (item) =>
      item.testId === answer.testId &&
      item.questionId === answer.questionId &&
      item.answerType === answer.answerType,
  );

  if (index >= 0) {
    state.answers[index] = answer;
  } else {
    state.answers.push(answer);
  }
}

function findStudentAnswers(state: ExamState, testId: string): StudentAnswer[] {
  return state.answers.filter((answer) => answer.testId === testId);
}

function isListeningOrReadingCorrect(test: Test, answer: StudentAnswer): boolean {
  if (answer.answerType === AnswerType.LISTENING) {
    const question = test.listeningQuestions.find((item) => item.id === answer.questionId);
    return normalizeAnswer(question?.correctAnswer || '') === normalizeAnswer(answer.studentAnswer);
  }

  if (answer.answerType === AnswerType.READING) {
    const question = test.readingPassages
      .flatMap((passage) => passage.questions)
      .find((item) => item.id === answer.questionId);
    return normalizeAnswer(question?.correctAnswer || '') === normalizeAnswer(answer.studentAnswer);
  }

  return false;
}

function calculateListeningScore(test: Test, answers: StudentAnswer[]): { score: number; band: number | undefined } {
  const listeningAnswers = answers.filter((answer) => answer.answerType === AnswerType.LISTENING);
  const total = test.listeningQuestions.length;
  const score = listeningAnswers.reduce((count, answer) => count + (isListeningOrReadingCorrect(test, answer) ? 1 : 0), 0);

  return { score, band: bandFromScore(score, total) };
}

function calculateReadingScore(test: Test, answers: StudentAnswer[]): { score: number; band: number | undefined } {
  const readingAnswers = answers.filter((answer) => answer.answerType === AnswerType.READING);
  const total = test.readingPassages.flatMap((passage) => passage.questions).length;
  const score = readingAnswers.reduce((count, answer) => count + (isListeningOrReadingCorrect(test, answer) ? 1 : 0), 0);

  return { score, band: bandFromScore(score, total) };
}

function calculateWritingBand(test: Test, answers: StudentAnswer[]): number | undefined {
  if (test.writingTasks.length === 0) {
    return undefined;
  }

  const taskBands = test.writingTasks.map((task) => {
    const answer = answers.find(
      (item) => item.answerType === AnswerType.WRITING && item.questionId === task.id,
    );
    const words = countWords(answer?.studentAnswer || '');

    if (!answer || words === 0) {
      return 4;
    }

    if (words >= task.wordLimit * 1.5) {
      return 8;
    }

    if (words >= task.wordLimit) {
      return 7;
    }

    if (words >= task.wordLimit * 0.8) {
      return 6;
    }

    if (words >= task.wordLimit * 0.5) {
      return 5;
    }

    return 4.5;
  });

  const average = taskBands.reduce((sum, value) => sum + value, 0) / taskBands.length;
  return roundToHalf(average);
}

function scoreCompletedTest(test: Test, state: ExamState, result: TestResult): TestResult {
  const answers = findStudentAnswers(state, test.id);
  const listening = calculateListeningScore(test, answers);
  const reading = calculateReadingScore(test, answers);
  const writingBand = calculateWritingBand(test, answers);
  const bandValues = [listening.band, reading.band, writingBand].filter(
    (value): value is number => typeof value === 'number',
  );

  const overallBand = bandValues.length
    ? roundToHalf(bandValues.reduce((sum, value) => sum + value, 0) / bandValues.length)
    : undefined;

  return {
    ...result,
    status: TestStatus.COMPLETED,
    completedAt: now(),
    listeningScore: listening.score,
    listeningBand: listening.band,
    readingScore: reading.score,
    readingBand: reading.band,
    writingBand,
    overallBand,
    listeningCompleted: true,
    readingCompleted: true,
    writingCompleted: true,
    updatedAt: now(),
  };
}

function getResultForTest(state: ExamState, testId: string): TestResult | undefined {
  return state.results.find((result) => result.testId === testId);
}

function ensureResultForTest(state: ExamState, test: Test): TestResult {
  const existing = getResultForTest(state, test.id);
  if (existing) {
    return existing;
  }

  const createdAt = now();
  const result: TestResult = {
    id: `result-${test.id}`,
    userId: DEMO_USER.id,
    testId: test.id,
    status: TestStatus.IN_PROGRESS,
    startedAt: createdAt,
    listeningCompleted: false,
    readingCompleted: false,
    writingCompleted: false,
    test: clone(test),
    user: DEMO_USER,
    createdAt,
    updatedAt: createdAt,
  };

  upsertResult(state, result);
  return result;
}

function attachTestSnapshot(state: ExamState, result: TestResult): TestResult {
  const test = getTest(state, result.testId);
  return {
    ...result,
    test: test ? clone(test) : result.test,
    user: result.user || DEMO_USER,
  };
}

function createTestTemplate(data: Partial<Test> & Record<string, unknown>): Test {
  const testId = typeof data.id === 'string' && data.id.trim() ? data.id : `test-${Date.now()}`;

  return {
    id: testId,
    title: data.title || 'Untitled Mock Test',
    description: data.description || '',
    isActive: data.isActive ?? true,
    listeningDuration: data.listeningDuration ?? 40,
    readingDuration: data.readingDuration ?? 60,
    writingDuration: data.writingDuration ?? 60,
    listeningQuestions: data.listeningQuestions ?? [],
    readingPassages: data.readingPassages ?? [],
    writingTasks: data.writingTasks ?? [],
    createdAt: data.createdAt || now(),
    updatedAt: data.updatedAt || now(),
  };
}

export const studentExamApi = {
  getAvailableTests: async (): Promise<Test[]> => {
    const portalToken = getStoredPortalToken();

    if (portalToken) {
      try {
        return await fetchRemoteTests(portalToken);
      } catch (error) {
        console.error('Falling back to local exam data:', error);
      }
    }

    const state = loadState();
    return state.tests.filter((test) => test.isActive).map((test) => clone(test));
  },

  getTest: async (testId: string): Promise<Test> => {
    const portalToken = getStoredPortalToken();

    if (portalToken) {
      try {
        return await fetchRemoteTestById(testId, portalToken);
      } catch (error) {
        console.error(`Falling back to local test for ${testId}:`, error);
      }
    }

    const state = loadState();
    const test = getTest(state, testId);

    if (!test) {
      throw new Error('Test not found');
    }

    return clone(test);
  },

  startTest: async (testId: string): Promise<TestResult> => {
    const state = loadState();
    const test = getTest(state, testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const result = ensureResultForTest(state, test);
    saveState(state);
    return clone(attachTestSnapshot(state, result));
  },

  submitAnswer: async (answer: SubmitAnswerDto): Promise<StudentAnswer> => {
    const state = loadState();
    const test = getTest(state, answer.testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const storedAnswer: StudentAnswer = {
      id: `answer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: DEMO_USER.id,
      testId: answer.testId,
      answerType: answer.answerType,
      questionId: answer.questionId,
      questionNumber: answer.questionNumber,
      studentAnswer: answer.studentAnswer,
      isCorrect: isListeningOrReadingCorrect(test, {
        id: '',
        userId: DEMO_USER.id,
        testId: answer.testId,
        answerType: answer.answerType,
        questionId: answer.questionId,
        questionNumber: answer.questionNumber,
        studentAnswer: answer.studentAnswer,
        isCorrect: false,
        createdAt: now(),
        updatedAt: now(),
      }),
      createdAt: now(),
      updatedAt: now(),
    };

    upsertAnswer(state, storedAnswer);
    saveState(state);
    return clone(storedAnswer);
  },

  bulkSubmitAnswers: async (data: BulkSubmitAnswersDto): Promise<StudentAnswer[]> => {
    const state = loadState();
    const test = getTest(state, data.testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const submittedAnswers = data.answers.map(
      (answer) =>
        ({
          id: `answer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          userId: DEMO_USER.id,
          testId: answer.testId,
          answerType: answer.answerType,
          questionId: answer.questionId,
          questionNumber: answer.questionNumber,
          studentAnswer: answer.studentAnswer,
          isCorrect: isListeningOrReadingCorrect(test, {
            id: '',
            userId: DEMO_USER.id,
            testId: answer.testId,
            answerType: answer.answerType,
            questionId: answer.questionId,
            questionNumber: answer.questionNumber,
            studentAnswer: answer.studentAnswer,
            isCorrect: false,
            createdAt: now(),
            updatedAt: now(),
          }),
          createdAt: now(),
          updatedAt: now(),
        }) satisfies StudentAnswer,
    );

    submittedAnswers.forEach((answer) => upsertAnswer(state, answer));
    saveState(state);
    return submittedAnswers.map((answer) => clone(answer));
  },

  completeSection: async (
    testId: string,
    section: 'listening' | 'reading' | 'writing',
  ): Promise<TestResult> => {
    const state = loadState();
    const test = getTest(state, testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const result = ensureResultForTest(state, test);
    const updatedResult: TestResult = {
      ...result,
      listeningCompleted: section === 'listening' ? true : result.listeningCompleted,
      readingCompleted: section === 'reading' ? true : result.readingCompleted,
      writingCompleted: section === 'writing' ? true : result.writingCompleted,
      updatedAt: now(),
    };

    const sectionComplete =
      updatedResult.listeningCompleted &&
      updatedResult.readingCompleted &&
      updatedResult.writingCompleted;

    const nextResult = sectionComplete
      ? scoreCompletedTest(test, state, updatedResult)
      : updatedResult;

    upsertResult(state, nextResult);
    saveState(state);
    return clone(attachTestSnapshot(state, nextResult));
  },

  getTestResult: async (testId: string): Promise<TestResult> => {
    const state = loadState();
    const result = getResultForTest(state, testId);

    if (!result) {
      throw new Error('Result not found');
    }

    return clone(attachTestSnapshot(state, result));
  },

  getMyResults: async (): Promise<TestResult[]> => {
    const state = loadState();
    return state.results
      .filter((result) => result.status === TestStatus.COMPLETED)
      .map((result) => clone(attachTestSnapshot(state, result)));
  },

  getMyAnswers: async (testId: string): Promise<StudentAnswer[]> => {
    const state = loadState();
    return findStudentAnswers(state, testId).map((answer) => clone(answer));
  },
};

export const adminExamApi = {
  createTest: async (data: Partial<Test>): Promise<Test> => {
    const state = loadState();
    const test = createTestTemplate(data as Partial<Test> & Record<string, unknown>);
    upsertTest(state, test);
    saveState(state);
    return clone(test);
  },

  getAllTests: async (includeInactive = false): Promise<Test[]> => {
    const state = loadState();
    const tests = includeInactive ? state.tests : state.tests.filter((test) => test.isActive);
    return tests.map((test) => clone(test));
  },

  getTestById: async (id: string): Promise<Test> => {
    const state = loadState();
    const test = getTest(state, id);

    if (!test) {
      throw new Error('Test not found');
    }

    return clone(test);
  },

  updateTest: async (id: string, data: Partial<Test>): Promise<Test> => {
    const state = loadState();
    const index = state.tests.findIndex((test) => test.id === id);

    if (index < 0) {
      throw new Error('Test not found');
    }

    const updated: Test = {
      ...state.tests[index],
      ...data,
      id,
      updatedAt: now(),
    };

    state.tests[index] = updated;
    saveState(state);
    return clone(updated);
  },

  deleteTest: async (id: string): Promise<void> => {
    const state = loadState();
    state.tests = state.tests.filter((test) => test.id !== id);
    state.results = state.results.filter((result) => result.testId !== id);
    state.answers = state.answers.filter((answer) => answer.testId !== id);
    saveState(state);
  },

  createListeningQuestion: async (data: Partial<ListeningQuestion> & { testId: string }): Promise<ListeningQuestion> => {
    const state = loadState();
    const test = getTest(state, data.testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const question: ListeningQuestion = {
      id: data.id || `${data.testId}-listening-${test.listeningQuestions.length + 1}`,
      testId: data.testId,
      sectionNumber: data.sectionNumber ?? 1,
      questionNumber: data.questionNumber ?? test.listeningQuestions.length + 1,
      questionType: data.questionType ?? ListeningQuestionType.FORM_COMPLETION,
      questionText: data.questionText ?? '',
      options: data.options,
      correctAnswer: data.correctAnswer,
      audioUrl: data.audioUrl,
      instruction: data.instruction,
      createdAt: now(),
    };

    test.listeningQuestions.push(question);
    test.updatedAt = now();
    saveState(state);
    return clone(question);
  },

  createReadingPassage: async (data: Partial<ReadingPassage> & { testId: string }): Promise<ReadingPassage> => {
    const state = loadState();
    const test = getTest(state, data.testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const passage: ReadingPassage = {
      id: data.id || `reading-${data.testId}-${test.readingPassages.length + 1}`,
      testId: data.testId,
      passageNumber: data.passageNumber ?? test.readingPassages.length + 1,
      title: data.title ?? '',
      passageText: data.passageText ?? '',
      questions: data.questions ?? [],
      createdAt: now(),
    };

    test.readingPassages.push(passage);
    test.updatedAt = now();
    saveState(state);
    return clone(passage);
  },

  createReadingQuestion: async (data: Partial<ReadingQuestion> & { passageId: string }): Promise<ReadingQuestion> => {
    const state = loadState();
    const passage = state.tests
      .flatMap((test) => test.readingPassages)
      .find((item) => item.id === data.passageId);

    if (!passage) {
      throw new Error('Passage not found');
    }

    const question: ReadingQuestion = {
      id: data.id || `${data.passageId}-question-${passage.questions.length + 1}`,
      passageId: data.passageId,
      questionNumber: data.questionNumber ?? passage.questions.length + 1,
      questionType: data.questionType ?? ReadingQuestionType.MULTIPLE_CHOICE,
      questionText: data.questionText ?? '',
      options: data.options,
      correctAnswer: data.correctAnswer,
      instruction: data.instruction,
      createdAt: now(),
    };

    passage.questions.push(question);

    const test = state.tests.find((item) => item.readingPassages.some((itemPassage) => itemPassage.id === data.passageId));
    if (test) {
      test.updatedAt = now();
    }

    saveState(state);
    return clone(question);
  },

  createWritingTask: async (data: Partial<WritingTask> & { testId: string }): Promise<WritingTask> => {
    const state = loadState();
    const test = getTest(state, data.testId);

    if (!test) {
      throw new Error('Test not found');
    }

    const task: WritingTask = {
      id: data.id || `${data.testId}-writing-${test.writingTasks.length + 1}`,
      testId: data.testId,
      taskNumber: data.taskNumber ?? test.writingTasks.length + 1,
      instruction: data.instruction ?? '',
      questionText: data.questionText ?? '',
      wordLimit: data.wordLimit ?? 250,
      imageUrl: data.imageUrl,
      createdAt: now(),
    };

    test.writingTasks.push(task);
    test.updatedAt = now();
    saveState(state);
    return clone(task);
  },

  getAllResults: async (): Promise<TestResult[]> => {
    const state = loadState();
    return state.results.map((result) => clone(attachTestSnapshot(state, result)));
  },
};