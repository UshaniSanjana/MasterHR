import { Text, View } from "react-native";


export default function ViewEmployee({route}){
    const Employee=route.params
    console.log(Employee.Name)
    return(
        <View style={{marginTop:100}}>
            <Text>{Employee.Name}</Text>
          
        </View>
    )
} 