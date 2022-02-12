import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'libs/api/utils/decorators/src/lib/public.decorator';
import { CreateUserDto } from 'libs/shared/util/dto/src/lib/createUser.dto';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { AuthService } from './auth.service';
import { Credentials } from './interfaces/credentials.dto';
import { RegistrationStatus } from './interfaces/registrattionStatus.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @Public()
  public async register(@Body() createUserDto: CreateUserDto,): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  @Public()
  public async login(@Body() loginUserDto: LoginUserDto): Promise<Credentials> {
    return await this.authService.login(loginUserDto);
  }
}
