import { Faste, InternalMachine, MessageHandler } from 'faste';
export { Faste, InternalMachine, MessageHandler };
export declare const DragMachine: Faste<{}, {
    node?: HTMLElement;
    enabled?: boolean;
}, "disabled" | "idle" | "init" | "dragging" | "cancelDrag", import("faste").PhaseTransition<"disabled" | "idle" | "init" | "dragging" | "cancelDrag", "disabled" | "idle" | "init" | "dragging" | "cancelDrag">, "mousedown" | "mousemove" | "mouseup" | "touchend" | "touchmove" | "touchstart" | "down" | "up" | "@init" | "@enter" | "@leave" | "@change" | "@miss" | "@guard" | "check" | "move", "down" | "up" | "move", import("faste").OnCallback<{}, {
    node?: HTMLElement;
    enabled?: boolean;
}, "disabled" | "idle" | "init" | "dragging" | "cancelDrag", "mousedown" | "mousemove" | "mouseup" | "touchend" | "touchmove" | "touchstart" | "down" | "up" | "@init" | "@enter" | "@leave" | "@change" | "@miss" | "@guard" | "check" | "move", "down" | "up" | "move">, import("faste").MessageHandlers<{}, {
    node?: HTMLElement;
    enabled?: boolean;
}, "disabled" | "idle" | "init" | "dragging" | "cancelDrag", "mousedown" | "mousemove" | "mouseup" | "touchend" | "touchmove" | "touchstart" | "down" | "up" | "@init" | "@enter" | "@leave" | "@change" | "@miss" | "@guard" | "check" | "move", import("faste").OnCallback<{}, {
    node?: HTMLElement;
    enabled?: boolean;
}, "disabled" | "idle" | "init" | "dragging" | "cancelDrag", "mousedown" | "mousemove" | "mouseup" | "touchend" | "touchmove" | "touchstart" | "down" | "up" | "@init" | "@enter" | "@leave" | "@change" | "@miss" | "@guard" | "check" | "move", "down" | "up" | "move">>, import("faste").Hooks<{}, {
    node?: HTMLElement;
    enabled?: boolean;
}, "disabled" | "idle" | "init" | "dragging" | "cancelDrag">>;
