"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValues = exports.getScrollBarWidth = exports.findScrollableParent = exports.axisToProps = exports.axisToAxis = exports.axisToOverflowReverse = exports.axisToOverflow = void 0;
exports.axisToOverflow = {
    vertical: 'overflowY',
    horizontal: 'overflowX'
};
exports.axisToOverflowReverse = {
    vertical: 'overflowX',
    horizontal: 'overflowY'
};
exports.axisToAxis = {
    vertical: 'Y',
    horizontal: 'X'
};
exports.axisToProps = {
    'vertical': {
        scroll: 'scrollTop',
        space: 'clientHeight',
        targetSpace: 'targetHeight',
        scrollSpace: 'scrollHeight',
        start: 'top',
        end: 'bottom',
        coord: 1,
    },
    'horizontal': {
        scroll: 'scrollLeft',
        space: 'clientWidth',
        targetSpace: 'targetWidth',
        scrollSpace: 'scrollWidth',
        start: 'left',
        end: 'right',
        coord: 0,
    }
};
exports.findScrollableParent = function (node, axis) {
    if (axis === void 0) { axis = 'vertical'; }
    if (node === document.body) {
        return node;
    }
    var style = window.getComputedStyle(node);
    var flow = style[exports.axisToOverflow[axis]];
    if (flow === 'hidden' || flow === 'scroll') {
        return node;
    }
    return node.parentNode
        ? exports.findScrollableParent(node.parentNode, axis)
        : node;
};
var scrollbarWidth = -1;
exports.getScrollBarWidth = function () {
    if (typeof document === 'undefined') {
        return 24;
    }
    if (scrollbarWidth < 0) {
        var outer = document.createElement('div');
        var inner = document.createElement('div');
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        outer.appendChild(inner);
        scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        document.body.removeChild(outer);
    }
    return scrollbarWidth;
};
exports.extractValues = function (set, axis) {
    var ax = exports.axisToProps[axis];
    var scrollSpace = set[ax.scrollSpace];
    var space = set[ax.space];
    var targetSpace = set[ax.targetSpace];
    var scroll = set[ax.scroll];
    return {
        scrollSpace: scrollSpace,
        space: space,
        targetSpace: targetSpace,
        scroll: scroll
    };
};
