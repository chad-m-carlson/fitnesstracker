import React from 'react';
import Home from './components/User/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import FetchUser from './components/FetchUser';
import AdminTools from './components/Admin/AdminTools';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NewWorkout from './components/Admin/NewWorkout';
import Profile from './components/User/Profile';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

const App = () => (
  <>
    <NavBar />
    <FetchUser>
      <div  style={{marginTop: "4rem"}}>
        <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <AdminRoute exact path='/admin' component={AdminTools} />
          <AdminRoute exact path='/newworkout' component={NewWorkout} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </FetchUser>
  </>

)

export default App;
