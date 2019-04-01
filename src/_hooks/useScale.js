import { ScaleFinder } from "../Utilities/";

function useScale(context, componentName) {
    const keyToUse = (componentName === "XAxis" || componentName === "XGrid") ? context.aes[0] : context.aes[1];
    const values   = context.data.map(item => item[keyToUse]);
    const scale    = new ScaleFinder(values);

    // find appropiate scale type
    let scaleType;

    if( (typeof scale.data[0]) === "number" )
        scaleType = scale.getLinearScale().nice();

    if( (typeof scale.data[0]) === "object" )
        scaleType = scale.getTimeScale().nice();

    if( (typeof scale.data[0]) === "string" )
        scaleType = scale.getOrdinalScale(0.5);

    // we need to visually spread our points
    const { width, height, padding } = context.dimensions;

    if(componentName === "XAxis" || componentName === "XGrid")
    {
        scaleType.range([padding, width - padding]);
    }
    else if(componentName === "YAxis" || componentName === "YGrid")
    {
        scaleType.range([height - padding, padding]);
    }

    return scaleType;
}

export default useScale;
