import { User } from "./User";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface RegisterData extends User {
  password_confirmation: string;
}
