class Star {
    constructor(
        public position = new Vector2(),
        public rotation = 0,
        public color = new Color(),
        public magnitude = 10
        ) { }
}

class StarDrawer {
    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(star: Star) {
        var x = star.position.x;
        var y = star.position.y;
        var innerRadius = star.magnitude * 0.6;
        var outerRadius = star.magnitude;
        var angle = Math.TwoPI / 5;
        var halfAngle = angle / 2;
        var angleOffset = star.rotation.degreeToRadian();

        this.ctx.beginPath();

        for (var a = 0; a < Math.TwoPI; a += angle) {
            var an = a + angleOffset + Random.range(-0.1, 0.1);
            var sx = x + Math.cos(an) * outerRadius;
            var sy = y + Math.sin(an) * outerRadius;
            this.ctx.lineTo(sx, sy);
            an += halfAngle + Random.range(-0.1, 0.1);
            sx = x + Math.cos(an) * innerRadius;
            sy = y + Math.sin(an) * innerRadius;
            this.ctx.lineTo(sx, sy);
        }

        this.ctx.closePath();
        this.ctx.fillStyle = star.color.css;
        this.ctx.fill();
    }
}