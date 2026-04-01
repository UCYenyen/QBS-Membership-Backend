import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Strict interface for service return types
export interface UserPointsResponse {
  userId: string;
  points: number;
}

@Injectable()
export class PointsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPoints(userId: string): Promise<UserPointsResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, points: true },
    });

    if (!user) throw new NotFoundException('User not found');

    return { userId: user.id, points: user.points };
  }

  async addPoints(userId: string, amount: number): Promise<UserPointsResponse> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { points: { increment: amount } },
      select: { id: true, points: true },
    });

    return { userId: updatedUser.id, points: updatedUser.points };
  }

  async deductPoints(userId: string, amount: number): Promise<UserPointsResponse> {
    // Transaction ensures points never drop below 0 concurrently
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      
      if (!user) throw new NotFoundException('User not found');
      if (user.points < amount) throw new BadRequestException('Insufficient points');

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { points: { decrement: amount } },
        select: { id: true, points: true },
      });

      return { userId: updatedUser.id, points: updatedUser.points };
    });
  }
}