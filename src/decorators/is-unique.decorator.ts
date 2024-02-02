import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { UniqueValidator } from '../decorators/unique.validator';

export function IsUnique(entity: string, field: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: new UniqueValidator((entity, field, value) => {
        return Promise.resolve(true);
      }),
    });
  };
}
