import { min, max, Numeric } from "d3-array";
import { scaleLinear, ScaleLinear } from "d3-scale";

// class to create a linear scale
class LinearScale {
  private data: Numeric[];

  constructor(data: Numeric[]) {
    this.data = data;
  }

  private getInterval() {
    const MAX = max(this.data);
    const MIN = min(this.data);

    if (MAX !== undefined && MIN !== undefined) {
      const interval = [MAX, MIN];
      return interval;
    }

    return undefined;
  }

  public getScale() {
    const interval = this.getInterval();
    let scale: ScaleLinear<number, number>;

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
