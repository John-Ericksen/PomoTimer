import Timer from "../Timer/Timer";
import { useState } from "react";
import "./Content.scss";

export default function Content() {
  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const [timerValues, setTimerValues] = useState([
    parseFloat(getCookie("workTimer")) || 1500 * 1000,
    parseFloat(getCookie("shortBreak")) || 300 * 1000,
    parseFloat(getCookie("LongBreak")) || 900 * 1000,
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
