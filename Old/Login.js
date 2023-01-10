import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import '../config/firebase';
import {
     KeyboardAvoidingView,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
const logo = './asset/logo.png'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const forgotPassword = () => {
    if (email === "") {
      
        alert("Email and password are mandatory.");
    } 
else {
    console.log("reset email sent to " + email);
    sendPasswordResetEmail(auth, email, null)
        .then(() => {
            alert("reset email sent to " + email);
        })
        .catch(function (e) {
            console.log(e);
        });
}
  }
  
//   const signIn =() => {
//     if (email === "" || password === "") {
      
//         alert("Email and password are mandatory.");
//     }

//    else {
//      auth
//       .signInWithEmailAndPassword(auth, email, password)
//       .then(userCredentials => {
//         const user = userCredentials.user;
//         console.log('Registered with:', user.email);
//       })
//       .catch(error => alert(error.message))
//   }
//    }
    
   

    async function handleSignIn() {
    if (email === '' || password === '') {
     alert('Email and password are mandatory.')
     
      return;
    }
    else {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
            alert("logged in " + email);
        });
      console.log('Signed in');
    } catch (error) {
        alert(error.message);
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
          onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={forgotPassword}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Forgot Password</Text>
        </TouchableOpacity>
        <Text style={styles.outlineText}>
          Don't Have an account? {" ->> "} 
   </Text>
      </View>
      </KeyboardAvoidingView>




    // <KeyboardAvoidingView>
    // <View className="w-full h-full">
    //   <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
    //     <Image
    //       source={logo}
    //       style={{ width: 100, height: 100, alignSelf: "center" }}
    //     />
    //     <Text className="block  font-title text-2xl font-bold text-center text-white">
    //       Sign In
    //     </Text>

    //     <View className="space-y-6">
    //       <View className="mt-1 space-y-4">
    //         <View className="flex-1 font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
    //           <Icon style={styles.icon} name="email" size={18} color="gray" />
    //           <TextInput
    //             placeholder="Email"
    //             value={email}
    //             className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
    //             onChangeText={(text) => setValue({ ...value, email: text })}
    //           />
    //         </View>

    //         <View className="flex-1 flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
    //           <Icon style={styles.icon} name="lock" size={18} color="gray" />
    //           <TextInput
    //             placeholder="Password"
    //             className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
    //             onChangeText={(text) => setValue({ ...value, password: text })}
    //             secureTextEntry={true}
    //           />
    //         </View>
    //       </View>
    //       <Pressable className="bg-background border border-white rounded-3xl py-2 px-4 m-4">
    //         <Text
    //           className="text-center text-white font-bold text-base"
    //         //   onPress={signIn}
    //         >
    //           Sign In
    //         </Text>
    //       </Pressable>
    //     </View>
    //     <Text className="text-center text-white font-main text-base">
    //       Don't Have an account?{" "}
    //       <Text
    //         className="text-blue"
    //         onPress={() => navigation.navigate("Sign Up")}
    //       >
    //         Sign Up
    //       </Text>
    //     </Text>
    //   </View>
    // </View>
    // </KeyboardAvoidingView>
  );
}

export default Login;

// const styles = StyleSheet.create({
//   icon: {
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     paddingTop: 10,
//     paddingRight: 10,
//     paddingBottom: 10,
//     paddingLeft: 0,
//     backgroundColor: "#000",
//     color: "#424242",
//   },
// });

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
    paddingTop: 10
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
