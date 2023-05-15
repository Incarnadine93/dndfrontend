import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";
import { toast } from 'react-hot-toast';

const EncounterView = () => {
    const [encounterData, setEncounterData] = useState({ level: [], type: [], difficulty: '' });
    const [ characters, setCharacters ] = useState([]);
    const [ monsters, setMonsters ] = useState([]);
    const [ xpThresholds, setXpThresholds ] = useState([]);
    const [ isPlayersSelected, setIsPlayersSelected ] = useState(false);
    const [ isMonTypesSelected, setIsMonTypesSelected ] = useState(false);
    const [ isDifficultySelected, setIsDifficultySelected ] = useState(false);
    const [ generatedMonsters, setGeneratedMonsters ] = useState([]);

    useEffect(() => {
        const getCharacters = async () => {
            const res = await axios.get(WEB_URL + "/characters");
            console.log("res");
            console.log(res.data);
            if (res.data.status === "ok") {
                const newCharacters = res.data.data;
                setCharacters(newCharacters);
            }
        };
        getCharacters();
    }, []);

    useEffect(() => {
        const getMonsters = async () => {
            const res = await axios.get(WEB_URL + "/monsters");
            console.log("res");
            console.log(res.data);
            if (res.data.status === "ok") {
                const newMonsters = res.data;
                setMonsters(newMonsters);
            }
        };
        getMonsters();
    }, []);

    useEffect(() => {
        const getXpThresholds = async () => {
            const res = await axios.get(WEB_URL + "/xpthreshholds");
            console.log("res");
            console.log(res.data);
            if (res.data.status === "ok") {
                const newXpThresholds = res.data;
                setXpThresholds(newXpThresholds);
            }
        };
        getXpThresholds();
    }, []);

    const handlePlayerSelection = (level) => {
      console.log("handlePlayerSelection");
      console.log(level);
      setEncounterData((prevData) => {
        if (prevData.level.includes(level)) {
          // Remove the selected level from the encounterData array
          return { ...prevData, level: prevData.level.filter((l) => l !== level) };
        } else {
          // Add the selected level to the encounterData array
          return { ...prevData, level: [...prevData.level, level] };
        }
      });
    };

    const handleTypeSelection = (type) => {
      console.log(encounterData)
      setEncounterData((prevData) => {
        if (prevData.type && prevData.type.includes(type)) {
          // Remove the selected type from the encounterData array
          return {
            ...prevData,
            type: prevData.type.filter((t) => t !== type)
          };
        } else {
          // Add the selected type to the encounterData array
          return {
            ...prevData,
            type: [...(prevData.type || []), type]
          };
        }
      });
    };

    const handleDifficultySelection = (difficulty) => {
      console.log(encounterData)
      setEncounterData((prevData) => {
        if (prevData.difficulty && prevData.difficulty.includes(difficulty)) {
          // Remove the selected difficulty from the encounterData
          return {
            ...prevData,
            difficulty: prevData.difficulty.filter((d) => d !== difficulty),
          };
        } else {
          // Add or update the selected difficulty in the encounterData
          return {
            ...prevData,
            difficulty: [difficulty],
          };
        }
      });
    };

    const handleGenerateEncounter = async () => {
    
      const numPlayers = encounterData.level.length;
    
      const avgLevel = Math.round(encounterData.level.reduce((a, b) => a + b, 0) / encounterData.level.length);
    
      const difficulty = encounterData.difficulty[0].toLowerCase();
    
      const difficultyXp = xpThresholds.data[avgLevel + 1][difficulty];
    
      const encounterXp = difficultyXp * numPlayers;
    
      const monTypes = encounterData.type;
      // Get the list of monsters.
      const mons = monsters.data.filter((m) => monTypes.includes(m.type) && m.xp <= encounterXp);

      // Create an array to store the generated monsters.
      const generatedMonsters = [];

      // Get the total XP of the generated monsters.
      let totalGeneratedXp = 0;
    
      for (const monster of mons) {
        if (monster.xp <= encounterXp) {
          generatedMonsters.push(monster);
          totalGeneratedXp += monster.xp;
        }
      }
    
      // Set the generated monsters.
      setGeneratedMonsters(generatedMonsters);

    };
    


    return (
      <>
        <div className="flex flex-col w-full border-opacity-50 items-center justify-center mt-8">
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-6/12 font-medium text-2xl">
            Encounter Generator
          </div>
          {!isPlayersSelected && (
            <>
              <ul className="steps steps-vertical lg:steps-horizontal my-3">
                <li className="step step-primary">Players</li>
                <li className="step">Creature Types</li>
                <li className="step">Difficulty</li>
                <li className="step">Encounter</li>
              </ul>
              <div className="btn-group gap-2 justify-center">
                {characters.map((character) => (
                  <button
                    className={`btn h-auto w-full px-8 py-4 max-w-[350px] ${encounterData.level.includes(character.level) ? 'btn-primary' : ''}`}
                    onClick={() => handlePlayerSelection(character.level)}
                    key={character.id}
                  >
                    <div>
                      <div>
                        <h2 className="card-title">Name: {character.name}</h2>
                        <h2 className="card-title">Level: {character.level}</h2>
                        <h2 className="card-title">Class: {character.class_type}</h2>
                        <h2 className="card-title">Race: {character.race} </h2>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 my-8 gap-5">
                <button
                  className={`btn btn-outline btn-success px-4 ${encounterData.length === 0 ? 'btn-disabled' : ''}`}
                  onClick={() => {
                    setIsPlayersSelected(true);
                    toast.success("Players selected");
                  }}
                  disabled={encounterData.length === 0}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {isPlayersSelected && !isMonTypesSelected && (
            <>
                <ul className="steps steps-vertical lg:steps-horizontal my-3">
                  <li className="step">Players</li>
                  <li className="step step-primary">Creature Types</li>
                  <li className="step">Difficulty</li>
                  <li className="step">Encounter</li>
                </ul>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
              Please select up to five<br />creature types
            </div>
            <div className="grid grid-cols-5 gap-5 my-8 mx-16">
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("aberration") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("aberration")}
            >
              Aberration
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("beast") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("beast")}
            >
              Beast
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("celestial") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("celestial")}
            >
              Celestial
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("construct") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("construct")}
            >
              Construct
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("dragon") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("dragon")}
            >
              Dragon
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("elemental") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("elemental")}
            >
              Elemental
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("fey") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("fey")}
            >
              Fey
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("fiend") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("fiend")}
            >
              Fiend
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("giant") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("giant")}
            >
              Giant
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("humanoid") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("humanoid")}
            >
              Humanoid
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("monstrosity") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("monstrosity")}
            >
              Monstrosity
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("ooze") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("ooze")}
            >
              Ooze
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("plant") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("plant")}
            >
              Plant
            </button>
            <button
              className={`btn btn-lg ${encounterData.type && encounterData.type.includes("undead") ? 'btn-primary' : ''}`}
              onClick={() => handleTypeSelection("undead")}
            >
              Undead
            </button>
            <button
              className={`btn btn-lg btn-outline btn-success px-4 ${encounterData.type && encounterData.type.length === 0 ? 'btn-disabled' : ''}`}
              onClick={() => {
                setIsMonTypesSelected(true);
                toast.success("Creature types selected: " + (encounterData.type && encounterData.type.join(", ")));
              }}
              disabled={encounterData.type && encounterData.type.length === 0}
            >
              Continue
            </button>
            </div>
            </>
            )}
            {isMonTypesSelected && !isDifficultySelected && (
              <>
              <ul className="steps steps-vertical lg:steps-horizontal my-3">
                  <li className="step">Players</li>
                  <li className="step">Creature Types</li>
                  <li className="step step-primary">Difficulty</li>
                  <li className="step">Encounter</li>
                </ul>
              <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
              Please select the difficulty of the encounter
              </div>
                <div className="grid grid-cols-4 gap-5 my-8 mx-16">
                <button
                  className={`btn btn-lg ${encounterData.difficulty && encounterData.difficulty.includes("Easy") ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleDifficultySelection("Easy")}
                >
                  Easy
                </button>
                <button
                  className={`btn btn-lg ${encounterData.difficulty && encounterData.difficulty.includes("Medium") ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleDifficultySelection("Medium")}
                >
                  Medium
                </button>
                <button
                  className={`btn btn-lg ${encounterData.difficulty && encounterData.difficulty.includes("Hard") ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleDifficultySelection("Hard")}
                >
                  Hard
                </button>
                <button
                  className={`btn btn-lg ${encounterData.difficulty && encounterData.difficulty.includes("Deadly") ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleDifficultySelection("Deadly")}
                >
                  Deadly
                </button>
                <button
                  className={`btn btn-lg btn-outline btn-success px-4 ${encounterData.difficulty.length === 0 ? 'btn-disabled' : ''}`}
                  onClick={() => {
                    setIsDifficultySelected(true);
                    handleGenerateEncounter();
                    toast.success("Difficulty selected: " + (encounterData.difficulty && encounterData.difficulty.join(", ")));
                  }}
                  disabled={encounterData.difficulty.length === 0}
                >
                  Generate
                </button>
              </div>
              </>
              )}
              {isDifficultySelected && (
                <>
                <ul className="steps steps-vertical lg:steps-horizontal my-3">
                  <li className="step">Players</li>
                  <li className="step">Creature Types</li>
                  <li className="step">Difficulty</li>
                  <li className="step step-primary">Encounter</li>
                </ul>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
                Here are your monsters!
                </div>
                <div className="grid grid-cols-3 gap-5 my-8 mx-16">
                  {generatedMonsters.map((monster, index) => (
                    <div key={index} className="card bg-base-300 rounded-box place-items-center w-10/12 text-xl mt-8 text-left">
                      <div className="card-body">
                        <h2 className="card-title">{monster.name}</h2>
                        <p className="card-text">{monster.size} {monster.type}</p>
                        <p className="card-text">Challenge Rating: {monster.challenge_rating}</p>
                        <p className="card-text">Armor Class: {monster.armor_class}</p>
                        <p className="card-text">Hit Points: {monster.hit_points}</p>
                        <p className="card-text">Strength: {monster.strength}</p>
                        <p className="card-text">Dexterity: {monster.dexterity}</p>
                        <p className="card-text">Constitution: {monster.constitution}</p>
                        <p className="card-text">Intelligence: {monster.intelligence}</p>
                        <p className="card-text">Wisdom: {monster.wisdom}</p>
                        <p className="card-text">Charisma: {monster.charisma}</p>
                        <a href={`/monster/${monster.id}`} target="_blank">
                          <button className="btn btn-outline btn-error">More Info</button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                </>
              )}
          {/* bottom */}
        </div>
      </>
    );
};
    

export default EncounterView;

