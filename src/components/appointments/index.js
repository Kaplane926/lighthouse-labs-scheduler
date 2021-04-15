import React from "react"
import "components/appointments/styles.scss"
import Header from "components/appointments/header"
import Show from "components/appointments/Show"
import Empty from "components/appointments/Empty"

export default function Appointment(props){

  return <>
        <article className="appointment"></article> 
        <Header time={props.time} />
        {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
        </>  
    
}