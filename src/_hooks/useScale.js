function useScale(context, componentName) {
    const keyToUse = (componentName === "XAxis" || componentName === "XGrid") ? context.aes[0] : context.aes[1];
    const values   = context.data.map(item => item[keyToUse]);
}

export default useScale;
