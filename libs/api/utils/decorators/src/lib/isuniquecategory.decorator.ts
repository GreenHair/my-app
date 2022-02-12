import { CategoryService } from '@my-app/api/feature/category';
import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueCategoryConstraint implements ValidatorConstraintInterface {
    constructor(private readonly service: CategoryService){}
    validate(name: any, args: ValidationArguments) {
        return this.service.findByName(name).then(category => {
            if (category)
                return false;
            return true;
        });
    }
}

export function IsUniqueCategory(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniqueCategoryConstraint,
        });
    };
}
  