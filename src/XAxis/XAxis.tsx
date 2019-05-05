import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ChartContext } from "../_context/";
import { IAppContext } from "../_context/";
import { useScale } from "../_hooks/";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";

interface IProps {
  label: string;
}

function XAxis(props: IProps) {
  const context = useContext<IAppContext>(ChartContext);
  const scale: any = useScale(context, "XAxis");

  useEffect(() => {
    const { dimensions, aes, data } = context;
    const axisLocation = `translate(0, ${dimensions.height - dimensions.padding})`;

    // select node returned by component and appends x-axis
    const node = select<SVGGElement, string | number | object>("g")
      .attr("transform", axisLocation)
      .call(axisBottom(scale));

    // format x-labels
    if (typeof data[0][aes[0]] === "number" && props.label !== undefined) {
      node.selectAll<SVGTextElement, number>("text").html(datum => format(props.label)(datum));
    }
  });

  return <g />;
}

export default XAxis;
