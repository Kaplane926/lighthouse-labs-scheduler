import React from "react";
import DayListItem from "./DayListItem";


//creates the list of days for the main page
export default function DayList(props) {
  
  const daysArray = props.days
  
  return (
    <ul>
  {daysArray.map((days)=>{
    return <DayListItem 
    key={days.id}
    name={days.name} 
    spots={days.spots} 
    selected={days.name === props.day}
    setDay={props.setDay}  
    />
  })};
</ul>
  );
}




  
  