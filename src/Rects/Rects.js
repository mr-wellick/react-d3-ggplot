import React            from "react";
import { useContext }   from "react";
import { useEffect }    from "react";
import { useRef }       from "react";
import { select }       from "d3-selection";
import { useScale }     from "../_hooks/";
import { ChartContext } from "../_context/";

function Rects(props){
    const node    = useRef(null);
    const context = useContext(ChartContext);
    const xScale  = useScale(context, "XAxis");
    const yScale  = useScale(context, "YAxis");

    useEffect(() => {
        // clear graph for next set of data points if we have data
        if(node.current.children.length > 0)
            select(this.node).selectAll("rect").remove();

        // append new visualization
        select(node.current)
            .selectAll("rect")
            .data(context.data)
            .enter()
            .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale.range()[0] - yScale(d[context.aes[1]]))
            .attr("x", d => xScale(d[context.aes[0]]))
            .attr("y", d => yScale(d[context.aes[1]]))
            .attr("fill", "black")
            .attr("opacity", "0.6");
    });

    return(
        <g ref={ node }>
        </g>
    );
}

export default Rects;
