import React, { useState } from 'react'
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import notifee from '@notifee/react-native';
// import PushNotification from 'react-native-push-notification';
// import '../config/firebase'
// import '../config/notif';
// import app from '../config/firebase';
// const deviceToken = await firebase.messaging().getToken();
import { Notifications } from 'react-native-notifications'
function Notification() {



  const notify = () => {
    console.log('Pressed')
    Notifications.postLocalNotification({
      body: "Local notification!",
      title: "Local Notification Title",
      sound: "chime.aiff",
      category: "SOME_CATEGORY",
      userInfo: {},
      fireDate: new Date(),
    });

    // PushNotification.localNotification({
    //   channelId: 'your-channel-id',
    //   title: ' React Nord',
    //   message: 'Test notification',
    // })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.circleContainer}>
        <TouchableOpacity style={styles.circle}
          onPress={notify}
        >
          <View style={styles.circle}>
            <Text style={styles.text}>Notify</Text>
          </View>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>


  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  },
})



