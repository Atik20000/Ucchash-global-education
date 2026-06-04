'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { studentExamApi } from '@/lib/exam-api';
import { Test, TestResult } from '@/lib/types/exam.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { clearStoredPortalToken, getStoredPortalToken } from '@/lib/vocavolt-api';
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  LogOut,
  Pen,
  Target,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [completedResults, setCompletedResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredPortalToken();
    if (!token) {
      router.replace('/exam/login');
      return;
    }
    loadData();
  }, []);

  const handleLogout = () => {
    clearStoredPortalToken();
    router.push('/exam/login');
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [tests, results] = await Promise.all([
        studentExamApi.getAvailableTests(),
        studentExamApi.getMyResults(),
      ]);
      setAvailableTests(tests);
      setCompletedResults(results);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBandTone = (band: number | undefined) => {
    if (!band) return { bg: 'bg-[#1A1F2C]/8', text: 'text-[#1A1F2C]/60' };
    if (band >= 8) return { bg: 'bg-[#0F5132]', text: 'text-white' };
    if (band >= 6.5) return { bg: 'bg-[#14593a]/85', text: 'text-white' };
    if (band >= 5) return { bg: 'bg-[#D4A24C]', text: 'text-[#2A1D08]' };
    return { bg: 'bg-[#B2823A]', text: 'text-white' };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="flex items-center gap-3 rounded-full border border-[#0F5132]/15 bg-white px-5 py-3 shadow-lg">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A24C]" />
          <span className="font-heading text-sm font-semibold text-[#1A1F2C]">
            Loading your dashboard…
          </span>
        </div>
      </div>
    );
  }

  const completedTestIds = new Set(completedResults.map((r) => r.testId));
  const totalAvailableExams = availableTests.length;
  const alreadyTakenExams = completedResults.length;
  const averageBandRaw = completedResults.reduce((sum, result) => sum + (result.overallBand || 0), 0);
  const averageBand = alreadyTakenExams > 0 ? averageBandRaw / alreadyTakenExams : undefined;
  const rightAnswers = completedResults.reduce(
    (sum, result) => sum + (result.listeningScore || 0) + (result.readingScore || 0),
    0,
  );
  const totalObjectiveQuestions = completedResults.reduce((sum, result) => {
    const sourceTest = result.test || availableTests.find((t) => t.id === result.testId);
    if (!sourceTest) return sum;
    const listeningTotal = sourceTest.listeningQuestions?.length || 0;
    const readingTotal =
      sourceTest.readingPassages?.reduce((s, p) => s + (p.questions?.length || 0), 0) || 0;
    return sum + listeningTotal + readingTotal;
  }, 0);
  const wrongAnswers = Math.max(totalObjectiveQuestions - rightAnswers, 0);
  const evaluatedCount = completedResults.filter(
    (result) => typeof result.overallBand === 'number',
  ).length;
  const pendingEvaluation = Math.max(alreadyTakenExams - evaluatedCount, 0);

  const statCards = [
    {
      label: 'Total Available',
      value: totalAvailableExams,
      Icon: BookOpenCheck,
      tone: 'emerald' as const,
    },
    {
      label: 'Already Taken',
      value: alreadyTakenExams,
      Icon: ClipboardCheck,
      tone: 'gold' as const,
    },
    {
      label: 'My Band Score',
      value: typeof averageBand === 'number' ? averageBand.toFixed(1) : '—',
      Icon: Award,
      tone: 'emerald' as const,
    },
    {
      label: 'Right Answers',
      value: rightAnswers,
      Icon: CheckCircle2,
      tone: 'gold' as const,
    },
    {
      label: 'Wrong Answers',
      value: wrongAnswers,
      Icon: XCircle,
      tone: 'emerald' as const,
    },
    {
      label: 'Evaluation',
      value: `${evaluatedCount} done / ${pendingEvaluation} pending`,
      Icon: Target,
      tone: 'gold' as const,
      compact: true,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3] to-white" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-25" />
      <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/10 blur-[100px]" />
      <div className="absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="gold" className="mb-3">
              <ChartNoAxesCombined className="h-3 w-3" />
              Student Dashboard
            </Badge>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-4xl">
              IELTS Mock Test Overview
            </h1>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <p className="mt-3 max-w-xl text-sm text-[#1A1F2C]/65 sm:text-base">
              Track your exam progress, band performance and evaluation status in one place.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {statCards.map(({ label, value, Icon, tone, compact }) => (
            <div
              key={label}
              className="card-lift relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white p-4 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_28px_-16px_rgba(15,81,50,0.16)]"
            >
              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl',
                  tone === 'gold' ? 'bg-[#D4A24C]/15' : 'bg-[#0F5132]/12',
                )}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1F2C]/55">
                    {label}
                  </p>
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-lg',
                      tone === 'gold'
                        ? 'bg-gradient-to-b from-[#E6BD78] to-[#B2823A] text-white'
                        : 'bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p
                  className={cn(
                    'mt-3 font-heading font-bold text-[#0F5132]',
                    compact ? 'text-sm leading-5' : 'text-2xl sm:text-3xl',
                  )}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Available Tests */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-[#1A1F2C]">Available Tests</h2>
          <div className="mt-2 h-px w-14 bg-gradient-to-r from-[#D4A24C] to-transparent" />

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableTests.map((test) => {
              const isTaken = completedTestIds.has(test.id);
              return (
                <Card key={test.id} className="card-lift">
                  <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="font-heading text-lg">{test.title}</CardTitle>
                      {isTaken && <Badge variant="gold">Completed</Badge>}
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5 space-y-2.5 rounded-xl border border-[#0F5132]/10 bg-[#FAF8F3]/60 p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-[#1A1F2C]/70">
                          <Headphones className="h-3.5 w-3.5 text-[#D4A24C]" /> Listening
                        </span>
                        <span className="font-heading font-semibold text-[#0F5132]">
                          {test.listeningDuration} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-[#1A1F2C]/70">
                          <BookOpenCheck className="h-3.5 w-3.5 text-[#D4A24C]" /> Reading
                        </span>
                        <span className="font-heading font-semibold text-[#0F5132]">
                          {test.readingDuration} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-[#1A1F2C]/70">
                          <Pen className="h-3.5 w-3.5 text-[#D4A24C]" /> Writing
                        </span>
                        <span className="font-heading font-semibold text-[#0F5132]">
                          {test.writingDuration} min
                        </span>
                      </div>
                    </div>
                    {!isTaken ? (
                      <Link href={`/exam/test/${test.id}`}>
                        <Button className="w-full group" size="lg">
                          Start Test
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/exam/results/${test.id}`}>
                        <Button variant="outline" className="w-full" size="lg">
                          View Results
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Completed Tests */}
        {completedResults.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#1A1F2C]">Your Results</h2>
            <div className="mt-2 h-px w-14 bg-gradient-to-r from-[#D4A24C] to-transparent" />

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedResults.map((result) => {
                const overallTone = getBandTone(result.overallBand);
                return (
                  <Card key={result.id} className="card-lift">
                    <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">
                        {result.test?.title || 'Test'}
                      </CardTitle>
                      <CardDescription>
                        Completed on{' '}
                        {new Date(result.completedAt || result.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {typeof result.overallBand === 'number' && (
                          <div className="rounded-2xl border border-[#0F5132]/10 bg-gradient-to-b from-[#FAF8F3]/80 to-white py-5 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                              Overall Band
                            </p>
                            <p className="mt-2 font-heading text-5xl font-bold text-[#0F5132]">
                              {result.overallBand.toFixed(1)}
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'Listening', band: result.listeningBand },
                            { label: 'Reading', band: result.readingBand },
                            { label: 'Writing', band: result.writingBand },
                          ].map(({ label, band }) => {
                            const tone = getBandTone(band);
                            return (
                              <div
                                key={label}
                                className="rounded-xl border border-[#0F5132]/10 bg-white p-3 text-center"
                              >
                                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#1A1F2C]/55">
                                  {label}
                                </p>
                                <p
                                  className={cn(
                                    'mt-2 inline-flex min-w-[42px] items-center justify-center rounded-full px-2 py-1 font-heading text-sm font-bold',
                                    tone.bg,
                                    tone.text,
                                  )}
                                >
                                  {band?.toFixed(1) || '—'}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <Link href={`/exam/results/${result.testId}`}>
                          <Button variant="outline" className="mt-2 w-full" size="lg">
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
