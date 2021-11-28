import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({
      username,
      password,
    });
    try {
        await this.save(user);
    } catch (error) {
        if(error.code===UserError.DUPLICATE_USERNAME){
            throw new ConflictException('User Name taken already');
        }else{
            throw new InternalServerErrorException();
        }
    }
  }
}

export enum UserError{
    DUPLICATE_USERNAME='23505',
}
