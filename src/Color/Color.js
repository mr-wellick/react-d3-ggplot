import React           from "react";
import { Component }   from "react";
import { Fragment }    from "react";
import PropTypes       from "prop-types";
import uniq            from "lodash.uniq";
import { select }      from "d3-selection";
import { scaleBand }   from "d3-scale";
import { legendColor } from "d3-svg-legend";
import { format }      from "d3-format";
import { transition }  from "d3-transition";

class Color extends Component{
    static propTypes = {
        data: PropTypes.array,
        subset: PropTypes.string,
        className: PropTypes.string
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
        const { className, subset } = this.props;
        const fills                 = this.determineFillColor();

        select(`.${className}`)
            .selectAll("circle")
            .attr("fill", d => {

                const colorToUse = fills.filter(item => item["subset"] === d[subset]);
                return colorToUse[0]["fill"];
            });

        this.createLegend(fills);
    }

    createLegend(colors){
        const { chartClassName }     = this.props;
        const { dimensions, subset } = this.props;

        // create scale
        const legendValues  = colors.map(item => item.subset);
        const scale         = scaleBand().domain(legendValues);
        const legendColors  = colors.map(item => item.fill);

        // get rid of previous legend
        if((select(".legendOrdinal")._groups[0][0] !== null))
        {
            select(".legendOrdinal").remove();
            select(".text-info").remove();
        }

        // append new group for legend
        select(`.${chartClassName}`)
            .append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", `translate(${dimensions.width*0.9 - dimensions.padding}, ${dimensions.padding + 15})`);

        select(`.${chartClassName}`)
            .append("text")
            .attr("class", "text-info")
            .text(`${subset}`)
            .attr("transform", `translate(${dimensions.width*0.9 - dimensions.padding}, ${dimensions.padding})`);

        // create scale for legend
        const colorLegend = legendColor().scale(scale);

        // append new legend
        select(".legendOrdinal")
            .call(colorLegend)
            .selectAll("rect")
            .attr("fill", (value, index) => legendColors[index]);
    }

    render(){
        return(
            <Fragment></Fragment>
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
