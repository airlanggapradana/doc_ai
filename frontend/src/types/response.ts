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

export interface LoginResponse {
  message: string;
  result: Result;
}

export interface Result {
  rest: REST;
  token: string;
}

export interface REST {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
