import { Config, EnvOptions } from './types';

export function getConfiguration(): Config {
  return {
    nodeEnv: (process.env.ENVIRONMENT ?? EnvOptions.Dev) as EnvOptions,
    isDev: !!process.env.IS_DEV,
    port: parseInt(process.env.PORT, 10) || 8000,
  };
}
