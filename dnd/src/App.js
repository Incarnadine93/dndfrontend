import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/Container";
import Navbar from "./components/Navbar";
import "./styles/globals.css";
import HomeView from "./views/HomeView";
import EncounterView from "./views/EncounterView";
import MonsterView from "./views/MonsterView";
import Footer from "./components/Footer";
import CharacterView from "./views/CharacterView";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toaster position="bottom-center"  />
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/Encounter" element={<EncounterView />}/>
          <Route path="/monster/:id" element={<MonsterView />}/>
          <Route path="/Character" element={<CharacterView />}/>
        </Routes>
      </AppContainer>
      <Footer />
    </div>
  );
}

export default App;

