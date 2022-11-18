import React from "react";
import localforage from "localforage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";
import { AppSettings } from "../models/settings";

const marks = (() => {
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
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}) => {
  const updateRounds = async (value: number | number[]) => {
    try {
      await localforage.setItem("selectedRounds", value);
      await localforage.setItem("rounds", value);
      props.setSettings((prevState: AppSettings) => ({
        ...prevState,
        selectedRounds: value as number,
        rounds: value as number,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Typography gutterBottom className="settingsTitle">
        Rounds:
      </Typography>
      <SlideStyle
        value={props.settings.selectedRounds}
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
