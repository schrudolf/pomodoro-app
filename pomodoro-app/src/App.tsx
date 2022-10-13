import React from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import RoundsSlider from "./components/roundsSlider";
import WorkSlider from "./components/workSlider";
import BreakSlider from "./components/breakSlider";
import LongBreakSlider from "./components/longBreakSlider";

function App() {
  return (
    <Container>
      <Box sx={{ width: "75%", margin: "auto" }}>
        <RoundsSlider />
        <WorkSlider />
        <BreakSlider />
        <LongBreakSlider />
      </Box>
    </Container>
  );
}

export default App;
