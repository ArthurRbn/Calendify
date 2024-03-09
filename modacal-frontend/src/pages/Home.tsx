import React from 'react';
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('jwt');
    queryClient.invalidateQueries('authStatus');
    navigate('/authenticate');
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
