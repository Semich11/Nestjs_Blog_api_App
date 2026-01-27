import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/providers/users.service';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';
@Injectable()
export class AuthService {

    constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,

    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

    public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshtokens(refreshTokenDto: RefreshTokenDto) {
      return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }

}
