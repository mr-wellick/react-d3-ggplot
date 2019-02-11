import React               from "react";
import { Component }       from "react";
import PropTypes           from "prop-types";
import { line }            from "d3-shape";
import { curveCatmullRom } from "d3-shape";
import { select }          from "d3-selection";
import { ScalesConsumer }  from "../Context/";

class Line extends Component {
    static contextType = ScalesConsumer;

    static defaultProps = {
        color: "orange",
        lineWidth: 1
    }

    static propTypes = {
        color: PropTypes.string,
        lineWidth: PropTypes.number,
        createScaleType: PropTypes.func
    }

    createLine() {
        const { aes } = this.context;
        const xScale  = this.props.createScaleType(aes[0]);
        const yScale  = this.props.createScaleType(aes[1]);

        // spreads our points across our x and y axes visually
        const { dimensions } = this.context;
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        // create line for chart
        const chartLine = line()
            .x(d => xScale(d[aes[0]]))
            .y(d => yScale(d[aes[1]]))
            .curve(curveCatmullRom);

        return chartLine;
    }

    appendLine() {
        const { color, lineWidth } = this.props;
        const { data }             = this.context;
        const lineToAppend         = this.createLine();

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
