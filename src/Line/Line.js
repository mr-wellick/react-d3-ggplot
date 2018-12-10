import React               from "react";
import { Component }       from "react";
import PropTypes           from "prop-types";
import { line }            from "d3-shape";
import { curveCatmullRom } from "d3-shape";
import { select }          from "d3-selection";
import { scaleFinder }     from "../Utilities/";

class Line extends Component {
    static defaultProps = {
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: null,
        color: "orange",
        lineWidth: 1
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
        lineWidth: PropTypes.number
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

        if(scaleTypes[0] === "linear")
            xScale = scaleObj.getLinearScale().nice();

        if(scaleTypes[0] === "time")
            xScale = scaleObj.getTimeScale().nice();

        //if(scaleType === "ordinal")
        //    xScale = scaleObj.getOrdinalScale(); // .nice() method not available

        // set scale range
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        return xScale;
    }

    getYScale() {
        // get y-values
        const { data, aes } = this.props;
        const yValues       = data.map(item => item[aes[1]]);

        // create xScale
        let scaleObj  = new scaleFinder(yValues);

        return scaleObj;
    }

    getYScaleType() {
        const { scaleTypes, dimensions } = this.props;
        const scaleObj                   = this.getYScale();
        let yScale;

        if(scaleTypes[1] === "linear")
            yScale = scaleObj.getLinearScale().nice();

        if(scaleTypes[1] === "time")
            yScale = scaleObj.getTimeScale().nice();

        //if(scaleType === "ordinal")
        //    yScale = scaleObj.getOrdinalScale(); // .nice() method not available

        // set scale range
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        return yScale;
    }

    createLine() {
        const { aes } = this.props;
        const xScale  = this.getXScaleType();
        const yScale  = this.getYScaleType();

        // create line for chart
        const chartLine = line()
            .x(d => xScale(d[aes[0]]))
            .y(d => yScale(d[aes[1]]))
            .curve(curveCatmullRom);

        return chartLine;
    }

    appendLine() {
        const { data, color, lineWidth } = this.props;
        const lineToAppend               = this.createLine();

        // append line to plot
        select(this.node)
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", lineWidth)
            .attr("d", lineToAppend);
    }

    render() {
        return(
            <g className={ this.props.className }>
                <path
                    ref={ node => this.node = node }
                />
            </g>
        );
    }

    componentDidMount() {
        this.appendLine();
    }

    componentDidUpdate() {
        this.appendLine();
    }
}

export default Line;
