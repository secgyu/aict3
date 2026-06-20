import { IsDefined, IsString } from 'class-validator';

export class UpdateSortItemDto {
  @IsDefined()
  id!: number | string;

  @IsString()
  filename!: string;
}
