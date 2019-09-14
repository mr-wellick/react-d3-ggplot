import React from 'react';
import { useContext } from 'react';
import { ChartContext } from '../context/';
import { useScale } from '../scale-hooks/';

const Points = () => {
  const { data, aes, dimensions } = useContext(ChartContext);
  const xScale = useScale(aes[0]);
  const yScale = useScale(aes[1]);

  // need to set the range to properly display our graph visually
  xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
  yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

  // For key prop, we shouldn't use index because we can't take advantage of
  // react's optimizing capabilities.
  return (
    <g>
      {data.map((datum, index) => (
        <circle
          key={index}
          cx={xScale(datum[aes[0]])}
          cy={yScale(datum[aes[1]])}
          r={2}
          fill={'orange'}
        />
      ))}
    </g>
  );
};

export default Points;
