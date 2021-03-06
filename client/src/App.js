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
import NewExercise from './components/Forms/ExerciseForm';
import ExerciseDetails from './components/User/ExerciseDetails';
import SimilarExerciseSearch from './components/Forms/SimilarExerciseSearch';
import {Switch, Route, } from 'react-router-dom';

const App = () => (
  <>
    <NavBar />
    <FetchUser>
      <div  style={{marginTop: "4rem"}}>
        <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/exercisedetails' component={ExerciseDetails} />
          <ProtectedRoute exact path='/exercise_search' component={SimilarExerciseSearch} />
          <AdminRoute exact path='/admin' component={AdminTools} />
          <AdminRoute exact path='/newworkout' component={NewWorkout} />
          <AdminRoute exact path='/newexercise' component={NewExercise} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </FetchUser>
  </>

)

export default App;
