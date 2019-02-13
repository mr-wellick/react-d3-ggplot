import React           from "react";
import { Component }   from "react";
import { hot }         from "react-hot-loader";
import { GGPLOT }      from "../GGPLOT/";
import { Rects }       from "../Rects/";
//import mpg             from "./Data/mpg.json";

class App extends Component {
    state = {
        data: [],
        aes: ["symbol", "marketCap"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.6,
            padding: 50
        },
        className: "points" // GEOM_POINTS uses to selects Points node to color code points. (change this)
    }

    resize = () => this.setState({
        dimensions: {
            ...this.state.dimensions,
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.6
        }
    });

    render(){
        if(this.state.data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <GGPLOT { ...this.state }>
                <Rects/>
            </GGPLOT>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);

        Promise
            .all(
                ["aapl", "tsla", "ibm", "nflx"]
                .map(stock =>
                    fetch(`https://api.iextrading.com/1.0/stock/${stock}/quote`)
                    .then(res => res.json())
                )
            )
            .then(data => this.setState({ data }));
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }
}

let Application;

if(process.env.NODE_ENV === "development")
    Application = hot(module)(App);
else
    Application = App;

export default Application;
