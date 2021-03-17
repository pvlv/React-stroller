import * as React from 'react';
import { IStrollerState } from "./types";
export interface IStrollerContext {
    setScrollContainer: (ref: HTMLElement | null) => any;
}
export declare const context: React.Context<IStrollerContext>;
export declare const StrollerProvider: React.Provider<IStrollerContext>;
export declare const StrollerContext: React.Consumer<IStrollerContext>;
export declare const stateContext: React.Context<IStrollerState>;
export declare const StrollerStateProvider: React.Provider<IStrollerState>;
export declare const StrollerState: React.Consumer<IStrollerState>;
