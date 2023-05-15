import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEB_URL } from "../lib/CONSTANTS";

const EncounterView = () => {
    const [ encounterData ] = useState([]);
    const [monsters, setMonsters] = useState([]);
    const [ isPlayersSelected, setIsPlayersSelected ] = useState(false);
    const [ isMonTypesSelected, setIsMonTypesSelected ] = useState(false);
    const [ isDifficultySelected, setIsDifficultySelected ] = useState(false);

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

    const handlePlayerSelection = (level) => {
        setIsPlayersSelected(true);
        if (playerLevels.includes(level)) {
            setPlayerLevels([]);
        } else {
            setPlayerLevels([level]);
        }
    };

    const handleTypeSelection = (type) => {
        setIsMonTypesSelected(true);
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const generateMonsterSet = (levels, types, difficulty) => {
        setIsDifficultySelected(true);
        const filteredMonsters = monsters.filter(monster => types.includes(monster.type) && levels.includes(monster.challenge_rating));
        const numPlayers = levels.length;
        const numMonsters = Math.floor(numPlayers * difficulty);
        const monsterSet = [];
        for (let i = 0; i < numMonsters; i++) {
            const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
            monsterSet.push(filteredMonsters[randomIndex]);
        }
        setGeneratedMonsters(monsterSet);
    }

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
                </ul>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-6/12 font-medium text-2xl">
                    Please select which players to generate an encounter for.
                    Select up to 7 players.
                </div>
                <div className="divider"></div>
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-6/12 font-medium text-2xl">
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
        </div>
        </>
    );
};

export default EncounterView;

