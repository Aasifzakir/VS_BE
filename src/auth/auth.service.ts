import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DefaultMessage, ResponseStatus, jwtConstants } from 'src/constants';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<string> {
    const user = await this.usersService.findOne({ email: email });
    if (!user) {
      throw new HttpException(
        DefaultMessage.INVALID_USER_PASS,
        ResponseStatus.BAD_REQUEST,
      );
    } else {

      const idPasswordMatched = await bcrypt.compare(
        pass,
        user.password,
      );
      if (!idPasswordMatched)
        throw new HttpException(
          DefaultMessage.INVALID_USER_PASS,
          ResponseStatus.BAD_REQUEST,
        );

      const payload = {
        id: user._id,
        email: user.email,
      };
      let privateKey = jwtConstants.secret;

      let options = {
        secret: privateKey,
        expiresIn: '300m',
      };

      const token = await this.jwtService.sign(payload, options)

      return token;
    }
  }

  async findUser(payload: {}) {
    const user = await this.usersService.findOne(payload);
    return user;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }
}
