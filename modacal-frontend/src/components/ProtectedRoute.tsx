import React, {ReactNode, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import {BallTriangle} from "react-loader-spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const navigate = useNavigate();
  const {data: isAuthenticated, refetch} = useAuthStatus();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await refetch();

      if (!isAuthenticated) {
        navigate('/login', {replace: true});
      }
    };

    checkAuthStatus();
  }, [navigate, refetch, isAuthenticated]);

  if (isAuthenticated === false || isAuthenticated === undefined) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <BallTriangle/>
      </div>
    )
      ;
  }

  return <>{children}</>;
};
