import React, { ReactChild } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context";
import { Background } from "../Background/";
import { XAxis } from "../XAxis/";
import { YAxis } from "../YAxis/";
// import { XGrid } from "../XGrid/";
// import { YGrid } from "../YGrid/";

interface IProps extends IContext {
  children: ReactChild;
}

function GGPLOT(props: IProps) {
  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        <Background />
        <XAxis />
        <YAxis />
        {/*
          <XGrid />
          <YGrid />
         */}
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
}

export default GGPLOT;
