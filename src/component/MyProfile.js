import React, {useEffect} from "react";
import * as api from "../api";
import {useUserContext} from "../Context";
import {render} from "react-dom";
import './MyProfile.css'


export const MyProfile = (props) => {
  const {user} = useUserContext()

  useEffect(()=>{
    console.log(user);
  },[user])

  if (user) {

    return (
      <div className="profile-summary">
        <img
          className="profile-pic"
          onClick={() => props.history.push('/')}
          src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
          alt='photo'
        />
        <a className="profileName" onClick={props.menu}>
          <b >{user.last_name} {user.first_name}</b>
          <p >@{user.username}</p>
        </a>
      </div>
    );
  }
  else {
    return null;
  }
}