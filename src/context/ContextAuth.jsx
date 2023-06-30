import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// creating context
export const AuthContext = createContext("default-value");

// firebase auth
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


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
    const contextValue = { user, signIn, signUp, signInGoogle, logOut, isLoading }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextAuth;