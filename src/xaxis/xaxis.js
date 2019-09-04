import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { ChartContext } from '../context/';
import { useXScale } from '../scale-hooks/';

const XAxis = () => {
  const ref = useRef(null);
  const { dimensions } = useContext(ChartContext);
  const scale = useXScale();

  useEffect(() => {
    const axisLocation = `translate(0, ${dimensions.height - dimensions.padding})`;
    const node = select(ref.current).attr('transform', axisLocation);
    node.call(axisBottom(scale));
  }, [dimensions.height, dimensions.padding, scale]);

  return <g ref={ref} />;
};

export default XAxis;
