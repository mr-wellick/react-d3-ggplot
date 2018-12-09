import React         from "react";
import { Component } from "react";
import { XAxis }     from "../../Components/";
import { YAxis }     from "../../Components/";
import { Line }      from "../../Components/";

class Home extends Component{
    state = {
        data: [],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9
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

export default Home;
