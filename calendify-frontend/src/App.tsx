import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';

const queryClient = new QueryClient();

function App() {

  return (
    <SnackbarProvider maxSnack={3}>
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
              path="/authenticate"
              element={
                <Authenticate/>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
