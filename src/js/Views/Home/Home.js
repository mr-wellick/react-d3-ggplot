import React         from "react";
import { Component } from "react";
import { XAxis }     from "../../Components/";

class Home extends Component{
    state = {
        data: [{ minutes: 4, money: 17 }, { minutes: 20, money: 8 }],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: "svg-chart__aapl"
    }

    render(){
        const { dimensions, data, className } = this.state;

        return(
            <svg
                width={ dimensions.width }
                height={ dimensions.height }
                className={ className }
            >
                <XAxis
                    data={ data }
                    scaleType="linear"
                    aes="minutes"
                />
            </svg>
        );
    }
}

export default Home;
