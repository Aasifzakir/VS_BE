import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { Request } from 'express';
import { DefaultMessage, ResponseStatus } from 'src/constants';
import { AuthService } from './auth.service';
import { extractTokenFromHeader } from 'src/utils/extract-token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let verifyToken: {};
    try {
      verifyToken = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      const user = await this.authService.findUser({ _id: verifyToken['id'] });
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user; 
    } catch (error) {
      throw new HttpException(
        DefaultMessage.INVALID_TOKEN,
        ResponseStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
