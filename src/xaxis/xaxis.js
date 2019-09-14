import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { ChartContext } from '../context/';
import { useScale } from '../scale-hooks/';

const XAxis = () => {
  const ref = useRef(null);
  const { aes, dimensions } = useContext(ChartContext);
  // aes contains two values representing either the x or y values we want to visualize
  const scale = useScale(aes[0]);
  // need to set the range to properly display our graph visually
  scale.range([dimensions.padding, dimensions.width - dimensions.padding]);

  useEffect(() => {
    const axisLocation = `translate(0, ${dimensions.height - dimensions.padding})`;
    const node = select(ref.current).attr('transform', axisLocation);
    node.call(axisBottom(scale));
  }, [dimensions.height, dimensions.padding, scale]);

  return <g ref={ref} />;
};

export default XAxis;
