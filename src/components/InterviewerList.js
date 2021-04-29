import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';

//creates the component that contains a list of interviewers for a given day
 function InterviewerList(props){
  const interviewersArray = props.interviewers
  //checks to see if a given interviewer is selected so we can add stlye to it
  function isSelected(array){
    if(props.value === array.id){
      return true
    } else {
      return false
    }
  };
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

};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;