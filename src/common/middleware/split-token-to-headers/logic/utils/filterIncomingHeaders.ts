import { AUTHORIZED_TOKEN_HEADERS } from '@src/common/headers.js';

export function filterIncomingHeaders(headers: any = {}) {
  Object.values(AUTHORIZED_TOKEN_HEADERS).forEach((headerName) => {
    if (headers[headerName]) {
      delete headers[headerName];
    }
  });
}
