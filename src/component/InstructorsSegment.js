import React from "react";
import {List, Image} from "semantic-ui-react";


export const InstructorsSegment = (props) => {

  if(!props.data){
    return null;
  }
  const instructors = props.data.map((instructor,index) =>
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'/>
      <List.Content>
        <List.Header>{instructor.username}</List.Header>
      </List.Content>
    </List.Item>
  );

  return (
    <List horizontal>
      {instructors}
    </List>
  );
}