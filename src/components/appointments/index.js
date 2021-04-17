import React from "react"
import "components/appointments/styles.scss"
import Header from "components/appointments/header"
import Show from "components/appointments/Show"
import Empty from "components/appointments/Empty"
import Form from "components/appointments/Form"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";

export default function Appointment(props){

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return <>
        <article className="appointment"></article> 
        <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          )}  
          {mode === CREATE && (
            <Form 
            interviewers={[]}
            onCancel={back}
            />
          )}
          
        </>  
    
}


