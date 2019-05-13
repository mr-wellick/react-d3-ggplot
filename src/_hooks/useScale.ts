import { useContext } from "react";
import { ChartContext } from "../_context/";
import { LinearScale } from "../utilities/";
import { TimeScale } from "../utilities/";
import { OrdinalScale } from "../utilities/";
import { IContext } from "../_context/";
import { Numeric } from "d3-array";

// D3 is strict with its typing info. Thus, we are creating a new variable for each case:
// Numeric[], Date[], String[]. Will change this later once I figure out how to abstract these details.
// Once we rewirte the logic below, this will make our codebase more maintaible and scalable
function XorYScale(context: IContext, componentName: string) {
  const { data, aes } = context;

  if (componentName === "XAxis" || componentName === "XGrid") {
    if (typeof data[0][aes[0]] === "number") {
      const xValues: Numeric[] = data.map(data => data[aes[0]]);
      const scale = new LinearScale(xValues).getScale();

      return scale;
    } else if (typeof data[0][aes[0]] === "object") {
      const xValues: Date[] = data.map(data => data[aes[0]]);
      const scale = new TimeScale(xValues).getScale();

      return scale;
    } else if (typeof data[0][aes[0]] === "string") {
      const xValues: string[] = data.map(data => data[aes[0]]);
      const scale = new OrdinalScale(xValues).getScale(0.5); // will make argument modular later

      return scale;
    }
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    if (typeof data[1][aes[1]] === "number") {
      const yValues: Numeric[] = data.map(data => data[aes[1]]);
      const scale = new LinearScale(yValues).getScale();

      return scale;
    } else if (typeof data[1][aes[1]] === "object") {
      const yValues: Date[] = data.map(data => data[aes[1]]);
      const scale = new TimeScale(yValues).getScale();

      return scale;
    } else if (typeof data[1][aes[1]] === "string") {
      const yValues: string[] = data.map(data => data[aes[1]]);
      const scale = new OrdinalScale(yValues).getScale(0.5); // will make argument modular later

      return scale;
    }
  }
}

function useScale(componentName: string) {
  const context = useContext(ChartContext);
  const scale = XorYScale(context, componentName);
  const { dimensions } = context;

  if (componentName === "XAxis" || componentName === "XGrid") {
    if (scale !== undefined) {
      scale.range([dimensions.padding, dimensions.width - dimensions.padding]);
    }
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    if (scale !== undefined) {
      scale.range([dimensions.height - dimensions.padding, dimensions.padding]);
    }
  }

  return scale;
}

export default useScale;
