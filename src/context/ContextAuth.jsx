import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// creating context
export const AuthContext = createContext("default-value");

// firebase auth
const auth = getAuth(app);

// providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const ContextAuth = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    // sign in existing user with email & pass
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }



    // sign in with google
    const signInGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // sign in with github
    const signInGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }



    // sign out
    const logOut = () => {
        return signOut(auth);
    }


    // setting observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setIsLoading(false);
        })

        return () => unsubscribe();
    }, [])



    // context value
    const contextValue = { user, signIn, signUp, signInGoogle, signInGithub, logOut, isLoading }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextAuth;