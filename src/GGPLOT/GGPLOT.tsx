import React, { ReactChild } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context";
import { Background } from "../Background/";
import { XAxis } from "../XAxis/";
import { YAxis } from "../YAxis/";
// import { XGrid } from "../XGrid/";
// import { YGrid } from "../YGrid/";

interface IProps extends IContext {
  children?: ReactChild;
}

function GGPLOT(props: IProps) {
  if (!props.data || !props.aes || !props.dimensions) {
    throw new Error("GGPLOT must be supplied with the following props: data, aes, and dimensions");
  }

  if (props.children) {
    const componentName = React.Children.map(props.children, child => {
      // @ts-ignore
      if (child.type.displayName) {
        // @ts-ignore
        return child.type.displayName; // this property exists. don't know why ts is complaining
      }
    });

    if (componentName.length === 0) {
      throw new Error(
        "GGPLOT does not accept raw HTML element(s). Pass is ONE of the following components: Line, Points, or Rects."
      );
    } else if (componentName.length >= 2) {
      throw new Error(
        "GGPLOT only accepts ONE of the following VALID components: Line, Points, or Rects."
      );
    }

    // will change this
    if (
      componentName.length === 1 &&
      (componentName[0] === "Line" || componentName[0] === "Rects" || componentName[0] === "Points")
    ) {
      // here we do nothing
    } else {
      throw new Error(
        "GGPLOT only accepts ONE of the following VALID components: Line, Points, or Rects."
      );
    }
  }

  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        <XAxis />
        <YAxis />
        {/*
          <Background />
          <XGrid />
          <YGrid />
         */}
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
}

export default GGPLOT;
