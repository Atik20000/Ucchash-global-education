import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAnswer, AnswerType } from './entities/student-answer.entity';
import { TestResult, TestStatus } from './entities/test-result.entity';
import { ListeningQuestion } from './entities/listening-question.entity';
import { ReadingQuestion } from './entities/reading-question.entity';
import { Test } from './entities/test.entity';
import { User } from '../users/entities/user.entity';
import { SubmitAnswerDto, BulkSubmitAnswersDto } from './dto/answer.dto';
import { checkAnswer, convertToBand, calculateOverallBand } from './utils/scoring.utils';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(StudentAnswer)
    private answersRepository: Repository<StudentAnswer>,
    @InjectRepository(TestResult)
    private resultsRepository: Repository<TestResult>,
    @InjectRepository(ListeningQuestion)
    private listeningQuestionsRepository: Repository<ListeningQuestion>,
    @InjectRepository(ReadingQuestion)
    private readingQuestionsRepository: Repository<ReadingQuestion>,
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async startTest(userId: string, testId: string): Promise<TestResult> {
    // Check if user has already taken this test
    const existingResult = await this.resultsRepository.findOne({
      where: { userId, testId },
    });

    if (existingResult) {
      throw new BadRequestException('You have already taken this test');
    }

    // Check if test exists and is active
    const test = await this.testsRepository.findOne({ where: { id: testId } });

    if (!test) {
      throw new NotFoundException(`Test with ID ${testId} not found`);
    }

    if (!test.isActive) {
      throw new BadRequestException('This test is not currently available');
    }

    // Create new test result
    const result = this.resultsRepository.create({
      userId,
      testId,
      status: TestStatus.IN_PROGRESS,
      startedAt: new Date(),
    });

    return await this.resultsRepository.save(result);
  }

  async submitAnswer(
    userId: string,
    dto: SubmitAnswerDto,
  ): Promise<StudentAnswer> {
    // Check if user has started this test
    const testResult = await this.resultsRepository.findOne({
      where: { userId, testId: dto.testId },
    });

    if (!testResult) {
      throw new BadRequestException('Test not started. Please start the test first.');
    }

    if (testResult.status === TestStatus.COMPLETED) {
      throw new BadRequestException('This test has already been completed');
    }

    // Check if answer already exists (for auto-save)
    let answer = await this.answersRepository.findOne({
      where: {
        userId,
        testId: dto.testId,
        questionId: dto.questionId,
      },
    });

    let isCorrect = false;

    // Check correctness for Listening and Reading
    if (dto.answerType === AnswerType.LISTENING) {
      const question = await this.listeningQuestionsRepository.findOne({
        where: { id: dto.questionId },
      });

      if (question) {
        isCorrect = checkAnswer(dto.studentAnswer, question.correctAnswer);
      }
    } else if (dto.answerType === AnswerType.READING) {
      const question = await this.readingQuestionsRepository.findOne({
        where: { id: dto.questionId },
      });

      if (question) {
        isCorrect = checkAnswer(dto.studentAnswer, question.correctAnswer);
      }
    }

    if (answer) {
      // Update existing answer
      answer.studentAnswer = dto.studentAnswer;
      answer.isCorrect = isCorrect;
    } else {
      // Create new answer
      answer = this.answersRepository.create({
        userId,
        testId: dto.testId,
        answerType: dto.answerType,
        questionId: dto.questionId,
        questionNumber: dto.questionNumber,
        studentAnswer: dto.studentAnswer,
        isCorrect,
      });
    }

    return await this.answersRepository.save(answer);
  }

  async bulkSubmitAnswers(
    userId: string,
    dto: BulkSubmitAnswersDto,
  ): Promise<StudentAnswer[]> {
    const answers = [];

    for (const answerDto of dto.answers) {
      const answer = await this.submitAnswer(userId, answerDto);
      answers.push(answer);
    }

    return answers;
  }

  async completeSection(
    userId: string,
    testId: string,
    sectionType: 'listening' | 'reading' | 'writing',
  ): Promise<TestResult> {
    const testResult = await this.resultsRepository.findOne({
      where: { userId, testId },
    });

    if (!testResult) {
      throw new NotFoundException('Test result not found');
    }

    // Mark section as completed
    if (sectionType === 'listening') {
      testResult.listeningCompleted = true;
      await this.calculateListeningScore(userId, testId, testResult);
    } else if (sectionType === 'reading') {
      testResult.readingCompleted = true;
      await this.calculateReadingScore(userId, testId, testResult);
    } else if (sectionType === 'writing') {
      testResult.writingCompleted = true;
    }

    // Check if all sections are completed
    if (
      testResult.listeningCompleted &&
      testResult.readingCompleted &&
      testResult.writingCompleted
    ) {
      testResult.status = TestStatus.COMPLETED;
      testResult.completedAt = new Date();
      testResult.overallBand = calculateOverallBand(
        testResult.listeningBand,
        testResult.readingBand,
        testResult.writingBand,
      );
    }

    return await this.resultsRepository.save(testResult);
  }

  private async calculateListeningScore(
    userId: string,
    testId: string,
    testResult: TestResult,
  ): Promise<void> {
    const answers = await this.answersRepository.find({
      where: { userId, testId, answerType: AnswerType.LISTENING },
    });

    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    testResult.listeningScore = correctAnswers;
    testResult.listeningBand = convertToBand(correctAnswers);
  }

  private async calculateReadingScore(
    userId: string,
    testId: string,
    testResult: TestResult,
  ): Promise<void> {
    const answers = await this.answersRepository.find({
      where: { userId, testId, answerType: AnswerType.READING },
    });

    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    testResult.readingScore = correctAnswers;
    testResult.readingBand = convertToBand(correctAnswers);
  }

  async getStudentAnswers(
    userId: string,
    testId: string,
  ): Promise<StudentAnswer[]> {
    return await this.answersRepository.find({
      where: { userId, testId },
      order: { questionNumber: 'ASC' },
    });
  }

  async getTestResult(userId: string, testId: string): Promise<TestResult> {
    const result = await this.resultsRepository.findOne({
      where: { userId, testId },
      relations: ['test', 'user'],
    });

    if (!result) {
      throw new NotFoundException('Test result not found');
    }

    return result;
  }

  async getUserResults(userId: string): Promise<TestResult[]> {
    return await this.resultsRepository.find({
      where: { userId },
      relations: ['test'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllResults(): Promise<TestResult[]> {
    return await this.resultsRepository.find({
      relations: ['test', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
}
