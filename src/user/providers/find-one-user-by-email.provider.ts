import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    // let user: User | undefined = undefined;

    // This will return null if the user is not found
    let user = await this.usersRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    return user;
  }
}
