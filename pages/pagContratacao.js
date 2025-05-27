import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { db, firebaseAuth } from "../src/firebase";
import { getDocs, collection } from "firebase/firestore";

import { TextInput } from "react-native";

import usuario from "./usuario";
import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";

const Screen3 = ({ route }) => {
  const grip = route.params;
  const user2 = grip.user;
  const navigation = useNavigation();
  const auth = firebaseAuth;
  const currentUser = auth.currentUser;
  const usersCollectionRef = collection(db, "users");
  const [usersData, setUsersData] = useState([]);

  const [palavraChave, setPalavraChave] = useState("");

  const Procurar = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(palavraChave.toLowerCase()) ||
      user.email.toLowerCase().includes(palavraChave.toLowerCase()) ||
      (user.expec.toLowerCase().includes(palavraChave.toLowerCase()) &&
        user.email !== currentUser.email)
  );
  const Procurar2 = Procurar.filter((user) => user.email !== currentUser.email);

  function Voltar() {
    navigation.navigate("usuario");
  }
  useEffect(() => {
    const getUserData = async () => {
      try {
        const QuerySnapshot = await getDocs(usersCollectionRef);
        const dataArray = [];
        QuerySnapshot.forEach((doc) => {
          dataArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsersData(dataArray);
      } catch (error) {
        console.error("Erro ao comunicar com firestore", error);
      }
    };
    getUserData();
  }, []);
  const entrarPerfil = (user) => {
    navigation.navigate("pagPerfilUsuarioContrato", {
      user,
      user2,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <View
          style={{
            height: 500,
            width: 240,
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.textstyle}
              onChangeText={(e) => {
                setPalavraChave(e);
              }}
              placeholder="Pesquisar..."
            />
          </View>
          <FlatList
            data={Procurar2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => entrarPerfil(item)}>
                <View style={styles.containerTwo}>
                  {item.photo ? (
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
                      style={styles.imgPerfil}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require("../img/default.jpg")}
                      style={styles.imgPerfil}
                      resizeMode="cover"
                    />
                  )}

                  <View>
                    <Text
                      style={{
                        left: 100,
                        bottom: 80,
                        width: 100,
                      }}
                    >
                      Nome: {item.name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        left: 100,
                        bottom: 80,
                        width: 100,
                      }}
                    >
                      Idade:{item.age}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity onPress={Voltar} style={styles.btn}>
          <Text>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Screen3;

const styles = StyleSheet.create({
  teste2: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  container2: {
    right: 390,
  },
  containerOne: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderColor: "#1dacd6",
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: "white",
    top: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcedfa",
  },
  containerTwo: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "black",
    padding: 5,
    height: 100,
    backgroundColor: "#dcedfa",
    marginTop: 10,
  },
  imgPerfil: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginTop: 5,
    marginLeft: 5,
  },
  btn: {
    width: 150,
    height: 50,
    backgroundColor: "#1dacd6",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
  },
  btntexto: {
    fontSize: 20,
  },
  textstyle: {
    fontSize: 15,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
});
