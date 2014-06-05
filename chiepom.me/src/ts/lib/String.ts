interface String {
    format(hash: any): string;
}

String.prototype.format = function (hash) {
    return (<string>this).replace(/\{([^{}]+)\}/g, (substring, group) => hash[group]);
};