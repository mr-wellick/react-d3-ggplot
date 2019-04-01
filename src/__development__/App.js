import React         from "react";
import { useState }  from "react";
import { useEffect } from "react";
import { GGPLOT }    from "../GGPLOT/";
//import { Points }    from "../Points/";
import { Line }      from "../Line/";
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

    console.log(state);

    if(state.data.length === 0)
        return <h1>Loading...</h1>;

    return(
        <GGPLOT { ...state }>
            <Line/>
        </GGPLOT>
    );
}

export default App;
