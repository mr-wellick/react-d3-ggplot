import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useXScale } from "../_hooks/";
import { ChartContext } from "../_context/";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";

interface IProps {
  fill?: string;
}

XGrid.displayName = "XGrid";

function XGrid(props: IProps) {
  const ref: any = useRef(null);
  const { dimensions } = useContext(ChartContext);
  const xScale: any = useXScale();
  const tickPosition = `translate(0, ${dimensions.padding})`;

  useEffect(() => {
    select(ref.current)
      .attr("transform", tickPosition)
      .call(
        axisBottom(xScale)
          .ticks(4)
          .tickSize(dimensions.height - dimensions.padding * 2)
          .tickSizeOuter(0)
      );

    select(ref.current)
      .select("path")
      .remove();

    select(ref.current)
      .selectAll("text")
      .remove();

    select(ref.current)
      .selectAll("line")
      .attr("stroke", "white")
      .attr("opacity", 0.7);
  });

  return <g ref={ref} />;
}

export default XGrid;
