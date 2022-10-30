import React from "react";
import localforage from "localforage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import { AppSettings } from "../models/settings";

const marks = (function () {
  let getWorkTimers = [];
  for (let i = 1; i <= 10; i++) {
    getWorkTimers.push({
      value: i,
      label: i,
    });
  }
  return getWorkTimers;
})();

const RoundsSlider = (props: {
  settings: AppSettings;
  setSettings: (prevState: any) => any;
}) => {
  const updateRounds = async (value: number | number[]) => {
    try {
      await localforage.setItem("rounds", value);
      await localforage.setItem("selectedRounds", value);
      props.setSettings((prevState: any) => ({
        ...prevState,
        rounds: value,
        selectedRounds: value,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Typography
        sx={{ margin: "1rem 0 2rem -2.5rem", fontWeight: 600 }}
        gutterBottom
      >
        Rounds:
      </Typography>
      <SlideStyle
        aria-label="ios slider"
        value={props.settings.rounds}
        step={1}
        min={1}
        max={10}
        marks={marks}
        valueLabelDisplay="on"
        onChange={(e, v, t) => updateRounds(v)}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default RoundsSlider;
