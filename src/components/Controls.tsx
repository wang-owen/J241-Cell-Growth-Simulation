import "./Controls.css";

const Controls = ({
    gridSize,
    setGridSize,
    setCells,
    setTimeInterval,
    running,
    setRunning,
    setGrowthCounts,
}: {
    gridSize: number[];
    setGridSize: React.Dispatch<React.SetStateAction<number[]>>;
    setCells: React.Dispatch<React.SetStateAction<boolean[]>[]>;
    setTimeInterval: React.Dispatch<React.SetStateAction<number>>;
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setGrowthCounts: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
    // Prevent invalid field entries
    document.querySelectorAll("input")?.forEach((input) =>
        input.addEventListener("keydown", function (event) {
            if (
                event.key === "Backspace" ||
                event.key === "Delete" ||
                event.key === "." ||
                (event.key >= "ArrowLeft" && event.key <= "ArrowRight")
            )
                return;
            if ((event.key < "0" || event.key > "9") && event.preventDefault) {
                event.preventDefault();
            }
        })
    );

    // Add keyboard support
    document.addEventListener("keydown", function (event) {
        if (event.key === " ") {
            event.preventDefault();
            setRunning(!running);
        } else if (event.key === "r" || event.key === "R") {
            reset();
        }
    });

    // Reset grid
    const reset = (): void => {
        setTimeInterval(1);
        setCells(Array(gridSize[0]).fill(Array(gridSize[1]).fill(false)));
        setRunning(false);
        setGrowthCounts([0]);

        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
        }
    };

    return (
        <div>
            <div id="controls">
                <button onClick={() => setRunning(!running)}>
                    {!running ? "Start" : "Pause"}
                </button>
                <button onClick={reset}>Reset</button>
                <div>
                    <input
                        id="timeIntervalInput"
                        onChange={(event) =>
                            setTimeInterval(parseInt(event.target.value))
                        }
                        type="number"
                        min={1}
                        step={0.5}
                        defaultValue={1}
                        placeholder="Time Interval (s)"
                        required
                        disabled={running}
                    ></input>
                    <br />
                    <label htmlFor="timeIntervalInput">Time Interval (s)</label>
                </div>
                <div>
                    <input
                        id="gridSizeInputX"
                        onChange={(event) => {
                            const newGridSize = parseInt(event.target.value);
                            setGridSize([gridSize[0], newGridSize]);
                            if (!Number.isNaN(newGridSize) && newGridSize > 0) {
                                setCells(
                                    Array(gridSize[0]).fill(
                                        Array(newGridSize).fill(false)
                                    )
                                );
                            }
                        }}
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={20}
                        placeholder="Grid X Size"
                        required
                        disabled={running}
                    ></input>
                    <input
                        id="gridSizeInputY"
                        onChange={(event) => {
                            const newGridSize = parseInt(event.target.value);
                            setGridSize([newGridSize, gridSize[1]]);
                            if (!Number.isNaN(newGridSize) && newGridSize > 0) {
                                setCells(
                                    Array(newGridSize).fill(
                                        Array(gridSize[1]).fill(false)
                                    )
                                );
                            }
                        }}
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={20}
                        placeholder="Grid Y Size"
                        required
                        disabled={running}
                    ></input>
                    <br />
                    <label>Grid Size</label>
                </div>
            </div>
            <div>
                <span>Press SPACE to start/pause</span>
                <br />
                <span>Press R to reset</span>
            </div>
        </div>
    );
};

export default Controls;
