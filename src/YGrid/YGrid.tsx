import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useScale } from "../_hooks/";
import { ChartContext } from "../_context/";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";

interface IProps {}

function YGrid(props: IProps) {
  const node: any = useRef(null);
  const context = useContext(ChartContext);
  const scale: any = useScale(context, YGrid.name);

  return <g ref={node} />;
}

export default YGrid;
