import { LinearScale } from "../utilities/";
import { IContext } from "../_context/";
import { Numeric } from "d3-array";

function XorYScale(context: IContext, componentName: string) {
  const { data, aes } = context;

  if (componentName === "XAxis" || componentName === "XGrid") {
    if (typeof data[0][aes[0]] === "number") {
      const xValues: Numeric[] = data.map(data => data[aes[0]]);
      const scale = new LinearScale(xValues).getScale();

      return scale;
    }
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    if (typeof data[1][aes[1]] === "number") {
      const yValues: Numeric[] = data.map(data => data[aes[1]]);
      const scale = new LinearScale(yValues).getScale();

      return scale;
    }
  }
}

function useScale(context: IContext, componentName: string) {
  const { dimensions } = context;
  const scale = XorYScale(context, componentName);

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
