import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddTask from './components/Task/AddTask';
import {Provider} from "react-redux";
import store from "./store";
import UpdateTask from './components/Task/UpdateTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path = "/" component={Board} />
          <Route exact path = "/addtask" component={AddTask} />
          <Route exact path = "/updatetask/:task_id" component={UpdateTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
