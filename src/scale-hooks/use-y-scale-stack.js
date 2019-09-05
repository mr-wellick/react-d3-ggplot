import { useContext } from 'react';
import { ChartContext } from '../context/';
import useSeries from './use-series.js';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

function useYScaleStack() {
  const { dimensions } = useContext(ChartContext);
  const series = useSeries();
  const scale = scaleLinear()
    // don't think we need to do this!? also this won't account for negative values
    .domain([0, max(series, d => max(d, d => d[1]))]);

  scale.rangeRound([dimensions.height - dimensions.padding, dimensions.padding]);

  return scale;
}

export default useYScaleStack;
