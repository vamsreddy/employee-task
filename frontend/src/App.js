import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Dashboard from './Components/Dashboard';
import Create from './Components/Dashboard/create';
import EmployeeDetails from './Components/Dashboard/view';
import Update from './Components/Dashboard/update';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    // Update the token state
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            token ? (
              <Navigate to='/dashboard' />
            ) : (
              <Login
                setToken={setToken}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            token ? (
              <Dashboard
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route path='/add' element={token ? <Create /> : <Navigate to='/' />} />
        <Route
          path='/view/:id'
          element={token ? <EmployeeDetails /> : <Navigate to='/' />}
        />
        <Route
          path='/edit/:id'
          element={token ? <Update /> : <Navigate to='/' />}
        />
      </Routes>
    </Router>
  );
};

export default App;
