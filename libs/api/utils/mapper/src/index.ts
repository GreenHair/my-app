import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { Ausgaben } from 'libs/api/data-access/entities/src/lib/Ausgaben';
import { Rechnung } from 'libs/api/data-access/entities/src/lib/Rechnung';
import { Users } from 'libs/api/data-access/entities/src/lib/Users';
import { AusgabenDto } from 'libs/shared/util/dto/src/lib/ausgaben.dto';
import { NewRechnungDto } from 'libs/shared/util/dto/src/lib/newRechnung.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { UserDto } from 'libs/shared/util/dto/src/lib/user.dto';

export * from './lib/api-utils-mapper.module';


export const toUserDto = (data: Users): UserDto => {  
    const { uid, name, email } = data;
    let userDto: UserDto = { uid, name, email };
    return userDto;
};

export const toEntityDto = (entityDto: any, repository: any) => {
    Object.assign(entityDto, repository)
    return entityDto
}

export function toInvoiceEntity(invoice: NewRechnungDto) : Rechnung {
    return convert<Rechnung>(invoice, Rechnung)
}

export function toInvoiceDto(invoice: Rechnung) : RechnungDto {
    return convert<RechnungDto>(invoice, RechnungDto)
}

export function toArticleDto(article: Ausgaben): AusgabenDto {
    return convert<AusgabenDto>(article, AusgabenDto)
}

function convert<T>(from: any, To: any) : T {
    const data = instanceToPlain(from)
    return plainToInstance(To, data)
}