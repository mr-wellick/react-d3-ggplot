import React, { ReactChild } from "react";
import PropTypes from "prop-types";
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

GGPLOT.propTypes = {
  dimensions: PropTypes.object,
  children: PropTypes.any
};

export default GGPLOT;
