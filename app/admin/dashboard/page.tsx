'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { adminExamApi } from '@/lib/exam-api';
import { Test, TestResult, TestStatus } from '@/lib/types/exam.types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Edit3,
  FileText,
  Headphones,
  Layers,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [testSearch, setTestSearch] = useState('');
  const [testStatusFilter, setTestStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [testPage, setTestPage] = useState(1);
  const [resultSearch, setResultSearch] = useState('');
  const [resultStatusFilter, setResultStatusFilter] = useState<'all' | TestStatus>('all');
  const [resultPage, setResultPage] = useState(1);

  const TESTS_PER_PAGE = 6;
  const RESULTS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [testsData, resultsData] = await Promise.all([
        adminExamApi.getAllTests(true),
        adminExamApi.getAllResults(),
      ]);
      setTests(testsData);
      setResults(resultsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;
    try {
      await adminExamApi.deleteTest(id);
      setTests(tests.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Failed to delete test');
    }
  };

  const handleToggleActive = async (test: Test) => {
    try {
      const updated = await adminExamApi.updateTest(test.id, {
        isActive: !test.isActive,
      });
      setTests(tests.map((t) => (t.id === test.id ? updated : t)));
    } catch (error) {
      console.error('Error updating test:', error);
      alert('Failed to update test');
    }
  };

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch =
        test.title.toLowerCase().includes(testSearch.toLowerCase()) ||
        test.description.toLowerCase().includes(testSearch.toLowerCase());
      const matchesStatus =
        testStatusFilter === 'all' ||
        (testStatusFilter === 'active' && test.isActive) ||
        (testStatusFilter === 'inactive' && !test.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [tests, testSearch, testStatusFilter]);

  const paginatedTests = useMemo(() => {
    const start = (testPage - 1) * TESTS_PER_PAGE;
    return filteredTests.slice(start, start + TESTS_PER_PAGE);
  }, [filteredTests, testPage]);

  const totalTestPages = Math.max(1, Math.ceil(filteredTests.length / TESTS_PER_PAGE));

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const studentEmail = (result.user as any)?.email || '';
      const testTitle = result.test?.title || '';
      const matchesSearch =
        studentEmail.toLowerCase().includes(resultSearch.toLowerCase()) ||
        testTitle.toLowerCase().includes(resultSearch.toLowerCase());
      const matchesStatus =
        resultStatusFilter === 'all' || result.status === resultStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [results, resultSearch, resultStatusFilter]);

  const paginatedResults = useMemo(() => {
    const start = (resultPage - 1) * RESULTS_PER_PAGE;
    return filteredResults.slice(start, start + RESULTS_PER_PAGE);
  }, [filteredResults, resultPage]);

  const totalResultPages = Math.max(1, Math.ceil(filteredResults.length / RESULTS_PER_PAGE));

  useEffect(() => {
    setTestPage(1);
  }, [testSearch, testStatusFilter]);

  useEffect(() => {
    if (testPage > totalTestPages) setTestPage(totalTestPages);
  }, [testPage, totalTestPages]);

  useEffect(() => {
    setResultPage(1);
  }, [resultSearch, resultStatusFilter]);

  useEffect(() => {
    if (resultPage > totalResultPages) setResultPage(totalResultPages);
  }, [resultPage, totalResultPages]);

  const stats = [
    {
      label: 'Total Tests',
      value: tests.length,
      Icon: Layers,
      tone: 'emerald' as const,
    },
    {
      label: 'Active Tests',
      value: tests.filter((t) => t.isActive).length,
      Icon: CheckCircle2,
      tone: 'gold' as const,
    },
    {
      label: 'Total Attempts',
      value: results.length,
      Icon: Users,
      tone: 'emerald' as const,
    },
    {
      label: 'Completed',
      value: results.filter((r) => r.status === 'completed').length,
      Icon: Sparkles,
      tone: 'gold' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="flex items-center gap-3 rounded-full border border-[#0F5132]/15 bg-white px-5 py-3 shadow-lg">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A24C]" />
          <span className="font-heading text-sm font-semibold text-[#1A1F2C]">
            Loading admin console…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F3] to-white" />
      <div className="absolute inset-0 -z-10 bg-grid-emerald opacity-30" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="gold" className="mb-3">
              Admin Console
            </Badge>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1A1F2C] sm:text-4xl">
              Dashboard
            </h1>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <p className="mt-3 max-w-xl text-sm text-[#1A1F2C]/65">
              Manage tests, monitor student results and keep the platform running smoothly.
            </p>
          </div>
          <Link href="/admin/test/create">
            <Button size="lg" className="group">
              <Plus className="h-4 w-4" />
              Create New Test
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map(({ label, value, Icon, tone }) => (
            <div
              key={label}
              className="card-lift relative overflow-hidden rounded-2xl border border-[#0F5132]/10 bg-white p-5 shadow-[0_1px_2px_rgba(15,81,50,0.04),0_12px_28px_-16px_rgba(15,81,50,0.16)]"
            >
              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl',
                  tone === 'gold' ? 'bg-[#D4A24C]/18' : 'bg-[#0F5132]/12',
                )}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                    {label}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-bold text-[#0F5132] sm:text-4xl">
                    {value}
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-xl',
                    tone === 'gold'
                      ? 'bg-gradient-to-b from-[#E6BD78] to-[#B2823A] text-white'
                      : 'bg-gradient-to-br from-[#0F5132] to-[#14593a] text-white ring-1 ring-[#D4A24C]/25',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tests */}
        <section className="mt-14">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#1A1F2C]">All Tests</h2>
              <div className="mt-2 h-px w-14 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A1F2C]/40" />
                <input
                  type="text"
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                  placeholder="Search title or description"
                  className="h-10 w-full rounded-full border border-[#0F5132]/15 bg-white pl-9 pr-4 text-sm placeholder:text-[#1A1F2C]/45 focus:border-[#0F5132]/35 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 sm:w-72"
                />
              </div>
              <select
                value={testStatusFilter}
                onChange={(e) =>
                  setTestStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
                }
                className="h-10 rounded-full border border-[#0F5132]/15 bg-white px-4 text-sm text-[#1A1F2C] focus:border-[#0F5132]/35 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {paginatedTests.length > 0 ? (
              paginatedTests.map((test) => (
                <Card key={test.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-lg font-semibold text-[#1A1F2C]">
                            {test.title}
                          </h3>
                          <Badge variant={test.isActive ? 'emerald' : 'ivory'}>
                            {test.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-[#1A1F2C]/65">
                          {test.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#1A1F2C]/65">
                          <span className="inline-flex items-center gap-1.5">
                            <Headphones className="h-3.5 w-3.5 text-[#D4A24C]" />
                            {test.listeningQuestions?.length || 0} Listening
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-[#D4A24C]" />
                            {test.readingPassages?.length || 0} Reading Passages
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-[#D4A24C]" />
                            {test.writingTasks?.length || 0} Writing Tasks
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/admin/test/edit/${test.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="soft"
                          size="sm"
                          onClick={() => handleToggleActive(test)}
                        >
                          {test.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTest(test.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-sm text-[#1A1F2C]/65">
                  No tests match your current search or filter.
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-[#1A1F2C]/65">
            <span>
              Showing {paginatedTests.length} of {filteredTests.length} tests
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={testPage === 1}
                onClick={() => setTestPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-[#0F5132]">
                {testPage} / {totalTestPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={testPage === totalTestPages}
                onClick={() => setTestPage((p) => Math.min(totalTestPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Results */}
        <section className="mt-16">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#1A1F2C]">
                Recent Test Results
              </h2>
              <div className="mt-2 h-px w-14 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A1F2C]/40" />
                <input
                  type="text"
                  value={resultSearch}
                  onChange={(e) => setResultSearch(e.target.value)}
                  placeholder="Search by student or test"
                  className="h-10 w-full rounded-full border border-[#0F5132]/15 bg-white pl-9 pr-4 text-sm placeholder:text-[#1A1F2C]/45 focus:border-[#0F5132]/35 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 sm:w-72"
                />
              </div>
              <select
                value={resultStatusFilter}
                onChange={(e) =>
                  setResultStatusFilter(e.target.value as 'all' | TestStatus)
                }
                className="h-10 rounded-full border border-[#0F5132]/15 bg-white px-4 text-sm text-[#1A1F2C] focus:border-[#0F5132]/35 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30"
              >
                <option value="all">All Status</option>
                <option value={TestStatus.COMPLETED}>Completed</option>
                <option value={TestStatus.IN_PROGRESS}>In Progress</option>
              </select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                {paginatedResults.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead className="border-b border-[#0F5132]/10 bg-[#FAF8F3]/60">
                      <tr>
                        <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          Test
                        </th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          Overall Band
                        </th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1F2C]/55">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0F5132]/8">
                      {paginatedResults.map((result) => (
                        <tr key={result.id} className="transition-colors hover:bg-[#FAF8F3]/50">
                          <td className="px-6 py-4 text-[#1A1F2C]/85">
                            {(result.user as any)?.email || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-[#1A1F2C]/85">
                            {result.test?.title || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                result.status === TestStatus.COMPLETED ? 'emerald' : 'ivory'
                              }
                            >
                              {result.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-heading text-base font-bold text-[#0F5132]">
                            {result.overallBand?.toFixed(1) || '—'}
                          </td>
                          <td className="px-6 py-4 text-[#1A1F2C]/60">
                            {new Date(result.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-sm text-[#1A1F2C]/65">
                    No test results match your current search or filter.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-5 flex items-center justify-between text-sm text-[#1A1F2C]/65">
            <span>
              Showing {paginatedResults.length} of {filteredResults.length} results
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={resultPage === 1}
                onClick={() => setResultPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-[#0F5132]">
                {resultPage} / {totalResultPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={resultPage === totalResultPages}
                onClick={() => setResultPage((p) => Math.min(totalResultPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
