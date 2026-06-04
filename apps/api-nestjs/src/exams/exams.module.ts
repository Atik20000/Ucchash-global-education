import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { ListeningQuestion } from './entities/listening-question.entity';
import { ReadingPassage } from './entities/reading-passage.entity';
import { ReadingQuestion } from './entities/reading-question.entity';
import { WritingTask } from './entities/writing-task.entity';
import { StudentAnswer } from './entities/student-answer.entity';
import { TestResult } from './entities/test-result.entity';
import { User } from '../users/entities/user.entity';
import { TestsService } from './tests.service';
import { AnswersService } from './answers.service';
import { AdminTestsController } from './admin-tests.controller';
import { StudentTestsController } from './student-tests.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Test,
      ListeningQuestion,
      ReadingPassage,
      ReadingQuestion,
      WritingTask,
      StudentAnswer,
      TestResult,
      User,
    ]),
  ],
  controllers: [AdminTestsController, StudentTestsController],
  providers: [TestsService, AnswersService],
  exports: [TestsService, AnswersService],
})
export class ExamsModule {}
