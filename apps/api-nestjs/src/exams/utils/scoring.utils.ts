/**
 * Convert raw IELTS score to band score
 * Based on official IELTS band conversion table
 */

export function convertToBand(rawScore: number, maxScore: number = 40): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 33) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 27) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 20) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 7) return 3.5;
  if (rawScore >= 5) return 3.0;
  if (rawScore >= 3) return 2.5;
  return 2.0;
}

export function calculateOverallBand(
  listeningBand: number | null,
  readingBand: number | null,
  writingBand: number | null,
  speakingBand: number | null = null,
): number | null {
  const bands = [listeningBand, readingBand, writingBand, speakingBand].filter(
    (band) => band !== null,
  ) as number[];

  if (bands.length === 0) return null;

  const average = bands.reduce((sum, band) => sum + band, 0) / bands.length;

  // Round to nearest 0.5
  return Math.round(average * 2) / 2;
}

export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' '); // Normalize whitespace
}

export function checkAnswer(
  studentAnswer: string,
  correctAnswer: string,
): boolean {
  const normalized1 = normalizeAnswer(studentAnswer);
  const normalized2 = normalizeAnswer(correctAnswer);

  return normalized1 === normalized2;
}
