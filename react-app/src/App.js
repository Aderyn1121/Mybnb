import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/homePage'
import Splash from './components/splashPage'
import LocationFeed from './components/locations'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    
      <Switch>
        
        <Route path='/' exact={true}>
          <NavBar />
          <Splash />          
        </Route>
        
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        
        <Route path='/locations' exact={true}>
          <LocationFeed />
        </Route>
        
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
