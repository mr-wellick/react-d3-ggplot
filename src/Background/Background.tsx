import React from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context/";

interface IProps {
  color?: string;
}

function Background(props: IProps) {
  const { dimensions } = useContext(ChartContext);

  return (
    <rect
      width={dimensions.width - dimensions.padding * 2}
      height={dimensions.height - dimensions.padding * 2}
      fill="#f1f1f1"
      transform={`translate(${dimensions.padding}, ${dimensions.padding})`}
    />
  );
}

export default Background;
