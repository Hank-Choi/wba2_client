import React from "react";
import {Image, List} from "semantic-ui-react";


const InstructorsSegment = ({data, history}) => {

  if (!data) {
    return null;
  }
  const instructors = data.map((instructor, index) =>
    <List.Item as='a' onClick={() => {
      history.push(`/user/${instructor.id}`)
    }}>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'/>
      <List.Content>
        <List.Header>{instructor.first_name} {instructor.last_name}</List.Header>
        <List.Content>{instructor.company ? `${instructor.company} ${instructor.year}` : `@${instructor.username}`}</List.Content>
      </List.Content>
    </List.Item>
  );

  return (
    <List horizontal>
      {instructors}
    </List>
  );
}

export default InstructorsSegment;
