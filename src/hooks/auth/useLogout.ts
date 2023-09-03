import Cookies from 'js-cookie';

export const useLogout = () => {
  const logout = () => {
    Cookies.remove('currentUser');
    Cookies.remove('currentCondominium');
    localStorage.removeItem('user');
    localStorage.removeItem('condominium');
  };

  return { logout };
};
