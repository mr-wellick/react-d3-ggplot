import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { ScalesProvider } from "../Context/";
import { WithScales }     from "../WithScales/";
import { XAxis }          from "../XAxis/";
import { YAxis }          from "../YAxis/";

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
        const { dimensions, className } = this.props;

        return(
            <svg width={ dimensions.width } height={ dimensions.height } className={ className }>
                <ScalesProvider value={ this.props }>
                    <WithScales>
                        {({ createScaleType })=> (
                        <>
                            <XAxis createScaleType={ createScaleType }/>
                            <YAxis createScaleType={ createScaleType }/>
                        </>
                        )}
                    </WithScales>
                    { this.props.children }
                </ScalesProvider>
                    {/*
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
                    */}
            </svg>
        );
    }
}

export default GGPLOT;