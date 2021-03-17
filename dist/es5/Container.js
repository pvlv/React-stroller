"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strollable = exports.subcontainerStyle = exports.strollerStyle = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var utils_1 = require("./utils");
var getStyle = function (scrollWidth, gap, overscroll, axis) {
    var _a;
    if (axis === void 0) { axis = 'vertical'; }
    return _a = {
            width: axis === 'vertical' ? "calc(100% + " + (scrollWidth - gap) + "px)" : '100%',
            height: axis !== 'vertical' ? "calc(100% + " + (scrollWidth - gap) + "px)" : '100%',
            // width:'100%',
            // height:'100%',
            maxWidth: 'inherit',
            maxHeight: 'inherit',
            position: 'relative'
        },
        _a[utils_1.axisToOverflow[axis]] = 'scroll',
        _a.overscrollBehavior = overscroll ? 'contain' : 'inherit',
        _a[axis === 'vertical' ? 'paddingRight' : 'paddingBottom'] = (scrollWidth + 24) + 'px',
        _a.boxSizing = "content-box",
        _a;
};
var containerStyle = {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    maxWidth: 'inherit',
    maxHeight: 'inherit',
};
exports.strollerStyle = {
    height: '100%',
    width: '100%',
    maxWidth: 'inherit',
    maxHeight: 'inherit',
};
exports.subcontainerStyle = {
    // minHeight: '100%', // an issue for windows
    // minWidth: '100%',
    width: '100%',
    height: '100%',
    // maxWidth: 'inherit',
    // maxHeight: 'inherit',
    position: 'relative',
};
var Strollable = /** @class */ (function (_super) {
    tslib_1.__extends(Strollable, _super);
    function Strollable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollWidth = utils_1.getScrollBarWidth();
        return _this;
    }
    Strollable.prototype.render = function () {
        var _a = this.props, children = _a.children, axis = _a.axis, _b = _a.overscroll, overscroll = _b === void 0 ? false : _b, className = _a.className, _c = _a.gap, gap = _c === void 0 ? 0 : _c, _d = _a.minScrollbarWidth, minScrollbarWidth = _d === void 0 ? 0 : _d, _e = _a.containerStyles, containerStyles = _e === void 0 ? {} : _e;
        return (React.createElement("div", { style: containerStyle, className: className },
            React.createElement("div", { style: getStyle(Math.max(minScrollbarWidth, this.scrollWidth), gap, overscroll, axis) },
                React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, exports.subcontainerStyle), containerStyles) }, children))));
    };
    return Strollable;
}(React.Component));
exports.Strollable = Strollable;
