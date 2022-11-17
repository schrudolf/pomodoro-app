import * as React from "react";
import localforage from "localforage";
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

const BreakSlider = (props: {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}) => {
  const updateBreakTime = async (value: number | number[]) => {
    try {
      if (typeof value === "number") {
        await localforage.setItem("breakTime", (value * 60).toString());
        await localforage.setItem("selectedBreakTime", (value * 60).toString());
        props.setSettings((prevState: AppSettings) => ({
          ...prevState,
          breakTime: (value * 60).toString(),
          selectedBreakTime: (value * 60).toString(),
        }));
      }
    } catch (err) {
      console.log(err);
    }
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
        value={parseInt(props.settings.selectedBreakTime) / 60}
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
