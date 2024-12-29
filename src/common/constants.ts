// import { AuthHeaders } from '@src/middleware/auth/types';

enum AuthHeaders {
  UserId = 'userId',
  UserEmail = 'userEmail',
  UserName = 'userName',
}

export const AUTHORIZED_TOKEN_HEADERS: Record<AuthHeaders, string> = {
  [AuthHeaders.UserId]: 'x-authorized-user-id',
  [AuthHeaders.UserEmail]: 'x-authorized-user-email',
  [AuthHeaders.UserName]: 'x-authorized-user-name',
};
