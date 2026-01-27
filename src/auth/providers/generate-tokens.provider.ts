import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { User } from 'src/user/entity/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    // Generate access token
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, 
        this.jwtConfiguration.accessTokenTtl, 
        <Partial<ActiveUserData>
    >{
      email: user.email,
    }),

    this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl)
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

}
