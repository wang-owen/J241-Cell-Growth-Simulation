import "./PetriDish.css";
import { useState } from "react";

const PetriDish = () => {
    const gridSize: number = 20;

    const [cells, setCells] = useState(
        Array(gridSize).fill(Array(gridSize).fill(false))
    );

    const handleClick = (row: number, col: number) => {
        const newCells = cells.map((r, rowIndex) =>
            r.map((cell: any, colIndex: any) =>
                rowIndex === row && colIndex === col ? !cell : cell
            )
        );
        setCells(newCells);
    };

    return (
        <div className="grid">
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: any, colIndex: any) => (
                        <div
                            key={colIndex}
                            className="cell"
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {cell && <div className="circle"></div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PetriDish;
