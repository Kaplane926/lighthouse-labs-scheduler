import React from "react"
import { useState, useCallback } from 'react'

//hook for changing the "mode" of various react components, IE switching from a blank interview to the interview form.
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //call the tranition function to switch to a new mode. if replce = true, the history will be replaced instead of added to.
  const transition = function(newMode, replace = false){
    setMode(newMode)
    if(replace === true){
      setHistory( prev => [...prev].slice(0, -1))
    }
    setHistory( prev => [...prev, newMode])
  }
//goes back to the previous state in your history
  const back =function(){
    const length = history.length -2
    if(mode !== initial){
      setMode(history[length])
      setHistory( prev => [...prev].slice(0, -1))
    }
  }
  return { mode, transition, back };
}

