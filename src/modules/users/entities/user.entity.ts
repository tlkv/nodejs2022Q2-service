import { Exclude } from 'class-transformer';

export class UserData {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
