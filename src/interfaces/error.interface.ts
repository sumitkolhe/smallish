export enum ErrorType {
  unauthorised = 'unauthorised',
  accountNotVerified = 'account not verified',
  invalidAuthenticationToken = 'invalid authentication token',
  invalidRefreshToken = 'invalid refresh token',
  invalidVerifyToken = 'invalid email verification token',
  emailAlreadyExists = 'email address is already registered',
  userNotFound = 'user not found',
  incorrectLoginCredentials = 'incorrect login credentials',
  aliasAlreadyUsed = 'alias is already used',
  linkNotFound = 'link not found',
}
