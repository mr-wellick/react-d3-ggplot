import React         from "react";
import { Component } from "react";
import { render }    from "react-dom";
import { hot }       from "react-hot-loader";
import { XAxis }     from "./XAxis/";
import { YAxis }     from "./YAxis/";
import { Points }    from "./Points/";

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
            <svg
                width={ dimensions.width }
                height={ dimensions.height }
            >
                <XAxis
                    data={ data }
                    aes="date"
                    scaleType="time"
                />
                <YAxis
                    data={ data }
                    aes="close"
                    scaleType="linear"
                />
                <Points
                    data={ data }
                    aes={ ["date", "close"] }
                    scaleTypes={ ["time", "linear"] }
                />
            </svg>
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

const Application = hot(module)(App);

render(<Application/>, window.document.querySelector(".app"));