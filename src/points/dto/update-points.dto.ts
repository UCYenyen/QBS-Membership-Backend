import { IsInt, Min } from 'class-validator';

export class UpdatePointsDto {
  @IsInt()
  @Min(1)
  amount: number;
}