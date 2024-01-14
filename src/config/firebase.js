import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, getDocs, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6brYMl4Mf3jZxtYxlqvllaCO4hdgRfj8",
    authDomain: "social-app-b1.firebaseapp.com",
    projectId: "social-app-b1",
    storageBucket: "social-app-b1.appspot.com",
    messagingSenderId: "587803451084",
    appId: "1:587803451084:web:470132f09a6e00efd1ec69",
    measurementId: "G-D8FNCR0LCC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let userId;

const getDateFromDb = async (id) => {
    if(id){
      const result = await getDoc(doc(db, 'products', id))
    return result.data();
    }
    else{
      const result = await getDocs(collection(db, 'products'))
    return result;
  }
}

onAuthStateChanged(auth,async (user) => {
    if (user)  {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      userId = uid;
      // ...
    } else {
      // User is signed out
      // ...
      userId = null;
    }
});

const getUserData = async () => {
  const userData = await getDoc(doc(db, 'userInfo', userId));
  return userId?userData.data():null;
};

const login = async (email, password) => {
var result;

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    userId = user.id

    result = 'user is succesfully login';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    result = errorMessage;
  });

  return result;
}

const signUp = async (name, fatherName, email, password) => {
  var result;
  
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      userId = user.uid;
      
      await setDoc(doc(db, 'userInfo', user.uid), {
        firstname: name,
        lastname: fatherName,
        userImg: '',
        userEmail: user.email
    })
    
    result = 'user is succesfully added';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result = errorMessage;
    });
  
    return result;
}

export {getDateFromDb, login, signUp, getUserData}