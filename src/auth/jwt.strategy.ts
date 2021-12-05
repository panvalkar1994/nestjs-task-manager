import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository:UsersRepository
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:"abc123"            
        });
    }

    async validate(payload:JwtPayload) : Promise<User>{
        const {username} = payload;
        const user:User = await this.userRepository.findUserByUsername(username);
        if(!user){
            throw new UnauthorizedException()
        }

        return user;
    }
}