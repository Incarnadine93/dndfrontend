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
            const res = await axios.get(WEB_URL + "/xpthresholds");
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
      console.log("encounterData");
      console.log(encounterData);
      const numPlayers = encounterData.levels.length;
      const avgLevel = encounterData.levels.reduce((a, b) => a + b, 0) / encounterData.levels.length;
      const difficulty = encounterData.difficulty;
      const monXp = xpThresholds[avgLevel][difficulty];
      const encounterXp = numPlayers * monXp;
      const monTypes = encounterData.types;
      const mons = monsters.filter((m) => monTypes.includes(m.type));

      for (let m = 0; m < mons.length; m++) {
        const monster = mons[m];
        if (monster.xp <= encounterXp) {
          setGeneratedMonsters((prevData) => [...prevData, monster]);
        }
      }
    };
    