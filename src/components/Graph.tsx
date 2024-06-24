import "./Graph.css";
import { useState } from "react";

const Graph = ({
    timeInterval,
    coords,
    gridSize,
}: {
    timeInterval: number;
    coords: number[];
    gridSize: number[];
}) => {
    const [graphWidth, setGraphWidth] = useState(window.innerWidth / 3);
    window.addEventListener("resize", () => {
        setGraphWidth(window.innerWidth / 3);
    });

    const maxSplitNum = Math.pow(Math.max(gridSize[0], gridSize[1]), 2);
    const lineHeight = 14;

    const drawGraph = (timeInterval: number, coords: number[]): void => {
        let time = 0;
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const context = canvas.getContext("2d");
            if (context) {
                context.beginPath();
                context.strokeStyle = "white";

                context.moveTo(0, canvas.height);
                coords.forEach((coord, i) => {
                    // Draw coordinate on canvas
                    context.lineTo(
                        i * 10,
                        canvas.height - (coord / 10) * lineHeight
                    );
                    context.stroke();
                    time += timeInterval;
                });
            }
        }
    };

    drawGraph(timeInterval, coords);

    const maxTick = Math.ceil(maxSplitNum / 10) * 10;
    const yTicks = () => {
        let ticks: number[] = [];
        for (let i = 0; i < maxTick + 10; i += 10) {
            ticks.push(i);
        }
        return ticks;
    };
    const ticks = yTicks();

    return (
        <div>
            <h2>Bacteria growth rate over time</h2>
            <div
                id="y-axis"
                style={{
                    height: `${graphWidth + 9}px`,
                    maxHeight: `${graphWidth}px`,
                }}
            >
                <label id="y-axis-label">Bacteria Count</label>
                <div id="y-axis-ticks">
                    {ticks.map((tick) => {
                        return (
                            <label
                                key={tick}
                                style={{ lineHeight: `${lineHeight}px` }}
                            >
                                {tick}
                            </label>
                        );
                    })}
                </div>
            </div>
            <canvas id="canvas" width={graphWidth} height={graphWidth}></canvas>
            <div id="x-axis">
                <div id="x-axis-label" style={{ width: `${graphWidth}px` }}>
                    <label>Time (s)</label>
                </div>
            </div>
        </div>
    );
};

export default Graph;
