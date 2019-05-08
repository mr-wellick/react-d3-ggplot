import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context/";
import { useScale } from "../_hooks/";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";

interface IProps {
  label: string;
}

// componet using application context
function XAxis(props: IProps) {
  // here we use any so we can use ref in select(). if we don't, we can only use a STRING to select a node.
  // And we don't want that since we'll be accidentally touching other <g> elements
  const ref: any = useRef(null);
  const context = useContext<IContext>(ChartContext);
  const scale = useScale(context, "XAxis");

  useEffect(() => {
    const { dimensions, aes, data } = context;
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
    if (typeof data[0][aes[0]] === "number" && props.label !== undefined) {
      node.selectAll<SVGTextElement, number>("text").html(datum => format(props.label)(datum));
    }
  });

  return <g ref={ref} />;
}

export default XAxis;
