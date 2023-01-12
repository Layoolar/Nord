// import React, { memo, useState } from "react";
// import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
// import Background from "../../components/Background";
// import Logo from "../../components/Logo";
// import Header from "../../components/Header";
// import Button from "../../components/Button";
// import TextInput from "../../components/TextInput";
// import BackButton from "../../components/BackButton";
// import { theme } from "../../core/theme";
// import { emailValidator, passwordValidator } from "../../core/utils";
// import { Navigation } from "../../types";
// // import { loginUser } from "../../api/auth-api";
// import Toast from "../../components/Toast";

// type Props = {
//   navigation: Navigation;
// };

// const LoginScreen = ({ navigation }: Props) => {
//   const [email, setEmail] = useState({ value: "", error: "" });
//   const [password, setPassword] = useState({ value: "", error: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const _onLoginPressed = async () => {
//     if (loading) return;

//     const emailError = emailValidator(email.value);
//     const passwordError = passwordValidator(password.value);

//     if (emailError || passwordError) {
//       setEmail({ ...email, error: emailError });
//       setPassword({ ...password, error: passwordError });
//       return;
//     }

//     setLoading(true);

//   //   const response = await loginUser({
//   //     email: email.value,
//   //     password: password.value
//   //   });

//   //   if (response.error) {
//   //     setError(response.error);
//   //   }

//   //   setLoading(false);
//   // };

//   return (
//     <Background>
//       <BackButton goBack={() => navigation.navigate("HomeScreen")} />

//       <Logo />

//       <Header>Welcome back.</Header>

//       <TextInput
//         label="Email"
//         returnKeyType="next"
//         value={email.value}
//         onChangeText={text => setEmail({ value: text, error: "" })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//       />

//       <TextInput
//         label="Password"
//         returnKeyType="done"
//         value={password.value}
//         onChangeText={text => setPassword({ value: text, error: "" })}
//         error={!!password.error}
//         errorText={password.error}
//         secureTextEntry
//         autoCapitalize="none"
//       />

//       <View style={styles.forgotPassword}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("ForgotPasswordScreen")}
//         >
//           <Text style={styles.label}>Forgot your password?</Text>
//         </TouchableOpacity>
//       </View>

//       <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
//         Login
//       </Button>

//       <View style={styles.row}>
//         <Text style={styles.label}>Don’t have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
//           <Text style={styles.link}>Sign up</Text>
//         </TouchableOpacity>
//       </View>

//       <Toast message={error} onDismiss={() => setError("")} />
//     </Background>
//   );
// };

// const styles = StyleSheet.create({
//   forgotPassword: {
//     width: "100%",
//     alignItems: "flex-end",
//     marginBottom: 24
//   },
//   row: {
//     flexDirection: "row",
//     marginTop: 4
//   },
//   label: {
//     color: theme.colors.secondary
//   },
//   link: {
//     fontWeight: "bold",
//     color: theme.colors.primary
//   }
// });

// export default memo(LoginScreen);

























import React, { useState } from 'react'
import { Text, 
  View,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
StyleSheet } from 'react-native'
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../core/utils";
import { Navigation } from "../../types";
// import { loginUser } from "../../api/auth-api";
import Toast from "../../components/Toast";

import AsyncStorage from '@react-native-async-storage/async-storage' 
import '../../config/firebase'
import { styles } from './LoginScreenStyles'
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const forgotPassword = async() =>{
      if (email === "") {
        Alert.alert("Email and password are mandatory.");
    } 
    else {
    sendPasswordResetEmail(auth , email)
        .then(() => {
            Alert.alert("reset email sent to " + email);
        })
        .catch( (e) => {
            Alert.alert("Something went wrong, try again!!");
            console.log(e)
        });
    }
  }

  const handleSignIn =async() => {
    if (email === '' || password === '') {
     Alert.alert('Email and password are mandatory.')
     
      return;
    }
    else {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
            Alert.alert("logged in " + email);
        });
      console.log('Signed in');
    } catch (error) {      
          console.log("hi");
      }
    }
  }


    return (
      <Background>
        <BackButton goBack={() => navigation.navigate("HomeScreen")} />

        <Logo />
        <Header>Welcome back.</Header>

        <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button 
      // loading={loading} 
      mode="contained" 
      // onPress={_onLoginPressed}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

       {/* <Toast message={error} onDismiss={() => setError("")} /> */}

{/*     
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
          <Button
          onPress={handleSignIn}
          title="Sign In" />
          <Button
          onPress={forgotPassword} 
          title="Forgot Password?"
          style={ styles.button}
          textStyle ={ styles.text}
          /> 
          <Text style={styles.outlineText} onPress={() => navigation.navigate("Sign Up")}>
            Don't Have an account? {" ->> "} 
          </Text>
          
        </View> */}
      </Background>
    )
}

export default LoginScreen
