import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import { select }      from "d3-selection";
import { axisBottom }  from "d3-axis";
import { scaleFinder } from "../../Utilities/";

class XAxis extends Component{
    static propTypes = {
        data: PropTypes.array,
        dimensions: PropTypes.object,
        scaleType: PropTypes.string,
        className: PropTypes.string
    }

    getXScale(){
        // get props
        let { data } = this.props;

        // get x-values
        let xValues  = data.map(item => item.xValue);
        let scaleObj = new scaleFinder(xValues);

        return scaleObj;
    }

    getScaleType(){
        const { dimensions, scaleType } = this.props;
        const scaleObj                  = this.getXScale();
        let xScale;

        if(scaleType === "time")
            xScale = scaleObj.getTimeScale();

        if(scaleType === "linear")
            xScale = scaleObj.getLinearScale();

        if(scaleType === "ordinal")
            xScale = scaleObj.getOrdinalScale();

        // set scale range
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        return xScale;
    }

    findXAxis(){
        let { dimensions } = this.props;
        let xScale         = this.getScaleType();
        let axisLocation   = `translate(0, ${dimensions.height - dimensions.padding})`;

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
            ></g>
        );
    }

    componentDidMount(){
        this.findXAxis();
    }

    componentDidUpdate(){
        this.findXAxis();
    }
}

//class App extends Component{
//    state = {
//        data: [{xValue: 4, yValue: 7}],
//        dimensions:
//        {
//            width: 500,
//            heigth: 600,
//            padding: 50
//        },
//        className: "svg-chart__aapl"
//    }
//
//    render(){
//        const { width, height } = this.state.dimensions;
//        const { className, data, dimensions } = this.state;
//
//        return(
//            <svg
//                width={ width }
//                height={ height }
//                className={ className }
//            >
//                <XAxis
//                    data={ data }
//                    dimensions={ dimensions }
//                    scaleType="linear"
//                    className={ className + " x-axis" }
//                />
//            </svg>
//        );
//    }
//}

export default XAxis;
