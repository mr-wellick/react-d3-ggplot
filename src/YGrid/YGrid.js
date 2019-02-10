import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { ScalesConsumer } from "../Context/";
import { select }         from "d3-selection";
import { axisLeft }     from "d3-axis";

class YGrid extends Component {
    static contextType = ScalesConsumer;

    static propTypes = {
        createScaleType: PropTypes.func
    }

    createYGridLines(){
        // create new yScale
        const { aes, scaleTypes } = this.context;
        const yScale              = this.props.createScaleType(aes[1], scaleTypes[1]);

        const { dimensions } = this.context;
        const axisPosition   = `translate(${dimensions.padding}, 0)`;
        yScale.range([(dimensions.height - dimensions.padding), dimensions.padding]);

        // append YGrid lines
        select(this.node)
            .attr("class", "y-grid")
            .attr("transform", axisPosition)
            .call(
                axisLeft(yScale)
                .ticks()
                .tickSize(-(dimensions.width - dimensions.padding*2))
                .tickFormat("")
            );

        // color lines
        select(".y-grid")
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
        this.createYGridLines();
    }

    componentDidUpdate(){
        this.createYGridLines();
    }
}

export default YGrid;
