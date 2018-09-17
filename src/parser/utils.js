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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

var getDocument = function(html, tagType) {
    var doc = document.createElement(tagType || 'template');
    doc.innerHTML = html;
    return doc;
}

export { objectFilter, uuidv4, getDocument };
export default { objectFilter: objectFilter, uuidv4: uuidv4, getDocument: getDocument };