import React, { ReactNode, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { BallTriangle } from 'react-loader-spinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const getAuthStatus = async (
  isFetched: boolean,
  isAuthenticated: boolean | undefined,
  refetch: any,
  navigate: NavigateFunction
) => {
  await refetch();

  if (isFetched && isAuthenticated === false) {
    navigate('/authenticate', { replace: true });
  }
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { data: isAuthenticated, refetch, isFetched } = useAuthStatus();

  useEffect(() => {
    getAuthStatus(isFetched, isAuthenticated, refetch, navigate).then(_ => console.log('Check auth status done'));
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
