import React           from "react";
import PropTypes       from "prop-types";
import { Component }   from "react";
import { select }      from "d3-selection";
import { scaleFinder } from "../Utilities/";

class Rects extends Component{
  static defaultProps = {
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: null,
        color: "orange"
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            padding: PropTypes.number
        }),
        scaleTypes: PropTypes.array,
        className: PropTypes.string,
        aes: PropTypes.array.isRequired,
        color: PropTypes.string
    }

    getXScale(){
        // get props and aesthetic to render
        const { data, aes } = this.props;

        // get x-values
        const xValues  = data.map(item => item[aes[0]]);
        const scaleObj = new scaleFinder(xValues);

        return scaleObj;
    }

    getXScaleType(){
        const { dimensions, scaleTypes } = this.props;
        const scaleObj                   = this.getXScale();
        let xScale;

        if(scaleTypes[0] === "time")
            xScale = scaleObj.getTimeScale();

        if(scaleTypes[0] === "linear")
            xScale = scaleObj.getLinearScale();

        if(scaleTypes[0] === "ordinal")
            xScale = scaleObj.getOrdinalScale(0.5); // .nice() method not available

        // set scale range
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        return xScale;
    }

    getYScale(){
       // get y-values
        const { data, aes } = this.props;
        const yValues       = data.map(item => item[aes[1]]);

        // create xScale
        const scaleObj  = new scaleFinder(yValues);

        return scaleObj;
    }

    getYScaleType(){
        const { scaleTypes, dimensions } = this.props;
        const scaleObj                   = this.getYScale();
        let yScale;

        if(scaleTypes[1] === "linear")
            yScale = scaleObj.getLinearScale().nice();

        if(scaleTypes[1] === "time")
            yScale = scaleObj.getTimeScale().nice();

        if(scaleTypes[1] === "ordinal")
            yScale = scaleObj.getOrdinalScale(0.5); // .nice() method not available

        // set scale range
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        return yScale;
    }

    appendRects(){
        let { data, aes } = this.props;
        let { color }     = this.props;
        let xScale        = this.getXScaleType();
        let yScale        = this.getYScaleType();

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
            .attr("fill", color);
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
