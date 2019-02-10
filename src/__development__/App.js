import React         from "react";
import { Component } from "react";
import { GGPLOT }    from "../GGPLOT/";
import { Points }    from "../Points/";
//import { Line }      from "../Line/";
//import { Rects }     from "../Rects/";
import { Labels }    from "../Labels/";
import mpg           from "./Data/mpg.json";

class App extends Component{
    state = {
        data: mpg,
        aes: ["displ", "hwy"],
        scaleTypes: ["linear", "linear"],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },

    }

    resize = () => {
        this.setState({
            dimensions: {
                ...this.state.dimensions,
                width: window.innerWidth*0.9,
                height: window.innerHeight*0.9
            }
        });
    }

    render(){
        if(this.state.data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <GGPLOT { ...this.state }>
                <Labels
                    x_lab="displ"
                    y_lab="hwy"
                />
                <Points/>
            </GGPLOT>
        );
    }


    componentDidMount() {
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }
}

export default App;
