export declare const axisToOverflow: {
    vertical: string;
    horizontal: string;
};
export declare const axisToOverflowReverse: {
    vertical: string;
    horizontal: string;
};
export declare const axisToAxis: {
    vertical: string;
    horizontal: string;
};
export declare type axisTypes = 'vertical' | 'horizontal';
export declare const axisToProps: {
    vertical: {
        scroll: string;
        space: string;
        targetSpace: string;
        scrollSpace: string;
        start: string;
        end: string;
        coord: number;
    };
    horizontal: {
        scroll: string;
        space: string;
        targetSpace: string;
        scrollSpace: string;
        start: string;
        end: string;
        coord: number;
    };
};
export declare const findScrollableParent: (node: HTMLElement, axis?: axisTypes) => HTMLElement;
export declare const getScrollBarWidth: () => number;
export declare const extractValues: (set: any, axis: axisTypes) => {
    scrollSpace: number;
    space: number;
    targetSpace: number;
    scroll: number;
};
