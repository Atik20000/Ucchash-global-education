import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async updatePlan(
    userId: string,
    plan: string,
    testsRemaining: number,
    validUntil: Date,
  ): Promise<User> {
    const user = await this.findById(userId);
    user.plan = plan as any;
    user.testsRemaining = testsRemaining;
    user.validUntil = validUntil;
    return this.usersRepository.save(user);
  }

  async decrementTests(userId: string): Promise<User> {
    const user = await this.findById(userId);
    if (user.testsRemaining > 0) {
      user.testsRemaining -= 1;
      return this.usersRepository.save(user);
    }
    return user;
  }
}
