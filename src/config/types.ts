export enum EnvOptions {
  Dev = 'dev',
  Prod = 'prod',
}

export type Config = {
  nodeEnv: EnvOptions;
  isDev: boolean;
  port: number;
  cookieTokenName: string;
  jwtEncryptionKey: string;
  aesEncryptKey: string;
  aesEncryptIV: string;
  loggerSettings: {
    logLevel: any;
  };
};

export type RootConfig = {
  root: Config;
};
