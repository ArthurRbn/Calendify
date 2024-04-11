import React from 'react';
import {useSnackbar} from "notistack";
import {useAddBuyer, useBuyers, useDeleteBuyer} from "../hooks/useBuyers";

export const BuyerModal: React.FC = () => {
  const {enqueueSnackbar} = useSnackbar();
  const {data: buyers, isFetched} = useBuyers();
  const addBuyerMutation = useAddBuyer();
  const deleteBuyerMutation = useDeleteBuyer();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [buyerName, setBuyerName] = React.useState<string>('');
  const [buyerCompany, setBuyerCompany] = React.useState<string>('');
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (buyerName.length === 0 || buyerCompany.length === 0) {
      setError('Both fields need to be filled.');
      return;
    } else {
      setError(undefined);
    }

    const newBuyer = {
      name: buyerName,
      companyName: buyerCompany,
    };

    addBuyerMutation.mutate(newBuyer, {
      onSuccess: () => {
        enqueueSnackbar('Buyer added successfully.', {variant: "success"})
        setIsModalOpen(false);
        setBuyerName('');
        setBuyerCompany('');
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
        Buyers
      </button>
      {isModalOpen && (
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
                {error && (
                  <p id="filled_error_help" className="mt-4 text-xs text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </form>
              <div className="flex flex-col">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 px-5">
                  {isFetched && buyers && buyers.map((buyer) => {
                    return (
                      <li className="py-1.5 sm:py-2">
                        <div className="flex items-center">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {buyer.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {buyer.companyName}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteBuyerMutation.mutate(buyer)}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1 text-center"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
