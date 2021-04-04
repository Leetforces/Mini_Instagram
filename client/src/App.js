import React from 'react';
import "./styles/App.css";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';

import TopNav from './components/TopNav'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopNav />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/createpost" component={CreatePost} />

        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
