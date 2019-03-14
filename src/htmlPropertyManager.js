'use strict';

function removeStyle(node, styleTag) {
    if (node.style.removeProperty) {
        node.style.removeProperty(styleTag);
    } else {
        node.style.removeAttribute(styleTag);
    }
}

function addStyle(node, styleTag, value) {
    if (node.style.setProperty) {
        node.style.setProperty(styleTag, value);
    } else {
        node.style.setAttribute(styleTag, value);
    }
}

function removeProperty(node, attr) {
    if (node.removeProperty) {
        node.removeProperty(attr);
    } else {
        node.removeAttribute(attr);
    }
}

function setProperty(node, attr, value) {
    if (node.setProperty) {
        node.setProperty(attr, value);
    } else {
        node.setAttribute(attr, value);
    }
}

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className = (ele.className + " " + cls).trim();
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,'');
    }
}

export {
    removeStyle,
    addStyle,
    removeProperty,
    setProperty,
    hasClass,
    addClass,
    removeClass,
};

export default {
    removeStyle,
    addStyle,
    removeProperty,
    setProperty,
    hasClass,
    addClass,
    removeClass,
};
