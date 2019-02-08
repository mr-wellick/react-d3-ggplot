import React         from "react";
import { Component } from "react";
import { Fragment }  from "react";
import PropTypes     from "prop-types";
import { select }    from "d3-selection";
import uniq          from "lodash.uniq";

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
