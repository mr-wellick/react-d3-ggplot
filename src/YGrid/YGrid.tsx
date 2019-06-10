import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useYScale } from "../_hooks/";
import { ChartContext } from "../_context/";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { axisRight } from "d3-axis";

interface IProps {
  stroke?: string;
}

YGrid.displayName = "YGrid";

function YGrid(props: IProps) {
  const ref: any = useRef(null);
  const { dimensions } = useContext(ChartContext);
  const yScale: any = useYScale();

  if (!dimensions) {
    throw new Error("Dimensions not specified");
  }

  useEffect(() => {
    const tickPosition = `translate(${dimensions.padding}, 0)`;

    select(ref.current)
      .attr("transform", tickPosition)
      .call(
        axisRight(yScale)
          .ticks(4)
          .tickSize(dimensions.width - dimensions.padding * 2)
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
      .attr("stroke", !props.stroke ? "white" : props.stroke)
      .attr("opacity", 0.7);
  });

  return <g ref={ref} />;
}

export default YGrid;
