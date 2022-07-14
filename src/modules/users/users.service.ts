import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { MemoryDb } from 'src/services/db.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = MemoryDb.users;

  getAll() {
    return this.users.map((i) => {
      delete i.password;
      return i;
    });
  }

  getById(id: string) {
    const currUser = this.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
    const res = { ...currUser, id };
    delete res.password;
    return res;
  }

  getPass(id: string) {
    const currUser = this.users.find((i) => i.id === id);
    if (!currUser) {
      throw new NotFoundException('User not found');
    }
    return {
      password: currUser.password,
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
    const elemIndex = this.users.findIndex((i) => i.id === id);

    this.users[elemIndex] = {
      ...this.users[elemIndex],
      version: this.users[elemIndex].version + 1,
      password: updateUserDto.newPassword,
      updatedAt: Date.now(),
    };

    const res = { ...this.users[elemIndex] };
    delete res.password;
    return res;
  }
}
