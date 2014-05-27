class Star {
    x: number;
    y: number;
    size: number = 10;
}

class MathUtil {
    static TwoPI: number = Math.PI * 2;
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

    constructor() {
        this.canvas = document.createElement("canvas");
        var style = this.canvas.style;
        style.position = "fixed";
        style.top = "0";
        style.left = "0";
        style.zIndex = "-2";

        this.ctx = this.canvas.getContext("2d");
        this.cover = document.createElement("div");
        this.cover.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
        this.cover.style.zIndex = "-1";
        this.cover.style.position = "fixed";

        this.fitToWindow();

        document.body.appendChild(this.canvas);
        document.body.appendChild(this.cover);

        this.draw();

        // delayed resize
        window.addEventListener("resize", () => {
            clearTimeout(this.timerHandler);
            this.timerHandler = setTimeout(() => {
                this.fitToWindow();
                this.draw();
            }, this.resizeWaitMs);
        });
    }

    draw(): void {

        for (var i = 0; i < 150; i++) {
            var x = Random.Range(0, this.canvas.width);
            var y = Random.Range(0, this.canvas.height);
            var innerRadius = Random.Range(3, 8);
            var outerRadius = innerRadius * 1.8;
            var angle = MathUtil.TwoPI / 5;
            var halfAngle = angle / 2;
            var angleOffset = Random.Range(0, MathUtil.TwoPI);
            this.ctx.beginPath();

            for (var a = 0; a < MathUtil.TwoPI; a += angle) {
                var an = a + angleOffset + Random.Range(-0.1, 0.1);
                var sx = x + Math.cos(an) * outerRadius;
                var sy = y + Math.sin(an) * outerRadius;
                this.ctx.lineTo(sx, sy);
                an += halfAngle + Random.Range(-0.1, 0.1);
                sx = x + Math.cos(an) * innerRadius;
                sy = y + Math.sin(an) * innerRadius;
                this.ctx.lineTo(sx, sy);
            }

            this.ctx.closePath();
            this.ctx.strokeStyle = "#EEEEEE";
            this.ctx.fillStyle = "#EEEEEE";
            if (Math.random() > 0.7)
                this.ctx.stroke();
            else
                this.ctx.fill();

        }
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