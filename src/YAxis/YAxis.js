import React            from "react";
import { useRef }       from "react";
import { useContext }   from "react";
import { useEffect }    from "react";
import { ChartContext } from "../_context/";
import { useScale }     from "../_hooks/";
import { select }       from "d3-selection";
import { axisLeft }     from "d3-axis";
//import { format }       from "d3-format";

function YAxis(props) {
    const node    = useRef(null);
    const context = useContext(ChartContext);
    const scale   = useScale(context, YAxis.name);

    useEffect(() => {
        const { dimensions } = context;
        const axisLocation   = `translate(${dimensions.padding}, 0)`;

        // select node returned by component and appends y-axis
        select(node.current)
            .attr("transform", axisLocation)
            .call(axisLeft(scale));
    });

    return(
        <g ref={ node }>
        </g>
    );
}

export default YAxis;
