import { useContext } from 'react';
import { ChartContext } from '../context/';
import { LinearScale } from '../scale-utils/';
import { TimeScale } from '../scale-utils/';
import { OrdinalScale } from '../scale-utils/';

function useScaleType() {
  const { data, aes } = useContext(ChartContext);

  if (typeof data[0][aes[0]] === 'number') {
    const xValues = data.map(data => data[aes[0]]);
    const scale = new LinearScale(xValues).getScale();

    return scale;
  } else if (typeof data[0][aes[0]] === 'object') {
    const xValues = data.map(data => data[aes[0]]);
    const scale = new TimeScale(xValues).getScale();

    return scale;
  } else if (typeof data[0][aes[0]] === 'string') {
    const xValues = data.map(data => data[aes[0]]);
    const scale = new OrdinalScale(xValues).getScale(0.5); // will make argument modular later

    return scale;
  }

  return null;
}

function useXScale() {
  const { dimensions } = useContext(ChartContext);
  const xScale = useScaleType();

  // need to set the range to properly display our graph visually
  xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

  return xScale;
}

export default useXScale;
