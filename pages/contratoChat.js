import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  serverTimestamp,
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../src/firebase";
import { TextInput } from "react-native";
import firebase from "firebase/compat/app";
const Screen5 = ({ route }) => {
  const data = route.params;
  const user = data.user;
  const user2 = data.user2;

  const [envio, newEnvio] = useState("");
  const [items, setItems] = useState([]);
  const collectionRef = collection(db, "Mensagens");
  const a = query(collectionRef, orderBy("createAt"));
  const navigation = useNavigation();
  // quem vai enviar -> user.name
  // quem vai receber -> user2.name
  // usuario atual user.name

  const efeito = items.filter(
    (e) =>
      (e.user1ID == user.id && e.user2ID == user2.id) ||
      (e.user1ID == user2.id && e.user2ID == user.id)
  );

  useEffect(() => {
    const unsbcribe = onSnapshot(a, limit(1000), (QuerySnapshot) => {
      let state = [];
      QuerySnapshot.forEach((doc) => {
        state.push({ id: doc.id, ...doc.data() });
      });
      setItems(state);
    });
  }, []);
  async function enviar(msg) {
    await addDoc(collectionRef, {
      createAt: serverTimestamp(),
      text: msg,
      user2ID: user.id,
      user1ID: user2.id,
      // aqui seria os dados do usuario atual, ou seja dados logado inicialmente
    });
    newEnvio("");
  }
  const voltar = () => {
    navigation.navigate("pagPerfilUsuarioContrato", { user, user2 });
  };
  return (
    <View style={styles.containerOne}>
      <View style={styles.containerTwo}>
        <View style={styles.containerThree}>
          <FlatList
            data={efeito}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                {item.user1ID == user2.id ? (
                  /*<View style={styles.msg2}> 
                            <Image source={{ uri: `data:image/jpeg;base64,${user2.photo}` }} 
                            style={styles.imgperfil2} alt="avatar" className="avatar"/>
                            <Text>{user2.name}: {item.text} </Text> 
                         </View>*/
                  <View style={styles.msg2}>
                    {user2.photo ? (
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${user2.photo}`,
                        }}
                        style={styles.imgperfil2}
                        alt="avatar"
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={{ uri: user2.photo }}
                        style={styles.imgperfil2}
                        alt="avatar"
                        resizeMode="cover"
                      />
                    )}
                    <Text>
                      {user2.name}: {item.text}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.containerFourth}>
                    {user.photo ? (
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${user.photo}` }}
                        style={styles.imgperfil}
                        alt="avatar"
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={{ uri: user.photo }}
                        style={styles.imgperfil}
                        alt="avatar"
                        resizeMode="cover"
                      />
                    )}
                    <Text>
                      {user.name}: {item.text}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
          <View>
            <TextInput
              placeholder="digite..."
              style={styles.textStyle}
              value={envio}
              onChangeText={(e) => newEnvio(e)}
            />
            <TouchableOpacity
              onPress={() => enviar(envio)}
              style={{ position: "absolute", left: 205, top: 1 }}
            >
              <Image source={require("../img/enviar.png")} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnvoltar} onPress={() => voltar()}>
              <View>
                <Text>voltar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Screen5;
const styles = StyleSheet.create({
  containerOne: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: 60,
  },
  containerTwo: {
    padding: 25,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "dark",
    backgroundColor: "#dcedfa",
    marginTop: 10,
  },
  containerThree: {
    width: 230,
    height: 535,
    //borderWidth:5,
    borderRadius: 10,
    //borderColor:"#d37a7a",
    backgroundColor: "#dcedfa",
    marginTop: 5,
    marginHorizontal: 5,
  },
  containerFourth: {
    width: 200,
    height: "auto",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "#white",
    marginVertical: 5,
  },
  textStyle: {
    color: "black",
    fontSize: 20,
    height: 50,
    margin: 1,
    width: "auto",
    borderRadius: 10,
    backgroundColor: "#D0D4CA",
  },
  img: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "cyan",
    borderWidth: 2,
  },
  btnvoltar: {
    width: 100,
    height: 50,
    backgroundColor: "#9EB8D9",
    borderColor: "#363062",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  msg2: {
    width: 150,
    height: "auto",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#555843",
    backgroundColor: "#8CC0DE",
    marginVertical: 5,
    left: 65,
  },
  imgperfil: {
    height: 22,
    width: 22,
    borderRadius: 100,
    marginTop: 2,
  },
  imgperfil2: {
    height: 22,
    width: 22,
    borderRadius: 100,
    left: 115,
    marginTop: 2,
  },
});
