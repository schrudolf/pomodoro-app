import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";

const slideBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const SlideStyle = styled(Slider)(({ theme }) => ({
  color: "#2CE69B",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "white",
    boxShadow: slideBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: slideBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#2CE69B",
      fontSize: "0.8rem",
      fontWeight: "600"
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#cc4e5c",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#cc4e5c",
    height: 10,
    width: 2,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "#cc4e5c",
  },
}));

export default SlideStyle;
