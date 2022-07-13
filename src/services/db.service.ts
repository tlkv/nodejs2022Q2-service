import { UserData } from 'src/modules/users/user.types';

export class MemoryDb {
  static users: UserData[] = [];
}
