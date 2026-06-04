'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { studentExamApi } from '@/lib/exam-api';
import { TestResult, StudentAnswer } from '@/lib/types/exam.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Headphones,
  Pen,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [result, setResult] = useState<TestResult | null>(null);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [id]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const [resultData, answersData] = await Promise.all([
        studentExamApi.getTestResult(id),
        studentExamApi.getMyAnswers(id),
      ]);
      setResult(resultData);
      setAnswers(answersData);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBandTone = (band: number | undefined | null) => {
    if (!band) return 'bg-[#1A1F2C]/8 text-[#1A1F2C]/60';
    if (band >= 8) return 'bg-[#0F5132] text-white';
    if (band >= 6.5) return 'bg-[#14593a]/85 text-white';
    if (band >= 5) return 'bg-[#D4A24C] text-[#2A1D08]';
    return 'bg-[#B2823A] text-white';
  };

  const getBandBarTone = (band: number | undefined | null) => {
    if (!band) return 'bg-[#1A1F2C]/20';
    if (band >= 8) return 'bg-gradient-to-r from-[#0F5132] to-[#14593a]';
    if (band >= 6.5) return 'bg-gradient-to-r from-[#14593a] to-[#0F5132]';
    if (band >= 5) return 'bg-gradient-to-r from-[#D4A24C] to-[#B2823A]';
    return 'bg-gradient-to-r from-[#B2823A] to-[#7A5320]';
  };

  const getBandDescription = (band: number | undefined | null): string => {
    if (!band) return 'No score';
    if (band >= 9) return 'Expert User';
    if (band >= 8) return 'Very Good User';
    if (band >= 7) return 'Good User';
    if (band >= 6) return 'Competent User';
    if (band >= 5) return 'Modest User';
    return 'Limited User';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="flex items-center gap-3 rounded-full border border-[#0F5132]/15 bg-white px-5 py-3 shadow-lg">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A24C]" />
          <span className="font-heading text-sm font-semibold text-[#1A1F2C]">
            Loading results…
          </span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <p className="font-heading text-xl text-[#1A1F2C]">Results not found</p>
          <Link href="/exam/dashboard" className="mt-4 inline-block">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    {
      label: 'Listening',
      Icon: Headphones,
      band: result.listeningBand,
      score: result.listeningScore,
    },
    {
      label: 'Reading',
      Icon: BookOpen,
      band: result.readingBand,
      score: result.readingScore,
    },
    {
      label: 'Writing',
      Icon: Pen,
      band: result.writingBand,
      score: undefined,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3] to-white" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-25" />
      <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-[#0F5132]/10 blur-[100px]" />
      <div className="absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-[#D4A24C]/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-6">
          <Link href="/exam/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Badge variant="gold" className="mb-3">
          <Award className="h-3 w-3" />
          Result Report
        </Badge>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-4xl">
          Test Results
        </h1>
        <div className="mt-3 h-px w-20 bg-gradient-to-r from-[#D4A24C] to-transparent" />

        {/* Overall Band */}
        {typeof result.overallBand === 'number' && (
          <Card className="mt-8 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#0F5132] via-[#D4A24C] to-[#0F5132]" />
            <CardContent className="relative overflow-hidden p-10 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#0F5132]/8 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#D4A24C]/20 blur-3xl"
              />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B2823A]">
                  Overall Band Score
                </p>
                <p className="mt-3 font-heading text-7xl font-bold text-emerald-shine sm:text-8xl">
                  {result.overallBand.toFixed(1)}
                </p>
                <p className="mt-3 font-heading text-xl italic text-[#1A1F2C]/75">
                  {getBandDescription(result.overallBand)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section Scores */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {sections.map(({ label, Icon, band, score }) => (
            <Card key={label} className="card-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="inline-flex items-center gap-2 font-heading">
                    <Icon className="h-4 w-4 text-[#D4A24C]" />
                    {label}
                  </CardTitle>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-3 py-1 font-heading text-xs font-bold',
                      getBandTone(band),
                    )}
                  >
                    Band {band?.toFixed(1) || '—'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {typeof score === 'number' && (
                    <>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-[#1A1F2C]/60">Score</span>
                        <span className="font-heading text-lg font-semibold text-[#0F5132]">
                          {score} <span className="text-[#1A1F2C]/45">/ 40</span>
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#1A1F2C]/8">
                        <div
                          className={cn('h-full rounded-full transition-all', getBandBarTone(band))}
                          style={{ width: `${(score / 40) * 100}%` }}
                        />
                      </div>
                    </>
                  )}
                  {label === 'Writing' && !band && (
                    <div className="rounded-xl border border-[#D4A24C]/40 bg-[#FBF3E1]/70 px-3 py-2.5 text-xs text-[#7A5320]">
                      <Clock className="mr-1 inline-block h-3.5 w-3.5" />
                      Awaiting manual evaluation
                    </div>
                  )}
                  {band && (
                    <p className="text-xs italic text-[#1A1F2C]/60">
                      {getBandDescription(band)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-heading">Test Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {[
                { label: 'Test Name', value: result.test?.title || 'N/A' },
                {
                  label: 'Started At',
                  value: new Date(result.startedAt).toLocaleString(),
                },
                {
                  label: 'Completed At',
                  value: result.completedAt
                    ? new Date(result.completedAt).toLocaleString()
                    : 'In Progress',
                },
                { label: 'Status', value: result.status, badge: true },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-heading text-sm font-semibold text-[#1A1F2C]">
                    {item.badge ? (
                      <Badge variant={item.value === 'completed' ? 'emerald' : 'ivory'}>
                        {item.value as string}
                      </Badge>
                    ) : (
                      (item.value as string)
                    )}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-heading">Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#0F5132]/10 bg-gradient-to-b from-[#FAF8F3]/70 to-white p-5">
                <h3 className="inline-flex items-center gap-2 font-heading text-base font-semibold text-[#0F5132]">
                  <TrendingUp className="h-4 w-4" />
                  Strengths
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#1A1F2C]/75">
                  {result.listeningBand && result.listeningBand >= 7 && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                      Strong listening comprehension skills
                    </li>
                  )}
                  {result.readingBand && result.readingBand >= 7 && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                      Excellent reading and analytical abilities
                    </li>
                  )}
                  {result.writingBand && result.writingBand >= 7 && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F5132]" />
                      Proficient in written communication
                    </li>
                  )}
                  {!(result.listeningBand && result.listeningBand >= 7) &&
                    !(result.readingBand && result.readingBand >= 7) &&
                    !(result.writingBand && result.writingBand >= 7) && (
                      <li className="text-[#1A1F2C]/55 italic">
                        Keep practicing — strengths will surface as your band scores climb.
                      </li>
                    )}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#D4A24C]/30 bg-gradient-to-b from-[#FBF3E1]/65 to-white p-5">
                <h3 className="inline-flex items-center gap-2 font-heading text-base font-semibold text-[#7A5320]">
                  <AlertCircle className="h-4 w-4" />
                  Areas for Improvement
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#1A1F2C]/75">
                  {result.listeningBand && result.listeningBand < 6.5 && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A24C]" />
                      Practice listening to various accents and speeds
                    </li>
                  )}
                  {result.readingBand && result.readingBand < 6.5 && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A24C]" />
                      Work on reading comprehension and speed
                    </li>
                  )}
                  {!result.writingBand && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A24C]" />
                      Writing section pending evaluation
                    </li>
                  )}
                  {result.listeningBand &&
                    result.listeningBand >= 6.5 &&
                    result.readingBand &&
                    result.readingBand >= 6.5 &&
                    result.writingBand &&
                    result.writingBand >= 6.5 && (
                      <li className="text-[#1A1F2C]/55 italic">
                        Solid across the board — focus on polishing technique to push higher.
                      </li>
                    )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
