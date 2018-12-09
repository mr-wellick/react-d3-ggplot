import React from "react";

const ScalesContext = React.createContext({
    xScale: "",
    yScale: "",
    dimensions: {}
});

export const ScalesProvider = ScalesContext.Provider;
export const ScalesConsumer = ScalesContext.Consumer;
