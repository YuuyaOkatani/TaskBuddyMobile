import react from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import styles from "../css/styles";

const Loading = () => {
  return (
    <View style={styles.loadingContaner}>
      <Text>Loading...</Text>
      <View>
        <Image
          source={require("../img/loading 3.gif")}
          style={{ height: 50, width: 50 }}
        />
      </View>
    </View>
  );
};
export default Loading;
