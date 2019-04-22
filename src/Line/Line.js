import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { useScale } from "../_hooks/";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { curveCatmullRom } from "d3-shape";

function Line(props) {
  const node = useRef(null);
  const context = useContext(ChartContext);
  const xScale = useScale(context, "XAxis");
  const yScale = useScale(context, "YAxis");

  useEffect(() => {
    const lineToAppend = line()
      .x(d => xScale(d[context.aes[0]]))
      .y(d => yScale(d[context.aes[1]]))
      .curve(curveCatmullRom);

    // append line to plot
    select(node.current)
      .datum(context.data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("d", lineToAppend);
  });

  return (
    <g>
      <path ref={node} />
    </g>
  );
}

export default Line;
