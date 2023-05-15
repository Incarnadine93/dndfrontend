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
};

