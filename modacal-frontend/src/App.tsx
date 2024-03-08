import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ProtectedRoute} from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <SignIn/>
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp/>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
