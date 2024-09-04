export interface ApiResponse<T> {
  status: string;
  code: number;
  data?: T;
  message?: string;
}
