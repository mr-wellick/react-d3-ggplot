import React            from "react";
import PropTypes        from "prop-types";
import { ChartContext } from "../_context/";
import { XAxis }        from "../XAxis/";
import { YAxis }        from "../YAxis/";

function GGPLOT(props) {
        return(
            <ChartContext.Provider value={ props }>
                <svg width={ props.dimensions.width } height={ props.dimensions.height }>
                    <XAxis/>
                    <YAxis/>
                </svg>
            </ChartContext.Provider>
        );
}

GGPLOT.propTypes = {
    dimensions: PropTypes.object
};

export default GGPLOT;
