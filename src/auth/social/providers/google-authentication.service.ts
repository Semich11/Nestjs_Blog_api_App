import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/user/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    console.log('Authenticate Method!!!');
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      console.log('Login ticket verified: ', loginTicket);

      const payload = loginTicket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      console.log('Payload here!!!!!!   ', payload);

      const { email, sub: googleId, given_name } = payload;

      console.log('Email here!!!!!!   ', email);

      if (!email) {
        throw new UnauthorizedException('Email not provided by Google');
      }

      const user = await this.usersService.findOneByGoogleId(googleId);

      if (user) {
        return this.generateTokensProvider.generateToken(user);
      }

      const newUser = await this.usersService.createGoogleUser({
        email: email,
        googleId: googleId,
        firstName: given_name ?? 'User',
        lastName: given_name ?? 'User_lastName',
      });

      return this.generateTokensProvider.generateToken(newUser);
    } catch (error) {
      console.error('Google authentication failed:', error);
      throw new UnauthorizedException('Google authentication failed');
    }
  }
}
