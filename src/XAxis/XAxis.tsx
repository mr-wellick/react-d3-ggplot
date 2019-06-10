import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ChartContext } from "../_context/";
import { useXScale } from "../_hooks/";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";

interface IProps {
  x_format?: any;
  x_path?: boolean;
}

XAxis.displayName = "XAxis";

// componet using application context
function XAxis(props: IProps) {
  // here we use any so we can use ref in select(). if we don't, we can only use a STRING to select a node.
  // And we don't want that since we'll be accidentally touching other <g> elements
  const ref: any = useRef(null);
  const { dimensions, aes, data } = useContext(ChartContext);
  const scale: any = useXScale();

  if (!dimensions) {
    throw new Error("Dimensions not specified");
  }

  useEffect(() => {
    const axisLocation = `translate(0, ${dimensions.height - dimensions.padding})`;

    // select node returned by component and appends x-axis
    const node = select<SVGGElement, number | Date | string>(ref.current).attr(
      "transform",
      axisLocation
    );

    if (scale !== undefined) {
      node.call(axisBottom(scale));
    }

    // format x-labels
    if (typeof data[0][aes[0]] === "number" && props.x_format !== undefined) {
      node.selectAll<SVGTextElement, number>("text").html(datum => format(props.x_format)(datum));
    }

    if (props.x_path) {
      select(ref.current)
        .select("path")
        .remove();
    }
  });

  return <g ref={ref} />;
}

export default XAxis;
