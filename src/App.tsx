import "./App.css";
import { useState } from "react";
import PetriDish from "./components/PetriDish";
import Controls from "./components/Controls";

function App() {
    const gridSize: number = 20;
    const [cells, setCells] = useState(
        Array(gridSize).fill(Array(gridSize).fill(false))
    );
    return (
        <>
            <div className="main">
                <PetriDish cells={cells} setCells={setCells} />
                <Controls gridSize={gridSize} setCells={setCells} />
            </div>
        </>
    );
}

export default App;
