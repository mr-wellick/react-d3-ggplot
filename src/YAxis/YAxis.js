import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { ScalesConsumer } from "../Context/";
import { select }         from "d3-selection";
import { axisLeft }       from "d3-axis";

class YAxis extends Component {
    static contextType = ScalesConsumer;

    static propTypes = {
        createScaleType: PropTypes.func.isRequired
    }

    findYAxis(){
        // first create scale object
        const { aes }       = this.context;
        const componentName = this.constructor.name;
        const yScale        = this.props.createScaleType(aes[1], componentName);

        // append y-axis to left
        const { dimensions } = this.context;
        const axisLocation   = `translate(${dimensions.padding}, 0)`;

        // Append y-axis
        select(this.node)
            .attr("transform", axisLocation)
            .call(axisLeft(yScale));

        // color y-axis
        select(this.node)
            .select("path")
            .attr("stroke", "rgb(255, 255, 255)");
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
