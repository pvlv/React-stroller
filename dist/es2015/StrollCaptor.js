import * as React from 'react';
import { StrollerContext } from "./context";
export var StrollCaptor = function () { return (React.createElement(StrollerContext, null, function (_a) {
    var setScrollContainer = _a.setScrollContainer;
    return (React.createElement("div", { ref: function (ref) { return setScrollContainer(ref); } }));
})); };
