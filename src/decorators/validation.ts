// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { whitelist: true });

    if (errors.length > 0) {
      const errorMessages = this.buildError(errors);
      throw new BadRequestException({ message: 'Có lỗi xảy ra', errors: errorMessages });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as Function & (StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor | ObjectConstructor));
  }

  private buildError(errors: any[]) {
    const result = {};
    errors.forEach(err => {
      const prop = err.property;
      // Object.entries(err.constraints).forEach(([key, message]) => {
      //   result[prop +' '+ key] = message;
      // });
      const lastErrorMessage = Object.values(err.constraints).pop();
      result[prop] = lastErrorMessage;
    });
    return result;
  }
}
