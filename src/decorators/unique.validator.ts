import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly model: (entity: string, field: string, value: any) => Promise<boolean>) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity, field] = args.constraints;
    const isUnique = await this.model(entity, field, value);
    return !isUnique;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} đã tồn tại`;
  }
}
