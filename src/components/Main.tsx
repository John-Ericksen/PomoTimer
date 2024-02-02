import Timer from "./Timer";
import ButtonRow from "./ButtonRow";
import { useEffect, useState } from "react";

export default function Main() {
  const [timerValues, setTimerValues] = useState([1500 * 1000, 300 * 1000, 900 * 1000]);
  
  

  return (
    <>
      <ButtonRow />
      <Timer timerValues={timerValues} />
    </>
  );
}
