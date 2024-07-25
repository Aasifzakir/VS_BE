export enum ResponseStatus {
  BAD_REQUEST = 400,
  VALIDATION_ERROR = 412,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  INTERNAL_ERROR = 500,
  BAD_GATEWAY = 502,
  SUCCESS = 200,
  CREATED = 201,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

/* MESSAGES */
export enum DefaultMessage {
  INVALID_USER_PASS = 'Invalid Email or Password',
  INVALID_ACCESS = 'Invalid Access',
  ALREADY_EXISTS = 'Already exists.',
  NOT_EXISTS = 'Not exists.',
  INVALID_TOKEN = 'Invalid Token',
  EMAIL_ALREADY_EXISTS = 'Email Already Exists',
}

export const jwtConstants = {
  secret: 'hjvaftia9pa876yahj768a75eda8jkia76',
};

export const dbDetails = {
  uri: 'mongodb://localhost:27017/vitasoft',
};

export const PORT = 5000;

export const handleResponse = (data = null, message, success = true) => ({
  data,
  message,
  success,
});
