// const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d")!;
//
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
//
// type Point = {x: number; y: number};
//
// type Line = {p1: Point; p2: Point, value: number, increment: number};
//
// function getIncrement(p1: Point, p2: Point): number {
//     return (p2.x - p1.x) / (p2.y - p1.y);
// }
//
// function drawLine(i: number, j: number, row: number) {
//     ctx.beginPath();        // start new path
//     ctx.moveTo(i, row);     // starting point
//     ctx.lineTo(j, row);   // ending point
//     ctx.strokeStyle = "white";
//     ctx.stroke();
// }
//
// function drawPolygon(a: Point[]) {
//     a.push(a[0]);
//
//     let lines = [];
//     for(let i = 0; i < a.length - 1; i++) {
//         let p1 = a[i];
//         let p2 = a[i + 1];
//         if(p1.y > p2.y) [p1, p2] = [p2, p1];
//         lines.push({p1: p1, p2: p2, value: p1.x, increment: getIncrement(p1, p2)});
//     }
//
//     // sakārto no mazākā y
//     lines.sort((a, b) => a.p1.y - b.p1.y);
//
//     let lineIterator = 0;
//     let lineList = []
//
//     for (let row = 0; row < canvas.height; row++) {
//         // pievieno jaunās malas
//         while(lineIterator < lines.length && lines[lineIterator].p1.y == row) {
//             lineList.push(lines[lineIterator]);
//             lineIterator ++;
//         }
//
//         // noņem pazūstošas malas ieskaitot max
//         for (let i = 0; i < lineList.length; i++) {
//             if(lineList[i].p2.y == row) {
//                 lineList.splice(i, 1);
//                 i --;
//             }
//         }
//
//         // sakārto ar bubble sort
//         let needSort = 1;
//         while(needSort) {
//             needSort = 0;
//             for (let i = 0; i < lineList.length - 1; i++) {
//                 if(lineList[i].value >  lineList[i+1].value) {
//                     [lineList[i], lineList[i+1]] = [lineList[i+1], lineList[i]];
//                     needSort = 1;
//                 }
//             }
//         }
//
//         for(let i = 0; i + 1 < lineList.length; i+=2) {
//             drawLine(lineList[i].value, lineList[i+1].value, row);
//         }
//
//         for(let i = 0; i < lineList.length; i++) {
//             lineList[i].value += lineList[i].increment;
//         }
//     }
// }
//
// let a = [{x: 100, y: 200}, {x: 300, y: 300}, {x: 200, y: 100}, {x: 200, y: 67}];
//
// drawPolygon(a);