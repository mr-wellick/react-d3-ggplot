import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import uniq               from "lodash.uniq";
import { select }         from "d3-selection";
//import { scaleBand }      from "d3-scale";
//import { legendColor }    from "d3-svg-legend";
//import { transition }     from "d3-transition"; // needed for legendColor.
import { ScalesConsumer } from "../Context/";
import { randomHEXColor } from "../Utilities/";

class GEOM_POINTS extends Component{
    static contextType = ScalesConsumer;

    static propTypes = {
        color: PropTypes.string
    }

    getUniqueCategories(){
        const { data }  = this.context;
        const { color } = this.props;

        // get all unique entries of variable that we'll use to subset
        const categoriesToSubsetBy = data.map(item => item[color]);
        const uniqueCategories     = uniq(categoriesToSubsetBy);

        return uniqueCategories;
    }

    getColorCombo(){
        const objectItems = this.getUniqueCategories();
        const colorCombo  = objectItems.map(item => ({ color: item, fill: randomHEXColor() }));

        return colorCombo;
    }

    colorCodePoints(){
        const { className } = this.context;
        const { color }     = this.props;
        const colorCombo    = this.getColorCombo();

        select(`.${className}`)
            .selectAll("circle")
            .attr("fill", d => {
                const colorToUse = colorCombo.filter(item => item["color"] === d[color]);
                return colorToUse[0]["fill"];
            });

        //this.createLegend(fills);
    }

    //createLegend(colors){
    //    const { dimensions, subset } = this.props;

    //    // create scale
    //    const legendValues  = colors.map(item => item.subset);
    //    const scale         = scaleBand().domain(legendValues);
    //    const legendColors  = colors.map(item => item.fill);

    //    // get rid of previous legend
    //    if(this.node.children.length > 0)
    //    {
    //        select(this.node).select("g").remove();
    //        select(this.node).select("text").remove();
    //    }

    //    // move "g" to right side of graph
    //    select(this.node)
    //        .attr("transform", `translate(${dimensions.width*0.9 - dimensions.padding}, ${dimensions.padding + 15})`);

    //    // append text
    //    select(this.node)
    //        .append("text")
    //        .text(`${subset}`)
    //        .attr("transform", "translate(0,-15)"); // give a little padding to label

    //    // create scale for legend
    //    const colorLegend = legendColor().scale(scale);

    //    // append new legend
    //    select(this.node)
    //        .call(colorLegend)
    //        .selectAll("rect")
    //        .attr("paddingBottom", "10px")
    //        .attr("fill", (value, index) => legendColors[index]);
    //}

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
    }

    componentDidUpdate(){
        this.colorCodePoints();
    }
}

export default GEOM_POINTS;
