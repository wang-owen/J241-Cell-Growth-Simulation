import "./App.css";
import { useEffect, useState, useRef } from "react";
import PetriDish from "./components/PetriDish";
import Controls from "./components/Controls";
import Graph from "./components/Graph";

function App() {
    const defaultGridSize: number = 20;
    const [gridSize, setGridSize] = useState<number>(defaultGridSize);
    const [cells, setCells] = useState(
        Array(defaultGridSize).fill(Array(defaultGridSize).fill(false))
    );
    const [timeInterval, setTimeInterval] = useState<number>(1);
    const [running, setRunning] = useState<boolean>(false);
    const intervalRef = useRef<number>(-1);

    const [growthCoords, setGrowthCoords] = useState<number[][]>([]);
    const time = useRef<number>(0);

    const startSim = () => {
        let initCount = true;
        let initCellCount = 0;
        return setInterval(() => {
            let cellCount = 0;
            setCells((prevCells) => {
                const newCells = prevCells.map((row) => row.slice());
                for (let i = 0; i < prevCells.length; i++) {
                    for (let j = 0; j < prevCells[i].length; j++) {
                        if (prevCells[i][j]) {
                            if (initCount) {
                                initCellCount++;
                            }

                            let empty = [];
                            if (j > 0 && !prevCells[i][j - 1])
                                empty.push([i, j - 1]); // Left
                            if (
                                j < prevCells[i].length - 1 &&
                                !prevCells[i][j + 1]
                            )
                                empty.push([i, j + 1]); // Right
                            if (i > 0 && !prevCells[i - 1][j])
                                empty.push([i - 1, j]); // Up
                            if (
                                i < prevCells.length - 1 &&
                                !prevCells[i + 1][j]
                            )
                                empty.push([i + 1, j]); // Down

                            if (empty.length > 0) {
                                const [spreadI, spreadJ] =
                                    empty[
                                        Math.floor(Math.random() * empty.length)
                                    ];
                                newCells[spreadI][spreadJ] = true;
                                cellCount++;
                            }
                        }
                    }
                }
                if (initCount) {
                    initCount = false;
                    setGrowthCoords((prevCoords) => {
                        const coords = [
                            ...prevCoords,
                            [time.current, initCellCount],
                        ];
                        return coords;
                    });
                }
                return newCells;
            });
            time.current += timeInterval;
            setGrowthCoords((prevCoords) => {
                const coords = [...prevCoords, [time.current, cellCount]];
                return coords;
            });
        }, timeInterval * 1000);
    };

    useEffect(() => {
        if (running) {
            if (Number.isNaN(timeInterval) || timeInterval < 1) {
                setRunning(false);
                alert("Time interval must be at least 1");
            } else if (Number.isNaN(gridSize) || gridSize < 1) {
                setRunning(false);
                alert("Grid size must be at least 1");
            } else {
                intervalRef.current = startSim();
            }
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [running, timeInterval]);

    return (
        <>
            <div className="main">
                <PetriDish cells={cells} setCells={setCells} />
                <Controls
                    setGridSize={setGridSize}
                    setCells={setCells}
                    setTimeInterval={setTimeInterval}
                    running={running}
                    setRunning={setRunning}
                    time={time}
                    setGrowthCoords={setGrowthCoords}
                />
                <Graph coords={growthCoords} />
            </div>
        </>
    );
}

export default App;
