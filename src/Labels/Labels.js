import React         from "react";
import { Component } from "react";
import PropTypes     from "prop-types";
import { select }    from "d3-selection";

class Labels extends Component{
    static propTypes = {
        labels: PropTypes.array,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            padding: PropTypes.number
        })
    }

    addXLabel(){
        const { dimensions } = this.props;
        let { labels }       = this.props;

        select(this.node)
            .append("text")
            .attr("x", (dimensions.width - dimensions.padding*2))
            .attr("y", (dimensions.height - dimensions.padding*1.2))
            .text(labels[0]);
    }

    addYLabel(){
        let { dimensions } = this.props;
        let { labels }     = this.props;

        select(this.node)
            .append("text")
            .attr("x", dimensions.padding*1.2)
            .attr("y", dimensions.padding*1.2)
            .text(labels[1]);
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
