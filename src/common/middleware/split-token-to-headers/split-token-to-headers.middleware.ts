import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequest } from '@src/common/types.js';
import { LoggerService } from '@src/modules/logger/logger.service.js';
import { NextFunction, Response } from 'express';
import { filterIncomingHeaders } from './logic/utils/filterIncomingHeaders';
import { splitTokenToHeaders } from './logic/utils/splitTokenToHeaders';

@Injectable()
export class SplitTokenToHeadersMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {
    this.logger.setContext('SplitTokenToHeadersMiddleware');
  }

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const { authToken, headers } = req;

    filterIncomingHeaders(headers);

    if (authToken) {
      const tokenHeaders = splitTokenToHeaders(authToken);
      req.headers = { ...req.headers, ...tokenHeaders };

      this.logger.info('split token to headers successfully!', { tokenHeaders });
    }

    next();
  }
}
