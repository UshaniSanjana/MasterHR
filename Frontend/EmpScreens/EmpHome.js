import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions, Image, SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar } from "react-native-paper";

const ads = [
  {
    text: "Ad 1: Enjoy the best deals!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LB2dxEnOsAj8625ux4pOUbZM04gYvVaaDPgNMbocrgcA8pLaEFZh4VHBwpnLSIdG9f0&usqp=CAU", // Replace with your image URL
    backgroundColor: "white",
  },
  {
    text: "Ad 2: Limited time offer!",
    image: "https://media.licdn.com/dms/image/C5612AQE6blo9Ts9VEw/article-cover_image-shrink_600_2000/0/1520175581142?e=2147483647&v=beta&t=Tt6x3Vvhy7VXdutamisNukW5biDMTcvlpA6sO4uHqQ4",
    backgroundColor: "white",
  },
  {
    text: "Ad 3: Shop now and save!",
    image: "https://www.shutterstock.com/image-vector/mobile-advertising-online-native-targeting-260nw-2511929605.jpg",
    backgroundColor: "#white",
  },
];

// Reusable component for swiping ad boxes
const SwipableAd = ({ currentAdIndex }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Reset the opacity when the current ad changes
    return () => {
      fadeAnim.setValue(0);
    };
  }, [currentAdIndex]);

  return (
    <Animated.View style={[{
      
      position: 'absolute',
      bottom: 20,
      backgroundColor: ads[currentAdIndex].backgroundColor,
      padding:8,
      borderRadius:25,
      width:350,
      
     
     justifyContent:"center",
     alignItems:"center",
     opacity: fadeAnim, // Bind opacity to fadeAnim for fade-in effect
     borderColor:'rgba(131, 112, 223,0.9)',
     borderWidth:2,
     //height:250
    
      
    }]}>
      <Image
        source={{ uri: ads[currentAdIndex].image }}
        style={{ width:320, height: 170, borderRadius: 10, marginBottom: 10 }} // Ad image
      />


      <Text style={{
        fontSize:15,

        color: 'black',
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {ads[currentAdIndex].text}
      </Text>
    </Animated.View>
  );
};

export default function Home({ route }) {


  const Employee = route.params.HR;
  const ids = Employee._id;
  
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // Track current ad index

  const Navigator = useNavigation();
  const { width } = Dimensions.get("window");

  useEffect(() => {
    // Change the ad every 3 seconds
    const adTimer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // Cycle through ads
    }, 3000); // 3 seconds for each ad

    return () => clearInterval(adTimer); // Clean up the interval when component unmounts
  }, []);

  return (
    <LinearGradient colors={["#ffefef", "white"]} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
          {/* Header */}
          <View
            style={{
              height: 158,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "rgba(131, 112, 223,0.9)",
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
                backgroundColor: "rgba(0, 114, 177,0.3)",
                padding: 10,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 26, fontWeight: 800, color: "white" }}>
                  MASTER HR
                </Text>
              </View>
            </View>

            {/* Employee Info */}
            <View
              style={{
                marginTop: 28,
                margin: 5,
                flexDirection: "row",
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <Avatar.Image
                source={{ uri: Employee.image }}
                size={60}
                style={{
                  padding: 10,
                  borderColor: 'white',
                  borderWidth: 3,
                  elevation: 4,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
              <View style={{ marginLeft: 10, justifyContent: "center", marginTop: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: "300", color: "white" }}>
                  Hi,
                </Text>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "white" }}>
                  {Employee.Name}
                </Text>
              </View>
            </View>
          </View>

          {/* Single Swipable Ad */}
          <View style={{ marginTop: 250,justifyContent:"center",alignItems:"center" }}>
            <SwipableAd currentAdIndex={currentAdIndex} />
          </View>

          {/* Action Buttons */}
          <View
            style={{
              height: 170,
              width: width * 0.96,
              borderRadius: 30,
              margin: 5,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, margin:10 }}
              onPress={() => Navigator.navigate("Mark", { ids })}
            >
              <LinearGradient
                colors={["#DE6262", "#FFDDE1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1, borderRadius: 30, padding: 8 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems:"center",
                    padding: 8,
                  }}
                >
                  <AntDesign name="checkcircleo" size={40} color="white" />
                  <Text style={{ margin:8,fontSize: 20, fontWeight: 800, color: "white" }}>
                    Mark Attendance
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("Loc")}
            >
              <LinearGradient
                colors={["#1A2980", "#92EFFD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, borderRadius: 30, alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    padding: 8,
                    justifyContent: "center",
                    alignItems:"center",
                    margin:5
                   
                  }}
                >
                  <Ionicons  name="list-circle-outline" size={44} color="white" />
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    View              My Tasks
                   
                  </Text>
                  
                </View>
              </LinearGradient>
            </TouchableOpacity>


            
          </View>


          <View
            style={{
              height: 170,
              width: width * 0.96,
              borderRadius: 30,
              margin: 5,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("ViewEmployee",Employee)}
            >
              <LinearGradient
                colors={["#753a88", "#F8CDDA"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1, borderRadius: 30, padding: 8 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    justifyContent: "center",
                    padding: 8,
                    alignItems:"center"
                  }}
                >
                  <MaterialCommunityIcons name="face-man" size={40} color="white" />
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    View Profile
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("Loc")}
            >
              <LinearGradient
                colors={["#b20a2c", "#fffbd5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, borderRadius: 30, alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    padding: 8,
                    justifyContent: "center",
                    alignItems:"center"
                  }}
                >
                  <MaterialIcons name="stars" size={40} color="white" />
                  
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    See My Performance
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>


            
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
