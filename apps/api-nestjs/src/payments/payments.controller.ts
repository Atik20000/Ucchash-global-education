import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsString } from 'class-validator';

class InitiatePaymentDto {
  @IsString()
  plan: string;

  @IsString()
  gateway: string;
}

class CompletePaymentDto {
  @IsString()
  paymentId: string;

  @IsString()
  transactionId: string;
}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('initiate')
  async initiatePayment(@Request() req, @Body() dto: InitiatePaymentDto) {
    const userId = req.user.id;

    if (dto.gateway === 'bkash') {
      return this.paymentsService.initiateBkashPayment(userId, dto.plan);
    }

    // Add Nagad and SSLCommerz here
    throw new Error('Unsupported gateway');
  }

  @Post('complete')
  async completePayment(@Body() dto: CompletePaymentDto) {
    return this.paymentsService.completePayment(
      dto.paymentId,
      dto.transactionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Request() req) {
    return this.paymentsService.getPaymentHistory(req.user.id);
  }
}
