export interface RegisterResponse {
  message: string;
  result: Result;
}

export interface Result {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
