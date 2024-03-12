import { useQuery, useMutation, useQueryClient } from 'react-query';
import { myFetch } from '../api/myFetch';
import { apiUrl } from '../constants';
import {Buyer} from "../types/Buyer";

export const useDeleteBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (buyer: Buyer) => {
      try {
        const response = await myFetch(`${apiUrl}/buyers/${buyer.id}`, {
          method: 'DELETE',
        });
        if (!response || !response.ok) {
          throw new Error('Failed to add buyer');
        };
      } catch (e) {
        console.error('Error creating buyer:', e);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('buyers');
      },
    }
  );
};

export const useAddBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newBuyer: Buyer) => {
      try {
        const response = await myFetch(`${apiUrl}/buyers`, {
          method: 'POST',
          body: JSON.stringify(newBuyer),
        }, true);
        if (!response || !response.ok) {
          throw new Error('Failed to add buyer');
        };
      } catch (e) {
        console.error('Error creating buyer:', e);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('buyers');
      },
    }
  );
};

const fetchBuyers = async () => {
  try {
    const response = await myFetch(`${apiUrl}/buyers`);
    if (!response || !response.ok) {
      throw new Error('Network response was not ok');
    }
    const buyers = await response.json() as Buyer[];
    return buyers;
  } catch (e) {
    console.error('Error fetching buyers data:', e);
    return false;
  }
};

export const useBuyers = () => {
  return useQuery('buyers', fetchBuyers);
};
