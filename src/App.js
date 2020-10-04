import React, {useEffect} from 'react';
import './App.css';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {Image} from "semantic-ui-react";

import 'semantic-ui-css/semantic.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import storage from "./lib/storage";
import axios from "axios";
import {useUserContext} from "./Context";
import * as api from "./api";
import Login from "./container/Login";
import Main from "./container/Main";
import MyProfile from "./component/MyProfile";
import Signup from "./container/Signup";
import SeminarDetailPage from "./container/SeminarDetailPage";
import UserPage from "./container/UserPage";
import SeminarCreatePage from "./container/SeminarCreatePage";

function App({history}) {
  const {currentUser, setCurrentUser} = useUserContext()

  const handleLogout = () => {
    storage.remove('token');
    axios.defaults.headers.common['Authorization'] = '';
    setCurrentUser(undefined)
  }

  useEffect(() => {
    const path = history.location.pathname
    if (!currentUser && path !== "/signup" && path !== "/login") {
      api.getUserProfile('me')
        .then((res) => {
          setCurrentUser(res.data)
        })
        .catch(() => {
          history.push('/login')
        })
    }
  }, [])

  return (
    <div className='App'>
      <div className='waffle-header'>
        <Image onClick={() => {
          history.push('/')
        }} src="/logo.png" size="small" className="center"/>
        <MyProfile history={history}/>
      </div>
      <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/seminar/create" exact component={SeminarCreatePage}/>
        <Route path="/seminar/:seminar_id" exact component={SeminarDetailPage}/>
        <Route path="/seminar/:seminar_id/update" exact component={SeminarCreatePage}/>
        <Route path="/signup" component={Signup} exact/>
        <Route path="/user/:user_id" component={UserPage} exact/>
        <Route path="/user/me/update" component={Signup} exact/>
      </Switch>
      <Link to='/login' onClick={handleLogout}>logout</Link>
    </div>
  );
}

export default withRouter(App);
