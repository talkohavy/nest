import { AuthHeaders } from './middleware/auth/types';

export const AUTHORIZED_TOKEN_HEADERS: Record<AuthHeaders, string> = {
  [AuthHeaders.UserId]: 'x-authorized-user-id',
  [AuthHeaders.UserEmail]: 'x-authorized-user-email',
  [AuthHeaders.UserName]: 'x-authorized-user-name',
};

export const enum INCOMING_REQUEST_HEADERS {
  CU_REQUEST_ID = 'cu-request-id',
  X_BROWSER_ID = 'x-browser-id',
  X_TAB_ID = 'x-tab-id',
  X_INCLUDE_RESPONSE_IN_LOG = 'x-include-response-in-log',
}
