import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const CharacterView = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isRaceSelected, setIsRaceSelected] = useState(false);
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [isLevelSelected, setIsLevelSelected] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    console.log(user.uid)
    try {
      const body = {
        user_uid: user.uid,
        userData: userData 
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", };
      const response = await axios.post(`${WEB_URL}/api/character`, body, headers);

      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRaceSelection = (race) => {
    setUserData({ ...userData, race });
    setIsRaceSelected(true);
  };

  const handleClassSelection = (classType) => {
    setUserData({ ...userData, class_type: classType });
    setIsClassSelected(true);
  };

  const handleLevelSelection = (level) => {
    setUserData({ ...userData, level });
    setIsLevelSelected(true);
  };
  const handleAlignmentSelection = (alignment) => {
    setUserData({ ...userData, alignment });
  }

      return (
        <div className="flex flex-col w-full border-opacity-50 items-center justify-center mt-6">
        <>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-6/12 font-medium text-2xl">Character Creator</div>
          <div className="divider"></div>
          {/* Race input */}
        </>
        
      {!isRaceSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step step-primary">Race</li>
            <li className="step">Class</li>
            <li className="step">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl">Please select your race</div>
          <div className="grid grid-cols-3 gap-5 mt-8 mx-24">
            <button className="btn" onClick={() => handleRaceSelection("Dragonborn")}>Dragonborn</button>
            <button className="btn" onClick={() => handleRaceSelection("Dwarf")}>Dwarf</button>
            <button className="btn" onClick={() => handleRaceSelection("Elf")}>Elf</button>
            <button className="btn" onClick={() => handleRaceSelection("Gnome")}>Gnome</button>
            <button className="btn" onClick={() => handleRaceSelection("Half-Elf")}>Half-Elf</button>
            <button className="btn" onClick={() => handleRaceSelection("Half-Orc")}>Half-Orc</button>
            <button className="btn" onClick={() => handleRaceSelection("Halfling")}>Halfling</button>
            <button className="btn" onClick={() => handleRaceSelection("Human")}>Human</button>
            <button className="btn" onClick={() => handleRaceSelection("Tiefling")}>Tiefling</button>
          </div>
        </>
      )}
      {/* Class input */}
      {isRaceSelected && !isClassSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Race</li>
            <li className="step step-primary">Class</li>
            <li className="step">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl">Please input your class</div>
          <div className="grid grid-cols-4 gap-5 mt-8 mx-24">
            <button className="btn" onClick={() => handleClassSelection("Barbarian")}>Barbarian</button>
            <button className="btn" onClick={() => handleClassSelection("Bard")}>Bard</button>
            <button className="btn" onClick={() => handleClassSelection("Cleric")}>Cleric</button>
            <button className="btn" onClick={() => handleClassSelection("Druid")}>Druid</button>
            <button className="btn" onClick={() => handleClassSelection("Fighter")}>Fighter</button>
            <button className="btn" onClick={() => handleClassSelection("Monk")}>Monk</button>
            <button className="btn" onClick={() => handleClassSelection("Paladin")}>Paladin</button>
            <button className="btn" onClick={() => handleClassSelection("Ranger")}>Ranger</button>
            <button className="btn" onClick={() => handleClassSelection("Rogue")}>Rogue</button>
            <button className="btn" onClick={() => handleClassSelection("Sorcerer")}>Sorcerer</button>
            <button className="btn" onClick={() => handleClassSelection("Warlock")}>Warlock</button>
            <button className="btn" onClick={() => handleClassSelection("Wizard")}>Wizard</button>
          </div>
        </>
      )}

      {/* player levels input */}
      {isClassSelected && !isLevelSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Race</li>
            <li className="step">Class</li>
            <li className="step step-primary">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8">Please select your level</div>
          <div className="grid grid-cols-5 gap-5 mt-8 mx-24">
            <button className="btn text-2xl" onClick={() => handleLevelSelection(1)}>1</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(2)}>2</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(3)}>3</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(4)}>4</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(5)}>5</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(6)}>6</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(7)}>7</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(8)}>8</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(9)}>9</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(10)}>10</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(11)}>11</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(12)}>12</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(13)}>13</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(14)}>14</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(15)}>15</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(16)}>16</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(17)}>17</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(18)}>18</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(19)}>19</button>
            <button className="btn text-2xl" onClick={() => handleLevelSelection(20)}>20</button>
          </div>
        </>
      )}
      {/* Alignment */}
      {isLevelSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Race</li>
            <li className="step">Class</li>
            <li className="step">Level</li>
            <li className="step step-primary">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8">Please select your alignment</div>
          <div className="grid grid-cols-3 gap-5 justify-center mt-8 mx-36">
            <button className="btn" onClick={() => handleAlignmentSelection("Lawful Good")}>Lawful<br />Good</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Neutral Good")}>Neutral<br />Good</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Chaotic Good")}>Chaotic<br />Good</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Lawful Neutral")}>Lawful<br />Neutral</button>
            <button className="btn" onClick={() => handleAlignmentSelection("True Neutral")}>True<br />Neutral</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Chaotic Neutral")}>Chaotic<br />Neutral</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Lawful Evil")}>Lawful<br />Evil</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Neutral Evil")}>Neutral<br />Evil</button>
            <button className="btn" onClick={() => handleAlignmentSelection("Chaotic Evil")}>Chaotic<br />Evil</button>
          </div>
          <div>
            <button className="btn btn-outline btn-success my-8"onClick={handleSubmit}>Create Character</button>
          </div>
        </>
      )}
    </div>
  )
}






export default CharacterView