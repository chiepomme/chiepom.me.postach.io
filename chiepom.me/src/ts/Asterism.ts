class Asterism {
    stars = new Array<Star>();

    constructor(private planet: Planet, firstStar: Star) {
        this.findAndCollectNextStar(planet, 0, firstStar);
    }

    findAndCollectNextStar(planet: Planet, starCount: number, star: Star, previousStar: Star = null): void {
        this.stars.push(star);

        var nextStar = planet.findStar((candidate) => {
            var distance = candidate.position.subtract(star.position).length;
            return 20 < distance && distance < 100 && candidate != previousStar;
        });

        if (nextStar == null || starCount > 6) return;

        this.findAndCollectNextStar(planet, starCount + 1, nextStar, star);
    }
}

class AsterismDrawer {
    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(asterism: Asterism) {
        asterism.stars.forEach((star, i, stars) => {
            if (i == 0) return;
            var from = stars[i - 1];
            var to = stars[i];

            var bridgeVector = to.position.subtract(from.position);
            var unitVector = bridgeVector.normalized;
            var start = from.position.add(unitVector.multiply(20));
            var end = start.add(unitVector.multiply(bridgeVector.length - 40));

            this.ctx.beginPath();
            this.ctx.moveTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.strokeStyle = new Color(0, 0, 0.9).css;
            this.ctx.stroke();
        });
    }
}