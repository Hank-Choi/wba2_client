import React, {useState} from 'react';
import {Button, Divider, Form, Grid, Popup, Radio, Segment,} from 'semantic-ui-react';
import * as api from '../api'

export const Login = ({history}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [autoLogin, setAutoLogin] = useState(false)

  return (
    <div className="login_page">
      <Segment placeholder>
        <h1>
          와플 백엔드 과제 2 테스트 웹 페이지
        </h1>
        <Form className="login_form" onSubmit={() => {
          api.login({username: username, password: password}, autoLogin).then(
            () => {
              history.push('/')
            }
          ).catch(() => alert("서버가 꺼져있거나 아이디 비밀번호가 틀렸습니다."))
        }}>
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Username"
            id="username-input"
            placeholder="Enter username"
            value={username}
            onChange={event =>
              setUsername(event.target.value)
            }
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            id="pw-input"
            placeholder="Enter password"
            value={password}
            onChange={event =>
              setPassword(event.target.value)
            }
            required
          />

          <Form.Input>
            <Popup
              trigger={<Radio
                toggle
                label="Sign-in automatically"
                onChange={() => {
                  setAutoLogin(!autoLogin)
                }}
              />}
              content="자동 로그인 기능을 사용함으로, 사용자의 로그인 정보를 사용자의 컴퓨터에 저장합니다. 공공장소에서는 자동 로그인 기능을 사용하지 마십시오."
              position="top center"
            />
          </Form.Input>

          <Button
            id="login-button"
            type="submit"
            content="Login"
            primary
          />
        </Form>
        <Button
          content="Sign up"
          icon="signup"
          id="signup-button"
          onClick={() => {
            history.push('/signup')
          }}
        />
      </Segment>
    </div>);
}
