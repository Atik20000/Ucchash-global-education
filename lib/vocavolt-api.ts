"use client"

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
  TestStatus,
  TestResult,
  WritingTask,
} from "./types/exam.types"

const AUTH_TOKEN_KEY = "vocavolt_student_token"
const DEFAULT_LOGIN_PATH = "/auth/api/login/"
const DEFAULT_TESTS_PATH = "/ielts/api/tests/"

type RemoteTestListItem = {
  id: number
  name: string
  test_type: string
  description?: string
  is_published: boolean
  created_at: string
}

type RemoteTestDetail = {
  id: number
  name: string
  test_type: string
  description?: string
  is_published: boolean
  created_at: string
  sections?: Array<{
    id: number
    skill: "listening" | "reading" | "writing" | "speaking"
    order: number
    time_limit?: number
    instructions?: string
    listening_parts?: Array<any>
    reading_passages?: Array<any>
    writing_tasks?: Array<any>
    speaking_tasks?: Array<any>
  }>
}

function getEnvUrl(name: string, fallbackPath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_VOCAVOLT_API_BASE_URL
  const path = process.env[name] || fallbackPath

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_VOCAVOLT_API_BASE_URL is not set")
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return new URL(path, baseUrl).toString()
}

export const VOCAVOLT_ENDPOINTS = {
  get login() {
    return getEnvUrl("NEXT_PUBLIC_VOCAVOLT_LOGIN_PATH", DEFAULT_LOGIN_PATH)
  },
  get tests() {
    return getEnvUrl("NEXT_PUBLIC_VOCAVOLT_TESTS_PATH", DEFAULT_TESTS_PATH)
  },
} as const

export function getStoredPortalToken(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredPortalToken(token: string): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearStoredPortalToken(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
}

function authHeaders(token?: string): HeadersInit {
  const storedToken = token || getStoredPortalToken() || undefined
  return storedToken ? { Authorization: `Token ${storedToken}` } : {}
}

function getAuthHeaderVariants(token?: string): HeadersInit[] {
  const storedToken = token || getStoredPortalToken() || undefined

  if (!storedToken) {
    return [{}]
  }

  return [
    { Authorization: `Token ${storedToken}` },
    { Authorization: `Bearer ${storedToken}` },
    { Authorization: storedToken },
  ]
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(data?.message || data?.detail || `Request failed with status ${response.status}`)
  }

  return data as T
}

