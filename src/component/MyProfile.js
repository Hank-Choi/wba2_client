import React from "react";
import {useUserContext} from "../Context";
import './MyProfile.css'


const MyProfile = ({history}) => {
  const {currentUser} = useUserContext()

  if (currentUser) {

    return (
      <div className="profile-summary">
        <img
          className="profile-pic"
          onClick={() => history.push('/user/me')}
          src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
          alt='photo'
        />
        <a className="profileName" onClick={() => history.push('/user/me')}>
          <b>{currentUser.first_name} {currentUser.last_name}</b>
          <p>@{currentUser.username}</p>
        </a>
      </div>
    );
  } else {
    return null;
  }
}

export default MyProfile;