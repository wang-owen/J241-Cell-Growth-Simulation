import "./App.css";
import { useEffect, useState, useRef } from "react";
import PetriDish from "./components/PetriDish";
import Controls from "./components/Controls";
import Graph from "./components/Graph";

function App() {
    const defaultGridSize: number[] = [20, 20];

    // Petri dish vars
    const [gridSize, setGridSize] = useState<number[]>(defaultGridSize);
    const [cells, setCells] = useState(
        Array(defaultGridSize[0]).fill(Array(defaultGridSize[1]).fill(false))
    );
    const [timeInterval, setTimeInterval] = useState<number>(1);
    const [running, setRunning] = useState<boolean>(false);
    const intervalRef = useRef<number>(-1);

    // Graph vars
    const [growthCounts, setGrowthCounts] = useState<number[]>([0]);

    const split = (): void => {
        let growthCount: number = 0;
        setCells((prevCells) => {
            const newCells = prevCells.map((row) => row.slice());
            // Loop through each cell
            for (let i = 0; i < prevCells.length; i++) {
                for (let j = 0; j < prevCells[i].length; j++) {
                    if (prevCells[i][j]) {
                        // Determine empty cells next to existing bacteria
                        let empty = [];
                        // Left
                        if (j > 0 && !newCells[i][j - 1]) {
                            empty.push([i, j - 1]);
                        }
                        // Right
                        if (
                            j < prevCells[i].length - 1 &&
                            !newCells[i][j + 1]
                        ) {
                            empty.push([i, j + 1]);
                        }
                        // Up
                        if (i > 0 && !newCells[i - 1][j]) {
                            empty.push([i - 1, j]);
                        }
                        // Down
                        if (i < prevCells.length - 1 && !newCells[i + 1][j]) {
                            empty.push([i + 1, j]);
                        }

                        // Split bacteria into an empty cell
                        if (empty.length > 0) {
                            const [a, b] =
                                empty[Math.floor(Math.random() * empty.length)];
                            newCells[a][b] = true;
                            growthCount++;
                        }
                    }
                }
            }
            return newCells;
        });

        // Write cell count after split to graph
        setGrowthCounts((prevGrowthCount) => {
            return [...prevGrowthCount, growthCount];
        });
    };

    const startSim = (): number => {
        return setInterval(split, timeInterval * 1000);
    };

    useEffect(() => {
        if (running) {
            // Error check input fields
            if (Number.isNaN(timeInterval) || timeInterval < 1) {
                setRunning(false);
                alert("Time interval must be at least 1");
            } else if (
                Number.isNaN(gridSize[0]) ||
                gridSize[0] < 1 ||
                Number.isNaN(gridSize[1]) ||
                gridSize[1] < 1
            ) {
                setRunning(false);
                alert("Grid size must be at least 1");
            } else {
                intervalRef.current = startSim();
            }
        } else {
            // Run simulation
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [running]);

    return (
        <main>
            <PetriDish cells={cells} setCells={setCells} />
            <Controls
                gridSize={gridSize}
                setGridSize={setGridSize}
                setCells={setCells}
                setTimeInterval={setTimeInterval}
                running={running}
                setRunning={setRunning}
                setGrowthCounts={setGrowthCounts}
            />
            <Graph
                timeInterval={timeInterval}
                coords={growthCounts}
                gridSize={gridSize}
            />
        </main>
    );
}

export default App;
