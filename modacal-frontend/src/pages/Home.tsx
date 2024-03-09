import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [events, setEvents] = React.useState([]);

  const logout = () => {
    localStorage.removeItem('jwt');
    queryClient.invalidateQueries('authStatus');
    navigate('/authenticate');
  }

  return (
    <div>
      <nav
        className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://www.modaresa.com/" className="flex items-center space-x-3">
            <img src="/modaIcon.webp" className="h-16" alt="ModaCal Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              ModaCal
            </span>
          </a>
          <div className="flex">
            <button
              type="button"
              className="max-h-12 w-full mr-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-nowrap"
            >
              Buyers
            </button>
            <button
              type="button"
              className="max-h-12 w-full mr-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-nowrap"
            >
              Appointments
            </button>
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
        />
      </div>
    </div>
  );
}

export default Home;
