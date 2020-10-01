import React, { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function back() { 
    history.pop();
    const afterPop = history.pop();
    if(!afterPop) {
      setMode(initial);
      setHistory([initial]);
    } else {
      setMode(afterPop);
      setHistory([...history]);
    }
  };
  function transition(newMode, replace = false) {
    if(replace) {
      back();
    };
    setMode(newMode);
    setHistory([...history,newMode]);
  };

  return {
    mode,
    transition,
    back
  }
}