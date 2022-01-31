import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsNotEmpty()  uid: number;
    @IsNotEmpty()  name: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}
