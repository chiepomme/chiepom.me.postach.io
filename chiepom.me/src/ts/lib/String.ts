interface String {
    format(hash: any): string;
}

String.prototype.format = (hash) => {
    return (<string>this).replace(/\{([^{}]+)\}/g, (substring, group) => hash[group]);
};