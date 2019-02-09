import React         from "react";
import { Component } from "react";
import PropTypes     from "prop-types";
import { XAxis }     from "../XAxis/";
import { YAxis }     from "../YAxis/";

class GGPLOT extends Component{
    static propTypes = {
        data: PropTypes.array,
        aes: PropTypes.array,
        scaleTypes: PropTypes.array,
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            padding: PropTypes.number
        }),
        className: PropTypes.string
    }

    render(){
        const { data, aes, scaleTypes, dimensions, className } = this.props;

        return(
            <svg width={ dimensions.width } height={ dimensions.height } className={ className }>
                <XAxis
                    data={ data }
                    aes={ aes[0] }
                    scaleType={ scaleTypes[0] }
                    dimensions={ dimensions }
                />
                <YAxis
                    data={ data }
                    aes={ aes[1] }
                    scaleType={ scaleTypes[1] }
                    dimensions={ dimensions }
                />
                { this.props.children }
            </svg>
        );
    }
}

export default GGPLOT;
