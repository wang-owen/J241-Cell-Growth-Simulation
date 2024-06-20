import "./PetriDish.css";
import bacteria from "../assets/img/bacteria.png";

const PetriDish = ({
    cells,
    setCells,
}: {
    cells: Array<Array<boolean>>;
    setCells: React.Dispatch<React.SetStateAction<boolean[]>[]>;
}) => {
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
                            style={{
                                // Dynamic cell size based on window size
                                height: `${
                                    window.innerHeight / 1.25 / cells.length
                                }px`,
                                width: `${
                                    window.innerHeight / 1.25 / cells.length
                                }px`,
                            }}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {cell && (
                                <img src={bacteria} className="bacteria" />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PetriDish;
