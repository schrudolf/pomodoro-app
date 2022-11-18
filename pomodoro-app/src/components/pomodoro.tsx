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
import StarIcon from "@mui/icons-material/Star";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WeekendIcon from "@mui/icons-material/Weekend";

import { AppSettings } from "../models/settings";
import Footer from "./footer";

interface pomodoroProps {
  setSettingStatus: React.Dispatch<React.SetStateAction<Boolean>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const Pomodoro = ({
  setSettingStatus,
  settings,
  setSettings,
}: pomodoroProps) => {
  const [pomodoroStatus, setPomodoroStatus] = useState(0);
  const intervalref = useRef<number | null>(null);

  const parseCurrentTime = (timeValue: string): string => {
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
    if (status === 0 && settings.status < 3) {
      return (
        <Button
          onClick={startPomodoroApp}
          variant="contained"
          className="startButton"
        >
          Start
        </Button>
      );
    } else if (status === 1 && settings.status < 3) {
      return (
        <Button
          onClick={pausePomodoroApp}
          variant="contained"
          color="error"
          className="pauseButton"
        >
          Pause
        </Button>
      );
    } else if (status === 2 && settings.status < 3) {
      return (
        <Button
          onClick={startPomodoroApp}
          variant="contained"
          color="success"
          className="continueButton"
        >
          Continue
        </Button>
      );
    } else {
      return;
    }
  };
  const startPomodoroApp = (): void => {
    setPomodoroStatus(1);
    pomodoroHandler.startTimer(intervalref, setSettings);
  };
  const pausePomodoroApp = (): void => {
    setPomodoroStatus(2);
    pomodoroHandler.stopTimer(intervalref);
  };
  const resetTimes = (): void => {
    setPomodoroStatus(0);
    pomodoroHandler.resetTimes(setSettings, intervalref);
  };
  const fullReset = (): void => {
    setPomodoroStatus(0);
    pomodoroHandler.fullReset(setSettings, intervalref);
  };
  const openSettings = (): void => {
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
        <Typography fontWeight={"bold"} variant="h2" className="currentTime">
          {getCurrentTime(settings.status)}
        </Typography>
        <Rating
          name="read-only"
          value={settings.selectedRounds - settings.rounds}
          max={settings.selectedRounds}
          sx={{ fontSize: "2rem" }}
          emptyIcon={
            <StarIcon
              style={{ opacity: 0.5, color: "white", fontSize: "2rem", marginBottom: "1rem" }}
            />
          }
          readOnly
        />
        <Grid container>
          <Grid textAlign={"right"} item xs={3}>
            <SelfImprovementIcon className="informationIcon" />
          </Grid>
          <Grid textAlign={"left"} item xs={3}>
            <Typography className="selectedTimers">
              {(parseInt(settings.selectedBreakTime) / 60).toString() + ":00"}
            </Typography>
          </Grid>
          <Grid textAlign={"right"} item xs={3}>
            <WeekendIcon className="informationIcon" />
          </Grid>
          <Grid textAlign={"left"} item xs={3}>
            <Typography className="selectedTimers">
              {(parseInt(settings.selectedLongBreakTime) / 60).toString() +
                ":00"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign={"center"}>
        {getHandlerButton(pomodoroStatus)}
        {settings.status < 3 && (
          <Button
            variant="contained"
            color="warning"
            onClick={resetTimes}
            className="resetButton"
          >
            Reset Round
          </Button>
        )}
      </Box>
      <Box textAlign={"center"}>
        <Button
          variant="contained"
          color="error"
          onClick={fullReset}
          className="fullResetButton"
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
          className="settingsLink"
        >
          <SettingsIcon className="settingsLinkIcon" />
          <Typography fontSize={20} display={"inline"} alignContent={"center"}>
            Settings
          </Typography>
        </Link>
      </Box>
      <Footer />
    </Container>
  );
};

export default Pomodoro;
