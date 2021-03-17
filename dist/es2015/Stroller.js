import { __extends } from "tslib";
import * as React from 'react';
import { supportsPassiveEvents } from 'detect-passive-events';
import { axisToProps, extractValues, findScrollableParent } from "./utils";
import { StollerBar } from "./Bar";
import { DragMachine } from "./DragEngine";
import { StrollerProvider, StrollerStateProvider } from './context';
import { strollerStyle } from "./Container";
var Stroller = /** @class */ (function (_super) {
    __extends(Stroller, _super);
    function Stroller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            scrollWidth: 0,
            scrollHeight: 0,
            clientWidth: 0,
            clientHeight: 0,
            targetWidth: 0,
            targetHeight: 0,
            scrollLeft: 0,
            scrollTop: 0,
            dragPhase: 'idle',
            mousePosition: [0, 0],
            scrollPosition: [0, 0],
            barLocation: 'inside',
            hasScroll: false,
        };
        _this.dragMachine = DragMachine.create();
        _this.topNode = undefined;
        _this.scrollableParent = undefined;
        _this.scrollContainer = null;
        _this.barRef = undefined;
        _this.dettachParentCallback = null;
        _this.onContainerScroll = function () {
            var _a, _b;
            var topNode = _this.scrollableParent;
            var scrollLeft = topNode.scrollLeft;
            var scrollTop = topNode.scrollTop;
            var scrollWidth = topNode.scrollWidth;
            var scrollHeight = topNode.scrollHeight;
            var targetWidth = (_a = _this.topNode) === null || _a === void 0 ? void 0 : _a.clientWidth;
            var targetHeight = (_b = _this.topNode) === null || _b === void 0 ? void 0 : _b.clientHeight;
            var clientWidth = topNode.clientWidth;
            var clientHeight = topNode.clientHeight;
            var isFixed = _this.state.barLocation === 'fixed';
            var st = _this.state;
            var _c = _this.props, _d = _c.axis, axis = _d === void 0 ? 'vertical' : _d, onScroll = _c.onScroll;
            var mainScroll = extractValues(st, axis);
            _this.setState({
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight,
                targetWidth: targetWidth,
                targetHeight: targetHeight,
                clientWidth: isFixed ? window.innerWidth : clientWidth,
                clientHeight: isFixed ? window.innerHeight : clientHeight,
                scrollLeft: isFixed ? window.scrollX : scrollLeft,
                scrollTop: isFixed ? window.scrollY : scrollTop,
                hasScroll: mainScroll.scrollSpace > mainScroll.space,
            });
            if (onScroll) {
                onScroll();
            }
        };
        _this.setScrollContainer = function (ref) { return _this.scrollContainer = ref; };
        _this.setTopNode = function (topNode) { return _this.topNode = topNode; };
        _this.setBarRef = function (barRef) {
            _this.barRef = barRef;
            _this.dragMachine
                .attrs({ node: _this.barRef })
                .put('check');
        };
        _this.strollerProviderValue = {
            setScrollContainer: _this.setScrollContainer
        };
        return _this;
    }
    Stroller.prototype.componentDidMount = function () {
        var _this = this;
        this.scrollableParent = findScrollableParent(this.scrollContainer || this.topNode, this.props.axis);
        var scrollableParent = this.scrollableParent;
        var barLocation = this.props.overrideLocation || this.scrollableParent === document.body
            ? 'fixed'
            : ((this.scrollContainer ? !this.topNode.contains(this.scrollableParent) : true)
                ? 'inside'
                : 'outside');
        this.setState({
            barLocation: barLocation
        });
        this.attach(barLocation === 'fixed' ? window : this.scrollableParent);
        this.onContainerScroll();
        this.dragMachine._id = this;
        this.dragMachine
            .attrs({ enabled: this.props.draggable })
            .observe(function (dragPhase) { return _this.setState({ dragPhase: dragPhase }); })
            .connect(function (message, coords) {
            if (message === 'down') {
                _this.setState({
                    mousePosition: coords,
                    scrollPosition: _this.state.barLocation === 'fixed'
                        ? [window.scrollX, window.scrollY]
                        : [scrollableParent.scrollLeft, scrollableParent.scrollTop]
                });
            }
            if (message === 'move') {
                var _a = _this.props, _b = _a.axis, axis = _b === void 0 ? 'vertical' : _b, pTargetAxis = _a.targetAxis;
                var mousePosition = _this.state.mousePosition;
                var targetAxis = pTargetAxis || axis;
                var axScroll = axisToProps[axis];
                var axTarget = axisToProps[targetAxis];
                var delta = [mousePosition[0] - coords[0], mousePosition[1] - coords[1]];
                var st = _this.state;
                var _c = extractValues(st, axis), axisSpace = _c.space, axisScrollSpace = _c.scrollSpace;
                var _d = extractValues(st, targetAxis), scrollSpace = _d.scrollSpace, targetSpace = _d.targetSpace;
                var scrollFactor = axis === targetAxis
                    ? scrollSpace / targetSpace
                    : (axisScrollSpace - axisSpace) / targetSpace;
                var barPosition = scrollableParent.getBoundingClientRect();
                if (_this.state.barLocation === 'fixed') {
                    var X = axis === 'vertical' ? st.scrollPosition[0] : st.scrollPosition[0] - delta[axTarget.coord] * scrollFactor;
                    var Y = axis !== 'vertical' ? st.scrollPosition[1] : st.scrollPosition[1] - delta[axTarget.coord] * scrollFactor;
                    window.scrollTo(X, Y);
                }
                else if (barPosition[axTarget.start] < coords[axTarget.coord] && barPosition[axTarget.end] > coords[axTarget.coord]) {
                    scrollableParent[axScroll.scroll] = st.scrollPosition[axScroll.coord] - delta[axTarget.coord] * scrollFactor;
                }
            }
        })
            .start('init');
    };
    Stroller.prototype.componentWillUnmount = function () {
        this.dragMachine.destroy();
        this.dettach();
    };
    Stroller.prototype.componentDidUpdate = function (prevProps) {
        this.dragMachine.attrs({ enabled: this.props.draggable });
        this.dragMachine.put('check');
        if (this.props.scrollKey !== prevProps.scrollKey) {
            this.onContainerScroll();
        }
    };
    Stroller.prototype.attach = function (parent) {
        var _this = this;
        this.dettach();
        var passive = this.props.passive;
        var options = passive && supportsPassiveEvents ? { passive: true } : undefined;
        parent.addEventListener('scroll', this.onContainerScroll, options);
        this.dettachParentCallback = function () {
            parent.removeEventListener('scroll', _this.onContainerScroll, options);
        };
    };
    Stroller.prototype.dettach = function () {
        if (this.dettachParentCallback) {
            this.dettachParentCallback();
            this.dettachParentCallback = null;
        }
    };
    Stroller.prototype.render = function () {
        var _a = this.props, children = _a.children, bar = _a.bar, inBetween = _a.inBetween, _b = _a.axis, axis = _b === void 0 ? 'vertical' : _b, targetAxis = _a.targetAxis, _c = _a.oppositePosition, oppositePosition = _c === void 0 ? false : _c, _d = _a.draggable, draggable = _d === void 0 ? false : _d, barSizeFunction = _a.barSizeFunction, barClassName = _a.barClassName, SideBar = _a.SideBar;
        var dragPhase = this.state.dragPhase;
        var st = this.state;
        var ax = axisToProps[axis];
        var scrollSpace = st[ax.scrollSpace];
        var Bar = this.props.scrollBar || StollerBar;
        return (React.createElement(StrollerStateProvider, { value: this.state },
            React.createElement("div", { ref: this.setTopNode, style: strollerStyle },
                React.createElement(StrollerProvider, { value: this.strollerProviderValue }, children),
                React.createElement("div", null, inBetween),
                scrollSpace
                    ? (React.createElement(Bar, { mainScroll: extractValues(st, axis), targetScroll: extractValues(st, targetAxis || axis), forwardRef: this.setBarRef, internal: bar, axis: axis, targetAxis: targetAxis || axis, oppositePosition: oppositePosition, draggable: draggable, dragging: dragPhase === 'dragging', sizeFunction: barSizeFunction, location: st.barLocation, className: barClassName, SideBar: SideBar }))
                    : null)));
    };
    return Stroller;
}(React.Component));
export { Stroller };
