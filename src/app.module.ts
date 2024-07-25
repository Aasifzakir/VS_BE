import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './utils/jwt.strategy';
import { dbDetails } from './constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: dbDetails.uri,
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
