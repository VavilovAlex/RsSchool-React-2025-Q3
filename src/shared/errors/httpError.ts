export interface IHttpError extends Error {
  statusCode: number;
  statusMessage: string;
  response: Response;
}

export class HttpError extends Error implements IHttpError {
  statusCode: number;
  statusMessage: string;
  response: Response;

  constructor(response: Response, message: string) {
    super(message);
    this.statusMessage = response.statusText;
    this.statusCode = response.status;
    this.response = response;
    this.name = "HttpError";
  }
}
