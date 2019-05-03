import { ScaleFinder } from "../utilities/";
import { IAppContext } from "../_context/ChartContext";

function findScale(context: IAppContext<string | number | object>, componentName: string) {
  let keyToUse: string;

  if (componentName === "XAxis" || componentName === "XGrid") {
    keyToUse = context.aes[0];
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    keyToUse = context.aes[1];
  } else {
    throw new Error(
      `Expected one of the following component names: XAxis, YAxis, XGrid, or YGrid. Instead, received the following: ${componentName}.`
    );
  }

  const values: string[] | number[] | object[] = context.data.map(item => item[keyToUse]);
  const scale = new ScaleFinder(values);

  return scale;
}

function useScale(context: IAppContext<string | number | object>, componentName: string) {
  const scale = findScale(context, componentName);

  // find appropiate scale type
  let scaleType;

  if (typeof scale.data[0] === "number") {
    scaleType = scale.getLinearScale().nice();
  }

  if (typeof scale.data[0] === "object") {
    scaleType = scale.getTimeScale().nice();
  }

  if (typeof scale.data[0] === "string") {
    scaleType = scale.getOrdinalScale(0.5);
  }

  // we need to visually spread our points
  const { width, height, padding } = context.dimensions;

  if (componentName === "XAxis" || componentName === "XGrid") {
    scaleType.range([padding, width - padding]);
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    scaleType.range([height - padding, padding]);
  }

  return scaleType;
}

export default useScale;
