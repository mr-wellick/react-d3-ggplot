import React         from "react";
import { Component } from "react";
import { hot }       from "react-hot-loader";
import { XAxis }     from "./XAxis/";
import { YAxis }     from "./YAxis/";
import { Points }    from "./Points/";
import { Color }     from "./Color/";
import mpg           from "./Data/mpg.json";

class Plot extends Component{
    state = {
        data: mpg,
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
                ref={ node => this.node = node }
            >
                <XAxis
                    data={ mpg }
                    aes="displ"
                    scaleType="linear"
                />
                <YAxis
                    data={ mpg }
                    aes="hwy"
                    scaleType="linear"
                />
                <Points
                    data={ mpg }
                    aes={ ["displ", "hwy"] }
                    scaleTypes={ ["linear", "linear"] }
                    radius={ 3 }
                />
                <Color
                    data={ data }
                    className="points"
                    subset="class"
                />
            </svg>
        );
    }

    //componentDidMount(){
    //    if(!localStorage.getItem("data"))
    //    {
    //        fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y")
    //            .then(response => response.json())
    //            .then(data => {
    //                const formattedData = data.map(item => ({
    //                    ...item,
    //                    date: new Date(item.date)
    //                }));

    //                this.setState({ data: formattedData });
    //                localStorage.setItem("data", JSON.stringify(data));
    //            });
    //    }
    //    else
    //    {
    //        this.setState({
    //            data: JSON
    //                    .parse(localStorage.getItem("data"))
    //                    .map(item => ({
    //                        ...item,
    //                        date: new Date(item.date)
    //                    }))
    //        });
    //    }
    //}
}

const __Plot__ = hot(module)(Plot);

export default __Plot__;
