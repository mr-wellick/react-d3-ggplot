import { useContext } from 'react';
import { ChartContext } from '../context/';
import { LinearScale } from '../scale-utils/';
import { TimeScale } from '../scale-utils/';
import { OrdinalScale } from '../scale-utils/';

function useScaleType() {
  const { data, aes } = useContext(ChartContext);
  // data is an array of ojects. aes contains two strings, which specify the values
  // that we want to pull out of data. aes[1] represents the y-values
  const yValues = data.map(data => data[aes[1]]);

  if (typeof yValues[0] === 'number') {
    const scale = new LinearScale(yValues).getScale();

    return scale;
  } else if (typeof yValues[0] === 'object') {
    const scale = new TimeScale(yValues).getScale();

    return scale;
  } else if (typeof yValues[0] === 'string') {
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
