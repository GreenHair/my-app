import { comparePasswords } from '@my-app/api/feature/auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'libs/api/data-access/entities/src/lib/Users';
import { toUserDto } from 'libs/api/utils/mapper/src';
import { CreateUserDto } from 'libs/shared/util/dto/src/lib/createUser.dto';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { UserDto } from 'libs/shared/util/dto/src/lib/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users)    
        private readonly userRepo: Repository<Users>, ) {}
    
        async findOne(options?: object): Promise<UserDto> {
            const user =  await this.userRepo.findOne(options) || new Users();    
            return toUserDto(user);  
        }
    
        async findByLogin({ name, password }: LoginUserDto): Promise<UserDto> {    
            const user = await this.userRepo.findOne({ where: { name } });
            
            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
            }
            
            // compare passwords    
            const areEqual = await comparePasswords(user.password, password);
            
            if (!areEqual) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
            }
            
            return toUserDto(user);  
        }
        
        async findByPayload({ name }: any): Promise<UserDto> {
            return await this.findOne({ 
                where:  { name } });  
        }
    
        async create(userDto: CreateUserDto): Promise<UserDto> {    
            const { name, password, email } = userDto;
            
            // check if the user exists in the db    
            const userInDb = await this.userRepo.findOne({ 
                where: { name } 
            });
            if (userInDb) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
            }
            
            const user: Users = this.userRepo.create({ name, password, email });
            await this.userRepo.save(user);
            return toUserDto(user);  
        }
}
