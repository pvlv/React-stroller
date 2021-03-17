"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragMachine = exports.Faste = void 0;
var faste_1 = require("faste");
Object.defineProperty(exports, "Faste", { enumerable: true, get: function () { return faste_1.Faste; } });
var nodeHook = {
    on: function (_a) {
        var attrs = _a.attrs, trigger = _a.trigger, message = _a.message;
        var hook = function (event) {
            trigger(message, event);
            event.preventDefault();
        };
        attrs.node.addEventListener(message, hook);
        return [attrs.node, hook];
    },
    off: function (_a, _b) {
        var message = _a.message;
        var node = _b[0], hook = _b[1];
        node.removeEventListener(message, hook);
    }
};
var documentHook = {
    on: function (_a) {
        var trigger = _a.trigger, message = _a.message;
        var hook = function (event) {
            trigger(message, event);
            event.preventDefault();
        };
        document.addEventListener(message, hook, true);
        return hook;
    },
    off: function (_a, hook) {
        var message = _a.message;
        document.removeEventListener(message, hook, true);
    }
};
var getCoords = function (event) { return [event.clientX, event.clientY]; };
exports.DragMachine = faste_1.faste()
    .withPhases(['init', 'disabled', 'idle', 'dragging', 'cancelDrag'])
    .withAttrs({})
    .withMessages(['check', 'down', 'up', 'move', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'])
    .withSignals(['up', 'down', 'move'])
    .on('check', ['init', 'disabled'], function (_a) {
    var attrs = _a.attrs, transitTo = _a.transitTo;
    return attrs.enabled && attrs.node && transitTo('idle');
})
    .on('check', ['idle', 'dragging'], function (_a) {
    var attrs = _a.attrs, transitTo = _a.transitTo;
    return (!attrs.enabled || !attrs.node) && transitTo('disabled');
})
    // outer reactions
    .on('down', function (_a, event) {
    var transitTo = _a.transitTo, emit = _a.emit;
    emit('down', event);
    transitTo('dragging');
})
    .on('up', function (_a) {
    var transitTo = _a.transitTo;
    return transitTo('idle');
})
    .on('move', function (_a, event) {
    var emit = _a.emit;
    return emit('move', event);
})
    .on('@enter', ['cancelDrag'], function (_a) {
    var transitTo = _a.transitTo;
    return transitTo('idle');
})
    // mouse events
    .on('mousedown', ['idle'], function (_a, event) {
    var trigger = _a.trigger;
    return trigger('down', getCoords(event));
})
    .on('mouseup', ['dragging'], function (_a) {
    var trigger = _a.trigger;
    return trigger('up');
})
    .on('mousemove', ['dragging'], function (_a, event) {
    var transitTo = _a.transitTo;
    return event.buttons !== 1 && transitTo('cancelDrag');
})
    .on('mousemove', ['dragging'], function (_a, event) {
    var trigger = _a.trigger;
    return trigger('move', getCoords(event));
})
    // touch events
    .on('touchstart', ['idle'], function (_a, event) {
    var trigger = _a.trigger;
    return trigger('down', getCoords(event.touches[0]));
})
    .on('touchend', ['dragging'], function (_a) {
    var trigger = _a.trigger;
    return trigger('up');
})
    .on('touchmove', ['dragging'], function (_a, event) {
    var trigger = _a.trigger;
    return trigger('move', getCoords(event.touches[0]));
})
    .hooks({
    mousedown: nodeHook,
    mouseup: documentHook,
    mousemove: documentHook,
    touchstart: nodeHook,
    touchmove: documentHook,
    touchend: documentHook,
});
