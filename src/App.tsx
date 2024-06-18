import "./App.css";
import PetriDish from "./components/PetriDish";

function App() {
    return (
        <>
            <div id="title">
                <h1>J241 Cell Growth Simulation</h1>
            </div>
            <div id="petri-dish">
                <PetriDish />
            </div>
        </>
    );
}

export default App;
