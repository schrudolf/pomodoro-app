import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import { AppSettings } from "../models/settings";

const marks = (function () {
  let getWorkTimers = [];
  for (let i = 1; i <= 6; i++) {
    getWorkTimers.push({
      value: i * 5,
      label: `${0 + i * 5}:00`,
    });
  }
  return getWorkTimers;
})();

const BreakSlider = (props: {settings: AppSettings, setSettings: (prevState: any) => any }) => {
  const updateBreakTime = (value: number | number[]) => {
    props.setSettings((prevState: any) => ({
      ...prevState,
      breakTime: value,
    }));
  };
  return (
    <div>
      <Typography
        sx={{ margin: "1rem 0 2rem -2.5rem", fontWeight: 600, width: "100%" }}
        gutterBottom
      >
        Break time:
      </Typography>
      <SlideStyle
        aria-label="ios slider"
        defaultValue={props.settings.breakTime}
        step={5}
        min={5}
        max={30}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value} minutes`}
        onChange={(e, v, t) => updateBreakTime(v)}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default BreakSlider;
