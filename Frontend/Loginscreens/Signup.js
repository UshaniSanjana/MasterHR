import axios from 'axios';
import { BlurView } from "expo-blur";
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Alert } from 'react-native';

const Signup = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');

  const handleSubmit = async () => {
    
    const hrData = {
      Name: name,
      email:email,
      password:password,
      companyname: companyName,
      companylocation: companyLocation,
    };


    try {
        console.log(hrData)
      const response = await axios.post(`${process.env.API_URL}/Hr`, hrData);
      if (response.status === 200) {
        Alert.alert('Success', 'HR created successfully!');
        // Optionally, reset the form here
        setName('');
        setEmail('');
        setPassword('');
        setCompanyName('');
        setCompanyLocation('');
      }
    } catch (error) {
      console.error('Error creating HR:', error);
      Alert.alert('Error', 'Error creating employee. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require("../assets/sky5.jpeg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Company Name"
                placeholderTextColor="black"
                value={companyName}
                onChangeText={setCompanyName}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Company Location"
                placeholderTextColor="black"
                value={companyLocation}
                onChangeText={setCompanyLocation}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="HR name"
                placeholderTextColor="black"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <Pressable style={styles.button} onPress={()=>handleSubmit()}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
    backgroundColor: "#ADD8E6",
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
  form: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 25,
    overflow: "hidden",
    color: "#4C8EB2",
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
    color: "#4C8EB2",
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

export default Signup;
