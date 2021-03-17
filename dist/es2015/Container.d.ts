import * as React from 'react';
import { axisTypes } from "./utils";
export interface IContainerProps {
    axis?: axisTypes;
    className?: string;
    overscroll?: boolean;
    gap?: number;
    minScrollbarWidth?: number;
    containerStyles?: CSSStyleDeclaration;
}
export declare const strollerStyle: React.CSSProperties;
export declare const subcontainerStyle: React.CSSProperties;
export declare class Strollable extends React.Component<IContainerProps> {
    scrollWidth: number;
    render(): JSX.Element;
}
