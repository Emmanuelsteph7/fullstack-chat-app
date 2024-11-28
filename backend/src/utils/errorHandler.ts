// Error Handler Class
class ErrorHandler extends Error {
  statusCode: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
