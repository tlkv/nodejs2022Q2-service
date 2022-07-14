import { Artist } from 'src/artists/entities/artist.entity';
import { UserData } from 'src/modules/users/entities/user.entity';

export class MemoryDb {
  static users: UserData[] = [];
  static artists: Artist[] = [];
}
