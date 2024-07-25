import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DefaultMessage, ResponseStatus, handleResponse } from 'src/constants';
import { AuthGuard } from '../auth/auth.guard';
import { UsersAddDTO } from './dto/add.dto';
import { ObjectId, isValidObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  async getUserById(id: ObjectId | string) {
    const isValidId = isValidObjectId(id);
    if(!isValidId) {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
    const user = await this.UserService.findOne({_id: id})
    if(!user) {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async validateEmail(email) {
    let exist = await this.UserService.findOne({ email: email });
    if (exist) {
      throw new HttpException(
        DefaultMessage.EMAIL_ALREADY_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
    return;
  }

  @Post()
  // @UseGuards(AuthGuard)  //commented for the purpose of register
  async post(@Body() body: UsersAddDTO) {
    await this.validateEmail(body.email)
      const data = await this.UserService.create(body);
      return handleResponse(data, "Registration Successful")
  }

  @Delete(":user_id")
  @UseGuards(AuthGuard)
  async delete(@Param('user_id') user_id: ObjectId | string) {
    await this.getUserById(user_id);
    await this.UserService.delete(user_id);
    return handleResponse(null, "User Deleted Successfully")
  }
}
