import React, { ReactChild } from "react";
import { ChartContext } from "../_context/";
import { IContext } from "../_context";
import { Background } from "../Background/";
import { XAxis } from "../XAxis/";
import { YAxis } from "../YAxis/";
import { XGrid } from "../XGrid/";
import { YGrid } from "../YGrid/";
import includes from "lodash.includes";

interface IProps extends IContext {
  children?: ReactChild;
}

function GGPLOT(props: IProps) {
  if (!props.data || !props.aes || !props.dimensions) {
    throw new Error("GGPLOT must be supplied with the following props: data, aes, and dimensions");
  }

  if (props.children) {
    const componentNames = React.Children.map(props.children, child => {
      // @ts-ignore
      if (child.type.displayName) {
        // @ts-ignore
        return child.type.displayName; // this property exists. don't know why ts is complaining
      } else {
        return "invalid";
      }
    });

    if (includes(componentNames, "invalid")) {
      throw new Error("GGPLOT only accepts components from react-d3-ggplot");
    }
  }

  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        <Background />
        <XGrid />
        <YGrid />
        <XAxis />
        <YAxis />
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
}

export default GGPLOT;
