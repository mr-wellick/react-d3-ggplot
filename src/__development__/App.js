import React         from "react";
import { Component } from "react";
import { GGPLOT }    from "../GGPLOT/";
//import { Points }    from "../Points/";
//import { Line }      from "../Line/";
import { Rects }     from "../Rects/";
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
                data={ data.slice(0, 10) }
                aes={ ["displ", "hwy"] }
                scaleTypes={ ["ordinal", "linear"] }
                dimensions={ dimensions }
            >
                <Labels
                    x_lab="displ"
                    y_lab="hwy"
                />
                <Rects/>
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