import * as React from 'react';
var contextDefault = {
    setScrollContainer: function () { throw new Error('StrollerCaptor used without Stroller'); }
};
export var context = React.createContext(contextDefault);
export var StrollerProvider = context.Provider;
export var StrollerContext = context.Consumer;
export var stateContext = React.createContext({});
export var StrollerStateProvider = stateContext.Provider;
export var StrollerState = stateContext.Consumer;
