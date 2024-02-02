import Timer from "./Timer";
import { useEffect, useState } from "react";

export default function Main() {
  const [timerValues, setTimerValues] = useState([1500 * 1000, 300 * 1000, 900 * 1000]);
  
  

  return (
    <>
      <Timer timerValues={timerValues} />
    </>
  );
}
