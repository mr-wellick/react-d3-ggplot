import { useContext } from 'react';
import { ChartContext } from '../context/';
import { LinearScale } from '../scale-utils/';
import { TimeScale } from '../scale-utils/';
import { OrdinalScale } from '../scale-utils/';

function useScaleType() {
  const { data, aes } = useContext(ChartContext);

  if (typeof data[1][aes[1]] === 'number') {
    const yValues = data.map(data => data[aes[1]]);
    const scale = new LinearScale(yValues).getScale();

    return scale;
  } else if (typeof data[1][aes[1]] === 'object') {
    const yValues = data.map(data => data[aes[1]]);
    const scale = new TimeScale(yValues).getScale();

    return scale;
  } else if (typeof data[1][aes[1]] === 'string') {
    const yValues = data.map(data => data[aes[1]]);
    const scale = new OrdinalScale(yValues).getScale(0.5); // will make argument modular later

    return scale;
  }

  return null;
}

function useYScale() {
  const { dimensions } = useContext(ChartContext);
  const yScale = useScaleType();

  // need to set the range to properly display our graph visually
  yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

  return yScale;
}

export default useYScale;
