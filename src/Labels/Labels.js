import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { select }         from "d3-selection";
import { ScalesConsumer } from "../Context/";

class Labels extends Component{
    static contextType = ScalesConsumer;

    static propTypes = {
        x_lab: PropTypes.string,
        y_lab: PropTypes.string
    }

    addXLabel(){
        const { dimensions,aes } = this.context;
        const x_lab              = this.props.x_lab || aes[0];

        select(this.node)
            .append("text")
            .attr("x", (dimensions.width - dimensions.padding*2))
            .attr("y", (dimensions.height - dimensions.padding*1.2))
            .text(x_lab);
    }

    addYLabel(){
        const { dimensions, aes } = this.context;
        const y_lab               = this.props.y_lab || aes[1];

        select(this.node)
            .append("text")
            .attr("x", dimensions.padding*1.2)
            .attr("y", dimensions.padding*1.5)
            .text(y_lab);
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
        this.addXLabel();
        this.addYLabel();
    }

    componentDidUpdate(){
        // remove old text nodes before updating
        if(this.node.children.length > 0)
            select(this.node).selectAll("text").remove();

        // add new text nodes
        this.addXLabel();
        this.addYLabel();
    }
}

export default Labels;
