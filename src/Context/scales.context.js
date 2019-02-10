import React from "react";

const ScalesContext = React.createContext({
    data: [],
    aes: [],
    scalesTypes: [],
    dimensions: {},
    className: ""
});

export const ScalesProvider = ScalesContext.Provider;
export const ScalesConsumer = ScalesContext.Consumer;
