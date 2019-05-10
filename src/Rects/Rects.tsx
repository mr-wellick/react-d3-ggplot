import React from "react";
import { useContext } from "react";
import { useScale } from "../_hooks/";
import { ChartContext } from "../_context/";

interface IProps {
  fill?: string;
}

function Rects(props: IProps) {
  const context = useContext(ChartContext);
  const xScale: any = useScale(context, "XAxis");
  const yScale: any = useScale(context, "YAxis");

  // will change once we start testing
  if (!xScale || !yScale) {
    return <h1>whoops</h1>;
  }

  return (
    <g>
      {context.data.map((datum, index) => (
        <rect
          key={index}
          width={xScale.bandwidth()} // this works for ordinal scales but we need to account for time and number scales as well
          height={yScale.range()[0] - yScale(datum[context.aes[1]])}
          x={xScale(datum[context.aes[0]])}
          y={yScale(datum[context.aes[1]])}
          fill={!props.fill ? "cyan" : props.fill}
        />
      ))}
    </g>
  );
}

export default Rects;
