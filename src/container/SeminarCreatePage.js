import React, {useEffect, useState} from 'react';
import {Form,} from 'semantic-ui-react';
import * as api from '../api'
import {useUserContext} from "../Context";

const SeminarCreatePage = ({history, match}) => {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [capacity, setCapacity] = useState('')
  const [count, setCount] = useState('')

  const _fetchSeminar = () => {
    api.getSeminar(match.params.seminar_id).then((res) => {
      setName(res.data.name)
      setTime(res.data.time)
      setCapacity(res.data.capacity)
      setCount(res.data.count)
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  const handleUpdateButton = () => {
    const seminarInfo = {
      name: name,
      time: time,
      capacity: capacity,
      count: count
    }
    if (match.path === "/seminar/create") {
      api.createSeminar(seminarInfo).then((res) =>
        history.push(`/seminar/${res.data.id}`)
      ).catch(error => alert(JSON.stringify(error.response.data)))
    } else {
      api.updateSeminar(match.params.seminar_id, seminarInfo).then((res) => {
          history.push(`/seminar/${res.data.id}`)
        }
      ).catch(error => alert(JSON.stringify(error.response.data)))
    }
  }

  useEffect(() => {
    if (match.path !== "/seminar/create") {
      _fetchSeminar()
    }
  }, [match])

  return (
    <Form onSubmit={handleUpdateButton}>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Name' placeholder='Name' value={name}
                    onChange={(event) => setName(event.target.value)}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input fluid onChange={(event) => setTime(event.target.value)}
                    label='Time'
                    value={time}
                    placeholder='Time'/>
        <Form.Input fluid label='Capacity' placeholder='Capacity'
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}/>
        <Form.Input fluid label='Count' placeholder='Count'
                    value={count}
                    onChange={(event) => setCount(event.target.value)}/>
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

export default SeminarCreatePage;
