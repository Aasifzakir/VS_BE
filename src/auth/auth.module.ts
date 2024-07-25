import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/models';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema }
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
