import useSeries from './use-series.js';
import { scaleOrdinal } from 'd3-scale';
import { quantize } from 'd3-interpolate';
import { interpolateSpectral } from 'd3-scale-chromatic';

function useColors() {
  const series = useSeries();
  const colors = scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(quantize(t => interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
    .unknown('#ccc');

  return colors;
}

export default useColors;
