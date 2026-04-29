declare const canvas: HTMLCanvasElement;
declare const ctx: CanvasRenderingContext2D;
type Point = {
    x: number;
    y: number;
};
type Line = {
    p1: Point;
    p2: Point;
    value: number;
    increment: number;
};
declare let shift: number;
declare function getIncrement(p1: Point, p2: Point): number;
declare function drawLine(i: number, j: number, row: number): void;
declare function drawPolygon(a: Point[]): void;
declare const a: Point[];
declare const b: Point[];
declare const square: Point[];
declare const shape: Point[];
declare let shapes: Point[][];
declare const select: HTMLSelectElement;
declare const display: HTMLButtonElement;
declare let userPoly: Point[];
//# sourceMappingURL=main.d.ts.map