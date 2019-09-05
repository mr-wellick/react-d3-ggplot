import { stack } from 'd3-shape';

class Series {
  constructor(data, categories) {
    this.data = data;
    this.categories = categories;
  }

  getStacks() {
    const stacks = stack().keys(this.categories);
    //.order(d3.stackOrderNone)
    //.offset(d3.stackOffsetNone)

    return stacks;
  }

  getSeries() {
    const stacks = this.getStacks();
    const series = stacks(this.data);

    return series;
  }
}

export default Series;
