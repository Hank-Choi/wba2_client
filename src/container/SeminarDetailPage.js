import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Grid, List, Popup, Radio, Segment,} from 'semantic-ui-react';
import * as api from '../api'
import {useUserContext} from "../Context";
import storage from "../lib/storage";
import axios from "axios";
import {InstructorsSegment} from "../component/InstructorsSegment";
import ParticipantUnit from "../component/ParticipantUnit";

export const SeminarDetailPage = ({history, match}) => {
  const [seminar, setSeminar] = useState(undefined)

  const {user, setUser} = useUserContext()

  const _fetchSeminar = () => {
    api.getSeminar(match.params.seminar_id).then((res) => {
      setSeminar(res.data)
    }).catch(error => alert(JSON.stringify(error.response.data)))
  }

  useEffect(() => {
    _fetchSeminar()
  }, [])

  return (
    <div>
      {!seminar ? null :
        <div>
          <h1>
            세미나: {seminar.name}
          </h1>
          <h4>
            정원: {seminar.capacity}
            <br/>
            횟수: {seminar.count}
            <br/>
            시작시간: {seminar.time}
          </h4>
          <div>
            <Button onClick={() => {
              api.participateInSeminar(seminar.id,'instructor').then((res) => {
                setSeminar(res.data)
              }).catch(error => alert(JSON.stringify(error.response.data)))
            }}>진행</Button>
            <Button onClick={() => {
              api.participateInSeminar(seminar.id,'participant').then((res) => {
                setSeminar(res.data)
              }).catch(error => alert(JSON.stringify(error.response.data)))
            }}>참여</Button>
          </div>
          <h3>진행자:</h3>
          <InstructorsSegment data={seminar.instructors}/>
          <h3>참여자:</h3>
          <List>
            {seminar.participants ? seminar.participants.map((participant) =>
              <ParticipantUnit participant={participant}/>
            ):null}
          </List>
        </div>
      }
    </div>
  );
}
