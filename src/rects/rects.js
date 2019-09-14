import React from 'react';
import { useContext } from 'react';
import { ChartContext } from '../context/';
import { useScale } from '../scale-hooks/';

const Rects = () => {
  const { data, aes, dimensions } = useContext(ChartContext);
  const xScale = useScale(aes[0]);
  const yScale = useScale(aes[1]);

  // need to set the range to properly display our graph visually
  xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
  yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

  // If we have negative values, adjust Rects accordingly
  const [yMin, yMax] = yScale.domain();

  if (yMin < 0 || yMax < 0) {
    return (
      <g>
        {data.map((datum, index) => (
          <rect
            key={index}
            width={xScale.bandwidth()} // works well with only string domains
            height={Math.abs(yScale(datum[aes[1]]) - yScale(0))}
            x={xScale(datum[aes[0]])}
            y={yScale(Math.max(0, datum[aes[1]]))}
            fill="cyan"
          />
        ))}
      </g>
    );
  } else {
    // if we have only positive values, we don't do anything special
    return (
      <g>
        {data.map((datum, index) => (
          <rect
            key={index}
            width={xScale.bandwidth()} // works well with only string domains
            height={yScale.range()[0] - yScale(datum[aes[1]])}
            x={xScale(datum[aes[0]])}
            y={yScale(datum[aes[1]])}
            fill="cyan"
          />
        ))}
      </g>
    );
  }
};

export default Rects;
