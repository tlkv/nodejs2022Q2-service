import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { MemoryDb } from 'src/services/db.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = MemoryDb.users;

  getAll() {
    return this.users; // exclude password
  }

  getById(id: string) {
    const currUser = this.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
    return {
      id: currUser.id,
      login: currUser.login,
      createdAt: currUser.createdAt,
      updatedAt: currUser.updatedAt,
      version: currUser.version,
    };
  }

  create(userDto: CreateUserDto) {
    const newUser = {
      id: v4(),
      login: userDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push({ ...newUser, password: userDto.password });
    return newUser;
  }

  remove(id: string) {
    const currUser = this.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
    this.users = this.users.filter((i) => i.id !== id);
  }

  update(updateUserDto: UpdateUserDto, id: string) {
    const currUser = this.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
  }
}
