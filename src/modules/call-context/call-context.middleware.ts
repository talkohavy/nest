import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { ContextKeys } from '@src/common/constants';
import { INCOMING_REQUEST_HEADERS } from '@src/common/headers';
import { CustomRequest } from '@src/common/types';
import { NextFunction, Response } from 'express';
import { CallContextService } from './call-context.service';

@Injectable()
export class CallContextMiddleware implements NestMiddleware {
  public constructor(private readonly callContextService: CallContextService<string, string>) {}

  public use(req: CustomRequest, res: Response, next: NextFunction): void {
    if (req.originalUrl.includes('favicon.ico')) return void res.status(204).end();

    const { method, query, url, originalUrl, path } = req;

    this.callContextService.register();
    const requestId = req.headers[INCOMING_REQUEST_HEADERS.X_REQUEST_ID] as string;
    const xBrowserId = req.headers[INCOMING_REQUEST_HEADERS.X_BROWSER_ID] as string;
    const xTabId = req.headers[INCOMING_REQUEST_HEADERS.X_TAB_ID] as string;

    if (!requestId) throw new BadRequestException(`Missing ${INCOMING_REQUEST_HEADERS.X_REQUEST_ID} header`);

    this.callContextService.set(ContextKeys.RequestId, requestId);
    this.callContextService.set(ContextKeys.XBrowserId, xBrowserId);
    this.callContextService.set(ContextKeys.XTabId, xTabId);
    this.callContextService.set(ContextKeys.Method, method);
    this.callContextService.set(ContextKeys.OriginalUrl, originalUrl);
    this.callContextService.set(ContextKeys.Url, url);
    this.callContextService.set(ContextKeys.Path, path);
    this.callContextService.set(ContextKeys.Query, JSON.stringify(query));

    next();
  }
}
