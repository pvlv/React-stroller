import { Strollable, strollerStyle } from "./Container";
import { Stroller } from "./Stroller";
import * as React from "react";
import { StrollCaptor } from "./StrollCaptor";
export var StrollableContainer = function (_a) {
    var children = _a.children, className = _a.className, axis = _a.axis, bar = _a.bar, inBetween = _a.inBetween, scrollBar = _a.scrollBar, oppositePosition = _a.oppositePosition, draggable = _a.draggable, barSizeFunction = _a.barSizeFunction, barClassName = _a.barClassName, SideBar = _a.SideBar, overrideLocation = _a.overrideLocation, targetAxis = _a.targetAxis, overscroll = _a.overscroll, containerStyles = _a.containerStyles, minScrollbarWidth = _a.minScrollbarWidth, scrollKey = _a.scrollKey, gap = _a.gap, onScroll = _a.onScroll;
    return (React.createElement("div", { style: strollerStyle },
        React.createElement(Stroller, { axis: axis, targetAxis: targetAxis, inBetween: inBetween, bar: bar, scrollBar: scrollBar, barSizeFunction: barSizeFunction, barClassName: barClassName, SideBar: SideBar, oppositePosition: oppositePosition, draggable: draggable, overrideLocation: overrideLocation, scrollKey: scrollKey, onScroll: onScroll },
            React.createElement(Strollable, { axis: axis, className: className, overscroll: overscroll, gap: gap, containerStyles: containerStyles, minScrollbarWidth: minScrollbarWidth },
                React.createElement(StrollCaptor, null),
                children))));
};
