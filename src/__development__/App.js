import React         from "react";
import { Component } from "react";
import { hot }       from "react-hot-loader";
//import { GGPLOT }    from "../GGPLOT/";
//import { Points }    from "../Points/";
//import { FACETS }    from "../FACETS/";
import mpg           from "./Data/mpg.json";

class App extends Component {
    state = {
        data: mpg,
        aes: ["displ", "hwy"],
        dim: { w: window.innerWidth*0.8, h: window.innerHeight*0.9, p: 50 }
    }

    render(){
        return(
            <h1>Hello</h1>
        );
    }
}

let Application;

if(process.env.NODE_ENV === "development")
    Application = hot(module)(App);
else
    Application = App;

export default Application;
