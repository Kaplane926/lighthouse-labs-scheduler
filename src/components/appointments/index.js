import React from "react";
import "components/appointments/styles.scss";
import Header from "components/appointments/header";
import Show from "components/appointments/Show";
import Empty from "components/appointments/Empty";
import Form from "components/appointments/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/appointments/Status"
import Confirm from "./Confirm";
import Error from "components/appointments/Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING ="SAVING";
const CONFIRM ="CONFIRM";
const DELETING ="DELETING"
const EDIT ="EDIT"
const ERROR_DELETE ="ERROR_DELETE"
const ERROR_SAVE ="ERROR_SAVE"

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(()=>{
        transition(SHOW)
      })
      .catch(()=>{
        transition(ERROR_SAVE, true)
      });
      
       

      

      
  };
  
  function onDelete(){
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    })
    .catch(()=>{
      transition(ERROR_DELETE, true)
    });
    //setTimeout( ()=>transition(EMPTY), 400)
  };
  function confirmation(){
    transition(CONFIRM)
  };
  function edit(){
    transition(EDIT)
  };
  function doubleBack(){
    back()
    back()
  };

  return <>
        <article className="appointment"></article> 
        <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={confirmation}
              onEdit={edit}
            />
          )}  
          {mode === CREATE && (
            <>
            <Form 
            key={props.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
            />
            </>
          )}
          {mode === SAVING && (
            <>
            <Status 
            message="Saving..."
            />
            </>
          )}
          {mode === DELETING && (
            <>
            <Status 
            message="Deleting..."
            />
            </>
          )}
          {mode === CONFIRM &&(
            <>
            <Confirm 
            onCancel={back}
            onConfirm={onDelete}
            message={"Are you sure you want to delete?"}

            />
            </>
          )}
          {mode === EDIT && (
            <>
            <Form 
            key={props.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
            name={props.name}
            interviewer={props.interviewer}
            />
            </>
          )}
          {mode === ERROR_SAVE && (
            <>
            <Error 
            message="Something went wrong while saving"
            onClose={doubleBack}
            />
            </>
          )}
          {mode === ERROR_DELETE && (
            <>
            <Error 
            message="Something went wrong while deleting"
            onClose={doubleBack}
            />
            </>
          )}
        </>  
    
}


