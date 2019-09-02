import React from 'react';
import { useContext } from 'react';
import { ChartContext } from '../context/';
import { useXScale } from '../scale-hooks/';
import { useYScale } from '../scale-hooks/';

const Points = () => {
  const context = useContext(ChartContext);
  const xScale = useXScale();
  const yScale = useYScale();

  // For key prop, we shouldn't use index because we can't take advantage of
  // react's optimizing capabilities.
  return (
    <g>
      {context.data.map((datum, index) => (
        <circle
          key={index}
          cx={xScale(datum[context.aes[0]])}
          cy={yScale(datum[context.aes[1]])}
          r={2}
          fill={'orange'}
        />
      ))}
    </g>
  );
};

export default Points;
