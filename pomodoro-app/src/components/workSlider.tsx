import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import localforage from "localforage";
import { AppSettings } from "../models/settings";

const marks = (() => {
  let getWorkTimers = [];
  for (let i = 1; i <= 24; i++) {
    if (i % 5 === 0 || i === 1 || i === 24) {
      getWorkTimers.push({
        value: i * 5,
        label: `${0 + i * 5}:00`,
      });
    }
  }
  return getWorkTimers;
})();

const WorkSlider = (props: {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}) => {
  const updateWorkTime = async (value: number | number[]) => {
    try {
      if (typeof value === "number") {
        const newTime = (value * 60).toString();
        await localforage.setItem("workTime", newTime);
        await localforage.setItem("selectedWorkTime", newTime);
        props.setSettings((prevState: AppSettings) => ({
          ...prevState,
          workTime: newTime,
          selectedWorkTime: newTime,
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
        Work time:
      </Typography>
      <SlideStyle
        value={parseInt(props.settings.selectedWorkTime) / 60}
        step={5}
        min={5}
        max={120}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value} minutes`}
        onChange={(e, v, t) => updateWorkTime(v)}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default WorkSlider;
