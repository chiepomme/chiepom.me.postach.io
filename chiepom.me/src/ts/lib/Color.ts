class Color {
    constructor(
        public h: number = 0,
        public s: number = 0,
        public v: number = 0,
        public a: number = 1
        ) {
    }

    get css(): string {
        var C = this.v * this.s;
        var H = this.h / 60;
        var X = C * (1 - Math.abs((H % 2) - 1));
        var m = this.v - C;
        if (H < 1)
            return Color.buildRGBString(C + m, X + m, 0 + m, this.a);
        else if (H < 2)
            return Color.buildRGBString(X + m, C + m, 0 + m, this.a);
        else if (H < 3)
            return Color.buildRGBString(0 + m, C + m, X + m, this.a);
        else if (H < 4)
            return Color.buildRGBString(0 + m, X + m, C + m, this.a);
        else if (H < 5)
            return Color.buildRGBString(X + m, 0 + m, C + m, this.a);
        else if (H < 6)
            return Color.buildRGBString(C + m, 0 + m, X + m, this.a);
    }

    static buildRGBString(r: number, g: number, b: number, a: number) {
        if (a >= 1)
            return "rgb({r},{g},{b})".format({
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255),
            });

        else
            return "rgba({r},{g},{b},{a)".format({
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255),
                a: a,
            });
    }
}