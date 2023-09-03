import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthUser } from '../../types/auth-user';

export const useCurrentUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return { user };
};
