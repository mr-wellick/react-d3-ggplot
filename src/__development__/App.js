import React        from "react";
import { useState } from "react";
import { GGPLOT }   from "../GGPLOT/";
import { Points }   from "../Points/";
import mpg          from "./Data/mpg.json";

function App() {
    const [state] = useState({
        data: mpg,
        aes: ["displ", "hwy"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9,
            padding: 50
        }
    });

    return(
        <GGPLOT { ...state }>
            <Points/>
        </GGPLOT>
    );
}

export default App;
