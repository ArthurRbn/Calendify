import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { BallTriangle } from "react-loader-spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { data: isAuthenticated, refetch, isFetched } = useAuthStatus();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await refetch();

      if (isFetched && isAuthenticated === false) {
        navigate('/authenticate', { replace: true });
      }
    };

    checkAuthStatus();
  }, [navigate, refetch, isAuthenticated, isFetched]);

  if (isAuthenticated === false || isAuthenticated === undefined) {
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
          <BallTriangle color="#00BFFF" height={80} width={80}/>
        </div>
    );
  }

  return <>{children}</>;
};
