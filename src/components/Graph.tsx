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

    return (
        <div>
            <h2>Bacteria population over time</h2>
            <div
                style={{
                    float: "left",
                    display: "flex",
                    height: "509px",
                    borderRight: "solid white",
                    gap: "1.5em",
                }}
            >
                <label
                    style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                    }}
                >
                    Bacteria Count
                </label>
                <div
                    style={{
                        alignItems: "end",
                        display: "flex",
                        flexDirection: "column-reverse",
                        padding: "3px",
                    }}
                >
                    {coords.map((coord) => {
                        return (
                            <label
                                key={coord[0]}
                                style={{
                                    position: "absolute",
                                    margin: 0,
                                    marginBottom: `${coord[1]}px`,
                                    fontSize: "8px",
                                }}
                            >
                                {coord[1]}
                            </label>
                        );
                    })}
                </div>
            </div>
            <canvas id="canvas" width={500} height={500}></canvas>
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        width: "500px",
                        float: "right",
                        borderTop: "solid white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: "10px",
                            gap: "40px",
                        }}
                    >
                        <label>0</label>
                        <label>5</label>
                        <label>10</label>
                        <label>15</label>
                        <label>20</label>
                        <label>25</label>
                        <label>30</label>
                        <label>35</label>
                        <label>40</label>
                        <label>45</label>
                    </div>
                    <label>Time (s)</label>
                </div>
            </div>
        </div>
    );
};

export default Graph;
