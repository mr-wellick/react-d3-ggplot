import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { scaleBand }      from "d3-scale";
import { legendColor }    from "d3-svg-legend";
import { transition }     from "d3-transition"; // needed for legendColor.
import { ScalesConsumer } from "../Context/";
import { ColorCode }      from "../Utilities/";

class GEOM_POINTS extends Component{
    static contextType = ScalesConsumer;

    static propTypes = {
        var_name: PropTypes.string
    }

    createColorCodes(){
        const { data }     = this.context;
        const { var_name } = this.props;
        const colorCombos  = new ColorCode(data, var_name).getColorCombo();

        return colorCombos;
    }

    colorCodePoints(){
        const colorCombos   = this.createColorCodes();
        const { className } = this.context;
        const { var_name }  = this.props;

        select(`.${className}`)
            .selectAll("circle")
            .attr("fill", data => {

                const colorToUse = colorCombos.filter(pair => pair["category"] === data[var_name])[0];
                return colorToUse["fill"];
            });
    }

    createLegend(){
        // get unique categories to color code points
        const { data }     = this.context;
        const { var_name } = this.props;
        const colorCombos  = new ColorCode(data, var_name).getColorCombo();

        // create scale
        const scale = scaleBand().domain(colorCombos.map(item => item["category"]));

        // get rid of previous legend
        if(this.node.children.length > 0)
        {
            select(this.node).select("g").remove();
            select(this.node).select("text").remove();
        }

        // move "g" tag to right side of graph
        const { dimensions } = this.context;

        select(this.node)
            .attr("transform", `translate(${dimensions.width*0.9 - dimensions.padding}, ${dimensions.padding + 15})`);

        // append text
        select(this.node)
            .append("text")
            .text(`${var_name}`)
            .attr("transform", "translate(0,-15)"); // give a little padding to label

        // create scale for legend
        const legendColors = colorCombos.map(item => item["fill"]);
        const colorLegend  = legendColor().scale(scale);

        // append new legend
        select(this.node)
            .call(colorLegend)
            .selectAll("rect")
            .attr("paddingBottom", "10px")
            .attr("fill", (value, index) => legendColors[index]);
    }

    render(){
        return(
            <g
                ref={ node => this.node = node }
            >
            </g>
        );
    }

    componentDidMount(){
        this.colorCodePoints();
        //this.createLegend();
    }

    componentDidUpdate(){
        this.colorCodePoints();
        //this.createLegend();
    }
}

export default GEOM_POINTS;
