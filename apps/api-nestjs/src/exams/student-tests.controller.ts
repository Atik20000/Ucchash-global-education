import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { AnswersService } from './answers.service';
import { SubmitAnswerDto, BulkSubmitAnswersDto } from './dto/answer.dto';

// TODO: Import your JWT Auth Guard
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('student/tests')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is ready
export class StudentTestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly answersService: AnswersService,
  ) {}

  @Get()
  async getAvailableTests() {
    return await this.testsService.getAllTests(false); // Only active tests
  }

  @Get(':id')
  async getTest(@Param('id') id: string) {
    return await this.testsService.getTestById(id, false); // Don't include answers
  }

  @Post(':id/start')
  async startTest(@Param('id') testId: string, @Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.startTest(userId, testId);
  }

  @Post('answers')
  async submitAnswer(@Body() dto: SubmitAnswerDto, @Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.submitAnswer(userId, dto);
  }

  @Post('answers/bulk')
  async bulkSubmitAnswers(@Body() dto: BulkSubmitAnswersDto, @Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.bulkSubmitAnswers(userId, dto);
  }

  @Post(':testId/complete/:section')
  async completeSection(
    @Param('testId') testId: string,
    @Param('section') section: string,
    @Req() req: any,
  ) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    
    if (!['listening', 'reading', 'writing'].includes(section)) {
      throw new Error('Invalid section');
    }

    return await this.answersService.completeSection(
      userId,
      testId,
      section as 'listening' | 'reading' | 'writing',
    );
  }

  @Get(':testId/result')
  async getTestResult(@Param('testId') testId: string, @Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.getTestResult(userId, testId);
  }

  @Get('results/my-results')
  async getMyResults(@Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.getUserResults(userId);
  }

  @Get(':testId/answers')
  async getMyAnswers(@Param('testId') testId: string, @Req() req: any) {
    // TODO: Get user ID from JWT token
    const userId = req.user?.id || 'temp-user-id';
    return await this.answersService.getStudentAnswers(userId, testId);
  }
}
