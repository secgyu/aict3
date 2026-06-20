import { IsNumber, Min } from 'class-validator';

export class SetTransitionDto {
  @IsNumber()
  @Min(1)
  count!: number;
}
