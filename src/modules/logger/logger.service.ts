import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContextKeys, SERVICE_NAME } from '@src/common/constants';

import { LogLevelToNumber } from './logic/constants';
import { convertErrorToObject } from './logic/utils/convertErrorToObject';
import { EnrichLogMetadataProps, LogLevel, LoggerSettings } from './types';
import { CallContextService } from '../call-context.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private readonly loggerSettings: LoggerSettings;
  private readonly domain: string;
  private readonly globalLogLevel: number;

  public constructor(
    private readonly configService: ConfigService,
    private readonly callContextService?: CallContextService,
  ) {
    super();

    const loggerSettings = this.configService.get<LoggerSettings>('logSettings');
    this.globalLogLevel = LogLevelToNumber[loggerSettings?.logLevel ?? LogLevel.INFO];

    this.loggerSettings = loggerSettings;
    this.domain = SERVICE_NAME;
  }

  debug(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.DEBUG);

    console.log(logMetadata);
  }

  log(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.INFO);

    console.log(logMetadata);
  }

  info(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.INFO);

    console.log(logMetadata);
  }

  warn(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.WARN);

    console.log(logMetadata);
  }

  error(message: string, data?: any): void {
    // No need to call shouldLog. ALWAYS print if error and above!

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.ERROR);

    console.log(logMetadata);
  }

  fatal(message: string, data?: any): void {
    // No need to call shouldLog. ALWAYS print if error and above!

    const logMetadata = this.enrichLogMetadata(message, data, LogLevel.FATAL);

    console.log(logMetadata);
  }

  private enrichLogMetadata(message: string, extraData: EnrichLogMetadataProps, level: LogLevel) {
    const error = extraData?.error && convertErrorToObject(extraData.error);

    const logContextMetadata = this.getLogMetadataFromContext(this.callContextService?.getStore());

    const data = typeof extraData === 'string' ? extraData : { ...extraData, context: this.context };

    const enrichedLogMetadata = {
      _time: new Date().toISOString(),
      message,
      level,
      ...logContextMetadata,
      domain: this.domain,
      logEnv: this.loggerSettings.logEnvironment,
      data,
      error,
    };

    return JSON.stringify(enrichedLogMetadata);
  }

  private shouldLog(funcLogLevelAsString: LogLevel) {
    const functionLogLevel = LogLevelToNumber[funcLogLevelAsString];

    return functionLogLevel <= this.globalLogLevel;
  }

  private getLogMetadataFromContext(callContextStore: Map<string, string | object | boolean>) {
    if (!callContextStore) return {};

    return {
      [ContextKeys.RequestId]: callContextStore.get(ContextKeys.RequestId) as string,
      [ContextKeys.XBrowserId]: callContextStore.get(ContextKeys.XBrowserId) as string,
      [ContextKeys.XTabId]: callContextStore.get(ContextKeys.XTabId) as string,
      [ContextKeys.Method]: callContextStore.get(ContextKeys.Method) as string,
      [ContextKeys.Query]: callContextStore.get(ContextKeys.Query) as string,
      [ContextKeys.OriginalUrl]: callContextStore.get(ContextKeys.OriginalUrl) as string,
      [ContextKeys.Url]: callContextStore.get(ContextKeys.Url) as string,
      [ContextKeys.Path]: callContextStore.get(ContextKeys.Path) as string,
    };
  }
}
