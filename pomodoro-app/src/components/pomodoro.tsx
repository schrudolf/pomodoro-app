import React, { useState, useRef } from "react";
import localforage from "localforage";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleProgress from "./circleProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WeekendIcon from "@mui/icons-material/Weekend";

import { AppSettings } from "../models/settings";

interface pomodoroProps {
  setSettingStatus: (value: Boolean) => void;
  settings: AppSettings;
  setSettings: (value: any) => void;
}

const Pomodoro = ({
  setSettingStatus,
  settings,
  setSettings,
}: pomodoroProps) => {
  const [pomodoroStatus, setPomodoroStatus] = useState(0);
  const intervalref = useRef<number | null>(null);
  const getRealTime = settings.workTime;
  const modifiedTime =
    getRealTime.slice(0, getRealTime.length - 2) +
    ":" +
    getRealTime.slice(getRealTime.length - 2);

  let clockHandler = () => {
    localforage.getItem(
      "workTime",
      (err: any, workTimeValue: string | null) => {
        if (typeof workTimeValue === "string") {
          let parseTime = parseInt(workTimeValue) - 1;
          localforage.setItem("workTime", parseTime.toString(), (err) => {
            if (err) throw err;
            localforage.getItem(
              "selectedWorkTime",
              (err: any, selectedWorkTime: string | null) => {
                if (typeof selectedWorkTime === "string") {
                  let getSelectedTime = parseInt(selectedWorkTime);
                  let getWorkTime = parseInt(workTimeValue);
                  let calculateCurrentPercent = Math.round(
                    100 - (getWorkTime / getSelectedTime) * 100
                  );
                  setSettings((prevState: any) => ({
                    ...prevState,
                    workTime: parseTime.toString(),
                    percent: calculateCurrentPercent,
                  }));
                }
              }
            );
          });
        }
      }
    );
  };

  const getHandlerButton = (status: number) => {
    if (status === 0) {
      return (
        <Button
          onClick={startPomodoroApp}
          variant="contained"
          sx={{ width: "40%", margin: "0.3rem", fontWeight: 600 }}
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
          sx={{ width: "40%", margin: "0.3rem", fontWeight: 600 }}
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
          sx={{ width: "40%", margin: "0.3rem", fontWeight: 600 }}
        >
          Continue
        </Button>
      );
    }
  };
  const startPomodoroApp = () => {
    setPomodoroStatus(1);
    if (intervalref.current !== null) return;
    intervalref.current = window.setInterval(clockHandler, 1000);
  };
  const pausePomodoroApp = () => {
    setPomodoroStatus(2);
    if (intervalref.current) {
      window.clearInterval(intervalref.current);
      intervalref.current = null;
    }
  };
  const continuePomodoroApp = () => {
    startPomodoroApp();
  };
  const resetPomodoroApp = () => {
    setPomodoroStatus(0);
    localforage.getItem("selectedWorkTime", (err, value) => {
      if (err) throw err;
      localforage.setItem("workTime", value, (err) => {
        if (err) throw err;
        setSettings((prevState: any) => ({
          ...prevState,
          workTime: value,
          percent: 0,
        }));
        if (intervalref.current) {
          window.clearInterval(intervalref.current);
          intervalref.current = null;
        }
      });
    });
    setPomodoroStatus(0);
  };
  const openSettings = () => {
    setSettings((prevState: any) => ({
      ...prevState,
      percent: 0,
    }));
    localforage.setItem("percent", 0, (err) => {
      if (err) throw err;
    });
    setSettingStatus(true);
  };
  return (
    <Container>
      <Box textAlign={"center"} mt={5}>
        <CircleProgress settings={settings} />
      </Box>
      <Box textAlign={"center"} my={3}>
        <Typography variant="h2" color="text.secondary">
          {modifiedTime}
        </Typography>
        <Grid textAlign={"center"} container sx={{ color: "text.primary" }}>
          <Grid textAlign={"right"} item xs={4}>
            <SelfImprovementIcon sx={{ color: "white", marginRight: "4px" }} />
          </Grid>
          <Grid item xs={1}>
            <Typography fontWeight={600}>
              {settings.breakTime + ":00"}
            </Typography>
          </Grid>
          <Grid textAlign={"right"} item xs={2}>
            <WeekendIcon
              sx={{ fontSize: "1.5rem", color: "white", marginRight: "4px" }}
            />
          </Grid>
          <Grid textAlign={"left"} item xs={4}>
            <Typography fontWeight={600}>
              {settings.longBreakTime + ":00"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign={"center"}>
        {getHandlerButton(pomodoroStatus)}
        <Button
          variant="contained"
          color="warning"
          onClick={resetPomodoroApp}
          sx={{ width: "40%", margin: "0.3rem", fontWeight: 600 }}
        >
          Reset Time
        </Button>
      </Box>
      <Box textAlign={"center"}>
        <Button
          variant="contained"
          color="error"
          onClick={resetPomodoroApp}
          sx={{ width: "83%", margin: "0.3rem", fontWeight: 600 }}
        >
          Full Reset
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
