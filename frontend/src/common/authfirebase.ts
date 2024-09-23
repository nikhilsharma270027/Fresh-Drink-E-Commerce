import { auth } from "./firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // sendPasswordResetEmail,
    // sendEmailVerification,
    // updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";

  export const doCreateUserWithEmailAndPassword = async (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

export const doSignInWithEmailAndPassword = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
  
    // add user to firestore
  }; 
  
  export const doSignOut = () => {
    return auth.signOut();
  };
  
//   export const doPasswordReset = (email: any) => {
//     return sendPasswordResetEmail(auth, email);
//   };
  
//   export const doPasswordChange = (password: any) => {
//     return updatePassword(auth.currentUser, password);
//   };
  
//   export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//       url: `${window.location.origin}/home`,
//     });
//   };