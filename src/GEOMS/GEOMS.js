import React            from "react";
import PropTypes        from "prop-types";
import { ChartContext } from "../_context/";

function GEOMS(props) {
        return(
            <ChartContext.Provider value={ props }>
                <svg width={ props.dimensions.width } height={ props.dimensions.height }>
                    { props.children }
                </svg>
            </ChartContext.Provider>
        );
}

GEOMS.propTypes = {
    dimensions: PropTypes.object,
    children: PropTypes.any
};

export default GEOMS;
