import React, { Component } from "react";
import "./home.scss";

class Home extends Component{
    state = {
        greeting: "Hello"
    }

    render(){
        return(
            <section className="home">
                <h1>{ this.state.greeting }, welcome to your new React app.</h1>
            </section>
        );
    }
}

export default Home;
