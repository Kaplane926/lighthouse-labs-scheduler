
//returns an array of appointments for a given day

export function getAppointmentsForDay(state, day) {
  let appointments = []
  for(const days of state.days){
    if (days.name === day){
      appointments = days.appointments.map(id=> state.appointments[id] )
      
    };
  };
  return appointments
};

// returns null if there is no interview in that slot, if there is an interview it returns an interview object

export function getInterview(state, interview){
  if(interview === null){
    return null
  };

 for(const appointment in state.appointments){
   if(state.appointments[appointment].interview === interview){
     return {
       "student": interview.student,
       "interviewer": state.interviewers[interview.interviewer]
       };
   
   };
 };
 
};
  
// Returns an array of available interviewers for a given day

export function getInterviewersForDay(state, day) {
  let interviewers = []
  for(const days of state.days){
    if (days.name === day){
      interviewers = days.interviewers.map(id=> state.interviewers[id] )
    
    }
  };
  return interviewers
};