import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    public async findOneByGoogleId(googleId: string) {
        return await this.userRepository.findOneBy({googleId});
    }
}
