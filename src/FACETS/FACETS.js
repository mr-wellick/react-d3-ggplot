import React         from "react";
import { Component } from "react";
import { Fragment }  from "react";
import { GGPLOT }    from "../GGPLOT/";

class FACETS extends Component {

    checkLengths(){
        const not_enough_data = this.props.data.filter(dataset => dataset.length <= 10);

        return not_enough_data;
    }

    render(){
        // keep datasets with 10 or more entries
        const new_data = this.props.data.filter(dataset => dataset.length >= 10);

        if(this.checkLengths().length > 0)
        {
            console.warn(
                `You have passed in datasets without enough entries.
                Will only keep datasets with 10 or more entries.`
            );
        }

        return(
            <Fragment>
                {
                    new_data.map((dataset, index)=> (
                        <GGPLOT
                            { ...this.props }
                            key={ index }
                            data={ dataset } // override old data with only one dataset
                        >
                            { this.props.children }
                        </GGPLOT>
                    ))
                }
            </Fragment>
        );
    }
}

export default FACETS;
