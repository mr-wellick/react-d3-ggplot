import React           from "react";
import { Component }   from "react";
import PropTypes       from "prop-types";
import { nest }        from "d3-collection";
//import { stack }       from "d3-shape";
//import { scaleLinear } from "d3-scale";
//import { scaleTime }   from "d3-scale";
//import { scaleBand }   from "d3-scale";

class Stacks extends Component {

    static propTypes = {
        data: PropTypes.array,
        dimensions: PropTypes.object,
        aes: PropTypes.array
    }

    getScale(){
        const subset = nest()
            .key(d => d.manufacturer)  // retrieves all unique manufacturers and their corresponding data
            .entries(this.props.data); // pass in the data

        // data after subsetting
        console.log("Data after subsetting\n", subset);

        // data after only accessing the raw data only
        console.log("Data after accessing only the raw data\n",subset.map(item => item["values"]));
    }

    render(){
        this.getScale();
        return null;
    }
}

export default Stacks;
