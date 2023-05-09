import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";
import React from "react";


const EncounterView = () => {
  const [monsters, setMonsters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isplayersSelected, setIsPlayersSelected] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [playerLevels, setPlayerLevels] = useState([]);
  const [generatedMonsters, setGeneratedMonsters] = useState([]);



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

  const handlePlayerSelection = (level) => {
    setIsPlayersSelected(true);
    if (playerLevels.includes(level)) {
      setPlayerLevels([]);
    } else {
      setPlayerLevels([level]);
    }
  };

  const handleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const generateMonsterSet = (levels, types, difficulty) => {
    const filteredMonsters = monsters.filter(monster => types.includes(monster.type) && levels.includes(monster.challenge_rating));
    const numPlayers = levels.length;
    const difficultyMultiplier = {
      easy: 0.5,
      medium: 1,
      hard: 1.5,
      deadly: 2,
    };
    const difficultyThreshold = numPlayers * difficultyMultiplier[difficulty];
  
    let totalChallengeRating = 0;
    const generatedMonsters = [];
    while (totalChallengeRating < difficultyThreshold) {
      if (filteredMonsters.length === 0) {
        break;
      }
  
      const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
      const selectedMonster = filteredMonsters[randomIndex];
  
      generatedMonsters.push(selectedMonster);
  
      totalChallengeRating += selectedMonster.challenge_rating;
  
      filteredMonsters.splice(randomIndex, 1);
    }
  
    return generatedMonsters;
  };

  const handleDifficultySelection = (difficulty) => {
    const generatedMonsters = generateMonsterSet(playerLevels, selectedTypes, difficulty);
    setGeneratedMonsters(generatedMonsters);
  };


  return (
    <>
        <div className="flex flex-col w-full border-opacity-50 items-center justify-center mt-8">
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-6/12 font-medium text-2xl">
            Encounter Generator
            </div>
        {/* amount of players input */}
        </div>
        {!isplayersSelected && (
            <>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8">
                    Please select which players to embark on the journey
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-5 gap-5 py-16 px-16">
                    {characters.map((character) => (
                    <button
                    className={`btn btn-lg grid grid-cols-2 ${playerLevels.includes(character.level) ? 'btn-primary' : ''}`}
                    onClick={() => handlePlayerSelection(character.level)}
                    key={character.id}
                    >
                    <div>
                        <div>Level: {character.level}</div>
                        <div>Class: {character.class_type}</div>
                        <div>Race: {character.race}</div>
                        <div>Alignment: {character.alignment}</div>
                    </div>
                    </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 my-8 gap-5">
                    <input
                    type="text"
                    placeholder="Type here to search"
                    className="input input-warning w-full max-w-xs px-4"
                    />
                    <button
                    className="btn btn-outline btn-success px-4"
                    onClick={() => handlePlayerSelection("player")}
                    >
                    Continue
                    </button>
                </div>
            </>
            )}
            {isplayersSelected && (
            <>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
              Please select up to five<br />creature types
            </div>
            <div className="grid grid-cols-5 gap-5 mt-8 mx-16">
              <button
                className={`btn ${selectedTypes.includes('Aberation') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Aberation')}
              >
                Aberation
              </button>
              <button
                className={`btn ${selectedTypes.includes('Beast') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Beast')}
              >
                Beast
              </button>
              <button
                className={`btn ${selectedTypes.includes('Celestial') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Celestial')}
              >
                Celestial
              </button>
              <button
                className={`btn ${selectedTypes.includes('Construct') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Construct')}
              >
                Construct
              </button>
              <button
                className={`btn ${selectedTypes.includes('Dragon') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Dragon')}
              >
                Dragon
              </button>
              <button
                className={`btn ${selectedTypes.includes('Elemental') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Elemental')}
              >
                Elemental
              </button>
              <button
                className={`btn ${selectedTypes.includes('Fey') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Fey')}
              >
                Fey
              </button>
              <button
                className={`btn ${selectedTypes.includes('Fiend') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Fiend')}
              >
                Fiend
              </button>
              <button
                className={`btn ${selectedTypes.includes('Giant') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Giant')} 
              >
                Giant
              </button>
              <button
                className={`btn ${selectedTypes.includes('Humanoid') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Humanoid')}
              >
                Humanoid
              </button>
              <button
                className={`btn ${selectedTypes.includes('Monstrosity') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Monstrosity')}
              >
                Monstrosity
              </button>
              <button
                className={`btn ${selectedTypes.includes('Ooze') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Ooze')}
              >
                Ooze
              </button>
              <button
                className={`btn ${selectedTypes.includes('Plant') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Plant')} 
              >
                Plant
              </button>
              <button
                className={`btn ${selectedTypes.includes('Undead') ? 'btn-primary' : ''}`}
                onClick={() => handleTypeSelection('Undead')}
              >
                Undead
              </button>
            </div>

              {selectedTypes.length > 0 && selectedTypes.length <= 5 && (
                <button className="btn btn-outline btn-success px-4 my-4" onClick={handleDifficultySelection}>
                    Continue
                </button>
                )}
            </>
            )}
            {isplayersSelected && selectedTypes.length > 0 && (
            <>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
                  Please select the desired difficulty level
                </div>
                <div className="grid grid-cols-4 gap-5 mt-8 mx-16">
                  <button className="btn btn-outline" onClick={() => handleDifficultySelection('easy')}>Easy</button>
                  <button className="btn btn-outline" onClick={() => handleDifficultySelection('medium')}>Medium</button>
                  <button className="btn btn-outline" onClick={() => handleDifficultySelection('hard')}>Hard</button>
                  <button className="btn btn-outline" onClick={() => handleDifficultySelection('deadly')}>Deadly</button>
                </div>
                {selectedDifficulty && (
                    <button className="btn btn-outline btn-success px-4 my-4" onClick={handleGenerateEncounter}>
                        Generate Encounter
                    </button>
                )}
            </>
            )}
            {isplayersSelected && selectedTypes.length > 0 && selectedDifficulty && (
            <>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
                    Here is your encounter
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8 mx-16">
                    <div className="card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
                        <div className="text-2xl">Encounter Difficulty: {encounterDifficulty}</div>
                        <div className="text-2xl">Encounter XP: {encounterXp}</div>
                        <div className="text-2xl">Encounter Multiplier: {encounterMultiplier}</div>
                        <div className="text-2xl">Encounter Threshold: {encounterThreshold}</div>
                    </div>
                    <div className="card bg-base-300 rounded-box place-items-center w-7/12 text-xl mt-8 text-center">
                        <div className="text-2xl">Encounter Creatures</div>
                        {encounterCreatures.map((creature) => (
                            <div className="text-2xl">{creature.name}</div>
                        ))}
                    </div>
                </div>
            </>
            )}
        </div>
  );
};

export default EncounterView;