import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomRequest } from '@src/common/types';
import { Config } from '@src/config/types';
import { CallContextService } from '@src/modules/call-context/call-context.service';
import { LoggerService } from '@src/modules/logger/logger.service';
import { NextFunction, Response } from 'express';

// import { createDecipheriv } from 'crypto';
// import { JwtPayload, verify as verifyJwt } from 'jsonwebtoken';
// import { ContextKeys } from '@src/common/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly callContextService: CallContextService<string, string>,
  ) {
    this.logger.setContext('AuthMiddleware');
  }

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (this.shouldSkipAuthentication()) {
        this.logger.info('localhost - skipping token authentication...');

        return next();
      }

      this.logger.info('trying to authenticate token inside cookie...');

      const { cookieTokenName } = this.configService.get<Config>('root');

      const token = req.cookies[cookieTokenName];

      const { isValid, data: authData, message } = await this.validateToken(token);

      if (!isValid) throw new UnauthorizedException(message);

      const authToken: any = {
        isValid,
        userId: authData.id,
        userEmail: authData.email,
        userName: authData.username,
      };

      this.logger.info('authToken verification PASSED successfully!', { authToken });

      this.attachAuthTokenObjectToReq(req, authToken);

      next();
    } catch (error: any) {
      console.error(error);

      this.logger.error('token authentication failed...', { error });

      throw new UnauthorizedException();
    }
  }

  private shouldSkipAuthentication() {
    const isDev = this.configService.get<boolean>('root.isDev');

    return isDev;
  }

  private attachAuthTokenObjectToReq(req: CustomRequest, authTokenObj: any) {
    req.authToken = authTokenObj;
  }

  private async validateToken(_token: string): Promise<any> {
    return {
      isValid: true,
      data: {
        id: 'abcd',
        email: 'talkohavy@gmail.com',
        username: 'talkohavy',
      },
    };
    // if (!token) return { isValid: false, message: 'Unauthorized: no token found' };

    // const { jwtEncryptionKey, aesEncryptKey, aesEncryptIV } = this.configService.get<Config>(null);

    // if (!(jwtEncryptionKey && aesEncryptKey && aesEncryptIV))
    //   throw new Error('AuthMiddleware: atl least 1 of the auth tools required for token self validation is missing');

    // const result = await this.selfValidate(token, jwtEncryptionKey, aesEncryptKey, aesEncryptIV);

    // return result;
  }

  // private async selfValidate(
  //   token: string,
  //   jwtEncryptionKey: string,
  //   encryptKey: string,
  //   encryptIv: string,
  // ): Promise<AuthDto> {
  //   this.logger.info('AuthMiddleware: Self validating token');

  //   try {
  //     const jwtPayload = verifyJwt(token, jwtEncryptionKey) as JwtPayload;

  //     if (this.isTokenExpired(jwtPayload)) {
  //       this.logger.error('AuthMiddleware: Self validation: token is expired');
  //       return { isValid: false, message: 'Unauthorized: token expired' };
  //     }

  //     const data = this.decryptTokenInfo(jwtPayload.info, encryptKey, encryptIv);

  //     this.logger.info('AuthMiddleware: self validation: passed successfully');

  //     return { data, isValid: true };
  //   } catch (error) {
  //     console.error(error);

  //     this.logger.error('AuthMiddleware: Self validation: authorization failed', { error });

  //     return { isValid: false, message: 'Unauthorized: Failed to validate token' };
  //   }
  // }

  // private isTokenExpired(jwtPayload: JwtPayload) {
  //   return !jwtPayload.exp || jwtPayload.exp * 1000 < Date.now();
  // }

  // private decryptTokenInfo(jwtPayloadInfo: string, encryptKey: string, encryptIv: string) {
  //   const cipher = createDecipheriv('aes256', encryptKey, encryptIv);
  //   const data = JSON.parse(cipher.update(jwtPayloadInfo, 'base64', 'utf8') + cipher.final('utf8'));

  //   return data;
  // }
}
