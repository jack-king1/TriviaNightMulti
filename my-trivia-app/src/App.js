import Layout from "./Components/Layout";
import ScreenOverlay from "./Components/Animations/ScreenOverlay";
import logo from "./logo.svg";

function App() {
    return (
        <div className="min-h-screen max-h-screen bg-homebg flex flex-row justify-center overflow-hidden">
            <Layout />
            <ScreenOverlay />
        </div>
    );
}

export default App;
