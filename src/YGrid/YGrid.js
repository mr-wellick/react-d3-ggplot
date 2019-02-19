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
        const { aes } = this.context;
        const yScale  = this.props.createScaleType(aes[1], this.constructor.name);

        // find location of grid lines
        const { dimensions } = this.context;
        const axisPosition   = `translate(${dimensions.padding}, 0)`;

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
            .attr("stroke", "rgb(255, 255, 255)");

        // get rid of black color overlaying y-axis
        select(".y-grid")
            .select("path")
            .attr("stroke", "rgb(255, 255, 255)");
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
