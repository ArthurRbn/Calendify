import {useMutation, useQuery, useQueryClient} from 'react-query';
import {myFetch} from '../api/myFetch';
import {apiUrl} from '../constants';
import {Appointment} from "../components/AppointmentModal";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (appointment: Appointment) => {
      try {
        const response = await myFetch(`${apiUrl}/appointments/${appointment.id}`, {
          method: 'DELETE',
        });
        if (!response || !response.ok) {
          throw new Error('Failed to delete appointment');
        }
      } catch (e) {
        console.error('Error creating appointment:', e);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
      },
    }
  );
};

export const useAddAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newAppointment: Appointment) => {
      try {
        const response = await myFetch(`${apiUrl}/appointments`, {
          method: 'POST',
          body: JSON.stringify(newAppointment),
        }, true);
        if (!response || !response.ok) {
          throw new Error('Failed to create appointment');
        }
      } catch (e) {
        console.error('Error creating appointment:', e);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
      },
    }
  );
};

const fetchAppointments = async () => {
  try {
    const response = await myFetch(`${apiUrl}/appointments`);
    if (!response || !response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json() as Appointment[];
  } catch (e) {
    console.error('Error fetching appointments data:', e);
    return false;
  }
};

export const useAppointments = () => {
  return useQuery('appointments', fetchAppointments);
};
