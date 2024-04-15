import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import {BuyerModal} from "../components/BuyerModal";
import {Appointment, AppointmentModal, AppointmentType} from "../components/AppointmentModal";
import {useAppointments, useDeleteAppointment} from "../hooks/useAppointments";
import {useBuyers} from "../hooks/useBuyers";

interface Event extends Appointment {
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,
}

const localizer = momentLocalizer(moment);

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | undefined>(undefined);
  const {data: appointments, isFetched} = useAppointments();
  const {data: buyers} = useBuyers();
  const deleteAppointmentMutation = useDeleteAppointment();

  React.useEffect(() => {
    if (isFetched && appointments) {
      const newEvents: Event[] = appointments.map((appointment: Appointment) => ({
        start: new Date(appointment.startTime!),
        end: new Date(appointment.endTime!),
        ...appointment,
      }));
      setEvents(newEvents);
    }
  }, [appointments, isFetched]);

  const logout = () => {
    localStorage.removeItem('jwt');
    queryClient.invalidateQueries('authStatus');
    navigate('/authenticate');
  }

  const onDoubleClickEvent = useCallback((calEvent: Event) => {
    setIsDetailModalOpen(true);
    setSelectedEvent(calEvent);
  }, [])

  const deleteAppointment = (id: number | undefined) => {
    if (id && appointments) {
      const appointment = appointments?.find(a => a.id === id);
      if (appointment) {
        deleteAppointmentMutation.mutate(appointment, {
          onSuccess: () => {
            queryClient.invalidateQueries('appointments');
            setIsDetailModalOpen(false);
          }
        });
      }
    }
  }

  if (buyers === undefined || buyers === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav
        className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://www.arthurrobine.fr/" className="flex items-center space-x-3">
            <img src="/logo.png" className="h-16" alt="Calendar Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Calendify
            </span>
          </a>
          <div className="flex">
            <BuyerModal/>
            <AppointmentModal/>
            <button
              type="button"
              onClick={logout}
              className="max-h-12 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-nowrap"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <Calendar
          className="max-w-screen-xl mx-auto mt-4"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{height: 500}}
          onDoubleClickEvent={onDoubleClickEvent}
        />
        <p className="mt-1 ml-4 text-sm text-gray-500" id="calendar_help">
          Double click on an element to see more details.
        </p>
      </div>


      {isDetailModalOpen && (
        <div tabIndex={-1}
             className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative mx-auto mt-16 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg dark:bg-gray-700 shadow-2xl p-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b rounded-t dark:border-gray-600">
                <h2 className="text-xl text-gray-900 dark:text-white font-bold">
                  {selectedEvent?.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
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
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 me-2" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24" fill="currentColor" viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-900 dark:text-white text-base font-medium">
                    {selectedEvent?.start.toDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 me-2" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    className="text-gray-900 dark:text-white text-base font-medium">{selectedEvent?.location}</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 rtl:space-x-reverse mb-5">
                <div>
                  <div className="text-base font-normal text-gray-500 mb-2">Buyer</div>
                  <span className="text-gray-900 dark:text-white text-base font-medium block">
                    {buyers.find(b => b.id === selectedEvent?.buyerId)?.name || 'Buyer not found'}
                  </span>
                </div>
                <div>
                  <div className="text-base font-normal text-gray-500 mb-2">Duration</div>
                  <span className="text-gray-900 dark:text-white text-base font-medium block">30 min</span>
                </div>
                <div>
                  <div className="text-base font-normal text-gray-500 mb-2">Meeting Type
                  </div>
                  <span className="text-gray-900 text-base font-medium block">
                    {selectedEvent?.type === AppointmentType.PHYSICAL ? "In person" : "Remote"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteAppointment(selectedEvent?.id)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1 text-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>)
      }
    </div>
  );
}

export default Home;
