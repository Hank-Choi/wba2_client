import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {withRouter, Switch, Route, Link} from 'react-router-dom';
import {Image, Button} from "semantic-ui-react";
import {Login} from "./container/Login";
import {Main} from "./container/Main";

import 'semantic-ui-css/semantic.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import storage from "./lib/storage";
import axios from "axios";
import {UserContextProvider, useUserContext} from "./Context";
import * as api from "./api";
import {MyProfile} from "./component/MyProfile";
import {Signup} from "./container/Signup";
import {SeminarDetailPage} from "./container/SeminarDetailPage";
import UserPage from "./container/UserPage";

function App({history}) {
  const {currentUser, setCurrentUser} = useUserContext()

  const handleLogout = () => {
    storage.remove('token');
    axios.defaults.headers.common['Authorization'] = '';
    setCurrentUser(undefined)
  }

  useEffect(() => {
    const path = history.location.pathname
    if(!currentUser && path !== "/signup" && path !== "/login"){
      api.getUserProfile('me')
        .then((res) => {
          setCurrentUser(res.data)
        })
        .catch(() => {
          history.push('/login')
        })
    }
  },[])

  return (
    <div className='App'>
      <div className='waffle-header'>
        <Image src="/logo.png" size="small" className="center"/>
        <MyProfile history={history}/>
      </div>
      <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/seminar/:seminar_id" exact component={SeminarDetailPage}/>
        <Route path="/signup" component={Signup} exact/>
        <Route path="/user/:user_id" component={UserPage} exact/>
      </Switch>
      <Link to='/login' onClick={handleLogout}>logout</Link>
    </div>
  );
}

export default withRouter(App);
