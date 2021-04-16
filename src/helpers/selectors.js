
 export function getAppointmentsForDay(state, day) {
  let appointments = []
  for(const days of state.days){
    if (days.name === day){
      console.log(day)
      appointments = days.appointments.map(id=> state.appointments[id] )
      
    }
  }
  return appointments
}

