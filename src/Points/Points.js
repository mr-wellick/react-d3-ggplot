import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { useScale } from "../_hooks/";
import { select } from "d3-selection";

function Points(props) {
  const node = useRef(null);
  const context = useContext(ChartContext);
  const xScale = useScale(context, "XAxis");
  const yScale = useScale(context, "YAxis");

  useEffect(() => {
    // clear graph for next set of data points
    if (node.current.length > 0)
      select(node.current)
        .selectAll("circle")
        .remove();

    // append new points
    select(node.current)
      .selectAll("circle")
      .data(context.data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[context.aes[0]]))
      .attr("cy", d => yScale(d[context.aes[1]]))
      .attr("r", 3);
  });

  return <g ref={node} />;
}

export default Points;
