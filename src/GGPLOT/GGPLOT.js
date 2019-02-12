import React              from "react";
import { Component }      from "react";
import PropTypes          from "prop-types";
import { ScalesProvider } from "../Context/";
import { WithScales }     from "../WithScales/";
import { XAxis }          from "../XAxis/";
import { YAxis }          from "../YAxis/";
import { XGrid }          from "../XGrid/";
import { YGrid }          from "../YGrid/";

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
        className: PropTypes.string,
        children: PropTypes.any
    }

    render(){
        const { dimensions, className } = this.props;

        return(
            <svg width={ dimensions.width } height={ dimensions.height } className={ className }>
                {/* used as background color */}
                <rect
                    width={ dimensions.width - dimensions.padding*2 }
                    height={ dimensions.height - dimensions.padding*2 }
                    fill="rgb(232, 232, 232)"
                    transform={ `translate(${dimensions.padding}, ${dimensions.padding})` }
                />

                {/* main graph */}
                <ScalesProvider value={ this.props }>
                    <WithScales>
                        {({ createScaleType }) => (
                        <>
                            <XAxis createScaleType={ createScaleType }/>
                            <XGrid createScaleType= { createScaleType }/>
                            <YAxis createScaleType={ createScaleType }/>
                            <YGrid createScaleType={ createScaleType }/>

                            {/*
                              * Here, we clone each child passed into <GGPLOT/> to
                              * get acces to createScaleType so that <GGPLOT/> is modular
                            */}
                            {React.Children.map(this.props.children, child => {
                                return React.cloneElement(child, {
                                    createScaleType: createScaleType
                                });
                            })}
                        </>
                        )}
                    </WithScales>
                </ScalesProvider>
            </svg>
        );
    }
}

export default GGPLOT;
