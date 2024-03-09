import React, {useState} from 'react';
import {useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {myFetch} from "../api/myFetch";
import {apiUrl} from "../constants";
import {AuthResponse} from "../types/AuthResponse";
import {ErrorResponse} from "../types/ErrorResponse";
import {useSnackbar} from "notistack";

function Authenticate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email.length === 0) {
      setError('Email cannot be empty.');
      return;
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    } else {
      setError(undefined);
    }

    if (mode === 'signup' && (password !== confirmPassword || confirmPassword.length === 0)) {
      setError('Passwords must be identical and cannot be empty.');
      return;
    } else if (mode === 'signup' && password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    const url = mode === 'signup' ? `${apiUrl}/vendors/register` : `${apiUrl}/vendors/login`;
    const body = JSON.stringify({username: email, password: password});
    const response = await myFetch(url, {method: 'POST', body}, false);

    if (response && response.ok) {
      const data = await response.json() as AuthResponse;
      localStorage.setItem('jwt', data.token);
      queryClient.invalidateQueries('authStatus');
      navigate('/');
    } else {
      console.error(`${mode} error`);
      if (response) {
        const errorData = await response.json() as ErrorResponse;
        enqueueSnackbar(errorData.error, {variant: "error"});
        console.error(errorData.error);

      }
    }
  };


  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center mx-auto h-screen'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold'>
          <img
            className='w-8 h-8 mr-2'
            src='/modaIcon.webp'
            alt='logo'
          />
          ModaCal
        </a>
        <div className='w-full bg-white rounded-lg max-w-md'>
          <div className='p-8 space-y-4'>
            <div className='flex flex-row justify-between'>
              <h1 className='text-xl font-bold tracking-tight text-gray-900'>
                {mode === "signin" ? "Sign in to your account" : "Create your account"}
              </h1>
              <button
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center"
                type="button"
                onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
              >
                {mode === 'signup' ? 'Sign in' : 'Sign Up'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5'
                  placeholder='••••••••'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
              {error &&
                  <span
                      className='text-center block mb-2 text-sm font-medium text-red-600'
                  >
                    {error}
                  </span>
              }
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {mode === 'signup' ? 'Sign Up' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Authenticate;
