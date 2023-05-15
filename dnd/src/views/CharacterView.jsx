import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const CharacterView = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({ name: [], race: [], class_type: [], level: [], alignment: []});
  const [nameInput, setNameInput] = useState("");
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
    setUserData((prevData) => {
      if (prevData.race && prevData.race.includes(race)) {
        return {
          ...prevData,
          race: prevData.race.filter((d) => d !== race),
        };
      } else {
        return {
          ...prevData,
          race: [race],
        };
      }
    });
  };

  const handleClassSelection = (class_type) => {
    setUserData((prevData) => {
      if (prevData.class_type && prevData.class_type.includes(class_type)) {
        return {
          ...prevData,
          class_type: prevData.class_type.filter((d) => d !== class_type),
        };
      } else {
        return {
          ...prevData,
          class_type: [class_type],
        };
      }
    });
  };

  const handleLevelSelection = (level) => {
    setUserData((prevData) => {
      if (prevData.level && prevData.level.includes(level)) {
        return {
          ...prevData,
          level: prevData.level.filter((d) => d !== level),
        };
      } else {
        return {
          ...prevData,
          level: [level],
        };
      }
    });
  };

  const handleAlignmentSelection = (alignment) => {
    setUserData((prevData) => {
      if (prevData.alignment && prevData.alignment.includes(alignment)) {
        return {
          ...prevData,
          alignment: prevData.alignment.filter((d) => d !== alignment),
        };
      } else {
        return {
          ...prevData,
          alignment: [alignment],
        };
      }
    });
  };


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
          <div className="grid grid-cols-2 gap-5 mt-8 mx-24">
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
            <button
              className={`btn ${userData.race && userData.race.includes("Dragonborn") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Dragonborn")}
            >
              Dragonborn
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Dwarf") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Dwarf")}
            >
              Dwarf
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Elf") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Elf")}
            >
              Elf
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Gnome") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Gnome")}
            >
              Gnome
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Half-Elf") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Half-Elf")}
            >
              Half-Elf
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Half-Orc") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Half-Orc")}
            >
              Half-Orc
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Halfling") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Halfling")}
            >
              Halfling
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Human") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Human")}
            >
              Human
            </button>
            <button
              className={`btn ${userData.race && userData.race.includes("Tiefling") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleRaceSelection("Tiefling")}
            >
              Tiefling
            </button>
          </div>
          <div className="my-8 grid grid-cols-2 gap-4 mx-auto">
            <button
                className={`btn btn-lg btn-outline btn-error w-full`}
                onClick={() => {
                  setIsNameSelected(false);
                }}
              >
                Back
            </button>
            <button
                className={`btn btn-lg btn-outline btn-success w-full ${userData.race && userData.race.length === 0 ? 'btn-disabled' : ''}`}
                onClick={() => {
                  setIsRaceSelected(true);
                  toast.success("Race Selected: " + (userData.race));
                }}
                disabled={userData.race && userData.race.length === 0}
              >
                Continue
            </button>
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
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Barbarian") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Barbarian")}
            >
              Barbarian
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Bard") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Bard")}
            >
              Bard
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Cleric") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Cleric")}
            >
              Cleric
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Druid") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Druid")}
            >
              Druid
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Fighter") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Fighter")}
            >
              Fighter
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Monk") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Monk")}
            >
              Monk
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Paladin") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Paladin")}
            >
              Paladin
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Ranger") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Ranger")}
            >
              Ranger
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Rogue") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Rogue")}
            >
              Rogue
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Sorcerer") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Sorcerer")}
            >
              Sorcerer
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Warlock") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Warlock")}
            >
              Warlock
            </button>
            <button
              className={`btn ${userData.class_type && userData.class_type.includes("Wizard") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleClassSelection("Wizard")}
            >
              Wizard
            </button>
          </div>
          <div className="my-8 grid grid-cols-2 gap-4 mx-auto">
            <button
                className={`btn btn-lg btn-outline btn-error w-full`}
                onClick={() => {
                  setIsRaceSelected(false);
                }}
              >
                Back
            </button>
            <button
                className={`btn btn-lg btn-outline btn-success w-full ${userData.class_type && userData.class_type.length === 0 ? 'btn-disabled' : ''}`}
                onClick={() => {
                  setIsClassSelected(true);
                  toast.success("Class Selected: " + (userData.class_type));
                }}
                disabled={userData.class_type && userData.class_type.length === 0}
              >
                Continue
            </button>
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
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("1") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("1")}
            >
              1
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("2") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("2")}
            >
              2
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("3") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("3")}
            >
              3
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("4") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("4")}
            >
              4
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("5") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("5")}
            >
              5
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("6") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("6")}
            >
              6
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("7") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("7")}
            >
              7
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("8") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("8")}
            >
              8
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("9") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("9")}
            >
              9
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("10") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("10")}
            >
              10
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("11") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("11")}
            >
              11
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("12") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("12")}
            >
              12
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("13") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("13")}
            >
              13
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("14") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("14")}
            >
              14
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("15") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("15")}
            >
              15
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("16") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("16")}
            >
              16
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("17") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("17")}
            >
              17
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("18") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("18")}
            >
              18
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("19") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("19")}
            >
              19
            </button>
          <button
              className={`btn text-2xl ${userData.level && userData.level.includes("20") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLevelSelection("20")}
            >
              20
            </button>
          </div>
          <div className="my-8 grid grid-cols-2 gap-4 mx-auto">
            <button
                className={`btn btn-lg btn-outline btn-error w-full`}
                onClick={() => {
                  setIsClassSelected(false);
                }}
              >
                Back
            </button>
            <button
                className={`btn btn-lg btn-outline btn-success w-full ${userData.level && userData.level.length === 0 ? 'btn-disabled' : ''}`}
                onClick={() => {
                  setIsLevelSelected(true);
                  toast.success("Level Selected: " + (userData.level));
                }}
                disabled={userData.level && userData.level.length === 0}
              >
                Continue
            </button>
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
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Lawful Good") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Lawful Good")}
            >
              Lawful Good
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Neutral Good") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Neutral Good")}
            >
              Neutral Good
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Chaotic Good") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Chaotic Good")}
            >
              Chaotic Good
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Lawful Neutral") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Lawful Neutral")}
            >
              Lawful Neutral
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("True Neutral") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("True Neutral")}
            >
              True Neutral
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Chaotic Neutral") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Chaotic Neutral")}
            >
              Chaotic Neutral
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Lawful Evil") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Lawful Evil")}
            >
              Lawful Evil
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Neutral Evil") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Neutral Evil")}
            >
              Neutral Evil
            </button>
            <button
              className={`btn ${userData.alignment && userData.alignment.includes("Chaotic Evil") ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleAlignmentSelection("Chaotic Evil")}
            >
              Chaotic Evil
            </button>
          </div>
          <div className="my-8 grid grid-cols-2 gap-4 mx-auto">
            <button
                className={`btn btn-lg btn-outline btn-error w-full ${userData.level && userData.level.length === 0 ? 'btn-disabled' : ''}`}
                onClick={() => {
                  setIsLevelSelected(false);
                }}
                disabled={userData.level && userData.level.length === 0}
              >
                Back
            </button>
            <button className="btn btn-lg btn-outline btn-success w-full"onClick={handleSubmit}>Create Character</button>
          </div>
        </>
      )}
    </div>
  )
}






export default CharacterView