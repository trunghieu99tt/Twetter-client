export interface IGetList<T> {
  data: T[];
  total: number;
}

export interface IApiResponse<T = any> {
  readonly data?: T;
  readonly total?: number;
  readonly error?: Error;
  readonly message?: string;
  readonly statusCode?: number;
}
