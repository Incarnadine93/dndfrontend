import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { WEB_URL } from "../lib/CONSTANTS";
import axios from "axios";


const Avatar = ({ user, logout }) => {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/" className="justify-between">
              Profile
            </a>
          </li>
          <li>
            <a href="/">Settings</a>
          </li>
          <li>
            <button onClick={logout}>Sign out</button>
          </li>
        </ul>
      </div>
    );
  };

const Navbar = () => {
        const {user, login, logout} = useContext(AuthContext);

        const [monsters, setMonsters] = useState([]);

        useEffect(() => {
          const getMonsters = async () => {
            const res = await axios.get(WEB_URL + '/monsters');
            console.log(res.data); // Print the response data
            if (res.data.status === 'ok') {
              const monsters = res.data.data;
              if (Array.isArray(monsters)) {
                const transformedMonsters = monsters.map((monster) => ({
                  id: monster.data.id,
                  name: monster.data.name,
                }));
                setMonsters(transformedMonsters);
              }
            }
          };
          getMonsters();
        }, []);
        
      
        const handleOnSearch = (string, results) => {
          // onSearch will have as the first callback parameter
          // the string searched and for the second the results.
          console.log(string, results)
        }
      
        const handleOnHover = (result) => {
          // the item hovered
          console.log(result)
        }
      
        const handleOnSelect = (item) => {
          // the item selected
          console.log(item)
        }
      
        const handleOnFocus = () => {
          console.log('Focused')
        }
      
        const formatResult = (item) => {
          return (
            <>
              <span style={{ display: 'block', textAlign: 'left' }}>{item.data.name}</span>
            </>
          )
        }

        
    return(
        <div className="navbar bg-base-100 shadow-md shadow-orange-300">
            <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle swap swap-rotate">
                <input type="checkbox" />
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>

                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a a href="/character">Character Creator</a></li>
                <li><a href="/encounter">Encounter</a></li>
                <li><a>Gofundme</a></li>
                </ul>
            </div>
            </div>
            <div className="navbar-center">
                <a href="/" className="btn btn-ghost normal-case text-xl">Bars & Brawls </a>
            </div>
            <div className="navbar-end">
            <div className="App">
              <input type="text" placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />

              {/* <header className="App-header mr-2">
                <div style={{ width: 250 }}>
                  <ReactSearchAutocomplete
                    items={monsters}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                    styling={{ backgroundColor: "#444", color: "white"

                    }}
                  />
                </div>
              </header> */}
            </div>
            {user.loggedIn ? (
          <Avatar user={user} logout={logout} />
        ) : (
          <button className="btn btn-outline ml-6" onClick={login}>
            Sign in
          </button>
        )}
            </div>
        </div>
    )
}

export default Navbar