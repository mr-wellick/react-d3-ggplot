import { ScaleFinder } from "../utilities/";
import { IAppContext } from "../_context/";

function findScale(context: IAppContext, componentName: string) {
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

  const values: any = context.data.map(item => item[keyToUse]);
  const scale = new ScaleFinder(values);

  return scale;
}

function useScale(context: IAppContext, componentName: string) {
  const scale = findScale(context, componentName);

  // find appropiate scale type
  let scaleType;

  if (typeof scale.data[0] === "number") {
    scaleType = scale.getLinearScale();

    if (scaleType) {
      scaleType = scaleType.nice();
    }
  }

  if (typeof scale.data[0] === "object") {
    scaleType = scale.getTimeScale();

    if (scaleType) {
      scaleType = scaleType.nice();
    }
  }

  if (typeof scale.data[0] === "string") {
    scaleType = scale.getOrdinalScale(0.5);
  }

  // we need to visually spread our points
  const { width, height, padding } = context.dimensions;

  if (componentName === "XAxis" || componentName === "XGrid") {
    if (scaleType) {
      scaleType.range([padding, width - padding]);
    }
  } else if (componentName === "YAxis" || componentName === "YGrid") {
    if (scaleType) {
      scaleType.range([height - padding, padding]);
    }
  }

  return scaleType;
}

export default useScale;
