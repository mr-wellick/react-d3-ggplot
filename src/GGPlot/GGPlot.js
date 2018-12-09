import React              from "react";
import { Component }      from "react";
import { ScalesProvider } from "../ReactContext/ScaleFinderContext.js";
import { ScalesConsumer } from "../ReactContext/ScaleFinderContext.js";
import { scaleFinder }    from "../Utilities/";
import { axisBottom }     from "d3-axis";
import { select }         from "d3-selection";

class XAxis extends Component {
    static contextType = ScalesConsumer;

    getXScaleType(){
        const { dimensions, scaleTypes, scaleObj } = this.context;
        let xScale;

        if(scaleTypes[0] === "linear")
            xScale = scaleObj.getLinearScale().nice();

        if(scaleTypes[0] === "time")
            xScale = scaleObj.getTimeScale().nice();

        // set scale range
        xScale.range([dimensions.padding, dimensions.width - dimensions.padding]);

        return xScale;
    }

    findXAxis(){
        const { dimensions } = this.context;
        const xScale         = this.getXScaleType();
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
                className={ this.context.className }
            >
            </g>
        );
    }

    componentDidMount(){
        if(this.context.scaleObj !== null)
            this.findXAxis();
    }

    componentDidUpdate(){
        if(this.context.scaleObj !== null)
            this.findXAxis();
    }
}


class GGPLOT extends Component {
    state = {
        data: this.props.data,
        aes: this.props.aes,
        scaleTypes: this.props.scaleTypes,
        dimensions: this.props.dimensions,
        scaleObj: null,
        className: this.props.className
    }

    getXScale(){
        // get props and aesthetic to render
        const { data, aes } = this.props;

        // get x-values
        const xValues  = data.map(item => item[aes[0]]);
        const scaleObj = new scaleFinder(xValues);

        return scaleObj;
    }

    render() {
        const { dimensions } = this.state;

        return(
            <svg width={ dimensions.width } height={ dimensions.height }>
                <ScalesProvider value={ this.state }>
                    <XAxis/>
                </ScalesProvider>
            </svg>
        );
    }

    componentDidMount() {
        this.setState({
            scaleObj: this.getXScale(this.state.data)
        });
    }
}

export default GGPLOT;
