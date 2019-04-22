import React from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";

function Background(props) {
  const context = useContext(ChartContext);

  return (
    <rect
      width={
        context.dimensions.width - context.dimensions.padding * 2
      }
      height={
        context.dimensions.height - context.dimensions.padding * 2
      }
      fill="rgb(232, 232, 232)"
      transform={`translate(${context.dimensions.padding}, ${
        context.dimensions.padding
      })`}
    />
  );
}

export default Background;
