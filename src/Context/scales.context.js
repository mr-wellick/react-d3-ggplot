import React from "react";

const ScalesContext = React.createContext({
    data: [],
    aes: [],
    scalesTypes: [],
    dimensions: {}
});

export const ScalesProvider = ScalesContext.Provider;
export const ScalesConsumer = ScalesContext.Consumer;