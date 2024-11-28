//new
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Mychat({ route }) {
  const employee = route.params;
  const Employee_id = employee._id;
  const HR_id = employee.HR;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [HR_id, Employee_id]);

  const fetchMessages = async () => {
    try {
      const responseHR = await fetch(`${process.env.API_URL}/chat/${HR_id}`);
      const responseEmployee = await fetch(
        `${process.env.API_URL}/chat/${Employee_id}`
      );

      if (!responseHR.ok || !responseEmployee.ok) {
        throw new Error("Network response was not ok");
      }

      const hrMessages = await responseHR.json();
      const employeeMessages = await responseEmployee.json();

      const mergedMessages = [
        ...hrMessages.map((msg) => ({ ...msg, sender: "HR" })),
        ...employeeMessages.map((msg) => ({ ...msg, sender: "employee" })),
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setMessages(mergedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      Alert.alert("Error", "Failed to fetch messages. Please try again later.");
    }
  };

<<<<<<< HEAD
      {Employee.map((employee, index) => (
        <TouchableOpacity
          key={index}
          style={{
            margin: 2,
            marginLeft: 7,
            marginRight: 7,
            padding: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ChatScreen", {
              employeeId: employee._id,
              HR_Id: HR,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={80}
              style={{ margin: 5 }}
              source={{
                uri: !employee ? "data:image/png;base64,..." : employee.image,
              }}
            />

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "black",
                  marginHorizontal: 10,
                }}
              >
                {employee.Name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "black",
                  marginHorizontal: 10,
                }}
              >
                {employee._id}
              </Text>
            </View>
          </View>
=======
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const tempMessage = {
      text: newMessage,
      sender: "employee",
      timestamp: new Date().toISOString(),
    };

    setNewMessage("");

    try {
      const response = await fetch(`${process.env.API_URL}/chat/${HR_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to send the message to the server.");
      }

      const savedMessage = await response.json();

      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send the message. Please try again.");
    }
  };

  const renderMessage = ({ item, index }) => {
    const isEmployee = item.sender === "employee";
    const currentMessageDate = item.timestamp
      ? new Date(item.timestamp).toDateString()
      : null;
    const previousMessageDate =
      index > 0 && messages[index - 1].timestamp
        ? new Date(messages[index - 1].timestamp).toDateString()
        : null;

    const messageTime = item.timestamp
      ? new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

    return (
      <>
        {currentMessageDate && currentMessageDate !== previousMessageDate && (
          <Text style={styles.dateLabel}>{currentMessageDate}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            isEmployee ? styles.employeeMessage : styles.hrMessage,
          ]}
        >
          <Text>{item.text}</Text>
          {messageTime && <Text style={styles.time}>{messageTime}</Text>}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => `${item.timestamp}-${item.text}`}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
>>>>>>> 23af8120b07766725797d32575ff066174845630
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: "80%",
  },
  employeeMessage: {
    backgroundColor: "#8abcff",
    alignSelf: "flex-start",
  },
  hrMessage: {
    backgroundColor: "#cbb9fe",
    alignSelf: "flex-end",
  },
  dateLabel: {
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    color: "gray",
  },
  time: {
    fontSize: 10,
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
