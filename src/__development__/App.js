import React         from "react";
import { Component } from "react";
import { GGPLOT }    from "../GGPLOT/";
import { Points }    from "../Points/";
import { Color }     from "../Color/";
import { Labels }    from "../Labels/";
import mpg           from "./Data/mpg.json";

class App extends Component{
    state = {
        data: mpg,
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        }
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
        const { dimensions, data } = this.state;

        if(data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <GGPLOT
                data={ data }
                aes={ ["displ", "hwy"] }
                scaleTypes={ ["linear", "linear"] }
                dimensions={ dimensions }
            >
                <Labels
                    labels={ ["displ", "hwy"] }
                    dimensions={ dimensions }
                />
                <Points
                    data={ data }
                    aes={ ["displ", "hwy"] }
                    scaleTypes={ ["linear", "linear"] }
                    dimensions={ dimensions }
                />
                <Color
                    data={ data }
                    subset="year"
                    chartType="points"
                    dimensions={ dimensions }
                />
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