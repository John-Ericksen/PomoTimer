import { useEffect, useState } from "react";
import "./Settings.scss";
import { Box, Button, Stack, Typography } from "@mui/joy";

export default function Settings(props: any) {
  const [showForm, setShowForm] = useState(false);
  function changeShowForm() {
    setShowForm((prevShowForm) => !prevShowForm);
  }

  const [workMinutes, setWorkMinutes] = useState(
    `${Math.floor((props.timerValues[0] / 1000 / 60) % 60)}`
  );

  const [shortBreakMinutes, setShortBreakMinutes] = useState(
    `${Math.floor((props.timerValues[1] / 1000 / 60) % 60)}`
  );

  const [longBreakMinutes, setLongBreakMinutes] = useState(
    `${Math.floor((props.timerValues[2] / 1000 / 60) % 60)}`
  );

  const updateTimerValues = () => {
    var workMinutesInput: HTMLInputElement;
    var shortBreakMinutesInput: HTMLInputElement;
    var longBreakMinutesInput: HTMLInputElement;
    var workCycles: HTMLInputElement;

    if (document.getElementById("work-minutes-input") as HTMLInputElement) {
      workMinutesInput = document.getElementById(
        "work-minutes-input"
      ) as HTMLInputElement;
      setWorkMinutes(workMinutesInput.value);
    }

    if (
      document.getElementById("short-break-minutes-input") as HTMLInputElement
    ) {
      shortBreakMinutesInput = document.getElementById(
        "short-break-minutes-input"
      ) as HTMLInputElement;
      setShortBreakMinutes(shortBreakMinutesInput.value);
    }

    if (
      document.getElementById("long-break-minutes-input") as HTMLInputElement
    ) {
      longBreakMinutesInput = document.getElementById(
        "long-break-minutes-input"
      ) as HTMLInputElement;
      setLongBreakMinutes(longBreakMinutesInput.value);
    }

    if (document.getElementById("break-count-input") as HTMLInputElement) {
      workCycles = document.getElementById(
        "break-count-input"
      ) as HTMLInputElement;
      props.setDefaultWorkCycles(workCycles.value);
    }
  };

  useEffect(() => {
    updateTimerValues();
    props.setTimerValues([
      (parseFloat(workMinutes) || 0) * 1000 * 60,
      (parseFloat(shortBreakMinutes) || 0) * 1000 * 60,
      (parseFloat(longBreakMinutes) || 0) * 1000 * 60,
    ]); //needs a conversion to ms
    document.cookie = "workTimer=" + (parseFloat(workMinutes) || 0) * 1000 * 60;
    document.cookie =
      "shortBreak=" + (parseFloat(shortBreakMinutes) || 0) * 1000 * 60;
    document.cookie =
      "longBreak=" + (parseFloat(longBreakMinutes) || 0) * 1000 * 60;
  }, [workMinutes, shortBreakMinutes, longBreakMinutes]);

  return (
    <>
      <Button className="settings-button" onClick={changeShowForm} sx={{backgroundColor: "transparent",
    backgroundSize: "90px 90px",
    backgroundPosition: "center 1px"}} />
      {showForm && (
        <Stack className="settings-form" >
          <a href="https://todoist.com/productivity-methods/pomodoro-technique">
            Learn the Pomodoro Technique!
          </a>
          <Box className="timers">
            <Box className="input-box">
              <label htmlFor="work-minutes-input">Work Timer</label>
              <input
                type="number"
                onChange={updateTimerValues}
                value={workMinutes}
                id="work-minutes-input"
              ></input>
            </Box>

            <Box className="input-box">
              <label htmlFor="short-break-minutes-input">Short Break</label>
              <input
                type="number"
                onChange={updateTimerValues}
                value={shortBreakMinutes}
                id="short-break-minutes-input"
              ></input>
            </Box>
            <Box className="input-box">
              <label htmlFor="long-break-minutes-input">Long Break</label>
              <input
                type="number"
                onChange={updateTimerValues}
                value={longBreakMinutes}
                id="long-break-minutes-input"
              ></input>
            </Box>
            <Box className="input-box">
              <label htmlFor="break-count-input">Work Cycles</label>
              <input
                type="number"
                onChange={updateTimerValues}
                value={props.defaultWorkCycles}
                id="break-count-input"
              ></input>
            </Box>
          </Box>
          <Typography>
            If notifications are not showing up on your device, make sure you
            enable browser notifications in your operating system settings!
          </Typography>
        </Stack>
      )}
    </>
  );
}
