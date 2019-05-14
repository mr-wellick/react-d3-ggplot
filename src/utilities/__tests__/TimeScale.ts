import TimeScale from "../TimeScale";
import { min, max } from "d3-array";

const data: Date[] = [new Date("2010"), new Date("2020")];
const MIN = min(data);
const MAX = max(data);
const domain = [MIN, MAX];

test("Creates an object to allow us to create TimeScale", () => {
  // create scale
  const scale = new TimeScale(data).getScale();
  expect(typeof scale).toBe("function");

  // check min and max are in domain
  const domain = scale.domain();
  expect(domain).toContainEqual(MIN);
  expect(domain).toContainEqual(MAX);
});
