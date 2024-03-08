import React from 'react';

function SignUp() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-auto h-screen">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold">
          <img className="w-8 h-8 mr-2" src="/modaIcon.webp" alt="logo"/>
            ModaCal
        </a>
        <div className="w-full bg-white rounded-lg max-w-md">
          <div className="p-8 space-y-4">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>
            <form className="space-y-4" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                       placeholder="name@company.com"/>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <button type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;