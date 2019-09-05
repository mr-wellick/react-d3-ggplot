import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ChartContext } from '../context/';
import { useYScaleStack } from '../scale-hooks/';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

const YAxisStack = () => {
  const node = useRef();
  const { dimensions } = useContext(ChartContext);
  const yScale = useYScaleStack();

  useEffect(() => {
    select(node.current)
      .attr('transform', `translate(${dimensions.padding},0)`)
      .call(axisLeft(yScale).ticks(null, 's'));
  });

  return <g ref={node} />;
};

export default YAxisStack;
