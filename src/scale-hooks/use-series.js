import { useContext } from 'react';
import { ChartContext } from '../context/';
import { Series } from '../scale-utils/';

function useSeries() {
  const { data, categories } = useContext(ChartContext);
  const series = new Series(data, categories).getSeries();

  return series;
}

export default useSeries;
