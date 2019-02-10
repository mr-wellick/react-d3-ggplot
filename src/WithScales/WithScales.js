import React              from "react";
import { Component }      from "react";
import { scaleFinder }    from "../Utilities/";
import { ScalesConsumer } from "../Context/";

class WithScales extends Component {
    static contextType = ScalesConsumer;

   createScale = (aes) => {
        // get data and value to be used for either x or y value
        const { data } = this.context;

        // get values for new scale
        const values   = data.map(item => item[aes]);
        const scaleObj = new scaleFinder(values);

        return scaleObj;
    }

    createScaleType = (aes, scaleType) => {
        const { dimensions } = this.context;
        const scaleObj       = this.createScale(aes);
        let scale;

        if(scaleType === "linear")
            scale = scaleObj.getLinearScale().nice();

        if(scaleType === "time")
            scale = scaleObj.getTimeScale().nice();

        if(scaleType === "ordinal")
            scale = scaleObj.getOrdinalScale(0.5); // .nice() method not available

        return scale;
    }

    propCollections(){
        return {
            createScaleType: this.createScaleType
        };
    }

    render(){
        return(
            this.props.children(this.propCollections())
        );
    }
}

export default WithScales;