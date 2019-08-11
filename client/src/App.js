import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import AdminTools from './components/Admin/AdminTools';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NewWorkout from './components/Admin/NewWorkout';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

const App = () => (
  <>
    <NavBar />
    <FetchUser>
      <Container>
        <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <AdminRoute exact path='/admin' component={AdminTools} />
          <AdminRoute exact path='/newworkout' component={NewWorkout} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>

)

export default App;
