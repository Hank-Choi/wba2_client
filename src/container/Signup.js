import React, {useEffect, useState} from 'react';
import {Form, Button, Select, Input} from 'semantic-ui-react';
import * as api from '../api'
import {Col} from "react-bootstrap";
import {useUserContext} from "../Context";

export const Signup = ({history}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [university, setUniversity] = useState('');
  const {user, setUser} = useUserContext()

  useEffect(() => {
    if (user) {
      alert('잘못된 접근입니다.')
      history.push('/')
    }
  }, [])

  const roleOptions = [
    {key: 'i', text: 'instructor', value: 'instructor'},
    {key: 'p', text: 'participant', value: 'participant'},
  ]


  const onClickSignUpButton = e => {
    const user = {
      email: email,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: role,
      company: company,
      university: university,
    };
    api.signup(user).then((res) => {
      history.push('/login')
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  return (
    <div className="signup_page">
      <Form onSubmit={onClickSignUpButton}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Email' placeholder='Email' value={email} type='email'
                      onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' placeholder='Username' value={username}
                      onChange={(event) => setUsername(event.target.value)}/>
          <Form.Input fluid label='Password' placeholder='Password' value={password} type='password'
                      onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid onChange={(event) => setFirstname(event.target.value)}
                      label='First name'
                      value={firstname}
                      placeholder='First name'/>
          <Form.Input fluid label='Last name' placeholder='Last name'
                      value={lastname}
                      onChange={(event) => setLastname(event.target.value)}/>
          <Form.Field
            control={Select}
            options={roleOptions}
            label={{children: 'Role'}}
            placeholder='Role'
            onChange={(event) => {
              setRole(event.target.textContent)
            }}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          {role === "instructor" ?
            <Form.Input fluid label='Company' placeholder='Company'
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}/> :
            <Form.Input fluid label='University' placeholder='University'
                        value={university}
                        onChange={(event) => setUniversity(event.target.value)}/>
          }
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

