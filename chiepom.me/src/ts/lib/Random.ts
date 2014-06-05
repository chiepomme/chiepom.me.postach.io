class Random {
    static range(from: number, to: number): number {
        return from + Math.random() * (to - from);
    }

    static int(from: number, to: number): number {
        return Math.floor(Random.range(from, to));
    }

    static perimeterDegree(): number {
        return Random.range(0, 360);
    }

    static semiperimeterDegree(): number {
        return Random.range(0, 180);
    }
}