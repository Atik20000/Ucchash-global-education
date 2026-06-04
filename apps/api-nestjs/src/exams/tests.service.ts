import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';
import { ListeningQuestion } from './entities/listening-question.entity';
import { ReadingPassage } from './entities/reading-passage.entity';
import { ReadingQuestion } from './entities/reading-question.entity';
import { WritingTask } from './entities/writing-task.entity';
import { CreateTestDto, UpdateTestDto } from './dto/test.dto';
import {
  CreateListeningQuestionDto,
  UpdateListeningQuestionDto,
} from './dto/listening-question.dto';
import {
  CreateReadingPassageDto,
  UpdateReadingPassageDto,
} from './dto/reading-passage.dto';
import {
  CreateReadingQuestionDto,
  UpdateReadingQuestionDto,
} from './dto/reading-question.dto';
import {
  CreateWritingTaskDto,
  UpdateWritingTaskDto,
} from './dto/writing-task.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(ListeningQuestion)
    private listeningQuestionsRepository: Repository<ListeningQuestion>,
    @InjectRepository(ReadingPassage)
    private readingPassagesRepository: Repository<ReadingPassage>,
    @InjectRepository(ReadingQuestion)
    private readingQuestionsRepository: Repository<ReadingQuestion>,
    @InjectRepository(WritingTask)
    private writingTasksRepository: Repository<WritingTask>,
  ) {}

  // ==================== Tests Management ====================

  async createTest(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testsRepository.create(createTestDto);
    return await this.testsRepository.save(test);
  }

  async getAllTests(includeInactive: boolean = false): Promise<Test[]> {
    const query = this.testsRepository.createQueryBuilder('test');

    if (!includeInactive) {
      query.where('test.isActive = :isActive', { isActive: true });
    }

    return await query
      .leftJoinAndSelect('test.listeningQuestions', 'listeningQuestions')
      .leftJoinAndSelect('test.readingPassages', 'readingPassages')
      .leftJoinAndSelect('readingPassages.questions', 'readingQuestions')
      .leftJoinAndSelect('test.writingTasks', 'writingTasks')
      .orderBy('test.createdAt', 'DESC')
      .getMany();
  }

  async getTestById(id: string, includeAnswers: boolean = false): Promise<Test> {
    const query = this.testsRepository
      .createQueryBuilder('test')
      .where('test.id = :id', { id })
      .leftJoinAndSelect('test.listeningQuestions', 'listeningQuestions')
      .leftJoinAndSelect('test.readingPassages', 'readingPassages')
      .leftJoinAndSelect('readingPassages.questions', 'readingQuestions')
      .leftJoinAndSelect('test.writingTasks', 'writingTasks');

    // For students, don't include correct answers
    if (!includeAnswers) {
      query
        .addSelect([])
        .select([
          'test',
          'listeningQuestions.id',
          'listeningQuestions.sectionNumber',
          'listeningQuestions.questionNumber',
          'listeningQuestions.questionType',
          'listeningQuestions.questionText',
          'listeningQuestions.options',
          'listeningQuestions.audioUrl',
          'listeningQuestions.instruction',
          'readingPassages',
          'readingQuestions.id',
          'readingQuestions.questionNumber',
          'readingQuestions.questionType',
          'readingQuestions.questionText',
          'readingQuestions.options',
          'readingQuestions.instruction',
          'writingTasks',
        ]);
    }

    const test = await query.getOne();

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async updateTest(id: string, updateTestDto: UpdateTestDto): Promise<Test> {
    const test = await this.testsRepository.findOne({ where: { id } });

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    Object.assign(test, updateTestDto);
    return await this.testsRepository.save(test);
  }

  async deleteTest(id: string): Promise<void> {
    const result = await this.testsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
  }

  // ==================== Listening Questions ====================

  async createListeningQuestion(
    dto: CreateListeningQuestionDto,
  ): Promise<ListeningQuestion> {
    const test = await this.testsRepository.findOne({
      where: { id: dto.testId },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${dto.testId} not found`);
    }

    const question = this.listeningQuestionsRepository.create(dto);
    return await this.listeningQuestionsRepository.save(question);
  }

  async updateListeningQuestion(
    id: string,
    dto: UpdateListeningQuestionDto,
  ): Promise<ListeningQuestion> {
    const question = await this.listeningQuestionsRepository.findOne({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Listening question with ID ${id} not found`);
    }

    Object.assign(question, dto);
    return await this.listeningQuestionsRepository.save(question);
  }

  async deleteListeningQuestion(id: string): Promise<void> {
    const result = await this.listeningQuestionsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Listening question with ID ${id} not found`);
    }
  }

  // ==================== Reading Passages ====================

  async createReadingPassage(
    dto: CreateReadingPassageDto,
  ): Promise<ReadingPassage> {
    const test = await this.testsRepository.findOne({
      where: { id: dto.testId },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${dto.testId} not found`);
    }

    const passage = this.readingPassagesRepository.create(dto);
    return await this.readingPassagesRepository.save(passage);
  }

  async updateReadingPassage(
    id: string,
    dto: UpdateReadingPassageDto,
  ): Promise<ReadingPassage> {
    const passage = await this.readingPassagesRepository.findOne({
      where: { id },
    });

    if (!passage) {
      throw new NotFoundException(`Reading passage with ID ${id} not found`);
    }

    Object.assign(passage, dto);
    return await this.readingPassagesRepository.save(passage);
  }

  async deleteReadingPassage(id: string): Promise<void> {
    const result = await this.readingPassagesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reading passage with ID ${id} not found`);
    }
  }

  // ==================== Reading Questions ====================

  async createReadingQuestion(
    dto: CreateReadingQuestionDto,
  ): Promise<ReadingQuestion> {
    const passage = await this.readingPassagesRepository.findOne({
      where: { id: dto.passageId },
    });

    if (!passage) {
      throw new NotFoundException(`Reading passage with ID ${dto.passageId} not found`);
    }

    const question = this.readingQuestionsRepository.create(dto);
    return await this.readingQuestionsRepository.save(question);
  }

  async updateReadingQuestion(
    id: string,
    dto: UpdateReadingQuestionDto,
  ): Promise<ReadingQuestion> {
    const question = await this.readingQuestionsRepository.findOne({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Reading question with ID ${id} not found`);
    }

    Object.assign(question, dto);
    return await this.readingQuestionsRepository.save(question);
  }

  async deleteReadingQuestion(id: string): Promise<void> {
    const result = await this.readingQuestionsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reading question with ID ${id} not found`);
    }
  }

  // ==================== Writing Tasks ====================

  async createWritingTask(dto: CreateWritingTaskDto): Promise<WritingTask> {
    const test = await this.testsRepository.findOne({
      where: { id: dto.testId },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${dto.testId} not found`);
    }

    const task = this.writingTasksRepository.create(dto);
    return await this.writingTasksRepository.save(task);
  }

  async updateWritingTask(
    id: string,
    dto: UpdateWritingTaskDto,
  ): Promise<WritingTask> {
    const task = await this.writingTasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Writing task with ID ${id} not found`);
    }

    Object.assign(task, dto);
    return await this.writingTasksRepository.save(task);
  }

  async deleteWritingTask(id: string): Promise<void> {
    const result = await this.writingTasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Writing task with ID ${id} not found`);
    }
  }
}
