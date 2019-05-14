import LinearScale from "../LinearScale";
import { Numeric } from "d3-array";
import { min, max } from "d3-array";

// testing data for linear scale
const data: Numeric[] = [1.8, 1.0, 2, 2, 5.7, 6, 5.7, 5.3, 5.3, 5.7, 6.5, 4.6, 4.6];

// creating a scale from data above should give us the following domain
const MIN = min(data);
const MAX = max(data);
const domain = [MIN, MAX];

test("create a scale object for a LinearScale", () => {
  // creates a scale
  const scale = new LinearScale(data).getScale();
  expect(typeof scale).toBe("function");

  // check domain is created correctly
  const domain = scale.domain();
  expect(domain).toContain(MIN);
  expect(domain).toContain(MAX);
});
