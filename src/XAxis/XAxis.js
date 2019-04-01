import React            from "react";
import { useRef }       from "react";
import { useContext }   from "react";
import { useEffect }    from "react";
import { ChartContext } from "../_context/";
import { useScale }     from "../_hooks/";
import { select }       from "d3-selection";
import { axisBottom }   from "d3-axis";
//import { format }       from "d3-format";

function XAxis(props) {
    const node    = useRef(null);
    const context = useContext(ChartContext);
    const scale   = useScale(context, XAxis.name);

    useEffect(() => {
        const { dimensions } = context;
        const axisLocation   = `translate(0, ${dimensions.height - dimensions.padding})`;

        // select node returned by component and appends x-axis
        select(node.current)
            .attr("transform", axisLocation)
            .call(axisBottom(scale));
    });


    return(
        <g ref={ node }>
        </g>
    );
}

export default XAxis;
