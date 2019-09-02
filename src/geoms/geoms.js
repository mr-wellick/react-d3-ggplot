import React from 'react';
import { ChartContext } from '../context/';

const GEOMS = props => {
  return (
    <ChartContext.Provider value={props}>
      <svg width={props.dimensions.width} height={props.dimensions.height}>
        {props.children}
      </svg>
    </ChartContext.Provider>
  );
};

export default GEOMS;
