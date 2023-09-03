import { AuthService } from './auth.service';
import 'dotenv/config';

export const authService = new AuthService(
  `${process.env.NEXT_PUBLIC_API_URL}`,
);
