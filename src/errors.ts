class APIError {
  protected readonly error: boolean = true;
}

export class AuthorizationError extends APIError {
  readonly code: number = 401;
  readonly description: string = "UNAUTHORIZED";

  constructor(
    private readonly message: string,
    private readonly errorCode?: number
  ) {
    super();
  }
}

export class PayloadError extends APIError {
  readonly code: number = 400;
  readonly description: string = "BAD_REQUEST";

  constructor(
    private readonly message: string,
    private readonly errorCode?: number
  ) {
    super();
  }
}
