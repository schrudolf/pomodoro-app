import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import { AppSettings } from "../models/settings";

const marks = (function () {
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

const LongBreakSlider = (props: {settings: AppSettings, setSettings: (prevState: any) => any }) => {
  const updateLongBreakTime = (value: number | number[]) => {
    props.setSettings((prevState: any) => ({
      ...prevState,
      longBreakTime: value,
    }));
  };
  return (
    <div>
      <Typography
        sx={{ margin: "1rem 0 2rem -2.5rem", fontWeight: 600, width: "100%" }}
        gutterBottom
      >
        Long break time:
      </Typography>
      <SlideStyle
        aria-label="ios slider"
        value={props.settings.longBreakTime}
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
