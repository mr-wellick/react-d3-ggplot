import { max, min } from 'd3-array';
import { scaleTime } from 'd3-scale';

class TimeScale {
  constructor(data) {
    this.data = data;
  }

  getInterval() {
    const MAX = max(this.data);
    const MIN = min(this.data);
    const interval = [MIN, MAX];

    return interval;
  }

  getScale() {
    const interval = this.getInterval();
    const scale = scaleTime().domain(interval);

    return scale;
  }
}

export default TimeScale;
