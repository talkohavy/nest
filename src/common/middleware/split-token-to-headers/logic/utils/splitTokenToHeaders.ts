import { AUTHORIZED_TOKEN_HEADERS } from '@src/common/headers.js';

export function splitTokenToHeaders(tokenAsObject: any) {
  const authTokenHeaders = {};

  Object.entries(tokenAsObject).forEach(([propName, propValue]) => {
    if (AUTHORIZED_TOKEN_HEADERS[propName]) {
      const headerName = AUTHORIZED_TOKEN_HEADERS[propName];
      authTokenHeaders[headerName] = propValue;
    }
  });

  return authTokenHeaders;
}
