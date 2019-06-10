import React from "react";
import { useContext } from "react";
import { useXScale } from "../_hooks/";
import { useYScale } from "../_hooks/";
import { ChartContext } from "../_context/";

interface IProps {
  fill?: string;
}

Rects.displayName = "Rects";

function Rects(props: IProps) {
  const { data, aes, dimensions } = useContext(ChartContext);
  const xScale: any = useXScale();
  const yScale: any = useYScale();
  let width: any;

  if (!dimensions) {
    throw new Error("Dimensions not specified");
  }

  if (typeof data[0][aes[0]] === "string") {
    width = xScale.bandwidth();
  }
  // this two cases shouldn't be used by the user. these lead to unreadable charts.
  // however, this code is here so we don't crash
  else if (typeof data[0][aes[0]] === "number") {
    console.warn(
      "If the domain of your x-values is large, this will result in unreadable charts. Consider a different graph."
    );
    width = dimensions.width / xScale.ticks().length - dimensions.padding;
  } else if (typeof data[0][aes[0]] === "object") {
    console.warn(
      "If the domain of your x-values is large, this will result in unreadable charts. Consider a different graph."
    );
    width = dimensions.width / xScale.ticks().length - dimensions.padding;
  }

  // If we have negative values, adjust Rects accordingly
  const [yMin, yMax] = yScale.domain();

  if ((yMin < 0 || yMax < 0) && !(yMin < 0 && yMax < 0)) {
    return (
      <g>
        {data.map((datum, index) => (
          <rect
            key={index}
            width={width}
            height={Math.abs(yScale(datum[aes[1]]) - yScale(0))}
            x={xScale(datum[aes[0]])}
            y={yScale(Math.max(0, datum[aes[1]]))}
            fill={!props.fill ? "cyan" : props.fill}
          />
        ))}
      </g>
    );
  }
  // if we have only positive values, we don't do anything special
  else {
    return (
      <g>
        {data.map((datum, index) => (
          <rect
            key={index}
            width={width}
            height={yScale.range()[0] - yScale(datum[aes[1]])}
            x={xScale(datum[aes[0]])}
            y={yScale(datum[aes[1]])}
            fill={!props.fill ? "cyan" : props.fill}
          />
        ))}
      </g>
    );
  }
}

export default Rects;
