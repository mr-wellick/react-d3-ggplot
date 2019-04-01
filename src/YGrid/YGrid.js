import React            from "react";
import { useContext }   from "react";
import { useRef }       from "react";
import { useEffect }    from "react";
import { useScale }     from "../_hooks/";
import { ChartContext } from "../_context/";
import { select }       from "d3-selection";
import { axisLeft }     from "d3-axis";

function YGrid(props) {
    const node    = useRef(null);
    const context = useContext(ChartContext);
    const scale   = useScale(context, YGrid.name);

    useEffect(() => {
        // find location of grid lines
        const { dimensions } = context;
        const axisPosition   = `translate(${dimensions.padding}, 0)`;

        // append YGrid lines
        select(node.current)
            .attr("transform", axisPosition)
            .call(
                axisLeft(scale)
                .ticks(4)
                .tickSize(-(dimensions.width - dimensions.padding*2))
                .tickFormat("")
            );

        // color grid lines
        select(node.current)
            .selectAll("g")
            .selectAll("line")
            .attr("stroke", "rgb(255, 255, 255)");

        // temp fix
        select(node.current)
            .select("path")
            .attr("stroke", "rgb(255, 255, 255)");

    });

    return(
        <g ref={ node }>
        </g>
    );
}

export default YGrid;
