import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserListQuery, LoginDto, UpdateUserDto } from './interface/user.interface';
import { ValidationPipe } from '../../decorators/validation';
import { ErrorResponse, SuccessResponse } from '../../helpers/response';
import { BaseController } from '../../common/base/base.controller';
import { toObjectId } from '../../helpers/commonFunctions';
import { HttpStatus } from '../../constant/constant';

@Controller('user')
@ApiTags('User API')

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
          const result = await this.userService.createUser(dto);
          return new SuccessResponse(result);
      } catch (error) {
          this.handleError(error);
      }
  }


  @ApiOperation({ summary: 'Update User by id' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  async updateUser(
      @Param('id') id: string,
      @Body()
      dto: UpdateUserDto,
  ) {
      try {
          const user = await this.userService.findUserById(toObjectId(id));
          console.log(id)
          if (!user) {
              return new ErrorResponse(HttpStatus.ITEM_NOT_FOUND,'Not Found');
          }

          const result = await this.userService.updateUser(
              toObjectId(id),
              dto,
          );
          return new SuccessResponse(result);
      } catch (error) {
          this.handleError(error);
      }
  }

  @ApiOperation({ summary: 'Delete User by id' })
  @Delete(':id')
  async deleteUser(
      @Param('id') id: string,
  ) {
      try {
          const user = await this.userService.findUserById(toObjectId(id));

          if (!user) {
              return new ErrorResponse(
                  HttpStatus.ITEM_NOT_FOUND,'Not Found'
              );
          }

          const result = await this.userService.deleteUser(toObjectId(id));
          return new SuccessResponse(result);
      } catch (error) {
          this.handleError(error);
      }
  }

  @ApiOperation({ summary: 'Get User detail by id' })
  @Get(':id')
  async getUserDetail(
      @Param('id') id: string,
  ) {
      try {
          const result = await this.userService.findUserById(toObjectId(id));

          if (!result) {
              return new ErrorResponse(
                  HttpStatus.ITEM_NOT_FOUND,'Not found'
              );
          }
          return new SuccessResponse(result);
      } catch (error) {
          this.handleError(error);
      }
  }




    @ApiOperation({ summary: 'Get User list' })
    @Get()
    async getUserList(
        @Query()
        query: GetUserListQuery,
    ) {
        try {
            const result = await this.userService.findAllAndCountUserByQuery(query);
            return new SuccessResponse(result);
        } catch (error) {
            throw this.handleError(error);
        }
    }


    @ApiOperation({summary:'Login'})
    @ApiBody({type:LoginDto})
    @Post('Login')
    async Login(@Body() dto:LoginDto){
        try{
            const result = await this.userService.Login(dto.email,dto.password);
            return new SuccessResponse(result);
        }catch (error) {
            this.handleError(error);
        }
    }
}
