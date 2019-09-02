import { useContext } from "react";
import { ChartContext } from "../_context/";
import { Numeric } from "d3-array";
import { LinearScale } from "../_utilities/";
import { TimeScale } from "../_utilities/";
import { OrdinalScale } from "../_utilities/";

function setXScaleRange(scale: any) {
  const { dimensions } = useContext(ChartContext);

  if (!dimensions) {
    throw new Error("Dimensions not specified");
  }

  if (scale !== undefined) {
    scale.range([dimensions.padding, dimensions.width - dimensions.padding]);
  }

  return scale;
}

function useXScale() {
  const { data, aes } = useContext(ChartContext);

  if (typeof data[0][aes[0]] === "number") {
    const xValues: Numeric[] = data.map(data => data[aes[0]]);
    let scale = new LinearScale(xValues).getScale();
    scale = setXScaleRange(scale);

    return scale;
  } else if (typeof data[0][aes[0]] === "object") {
    const xValues: Date[] = data.map(data => data[aes[0]]);
    let scale = new TimeScale(xValues).getScale();
    scale = setXScaleRange(scale);

    return scale;
  } else if (typeof data[0][aes[0]] === "string") {
    const xValues: string[] = data.map(data => data[aes[0]]);
    let scale = new OrdinalScale(xValues).getScale(0.5); // will make argument modular later
    scale = setXScaleRange(scale);

    return scale;
  }
}

export default useXScale;
