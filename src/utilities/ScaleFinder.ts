import { max, min } from "d3-array";
import { scaleLinear, ScaleLinear } from "d3-scale";
import { scaleTime } from "d3-scale";
import { scaleBand } from "d3-scale";

class ScaleFinder {
  private data: any[];

  constructor(data) {
    this.data = data;
  }

  private getInterval() {
    const MAX: number = max(this.data, d => d);
    const MIN: number = min(this.data, d => d);
    const interval: number[] = [MIN, MAX];

    return interval;
  }

  public getLinearScale() {
    const interval = this.getInterval();
    const scale = scaleLinear().domain(interval);

    return scale;
  }

  public getTimeScale() {
    const interval = this.getInterval();
    const scale = scaleTime().domain(interval);

    return scale;
  }

  public getOrdinalScale(binWidth: number) {
    const scale = scaleBand().domain(this.data);
    scale.padding(binWidth);

    return scale;
  }
}

export default ScaleFinder;
