import { IsInt, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsString()
  artistId: string | null;
  @IsString()
  albumId: string | null;
  @IsInt()
  duration: number;
}
