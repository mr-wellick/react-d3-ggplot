import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useScale } from "../_hooks/";
import { ChartContext } from "../_context/";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";

interface IProps {}

function XGrid(props: IProps) {
  const ref: any = useRef(null);
  const context = useContext(ChartContext);
  const scale: any = useScale(context, XGrid.name);

  return <g ref={ref} />;
}

export default XGrid;