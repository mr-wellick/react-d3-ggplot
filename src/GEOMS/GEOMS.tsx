import React, { ReactChildren, ReactComponentElement, ReactChild } from "react";
import { ChartContext, IContext } from "../_context/";

interface IProps extends IContext {
  children?: ReactChild[] | ReactChild;
}

function GEOMS(props: IProps) {
  if (!props.data || !props.aes || !props.dimensions) {
    throw new Error(`GEOMS must have the following properties: data, aes, and dimension`);
  }

  if (!props.children) {
    throw new Error("GEOMS expects at least one child components such as: <Rects/> or <Points/>");
  }

  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
}

export default GEOMS;
