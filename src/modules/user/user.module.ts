import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/collections/user.schema';
import { JwtModule } from '@nestjs/jwt';
import * as dotnv from 'dotenv'
dotnv.config()
@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: process.env.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserRepository]
})
export class UserModule {}
