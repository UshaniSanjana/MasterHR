import { Text, View } from "react-native";

export default function Mychat({ route }) {
  const employee = route.params;
  console.log(employee._id);
  HR_id = employee.HR;
  console.log(HR_id);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>{employee.Name} </Text>
    </View>
  );
}
