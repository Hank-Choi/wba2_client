import React, {useState} from 'react';
import {Button, Checkbox, List} from 'semantic-ui-react';
import * as api from '../api'
import {FormControl} from "react-bootstrap";
import './Main.css'
import Seminar from "../component/Seminar";

const Main = ({history}) => {
  const [loading, setLoading] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [earliestOrder, setEarliestOrder] = useState(false)
  const [seminars, setSeminars] = useState([])

  const _fetchSeminars = () => {
    let order = '';
    setLoading(true)
    if (earliestOrder) {
      order = 'earliest'
    }
    api.getSeminars(searchWord, order).then((res) => {
      setSeminars(res.data);
      setLoading(false);
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  const list = seminars.map((seminar, index) => <Seminar data={seminar} history={history}/>)

  return (
    <>
      <div className='search'>
        <FormControl
          className='search_bar'
          type="text"
          value={searchWord}
          placeholder='Search...'
          onChange={({target: {value}}) =>
            setSearchWord(value)
          }
          as='input'
          onKeyPress={event => {
            if (event.key === 'Enter') {
              _fetchSeminars()
            }
          }}
        />
      </div>
      <Checkbox
        className='order'
        label='earliest'
        onChange={() => {
          setEarliestOrder(!earliestOrder)
          setSeminars(seminars.reverse())
        }}
        checked={earliestOrder}
      />
      <List divided relaxed>
        {list}
      </List>
      <div>
        <Button onClick={() => {
          history.push('/seminar/create')
        }}> 새로운 세미나 열기 </Button>
      </div>
    </>
  );
}
export default Main;
