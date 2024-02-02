import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './interface/user.interface';
import { ValidationPipe } from 'src/decorators/validation';
import { SuccessResponse } from 'src/helpers/response';
import { BaseController } from 'src/common/base/base.controller';

@Controller('user')
@ApiTags('User APIs')

export class UserController extends BaseController{
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(
      @Body(new ValidationPipe())
      dto: CreateUserDto,
  ) {
      try {
          console.log(dto);
          const result = await this.userService.createUser(dto);
          return new SuccessResponse(result);
      } catch (error) {
          this.handleError(error);
      }
  }
}
