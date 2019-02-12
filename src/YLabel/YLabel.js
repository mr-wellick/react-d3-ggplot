import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { ScalesConsumer } from "../Context/";

class YLabel extends Component{
    static contextType = ScalesConsumer;

    static propTypes = {
        y_lab: PropTypes.string
    }

    addYLabel(){
        const { dimensions, aes } = this.context;
        const y_lab               = this.props.y_lab || aes[1];

        // remove old text nodes before updating
        if(this.node.children.length > 0)
            select(this.node).selectAll("text").remove();

        select(this.node)
            .append("text")
            .attr("x", dimensions.padding*0.5)
            .attr("y", (dimensions.height/2))
            .text(y_lab);
    }

    render(){
        const { dimensions } = this.context;

        return(
            <svg
                width={ dimensions.width*0.1 }
                height={ dimensions.height }
                ref={ node => this.node = node }
            >
                <text></text>
            </svg>
        );
    }

    componentDidMount(){
        this.addYLabel();
    }

    componentDidUpdate(){
        this.addYLabel();
    }
}


export default YLabel;
