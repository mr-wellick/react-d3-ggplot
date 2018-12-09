import React         from "react";
import { Component } from "react";
import { hot }       from "react-hot-loader";
import { XAxis }     from "./XAxis/";
import { YAxis }     from "./YAxis/";
import { Line }      from "./Line/";
import { GGPLOT }    from "./GGPlot/";

class App extends Component{
    state = {
        data: [],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        }
    }

    render(){
        const { dimensions, data } = this.state;

        if(data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <>
                <GGPLOT
                    data={ data }
                    aes={ ["date", "close"] }
                    scaleTypes={ ["time", "linear"] }
                    dimensions={ dimensions }
                />
                {/*
                <svg
                    width={ dimensions.width }
                    height={ dimensions.height }
                    className="svg-chart__aapl"
                >
                    <XAxis
                        data={ data }
                        scaleType="time"
                        aes="date"
                    />
                    <YAxis
                        data={ data }
                        scaleType="linear"
                        aes="close"
                    />
                    <Line
                        data={ data }
                        scaleTypes={ ["time", "linear"] }
                        aes={ ["date", "close"] }
                    />
                </svg>
                */}
            </>

        );
    }

    componentDidMount(){
        if(!localStorage.getItem("data"))
        {
            fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y")
                .then(response => response.json())
                .then(data => {
                    const formattedData = data.map(item => ({
                        ...item,
                        date: new Date(item.date)
                    }));

                    this.setState({ data: formattedData });
                    localStorage.setItem("data", JSON.stringify(data));
                });
        }
        else
        {
            this.setState({
                data: JSON
                        .parse(localStorage.getItem("data"))
                        .map(item => ({
                            ...item,
                            date: new Date(item.date)
                        }))
            });
        }
    }
}

let Application;

if(process.env.NODE_ENV === "development")
    Application = hot(module)(App);
else
    Application = App;

export default Application;
