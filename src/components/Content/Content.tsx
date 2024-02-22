import Timer from "../Timer/Timer";
import { useState } from "react";
import "./Content.scss";

export default function Content() {
  const [timerValues, setTimerValues] = useState([
    1500 * 1000,
    300 * 1000,
    900 * 1000,
  ]);
  const [defaultworkCycles, setDefaultWorkCycles] = useState(3); //the amount of work -> short break cycles before a long break is given
  const [currentMode, setCurrentMode] = useState("work");


  return (
    <div className={currentMode === "work" ? "content-work" : "content-break"}>
      <Timer
        timerValues={timerValues}
        setTimerValues={setTimerValues}
        defaultWorkCycles={defaultworkCycles}
        setDefaultWorkCycles={setDefaultWorkCycles}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
    </div>
  );
}
