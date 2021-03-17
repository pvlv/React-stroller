"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrollableContainer = void 0;
var Container_1 = require("./Container");
var Stroller_1 = require("./Stroller");
var React = require("react");
var StrollCaptor_1 = require("./StrollCaptor");
exports.StrollableContainer = function (_a) {
    var children = _a.children, className = _a.className, axis = _a.axis, bar = _a.bar, inBetween = _a.inBetween, scrollBar = _a.scrollBar, oppositePosition = _a.oppositePosition, draggable = _a.draggable, barSizeFunction = _a.barSizeFunction, barClassName = _a.barClassName, SideBar = _a.SideBar, overrideLocation = _a.overrideLocation, targetAxis = _a.targetAxis, overscroll = _a.overscroll, containerStyles = _a.containerStyles, minScrollbarWidth = _a.minScrollbarWidth, scrollKey = _a.scrollKey, gap = _a.gap, onScroll = _a.onScroll;
    return (React.createElement("div", { style: Container_1.strollerStyle },
        React.createElement(Stroller_1.Stroller, { axis: axis, targetAxis: targetAxis, inBetween: inBetween, bar: bar, scrollBar: scrollBar, barSizeFunction: barSizeFunction, barClassName: barClassName, SideBar: SideBar, oppositePosition: oppositePosition, draggable: draggable, overrideLocation: overrideLocation, scrollKey: scrollKey, onScroll: onScroll },
            React.createElement(Container_1.Strollable, { axis: axis, className: className, overscroll: overscroll, gap: gap, containerStyles: containerStyles, minScrollbarWidth: minScrollbarWidth },
                React.createElement(StrollCaptor_1.StrollCaptor, null),
                children))));
};
