import {Image, List} from "semantic-ui-react";
import React from "react";

const ParticipantUnit = ({participant, history}) => (
  <List.Item as='a' onClick={() => {
    history.push(`/user/${participant.id}`)
  }}>
    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'/>
    <List.Content>
      <List.Header>{participant.first_name} {participant.last_name}</List.Header>
      <List.Content>{participant.username}</List.Content>
      {participant.dropped_at ?
        <List.Content>{participant.dropped_at} 드랍</List.Content> : null}
    </List.Content>
  </List.Item>
)
export default ParticipantUnit;
