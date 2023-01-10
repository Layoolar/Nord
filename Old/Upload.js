import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {check, PERMISSIONS, requestNotifications, RESULTS} from 'react-native-permissions'
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, query, serverTimestamp, setDoc, where } from 'firebase/firestore';


const auth = getAuth();
const db = getFirestore()
const storage = getStorage()
const colRef = collection(db, 'pictures')
const user = 'YImO9gCzAOeIHRJAGnp5BgqCEoE3'
// auth.currentUser.uid;
let picPath = `images/${ user }`
var storageRef = ref(storage, picPath);



const Upload = () => {
  
  const [image, setImage] = useState();
  const [profilePic, setProfilePic] = useState()

  getDownloadURL(storageRef)
  .then((url) => {
    setProfilePic(url)
  })

  const pickImage = async () => {
    try {
      let result = await launchImageLibrary({
        mediaTypes: 'photo',
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }

      console.log(result.assets[0].uri);
    } catch (E) {
      console.log(E);
    }
  };

  const takePhoto = async () => {
    try {
      let result = await launchCamera({
        mediaTypes: 'photo',
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
      console.log(result.assets[0].uri);
    } catch (E) {
      console.log(E);
    }
  };


  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

 
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log(snapshot);

      setDoc(doc(colRef, user ), {
    profilePic: picPath,
    createdAt: serverTimestamp()
}).then((response) => {
  console.log(response);
},
  setProfilePic(image),
  setImage(null)
  );
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    <View>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No profile picture</Text>
      )}
      </View>
       <View>
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text></Text>
      )}
      </View>
      <View>
      <Button title="Choose from gallery" onPress={pickImage} />
      <Button title="Take photo" onPress={takePhoto} />
      <Button title="Upload image" onPress={uploadImage} />
    </View>
    </KeyboardAvoidingView>
  );
};

export default Upload;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
  })

