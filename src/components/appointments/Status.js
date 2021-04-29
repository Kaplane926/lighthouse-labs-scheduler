import React from "react"

//component for displaying a loading screen while async axios requests are happening
export default function Status(props){
  return <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">{props.message}</h1>
</main>
}