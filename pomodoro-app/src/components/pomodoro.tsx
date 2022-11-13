import { useState, useRef } from "react";
import pomodoroHandler from "../service/pomodoroHandler";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleProgress from "./circleProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

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

  const parseCurrentTime = (timeValue: string) => {
    const getTimeInNumber = parseInt(timeValue);
    const getSeconds = getTimeInNumber % 60;
    const getMinutes = Math.floor(getTimeInNumber / 60);
    const modifiedSeconds = getSeconds < 10 ? "0" + getSeconds : getSeconds;
    const modifiedMinutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;
    const modifiedTime = modifiedMinutes + ":" + modifiedSeconds;
    return modifiedTime;
  };

  const getCurrentTime = (currentStatus: number): string => {
    if (currentStatus === 0) {
      return parseCurrentTime(settings.workTime);
    } else if (currentStatus === 1) {
      return parseCurrentTime(settings.breakTime);
    } else {
      return parseCurrentTime(settings.longBreakTime);
    }
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
          onClick={startPomodoroApp}
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
    pomodoroHandler.startTimer(intervalref, setSettings);
  };
  const pausePomodoroApp = () => {
    setPomodoroStatus(2);
    pomodoroHandler.stopTimer(intervalref);
  };
  const resetTimes = () => {
    setPomodoroStatus(0);
    pomodoroHandler.resetTimes(setSettings, intervalref);
  };
  const fullReset = async () => {
    setPomodoroStatus(0);
    pomodoroHandler.fullReset(setSettings, intervalref);
  };
  const openSettings = () => {
    pausePomodoroApp();
    fullReset();
    setSettingStatus(true);
  };
  return (
    <Container>
      <Box textAlign={"center"} mt={5}>
        <CircleProgress settings={settings} />
      </Box>
      <Box textAlign={"center"} my={3}>
        <Typography variant="h2" color="text.secondary">
          {getCurrentTime(settings.status)}
        </Typography>
        <Rating
          name="read-only"
          value={settings.selectedRounds - settings.rounds}
          max={settings.selectedRounds}
          readOnly
        />
        <Grid textAlign={"center"} container sx={{ color: "text.primary" }}>
          <Grid textAlign={"right"} item xs={4}>
            <SelfImprovementIcon sx={{ color: "white", marginRight: "4px" }} />
          </Grid>
          <Grid item xs={1}>
            <Typography fontWeight={600}>
              {(parseInt(settings.selectedBreakTime) / 60).toString() + ":00"}
            </Typography>
          </Grid>
          <Grid textAlign={"right"} item xs={2}>
            <WeekendIcon
              sx={{ fontSize: "1.5rem", color: "white", marginRight: "4px" }}
            />
          </Grid>
          <Grid textAlign={"left"} item xs={4}>
            <Typography fontWeight={600}>
              {(parseInt(settings.selectedLongBreakTime) / 60).toString() + ":00"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign={"center"}>
        {getHandlerButton(pomodoroStatus)}
        <Button
          variant="contained"
          color="warning"
          onClick={resetTimes}
          sx={{ width: "40%", margin: "0.3rem", fontWeight: 600 }}
        >
          Reset Time
        </Button>
      </Box>
      <Box textAlign={"center"}>
        <Button
          variant="contained"
          color="error"
          onClick={fullReset}
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
