import { User } from "./User";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface AuthData {
  user: User;
  token: string;
}
