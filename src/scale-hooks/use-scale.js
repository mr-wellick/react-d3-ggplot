import { useContext } from 'react';
import { ChartContext } from '../context/';
import { LinearScale } from '../scale-utils/';
import { TimeScale } from '../scale-utils/';
import { OrdinalScale } from '../scale-utils/';

function useScale(aesthetic) {
  const { data } = useContext(ChartContext);
  const values = data.map(datum => datum[aesthetic]);

  if (typeof values[0] === 'number') {
    const scale = new LinearScale(values).getScale();

    return scale;
  } else if (typeof values[0] === 'object') {
    const scale = new TimeScale(values).getScale();

    return scale;
  } else if (typeof values[0] === 'string') {
    const scale = new OrdinalScale(values).getScale(0.5); // will make argument modular later

    return scale;
  }

  return null;
}

export default useScale;
