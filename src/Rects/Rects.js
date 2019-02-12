import React              from "react";
import PropTypes          from "prop-types";
import { Component }      from "react";
import { select }         from "d3-selection";
import { ScalesConsumer } from "../Context/";

class Rects extends Component{
    static contextType = ScalesConsumer;

    static defaultProps = {
        className: null,
        color: "black",
        opacity: 1 
    }

    static propTypes = {
        className: PropTypes.string,
        color: PropTypes.string,
        opacity: PropTypes.any,
        createScaleType: PropTypes.func
    }

    appendRects(){
        // create x and y scales
        let { aes } = this.context;
        let xScale  = this.props.createScaleType(aes[0], "XAxis"); // We need to pass in XAxis & YAxis to
        let yScale  = this.props.createScaleType(aes[1], "YAxis"); // properly display the rects visually

        // get other props needed for rects
        let { data }           = this.context;
        let { color, opacity } = this.props;

        // clear graph for next set of data points if we have data
        if(this.node.children.length > 0)
            select(this.node).selectAll("rect").remove();

        // append new visualization
        select(this.node)
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale.range()[0] - yScale(d[aes[1]]))
            .attr("x", d => xScale(d[aes[0]]))
            .attr("y", d => yScale(d[aes[1]]))
            .attr("fill", color)
            .attr("opacity", opacity);
    }

    render(){
        return(
            <g
                ref={ node => this.node = node }
                className={ this.props.className }
            >
            </g>
        );
    }

    componentDidMount(){
        this.appendRects();
    }

    componentDidUpdate(){
        this.appendRects();
    }
}

export default Rects;
