class Vector2 {
    constructor(
        public x: number = 0,
        public y: number = 0
        ) { }

    length(): number {
        return Math.pow(this.x * this.x + this.y * this.y, 0.5);
    }

    getNormalized(): Vector2 {
        var length = this.length();
        return new Vector2(this.x / length, this.y / length);
    }

    multiply(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    add(b: Vector2): Vector2 {
        return new Vector2(this.x + b.x, this.y + b.y);
    }

    subtract(b: Vector2): Vector2 {
        return new Vector2(this.x - b.x, this.y - b.y);
    }
}

class Color {
    constructor(
        public h: number = 0,
        public s: number = 0,
        public v: number = 0,
        public a: number = 1
        ) { }

    toCSSString(): string {
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

    static buildRGBString(r: number, g: number, b: number, a: number): string {
        if (a >= 1)
            return "rgb(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + ")";
        else
            return "rgba(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + "," + a + ")";
    }
}

class Star {
    constructor(
        public position: Vector2 = new Vector2(),
        public rotation: number = 0,
        public color: Color = new Color(),
        public magnitude: number = 10
        ) { }

    draw(ctx: CanvasRenderingContext2D) {
        var x = this.position.x;
        var y = this.position.y;
        var innerRadius = this.magnitude * 0.6;
        var outerRadius = this.magnitude;
        var angle = MathUtil.TwoPI / 5;
        var halfAngle = angle / 2;
        var angleOffset = MathUtil.DegreeToRadian(this.rotation);

        ctx.beginPath();

        for (var a = 0; a < MathUtil.TwoPI; a += angle) {
            var an = a + angleOffset + Random.Range(-0.1, 0.1);
            var sx = x + Math.cos(an) * outerRadius;
            var sy = y + Math.sin(an) * outerRadius;
            ctx.lineTo(sx, sy);
            an += halfAngle + Random.Range(-0.1, 0.1);
            sx = x + Math.cos(an) * innerRadius;
            sy = y + Math.sin(an) * innerRadius;
            ctx.lineTo(sx, sy);
        }

        ctx.closePath();
        ctx.fillStyle = this.color.toCSSString();
        ctx.fill();
    }
}

class MathUtil {
    static TwoPI: number = Math.PI * 2;
    static DegreeToRadian(degree: number): number { return degree * Math.PI / 180; }
    static RadianToDegree(radian: number): number { return radian * 180 / Math.PI; }
}

class Random {
    static Range(from: number, to: number): number {
        return from + Math.random() * (to - from);
    }
}

class Planetarium {
    private cover: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private resizeWaitMs: number = 300;
    private timerHandler: number;

    private stars: Array<Star> = new Array<Star>();

    constructor() {
        this.canvas = document.createElement("canvas");

        this.ctx = this.canvas.getContext("2d");
        this.cover = document.createElement("div");
        this.cover.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
        this.cover.style.zIndex = "-1";
        this.cover.style.position = "fixed";

        this.fitToWindow();

        document.body.appendChild(this.cover);

        for (var i = 0; i < 150; i++) {
            var rotation = Random.Range(0, 360);
            var magnitude = Random.Range(2, 18);
            var color: Color;
            color = new Color(Random.Range(0, 360), 0.09, 1.0);

            this.stars.push(new Star(new Vector2(), rotation, color, magnitude));
        }

        this.draw();
        document.body.style.backgroundImage = "url(" + this.canvas.toDataURL("image/png") + ")";
        document.body.style.backgroundAttachment = "fixed";

        // delayed resize
        window.addEventListener("resize", () => {
            clearTimeout(this.timerHandler);
            this.timerHandler = setTimeout(() => {
                this.fitToWindow();
                this.draw();
                document.body.style.backgroundImage = "url(" + this.canvas.toDataURL("image/png") + ")";
            }, this.resizeWaitMs);
        });
    }

    draw(): void {
        for (var i = 0; i < this.stars.length; i++) {
            var x = Random.Range(0, this.canvas.width);
            var y = Random.Range(0, this.canvas.height);
            this.stars[i].position.x = x;
            this.stars[i].position.y = y;
            this.stars[i].draw(this.ctx);

            if (i == 0) continue;

            this.connect(this.stars[i - 1], this.stars[i]);
        }
    }

    connect(from: Star, to: Star): void {
        var bridgeVector = to.position.subtract(from.position);
        var unitVector = bridgeVector.getNormalized();
        var start = from.position.add(unitVector.multiply(20));
        var end = start.add(unitVector.multiply(bridgeVector.length() - 40));
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }

    fitToWindow(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cover.style.width = document.body.clientWidth + "px";
        this.cover.style.height = document.body.clientHeight + "px";
        this.cover.style.left = window.innerWidth / 2 - document.body.clientWidth / 2 + "px";
        this.cover.style.top = "0";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var planetarium = new Planetarium();
}, false);