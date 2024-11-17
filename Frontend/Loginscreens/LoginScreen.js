import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";



import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BlurView } from "expo-blur";






const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  console.log(`${process.env.API_URL}`);
  const handleLogin = () => {
    if (!email || !password || !role) {
      Alert.alert("Login Error", "Please fill all the fields.");
      return;
    }

    axios
      .post(`${process.env.API_URL}/login`, { email, password, role })
      .then((response) => {
        const { token, role,user } = response.data;
       // console.log(user)
        if (token && role) {
          AsyncStorage.setItem("authToken", token);
          if (role === "HR") {
           navigation.navigate("HR_Stack",{user:user});
          } 
          
          else if (role === "Employee") {
           navigation.navigate("Employee_stack",{user:user});

          } else {
            Alert.alert("Login Error", "Unknown role received from server");
          }
        } else {
          Alert.alert("Login Error", "No token received from server");
        }
      })
      .catch((error) => {
        console.log("Error setting up request:", error.message);
        Alert.alert("Login Error", "Invalid input!");
      });
  };


  return (
    <ImageBackground
      source={require("../assets/sky5.jpeg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign In to Your Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                value={role}
                onChangeText={(text) => setRole(text)}
                placeholder="User role"
                placeholderTextColor="black"
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ADD8E6", // Added background color
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    justifyContent: "center",
    alignItems: "left",
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "900",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  form: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    height: "100%",
    //fontWeight: "600",
    paddingHorizontal: 20,
    textAlignVertical: "center", // Center vertically
  },
  input: {
    fontSize: 18,
    width: 300,
    height: 50,
    fontWeight: "100",
    borderRadius: 25, // Makes the input fields oval
    paddingHorizontal: 20,
  },

  button: {
    width: 200,
    backgroundColor: "white",
    padding: 15,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 25, // Makes the button oval
  },
  buttonText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
