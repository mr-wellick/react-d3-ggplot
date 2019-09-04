import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { ChartContext } from '../context/';
import { useYScale } from '../scale-hooks/';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

const YAxis = () => {
  const ref = useRef(null);
  const { dimensions } = useContext(ChartContext);
  const scale = useYScale();

  useEffect(() => {
    const axisLocation = `translate(${dimensions.padding}, 0)`;
    const node = select(ref.current).attr('transform', axisLocation);
    node.call(axisLeft(scale));
  }, [dimensions.padding, scale]);

  return <g ref={ref} />;
};

export default YAxis;
