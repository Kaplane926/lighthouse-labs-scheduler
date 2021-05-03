import React from "react"
import { useState, useCallback, useEffect } from 'react'
import axios from "axios";

//all the logic for the applications component is stored in this hook

export default function useApplicationData(){
//sets and stores the state needed for the app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //pulls days, appointments and interviewers from out database and stores them in state
  useEffect(()=>{


    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

// takes in a day object and its appointments and returns remaining spots
  function getSpotsForDay(dayObj, appointments){
    let spots = 0
    for(const id of dayObj.appointments){
      const appointment = appointments[id];
      if (!appointment.interview){
        spots ++;
      }
    }
    return spots
  };

  //takes in a day, the days array and an array and returns a new array for days with the updated spots

  function updateSpots(dayName, days, appointments){
    const dayObj = days.find(day => day.name === dayName);
    
    const spots = getSpotsForDay(dayObj, appointments);

    const newDay = { ...dayObj, spots };

    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays
  };
//takes an id and an interview array and adds the new interview into the state.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.day, state.days, appointments)
  
      return axios.put(`/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log("response: ", response)
        setState({
          ...state,
          days,
          appointments,
        })        
      })
      
  }
//takes an interview id and removes the interview from state and from the database
  function cancelInterview(id){

    const appointment = {
      ...state.appointments[id],
      interview:  null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateSpots(state.day, state.days, appointments)

   return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview: null })
    .then((response)=>{
      console.log(response)
      setState({
        ...state,
        days,
        appointments
      })
      
    })
    
      
    


    
      
    }
  
  
  

  const setDay = day => setState({ ...state, day });




 return { state, setDay, cancelInterview, bookInterview }

}