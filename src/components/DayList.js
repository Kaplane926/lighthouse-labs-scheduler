import React from "react";
import DayListItem from "./DayListItem";

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




  
  