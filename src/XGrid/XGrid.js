import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { ScalesConsumer } from "../Context/";
import { select }         from "d3-selection";
import { axisBottom }     from "d3-axis";

class XGrid extends Component {
    static contextType = ScalesConsumer;

    static propTypes = {
        createScaleType: PropTypes.func
    }

    createXGridLines(){
        // create new xScale
        const { aes, scaleTypes } = this.context;
        const xScale              = this.props.createScaleType(aes[0], scaleTypes[0]);

        const { dimensions } = this.context;
        const axisPosition   = `translate(0, ${(dimensions.height - dimensions.padding)})`;
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        // append XGrid lines
        select(this.node)
            .attr("class", "x-grid")
            .attr("transform", axisPosition)
            .call(
                axisBottom(xScale)
                .ticks()
                .tickSize(-(dimensions.height - dimensions.padding*2))
                .tickFormat("")
            );

        // color lines
        select(".x-grid")
            .selectAll("line")
            .attr("stroke", "lightgrey");
    }

    render(){
        return(
            <g
                ref={ node => this.node = node }
            >
            </g>
        );
    }

    componentDidMount(){
        this.createXGridLines();
    }

    componentDidUpdate(){
        this.createXGridLines();
    }
}

export default XGrid;
