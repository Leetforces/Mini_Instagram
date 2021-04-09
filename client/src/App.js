import React, { useEffect, createContext, useReducer, useContext } from 'react';
import "./styles/App.css";

import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Profile from './components/screens/Profile';
import UserProfile from './components/screens/UserProfile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';
import FollowingUser from './components/screens/FollowingUser';
import NewPasswordSetup from './components/screens/NewPasswordSetup';

import TopNav from './components/TopNav'

import { userReducer, initialState } from './reducers/userReducer';

import Reset from './components/screens/Reset';
//create Context
const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN_USER",
        payload: user,
      })
      console.log(user);
    } else {
      if(!(history.location.pathname.startsWith('/reset') )){
        history.push("/login");
      }
    }
    console.log("SSSSSSState====>", state);
  }, [])
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:userId" component={UserProfile} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/allFollowingPost" component={FollowingUser} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/reset/:token" component={NewPasswordSetup} />
      </Switch>
    </>
  )
}


const App = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <TopNav />
          <ToastContainer position="top-center" />
          <Routing />
        </BrowserRouter>
      </userContext.Provider>

    </>
  )
}

export default App;
export { userContext };
