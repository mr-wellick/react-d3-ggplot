import React         from "react";
import { Component } from "react";
import { XAxis }     from "../../Components/";
import "./home.scss";

class Home extends Component{
    state = {
        data: [{ xValue: 4, yValue: 17 }, { xValue: 20, yValue: 8 }],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: "svg-chart__aapl"
    }

    render(){
        const { width, height } = this.state.dimensions;
        const { data, dimensions, className } = this.state;

        return(
            <svg
                width={ width }
                height={ height }
                className={ className }
            >
                <XAxis
                    data={ data }
                    dimensions={ dimensions }
                    scaleType="linear"
                    className={ className + " x-axis" }
                />
            </svg>
        );
    }
}

export default Home;
