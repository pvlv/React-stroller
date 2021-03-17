"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrollCaptor = void 0;
var React = require("react");
var context_1 = require("./context");
exports.StrollCaptor = function () { return (React.createElement(context_1.StrollerContext, null, function (_a) {
    var setScrollContainer = _a.setScrollContainer;
    return (React.createElement("div", { ref: function (ref) { return setScrollContainer(ref); } }));
})); };
