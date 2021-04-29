import React, { useState } from "react"
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

//component to create the form for creating/editing interviews
export default function Form(props){
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");
  //resets the form
  function reset(){
    setName("")
    setInterviewer(null)
  }
  //cancels a create/edit form request
  function cancel(){
    reset()
    props.onCancel()
  }
  //checks to make sure the form is a valid submission
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("You must select an interviewer")
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }
  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form 
    autoComplete="off"
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
       data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button  onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>
}