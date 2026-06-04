'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { studentExamApi } from '@/lib/exam-api';
import {
  Test,
  TestResult,
  AnswerType,
  SubmitAnswerDto,
} from '@/lib/types/exam.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ListeningSection from '@/components/exam/listening-section';
import ReadingSection from '@/components/exam/reading-section';
import WritingSection from '@/components/exam/writing-section';

interface TestInterfaceProps {
  testId: string;
}

type Section = 'listening' | 'reading' | 'writing';

export default function TestInterface({ testId }: TestInterfaceProps) {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>('listening');
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    initializeTest();
  }, [testId]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmitSection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, currentSection]);

  // Auto-save answers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveAnswers();
    }, 5000);

    return () => clearInterval(interval);
  }, [answers]);

  const initializeTest = async () => {
    try {
      setLoading(true);
      const testData = await studentExamApi.getTest(testId);
      setTest(testData);

      // Start the test
      const result = await studentExamApi.startTest(testId);
      setTestResult(result);

      // Set initial timer for listening section
      setTimeRemaining(testData.listeningDuration * 60);
    } catch (error: any) {
      console.error('Error initializing test:', error);
      alert(error.message || 'Failed to start test');
      router.push('/exam/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const saveAnswers = useCallback(async () => {
    if (answers.size === 0 || !test) return;

    const answerDtos: SubmitAnswerDto[] = Array.from(answers.entries()).map(
      ([questionId, answer]) => {
        let answerType: AnswerType;
        let questionNumber = 0;

        // Determine answer type and question number
        if (currentSection === 'listening') {
          answerType = AnswerType.LISTENING;
          const question = test.listeningQuestions.find((q) => q.id === questionId);
          questionNumber = question?.questionNumber || 0;
        } else if (currentSection === 'reading') {
          answerType = AnswerType.READING;
          const question = test.readingPassages
            .flatMap((p) => p.questions)
            .find((q) => q.id === questionId);
          questionNumber = question?.questionNumber || 0;
        } else {
          answerType = AnswerType.WRITING;
          const task = test.writingTasks.find((t) => t.id === questionId);
          questionNumber = task?.taskNumber || 0;
        }

        return {
          testId: test.id,
          answerType,
          questionId,
          questionNumber,
          studentAnswer: answer,
        };
      },
    );

    try {
      await studentExamApi.bulkSubmitAnswers({
        testId: test.id,
        answers: answerDtos,
      });
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  }, [answers, test, currentSection]);

  const handleAutoSubmitSection = async () => {
    await handleSubmitSection();
  };

  const handleSubmitSection = async () => {
    if (!test) return;

    try {
      // Save all answers
      await saveAnswers();

      // Complete the section
      await studentExamApi.completeSection(test.id, currentSection);

      // Move to next section
      if (currentSection === 'listening') {
        setCurrentSection('reading');
        setTimeRemaining(test.readingDuration * 60);
        setAnswers(new Map());
      } else if (currentSection === 'reading') {
        setCurrentSection('writing');
        setTimeRemaining(test.writingDuration * 60);
        setAnswers(new Map());
      } else {
        // Test completed
        router.push(`/exam/results/${test.id}`);
      }
    } catch (error) {
      console.error('Error submitting section:', error);
      alert('Failed to submit section');
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => {
      const newAnswers = new Map(prev);
      newAnswers.set(questionId, answer);
      return newAnswers;
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading || !test) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="flex items-center gap-3 rounded-full border border-[#0F5132]/15 bg-white px-5 py-3 shadow-lg">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A24C]" />
          <span className="font-heading text-sm font-semibold text-[#1A1F2C]">
            Loading test…
          </span>
        </div>
      </div>
    );
  }

  const sectionLabel = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
  const isUrgent = timeRemaining < 300;

  return (
    <div className="relative min-h-screen bg-[#FAF8F3]">
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-25" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 border-b border-[#0F5132]/8 bg-white/90 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B2823A]">
              Section · {sectionLabel}
            </p>
            <h1 className="mt-1 font-heading text-lg font-semibold leading-tight text-[#1A1F2C] sm:text-xl">
              {test.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`rounded-2xl border px-4 py-2 text-right ${
                isUrgent
                  ? 'border-red-200 bg-red-50'
                  : 'border-[#0F5132]/15 bg-gradient-to-b from-[#FAF8F3]/80 to-white'
              }`}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1F2C]/55">
                Time Remaining
              </p>
              <p
                className={`font-heading text-2xl font-bold tabular-nums ${
                  isUrgent ? 'text-red-600' : 'text-[#0F5132]'
                }`}
              >
                {formatTime(timeRemaining)}
              </p>
            </div>
            <Button onClick={handleSubmitSection} size="lg">
              {currentSection === 'writing' ? 'Submit Test' : 'Next Section'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {currentSection === 'listening' && (
          <ListeningSection
            questions={test.listeningQuestions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        )}
        {currentSection === 'reading' && (
          <ReadingSection
            passages={test.readingPassages}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        )}
        {currentSection === 'writing' && (
          <WritingSection
            tasks={test.writingTasks}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        )}
      </div>
    </div>
  );
}
