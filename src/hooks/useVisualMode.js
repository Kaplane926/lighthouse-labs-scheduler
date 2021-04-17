import React from "react"
import { useState, useCallback } from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    setMode(newMode)
    if(replace === true){
      history.pop()
    }
    history.push(newMode)
  }

  const back =function(){
    const length = history.length -2
    if(mode !== initial){
      setMode(history[length])
      history.pop()
    }
  }

  return { mode, transition, back };
}

