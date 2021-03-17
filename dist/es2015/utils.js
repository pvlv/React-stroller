export var axisToOverflow = {
    vertical: 'overflowY',
    horizontal: 'overflowX'
};
export var axisToOverflowReverse = {
    vertical: 'overflowX',
    horizontal: 'overflowY'
};
export var axisToAxis = {
    vertical: 'Y',
    horizontal: 'X'
};
export var axisToProps = {
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
export var findScrollableParent = function (node, axis) {
    if (axis === void 0) { axis = 'vertical'; }
    if (node === document.body) {
        return node;
    }
    var style = window.getComputedStyle(node);
    var flow = style[axisToOverflow[axis]];
    if (flow === 'hidden' || flow === 'scroll') {
        return node;
    }
    return node.parentNode
        ? findScrollableParent(node.parentNode, axis)
        : node;
};
var scrollbarWidth = -1;
export var getScrollBarWidth = function () {
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
export var extractValues = function (set, axis) {
    var ax = axisToProps[axis];
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
