function objectFilter(obj, predicate) {
    var rv = Object.assign({}, obj);
    for (var key in rv) {
        if (obj.hasOwnProperty(key)) {
            if (!predicate(key, obj[key]))
                delete rv[key];
        }
    }
    return rv;
}

export { objectFilter };
export default { objectFilter: objectFilter };