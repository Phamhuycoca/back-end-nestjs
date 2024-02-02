const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
import {IsNotEmpty, IsString, Matches } from "class-validator";
import { CommonListQuery } from "src/constant/interfaces";
import { UserOrderBy } from "./user.constant";




export class CreateUserDto{
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    first_name: string;
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    last_name: string;
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    password: string;
}
export class UpdateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    gender?: boolean;
    password: string;
}
export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
    first_name: string;
    last_name: string;
    email: string;
    gender?: boolean;
    password: string;
}
export class LoginUserDto{
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    password: string;
}
