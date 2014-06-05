class LazyResizer {
    private timerHandle: number;

    constructor(
        private handler: () => void,
        private resizeWaitMs: number = 300
        ) {

        window.addEventListener("resize", () => {
            clearTimeout(this.timerHandle);
            this.timerHandle = setTimeout(handler, this.resizeWaitMs);
        });
    }
}