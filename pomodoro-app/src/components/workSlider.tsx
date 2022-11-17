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
  const updateWorkTime = (value: number | number[]) => {
    if (typeof value === "number") {
      props.setSettings((prevState: AppSettings) => ({
        ...prevState,
        workTime: (value * 60).toString(),
        selectedWorkTime: (value * 60).toString(),
      }));
      localforage.setItem("workTime", (value * 60).toString(), (err) => {
        if (err) throw err;
      });
      localforage.setItem(
        "selectedWorkTime",
        (value * 60).toString(),
        (err) => {
          if (err) throw err;
        }
      );
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
