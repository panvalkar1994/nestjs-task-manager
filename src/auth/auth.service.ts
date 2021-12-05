import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return await this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<string>{
        const {username,password} = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        if(user && (await Bcrypt.compare(password, user.password))){
            return 'success';
        }else{
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
