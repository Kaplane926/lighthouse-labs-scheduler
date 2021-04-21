import React from "react"
import { useState, useCallback, useEffect } from 'react'
import axios from "axios";

export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(()=>{


    
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(interview)


      return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log("response: ", response)
        setState({
          ...state,
          appointments
        })
      })
      
      
  }

  function cancelInterview(id){

    const appointment = {
      ...state.appointments[id],
      interview:  null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    

   return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview: null })
    .then((response)=>{
      console.log(response)
      setState({
        ...state,
        appointments
      })
    })
    
      
    


    
      
    }
  
  
  

  const setDay = day => setState({ ...state, day });

 return { state, setDay, cancelInterview, bookInterview }

}