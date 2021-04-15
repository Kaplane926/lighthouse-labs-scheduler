import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props){
  const interviewersArray = props.interviewers
  function isSelected(array){
    if(props.value === array.id){
      return true
    } else {
      return false
    }
  }
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
  {interviewersArray.map((interviewers, index)=>{
    return <InterviewerListItem
              key={interviewers.id}
              name={interviewers.name}
              avatar={interviewers.avatar}
              selected={isSelected(interviewers)}
              setInterviewer={() => props.onChange(interviewers.id)}
          />

  })}
  </ul>
  
</section>

}