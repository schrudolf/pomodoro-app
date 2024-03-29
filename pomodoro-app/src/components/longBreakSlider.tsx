import * as React from "react";
import localforage from "localforage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import { AppSettings } from "../models/settings";

const marks = (() => {
  let getWorkTimers = [];
  for (let i = 1; i <= 12; i++) {
    if (i % 2 === 0) {
      getWorkTimers.push({
        value: i * 5,
        label: `${0 + i * 5}:00`,
      });
    }
  }
  return getWorkTimers;
})();

const LongBreakSlider = (props: {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}) => {
  const updateLongBreakTime = async (value: number | number[]) => {
    try {
      if (typeof value === "number") {
        const newTime = (value * 60).toString();
        await localforage.setItem("longBreakTime", newTime);
        await localforage.setItem("selectedLongBreakTime", newTime);
        props.setSettings((prevState: AppSettings) => ({
          ...prevState,
          longBreakTime: newTime,
          selectedLongBreakTime: newTime,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Typography gutterBottom className="settingsTitle">
        Long break time
      </Typography>
      <SlideStyle
        value={parseInt(props.settings.selectedLongBreakTime) / 60}
        step={5}
        min={10}
        max={60}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value} minutes`}
        onChange={(e, v, t) => updateLongBreakTime(v)}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default LongBreakSlider;
