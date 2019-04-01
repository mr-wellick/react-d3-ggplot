import { createContext } from "react";

const ChartContext = createContext({
    data: [],
    aes: [],
    dim: {}
});

export default ChartContext;
