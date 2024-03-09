import {useQuery} from 'react-query';
import { myFetch } from '../api/myFetch';
import {apiUrl} from "../constants";

const checkAuthStatus = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return false;
  }

  try {
    const response = await myFetch(`${apiUrl}/vendors/validate-token`, {
      method: 'POST',
    });

    if (!response || !response.ok) {
      throw new Error('Token validation failed');
    }

    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};


export const useAuthStatus = () => {
  return useQuery('authStatus', checkAuthStatus, {
    enabled: false,
  });
};
