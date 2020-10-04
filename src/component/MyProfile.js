import React, {useEffect} from "react";
import * as api from "../api";
import {useUserContext} from "../Context";
import {render} from "react-dom";
import './MyProfile.css'


export const MyProfile = ({history}) => {
  const {user} = useUserContext()

  if (user) {

    return (
      <div className="profile-summary">
        <img
          className="profile-pic"
          onClick={() => history.push('/user/me')}
          src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
          alt='photo'
        />
        <a className="profileName" onClick={() => history.push('/user/me')}>
          <b >{user.first_name} {user.last_name}</b>
          <p >@{user.username}</p>
        </a>
      </div>
    );
  }
  else {
    return null;
  }
}