import { min, max, Numeric } from "d3-array";
import { scaleLinear, ScaleLinear } from "d3-scale";

// class to create a linear scale
class LinearScale {
  private data: Numeric[];

  constructor(data: Numeric[]) {
    this.data = data;
  }

  private getInterval(): Numeric[] | undefined {
    const MIN = min(this.data);
    const MAX = max(this.data);

    if (MIN !== undefined && MAX !== undefined) {
      const interval = [MIN, MAX];
      return interval;
    }

    return undefined;
  }

  public getScale(): ScaleLinear<number, number> | undefined {
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
