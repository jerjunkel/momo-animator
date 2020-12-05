export default class Momo {
    constructor() {
        throw Error("Use the init method");
    }
    static init(options = { duration: 1000, delay: 0, curve: "linear" }) {
        // Check for option properties
        let { duration, delay, curve } = options;
        if (!duration)
            duration = 1000;
        if (!delay)
            delay = 0;
        if (!curve)
            curve = "linear";
        Momo.options = { curve, duration, delay };
    }
}
