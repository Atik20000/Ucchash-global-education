'use client';

import { useState } from 'react';
import { ListeningQuestion, ListeningQuestionType } from '@/lib/types/exam.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ListeningSectionProps {
  questions: ListeningQuestion[];
  answers: Map<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export default function ListeningSection({
  questions,
  answers,
  onAnswerChange,
}: ListeningSectionProps) {
  const [selectedSection, setSelectedSection] = useState(1);

  // Group questions by section
  const sections = [1, 2, 3, 4];
  const questionsBySection = sections.map((sectionNum) =>
    questions.filter((q) => q.sectionNumber === sectionNum),
  );

  const currentQuestions = questionsBySection[selectedSection - 1] || [];
  const audioUrl = currentQuestions[0]?.audioUrl;

  const renderQuestion = (question: ListeningQuestion) => {
    const answer = answers.get(question.id) || '';

    return (
      <div key={question.id} className="mb-6 p-4 bg-white rounded-lg border">
        <div className="font-medium mb-2">
          Question {question.questionNumber}
        </div>
        <div className="mb-3 text-gray-700">{question.questionText}</div>

        {question.questionType === ListeningQuestionType.MULTIPLE_CHOICE &&
          question.options && (
            <div className="space-y-2">
              {question.options.map((option, idx) => (
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

        {question.questionType !== ListeningQuestionType.MULTIPLE_CHOICE && (
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Audio Player */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Section {selectedSection} Audio</CardTitle>
          </CardHeader>
          <CardContent>
            {audioUrl ? (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(audioUrl)}`}
                    title="Listening Audio"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600">
                  Listen to the audio and answer the questions
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No audio available for this section</p>
            )}

            {/* Section Selector */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {sections.map((sectionNum) => (
                <Button
                  key={sectionNum}
                  variant={selectedSection === sectionNum ? 'default' : 'outline'}
                  onClick={() => setSelectedSection(sectionNum)}
                  className="w-full"
                >
                  Section {sectionNum}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Questions - Section {selectedSection}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestions.length > 0 ? (
              <div>{currentQuestions.map(renderQuestion)}</div>
            ) : (
              <p className="text-gray-500">No questions for this section</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getYouTubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}
