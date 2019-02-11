import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { ScalesConsumer } from "../Context/";

class Points extends Component {
    static contextType = ScalesConsumer;

    static defaultProps = {
        color: "orange",
        radius: 3,
        //opacity: 0.5
    }

    static propTypes = {
        color: PropTypes.string,
        radius: PropTypes.number,
        opacity: PropTypes.number,
        createScaleType: PropTypes.func
    }

    appendCircles(){
        // get x and y scales
        const { aes } = this.context;
        const xScale  = this.props.createScaleType(aes[0]);
        const yScale  = this.props.createScaleType(aes[1]);

        // all props needed for points
        const { color, radius, }   = this.props;
        const { data, dimensions } = this.context;

        // spreads our points across our x and y axes visually
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        // clear graph for next set of data points
        if(this.node.children.length > 0)
            select(this.node).selectAll("circle").remove();

        // append new points
        select(this.node)
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[aes[0]]))
            .attr("cy", d => yScale(d[aes[1]]))
            .attr("r", radius)
            .attr("fill", color);
    }

    render(){

        return(
            <g
                ref={ node => this.node = node }
                className={ this.context.className }
            >
            </g>
        );
    }

    componentDidMount(){
        this.appendCircles();
    }

    componentDidUpdate(){
        this.appendCircles();
    }
}

export default Points;
