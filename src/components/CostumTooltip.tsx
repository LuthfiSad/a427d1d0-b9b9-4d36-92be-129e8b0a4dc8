import React from "react";
import { Tooltip as MUITooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "red",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "red",
  },
}));

export default CustomTooltip;
