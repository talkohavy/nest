import { AuthHeaders } from './middleware/auth/constants';

export const AUTHORIZED_TOKEN_HEADERS: Record<AuthHeaders, string> = {
  [AuthHeaders.UserId]: 'x-authorized-user-id',
  [AuthHeaders.UserEmail]: 'x-authorized-user-email',
  [AuthHeaders.UserName]: 'x-authorized-user-name',
};

export const enum INCOMING_REQUEST_HEADERS {
  X_REQUEST_ID = 'x-request-id',
  X_BROWSER_ID = 'x-browser-id',
  X_TAB_ID = 'x-tab-id',
  X_INCLUDE_RESPONSE_IN_LOG = 'x-include-response-in-log',
}
