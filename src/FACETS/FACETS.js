import React         from "react";
import { Component } from "react";
import { Fragment }  from "react";
import { GGPLOT }    from "../GGPLOT/";

class FACETS extends Component {
    render(){
        return(
            <Fragment>
                {
                    this.props.data.map((dataset, index)=> (
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
