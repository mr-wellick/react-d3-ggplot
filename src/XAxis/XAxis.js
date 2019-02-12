import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { axisBottom }     from "d3-axis";
import { ScalesConsumer } from "../Context/";

class XAxis extends Component{
    static contextType = ScalesConsumer;

    static propTypes = {
        createScaleType: PropTypes.func.isRequired
    }

    findXAxis(){
        // first create scale object
        const { aes }       = this.context;
        const componentName = this.constructor.name;
        const xScale        = this.props.createScaleType(aes[0], componentName);

        // ajust x-axis to bottom
        const { dimensions } = this.context;
        const axisLocation   = `translate(0, ${dimensions.height - dimensions.padding})`;

        // select node returned by component and appends x-axis
        select(this.node)
            .attr("transform", axisLocation)
            .call(axisBottom(xScale));
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
        this.findXAxis();
    }

    componentDidUpdate(){
        this.findXAxis();
    }
}

export default XAxis;
