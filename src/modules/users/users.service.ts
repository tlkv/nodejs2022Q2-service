import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { MemoryDb } from 'src/services/db.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  getAll() {
    return MemoryDb.users.map((i) => {
      delete i.password;
      return i;
    });
  }

  getById(id: string, withPassword: boolean) {
    const currUser = MemoryDb.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
    const res = { ...currUser, id };
    if (!withPassword) {
      delete res.password;
    }
    return res;
  }

  create(userDto: CreateUserDto) {
    const newUser = {
      id: v4(),
      login: userDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    MemoryDb.users.push({ ...newUser, password: userDto.password });
    return newUser;
  }

  remove(id: string) {
    const currUser = this.getById(id, false);
    if (!currUser) return;
    MemoryDb.users = MemoryDb.users.filter((i) => i.id !== id);
  }

  update(updateUserDto: UpdateUserDto, id: string) {
    const currUser = this.getById(id, true);
    if (!currUser) return;
    const elemIndex = MemoryDb.users.findIndex((i) => i.id === id);

    MemoryDb.users[elemIndex] = {
      ...MemoryDb.users[elemIndex],
      version: MemoryDb.users[elemIndex].version + 1,
      password: updateUserDto.newPassword,
      updatedAt: Date.now(),
    };

    const res = { ...MemoryDb.users[elemIndex] };
    delete res.password;
    return res;
  }

  getPass(id: string) {
    const currUser = this.getById(id, true);
    return {
      password: currUser.password,
    };
  }
}
