import React from 'react';
import {useSnackbar} from "notistack";
import {useAddAppointment} from "../hooks/useAppointments";
import {useBuyers} from "../hooks/useBuyers";
import app from "../App";

export enum AppointmentType {
  VIRTUAL = 'virtual',
  PHYSICAL = 'physical'
}

export interface Appointment {
  id?: number;
  title: string;
  type?: AppointmentType;
  location?: string;
  startTime?: Date;
  endTime?: Date;
  buyerId?: number;
}

export const AppointmentModal: React.FC = () => {
  const {enqueueSnackbar} = useSnackbar();
  const {data: buyers, isFetched} = useBuyers();
  const addAppointmentMutation = useAddAppointment();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [appointment, setAppointment] = React.useState<Appointment>({
    title: '',
    type: AppointmentType.PHYSICAL
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (appointment.title.length === 0 || appointment.startTime === undefined || appointment.endTime === undefined) {
      setError('All fields need to be filled.');
      return;
    } else if (appointment.type === AppointmentType.PHYSICAL && appointment.location?.length === 0) {
      setError('The location is needed for an appointment in person.');
      return;
    } else if (appointment.endTime < appointment.startTime) {
      setError('The end time can\'t be before the start time.');
      return;
    } else if (appointment.buyerId === undefined) {
      setError('A buyer must be selected.');
      return;
    } else {
      setError(undefined);
    }

    addAppointmentMutation.mutate(appointment, {
      onSuccess: () => {
        enqueueSnackbar('Appointment added successfully.', {variant: "success"})
        setIsModalOpen(false);
        setAppointment({
          title: '',
          type: AppointmentType.PHYSICAL
        });
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="max-h-12 w-full mr-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-nowrap"
      >
        Appointments
      </button>
      {isModalOpen && (
        <div tabIndex={-1}
             className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative mx-auto mt-16 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg dark:bg-gray-700 shadow-xl">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create an appointment
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="title"
                           className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Weekly buyer meeting"
                      type="text"
                      name="title"
                      id="title"
                      value={appointment.title}
                      onChange={e => setAppointment({...appointment, title: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="buyer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Buyer
                    </label>
                    <select
                      id="buyer"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={e => setAppointment({...appointment, buyerId: parseInt(e.target.value)})}
                      value={appointment.buyerId}
                    >
                      <option value="">Select a buyer</option>
                      {isFetched && buyers && buyers.map((buyer) => {
                        return (
                          <option value={buyer.id}>{buyer.name} - {buyer.companyName}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Appointment type
                    </label>
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={e => setAppointment({...appointment, type: e.target.value as AppointmentType})}
                      value={appointment.type || ''}
                    >
                      <option value={AppointmentType.PHYSICAL}>In person</option>
                      <option value={AppointmentType.VIRTUAL}>Remote</option>
                    </select>
                  </div>
                  {appointment.type && appointment.type === AppointmentType.PHYSICAL && (
                    <div className="col-span-2">
                      <label htmlFor="location"
                             className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="123 Main St, New York, NY 10001"
                        type="text"
                        name="location"
                        id="location"
                        value={appointment.location || ''}
                        onChange={e => setAppointment({...appointment, location: e.target.value})}
                      />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start</label>
                    <input
                      name='startDate'
                      type="datetime-local"
                      onChange={e => setAppointment({...appointment, startTime: new Date(e.target.value)})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">End</label>
                    <input
                      name='endDate'
                      type="datetime-local"
                      onChange={e => setAppointment({...appointment, endTime: new Date(e.target.value)})}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    ></path>
                  </svg>
                  Create new appointment
                </button>
                {error && (
                  <p id="filled_error_help" className="mt-4 text-xs text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
