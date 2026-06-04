import { createContext, useContext, useState, useEffect } from 'react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'sanse2025';
const ADMIN_HASH = '#gestion-sanse';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('sanse_admin') === '1');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.location.hash === ADMIN_HASH) {
        history.replaceState(null, '', window.location.pathname);
        setShowLogin(true);
      }
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const login = (pw) => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('sanse_admin', '1');
      setIsAdmin(true);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('sanse_admin');
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, showLogin, setShowLogin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
