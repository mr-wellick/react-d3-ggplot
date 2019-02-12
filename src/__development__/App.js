import React           from "react";
import { Component }   from "react";
import { GGPLOT }      from "../GGPLOT/";
import { Points }      from "../Points/";
import { Line }      from "../Line/";
import { Rects }     from "../Rects/";
import { GEOM_POINTS } from "../GEOM_POINTS/";
import mpg             from "./Data/mpg.json";
import { hot }         from "react-hot-loader";

class App extends Component{
    state = {
        data: mpg,
        aes: ["displ", "hwy"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.8,
            padding: 50
        },
        className: "points" // GEOM_POINTS uses to selects Points node to color code points. (change this)
    }

    resize = () => this.setState({
        dimensions: {
            ...this.state.dimensions,
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.8
        }
    });

    render(){
        if(this.state.data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <GGPLOT { ...this.state }>
                <Points/>
                {/*
                    <Rects/>
                    <GEOM_POINTS var_name="year"/>
                    <Line/>
                */}
            </GGPLOT>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);

        //fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y")
        //    .then(res => res.json())
        //    .then(data => {
        //        const formatData = data.map(item => ({
        //            ...item,
        //            date: new Date(item.date)
        //        }));
        //        this.setState({ data: formatData });
        //    });
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
