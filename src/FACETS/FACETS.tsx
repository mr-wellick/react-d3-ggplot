import React, { ReactChild } from "react";
import { Fragment } from "react";
import { GGPLOT } from "../GGPLOT/";
import { IContext } from "../_context";

interface IProps extends IContext {
  children: ReactChild;
}

function FACETS(props: IProps) {
  return (
    <Fragment>
      {props.data.map((dataset, index) => (
        <GGPLOT
          data={dataset} // override old data with only one dataset
          aes={props.aes}
          dimensions={props.dimensions}
          key={index}
        >
          {props.children}
        </GGPLOT>
      ))}
    </Fragment>
  );
}

export default FACETS;
