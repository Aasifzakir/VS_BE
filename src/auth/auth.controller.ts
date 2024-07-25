import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DefaultMessage, ResponseStatus, handleResponse } from 'src/constants';
import { AuthGuard } from '../auth/auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    let result = await this.AuthService.signIn(body.email, body.password);
    return handleResponse(result, "Login Successful")
  }

  @Get('/active_user')
  @UseGuards(AuthGuard)
  async get(@Req() request) {
    let userdata = request['user'];
    if (!userdata) {
      throw new HttpException(
        DefaultMessage.INVALID_TOKEN,
        ResponseStatus.BAD_REQUEST,
      );
    }
    delete userdata['password'];
    return handleResponse(userdata, "User fetched");
  }
}
