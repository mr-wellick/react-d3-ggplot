import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import { select }      from "d3-selection";
import { axisBottom }  from "d3-axis";
import { scaleFinder } from "../Utilities/";

class XAxis extends Component{
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
        aes: PropTypes.string
    }


    getXScale(){
        // get props and aesthetic to render ( x-vaue )
        const { data, aes } = this.props;

        // get x-values
        const xValues  = data.map(item => item[aes]);
        const scaleObj = new scaleFinder(xValues);

        return scaleObj;
    }

    getScaleType(){
        const { dimensions, scaleType } = this.props;
        const scaleObj                  = this.getXScale();
        let xScale;

        if(scaleType === "linear")
            xScale = scaleObj.getLinearScale().nice();

        if(scaleType === "time")
            xScale = scaleObj.getTimeScale().nice();

        //if(scaleType === "ordinal")
        //    xScale = scaleObj.getOrdinalScale(); // .nice() method not available

        // set scale range
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        return xScale;
    }

    findXAxis(){
        const { dimensions } = this.props;
        const xScale         = this.getScaleType();
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