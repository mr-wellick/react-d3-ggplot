import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import uniq            from "lodash.uniq";
import { select }      from "d3-selection";
import { scaleBand }   from "d3-scale";
import { legendColor } from "d3-svg-legend";
import { transition }  from "d3-transition"; // needed for legendColor.

class Color extends Component{
    static propTypes = {
        data: PropTypes.array,
        subset: PropTypes.string,
        chartType: PropTypes.string,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            padding: PropTypes.number
        })
    }

    generateRandomHEXValue(){
        return "#000000".replace(/0/g, () => (~~(Math.random()*16)).toString(16) );
    }

    getUniqueItems(){
        const { data, subset }  = this.props;
        const objectItems       = data.map(item => item[subset]);
        const uniqueObjectItems = uniq(objectItems);

        return uniqueObjectItems;
    }

    determineFillColor(){
        const objectItems = this.getUniqueItems();
        const colors      = objectItems.map(item => ({ subset: item, fill: this.generateRandomHEXValue() }));

        return colors;
    }

    colorCodeNodes(){
        const { chartType, subset } = this.props;
        const fills                 = this.determineFillColor();

        select(`.${chartType}`)
            .selectAll("circle")
            .attr("fill", d => {

                const colorToUse = fills.filter(item => item["subset"] === d[subset]);
                return colorToUse[0]["fill"];
            });

        this.createLegend(fills);
    }

    createLegend(colors){
        const { dimensions, subset } = this.props;

        // create scale
        const legendValues  = colors.map(item => item.subset);
        const scale         = scaleBand().domain(legendValues);
        const legendColors  = colors.map(item => item.fill);

        // get rid of previous legend
        if(this.node.children.length > 0)
        {
            select(this.node).select("g").remove();
            select(this.node).select("text").remove();
        }

        // move "g" to right side of graph
        select(this.node)
            .attr("transform", `translate(${dimensions.width*0.9 - dimensions.padding}, ${dimensions.padding + 15})`);

        // append text
        select(this.node)
            .append("text")
            .text(`${subset}`)
            .attr("transform", "translate(0,-15)"); // give a little padding to label

        // create scale for legend
        const colorLegend = legendColor().scale(scale);

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
        this.colorCodeNodes();
    }

    componentDidUpdate(){
        this.colorCodeNodes();
    }
}

export default Color;
