import { UserService } from 'libs/api/data-access/user/src';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'libs/shared/util/dto/src/lib/createUser.dto';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { UserDto } from 'libs/shared/util/dto/src/lib/user.dto';
import { Credentials } from './interfaces/credentials.dto';
import { JwtPayload } from './interfaces/payload.dto';
import { RegistrationStatus } from './interfaces/registrattionStatus.dto';

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

    async login(loginUserDto: LoginUserDto): Promise<Credentials> {    
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
