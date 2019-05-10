import { max, min, Numeric } from "d3-array";
import { scaleBand, ScaleBand } from "d3-scale";

class OrdinalScale {
  constructor(private data: string[]) {
    this.data = data;
  }

  private getInterval(): string[] | undefined {
    const MAX = max(this.data);
    const MIN = min(this.data);

    if (MIN === undefined || MAX === undefined) {
      return undefined;
    } else {
      const interval = [MIN, MAX];
      return interval;
    }
  }

  public getScale(binWidth: number): ScaleBand<string> {
    const scale = scaleBand().domain(this.data);
    scale.padding(binWidth);

    return scale;
  }
}

export default OrdinalScale;
