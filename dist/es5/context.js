"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrollerState = exports.StrollerStateProvider = exports.stateContext = exports.StrollerContext = exports.StrollerProvider = exports.context = void 0;
var React = require("react");
var contextDefault = {
    setScrollContainer: function () { throw new Error('StrollerCaptor used without Stroller'); }
};
exports.context = React.createContext(contextDefault);
exports.StrollerProvider = exports.context.Provider;
exports.StrollerContext = exports.context.Consumer;
exports.stateContext = React.createContext({});
exports.StrollerStateProvider = exports.stateContext.Provider;
exports.StrollerState = exports.stateContext.Consumer;
