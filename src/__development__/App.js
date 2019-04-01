import React         from "react";
import { useState }  from "react";
import { useEffect } from "react";
import { GGPLOT }    from "../GGPLOT/";
import { GEOMS }     from "../GEOMS/";
import { Background } from "../Background/";
import { XGrid }     from "../XGrid/";
import { YGrid }     from "../YGrid/";
import { XAxis }     from "../XAxis/";
import { YAxis }     from "../YAxis/";
import { Line }      from "../Line/";
import { Points }    from "../Points/";
import { Rects }     from "../Rects/";
//import mpg           from "./Data/mpg.json";

function App() {
    const [state, setState] = useState({
        data: [],
        aes: ["date", "close"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9,
            padding: 50
        }
    });

    useEffect(() => {
        fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y")
            .then(res => res.json())
            .then(data => {
                // format date to JS date objects
                const formattedData = data.map(item => ({
                    ...item,
                    date: new Date(item.date)
                }));
                // update state with correctly formatted data
                setState({
                    ...state,
                    data: formattedData
                });
            });
    }, []);

    if(state.data.length === 0)
        return <h1>Loading...</h1>;

    return(
        <GEOMS { ...state }>
            <Background/>
            <XAxis/>
            <YAxis/>
            <YGrid/>
            <XGrid/>
            <Line/>
        </GEOMS>
    );
}

export default App;
