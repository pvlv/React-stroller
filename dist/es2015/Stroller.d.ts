import * as React from 'react';
import { axisTypes } from "./utils";
import { BarLocation, BarSizeFunction, BarView, IStrollerBarProps, ISideBar } from "./Bar";
export interface IStrollerProps {
    axis?: axisTypes;
    targetAxis?: axisTypes;
    inBetween?: React.ReactNode;
    bar?: BarView;
    scrollBar?: React.ComponentType<IStrollerBarProps>;
    barSizeFunction?: BarSizeFunction;
    barClassName?: string;
    SideBar?: ISideBar;
    oppositePosition?: boolean;
    draggable?: boolean;
    overrideLocation?: BarLocation;
    scrollKey?: any;
    passive?: boolean;
    onScroll?: () => void;
}
export interface IComponentState {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
    targetWidth?: number;
    targetHeight?: number;
    scrollLeft: number;
    scrollTop: number;
    hasScroll: boolean;
    dragPhase: string;
    mousePosition: number[];
    scrollPosition: number[];
    barLocation: BarLocation;
}
export declare class Stroller extends React.Component<IStrollerProps, IComponentState> {
    state: {
        scrollWidth: number;
        scrollHeight: number;
        clientWidth: number;
        clientHeight: number;
        targetWidth: number;
        targetHeight: number;
        scrollLeft: number;
        scrollTop: number;
        dragPhase: string;
        mousePosition: number[];
        scrollPosition: number[];
        barLocation: BarLocation;
        hasScroll: boolean;
    };
    private dragMachine;
    private topNode;
    private scrollableParent;
    private scrollContainer;
    private barRef;
    private dettachParentCallback;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IStrollerProps): void;
    private onContainerScroll;
    private attach;
    private dettach;
    private setScrollContainer;
    private setTopNode;
    private setBarRef;
    private strollerProviderValue;
    render(): JSX.Element;
}
