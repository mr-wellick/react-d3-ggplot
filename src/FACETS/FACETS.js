import React         from "react";
import { Component } from "react";
import { Fragment }  from "react";
import { GGPLOT }    from "../GGPLOT/";

class FACETS extends Component {
    render(){
        // keep datasets with 10 or more entries
        const new_data = this.props.data.filter(dataset => dataset.length >= 10);

        return(
            <Fragment>
                {
                    new_data.map((dataset, index)=> (
                        <GGPLOT
                            { ...this.props }
                            key={ index }
                            data={ dataset }
                            className={ this.props.className + "_" + index }
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
