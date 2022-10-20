import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleProgress from "./circleProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AppSettings } from "../models/settings";

const Pomodoro = (props: {
  setSettingStatus: (value: Boolean) => void;
  settings: AppSettings;
}) => {
  const [pomodoroStatus, setPomodoroStatus] = useState(0);
  const getHandlerButton = (status: number) => {
    if (status === 0) {
      return (
        <Button
          onClick={startPomodoroApp}
          variant="contained"
          sx={{ width: "30%", margin: "0.3rem", fontWeight: 600 }}
        >
          Start
        </Button>
      );
    } else if (status === 1) {
      return (
        <Button
          onClick={pausePomodoroApp}
          variant="contained"
          color="error"
          sx={{ width: "30%", margin: "0.3rem", fontWeight: 600 }}
        >
          Pause
        </Button>
      );
    } else {
      return (
        <Button
          onClick={continuePomodoroApp}
          variant="contained"
          color="success"
          sx={{ width: "30%", margin: "0.3rem", fontWeight: 600 }}
        >
          Continue
        </Button>
      );
    }
  };
  const startPomodoroApp = () => {
    setPomodoroStatus(1);
  };
  const pausePomodoroApp = () => {
    setPomodoroStatus(2);
  };
  const continuePomodoroApp = () => {
    setPomodoroStatus(1);
  };
  const resetPomodoroApp = () => {
    setPomodoroStatus(0);
  };
  // const pomodoroStatusHandler = () => {
  //   setPomodoroStatus(!pomodoroStatus);
  // };
  const openSettings = () => {
    props.setSettingStatus(true);
  };
  return (
    <Container>
      <Box>
        {/* <div>
          <p>{props.settings.rounds}</p>
          <p>{props.settings.workTime}</p>
          <p>{props.settings.breakTime}</p>
          <p>{props.settings.longBreakTime}</p>
        </div> */}
      </Box>
      <Box textAlign={"center"} mt={5}>
        <CircleProgress />
      </Box>
      <Box textAlign={"center"} my={3}>
        <Typography variant="h2" color="text.secondary">
          {`25:00`}
        </Typography>
      </Box>
      <Box textAlign={"center"}>
        {getHandlerButton(pomodoroStatus)}
        <Button
          variant="contained"
          color="warning"
          onClick={resetPomodoroApp}
          sx={{ width: "30%", margin: "0.3rem", fontWeight: 600 }}
        >
          Reset
        </Button>
      </Box>
      <Box textAlign={"center"}>
        <Link
          component="button"
          variant="body2"
          onClick={openSettings}
          title={"Settings"}
          sx={{ fontSize: "3rem", color: "white", textDecoration: "none" }}
        >
          <SettingsIcon
            sx={{ fontSize: "1rem", color: "white", marginRight: "4px" }}
          />
          <Typography fontSize={20} display={"inline"} alignContent={"center"}>
            Settings
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default Pomodoro;
