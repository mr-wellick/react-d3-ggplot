import React         from "react";
import { Component } from "react";
import { hot }       from "react-hot-loader";
import { GGPLOT }    from "./GGPLOT/";
import { Points }    from "./Points/";
import { Color }     from "./Color/";
import { Labels }    from "./Labels/";
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
