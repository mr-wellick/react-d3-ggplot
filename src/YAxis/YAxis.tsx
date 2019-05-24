import React, { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ChartContext } from "../_context/";
import { useYScale } from "../_hooks/";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { format } from "d3-format";

interface IProps {
  label?: any;
}

YAxis.displayName = "YAxis";

function YAxis(props: IProps) {
  // here we use any so we can use ref in select(). if we don't, we can only use a STRING to select a node.
  // And we don't want that since we'll be accidentally touching other <g> elements
  const ref: any = useRef(null);
  const context = useContext(ChartContext);
  const scale: any = useYScale();

  useEffect(() => {
    const { data, aes, dimensions } = context;
    const axisLocation = `translate(${dimensions.padding}, 0)`;

    // select node returned by component and appends y-axis
    const node = select<SVGGElement, string | number | object>(ref.current).attr(
      "transform",
      axisLocation
    );

    if (scale !== undefined) {
      node.call(axisLeft(scale));
    }

    // format y-labels
    if (typeof data[1][aes[1]] === "number" && props.label !== undefined) {
      node.selectAll<SVGTextElement, number>("text").html(datum => format(props.label)(datum));
    }

    select(ref.current)
      .select("path")
      .remove();
  });

  return <g ref={ref} />;
}

export default YAxis;
