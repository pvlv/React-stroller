"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StollerBar = exports.defaultSizeFunction = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var utils_1 = require("./utils");
var Bar = function (_a) {
    var _b;
    var axis = _a.axis;
    return (React.createElement("div", { style: (_b = {},
            _b[axis === 'vertical' ? 'width' : 'height'] = '8px',
            _b[axis === 'vertical' ? 'height' : 'width'] = '100%',
            _b.borderRadius = 8,
            _b.backgroundColor = 'rgba(0,0,0,0.5)',
            _b) }));
};
var positions = {
    vertical: {
        0: {
            top: 0,
            right: 0,
        },
        1: {
            top: 0,
            left: 0,
        }
    },
    horizontal: {
        0: {
            bottom: 0,
            left: 0,
        },
        1: {
            top: 0,
            left: 0,
        },
    }
};
exports.defaultSizeFunction = function (height, scrollHeight) { return (height * (height / scrollHeight)); };
exports.StollerBar = function (_a) {
    var _b;
    var mainScroll = _a.mainScroll, 
    // targetScroll,
    SideBar = _a.SideBar, forwardRef = _a.forwardRef, internal = _a.internal, _c = _a.axis, axis = _c === void 0 ? 'vertical' : _c, _d = _a.oppositePosition, oppositePosition = _d === void 0 ? false : _d, _e = _a.draggable, draggable = _e === void 0 ? false : _e, _f = _a.sizeFunction, sizeFunction = _f === void 0 ? exports.defaultSizeFunction : _f, _g = _a.dragging, dragging = _g === void 0 ? false : _g, location = _a.location, className = _a.className;
    if (mainScroll.scrollSpace <= mainScroll.space) {
        return null;
    }
    var barSize = sizeFunction(mainScroll.space, mainScroll.scrollSpace, {
        dragging: dragging,
        default: exports.defaultSizeFunction(mainScroll.space, mainScroll.scrollSpace)
    });
    var Internal = internal || Bar;
    var usableSpace = (mainScroll.scrollSpace - mainScroll.space);
    var endPosition = location === 'inside'
        ? (mainScroll.scrollSpace - barSize)
        : (mainScroll.targetSpace - barSize);
    var top = endPosition * mainScroll.scroll / usableSpace;
    var transform = 'translate' + (utils_1.axisToAxis[axis]) + '(' + (Math.max(0, Math.min(endPosition, top))) + 'px)';
    var styles = tslib_1.__assign((_b = { position: location === 'fixed' ? 'fixed' : 'absolute', display: 'flex', cursor: dragging ? 'grabbing' : (draggable ? 'grab' : 'default') }, _b[axis === 'vertical' ? 'height' : 'width'] = Math.round(barSize) + 'px', _b), positions[axis][oppositePosition ? 1 : 0]);
    return (React.createElement(React.Fragment, null,
        SideBar && React.createElement(SideBar, { styles: styles }),
        React.createElement("div", { ref: forwardRef, style: tslib_1.__assign(tslib_1.__assign({}, styles), { transform: transform, willChange: 'transform' }), className: className },
            React.createElement(Internal, { dragging: dragging, axis: axis }))));
};
