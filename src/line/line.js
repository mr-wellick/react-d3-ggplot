import React from 'react';
import { useContext } from 'react';
import { line } from 'd3-shape';
import { curveCatmullRom } from 'd3-shape';
import { ChartContext } from '../context/';
import { useScale } from '../scale-hooks/';

const Line = () => {
  const { data, aes, dimensions } = useContext(ChartContext);
  const xScale = useScale(aes[0]);
  const yScale = useScale(aes[1]);

  // need to set the range to properly display our graph visually
  xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
  yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

  const pathToDraw = line()
    .x(datum => xScale(datum[aes[0]]))
    .y(datum => yScale(datum[aes[1]]))
    .curve(curveCatmullRom)(data);

  return (
    <g>
      <path fill="none" stroke="orange" strokeWidth="2" d={pathToDraw} />
    </g>
  );
};

export default Line;
