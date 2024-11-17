import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const HRProfile = ({ route }) => {
  const { hrId } = route.params;
  console.log("HR ID:", hrId); // Log HR ID
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.16:3500/Employee/hr/${hrId}`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [hrId]);

  return (
    <View style={styles.container}>
      <Text>HR Profile</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.employeeContainer}>
            <Text>Name: {item.Name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Text>Job: {item.Job}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  employeeContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default HRProfile;
