import { IsInt, IsString } from 'class-validator';

export class Album {
  id: string;
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  artistId: string | null;
}
