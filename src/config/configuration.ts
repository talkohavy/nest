import { LogLevel } from '@src/modules/logger/types';
import { EnvOptions, RootConfig } from './types';

export function configuration(): RootConfig {
  return {
    root: {
      nodeEnv: (process.env.ENVIRONMENT ?? EnvOptions.Dev) as EnvOptions,
      isDev: !!process.env.IS_DEV,
      port: parseInt(process.env.PORT, 10) || 8000,
      cookieTokenName: 'luckylove',
      aesEncryptIV: '',
      aesEncryptKey: '',
      jwtEncryptionKey: '',
      loggerSettings: {
        logLevel: LogLevel.INFO,
      },
    },
  };
}
