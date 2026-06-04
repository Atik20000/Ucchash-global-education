'use client';

import { useState } from 'react';
import { ReadingPassage, ReadingQuestionType } from '@/lib/types/exam.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReadingSectionProps {
  passages: ReadingPassage[];
  answers: Map<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export default function ReadingSection({
  passages,
  answers,
  onAnswerChange,
}: ReadingSectionProps) {
  const [selectedPassage, setSelectedPassage] = useState(0);

  const currentPassage = passages[selectedPassage];

  const renderQuestion = (question: any) => {
    const answer = answers.get(question.id) || '';

    return (
      <div key={question.id} className="mb-6 p-4 bg-white rounded-lg border">
        <div className="font-medium mb-2">
          Question {question.questionNumber}
        </div>
        {question.instruction && (
          <div className="text-sm text-gray-600 mb-2 italic">
            {question.instruction}
          </div>
        )}
        <div className="mb-3 text-gray-700">{question.questionText}</div>

        {question.questionType === ReadingQuestionType.MULTIPLE_CHOICE &&
          question.options && (
            <div className="space-y-2">
              {question.options.map((option: string, idx: number) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answer === option}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

        {question.questionType === ReadingQuestionType.TRUE_FALSE_NOT_GIVEN && (
          <div className="space-y-2">
            {['TRUE', 'FALSE', 'NOT GIVEN'].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.questionType !== ReadingQuestionType.MULTIPLE_CHOICE &&
          question.questionType !== ReadingQuestionType.TRUE_FALSE_NOT_GIVEN && (
            <input
              type="text"
              value={answer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              placeholder="Type your answer here"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
      </div>
    );
  };

  if (!currentPassage) {
    return <div>No passages available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Passage */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Passage {selectedPassage + 1}</CardTitle>
              <div className="flex gap-2">
                {passages.map((_, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={selectedPassage === idx ? 'default' : 'outline'}
                    onClick={() => setSelectedPassage(idx)}
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{currentPassage.title}</h2>
            <div className="prose prose-sm max-w-none">
              {currentPassage.passageText.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-3 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Questions - Passage {selectedPassage + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentPassage.questions && currentPassage.questions.length > 0 ? (
              <div>{currentPassage.questions.map(renderQuestion)}</div>
            ) : (
              <p className="text-gray-500">No questions for this passage</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
