import React from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { useScale } from "../_hooks/";
import { line } from "d3-shape";
import { curveCatmullRom } from "d3-shape";

interface IProps {
  fill?: string;
  width?: string;
}

Line.displayName = "Line";

function Line(props: IProps) {
  const context = useContext(ChartContext);
  const xScale: any = useScale("XAxis");
  const yScale: any = useScale("YAxis");

  const lineToAppend = line()
    .x((d: any) => xScale(d[context.aes[0]]))
    .y((d: any) => yScale(d[context.aes[1]]))
    .curve(curveCatmullRom)(context.data);

  return (
    <g>
      <path
        fill="none"
        stroke={!props.fill ? "crimson" : props.fill}
        strokeWidth={!props.width ? "1" : props.width}
        d={!lineToAppend ? undefined : lineToAppend}
      />
    </g>
  );
}

export default Line;
