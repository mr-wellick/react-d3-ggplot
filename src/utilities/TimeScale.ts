import { max, min } from "d3-array";
import { scaleTime, ScaleTime } from "d3-scale";

class TimeScale {
  constructor(private data: Date[]) {
    this.data = data;
  }

  private getInterval() {
    const MAX = max(this.data);
    const MIN = min(this.data);

    if (MIN === undefined || MAX === undefined) {
      return undefined;
    } else {
      const interval = [MIN, MAX];
      return interval;
    }
  }

  public getScale(): ScaleTime<Date, Date> | undefined {
    const interval = this.getInterval();
    let scale: ScaleTime<Date, Date>;

    if (interval !== undefined) {
      scale = scaleTime<Date, Date>().domain(interval);
      return scale;
    }

    return undefined;
  }
}

export default TimeScale;
