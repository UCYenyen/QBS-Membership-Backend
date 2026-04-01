import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { BetterAuthGuard } from '../auth/auth.guard';
import { UpdatePointsDto } from './dto/update-points.dto';

// Import interfaces using `import type`
import type { UserPointsResponse } from './points.service';
import type { AuthenticatedRequest } from '../auth/auth.guard';

@Controller('points')
@UseGuards(BetterAuthGuard)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  async getMyPoints(@Req() req: AuthenticatedRequest): Promise<UserPointsResponse> {
    return this.pointsService.getPoints(req.user.id);
  }

  @Post('add')
  async addPoints(
    @Req() req: AuthenticatedRequest, 
    @Body() dto: UpdatePointsDto
  ): Promise<UserPointsResponse> {
    return this.pointsService.addPoints(req.user.id, dto.amount);
  }

  @Post('deduct')
  async deductPoints(
    @Req() req: AuthenticatedRequest, 
    @Body() dto: UpdatePointsDto
  ): Promise<UserPointsResponse> {
    return this.pointsService.deductPoints(req.user.id, dto.amount);
  }
}