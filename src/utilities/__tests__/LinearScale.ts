import LinearScale from "../LinearScale";
import { Numeric } from "d3-array";

// testing data for linear scale
const data: Numeric[] = [1.8, 1.8, 2, 2, 5.7, 6, 5.7, 5.3, 5.3, 5.7, 6.5, 4.6, 4.6];

test("initialization of LinearScale", () => {
  const scale = new LinearScale(data);
});
