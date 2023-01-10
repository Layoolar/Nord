import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import '../config/firebase';
import {
     KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection,doc,getFirestore, initializeFirestore, serverTimestamp, setDoc } from 'firebase/firestore';


const auth = getAuth();
const db = getFirestore()
const colRef = collection(db, 'users')

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


// async function handleSignUp() {
//   console.log('Hey');
//      try {
//       const newDoc = await addDoc(collection(db, 'messages'), {
//         test: 'TESTs',
//         please: 'WORKss', });
//         console.log("Document written with ID: ", newDoc.id); 
//     } catch(err) {
//       console.error("writeToDB failed. reason :", err)
//     }
//   };


   async function handleSignUp() {
    if (email === '' || password === '') {
     alert('Email and password are mandatory.')
     
      return;
    }
    else {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(cred => {
      console.log(cred.user.uid);
      console.log(cred.user.email);

       addDoc(colRef, {
        user_id: cred.user.uid,
    email: cred.user.email,
    picture: '',
    createdAt: serverTimestamp()
  }).then (res => {
    console.log(res);
  }).catch(err => {
      console.log(err.message)
    })
    });
      console.log('Signed Up');
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      }
      if (error.code === 'auth/weak-password') {
        alert('Weak password');
      }
      if (error.code === 'auth/invalid-email') {
        alert('Invalid Email!');
      }
    }
  }
}
      

  return (


<KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    <Text style={styles.outlineText}>
          Already Have an account? {" ->> "} 
   </Text>
      </View>
      </KeyboardAvoidingView>

  );
}

export default Register;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
   outlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    paddingTop: 10, 
  },
})
