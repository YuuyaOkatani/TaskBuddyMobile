import react, { useState, useEffect } from "react";
import styles from "../css/styles";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { db, firebaseAuth } from "../src/firebase";
import { collection, onSnapshot, limit, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
const Screen9 = ({ route }) => {
  const data = route.params;
  const auth = firebaseAuth;
  const currentUser = auth.currentUser;
  const collectionRef = collection(db, "Contratos");
  const usersCollectionRef = collection(db, "users");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [palavraChave, setPalavraChave] = useState("");
  const [loading, IsLoading] = useState(false);
  const navigation = useNavigation();

  const filtro = items.filter(
    (e) => e.userID1 == user.id || e.userID2 == user.id
  );
  const filtrosss = filtro.filter(
    (e) =>
      e.Desc.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.Info.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.Diaria.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.EmailDeQuemVaiContratar.toLowerCase().includes(
        palavraChave.toLowerCase()
      ) ||
      e.EmailDoContratado.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.EstadoDoContrato.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.NomeDeQuemVaiContratar.toLowerCase().includes(
        palavraChave.toLowerCase()
      ) ||
      e.NomeDoContratado.toLowerCase().includes(palavraChave.toLowerCase()) ||
      e.Pagamento.toLowerCase().includes(palavraChave.toLowerCase())
  );
  const entrarContrato = (itemID) => {
    IsLoading(true);
    navigation.navigate("pagContrato", { user, itemID });
    IsLoading(false);
  };

  useEffect(() => {
    const unsbcribe = onSnapshot(
      collectionRef,
      limit(1000),
      (QuerySnapshot) => {
        let state = [];
        QuerySnapshot.forEach((doc) => {
          state.push({ id: doc.id, ...doc.data() });
        });
        setItems(state);
      }
    );
  }, [items]);
  useEffect(() => {
    const unsbcribe = onSnapshot(
      usersCollectionRef,
      limit(1000),
      (QuerySnapshot) => {
        let state = [];
        QuerySnapshot.forEach((doc) => {
          state.push({ id: doc.id, ...doc.data() });
        });
        function escolha(users, userAlvo) {
          for (let i = 0; i < users.length; i++) {
            if (users[i].email == userAlvo) {
              return i;
            }
          }
        }
        const s = escolha(state, currentUser.email);
        setUser(state[s]);
      }
    );
  }, [user]);
  const voltar = () => {
    navigation.navigate("usuario");
  };
  if (loading == true) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.placa1}>
        <Text style={{ color: "white" }}> contratos !</Text>
      </View>
      <TextInput
        style={styles.inputStyle3}
        placeholder="Procurar contratos (palavras-chaves)"
        onChange={(e) => setPalavraChave(e.target.value)}
      />
      <View style={{ width: 260, height: 400 }}>
        <FlatList
          data={filtrosss}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => entrarContrato(item.id)}>
                <View style={styles.containerThree}>
                  <Text>
                    {" "}
                    {item.Info} {item.EstadoDoContrato}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.btnVoltarlistaContrato} onPress={voltar}>
        <Text style={{ color: "white" }}>voltar para o menu</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Screen9;
