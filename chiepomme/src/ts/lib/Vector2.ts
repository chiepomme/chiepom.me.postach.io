class Vector2 {
    constructor(
        public x: number = 0,
        public y: number = 0
        ) { }

    get length(): number {
        return Math.pow(this.x * this.x + this.y * this.y, 0.5);
    }

    get normalized(): Vector2 {
        var length = this.length;
        return new Vector2(this.x / length, this.y / length);
    }

    multiply(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
}