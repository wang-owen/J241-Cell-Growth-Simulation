import "./Controls.css";

const Controls = ({
    gridSize,
    setCells,
}: {
    gridSize: number;
    setCells: React.Dispatch<React.SetStateAction<boolean[]>[]>;
}) => {
    const reset = () => {
        setCells(Array(gridSize).fill(Array(gridSize).fill(false)));
    };

    return (
        <div id="controls">
            <button>Start/Pause</button>
            <button onClick={reset}>Reset</button>
            <input
                id="interval-input"
                type="number"
                step={0.1}
                defaultValue={1}
                placeholder="Time Interval (s)"
                required
            ></input>
        </div>
    );
};

export default Controls;
