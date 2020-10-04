import React, {useEffect, useState} from 'react';
import {Form, Select} from 'semantic-ui-react';
import * as api from '../api'
import {useUserContext} from "../Context";

const Signup = ({history, match}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [year, setYear] = useState('');
  const [university, setUniversity] = useState('');
  const {currentUser} = useUserContext()

  useEffect(() => {
    if (match.path === '/signup') {
      if (currentUser) {
        alert('잘못된 접근입니다.')
        history.push('/')
      }
    } else {
      setUsername(currentUser.username);
      setFirstname(currentUser.first_name);
      setLastname(currentUser.last_name);
      if (currentUser.instructor) {
        setCompany(currentUser.instructor.company);
        setYear(currentUser.instructor.year)
      }
      if (currentUser.participnat) {
        setUniversity(currentUser.participnat.university);
      }
    }
  }, [])

  const roleOptions = [
    {key: 'i', text: 'instructor', value: 'instructor'},
    {key: 'p', text: 'participant', value: 'participant'},
  ]


  const onClickSignUpButton = e => {
    if (match.path === '/signup') {
      const userInfo = {
        email: email,
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
        role: role,
        company: company,
        year: year,
        university: university,
      };
      api.signup(userInfo).then((res) => {
        history.push('/login')
      }).catch(error => alert(JSON.stringify(error.response.data)))
    } else {
      const userInfo = {
        username: username,
        first_name: firstname,
        last_name: lastname,
        company: company,
        year: year,
        university: university,
      };
      api.updateMyProfile(userInfo).then((res) => history.push(`/user/${res.data.id}`))
    }
  }

  return (
    <div className="signup_page">
      <Form onSubmit={onClickSignUpButton}>
        {match.path === '/signup' ?
          <Form.Group widths='equal'>
            <Form.Input fluid label='Email' placeholder='Email' value={email} type='email'
                        onChange={(event) => setEmail(event.target.value)}/>
          </Form.Group> : null}
        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' placeholder='Username' value={username}
                      onChange={(event) => setUsername(event.target.value)}/>
          {match.path === '/signup' ?
            <Form.Input fluid label='Password' placeholder='Password' value={password} type='password'
                        onChange={(event) => setPassword(event.target.value)}/>
            : null}
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid onChange={(event) => setFirstname(event.target.value)}
                      label='First name'
                      value={firstname}
                      placeholder='First name'/>
          <Form.Input fluid label='Last name' placeholder='Last name'
                      value={lastname}
                      onChange={(event) => setLastname(event.target.value)}/>
          {match.path === '/signup' ?
            <Form.Field
              control={Select}
              options={roleOptions}
              label={{children: 'Role'}}
              placeholder='Role'
              onChange={(event) => {
                setRole(event.target.textContent)
              }}
            /> : null}
        </Form.Group>
        {match.path === '/signup' ? (role === "instructor" ?
          <Form.Group widths='equal'>
            <Form.Input fluid label='Company' placeholder='Company'
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}/>
            <Form.Input fluid label='Year' placeholder='Year'
                        value={year}
                        onChange={(event) => setYear(event.target.value)}/>
          </Form.Group> :
          <Form.Group widths='equal'>
            <Form.Input fluid label='University' placeholder='University'
                        value={university}
                        onChange={(event) => setUniversity(event.target.value)}/>
          </Form.Group>)
          :
          <Form.Group widths='equal'>
            <Form.Input fluid label='Company' placeholder='Company'
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}/>
            <Form.Input fluid label='Year' placeholder='Year'
                        value={year}
                        onChange={(event) => setYear(event.target.value)}/>
            <Form.Input fluid label='University' placeholder='University'
                        value={university}
                        onChange={(event) => setUniversity(event.target.value)}/>
          </Form.Group>
        }
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default Signup;
