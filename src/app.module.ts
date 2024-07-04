import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*');
  }
}
