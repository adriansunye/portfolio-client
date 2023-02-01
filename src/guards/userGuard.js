import { Navigate } from 'react-router-dom';
import useAuth from '@/services/providers/AuthProvider';


const UserGuard = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
  };