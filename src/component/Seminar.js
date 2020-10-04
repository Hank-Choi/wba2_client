import React from "react";
import {List} from "semantic-ui-react";
import {InstructorsSegment} from "./InstructorsSegment";
import './Seminar.css'


export const Seminar = (props) => (
  <List.Item>
    <div className='seminar-list-flexbox'>
      <List.Content>
        <List.Header as='a'>{props.data.name}</List.Header>
        <List.Content>참여자: {props.data.participant_count}</List.Content>
      </List.Content>
      <InstructorsSegment className='instructor_segment' data={props.data.instructors}/>
    </div>
  </List.Item>
);