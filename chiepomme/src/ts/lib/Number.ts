interface Number {
    degreeToRadian(): number;
    radianToDegree(): number;
    clamp(min: number, max: number): number;
    clamp01(): number;
}

Number.prototype.degreeToRadian = () => this * Math.PI / 180;
Number.prototype.radianToDegree = () => this * 180 / Math.PI;
Number.prototype.clamp = (min, max) => Math.min(Math.max(this, min), max);
Number.prototype.clamp01 = () => (<number>this).clamp(0, 1);