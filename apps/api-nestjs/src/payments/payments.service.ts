import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentGateway, PaymentStatus } from './entities/payment.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface PlanConfig {
  name: string;
  price: number;
  tests: number;
  duration: number; // days
}

@Injectable()
export class PaymentsService {
  private plans: Record<string, PlanConfig> = {
    mock_5: { name: '5 Mock Tests', price: 500, tests: 5, duration: 30 },
    mock_10: { name: '10 Mock Tests', price: 900, tests: 10, duration: 60 },
    mock_20: { name: '20 Mock Tests', price: 1500, tests: 20, duration: 90 },
    unlimited: { name: 'Unlimited', price: 2500, tests: 999, duration: 365 },
  };

  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async initiateBkashPayment(userId: string, plan: string) {
    const planConfig = this.plans[plan];
    if (!planConfig) {
      throw new Error('Invalid plan');
    }

    // Create payment record
    const payment = this.paymentsRepository.create({
      userId,
      plan,
      amount: planConfig.price,
      gateway: PaymentGateway.BKASH,
      status: PaymentStatus.PENDING,
    });
    await this.paymentsRepository.save(payment);

    // bKash API integration
    const bkashUrl = this.configService.get('BKASH_BASE_URL');
    const appKey = this.configService.get('BKASH_APP_KEY');

    // This is a simplified example. Full bKash integration requires:
    // 1. Grant token
    // 2. Create payment
    // 3. Execute payment

    return {
      paymentId: payment.id,
      amount: planConfig.price,
      plan: planConfig.name,
      gateway: 'bkash',
      // redirectUrl: bkashUrl + '/payment/' + payment.id,
    };
  }

  async completePayment(paymentId: string, transactionId: string) {
    const payment = await this.paymentsRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    // Update payment status
    payment.status = PaymentStatus.COMPLETED;
    payment.transactionId = transactionId;
    await this.paymentsRepository.save(payment);

    // Update user plan
    const planConfig = this.plans[payment.plan];
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + planConfig.duration);

    await this.usersService.updatePlan(
      payment.userId,
      payment.plan,
      planConfig.tests,
      validUntil,
    );

    return {
      success: true,
      payment,
    };
  }

  async getPaymentHistory(userId: string) {
    return this.paymentsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
