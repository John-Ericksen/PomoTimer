import Settings from "./Settings";
import Timer from "./Timer";
import {useState } from "react";

export default function Main() {
  const [timerValues, setTimerValues] = useState([1500 * 1000, 300 * 1000, 900 * 1000]);
  const [defaultworkCycles, setDefaultWorkCycles] = useState(3); //the amount of work -> short break cycles before a long break is given
  

  return (
    <>
      <Timer timerValues={timerValues} setTimerValues={setTimerValues} defaultWorkCycles={defaultworkCycles}/>
      <Settings setTimerValues={setTimerValues} timerValues={timerValues} defaultWorkCycles={defaultworkCycles} setDefaultWorkCycles={setDefaultWorkCycles}/>
    </>
  );
}
