import { UserService } from '@my-app/api/data-access/user/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'libs/shared/util/dto/src/lib/createUserDto';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUserDto';
import { UserDto } from 'libs/shared/util/dto/src/lib/userDto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registrattionStatus.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService,  ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            console.log("error registring user",err)
            status = {
                success: false,        
                message: "error registring user",
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.name, ...token,    
        };  
    }
    
    private _createToken({ name }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN
        const user: JwtPayload = { name };    
        const accessToken = this.jwtService.sign(user)   
        return {
            expiresIn,
            accessToken,    
        };  
    }
    
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
    
}
