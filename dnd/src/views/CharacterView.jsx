import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const CharacterView = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [nameinput, setNameInput] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
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
  const handleNameSelection = (name) => {
    setUserData({ ...userData, name });
    setIsNameSelected(true);
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
       {!isNameSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step step-primary">Name</li>
            <li className="step">Race</li>
            <li className="step">Class</li>
            <li className="step">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid grid-cols-3 gap-5 mt-8 mx-24">
            <input
              type="text"
              placeholder="Type name here"
              className="input input-bordered input-warning"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                handleNameSelection(nameInput);
                toast.success(`Name selected: ${nameInput}`);
              }}
            >
              Submit
            </button>
          </div>
        </>
            )} 

      {isNameSelected && !isRaceSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Name</li>
            <li className="step step-primary">Race</li>
            <li className="step">Class</li>
            <li className="step">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl">Please select your race</div>
          <div className="grid grid-cols-3 gap-5 mt-8 mx-24">
            <button className="btn" onClick={() => { handleRaceSelection("Dragonborn"); toast.success("Dragonborn selected"); }}>Dragonborn</button>
            <button className="btn" onClick={() => { handleRaceSelection("Dwarf"); toast.success("Dwarf selected"); }}>Dwarf</button>
            <button className="btn" onClick={() => { handleRaceSelection("Elf"); toast.success("Elf selected"); }}>Elf</button>
            <button className="btn" onClick={() => { handleRaceSelection("Gnome"); toast.success("Gnome selected"); }}>Gnome</button>
            <button className="btn" onClick={() => { handleRaceSelection("Half-Elf"); toast.success("Half-Elf selected"); }}>Half-Elf</button>
            <button className="btn" onClick={() => { handleRaceSelection("Half-Orc"); toast.success("Half-Orc selected"); }}>Half-Orc</button>
            <button className="btn" onClick={() => { handleRaceSelection("Halfling"); toast.success("Halfling selected"); }}>Halfling</button>
            <button className="btn" onClick={() => { handleRaceSelection("Human"); toast.success("Human selected"); }}>Human</button>
            <button className="btn" onClick={() => { handleRaceSelection("Tiefling"); toast.success("Tiefling selected"); }}>Tiefling</button>
          </div>
        </>
      )}
      {/* Class input */}
      {isRaceSelected && !isClassSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Name</li>
            <li className="step">Race</li>
            <li className="step step-primary">Class</li>
            <li className="step">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl">Please input your class</div>
          <div className="grid grid-cols-4 gap-5 mt-8 mx-24">
            <button className="btn" onClick={() => { handleClassSelection("Barbarian"); toast.success("Barbarian selected"); }}>Barbarian</button>
            <button className="btn" onClick={() => { handleClassSelection("Bard"); toast.success("Bard selected"); }}>Bard</button>
            <button className="btn" onClick={() => { handleClassSelection("Cleric"); toast.success("Cleric selected"); }}>Cleric</button>
            <button className="btn" onClick={() => { handleClassSelection("Druid"); toast.success("Druid selected"); }}>Druid</button>
            <button className="btn" onClick={() => { handleClassSelection("Fighter"); toast.success("Fighter selected"); }}>Fighter</button>
            <button className="btn" onClick={() => { handleClassSelection("Monk"); toast.success("Monk selected"); }}>Monk</button>
            <button className="btn" onClick={() => { handleClassSelection("Paladin"); toast.success("Paladin selected"); }}>Paladin</button>
            <button className="btn" onClick={() => { handleClassSelection("Ranger"); toast.success("Ranger selected"); }}>Ranger</button>
            <button className="btn" onClick={() => { handleClassSelection("Rogue"); toast.success("Rogue selected"); }}>Rogue</button>
            <button className="btn" onClick={() => { handleClassSelection("Sorcerer"); toast.success("Sorcerer selected"); }}>Sorcerer</button>
            <button className="btn" onClick={() => { handleClassSelection("Warlock"); toast.success("Warlock selected"); }}>Warlock</button>
            <button className="btn" onClick={() => { handleClassSelection("Wizard"); toast.success("Wizard selected"); }}>Wizard</button>
          </div>
        </>
      )}

      {/* player levels input */}
      {isClassSelected && !isLevelSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Name</li>
            <li className="step">Race</li>
            <li className="step">Class</li>
            <li className="step step-primary">Level</li>
            <li className="step">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8">Please select your level</div>
          <div className="grid grid-cols-5 gap-5 mt-8 mx-24">
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(1); toast.success("Level 1 selected"); }}>1</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(2); toast.success("Level 2 selected"); }}>2</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(3); toast.success("Level 3 selected"); }}>3</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(4); toast.success("Level 4 selected"); }}>4</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(5); toast.success("Level 5 selected"); }}>5</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(6); toast.success("Level 6 selected"); }}>6</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(7); toast.success("Level 7 selected"); }}>7</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(8); toast.success("Level 8 selected"); }}>8</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(9); toast.success("Level 9 selected"); }}>9</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(10); toast.success("Level 10 selected"); }}>10</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(11); toast.success("Level 11 selected"); }}>11</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(12); toast.success("Level 12 selected"); }}>12</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(13); toast.success("Level 13 selected"); }}>13</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(14); toast.success("Level 14 selected"); }}>14</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(15); toast.success("Level 15 selected"); }}>15</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(16); toast.success("Level 16 selected"); }}>16</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(17); toast.success("Level 17 selected"); }}>17</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(18); toast.success("Level 18 selected"); }}>18</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(19); toast.success("Level 19 selected"); }}>19</button>
            <button className="btn text-2xl" onClick={() => { handleLevelSelection(20); toast.success("Level 20 selected"); }}>20</button>
          </div>
        </>
      )}
      {/* Alignment */}
      {isLevelSelected && (
        <>
          <ul className="steps steps-vertical lg:steps-horizontal my-3">
            <li className="step">Name</li>
            <li className="step">Race</li>
            <li className="step">Class</li>
            <li className="step">Level</li>
            <li className="step step-primary">Alignment</li>
          </ul>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8">Please select your alignment</div>
          <div className="grid grid-cols-3 gap-5 justify-center mt-8 mx-36">
            <button className="btn" onClick={() => { handleAlignmentSelection("Lawful Good"); toast.success("Lawful Good alignment selected"); }}>
              Lawful<br />Good
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Neutral Good"); toast.success("Neutral Good alignment selected"); }}>
              Neutral<br />Good
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Chaotic Good"); toast.success("Chaotic Good alignment selected"); }}>
              Chaotic<br />Good
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Lawful Neutral"); toast.success("Lawful Neutral alignment selected"); }}>
              Lawful<br />Neutral
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("True Neutral"); toast.success("True Neutral alignment selected"); }}>
              True<br />Neutral
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Chaotic Neutral"); toast.success("Chaotic Neutral alignment selected"); }}>
              Chaotic<br />Neutral
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Lawful Evil"); toast.success("Lawful Evil alignment selected"); }}>
              Lawful<br />Evil
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Neutral Evil"); toast.success("Neutral Evil alignment selected"); }}>
              Neutral<br />Evil
            </button>
            <button className="btn" onClick={() => { handleAlignmentSelection("Chaotic Evil"); toast.success("Chaotic Evil alignment selected"); }}>
              Chaotic<br />Evil
            </button>
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