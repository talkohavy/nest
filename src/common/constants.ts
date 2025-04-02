export const SERVICE_NAME = 'BACKEND';

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

export const ContextKeys = {
  Method: 'method',
  OriginalUrl: 'originalUrl',
  Url: 'url',
  Path: 'path',
  Query: 'query',
  RequestId: 'x-request-id',
  XBrowserId: 'x-browser-id',
  XTabId: 'x-tab-id',
};