async function fetchJsonWithAuthFallback<T>(url: string, token?: string): Promise<T> {
  const headerVariants = getAuthHeaderVariants(token)
  let lastError: unknown = null

  for (const headers of headerVariants) {
    try {
      return await fetchJson<T>(url, {
        headers,
        credentials: "include",
      })
    } catch (error) {
      lastError = error
      if (error instanceof Error && !/401|Unauthorized/i.test(error.message)) {
        throw error
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Unauthorized")
}

export async function loginToVocavolt(email: string, password: string): Promise<string> {
  const data = await fetchJson<{ status?: number; message?: string; token?: string; access_token?: string }>(
    VOCAVOLT_ENDPOINTS.login,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  )

  const token = data.token || data.access_token
  if (!token) {
    throw new Error(data.message || "Login succeeded but token was missing")
  }

  return token
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

function toQuestionText(item: any, fallback: string): string {
  if (item?.rendered) return item.rendered

  const before = item?.text_before || ""
  const after = item?.text_after || ""
  const combined = `${before} _____ ${after}`.trim()
  return combined || fallback
}

function mapListeningQuestions(testId: string, sections: NonNullable<RemoteTestDetail["sections"]>): ListeningQuestion[] {
  const listeningSection = sections.find((section) => section.skill === "listening")
  if (!listeningSection) return []

  const createdAt = listeningSection?.instructions ? new Date().toISOString() : new Date().toISOString()
  const questions: ListeningQuestion[] = []

  for (const part of listeningSection.listening_parts || []) {
    for (const group of part.question_groups || []) {
      const groupType = group.question_type as string
      const isMcq = groupType === "mcq"
      const isFillIn = groupType === "form_completion" || groupType === "note_completion"
      const items = Array.isArray(group.note_sections)
        ? group.note_sections.flatMap((section: any) => section.items || [])
        : []
      const optionsByQuestion = new Map<number, string[]>()

      for (const option of group.mcq_options || []) {
        const list = optionsByQuestion.get(option.question_number) || []
        list.push(`${option.option_label}. ${option.option_text}`)
        optionsByQuestion.set(option.question_number, list)
      }

      for (const question of group.questions || []) {
        const questionNumber = question.question_number
        const item = items.find((entry: any) => entry.order === questionNumber || entry.id === question.id)
        const questionType = isMcq
          ? ListeningQuestionType.MULTIPLE_CHOICE
          : groupType === "note_completion"
            ? ListeningQuestionType.NOTE_COMPLETION
            : ListeningQuestionType.FORM_COMPLETION

        questions.push({
          id: `remote-listening-${part.part_number}-${questionNumber}`,
          testId,
          sectionNumber: part.part_number,
          questionNumber,
          questionType,
          questionText: isMcq
            ? group.instruction || `Question ${questionNumber}`
            : toQuestionText(item, group.instruction || `Question ${questionNumber}`),
          options: isMcq ? optionsByQuestion.get(questionNumber) : undefined,
          audioUrl: part.audio_file || undefined,
          instruction: group.instruction || undefined,
          createdAt,
        })
      }
    }
  }

  return questions
}

function parseHeadingList(extraText: string | undefined): string[] {
  if (!extraText) return []

  return extraText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^list of headings/i.test(line))
}

function mapReadingPassages(testId: string, sections: NonNullable<RemoteTestDetail["sections"]>): ReadingPassage[] {
  const readingSection = sections.find((section) => section.skill === "reading")
  if (!readingSection) return []

  return (readingSection.reading_passages || []).map((passage, passageIndex) => {
    const passageId = `remote-reading-${passage.passage_number || passageIndex + 1}`
    const questions: ReadingQuestion[] = []

    for (const group of passage.question_groups || []) {
      const groupType = group.question_type as string
      const headingOptions = parseHeadingList(group.extra_text)

      for (const question of group.questions || []) {
        const questionType =
          groupType === "tfng"
            ? ReadingQuestionType.TRUE_FALSE_NOT_GIVEN
            : groupType === "matching_headings"
              ? ReadingQuestionType.MULTIPLE_CHOICE
              : groupType === "sentence_completion"
                ? ReadingQuestionType.SENTENCE_COMPLETION
                : ReadingQuestionType.MULTIPLE_CHOICE

        questions.push({
          id: `remote-reading-${passage.passage_number || passageIndex + 1}-${question.question_number}`,
          passageId,
          questionNumber: question.question_number,
          questionType,
          questionText: question.question_text || `Question ${question.question_number}`,
          options: questionType === ReadingQuestionType.MULTIPLE_CHOICE ? headingOptions : undefined,
          instruction: group.instruction || undefined,
          createdAt: new Date().toISOString(),
        })
      }
    }

    return {
      id: passageId,
      testId,
      passageNumber: passage.passage_number || passageIndex + 1,
      title: passage.title || `Passage ${passageIndex + 1}`,
      passageText: [passage.body, passage.source ? `Source: ${passage.source}` : ""].filter(Boolean).join("\n\n"),
      questions,
      createdAt: new Date().toISOString(),
    }
  })
}

function mapWritingTasks(testId: string, sections: NonNullable<RemoteTestDetail["sections"]>): WritingTask[] {
  const writingSection = sections.find((section) => section.skill === "writing")
  if (!writingSection) return []

  return (writingSection.writing_tasks || []).map((task, index) => ({
    id: `remote-writing-${task.task_number || index + 1}`,
    testId,
    taskNumber: task.task_number || index + 1,
    instruction: `Writing Task ${task.task_number || index + 1}`,
    questionText: task.prompt || "",
    wordLimit: task.min_words || (index === 0 ? 150 : 250),
    imageUrl: undefined,
    createdAt: new Date().toISOString(),
  }))
}

export function mapRemoteTestToLocalTest(remoteTest: RemoteTestDetail): Test {
  const sections = remoteTest.sections || []
  const testId = String(remoteTest.id)
  const listeningSection = sections.find((section) => section.skill === "listening")
  const readingSection = sections.find((section) => section.skill === "reading")
  const writingSection = sections.find((section) => section.skill === "writing")

  return {
    id: testId,
    title: remoteTest.name,
    description: remoteTest.description || "",
    isActive: remoteTest.is_published,
    listeningDuration: listeningSection?.time_limit || 40,
    readingDuration: readingSection?.time_limit || 60,
    writingDuration: writingSection?.time_limit || 60,
    listeningQuestions: mapListeningQuestions(testId, sections),
    readingPassages: mapReadingPassages(testId, sections),
    writingTasks: mapWritingTasks(testId, sections),
    createdAt: remoteTest.created_at || new Date().toISOString(),
    updatedAt: remoteTest.created_at || new Date().toISOString(),
  }
}

export async function fetchRemoteTests(token?: string): Promise<Test[]> {
  const items = await fetchJsonWithAuthFallback<RemoteTestListItem[]>(VOCAVOLT_ENDPOINTS.tests, token)

  const tests = await Promise.all(
    items.map(async (item) => {
      const detail = await fetchJsonWithAuthFallback<RemoteTestDetail>(`${VOCAVOLT_ENDPOINTS.tests}${item.id}/`, token)
      return mapRemoteTestToLocalTest(detail)
    }),
  )

  return tests
}

export async function fetchRemoteTestById(testId: string, token?: string): Promise<Test> {
  const detail = await fetchJsonWithAuthFallback<RemoteTestDetail>(`${VOCAVOLT_ENDPOINTS.tests}${testId}/`, token)

  return mapRemoteTestToLocalTest(detail)
}
