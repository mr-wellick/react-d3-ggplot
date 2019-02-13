import React           from "react";
import { Component }   from "react";
import { hot }         from "react-hot-loader";
//import { GGPLOT }      from "../GGPLOT/";
import { GEOM_POINTS } from "../GEOM_POINTS/";
import { Points }      from "../Points/";
import mpg             from "./Data/mpg.json";

// create multiple charts by category
import { FACETS }      from "../FACETS/";
import { nest }        from "d3-collection";

class App extends Component {

    formatData(){
        const subset = nest().key(d => d["year"]).entries(mpg).map(item => item["values"]);
        return subset;
    }

    state = {
        data: this.formatData(),
        aes: ["displ", "hwy"],
        dimensions:
        {
            width: window.innerWidth*0.4,
            height: window.innerHeight*0.6,
            padding: 50
        },
        className: "points" // GEOM_POINTS uses to selects Points node to color code points. (change this)
    }

    resize = () => this.setState({
        dimensions: {
            ...this.state.dimensions,
            width: window.innerWidth*0.4,
            height: window.innerHeight*0.6
        }
    });

    render(){
        if(this.state.data.length === 0)
            return <h1>No data to render.</h1>;

        return(
            <div style={{ display: "flex", justifyContent: "center" }}>
                <FACETS { ...this.state }>
                    <Points/>
                    <GEOM_POINTS var_name="class"/>
                </FACETS>
            </div>
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
