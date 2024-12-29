import { UnauthorizedException } from '@nestjs/common';
import { EnvOptions } from '@src/config/types';

const ALLOWED_DOMAINS = ['luckylove.co.il'];
const PROD_DOMAIN_REGEX = 'luckylove.co.il';

export function handleCors(nodeEnv: EnvOptions) {
  return (
    origin: string,
    callback: (err: Error | null, origin?: any) => void,
  ) => {
    const isAllowed =
      origin === undefined ||
      ALLOWED_DOMAINS.includes(origin) ||
      (nodeEnv !== EnvOptions.Prod && origin.endsWith(PROD_DOMAIN_REGEX));

    if (isAllowed) return void callback(null, true);

    callback(new UnauthorizedException('CORS not allowed'), false);
  };
}
