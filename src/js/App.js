import "./app.scss";
import React          from "react";
import { Component }  from "react";
import { Fragment }   from "react";
import { hot }        from "react-hot-loader";
import { Home }       from "./Views";

class App extends Component{
    render(){
        return(
            <Fragment>
                <Home/>
            </Fragment>
        );
    }
}

let Application;

if(process.env.NODE_ENV === "development")
    Application = hot(module)(App);
else
    Application = App;

export default Application;
