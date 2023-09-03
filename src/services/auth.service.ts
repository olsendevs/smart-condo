import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  login = (email: string, password: string) => {
    return this.instance
      .post('/auth/login', {
        email,
        password,
      })
      .then((res: any) => {
        return {
          email: email,
          id: res.data.user._id,
          accessToken: res.data.token,
          type: res.data.type,
        };
      });
  };
}
