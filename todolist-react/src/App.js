import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddTask from './components/Task/AddTask';
import {Provider} from "react-redux";
import store from "./store";
import UpdateTask from './components/Task/UpdateTask';
import Landing from './components/Landing';
import Register from './components/UserManagment/Register';
import Login from './components/UserManagment/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./SecurityUtils/setJWTToken";
import { SET_CURRENT_USER } from './actions/types';
import {logout} from "./actions/securityActions";
import SecuredRoute from "./SecurityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;
if(jwtToken){
  setJWTToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
  });
  const curTime = Date.now()/1000;
  if(decoded.exp < curTime){
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path = "/" component={Landing} />
          <Route exact path = "/register" component={Register} />
          <Route exact path = "/login" component={Login} />

          <Switch>
            <SecuredRoute exact path = "/dashboard" component={Board} />
            <SecuredRoute exact path = "/addtask" component={AddTask} />
            <SecuredRoute exact path = "/updatetask/:task_id" component={UpdateTask} />
          </Switch>
          
        </div>
      </Router>
    </Provider>
  );
}

export default App;
