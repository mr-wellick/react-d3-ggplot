import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import { scaleFinder } from "../Utilities/";
import { select }      from "d3-selection";

class Points extends Component {
    static defaultProps = {
         dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: null,
        color: "orange",
        radius: 1
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
        aes: PropTypes.array,
        color: PropTypes.string,
        radius: PropTypes.number
    }

    getXScale(){
        // get data and x and y value pair
        const { data, aes } = this.props;

        // convert data to a scale to be used for our x-values
        const xValues  = data.map(item => item[aes[0]]);
        const scaleObj = new scaleFinder(xValues);

        return scaleObj;
    }

    getXScaleType(){
        const { dimensions, scaleTypes } = this.props;
        const scaleObj                   = this.getXScale();
        let xScale;

        // find appropiate scale
        if(scaleTypes[0] === "linear")
            xScale = scaleObj.getLinearScale().nice();

        if(scaleTypes[0] === "time")
            xScale = scaleObj.getTimeScale().nice();

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

    appendCircles(){
        // scales
        const xScale            = this.getXScaleType();
        const yScale            = this.getYScaleType();

        // all props needed for points
        const { color, radius } = this.props;
        const { data, aes }     = this.props;

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
                className={ this.props.className }
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
