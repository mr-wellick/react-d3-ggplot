import React from "react";
import { ChartContext, IContext } from "../_context/";

interface IProps extends IContext {
  children: React.ReactChildren;
}

function GEOMS(props: IProps) {
  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
}

export default GEOMS;
