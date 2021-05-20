interface LoginResponse {
  created_at: string
  name: string
  phone: string
  refresh_token: string
  token: string
  updated_at: string
  _id: string
}

export class DataObj {
  data: LoginResponse;
  status: string;

  constructor (data: LoginResponse, status: string) {
      this.data = data;
      this.status = status;
  }
}