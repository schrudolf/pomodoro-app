import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SlideStyle from "./slidesStyle";

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

const LongBreakSlider = () => {
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
        defaultValue={10}
        step={5}
        min={10}
        max={60}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value} minutes`}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default LongBreakSlider;
