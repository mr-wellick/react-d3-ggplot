import React              from "react";
import { Component }      from "react";
//import PropTypes          from "prop-types";
import { ScalesConsumer } from "../Context/";
import { select }         from "d3-selection";
import { axisLeft }       from "d3-axis";

class YAxis extends Component {
    static contextType = ScalesConsumer;

    findYAxis(){
        // first create scale object
        const { aes, scaleTypes } = this.context;
        const yScale              = this.props.createScaleType(aes[1], scaleTypes[1]);

        // append y-axis to left
        const { dimensions } = this.context;
        const axisLocation   = `translate(${dimensions.padding}, 0)`;

        // spreads our y-axis visually
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        // Append y-axis
        select(this.node)
            .attr("transform", axisLocation)
            .call(axisLeft(yScale));
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
        this.findYAxis();
    }

    componentDidUpdate(){
        this.findYAxis();
    }
}

export default YAxis;