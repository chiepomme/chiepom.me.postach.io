interface Number {
    degreeToRadian(): number;
    radianToDegree(): number;
    clamp(min: number, max: number): number;
    clamp01(): number;
}

Number.prototype.degreeToRadian = function () { return this * Math.PI / 180 }
Number.prototype.radianToDegree = function () { return this * 180 / Math.PI; }
Number.prototype.clamp = function (min, max) { return Math.min(Math.max(this, min), max); }
Number.prototype.clamp01 = function () { return (<number>this).clamp(0, 1); }