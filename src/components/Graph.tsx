import "./Graph.css";

const Graph = ({
    timeInterval,
    coords,
}: {
    timeInterval: number;
    coords: number[];
}) => {
    const drawGraph = (timeInterval: number, coords: number[]): void => {
        let time = 0;
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const context = canvas.getContext("2d");
            if (context) {
                if (coords.length === 0) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    return;
                }

                context.beginPath();
                context.strokeStyle = "white";

                context.moveTo(0, canvas.height);
                coords.forEach((coord) => {
                    // Draw coordinate on canvas
                    context.lineTo(time * 10, canvas.height - coord);
                    context.stroke();
                    time += timeInterval;
                });
            }
        }
    };

    drawGraph(timeInterval, coords);

    return (
        <div>
            <h2>Bacteria population over time</h2>
            <div id="x-axis">
                <label id="x-axis-label">Bacteria Count</label>
                <div id="x-axis-ticks">
                    {coords.map((coord, i) => {
                        return (
                            <label
                                key={i * timeInterval}
                                className="x-axis-tick"
                                style={{
                                    marginBottom: `${coord}px`,
                                }}
                            >
                                {coord}
                            </label>
                        );
                    })}
                </div>
            </div>
            <canvas id="canvas" width={500} height={500}></canvas>
            <div id="y-axis">
                <div id="y-axis-label">
                    <div id="y-axis-ticks">
                        {coords.map((_, i) => {
                            return (
                                <label key={timeInterval * i}>
                                    {timeInterval * i}
                                </label>
                            );
                        })}
                    </div>
                    <label>Time (s)</label>
                </div>
            </div>
        </div>
    );
};

export default Graph;
