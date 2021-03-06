import React from "react";
import "components/DayListItem.scss"
import classnames from "classnames";

// Creates the individual items to go inside of the daylist

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item" , {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0

  });
//displays the correct spots data for the component
  const formatSpots = function(spots){
    if(spots === 0){
      return "no spots remaining"
    } 
    if(spots === 1){
      return "1 spot remaining"
    } else {
      return `${spots} spots remaining`
    }

  };

  return (
    <li className={dayClass} onClick={()=> props.setDay(props.name)}>
      <h2  className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}