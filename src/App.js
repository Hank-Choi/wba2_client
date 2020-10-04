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

function App({history}) {
  const handleLogout = () => {
    storage.remove('token');
    axios.defaults.headers.common['Authorization'] = '';
  }

  const {setUser} = useUserContext()

  useEffect(() => {
    api.getMyProfile()
      .then((res) => {
        setUser(res.data)
        history.push('/')
      })
      .catch(() => {
        history.push('/login')
      })
  },[])

  return (
    <div className='App'>
      <div className='waffle-header'>
        <Image src="/logo.png" size="small" className="center"/>
        <MyProfile/>
      </div>
      <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/seminar/:seminar_id" exact component={Login}/>
        <Route path="/signup" component={Signup} exact/>
      </Switch>
      <Link to='/login' onClick={handleLogout}>logout</Link>
    </div>
  );
}

export default withRouter(App);
