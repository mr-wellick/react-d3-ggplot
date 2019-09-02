import React, { ReactChild } from "react";
import { ChartContext, IContext } from "../_context/";

interface IProps extends IContext {
  children?: ReactChild[] | ReactChild;
}

function GEOMS(props: IProps) {
  if (!props.data || !props.aes || !props.dimensions) {
    throw new Error(`GEOMS must have the following properties: data, aes, and dimensions.`);
  }

  if (!props.children) {
    throw new Error("GEOMS expects at least one child component such as: <Rects/> or <Points/>");
  } else {
    const childrenNames = React.Children.map(props.children, child => {
      // @ts-ignore
      if (child.type.displayName) {
        // @ts-ignore
        return child.type.displayName;
      } else {
        return "invalid";
      }
    });

    if (childrenNames.filter(childrenName => childrenName === "invalid").length >= 1) {
      throw new Error("GEOMS only accepts components from react-d3-ggplot");
    }
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
