import { createContext } from "react";

const ChartContext = createContext({
    data: [],
    aes: [],
    dimensions: {}
});

export default ChartContext;
