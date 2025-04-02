export type EnrichLogMetadataProps = { [key: string]: any };

export interface LoggerSettings {
  logLevel: LogLevel;
  logEnvironment: string;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}
