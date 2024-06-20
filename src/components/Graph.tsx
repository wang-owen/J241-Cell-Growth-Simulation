const Graph = ({ coords }: { coords: number[][] }) => {
    const drawGraph = (coords: Array<Array<number>>) => {
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
                // Draw axis
                context.moveTo(0, 0);
                context.lineTo(0, canvas.height);
                context.lineTo(canvas.width, canvas.height);
                context.stroke();

                context.moveTo(0, canvas.height);
                coords.forEach((coord) => {
                    // Draw coordinate on canvas
                    context.lineTo(coord[0] * 10, canvas.height - coord[1]);
                    context.stroke();
                });
            }
        }
    };

    drawGraph(coords);
    return <canvas id="canvas" width={500} height={500}></canvas>;
};

export default Graph;
