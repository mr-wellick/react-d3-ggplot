import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { ScalesConsumer } from "../Context/";

class Points extends Component {
    static contextType = ScalesConsumer;

    static defaultProps = {
        color: "black",
        radius: 3,
        opacity: 1
    }

    static propTypes = {
        color: PropTypes.string,
        radius: PropTypes.number,
        opacity: PropTypes.any,
        createScaleType: PropTypes.func
    }

    appendCircles(){
        // get x and y scales
        const { aes } = this.context;
        const xScale  = this.props.createScaleType(aes[0], "XAxis"); // Here we need to pass in XAxis and YAxis
        const yScale  = this.props.createScaleType(aes[1], "YAxis"); // to spread our points visually, so they are properly displayed

        // all props needed for points
        const { color, radius, opacity } = this.props;
        const { data }                   = this.context;

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
            .attr("fill", color)
            .attr("opacity", opacity);
    }

    render(){

        return(
            <g ref={ node => this.node = node }>
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
