import { Navigate } from 'react-router';
import {useAuth} from "../../context/AuthorizationContext.jsx";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
