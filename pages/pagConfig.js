import { View, Text, TouchableOpacity } from "react-native";
import styles from "../css/styles";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
const Screen8 = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("login", "sim");
      })
      .catch((error) => alert(error.message));
  };
  const voltar = () => {
    navigation.navigate("usuario");
  };

  return (
    <View styles={styles.pagConfigOne}>
      <View style={styles.pagConfigTwo}>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={voltar} style={styles.bntvoltarPerfil}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Screen8;
