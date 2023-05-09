import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WEB_URL } from '../lib/CONSTANTS';
import { useParams } from 'react-router-dom';

const MonsterView = () => {
  const [monster, setMonster] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getMonster = async () => {
      const res = await axios.get(`${WEB_URL}/monsters/${id}`);
      if (res.data.status === 'ok') {
        const justice = res.data;
        console.log('res')
        console.log(res.data)
        setMonster(justice);
        console.log('justice')
        console.log(justice)
      }
    };
    getMonster();
    console.log(monster)
  }, [id]);
  if (!monster) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card card-side bg-base-100 shadow-xl mt-16 flex justify-center mr-8 ml-8 max-w-80 text-slate-300">
        <figure>
            <img 
                src={monster.data.image} 
                alt="Monster" 
                style={{ maxWidth: "100%", maxHeight: "600px" }}
            />
        </figure>
        <div className="card-body">
            <div className='grid grid-cols-2'>
                <div>
                    <h2 className="card-title">{monster.data.name}</h2>
                    <p>Size: {monster.data.size}</p>
                    <hr className="border-yellow-500 my-4"></hr>
                    <h2>Armor Class: {monster.data.armor_class} </h2>
                    <p>Hit Points: {monster.data.hit_points}</p>
                    <p>Speed: {monster.data.walk_speed}</p>
                    <hr className="border-yellow-500 my-4"></hr>
                    <div className="grid grid-cols-6">
                        <h2>STR</h2>
                        <h2>DEX</h2>
                        <h2>CON</h2>
                        <h2>INT</h2>
                        <h2>WIS</h2>
                        <h2>CHA</h2>
                    </div>
                    <div className="grid grid-cols-6">
                        <h2>{monster.data.strength}</h2>
                        <h2>{monster.data.dexterity}</h2>
                        <h2>{monster.data.constitution}</h2>
                        <h2>{monster.data.intelligence}</h2>
                        <h2>{monster.data.wisdom}</h2>
                        <h2>{monster.data.charisma}</h2>
                    </div>
                    <hr className="border-yellow-500 my-4"></hr>
                    <h2>Saving Throws</h2>
                    <p>Damage Immunities: {monster.data.damage_immunities}</p>
                    <p>Condition Immunities: {monster.data.condition_immunities}</p>
                    <p>Senses:</p>
                </div>
                <div>
                    <h2>Languages: {monster.data.languages}</h2>
                    <div className='grid grid-cols-2'>
                        <h2>Challenge: {monster.data.challenge_rating}</h2>
                        <h2>XP: {monster.data.xp}</h2>
                    </div>
                    <hr className="border-yellow-500 my-4"></hr>
                    <h2>{monster.data.actions}</h2>
                    <h2>Special Abilities: {monster.data.special_abilities}</h2>
                    <h2>Legendary Actions: {monster.data.legendary_actions}</h2>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MonsterView;
