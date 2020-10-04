import React from "react";
import {Button, List} from "semantic-ui-react";
import InstructorsSegment from "./InstructorsSegment";
import './Seminar.css'


const Seminar = (props) => (
  <List.Item>
    <div className='seminar-list-flexbox'>
      <List.Content>
        <List.Header>{props.data.name}</List.Header>
        <List.Content>참여자: {props.data.participant_count}</List.Content>
      </List.Content>
      <InstructorsSegment className='instructor_segment' data={props.data.instructors} history={props.history}/>
      <Button onClick={() => props.history.push(`/seminar/${props.data.id}`)}
              className='seminar-detail-button'>보기</Button>
    </div>
  </List.Item>
);

export default Seminar;
