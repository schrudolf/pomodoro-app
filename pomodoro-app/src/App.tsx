import React from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import RoundsSlider from "./components/roundsSlider";
import WorkSlider from "./components/workSlider";

function App() {
  return (
    <Container>
      <Box sx={{ width: "75%", margin: "auto" }}>
        <RoundsSlider />
        <WorkSlider />
      </Box>
    </Container>
  );
}

export default App;
