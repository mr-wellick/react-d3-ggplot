import { scaleBand } from 'd3-scale';

class OrdinalScale {
  constructor(data) {
    this.data = data;
  }

  getScale(binWidth) {
    const scale = scaleBand().domain(this.data);
    scale.padding(binWidth);

    return scale;
  }
}

export default OrdinalScale;
