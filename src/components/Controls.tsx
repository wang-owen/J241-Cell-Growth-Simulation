import "./Controls.css";

const Controls = ({
    gridSize,
    setCells,
    setTimeInterval,
    running,
    setRunning,
}: {
    gridSize: number;
    setCells: React.Dispatch<React.SetStateAction<boolean[]>[]>;
    setTimeInterval: React.Dispatch<React.SetStateAction<number>>;
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const reset = async () => {
        setCells(Array(gridSize).fill(Array(gridSize).fill(false)));
        setRunning(false);
    };

    document
        .querySelector("input")
        ?.addEventListener("keydown", function (event) {
            if (
                event.key === "Backspace" ||
                event.key === "Delete" ||
                (event.key >= "ArrowLeft" && event.key <= "ArrowRight")
            )
                return;
            if ((event.key < "0" || event.key > "9") && event.preventDefault) {
                event.preventDefault();
            }
        });

    return (
        <div id="controls">
            <button onClick={() => setRunning(!running)}>Start/Pause</button>
            <button onClick={reset}>Reset</button>
            <input
                onChange={(event) =>
                    setTimeInterval(parseInt(event.target.value))
                }
                id="interval-input"
                type="number"
                min={1}
                step={0.1}
                defaultValue={1}
                placeholder="Time Interval (s)"
                required
                disabled={running}
            ></input>
        </div>
    );
};

export default Controls;
