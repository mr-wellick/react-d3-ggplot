import React from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context/";

interface IProps {
  fill?: string;
}

Background.displayName = "Background";

function Background(props: IProps) {
  const { dimensions } = useContext(ChartContext);

  return (
    <rect
      width={dimensions.width - dimensions.padding * 2}
      height={dimensions.height - dimensions.padding * 2}
      fill={props.fill ? props.fill : "#f1f1f1"}
      transform={`translate(${dimensions.padding}, ${dimensions.padding})`}
    />
  );
}

export default Background;
