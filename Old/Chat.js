import React, { useEffect, useState } from 'react';
import '../config/firebase';
import { View, 
  TextInput, 
  Button, 
  Text, 
  KeyboardAvoidingView, 
  TouchableOpacity,
  StyleSheet, 
  FlatList} from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection,doc,getFirestore, initializeFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
// import ChatComponent from './chatUtils/chatComponent';
const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

const auth = getAuth();
const db = getFirestore()
const colRef = collection(db, 'messages')

const user = auth.currentUser.uid;
const q = query(colRef, where("user_id", "==", user), orderBy('createdAt'))
function Chat() {
  const [message, setMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState([]);
  
  // alert(id)
    // firebase
    //   .firestore()
    //   .collection('messages')
    //   .add({
        // id,
    //     message,
    // createdAt: new Date(),
    //   })
    //   .then(() => {
    //     console.log('Message added!');
    //   });
  
// const fetchMessage = () => {
//     onSnapshot(q, (snapshot) => {
//       // snapshot.forEach((doc) => {
//       //  setFetchedMessage(arr => [...arr, doc.data().message]);
//       //   });
//         console.log("fetched")
//     })
// }


useEffect(() => {
 const unsubscribe = onSnapshot(q, (snapshot) => {
//     // snapshot.forEach((doc) => {
//     //    setFetchedMessage(arr => [...arr, doc.data().message]);
//     //     });
  const newMessages = snapshot.docs.map((doc) => doc.data());
          setFetchedMessage(newMessages);
      console.log("fetched")
    })
  
    return () => unsubscribe();
  }, []);

const sendMessage = () => {
  console.log(user)
  // setFetchedMessage('')
   addDoc(colRef, {
    user_id: user,
    message: message,
    createdAt: serverTimestamp()
  }).then(
    setMessage(''),
    console.log("Added"),
    // {fetchMessage}
  )
};
    // firebase
    //   .firestore()
    //   .collection('message')
    //   .onSnapshot((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       setFetchedMessage(doc.data().Message);
    //     });
    //   });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      
    <FlatList  style={styles.inputContainer}
      data={fetchedMessage}
      renderItem={({ item }) => (
        <View  
        style={styles.chatContainer}
        keyExtractor={(item) => item.id}>
          <Text key={generateKey(item.id)}>{item.message}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />

      {/* <FlatList>
        <View style={styles.inputContainer}>
        <Text>{fetchedMessage}</Text>
        </View>
      </FlatList> */}
        
      <View style={styles.inputContainer}>
        <TextInput
         value={message}
         onChangeText={(message) => setMessage(message)}
         placeholder="Type Message here"
         style={styles.input}
      />
        
      </View>
    
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>sendMessage</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    
  )
}

export default Chat;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '80%',
  },
  chatContainer: {
    border: 1
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
    marginBottom: 40,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom: 15
  },

  })


  