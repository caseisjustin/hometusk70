import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId);
  }
}
