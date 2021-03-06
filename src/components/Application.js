
import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/appointments/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode"
import useApplicationData from "hooks/useApplicationData"
import Header from "components/appointments/header"


export default function Application(props) {
  //holds the state
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    
  } = useApplicationData();
  //sets appointments for the day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //sets interviewers for the day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment)=>{
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              name={interview ? interview.student : null}
              interviewer={interview ? interview.interviewer.id : null}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />)
        })}
        <Header key="last" time="5pm" />
      </section>
    </main>
  );
}
