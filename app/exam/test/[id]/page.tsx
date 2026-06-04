'use client';

import { use } from 'react';
import TestInterface from '@/components/exam/test-interface';

export default function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <TestInterface testId={id} />;
}
