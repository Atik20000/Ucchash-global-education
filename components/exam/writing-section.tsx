'use client';

import { useState, useRef, useEffect } from 'react';
import { WritingTask } from '@/lib/types/exam.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WritingSectionProps {
  tasks: WritingTask[];
  answers: Map<string, string>;
  onAnswerChange: (taskId: string, answer: string) => void;
}

export default function WritingSection({
  tasks,
  answers,
  onAnswerChange,
}: WritingSectionProps) {
  const [selectedTask, setSelectedTask] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentTask = tasks[selectedTask];
  const answer = currentTask ? answers.get(currentTask.id) || '' : '';

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [answer]);

  if (!currentTask) {
    return <div>No writing tasks available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Instructions */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task {currentTask.taskNumber}</CardTitle>
              <div className="flex gap-2">
                {tasks.map((task) => (
                  <Button
                    key={task.id}
                    size="sm"
                    variant={
                      selectedTask === task.taskNumber - 1 ? 'default' : 'outline'
                    }
                    onClick={() => setSelectedTask(task.taskNumber - 1)}
                  >
                    Task {task.taskNumber}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">
                Instructions
              </div>
              <div className="text-gray-700">{currentTask.instruction}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">
                Task Question
              </div>
              <div className="text-gray-700 whitespace-pre-wrap">
                {currentTask.questionText}
              </div>
            </div>

            {currentTask.imageUrl && (
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Chart/Graph
                </div>
                <img
                  src={currentTask.imageUrl}
                  alt="Chart or Graph"
                  className="w-full rounded-lg border"
                />
              </div>
            )}

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">
                Word Limit
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {currentTask.wordLimit} words minimum
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                wordCount >= currentTask.wordLimit
                  ? 'bg-green-50'
                  : 'bg-yellow-50'
              }`}
            >
              <div className="text-sm font-medium mb-1">Your Word Count</div>
              <div
                className={`text-2xl font-bold ${
                  wordCount >= currentTask.wordLimit
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {wordCount} words
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Writing Area */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Answer - Task {currentTask.taskNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              ref={textareaRef}
              value={answer}
              onChange={(e) => onAnswerChange(currentTask.id, e.target.value)}
              placeholder="Write your answer here..."
              className="w-full min-h-[500px] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-base leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>
                ✓ Write at least {currentTask.wordLimit} words
              </p>
              <p>
                ✓ {currentTask.taskNumber === 1
                  ? 'Describe the main features and make comparisons'
                  : 'Present a clear position with supporting arguments'}
              </p>
              <p>✓ Organize your answer with clear paragraphs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
