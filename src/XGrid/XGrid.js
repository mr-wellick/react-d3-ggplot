import React            from "react";
import { useContext }   from "react";
import { useRef }       from "react";
import { useEffect }    from "react";
import { useScale }     from "../_hooks/";
import { ChartContext } from "../_context/";
import { select }       from "d3-selection";
import { axisBottom }   from "d3-axis";

function XGrid(props) {
    const node    = useRef(null);
    const context = useContext(ChartContext);
    const scale   = useScale(context, XGrid.name);

    useEffect(() => {
        // find grid line locations
        const { dimensions } = context;
        const axisPosition   = `translate(0, ${(dimensions.height - dimensions.padding)})`;

        // append XGrid lines
        select(node.current)
            .attr("transform", axisPosition)
            .call(
                axisBottom(scale)
                .ticks(4)
                .tickSize(-(dimensions.height - dimensions.padding*2))
                .tickFormat("")
            );

        // color grid lines
        select(node.current)
            .selectAll("g")
            .selectAll("line")
            .attr("stroke", "rgb(255, 255, 255)");
    });

    return(
        <g ref={ node }>
        </g>
    );
}

export default XGrid;
