import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomRepositoryDoesNotHaveEntityError, EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as Bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await Bcrypt.genSalt();
    const hashedPassword = await Bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password:hashedPassword
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByUsername(username:string):Promise<User>{
    const query = this.createQueryBuilder('user');
    query.andWhere('user.username = :username', {username});
    const user = await query.getOne();
    if(!user){
      throw new NotFoundException();
    }
    return user;
  }
}
