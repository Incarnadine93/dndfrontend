import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { WEB_URL } from '../lib/CONSTANTS';
import { toast } from 'react-hot-toast';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        loggedIn: false,
    })
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    async function postLogin(user) {
        const body = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }

        const res = await axios.post(WEB_URL + '/api/users', body, headers)
        console.log('After sign in: ', user)
        console.log(res)
    }

    async function login() {
        toast.loading("Signing in...", { id: "signin" });
        signInWithPopup(auth, provider).then(({user}) => {
            postLogin(user);
            toast.remove('signin')
            toast.success('Rolled a 20! for sign in');
            console.log(user)
        }).catch(err => {
            toast.error('Rolled a 1! Failed to sign in')

        });
    }

    async function logout() {
        const signoutPromise = signOut(auth);
        toast.promise(signoutPromise, {
            loading: 'Signing out ...',
            success: 'Rolled a 20! for sign out',
            error: 'Rolled a 1! Failed to sign out',
        });
    }

    
    useEffect(() => {
        onAuthStateChanged(auth, (userInfo) => {
            if (userInfo) {
                setUser({
                    uid: userInfo.uid,
                    displayName: userInfo.displayName,
                    photoURL: userInfo.photoURL,
                    loggedIn: true,
                });
        } else {
            setUser({
                loggedIn: false,
            });
        }
        })
    }, []);
    const value = {
        login,
        logout,
        user,
};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    
};