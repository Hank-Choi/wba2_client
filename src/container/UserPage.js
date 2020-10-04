import React, {useEffect, useState} from 'react';
import {Button, Header, Item, List,} from 'semantic-ui-react';
import * as api from '../api'
import {useUserContext} from "../Context";

const UserPage = ({history, match}) => {
  const [user, setUser] = useState(undefined)

  const {currentUser, setCurrentUser} = useUserContext()

  const _fetchUser = () => {
    api.getUserProfile(match.params.user_id).then((res) => {
      setUser(res.data)
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  const handlePostParticipant = () => {
    api.createParticipantProfile().then((res) => {
      setCurrentUser(res.data);
      setUser(res.data)
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  useEffect(() => {
    if (match.params.user_id === "me") {
      setUser(currentUser);
    } else {
      _fetchUser()
    }
  }, [currentUser, match])

  return (
    <div>
      {!user ? null :
        <div style={{
          "padding-top": '50px'
        }}>
          {user.id === currentUser.id ?
            <Button onClick={() => history.push('/user/me/update')}>정보 변경</Button>
            : null}
          <Header dividing>
            <h2>
              username: {user.username}
            </h2>
            <h3>
              <br/>
              email: {user.email}
              <br/>
              first_name: {user.first_name}
              <br/>
              last_name: {user.last_name}
              <br/>
              role: {user.participant ? "participant " : ""}{user.instructor ? "instructor" : ""}
              <br/>
            </h3>
          </Header>
          <Header dividing>
            {user.instructor ?
              <div>
                <h3>
                  company: {user.instructor.company}
                  <br/>
                  year: {user.instructor.year ? user.instructor.year : "정보 없음"}
                  <br/>
                  담당 세미나:
                </h3>
                {user.instructor.charge ?
                  <Item as='a' onClick={() => {
                    history.push(`/seminar/${user.instructor.charge.id}`)
                  }}>
                    {user.instructor.charge.name}
                  </Item>
                  : <h3>"없음"</h3>
                }

              </div>
              : null
            }
          </Header>
          <Header dividing>
            {user.participant ?
              <div>
                <h3>
                  university: {user.participant.university}
                  <br/>
                  accepted: {user.participant.accepted ? 'accepted' : 'not accepted'}
                  <br/>
                  신청한 세미나:
                </h3>
                <List>
                  {user.participant.seminars ? user.participant.seminars.map((seminar) => (
                    <Item as='a' onClick={() => history.push(`/seminar/${seminar.id}`)}>
                      {seminar.name}
                      <br/>
                      {seminar.is_active ? "참여 중" : "드랍:" + seminar.dropped_at}
                    </Item>
                  )) : "없음"}
                </List>
              </div>
              : <Button onClick={handlePostParticipant}>참여자로 등록</Button>
            }
          </Header>
        </div>
      }
    </div>
  );
}

export default UserPage;
