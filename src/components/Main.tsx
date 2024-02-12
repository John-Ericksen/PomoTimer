import Settings from "./Settings";
import Timer from "./Timer";
import {useState } from "react";

export default function Main() {
  const [timerValues, setTimerValues] = useState([1500 * 1000, 300 * 1000, 900 * 1000]);
  
  

  return (
    <>
      <Timer timerValues={timerValues} setTimerValues={setTimerValues}/>
      <Settings setTimerValues={setTimerValues} timerValues={timerValues}/>
    </>
  );
}
