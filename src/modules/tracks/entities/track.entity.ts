import { IsInt, IsString } from 'class-validator';

export class Track {
  id: string;
  @IsString()
  name: string;
  @IsString()
  artistId: string | null;
  @IsString()
  albumId: string | null;
  @IsInt()
  duration: number;
}
