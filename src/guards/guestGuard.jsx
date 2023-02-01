import { Navigate } from 'react-router-dom';
import useAuth from '@/services/providers/AuthProvider';


export const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};