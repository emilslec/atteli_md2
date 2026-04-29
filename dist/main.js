"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let shift = 16;
function getIncrement(p1, p2) {
    return ((p2.x - p1.x) / (p2.y - p1.y));
}
// izmanto, lai horizontālu rindu izkrāsotu
function drawLine(i, j, row) {
    ctx.beginPath();
    ctx.moveTo(i, row);
    ctx.lineTo(j, row);
    ctx.strokeStyle = "white";
    ctx.stroke();
}
function drawPolygon(a) {
    // ērtībai
    a.push(a[0]);
    let lines = [];
    for (let i = 0; i < a.length - 1; i++) {
        let p1 = a[i];
        let p2 = a[i + 1];
        if (p1.y > p2.y)
            [p1, p2] = [p2, p1];
        lines.push({ p1: p1, p2: p2, value: (p1.x << shift), increment: getIncrement(p1, p2) * (1 << shift) });
    }
    // sakārto no mazākā y
    lines.sort((a, b) => a.p1.y - b.p1.y);
    let lineIterator = 0;
    let lineList = [];
    for (let row = 0; row < canvas.height; row++) {
        // pievieno jaunas malas
        while (lineIterator < lines.length && lines[lineIterator].p1.y == row) {
            lineList.push(lines[lineIterator]);
            lineIterator++;
        }
        // noņem pazūstošas malas, ieskaitot max
        for (let i = 0; i < lineList.length; i++) {
            if (lineList[i].p2.y == row) {
                lineList.splice(i, 1);
                i--;
            }
        }
        // sakārto ar bubble sort
        let needSort = 1;
        while (needSort) {
            needSort = 0;
            for (let i = 0; i < lineList.length - 1; i++) {
                if (lineList[i].value > lineList[i + 1].value) {
                    [lineList[i], lineList[i + 1]] = [lineList[i + 1], lineList[i]];
                    needSort = 1;
                }
            }
        }
        // zīmē
        for (let i = 0; i + 1 < lineList.length; i += 2) {
            drawLine(lineList[i].value >> shift, lineList[i + 1].value >> shift, row);
        }
        // aprēķina vērtību nākamajā rindā
        for (let i = 0; i < lineList.length; i++) {
            lineList[i].value += (lineList[i].increment);
        }
    }
    a.pop();
}
const a = [
    { x: 200, y: 100 },
    { x: 400, y: 50 },
    { x: 600, y: 150 },
    { x: 550, y: 350 },
    { x: 350, y: 400 },
    { x: 150, y: 300 }
];
const b = [
    { x: 1300, y: 100 },
    { x: 1000, y: 500 },
    { x: 1050, y: 800 },
    { x: 800, y: 700 },
    { x: 650, y: 800 },
    { x: 200, y: 600 },
];
const square = [
    { x: 1300, y: 700 },
    { x: 1300, y: 900 },
    { x: 1500, y: 900 },
    { x: 1500, y: 750 },
    { x: 1700, y: 750 },
    { x: 1700, y: 900 },
    { x: 1716, y: 900 },
    { x: 1716, y: 700 },
];
// šis ģenerēts
const shape = [
    // bottom-left
    { x: 50, y: 500 },
    { x: 1350, y: 500 },
    // bottom-right → start going up the right side
    { x: 1350, y: 200 },
    // jagged top edge (right → left)
    { x: 1300, y: 180 },
    { x: 1250, y: 220 },
    { x: 1200, y: 160 },
    { x: 1150, y: 210 },
    { x: 1100, y: 150 },
    { x: 1050, y: 230 },
    { x: 1000, y: 170 },
    { x: 950, y: 240 },
    { x: 900, y: 160 },
    { x: 850, y: 220 },
    { x: 800, y: 140 },
    { x: 750, y: 210 },
    { x: 700, y: 170 },
    { x: 650, y: 230 },
    { x: 600, y: 160 },
    { x: 550, y: 210 },
    { x: 500, y: 180 },
    { x: 450, y: 220 },
    { x: 400, y: 170 },
    { x: 350, y: 200 },
    { x: 300, y: 180 },
    { x: 250, y: 220 },
    { x: 200, y: 190 },
    { x: 150, y: 210 },
    { x: 100, y: 180 },
    { x: 50, y: 200 }
];
//
// drawPolygon(a);
// drawPolygon(b);
// drawPolygon(shape2);
let shapes = [a, b, shape, square];
const select = document.getElementById("options");
const display = document.getElementById("show");
display.addEventListener("click", () => {
    const selectedOptions = Array.from(select.selectedOptions);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    selectedOptions.forEach(option => {
        drawPolygon(shapes[Number(option.value)]);
    });
});
let userPoly = [];
canvas.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    userPoly.push({ x, y });
    drawPolygon(userPoly);
});
//# sourceMappingURL=main.js.map