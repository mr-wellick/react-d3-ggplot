import { min, max } from "d3-array";
import { scaleLinear } from "d3-scale";

class LinearScale {
  constructor(data) {
    this.data = data;
  }

  getInterval() {
    const MIN = min(this.data);
    const MAX = max(this.data);

    if (MIN !== undefined && MAX !== undefined) {
      const interval = [MIN, MAX];
      return interval;
    }

    return undefined;
  }

  getScale() {
    const interval = this.getInterval();
    let scale;

    if (interval !== undefined) {
      scale = scaleLinear()
        .domain(interval)
        .nice();

      return scale;
    }

    return undefined;
  }
}

export default LinearScale;
