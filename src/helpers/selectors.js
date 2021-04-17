
  export function getAppointmentsForDay(state, day) {
    let appointments = []
    for(const days of state.days){
      if (days.name === day){
        console.log(day)
        appointments = days.appointments.map(id=> state.appointments[id] )
      
      }
    }
    return appointments
};

export function getInterview(state, interview){
  if(interview === null){
    return null
  }

 for(const appointment in state.appointments){
   if(state.appointments[appointment].interview === interview){
     return {
       "student": interview.student,
       "interviewer": state.interviewers[interview.interviewer]
       }
   
   }
 }
 
};
  