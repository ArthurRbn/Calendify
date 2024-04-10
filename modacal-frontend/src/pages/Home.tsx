import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import {useSnackbar} from "notistack";
import {useAddBuyer, useBuyers, useDeleteBuyer} from "../hooks/useBuyers";

const localizer = momentLocalizer(moment);

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  const {data: buyers, isFetched} = useBuyers();
  const addBuyerMutation = useAddBuyer();
  const deleteBuyerMutation = useDeleteBuyer();
  const [events, setEvents] = React.useState([]);
  const [isBuyersModalOpen, setIsBuyersModalOpen] = React.useState<boolean>(false);
  const [buyerName, setBuyerName] = React.useState<string>('');
  const [buyerCompany, setBuyerCompany] = React.useState<string>('');
  const [buyerError, setBuyerError] = React.useState<string | undefined>(undefined);

  const logout = () => {
    localStorage.removeItem('jwt');
    queryClient.invalidateQueries('authStatus');
    navigate('/authenticate');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (buyerName.length === 0 || buyerCompany.length === 0) {
      setBuyerError('Both fields need to be filled.');
      return;
    } else {
      setBuyerError(undefined);
    }

    const newBuyer = {
      name: buyerName,
      companyName: buyerCompany,
    };

    addBuyerMutation.mutate(newBuyer, {
      onSuccess: () => {
        enqueueSnackbar('Buyer added successfully.', {variant: "success"})
        setIsBuyersModalOpen(false);
        setBuyerName('');
        setBuyerCompany('');
      },
      onError: () => {
        enqueueSnackbar('Error creating buyer.', {variant: "error"})
      }
    });
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
              onClick={() => setIsBuyersModalOpen(!isBuyersModalOpen)}
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

      {isBuyersModalOpen && (
        <div tabIndex={-1}
             className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative mx-auto mt-16 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg dark:bg-gray-700 shadow-xl">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Manage buyers
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBuyersModalOpen(!isBuyersModalOpen)}
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
                    <label htmlFor="name"
                           className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Buyer's name"
                      type="text"
                      name="name"
                      id="name"
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="companyName"
                           className="block mb-2 text-sm font-medium text-gray-900">Company name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Company name"
                      type="text"
                      name="buyerCompany"
                      id="buyerCompany"
                      value={buyerCompany}
                      onChange={e => setBuyerCompany(e.target.value)}
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
                  Add new buyer
                </button>
                {buyerError && (
                  <p id="filled_error_help" className="mt-4 text-xs text-red-600 dark:text-red-400">
                    { buyerError }
                  </p>
                )}
              </form>
              <div className="flex flex-col">
                {isFetched && buyers && buyers.map((buyer) => {
                  return (
                    <>
                      <p>
                        {buyer.name}
                      </p>
                      <button onClick={() => deleteBuyerMutation.mutate(buyer)}>
                        del
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
