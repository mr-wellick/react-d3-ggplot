import { max, min, Numeric } from "d3-array";
import { scaleLinear, ScaleLinear } from "d3-scale";
import { scaleTime, ScaleTime } from "d3-scale";
import { scaleBand, ScaleBand } from "d3-scale";

class ScaleFinder<T extends Numeric> {
  public data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  private getInterval(): T[] | undefined {
    const MAX = max(this.data);
    const MIN = min(this.data);

    if (MIN === undefined || MAX === undefined) {
      return undefined;
    } else {
      const interval = [MIN, MAX];
      return interval;
    }
  }

  public getLinearScale(): ScaleLinear<T, T> | undefined {
    const interval = this.getInterval();

    if (interval !== undefined) {
      const scale: ScaleLinear<T, T> = scaleLinear<T, T>().domain(interval);
      return scale;
    }

    return undefined;
  }

  public getTimeScale(): ScaleTime<T, T> | undefined {
    const interval = this.getInterval();

    if (interval !== undefined) {
      const scale: ScaleTime<T, T> = scaleTime<T, T>().domain(interval);
      return scale;
    }

    return undefined;
  }

  public getOrdinalScale(binWidth: number): ScaleBand<T> {
    const scale = scaleBand<T>().domain(this.data);
    scale.padding(binWidth);

    return scale;
  }
}

export default ScaleFinder;
