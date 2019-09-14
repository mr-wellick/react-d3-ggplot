import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { ChartContext } from '../context/';
import { useScale } from '../scale-hooks/';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

const YAxis = () => {
  const ref = useRef(null);
  const { aes, dimensions } = useContext(ChartContext);
  // aes contains two values representing either the x or values we want to visualize
  const scale = useScale(aes[1]);
  // need to set the range to properly display our graph visually
  scale.range([dimensions.height - dimensions.padding, dimensions.padding]);

  useEffect(() => {
    const axisLocation = `translate(${dimensions.padding}, 0)`;
    const node = select(ref.current).attr('transform', axisLocation);
    node.call(axisLeft(scale));
  }, [dimensions.padding, scale]);

  return <g ref={ref} />;
};

export default YAxis;
