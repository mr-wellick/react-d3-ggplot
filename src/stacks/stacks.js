import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { select } from 'd3-selection';
import { ChartContext } from '../context/';
import { useSeries } from '../scale-hooks/';
import { useColors } from '../scale-hooks/';
import { useYScaleStack } from '../scale-hooks/';
import { useScale } from '../scale-hooks/';

const Stacks = () => {
  const node = useRef();
  const { aes, dimensions } = useContext(ChartContext);
  const series = useSeries();
  const colors = useColors();
  const xScale = useScale(aes[0]);
  // need to set the range to properly display our graph visually
  xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
  const yScale = useYScaleStack();

  useEffect(() => {
    select(node.current)
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', d => colors(d.key))
      .selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', d => xScale(d.data[aes[0]]))
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth());
  });

  return <g ref={node} />;
};

export default Stacks;
