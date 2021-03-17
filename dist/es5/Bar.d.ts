import * as React from 'react';
import { axisTypes } from "./utils";
export declare type BarView = React.ComponentType<{
    dragging?: boolean;
    axis?: axisTypes;
}> | React.ComponentType<any>;
export declare type BarSizeFunction = (height: number, scrollHeight: number, flags: {
    dragging: boolean;
    default: number;
}) => number;
export declare type BarLocation = "fixed" | "inside" | "outside";
export interface IScrollParams {
    scrollSpace: number;
    scroll: number;
    space: number;
    targetSpace: number;
}
export declare type ISideBar = React.SFC<{
    styles: CSSStyleDeclaration;
}>;
export interface IStrollerBarProps {
    mainScroll: IScrollParams;
    targetScroll?: IScrollParams;
    forwardRef: (ref: HTMLElement) => void;
    internal?: BarView;
    axis?: axisTypes;
    targetAxis?: axisTypes;
    oppositePosition?: boolean;
    draggable?: boolean;
    dragging?: boolean;
    sizeFunction?: BarSizeFunction;
    location: BarLocation;
    className?: string;
    SideBar?: ISideBar;
}
export declare const defaultSizeFunction: (height: number, scrollHeight: number) => number;
export declare const StollerBar: React.SFC<IStrollerBarProps>;
