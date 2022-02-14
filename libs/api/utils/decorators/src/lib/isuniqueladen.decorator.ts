import { ApiFeatureShopService } from '@my-app/api/feature/shop';
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
export class IsUniqueLadenConstraint implements ValidatorConstraintInterface {
    constructor(private readonly service: ApiFeatureShopService){}

    validate(name: any, args: ValidationArguments) {
        return this.service.findByName(name).then(laden => {
            if (laden)
                return false;
            return true;
        });
    }
}

export function IsUniqueLaden(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniqueLadenConstraint,
        });
    };
}
  