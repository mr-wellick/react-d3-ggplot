import React from "react";
import { useContext } from "react";
import { ChartContext } from "../_context/";
import { useXScale } from "../_hooks/";
import { useYScale } from "../_hooks/";

interface IProps {
  r?: number;
  fill?: string;
}

Points.displayName = "Points";

function Points(props: IProps) {
  const context = useContext(ChartContext);
  const xScale: any = useXScale();
  const yScale: any = useYScale();

  // will remove later when testing componet
  if (!xScale || !yScale) {
    return <h1>whoops</h1>;
  }

  return (
    <g>
      {/*
        For the key, we're not supposed to used index because we can't take
        advantage of react's optimization capabilities when it comes to re-rendering.
        Will use key until we can sort this detail out.
      */}
      {context.data.map((datum, index) => (
        <circle
          key={index}
          cx={xScale(datum[context.aes[0]])}
          cy={yScale(datum[context.aes[1]])}
          r={!props.r ? 3 : props.r}
          fill={!props.fill ? "orange" : props.fill}
        />
      ))}
    </g>
  );
}

export default Points;
