import React         from "react";
import { Component } from "react";
import { Fragment }  from "react";
import { select }    from "d3-selection";
import uniq          from "lodash.uniq";

class Color extends Component{

    determineFillColor(){
        const { data, subset } = this.props;
        const objectKeys       = uniq(data.map(item => item[subset]));

        // randomly generate N colors
        const colors = objectKeys.map(() =>
            "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})
        );

        const pairs = [];

        for(let i = 0; i < objectKeys.length; i++)
            pairs.push({ subset: objectKeys[i], fill: colors[i] });

        return pairs;
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
