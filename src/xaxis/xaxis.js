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

    // select node returned by component and appends x-axis
    const node = select(ref.current).attr('transform', axisLocation);
    node.call(axisBottom(scale));
  }, []);

  return <g ref={ref} />;
};

export default XAxis;
