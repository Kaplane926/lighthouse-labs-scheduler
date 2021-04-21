import React from "react"
import { useState, useCallback } from 'react'

export default function useApplicationData(){

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

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


}