import React from 'react';
import { useContext } from 'react';
import { line } from 'd3-shape';
import { curveCatmullRom } from 'd3-shape';
import { ChartContext } from '../context/';
import { useXScale } from '../scale-hooks/';
import { useYScale } from '../scale-hooks/';

const Line = () => {
  const { data, aes } = useContext(ChartContext);
  const xScale = useXScale();
  const yScale = useYScale();

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
