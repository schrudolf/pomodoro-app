import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";

const marks = (function () {
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

const WorkSlider = (props: { setSettings: (prevState: any) => any }) => {
  const updateWorkTime = (value: number | number[]) => {
    props.setSettings((prevState: any) => ({
      ...prevState,
      workTime: value,
    }));
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
        aria-label="ios slider"
        defaultValue={25}
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
