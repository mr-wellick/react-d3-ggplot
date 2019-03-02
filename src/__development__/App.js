import React         from "react";
import { Component } from "react";
import { hot }       from "react-hot-loader";
//import { GGPLOT }    from "../GGPLOT/";
//import { FACETS }    from "../FACETS/";
//import { nest }      from "d3-collection";
import { Background } from "../Background/";
import { XGrid }     from "../XGrid/";
import { YGrid }     from "../YGrid/";
import { GEOMS }     from "../GEOMS/";
import { XAxis }     from "../XAxis/";
import { YAxis }     from "../YAxis/";
import { Points }    from "../Points/";
import mpg           from "./Data/mpg.json";

class App extends Component {

    //formatData(){
    //    // this subsets our data by year (there are two years in our dataset: 1999 and 2008)
    //     const subset = nest().key(d => d["cyl"]).entries(mpg);

    //     // here, we want only the rawData. This returns an array with two arrays. One array
    //     // for each category. Since we have two years, 1999 & 2008, we have two arrays.
    //     const rawData = subset.map(item => item["values"]);

    //    return rawData;
    //}

    state = {
        data: mpg,
        aes: ["displ", "hwy"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9,
            padding: 50
        }
    }

    resize = () => this.setState({
        dimensions: {
            ...this.state.dimensions,
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9
        }
    });

    render(){
        if(this.state.data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <GEOMS { ...this.state }>
                <Background/>
                <XGrid/>
                <YGrid/>
                <XAxis/>
                <YAxis/>
                <Points/>
            </GEOMS>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);
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
