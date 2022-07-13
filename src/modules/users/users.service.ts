import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { MemoryDb } from 'src/services/db.service';

@Injectable()
export class UsersService {
  private users = MemoryDb.users;

  getAll() {
    return this.users; // exclude password
  }

  getById(id: string) {
    const currUser = this.users.find((i) => i.id === id);
    return {
      id: currUser.id,
      login: currUser.login,
      version: currUser.version,
      createdAt: currUser.createdAt,
      updatedAt: currUser.updatedAt,
    };
  }

  create(userDto: CreateUserDto) {
    this.users.push({
      id: v4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return userDto;
  }
}
