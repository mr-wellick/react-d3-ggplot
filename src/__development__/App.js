import React          from "react";
import { useState }   from "react";
//import { useEffect }  from "react";
//import { GGPLOT }     from "../GGPLOT/";
//import { GEOMS }      from "../GEOMS/";
import { FACETS }     from "../FACETS/";
//import { Background } from "../Background/";
//import { XGrid }      from "../XGrid/";
//import { YGrid }      from "../YGrid/";
//import { XAxis }      from "../XAxis/";
//import { YAxis }      from "../YAxis/";
//import { Line }       from "../Line/";
import { Points }     from "../Points/";
//import { Rects }      from "../Rects/";
import mpg            from "./Data/mpg.json";
import { nest }       from "d3-collection";

function formatData(){
    const subset  = nest().key(d => d["year"]).entries(mpg);
    const rawData = subset.map(item => item["values"]);

    return rawData;
}

function App() {
    const [state] = useState({
        data: formatData(),
        aes: ["displ", "hwy"],
        dimensions:
        {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9,
            padding: 50
        }
    });


    return(
        <div style={{ display: "flex", justifyContent: "center" }}>
            <FACETS { ...state }>
                <Points/>
            </FACETS>
        </div>
    );
}

export default App;
