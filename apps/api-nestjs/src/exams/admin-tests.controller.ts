import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { AnswersService } from './answers.service';
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

// TODO: Import your JWT Auth Guard
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin/tests')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is ready
export class AdminTestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly answersService: AnswersService,
  ) {}

  // ==================== Tests ====================

  @Post()
  async createTest(@Body() createTestDto: CreateTestDto) {
    return await this.testsService.createTest(createTestDto);
  }

  @Get()
  async getAllTests(@Query('includeInactive') includeInactive?: string) {
    return await this.testsService.getAllTests(includeInactive === 'true');
  }

  @Get(':id')
  async getTestById(@Param('id') id: string) {
    return await this.testsService.getTestById(id, true); // Include answers for admin
  }

  @Put(':id')
  async updateTest(
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    return await this.testsService.updateTest(id, updateTestDto);
  }

  @Delete(':id')
  async deleteTest(@Param('id') id: string) {
    await this.testsService.deleteTest(id);
    return { message: 'Test deleted successfully' };
  }

  // ==================== Listening Questions ====================

  @Post('listening-questions')
  async createListeningQuestion(
    @Body() dto: CreateListeningQuestionDto,
  ) {
    return await this.testsService.createListeningQuestion(dto);
  }

  @Put('listening-questions/:id')
  async updateListeningQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateListeningQuestionDto,
  ) {
    return await this.testsService.updateListeningQuestion(id, dto);
  }

  @Delete('listening-questions/:id')
  async deleteListeningQuestion(@Param('id') id: string) {
    await this.testsService.deleteListeningQuestion(id);
    return { message: 'Listening question deleted successfully' };
  }

  // ==================== Reading Passages ====================

  @Post('reading-passages')
  async createReadingPassage(@Body() dto: CreateReadingPassageDto) {
    return await this.testsService.createReadingPassage(dto);
  }

  @Put('reading-passages/:id')
  async updateReadingPassage(
    @Param('id') id: string,
    @Body() dto: UpdateReadingPassageDto,
  ) {
    return await this.testsService.updateReadingPassage(id, dto);
  }

  @Delete('reading-passages/:id')
  async deleteReadingPassage(@Param('id') id: string) {
    await this.testsService.deleteReadingPassage(id);
    return { message: 'Reading passage deleted successfully' };
  }

  // ==================== Reading Questions ====================

  @Post('reading-questions')
  async createReadingQuestion(@Body() dto: CreateReadingQuestionDto) {
    return await this.testsService.createReadingQuestion(dto);
  }

  @Put('reading-questions/:id')
  async updateReadingQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateReadingQuestionDto,
  ) {
    return await this.testsService.updateReadingQuestion(id, dto);
  }

  @Delete('reading-questions/:id')
  async deleteReadingQuestion(@Param('id') id: string) {
    await this.testsService.deleteReadingQuestion(id);
    return { message: 'Reading question deleted successfully' };
  }

  // ==================== Writing Tasks ====================

  @Post('writing-tasks')
  async createWritingTask(@Body() dto: CreateWritingTaskDto) {
    return await this.testsService.createWritingTask(dto);
  }

  @Put('writing-tasks/:id')
  async updateWritingTask(
    @Param('id') id: string,
    @Body() dto: UpdateWritingTaskDto,
  ) {
    return await this.testsService.updateWritingTask(id, dto);
  }

  @Delete('writing-tasks/:id')
  async deleteWritingTask(@Param('id') id: string) {
    await this.testsService.deleteWritingTask(id);
    return { message: 'Writing task deleted successfully' };
  }

  // ==================== Results ====================

  @Get('results/all')
  async getAllResults() {
    return await this.answersService.getAllResults();
  }
}
