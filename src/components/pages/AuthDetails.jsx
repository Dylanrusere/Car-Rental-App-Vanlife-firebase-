import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthDetails = () => {

    const [authUser, setauthUser] =useState(null);

    useEffect (() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setauthUser(user)  
            } else{
                setauthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, [])

    const UsersignOut = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
        }).catch((error) => console.log(error));
    };

  return (
    <div>
        { authUser ? <><p>Signed In</p><button onClick={UsersignOut}>Sign Out</button></> : <p>Signed Out</p> }
    </div>
  );
};