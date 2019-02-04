import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import { select }      from "d3-selection";
import { axisLeft }    from "d3-axis";
import { scaleFinder } from "../Utilities/";

class YAxis extends Component {
    static defaultProps = {
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: null,
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            padding: PropTypes.number
        }),
        scaleType: PropTypes.oneOf(["linear", "time", "ordinal"]).isRequired,
        className: PropTypes.string,
        aes: PropTypes.string.isRequired
    }

    getYScale() {
        // get y-values
        const { data, aes } = this.props;
        const yValues       = data.map(item => item[aes]);

        // create xScale
        let scaleObj  = new scaleFinder(yValues);

        return scaleObj;
    }

    getScaleType() {
        const { scaleType, dimensions } = this.props;
        const scaleObj                  = this.getYScale();
        let yScale;

        if(scaleType === "linear")
            yScale = scaleObj.getLinearScale().nice();

        if(scaleType === "time")
            yScale = scaleObj.getTimeScale().nice();

        //if(scaleType === "ordinal")
        //    yScale = scaleObj.getOrdinalScale(0.5); // .nice() method not available

        // set scale range
        yScale.range([dimensions.height - dimensions.padding, dimensions.padding]);

        return yScale;
    }

    findYAxis(){
        const { dimensions } = this.props;
        let yScale           = this.getScaleType();
        let axisLocation     = `translate(${dimensions.padding}, 0)`;

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
