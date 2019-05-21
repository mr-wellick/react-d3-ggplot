import { useContext } from "react";
import { ChartContext } from "../_context/";
import { Numeric } from "d3-array";
import { LinearScale } from "../utilities/";
import { TimeScale } from "../utilities/";
import { OrdinalScale } from "../utilities/";

function setYScaleRange(scale: any) {
  const { dimensions } = useContext(ChartContext);

  if (scale !== undefined) {
    scale.range([dimensions.height - dimensions.padding, dimensions.padding]);
  }

  return scale;
}

function useYScale() {
  const { data, aes } = useContext(ChartContext);

  if (typeof data[1][aes[1]] === "number") {
    const yValues: Numeric[] = data.map(data => data[aes[1]]);
    let scale = new LinearScale(yValues).getScale();
    scale = setYScaleRange(scale);

    return scale;
  } else if (typeof data[1][aes[1]] === "object") {
    const yValues: Date[] = data.map(data => data[aes[1]]);
    let scale = new TimeScale(yValues).getScale();
    scale = setYScaleRange(scale);

    return scale;
  } else if (typeof data[1][aes[1]] === "string") {
    const yValues: string[] = data.map(data => data[aes[1]]);
    let scale = new OrdinalScale(yValues).getScale(0.5); // will make argument modular later
    scale = setYScaleRange(scale);

    return scale;
  }
}

export default useYScale;
