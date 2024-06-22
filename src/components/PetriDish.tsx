import "./PetriDish.css";
import bacteria from "../assets/img/bacteria.png";

const PetriDish = ({
    cells,
    setCells,
}: {
    cells: boolean[][];
    setCells: React.Dispatch<React.SetStateAction<boolean[]>[]>;
}) => {
    // Add/remove bacteria on click
    const handleClick = (row: number, col: number): void => {
        const newCells = cells.map((r, rowIndex) =>
            r.map((cell: boolean, colIndex: number) =>
                rowIndex === row && colIndex === col ? !cell : cell
            )
        );
        setCells(newCells);
    };

    // Calculate cell width dynamically based on window size
    const cellWidth =
        window.innerHeight / 1.25 / Math.max(cells.length, cells[0].length);

    return (
        <div className="grid">
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: boolean, colIndex: number) => (
                        <div
                            key={colIndex}
                            className="cell"
                            style={{
                                // Dynamic cell size based on window size
                                width: `${cellWidth}px`,
                                height: `${cellWidth}px`,
                            }}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {cell && (
                                <img
                                    src={bacteria}
                                    className="bacteria"
                                    style={{
                                        width: `${cellWidth}px`,
                                        height: `${cellWidth}px`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PetriDish;
