import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { GGPLOT } from "../GGPLOT/";

function FACETS(props) {
  return (
    <Fragment>
      {props.data.map((dataset, index) => (
        <GGPLOT
          {...props}
          key={index}
          data={dataset} // override old data with only one dataset
        >
          {props.children}
        </GGPLOT>
      ))}
    </Fragment>
  );
}

FACETS.propTypes = {
  data: PropTypes.array,
  children: PropTypes.any
};

export default FACETS;
