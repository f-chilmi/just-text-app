import { LoginResponse } from "./loginResponse";
export class DataObj {
  data: LoginResponse;
  status: string;

  constructor (data: LoginResponse, status: string) {
      this.data = data;
      this.status = status;
  }
}