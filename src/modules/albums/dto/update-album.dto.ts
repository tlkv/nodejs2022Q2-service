import { PartialType } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  artistId: string | null;
}
