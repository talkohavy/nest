export enum EnvOptions {
  Dev = 'dev',
  Prod = 'prod',
}

export type Config = {
  nodeEnv: EnvOptions;
  isDev: boolean;
  port: number;
};
