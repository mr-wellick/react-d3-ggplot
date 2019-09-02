import { min } from 'd3-array';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

class LinearScale {
  constructor(data) {
    this.data = data;
  }

  getInterval() {
    const MIN = min(this.data);
    const MAX = max(this.data);
    const interval = [MIN, MAX];

    return interval;
  }

  getScale() {
    const interval = this.getInterval();
    const scale = scaleLinear()
      .domain(interval)
      .nice();

    return scale;
  }
}

export default LinearScale;
