class Planet {
    private numOfStars = 150
    private minMagnitude = 2;
    private maxMagnitude = 18;
    private saturation = 0.09;
    private luminous = 1;

    asterisms: Array<Asterism> = new Array<Asterism>();
    stars: Array<Star> = new Array<Star>();

    constructor(
        public width: number,
        public height: number
        ) {

        this.createStars();
        this.findAsterisms();
    }

    findStar(predicate: (star: Star) => boolean): Star {
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            if (predicate(star))
                return star;
        }
        return null;
    }

    moveStars() {
        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i].position.x = Random.range(0, this.width);
            this.stars[i].position.y = Random.range(0, this.height);
        }
        this.findAsterisms();
    }

    private createStars() {
        for (var i = 0; i < this.numOfStars; i++) {
            this.stars.push(this.createStar());
        }
    }

    private createStar() {
        var x = Random.range(0, this.width);
        var y = Random.range(0, this.height);
        var rotation = Random.perimeterDegree();
        var magnitude = Random.range(this.minMagnitude, this.maxMagnitude);
        var color: Color;
        color = new Color(Random.perimeterDegree(), this.saturation, this.luminous);

        return new Star(new Vector2(x, y), rotation, color, magnitude);
    }

    private findAsterisms() {
        var center = new Vector2(this.width / 2, this.height / 2);
        this.asterisms = new Array<Asterism>();
        this.asterisms.push(this.findAsterism((star) => star.position.x < center.x && star.position.y < center.y));
        this.asterisms.push(this.findAsterism((star) => star.position.x > center.x && star.position.y < center.y));
        this.asterisms.push(this.findAsterism((star) => star.position.x < center.x && star.position.y > center.y));
        this.asterisms.push(this.findAsterism((star) => star.position.x > center.x && star.position.y > center.y));
    }

    private findAsterism(firstStarPredicate: (star: Star) => boolean) {
        return new Asterism(this, this.findStar(firstStarPredicate));
    }
}

class PlanetDrawer {
    constructor(
        private ctx: CanvasRenderingContext2D,
        public starDrawer: StarDrawer,
        public asterismDrawer: AsterismDrawer
        ) { }

    draw(planet: Planet) {
        planet.stars.forEach((star, i, stars) => this.starDrawer.draw(star));
        planet.asterisms.forEach((asterism, i, asterisms) => this.asterismDrawer.draw(asterism));
    }
}