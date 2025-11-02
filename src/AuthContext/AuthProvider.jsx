import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading ]=useState(true)

    const createUser=(email,password)=>{
        setLoading(true)

        return createUserWithEmailAndPassword (auth,email,password)
    }
    //signIn with google start from here 
    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    //auth observer start here 
     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         console.log("User state changed:", currentUser);
         setUser(currentUser);
         setLoading(false);
       });
       return () => unsubscribe(); // cleanup on unmount
     }, []);

 // user signout 
 const userSignOut=()=>{
    return signOut(auth)
 }

//user information is here 
    const userInfo={
        createUser,
        loading,
        setLoading,
        setUser,
        user,
        signInUser,
        signInGoogle,
        userSignOut,


    }



    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;